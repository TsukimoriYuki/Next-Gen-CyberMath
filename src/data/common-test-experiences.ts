// 共通テスト関連の「体験」を1つのレジストリに集約する。
//
// これまで /common-test, /common-test/simulator, /mypage, 各種カード・パネルが
// それぞれ独自に「10分診断」「本番形式」「冊子型」などの文言とリンク先をハードコードしており、
// 表示と実際のリンク先・所要時間・公開状態がズレる事故が繰り返し起きていた。
// ここでは実データ（COMMON_TEST_SUBJECTS / COMMON_TEST_MOCK_EXAMS /
// COMMON_TEST_EXAM_PRESETS / EXAM_SET_CATEGORIES）から生成し、表示文言をハードコードしない。

import { COMMON_TEST_SUBJECTS, type CommonTestSubjectId } from "./common-test";
import {
  COMMON_TEST_MOCK_EXAMS,
  COMMON_TEST_MOCK_EXAM_DRAFTS,
  getCommonTestMockExamStats,
} from "./common-test-mock-exams";
import { getAllCommonTestExamPresets, resolveExamPresetMeta } from "./common-test-exams";
import { EXAM_SET_CATEGORIES } from "./exam-sets";

export type CommonTestExperienceMode =
  | "diagnosis"
  | "section-drill"
  | "full-mock-pdf"
  | "full-mock-legacy"
  | "fixed-exam"
  | "practice";

export type CommonTestExperienceStatus = "public" | "draft" | "devOnly" | "archived";

export type CommonTestExperienceSource =
  | "manual-pdf"
  | "manual-reviewed"
  | "legacy-preset"
  | "ai-prototype"
  | "auto-generated";

export interface CommonTestExperience {
  id: string;
  title: string;
  subject: CommonTestSubjectId | "private-math-1a";
  mode: CommonTestExperienceMode;
  status: CommonTestExperienceStatus;
  source: CommonTestExperienceSource;
  durationMinutes: number;
  totalPoints?: number;
  sectionCount?: number;
  questionCount?: number;
  targetUrl: string;
  label: string;
  publicCta: string;
  manualReviewed: boolean;
  qualityNote?: string;
}

// ── 大問別ドリルを「ミニ診断」として案内するエントリ ────────────────────────
// 固定の「10分」などを書かず、実際の section.recommendedMinutes を使う。
function buildDiagnosisEntries(): CommonTestExperience[] {
  return COMMON_TEST_SUBJECTS.filter((s) => s.id !== "english-reading").map((subject) => {
    const preferred = subject.id === "math-2bc"
      ? subject.sections.find((s) => s.number === 2)
      : subject.sections.find((s) => s.number === 1);
    const section = preferred ?? subject.sections[0];
    return {
      id: `${subject.id}-quick-diagnosis`,
      title: `${subject.shortTitle} 第${section.number}問ミニ診断`,
      subject: subject.id,
      mode: "diagnosis",
      status: "public",
      source: "manual-reviewed",
      durationMinutes: section.recommendedMinutes,
      questionCount: undefined,
      targetUrl: `${subject.route}/section-${section.number}`,
      label: `${section.recommendedMinutes}分ミニ診断`,
      publicCta: `${section.recommendedMinutes}分ミニ診断を始める`,
      manualReviewed: true,
    } satisfies CommonTestExperience;
  });
}

