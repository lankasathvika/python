"use client";

import { useEffect } from "react";
import { requestForToken } from "@/lib/firebaseConfig";

const NotificationHandler = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
          requestForToken();
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
};

export default NotificationHandler;
