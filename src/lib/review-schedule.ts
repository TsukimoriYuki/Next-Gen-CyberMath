// SRS 間隔反復スケジューリングロジック

const REVIEW_DAYS_BY_LEVEL: Record<number, number> = {
  0: 1,
  1: 3,
  2: 7,
  3: 14,
};

const MASTERED_THRESHOLD = 4;

/**
 * 次回復習日を計算する。
 * level 0 → 翌日、1 → 3日後、2 → 7日後、3 → 14日後、4+ → MASTERED（14日後を返す）
 */
export function getNextReviewDate(level: number, baseDate?: Date): Date {
  const base = baseDate ?? new Date();
  const days = REVIEW_DAYS_BY_LEVEL[level] ?? 14;
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * 復習完了後の次レベルと status を返す。
 */
export function getNextLevelAfterReview(
  currentLevel: number,
  isCorrect: boolean
): { nextLevel: number; status: "ACTIVE" | "MASTERED" } {
  if (!isCorrect) {
    return { nextLevel: 0, status: "ACTIVE" };
  }
  const nextLevel = currentLevel + 1;
  const status = nextLevel >= MASTERED_THRESHOLD ? "MASTERED" : "ACTIVE";
  return { nextLevel, status };
}
