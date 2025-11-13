/**
 * BMI 計算用 Zod スキーマ
 * - 数値変換が必要なため refine で正の値のみ許可
 */
import { z } from "zod";

export const BmiInputsSchema = z.object({
  height: z.number().positive(),
  weight: z.number().positive(),
});

export type BmiInputs = z.infer<typeof BmiInputsSchema>;
