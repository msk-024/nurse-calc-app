"use client";

import { useState, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";
import { getTypedReusePayloadOnce } from "@/lib/reuse";
import { isMedicationInputs } from "@/lib/guards";
import type { MedicationInputs } from "@/types/inputs";
// import { calculators } from "@/config/calculators";

export default function MedicationCalculator() {
  const [weight, setWeight] = useState(""); // 体重 (kg)
  const [dose, setDose] = useState(""); // 投与量 (mg/kg)
  const [concentration, setConcentration] = useState(""); // 濃度 (mg/mL)
  const [result, setResult] = useState<{
    totalDose: string;
    volume: string;
  } | null>(null);

  useEffect(() => {
    const data = getTypedReusePayloadOnce<MedicationInputs>(
      "medication",
      isMedicationInputs
    );
    if (!data) return;
    setWeight(String(data.weight));
    setDose(String(data.dose));
    setConcentration(String(data.concentration));
  }, []);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(dose);
    const c = parseFloat(concentration);

    if (!w || !d || !c || w <= 0 || d <= 0 || c <= 0) {
      alert("正しい値を入力してください");
      return;
    }

    const totalDose = w * d;
    const volume = totalDose / c;

    const calcResult = {
      totalDose: totalDose.toFixed(2),
      volume: volume.toFixed(2),
    };

    setResult(calcResult);

    const summary = `総投与量 ${calcResult.totalDose}mg・薬液量 ${calcResult.volume}mL`;

    saveHistory({
      id: Date.now(),
      timestamp: new Date().toLocaleString("ja-JP"),
      typeId: "medication",
      typeName: "投薬計算",
      inputs: { weight: w, dose: d, concentration: c },
      result: calcResult,
      resultSummary: summary,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <LabeledInput
          label="体重 (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="例: 60"
        />
        <LabeledInput
          label="投与量 (mg/kg)"
          type="number"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
          placeholder="例: 5"
        />
        <LabeledInput
          label="濃度 (mg/mL)"
          type="number"
          value={concentration}
          onChange={(e) => setConcentration(e.target.value)}
          placeholder="例: 10"
        />
      </div>

      <SubmitButton onClick={calculate} color="bg-yellow-500" />

      {result && (
        <ResultBox
          color="yellow"
          results={[
            { label: "総投与量", value: result.totalDose, unit: "mg" },
            { label: "薬液量", value: result.volume, unit: "mL" },
          ]}
        />
      )}
    </div>
  );
}
