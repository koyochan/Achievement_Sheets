import { AchievementData } from "@/type";

export const getInitialFormData = (): Partial<AchievementData> => ({
  created_at: new Date(),
  updated_at: new Date(),
  student_name: "",
  date: "",
  teacher: "",
  activity: "",
  goal: "",
  progress: "",
  progress_percentage: 0,
  ratings: [0, 0, 0, 0, 0],
  xp_earned: 0,
  teacher_comment: "",
  start_time: 540, // 初期値を9:00に設定 (分単位)
  end_time: 555, // 初期値を9:15に設定 (分単位)
  duration: 15, 
});