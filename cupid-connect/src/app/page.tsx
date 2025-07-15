"use client";
import { useEffect } from "react";
import Main from "./Main/page";
import { requestForToken } from "../lib/firebaseConfig";
import { trackUserOnlineStatus  } from "../lib/trackUserOnlineStatus";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Get FCM token
    requestForToken();
    trackUserOnlineStatus(); 

  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}
