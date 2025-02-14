import admin from "firebase-admin";
import { existsSync } from "fs";

// 🔥 環境変数で Firestore Emulator と本番 Firestore を切り替え
const isProduction =  "true";

// 📌 本番環境のみ `.env` をロード
if (isProduction) {
  import("dotenv").then((dotenv) => {
    dotenv.config();
  });
}

// Firebase Admin SDK の初期化
if (!admin.apps.length) {
  if (isProduction) {
    // 📌 本番環境では認証情報が必要
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!serviceAccountPath || !existsSync(serviceAccountPath)) {
      console.error("❌ Service account key is missing or invalid.");
      process.exit(1);
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
      projectId: process.env.PROJECT_ID,
    });

    console.log("🚀 Connected to Production Firestore");
  } else {
    // 📌 Firestore Emulator の場合、認証不要
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

    admin.initializeApp({
      projectId: "tenxer-education", // 直接プロジェクト ID を指定
    });

    console.log("🔥 Connected to Firestore Emulator");
  }
}

const db = admin.firestore();

export { db, isProduction };