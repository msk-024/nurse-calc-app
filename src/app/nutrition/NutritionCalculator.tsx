// 栄養計算
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveHistory } from "@/lib/history";
import { nutritionFactors } from "@/config/nutritionFactors";
import LabeledInput from "@/app/_components/LabeledInput";
import LabeledSelect from "@/app/_components/LabeledSelect";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { patientConditions } from "@/config/patientConditions";
import { nutritionSchema, type NutritionInputs } from "./schema";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";

export default function NutritionCalculator() {
  const [result, setResult] = useState<null | {
    calorie: string;
    protein: string;
    water: string;
    condition: string;
  }>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NutritionInputs>({
    resolver: zodResolver(nutritionSchema),
    defaultValues: { condition: "normal" },
  });

  useEffect(() => {
    const data = getTypedReusePayloadOnce("nutrition", nutritionSchema);
    if (!data) return;
    reset(data);
  }, [reset]);

  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const onSubmit = (data: NutritionInputs) => {
    const factor = nutritionFactors[data.condition as keyof typeof nutritionFactors];

    const resultData = {
      calorie: (data.weight * factor.energy).toFixed(1),
      protein: (data.weight * factor.protein).toFixed(1),
      water: (data.weight * factor.water).toFixed(1),
      condition: data.condition,
    };

    setResult(resultData);

    const summary = `エネルギー ${resultData.calorie} kcal / タンパク質 ${resultData.protein} g / 水分量 ${resultData.water} mL`;

    saveHistory({
      id: Date.now(),
      typeId: "nutrition",
      typeName: "栄養計算",
      inputs: { weight: data.weight, condition: data.condition },
      result: { calorie: resultData.calorie, protein: resultData.protein, water: resultData.water },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">栄養計算</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <LabeledInput
            label="体重 (kg)"
            type="number"
            placeholder="例: 60"
            error={errors.weight?.message}
            {...register("weight")}
          />

          <LabeledSelect
            label="患者の状態"
            options={patientConditions}
            error={errors.condition?.message}
            {...register("condition")}
          />
        </div>

        <SubmitButton color="bg-amber-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="amber"
            results={[
              { label: "エネルギー", value: result.calorie, unit: "kcal" },
              { label: "タンパク質", value: result.protein, unit: "g" },
              { label: "水分量", value: result.water, unit: "mL" },
            ]}
            note="※ 推定値です。実際の栄養管理は医師・栄養士の指示に従ってください。"
            typeId="nutrition"
          />

          {(result.condition === "burn" || result.condition === "critical") && (
            <p className="text-sm text-red-600">
              ※ 注意：{result.condition === "burn" ? "熱傷" : "重症"}患者では
              状態に応じた調整が必要です。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
