import { PROBLEMS, PROBLEMS_BY_SLUG } from "@/data/problems";
import { LESSONS, LESSONS_BY_SLUG } from "@/data/lessons";
import { DOJO_PROBLEMS } from "@/data/dojo";
import {
  UNIT_META,
  UNIT_META_BY_NAME,
  UNIT_META_BY_SLUG,
} from "@/data/units-meta";
import {
  DIFFICULTY_ORDER,
  type Deviation,
  type Difficulty,
  type Lesson,
  type Problem,
  type UnitMeta,
} from "@/lib/types";

// 公開系（単元一覧・タグ検索・トップ等）で見せる問題集合。
// isMockOnly:true の「初見殺し」を除外する。詳細解決(getProblem)と SSG 生成
// (getAllSlugs) はフルの PROBLEMS を使い、模試・履歴復習からの直リンクは生かす。
const PUBLIC_PROBLEMS: Problem[] = PROBLEMS.filter((p) => !p.isMockOnly);

/** 公開カタログ用（初見殺しを除外）。 */
export function getAllProblems(): Problem[] {
  return PUBLIC_PROBLEMS;
}

/** slug 解決はフル（初見問題も模試・復習の直リンクで開ける）。 */
export function getProblem(slug: string): Problem | undefined {
  return PROBLEMS_BY_SLUG[slug];
}

/** SSG 生成はフル（初見問題の /problems/[slug] も静的生成する）。 */
export function getAllSlugs(): string[] {
  return PROBLEMS.map((p) => p.slug);
}

/** Distinct units in first-appearance order（公開分のみ）。 */
export function getUnits(): string[] {
  return Array.from(new Set(PUBLIC_PROBLEMS.map((p) => p.unit)));
}

export function getProblemsByDifficulty(): {
  difficulty: Difficulty;
  problems: Problem[];
}[] {
  return DIFFICULTY_ORDER.map((difficulty) => ({
    difficulty,
    problems: PUBLIC_PROBLEMS.filter((p) => p.difficulty === difficulty),
  })).filter((g) => g.problems.length > 0);
}

export function getProblemsByUnit(): { unit: string; problems: Problem[] }[] {
  return getUnits().map((unit) => ({
    unit,
    problems: PUBLIC_PROBLEMS.filter((p) => p.unit === unit),
  }));
}

// ---- Units (hierarchical /units routing) -------------------------------

/** URL-safe slug for a unit name (registry first, else encoded fallback). */
export function slugForUnit(name: string): string {
  return UNIT_META_BY_NAME[name]?.slug ?? encodeURIComponent(name);
}

/** Resolve a slug back to its unit name. */
export function unitNameForSlug(slug: string): string | undefined {
  const meta = UNIT_META_BY_SLUG[slug];
  if (meta) return meta.name;
  // Fallback: a unit that isn't in the registry but is encoded.
  return getUnits().find((u) => encodeURIComponent(u) === slug);
}

export interface UnitSummary {
  slug: string;
  name: string;
  description: string;
  order: number;
  problemCount: number;
  lessonCount: number;
  /** 含まれる難易度（降順表示用）。 */
  difficulties: Difficulty[];
}

/** All units present in the dataset, enriched for the index page, sorted. */
export function getUnitSummaries(): UnitSummary[] {
  const summaries = getUnits().map((name): UnitSummary => {
    const meta: UnitMeta | undefined = UNIT_META_BY_NAME[name];
    const problems = PUBLIC_PROBLEMS.filter((p) => p.unit === name);
    const difficulties = DIFFICULTY_ORDER.filter((d) =>
      problems.some((p) => p.difficulty === d),
    );
    return {
      slug: slugForUnit(name),
      name,
      description: meta?.description ?? "",
      order: meta?.order ?? 999,
      problemCount: problems.length,
      lessonCount: LESSONS.filter((l) => l.unit === name).length,
      difficulties,
    };
  });
  return summaries.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getUnitSlugs(): string[] {
  // 問題のある単元 ∪ 授業のみの単元（例: 難問対策）。
  const names = new Set<string>([
    ...getUnits(),
    ...LESSONS.map((l) => l.unit),
  ]);
  return Array.from(names).map(slugForUnit);
}

export function getProblemsByUnitSlug(slug: string): {
  name: string;
  description: string;
  problems: Problem[];
} | undefined {
  const name = unitNameForSlug(slug);
  if (!name) return undefined;
  const problems = PUBLIC_PROBLEMS.filter((p) => p.unit === name).slice().sort(
    (a, b) =>
      DIFFICULTY_ORDER.indexOf(a.difficulty) -
      DIFFICULTY_ORDER.indexOf(b.difficulty),
  );
  return {
    name,
    description: UNIT_META_BY_NAME[name]?.description ?? "",
    problems,
  };
}

// ---- Concept Lessons ---------------------------------------------------

export function getAllLessons(): Lesson[] {
  return LESSONS;
}

export function getLesson(slug: string | undefined): Lesson | undefined {
  if (!slug) return undefined;
  return LESSONS_BY_SLUG[slug];
}

export function getAllLessonSlugs(): string[] {
  return LESSONS.map((l) => l.slug);
}

export function getLessonsByUnitName(name: string): Lesson[] {
  return LESSONS.filter((l) => l.unit === name);
}

/** Lessons grouped by unit (registry order) for the lessons index. */
export function getLessonsForIndex(): { unit: string; lessons: Lesson[] }[] {
  const units = Array.from(new Set(LESSONS.map((l) => l.unit)));
  return units
    .map((unit) => ({ unit, lessons: LESSONS.filter((l) => l.unit === unit) }))
    .sort(
      (a, b) =>
        (UNIT_META_BY_NAME[a.unit]?.order ?? 999) -
        (UNIT_META_BY_NAME[b.unit]?.order ?? 999),
    );
}

export { UNIT_META };

// ---- Concept Tags ------------------------------------------------------

export interface TagSummary {
  tag: string;
  problemCount: number;
  lessonCount: number;
  total: number;
}

/** All tags with usage counts, sorted by frequency then name. */
export function getAllTags(): TagSummary[] {
  const counts = new Map<string, { p: number; l: number }>();
  for (const p of PUBLIC_PROBLEMS) {
    for (const t of p.tags ?? []) {
      const c = counts.get(t) ?? { p: 0, l: 0 };
      c.p += 1;
      counts.set(t, c);
    }
  }
  for (const l of LESSONS) {
    for (const t of l.tags ?? []) {
      const c = counts.get(t) ?? { p: 0, l: 0 };
      c.l += 1;
      counts.set(t, c);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, c]) => ({
      tag,
      problemCount: c.p,
      lessonCount: c.l,
      total: c.p + c.l,
    }))
    .sort((a, b) => b.total - a.total || a.tag.localeCompare(b.tag, "ja"));
}

