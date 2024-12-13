// 'use client'

// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
// import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"

// const AchievementSheet = () => {
//   const data = {
//     student_name: "山田 太郎",
//     date: "2024-12-12",
//     teacher: "佐藤 先生",
//     activity: "Scratchでのゲーム作成",
//     goal: "キャラクターが動くゲームを作る",
//     progress: "キャラクターの動作を実装済み",
//     ratings: [
//       { skill: "集中力", value: 4 },
//       { skill: "習得度", value: 5 },
//       { skill: "創造性", value: 3 },
//       { skill: "問題解決能力", value: 4 },
//       { skill: "コミュニケーション能力", value: 5 },
//     ],
//     xp_earned: 21,
//     teacher_comment: "集中して頑張りました。次回はスコア機能に挑戦しましょう。",
//   }

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-center text-gray-800">
//         アチーブメントシート
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardContent className="pt-6">
//             <p className="text-lg">
//               <strong className="text-gray-600">生徒名:</strong> {data.student_name}
//             </p>
//             <p className="text-lg">
//               <strong className="text-gray-600">日付:</strong> {data.date}
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="pt-6">
//             <p className="text-lg">
//               <strong className="text-gray-600">担当者:</strong> {data.teacher}
//             </p>
//             <p className="text-lg">
//               <strong className="text-gray-600">活動内容:</strong> {data.activity}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>評価セクション</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="w-full max-w-lg mx-auto">
//             <ChartContainer
//               config={{
//                 ratings: {
//                   label: "評価",
//                   color: "hsl(var(--chart-1))",
//                 },
//               }}
//               className="aspect-square"
//             >
//               <RadarChart data={data.ratings}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="skill" />
//                 <Radar dataKey="value" fill="var(--color-ratings)" fillOpacity={0.6} />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//               </RadarChart>
//             </ChartContainer>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>今日の成果物</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg border border-dashed border-gray-300">
//             <p className="text-gray-500">（写真がここに表示されます）</p>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>振り返り</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-700">{data.teacher_comment}</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>目標と進捗</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-lg">
//             <strong className="text-gray-600">目標:</strong> {data.goal}
//           </p>
//           <p className="text-lg">
//             <strong className="text-gray-600">進捗:</strong> {data.progress}
//           </p>
//           <p className="text-lg mt-4">
//             <strong className="text-gray-600">獲得XP:</strong> {data.xp_earned} XP
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default AchievementSheet

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const ratings = [
  { skill: "集中力", value: 4 },
  { skill: "習得度", value: 5 },
  { skill: "創造性", value: 3 },
  { skill: "問題解決能力", value: 4 },
  { skill: "コミュニケーション能力", value: 5 },
];

const SimpleRadarChart = () => {
  return (
    <RadarChart data={ratings} width={400} height={400}>
      <PolarGrid />
      <PolarAngleAxis dataKey="skill" />
      <Radar dataKey="value" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};

export default SimpleRadarChart;