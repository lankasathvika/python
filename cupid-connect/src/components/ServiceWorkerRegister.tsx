

"use client";

import { useEffect } from "react";

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        { scope: "/" }
      );
      console.log("Service Worker registered with scope:", registration.scope);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

export default function ServiceWorkerRegister() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null; // No UI, just runs the effect
}