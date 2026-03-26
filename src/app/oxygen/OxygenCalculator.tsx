// 酸素投与量計算
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveHistory } from "@/lib/history";
import { oxygenDevices } from "@/config/oxygenDevices";
import LabeledInput from "@/app/_components/LabeledInput";
import LabeledSelect from "@/app/_components/LabeledSelect";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { oxygenSchema, type OxygenInputs } from "./schema";

export default function OxygenCalculator() {
  const [result, setResult] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<OxygenInputs>({
    resolver: zodResolver(oxygenSchema),
    defaultValues: { deviceId: "nasal_cannula" },
    shouldUnregister: true,
  });

  const deviceId = watch("deviceId");

  useEffect(() => {
    const data = getTypedReusePayloadOnce("oxygen", oxygenSchema);
    if (!data) return;
    reset(data);
  }, [reset]);

  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const onSubmit = (data: OxygenInputs) => {
    const selectedDevice = oxygenDevices.find((d) => d.id === data.deviceId);

    if (!selectedDevice) {
      return;
    }

    const flowRate = data.flow;
    let fiO2: number;

    if (selectedDevice.estimateFiO2Function && flowRate != null) {
      fiO2 = selectedDevice.estimateFiO2Function(flowRate);
    } else if (selectedDevice.estimatedFiO2 !== undefined) {
      fiO2 = selectedDevice.estimatedFiO2;
    } else {
      return;
    }

    setResult(fiO2.toFixed(0));

    saveHistory({
      id: Date.now(),
      typeId: "oxygen",
      typeName: "酸素投与量計算",
      inputs: { deviceId: data.deviceId, flow: flowRate ?? 0 },
      result: { fio2: fiO2.toFixed(0) },
      resultSummary: `推定FiO₂: ${fiO2.toFixed(0)}%`,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">酸素投与量計算</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledSelect
            label="デバイスを選択"
            options={oxygenDevices.map((d) => ({
              value: d.id,
              label: d.name,
            }))}
            error={errors.deviceId?.message}
            {...register("deviceId")}
          />

          {deviceId !== "room_air" && (
            <LabeledInput
              label="流量 (L/min)"
              type="number"
              placeholder="例: 2"
              error={errors.flow?.message}
              {...register("flow")}
            />
          )}
        </div>

        <SubmitButton color="bg-teal-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="teal"
            results={[{ label: "推定 FiO₂", value: result, unit: "%" }]}
            note={`※ FiO₂の値は代表的な推定値です。\n※ 実際の酸素濃度を保証するものではありません。\n※ 患者の呼吸状態やマスクの装着状態で変動します。`}
            typeId="oxygen"
          />
        </div>
      )}
    </div>
  );
}
