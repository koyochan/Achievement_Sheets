import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { AchievementData } from "@/components/_AchivementSeat";
import { db } from "./firebase"; // Firebase 初期化ファイル

export const saveAchievementToFirestore = async (userId: string, data: AchievementData) => {
  try {
    const achievementRef = doc(collection(db, `User/${userId}/AchievementSheet`));
    await setDoc(achievementRef, data);
    console.log("データが保存されました:", data);
  } catch (error) {
    console.error("Firestore にデータ保存中にエラー:", error);
    throw error;
  }
};