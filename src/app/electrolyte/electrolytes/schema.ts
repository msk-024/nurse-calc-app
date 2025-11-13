import { z } from "zod";

export const naCorrectionSchema = z.object({
  na: z.coerce.number().positive(),
  glucose: z.coerce.number().positive(),
});
export type NaCorrectionInputs = z.infer<typeof naCorrectionSchema>;

export const kCorrectionSchema = z.object({
  k: z.coerce.number().positive(),
  ph: z.coerce.number().positive(),
});
export type KCorrectionInputs = z.infer<typeof kCorrectionSchema>;
