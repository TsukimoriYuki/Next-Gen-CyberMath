import type { Difficulty, Problem } from "@/lib/types";

export interface MasteryLectureGuide {
  lectureSlug: string;
  legacySlugs: string[];
  unitNames: string[];
  unitSlugs: string[];
  title: string;
  shortTitle: string;
  description: string;
  ctaLabel: string;
  masteryFocus: string;
  weapons: string[];
  recoveryLinks: { symptom: string; label: string; href: string }[];
  commonTestAppearance: string;
  targetMinutes: number;
}

export const MASTERY_LECTURE_GUIDES: MasteryLectureGuide[] = [
  {
    lectureSlug: "geometry-measurement-intensive",
    legacySlugs: [],
    unitNames: ["図形と計量"],
    unitSlugs: ["measurement-trigonometry", "figures-and-measurement"],
    title: "図形と計量 満点講義",
    shortTitle: "図形と計量",
    description:
      "正弦定理・余弦定理の判別、sinの求め方、外接円・内接円、測量・空間図形まで一気に確認します。",
    ctaLabel: "特別授業で判別力を鍛える",
    masteryFocus: "辺・角・面積から使う公式を選び切る",
    weapons: ["余弦定理で第三辺を出す", "面積公式からsinを逆算する", "円周角で角を移して正弦定理につなぐ"],
    recoveryLinks: [
      { symptom: "公式選択を間違えた", label: "解法判別フロー", href: "/common-test/lectures/geometry-measurement-intensive#tool-flow" },
      { symptom: "sin/cosの符号を間違えた", label: "鋭角・鈍角確認", href: "/common-test/lectures/geometry-measurement-intensive#angle-sign-heading" },
      { symptom: "外接円・内接円で止まった", label: "R・rの章", href: "/common-test/lectures/geometry-measurement-intensive#circumradius-heading" },
    ],
    commonTestAppearance:
      "第1問で、辺の長さ、面積、sinの値を誘導で順に求めさせる形で出ます。",
    targetMinutes: 6,
  },
  {
    lectureSlug: "geometry-properties-auxiliary-lines",
    legacySlugs: ["geometry-properties-intensive"],
    unitNames: ["図形の性質"],
    unitSlugs: ["geometry-properties"],
    title: "図形の性質 満点講義",
    shortTitle: "図形の性質",
    description:
      "円・比・相似・方べき・チェバ・メネラウスの使い分けと、補助線を引く基準を鍛えます。",
    ctaLabel: "図形の性質 満点講義へ",
    masteryFocus: "円周角・相似・方べきから補助線を判断する",
    weapons: ["円周角で角を移す", "相似で辺の比を作る", "方べきで線分の積を立てる"],
    recoveryLinks: [
      { symptom: "方べきに気づかなかった", label: "円の章", href: "/common-test/lectures/geometry-properties-auxiliary-lines#gp-circle-heading" },
      { symptom: "チェバとメネラウスを取り違えた", label: "比の章", href: "/common-test/lectures/geometry-properties-auxiliary-lines#gp-ratio-heading" },
      { symptom: "補助線が思いつかなかった", label: "図形レイヤー", href: "/common-test/lectures/geometry-properties-auxiliary-lines#geometry-properties-layer" },
    ],
    commonTestAppearance:
      "図形と計量との融合で、辺を作る前段階として円周角・相似・方べきが使われます。",
    targetMinutes: 7,
  },
  {
    lectureSlug: "quadratic-case-split-intensive",
    legacySlugs: [],
    unitNames: ["2次関数", "二次関数"],
    unitSlugs: ["quadratic-functions"],
    title: "二次関数 場合分け満点講義",
    shortTitle: "二次関数",
    description:
      "軸・定義域・端点比較・場合分けを、本番形式で迷わず処理するための講義です。",
    ctaLabel: "二次関数 満点講義へ",
    masteryFocus: "軸・端点・境界値を先に出す",
    weapons: ["平方完成で軸を読む", "端点比較で最大値を決める", "境界値で場合分けを閉じる"],
    recoveryLinks: [
      { symptom: "場合分けが足りなかった", label: "解法判別フロー", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-flow" },
      { symptom: "端点比較を忘れた", label: "端点比較の型", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-endpoint-callout" },
      { symptom: "文字定数の最大最小で詰まった", label: "軸と定義域の完全判別", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-parameter-flow" },
      { symptom: "場合分けの境界を間違えた", label: "場合分け境界ドリル", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-boundary-drill" },
    ],
    commonTestAppearance:
      "第2問で、軸が定義域の内外を動く最大最小として出ます。",
    targetMinutes: 6,
  },
  {
    lectureSlug: "probability-guided-reading",
    legacySlugs: ["probability-counting-intensive"],
    unitNames: ["場合の数と確率", "確率"],
    unitSlugs: ["counting-probability", "probability"],
    title: "確率 誘導読解満点講義",
    shortTitle: "確率",
    description:
      "順列・組合せ・余事象・条件付き確率の判別を鍛え、誘導文を事象に言い換える講義です。",
    ctaLabel: "確率 満点講義へ",
    masteryFocus: "分母と分子を同じ数え方にそろえる",
    weapons: ["順列と組合せを判別する", "少なくともを余事象で処理する", "条件付き確率で母集団を更新する"],
    recoveryLinks: [
      { symptom: "順列と組合せを取り違えた", label: "解法判別フロー", href: "/common-test/lectures/probability-guided-reading#probability-flow" },
      { symptom: "余事象を使えなかった", label: "余事象の判断", href: "/common-test/lectures/probability-guided-reading#probability-complement-callout" },
      { symptom: "条件付きで分母を間違えた", label: "条件付きの判別フロー", href: "/common-test/lectures/probability-guided-reading#probability-conditional-flow" },
      { symptom: "独立と排反を混同した", label: "独立・排反の判別ドリル", href: "/common-test/lectures/probability-guided-reading#probability-conditional-drill" },
    ],
    commonTestAppearance:
      "第3問で、条件整理、表や樹形図、余事象を誘導文に沿って選ばせる形で出ます。",
    targetMinutes: 6,
  },
];

const GUIDE_BY_CANONICAL_SLUG = new Map(
  MASTERY_LECTURE_GUIDES.map((guide) => [guide.lectureSlug, guide]),
);

const CANONICAL_BY_ANY_SLUG = new Map<string, string>();
for (const guide of MASTERY_LECTURE_GUIDES) {
  CANONICAL_BY_ANY_SLUG.set(guide.lectureSlug, guide.lectureSlug);
  for (const slug of guide.legacySlugs) CANONICAL_BY_ANY_SLUG.set(slug, guide.lectureSlug);
}

export function canonicalLectureSlug(slug: string): string {
  return CANONICAL_BY_ANY_SLUG.get(slug) ?? slug;
}

export function getMasteryLectureGuideBySlug(slug: string): MasteryLectureGuide | undefined {
  return GUIDE_BY_CANONICAL_SLUG.get(canonicalLectureSlug(slug));
}

export function getMasteryLectureGuideForUnit({
  unitName,
  unitSlug,
}: {
  unitName?: string;
  unitSlug?: string;
}): MasteryLectureGuide | undefined {
  return MASTERY_LECTURE_GUIDES.find(
    (guide) =>
      (unitName ? guide.unitNames.includes(unitName) : false) ||
      (unitSlug ? guide.unitSlugs.includes(unitSlug) : false),
  );
}

export function getMasteryLectureGuideForProblem(problem: Problem): MasteryLectureGuide | undefined {
  const direct = getMasteryLectureGuideForUnit({ unitName: problem.unit });
  if (direct) return direct;

  const haystack = [
    problem.unit,
    problem.title,
    problem.tagline ?? "",
    ...(problem.tags ?? []),
  ].join(" ");

  if (
    /図形と計量|正弦|余弦|三角比|面積公式|垂線|高さ|点と直線の距離|外接円|内接円|空間図形|断面/.test(
      haystack,
    )
  ) {
    return getMasteryLectureGuideBySlug("geometry-measurement-intensive");
  }
  if (
    /図形の性質|円周角|方べき|チェバ|メネラウス|相似|内心|外心|重心|垂心|角の二等分線|垂直二等分線|中線|アポロニウス/.test(
      haystack,
    )
  ) {
    return getMasteryLectureGuideBySlug("geometry-properties-auxiliary-lines");
  }
  if (/2次関数|二次関数|平方完成|軸|最大最小|端点/.test(haystack)) {
    return getMasteryLectureGuideBySlug("quadratic-case-split-intensive");
  }
  if (/確率|順列|組合せ|余事象|条件付き/.test(haystack)) {
    return getMasteryLectureGuideBySlug("probability-guided-reading");
  }

  if (/図形と計量|正弦|余弦|三角比|面積公式|外接円|内接円/.test(haystack)) {
    return getMasteryLectureGuideBySlug("geometry-measurement-intensive");
  }
  if (/図形の性質|円周角|方べき|チェバ|メネラウス|相似/.test(haystack)) {
    return getMasteryLectureGuideBySlug("geometry-properties-auxiliary-lines");
  }
  if (/2次関数|二次関数|平方完成|軸|最大最小|端点/.test(haystack)) {
    return getMasteryLectureGuideBySlug("quadratic-case-split-intensive");
  }
  if (/確率|順列|組合せ|余事象|条件付き/.test(haystack)) {
    return getMasteryLectureGuideBySlug("probability-guided-reading");
  }
  return undefined;
}

export function getSimilarProblems(
  problem: Problem,
  allProblems: Problem[],
  limit: number,
): Problem[] {
  const problemTags = new Set(problem.tags ?? []);
  return allProblems
    .filter((candidate) => candidate.slug !== problem.slug && !candidate.isMockOnly)
    .map((candidate) => ({
      problem: candidate,
      score:
        (candidate.unit === problem.unit ? 10 : 0) +
        (candidate.difficulty === problem.difficulty ? 3 : 0) +
        (candidate.tags ?? []).filter((tag) => problemTags.has(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || difficultyDistance(a.problem.difficulty, problem.difficulty) - difficultyDistance(b.problem.difficulty, problem.difficulty))
    .slice(0, limit)
    .map((item) => item.problem);
}

export function getReversePatternProblems(
  problem: Problem,
  allProblems: Problem[],
  limit: number,
): Problem[] {
  return allProblems
    .filter(
      (candidate) =>
        candidate.slug !== problem.slug &&
        !candidate.isMockOnly &&
        candidate.unit === problem.unit &&
        candidate.difficulty !== problem.difficulty,
    )
    .sort(
      (a, b) =>
        difficultyDistance(b.difficulty, problem.difficulty) -
        difficultyDistance(a.difficulty, problem.difficulty),
    )
    .slice(0, limit);
}

function difficultyDistance(a: Difficulty, b: Difficulty): number {
  const order: Difficulty[] = ["A", "B", "C", "D", "D_PLUS", "EX", "OLYMPIAD"];
  return Math.abs(order.indexOf(a) - order.indexOf(b));
}
