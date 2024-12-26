import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { AchievementData } from "@/components/AchievementSheet";
import { db } from "./firebase"; // Firebase 初期化ファイル

/**
 * ランダムな文字列を生成
 */
const generateRandomString = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * 指定された形式のIDを生成
 */
const generateCustomId = (random: string, name: string, date: string, duration: string): string => {
  return `${random}?name=${name}&date=${date}&duration=${duration}`;
};


/**
 * Firestoreにデータを保存
 */
export const saveAchievementToFirestore = async (userId: string, data: AchievementData) => {
  try {
    // 必要な情報をAchievementDataから取得
    const studentName = data.student_name; // AchievementDataから名前を取得
    const date = data.date; // AchievementDataから日付を取得
    const duration = data.duration; // AchievementDataから稼働時間を取得

    // カスタムIDを生成
    const randomString = generateRandomString(10);
    const customId = generateCustomId(randomString, studentName, date, String(duration));

    // Firestoreの参照を作成
    const achievementRef = doc(collection(db, "Attendance"), customId);

    // Firestoreにデータを保存
    await setDoc(achievementRef, {
      userId,
      ...data, // AchievementData のすべてのプロパティを展開
    });

    console.log("データが保存されました:", {
      id: customId,
      userId,
      data,
    });
  } catch (error) {
    console.error("Firestore にデータ保存中にエラー:", error);
    throw error;
  }
};