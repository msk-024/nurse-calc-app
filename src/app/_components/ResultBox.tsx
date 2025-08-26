"use client";

import React from "react";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import { helpTexts } from "@/config/helpTexts";

interface ResultItem {
  label: string;
  value: string | number;
  unit: string;
}

interface ResultBoxProps {
  title?: string;
  results: ResultItem[];
  color?:
    | "green"
    | "blue"
    | "orange"
    | "amber"
    | "purple"
    | "cyan"
    | "teal"
    | "fuchsia"
    | "rose"
    | "yellow";
  note?: string;
  typeId?: string; // 注意文の判別用
}

export const ResultBox: React.FC<ResultBoxProps> = ({
  title = "計算結果",
  results,
  color = "blue",
  note,
  typeId,
}) => {
  const bg = {
    green: "bg-green-50 border-green-200 text-green-800", // 体液バランス
    blue: "bg-blue-50 border-blue-200 text-blue-800", // 点滴
    orange: "bg-orange-50 border-orange-200 text-orange-800", // BMI
    amber: "bg-amber-50 border-amber-200 text-amber-800", // 栄養
    purple: "bg-purple-50 border-purple-200 text-purple-800", // 体表計算
    cyan: "bg-cyan-50 border-cyan-200 text-cyan-800", // 電解質
    teal: "bg-teal-50 border-teal-200 text-teal-800", // 酸素
    fuchsia: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800", //
    rose: "bg-rose-50 border-rose-200 text-rose-800", // 輸血
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800", // 投薬
  }[color];

  const helpText = typeId ? helpTexts[typeId] : null;

  return (
    <div className={`border rounded p-4 ${bg}`}>
      {/* タイトルとヘルプアイコン */}
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{title}</h3>
        {helpText && (
          <Popover className="relative">
            <Popover.Button aria-label="注意説明">
              <Image
                src="/icons/help-icon.svg"
                alt="注意"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 mt-2 right-0 top-0 w-64 p-3 bg-white border rounded shadow-md text-sm text-gray-700">
              {helpText}
            </Popover.Panel>
          </Popover>
        )}
      </div>
      {/* 結果リスト */}
      <ul className="space-y-1">
        {results.map((item, i) => (
          <li key={i}>
            {item.label}: <strong>{item.value}</strong> {item.unit}
          </li>
        ))}
      </ul>
      {note && <div className="mt-2 text-xs whitespace-pre-line">{note}</div>}
    </div>
  );
};
