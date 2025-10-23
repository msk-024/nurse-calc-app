// 体表面積
"use client";

import { useState, useRef, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { isBsaInputs } from "@/lib/guards";
import type { BsaInputs } from "@/types/inputs";

export default function BsaCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = getTypedReusePayloadOnce<BsaInputs>("bsa", isBsaInputs);
    if (!data) return;
    setHeight(String(data.height));
    setWeight(String(data.weight));
  }, []);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      alert("正しい数値を入力してください");
      return;
    }

    // Mosteller式: BSA = √[(身長(cm) × 体重(kg)) / 3600]
    const bsa = Math.sqrt((h * w) / 3600);
    const formattedBsa = bsa.toFixed(2);
    setResult(formattedBsa);

    // スクロール
    setTimeout(() => scrollToRef(resultRef), 100);

    // ✅ 履歴に保存
    saveHistory({
      id: Date.now(),
      typeId: "bsa",
      typeName: "体表面積計算",
      inputs: { height: h, weight: w },
      result: { bsa: formattedBsa },
      resultSummary: `体表面積 ${formattedBsa} m²`,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">体表面積計算</h2>

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

      <SubmitButton onClick={calculate} color="bg-purple-500" />

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="purple"
            results={[{ label: "体表面積", value: result, unit: "m²" }]}
            note="※ 使用式: Mosteller式 √(身長×体重 ÷ 3600)"
            typeId="bsa"
          />
        </div>
      )}
    </div>
  );
}
