# Phase 20 申し送り事項

## 概要

Phase 20 では、数学IA「二次関数」の講座本文を本格的に作成します。
Phase 19 で設計した構造（`src/types/course.ts` / `src/data/course-curriculum.ts`）をベースに、
各 `lessonBlock` の `body` を充実させてください。

---

## 作業方針

### 1. 旧「授業スキルツリー」の授業をそのまま使い回さない

`src/data/lessons.ts` および `src/data/lessons/` 内の既存授業は、
フォーマットが異なり（Markdown+KaTeX の長文形式）、レベル分類も不明確です。

- Phase 20 では旧授業データを **コピーペーストしない**
- 「初学者・中級者・上級者」の 3 段階に **ゼロから再構成** する
- 旧授業は参考にしてよいが、文章はリライトすること

### 2. 講座集として初学者・中級者・上級者に再構成する

対象単元：数学IA > 二次関数（`unitId: "quadratic"`）

```
初学者（beginner）：公式の意味・平方完成・最大最小の基本
中級者（standard）：定義域付き・文字係数・場合分け
上級者（advanced）：条件から式を作る・誘導なし・入試標準
```

各レベルの `CourseLesson` の `lessonBlocks[].body` を充実させる。
現在は短い仮文で、`qualityTags` に "Phase20補完予定" と付いているものが対象。

### 3. 二次関数だけ本気で作る

Phase 20 のスコープは **二次関数のみ**。
他の単元（場合の数・図形・集合など）に着手しない。

品質基準は `docs/course-quality-guidelines.md` を参照。

### 4. 問題解説から関連講座へ飛ぶ導線を維持する

現在の仕組み：
- `Problem.relatedLessonSlug` → `LessonLink` コンポーネント → `/lessons/${slug}`
- `/lessons/${slug}` ページは引き続き機能する（旧授業の詳細ページ）

Phase 20 以降の理想形：
- 二次関数の問題解説 → 「この問題に関連する講座」 → `/courses/math-1a/quadratic`
- 具体的には `LessonLink` or 新しい `CourseLessonLink` を問題解説に追加する
- または `relatedLessonSlug` を `relatedCourseLessonId` に移行する

最低限：二次関数の問題解説ページに `/courses/math-1a/quadratic` へのリンクを追加する。

### 5. 講座本文の品質目標

「徹底基礎講座レベル」を目指す。具体的には：

- 初学者が授業なしでも読んで理解できる
- 途中式・計算過程を省略しない
- 「なぜそうするのか」の理由を必ず書く
- よくあるミスを具体的に示す（NG例 → OK例）
- 確認問題はヒント・答えをセットで付ける

---

## 技術的な申し送り

### 現在の状態（Phase 19.1 完了時点）

| ルート | 状態 |
|---|---|
| `/courses` | 講座集トップ（科目一覧） |
| `/courses/math-1a` | 数学IA 単元一覧（二次関数のみ） |
| `/courses/math-1a/quadratic` | 二次関数講座（9講座・仮本文） |
| `/lessons` | `/courses` へリダイレクト |
| `/lessons/[slug]` | 旧授業個別ページ（引き続き機能） |

### 修正が必要な箇所（Phase 20 の作業）

1. `src/data/course-curriculum.ts` の各 `lessonBlock.body` を充実させる
2. 上級者「入試標準問題の切り崩し」確認問題の答案を完成させる（現在 "Phase20補完予定"）
3. `relatedPracticeLinks` に実際の問題へのリンクを追加する
4. （オプション）問題解説ページ（`/problems/[slug]`）から二次関数講座へのリンクを追加する

### データ構造（変更不要）

```typescript
// src/types/course.ts
export type CourseLevel = "beginner" | "standard" | "advanced";
export interface CourseLesson { lessonId, lessonTitle, level, lessonBlocks, checkQuestions, ... }
export interface CourseUnit { unitId, subjectId, unitTitle, lessons: CourseLesson[] }
export interface CourseSubject { subjectId, subjectName, units: CourseUnit[] }
```

### 品質基準

`docs/course-quality-guidelines.md` を参照。
特に「初学者講座の必須事項」チェックリストを全項目クリアすること。
