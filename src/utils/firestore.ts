import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { AchievementData } from "@/components/AchievementSheet";
import { db } from "./firebase"; // Firebase 初期化ファイル

/**
 * 現在の日時を YYYY-MM-DD-HH-mm フォーマットで生成
 */
const generateTimestampId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月は0始まり
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}-${hours}-${minutes}`;
};

export const saveAchievementToFirestore = async (userId: string, data: AchievementData) => {
  try {
    // ドキュメント ID を発行日時に基づいて設定
    const timestampId = generateTimestampId();

    // 指定した ID を使用してドキュメントを作成
    const achievementRef = doc(collection(db, `User/${userId}/AchievementSheet`), timestampId);
    await setDoc(achievementRef, data);

    console.log("データが保存されました:", data);
  } catch (error) {
    console.error("Firestore にデータ保存中にエラー:", error);
    throw error;
  }
};