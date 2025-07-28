"use client";

import { useState } from "react";
import { saveHistory } from "@/lib/history";

export default function MedicationCalculator() {
  const [weight, setWeight] = useState(""); // 体重 (kg)
  const [dose, setDose] = useState(""); // 投与量 (mg/kg)
  const [concentration, setConcentration] = useState(""); // 濃度 (mg/mL)
  const [result, setResult] = useState<{
    totalDose: string;
    volume: string;
  } | null>(null);

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

    // ✅ 履歴用の簡易サマリー
    const summary = `総投与量 ${calcResult.totalDose}mg・薬液量 ${calcResult.volume}mL`;

    // ✅ 統一フォーマットで履歴保存
    saveHistory({
      id: Date.now(),
      timestamp: new Date().toLocaleString("ja-JP"),
      typeId: "medication",
      typeName: "投薬計算",
      inputs: { weight: w, dose: d, concentration: c }, // ✅ 入力値
      result: calcResult, // ✅ 計算結果
      resultSummary: summary, // ✅ 履歴リスト用
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">体重 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="例: 60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            投与量 (mg/kg)
          </label>
          <input
            type="number"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="例: 5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">濃度 (mg/mL)</label>
          <input
            type="number"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="例: 10"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        計算する
      </button>

      {result && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <p>
            ✅ <strong>総投与量:</strong> {result.totalDose} mg
          </p>
          <p>
            ✅ <strong>必要薬液量:</strong> {result.volume} mL
          </p>
          <p className="mt-2 text-xs text-blue-600">
            ※ 計算結果は必ず医師の指示と照合してください
          </p>
        </div>
      )}
    </div>
  );
}
