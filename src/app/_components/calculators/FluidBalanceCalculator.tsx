"use client";
import { useState } from "react";
import { saveHistory } from "@/lib/history";

export default function FluidBalanceCalculator() {
  const [prevWeight, setPrevWeight] = useState("");
  const [currWeight, setCurrWeight] = useState("");
  const [oralIntake, setOralIntake] = useState("");
  const [ivIntake, setIvIntake] = useState("");
  const [urineOutput, setUrineOutput] = useState("");
  const [otherOutput, setOtherOutput] = useState("");

  const [result, setResult] = useState<null | {
    weightChange: string;
    fluidBalance: string;
    estimatedFluid: string;
    status: string;
  }>(null);

  const calculate = () => {
    const wPrev = parseFloat(prevWeight);
    const wCurr = parseFloat(currWeight);
    const oral = parseFloat(oralIntake) || 0;
    const iv = parseFloat(ivIntake) || 0;
    const urine = parseFloat(urineOutput) || 0;
    const other = parseFloat(otherOutput) || 0;

    if (!wPrev || !wCurr || wPrev <= 0 || wCurr <= 0) {
      alert("体重を正しく入力してください");
      return;
    }

    const weightChange = wCurr - wPrev;
    const totalIntake = oral + iv;
    const totalOutput = urine + other;
    const fluidBalance = totalIntake - totalOutput;
    const estimatedFluid = weightChange * 1000;

    let status = "良好";
    if (fluidBalance > 500 || weightChange > 0.5) status = "過剰傾向";
    else if (fluidBalance < -500 || weightChange < -0.5) status = "不足傾向";

    const calcResult = {
      weightChange: weightChange.toFixed(1),
      fluidBalance: fluidBalance.toFixed(0),
      estimatedFluid: estimatedFluid.toFixed(0),
      status,
    };

    setResult(calcResult);

    const summary = `体重${calcResult.weightChange}kg / 水分${calcResult.fluidBalance}mL (${status})`;

    saveHistory({
      id: Date.now(),
      timestamp: new Date().toLocaleString("ja-JP"),
      typeId: "fluid",
      typeName: "体液バランス計算",
      inputs: { wPrev, wCurr, oral, iv, urine, other },
      result: calcResult,
      resultSummary: summary,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">体液バランス計算</h2>

      {/* 体重 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            前日体重 (kg)
          </label>
          <input
            value={prevWeight}
            onChange={(e) => setPrevWeight(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            当日体重 (kg)
          </label>
          <input
            value={currWeight}
            onChange={(e) => setCurrWeight(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* 摂取量 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            経口摂取 (mL)
          </label>
          <input
            value={oralIntake}
            onChange={(e) => setOralIntake(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">輸液量 (mL)</label>
          <input
            value={ivIntake}
            onChange={(e) => setIvIntake(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* 排出量 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">尿量 (mL)</label>
          <input
            value={urineOutput}
            onChange={(e) => setUrineOutput(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            その他排泄 (mL)
          </label>
          <input
            value={otherOutput}
            onChange={(e) => setOtherOutput(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* 計算ボタン */}
      <button
        onClick={calculate}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        計算する
      </button>

      {result && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded">
          <p>
            ✅ <strong>体重変化:</strong> {result.weightChange} kg
          </p>
          <p>
            ✅ <strong>水分バランス:</strong> {result.fluidBalance} mL
          </p>
          <p>
            ✅ <strong>推定体液変動:</strong> {result.estimatedFluid} mL
          </p>
          <p className="text-orange-700 font-bold">{result.status}</p>
        </div>
      )}
    </div>
  );
}
