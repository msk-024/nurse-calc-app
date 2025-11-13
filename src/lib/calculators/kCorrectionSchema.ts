import { z } from "zod";

/**
 * K 補正計算用 Zod スキーマ
 *
 * - k: 実測K（mEq/L）
 * - ph: 血液pH（例えば 7.2 など）
 */
export const KCorrectionInputsSchema = z.object({
  k: z.number().positive(),
  ph: z.number().positive(),
});

export type KCorrectionInputs = z.infer<typeof KCorrectionInputsSchema>;
