import type { APIRoute } from "astro";
import { db } from "@/lib/firebase"; // ✅ Firestore 初期化ファイル（firebase-adminを使用）
import { AchievementData } from "@/type";
import admin from "firebase-admin"; // ✅ FirestoreのFieldValueを使うために追加

/** カスタムIDを生成する関数 */
function generateCustomId(name: string, date: string, duration: string): string {
  return `displayName=${encodeURIComponent(name)}&date=${date}&duration=${duration}`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // 🔥 リクエストボディをパース
    const body = await request.json();
    const { studentid, AchievementData } = body as {
      studentid: string;
      AchievementData: AchievementData;
    };

    console.log("[DEBUG] AchievementData:", AchievementData);

    // 🔥 Firestore に保存するデータを作成
    const created_at = new Date();
    const updated_at = new Date();

    const FormData = {
      ...AchievementData,
      created_at,
      updated_at,
    };

    // 🔥 カスタムIDを生成
    const attendanceID = generateCustomId(
      FormData.student_name,
      FormData.date,
      String(FormData.duration)
    );

    // 🔥 Firestoreに保存
    // 1) "Attendances" コレクションにデータを保存
    await db.collection("Attendances").doc(attendanceID).set(FormData);

    // 2) "Students" コレクションの studentid ドキュメントをトランザクションで更新
    const studentRef = db.collection("Students").doc(studentid);
    await db.runTransaction(async (transaction) => {
      const studentDoc = await transaction.get(studentRef);
      if (!studentDoc.exists) {
        throw new Error("指定された学生のドキュメントが存在しません");
      }

      transaction.update(studentRef, {
        attendances: admin.firestore.FieldValue.arrayUnion(attendanceID), // 🔥 `arrayUnion()` に変更
      });
    });

    console.log("学生の attendance 配列が更新されました:", attendanceID);

    // 🔥 3) "Users" コレクションの `studentid` に該当するユーザーのチケット枚数を更新
    const userQuerySnapshot = await db.collection("Users").where("children", "array-contains", studentid).get();
    if (userQuerySnapshot.empty) {
      throw new Error("指定された `studentid` に該当するユーザーが見つかりません");
    }

    // `duration` に基づいて `ticket_count` を減算

    const calculateTicketReduction = (duration: number): number => {
  return Math.ceil(duration / 15) * 0.25; // 15分単位で0.25ずつ増加 (15分未満も0.25)
    };

    const ticketReduction = calculateTicketReduction(FormData.duration); // 60分=1チケット, 最小単位30分=0.5チケット

    // ユーザーのチケットを更新 (トランザクション)
    await db.runTransaction(async (transaction) => {
      userQuerySnapshot.forEach((userDoc) => {
        const userRef = db.collection("Users").doc(userDoc.id);
        transaction.update(userRef, {
          ticket_count: admin.firestore.FieldValue.increment(-ticketReduction), // 🔥 `increment(-value)` で減算
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
    });

    console.log("ユーザーの `ticket_count` を", ticketReduction, "減算しました");

    // 🔥 成功時は JSON を返す
    return new Response(JSON.stringify({ ...FormData, ticketReduction }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API エラー:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};