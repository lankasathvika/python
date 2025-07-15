


import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

let onlineInterval: NodeJS.Timeout | null = null;

export const trackUserOnlineStatus = () => {
  console.log("🚀 Tracking user online status...");

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      try {
        const userDocSnap = await getDoc(userDocRef);

        // ✅ If user doc doesn't exist, create it
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            isOnline: true,
            lastChanged: new Date().toISOString(),
          });
          console.log("✅ User document created.");
        } else {
          // ✅ If 'isOnline' is missing, create it
          const userData = userDocSnap.data();
          if (userData.isOnline === undefined) {
            console.log("⚠️ 'isOnline' field missing — creating it...");
            await updateDoc(userDocRef, {
              isOnline: true,
              lastChanged: new Date().toISOString(),
            });
          } else {
            // ✅ Mark user as online
            await updateDoc(userDocRef, {
              isOnline: true,
              lastChanged: new Date().toISOString(),
            });
          }
        }

        // ✅ Track tab visibility changes
        const handleVisibilityChange = async () => {
          if (document.visibilityState === "visible") {
            console.log("👀 User is active (visible).");
            await updateDoc(userDocRef, {
              isOnline: true,
              lastChanged: new Date().toISOString(),
            });
          } else {
            console.log("🚶‍♂️ User is inactive (hidden).");
            await updateDoc(userDocRef, {
              isOnline: false,
              lastChanged: new Date().toISOString(),
            });
          }
        };

        // ✅ Track window focus and blur
        const handleFocus = async () => {
          console.log("👀 User is focused (active).");
          await updateDoc(userDocRef, {
            isOnline: true,
            lastChanged: new Date().toISOString(),
          });
        };

        const handleBlur = async () => {
          console.log("🚶‍♂️ User is inactive (blur).");
          await updateDoc(userDocRef, {
            isOnline: false,
            lastChanged: new Date().toISOString(),
          });
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        // ✅ Refresh status every 5 minutes
        if (onlineInterval) clearInterval(onlineInterval);
        onlineInterval = setInterval(async () => {
          console.log("🔄 Refreshing online status...");
          await updateDoc(userDocRef, {
            isOnline: true,
            lastChanged: new Date().toISOString(),
          });
        }, 1 * 60 * 1000);

        // ✅ Handle window/tab close → set offline
        window.addEventListener("beforeunload", async () => {
          await updateDoc(userDocRef, {
            isOnline: false,
            lastChanged: new Date().toISOString(),
          });
        });
      } catch (error) {
        console.error("❌ Error setting online status:", error);
      }
    } else {
      // ✅ Stop tracking when user logs out
      if (onlineInterval) {
        clearInterval(onlineInterval);
        onlineInterval = null;
      }
      console.log("❌ No user logged in.");
    }
  });
};
