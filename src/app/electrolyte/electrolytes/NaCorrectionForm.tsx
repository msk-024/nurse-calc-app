// Na補正計算
"use client";

import { useState, useRef, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "@/app/_components/LabeledInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { naCorrectionSchema } from "./schema";
import { normalRanges } from "@/config/normalRanges";

export default function NaCorrectionForm() {
  const [na, setNa] = useState("");
  const [glucose, setGlucose] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  // 再利用（Zod＋sub="na"）
  useEffect(() => {
    const data = getTypedReusePayloadOnce(
      "electrolyte", // typeId
      naCorrectionSchema, // スキーマ
      "na" // sub
    );

    if (!data) return;

    setNa(String(data.na));
    setGlucose(String(data.glucose));
  }, []);

  // 結果レンダー後にスクロール（setTimeout不要）
  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const calculate = () => {
    const measuredNa = parseFloat(na);
    const glucoseLevel = parseFloat(glucose);

    if (
      isNaN(measuredNa) ||
      isNaN(glucoseLevel) ||
      measuredNa <= 0 ||
      glucoseLevel <= 0
    ) {
      alert("正しい数値を入力してください");
      return;
    }

    // Katzの式: 補正Na = 測定Na + 0.016 × (血糖値 - 100)
    const correctedNa = measuredNa + 0.016 * (glucoseLevel - 100);
    const formatted = correctedNa.toFixed(2);

    setResult(formatted);

    const summary = `補正Na ${formatted} mEq/L`;

    // 履歴保存
    saveHistory({
      id: Date.now(),
      typeId: "electrolyte",
      sub: "na",
      typeName: "電解質補正",
      inputs: { na: measuredNa, glucose: glucoseLevel },
      result: { correctedNa: formatted },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          label="測定Na (mEq/L)"
          type="number"
          value={na}
          onChange={(e) => setNa(e.target.value)}
          placeholder="例: 130"
        />
        <LabeledInput
          label="血糖値 (mg/dL)"
          type="number"
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
          placeholder="例: 300"
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-cyan-500" />

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
