// 並び順をlocalStorageに保存・取得する関数を管理。

const STORAGE_KEY = "calcButtonOrder";

export const saveOrder = (order: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
};

export const loadOrder = (): string[] | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};
