// ── 共通テスト AI作戦会議 — 型定義・入力ビルダー・href解決 ─────────────────
// AIへ渡すのは成績の「要約」のみ。問題本文・選択肢・個人情報は一切含めない。

import {
  COMMON_TEST_SUBJECTS_MAP,
  type CommonTestSubjectId,
} from "@/data/common-test";
import { getCommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestExamHistoryItem } from "@/lib/common-test-exam-history";

// ── AIへ送る入力（最小限の要約データ） ──────────────────────────────────
export interface CommonTestAiSectionInput {
  sectionId: string;
  sectionTitle?: string;
  sectionScore?: number;     // 大問配点
  earnedScore?: number;      // 全問換算の得点
  inTimeScore?: number;      // 時間内の得点
  correctCount: number;
  totalQuestions: number;
  totalTimeSec: number;        // 推定の所要時間（解答タイムスタンプから近似）
  recommendedTimeSec: number;  // 推奨時間
  unansweredCount: number;
  markedCount: number;
  weakSkillTags: string[];
}

export interface CommonTestAiAnalysisInput {
  examId: string;
  subjectId: string;
  title: string;
  targetScore?: number;
  timeLimitScore: number;
  unlimitedScore: number;
  scoreGap: number;
  totalScore: number;
  actualTimeSec: number;
  examLimitSec: number;
  weakSkillTags: string[];
  unansweredCount: number;
  markedCount: number;
  overtimeCount: number;     // 推奨時間を超過した大問の数
  sectionResults: CommonTestAiSectionInput[];
}

// ── AIが返す分析結果 ─────────────────────────────────────────────────────
export interface CommonTestAiSectionAdvice {
  sectionId: string;
  title: string;
  diagnosis: string;
  nextAction: string;
}

export interface CommonTestAiNextAction {
  title: string;
  reason: string;
  href?: string;
}

export interface CommonTestAiAnalysisResult {
  summary: string;
  scoreDiagnosis: string;
  timeDiagnosis: string;
  sectionAdvice: CommonTestAiSectionAdvice[];
  weakPointSummary: string;
  nextThreeActions: CommonTestAiNextAction[];
  reviewQueueAdvice: string;
  targetScoreAdvice: string;
  encouragement: string;
}

// ── 解答タイムスタンプから大問別の所要時間を近似する ─────────────────────
// answeredAtSec は「初めて解答した時刻（試験開始からの秒数）」。
// 時系列に並べ、隣接する解答時刻の差を「後の問題が属する大問」に加算する。
// 非線形なナビゲーションでは厳密ではないが、保存済みデータから得られる最良の近似。
function approximateSectionTimes(
  item: CommonTestExamHistoryItem
): Map<string, number> {
  const answered = item.answers
    .filter((a) => a.answeredAtSec !== null)
    .map((a) => ({ sectionId: a.sectionId, t: a.answeredAtSec as number }))
    .sort((a, b) => a.t - b.t);

  const result = new Map<string, number>();
  let prev = 0;
  for (const a of answered) {
    const delta = Math.max(0, a.t - prev);
    result.set(a.sectionId, (result.get(a.sectionId) ?? 0) + delta);
    prev = a.t;
  }
  return result;
}

/** 大問の推奨時間（秒）。科目定義の recommendedMinutes を優先、無ければ estimatedSec の合計 */
function recommendedSectionTimeSec(
  subjectId: string,
  sectionNumber: number,
  fallbackEstimatedSec: number
): number {
  const subject = COMMON_TEST_SUBJECTS_MAP[subjectId as CommonTestSubjectId];
  const section = subject?.sections.find((s) => s.number === sectionNumber);
  if (section?.recommendedMinutes) return section.recommendedMinutes * 60;
  return fallbackEstimatedSec;
}

