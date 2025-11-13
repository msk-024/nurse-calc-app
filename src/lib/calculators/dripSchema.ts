import { z } from "zod";

/**
 * 点滴速度計算用 Zod スキーマ
 * - 数値かつ正の値を要求
 * - UI側で選択肢は文字列なので Zod 側で number に変換して扱う
 */
export const DripInputsSchema = z.object({
  volume: z.number().positive(),
  hours: z.number().positive(),
  dropFactor: z.number().positive(),
});

export type DripInputs = z.infer<typeof DripInputsSchema>;
