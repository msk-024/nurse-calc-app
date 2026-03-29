// 輸血計算
"use client";

import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { transfusionSchema, type TransfusionInputs } from "./schema";
import { useCalculator } from "@/hooks/useCalculator";

export default function TransfusionCalculator() {
  const {
    result,
    setResult,
    resultRef,
    register,
    handleSubmit,
    errors,
  } = useCalculator<TransfusionInputs>(transfusionSchema, "transfusion");

  const onSubmit = (data: TransfusionInputs) => {
    // RCC必要単位数 = ((目標Hb - 現在Hb) × 体重 × 0.3) / 200
    const units = ((data.targetHb - data.currentHb) * data.weight * 0.3) / 200;
    const roundedUnits = Math.ceil(units);

    setResult(String(roundedUnits));

    const summary = `RCC輸血 単位数: ${roundedUnits} 単位`;

    saveHistory({
      id: Date.now(),
      typeId: "transfusion",
      typeName: "輸血量計算",
      inputs: {
        weight: data.weight,
        currentHb: data.currentHb,
        targetHb: data.targetHb,
      },
      result: { units: roundedUnits },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">RCC輸血 単位数計算</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LabeledInput
            label="体重 (kg)"
            type="number"
            placeholder="例: 60"
            error={errors.weight?.message}
            {...register("weight")}
          />
          <LabeledInput
            label="現在のHb (g/dL)"
            type="number"
            placeholder="例: 7.0"
            error={errors.currentHb?.message}
            {...register("currentHb")}
          />
          <LabeledInput
            label="目標Hb (g/dL)"
            type="number"
            placeholder="例: 10.0"
            error={errors.targetHb?.message}
            {...register("targetHb")}
          />
        </div>

        <SubmitButton color="bg-rose-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="rose"
            results={[{ label: "推定単位数", value: result, unit: "単位" }]}
            note={`※ 本計算は赤血球濃厚液（RCC）を対象としています。\n※ 実際の輸血適応は臨床判断により決定されます。`}
            typeId="transfusion"
          />
        </div>
      )}
    </div>
  );
}
