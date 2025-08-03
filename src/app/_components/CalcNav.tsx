// 計算ボタン群
import CalcButton from "./CalcButton";
import { calculators } from "@/config/calculators";

export default function CalcNav({
  activeCalc,
  onSelect,
}: {
  activeCalc: string | null;
  onSelect: (id: string) => void;
}) {
  const firstPage = calculators.slice(0, 4);
  const secondPage = calculators.slice(4, 8);

  return (
    <>
      {/* PC：4列 × 2行 */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {calculators.map((calc) => (
          <CalcButton
            key={calc.id}
            calc={calc}
            active={activeCalc === calc.id}
            onClick={() => onSelect(calc.id)}
          />
        ))}
      </div>
      {/* モバイル：横スクロール（2列×2行を2ページ） */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex space-x-4 w-[max-content] px-1">
          {[firstPage, secondPage].map((group, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 gap-4 min-w-[calc(100vw-10rem)]"
            >
              {group.map((calc) => (
                <CalcButton
                  key={calc.id}
                  calc={calc}
                  active={activeCalc === calc.id}
                  onClick={() => onSelect(calc.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
