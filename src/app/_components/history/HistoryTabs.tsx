import { calculators } from "@/config/calculators";

export default function HistoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide border-b border-gray-200 mb-3">
      {/* ALLタブ */}
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
          active === "all"
            ? "bg-gray-800 text-white shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onChange("all")}
      >
        ALL
      </button>

      {/* 計算カテゴリタブ */}
      {calculators.map((calc) => (
        <button
          key={calc.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
            active === calc.id
              ? `${calc.color} text-white shadow-sm`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onChange(calc.id)}
        >
          {calc.name}
        </button>
      ))}
    </div>
  );
}
