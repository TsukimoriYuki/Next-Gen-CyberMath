import type { CommonTestExamAnswerRecord } from "@/lib/common-test-exam-history";

export type DifficultyStage = "basic" | "standard" | "guided" | "advanced";

const STAGE_LABELS: Record<DifficultyStage, string> = {
  basic: "基本確認",
  standard: "標準",
  guided: "誘導",
  advanced: "応用",
};

export const ALL_STAGES: DifficultyStage[] = ["basic", "standard", "guided", "advanced"];

export interface StageStats {
  stage: DifficultyStage;
  label: string;
  total: number;
  correct: number;
  /** -1 means no data */
  accuracy: number;
}

export interface CascadeMiss {
  sectionId: string;
  pivotQuestionId: string;
  chainQuestionId: string;
}

export interface MarkSheetStats {
  markSheetTotal: number;
  markSheetCorrect: number;
  markSheetAccuracy: number;
  choiceTotal: number;
  choiceCorrect: number;
  choiceAccuracy: number;
}

export interface TimeStats {
  /** Correct answers that appear to have been submitted after examLimitSec */
  afterLimitCorrectCount: number;
  timePressureRatio: number;
  isOverTime: boolean;
}

export interface QuestionMetaForAnalysis {
  difficultyStage?: DifficultyStage;
  dependsOnPrevious?: boolean;
  answerFormat?: "choice" | "number" | "digits" | "text";
}

export interface ExamResultAnalysis {
  stageStats: StageStats[];
  hasMeaningfulStageData: boolean;
  weakestStage: DifficultyStage | null;
  cascadeMisses: CascadeMiss[];
  markSheetStats: MarkSheetStats | null;
  timeStats: TimeStats;
}

export function analyzeExamResult(
  answers: CommonTestExamAnswerRecord[],
  questionMeta: Map<string, QuestionMetaForAnalysis>,
  examLimitSec: number,
  actualDurationSec: number,
): ExamResultAnalysis {
  // ── Difficulty stage breakdown ──────────────────────────────────────────
  const stageBuckets = new Map<DifficultyStage, { total: number; correct: number }>(
    ALL_STAGES.map((s) => [s, { total: 0, correct: 0 }]),
  );

  for (const ans of answers) {
    const stage = questionMeta.get(ans.questionId)?.difficultyStage;
    if (!stage) continue;
    const b = stageBuckets.get(stage)!;
    b.total++;
    if (ans.isCorrect) b.correct++;
  }

  const stageStats: StageStats[] = ALL_STAGES.map((stage) => {
    const { total, correct } = stageBuckets.get(stage)!;
    return {
      stage,
      label: STAGE_LABELS[stage],
      total,
      correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : -1,
    };
  }).filter((s) => s.total > 0);

  const hasMeaningfulStageData = stageStats.filter((s) => s.accuracy >= 0).length >= 2;

  let weakestStage: DifficultyStage | null = null;
  if (hasMeaningfulStageData) {
    const withData = stageStats.filter((s) => s.accuracy >= 0);
    const worst = withData.reduce((a, b) => (a.accuracy < b.accuracy ? a : b), withData[0]);
    if (worst && worst.accuracy < 70) weakestStage = worst.stage;
  }

  // ── DependsOnPrevious cascade misses ───────────────────────────────────
  const cascadeMisses: CascadeMiss[] = [];
  for (let i = 1; i < answers.length; i++) {
    const cur = answers[i];
    const prev = answers[i - 1];
    const curMeta = questionMeta.get(cur.questionId);
    if (!curMeta?.dependsOnPrevious) continue;
    if (cur.sectionId !== prev.sectionId) continue;
    if (!cur.isCorrect && !prev.isCorrect) {
      cascadeMisses.push({
        sectionId: cur.sectionId,
        pivotQuestionId: prev.questionId,
        chainQuestionId: cur.questionId,
      });
    }
  }

  // ── MarkSheet vs choice accuracy ────────────────────────────────────────
  let markSheetTotal = 0, markSheetCorrect = 0;
  let choiceTotal = 0, choiceCorrect = 0;
  let hasAnyMarkSheetMeta = false;

  for (const ans of answers) {
    const fmt = questionMeta.get(ans.questionId)?.answerFormat;
    if (!fmt) continue;
    if (fmt === "choice") {
      choiceTotal++;
      if (ans.isCorrect) choiceCorrect++;
    } else {
      hasAnyMarkSheetMeta = true;
      markSheetTotal++;
      if (ans.isCorrect) markSheetCorrect++;
    }
  }

  const markSheetStats: MarkSheetStats | null =
    hasAnyMarkSheetMeta && markSheetTotal > 0
      ? {
          markSheetTotal,
          markSheetCorrect,
          markSheetAccuracy: Math.round((markSheetCorrect / markSheetTotal) * 100),
          choiceTotal,
          choiceCorrect,
          choiceAccuracy:
            choiceTotal > 0 ? Math.round((choiceCorrect / choiceTotal) * 100) : -1,
        }
      : null;

  // ── Time stats ──────────────────────────────────────────────────────────
  // Questions answered after the time limit that were correct contribute to unlimitedScore
  // but not timeLimitScore — this is the "gap"
  const afterLimitCorrectCount = answers.filter(
    (a) => a.isCorrect && a.answeredAtSec != null && a.answeredAtSec > examLimitSec,
  ).length;

  return {
    stageStats,
    hasMeaningfulStageData,
    weakestStage,
    cascadeMisses,
    markSheetStats,
    timeStats: {
      afterLimitCorrectCount,
      timePressureRatio: Math.min(actualDurationSec / Math.max(examLimitSec, 1), 2),
      isOverTime: actualDurationSec > examLimitSec,
    },
  };
}
