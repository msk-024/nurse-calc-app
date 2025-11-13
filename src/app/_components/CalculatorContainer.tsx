// ボタン選択後に表示される計算フォーム
"use client";
import MedicationCalculator from "@/app/medication/MedicationCalculator";
import DripCalculator from "@/app/drip/DripCalculator";
import FluidBalanceCalculator from "@/app//fluid/FluidBalanceCalculator";
import NutritionCalculator from "@/app/nutrition/NutritionCalculator";
import BsaCalculator from "@/app/bsa/BsaCalculator";
import ElectrolyteCorrectionCalculator from "@/app/electrolyte/electrolytes/ElectrolyteCorrectionCalculator";
import OxygenCalculator from "@/app/oxygen/OxygenCalculator";
import TransfusionCalculator from "@/app/transfusion/TransfusionCalculator";
import BMICalculator from "@/app/bmi/BMICalculator";

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
