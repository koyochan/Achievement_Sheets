import React, { useState, useEffect } from "react";
import { AchievementData } from "@/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./form/DataPicker";
import { StudentSearch, Student } from "./form/StudentSearch";

const AchievementForm: React.FC = () => {
  // [1] 状態管理
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<AchievementData>>({ duration: 0 }); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // [2] 生徒検索: API からデータを取得
  useEffect(() => {
    if (!searchTerm.trim() || selectedStudent) {
      setResults([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/students/search?searchTerm=${searchTerm.trim()}`);
        if (!res.ok) throw new Error("APIエラー");

        const data = await res.json();
        setResults(data.students || []);
      } catch (error) {
        console.error("生徒検索APIでエラー:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // デバウンス: 300ms
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedStudent]);

  // [3] フォーム入力変更
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // [4] 検索結果から生徒を選択
  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({ ...prev, student_name: student.displayName }));
    setSearchTerm(student.displayName);
  };

  // [5] 選択を解除
  const handleClearStudent = () => {
    setSelectedStudent(null);
    setFormData((prev) => ({ ...prev, student_name: "" }));
    setSearchTerm("");
  };

  // [6] フォーム送信
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // 生徒が未選択の場合エラー
    if (!selectedStudent) {
      setErrorMessage("生徒を選択してください。");
      setIsSubmitting(false);
      return;
    }

    // `duration` のバリデーション (15分単位)
    const duration = Number(formData.duration);
    if (!duration || duration < 15) {
      setErrorMessage("有効な学習時間 (15分単位) を選択してください。");
      setIsSubmitting(false);
      return;
    }

    // 日付を YYYYMMDD に変換
    const formattedDate = formData.date?.replace(/-/g, "") || "";

    // AchievementData 作成
    const achievementData: AchievementData = {
      ...(formData as AchievementData),
      duration,
      date: formattedDate,
      student_name: selectedStudent.displayName,
    };

    // [A] Firestore 更新前に確認ダイアログを表示
    const confirmMsg = `
以下の内容でFirestoreを更新します。よろしいですか？
----------------------------
生徒名   : ${achievementData.student_name}
日付     : ${achievementData.date}
学習時間 : ${achievementData.duration} 分
----------------------------
OKを押すと更新を実行します。
`;
    if (!window.confirm(confirmMsg.trim())) {
      setIsSubmitting(false);
      return;
    }

    try {
      // [B] 実際に API へ送信
      const response = await fetch("/api/achievements/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentid: selectedStudent.userid,
          AchievementData: achievementData,
        }),
      });

      if (!response.ok) {
        throw new Error("サーバーエラー");
      }

      console.log("送信成功:", await response.json());

      // フォームをリセット
      setSelectedStudent(null);
      setSearchTerm("");
      setFormData({ duration: 15 }); // 再度15にリセット
    } catch (error) {
      console.error("送信エラー:", error);
      setErrorMessage("データ保存中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔥 15分刻みのオプションを生成 (例: 15分 ~ 240分)
  const durationOptions = [];
  for (let i = 15; i <= 240; i += 15) {
    durationOptions.push(i);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>学習記録フォーム</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 生徒検索 */}
          <div className="space-y-4">
            {!selectedStudent ? (
              <StudentSearch
                searchTerm={searchTerm}
                results={results}
                loading={loading}
                onSearchChange={setSearchTerm}
                onSelectStudent={handleStudentSelect}
              />
            ) : (
              <div className="flex items-center gap-2 p-2 border rounded">
                <p className="text-gray-700">選択中: {selectedStudent.displayName}</p>
                <button type="button" onClick={handleClearStudent} className="text-red-500">
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* 日付選択 */}
          <DatePicker
            id="date"
            name="date"
            value={formData.date || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
          />

          {/* 15分刻みの学習時間 (duration) */}
          <div className="space-y-2">
            <Label htmlFor="duration">学習時間 (分) [15分刻み]</Label>
            <select
              id="duration"
              name="duration"
              value={formData.duration || 15}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {durationOptions.map((min) => (
                <option key={min} value={min}>
                  {min} 分
                </option>
              ))}
            </select>
          </div>

          {/* 送信ボタン */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "更新"}
          </Button>

          {/* エラーメッセージ表示 */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default AchievementForm;