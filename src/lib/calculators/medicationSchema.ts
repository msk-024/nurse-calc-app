import { z } from "zod";

// 投薬計算用スキーマ
export const MedicationInputsSchema = z.object({
  weight: z.number().positive(),
  dose: z.number().positive(),
  concentration: z.number().positive(),
});

export type MedicationInputs = z.infer<typeof MedicationInputsSchema>;
