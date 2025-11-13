import { z } from "zod";

/**
 * 栄養計算の入力スキーマ
 * - weight: 正の数
 * - condition: patientConditions に含まれる文字列
 */
export const NutritionInputsSchema = z.object({
  weight: z.number().positive(),
  condition: z.string(), // PatientCondition (選択肢文字列)
});

export type NutritionInputs = z.infer<typeof NutritionInputsSchema>;
