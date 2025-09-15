// 今後拡張しやすいように共通のSubType定義
export type SubType = "na" | "k" | "mg";

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
  if ("k" in o && "ph" in o) {
    const k = Number(o.k);
    const ph = Number(o.ph);
    if (!Number.isNaN(k) && !Number.isNaN(ph)) {
      return { k, ph };
    }
  }
  return null;
};

// --------- Mg補正 ---------
export interface MgInputs {
  mg: number;
}

const mgFallback: FallbackHandler<MgInputs> = (inputs) => {
  if (typeof inputs !== "object" || inputs === null) return null;

  const o = inputs as Partial<Record<keyof MgInputs, unknown>>;
  if ("mg" in o) {
    const mg = Number(o.mg);
    if (!Number.isNaN(mg)) {
      return { mg };
    }
  }
  return null;
};

// --------- ハンドラ集約 ---------
export const fallbackHandlers: Partial<
  Record<SubType, FallbackHandler<unknown>>
> = {
  k: kFallback,
  mg: mgFallback,
  // naはフォールバック不要なので定義しない
};
