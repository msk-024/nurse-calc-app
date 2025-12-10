"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
// import { useState } from "react";
import { useTheme } from "@/app/_context/ThemeContext";

type HeaderProps = {
  title?: string;
  editMode?: boolean;
  onToggleEdit?: () => void;
};

export default function Header({
  title = "看護師向け計算ツール",
  editMode,
  onToggleEdit,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  // const [darkMode, setDarkMode] = useState(false);

  const { theme, toggleTheme } = useTheme();

  // SVGパスをモードで切り替える関数
  const getIconPath = (name: string) => {
    return `/icons/${theme ? "dark" : "light"}/${name}.svg`;
  };

  // ダークモード切替
  // const toggleDarkMode = () => {
  //   setDarkMode((prev) => {
  //     const newMode = !prev;
  //     document.documentElement.classList.toggle("dark", newMode);
  //     return newMode;
  //   });
  // };

  return (
    <header
      className={`
        flex justify-between items-center p-4 shadow relative z-50 transition-colors
        ${editMode ? "bg-black/5" : "bg-white dark:bg-gray-800"}
        dark:text-white
      `}
    >
      {/* タイトル */}
      <h1 className="font-bold text-lg">{title}</h1>
      {/* ボタン群 */}
      <div className="flex items-center gap-4">
        {/* 並び替えボタン */}
        {pathname !== "/history" && (
          <button onClick={onToggleEdit} aria-label="並び替え">
            <Image
              src={getIconPath(editMode ? "check" : "sort")}
              alt="並び替え"
              width={22}
              height={22}
            />
          </button>
        )}

        {/* 履歴 or ホーム */}
        {pathname === "/history" ? (
          <button onClick={() => router.push("/")}>
            <Image
              src={getIconPath("home")}
              alt="ホームへ"
              width={24}
              height={24}
            />
          </button>
        ) : (
          <button onClick={() => router.push("/history")}>
            <Image
              src={getIconPath("history")}
              alt="履歴"
              width={24}
              height={24}
            />
          </button>
        )}

        {/* ナイトモード切替 */}
        <button onClick={toggleTheme}>
          <Image
            src={getIconPath(theme ? "dark-moon" : "light-moon")}
            alt="ナイトモード切替"
            width={24}
            height={24}
          />
        </button>
      </div>
    </header>
  );
}
