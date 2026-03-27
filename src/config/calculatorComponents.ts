// 計算機コンポーネントの動的マッピング設定

import { ComponentType } from "react";
import MedicationCalculator from "@/app/medication/MedicationCalculator";
import DripCalculator from "@/app/drip/DripCalculator";
import FluidBalanceCalculator from "@/app/fluid/FluidBalanceCalculator";
import NutritionCalculator from "@/app/nutrition/NutritionCalculator";
import BsaCalculator from "@/app/bsa/BsaCalculator";
import ElectrolyteCorrectionCalculator from "@/app/electrolyte/electrolytes/ElectrolyteCorrectionCalculator";
import OxygenCalculator from "@/app/oxygen/OxygenCalculator";
import TransfusionCalculator from "@/app/transfusion/TransfusionCalculator";
import BMICalculator from "@/app/bmi/BMICalculator";

/**
 * 計算機コンポーネントのマッピング
 * CalculatorContainer で動的にコンポーネントを選択するために使用
 */
export const CALCULATOR_COMPONENTS: Record<string, ComponentType> = {
  medication: MedicationCalculator,
  drip: DripCalculator,
  fluid: FluidBalanceCalculator,
  nutrition: NutritionCalculator,
  bsa: BsaCalculator,
  electrolyte: ElectrolyteCorrectionCalculator,
  oxygen: OxygenCalculator,
  transfusion: TransfusionCalculator,
  bmi: BMICalculator,
};
