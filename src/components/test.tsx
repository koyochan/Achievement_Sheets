import React, { useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase"; // Firebaseの初期化ファイル
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StartRating";
import { ProgressInput } from "./ProgressInput";
import { DatePicker } from "./DataPicker";

interface Rating {
  skill: string;
  value: number;
}

export interface AchievementData {
  student_name: string;
  date: string;
  teacher: string;
  activity: string;
  goal: string;
  progress: string;
  progress_percentage: number;
  ratings: Rating[];
  teacher_comment: string;
  start_time: number;
  end_time: number;
  duration: number;
}

interface Student {
  id: string;
  name: string;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      options.push(hour * 60 + minute);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

const numberToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const calculateDurationInMinutes = (start_time: number, end_time: number): number => {
  return end_time - start_time;
};

const AchievementForm: React.FC<{ onSubmit: (data: AchievementData) => void }> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  });

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("名前を入力してください。");
      return;
    }

    setLoading(true);

    try {
      const roleDocRef = doc(db, "Role", "children");
      const roleDocSnapshot = await getDoc(roleDocRef);

      if (!roleDocSnapshot.exists()) {
        console.warn("Roleコレクションのchildrenドキュメントが見つかりません。");
        setResults([]);
        setLoading(false);
        return;
      }

      const data = roleDocSnapshot.data();
      const childIds = Array.isArray(data.id) ? data.id : [];

      const userSnapshot = await getDocs(collection(db, "User"));
      const matchedResults: Student[] = userSnapshot.docs
        .filter((doc) =>
          childIds.includes(doc.id) &&
          doc.data().name.includes(searchTerm)
        )
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

      setResults(matchedResults);
    } catch (error) {
      console.error("Firestore検索中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  };

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
      start_time: formData.start_time || 0,
      end_time: formData.end_time || 0,
      duration: calculateDurationInMinutes(formData.start_time || 0, formData.end_time || 0),
    };

    onSubmit(completedData);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* 生徒検索 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="searchTerm">生徒名で検索</Label>
          <Input
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="名前を入力してください"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "検索中..." : "検索"}
        </Button>
      </div>
      <ul>
        {results.map((student) => (
          <li
            key={student.id}
            onClick={() => setFormData({ ...formData, student_name: student.name })}
            className="cursor-pointer"
          >
            {student.name}
          </li>
        ))}
      </ul>

      {/* 学習記録フォーム */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>学習記録フォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student_name">生徒名</Label>
                <Input
                  id="student_name"
                  name="student_name"
                  value={formData.student_name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* 他のフォームフィールド */}
              <div className="space-y-2">
                <Label htmlFor="teacher">担当教師</Label>
                <Input
                  id="teacher"
                  name="teacher"
                  value={formData.teacher || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">日付</Label>
                <DatePicker
                  id="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={(value) => setFormData({ ...formData, date: value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity">活動内容</Label>
                <Input
                  id="activity"
                  name="activity"
                  value={formData.activity || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">目標</Label>
                <Input
                  id="goal"
                  name="goal"
                  value={formData.goal || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress">進捗状況</Label>
                <Input
                  id="progress"
                  name="progress"
                  value={formData.progress || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress_percentage">進捗率</Label>
                <ProgressInput
                  id="progress_percentage"
                  name="progress_percentage"
                  value={formData.progress_percentage || 0}
                  onChange={(value) => setFormData({ ...formData, progress_percentage: value })}
                />
              </div>
              <div className="space-y-4">
                <Label>評価セクション</Label>
                {(formData.ratings || []).map((rating, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{rating.skill}</span>
                    <StarRating
                      value={rating.value}
                      onChange={(value) => handleRatingChange(index, value)}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher_comment">コメント</Label>
                <Textarea
                  id="teacher_comment"
                  name="teacher_comment"
                  value={formData.teacher_comment || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_time">開始時間</Label>
                <select
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: Number(e.target.value) })}
                  className="w-full border p-2 rounded"
                >
                  {timeOptions.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {numberToTimeString(minutes)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">終了時間</Label>
                <select
                  id="end_time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: Number(e.target.value) })}
                  className="w-full border p-2 rounded"
                >
                  {timeOptions.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {numberToTimeString(minutes)}
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
    </div>
  );
};

export default AchievementForm;