// Domain types — mirror the Prisma schema so the app can run from the
// static dataset (src/data) or from the database interchangeably.

export type Difficulty = "A" | "B" | "C" | "D" | "D_PLUS" | "EX" | "OLYMPIAD";

/** 問題のティア。ABYSS は特異点ガチャ専用の隠しプール。 */
export type Tier = "STANDARD" | "ABYSS";

export type StepType = "INSIGHT" | "EXPERIMENT" | "HINT" | "SOLUTION" | "GUIDANCE_ANALYSIS";

/** Key into the interactive-lab registry (src/components/graph/LabRenderer). */
export type GraphKey =
  | "am-gm-min"
  | "segment-envelope"
  | "parabola-family"
  | "tan-degree-unit-circle"
  | "sine-synthesis"
  | "cubic-tangents"
  | "roots-of-unity"
  | "riemann-sum"
  | "quad-min-on-interval"
  | "quad-min-moving-interval"
  | "quad-root-placement"
  | "law-of-cosines"
  | "circumcircle-sine-rule"
  | "triangle-area"
  | "scatter-correlation"
  | "boxplot-quartiles"
  | "deviation-variance"
  | "lattice-paths"
  | "pascal-triangle"
  | "inscribed-angle"
  | "power-of-a-point"
  | "ceva-theorem"
  | "euclidean-algorithm"
  | "linear-diophantine"
  | "modular-clock"
  // ---- 数学 II・B ----
  | "trig-graph-transform"
  | "exp-log-inverse"
  | "tangent-slope"
  | "vector-add"
  // ---- キラー授業（難問対策） ----
  | "domino-induction-visualizer"
  | "geometry-three-lenses"
  | "cauchy-schwarz-vectors"
  | "trig-unit-circle-transform"
  | "spider-web-plot"
  | "oblique-coordinates"
  | "log-scale-slider"
  // ---- 新規ラボ（難関単元の理解の核） ----
  | "convexity-jensen"
  | "region-linear-programming"
  | "area-between-curves"
  | "complex-rotation-multiply"
  | "mean-value-theorem"
  | "tetrahedron-3d"
  // ---- IIB 重核単元の加筆で追加 ----
  | "signed-area-accumulation"
  | "abs-value-integral"
  | "cubic-horizontal-line-count"
  | "common-tangent-parabolas"
  | "apollonius-circle"
  | "parabola-tangent-envelope"
  | "perpendicular-lines-locus"
  // ---- 数学IA 重核単元の加筆で追加 ----
  | "abs-sum-number-line"
  | "parabola-line-tangency"
  | "circle-level-segment"
  | "cyclic-quadrilateral"
  | "sum-squared-deviation"
  | "bayes-frequency-bars"
  | "two-circles-common-chord"
  | "quadratic-residue-mod3"
  // ---- 網羅性拡張フェーズで追加 ----
  | "plane-normal-distance"
  | "grouped-sequence"
  | "prob-state-transition"
  | "binomial-mode";

export interface ExplanationStep {
  type: StepType;
  order: number;
  title: string;
  body: string;
  /** 特定ステップから関連授業へ (任意)。 */
  relatedLessonSlug?: string;
}

/** 過去問道場の偏差値帯。 */
export type Deviation = 50 | 55 | 60 | 65 | 70;

/** 私立文系大学群タグ。過去問道場の絞り込みに使う。 */
export type UniversityGroup = "NITTOMASEN" | "SANKINKORYU" | "MARCH" | "KANKANDORITSU";

export const UNIVERSITY_GROUP_META: Record<
  UniversityGroup,
  { label: string; accent: string; deviationRange: string; description: string }
> = {
  NITTOMASEN:    { label: "日東駒専", accent: "#22d3ee", deviationRange: "偏差値 45〜55", description: "日本大・東洋大・駒澤大・専修大" },
  SANKINKORYU:   { label: "産近甲龍", accent: "#10b981", deviationRange: "偏差値 45〜55", description: "京都産業大・近畿大・甲南大・龍谷大" },
  MARCH:         { label: "MARCH",   accent: "#f59e0b", deviationRange: "偏差値 55〜65", description: "明治・青山学院・立教・中央・法政" },
  KANKANDORITSU: { label: "関関同立", accent: "#e879f9", deviationRange: "偏差値 57〜67", description: "関西・関西学院・同志社・立命館" },
};

