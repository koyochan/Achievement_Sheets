import React, { useState } from "react";
import AchievementSheet, { AchievementData } from "@/components/AchievementSheet";
import AchievementForm from "@/components/AchievementForm";
import {SaveUserAttendanceField} from "@/utils/firestore";
import { calculateXp } from "@/utils/CalculateXp";
const AchievementManagementPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<AchievementData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // ハードコードされているUserIDをStudent Searchで選択したIDを使用するように変更する
  const handleFormSubmit = async (AchievementData: AchievementData, userId: string) => {
    console.log("フォーム送信データ:", AchievementData);

    try {
      setIsSaving(true);
      setErrorMessage(null);

      const created_at = new Date(); // 現在の日時を生成
      const updated_at = new Date(); // 現在の日時を生成
      const xpEarned = calculateXp(AchievementData.progress_percentage, AchievementData.ratings);
      // XPをStudentに追加
      const dataWithXp = {
        ...AchievementData,
        xp_earned: xpEarned,
        created_at: created_at,
        updated_at: updated_at,
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