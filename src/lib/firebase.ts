import admin from "firebase-admin";
import { existsSync, readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const isProduction = false;
console.log(`Running in ${isProduction ? "Production" : "Test"} Mode`);

if (!admin.apps.length) {
  if (isProduction) {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!serviceAccountPath) {
      console.error(`Environment variable GOOGLE_APPLICATION_CREDENTIALS is not set.`);
      process.exit(1);
    }

    if (!existsSync(serviceAccountPath)) {
      console.error(`Service account key not found at: ${serviceAccountPath}`);
      process.exit(1);
    }

    try {
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.PROJECT_ID,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to load service account key:", error.message);
        } else {
          console.error("Failed to load service account key. Unknown error:", error);
        }
        process.exit(1);
    }
  } else {
    process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || "localhost:8080";
    admin.initializeApp({ projectId: process.env.PROJECT_ID || "tenxer-education" });
  }
}

const db = admin.firestore();
export { db, isProduction };