// クライアント専用のユーティリティ（SSR安全）

const STORAGE_KEY = "reusePayload";

export type ReusePayload = {
  typeId: string;
  sub?: "na" | "k"; // 電解質タブ識別用（任意）
  inputs?: unknown; // ここは unknown にする（型は各ページの型ガードで絞る）
  timestamp?: string;
};

// 保存
export function setReusePayload(payload: ReusePayload): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // 端末のプライベートモード等で localStorage 不可な場合の握り潰し
  }
}

// 取得（クリアしない）
export function getReusePayload(): ReusePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "typeId" in parsed) {
      return parsed as ReusePayload;
    }
    return null;
  } catch {
    return null;
  }
}

// 取得して即クリア（取り回しが楽）
export function getReusePayloadOnce(): ReusePayload | null {
  const p = getReusePayload();
  if (p) clearReusePayload();
  return p;
}

// クリア
export function clearReusePayload(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// 履歴再利用
export function getTypedReusePayloadOnce<T>(
  typeId: string,
  isValid: (v: unknown) => v is T,
  sub?: "na" | "k"
): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("reusePayload");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    console.log("パース結果", parsed);
    console.log("typeId一致:", parsed.typeId === typeId);
    console.log("🚨 呼び出し元sub =", sub, "（型:", typeof sub, "）");
    console.log(
      "🧩 取得データ.sub =",
      parsed.sub,
      "（型:",
      typeof parsed.sub,
      "）"
    );
    console.log("inputs検証:", isValid(parsed.inputs));
    console.log(typeof parsed.inputs.k);
    if (
      parsed &&
      typeof parsed === "object" &&
      "typeId" in parsed &&
      parsed.typeId === typeId &&
      (parsed.sub ? parsed.sub === sub : true) &&
      "inputs" in parsed &&
      isValid(parsed.inputs)
    ) {
      localStorage.removeItem("reusePayload");
      return parsed.inputs;
    }

    return null;
  } catch {
    return null;
  }
}
