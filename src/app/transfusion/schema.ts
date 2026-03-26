import { z } from "zod";

export const transfusionSchema = z.object({
  weight: z.coerce
    .number()
    .min(1, "体重は1kg以上で入力してください")
    .max(300, "体重は300kg以下で入力してください"),
  currentHb: z.coerce
    .number()
    .min(1, "現在のHbは1g/dL以上で入力してください")
    .max(25, "現在のHbは25g/dL以下で入力してください"),
  targetHb: z.coerce
    .number()
    .min(1, "目標Hbは1g/dL以上で入力してください")
    .max(25, "目標Hbは25g/dL以下で入力してください"),
});

export type TransfusionInputs = z.infer<typeof transfusionSchema>;
