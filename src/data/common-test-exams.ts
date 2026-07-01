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
  /** 第1回・第2回・第3回など、同一科目内のセットを区別するラベル */
  roundLabel?: string;
  /** 必答大問（選択制プリセットのみ） */
  requiredSectionIds?: string[];
  /** 選択候補の大問（選択制プリセットのみ） */
  optionalSectionIds?: string[];
  /** 選択候補から選ぶ題数（選択制プリセットのみ） */
  optionalSelectCount?: number;
  /**
   * 公開状態。"public" のみ一覧・導線に表示してよい。省略時は "draft" 扱い。
   * この EXAM SIMULATOR プリセット群は、手動作成PDF正本の模試とは別物の
   * ドリル束であり、本番模試として見せないため既定を "draft" にしている。
   */
  status?: "public" | "draft";
  /** データの出自。省略時は legacy-preset 扱い。 */
  source?: "manual-pdf" | "manual-reviewed" | "legacy-preset" | "ai-prototype" | "auto-generated";
  /** 人間による内容レビュー済みか。省略時は false 扱い。 */
  manualReviewed?: boolean;
  /** 表示上の扱い。本番模試として見せてよいのは full-mock-pdf 系のみ。省略時は practice-only 扱い。 */
  publicMode?: "full-mock-pdf" | "full-mock-legacy" | "practice-only";
}

/** 個々のプリセットにメタ情報が無い場合の既定値（= 旧プリセット束は本番模試扱いにしない）。 */
const EXAM_PRESET_DEFAULTS = {
  status: "draft" as const,
  source: "legacy-preset" as const,
  manualReviewed: false,
  publicMode: "practice-only" as const,
};

export function resolveExamPresetMeta(preset: CommonTestExamPreset) {
  return { ...EXAM_PRESET_DEFAULTS, ...preset };
}

