// 電解質補正(Na)計算
"use client";

import { useState } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";

export default function ElectrolyteCorrectionCalculator() {
  const [na, setNa] = useState("");
  const [glucose, setGlucose] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const measuredNa = parseFloat(na);
    const glucoseLevel = parseFloat(glucose);

    if (!measuredNa || !glucoseLevel || measuredNa <= 0 || glucoseLevel <= 0) {
      alert("正しい数値を入力してください");
      return;
    }

    const correctedNa = measuredNa + 0.016 * (glucoseLevel - 100);
    const formatted = correctedNa.toFixed(2);
    setResult(formatted);

    const summary = `補正Na ${formatted} mEq/L`;

    saveHistory({
      id: Date.now(),
      typeId: "electrolyte",
      typeName: "電解質補正",
      inputs: { measuredNa, glucoseLevel },
      result: { correctedNa: formatted },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">電解質補正（ナトリウム）</h2>

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
        <ResultBox
          color="cyan"
          results={[{ label: "補正Na", value: result, unit: "mEq/L" }]}
          note="※ Katzの式：補正Na = 測定Na + 0.016 × (血糖値 - 100)"
        />
      )}
    </div>
  );
}
