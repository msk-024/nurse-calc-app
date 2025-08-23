"use client";

import Header from "./Header";
import CalcNav from "./CalcNav";
import CalculatorContainer from "./CalculatorContainer";

type Props = {
  activeCalc: string;
};

export default function CalculatorPage({ activeCalc }: Props) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        {/* 計算ボタンナビゲーション（押せないようにする） */}
        <CalcNav activeCalc={activeCalc} onSelect={() => {}} />

        {/* 対象の計算機コンポーネントだけ表示 */}
        <div className="mt-6">
          <CalculatorContainer activeCalc={activeCalc} />
        </div>
      </main>
    </>
  );
}
