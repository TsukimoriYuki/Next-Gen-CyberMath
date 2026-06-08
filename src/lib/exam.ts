import { PROBLEMS } from "@/data/problems";
import { LESSONS } from "@/data/lessons";
import { DIFFICULTY_ORDER, type Difficulty, type Lesson, type Problem } from "@/lib/types";

// サイバー模試：生成・採点はクライアント／静的データで行う。

export interface ExamConfig {
  difficulties: Difficulty[];
  tags: string[]; // 空なら全タグ対象
  count: number;
  timeLimitSec: number;
}

export interface ExamResult {
  problemSlugs: string[];
  wrongSlugs: string[];
  score: number;
  totalCount: number;
  durationSec: number;
  weakTags: string[];
}

/** 条件に合う問題をランダム抽出して模試を生成する。 */
export function generateExam(cfg: ExamConfig): Problem[] {
  let pool = PROBLEMS.filter((p) => cfg.difficulties.includes(p.difficulty));
  if (cfg.tags.length > 0) {
    pool = pool.filter((p) =>
      (p.tags ?? []).some((t) => cfg.tags.includes(t)),
    );
  }
  // Fisher–Yates シャッフル
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(cfg.count, a.length));
}

// ============================================================
// 要件C：時間逆算型アルゴリズム
// 制限時間 T（分）から難易度配分と問題数を自動最適化する。
// 「10分でD難度10問」のような破綻設定は、予算が足りず構造的に起きない。
// ============================================================

/** 各難易度の想定消費時間（分）。D+ は未指定のため 35 分で見積もる。 */
export const DIFFICULTY_COST_MIN: Record<Difficulty, number> = {
  A: 3,
  B: 6,
  C: 15,
  D: 25,
  D_PLUS: 35,
};

/**
 * 時間帯ごとの「時間シェア・プロファイル」アンカー。
 * T がアンカー間にあるときは線形補間し、両端はクランプする。
 * 短時間ほど A/B 偏重、長時間ほど C/D/D+ が解禁される。
 */
const SHARE_ANCHORS: { t: number; share: Record<Difficulty, number> }[] = [
  { t: 15, share: { A: 0.5, B: 0.4, C: 0.1, D: 0, D_PLUS: 0 } },
  { t: 50, share: { A: 0.2, B: 0.35, C: 0.3, D: 0.15, D_PLUS: 0 } },
  { t: 120, share: { A: 0.05, B: 0.2, C: 0.3, D: 0.3, D_PLUS: 0.15 } },
];

function shareForTime(tMin: number): Record<Difficulty, number> {
  const a = SHARE_ANCHORS;
  if (tMin <= a[0].t) return { ...a[0].share };
  if (tMin >= a[a.length - 1].t) return { ...a[a.length - 1].share };
  let lo = a[0];
  let hi = a[a.length - 1];
  for (let i = 0; i < a.length - 1; i++) {
    if (tMin >= a[i].t && tMin <= a[i + 1].t) {
      lo = a[i];
      hi = a[i + 1];
      break;
    }
  }
  const f = (tMin - lo.t) / (hi.t - lo.t);
  const out = {} as Record<Difficulty, number>;
  for (const d of DIFFICULTY_ORDER) {
    out[d] = lo.share[d] + f * (hi.share[d] - lo.share[d]);
  }
  return out;
}

export interface ExamPlan {
  /** 難易度ごとの出題数。 */
  perDifficulty: Record<Difficulty, number>;
  totalCount: number;
  /** 想定所要時間（分）。 */
  estimatedMin: number;
  /** 在庫・時間の制約で実行可能か。 */
  feasible: boolean;
  note?: string;
}

/**
 * 制限時間から難易度配分を逆算する純関数（乱数を使わない）。
 * allowedDifficulties で許可された難度のみ配分し、tags で在庫を絞る。
 */
