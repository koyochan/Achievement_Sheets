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
      <motion.div
        className="bg-black text-white p-8 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center">アチーブメントシート</h1>
      </motion.div>

      {/* 評価セクション */}
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
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "#4a5568" }}
                  />
                  {/* スケールを 0 ~ 5 に固定 */}
                  <PolarRadiusAxis
                    domain={[0, 5]} // スケールを0~5に固定
                    tick={{ fill: "#4a5568" }}
                    axisLine={false}
                    tickFormatter={() => ""} // 数字を非表示
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
    </div>
  );
};