/**
 * 解法の多様性（代数・幾何・ベクトル…）。1 問に複数の解法を持たせ、
 * 道場の解法切替タブで表示する。body は KaTeX + @@why + @@lab トークン可。
 */
export interface Approach {
  /** 安定キー（タブ識別用）。 */
  id: string;
  /** タブのラベル（例: "代数", "幾何", "ベクトル", "複素数"）。 */
  label: string;
  /** ひとことの方針（タブ下の小見出し）。 */
  tagline?: string;
  /** 解法本文。 */
  body: string;
}

export interface Problem {
  slug: string;
  title: string;
  unit: string;
  difficulty: Difficulty;
  /** 問題文 (KaTeX を含む Markdown 互換テキスト)。 */
  statement: string;
  /** 美しさのフック。一覧カードに表示。 */
  tagline?: string;
  hasGraph: boolean;
  graphKey?: GraphKey;
  steps: ExplanationStep[];
  /** 関連する授業 (Lesson) の slug。解説末尾に誘導CTAを表示。 */
  relatedLessonSlug?: string;
  /** 概念タグ (例: ["背理法", "相加相乗平均"])。知識のネットワーク化に使う。 */
  tags?: string[];
  /**
   * 模試専用プール（初見殺し）。true の問題は単元一覧・タグ検索・トップから
   * 完全に隠蔽し、模試生成での強制ブレンドと、履歴からの復習でのみ到達する。
   */
  isMockOnly?: boolean;
  /**
   * 特異点プール。ABYSS の問題は通常の検索・一覧から完全に隠蔽し、
   * /abyss ガチャからのみ到達できる。
   */
  tier?: Tier;

  // ---- 過去問道場 (Dojo) メタ -----------------------------------------
  /** 出題大学（オリジナル類題は「○○大（類題）」表記）。 */
  university?: string;
  /** 偏差値帯。道場のスライダー絞り込みに使う。 */
  deviation?: Deviation;
  /** 出題年度（類題は想定年度）。 */
  year?: number;
  /** 問題の背景にある定石テーマ（例: "解の配置", "確率漸化式"）。 */
  backgroundTag?: string;
  /** 解法の多様性。存在すれば道場で解法切替タブを表示する。 */
  approaches?: Approach[];
  /** 私立文系大学群タグ。道場・検索の絞り込みに使う。 */
  universityGroup?: UniversityGroup;
  /** 数学IAの単元別・即時採点演習。既存の解説型問題には付与しない。 */
  unitPractice?: MathUnitPracticeMetadata;
}

export type MathUnitPracticeDifficulty = "basic" | "standard" | "common-test-prep";

export type MathUnitPracticeQuestionType =
  | "single-choice"
  | "numeric"
  | "multiple-select"
  | "matching"
  | "ordering"
  | "table-reading";

export type MathUnitPracticeChoice = Readonly<{
  id: string;
  text: string;
  reason: string;
}>;

export type MathUnitPracticeVisual = Readonly<{
  type: "table";
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}>;

export interface MathUnitPracticeMetadata {
  id: string;
  slug: string;
  subjectId: "math-1a";
  unitId: string;
  practiceArea:
    | "数と式"
    | "集合と命題"
    | "二次関数"
    | "図形と計量"
    | "データの分析"
    | "場合の数"
    | "確率"
    | "図形の性質";
  questionType: MathUnitPracticeQuestionType;
  choices?: readonly MathUnitPracticeChoice[];
  correctAnswer: string;
  acceptedAnswers?: readonly string[];
  detailedExplanation: string;
  distractorReasons: Readonly<Record<string, string>>;
  strategy: string;
  firstCheck: string;
  verification: string;
  commonMistake: string;
  relatedCourseIds: readonly string[];
  reviewTags: readonly string[];
  mistakeTags: readonly string[];
  difficulty: MathUnitPracticeDifficulty;
  internalKpd: number;
  estimatedTime: number;
  copyrightStatus: "original";
  sourceType: "original";
  publicationStatus: "public";
  visual?: MathUnitPracticeVisual;
}

