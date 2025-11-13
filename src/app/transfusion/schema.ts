import { z } from "zod";

export const transfusionSchema = z.object({
  weight: z.coerce.number().positive(),
  currentHb: z.coerce.number().positive(),
  targetHb: z.coerce.number().positive(),
});

export type TransfusionInputs = z.infer<typeof transfusionSchema>;
