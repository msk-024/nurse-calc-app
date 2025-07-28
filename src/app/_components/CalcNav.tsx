import CalcButton from "./CalcButton";
import { calculators } from "@/config/calculators";

export default function CalcNav({
  activeCalc,
  onSelect,
}: {
  activeCalc: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {calculators.map((calc) => (
        <CalcButton
          key={calc.id}
          calc={calc}
          active={activeCalc === calc.id}
          onClick={() => onSelect(calc.id)}
        />
      ))}
    </div>
  );
}
