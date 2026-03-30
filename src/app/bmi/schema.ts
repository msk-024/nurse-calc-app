import { z } from "zod";

export const bmiSchema = z.object({
  // z.preprocess: 空文字列 "" を undefined に変換することで
  // invalid_type_error が正しく発火する（"" → 0 になる coerce のバグ回避）
  height: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ invalid_type_error: "身長を入力してください" })
      .min(50, "身長は50cm以上で入力してください")
      .max(250, "身長は250cm以下で入力してください")
  ),
  weight: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ invalid_type_error: "体重を入力してください" })
      .min(1, "体重は1kg以上で入力してください")
      .max(300, "体重は300kg以下で入力してください")
  ),
});

export type BmiInputs = z.infer<typeof bmiSchema>;
