import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  const serviceAccountPath = path.join(
    process.cwd(),
    "src", // Add src to the path
    "config",
    "firebaseAdmin.json" // Make sure this matches the filename
  );

  const serviceAccount = JSON.parse(
    readFileSync(serviceAccountPath, "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
