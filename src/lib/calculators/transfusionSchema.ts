import { z } from "zod";

/**
 * 輸血計算（RCC 単位数計算）用 Zod スキーマ
 * - weight: 正の数
 * - currentHb: 正の数
 * - targetHb: 正の数（currentHb との比較はコンポーネント側で行う）
 */
export const TransfusionInputsSchema = z.object({
  weight: z.number().positive(),
  currentHb: z.number().positive(),
  targetHb: z.number().positive(),
});

export type TransfusionInputs = z.infer<typeof TransfusionInputsSchema>;
