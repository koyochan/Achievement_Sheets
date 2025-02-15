import type { APIRoute } from 'astro';
import { AchievementData } from '@/type';

export const GET: APIRoute = async ({ params }) => {
  const id: string | undefined = params.id;

  // `id` が undefined の場合にエラーを防ぐ
  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'ID is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ダミーデータ
  const achievements: Record<string, AchievementData> = {
    "clifford": {
      created_at: new Date(),
      updated_at: new Date(),
      student_name: "",
      date: "",
      teacher: "",
      activity: "",
      goal: "",
      progress: "",
      progress_percentage: 0,
      ratings: [4, 5, 3, 4, 5],
      xp_earned: 150,
      teacher_comment: "素晴らしい進捗です！",
      start_time: 600, // 9:00 AM
      end_time: 650, // 10:20 AM
      duration: 120, // 120分 (2時間)
    },
    "rover": {
      created_at: new Date(),
      updated_at: new Date(),
      student_name: "佐藤 花子",
      date: "2025-01-02",
      teacher: "鈴木 一郎",
      activity: "ロボット制御学習",
      goal: "ロボットのプログラム作成",
      progress: "順調",
      progress_percentage: 90,
      ratings: [5, 5, 4, 5, 4],
      xp_earned: 200,
      teacher_comment: "努力が成果に繋がっています！",
      start_time: 830, // 8:30 AM
      end_time: 1000, // 10:00 AM
      duration: 90, // 90分 (1.5時間)
    },
    "spot": {
      created_at: new Date(),
      updated_at: new Date(),
      student_name: "鈴木 太郎",
      date: "20250103",
      teacher: "高橋 花子",
      activity: "IoTデバイス学習",
      goal: "IoTデバイスの接続",
      progress: "やや遅れ",
      progress_percentage: 60,
      ratings: [3, 4, 3, 3, 4],
      xp_earned: 120,
      teacher_comment: "あと少しで目標に到達できます！",
      start_time: 600, // 10:30 AM
      end_time: 650, // 12:00 PM
      duration: 90, // 90分 (1.5時間)
    },
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