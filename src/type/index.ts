export const skills: string[] = [
  "集中力",
  "創造性",
  "習得度",
  "コミュニケーション能力",
  "問題解決能力",
];

export interface AchievementData {
  created_at: Date;
  updated_at: Date;
  student_name: string;
  date: string;
  teacher: string;
  activity: string;
  goal: string;
  progress: string;
  progress_percentage: number;
  ratings: number[];
  xp_earned: number;
  teacher_comment: string;
  start_time: number;
  end_time: number;
  duration: number;
}