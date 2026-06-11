// ── 共通テスト 教科別目標点 — localStorage CRUD ─────────────────────────
// 司令室で設定した教科ごとの目標点を保存する。SSRでは常にフォールバック値を返す。

import {
  COMMON_TEST_SUBJECTS_MAP,
  type CommonTestSubjectId,
} from "@/data/common-test";

const TARGET_SCORES_KEY = "cyber-os:common-test-target-scores";

export type CommonTestTargetScores = Partial<Record<CommonTestSubjectId, number>>;

function isAvailable(): boolean {
  return typeof window !== "undefined";
}

/** 0〜100 の整数に正規化。数値でなければ null */
export function normalizeTargetScore(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) return null;
  const rounded = Math.round(n);
  if (rounded < 0 || rounded > 100) return null;
  return rounded;
}

/** 保存済みの目標点をすべて読む（不正値は除外） */
export function getCommonTestTargetScores(): CommonTestTargetScores {
  if (!isAvailable()) return {};
  try {
    const raw = localStorage.getItem(TARGET_SCORES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    const result: CommonTestTargetScores = {};
    for (const id of Object.keys(COMMON_TEST_SUBJECTS_MAP) as CommonTestSubjectId[]) {
      const v = normalizeTargetScore((parsed as Record<string, unknown>)[id]);
      if (v !== null) result[id] = v;
    }
    return result;
  } catch {
    return {};
  }
}

/** 1教科の目標点（未設定なら科目デフォルト） */
export function getCommonTestTargetScore(subjectId: CommonTestSubjectId): number {
  const stored = getCommonTestTargetScores()[subjectId];
  return stored ?? COMMON_TEST_SUBJECTS_MAP[subjectId].targetScoreDefault;
}

/** まとめて保存。保存に成功したら true */
export function saveCommonTestTargetScores(scores: CommonTestTargetScores): boolean {
  if (!isAvailable()) return false;
  try {
    const sanitized: CommonTestTargetScores = {};
    for (const [id, v] of Object.entries(scores)) {
      const n = normalizeTargetScore(v);
      if (n !== null && id in COMMON_TEST_SUBJECTS_MAP) {
        sanitized[id as CommonTestSubjectId] = n;
      }
    }
    localStorage.setItem(TARGET_SCORES_KEY, JSON.stringify(sanitized));
    return true;
  } catch {
    return false;
  }
}
