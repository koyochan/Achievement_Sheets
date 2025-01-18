// src/pages/api/achievements/[id].ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const id: string | undefined = params.id;

  // `id` が undefined の場合にエラーを防ぐためのチェック
  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'ID is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ダミーデータ
  const achievements = {
    "clifford": { id: "clifford", title: "Big Red Dog", description: "A lovable big red dog." },
    "rover": { id: "rover", title: "Mars Rover", description: "An exploration robot on Mars." },
    "spot": { id: "spot", title: "Spot the Robot", description: "A dynamic quadruped robot." },
  };

  // データ取得
  const achievement = achievements[id as keyof typeof achievements];

  // レスポンス生成
  if (achievement) {
    return new Response(
      JSON.stringify({ success: true, data: achievement }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // データが見つからない場合でも200を返す
  return new Response(
    JSON.stringify({ success: false, error: `Achievement with ID "${id}" not found.` }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};