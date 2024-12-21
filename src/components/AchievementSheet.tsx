import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import { motion } from "framer-motion";

interface Rating {
  skill: string;
  value: number;
}

export interface AchievementData {
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
  start_time: number;
  end_time: number;
  duration: number;
}

interface AchievementSheetProps {
  data: AchievementData;
}

const AchievementSheet: React.FC<AchievementSheetProps> = ({ data }) => {
  if (!data) return <div className="text-black">データが見つかりません。</div>;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto p-6 space-y-8 bg-white min-h-screen">
      {/* Title */}
      <motion.div
        className="bg-black text-white p-8 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center">アチーブメントシート</h1>
      </motion.div>

      {/* Basic Information Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
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
      </motion.div>

      {/* Goal and Progress Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
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
      </motion.div>

      {/* Evaluation Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-black">評価セクション</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-lg mx-auto">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={data.ratings}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#4a5568" }} />
                  <PolarRadiusAxis
                    domain={[0, 5]}
                    tick={{ fill: "#4a5568" }}
                    axisLine={false}
                    tickFormatter={() => ""}
                    tickCount={6}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#2d3748"
                    fill="#2d3748"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Teacher's Comment Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-black">振り返り</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg italic">&ldquo;{data.teacher_comment}&rdquo;</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Experience Points Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
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
      </motion.div>
    </div>
  );
};

export default AchievementSheet;