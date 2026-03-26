// 投薬計算
"use client";

import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { medicationSchema, type MedicationInputs } from "./schema";
import { useCalculator } from "@/hooks/useCalculator";

export default function MedicationCalculator() {
  const { result, setResult, resultRef, register, handleSubmit, errors } =
    useCalculator<MedicationInputs>(medicationSchema, "medication");

  const onSubmit = (data: MedicationInputs) => {
    const totalDose = data.weight * data.dose;
    const volume = totalDose / data.concentration;

    const calcResult = {
      totalDose: totalDose.toFixed(2),
      volume: volume.toFixed(2),
    };

    setResult(calcResult);

    const summary = `総投与量 ${calcResult.totalDose}mg・薬液量 ${calcResult.volume}mL`;

    saveHistory({
      id: Date.now(),
      timestamp: new Date().toLocaleString("ja-JP"),
      typeId: "medication",
      typeName: "投薬計算",
      inputs: {
        weight: data.weight,
        dose: data.dose,
        concentration: data.concentration,
      },
      result: calcResult,
      resultSummary: summary,
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <LabeledInput
            label="体重 (kg)"
            type="number"
            placeholder="例: 60"
            error={errors.weight?.message}
            {...register("weight")}
          />
          <LabeledInput
            label="投与量 (mg/kg)"
            type="number"
            placeholder="例: 5"
            error={errors.dose?.message}
            {...register("dose")}
          />
          <LabeledInput
            label="濃度 (mg/mL)"
            type="number"
            placeholder="例: 10"
            error={errors.concentration?.message}
            {...register("concentration")}
          />
        </div>

        <SubmitButton color="bg-yellow-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="yellow"
            results={[
              { label: "総投与量", value: result.totalDose, unit: "mg" },
              { label: "薬液量", value: result.volume, unit: "mL" },
            ]}
            typeId="medication"
          />
        </div>
      )}
    </div>
  );
}
