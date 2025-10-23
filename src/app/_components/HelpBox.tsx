"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { helpTexts, type HelpContent } from "@/config/helpTexts";

interface HelpBoxProps {
  typeId?: string;
  bg: string;
  showPanelBelow?: boolean;
}

export const HelpBox: React.FC<HelpBoxProps> = ({
  typeId,
  bg,
  showPanelBelow,
}) => {
  if (!typeId) return null;
  const helpText: HelpContent | undefined = helpTexts[typeId];
  if (!helpText) return null;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          {/* 右上に置くアイコン */}
          <Disclosure.Button aria-label="注意説明">
            <Image
              src="/icons/help-icon.svg"
              alt="注意"
              width={28}
              height={28}
              className="cursor-pointer"
            />
          </Disclosure.Button>

          {/* 注意文をResultBoxの下に出す場合 */}
          {showPanelBelow && open && (
            <div
              className={`mt-2 w-full p-3 ${bg} border-t-0 rounded-t-none shadow-md text-sm space-y-2`}
            >
              {/* caution部分 */}
              <p className="font-semibold">注意事項</p>
              <p>{helpText.caution}</p>

              {/* tipsがある場合 */}
              {helpText.tips && (
                <>
                  <hr className="my-2 border-gray-300" />
                  <p className="font-semibold">看護ポイント</p>
                  <p className="whitespace-pre-line">{helpText.tips}</p>
                </>
              )}

              {/* referenceがある場合 */}
              {helpText.reference && (
                <>
                  <hr className="my-2 border-gray-300" />
                  <p className="text-xs text-gray-500 whitespace-pre-line">
                    出典：{helpText.reference}
                  </p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </Disclosure>
  );
};
