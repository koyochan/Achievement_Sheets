import React, { useState } from "react";
import AchievementSheet, { AchievementData } from "@/components/_AchivementSeat";
import AchievementForm from "@/components/_AchievementForm";

const AchievementManagementPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<AchievementData | null>(null);

  // フォーム送信ハンドラー
  const handleFormSubmit = (data: AchievementData) => {
    console.log("フォーム送信データ:", data);
    setSubmittedData(data);
  };

  return (
    <>
      {/* フォーム部分 */}
      <div className="p-6">
        <AchievementForm 
          onSubmit={handleFormSubmit} 
          initialData={{}} 
        />
      </div>

      {/* AchievementSheetを動的に表示 */}
      {submittedData ? (
        <div className="mt-8">
          <AchievementSheet 
            data={submittedData} 
          />
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-600">まだデータが入力されていません。</div>
      )}
    </>
  );
};

export default AchievementManagementPage;