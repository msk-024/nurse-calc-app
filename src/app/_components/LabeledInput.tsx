"use client";

import React from "react";

interface LabeledInputProps {
  label: string;
  type?: "text" | "number";
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, type = "text", name, value, onChange, onBlur, placeholder, error }, ref) => {
    return (
      <div>
        <label className="block text-base font-medium mb-2">{label}</label>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-4 py-3 text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 ${
            error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
