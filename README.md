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
