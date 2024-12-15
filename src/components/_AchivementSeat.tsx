import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer } from "recharts"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, User, Activity, Target, Upload, Star } from 'lucide-react'
import { motion } from "framer-motion"

// Data type definitions
interface Rating {
  skill: string
  value: number
}

export interface AchievementData {
  student_name: string
  date: string
  teacher: string
  activity: string
  goal: string
  progress: string
  progress_percentage: number
  ratings: Rating[]
  xp_earned: number
  teacher_comment: string
}

// Props definition based on data type
interface AchievementSheetProps {
  data: AchievementData
}

// AchievementSheet component
const AchievementSheet: React.FC<AchievementSheetProps> = ({ data }) => {
  if (!data) return <div className="text-black">データが見つかりません。</div>

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Information */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <Card className="bg-white border-gray-200 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="text-gray-600" />
                <p className="text-lg text-gray-800">
                  <strong className="text-black">生徒名:</strong> {data.student_name}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-600" />
                <p className="text-lg text-gray-800">
                  <strong className="text-black">日付:</strong> {data.date}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Teacher Information */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <Card className="bg-white border-gray-200 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="text-gray-600" />
                <p className="text-lg text-gray-800">
                  <strong className="text-black">担当者:</strong> {data.teacher}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="text-gray-600" />
                <p className="text-lg text-gray-800">
                  <strong className="text-black">活動内容:</strong> {data.activity}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Evaluation Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
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

      {/* Today's Achievement Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-black">今日の成果物</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">（写真がここに表示されます）</p>
              <Button variant="outline" className="bg-white text-black border-black hover:bg-black hover:text-white transition-colors duration-300">
                <Upload className="mr-2 h-4 w-4" /> 写真をアップロード
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reflection Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-black">振り返り</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg italic">&ldquo;{data.teacher_comment}&rdquo;</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Goals and Progress Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-black">目標と進捗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Target className="text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold text-black">目標:</p>
                  <p className="text-gray-700">{data.goal}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-black">進捗:</p>
                <p className="text-gray-700 mb-2">{data.progress}</p>
                <div className="relative w-full bg-gray-200 rounded h-4 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gray-600"
                    style={{ width: `${data.progress_percentage}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-500">{data.progress_percentage}% 完了</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-2 bg-gray-100 p-4 rounded-lg">
              <Star className="text-gray-600" />
              <p className="text-xl font-bold text-gray-800">獲得XP: {data.xp_earned} XP</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AchievementSheet
