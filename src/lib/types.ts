// Domain types — mirror the Prisma schema so the app can run from the
// static dataset (src/data) or from the database interchangeably.

export type Difficulty = "A" | "B" | "C" | "D" | "D_PLUS";

export type StepType = "INSIGHT" | "EXPERIMENT" | "HINT" | "SOLUTION";

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
}

/**
 * Concept Lesson —「めっちゃわかりやすい授業」。
 * content は KaTeX 対応の Markdown 文字列。JSXGraph ラボは
 * ```lab フェンスドコードブロックで埋め込む（先頭行に graphKey、続けて caption）。
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

export const DIFFICULTY_ORDER: Difficulty[] = ["A", "B", "C", "D", "D_PLUS"];

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
};
