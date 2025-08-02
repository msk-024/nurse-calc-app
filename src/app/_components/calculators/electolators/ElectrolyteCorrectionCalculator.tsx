"use client";
import { useState } from "react";
import NaCorrectionForm from "./NaCorrectionForm";
import KCorrectionForm from "./KCorrectionForm";

export default function ElectrolyteCorrectionCalculator() {
  const [tab, setTab] = useState<"na" | "k">("na");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-2">電解質補正計算</h2>

      {/* タブ切り替え */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            tab === "na" ? "bg-cyan-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("na")}
        >
          Na補正
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "k" ? "bg-cyan-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("k")}
        >
          K補正
        </button>
      </div>

      {/* タブ表示切替 */}
      {tab === "na" && <NaCorrectionForm />}
      {tab === "k" && <KCorrectionForm />}
    </div>
  );
}
