import { SubType } from "./types";

// フォールバック用の共通ハンドラ型
export type FallbackHandler<T> = (inputs: unknown) => T | null;

// --------- K補正 ---------
export interface KInputs {
  k: number;
  ph: number;
}
const kFallback: FallbackHandler<KInputs> = (inputs) => {
  if (typeof inputs !== "object" || inputs === null) return null;
  const o = inputs as Partial<Record<keyof KInputs, unknown>>;
  const k = Number(o.k);
  const ph = Number(o.ph);
  if (Number.isFinite(k) && Number.isFinite(ph)) return { k, ph };
  return null;
};

// --------- Mg補正 ---------
export interface MgInputs {
  mg: number;
}
const mgFallback: FallbackHandler<MgInputs> = (inputs) => {
  if (typeof inputs !== "object" || inputs === null) return null;
  const o = inputs as Partial<Record<keyof MgInputs, unknown>>;
  const mg = Number(o.mg);
  if (Number.isFinite(mg)) return { mg };
  return null;
};

// --------- ハンドラ集約 ---------
export const fallbackHandlers: Partial<
  Record<SubType, FallbackHandler<unknown>>
> = {
  k: kFallback,
  mg: mgFallback,
  // 'na' はフォールバック不要の前提で未定義
};
