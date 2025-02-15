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
        const res = await fetch(`/api/students/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
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

  // [3] フォーム入力変更時の処理
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // [4] 検索結果から生徒を選択
  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({ ...prev, student_name: student.displayName }));
    setSearchTerm(student.displayName); // 検索欄を生徒名にする
  };

  // [5] 選択を解除する
  const handleClearStudent = () => {
    setSelectedStudent(null);
    setFormData((prev) => ({ ...prev, student_name: "" }));
    setSearchTerm("");
  };

  // [6] フォーム送信時の処理
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

    // `duration` のバリデーション
    const duration = Number(formData.duration);
    if (!duration || duration <= 0) {
      setErrorMessage("有効な学習時間 (分) を入力してください。");
      setIsSubmitting(false);
      return;
    }

    // 日付を YYYYMMDD に変換 (例: "2023-05-01" -> "20230501")
    const formattedDate = formData.date?.replace(/-/g, "") || "";

    // AchievementData の形に整形
    const achievementData: AchievementData = {
      ...(formData as AchievementData),
      duration,
      date: formattedDate,
      student_name: selectedStudent.displayName,
    };

    try {
      // 🔥 API にデータを送信
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

      // 🔥 成功時
      console.log("送信成功:", await response.json());

      // フォームをリセット
      setSelectedStudent(null);
      setSearchTerm("");
      setFormData({ duration: 0 });
    } catch (error) {
      console.error("送信エラー:", error);
      setErrorMessage("データ保存中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>学習記録フォーム</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* [A] 生徒検索部分 */}
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

          {/* [B] 日付選択 */}
          <DatePicker
            id="date"
            name="date"
            value={formData.date || ""}
            onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
          />

          {/* [C] 学習時間 (duration) を直接入力 */}
          <div className="space-y-2">
            <Label htmlFor="duration">学習時間 (分)</Label>
            <input
              id="duration"
              name="duration"
              type="number"
              min="1"
              value={formData.duration || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="学習時間を入力 (例: 60)"
            />
          </div>

          {/* [D] 送信ボタン */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "更新"}
          </Button>

          {/* [E] エラーメッセージ表示 */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default AchievementForm;