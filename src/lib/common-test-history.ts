// ── 共通テストドリル履歴 — 型定義 + localStorage CRUD ───────────────────
// DB保存は Phase 4 で実装。現在は localStorage のみ。

export type CommonTestConfidence =
  | "confident"
  | "unsure"
  | "guessed"
  | "blank";

export interface CommonTestAnswerRecord {
  questionId: string;
  selectedAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  timeSpentSec: number;
  estimatedMinutes: number;
  confidence: CommonTestConfidence;
  skillTags: string[];
}

export interface CommonTestDrillHistoryItem {
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
}

export function buildHistoryItem(
  input: BuildHistoryItemInput
): CommonTestDrillHistoryItem {
  const { subjectId, sectionId, startedAt, finishedAt, answers } = input;

  const totalTimeSec = Math.floor((finishedAt - startedAt) / 1000);
  const estimatedTotalTimeSec = answers.reduce(
    (s, a) => s + a.estimatedMinutes * 60,
    0
  );
  const correctCount = answers.filter((a) => a.isCorrect).length;

  // Over time: actual > estimated
  const overTimeQuestionIds = answers
    .filter((a) => a.timeSpentSec > a.estimatedMinutes * 60)
    .map((a) => a.questionId);

  // Guessed correct
  const guessedCorrectQuestionIds = answers
    .filter((a) => a.isCorrect && a.confidence === "guessed")
    .map((a) => a.questionId);

  // Dangerous misconception: wrong + confident
  const dangerousMisunderstandingQuestionIds = answers
    .filter((a) => !a.isCorrect && a.confidence === "confident")
    .map((a) => a.questionId);

  // Careless mistakes: wrong + (confident | unsure) = had some idea but wrong
  const carelessMistakeQuestionIds = answers
    .filter(
      (a) =>
        !a.isCorrect &&
        (a.confidence === "confident" || a.confidence === "unsure")
    )
    .map((a) => a.questionId);

  // Weak skill tags: from wrong + guessedCorrect + dangerousMisunderstanding
  const weakCandidates = answers.filter(
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
    startedAt: new Date(startedAt).toISOString(),
    finishedAt: new Date(finishedAt).toISOString(),
    totalQuestions: answers.length,
    correctCount,
    totalTimeSec,
    estimatedTotalTimeSec,
    answers,
    weakSkillTags,
    overTimeQuestionIds,
    carelessMistakeQuestionIds,
    guessedCorrectQuestionIds,
    dangerousMisunderstandingQuestionIds,
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
