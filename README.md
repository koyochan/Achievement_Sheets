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
