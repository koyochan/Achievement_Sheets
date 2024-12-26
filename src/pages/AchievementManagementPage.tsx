import React, { useState } from "react";
import AchievementSheet, { AchievementData } from "@/components/AchievementSheet";
import AchievementForm from "@/components/AchievementForm";
import { saveAchievementToFirestore } from "@/utils/firestore";
import { calculateXp } from "@/utils/CalculateXp";
const AchievementManagementPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<AchievementData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (data: AchievementData) => {
    const userId = "User123";
    console.log("フォーム送信データ:", data);

    try {
      setIsSaving(true);
      setErrorMessage(null);

      const xpEarned = calculateXp(data.progress_percentage, data.ratings);
      const dataWithXp = {
        ...data,
        xp_earned: xpEarned,
      };

      await saveAchievementToFirestore(userId, dataWithXp);
      

      setSubmittedData(dataWithXp);
    } catch (error) {
      setErrorMessage("データ保存中にエラーが発生しました。");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      {/* 保存中のローディング表示 */}
      {isSaving && <p className="text-blue-500">保存中...</p>}

      {/* エラーメッセージの表示 */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* AchievementForm の表示制御 */}
      {!submittedData ? (
        <AchievementForm
          onSubmit={handleFormSubmit} 
        />
      ) : (
        <AchievementSheet data={submittedData} />
      )}
    </div>
  );
};

export default AchievementManagementPage;