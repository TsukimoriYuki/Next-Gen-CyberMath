import type { UnitMeta } from "@/lib/types";

// 単元レジストリ。URL スラッグ・表示名・説明を一元管理する。
// ここに無い単元は content.ts 側でフォールバック・スラッグを生成する。
export const UNIT_META: UnitMeta[] = [
  // ---- 数学 I・A ----
  {
    slug: "numbers-and-expressions",
    name: "数と式",
    description: "展開・因数分解・実数・絶対値。すべての計算の土台。",
    order: 1,
  },
  {
    slug: "sets-and-logic",
    name: "集合と命題",
    description: "集合・必要十分条件・命題の否定とド・モルガンの法則。",
    order: 2,
  },
  {
    slug: "quadratic-functions",
    name: "2次関数",
    description: "平方完成・最大最小・グラフと方程式・不等式。",
    order: 3,
  },
  {
    slug: "measurement-trigonometry",
    name: "図形と計量",
    description: "三角比・正弦定理・余弦定理・面積と測量。",
    order: 4,
  },
  {
    slug: "data-analysis",
    name: "データの分析",
    description: "代表値・分散・箱ひげ図・相関係数・仮説検定。",
    order: 5,
  },
  {
    slug: "counting-probability",
    name: "場合の数と確率",
    description: "順列・組合せ・反復試行・条件付き確率・期待値。",
    order: 6,
  },
  {
    slug: "geometry-properties",
    name: "図形の性質",
    description: "五心・チェバ／メネラウス・円周角・方べきの定理。",
    order: 7,
  },
  {
    slug: "integer-properties",
    name: "整数の性質",
    description: "約数・互除法・合同式・一次不定方程式・n進法。",
    order: 8,
  },

  // ---- 数学 II・B ----
  {
    slug: "expressions-and-proofs",
    name: "式と証明",
    description: "二項定理・恒等式・等式と不等式の証明・相加相乗。",
    order: 30,
  },
  {
    slug: "complex-numbers-equations",
    name: "複素数と方程式",
    description: "複素数・解と係数の関係・剰余/因数定理・高次方程式。",
    order: 31,
  },
  {
    slug: "figures-and-equations",
    name: "図形と方程式",
    description: "点と直線・円・軌跡・領域。",
    order: 32,
  },
  {
    slug: "trigonometric-functions",
    name: "三角関数",
    description: "加法定理・合成・三角方程式と不等式・グラフ。",
    order: 33,
  },
  {
    slug: "exponential-and-logarithmic",
    name: "指数関数と対数関数",
    description: "指数法則・対数・方程式と不等式・最大最小。",
    order: 34,
  },
  {
    slug: "differentiation",
    name: "微分法",
    description: "極限・微分係数・接線・増減と極値・最大最小。",
    order: 35,
  },
  {
    slug: "integration",
    name: "積分法",
    description: "不定/定積分・面積・1/6 公式・絶対値。",
    order: 36,
  },
  {
    slug: "sequences",
    name: "数列",
    description: "等差等比・Σ・漸化式・数学的帰納法。",
    order: 37,
  },
  {
    slug: "vectors",
    name: "ベクトル",
    description: "内積・位置ベクトル・図形への応用・空間ベクトル。",
    order: 38,
  },

  // ---- 発展ショーケース (数学 III ほか) ----
  {
    slug: "sequences-and-limits",
    name: "数列と極限",
    description: "和の極限・区分求積法・無限の扱い。",
    order: 52,
  },
  {
    slug: "complex-plane",
    name: "複素数平面",
    description: "極形式・ド・モアブル・1 の n 乗根。",
    order: 53,
  },

  // ---- 授業のみ（難問対策） ----
  {
    slug: "killer-strategies",
    name: "難問対策・解法戦略",
    description: "難関大を突破するための、解法そのものの戦略を学ぶ特別講義。",
    order: 10,
  },
];

export const UNIT_META_BY_NAME: Record<string, UnitMeta> = Object.fromEntries(
  UNIT_META.map((u) => [u.name, u]),
);
export const UNIT_META_BY_SLUG: Record<string, UnitMeta> = Object.fromEntries(
  UNIT_META.map((u) => [u.slug, u]),
);
