import "../styles/globals.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, User, Activity, Target, Upload, Star } from "lucide-react";
import { GetServerSideProps } from "next";

interface Rating {
  skill: string;
  value: number;
}

interface AchievementData {
  student_name: string;
  date: string;
  teacher: string;
  activity: string;
  goal: string;
  progress: string;
  progress_percentage: number;
  ratings: Rating[];
  xp_earned: number;
  teacher_comment: string;
}

// サーバー側でデータを取得する関数
async function fetchAchievementData(): Promise<AchievementData> {
  try {
    // 実際にはAPIやデータベースからデータを取得します
    return {
      student_name: "山田 太郎",
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
    };
  } catch (error) {
    console.error("データ取得エラー:", error);
    throw new Error("データの取得に失敗しました");
  }
}

const AchievementSheet: React.FC<{ data: AchievementData }> = ({ data }) => {
  if (!data) {
    return <div>データが見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">アチーブメントシート</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="text-blue-500" />
              <p className="text-lg">
                <strong className="text-gray-700">生徒名:</strong> {data.student_name}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500" />
              <p className="text-lg">
                <strong className="text-gray-700">日付:</strong> {data.date}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="text-blue-500" />
              <p className="text-lg">
                <strong className="text-gray-700">担当者:</strong> {data.teacher}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="text-blue-500" />
              <p className="text-lg">
                <strong className="text-gray-700">活動内容:</strong> {data.activity}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">評価セクション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-3xl mx-auto">
            <ChartContainer
              config={{
                ratings: {
                  label: "評価",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="aspect-video"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.ratings}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#4a5568" }} />
                  <Radar dataKey="value" fill="var(--color-ratings)" fillOpacity={0.6} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">振り返り</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg italic">&ldquo;{data.teacher_comment}&rdquo;</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await fetchAchievementData();
    return { props: { data } };
  } catch (error) {
    console.error("サーバーサイドエラー:", error);
    return { props: { data: null } };
  }
};

export default AchievementSheet;