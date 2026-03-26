// BMI計算
"use client";

import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { bmiSchema, type BmiInputs } from "./schema";
import { normalRanges } from "@/config/normalRanges";
import { useCalculator } from "@/hooks/useCalculator";

export default function BMICalculator() {
  const { result, setResult, resultRef, register, handleSubmit, errors } =
    useCalculator<BmiInputs>(bmiSchema, "bmi");

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
