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
import { kCorrectionSchema, type KCorrectionInputs } from "./schema";
import { normalRanges } from "@/config/normalRanges";

export default function KCorrectionForm() {
  const [result, setResult] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<KCorrectionInputs>({
    resolver: zodResolver(kCorrectionSchema),
  });

  useEffect(() => {
    const data = getTypedReusePayloadOnce("electrolyte", kCorrectionSchema, "k");
    if (!data) return;
    reset(data);
  }, [reset]);

  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const onSubmit = (data: KCorrectionInputs) => {
    // Katzの式：補正K = 実測K + 0.6 × (7.4 - pH)
    const correctedK = data.k + 0.6 * (7.4 - data.ph);
    const formatted = correctedK.toFixed(1);

    setResult(formatted);

    const summary = `補正K ${formatted} mEq/L`;

    saveHistory({
      id: Date.now(),
      typeId: "electrolyte",
      sub: "k",
      typeName: "電解質補正",
      inputs: { k: data.k, ph: data.ph },
      result: { correctedK: formatted },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput
            label="実測K (mEq/L)"
            type="number"
            placeholder="例: 4.2"
            error={errors.k?.message}
            {...register("k")}
          />
          <LabeledInput
            label="pH"
            type="number"
            placeholder="例: 7.2"
            error={errors.ph?.message}
            {...register("ph")}
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
                label: "補正K",
                value: result,
                unit: "mEq/L",
                range: normalRanges.potassium,
              },
            ]}
            note="※ Katzの式：補正K = 実測K + 0.6 × (7.4 - pH)"
            typeId="electrolyte-k"
          />
        </div>
      )}
    </div>
  );
}
