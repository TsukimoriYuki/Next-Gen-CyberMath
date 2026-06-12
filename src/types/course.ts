// Course system types — Phase 19
// 講座は DB ではなく静的 TypeScript データで管理する。

export type CourseLevel = "beginner" | "standard" | "advanced";

export const COURSE_LEVEL_META: Record<
  CourseLevel,
  { label: string; sublabel: string; description: string; color: string; bg: string; border: string; dot: string }
> = {
  beginner: {
    label: "初学者",
    sublabel: "Beginner",
    description: "ゼロから理解する。公式の意味・用語・最小例題から丁寧に説明する。",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    dot: "#2563eb",
  },
  standard: {
    label: "中級者",
    sublabel: "Standard",
    description: "一周した人向け。典型解法・パターン判定・よくあるミスを整理する。",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    dot: "#7c3aed",
  },
  advanced: {
    label: "上級者",
    sublabel: "Advanced",
    description: "入試標準〜難問。複合問題・難しい条件の読み解き方を扱う。過去問本文コピー禁止。",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
    dot: "#e11d48",
  },
};

export type LessonBlockKind =
  | "intro"
  | "concept"
  | "formula"
  | "workedExample"
  | "commonMistake"
  | "strategy"
  | "practice"
  | "summary"
  | "nextStep";

export const LESSON_BLOCK_META: Record<LessonBlockKind, { label: string; color: string; bg: string }> = {
  intro:         { label: "はじめに",     color: "#6b7280", bg: "#f9fafb" },
  concept:       { label: "概念",         color: "#2563eb", bg: "#eff6ff" },
  formula:       { label: "公式",         color: "#0891b2", bg: "#ecfeff" },
  workedExample: { label: "例題",         color: "#059669", bg: "#f0fdf4" },
  commonMistake: { label: "よくあるミス", color: "#d97706", bg: "#fffbeb" },
  strategy:      { label: "解法戦略",     color: "#7c3aed", bg: "#f5f3ff" },
  practice:      { label: "確認問題",     color: "#e11d48", bg: "#fff1f2" },
  summary:       { label: "まとめ",       color: "#374151", bg: "#f8fafc" },
  nextStep:      { label: "次のステップ", color: "#059669", bg: "#f0fdf4" },
};

export interface LessonBlock {
  kind: LessonBlockKind;
  title: string;
  /** Markdown + KaTeX (インライン数式のみ; display math delimiter は使わない)。 */
  body: string;
}

export interface CheckQuestion {
  question: string;
  answer: string;
  hint?: string;
}

export interface RelatedPracticeLink {
  label: string;
  href: string;
  description?: string;
}

export interface CourseLesson {
  lessonId: string;
  lessonTitle: string;
  lessonDescription: string;
  level: CourseLevel;
  estimatedMinutes: number;
  prerequisites: string[];
  goals: string[];
  lessonBlocks: LessonBlock[];
  checkQuestions: CheckQuestion[];
  relatedPracticeLinks: RelatedPracticeLink[];
  /** 品質タグ — 講座レビュー・品質管理用。 */
  qualityTags: string[];
}

export interface CourseUnit {
  unitId: string;
  subjectId: string;
  unitTitle: string;
  unitDescription: string;
  /** 単元に紐づく全レベルの講座。 */
  lessons: CourseLesson[];
}

export interface CourseSubject {
  subjectId: string;
  subjectName: string;
  description: string;
  color: string;
  units: CourseUnit[];
}
