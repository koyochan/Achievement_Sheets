shadcn/ui

https://ui.shadcn.com/docs/installation/astro


## やっほー！

ER図

```mermaid
erDiagram
    User {
        string UUID
    }

    UUID {
        number currentLevel
        number currentXp
        number nextLevelXp
    }

    AchievementSheet {
        string achievementSheetID
        string activity
        string date
        string goal
        string progress
        number progress_percentage
        string student_name
        string teacher
        string teacher_comment
        number xp_earned
    }

    Rating {
        string skill
        number value
    }

    %% 横並びで関係を表現
    User ||--o{ UUID : "has"
    AchievementSheet ||--o{ Rating : "has"
    User ||--o{ UUID : "has"
    UUID ||--o{ AchievementSheet : "has"
    AchievementSheet ||--o{ Rating : "has"

## MEMO

...(スプレッド演算子)データを展開する演算子

Reactの状態管理原則として、Immutability(不変性)を保つ必要があるため、usestateで状態を管理している変数を直接変化させた場合、useefectが状態変化を検知できない場合が存在する。

mapメソッド
-> (formData.ratings || []).map(rating, index) =>　
formData.ratings配列に対して、一つ一つアロー関数経由でコールバック関数を実行している。

## 実装API

振り返りシート (AchievementSheet) を実装するために必要なAPI設計を整理しました。以下に、必要なAPI候補とそれぞれの目的・内容を示します。

1. 生徒名検索API
	•	エンドポイント: /api/students/search
	•	メソッド: GET
	•	説明: 生徒の名前で検索し、生徒の基本情報を取得する。
	•	リクエスト例:

{
  "query": "田中"
}


	•	レスポンス例:

[
  {
    "id": "student123",
    "name": "田中 太郎",
    "level": 3,
    "xp": 1200
  },
  {
    "id": "student456",
    "name": "田中 花子",
    "level": 5,
    "xp": 3000
  }
]

2. 生徒レベルアップAPI
	•	エンドポイント: /api/students/level-up
	•	メソッド: POST
	•	説明: AchievementSheetの情報を基に、生徒の経験値 (XP) を更新し、必要に応じてレベルアップを処理する。
	•	リクエスト例:

{
  "student_id": "student123",
  "xp_earned": 150
}


	•	レスポンス例:

{
  "student_id": "student123",
  "new_level": 4,
  "total_xp": 1350,
  "level_up": true
}

3. AchievementSheetフォーム提出API
	•	エンドポイント: /api/achievement-sheets/submit
	•	メソッド: POST
	•	説明: 振り返りシートのデータを提出し、データベースに保存する。
	•	リクエスト例:

{
  "student_name": "田中 太郎",
  "date": "2025-01-06",
  "teacher": "山田 花子",
  "activity": "プログラミング基礎",
  "goal": "基本的なループ構文を理解する",
  "progress": "80%完了",
  "progress_percentage": 80,
  "ratings": [5, 4, 4],
  "xp_earned": 150,
  "teacher_comment": "よく頑張りました！",
  "start_time": 1672954800,
  "end_time": 1672962000,
  "duration": 7200
}


	•	レスポンス例:

{
  "sheet_id": "sheet123",
  "status": "submitted"
}

4. AchievementSheet呼び出しAPI
	•	エンドポイント: /api/achievement-sheets/{sheet_id}
	•	メソッド: GET
	•	説明: 保存されたAchievementSheetのデータを取得する。
	•	リクエスト例:
	•	URL: /api/achievement-sheets/sheet123
	•	レスポンス例:

{
  "sheet_id": "sheet123",
  "student_name": "田中 太郎",
  "date": "2025-01-06",
  "teacher": "山田 花子",
  "activity": "プログラミング基礎",
  "goal": "基本的なループ構文を理解する",
  "progress": "80%完了",
  "progress_percentage": 80,
  "ratings": [5, 4, 4],
  "xp_earned": 150,
  "teacher_comment": "よく頑張りました！",
  "start_time": 1672954800,
  "end_time": 1672962000,
  "duration": 7200
}

5. 生徒のAchievement履歴取得API
	•	エンドポイント: /api/students/{student_id}/achievements
	•	メソッド: GET
	•	説明: 特定の生徒のAchievement履歴を取得する。
	•	リクエスト例:
	•	URL: /api/students/student123/achievements
	•	レスポンス例:

[
  {
    "sheet_id": "sheet123",
    "date": "2025-01-06",
    "activity": "プログラミング基礎",
    "xp_earned": 150
  },
  {
    "sheet_id": "sheet124",
    "date": "2025-01-05",
    "activity": "条件分岐",
    "xp_earned": 200
  }
]

6. AchievementSheet表示サービス用API
	•	エンドポイント: /api/achievement-sheets/render
	•	メソッド: POST
	•	説明: AchievementSheetのデータを受け取り、レンダリング用にフォーマット済みのデータを返す。
	•	リクエスト例:

{
  "achievement_data": {
    "student_name": "田中 太郎",
    "date": "2025-01-06",
    "teacher": "山田 花子",
    "activity": "プログラミング基礎",
    "goal": "基本的なループ構文を理解する",
    "progress": "80%完了",
    "progress_percentage": 80,
    "ratings": [5, 4, 4],
    "xp_earned": 150,
    "teacher_comment": "よく頑張りました！",
    "start_time": 1672954800,
    "end_time": 1672962000,
    "duration": 7200
  }
}


	•	レスポンス例:

{
  "rendered_html": "<div>...</div>"
}

これらのAPIを活用することで、振り返りシートの作成・提出・表示、そして生徒のレベルアップなどの機能をシームレスに実現できます。他に追加機能が必要であれば教えてください！

Search_achievemntSheet API