export function getAllTagNames(): string[] {
  return getAllTags().map((t) => t.tag);
}

export function getProblemsByTag(tag: string): Problem[] {
  return PUBLIC_PROBLEMS.filter((p) => (p.tags ?? []).includes(tag));
}

export function getLessonsByTag(tag: string): Lesson[] {
  return LESSONS.filter((l) => (l.tags ?? []).includes(tag));
}

// ---- Daily Triple ------------------------------------------------------
// Deterministic per calendar day: the same 3 problems show all day, then
// rotate. Pure function of the date, so server and client agree.

function dayNumber(date: Date): number {
  // Days since the Unix epoch in the host's local date.
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utc / 86_400_000);
}

export function getDailyTriple(date: Date = new Date()): Problem[] {
  const pool = PUBLIC_PROBLEMS;
  const n = pool.length;
  if (n === 0) return [];
  const seed = dayNumber(date);
  const count = Math.min(3, n);
  const picks: Problem[] = [];
  const used = new Set<number>();
  // Walk with a day-dependent stride that is coprime-ish to n to spread picks.
  let idx = seed % n;
  const stride = 1 + (seed % Math.max(1, n - 1));
  while (picks.length < count) {
    if (!used.has(idx)) {
      used.add(idx);
      picks.push(pool[idx]);
    }
    idx = (idx + stride) % n;
    // Guard against a stride that cycles; fall back to linear scan.
    if (used.size < picks.length + 1 && picks.length < count) {
      for (let k = 0; k < n && picks.length < count; k++) {
        if (!used.has(k)) {
          used.add(k);
          picks.push(pool[k]);
        }
      }
    }
  }
  return picks;
}

// ---- 私からの挑戦（キュレーション）-------------------------------------
// ランダムではなく、手で選んだ良問トリオを出題する。存在しない slug は無視し、
// 3 問に満たなければ今日の3題で補完する。
const CHALLENGE_SLUGS: string[] = [
  "sine-synthesis-amplitude", // B 三角関数：合成
  "cubic-tangent-count", // C 微分法：接線の本数
  "symmetric-integral-king", // D 積分法：対称性
];

export function getChallengeProblems(date: Date = new Date()): Problem[] {
  const picked = CHALLENGE_SLUGS.map((s) => PROBLEMS_BY_SLUG[s]).filter(
    (p): p is Problem => p != null && !p.isMockOnly,
  );
  if (picked.length >= 3) return picked.slice(0, 3);
  // 補完（重複除去）。
  const seen = new Set(picked.map((p) => p.slug));
  for (const p of getDailyTriple(date)) {
    if (picked.length >= 3) break;
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      picked.push(p);
    }
  }
  return picked.slice(0, 3);
}

// ---- 過去問道場 (Dojo) ------------------------------------------------

const DOJO_BY_SLUG: Record<string, Problem> = Object.fromEntries(
  DOJO_PROBLEMS.map((p) => [p.slug, p]),
);

/** 道場全問取得。 */
export function getAllDojoProblems(): Problem[] {
  return DOJO_PROBLEMS;
}

/** 偏差値帯 × 単元（複数）で絞り込み。どちらも省略で全件。 */
export function filterDojoProblems({
  deviationMin = 50,
  deviationMax = 70,
  units = [],
}: {
  deviationMin?: Deviation;
  deviationMax?: Deviation;
  units?: string[];
}): Problem[] {
  return DOJO_PROBLEMS.filter((p) => {
    const dev = p.deviation ?? 60;
    if (dev < deviationMin || dev > deviationMax) return false;
    if (units.length > 0 && !units.includes(p.unit)) return false;
    return true;
  });
}

/** slug から道場問題を取得。 */
export function getDojoProblem(slug: string): Problem | undefined {
  return DOJO_BY_SLUG[slug];
}

/** 道場問題 slug 一覧（SSG 用）。 */
export function getAllDojoSlugs(): string[] {
  return DOJO_PROBLEMS.map((p) => p.slug);
}

export function formatDateJP(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}
