import type { SubjectId } from "@/data/subjects";

// Course system types — Phase 19 / Phase 20.0
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

// ─── LessonBlock kinds ──────────────────────────────────────────────────────

export type LessonBlockKind =
  | "intro"
  | "concept"
  | "formula"
  | "diagram"           // Phase 20.0: SVG 図解ブロック
  | "stepByStep"        // Phase 20.0: 手順分解ブロック
  | "comparisonTable"   // Phase 20.0: 比較表ブロック
  | "workedExample"
  | "commonMistake"
  | "strategy"
  | "checkpoint"        // Phase 20.0: 軽量チェックポイント
  | "practice"
  | "summary"
  | "nextStep";

export const LESSON_BLOCK_META: Record<LessonBlockKind, { label: string; color: string; bg: string }> = {
  intro:          { label: "はじめに",     color: "#6b7280", bg: "#f9fafb" },
  concept:        { label: "概念",         color: "#2563eb", bg: "#eff6ff" },
  formula:        { label: "公式",         color: "#0891b2", bg: "#ecfeff" },
  diagram:        { label: "図解",         color: "#0284c7", bg: "#e0f2fe" },
  stepByStep:     { label: "手順",         color: "#059669", bg: "#ecfdf5" },
  comparisonTable:{ label: "比較表",       color: "#7c3aed", bg: "#f5f3ff" },
  workedExample:  { label: "例題",         color: "#059669", bg: "#f0fdf4" },
  commonMistake:  { label: "よくあるミス", color: "#d97706", bg: "#fffbeb" },
  strategy:       { label: "解法戦略",     color: "#7c3aed", bg: "#f5f3ff" },
  checkpoint:     { label: "チェック",     color: "#ea580c", bg: "#fff7ed" },
  practice:       { label: "確認問題",     color: "#e11d48", bg: "#fff1f2" },
  summary:        { label: "まとめ",       color: "#374151", bg: "#f8fafc" },
  nextStep:       { label: "次のステップ", color: "#059669", bg: "#f0fdf4" },
};

// ─── Phase 20.0: 図解タイプ ─────────────────────────────────────────────────

export type DiagramType =
  | "parabola-basic"          // y=x² の基本形・開き方
  | "vertex-axis"             // 頂点と軸の概念図
  | "completing-square-shift" // 平方完成による移動イメージ
  | "domain-max-min"          // 定義域つき最大最小
  | "axis-position-cases"     // 軸が定義域の左・中・右の3ケース
  | "case-split-flow"         // 場合分けフローチャート
  // ─── 三角関数 ────────────────────────────────────────────────────────────
  | "unit-circle"             // 単位円上の点 P(cosθ, sinθ) と座標の読み取り
  | "trig-graph-sincos"       // y=sinθ と y=cosθ のグラフ（周期・振幅・平行移動）
  | "trig-angle-addition"     // 単位円で角 α に β を重ねて α+β になる回転のイメージ
  // ─── 図形と計量 ──────────────────────────────────────────────────────────
  | "right-triangle-trig"     // 直角三角形と sin/cos/tan の辺の比（対辺・隣辺・斜辺）
  | "sine-rule-circumcircle"  // 正弦定理（外接円と辺・向かいの角の対応、2R）
  | "cosine-rule-triangle"    // 余弦定理（2辺とその間の角から向かいの辺）
  // ─── データの分析 ────────────────────────────────────────────────────────
  | "boxplot"                 // 箱ひげ図（最小値・Q1・Q2・Q3・最大値とIQR）
  | "scatter-correlation"     // 散布図（正の相関・負の相関・弱い相関と外れ値）
  // ─── 図形の性質（円）─────────────────────────────────────────────────────
  | "circle-inscribed-central-angle" // 円周角と中心角（中心角＝2×円周角）
  | "circle-same-arc-angles"         // 同じ弧を見る円周角は等しい
  | "circle-tangent-chord-angle"     // 接弦定理（接線と弦のなす角）
  // ─── 図形の性質（三角形の比）─────────────────────────────────────────────
  | "geometry-ceva-theorem"          // チェバの定理（3本の線分が1点で交わる）
  | "geometry-menelaus-theorem"      // メネラウスの定理（3点が一直線上にある）
  | "geometry-ceva-menelaus-compare" // チェバとメネラウスの比較
  // ─── 図形の性質（方べき）─────────────────────────────────────────────────
  | "geometry-power-intersecting-chords" // 交わる2弦
  | "geometry-power-two-secants"         // 外部の点から2本の割線
  | "geometry-power-tangent-secant"      // 接線と割線
  // ─── 図形の性質（三角形の五心）────────────────────────────────────────────
  | "geometry-centers-circum-incenter"   // 外心と内心
  | "geometry-centers-centroid-orthocenter" // 重心と垂心
  | "geometry-centers-five-compare"      // 五心の比較
  // ─── 図形の性質（内接四角形）────────────────────────────────────────────
  | "geometry-cyclic-opposite-angles"    // 内接四角形の対角
  | "geometry-cyclic-exterior-angle"     // 外角と向かいの内角
  | "geometry-cyclic-same-arc";          // 同じ弧を見る角

// ─── Phase 20.0: 手順ステップ ───────────────────────────────────────────────

export interface StepItem {
  step: number;
  label: string;
  /** インライン数式 ($...$) を含む本文。 */
  body: string;
  annotation?: string;
}

// ─── Phase 20.0: 比較表の行 ────────────────────────────────────────────────

export interface TableRow {
  cells: string[];
  /** true にすると行を強調表示する。 */
  highlight?: boolean;
}

// ─── LessonBlock ────────────────────────────────────────────────────────────

export interface LessonBlock {
  kind: LessonBlockKind;
  title: string;
  /** Markdown + KaTeX (インライン数式のみ; display math delimiter は使わない)。
   * diagram / stepByStep / comparisonTable の場合は空文字列でもよい。 */
  body: string;
  // ── Phase 20.0 optional fields ──────────────────────────────────────────
  /** 図解タイプ。kind === "diagram" のときに使用。 */
  diagramType?: DiagramType;
  /** 図解・公式ブロックのキャプション。 */
  caption?: string;
  /** 手順ブロックのステップリスト。kind === "stepByStep" のときに使用。 */
  steps?: StepItem[];
  /** 比較表の列ヘッダー。kind === "comparisonTable" のときに使用。 */
  columns?: string[];
  /** 比較表の行データ。kind === "comparisonTable" のときに使用。 */
  rows?: TableRow[];
  /** formula ブロックの強調公式（KaTeX 文字列）。 */
  formula?: string;
  /** ブロック内の強調テキスト・コールアウト。 */
  emphasis?: string;
}

// ─── Lesson / Unit / Subject ─────────────────────────────────────────────────

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
  parentSubjectId: SubjectId;
  subjectName: string;
  description: string;
  color: string;
  units: CourseUnit[];
  courseKind?: "standard" | "premium";
  status?: "available" | "preparing" | "coming-soon";
  statusLabel?: string;
  badges?: string[];
}
