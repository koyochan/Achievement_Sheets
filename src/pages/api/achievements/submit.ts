import type { APIRoute } from "astro";
import { db } from "@/lib/firebase-admin"; // ✅ Firestore 初期化ファイル（firebase-adminを使用）
import { AchievementData } from "@/type";
import admin from "firebase-admin"; // ✅ FirestoreのFieldValueを使うために追加

/** カスタムIDを生成する関数 */
function generateCustomId(name: string, date: string, duration: string): string {
  return `displayName=${name}&date=${date}&duration=${duration}`;
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

    // AchievementData を含めて、作成日時/更新日時を付与したオブジェクトを用意
    const storeData = {
      created_at,
      updated_at,
    };
    const attendanceID = generateCustomId(
      AchievementData.student_name,
      AchievementData.date,
      String(AchievementData.duration)
    );

    // 🔥 1) "Attendances" コレクションにデータを保存
    //    FormData ではなく storeData (プレーンオブジェクト) を使う
    await db.collection("Attendances").doc(attendanceID).set(storeData);

    // 🔥 2) "Students" コレクションの studentid ドキュメントをトランザクションで更新
    const studentRef = db.collection("Students").doc(studentid);
    await db.runTransaction(async (transaction) => {
      const studentDoc = await transaction.get(studentRef);
      if (!studentDoc.exists) {
        throw new Error("指定された学生のドキュメントが存在しません");
      }

      transaction.update(studentRef, {
        attendances: admin.firestore.FieldValue.arrayUnion(attendanceID), // 配列に追加
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    console.log("学生の attendance 配列が更新されました:", attendanceID);

    // 🔥 3) "Users" コレクションの `studentid` に該当するユーザーのチケット枚数を更新
    const userQuerySnapshot = await db
      .collection("Users")
      .where("children", "array-contains", studentid)
      .get();

    if (userQuerySnapshot.empty) {
      throw new Error("指定された `studentid` に該当するユーザーが見つかりません");
    }

    // 🚀 15分単位で0.25チケットずつ消費
    const calculateTicketReduction = (duration: number): number => {
      // 例: 15分未満も0.25、15分刻みで加算
      return Math.ceil(duration / 15) * 0.25;
    };

    const ticketReduction = calculateTicketReduction(AchievementData.duration);

    // ユーザーのチケットをトランザクションで減算
    await db.runTransaction(async (transaction) => {
      userQuerySnapshot.forEach((userDoc) => {
        const userRef = db.collection("Users").doc(userDoc.id);
        transaction.update(userRef, {
          standardTickets: admin.firestore.FieldValue.increment(-ticketReduction),
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
    });

    console.log("ユーザーの `standardTickets` を", ticketReduction, "減算しました");

    // 🔥 成功時は JSON を返す
    // AchievementData の中身とチケット減算量を返す
    return new Response(
      JSON.stringify({
        ...AchievementData,
        created_at,
        updated_at,
        ticketReduction,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API エラー:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};