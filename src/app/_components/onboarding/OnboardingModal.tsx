"use client";

import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("onboardingSeen");
    if (!seen) {
      setIsOpen(true);
      localStorage.setItem("onboardingSeen", "true");
    }
  }, []);

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md text-center">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            ようこそ！
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            このアプリは、看護業務に役立つ計算ツールを
            <br/>まとめています。
            <br />
            まずは画面上のボタンから計算を選択してみましょう。
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#F3A696] hover:bg-[#F29C8A] text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors duration-300"
          >
            はじめる
          </button>
        </div>
      </div>
    </Transition>
  );
}