/**
 * Concept Lesson —「めっちゃわかりやすい授業」。
 * content は KaTeX 対応の Markdown 文字列。JSXGraph ラボは
 * ```lab フェンスドコードブロックで埋め込む（先頭行に graphKey、続けて caption）。
 *
 * Rich Lesson 拡張フィールド（3段構成授業ビューア用）:
 *   proof / application / practiceProblemSlug
 * これら 3 フィールドが存在すると /lessons/[slug] が「真理 → 極意 → 実践」の
 * 3 段 UI でレンダリングされる。content は概要 or 空文字でも可。
 */
export interface Lesson {
  slug: string;
  title: string;
  unit: string;
  /** 一覧カード用の短い説明。 */
  summary?: string;
  /** 本文 (Markdown + KaTeX + ```lab 埋め込み)。 */
  content: string;
  /** 授業 → 関連問題への逆リンク (任意)。 */
  relatedProblemSlugs?: string[];
  /** 概念タグ。 */
  tags?: string[];
  // ---- Rich Lesson 拡張フィールド ----------------------------------------
  /** 【真理】厳密な証明 (Markdown/KaTeX)。 */
  proof?: string;
  /** 【極意】実戦での活かし方 (Markdown/KaTeX)。 */
  application?: string;
  /** 【実践】試し斬り用の道場問題の slug。 */
  practiceProblemSlug?: string;
}

/** 単元レジストリのメタ情報（URL スラッグ・表示名・説明）。 */
export interface UnitMeta {
  slug: string;
  name: string;
  description: string;
  /** 表示順 (数IA のカリキュラム順)。 */
  order: number;
}

// ---- presentation metadata ---------------------------------------------

export const DIFFICULTY_ORDER: Difficulty[] = ["A", "B", "C", "D", "D_PLUS", "EX", "OLYMPIAD"];

// ---- 過去問道場 偏差値帯メタ -------------------------------------------

export const DEVIATION_VALUES: Deviation[] = [50, 55, 60, 65, 70];

export const DEVIATION_META: Record<
  Deviation,
  { label: string; name: string; accent: string }
> = {
  50: { label: "50", name: "基礎固め", accent: "var(--neon-lime)" },
  55: { label: "55", name: "標準演習", accent: "var(--neon-cyan)" },
  60: { label: "60", name: "実戦", accent: "var(--neon-violet)" },
  65: { label: "65", name: "難関", accent: "var(--neon-amber)" },
  70: { label: "70", name: "最難関・別格", accent: "var(--neon-magenta)" },
};

export const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; name: string; className: string; accent: string }
> = {
  A: {
    label: "A",
    name: "基礎",
    className: "border-neon-lime/40 text-neon-lime",
    accent: "var(--neon-lime)",
  },
  B: {
    label: "B",
    name: "標準",
    className: "border-neon-cyan/40 text-neon-cyan",
    accent: "var(--neon-cyan)",
  },
  C: {
    label: "C",
    name: "発展",
    className: "border-neon-violet/40 text-neon-violet",
    accent: "var(--neon-violet)",
  },
  D: {
    label: "D",
    name: "難問",
    className: "border-neon-amber/40 text-neon-amber",
    accent: "var(--neon-amber)",
  },
  D_PLUS: {
    label: "D+",
    name: "超難問・美の領域",
    className: "border-neon-magenta/50 text-neon-magenta",
    accent: "var(--neon-magenta)",
  },
  EX: {
    label: "EX",
    name: "競技数学・発展探究",
    className: "border-purple-500/60 text-purple-400",
    accent: "#a855f7",
  },
  OLYMPIAD: {
    label: "∞",
    name: "数学オリンピック・最難関",
    className: "border-yellow-500/60 text-yellow-400",
    accent: "#eab308",
  },
};

export const STEP_META: Record<
  StepType,
  { label: string; hint: string; accent: string }
> = {
  INSIGHT: {
    label: "着眼点",
    hint: "まずどこに目を付けるか",
    accent: "var(--neon-cyan)",
  },
  EXPERIMENT: {
    label: "実験",
    hint: "手を動かして観察する",
    accent: "var(--neon-lime)",
  },
  HINT: {
    label: "ヒント",
    hint: "決定的な一歩",
    accent: "var(--neon-amber)",
  },
  SOLUTION: {
    label: "厳密な解答",
    hint: "論理を閉じる",
    accent: "var(--neon-magenta)",
  },
  GUIDANCE_ANALYSIS: {
    label: "誘導の意図",
    hint: "出題者のメタ視点から誘導構造を読む",
    accent: "var(--neon-violet)",
  },
};
