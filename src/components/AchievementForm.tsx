import React, { useState } from "react";
import { AchievementData } from "./AchievementSheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StartRating";
import { ProgressInput } from "./ProgressInput";
import { DatePicker } from "./DataPicker";

interface AchievementFormProps {
  onSubmit: (formData: AchievementData) => void;
  initialData?: Partial<AchievementData>;
}

// 15分単位の時間リストを生成
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      options.push(formattedTime);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

// 時間を分単位の数値に変換する関数
const timeStringToNumber = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

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
      { skill: "集中力", value: 0 },
      { skill: "創造性", value: 0 },
      { skill: "習得度", value: 0 },
      { skill: "コミュニケーション能力", value: 0 },
      { skill: "問題解決能力", value: 0 },
    ],
    teacher_comment: "",
    start_time: 0,
    end_time: 0,
    ...initialData,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: timeStringToNumber(value) });
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

    const confirmed = window.confirm("Firestoreの情報が更新されます。本当によろしいですか？");

    if (!confirmed) {
      console.log("操作がキャンセルされました");
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
      teacher_comment: formData.teacher_comment || "",
      xp_earned: 0,
      start_time: formData.start_time || 0,
      end_time: formData.end_time || 0,
    };

    onSubmit(completedData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>学習記録フォーム</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* 他のフィールド */}
            <div className="space-y-2">
              <Label htmlFor="start_time">開始時間</Label>
              <select
                id="start_time"
                name="start_time"
                value={formData.start_time || 0}
                onChange={handleTimeSelectChange}
                className="w-full border p-2 rounded"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time">終了時間</Label>
              <select
                id="end_time"
                name="end_time"
                value={formData.end_time || 0}
                onChange={handleTimeSelectChange}
                className="w-full border p-2 rounded"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            更新
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AchievementForm;