// ── 履歴アイテム → AI入力 への変換 ───────────────────────────────────────
export function buildCommonTestAiAnalysisInput(args: {
  examHistoryItem: CommonTestExamHistoryItem;
  targetScore?: number;
}): CommonTestAiAnalysisInput {
  const item = args.examHistoryItem;
  const preset = getCommonTestExamPreset(item.examId);
  const title = preset?.title ?? item.examId;

  // 配点ベースのスコアがあればそれを、無ければ正答数ベースにフォールバック
  const timeLimitScore = item.timeLimitScore ?? item.timeLimitCorrect;
  const unlimitedScore = item.unlimitedScore ?? item.unlimitedCorrect;
  const totalScore = item.maxScore ?? item.totalQuestions;
  const scoreGap = unlimitedScore - timeLimitScore;

  const sectionTimes = approximateSectionTimes(item);

  // 大問ごとの未解答数・見直し数・弱点タグ・推定所要時間を集計
  const sectionResults: CommonTestAiSectionInput[] = item.sectionResults.map(
    (sr) => {
      const answersInSection = item.answers.filter(
        (a) => a.sectionId === sr.sectionId
      );
      const unansweredCount = answersInSection.filter(
        (a) => a.selectedAnswer === null || a.selectedAnswer === ""
      ).length;
      const markedCount = answersInSection.filter((a) => a.markedForReview).length;
      const estimatedSecSum = answersInSection.reduce(
        (s, a) => s + a.estimatedSec,
        0
      );

      // 大問内の弱点タグ（誤答・勘で正解した問題のタグを頻度順）
      const weakAnswers = answersInSection.filter(
        (a) => !a.isCorrect || a.confidence === "guessed"
      );
      const tagFreq = new Map<string, number>();
      for (const a of weakAnswers) {
        for (const tag of a.skillTags) {
          tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
        }
      }
      const weakSkillTags = [...tagFreq.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([t]) => t)
        .slice(0, 4);

      return {
        sectionId: sr.sectionId,
        sectionTitle: sr.sectionTitle,
        sectionScore: sr.maxScore,
        earnedScore: sr.earnedScore,
        inTimeScore: sr.timeLimitEarnedScore,
        correctCount: sr.correctCount,
        totalQuestions: sr.totalQuestions,
        totalTimeSec: Math.round(sectionTimes.get(sr.sectionId) ?? 0),
        recommendedTimeSec: recommendedSectionTimeSec(
          item.subjectId,
          sr.sectionNumber,
          estimatedSecSum
        ),
        unansweredCount,
        markedCount,
        weakSkillTags,
      };
    }
  );

  const overtimeCount = sectionResults.filter(
    (s) => s.recommendedTimeSec > 0 && s.totalTimeSec > s.recommendedTimeSec
  ).length;

  const markedCount = item.answers.filter((a) => a.markedForReview).length;

  return {
    examId: item.examId,
    subjectId: item.subjectId,
    title,
    targetScore: args.targetScore,
    timeLimitScore,
    unlimitedScore,
    scoreGap,
    totalScore,
    actualTimeSec: item.actualDurationSec,
    examLimitSec: item.examLimitSec,
    weakSkillTags: item.weakSkillTags.slice(0, 6),
    unansweredCount: item.unansweredCount,
    markedCount,
    overtimeCount,
    sectionResults,
  };
}

// ── href の生成・検証・解決 ──────────────────────────────────────────────
// AIに自由なURLを生成させず、実在する大問別ドリル・復習・再演習ルートに限定する。

/** この演習結果から到達可能な実在ルートの一覧 */
export function buildValidCommonTestHrefs(
  input: CommonTestAiAnalysisInput
): string[] {
  const sectionHrefs = input.sectionResults.map(
    (s) => `/common-test/${input.subjectId}/${s.sectionId}`
  );
  return [
    ...sectionHrefs,
    `/common-test/simulator/${input.examId}`,
    "/common-test/review",
  ];
}

export function isValidCommonTestHref(
  href: string | undefined,
  input: CommonTestAiAnalysisInput
): href is string {
  if (!href) return false;
  return buildValidCommonTestHrefs(input).includes(href);
}

/** 最も改善余地の大きい大問（正答率が低く、時間超過しているもの）の sectionId */
export function weakestSectionId(
  input: CommonTestAiAnalysisInput
): string | undefined {
  if (input.sectionResults.length === 0) return undefined;
  const scored = [...input.sectionResults]
    .map((s) => {
      const accuracy = s.totalQuestions > 0 ? s.correctCount / s.totalQuestions : 0;
      const overtime =
        s.recommendedTimeSec > 0 && s.totalTimeSec > s.recommendedTimeSec ? 1 : 0;
      // 正答率が低いほど、時間超過しているほど優先度が高い
      return { sectionId: s.sectionId, priority: (1 - accuracy) * 2 + overtime };
    })
    .sort((a, b) => b.priority - a.priority);
  return scored[0]?.sectionId;
}

/** href を実在ルートに解決する。無効・未指定なら最弱大問のドリルへ */
export function resolveCommonTestHref(
  href: string | undefined,
  input: CommonTestAiAnalysisInput
): string {
  if (isValidCommonTestHref(href, input)) return href;
  const weak = weakestSectionId(input);
  if (weak) return `/common-test/${input.subjectId}/${weak}`;
  return `/common-test/simulator/${input.examId}`;
}
