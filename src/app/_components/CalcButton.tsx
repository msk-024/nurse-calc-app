"use client";
import Image from "next/image";
import { CalculatorType } from "@/types/calculator";

type CalcButtonProps = {
  calc: CalculatorType;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
};

export default function CalcButton({
  calc,
  active,
  onClick,
  compact = false,
}: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        compact ? "w-full h-16" : "w-40 h-16 md:w-full",
        "relative flex items-center justify-center gap-2 rounded-lg font-semibold text-white tracking-widest",
        "transition-all duration-150 will-change-[box-shadow,filter]",
        calc.color,

        !active &&
          [
            "border border-transparent border-b-2 border-b-black/20",
            "hover:opacity-90",
            "active:shadow-inner active:shadow-black/30",
            "active:border-b-0 active:border-t-2 active:border-t-black/20",
            "active:brightness-95",
          ].join(" "),

        active &&
          [
            "shadow-inner shadow-black/30",
            "border border-transparent border-t-2 border-t-black/20",
            "brightness-95",
          ].join(" "),
      ].join(" ")}
    >
      <Image src={calc.iconPath} alt={calc.name} width={24} height={24} />
      {calc.name}
    </button>
  );
}
