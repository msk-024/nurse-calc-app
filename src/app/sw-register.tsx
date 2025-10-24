"use client";

import { useEffect } from "react";

export function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker 登録成功:", registration);
          })
          .catch((error) => {
            console.error("Service Worker 登録失敗:", error);
          });
      });
    }
  }, []);

  return null;
}