// ── 手動作成PDF正本の本番模試 / AI試作版 ────────────────────────────────
function buildFullMockEntries(): CommonTestExperience[] {
  const published = COMMON_TEST_MOCK_EXAMS.map((exam): CommonTestExperience => {
    const stats = getCommonTestMockExamStats(exam);
    return {
      id: exam.id,
      title: exam.title,
      subject: exam.subject,
      mode: "full-mock-pdf",
      status: exam.status === "published" && !exam.devOnly ? "public" : "draft",
      source: "manual-pdf",
      durationMinutes: exam.durationMinutes,
      totalPoints: stats.totalPoints,
      sectionCount: stats.sectionCount,
      questionCount: stats.questionCount,
      targetUrl: `/common-test/simulator/${exam.id}`,
      label: exam.title,
      publicCta: `PDF冊子で${exam.durationMinutes}分演習`,
      manualReviewed: true,
    };
  });

  const drafts = COMMON_TEST_MOCK_EXAM_DRAFTS.map((exam): CommonTestExperience => {
    const stats = getCommonTestMockExamStats(exam);
    return {
      id: exam.id,
      title: exam.title,
      subject: exam.subject,
      mode: "practice",
      status: exam.devOnly ? "devOnly" : "draft",
      source: "ai-prototype",
      durationMinutes: exam.durationMinutes,
      totalPoints: stats.totalPoints,
      sectionCount: stats.sectionCount,
      questionCount: stats.questionCount,
      targetUrl: `/common-test/simulator/${exam.id}`,
      label: exam.title,
      publicCta: "非公開の試作版",
      manualReviewed: false,
      qualityNote: "AI生成の試作版。公開の本番模試としては扱わない。",
    };
  });

  return [...published, ...drafts];
}

// ── 旧EXAM SIMULATORプリセット（9本）。本番模試としては扱わない。 ──────────
function buildLegacyPresetEntries(): CommonTestExperience[] {
  return getAllCommonTestExamPresets().map((preset): CommonTestExperience => {
    const meta = resolveExamPresetMeta(preset);
    return {
      id: preset.id,
      title: preset.title,
      subject: preset.subjectId,
      mode: "full-mock-legacy",
      status: meta.status === "public" ? "public" : "archived",
      source: meta.source,
      durationMinutes: Math.round(preset.examLimitSec / 60),
      targetUrl: `/common-test/simulator/${preset.id}`,
      label: preset.title,
      publicCta: "旧試作版（非公開・練習用）",
      manualReviewed: meta.manualReviewed,
      qualityNote:
        "旧EXAM SIMULATORプリセット。手動作成PDF正本の本番模試とは別物であり、本番模試としては表示しない。",
    };
  });
}

// ── 固定模試（本番レベル模試集） ──────────────────────────────────────────
function buildFixedExamEntries(): CommonTestExperience[] {
  const entries: CommonTestExperience[] = [];
  for (const category of EXAM_SET_CATEGORIES) {
    for (const exam of category.examSets) {
      entries.push({
        id: exam.id,
        title: exam.title,
        subject: "private-math-1a",
        mode: "fixed-exam",
        status: exam.status === "available" ? "public" : "draft",
        source: exam.manualReviewed
          ? "manual-reviewed"
          : (exam.source ?? "manual-reviewed") === "auto-generated"
            ? "auto-generated"
            : "manual-reviewed",
        durationMinutes: exam.durationMin,
        totalPoints: exam.totalScore,
        sectionCount: exam.sections.length,
        targetUrl: `/exam-sets/${exam.categoryId}/${exam.subjectId}/${exam.id}`,
        label: exam.title,
        publicCta: "模試を開く",
        manualReviewed: exam.manualReviewed ?? false,
        qualityNote: exam.qualityNote,
      });
    }
  }
  return entries;
}

let cache: CommonTestExperience[] | null = null;

export function getCommonTestExperiences(): CommonTestExperience[] {
  if (!cache) {
    cache = [
      ...buildDiagnosisEntries(),
      ...buildFullMockEntries(),
      ...buildLegacyPresetEntries(),
      ...buildFixedExamEntries(),
    ];
  }
  return cache;
}

export function getPublicCommonTestExperiences(): CommonTestExperience[] {
  return getCommonTestExperiences().filter((e) => e.status === "public");
}

export function getCommonTestExperience(id: string): CommonTestExperience | undefined {
  return getCommonTestExperiences().find((e) => e.id === id);
}

/** 科目・モードで公開中の体験を1つ探す（例: 数IAの公開中の手動PDF本番模試）。 */
export function findPublicExperience(
  subject: CommonTestSubjectId | "private-math-1a",
  mode: CommonTestExperienceMode,
): CommonTestExperience | undefined {
  return getPublicCommonTestExperiences().find((e) => e.subject === subject && e.mode === mode);
}
