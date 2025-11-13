import { z } from "zod";

/**
 * 体液バランス計算用スキーマ
 * - 体重は必須
 * - 摂取・排泄は「未入力も許容」するため optional
 *   （コンポーネント側で 0 にフォールバック）
 */
export const FluidInputsSchema = z.object({
  prevWeight: z.number().positive(),
  currWeight: z.number().positive(),
  oralIntake: z.number().nonnegative().optional(),
  ivIntake: z.number().nonnegative().optional(),
  urineOutput: z.number().nonnegative().optional(),
  otherOutput: z.number().nonnegative().optional(),
});

export type FluidInputs = z.infer<typeof FluidInputsSchema>;
