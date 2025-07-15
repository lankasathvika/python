
"use client";

import { initializeApp } from "firebase/app";
import { getToken, onMessage, getMessaging, Messaging } from "firebase/messaging";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, updateDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
  authDomain: "cupid-connect-d7fce.firebaseapp.com",
  projectId: "cupid-connect-d7fce",
  storageBucket: "cupid-connect-d7fce.appspot.com",
  messagingSenderId: "959322105870",
  appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
  measurementId: "G-Q0GFTYFTHN"
};

// ✅ Initialize Firebase App only once
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

let messaging: Messaging | undefined;
if (typeof window !== "undefined") {
  messaging = getMessaging(firebaseApp);
}

// ✅ Request FCM Token
export const requestForToken = async () => {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("✅ Notification permission granted.");

      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      });

      if (currentToken) {
        console.log("✅ FCM Token:", currentToken);
        return currentToken;
      } else {
        console.log("⚠️ No registration token available.");
      }
    } else {
      console.log("❌ Permission denied for notifications.");
    }
  } catch (error) {
    console.error("❌ An error occurred while retrieving token:", error);
  }
};

// ✅ Store FCM Token in Firestore (Only if Different or Empty)
export const storeFcmToken = async (userId: string) => {
  try {
    const token = await requestForToken();
    if (token) {
      console.log("✅ FCM Token:", token);

      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const existingFcmToken = userDoc.data().fcmToken || "";

        // ✅ Only update if the token is different or empty
        if (existingFcmToken !== token || existingFcmToken === "") {
          console.log("🔄 Updating FCM token in Firestore...");

          await updateDoc(userDocRef, {
            fcmToken: token,
          });

          console.log("✅ FCM token updated in Firestore.");
        } else {
          console.log("✅ FCM token unchanged, no update needed.");
        }
      } else {
        console.log("❌ User document not found.");
      }
    }
  } catch (error) {
    console.error("❌ Error storing FCM token:", error);
  }
};

// ✅ Refresh Token (Poll every 10 minutes)
const refreshTokenInterval = () => {
  setInterval(async () => {
    console.log("🔄 Checking for token updates...");
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const newToken = await getToken(messaging!, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      });

      if (newToken) {
        console.log("🔄 New token detected:", newToken);
        await storeFcmToken(user.uid);
      }
    }
  }, 10 * 60 * 1000); // 10 minutes
};

// ✅ Listen for Messages
if (messaging) {
  onMessage(messaging, (payload) => {
    console.log("📩 Message received:", payload);

    if (payload.notification) {
      new Notification(payload.notification.title || "New Notification", {
        body: payload.notification.body || "",
        icon: "/Logo1.png",
      });
    }
  });

  // ✅ Start token refresh interval after login
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("✅ User logged in:", user.uid);
      refreshTokenInterval();
      storeFcmToken(user.uid);
    }
  });
}

 
export { firebaseApp, messaging };
