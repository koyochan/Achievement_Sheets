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
  duration: number;
}