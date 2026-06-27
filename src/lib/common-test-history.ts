// ── 共通テストドリル履歴 — 型定義 + localStorage CRUD ───────────────────
// DB保存は Phase 4 で実装。現在は localStorage のみ。

export type CommonTestConfidence =
  | "confident"
  | "unsure"
  | "guessed"
  | "blank";

export type CommonTestMistakeTagId =
  | "calculation"
  | "formula-selection"
  | "reading-misread"
  | "condition-missed"
  | "case-split"
  | "figure-reading"
  | "time-up"
  | "confident-wrong"
  | "unsure-correct";

export type CommonTestRiskLevel = "S" | "A" | "B" | "C";
export type CommonTestHistorySourceType = "drill" | "lecture";

export interface CommonTestHistorySourceInfo {
  sourceType?: CommonTestHistorySourceType;
  lectureId?: string;
  lectureSlug?: string;
  lectureTitle?: string;
  blockId?: string;
  problemTitle?: string;
}

export interface CommonTestMistakeTagDefinition {
  id: CommonTestMistakeTagId;
  label: string;
  riskLevel: CommonTestRiskLevel;
  appliesTo: "wrong" | "correct";
}

export const COMMON_TEST_MISTAKE_TAGS: CommonTestMistakeTagDefinition[] = [
  { id: "calculation", label: "計算ミス", riskLevel: "B", appliesTo: "wrong" },
  { id: "formula-selection", label: "公式選択ミス", riskLevel: "A", appliesTo: "wrong" },
  { id: "reading-misread", label: "問題文の読み違い", riskLevel: "B", appliesTo: "wrong" },
  { id: "condition-missed", label: "条件見落とし", riskLevel: "A", appliesTo: "wrong" },
  { id: "case-split", label: "場合分け不足", riskLevel: "A", appliesTo: "wrong" },
  { id: "figure-reading", label: "図の見落とし", riskLevel: "A", appliesTo: "wrong" },
  { id: "time-up", label: "時間切れ", riskLevel: "B", appliesTo: "wrong" },
  { id: "confident-wrong", label: "自信ありで間違えた", riskLevel: "S", appliesTo: "wrong" },
  { id: "unsure-correct", label: "自信なしで正解した", riskLevel: "C", appliesTo: "correct" },
];

export const COMMON_TEST_RISK_META: Record<
  CommonTestRiskLevel,
  { label: string; description: string; color: string; className: string }
