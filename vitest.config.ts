// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // ✅ localStorageなどブラウザAPIを使うため
    globals: true, // ✅ describe / it / expect をインポート不要に
    include: ["lib/**/*.test.ts"], // ✅ テスト対象パス（必要に応じて変更）
    setupFiles: [], // ✅ セットアップ不要なら空
  },
});
