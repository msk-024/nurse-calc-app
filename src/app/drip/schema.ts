import { z } from "zod";

 export const dripSchema = z.object({
   volume: z.coerce
     .number()
     .min(1, "総輸液量は1mL以上で入力してください")
     .max(10000, "総輸液量は10000mL以下で入力してください"),
   hours: z.coerce
     .number()
     .min(0.1, "投与時間は0.1時間以上で入力してください")
     .max(240, "投与時間は240時間以下で入力してください"),
   dropFactor: z.coerce
     .number()
     .min(1, "滴下係数は1以上で入力してください")
     .max(60, "滴下係数は60以下で入力してください"),
 });

export type DripInputs = z.infer<typeof dripSchema>;
