"use client";

import { useState } from "react";
import Header from "./Header";
import CalcNav from "./CalcNav";
import CalculatorContainer from "./CalculatorContainer";

type Props = {
  activeCalc: string;
};

export default function CalculatorPage({ activeCalc }: Props) {
  const [currentCalc, setCurrentCalc] = useState(activeCalc);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <CalcNav activeCalc={currentCalc} onSelect={setCurrentCalc} />
        <div className="mt-6">
          <CalculatorContainer activeCalc={currentCalc} />
        </div>
      </main>
    </>
  );
}
