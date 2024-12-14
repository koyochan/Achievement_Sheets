import React, { useState } from "react";

interface AchievementFormProps {
  onSubmit: (formData: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

const AchievementForm: React.FC<AchievementFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
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