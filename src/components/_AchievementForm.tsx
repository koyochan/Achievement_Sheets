import React, { useState } from "react";
import { AchievementData } from "./_AchivementSeat";

interface AchievementFormProps {
  onSubmit: (formData: AchievementData) => void;
  initialData?: Partial<AchievementData>;
}

const AchievementForm: React.FC<AchievementFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<AchievementData>>({
    student_name: "",
    date: "",
    teacher: "",
    activity: "",
    goal: "",
    progress: "",
    progress_percentage: 0,
    ratings: [
      { skill: "集中力", value: 3 },
      { skill: "創造性", value: 3 },
      { skill: "習得度", value: 3 },
      { skill: "コミュニケーション能力", value: 3 },
      { skill: "問題解決能力", value: 3 },
    ],
    xp_earned: 0,
    teacher_comment: "",
    ...initialData,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (index: number, value: number) => {
    const updatedRatings = [...(formData.ratings || [])];
    updatedRatings[index].value = value;
    setFormData({ ...formData, ratings: updatedRatings });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.student_name || !formData.activity || !formData.teacher_comment) {
      console.error("必須フィールドが入力されていません。");
      return;
    }

    const completedData: AchievementData = {
      student_name: formData.student_name || "",
      date: formData.date || new Date().toISOString().split("T")[0],
      teacher: formData.teacher || "未設定",
      activity: formData.activity || "",
      goal: formData.goal || "未設定",
      progress: formData.progress || "未設定",
      progress_percentage: formData.progress_percentage || 0,
      ratings: formData.ratings || [],
      xp_earned: formData.xp_earned || 0,
      teacher_comment: formData.teacher_comment || "",
    };

    onSubmit(completedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-100 rounded shadow-md">
      <div>
        <label htmlFor="student_name" className="block text-gray-700 font-bold mb-1">生徒名:</label>
        <input
          type="text"
          id="student_name"
          name="student_name"
          value={formData.student_name || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

     <div>
  <label htmlFor="date" className="block text-gray-700 font-bold mb-1">日付:</label>
  <input
    type="text" // 自由入力を許可
    id="date"
    name="date"
    value={formData.date || ""} // `undefined` の場合は空文字列を表示
    onChange={(e) => {
      const value = e.target.value;
      const sanitizedValue = value
        .replace(/[^0-9]/g, "") // 半角数字以外を削除
        .slice(0, 8); // 8桁以上を切り捨て

      setFormData({ ...formData, date: sanitizedValue });
    }}
    onBlur={(e) => {
      // カスタムバリデーション
      if ((formData.date || "").length !== 8) { // `formData.date` が `undefined` の場合に対応
        alert("日付は8桁の半角数字 (yyyyMMdd) で入力してください");
        setFormData({ ...formData, date: "" }); // 不正入力をリセット
      }
    }}
    className="w-full p-2 border border-gray-300 rounded"
    placeholder="yyyyMMdd" // 入力例を表示
    required
  />
</div>

      <div>
        <label htmlFor="activity" className="block text-gray-700 font-bold mb-1">活動内容:</label>
        <input
          type="text"
          id="activity"
          name="activity"
          value={formData.activity || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="goal" className="block text-gray-700 font-bold mb-1">目標:</label>
        <input
          type="text"
          id="goal"
          name="goal"
          value={formData.goal || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="progress" className="block text-gray-700 font-bold mb-1">進捗:</label>
        <input
          type="text"
          id="progress"
          name="progress"
          value={formData.progress || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="progress_percentage" className="block text-gray-700 font-bold mb-1">進捗率 (%):</label>
        <input
          type="number"
          id="progress_percentage"
          name="progress_percentage"
          value={formData.progress_percentage || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="xp_earned" className="block text-gray-700 font-bold mb-1">獲得XP:</label>
        <input
          type="number"
          id="xp_earned"
          name="xp_earned"
          value={formData.xp_earned || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* 評価セクション */}
      <div>
        <h3 className="text-lg font-bold text-gray-700 mb-4">評価セクション:</h3>
        {(formData.ratings || []).map((rating, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">{rating.skill}:</label>
            <input
              type="range"
              min="1"
              max="5"
              value={rating.value}
              onChange={(e) => handleRatingChange(index, Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">現在の評価: {rating.value}</p>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="teacher_comment" className="block text-gray-700 font-bold mb-1">コメント:</label>
        <textarea
          id="teacher_comment"
          name="teacher_comment"
          value={formData.teacher_comment || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        更新
      </button>
    </form>
  );
};

export default AchievementForm;