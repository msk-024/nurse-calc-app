"use client";

import React from "react";

interface LabeledInputProps {
  label: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
};

export default LabeledInput;
