// 注意事項・看護ポイント・出典表示部分
"use client";
import React, { forwardRef } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import type { HelpContent } from "@/config/helpTexts";

interface ResultHelpPanelProps {
  helpText: HelpContent;
  bg: string;
}

// forwardRefを使ってResultBoxからrefを受け取る
export const ResultHelpPanel = forwardRef<HTMLDivElement, ResultHelpPanelProps>(
  ({ helpText, bg }, ref) => {
    const renderReference = (reference: string) => {
      const match = reference.match(/https?:\/\/[^\s]+/);
      const url = match ? match[0] : null;
      const text = reference.replace(url ?? "", "").trim();

      return (
        <div className="text-xs text-gray-500 whitespace-pre-line">
          出典：{text}
          {url && (
            <>
              {" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 underline font-medium hover:text-blue-800"
              >
                詳しく見る →
              </a>
            </>
          )}
        </div>
      );
    };

    return (
      <Disclosure.Panel
        ref={ref}
        className={`mt-2 w-full py-4 ${bg} border-t-0 rounded-t-none text-sm space-y-2`}
      >
        <hr className="my-2 border-gray-300" />
        <div className="py-6">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/icons/light/triangle.svg" // 注意事項アイコン
              alt="注意"
              width={20}
              height={20}
            />
            <p className="font-semibold">注意事項</p>
          </div>
          <p className="whitespace-pre-line">{helpText.caution}</p>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="py-4">
          {" "}
          {helpText.tips && (
            <>
              {" "}
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/icons/light/nurse.svg"
                  alt="看護のポイント"
                  width={20}
                  height={20}
                />
                <p className="font-semibold">看護ポイント</p>
              </div>
              <p className="whitespace-pre-line">{helpText.tips}</p>
            </>
          )}
        </div>
        <div>
          {helpText.reference && (
            <>
              <hr className="my-2 border-gray-300" />
              {renderReference(helpText.reference)}
            </>
          )}
        </div>
      </Disclosure.Panel>
    );
  }
);

ResultHelpPanel.displayName = "ResultHelpPanel";
