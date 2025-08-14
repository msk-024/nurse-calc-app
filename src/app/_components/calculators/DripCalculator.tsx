// 点滴計算
"use client";

import { useState,useEffect } from "react";
import { saveHistory } from "@/lib/history";
import LabeledInput from "../LabeledInput";
import LabeledSelect from "../LabeledSelect";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";
import { getReusePayloadOnce,clearReusePayload } from "@/lib/reuse";
import { isDripInputs } from "@/lib/guards";

export default function DripCalculator() {
  const [volume, setVolume] = useState("");
  const [hours, setHours] = useState("");
  const [dropFactor, setDropFactor] = useState("20"); // デフォルト20滴/mL
  const [result, setResult] = useState<null | {
    mlPerHour: string;
    dropsPerMin: string;
  }>(null);

    useEffect(()=>{
      const payload =getReusePayloadOnce();
      if(payload?.typeId==="drip" && isDripInputs(payload.inputs)){
        const { volume,hours,dropFactor}=payload.inputs;
        setVolume(String(volume));
        setHours(String(hours));
        setDropFactor(String(dropFactor));
        clearReusePayload();
      }
    },[]);

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
        <LabeledInput
          label="総輸液量 (mL)"
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder="500"
        />

        <LabeledInput
          label="投与時間 (時間)"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="8"
        />
        <LabeledSelect
          label="滴下係数"
          value={dropFactor}
          onChange={(e) => setDropFactor(e.target.value)}
          options={[
            { value: "10", label: "10 滴/mL" },
            { value: "15", label: "15 滴/mL" },
            { value: "20", label: "20 滴/mL" },
            { value: "60", label: "60 滴/mL" },
          ]}
        />
      </div>

      {/* 計算ボタン */}
      <SubmitButton onClick={calculate} color="bg-blue-500" />

      {/* 結果表示 */}
      {result && (
        <ResultBox
          color="blue"
          results={[
            { label: "輸液速度", value: result.mlPerHour, unit: "mL/時" },
            { label: "滴下数", value: result.dropsPerMin, unit: "滴/分" },
          ]}
        />
      )}
    </div>
  );
}
