"use client";

import { useEffect } from "react";

export function SWRegister() {
  useEffect(() => {
    console.log("Service Worker 登録スクリプト起動"); // ← 追加

    if ("serviceWorker" in navigator) {
      console.log("Service Worker サポートあり");
      window.addEventListener("load", () => {
        console.log("window loadイベント発火");
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("✅ Service Worker 登録成功:", registration);
          })
          .catch((error) => {
            console.error("❌ Service Worker 登録失敗:", error);
          });
      });
    } else {
      console.warn("⚠️ このブラウザは Service Worker 非対応");
    }
  }, []);

  return null;
}
