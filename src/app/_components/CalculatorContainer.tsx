// ボタン選択後に表示される計算フォーム
"use client";
import MedicationCalculator from "./calculators/MedicationCalculator";
import DripCalculator from "./calculators/DripCalculator";
import FluidBalanceCalculator from "./calculators/FluidBalanceCalculator";
import NutritionCalculator from "./calculators/NutritionCalculator";
import BsaCalculator from "./calculators/BsaCalculator";
import ElectrolyteCorrectionCalculator from "./calculators/electrolytes/ElectrolyteCorrectionCalculator";
import OxygenCalculator from "./calculators/OxygenCalculator";
import TransfusionCalculator from "./calculators/TransfusionCalculator";
import BMICalculator from "./calculators/BMICalculator";

export default function CalculatorContainer({
  activeCalc,
}: {
  activeCalc: string;
}) {
  switch (activeCalc) {
    case "medication":
      return <MedicationCalculator />;
    case "drip":
      return <DripCalculator />;
    case "fluid":
      return <FluidBalanceCalculator />;
    case "nutrition":
      return <NutritionCalculator />;
    case "bsa":
      return <BsaCalculator />;
    case "electrolyte":
      return <ElectrolyteCorrectionCalculator />;
    case "oxygen":
      return <OxygenCalculator />;
    case "transfusion":
      return <TransfusionCalculator />;
    case "bmi":
      return <BMICalculator />;
    default:
      return <div>準備中...</div>;
  }
}
