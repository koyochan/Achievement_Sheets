import React, { useState } from "react";
import AchievementSheet, { AchievementData } from "@/components/AchievementSheet";
import AchievementForm from "@/components/AchievementForm";
import { saveAchievementToFirestore } from "@/utils/firestore"; // Firestore 操作用関数をインポート
import { calculateXp } from "@/utils/CalculateXp"; // XP 計算用関数をインポート

const AchievementManagementPage: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<AchievementData | null>(null);
  const [isSaving, setIsSaving] = useState(false); // 保存中の状態を管理
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // エラー表示用

  // フォーム送信ハンドラー
  const handleFormSubmit = async (data: AchievementData) => {
    const userId = "User123"; // 実際のアプリでは認証システムから取得する
    console.log("フォーム送信データ:", data);

    try {
      setIsSaving(true); // 保存中の状態を設定
      setErrorMessage(null); // エラーリセット

      // XP を計算
      const xpEarned = calculateXp(data.progress_percentage, data.ratings);
      const dataWithXp = {
        ...data,
        xp_earned: xpEarned, // 計算結果を追加
      };

      // Firestore にデータを送信
      await saveAchievementToFirestore(userId, dataWithXp);
      

      setSubmittedData(dataWithXp); // 保存が成功したら画面を切り替える
    } catch (error) {
      setErrorMessage("データ保存中にエラーが発生しました。");
    } finally {
      setIsSaving(false); // 保存完了後に状態をリセット
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
          initialData={{}} 
        />
      ) : (
        <AchievementSheet data={submittedData} />
      )}
    </div>
  );
};

export default AchievementManagementPage;