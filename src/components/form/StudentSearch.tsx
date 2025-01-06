import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Student {
  id: string;
  furigana: string; // furigana を追加
  displayName: string;
}

interface StudentSearchProps {
  searchTerm: string;
  results: Student[];
  loading: boolean;
  onSearchChange: (value: string) => void;
  onSelectStudent: (student: Student) => void;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({
  searchTerm,
  results,
  loading,
  onSearchChange,
  onSelectStudent,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student); // 選択した生徒を保存
    onSelectStudent(student); // 親コンポーネントにも通知
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="searchTerm">生徒名で検索</Label>
        <Input
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="名前を入力してください"
          autoComplete="off"
        />
        <div className="border rounded mt-2 bg-white max-h-40 overflow-y-auto">
          {loading && (
            <div className="p-2 text-gray-500 flex justify-center items-center">
              検索中...
            </div>
          )}
          {!loading && results.length > 0 && (
            <ul className="divide-y divide-gray-200">
              {results.map((student) => (
                <li key={student.id}>
                  <button
                    onClick={() => handleStudentSelect(student)}
                    className="w-full text-left p-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                  >
                    {student.displayName} ({student.furigana})
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!loading && results.length === 0 && searchTerm && (
            <div className="p-2 text-gray-500 text-center">
              一致する生徒が見つかりませんでした。
            </div>
          )}
        </div>
      </div>
      {/* 選択された生徒の表示 */}
      {selectedStudent && (
        <div className="p-4 border rounded bg-gray-50">
          <p>
            生徒名: <strong>{selectedStudent.displayName}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentSearch;