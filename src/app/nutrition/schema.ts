import { z } from "zod";
import { patientConditions } from "@/config/patientConditions";

export const nutritionSchema = z.object({
  weight: z.coerce.number().positive(),
  condition: z.enum(
    patientConditions.map((p) => p.value) as [string, ...string[]]
  ),
});

export type NutritionInputs = z.infer<typeof nutritionSchema>;
