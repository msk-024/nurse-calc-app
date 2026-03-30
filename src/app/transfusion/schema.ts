import { z } from "zod";

export const transfusionSchema = z
  .object({
    weight: z.coerce
      .number({ invalid_type_error: "体重を入力してください" })
      .min(1, "体重は1kg以上で入力してください")
      .max(300, "体重は300kg以下で入力してください"),
    currentHb: z.coerce
      .number({ invalid_type_error: "現在のHbを入力してください" })
      .min(1, "現在のHbは1g/dL以上で入力してください")
      .max(25, "現在のHbは25g/dL以下で入力してください"),
    targetHb: z.coerce
      .number({ invalid_type_error: "目標Hbを入力してください" })
      .min(1, "目標Hbは1g/dL以上で入力してください")
      .max(25, "目標Hbは25g/dL以下で入力してください"),
  })
  .refine((data) => data.targetHb > data.currentHb, {
    message: "目標Hbは現在Hbより高く設定してください",
    path: ["targetHb"],
  });

export type TransfusionInputs = z.infer<typeof transfusionSchema>;
