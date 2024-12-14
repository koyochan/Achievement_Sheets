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
    ratings: [],
    xp_earned: 0,
    teacher_comment: "",
    ...initialData,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    // 数値型の値を正しく処理
    const parsedValue =
      name === "progress_percentage" || name === "xp_earned"
        ? Number(value)
        : value;

    setFormData({ ...formData, [name]: parsedValue });
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
        <label htmlFor="student_name" className="block text-gray-700 font-bold mb-1">
          生徒名:
        </label>
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
        <label htmlFor="date" className="block text-gray-700 font-bold mb-1">
          日付:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="teacher" className="block text-gray-700 font-bold mb-1">
          担当者:
        </label>
        <input
          type="text"
          id="teacher"
          name="teacher"
          value={formData.teacher || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="activity" className="block text-gray-700 font-bold mb-1">
          活動内容:
        </label>
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
        <label htmlFor="goal" className="block text-gray-700 font-bold mb-1">
          目標:
        </label>
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
        <label htmlFor="progress" className="block text-gray-700 font-bold mb-1">
          進捗状況:
        </label>
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
        <label htmlFor="progress_percentage" className="block text-gray-700 font-bold mb-1">
          進捗率 (%):
        </label>
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
        <label htmlFor="xp_earned" className="block text-gray-700 font-bold mb-1">
          獲得XP:
        </label>
        <input
          type="number"
          id="xp_earned"
          name="xp_earned"
          value={formData.xp_earned || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="teacher_comment" className="block text-gray-700 font-bold mb-1">
          コメント:
        </label>
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