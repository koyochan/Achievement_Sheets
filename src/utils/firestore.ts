import { doc, collection, setDoc, updateDoc, arrayUnion, runTransaction , serverTimestamp} from "firebase/firestore";
import { AchievementData } from "@/type";
import { db } from "./firebase"; // Firebase 初期化ファイル

/**
 * 指定された形式のIDを生成
 */
const generateCustomId = (name: string, date: string, duration: string): string => {
  return `displayName=${encodeURIComponent(name)}&date=${date}&duration=${duration}`;
};

export const SaveUserAttendanceField = async (userId: string, data: AchievementData) => {
  try {
    // 必要な情報をAchievementDataから取得
    const studentName = data.student_name;
    const date = data.date;

    // カスタムIDを生成
    const attendanceID = generateCustomId(studentName, date, String(data.duration));

    // Attendanceコレクションへの参照を作成
    const achievementRef = doc(collection(db, "TestAttendances"), attendanceID);

    // FirestoreにAttendanceデータを保存
    await setDoc(achievementRef, {
      ...data, // AchievementData のすべてのプロパティを展開
    });

    const studentRef = doc(db, "Students", userId);

    // トランザクションでattendanceフィールドを更新
    await runTransaction(db, async (transaction) => {
      const studentDoc = await transaction.get(studentRef);

      if (!studentDoc.exists()) {
        throw new Error("指定された学生のドキュメントが存在しません");
      }

      // attendance配列に新しいattendanceIDを追加
      transaction.update(studentRef, {
        attendances: arrayUnion(attendanceID), // 配列にユニークに追加
        updated_at: serverTimestamp(),
      });

      

    });

    console.log("学生のattendance配列が更新されました:", attendanceID);
  } catch (error) {
    console.error("Firestore にデータ保存中にエラー:", error);
    throw error;
  }
};