export function buildExamPlan(
  timeLimitSec: number,
  allowedDifficulties: Difficulty[],
  tags: string[],
): ExamPlan {
  const T = timeLimitSec / 60;

  // 在庫（選択タグ × 許可難度に合致する問題数）を難度別に集計
  const pool = PROBLEMS.filter(
    (p) =>
      allowedDifficulties.includes(p.difficulty) &&
      !p.isMockOnly && // 在庫見積りは通常問題ベース（初見は強制ブレンドで 1 問だけ足す）
      (tags.length === 0 || (p.tags ?? []).some((t) => tags.includes(t))),
  );
  const stock = {} as Record<Difficulty, number>;
  for (const d of DIFFICULTY_ORDER) {
    stock[d] = pool.filter((p) => p.difficulty === d).length;
  }

  // 許可難度のみ残して share を再正規化
  const rawShare = shareForTime(T);
  let sum = 0;
  for (const d of allowedDifficulties) sum += rawShare[d];
  const share = {} as Record<Difficulty, number>;
  for (const d of DIFFICULTY_ORDER) {
    share[d] =
      allowedDifficulties.includes(d) && sum > 0 ? rawShare[d] / sum : 0;
  }
  // 許可難度の share 合計が 0（例: 短時間で C/D のみ許可）→ 均等割りにフォールバック
  if (sum === 0 && allowedDifficulties.length > 0) {
    for (const d of allowedDifficulties) share[d] = 1 / allowedDifficulties.length;
  }

  // 目標問題数 = 予算 / コスト（在庫で頭打ち）
  const n = {} as Record<Difficulty, number>;
  for (const d of DIFFICULTY_ORDER) {
    const budget = T * share[d];
    n[d] = Math.max(0, Math.min(stock[d], Math.round(budget / DIFFICULTY_COST_MIN[d])));
  }

  const est = () =>
    DIFFICULTY_ORDER.reduce((s, d) => s + n[d] * DIFFICULTY_COST_MIN[d], 0);

  // 端数調整①：推定が T の 95% に満たなければ、残時間に収まる最高難度を追加
  let guard = 0;
  while (est() < T * 0.95 && guard++ < 500) {
    const remain = T - est();
    const cand = [...DIFFICULTY_ORDER]
      .reverse()
      .find(
        (d) =>
          share[d] > 0 &&
          n[d] < stock[d] &&
          DIFFICULTY_COST_MIN[d] <= remain,
      );
    if (!cand) break;
    n[cand]++;
  }
  // 端数調整②：T を超過していれば、最高コストの難度から削る
  guard = 0;
  while (est() > T && guard++ < 500) {
    const cand = [...DIFFICULTY_ORDER].reverse().find((d) => n[d] > 0);
    if (!cand) break;
    n[cand]--;
  }

  const total = DIFFICULTY_ORDER.reduce((s, d) => s + n[d], 0);
  const totalStock = DIFFICULTY_ORDER.reduce((s, d) => s + stock[d], 0);

  let feasible = true;
  let note: string | undefined;
  if (totalStock === 0) {
    feasible = false;
    note = "選択した範囲・難易度に該当する問題がありません。";
  } else if (total === 0) {
    feasible = false;
    const minCost = Math.min(
      ...allowedDifficulties.map((d) => DIFFICULTY_COST_MIN[d]),
    );
    note = `この時間（約${Math.round(T)}分）では1問も組めません。最低でも約${minCost}分必要です。`;
  }

  return {
    perDifficulty: n,
    totalCount: total,
    estimatedMin: Math.round(est()),
    feasible,
    note,
  };
}

/** 算出済みプランに従い、難度別バケットからランダム抽出して模試を生成する。 */
export function generateExamByPlan(plan: ExamPlan, tags: string[]): Problem[] {
  const out: Problem[] = [];
  for (const d of DIFFICULTY_ORDER) {
    const need = plan.perDifficulty[d];
    if (need <= 0) continue;
    const bucket = PROBLEMS.filter(
      (p) =>
        p.difficulty === d &&
        !p.isMockOnly && // 初見は通常抽出から除外し、下の強制ブレンドでのみ 1 問入れる
        (tags.length === 0 || (p.tags ?? []).some((t) => tags.includes(t))),
    );
    for (let i = bucket.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
    }
    out.push(...bucket.slice(0, need));
  }

  // 初見殺しの強制ブレンド：C 以上の出題があるのに初見問題が 1 問も入って
  // いなければ、その難度帯の通常枠を 1 つ初見問題に置換する（総数・配分は不変）。
  forceBlendMockOnly(out, tags);

  // 難度の昇順に並べて、模試らしい構成にする
  return out.sort(
    (a, b) =>
      DIFFICULTY_ORDER.indexOf(a.difficulty) -
      DIFFICULTY_ORDER.indexOf(b.difficulty),
  );
}

