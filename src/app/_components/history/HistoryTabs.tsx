import Image from "next/image";
import { calculators } from "@/config/calculators";

export default function HistoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {/* ALLタブ */}
      <button
        className={`px-3 py-2 rounded ${
          active === "all" ? "bg-gray-800 text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("all")}
      >
        ALL
      </button>

      {/* 計算カテゴリタブ */}
      {calculators.map((calc) => (
        <button
          key={calc.id}
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            active === calc.id ? calc.color : "bg-gray-200"
          }`}
          onClick={() => onChange(calc.id)}
        >
          <Image
            src={calc.iconPath}
            alt={calc.name}
            width={24}
            height={24}
            priority={false}
          />
          {calc.name}
        </button>
      ))}
    </div>
  );
}
