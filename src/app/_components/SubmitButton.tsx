"use client";

import React from "react";

interface SubmitButtonProps {
  label?: string; // ボタンの表示テキスト
  onClick: () => void;
  color?: string; // Tailwind の色クラス（例: "bg-blue-500"）
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = "計算する",
  onClick,
  color = "bg-blue-500",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${color} hover:opacity-90 text-white font-semibold py-2 rounded w-full transition`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
