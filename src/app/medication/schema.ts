import { z } from "zod";

const prep = (val: unknown) => (val === "" ? undefined : val);

export const medicationSchema = z.object({
  weight: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "体重を入力してください" })
      .min(1, "体重は1kg以上で入力してください")
      .max(300, "体重は300kg以下で入力してください")
  ),
  dose: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "投与量を入力してください" })
      .min(0.001, "投与量は0.001以上で入力してください")
      .max(10000, "投与量は10000以下で入力してください")
  ),
  concentration: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "濃度を入力してください" })
      .min(0.001, "濃度は0.001以上で入力してください")
      .max(10000, "濃度は10000以下で入力してください")
  ),
});


export type MedicationInputs = z.infer<typeof medicationSchema>;
