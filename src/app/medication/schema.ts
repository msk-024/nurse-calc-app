import { z } from "zod";

export const medicationSchema = z.object({
  weight: z.coerce
    .number()
    .min(1, "体重は1kg以上で入力してください")
    .max(300, "体重は300kg以下で入力してください"),
  dose: z.coerce
    .number()
    .min(0.001, "投与量は0.001以上で入力してください")
    .max(10000, "投与量は10000以下で入力してください"),
  concentration: z.coerce
    .number()
    .min(0.001, "濃度は0.001以上で入力してください")
    .max(10000, "濃度は10000以下で入力してください"),
});


export type MedicationInputs = z.infer<typeof medicationSchema>;
