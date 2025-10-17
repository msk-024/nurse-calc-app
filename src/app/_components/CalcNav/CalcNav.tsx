"use client";

import { useEffect, useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CalcButton from "../CalcButton";
import { calculators } from "@/config/calculators";
import { saveOrder, loadOrder } from "@/lib/sortOrder";
import Toast from "./Toast";
import SortableButton from "./SortableButton";

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    const newOrder = arrayMove(order, oldIndex, newIndex);
    setOrder(newOrder);
    saveOrder(newOrder);
  };

  const sortedCalculators = useMemo(() => {
    return order
      .map((id) => calculatorsWithStringId.find((c) => c.id === id))
      .filter((c): c is (typeof calculators)[number] => Boolean(c));
  }, [order]);

  // ✅ 保存完了トースト
  useEffect(() => {
    if (!editMode) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [editMode]);

  return (
    <>
      {showToast && (
        <Toast message="✅ 並び順を保存しました" className="text-center" />
      )}

      {/* 並び替えモード背景 */}
      {editMode && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-10"></div>
      )}

      <div className="pb-2 relative z-10">
        {editMode ? (
          // 並び替えモード
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={order}
              strategy={verticalListSortingStrategy}
            >
              <ul className="px-4 py-2 [column-fill:_balance] columns-1 sm:columns-2 md:columns-3 space-y-3 max-w-6xl mx-auto">
                {sortedCalculators.map((calc) => (
                  <li
                    key={calc.id}
                    className="break-inside-avoid mb-3 list-none"
                  >
                    <SortableButton
                      calc={calc}
                      active={activeCalc === calc.id}
                      onClick={() => onSelect(calc.id)}
                      disabled={false}
                    />
                  </li>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        ) : (
          // 通常モード
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
    </>
  );
}
