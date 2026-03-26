import { z } from "zod";

  export const bmiSchema = z.object({
    height: z.coerce
      .number()
      .min(50, "身長は50cm以上で入力してください")
      .max(250, "身長は250cm以下で入力してください"),
    weight: z.coerce
      .number()
      .min(1, "体重は1kg以上で入力してください")
      .max(300, "体重は300kg以下で入力してください"),
  });

export type BmiInputs = z.infer<typeof bmiSchema>;
