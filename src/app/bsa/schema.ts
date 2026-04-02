import { z } from "zod";
import { prep } from "@/lib/zodHelpers";

export const bsaSchema = z.object({
  height: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "身長を入力してください" })
      .min(50, "身長は50cm以上で入力してください")
      .max(250, "身長は250cm以下で入力してください")
  ),
  weight: z.preprocess(
    prep,
    z.coerce.number({ invalid_type_error: "体重を入力してください" })
      .min(1, "体重は1kg以上で入力してください")
      .max(300, "体重は300kg以下で入力してください")
  ),
});

export type BsaInputs = z.infer<typeof bsaSchema>;
