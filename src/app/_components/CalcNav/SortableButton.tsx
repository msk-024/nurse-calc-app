// DnDアイテム

"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import CalcButton from "../CalcButton";
import { calculators } from "@/config/calculators";

type SortableButtonProps = {
  calc: (typeof calculators)[number];
  active: boolean;
  onClick: () => void;
  disabled: boolean;
};

export default function SortableButton({
  calc,
  active,
  onClick,
  disabled,
}: SortableButtonProps) {
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

  const style: React.CSSProperties = {
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
