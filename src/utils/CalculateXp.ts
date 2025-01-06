export const calculateXp = (progressPercentage: number, ratings: number[]): number => {
  const baseXp = progressPercentage; // 基本XP = 進捗率
  const skillBonus = ratings.reduce((total, rating) => total + rating, 0); // スキル値の合計
  return baseXp + skillBonus; // 合計XP
};