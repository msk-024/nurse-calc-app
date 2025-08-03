// import Image from "next/image";
import { calculators } from "@/config/calculators";

export default function HistoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* ALLタブ */}
      <button
        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
          active === "all"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
        onClick={() => onChange("all")}
      >
        ALL
      </button>

      {/* 計算カテゴリタブ */}
      {calculators.map((calc) => (
        <button
          key={calc.id}
          className={`flex items-center gap-1 px-5 py-1 rounded-full text-xs whitespace-nowrap ${
            active === calc.id ? calc.color : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onChange(calc.id)}
        >
          {/* <Image
            src={calc.iconPath}
            alt={calc.name}
            width={18}
            height={18}
            priority={false}
          /> */}
          {calc.name}
        </button>
      ))}
    </div>
  );
}
