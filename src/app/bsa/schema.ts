import { z } from "zod";

export const bsaSchema = z.object({
  height: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
});

export type BsaInputs = z.infer<typeof bsaSchema>;
