"use client";

import { useState } from "react";
import { saveHistory } from "@/lib/history";

export default function DripCalculator() {
  const [volume, setVolume] = useState("");
  const [hours, setHours] = useState("");
  const [dropFactor, setDropFactor] = useState("20"); // デフォルト20滴/mL
  const [result, setResult] = useState<null | {
    mlPerHour: string;
    dropsPerMin: string;
  }>(null);

  const calculate = () => {
    const v = parseFloat(volume);
    const h = parseFloat(hours);
    const df = parseFloat(dropFactor);

    if (isNaN(v) || isNaN(h) || isNaN(df) || v <= 0 || h <= 0 || df <= 0) {
      alert("正しい数値を入力してください");
      return;
    }

    const mlPerHour = v / h;
    const dropsPerMin = (mlPerHour * df) / 60;

    const newResult = {
      mlPerHour: mlPerHour.toFixed(1),
      dropsPerMin: dropsPerMin.toFixed(0),
    };

    setResult(newResult);

    const summary = `輸液速度 ${newResult.mlPerHour} mL/時・滴下数 ${newResult.dropsPerMin}滴/分`;

    saveHistory({
      id: Date.now(),
      typeId: "drip",
      typeName: "点滴速度計算",
      inputs: { volume: v, hours: h, dropFactor: df },
      result: newResult,
      resultSummary: summary,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">点滴速度計算</h2>

      {/* 入力フォーム */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            総輸液量 (mL)
          </label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            投与時間 (時間)
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">滴下係数</label>
          <select
            value={dropFactor}
            onChange={(e) => setDropFactor(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="10">10 滴/mL</option>
            <option value="15">15 滴/mL</option>
            <option value="20">20 滴/mL</option>
            <option value="60">60 滴/mL</option>
          </select>
        </div>
      </div>

      {/* 計算ボタン */}
      <button
        onClick={calculate}
        className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
      >
        計算する
      </button>

      {/* 結果表示 */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <h3 className="font-semibold text-green-800">計算結果</h3>
          <p>
            輸液速度:{" "}
            <span className="font-bold">{result.mlPerHour} mL/時</span>
          </p>
          <p>
            滴下数:{" "}
            <span className="font-bold">{result.dropsPerMin} 滴/分</span>
          </p>
          <p className="text-xs text-green-600 mt-2">
            ※ 実際の滴下数は15秒間の滴下数×4で確認してください
          </p>
        </div>
      )}
    </div>
  );
}
