"use client";

import React from "react";

// interface ResultBoxProps {
//   title?: string; // 例: "計算結果"
//   results: {
//     label: string; // 例: "エネルギー"
//     value: string | number; // 例: "1800"
//     unit: string; // 例: "kcal"
//   }[];
//   color?: "green" | "blue" | "orange" | "purple"; // Tailwind対応色
//   note?: string; // 補足（例: 医師の指示と照合してください）
// };


interface ResultItem {
  label: string;
  value: string | number;
  unit: string;
};

interface ResultBoxProps {
  title?: string;
  results: ResultItem[];
  color?: "green" | "blue" | "orange" | "purple";
  note?: string;
};

export const ResultBox: React.FC<ResultBoxProps> = ({
  title = "計算結果",
  results,
  color = "blue",
  note,
}) => {
  const bg = {
    green: "bg-green-50 border-green-200 text-green-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    orange: "bg-orange-50 border-orange-200 text-orange-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
  }[color];

  return (
    <div className={`border rounded p-4 ${bg}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-1">
        {results.map((item, i) => (
          <li key={i}>
            {item.label}: <strong>{item.value}</strong> {item.unit}
          </li>
        ))}
      </ul>
      {note && <p className="mt-2 text-xs">{note}</p>}
    </div>
  );
};
