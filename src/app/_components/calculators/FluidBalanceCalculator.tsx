// 体液計算
"use client";
import { useState, useRef, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
import { isFluidInputs } from "@/lib/guards";
import type { FluidInputs } from "@/types/inputs";

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
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = getTypedReusePayloadOnce<FluidInputs>("fluid", isFluidInputs);
    if (!data) return;

    const {
      prevWeight,
      currWeight,
      oralIntake,
      ivIntake,
      urineOutput,
      otherOutput,
    } = data;

    setPrevWeight(String(prevWeight));
    setCurrWeight(String(currWeight));
    if (oralIntake != null) setOralIntake(String(oralIntake));
    if (ivIntake != null) setIvIntake(String(ivIntake));
    if (urineOutput != null) setUrineOutput(String(urineOutput));
    if (otherOutput != null) setOtherOutput(String(otherOutput));
  }, []);

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

    // スクロール
    setTimeout(() => scrollToRef(resultRef), 100);

    const summary = `体重${calcResult.weightChange}kg / 水分${calcResult.fluidBalance}mL (${status})`;

    saveHistory({
      id: Date.now(),
      timestamp: new Date().toLocaleString("ja-JP"),
      typeId: "fluid",
      typeName: "体液バランス計算",
      inputs: {
        prevWeight: wPrev,
        currWeight: wCurr,
        oralIntake: oral,
        ivIntake: iv,
        urineOutput: urine,
        otherOutput: other,
      },
      result: calcResult,
      resultSummary: summary,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">体液バランス計算</h2>

      {/* 体重 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          label="前日体重 (kg)"
          type="number"
          value={prevWeight}
          onChange={(e) => setPrevWeight(e.target.value)}
          placeholder="例: 60"
        />
        <LabeledInput
          label="当日体重 (kg)"
          type="number"
          value={currWeight}
          onChange={(e) => setCurrWeight(e.target.value)}
          placeholder="例: 60.5"
        />
      </div>

      {/* 摂取量 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          label="経口摂取 (mL)"
          type="number"
          value={oralIntake}
          onChange={(e) => setOralIntake(e.target.value)}
          placeholder="例: 1200"
        />
        <LabeledInput
          label="輸液量 (mL)"
          type="number"
          value={ivIntake}
          onChange={(e) => setIvIntake(e.target.value)}
          placeholder="例: 500"
        />
      </div>

      {/* 排出量 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput
          label="尿量 (mL)"
          type="number"
          value={urineOutput}
          onChange={(e) => setUrineOutput(e.target.value)}
          placeholder="例: 1000"
        />
        <LabeledInput
          label="その他排泄 (mL)"
          type="number"
          value={otherOutput}
          onChange={(e) => setOtherOutput(e.target.value)}
          placeholder="例: 200"
        />
      </div>

      {/* 計算ボタン */}
      <SubmitButton onClick={calculate} color="bg-green-500" />

      {result && (
        <div ref={resultRef}>
          <ResultBox
            color="green"
            results={[
              { label: "体重変化", value: result.weightChange, unit: "kg" },
              { label: "水分バランス", value: result.fluidBalance, unit: "mL" },
              {
                label: "推定体液変動",
                value: result.estimatedFluid,
                unit: "mL",
              },
              { label: "評価", value: result.status, unit: "" },
            ]}
            typeId="fluid"
          />
        </div>
      )}
    </div>
  );
}
