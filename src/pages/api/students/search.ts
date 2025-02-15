import { db } from "@/lib/firebase"; // Firestore インスタンス
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  let searchTerm = url.searchParams.get("searchTerm") || "";

  // デバッグ: 受け取った `searchTerm` の値を表示
  console.log(`[DEBUG] Original searchTerm:`, searchTerm);

  // `decodeURIComponent()` でデコード
  searchTerm = decodeURIComponent(searchTerm);
  console.log(`[DEBUG] Decoded searchTerm:`, searchTerm);

  if (!searchTerm.trim()) {
    return new Response(JSON.stringify({ students: [] }), { status: 200 });
  }

  try {
    // 🔥 Firestore から全ドキュメントを取得（⚠️ データ量が多いと遅くなる）
    const snapshot = await db.collection("Students").get();

    // 🔥 `doc.id` を `.filter()` で検索
    const matchedResults = snapshot.docs
      .filter((doc) => doc.id.includes(`furigana=${encodeURIComponent(searchTerm)}`)) // `furigana=` で前方一致
      .map((doc) => {
        const idParts = new URLSearchParams(doc.id); // `doc.id` をパース
        return {
          userid: doc.id,
          displayName: decodeURIComponent(idParts.get("displayName") ?? ""),
          furigana: decodeURIComponent(idParts.get("furigana") ?? ""),
        };
      });

    return new Response(JSON.stringify({ students: matchedResults }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[ERROR] Firestore検索エラー:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};