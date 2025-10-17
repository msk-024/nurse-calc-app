"use client";

import { useState } from "react";
import Header from "@/app/_components/Header";
import CalcNav from "@/app/_components/CalcNav/CalcNav";
import CalculatorContainer from "@/app/_components/CalculatorContainer";
import OnboardingModal from "@/app/_components/onboarding/OnboardingModal"; 

export default function HomePage() {
  const [activeCalc, setActiveCalc] = useState<string | null>(null);

  // 並び替え状態をここで管理
  const [editMode, setEditMode] = useState(false);

  // 並び替えトグル関数（HeaderとCalcNav両方に渡す）
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      {/* 初回オンボーディングモーダル */}
      <OnboardingModal />
      {/* editMode を Header に渡す */}
      <Header editMode={editMode} onToggleEdit={toggleEditMode} />

      <main className="max-w-6xl mx-auto p-4">
        {/* editMode を CalcNav にも渡す */}
        <CalcNav
          activeCalc={activeCalc}
          onSelect={setActiveCalc}
          editMode={editMode}
          onToggleEdit={toggleEditMode}
        />

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
