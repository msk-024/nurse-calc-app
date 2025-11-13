// 酸素投与量計算
"use client";

import { useState, useRef, useEffect } from "react";
import { saveHistory } from "@/lib/history";
import { oxygenDevices } from "@/config/oxygenDevices";
import LabeledInput from "@/app/_components/LabeledInput";
import LabeledSelect from "@/app/_components/LabeledSelect";
import SubmitButton from "@/app/_components/SubmitButton";
import { ResultBox } from "@/app/_components/ResultBox/ResultBox";
import { scrollToRef } from "@/lib/scrollToRef";
import { getTypedReusePayloadOnce } from "@/lib/reuse/reuse";
// import { OxygenInputsSchema } from "@/lib/calculators/oxygenSchema";
import { oxygenSchema } from "./schema";


export default function OxygenCalculator() {
  const [deviceId, setDeviceId] = useState("nasal_cannula");
  const [flow, setFlow] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  // 再利用(Zod)
  useEffect(() => {
    const data = getTypedReusePayloadOnce("oxygen", oxygenSchema);
    if (!data) return;

    setDeviceId(String(data.deviceId));
    if (data.flow != null) setFlow(String(data.flow));
  }, []);

  // 結果レンダー後にスクロール
  useEffect(() => {
    if (result) scrollToRef(resultRef);
  }, [result]);

  const selectedDevice = oxygenDevices.find((d) => d.id === deviceId);

  const calculateFiO2 = () => {
    if (!selectedDevice) {
      alert("デバイスが選択されていません");
      return;
    }

    const flowRate = parseFloat(flow);

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

    // 履歴保存
    saveHistory({
      id: Date.now(),
      typeId: "oxygen",
      typeName: "酸素投与量計算",
      inputs: { deviceId, flow: flowRate },
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
        <div ref={resultRef}>
          <ResultBox
            color="teal"
            results={[{ label: "推定 FiO₂", value: result, unit: "%" }]}
            note={`※ FiO₂の値は代表的な推定値です。\n※ 実際の酸素濃度を保証するものではありません。\n※ 患者の呼吸状態やマスクの装着状態で変動します。`}
            typeId="oxygen"
          />
        </div>
      )}
    </div>
  );
}