const HARD_DIFFICULTIES: Difficulty[] = ["D_PLUS", "D", "C"];

/** out に初見問題が無ければ、C 以上の通常枠 1 つを初見問題に差し替える（in-place）。 */
function forceBlendMockOnly(out: Problem[], tags: string[]): void {
  if (out.some((p) => p.isMockOnly)) return; // 既に入っていれば何もしない
  for (const d of HARD_DIFFICULTIES) {
    const slotIndex = out.findIndex((p) => p.difficulty === d && !p.isMockOnly);
    if (slotIndex === -1) continue; // この難度の出題が無い
    const candidates = PROBLEMS.filter(
      (p) =>
        p.isMockOnly &&
        p.difficulty === d &&
        (tags.length === 0 || (p.tags ?? []).some((t) => tags.includes(t))) &&
        !out.some((o) => o.slug === p.slug),
    );
    if (candidates.length === 0) continue; // この難度に初見候補が無い
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    out[slotIndex] = pick;
    return; // 1 問ブレンドしたら終了
  }
}

/** 誤答した問題のタグを集計し、頻度の高い順に返す（弱点）。 */
export function computeWeakTags(wrong: Problem[]): string[] {
  const freq = new Map<string, number>();
  for (const p of wrong) {
    for (const t of p.tags ?? []) freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  return Array.from(freq.entries())
    .sort((x, y) => y[1] - x[1])
    .map(([t]) => t);
}

/** 弱点タグに対応する補強授業を返す。 */
export function lessonsForWeakTags(weakTags: string[]): Lesson[] {
  if (weakTags.length === 0) return [];
  const seen = new Set<string>();
  const out: Lesson[] = [];
  for (const tag of weakTags) {
    for (const l of LESSONS) {
      if ((l.tags ?? []).includes(tag) && !seen.has(l.slug)) {
        seen.add(l.slug);
        out.push(l);
      }
    }
  }
  return out;
}

// ---- 匿名セッション ----
const SESSION_KEY = "cyber-math:session-id";

export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// ---- ローカル履歴 ----
const HISTORY_KEY = "cyber-math:exam-history:v1";

export interface StoredAttempt extends ExamResult {
  id: string;
  createdAt: string;
  config: ExamConfig;
}

/** 現在時刻 (ms)。コンポーネント側の純粋性チェックを避けるための間接化。 */
export function nowMs(): number {
  return Date.now();
}

// 履歴の変更を同一タブ内に通知するカスタムイベント（storage イベントは別タブのみ発火）。
const HISTORY_EVENT = "cyber-math:history-changed";

export function saveAttemptLocal(
  att: Omit<StoredAttempt, "id" | "createdAt"> & { config: ExamConfig },
): void {
  if (typeof window === "undefined") return;
  const full: StoredAttempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...att,
  };
  const list = readAttemptsLocal();
  list.unshift(full);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 30)));
  window.dispatchEvent(new Event(HISTORY_EVENT));
}

export function readAttemptsLocal(): StoredAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function clearAttemptsLocal(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(HISTORY_KEY);
  window.dispatchEvent(new Event(HISTORY_EVENT));
}

// ---- useSyncExternalStore 用（履歴ダッシュボード）----
// getSnapshot は raw 文字列が変わらない限り同じ参照を返す（無限再描画を防ぐ）。
const EMPTY_ATTEMPTS: StoredAttempt[] = [];
let attemptsCache: StoredAttempt[] = EMPTY_ATTEMPTS;
let attemptsCacheRaw: string | null = null;

export function getAttemptsSnapshot(): StoredAttempt[] {
  if (typeof window === "undefined") return EMPTY_ATTEMPTS;
  const raw = window.localStorage.getItem(HISTORY_KEY) ?? "[]";
  if (raw !== attemptsCacheRaw) {
    attemptsCacheRaw = raw;
    try {
      attemptsCache = JSON.parse(raw);
    } catch {
      attemptsCache = EMPTY_ATTEMPTS;
    }
  }
  return attemptsCache;
}

export function getAttemptsServerSnapshot(): StoredAttempt[] {
  return EMPTY_ATTEMPTS;
}

export function subscribeAttempts(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(HISTORY_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(HISTORY_EVENT, callback);
  };
}
