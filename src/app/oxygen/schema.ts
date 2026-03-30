import { z } from "zod";

export const oxygenSchema = z
  .object({
    deviceId: z.enum(
      ["room_air", "nasal_cannula", "simple_mask", "reservoir_mask", "venturi_mask", "hfnc"],
      { errorMap: () => ({ message: "デバイスを選択してください" }) }
    ),
    flow: z.coerce
      .number({ invalid_type_error: "流量を入力してください" })
      .min(0.5, "流量は0.5L/min以上で入力してください")
      .max(60, "流量は60L/min以下で入力してください")
      .optional(),
  })
  .refine((data) => data.deviceId === "room_air" || data.flow != null, {
    message: "このデバイスでは流量の入力が必須です",
    path: ["flow"],
  });

export type OxygenInputs = z.infer<typeof oxygenSchema>;
