// lib/reuse/reuse.ts
import { z } from "zod";
import { ReusePayloadSchema, type ReusePayload } from "./schema";
import { reuseStorage } from "./storage";
import { ENABLE_DEV_LOGS, REUSE_CLEAR_DELAY_MS, SubType } from "./types";
import { fallbackHandlers } from "./fallbacks";

/** 保存：入力も外枠スキーマで検証後に保存（無効は破棄） */
export function setReusePayload(payload: ReusePayload): void {
  const parsed = ReusePayloadSchema.safeParse(payload);
  if (!parsed.success) {
    if (ENABLE_DEV_LOGS) {
      console.warn("[reuse] setReusePayload: invalid payload", parsed.error.issues);
    }
    return;
  }
  // stringifyは安全
  reuseStorage.set(JSON.stringify(parsed.data));
}

/** 取得（クリアしない） */
export function getReusePayload(): ReusePayload | null {
  const raw = reuseStorage.get();
  if (!raw) return null;

  try {
    const json = JSON.parse(raw);
    const parsed = ReusePayloadSchema.safeParse(json);
    if (parsed.success) return parsed.data;
    if (ENABLE_DEV_LOGS) {
      console.warn("[reuse] getReusePayload: schema mismatch; dropping", parsed.error.issues);
    }
    return null;
  } catch (e) {
    if (ENABLE_DEV_LOGS) console.warn("[reuse] getReusePayload: JSON.parse failed; dropping", e);
    return null;
  }
}

/** 即クリア */
export function clearReusePayload(): void {
  reuseStorage.remove();
}

/** 遅延クリア（Hydration配慮） */
function clearReusePayloadLater(): void {
  setTimeout(() => reuseStorage.remove(), REUSE_CLEAR_DELAY_MS);
}

/**
 * 外枠スキーマの検証とJSON解析
 * @returns 検証済みの外枠ペイロード、失敗時はnull
 */
function _validateOuter(raw: string): ReusePayload | null {
  try {
    const json = JSON.parse(raw);
    const outerParsed = ReusePayloadSchema.safeParse(json);
    if (!outerParsed.success) {
      if (ENABLE_DEV_LOGS) {
        console.warn("[reuse] outer schema mismatch; dropping", outerParsed.error.issues);
      }
      return null;
    }
    return outerParsed.data;
  } catch (e) {
    if (ENABLE_DEV_LOGS) console.warn("[reuse] JSON.parse failed; dropping", e);
    return null;
  }
}

/**
 * typeId / sub の一致確認
 */
function _matchesTypeAndSub(outer: ReusePayload, typeId: string, sub?: SubType): boolean {
  const subOk = outer.sub ? outer.sub === sub : true;
  return outer.typeId === typeId && subOk;
}

/**
 * 内枠スキーマの検証とフォールバック処理
 */
function _validateAndFallback<T extends z.ZodTypeAny>(
  inputs: unknown,
  schema: T,
  sub?: SubType
): z.infer<T> | null {
  const parsed = schema.safeParse(inputs);
  if (parsed.success) {
    return parsed.data;
  }

  // フォールバック（ある場合）
  if (sub) {
    const fb = fallbackHandlers[sub];
    if (typeof fb === "function") {
      const converted = fb(inputs);
      const reparsed = schema.safeParse(converted);
      if (reparsed.success) {
        if (ENABLE_DEV_LOGS) {
          console.warn("[reuse] inputs recovered via fallback:", sub);
        }
        return reparsed.data;
      }
    }
  }

  if (ENABLE_DEV_LOGS) {
    console.warn("[reuse] inputs invalid; returning null");
  }
  return null;
}

/**
 * 型付き再利用取得（Zod）
 * - 外枠: ReusePayloadSchema で検証
 * - 内枠: 引数 schema で検証
 * - 失敗時: subが指定されていればフォールバック変換 → schema再検証
 * - 取得成功時のみ遅延削除
 */
export function getTypedReusePayloadOnce<T extends z.ZodTypeAny>(
  typeId: string,
  schema: T,
  sub?: SubType
): z.infer<T> | null {
  const raw = reuseStorage.get();
  if (!raw) return null;

  const outer = _validateOuter(raw);
  if (!outer) return null;

  if (!_matchesTypeAndSub(outer, typeId, sub)) return null;

  const inputs = (outer.inputs ?? null) as unknown;
  const result = _validateAndFallback(inputs, schema, sub);

  if (result) {
    clearReusePayloadLater();
  }

  return result;
}
