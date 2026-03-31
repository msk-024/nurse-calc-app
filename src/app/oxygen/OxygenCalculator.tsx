// 酸素投与量計算
"use client";

import { saveHistory } from "@/lib/history";
import { oxygenDevices } from "@/config/oxygenDevices";
import LabeledInput from "@/app/_components/LabeledInput";
import LabeledSelect from "@/app/_components/LabeledSelect";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { oxygenSchema, type OxygenInputs } from "./schema";
import { useCalculator } from "@/hooks/useCalculator";

export default function OxygenCalculator() {
  const {
    result,
    setResult,
    resultRef,
    register,
    handleSubmit,
    errors,
  } = useCalculator<OxygenInputs>(oxygenSchema, "oxygen");

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
            options={[
              { value: "", label: "-- 選択してください --" },
              ...oxygenDevices.map((d) => ({ value: d.id, label: d.name })),
            ]}
            error={errors.deviceId?.message}
            {...register("deviceId")}
          />

          <LabeledInput
            label="流量 (L/min)"
            type="number"
            placeholder="例: 2"
            error={errors.flow?.message}
            {...register("flow")}
          />
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
