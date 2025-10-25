"use client";

import { useEffect } from "react";

export function SWRegister() {
  useEffect(() => {
    console.log("Service Worker 登録スクリプト起動");

    if ("serviceWorker" in navigator) {
      console.log("Service Worker サポートあり");

      // すぐに登録実行（loadイベント待たない）
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker 登録成功:", registration);
        })
        .catch((error) => {
          console.error("❌ Service Worker 登録失敗:", error);
        });
    } else {
      console.warn("⚠️ このブラウザは Service Worker 非対応");
    }
  }, []);

  return null;
}
