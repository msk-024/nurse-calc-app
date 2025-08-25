import Image from "next/image";
import { CalculatorType } from "@/types/calculator";

type CalcButtonProps = {
  calc: CalculatorType;
  active: boolean; // 選択中を保持したいときに使う
  onClick: () => void;
};

export default function CalcButton({ calc, active, onClick }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        // 基本の表示
        "relative inline-flex items-center gap-2 rounded-lg px-6 py-4 font-semibold text-white",
        "transition-all duration-150 will-change-[box-shadow,filter]",
        calc.color,
        !active &&
          [
            "border border-transparent border-b-2 border-b-black/20", // 下に段差
            "hover:opacity-90",
            "active:shadow-inner active:shadow-black/30", // 押下中は内側へ
            "active:border-b-0 active:border-t-2 active:border-t-black/20",
            "active:brightness-95",
          ].join(" "),

        // 押し込まれた状態（アクティブを保持）
        active &&
          [
            "shadow-inner shadow-black/30", // 常に内側シャドウ
            "border border-transparent border-t-2 border-t-black/20", // 上に段差を反転
            "brightness-95",
          ].join(" "),
      ].join(" ")}
    >
      <Image src={calc.iconPath} alt={calc.name} width={24} height={24} />
      {calc.name}
    </button>
  );
}