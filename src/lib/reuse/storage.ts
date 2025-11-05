import { REUSE_STORAGE_KEY, ENABLE_DEV_LOGS } from "./types";

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/** localStorage.setItem の安全ラッパ（SSR/例外対応） */
export function setItemSafely(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    if (ENABLE_DEV_LOGS) {
      // プライベートモード等で失敗しうる
      console.warn("[reuse] setItem failed:", e);
    }
  }
}

/** localStorage.getItem の安全ラッパ（SSR/例外対応） */
export function getItemSafely(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    if (ENABLE_DEV_LOGS) console.warn("[reuse] getItem failed:", e);
    return null;
  }
}

/** localStorage.removeItem の安全ラッパ（SSR/例外対応） */
export function removeItemSafely(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    if (ENABLE_DEV_LOGS) console.warn("[reuse] removeItem failed:", e);
  }
}

/** 既定キー専用ショートカット */
export const reuseStorage = {
  key: REUSE_STORAGE_KEY,
  set: (json: string) => setItemSafely(REUSE_STORAGE_KEY, json),
  get: () => getItemSafely(REUSE_STORAGE_KEY),
  remove: () => removeItemSafely(REUSE_STORAGE_KEY),
};
