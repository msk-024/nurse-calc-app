import { z } from "zod";

export const naCorrectionSchema = z.object({
  na: z.coerce
    .number({ invalid_type_error: "血清Naを入力してください" })
    .min(100, "血清Naは100mEq/L以上で入力してください")
    .max(180, "血清Naは180mEq/L以下で入力してください"),
  glucose: z.coerce
    .number({ invalid_type_error: "血糖値を入力してください" })
    .min(50, "血糖値は50mg/dL以上で入力してください")
    .max(2000, "血糖値は2000mg/dL以下で入力してください"),
});

export const kCorrectionSchema = z.object({
  k: z.coerce
    .number({ invalid_type_error: "血清Kを入力してください" })
    .min(1, "血清Kは1mEq/L以上で入力してください")
    .max(10, "血清Kは10mEq/L以下で入力してください"),
  ph: z.coerce
    .number({ invalid_type_error: "pHを入力してください" })
    .min(6.8, "pHは6.8以上で入力してください")
    .max(7.8, "pHは7.8以下で入力してください"),
});

export type NaCorrectionInputs = z.infer<typeof naCorrectionSchema>;
export type KCorrectionInputs = z.infer<typeof kCorrectionSchema>;
