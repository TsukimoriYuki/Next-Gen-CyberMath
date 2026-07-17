import { assertUniqueRegistryKeys } from "@/lib/registry";
import { content, plain, ruby, text } from "@/data/elementary/inline";
import type { ElementaryUnit } from "@/types/elementary-content";

// 小学3年生・通常コースの pilot 単元 registry。
// 各単元は hidden / pilot。lessonIds は lessons registry の講座を参照する。

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
    lessonIds: ["elementary-grade-3-math-division-meaning"],
    curriculumEntryIds: ["g3-math-division"],
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
