// 並び順をlocalStorageに保存・取得する関数を管理。

const STORAGE_KEY = "calcButtonOrder";

export const saveOrder = (order: string[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch (e) {
    console.warn("Failed to save order:", e);
  }
};

export const loadOrder = (): string[] | null => {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn("Failed to load order:", e);
    return null;
  }
};
