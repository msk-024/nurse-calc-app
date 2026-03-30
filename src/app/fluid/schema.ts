import { z } from "zod";

export const fluidSchema = z.object({
  prevWeight: z.coerce
    .number({ invalid_type_error: "前日体重を入力してください" })
    .min(1, "前日体重は1kg以上で入力してください")
    .max(300, "前日体重は300kg以下で入力してください"),
  currWeight: z.coerce
    .number({ invalid_type_error: "当日体重を入力してください" })
    .min(1, "当日体重は1kg以上で入力してください")
    .max(300, "当日体重は300kg以下で入力してください"),
  oralIntake: z.coerce
    .number()
    .min(0, "経口摂取量は0以上で入力してください")
    .max(10000, "経口摂取量は10000mL以下で入力してください")
    .optional()
    .default(0),
  ivIntake: z.coerce
    .number()
    .min(0, "点滴量は0以上で入力してください")
    .max(10000, "点滴量は10000mL以下で入力してください")
    .optional()
    .default(0),
  urineOutput: z.coerce
    .number()
    .min(0, "尿量は0以上で入力してください")
    .max(10000, "尿量は10000mL以下で入力してください")
    .optional()
    .default(0),
  otherOutput: z.coerce
    .number()
    .min(0, "その他排泄量は0以上で入力してください")
    .max(10000, "その他排泄量は10000mL以下で入力してください")
    .optional()
    .default(0),
});

export type FluidInputs = z.infer<typeof fluidSchema>;
