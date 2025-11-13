import { z } from "zod";

export const oxygenSchema = z.object({
  deviceId: z.string(),
  flow: z.coerce.number().optional(),
});

export type OxygenInputs = z.infer<typeof oxygenSchema>;
