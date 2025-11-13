import { z } from "zod";

export const fluidSchema = z.object({
  prevWeight: z.coerce.number().positive(),
  currWeight: z.coerce.number().positive(),
  oralIntake: z.coerce.number().optional(),
  ivIntake: z.coerce.number().optional(),
  urineOutput: z.coerce.number().optional(),
  otherOutput: z.coerce.number().optional(),
});

export type FluidInputs = z.infer<typeof fluidSchema>;
