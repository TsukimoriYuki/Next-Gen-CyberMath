// ── 共通テスト EXAM SIMULATOR プリセット ─────────────────────────────────
// Phase 5 — 3科目の70/80分模擬試験設定

import type { CommonTestSubjectId, CommonTestTheme } from "@/data/common-test";

export interface CommonTestExamPreset {
  id: string;
  subjectId: CommonTestSubjectId;
  title: string;
  shortTitle: string;
  examLimitSec: number;
  description: string;
  sectionIds: string[];
  theme: CommonTestTheme;
  icon: string;
}

export const COMMON_TEST_EXAM_PRESETS: CommonTestExamPreset[] = [
  {
    id: "math-1a-70",
    subjectId: "math-1a",
    title: "数学IA — 70分模擬試験",
    shortTitle: "数IA 70min",
    examLimitSec: 4200, // 70 * 60
    description:
      "数学Iおよび数学Aから大問4問（第1〜第4問）を出題。集合・命題・データ・図形の性質・確率の全範囲を網羅した本番形式模擬試験。",
    sectionIds: ["section-1", "section-2", "section-3", "section-4"],
    icon: "数IA",
    theme: {
      primary: "#00d2ff",
      secondary: "#ff00aa",
      glowRgb: "0,210,255",
    },
  },
  {
    id: "math-2bc-70",
    subjectId: "math-2bc",
    title: "数学II・B・C — 70分模擬試験",
    shortTitle: "数IIB 70min",
    examLimitSec: 4200,
    description:
      "三角関数・積分・数列・統計的推測・ベクトル・複素数平面から全6大問（第1〜第6問）を出題。処理速度と誘導読解力の総合試験。",
    sectionIds: ["section-1", "section-2", "section-3", "section-4", "section-5", "section-6"],
    icon: "数IIB",
    theme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      glowRgb: "168,85,247",
    },
  },
  {
    id: "english-reading-80",
    subjectId: "english-reading",
    title: "英語リーディング — 80分模擬試験",
    shortTitle: "英語R 80min",
    examLimitSec: 4800, // 80 * 60
    description:
      "案内文・投稿・説明文・グラフ・情報照合・物語・論説文・レポートから全8大問を出題。スキャニング・要旨把握・情報統合の総合力を測定。",
    sectionIds: [
      "section-1",
      "section-2",
      "section-3",
      "section-4",
      "section-5",
      "section-6",
      "section-7",
      "section-8",
    ],
    icon: "英語R",
    theme: {
      primary: "#10b981",
      secondary: "#facc15",
      glowRgb: "16,185,129",
    },
  },
];

export const COMMON_TEST_EXAM_PRESETS_MAP: Record<string, CommonTestExamPreset> =
  Object.fromEntries(COMMON_TEST_EXAM_PRESETS.map((p) => [p.id, p]));

export function getCommonTestExamPreset(id: string): CommonTestExamPreset | null {
  return COMMON_TEST_EXAM_PRESETS_MAP[id] ?? null;
}

export function getAllCommonTestExamPresets(): CommonTestExamPreset[] {
  return COMMON_TEST_EXAM_PRESETS;
}
