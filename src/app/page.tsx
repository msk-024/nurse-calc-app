"use client";
import { useState } from "react";
import Header from "@/app/_components/Header";
import CalcNav from "@/app/_components/CalcNav";
import CalculatorContainer from "@/app/_components/CalculatorContainer";

export default function HomePage() {
  const [activeCalc, setActiveCalc] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto p-4">
        {/* 計算カテゴリボタン一覧 */}
        <CalcNav activeCalc={activeCalc} onSelect={setActiveCalc} />

        {/* 選択した計算機能を表示 */}
        {activeCalc && (
          <div className="mt-6">
            <CalculatorContainer activeCalc={activeCalc} />
          </div>
        )}
      </main>
    </>
  );
}