export const COMMON_TEST_EXAM_PRESETS: CommonTestExamPreset[] = [
  {
    id: "math-1a-70",
    roundLabel: "第1回",
    subjectId: "math-1a",
    title: "数学IA — 70分模擬試験 第1回",
    shortTitle: "数IA 第1回",
    examLimitSec: 4200, // 70 * 60
    description:
      "数学Iおよび数学Aから大問4問（第1〜第4問・全問必答）を出題。集合・命題・データ・図形の性質・確率の全範囲を網羅した本番形式模擬試験。",
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
    roundLabel: "第1回",
    subjectId: "math-2bc",
    title: "数学II・B・C — 70分模擬試験 第1回",
    shortTitle: "数IIBC 第1回",
    examLimitSec: 4200,
    description:
      "第1問〜第3問（図形と方程式・三角関数、指数対数・微積分、数列）は必答。第4問〜第7問（統計的な推測・ベクトル・平面上の曲線・複素数平面）から3題を選択して解答する本番形式。",
    sectionIds: [
      "section-1",
      "section-2",
      "section-3",
      "section-4",
      "section-5",
      "section-6",
      "section-7",
    ],
    requiredSectionIds: ["section-1", "section-2", "section-3"],
    optionalSectionIds: ["section-4", "section-5", "section-6", "section-7"],
    optionalSelectCount: 3,
    icon: "数IIBC",
    theme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      glowRgb: "168,85,247",
    },
  },
  {
    id: "english-reading-80",
    roundLabel: "第1回",
    subjectId: "english-reading",
    title: "英語リーディング — 80分模擬試験 第1回",
    shortTitle: "英語R 第1回",
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

  // ── 数学IA 第2回・第3回 ──────────────────────────────────────────────────
  {
    id: "math-1a-70-v2",
    roundLabel: "第2回",
    subjectId: "math-1a",
    title: "数学IA — 70分模擬試験 第2回",
    shortTitle: "数IA 第2回",
    examLimitSec: 4200,
    description:
      "坂道と三角比・気温と来場者数のデータ分析・角の二等分線・玉の確率の全4大問（全問必答）。第1回とは題材を変えたオリジナル問題で構成。",
    sectionIds: ["section-1", "section-2", "section-3", "section-4"],
    icon: "数IA",
    theme: {
      primary: "#00d2ff",
      secondary: "#ff00aa",
      glowRgb: "0,210,255",
    },
  },
  {
    id: "math-1a-70-v3",
    roundLabel: "第3回",
    subjectId: "math-1a",
    title: "数学IA — 70分模擬試験 第3回",
    shortTitle: "数IA 第3回",
    examLimitSec: 4200,
    description:
      "三角比と余弦定理・価格と売上のデータ分析・相似と面積比・2個のさいころの確率の全4大問（全問必答）。第1回・第2回と重複しないオリジナル問題。",
    sectionIds: ["section-1", "section-2", "section-3", "section-4"],
    icon: "数IA",
    theme: {
      primary: "#00d2ff",
      secondary: "#ff00aa",
      glowRgb: "0,210,255",
    },
  },

  // ── 数学II・B・C 第2回・第3回 ───────────────────────────────────────────
  {
    id: "math-2bc-70-v2",
    roundLabel: "第2回",
    subjectId: "math-2bc",
    title: "数学II・B・C — 70分模擬試験 第2回",
    shortTitle: "数IIBC 第2回",
    examLimitSec: 4200,
    description:
      "第1問〜第3問（三角関数の合成、微積分・指数対数、数列）は必答。第4問〜第7問（統計的な推測・ベクトル・平面上の曲線・複素数平面）から3題を選択。数列・統計・ベクトルを重点としたオリジナル問題。",
    sectionIds: [
      "section-1",
      "section-2",
      "section-3",
      "section-4",
      "section-5",
      "section-6",
      "section-7",
    ],
    requiredSectionIds: ["section-1", "section-2", "section-3"],
    optionalSectionIds: ["section-4", "section-5", "section-6", "section-7"],
    optionalSelectCount: 3,
    icon: "数IIBC",
    theme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      glowRgb: "168,85,247",
    },
  },
  {
    id: "math-2bc-70-v3",
    roundLabel: "第3回",
    subjectId: "math-2bc",
    title: "数学II・B・C — 70分模擬試験 第3回",
    shortTitle: "数IIBC 第3回",
    examLimitSec: 4200,
    description:
      "第1問〜第3問（円と接線、対数・積分、等比数列）は必答。第4問〜第7問（統計的な推測・ベクトル・平面上の曲線・複素数平面）から3題を選択。第2回と題材を変えたオリジナル問題。",
    sectionIds: [
      "section-1",
      "section-2",
      "section-3",
      "section-4",
      "section-5",
      "section-6",
      "section-7",
    ],
    requiredSectionIds: ["section-1", "section-2", "section-3"],
    optionalSectionIds: ["section-4", "section-5", "section-6", "section-7"],
    optionalSelectCount: 3,
    icon: "数IIBC",
    theme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      glowRgb: "168,85,247",
    },
  },

  // ── 英語リーディング 第2回・第3回 ───────────────────────────────────────
  {
    id: "english-reading-80-v2",
    roundLabel: "第2回",
    subjectId: "english-reading",
    title: "英語リーディング — 80分模擬試験 第2回",
    shortTitle: "英語R 第2回",
    examLimitSec: 4800,
    description:
      "図書館の案内・部活動ブログ・記事・グラフ・学園祭ボランティアの情報照合・物語・論説・生徒のレポート完成の全8大問。完全オリジナルの英文で構成。",
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
  {
    id: "english-reading-80-v3",
    roundLabel: "第3回",
    subjectId: "english-reading",
    title: "英語リーディング — 80分模擬試験 第3回",
    shortTitle: "英語R 第3回",
    examLimitSec: 4800,
    description:
      "イベント告知・商品レビュー・説明文・調査グラフ・オンライン講座の情報照合・物語・論説・アンケート結果のレポート完成の全8大問。第2回と題材を変えた完全オリジナルの英文。",
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
