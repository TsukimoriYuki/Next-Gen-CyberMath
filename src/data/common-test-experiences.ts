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
import { EXAM_SET_CATEGORIES, isPublicExamSet } from "./exam-sets";
import { SECTION_PRACTICE_EXAMS } from "./common-test/section-practice";

export type CommonTestExperienceMode =
  | "diagnosis"
  | "section-drill"
  | "full-mock-pdf"
  | "full-mock-legacy"
  /**
   * 大問1問分を通し演習として手動作成したもの（誘導・文章量を本番同等に再現するが、
   * 70分・100点の4大問構成ではない）。PDF冊子は持たず、問題本文は最初からReactで
   * 作られている。第1問前半（数と式・集合と命題）の演習として src/data/common-test/
   * section-practice/ にデータがある。
   */
  | "full-section-manual"
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

// ── 大問別ドリル（技能分解ドリル）全件。本番大問そのものではない。 ─────────
// 「第N問」を名乗るが、実体は本番大問を分解した技能練習であることを
// mode: "section-drill" として明示する。full-mock-pdf/fixed-exam と混同しない。
function buildSectionDrillEntries(): CommonTestExperience[] {
  return COMMON_TEST_SUBJECTS.filter((s) => s.id !== "english-reading").flatMap((subject) =>
    subject.sections.map((section): CommonTestExperience => ({
      id: `${subject.id}-section-${section.number}-drill`,
      title: `${subject.shortTitle} 第${section.number}問 技能分解ドリル（${section.title}）`,
      subject: subject.id,
      mode: "section-drill",
      status: "public",
      source: "manual-reviewed",
      durationMinutes: section.recommendedMinutes,
      questionCount: undefined,
      targetUrl: `${subject.route}/section-${section.number}`,
      label: `第${section.number}問 技能分解ドリル`,
      publicCta: `第${section.number}問のドリルを解く`,
      manualReviewed: true,
      qualityNote:
        "本番大問を分解した技能練習です。文章量・誘導・時間配分まで含めた本番演習は、full-mock-pdf（冊子型模試）で確認してください。",
    })),
  );
}

// ── 大問1問分の単独演習（大問型演習）。PDF冊子を持たない手動作成コンテンツ。 ──
function buildSectionPracticeEntries(): CommonTestExperience[] {
  return SECTION_PRACTICE_EXAMS.map((exam): CommonTestExperience => {
    const stats = getCommonTestMockExamStats(exam);
    return {
      id: exam.id,
      title: exam.title,
      subject: exam.subject,
      mode: "full-section-manual",
      status: exam.status === "published" && !exam.devOnly ? "public" : "draft",
      source: "manual-reviewed",
      durationMinutes: exam.durationMinutes,
      totalPoints: stats.totalPoints,
      sectionCount: stats.sectionCount,
      questionCount: stats.questionCount,
      targetUrl: `/common-test/practice/${exam.id}`,
      label: exam.title,
      publicCta: `誘導つきの大問演習（約${exam.durationMinutes}分）`,
      manualReviewed: true,
      qualityNote: "大問1問分の単独演習。PDF正本の70分模試とは別物で、第1問前半の反復練習として使う。",
    };
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
        status: isPublicExamSet(exam) ? "public" : "draft",
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
      ...buildSectionDrillEntries(),
      ...buildSectionPracticeEntries(),
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
