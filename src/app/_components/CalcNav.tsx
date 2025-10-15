"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CalcButton from "./CalcButton";
import { calculators } from "@/config/calculators";
import { saveOrder, loadOrder } from "@/lib/sortOrder";

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
    if (saved) setOrder(saved);
    else setOrder(calculators.map((c) => c.id));
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const oldIndex = order.indexOf(activeId);
    const newIndex = order.indexOf(overId);
    const newOrder = arrayMove(order, oldIndex, newIndex);

    setOrder(newOrder);
    saveOrder(newOrder);
  };

  // センサー設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150, // 長押し開始まで0.15秒
        tolerance: 5, // 少しの動きでキャンセルされない
      },
    })
  );

  const triggerToast = (message: string) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  const handleToggleEdit = () => {
    if (editMode) triggerToast("並び順を保存しました");
    setEditMode((prev) => !prev);
  };

  return (
    <>
      {showToast && (
        <Toast message="並び順を保存しました" className="text-center" />
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

      {/* 編集モード時は背景に黒透明レイヤー */}
      {editMode && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-0"></div>
      )}

      {/* PC表示 */}
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

      {/* モバイル */}
      <div className="md:hidden pb-2 relative z-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={rectSortingStrategy}>
            {editMode ? (
              <div className="grid grid-cols-2 gap-4 px-2 py-1">
                {order.map((id) => {
                  const calc = calculators.find((c) => c.id === id);
                  if (!calc) return null;
                  return (
                    <SortableButton
                      key={id}
                      calc={calc}
                      active={activeCalc === calc.id}
                      onClick={() => onSelect(calc.id)}
                      disabled={!editMode}
                      compact={true}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="flex gap-3 w-[max-content] px-2 py-1">
                  {order.map((id) => {
                    const calc = calculators.find((c) => c.id === id);
                    if (!calc) return null;
                    return (
                      <CalcButton
                        key={id}
                        calc={calc}
                        active={activeCalc === calc.id}
                        onClick={() => onSelect(calc.id)}
                        compact={false}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

function SortableButton({
  calc,
  active,
  onClick,
  disabled,
  compact = false,
}: {
  calc: (typeof calculators)[number];
  active: boolean;
  onClick: () => void;
  disabled: boolean;
  compact?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: calc.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    scale: isDragging ? 1.05 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full"
    >
      <CalcButton
        calc={calc}
        active={active}
        onClick={onClick}
        compact={compact}
      />
    </div>
  );
}
