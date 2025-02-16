/// <reference types="astro/client" />

interface ImportMetaEnv {
  // 本番環境用の Firebase 認証キー
  readonly GOOGLE_APPLICATION_CREDENTIALS: string;
  readonly PROJECT_ID: string;

  // クライアントサイド用 (環境変数をクライアントで使う場合は `PUBLIC_` を付ける)
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly PUBLIC_FIREBASE_APP_ID: string;

  // エミュレータ用
  readonly FIRESTORE_EMULATOR_HOST: string;
  readonly FIREBASE_AUTH_EMULATOR_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}