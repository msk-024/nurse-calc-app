import { z } from "zod";
import { patientConditions } from "@/config/patientConditions";
import { prep } from "@/lib/zodHelpers";

export const nutritionSchema = z.object({
  weight: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "体重を入力してください" })
      .min(1, "体重は1kg以上で入力してください")
      .max(300, "体重は300kg以下で入力してください")
  ),
   condition: z.enum(
     patientConditions.map((p) => p.value) as [string, ...string[]],
     { errorMap: () => ({ message: "状態を選択してください" }) },
   ),
 });

export type NutritionInputs = z.infer<typeof nutritionSchema>;
