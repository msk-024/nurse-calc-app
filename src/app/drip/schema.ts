import { z } from "zod";

export const dripSchema = z.object({
  volume: z.coerce.number().positive("総輸液量は正の数値で入力してください"),
  hours: z.coerce.number().positive("投与時間は正の数値で入力してください"),
  dropFactor: z.coerce
    .number()
    .positive("滴下係数は正の数値で入力してください"),
});

export type DripInputs = z.infer<typeof dripSchema>;
