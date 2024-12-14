import React, { useState } from "react";
import AchievementSheet, { AchievementData } from "@/components/_AchivementSeat";
import AchievementForm from "@/components/_AchievementForm";

const AchievementManagementPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<AchievementData | null>(null);

  // フォーム送信ハンドラー
  const handleFormSubmit = (data: AchievementData) => {
    console.log("フォーム送信データ:", data);
    setSubmittedData(data); // フォーム送信後にデータを保存
  };

  return (
    <div className="p-6">
      {/* AchievementForm の表示制御 */}
      {!submittedData ? (
        <AchievementForm 
          onSubmit={handleFormSubmit} 
          initialData={{}} 
        />
      ) : (
        <AchievementSheet data={submittedData} />
      )}
    </div>
  );
};

export default AchievementManagementPage;