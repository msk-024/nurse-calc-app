import { z } from "zod";

export const bmiSchema = z.object({
  height: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
});

export type BmiInputs = z.infer<typeof bmiSchema>;
