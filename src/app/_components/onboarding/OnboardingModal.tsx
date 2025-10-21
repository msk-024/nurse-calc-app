// 初回説明（単発オンボーディング）
"use client";

import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import ModalOverlay from "./ModalOverlay";
import ModalContent from "./ModalContent";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <ModalOverlay />
        <ModalContent onClose={() => setIsOpen(false)} />
      </div>
    </Transition>
  );
}
