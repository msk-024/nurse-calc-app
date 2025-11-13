import { z } from "zod";

/**
 * BSA（体表面積）計算用スキーマ
 * 正の数のみ許可
 */
export const BsaInputsSchema = z.object({
  height: z.number().positive(),
  weight: z.number().positive(),
});

export type BsaInputs = z.infer<typeof BsaInputsSchema>;
