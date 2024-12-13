'use client'

import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const AchievementSheet = () => {
  const data = {
    student_name: "山田 太郎",
    date: "2024-12-12",
    teacher: "佐藤 先生",
    activity: "Scratchでのゲーム作成",
    goal: "キャラクターが動くゲームを作る",
    progress: "キャラクターの動作を実装済み",
    ratings: [
      { skill: "集中力", value: 4 },
      { skill: "習得度", value: 5 },
      { skill: "創造性", value: 3 },
      { skill: "問題解決能力", value: 4 },
      { skill: "コミュニケーション能力", value: 5 },
    ],
    xp_earned: 21,
    teacher_comment: "集中して頑張りました。次回はスコア機能に挑戦しましょう。",
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        アチーブメントシート
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg">
              <strong className="text-gray-600">生徒名:</strong> {data.student_name}
            </p>
            <p className="text-lg">
              <strong className="text-gray-600">日付:</strong> {data.date}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg">
              <strong className="text-gray-600">担当者:</strong> {data.teacher}
            </p>
            <p className="text-lg">
              <strong className="text-gray-600">活動内容:</strong> {data.activity}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>評価セクション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-lg mx-auto">
            <ChartContainer
              config={{
                ratings: {
                  label: "評価",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="aspect-square"
            >
              <RadarChart data={data.ratings}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <Radar dataKey="value" fill="var(--color-ratings)" fillOpacity={0.6} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AchievementSheet;