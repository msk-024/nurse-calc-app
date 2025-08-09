// クライアント専用のユーティリティ
export type ReusePayload<T = unknown> = {
  typeId: string;
  inputs?: T; // 履歴にinputsがないケースもあるのでoptional
  timestamp?: string;
};

export function setReusePayload<T>(payload: ReusePayload<T>) {
  localStorage.setItem("reusePayload",JSON.stringify(payload));
}

export function getReusePayload<T>(): ReusePayload<T> | null {
  const item = localStorage.getItem("reusePayload");
  if (!item) return null;
  try {
    return JSON.parse(item) as ReusePayload<T>;
  } catch {
    return null;
  }
}

export function clearReusePayload() {
  localStorage.removeItem("reusePayload");
}
