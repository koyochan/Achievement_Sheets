import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer } from "recharts";
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

// データ型に基づくProps定義
interface AchievementSheetProps {
  data: AchievementData;
}

// AchievementSheet コンポーネント
const AchievementSheet: React.FC<AchievementSheetProps> = ({ data }) => {
  if (!data) return <div>データが見つかりません。</div>; // データがない場合のフォールバック

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* タイトル */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">アチーブメントシート</h1>
      </div>

      {/* 基本情報セクション */}
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

      {/* 今日の成果物セクション */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">今日の成果物</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">（写真がここに表示されます）</p>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> 写真をアップロード
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 振り返りセクション */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">振り返り</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg italic">&ldquo;{data.teacher_comment}&rdquo;</p>
        </CardContent>
      </Card>

      {/* 目標と進捗セクション */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">目標と進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Target className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold text-gray-700">目標:</p>
                <p className="text-gray-600">{data.goal}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-700">進捗:</p>
              <p className="text-gray-600 mb-2">{data.progress}</p>
              <Progress value={data.progress_percentage} className="w-full" />
              <p className="text-right text-sm text-gray-500">{data.progress_percentage}% 完了</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2 bg-yellow-100 p-4 rounded-lg">
            <Star className="text-yellow-500" />
            <p className="text-xl font-bold text-yellow-700">獲得XP: {data.xp_earned} XP</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementSheet;