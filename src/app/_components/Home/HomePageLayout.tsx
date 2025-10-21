// メインUI構造（Header / CalcNav / Container）

"use client";

import Header from "@/app/_components/Header";
import CalcNav from "@/app/_components/CalcNav/CalcNav";
import CalculatorContainer from "@/app/_components/CalculatorContainer";

type Props = {
  activeCalc: string | null;
  setActiveCalc: (id: string | null) => void;
  editMode: boolean;
  toggleEditMode: () => void;
};

export default function HomePageLayout({
  activeCalc,
  setActiveCalc,
  editMode,
  toggleEditMode,
}: Props) {
  return (
    <>
      <Header editMode={editMode} onToggleEdit={toggleEditMode} />

      <main className="max-w-6xl mx-auto p-4">
        <CalcNav
          activeCalc={activeCalc}
          onSelect={setActiveCalc}
          editMode={editMode}
          onToggleEdit={toggleEditMode}
        />

        {activeCalc && (
          <div className="mt-6">
            <CalculatorContainer activeCalc={activeCalc} />
          </div>
        )}
      </main>
    </>
  );
}
