import { z } from "zod";

export const medicationSchema = z.object({
  weight: z.coerce.number().positive(),
  dose: z.coerce.number().positive(),
  concentration: z.coerce.number().positive(),
});

export type MedicationInputs = z.infer<typeof medicationSchema>;
