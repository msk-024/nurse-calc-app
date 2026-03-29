"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // 初回ロードでlocalStorageから復元
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
      }
    } catch (e) {
      console.warn("Failed to load theme from localStorage:", e);
    }
  }, []);

  // 切り替え時のDOM反映＋localStorage保存
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
