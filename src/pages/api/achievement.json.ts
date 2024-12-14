import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      student_name: "kota",
      date: "2024-12-12",
      teacher: "佐藤 先生",
      activity: "Scratchでのゲーム作成",
      goal: "キャラクターが動くゲームを作る",
      progress: "キャラクターの動作を実装済み",
      progress_percentage: 60,
      ratings: [
        { skill: "集中力", value: 4 },
        { skill: "習得度", value: 5 },
        { skill: "創造性", value: 3 },
        { skill: "問題解決能力", value: 4 },
        { skill: "コミュニケーション能力", value: 5 },
      ],
      xp_earned: 21,
      teacher_comment: "集中して頑張りました。次回はスコア機能に挑戦しましょう。",
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8", // charsetを明示
      },
    }
  );
};