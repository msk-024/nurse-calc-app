import MedicationCalculator from "./calculators/MedicationCalculator";
import DripCalculator from "./calculators/DripCalculator";
import FluidBalanceCalculator from "./calculators/FluidBalanceCalculator";

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
    default:
      return <div>準備中...</div>;
  }
}
