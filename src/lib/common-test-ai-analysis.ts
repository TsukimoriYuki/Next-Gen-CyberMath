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

export type CommonTestAiAnalysisSource = "gemini" | "rule";

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

const FORBIDDEN_AI_TERMS: Array<[RegExp, string]> = [
  [/特異点/g, "重要課題"],
  [/撃破/g, "克服"],
  [/討伐/g, "克服"],
  [/汚染/g, "課題"],
  [/ハッキング/g, "工夫"],
  [/侵入/g, "関与"],
  [/ボス/g, "重点問題"],
  [/メモリ破損/g, "記録の乱れ"],
  [/システム異常/g, "学習記録の乱れ"],
];

function sanitizeText(text: string): string {
  return FORBIDDEN_AI_TERMS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    text
  );
}

export function sanitizeCommonTestAiAnalysis(
  analysis: CommonTestAiAnalysisResult
): CommonTestAiAnalysisResult {
  return {
    summary: sanitizeText(analysis.summary),
    scoreDiagnosis: sanitizeText(analysis.scoreDiagnosis),
    timeDiagnosis: sanitizeText(analysis.timeDiagnosis),
    sectionAdvice: analysis.sectionAdvice.map((s) => ({
      sectionId: s.sectionId,
      title: sanitizeText(s.title),
      diagnosis: sanitizeText(s.diagnosis),
      nextAction: sanitizeText(s.nextAction),
    })),
    weakPointSummary: sanitizeText(analysis.weakPointSummary),
    nextThreeActions: analysis.nextThreeActions.map((a) => ({
      title: sanitizeText(a.title),
      reason: sanitizeText(a.reason),
      href: a.href,
    })),
    reviewQueueAdvice: sanitizeText(analysis.reviewQueueAdvice),
    targetScoreAdvice: sanitizeText(analysis.targetScoreAdvice),
    encouragement: sanitizeText(analysis.encouragement),
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function textOr(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

function sectionTitle(input: CommonTestAiAnalysisInput, sectionId: string): string {
  const section = input.sectionResults.find((s) => s.sectionId === sectionId);
  if (section?.sectionTitle) return section.sectionTitle;
  const n = sectionId.replace("section-", "");
  return `第${n}問`;
}

function firstValidSectionId(input: CommonTestAiAnalysisInput): string {
  return input.sectionResults[0]?.sectionId ?? "section-1";
}

export function parseCommonTestAiJsonText(text: string): unknown {
  const cleaned = text
    .replace(/^\uFEFF/, "")
    .replace(/```(?:json)?/gi, "```")
    .trim();
  const fenced = cleaned.match(/```([\s\S]*?)```/);
  const source = fenced?.[1]?.trim() ?? cleaned;
  const firstBrace = source.indexOf("{");
  if (firstBrace < 0) throw new Error("json object not found");

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = firstBrace; i < source.length; i++) {
    const ch = source[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }
    if (ch === "\"") {
      inString = true;
    } else if (ch === "{") {
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return JSON.parse(source.slice(firstBrace, i + 1));
      }
    }
  }
  throw new Error("json object is incomplete");
}

export function normalizeCommonTestAiAnalysis(args: {
  raw: unknown;
  input: CommonTestAiAnalysisInput;
  fallback: CommonTestAiAnalysisResult;
}): CommonTestAiAnalysisResult {
  const { raw, input, fallback } = args;
  if (!isRecord(raw)) return sanitizeCommonTestAiAnalysis(fallback);

  const rawSectionAdvice = Array.isArray(raw.sectionAdvice)
    ? raw.sectionAdvice.filter(isRecord)
    : [];
  const fallbackSectionAdvice = fallback.sectionAdvice;
  const validSectionIds = new Set(buildValidCommonTestSectionIds(input));
  const normalizedSectionAdvice = rawSectionAdvice
    .slice(0, Math.max(3, input.sectionResults.length))
    .map((s, index) => {
      const fallbackAdvice =
        fallbackSectionAdvice[index] ?? fallbackSectionAdvice[0];
      const requestedId =
        typeof s.sectionId === "string" && validSectionIds.has(s.sectionId)
          ? s.sectionId
          : fallbackAdvice?.sectionId ?? firstValidSectionId(input);
      return {
        sectionId: requestedId,
        title: textOr(
          s.title,
          fallbackAdvice?.title ?? sectionTitle(input, requestedId)
        ),
        diagnosis: textOr(s.diagnosis, fallbackAdvice?.diagnosis ?? ""),
        nextAction: textOr(s.nextAction, fallbackAdvice?.nextAction ?? ""),
      };
    })
    .filter((s) => s.diagnosis || s.nextAction);

  const sectionAdvice =
    normalizedSectionAdvice.length > 0
      ? normalizedSectionAdvice
      : fallbackSectionAdvice;

  const rawActions = Array.isArray(raw.nextThreeActions)
    ? raw.nextThreeActions.filter(isRecord)
    : [];
  const nextThreeActions: CommonTestAiNextAction[] = rawActions
    .slice(0, 3)
    .map((a, index) => {
      const fallbackAction =
        fallback.nextThreeActions[index] ?? fallback.nextThreeActions[0];
      const title = textOr(a.title, fallbackAction?.title ?? "次の演習に進む");
      const reason = textOr(
        a.reason,
        fallbackAction?.reason ?? "今回の結果から優先度が高い演習です。"
      );
      return {
        title,
        reason,
        href: resolveCommonTestHref(
          typeof a.href === "string" ? a.href : undefined,
          input,
          `${title} ${reason}`
        ),
      };
    });

  for (const action of fallback.nextThreeActions) {
    if (nextThreeActions.length >= 3) break;
    const href = resolveCommonTestHref(
      action.href,
      input,
      `${action.title} ${action.reason}`
    );
    const duplicate = nextThreeActions.some(
      (a) => a.title === action.title || a.href === href
    );
    if (!duplicate) nextThreeActions.push({ ...action, href });
  }

  while (nextThreeActions.length < 3) {
    const fallbackHref = resolveCommonTestHref(undefined, input);
    nextThreeActions.push({
      title:
        nextThreeActions.length === 0
          ? "弱点大問をもう一度解く"
          : "本番形式で解答順序を確認する",
      reason:
        nextThreeActions.length === 0
          ? "正答率と時間配分の両方を確認しやすい演習です。"
          : "解く順番と時間配分を決めておくと、未解答を減らしやすくなります。",
      href:
        nextThreeActions.length === 0 ? fallbackHref : "/common-test/simulator",
    });
  }

  return sanitizeCommonTestAiAnalysis({
    summary: textOr(raw.summary, fallback.summary),
    scoreDiagnosis: textOr(raw.scoreDiagnosis, fallback.scoreDiagnosis),
    timeDiagnosis: textOr(raw.timeDiagnosis, fallback.timeDiagnosis),
    sectionAdvice,
    weakPointSummary: textOr(raw.weakPointSummary, fallback.weakPointSummary),
    nextThreeActions: nextThreeActions.slice(0, 3),
    reviewQueueAdvice: textOr(raw.reviewQueueAdvice, fallback.reviewQueueAdvice),
    targetScoreAdvice: textOr(raw.targetScoreAdvice, fallback.targetScoreAdvice),
    encouragement: textOr(raw.encouragement, fallback.encouragement),
  });
}

export function normalizeCommonTestAiAnalysisFromText(args: {
  text: string;
  input: CommonTestAiAnalysisInput;
  fallback: CommonTestAiAnalysisResult;
}): CommonTestAiAnalysisResult {
  return normalizeCommonTestAiAnalysis({
    raw: parseCommonTestAiJsonText(args.text),
    input: args.input,
    fallback: args.fallback,
  });
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
export function buildValidCommonTestSectionIds(
  input: CommonTestAiAnalysisInput
): string[] {
  const subject = COMMON_TEST_SUBJECTS_MAP[input.subjectId as CommonTestSubjectId];
  if (subject) return subject.sections.map((s) => `section-${s.number}`);
  const fromInput = input.sectionResults.map((s) => s.sectionId);
  return fromInput.length > 0 ? fromInput : ["section-1"];
}

export function buildValidCommonTestHrefs(
  input: CommonTestAiAnalysisInput
): string[] {
  const sectionHrefs = buildValidCommonTestSectionIds(input).map(
    (sectionId) => `/common-test/${input.subjectId}/${sectionId}`
  );
  return [
    ...sectionHrefs,
    "/common-test/simulator",
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

function includesAny(text: string, words: string[]): boolean {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word.toLowerCase()));
}

export function topicRecommendedSectionId(
  input: CommonTestAiAnalysisInput,
  hint = ""
): string | undefined {
  const orderedHints = [
    ...input.weakSkillTags,
    ...input.sectionResults.flatMap((s) => [
      s.sectionTitle ?? "",
      ...s.weakSkillTags,
    ]),
  ];
  const allText = orderedHints.join(" ");

  const pickFromText = (text: string): string | undefined => {
  if (input.subjectId === "math-1a") {
    if (includesAny(text, ["データ", "data", "相関", "四分位", "箱ひげ"])) {
      return "section-2";
    }
    if (includesAny(text, ["場合の数", "確率", "combinatorics", "probability"])) {
      return "section-4";
    }
  }

  if (input.subjectId === "math-2bc") {
      if (includesAny(text, ["ベクトル", "vector", "内積", "位置ベクトル"])) {
        return "section-5";
      }
    if (includesAny(text, ["数列", "sequence", "漸化式", "等差", "等比"])) {
      return "section-3";
    }
  }

  if (input.subjectId === "english-reading") {
      if (includesAny(text, ["レポート", "report", "複数資料", "資料統合", "ノート"])) {
        return "section-8";
      }
    if (includesAny(text, ["情報照合", "matching", "照合", "条件", "スキミング"])) {
      return "section-5";
    }
  }

  return undefined;
  };

  const hintPick = pickFromText(hint);
  if (hintPick) return hintPick;
  for (const orderedHint of orderedHints) {
    const picked = pickFromText(orderedHint);
    if (picked) return picked;
  }
  return pickFromText(allText);
}

/** href を実在ルートに解決する。無効・未指定ならタグ推奨または最弱大問のドリルへ */
export function resolveCommonTestHref(
  href: string | undefined,
  input: CommonTestAiAnalysisInput,
  hint = ""
): string {
  if (isValidCommonTestHref(href, input)) return href;
  const topic = topicRecommendedSectionId(input, hint);
  if (topic) return `/common-test/${input.subjectId}/${topic}`;
  const weak = weakestSectionId(input);
  if (weak) return `/common-test/${input.subjectId}/${weak}`;
  return "/common-test/simulator";
}
