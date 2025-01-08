import React, { useState } from "react";
import AchievementSheet, { AchievementData } from "@/components/AchievementSheet";
import AchievementForm from "@/components/AchievementForm";
import {SaveUserAttendanceField} from "@/utils/firestore";
import { calculateXp } from "@/utils/CalculateXp";
const AchievementManagementPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<AchievementData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (data: AchievementData) => {
    const userId = "displayName=%E6%9D%BE%E4%BA%95%20%E5%84%AA%E7%9F%A5Jr&furigana=%E3%81%BE%E3%81%A4%E3%81%84%20%E3%82%86%E3%81%86%E3%81%97%E3%81%98%E3%82%85%E3%81%AB%E3%81%82&birthday=19971012";
    console.log("フォーム送信データ:", data);

    try {
      setIsSaving(true);
      setErrorMessage(null);

      const xpEarned = calculateXp(data.progress_percentage, data.ratings);
      // XPをStudentに追加
      const dataWithXp = {
        ...data,
        xp_earned: xpEarned,
      };

      await SaveUserAttendanceField(userId, dataWithXp);
      

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