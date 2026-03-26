// Na補正計算
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { naCorrectionSchema, type NaCorrectionInputs } from "./schema";
import { normalRanges } from "@/config/normalRanges";

export default function NaCorrectionForm() {
  const [result, setResult] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NaCorrectionInputs>({
    resolver: zodResolver(naCorrectionSchema),
  });

  useEffect(() => {
    const data = getTypedReusePayloadOnce("electrolyte", naCorrectionSchema, "na");
    if (!data) return;
    reset(data);
  }, [reset]);

  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const onSubmit = (data: NaCorrectionInputs) => {
    // Katzの式: 補正Na = 測定Na + 0.016 × (血糖値 - 100)
    const correctedNa = data.na + 0.016 * (data.glucose - 100);
    const formatted = correctedNa.toFixed(2);

    setResult(formatted);

    const summary = `補正Na ${formatted} mEq/L`;

    saveHistory({
      id: Date.now(),
      typeId: "electrolyte",
      sub: "na",
      typeName: "電解質補正",
      inputs: { na: data.na, glucose: data.glucose },
      result: { correctedNa: formatted },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput
            label="測定Na (mEq/L)"
            type="number"
            placeholder="例: 130"
            error={errors.na?.message}
            {...register("na")}
          />
          <LabeledInput
            label="血糖値 (mg/dL)"
            type="number"
            placeholder="例: 300"
            error={errors.glucose?.message}
            {...register("glucose")}
          />
        </div>

        <SubmitButton color="bg-cyan-500" />
      </form>

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="cyan"
            results={[
              {
                label: "補正Na",
                value: result,
                unit: "mEq/L",
                range: normalRanges.sodium,
              },
            ]}
            note="※ Katzの式：補正Na = 測定Na + 0.016 × (血糖値 - 100)"
            typeId="electrolyte-na"
          />
        </div>
      )}
    </div>
  );
}
