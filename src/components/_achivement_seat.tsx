import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, User, Activity, Target, Upload, Star } from "lucide-react";

// データ型定義
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

// コンポーネントのProps型定義
interface AchievementSheetProps {
  data: AchievementData; // Astroから渡されるデータ
}

const AchievementSheet: React.FC<AchievementSheetProps> = ({ data }) => {
  if (!data) return <div>Loading...</div>; // データがない場合のフォールバック

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">アチーブメントシート</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 生徒情報 */}
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

        {/* 担当者情報 */}
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

      {/* 評価セクション */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">評価セクション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-lg mx-auto">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={data.ratings}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#4a5568" }} />
                <Radar dataKey="value" fill="#4A90E2" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* その他のセクション */}
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

export default AchievementSheet;