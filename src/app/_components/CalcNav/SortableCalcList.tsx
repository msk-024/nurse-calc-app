// DnD対応リスト部分

"use client";

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
import SortableButton from "./SortableButton";
import { calculators } from "@/config/calculators";

type SortableCalcListProps = {
  order: string[];
  onReorder: (newOrder: string[]) => void;
  activeCalc: string | null;
  onSelect: (id: string) => void;
  onSorted?: () => void; // ✅ 並べ替え完了コールバック
};

export default function SortableCalcList({
  order,
  onReorder,
  activeCalc,
  onSelect,
  onSorted,
}: SortableCalcListProps) {
  const calculatorsWithStringId = calculators.map((c) => ({
    ...c,
    id: String(c.id),
  }));

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
    onReorder(newOrder);

    // ✅ 並び替え完了通知
    onSorted?.();
  };

  const sortedCalculators = order
    .map((id) => calculatorsWithStringId.find((c) => c.id === id))
    .filter((c): c is (typeof calculators)[number] => Boolean(c));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <ul className="px-4 py-2 [column-fill:_balance] columns-1 sm:columns-2 md:columns-3 space-y-3 max-w-6xl mx-auto">
          {sortedCalculators.map((calc) => (
            <li key={calc.id} className="break-inside-avoid mb-3 list-none">
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
  );
}
