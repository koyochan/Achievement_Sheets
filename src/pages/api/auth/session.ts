import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { uid, email } = await request.json();

    // 簡易的なセッションの保存（本番では JWT を使うべき）
    cookies.set("sessionId", uid, {
      path: "/",
      httpOnly: true, // JavaScript からアクセス不可
      secure: true, // HTTPS のみ
      maxAge: 60 * 60 * 24, // 1日
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to set session" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};