"use client";

import React from "react";

interface LabeledSelectProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  error?: string;
}

const LabeledSelect = React.forwardRef<HTMLSelectElement, LabeledSelectProps>(
  ({ label, value, onChange, options, error }, ref) => {
    return (
      <div>
        <label className="block text-base font-medium mb-2">{label}</label>
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          className={`w-full border rounded-lg px-4 py-3 text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 ${
            error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

LabeledSelect.displayName = "LabeledSelect";

export default LabeledSelect;
