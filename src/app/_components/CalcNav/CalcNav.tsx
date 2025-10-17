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
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CalcButton from "../CalcButton";
import { calculators } from "@/config/calculators";
import { saveOrder, loadOrder } from "@/lib/sortOrder";

// ✅ IDをstring型で統一
const calculatorsWithStringId = calculators.map((c) => ({
  ...c,
  id: String(c.id),
}));
const DEFAULT_ORDER = calculatorsWithStringId.map((c) => c.id);

function Toast({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
      bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md 
      animate-fadeIn z-50 whitespace-nowrap ${className}`}
    >
      {message}
    </div>
  );
}

export default function CalcNav({
  activeCalc,
  onSelect,
}: {
  activeCalc: string | null;
  onSelect: (id: string) => void;
}) {
  const [order, setOrder] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = loadOrder();
    setOrder(saved?.length ? saved : DEFAULT_ORDER);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
    })
  );

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  const handleToggleEdit = () => {
    if (editMode) triggerToast();
    setEditMode((prev) => !prev);
  };

  // 並び替え完了処理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    const newOrder = arrayMove(order, oldIndex, newIndex);

    setOrder(newOrder);
    saveOrder(newOrder);
  };

  // 現在の順序に基づいて並び替え済みリストを生成
  const sortedCalculators = useMemo(() => {
    return order
      .map((id) => calculatorsWithStringId.find((c) => c.id === id))
      .filter(Boolean);
  }, [order]);

  return (
    <>
      {showToast && (
        <Toast message="✅ 並び順を保存しました" className="text-center" />
      )}

      {/* 並び替えボタン */}
      <div className="flex justify-end mb-3 relative z-20">
        <button
          onClick={handleToggleEdit}
          className={`px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
            editMode
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {editMode ? "並び替え完了" : "並び替え"}
        </button>
      </div>

      {/* 背景 */}
      {editMode && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-0"></div>
      )}

      {/* PC表示（固定4列）
      <div className="hidden md:grid grid-cols-4 gap-4">
        {calculatorsWithStringId.map((calc) => (
          <CalcButton
            key={calc.id}
            calc={calc}
            active={activeCalc === calc.id}
            onClick={() => onSelect(calc.id)}
          />
        ))}
      </div> */}

      {/* ✅ モバイル表示 */}
      <div className="pb-2 relative z-10">
        {editMode ? (
          // 編集モード（スマホ〜PC共通でcolumn）
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={order}
              strategy={verticalListSortingStrategy}
            >
              <ul
                className={`px-4 py-2 [column-fill:_balance] columns-1 sm:columns-2 md:columns-3 space-y-3 max-w-6xl mx-auto `}
              >
                {sortedCalculators.map((calc) => (
                  <li
                    key={calc!.id}
                    className="break-inside-avoid mb-3 list-none"
                  >
                    <SortableButton
                      calc={calc!}
                      active={activeCalc === calc!.id}
                      onClick={() => onSelect(calc!.id)}
                      disabled={false}
                    />
                  </li>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        ) : (
          // 通常モード（スマホ:横スクロール / PC:4列grid）
          <>
            {/* スマホ〜タブレット */}
            <div className="md:hidden overflow-x-auto">
              <div className="flex gap-3 w-[max-content] px-2 py-1">
                {sortedCalculators.map((calc) => (
                  <CalcButton
                    key={calc!.id}
                    calc={calc!}
                    active={activeCalc === calc!.id}
                    onClick={() => onSelect(calc!.id)}
                  />
                ))}
              </div>
            </div>

            {/* PC */}
            <div className="hidden md:grid grid-cols-4 gap-4 w-full">
              {sortedCalculators.map((calc) => (
                <CalcButton
                  key={calc!.id}
                  calc={calc!}
                  active={activeCalc === calc!.id}
                  onClick={() => onSelect(calc!.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ✅ 並び替えアイテム
function SortableButton({
  calc,
  active,
  onClick,
  disabled,
}: {
  calc: (typeof calculators)[number];
  active: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(calc.id),
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 50 : "auto",
    boxShadow: isDragging ? "0 8px 16px rgba(0,0,0,0.25)" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full"
    >
      <CalcButton calc={calc} active={active} onClick={onClick} compact />
    </div>
  );
}
