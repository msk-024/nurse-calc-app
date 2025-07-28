"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ title = "看護師向け計算ツール" }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // SVGパスをモードで切り替える関数
  const getIconPath = (name: string) => {
    return `/icons/${darkMode ? "dark" : "light"}/${name}.svg`;
  };

  // ダークモード切替
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // <html> に dark 付ける/外す
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800 dark:text-white">
      {/* タイトル */}
      <h1 className="font-bold text-lg">{title}</h1>

      {/* ボタン群 */}
      <div className="flex gap-4">
        <button onClick={() => router.push("/history")}>
          <Image
            src={getIconPath("history")}
            alt="履歴"
            width={24}
            height={24}
          />
        </button>
        <button onClick={toggleDarkMode}>
          <Image
            src={getIconPath(darkMode ? "dark-moon" : "light-moon")}
            alt="ナイトモード切替"
            width={24}
            height={24}
          />
        </button>
      </div>
    </header>
  );
}
