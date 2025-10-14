"use client";

import { useState, useRef, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../../LabeledInput";
import SubmitButton from "../../SubmitButton";
import { ResultBox } from "../../ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce, setReusePayload } from "@/lib/reuse/reuse";
import { isKCorrectionInputs } from "@/lib/guards";
import type { KCorrectionInputs } from "@/types/inputs";
import { normalRanges } from "@/config/normalRanges";

export default function KCorrectionForm() {
  const [k, setK] = useState("");
  const [ph, setPh] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = getTypedReusePayloadOnce<KCorrectionInputs>(
      "electrolyte",
      isKCorrectionInputs,
      "k"
    );
    console.log("K補正: reusePayload取得", data);
    if (!data) return;

    setK(String(data.k));
    setPh(String(data.ph));
  }, []);

  const calculate = () => {
    const measuredK = parseFloat(k);
    const pH = parseFloat(ph);

    if (!measuredK || !pH || measuredK <= 0 || pH <= 0) {
      alert("正しい数値を入力してください");
      return;
    }

    // Katzの式：補正K = 実測K + 0.6 × (7.4 - pH)
    const correctedK = measuredK + 0.6 * (7.4 - pH);
    const formatted = correctedK.toFixed(1);
    setResult(formatted);

    // スクロール
    setTimeout(() => scrollToRef(resultRef), 100);

    const summary = `補正K ${formatted} mEq/L`;

    saveHistory({
      id: Date.now(),
      typeId: "electrolyte",
      sub: "k",
      typeName: "電解質補正",
      inputs: { k: measuredK, ph: pH },
      result: { correctedK: formatted },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });

    setReusePayload({
      typeId: "electrolyte",
      sub: "k",
      inputs: { k: measuredK, ph: pH },
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          label="実測K (mEq/L)"
          type="number"
          value={k}
          onChange={(e) => setK(e.target.value)}
          placeholder="例: 4.2"
        />
        <LabeledInput
          label="pH"
          type="number"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
          placeholder="例: 7.2"
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-cyan-500" />

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="cyan"
            results={[
              {
                label: "補正K",
                value: result,
                unit: "mEq/L",
                range: normalRanges.potassium, // 基準値3.5〜5.0
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
