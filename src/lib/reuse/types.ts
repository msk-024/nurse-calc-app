export type SubType = "na" | "k" | "mg"; // 既存 + 将来拡張前提（増やすときはここに追記）

export const ENABLE_DEV_LOGS: boolean =
  process.env.NODE_ENV !== "production" ||
  process.env.ENABLE_REUSE_DEV_LOGS === "1";

/** reuse用のlocalStorageキー */
export const REUSE_STORAGE_KEY = "reusePayload";

/** 遅延削除の既定ディレイ（ms）：Hydration配慮 */
export const REUSE_CLEAR_DELAY_MS = 500;
