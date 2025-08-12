// 酸素投与量計算
"use client";

import { useState,useEffect } from "react";
import { saveHistory } from "@/lib/history";
import { oxygenDevices } from "@/config/oxygenDevices";
import LabeledInput from "../LabeledInput";
import LabeledSelect from "../LabeledSelect";
import SubmitButton from "../SubmitButton";
import { ResultBox } from "../ResultBox";
import { getReusePayload,clearReusePayload } from "@/lib/reuse";
import { isOxygenInputs } from "@/lib/guards";

export default function OxygenCalculator() {
    const [deviceId, setDeviceId] = useState("nasal_cannula");
    const [flow, setFlow] = useState("");
    const [result, setResult] = useState<string | null>(null);

  useEffect(()=>{
    const payload =getReusePayload();
    if(payload?.typeId==="oxygen" && isOxygenInputs(payload.inputs)){
      const {deviceId,flow}=payload.inputs;
      setDeviceId(String(deviceId));
      setFlow(String(flow));
      clearReusePayload();
    }
  },[]);

    const selectedDevice = oxygenDevices.find((d) => d.id === deviceId);

    const calculateFiO2 = () => {
        const flowRate = parseFloat(flow);
        if (!selectedDevice) {
            alert("デバイスが選択されていません");
        return;
        }

    let fiO2: number;

    if (selectedDevice.estimateFiO2Function && flow) {
            fiO2 = selectedDevice.estimateFiO2Function(flowRate);
        } else if (selectedDevice.estimatedFiO2 !== undefined) {
            fiO2 = selectedDevice.estimatedFiO2;
        } else {
            alert("このデバイスには FiO₂ 推定方法が定義されていません");
        return;
    }

    setResult(fiO2.toFixed(0));

    // ✅ 履歴に保存
    saveHistory({
      id: Date.now(),
      typeId: "oxygen",
      typeName: "酸素投与量計算",
      inputs: { device: selectedDevice.name, flow: flowRate || "未入力" },
      result: { fio2: fiO2.toFixed(0) },
      resultSummary: `推定FiO₂: ${fiO2.toFixed(0)}%`,
      timestamp: new Date().toLocaleString("ja-JP"),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">酸素投与量計算</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledSelect
          label="デバイスを選択"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          options={oxygenDevices.map((d) => ({
            value: d.id,
            label: d.name,
          }))}
        />
        {/* 室内気は流量入力不要 */}
        {deviceId !== "room_air" && (
          <LabeledInput
            label="流量 (L/min)"
            type="number"
            value={flow}
            onChange={(e) => setFlow(e.target.value)}
            placeholder="例: 2"
          />
        )}
      </div>
      <SubmitButton onClick={calculateFiO2} color="bg-teal-500" />
      {result && (
        <ResultBox
          color="teal"
          results={[{ label: "推定 FiO₂", value: result, unit: "%" }]}
          note={`※ FiO₂の値は代表的な推定値です。\n※ 実際の酸素濃度を保証するものではありません。目安としてご使用ください。\n ※ 患者の呼吸状態やマスクのフィット感により変動します。`}
        />
      )}
    </div>
  );
}
