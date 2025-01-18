import { AchievementData } from "@/type"

export const getInitialFormData = (): Partial<AchievementData> => ({
  student_name: "",
  date: "",
  teacher: "",
  activity: "",
  goal: "",
  progress: "",
  progress_percentage: 0,
  ratings: [0, 0, 0, 0, 0],
  teacher_comment: "",
  start_time: 540,
  end_time: 555,
  duration: 0,
});