import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { AchievementData, skills} from "./AchievementSheet";
import { db } from "../utils/firebase"; // Firebaseの初期化ファイル
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StartRating";
import { ProgressInput } from "./ProgressInput";
import { DatePicker } from "./DataPicker";
import { SkipBack } from "lucide-react";
import { StudentSearch } from "./form/StudentSearch";

interface Student {
  id: string;
  furigana: string;
  displayName: string;
}

interface AchievementFormProps {
  onSubmit: (data: AchievementData) => void; // 必須: フォーム送信時のコールバック
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      options.push(hour * 60 + minute); // 分単位で時間を管理
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

const AchievementForm: React.FC<AchievementFormProps> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // 選択された生徒を保持する状態
  const [formData, setFormData] = useState<Partial<AchievementData>>({
    student_name: "",
    date: "",
    teacher: "",
    activity: "",
    goal: "",
    progress: "",
    progress_percentage: 0,
    ratings: [
      0,
      0,
      0,
      0,
      0,
    ],
    teacher_comment: "",
    start_time: 540,
    end_time: 540,
  });

useEffect(() => {
  const fetchSuggestions = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const studentsSnapshot = await getDocs(collection(db, "Students"));

      const matchedResults: Student[] = studentsSnapshot.docs
        .filter((doc) => doc.id.includes(`furigana=${encodeURIComponent(searchTerm.trim())}`))
        .map((doc) => {
          const idParts = new URLSearchParams(doc.id);

          return {
            id: doc.id,
            displayName: decodeURIComponent(idParts.get("displayName") || ""),
            furigana: decodeURIComponent(idParts.get("furigana") || ""),
          };
        });

      console.log("検索結果:", matchedResults);

      setResults(matchedResults);
    } catch (error) {
      console.error("Firestore検索中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  };

  const timeoutId = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(timeoutId);
}, [searchTerm]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student); // 選択された生徒を保存
    setFormData({
      ...formData,
      student_name: student.displayName,
    });
 
    setSearchTerm(student.displayName); // 検索欄をクリア
    setResults([]); // 検索結果をクリア
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.start_time || !formData.end_time || formData.start_time >= formData.end_time) {
      alert("終了時間は開始時間より後である必要があります。");
      return;
    }
    
    onSubmit(formData as AchievementData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>学習記録フォーム</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* 生徒検索 */}

            <StudentSearch
            searchTerm={searchTerm}
            results={results}
            loading={loading}
            onSearchChange={setSearchTerm}
            onSelectStudent={handleStudentSelect}
            />

            {/* 他のフィールド */}
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
                  <span>{skills[index]}</span>
                  <StarRating
                    value={rating}
                    onChange={(value) => {
                      const updatedRatings = [...(formData.ratings || [])];
                      updatedRatings[index] = value;
                      setFormData({ ...formData, ratings: updatedRatings });
                    }}
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
                onChange={(e) =>
                  setFormData({ ...formData, start_time: Number(e.target.value) })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, end_time: Number(e.target.value) })
                }
                className="w-full border p-2 rounded"
              >
                {timeOptions
                  .filter((minutes) => minutes > (formData.start_time || 0))
                  .map((minutes) => (
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
  );
};

export default AchievementForm;