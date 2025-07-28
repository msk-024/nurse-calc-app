"use client";

import { useState } from "react";
import { saveHistory } from "@/lib/history";
import { nutritionFactors } from "@/config/nutritionFactors";
import type { PatientCondition } from "@/types/patient";
import LabeledInput from "../LabeledInput";
import LabeledSelect from "../LabeledSelect";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";

export default function NutritionCalculator() {
  const [weight, setWeight] = useState("");
  const [condition, setCondition] = useState<PatientCondition>("normal");
  const [result, setResult] = useState<null | {
    calorie: string;
    protein: string;
    water: string;
  }>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) {
      alert("正しい体重を入力してください");
      return;
    }

    const factor = nutritionFactors[condition];

    const resultData = {
      calorie: (w * factor.energy).toFixed(1),
      protein: (w * factor.protein).toFixed(1),
      water: (w * factor.water).toFixed(1),
    };

    setResult(resultData);

    const summary = `エネルギー ${resultData.calorie} kcal / タンパク質 ${resultData.protein} g / 水分量 ${resultData.water} mL`;

    saveHistory({
      id: Date.now(),
      typeId: "nutrition",
      typeName: "栄養計算",
      inputs: { weight: w, condition },
      result: resultData,
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">栄養計算</h2>

      <div className="grid grid-cols-1 gap-4">
        <LabeledInput
          label="体重 (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="例: 60"
        />

        <LabeledSelect
          label="患者の状態"
          value={condition}
          onChange={(e) => setCondition(e.target.value as PatientCondition)}
          options={[
            { value: "normal", label: "通常成人" },
            { value: "elderly", label: "高齢者" },
            { value: "bedsore", label: "褥瘡あり" },
            { value: "postoperative", label: "術後" },
            { value: "burn", label: "熱傷" },
            { value: "critical", label: "重症" },
          ]}
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-purple-500" />

      {result && (
        <ResultBox
          color="purple"
          results={[
            { label: "エネルギー", value: result.calorie, unit: "kcal" },
            { label: "タンパク質", value: result.protein, unit: "g" },
            { label: "水分量", value: result.water, unit: "mL" },
          ]}
        />
      )}
    </div>
  );
}
