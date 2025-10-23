// 輸血計算
"use client";

import { useState, useEffect, useRef } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { isTransfusionInputs } from "@/lib/guards";
import type { TransfusionInputs } from "@/types/inputs";

export default function TransfusionCalculator() {
  const [weight, setWeight] = useState("");
  const [currentHb, setCurrentHb] = useState("");
  const [targetHb, setTargetHb] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = getTypedReusePayloadOnce<TransfusionInputs>(
      "transfusion",
      isTransfusionInputs
    );
    if (!data) return;
    const { weight, currentHb, targetHb } = data;
    setWeight(String(weight));
    setCurrentHb(String(currentHb));
    setTargetHb(String(targetHb));
  }, []);

  const calculate = () => {
    const w = parseFloat(weight);
    const chb = parseFloat(currentHb);
    const thb = parseFloat(targetHb);

    if (
      isNaN(w) ||
      isNaN(chb) ||
      isNaN(thb) ||
      w <= 0 ||
      chb <= 0 ||
      thb <= chb
    ) {
      alert("正しい数値を入力してください（目標Hbは現在Hbより高く）");
      return;
    }

    const units = ((thb - chb) * w * 0.3) / 200;
    const roundedUnits = Math.ceil(units); // 繰り上げで表示
    setResult(roundedUnits.toString());
    // スクロール
    setTimeout(() => scrollToRef(resultRef), 100);

    const summary = `RCC輸血 単位数: ${roundedUnits} 単位`;

    saveHistory({
      id: Date.now(),
      typeId: "transfusion",
      typeName: "輸血量計算",
      inputs: { weight: w, currentHb: chb, targetHb: thb },
      result: { units: roundedUnits },
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">RCC輸血 単位数計算</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LabeledInput
          label="体重 (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="例: 60"
        />
        <LabeledInput
          label="現在のHb (g/dL)"
          type="number"
          value={currentHb}
          onChange={(e) => setCurrentHb(e.target.value)}
          placeholder="例: 7.0"
        />
        <LabeledInput
          label="目標Hb (g/dL)"
          type="number"
          value={targetHb}
          onChange={(e) => setTargetHb(e.target.value)}
          placeholder="例: 10.0"
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-rose-500" />

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="rose"
            results={[{ label: "推定単位数", value: result, unit: "単位" }]}
            note={`※ 本計算は赤血球濃厚液（RCC）を対象としています。\n※ 実際の輸血適応は臨床判断により決定されます。`}
            typeId="transfusion"
          />
        </div>
      )}
    </div>
  );
}
