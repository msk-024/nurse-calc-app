// 体表面積
"use client";

import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { bsaSchema, type BsaInputs } from "./schema";
import { useCalculator } from "@/hooks/useCalculator";

export default function BsaCalculator() {
  const { result, setResult, resultRef, register, handleSubmit, errors } =
    useCalculator<BsaInputs>(bsaSchema, "bsa");

  const onSubmit = (data: BsaInputs) => {
    // Mosteller式: BSA = √[(身長(cm) × 体重(kg)) / 3600]
    const bsa = Math.sqrt((data.height * data.weight) / 3600);
    const formattedBsa = bsa.toFixed(2);
    setResult(formattedBsa);

    saveHistory({
      id: Date.now(),
      typeId: "bsa",
      typeName: "体表面積計算",
      inputs: { height: data.height, weight: data.weight },
      result: { bsa: formattedBsa },
      resultSummary: `体表面積 ${formattedBsa} m²`,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">体表面積計算</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput
            label="身長 (cm)"
            type="number"
            placeholder="例: 160"
            error={errors.height?.message}
            {...register("height")}
          />
          <LabeledInput
            label="体重 (kg)"
            type="number"
            placeholder="例: 60"
            error={errors.weight?.message}
            {...register("weight")}
          />
        </div>

        <SubmitButton color="bg-purple-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="purple"
            results={[
              {
                label: "体表面積",
                value: result,
                unit: "m²",
              },
            ]}
            note="※ 使用式: Mosteller式 √(身長×体重 ÷ 3600)"
            typeId="bsa"
          />
        </div>
      )}
    </div>
  );
}
