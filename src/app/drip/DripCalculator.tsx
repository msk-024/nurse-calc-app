// 点滴計算
"use client";

import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import LabeledSelect from "@/app/_components/LabeledSelect";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { dripSchema, type DripInputs } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodTypeAny } from "zod";
import { useRef, useEffect, useState } from "react";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { scrollToRef } from "@/lib/scrollToRef";

export default function DripCalculator() {
  const [result, setResult] = useState<null | {
    mlPerHour: string;
    dropsPerMin: string;
  }>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DripInputs>({
    resolver: zodResolver(dripSchema as ZodTypeAny),
    defaultValues: { dropFactor: 20 },
  });

  useEffect(() => {
    const data = getTypedReusePayloadOnce("drip", dripSchema);
    if (!data) return;
    reset(data);
  }, [reset]);

  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const onSubmit = (data: DripInputs) => {
    const mlPerHour = data.volume / data.hours;
    const dropsPerMin = (mlPerHour * data.dropFactor) / 60;

    const newResult = {
      mlPerHour: mlPerHour.toFixed(1),
      dropsPerMin: dropsPerMin.toFixed(0),
    };

    setResult(newResult);

    const summary = `輸液速度 ${newResult.mlPerHour} mL/時・滴下数 ${newResult.dropsPerMin}滴/分`;

    saveHistory({
      id: Date.now(),
      typeId: "drip",
      typeName: "点滴速度計算",
      inputs: {
        volume: data.volume,
        hours: data.hours,
        dropFactor: data.dropFactor,
      },
      result: newResult,
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">点滴速度計算</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LabeledInput
            label="総輸液量 (mL)"
            type="number"
            placeholder="500"
            error={errors.volume?.message}
            {...register("volume")}
          />

          <LabeledInput
            label="投与時間 (時間)"
            type="number"
            placeholder="8"
            error={errors.hours?.message}
            {...register("hours")}
          />

          <LabeledSelect
            label="滴下係数"
            options={[
              { value: "10", label: "10 滴/mL" },
              { value: "15", label: "15 滴/mL" },
              { value: "20", label: "20 滴/mL" },
              { value: "60", label: "60 滴/mL" },
            ]}
            error={errors.dropFactor?.message}
            {...register("dropFactor")}
          />
        </div>

        <SubmitButton color="bg-blue-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="blue"
            results={[
              { label: "輸液速度", value: result.mlPerHour, unit: "mL/時" },
              { label: "滴下数", value: result.dropsPerMin, unit: "滴/分" },
            ]}
            typeId="drip"
          />
        </div>
      )}
    </div>
  );
}
