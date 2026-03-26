// BMI計算
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { bmiSchema, type BmiInputs } from "./schema";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { normalRanges } from "@/config/normalRanges";

export default function BMICalculator() {
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BmiInputs>({
    resolver: zodResolver(bmiSchema),
  });

  useEffect(() => {
    const data = getTypedReusePayloadOnce("bmi", bmiSchema);
    if (!data) return;
    reset(data);
  }, [reset]);

  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const onSubmit = (data: BmiInputs) => {
    const bmi = data.weight / (data.height / 100) ** 2;
    const bmiRounded = Math.round(bmi * 10) / 10;
    setResult(bmiRounded.toString());

    saveHistory({
      id: Date.now(),
      typeId: "bmi",
      typeName: "BMI計算",
      inputs: { height: data.height, weight: data.weight },
      result: { bmi: bmiRounded },
      resultSummary: `BMI: ${bmiRounded}`,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">BMI計算</h2>

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

        <SubmitButton color="bg-orange-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="orange"
            results={[
              {
                label: "BMI",
                value: result,
                unit: "",
                range: normalRanges.bmi,
              },
            ]}
            note="※ BMIは目安です。個人差があるため臨床判断と併用してください。"
            typeId="bmi"
          />
        </div>
      )}
    </div>
  );
}
