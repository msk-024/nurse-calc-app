"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { helpTexts } from "@/config/helpTexts";

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
  const helpText = helpTexts[typeId];
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
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Disclosure.Button>

          {/* 説明文は ResultBox の下に配置 */}
          {showPanelBelow && open && (
            <div
              className={`mt-2 w-full p-3 ${bg} border-t-0 rounded-t-none shadow-md text-sm`}
            >
              {helpText}
            </div>
          )}
        </>
      )}
    </Disclosure>
  );
};
