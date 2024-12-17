export interface Rating {
  skill: string;
  value: number;
}

export const calculateXp = (progressPercentage: number, ratings: Rating[]): number => {
  const baseXp = progressPercentage; // 基本XP = 進捗率
  const skillBonus = ratings.reduce((total, rating) => total + rating.value, 0); // スキル値の合計
  return baseXp + skillBonus; // 合計XP
};