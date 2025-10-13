"use client";

import React, { useRef, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { helpTexts } from "@/config/helpTexts";
import { scrollToRef } from "@/lib/scrollToRef";

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
    green: "bg-green-50 border-green-200 text-green-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    orange: "bg-orange-50 border-orange-200 text-orange-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    cyan: "bg-cyan-50 border-cyan-200 text-cyan-800",
    teal: "bg-teal-50 border-teal-200 text-teal-800",
    fuchsia: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }[color];

  const helpText = typeId ? helpTexts[typeId] : null;
  const panelRef = useRef<HTMLDivElement>(null);

  // Disclosure の open 状態を追跡するための state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      scrollToRef(panelRef);
    }
  }, [isOpen]);

  return (
    <Disclosure>
      {({ open }) => {
        if (open !== isOpen) setTimeout(() => setIsOpen(open), 0);

        return (
          <div className={`border rounded p-4 ${bg}`}>
            {/* タイトルとアイコン */}
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{title}</h3>
              {helpText && (
                <Disclosure.Button aria-label="注意説明">
                  <Image
                    src="/icons/help-icon.svg"
                    alt="注意"
                    width={28}
                    height={28}
                    className="cursor-pointer"
                  />
                </Disclosure.Button>
              )}
            </div>

            {/* 結果リスト */}
            <ul className="space-y-2">
              {results.map((item, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="text-base">{item.label}:</span>
                  <strong className="text-2xl">{item.value}</strong>
                  <span className="text-sm">{item.unit}</span>
                </li>
              ))}
            </ul>

            {note && (
              <div className="mt-2 text-xs whitespace-pre-line">{note}</div>
            )}

            {/* 説明文 */}
            {helpText && (
              <Disclosure.Panel
                ref={panelRef}
                className={`mt-2 w-full p-3 ${bg} border-t-0 rounded-t-none text-sm`}
              >
                {helpText}
              </Disclosure.Panel>
            )}
          </div>
        );
      }}
    </Disclosure>
  );
};
