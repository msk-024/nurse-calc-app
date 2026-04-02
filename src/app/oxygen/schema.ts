import { z } from "zod";
import { oxygenDevices } from "@/config/oxygenDevices";
import { prep } from "@/lib/zodHelpers";

// 流量入力が必要なデバイス（estimateFiO2Functionを持つもの）
const devicesRequiringFlow = oxygenDevices
  .filter((d) => d.estimateFiO2Function)
  .map((d) => d.id);

const deviceIds = oxygenDevices.map((d) => d.id) as [string, ...string[]];

export const oxygenSchema = z
  .object({
    deviceId: z.enum(deviceIds, {
      errorMap: () => ({ message: "デバイスを選択してください" }),
    }),
    flow: z.preprocess(
      prep,
      z.coerce
        .number({ invalid_type_error: "流量を入力してください" })
        .min(0.5, "流量は0.5L/min以上で入力してください")
        .max(60, "流量は60L/min以下で入力してください")
        .optional()
    ),
  })
  .refine((data) => !devicesRequiringFlow.includes(data.deviceId) || data.flow != null, {
    message: "このデバイスでは流量の入力が必須です",
    path: ["flow"],
  });

export type OxygenInputs = z.infer<typeof oxygenSchema>;