> = {
  S: {
    label: "危険度S",
    description: "自信ありで間違えた問題。最優先で復習。",
    color: "#e11d48",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  A: {
    label: "危険度A",
    description: "考え方や条件処理を再確認。",
    color: "#d97706",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  B: {
    label: "危険度B",
    description: "処理速度と読み取りを安定化。",
    color: "#2563eb",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  C: {
    label: "危険度C",
    description: "正解したが根拠を固めたい問題。",
    color: "#64748b",
    className: "border-slate-200 bg-slate-50 text-slate-600",
  },
};

export interface CommonTestAnswerRecord {
  questionId: string;
  selectedAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  timeSpentSec: number;
  estimatedMinutes: number;
  confidence: CommonTestConfidence;
  skillTags: string[];
  mistakeTagIds?: CommonTestMistakeTagId[];
  riskLevel?: CommonTestRiskLevel;
  sourceType?: CommonTestHistorySourceType;
  lectureId?: string;
  lectureSlug?: string;
  lectureTitle?: string;
  blockId?: string;
  problemTitle?: string;
}

export interface CommonTestDrillHistoryItem extends CommonTestHistorySourceInfo {
  id: string;
  subjectId: string;
  sectionId: string;
  startedAt: string;
  finishedAt: string;
  totalQuestions: number;
  correctCount: number;
  totalTimeSec: number;
  estimatedTotalTimeSec: number;
  answers: CommonTestAnswerRecord[];
  weakSkillTags: string[];
  overTimeQuestionIds: string[];
  carelessMistakeQuestionIds: string[];
  guessedCorrectQuestionIds: string[];
  dangerousMisunderstandingQuestionIds: string[];
  mistakeTagCounts?: Partial<Record<CommonTestMistakeTagId, number>>;
  riskLevelCounts?: Partial<Record<CommonTestRiskLevel, number>>;
  highRiskQuestionIds?: string[];
}

export function getCommonTestMistakeTagDefinition(
  id: string
): CommonTestMistakeTagDefinition | undefined {
  return COMMON_TEST_MISTAKE_TAGS.find((tag) => tag.id === id);
}

export function getCommonTestMistakeTagLabel(id: string): string {
  return getCommonTestMistakeTagDefinition(id)?.label ?? id;
}

export function getCommonTestRiskMeta(level?: CommonTestRiskLevel | null) {
  return level ? COMMON_TEST_RISK_META[level] : null;
}

export function getCommonTestRiskLevel(
  tagIds: readonly CommonTestMistakeTagId[]
): CommonTestRiskLevel | null {
  const levels = tagIds
    .map((id) => getCommonTestMistakeTagDefinition(id)?.riskLevel)
    .filter(Boolean) as CommonTestRiskLevel[];
  if (levels.includes("S")) return "S";
  if (levels.includes("A")) return "A";
  if (levels.includes("B")) return "B";
  if (levels.includes("C")) return "C";
  return null;
}

export function normalizeCommonTestMistakeTags({
  tagIds = [],
  isCorrect,
  confidence,
  isOverTime = false,
}: {
  tagIds?: readonly CommonTestMistakeTagId[];
  isCorrect: boolean;
  confidence: CommonTestConfidence;
  isOverTime?: boolean;
}): CommonTestMistakeTagId[] {
  const allowedAppliesTo = isCorrect ? "correct" : "wrong";
  const normalized = new Set<CommonTestMistakeTagId>();

  for (const tagId of tagIds) {
    const definition = getCommonTestMistakeTagDefinition(tagId);
    if (definition?.appliesTo === allowedAppliesTo) normalized.add(definition.id);
  }

  if (!isCorrect && confidence === "confident") normalized.add("confident-wrong");
  if (!isCorrect && isOverTime) normalized.add("time-up");
  if (isCorrect && confidence === "unsure") normalized.add("unsure-correct");

  return COMMON_TEST_MISTAKE_TAGS
    .map((tag) => tag.id)
    .filter((tagId) => normalized.has(tagId));
}

export function getCommonTestAnswerMistakeTagIds(
  answer: CommonTestAnswerRecord
): CommonTestMistakeTagId[] {
  return normalizeCommonTestMistakeTags({
    tagIds: answer.mistakeTagIds,
    isCorrect: answer.isCorrect,
    confidence: answer.confidence,
    isOverTime: answer.timeSpentSec > answer.estimatedMinutes * 60,
  });
}

// ─────────────────────────────────────────────────────────────────────────
const COMMON_TEST_HISTORY_KEY = "cyber-os:common-test-history";
const MAX_HISTORY = 100;

function isAvailable(): boolean {
  return typeof window !== "undefined";
}

function readRaw(): CommonTestDrillHistoryItem[] {
  if (!isAvailable()) return [];
  try {
    const raw = localStorage.getItem(COMMON_TEST_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCommonTestDrillHistory(item: CommonTestDrillHistoryItem): void {
  if (!isAvailable()) return;
  try {
    const existing = readRaw();
    const updated = [item, ...existing].slice(0, MAX_HISTORY);
    localStorage.setItem(COMMON_TEST_HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

export function getCommonTestDrillHistory(): CommonTestDrillHistoryItem[] {
  return readRaw();
}

export function getCommonTestHistoryBySubject(
  subjectId: string
): CommonTestDrillHistoryItem[] {
  return readRaw().filter((h) => h.subjectId === subjectId);
}

export function getCommonTestHistoryBySection(
  subjectId: string,
  sectionId: string
): CommonTestDrillHistoryItem[] {
  return readRaw().filter(
    (h) => h.subjectId === subjectId && h.sectionId === sectionId
  );
}

export function clearCommonTestDrillHistory(): void {
  if (!isAvailable()) return;
  try {
    localStorage.removeItem(COMMON_TEST_HISTORY_KEY);
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────────────────────────────────
// ヘルパー：CommonTestDrillHistoryItem を構築する
// ─────────────────────────────────────────────────────────────────────────

export interface BuildHistoryItemInput {
  subjectId: string;
  sectionId: string;
  startedAt: number; // epoch ms
  finishedAt: number; // epoch ms
  answers: CommonTestAnswerRecord[];
  source?: CommonTestHistorySourceInfo;
}

export function buildHistoryItem(
  input: BuildHistoryItemInput
): CommonTestDrillHistoryItem {
  const { subjectId, sectionId, startedAt, finishedAt, answers, source } = input;

  const totalTimeSec = Math.floor((finishedAt - startedAt) / 1000);
  const estimatedTotalTimeSec = answers.reduce(
    (s, a) => s + a.estimatedMinutes * 60,
    0
  );
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const normalizedAnswers = answers.map((answer) => {
    const mistakeTagIds = getCommonTestAnswerMistakeTagIds(answer);
    const riskLevel = getCommonTestRiskLevel(mistakeTagIds);
    return {
      ...answer,
      mistakeTagIds,
      ...(riskLevel ? { riskLevel } : {}),
    };
  });

  // Over time: actual > estimated
  const overTimeQuestionIds = normalizedAnswers
    .filter((a) => a.timeSpentSec > a.estimatedMinutes * 60)
    .map((a) => a.questionId);

  // Guessed correct
  const guessedCorrectQuestionIds = normalizedAnswers
    .filter((a) => a.isCorrect && a.confidence === "guessed")
    .map((a) => a.questionId);

  // Dangerous misconception: wrong + confident
  const dangerousMisunderstandingQuestionIds = normalizedAnswers
    .filter((a) => !a.isCorrect && a.confidence === "confident")
    .map((a) => a.questionId);

  // Careless mistakes: wrong + (confident | unsure) = had some idea but wrong
  const carelessMistakeQuestionIds = normalizedAnswers
    .filter(
      (a) =>
        !a.isCorrect &&
        (a.confidence === "confident" || a.confidence === "unsure")
    )
    .map((a) => a.questionId);

  // Weak skill tags: from wrong + guessedCorrect + dangerousMisunderstanding
  const mistakeTagCounts: Partial<Record<CommonTestMistakeTagId, number>> = {};
  const riskLevelCounts: Partial<Record<CommonTestRiskLevel, number>> = {};
  const highRiskQuestionIds: string[] = [];

  for (const answer of normalizedAnswers) {
    for (const tagId of answer.mistakeTagIds ?? []) {
      mistakeTagCounts[tagId] = (mistakeTagCounts[tagId] ?? 0) + 1;
    }
    if (answer.riskLevel) {
      riskLevelCounts[answer.riskLevel] = (riskLevelCounts[answer.riskLevel] ?? 0) + 1;
      if (answer.riskLevel === "S") highRiskQuestionIds.push(answer.questionId);
    }
  }

  const weakCandidates = normalizedAnswers.filter(
    (a) =>
      !a.isCorrect ||
      guessedCorrectQuestionIds.includes(a.questionId) ||
      dangerousMisunderstandingQuestionIds.includes(a.questionId)
  );
  const tagFreq = new Map<string, number>();
  for (const a of weakCandidates) {
    for (const tag of a.skillTags) {
      tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
    }
  }
  const weakSkillTags = Array.from(tagFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  return {
    id: `${subjectId}-${sectionId}-${finishedAt}`,
    subjectId,
    sectionId,
    ...source,
    startedAt: new Date(startedAt).toISOString(),
    finishedAt: new Date(finishedAt).toISOString(),
    totalQuestions: normalizedAnswers.length,
    correctCount,
    totalTimeSec,
    estimatedTotalTimeSec,
    answers: normalizedAnswers,
    weakSkillTags,
    overTimeQuestionIds,
    carelessMistakeQuestionIds,
    guessedCorrectQuestionIds,
    dangerousMisunderstandingQuestionIds,
    mistakeTagCounts,
    riskLevelCounts,
    highRiskQuestionIds,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 弱点タグ → 推奨アクション
// ─────────────────────────────────────────────────────────────────────────

export const TAG_RECOMMENDATIONS: Record<string, string> = {
  情報照合: "英語R 第5問・第8問を重点演習",
  データ読み取り: "数学IA 第2問（データの分析）を重点演習",
  誘導読解: "数学II・B・C 数列・ベクトルで誘導追いの練習",
  時間配分: "タイムアタック演習で処理速度を鍛える",
  要旨把握: "英語R 第7問・第3問の主旨把握問題を演習",
  計算処理: "計算ドリルを毎日5分実施",
  英語スキャニング: "速読トレーニング（英語速読道場）を推奨",
  条件整理: "集合・命題の条件整理演習を推奨",
  数式変形: "数学の式変形・因数分解を基礎から復習",
  図表読解: "データ分析・グラフ読解問題を中心に演習",
  選択肢消去: "選択肢消去法の演習を積む",
  レポート完成: "英語R 第8問の複数資料統合を重点演習",
  会話文: "英語R 第2問の会話・投稿形式に慣れる",
  時系列整理: "英語R 第6問の時系列把握問題を演習",
};
