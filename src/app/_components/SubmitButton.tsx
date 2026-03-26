"use client";

import React from "react";

interface SubmitButtonProps {
  label?: string;
  color?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = "計算する",
  color = "bg-blue-500",
}) => {
  return (
    <button
      type="submit"
      className={`${color} hover:opacity-90 text-white font-semibold py-2 rounded w-full transition`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
