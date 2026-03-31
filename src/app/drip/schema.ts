import { z } from "zod";

const prep = (val: unknown) => (val === "" ? undefined : val);

export const dripSchema = z.object({
  volume: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "総輸液量を入力してください" })
      .min(1, "総輸液量は1mL以上で入力してください")
      .max(10000, "総輸液量は10000mL以下で入力してください")
  ),
  hours: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "投与時間を入力してください" })
      .min(0.1, "投与時間は0.1時間以上で入力してください")
      .max(240, "投与時間は240時間以下で入力してください")
  ),
  dropFactor: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "滴下係数を入力してください" })
      .min(1, "滴下係数は1以上で入力してください")
      .max(60, "滴下係数は60以下で入力してください")
  ),
});

export type DripInputs = z.infer<typeof dripSchema>;
