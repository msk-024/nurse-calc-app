import type { HistoryItem } from "@/types/history";

const HISTORY_KEY = "nurse-calc-history";

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveHistory(newItem: HistoryItem) {
  if (typeof window === "undefined") return;
  const history = loadHistory();
  const updated = [newItem, ...history].slice(0, 10); // 各10件まで
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}
