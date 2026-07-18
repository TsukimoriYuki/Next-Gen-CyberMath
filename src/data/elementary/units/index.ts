import { assertUniqueRegistryKeys } from "@/lib/registry";
import { content, plain, ruby, text } from "@/data/elementary/inline";
import type { ElementaryUnit } from "@/types/elementary-content";

// 小学3年生・通常コースの単元registry。
// 公開中の限定betaとhiddenの次期候補を分け、lessonIdsはlessons registryを参照する。

export const ELEMENTARY_UNITS: readonly ElementaryUnit[] = [
  {
    id: "g3-math-division-unit",
    slug: "division",
    grade: "grade-3",
    subject: "math",
    courseType: "regular",
    title: content(text("わり"), ruby("算", "ざん")),
    description: plain(
      "同じ数ずつ分ける計算「わり算」を、場面と式を結び付けて学びます。",
    ),
    order: 1,
    lessonIds: [
      "elementary-grade-3-math-division-meaning",
      "elementary-grade-3-math-division-with-remainders",
    ],
    curriculumEntryIds: ["g3-math-division"],
    publicationStatus: "beta",
    reviewStatus: "pilot",
  },
  {
    id: "g3-math-decimals-unit",
    slug: "decimals",
    grade: "grade-3",
    subject: "math",
    courseType: "regular",
    title: plain("小数"),
    description: plain("0.1をもとに、小数の表し方と大きさを学びます。"),
    order: 2,
    lessonIds: ["elementary-grade-3-math-tenths-and-decimals"],
    curriculumEntryIds: ["g3-math-decimals"],
    publicationStatus: "hidden",
    reviewStatus: "pilot",
  },
  {
    id: "g3-math-fractions-unit",
    slug: "fractions",
    grade: "grade-3",
    subject: "math",
    courseType: "regular",
    title: plain("分数"),
    description: plain("もとの1を同じ大きさに分け、分数で表します。"),
    order: 3,
    lessonIds: ["elementary-grade-3-math-parts-of-a-whole"],
    curriculumEntryIds: ["g3-math-fractions"],
    publicationStatus: "hidden",
    reviewStatus: "pilot",
  },
  {
    id: "g3-japanese-story-reading-unit",
    slug: "story-reading",
    grade: "grade-3",
    subject: "japanese",
    courseType: "regular",
    title: plain("物語を読む"),
    description: plain(
      "登場人物の行動や会話から、気持ちとその変化を読み取ります。",
    ),
    order: 1,
    lessonIds: ["elementary-grade-3-japanese-feelings-change"],
    curriculumEntryIds: ["g3-japanese-reading-literary"],
    publicationStatus: "beta",
    reviewStatus: "pilot",
  },
  {
    id: "g3-japanese-explanatory-text-unit",
    slug: "explanatory-text",
    grade: "grade-3",
    subject: "japanese",
    courseType: "regular",
    title: plain("せつめい文を読む"),
    description: plain("大切な文と、だんらくのつながりを読み取ります。"),
    order: 2,
    lessonIds: [
      "elementary-grade-3-japanese-find-key-sentences",
      "elementary-grade-3-japanese-connect-paragraphs",
    ],
    curriculumEntryIds: ["g3-japanese-reading-expository"],
    publicationStatus: "hidden",
    reviewStatus: "pilot",
  },
  {
    id: "g3-social-local-community-unit",
    slug: "local-community",
    grade: "grade-3",
    subject: "social-studies",
    courseType: "regular",
    title: plain("学校のまわりと市のようす"),
    description: plain(
      "学習用の地図から、方角・記号・土地の使われ方を読み取ります。",
    ),
    order: 1,
    lessonIds: ["elementary-grade-3-social-read-neighborhood-map"],
    curriculumEntryIds: ["g3-social-local-area-municipality"],
    publicationStatus: "beta",
    reviewStatus: "pilot",
  },
  {
    id: "g3-social-work-and-sales-unit",
    slug: "work-and-sales",
    grade: "grade-3",
    subject: "social-studies",
    courseType: "regular",
    title: plain("店ではたらく人と品物"),
    description: plain("品物が店へとどく道すじと、店のしごとの調べ方を学びます。"),
    order: 2,
    lessonIds: ["elementary-grade-3-social-goods-to-store"],
    curriculumEntryIds: ["g3-social-production-sales"],
    publicationStatus: "hidden",
    reviewStatus: "pilot",
  },
] as const;

assertUniqueRegistryKeys(
  ELEMENTARY_UNITS,
  (unit) => unit.id,
  "elementary unit ID registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_UNITS,
  (unit) => `${unit.grade}:${unit.subject}:${unit.slug}`,
  "elementary unit slug registry",
);
