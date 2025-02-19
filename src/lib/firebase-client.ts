import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const isProduction = false;

console.log(`Running in ${isProduction ? "Production🚀" : "Test📃"} Mode`);

const firebaseConfig = isProduction
  ? {
      apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
      authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    }
  : {
      apiKey: "test-api-key",
      authDomain: "localhost",
      projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "my-test-project", // デフォルト値を設定
    };

// Firebase の初期化
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore 初期化
const db = getFirestore(app);

// Auth 初期化
const auth = getAuth(app);

// --- 🔥 エミュレータモードの場合、エミュレータに接続 ---
if (!isProduction) {
  const firestoreEmulatorHost = import.meta.env.PUBLIC_FIRESTORE_EMULATOR_HOST;
  const authEmulatorHost = import.meta.env.PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;

  if (!firestoreEmulatorHost || !authEmulatorHost) {
    console.error("❌ エミュレータのホストが設定されていません。");
    process.exit(1);
  }

  connectFirestoreEmulator(db, firestoreEmulatorHost.split(":")[0], Number(firestoreEmulatorHost.split(":")[1]));
  connectAuthEmulator(auth, `http://${authEmulatorHost}`);

  console.log(`📃 Firestore Emulator connected at ${firestoreEmulatorHost}`);
  console.log(`📃 Auth Emulator connected at ${authEmulatorHost}`);
}

export { db as clientDb, auth as clientAuth, isProduction };