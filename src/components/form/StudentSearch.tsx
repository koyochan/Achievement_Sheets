import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentSearchProps {
  searchTerm: string;
  results: { id: string; displayName: string }[];
  loading: boolean;
  onSearchChange: (value: string) => void;
  onSelectStudent: (student: { id: string; displayName: string }) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  searchTerm,
  results,
  loading,
  onSearchChange,
  onSelectStudent,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="searchTerm">生徒名で検索</Label>
      <Input
        id="searchTerm"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="名前を入力してください"
        autoComplete="off"
      />
      <ul className="border rounded mt-2 bg-white max-h-40 overflow-y-auto">
        {loading && <li className="p-2 text-gray-500">検索中...</li>}
        {results.map((student) => (
          <li
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {student.displayName}
          </li>
        ))}
        {!loading && results.length === 0 && searchTerm && (
          <li className="p-2 text-gray-500">一致する生徒が見つかりませんでした。</li>
        )}
      </ul>
    </div>
  );
};

export default StudentSearch;