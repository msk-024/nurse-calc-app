import { z } from "zod";

/**
 * Na 補正計算の Zod スキーマ
 * - na: 測定Na（mEq/L）正の数
 * - glucose: 血糖値（mg/dL）正の数
 */
export const NaCorrectionInputsSchema = z.object({
  na: z.number().positive(),
  glucose: z.number().positive(),
});

export type NaCorrectionInputs = z.infer<typeof NaCorrectionInputsSchema>;
