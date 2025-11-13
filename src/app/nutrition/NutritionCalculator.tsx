// 栄養計算
"use client";

import { useState, useRef, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import { nutritionFactors } from "@/config/nutritionFactors";
import type { PatientCondition } from "@/types/patient";
import LabeledInput from "@/app/_components/LabeledInput";
import LabeledSelect from "@/app/_components/LabeledSelect";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { patientConditions } from "@/config/patientConditions";
// import { NutritionInputsSchema } from "@/lib/calculators/nutritionSchema";
import { nutritionSchema } from "./schema";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";

export default function NutritionCalculator() {
  const [weight, setWeight] = useState("");
  const [condition, setCondition] = useState<PatientCondition>("normal");

  const [result, setResult] = useState<null | {
    calorie: string;
    protein: string;
    water: string;
  }>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  // 再利用データ復元（Zod）
  useEffect(() => {
    const data = getTypedReusePayloadOnce("nutrition", nutritionSchema);
    if (!data) return;

    setWeight(String(data.weight));
    setCondition(data.condition as PatientCondition);
  }, []);

  // 結果レンダー後に確実にスクロール
  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

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
          options={patientConditions}
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-amber-500" />

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="amber"
            results={[
              { label: "エネルギー", value: result.calorie, unit: "kcal" },
              { label: "タンパク質", value: result.protein, unit: "g" },
              { label: "水分量", value: result.water, unit: "mL" },
            ]}
            note="※ 推定値です。実際の栄養管理は医師・栄養士の指示に従ってください。"
            typeId="nutrition"
          />

          {(condition === "burn" || condition === "critical") && (
            <p className="text-sm text-red-600">
              ※ 注意：{condition === "burn" ? "熱傷" : "重症"}患者では
              状態に応じた調整が必要です。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
