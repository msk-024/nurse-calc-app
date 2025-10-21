"use client";

import { useEffect, useState, useMemo } from "react";
import CalcButton from "../CalcButton";
import { calculators } from "@/config/calculators";
import { saveOrder, loadOrder } from "@/lib/sortOrder";
import Toast from "./Toast";
import SortableCalcList from "./SortableCalcList";

const calculatorsWithStringId = calculators.map((c) => ({
  ...c,
  id: String(c.id),
}));
const DEFAULT_ORDER = calculatorsWithStringId.map((c) => c.id);

type CalcNavProps = {
  activeCalc: string | null;
  onSelect: (id: string) => void;
  editMode: boolean;
  onToggleEdit: () => void;
};

export default function CalcNav({
  activeCalc,
  onSelect,
  editMode,
}: CalcNavProps) {
  const [order, setOrder] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = loadOrder();
    setOrder(saved?.length ? saved : DEFAULT_ORDER);
  }, []);

  const sortedCalculators = useMemo(() => {
    return order
      .map((id) => calculatorsWithStringId.find((c) => c.id === id))
      .filter((c): c is (typeof calculators)[number] => Boolean(c));
  }, [order]);

  return (
    <nav className="calcNav mt-4">
      {showToast && (
        <Toast message="✅ 並び替えを保存しました" className="text-center" />
      )}

      {editMode && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-10"></div>
      )}

      <div className="pb-2 relative z-10">
        {editMode ? (
          <SortableCalcList
            order={order}
            onReorder={(newOrder) => {
              setOrder(newOrder);
              saveOrder(newOrder);
            }}
            activeCalc={activeCalc}
            onSelect={onSelect}
            onSorted={() => {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 1800);
            }}
          />
        ) : (
          <>
            <div className="md:hidden overflow-x-auto">
              <div className="flex gap-3 w-[max-content] px-2 py-1">
                {sortedCalculators.map((calc) => (
                  <CalcButton
                    key={calc.id}
                    calc={calc}
                    active={activeCalc === calc.id}
                    onClick={() => onSelect(calc.id)}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:grid grid-cols-4 gap-4 w-full">
              {sortedCalculators.map((calc) => (
                <CalcButton
                  key={calc.id}
                  calc={calc}
                  active={activeCalc === calc.id}
                  onClick={() => onSelect(calc.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
