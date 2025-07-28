import Image from "next/image";
import { CalculatorType } from "@/types/calculator";

type CalcButtonProps = {
  calc: CalculatorType;
  active: boolean;
  onClick: () => void;
};

export default function CalcButton({ calc, active, onClick }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${calc.color} ${
        active ? "opacity-90" : "hover:opacity-80"
      } text-white font-semibold py-4 px-6 rounded-lg shadow flex items-center gap-2`}
    >
      <Image src={calc.iconPath} alt={calc.name} width={24} height={24} />
      {calc.name}
    </button>
  );
}
