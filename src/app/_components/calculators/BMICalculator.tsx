"use client";

import { useState, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { isBmiInputs } from "@/lib/guards";
import type { BmiInputs } from "@/types/inputs";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const data = getTypedReusePayloadOnce<BmiInputs>("bmi", isBmiInputs);
    if (!data) return;

    setHeight(String(data.height));
    setWeight(String(data.weight));
  }, []);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      alert("正しい身長と体重を入力してください");
      return;
    }

    const bmi = w / (h / 100) ** 2;
    const bmiRounded = Math.floor(bmi);
    setResult(bmiRounded.toString());

    saveHistory({
      id: Date.now(),
      typeId: "bmi",
      typeName: "BMI計算",
      inputs: { height: h, weight: w },
      result: { bmi: bmiRounded },
      resultSummary: `BMI: ${bmiRounded}`,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">BMI計算</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          label="身長 (cm)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="例: 160"
        />
        <LabeledInput
          label="体重 (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="例: 60"
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-orange-500" />

      {result && (
        <ResultBox
          color="orange"
          results={[{ label: "BMI", value: result, unit: "" }]}
          note="※ BMIは目安です。個人差があるため臨床判断と併用してください。"
          typeId="bmi"
        />
      )}
    </div>
  );
}
