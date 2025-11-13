import { z } from "zod";

/**
 * 酸素投与量計算スキーマ
 * - deviceId: 選択デバイス
 * - flow: 室内気の場合なし → optional
 */
export const OxygenInputsSchema = z.object({
  deviceId: z.string(),
  flow: z.number().nonnegative().optional(),
});

export type OxygenInputs = z.infer<typeof OxygenInputsSchema>;
