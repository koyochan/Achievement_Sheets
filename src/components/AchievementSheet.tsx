// AchievementSheet.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer, PolarRadiusAxis } from "recharts";
import { AchievementData, skills } from "@/type";
import React, { useEffect, useState } from "react";

interface AchievementSheetProps {
  data: AchievementData;
}

export const AchievementSheet: React.FC<AchievementSheetProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ描画するためのフラグを設定
    setIsClient(true);
  }, []);
  if (!data) {
    return <div className="text-black">データが見つかりません。</div>;
  }

  const formatDuration = (duration: number): string => {
    if (duration === undefined || duration === null || isNaN(duration)) {
      console.warn("Invalid duration:", duration);
      return "不明";
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}時間${minutes}分`;
  };

  const radarData = skills.map((skill, index) => ({
    skill,
    value: Array.isArray(data.ratings) && index < data.ratings.length ? data.ratings[index] : 0,
  }));
// 個別の要素を確認
radarData.forEach((item, index) => {
  console.log(`Skill ${index}:`, item.skill, "Value:", item.value);
});

  return (
    <div className="container mx-auto p-6 space-y-8 bg-white min-h-screen">
      {/* Title */}
      <div className="bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">アチーブメントシート</h1>
      </div>

      {/* Basic Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Information */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardContent>
            <h2 className="text-lg font-bold">生徒情報</h2>
            <p className="text-gray-700"><strong>生徒名:</strong> {data.student_name}</p>
            <p className="text-gray-700"><strong>日付:</strong> {data.date}</p>
          </CardContent>
        </Card>

        {/* Teacher Information */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardContent>
            <h2 className="text-lg font-bold">担当者情報</h2>
            <p className="text-gray-700"><strong>担当者:</strong> {data.teacher}</p>
            <p className="text-gray-700"><strong>活動内容:</strong> {data.activity}</p>
          </CardContent>
        </Card>
      </div>

      {/* Goal and Progress Section */}
      <Card className="bg-white border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-black">目標と進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700"><strong>目標:</strong> {data.goal}</p>
          <p className="text-gray-700"><strong>進捗:</strong> {data.progress}</p>
          <div className="relative w-full bg-gray-200 rounded h-4 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gray-600"
              style={{ width: `${data.progress_percentage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-500">{data.progress_percentage}% 完了</p>
        </CardContent>
      </Card>

      {/* Evaluation Section */}
      <Card className="bg-white border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-black">評価セクション</CardTitle>
        </CardHeader>
        <CardContent>
          {isClient && ( // クライアントサイドでのみ描画
            <div className="w-full max-w-lg mx-auto" style={{ height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#4a5568" }} />
                  <PolarRadiusAxis domain={[0, 5]} tick={{ fill: "#4a5568" }} axisLine={false} tickFormatter={() => ""} tickCount={6} />
                  <Radar dataKey="value" stroke="#2d3748" fill="#2d3748" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Duration Section */}
      <Card className="bg-white border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-black">滞在時間</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg">
            <strong>{formatDuration(data.duration)}</strong>
          </p>
        </CardContent>
      </Card>

      {/* Teacher's Comment Section */}
      <Card className="bg-white border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-black">振り返り</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg italic">&ldquo;{data.teacher_comment}&rdquo;</p>
        </CardContent>
      </Card>

      {/* Experience Points Section */}
      <Card className="bg-white border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-black">獲得XP</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg">
            <strong>{data.xp_earned} XP</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementSheet;