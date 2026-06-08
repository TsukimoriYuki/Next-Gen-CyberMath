import type { Problem } from "@/lib/types";

// 数学I「集合と命題」。授業 de-morgan-and-negation と相互リンクするデモ問題。
const r = String.raw;

export const setsAndLogic: Problem[] = [
  {
    slug: "logic-negation-de-morgan",
    title: "命題の否定（ド・モルガン）",
    unit: "集合と命題",
    difficulty: "B",
    tagline: "「かつ」「すべて」をひっくり返す",
    hasGraph: false,
    relatedLessonSlug: "de-morgan-and-negation",
    statement: r`次の命題の否定を述べよ。
(1) 「$x>0$ かつ $y\le 3$」
(2) 「すべての実数 $x$ について $x^2-2x+2>0$」`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 入れ替えのルール",
        body: r`否定では、「かつ」と「または」が入れ替わり（ド・モルガンの法則）、「すべて」と「ある」が入れ替わる。不等号の否定は境界を含む側へ：$>$ の否定は $\le$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`(1) $\overline{p \land q}=\overline{p}\lor\overline{q}$。(2) 「すべての $x$ で $P$」の否定は「ある $x$ で $P$ でない」。`,
        relatedLessonSlug: "de-morgan-and-negation",
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`(1) 「$x>0$ かつ $y\le 3$」の否定は、ド・モルガンの法則より
「$x\le 0$ **または** $y>3$」。

(2) 全称命題の否定は存在命題になるので、
「**ある**実数 $x$ について $x^2-2x+2\le 0$」。
（もとの命題は真だが、否定の「形」はこの通り。）`,
      },
    ],
  },
];
