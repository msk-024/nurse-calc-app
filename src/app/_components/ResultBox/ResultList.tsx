// 結果リスト部分
"use client";
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Range {
  min: number;
  max: number;
}

interface ResultItem {
  label: string;
  value: string | number;
  unit: string;
  range?: Range;
}

interface ResultListProps {
  results: ResultItem[];
}

export const ResultList: React.FC<ResultListProps> = ({ results }) => {
  const getStatusIcon = (value: number, range?: Range) => {
    if (!range) return null;
    if (value > range.max)
      return <ArrowUp className="w-6 h-6 text-red-500 ml-1 inline-block" />;
    if (value < range.min)
      return <ArrowDown className="w-6 h-6 text-blue-500 ml-1 inline-block" />;
    return null;
  };

  return (
    <ul className="space-y-2">
      {results.map((item, i) => {
        const numericValue =
          typeof item.value === "number" ? item.value : parseFloat(item.value);

        return (
          <li key={i} className="flex items-baseline gap-2">
            <span className="text-base">{item.label}:</span>
            <strong className="text-3xl flex items-center">
              {item.value}
              {getStatusIcon(numericValue, item.range)}
            </strong>
            <span className="text-sm">{item.unit}</span>
          </li>
        );
      })}
    </ul>
  );
};
