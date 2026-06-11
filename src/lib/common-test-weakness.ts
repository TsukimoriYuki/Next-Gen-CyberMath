// ── 共通テスト Weakness Boss — ルールベース弱点分析 ──────────────────────
// AIを使わず、localStorage履歴・目標点から「今つぶすべき弱点」を特定する。
// DB・Prismaは参照しない。副作用なし（純粋関数）。

import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import type { CommonTestSubjectId } from "@/data/common-test";
import type { CommonTestDrillHistoryItem } from "@/lib/common-test-history";
import type { CommonTestExamHistoryItem } from "@/lib/common-test-exam-history";
import type { CommonTestTargetScores } from "@/lib/common-test-targets";

// ── 公開型 ────────────────────────────────────────────────────────────────

export type CommonTestWeaknessSeverity = "critical" | "high" | "medium" | "low";

export type CommonTestWeaknessStatus =
  | "new"
  | "training"
  | "improving"
  | "almost-mastered"
  | "mastered";

export type CommonTestWeaknessSource =
  | "exam"
  | "drill"
  | "time"
  | "tag"
  | "target-gap";

export type CommonTestWeaknessItem = {
  id: string;
  title: string;
  description: string;
  subjectId: CommonTestSubjectId;
  sectionId?: string;
  skillTags: string[];
  severity: CommonTestWeaknessSeverity;
  status: CommonTestWeaknessStatus;
  sources: CommonTestWeaknessSource[];
  scoreRate?: number;
  timeOverSec?: number;
  wrongCount?: number;
  evidence: string[];
  nextActionTitle: string;
  nextActionHref: string;
  estimatedMinutes: number;
  masteryCondition: string;
};

export type CommonTestWeaknessReport = {
  generatedAt: string;
  summary: string;
  items: CommonTestWeaknessItem[];
  topSubjectId?: CommonTestSubjectId;
  totalCritical: number;
  totalHigh: number;
};

export interface WeaknessReportInput {
  examHistory: CommonTestExamHistoryItem[];
  drillHistory: CommonTestDrillHistoryItem[];
  targetScores: CommonTestTargetScores;
}

// ── 内部定数 ─────────────────────────────────────────────────────────────

const SUBJECT_LABELS: Record<CommonTestSubjectId, string> = {
  "math-1a": "数学IA",
  "math-2bc": "数学II・B・C",
  "english-reading": "英語R",
};

const ALL_SUBJECTS: CommonTestSubjectId[] = [
  "math-1a",
  "math-2bc",
  "english-reading",
];

const SEVERITY_ORDER: Record<CommonTestWeaknessSeverity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

/**
 * 弱点タグ → (subjectId, sectionId) マッピング
 * 無効な href や空 href を生成しないよう、実在するルートのみ列挙する。
 */
const TAG_TO_SECTION: Record<
  string,
  { subjectId: CommonTestSubjectId; sectionId: string }
> = {
  // 数学IA
  因数分解:     { subjectId: "math-1a", sectionId: "section-1" },
  絶対値:       { subjectId: "math-1a", sectionId: "section-1" },
  命題:         { subjectId: "math-1a", sectionId: "section-1" },
  正弦余弦定理: { subjectId: "math-1a", sectionId: "section-1" },
  三角比:       { subjectId: "math-1a", sectionId: "section-1" },
  条件整理:     { subjectId: "math-1a", sectionId: "section-1" },
  データ読み取り: { subjectId: "math-1a", sectionId: "section-2" },
  二次関数:     { subjectId: "math-1a", sectionId: "section-2" },
  相関係数:     { subjectId: "math-1a", sectionId: "section-2" },
  四分位数:     { subjectId: "math-1a", sectionId: "section-2" },
  図表読解:     { subjectId: "math-1a", sectionId: "section-2" },
  図形:         { subjectId: "math-1a", sectionId: "section-3" },
  円:           { subjectId: "math-1a", sectionId: "section-3" },
  メネラウス:   { subjectId: "math-1a", sectionId: "section-3" },
  場合の数:     { subjectId: "math-1a", sectionId: "section-4" },
  確率:         { subjectId: "math-1a", sectionId: "section-4" },
  条件付き確率: { subjectId: "math-1a", sectionId: "section-4" },
  期待値:       { subjectId: "math-1a", sectionId: "section-4" },
  // 数学II・B・C
  図形と方程式:   { subjectId: "math-2bc", sectionId: "section-1" },
  三角関数:       { subjectId: "math-2bc", sectionId: "section-1" },
  加法定理:       { subjectId: "math-2bc", sectionId: "section-1" },
  指数:           { subjectId: "math-2bc", sectionId: "section-2" },
  対数:           { subjectId: "math-2bc", sectionId: "section-2" },
  微分:           { subjectId: "math-2bc", sectionId: "section-2" },
  積分:           { subjectId: "math-2bc", sectionId: "section-2" },
  数式変形:       { subjectId: "math-2bc", sectionId: "section-2" },
  数列:           { subjectId: "math-2bc", sectionId: "section-3" },
  漸化式:         { subjectId: "math-2bc", sectionId: "section-3" },
  誘導読解:       { subjectId: "math-2bc", sectionId: "section-3" },
  計算処理:       { subjectId: "math-2bc", sectionId: "section-3" },
  統計的推測:     { subjectId: "math-2bc", sectionId: "section-4" },
  正規分布:       { subjectId: "math-2bc", sectionId: "section-4" },
  仮説検定:       { subjectId: "math-2bc", sectionId: "section-4" },
  ベクトル:       { subjectId: "math-2bc", sectionId: "section-5" },
  内積:           { subjectId: "math-2bc", sectionId: "section-5" },
  空間ベクトル:   { subjectId: "math-2bc", sectionId: "section-5" },
  // 英語R
  掲示板:         { subjectId: "english-reading", sectionId: "section-1" },
  案内文:         { subjectId: "english-reading", sectionId: "section-1" },
  会話文:         { subjectId: "english-reading", sectionId: "section-2" },
  SNS:            { subjectId: "english-reading", sectionId: "section-2" },
  記事読解:       { subjectId: "english-reading", sectionId: "section-3" },
  要旨把握:       { subjectId: "english-reading", sectionId: "section-3" },
  資料読み取り:   { subjectId: "english-reading", sectionId: "section-4" },
  グラフ:         { subjectId: "english-reading", sectionId: "section-4" },
  情報照合:       { subjectId: "english-reading", sectionId: "section-5" },
  英語スキャニング: { subjectId: "english-reading", sectionId: "section-5" },
  スキャニング:   { subjectId: "english-reading", sectionId: "section-5" },
  選択肢消去:     { subjectId: "english-reading", sectionId: "section-5" },
  物語:           { subjectId: "english-reading", sectionId: "section-6" },
  時系列整理:     { subjectId: "english-reading", sectionId: "section-6" },
  推論:           { subjectId: "english-reading", sectionId: "section-7" },
  論説文:         { subjectId: "english-reading", sectionId: "section-7" },
  レポート完成:   { subjectId: "english-reading", sectionId: "section-8" },
  複数資料統合:   { subjectId: "english-reading", sectionId: "section-8" },
};

// ── ユーティリティ ────────────────────────────────────────────────────────

function isCommonTestSubjectId(id: string): id is CommonTestSubjectId {
  return id === "math-1a" || id === "math-2bc" || id === "english-reading";
}

function getSectionMeta(subjectId: CommonTestSubjectId, sectionId: string) {
  return (
    COMMON_TEST_SUBJECTS_MAP[subjectId]?.sections.find(
      (s) => `section-${s.number}` === sectionId
    ) ?? null
  );
}

function getLatestExam(
  history: CommonTestExamHistoryItem[],
  subjectId: string
): CommonTestExamHistoryItem | null {
  return (
    history
      .filter((h) => h.subjectId === subjectId)
      .sort((a, b) => {
        const bt = Date.parse(b.finishedAt || b.startedAt);
        const at = Date.parse(a.finishedAt || a.startedAt);
        return (isFinite(bt) ? bt : 0) - (isFinite(at) ? at : 0);
      })[0] ?? null
  );
}

function topTags(tags: string[], n: number): string[] {
  const freq = new Map<string, number>();
  for (const t of tags) freq.set(t, (freq.get(t) ?? 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([t]) => t);
}

// ── severity / status 判定 ────────────────────────────────────────────────

function computeSeverity(
  avgAcc: number,
  hasTimePressure: boolean,
  sessions: number,
  accHistory: number[]
): CommonTestWeaknessSeverity {
  let score = 0;

  if (avgAcc < 0.3) score += 4;
  else if (avgAcc < 0.5) score += 3;
  else if (avgAcc < 0.65) score += 2;
  else if (avgAcc < 0.8) score += 1;

  if (hasTimePressure) score += 1;

  // 複数セッションで改善なし
  if (sessions >= 3 && avgAcc < 0.7) score += 1;

  // 直近で悪化傾向
  if (accHistory.length >= 2) {
    const last = accHistory[accHistory.length - 1]!;
    const prev = accHistory[accHistory.length - 2]!;
    if (last < prev - 0.05) score += 1;
  }

  if (score >= 5) return "critical";
  if (score >= 3) return "high";
  if (score >= 1) return "medium";
  return "low";
}

function computeStatus(
  sessions: number,
  accHistory: number[]
): CommonTestWeaknessStatus {
  if (sessions <= 1) return "new";

  const avg = accHistory.reduce((s, a) => s + a, 0) / accHistory.length;
  if (avg >= 0.85) return "almost-mastered";

  if (accHistory.length >= 2) {
    const half = Math.floor(accHistory.length / 2);
    const oldAvg = accHistory.slice(0, half).reduce((s, a) => s + a, 0) / half;
    const newAvg =
      accHistory.slice(half).reduce((s, a) => s + a, 0) /
      (accHistory.length - half);
    if (newAvg >= oldAvg + 0.08) return "improving";
  }

  return "training";
}

// ── evidence / description 生成 ──────────────────────────────────────────

interface CandidateData {
  subjectId: CommonTestSubjectId;
  sectionId: string;
  sectionTitle?: string;
  accHistory: number[];
  timeOverSec: number;
  sources: Set<CommonTestWeaknessSource>;
  weakTags: string[];
  sessions: number;
  wrongCount: number;
  isTargetGap: boolean;
  targetGapPts?: number;
}

function buildEvidence(c: CandidateData, avgAcc: number): string[] {
  const ev: string[] = [];

  // スコア根拠
  if (c.accHistory.length > 0) {
    const pct = Math.round(avgAcc * 100);
    const src =
      c.sources.has("exam") && c.sources.has("drill")
        ? "演習"
        : c.sources.has("exam")
        ? "本番演習"
        : "ドリル";
    const times =
      c.sessions > 1 ? `直近 ${c.sessions} 回の${src}` : `直近の${src}`;
    ev.push(`${times}で平均正答率 ${pct}%`);
  }

  // 時間超過根拠
  if (c.sources.has("time")) {
    if (c.timeOverSec > 0) {
      const overMin = Math.round(c.timeOverSec / 60);
      ev.push(
        overMin >= 1
          ? `推奨時間を合計 ${overMin} 分超過`
          : "時間内に解ききれない問題が含まれています"
      );
    } else {
      ev.push("本番演習で時間内スコアが大きく下がっています");
    }
  }

  // 弱点タグ根拠
  if (c.weakTags.length > 0) {
    const tags = topTags(c.weakTags, 3).join("・");
    ev.push(`頻出弱点タグ：${tags}`);
  }

  // 目標差根拠
  if (c.isTargetGap && c.targetGapPts != null && c.targetGapPts >= 10) {
    ev.push(`目標点まで約 ${Math.round(c.targetGapPts)} 点差があります`);
  }

  return ev.slice(0, 3);
}

function buildDescription(c: CandidateData, avgAcc: number): string {
  const parts: string[] = [];

  if (c.accHistory.length > 0) {
    const pct = Math.round(avgAcc * 100);
    parts.push(`直近の演習で正答率 ${pct}%`);
  }

  if (c.sources.has("time")) {
    parts.push("推奨時間を超過");
  }

  if (c.isTargetGap) {
    parts.push("目標点との差が大きい");
  }

  if (parts.length === 0) return "弱点として検出されています。";
  return parts.join("・") + "。繰り返し演習で定着させましょう。";
}

function buildMasteryCondition(
  meta: ReturnType<typeof getSectionMeta>,
  avgAcc: number
): string {
  if (!meta) return "関連ドリルで推奨時間内に正答率 80% 以上を達成する。";

  const targetAcc = avgAcc < 0.5 ? 70 : 80;
  const timeStr =
    meta.recommendedMinutes != null
      ? `${meta.recommendedMinutes} 分以内に`
      : "推奨時間内に";
  return `${timeStr}正答率 ${targetAcc}% 以上を 2 回連続で達成する。`;
}

// ── メイン：候補 Map 構築 ─────────────────────────────────────────────────

function buildCandidateMap(
  input: WeaknessReportInput
): Map<string, CandidateData> {
  const map = new Map<string, CandidateData>();

  function getOrCreate(
    subjectId: CommonTestSubjectId,
    sectionId: string,
    sectionTitle?: string
  ): CandidateData {
    const key = `${subjectId}/${sectionId}`;
    let c = map.get(key);
    if (!c) {
      c = {
        subjectId,
        sectionId,
        sectionTitle,
        accHistory: [],
        timeOverSec: 0,
        sources: new Set(),
        weakTags: [],
        sessions: 0,
        wrongCount: 0,
        isTargetGap: false,
      };
      map.set(key, c);
    }
    if (sectionTitle && !c.sectionTitle) c.sectionTitle = sectionTitle;
    return c;
  }

  // ── 本番演習履歴 ───────────────────────────────────────────────────────
  for (const exam of input.examHistory) {
    if (!isCommonTestSubjectId(exam.subjectId)) continue;
    const subjectId = exam.subjectId;

    for (const sr of exam.sectionResults) {
      if (!sr.sectionId) continue;
      const c = getOrCreate(subjectId, sr.sectionId, sr.sectionTitle);
      const acc =
        sr.totalQuestions > 0 ? sr.correctCount / sr.totalQuestions : 0;
      c.accHistory.push(acc);
      c.sessions++;
      c.sources.add("exam");
      c.wrongCount += sr.totalQuestions - sr.correctCount;

      // 時間内スコアとの差
      const earned = sr.earnedScore ?? sr.correctCount;
      const tlEarned =
        sr.timeLimitEarnedScore ?? sr.timeLimitCorrectCount ?? earned;
      if (earned > tlEarned) {
        c.sources.add("time");
        // rough: assume 1 point difference ≈ ~60s of lost time
        c.timeOverSec += (earned - tlEarned) * 60;
      }
    }

    // 演習全体の弱点タグをタグマップ経由でセクションに割り当て
    for (const tag of exam.weakSkillTags) {
      const mapping = TAG_TO_SECTION[tag];
      if (mapping && mapping.subjectId === subjectId) {
        const c = getOrCreate(subjectId, mapping.sectionId);
        c.weakTags.push(tag);
        c.sources.add("tag");
      }
    }

    // 回答レコードから sectionId ベースで弱点タグを収集
    for (const ans of exam.answers) {
      if (!ans.isCorrect && ans.sectionId) {
        const c = getOrCreate(subjectId, ans.sectionId);
        c.weakTags.push(...ans.skillTags);
        if (ans.skillTags.length > 0) c.sources.add("tag");
      }
    }
  }

  // ── 大問別ドリル履歴 ────────────────────────────────────────────────────
  for (const drill of input.drillHistory) {
    if (!isCommonTestSubjectId(drill.subjectId)) continue;
    const subjectId = drill.subjectId;

    const c = getOrCreate(subjectId, drill.sectionId);
    const acc =
      drill.totalQuestions > 0 ? drill.correctCount / drill.totalQuestions : 0;
    c.accHistory.push(acc);
    c.sessions++;
    c.sources.add("drill");
    c.wrongCount += drill.totalQuestions - drill.correctCount;

    // 時間超過
    if (
      drill.overTimeQuestionIds.length > 0 ||
      drill.totalTimeSec > drill.estimatedTotalTimeSec
    ) {
      c.sources.add("time");
      c.timeOverSec += Math.max(
        0,
        drill.totalTimeSec - drill.estimatedTotalTimeSec
      );
    }

    // 弱点タグ
    if (drill.weakSkillTags.length > 0) {
      c.weakTags.push(...drill.weakSkillTags);
      c.sources.add("tag");
    }
  }

  // ── 目標点との差 ────────────────────────────────────────────────────────
  for (const subjectId of ALL_SUBJECTS) {
    const latest = getLatestExam(input.examHistory, subjectId);
    if (!latest) continue;
    const target =
      input.targetScores[subjectId] ??
      COMMON_TEST_SUBJECTS_MAP[subjectId].targetScoreDefault;
    const current = latest.timeLimitScore ?? latest.timeLimitScorePct ?? 0;
    const gap = target - current;
    if (gap < 10) continue;

    for (const [key, c] of map.entries()) {
      if (key.startsWith(`${subjectId}/`)) {
        c.isTargetGap = true;
        c.targetGapPts = gap;
        c.sources.add("target-gap");
      }
    }
  }

  return map;
}

// ── Weakness Item リスト生成 ──────────────────────────────────────────────

function buildWeaknessItems(
  input: WeaknessReportInput
): CommonTestWeaknessItem[] {
  const candidateMap = buildCandidateMap(input);
  const items: CommonTestWeaknessItem[] = [];

  for (const [, c] of candidateMap.entries()) {
    if (c.accHistory.length === 0) continue;

    const avgAcc =
      c.accHistory.reduce((s, a) => s + a, 0) / c.accHistory.length;

    // 弱点として扱わない条件：精度が高く、時間問題もなく、目標差もない
    if (avgAcc >= 0.85 && !c.sources.has("time") && !c.isTargetGap) continue;

    const hasTimePressure = c.sources.has("time");
    const severity = computeSeverity(
      avgAcc,
      hasTimePressure,
      c.sessions,
      c.accHistory
    );
    const status = computeStatus(c.sessions, c.accHistory);
    const meta = getSectionMeta(c.subjectId, c.sectionId);
    const sectionTitle = c.sectionTitle ?? meta?.title ?? c.sectionId;
    const subjectLabel = SUBJECT_LABELS[c.subjectId];
    const tags = topTags(c.weakTags, 3);

    items.push({
      id: `${c.subjectId}/${c.sectionId}`,
      title: `${subjectLabel} ${sectionTitle}`,
      description: buildDescription(c, avgAcc),
      subjectId: c.subjectId,
      sectionId: c.sectionId,
      skillTags: tags,
      severity,
      status,
      sources: [...c.sources] as CommonTestWeaknessSource[],
      scoreRate: Math.round(avgAcc * 100),
      timeOverSec: c.timeOverSec > 0 ? c.timeOverSec : undefined,
      wrongCount: c.wrongCount,
      evidence: buildEvidence(c, avgAcc),
      nextActionTitle: `${sectionTitle}を演習する`,
      nextActionHref: `/common-test/${c.subjectId}/${c.sectionId}`,
      estimatedMinutes: meta?.recommendedMinutes ?? 12,
      masteryCondition: buildMasteryCondition(meta, avgAcc),
    });
  }

  // severity 順にソート
  items.sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
  );

  return items;
}

// ── タグ起点の弱点補完 ────────────────────────────────────────────────────
// ドリル履歴に無い大問でも、タグマッピングで弱点候補を作る

function buildTagOnlyItems(
  input: WeaknessReportInput,
  existingIds: Set<string>
): CommonTestWeaknessItem[] {
  const tagFreq = new Map<
    string,
    { subjectId: CommonTestSubjectId; sectionId: string; count: number }
  >();

  // ドリル履歴の弱点タグを集計
  for (const drill of input.drillHistory) {
    for (const tag of drill.weakSkillTags) {
      const mapping = TAG_TO_SECTION[tag];
      if (!mapping) continue;
      const key = `${mapping.subjectId}/${mapping.sectionId}`;
      const cur = tagFreq.get(key);
      if (cur) cur.count++;
      else
        tagFreq.set(key, {
          subjectId: mapping.subjectId,
          sectionId: mapping.sectionId,
          count: 1,
        });
    }
  }

  const extras: CommonTestWeaknessItem[] = [];

  for (const [key, { subjectId, sectionId, count }] of tagFreq.entries()) {
    if (existingIds.has(key)) continue;
    if (count < 2) continue; // 2回以上検出されたタグのみ

    const meta = getSectionMeta(subjectId, sectionId);
    const sectionTitle = meta?.title ?? sectionId;
    const subjectLabel = SUBJECT_LABELS[subjectId];

    extras.push({
      id: key,
      title: `${subjectLabel} ${sectionTitle}`,
      description: `弱点タグが ${count} 回検出されています。重点演習を推奨します。`,
      subjectId,
      sectionId,
      skillTags: [],
      severity: count >= 4 ? "high" : "medium",
      status: "new",
      sources: ["tag"],
      wrongCount: count,
      evidence: [`弱点タグが ${count} 回以上検出されました`],
      nextActionTitle: `${sectionTitle}を演習する`,
      nextActionHref: `/common-test/${subjectId}/${sectionId}`,
      estimatedMinutes: meta?.recommendedMinutes ?? 12,
      masteryCondition: buildMasteryCondition(meta, 0.5),
    });
  }

  return extras;
}

// ── サマリー文生成 ────────────────────────────────────────────────────────

function generateSummary(
  items: CommonTestWeaknessItem[],
  input: WeaknessReportInput
): string {
  const hasHistory =
    input.examHistory.length > 0 || input.drillHistory.length > 0;

  if (!hasHistory) {
    return "まだ十分な演習履歴がありません。本番演習を1回受けるか、大問別ドリルを3つ解くと弱点を自動判定できます。";
  }

  const criticalCount = items.filter((i) => i.severity === "critical").length;
  const highCount = items.filter((i) => i.severity === "high").length;

  if (items.length === 0) {
    return "検出された弱点はありません。本番演習や大問別ドリルを続けて実力を伸ばしましょう。";
  }

  if (criticalCount > 0) {
    const top = items.find((i) => i.severity === "critical");
    return `重大な弱点が ${criticalCount} 件あります。まず「${top?.title ?? ""}」から取り組むことを推奨します。`;
  }

  if (highCount > 0) {
    return `要注意の弱点が ${highCount} 件あります。優先的に演習して得点を固めましょう。`;
  }

  return `弱点候補が ${items.length} 件あります。一つずつ克服していきましょう。`;
}

// ── メイン関数 ────────────────────────────────────────────────────────────

export function buildCommonTestWeaknessReport(
  input: WeaknessReportInput
): CommonTestWeaknessReport {
  const hasHistory =
    input.examHistory.length > 0 || input.drillHistory.length > 0;

  if (!hasHistory) {
    return {
      generatedAt: new Date().toISOString(),
      summary:
        "まだ十分な演習履歴がありません。本番演習を1回受けるか、大問別ドリルを3つ解くと弱点を自動判定できます。",
      items: [],
      totalCritical: 0,
      totalHigh: 0,
    };
  }

  const items = buildWeaknessItems(input);
  const existingIds = new Set(items.map((i) => i.id));

  // タグ起点の補完
  const tagExtras = buildTagOnlyItems(input, existingIds);
  const allItems = [...items, ...tagExtras].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
  );

  const totalCritical = allItems.filter((i) => i.severity === "critical").length;
  const totalHigh = allItems.filter((i) => i.severity === "high").length;

  // 弱点が多い科目を特定
  const subjectCount = new Map<CommonTestSubjectId, number>();
  for (const item of allItems) {
    if (item.severity === "critical" || item.severity === "high") {
      subjectCount.set(
        item.subjectId,
        (subjectCount.get(item.subjectId) ?? 0) + 1
      );
    }
  }
  const topSubjectId =
    subjectCount.size > 0
      ? ([...subjectCount.entries()].sort((a, b) => b[1] - a[1])[0]![0] as CommonTestSubjectId)
      : undefined;

  return {
    generatedAt: new Date().toISOString(),
    summary: generateSummary(allItems, input),
    items: allItems,
    topSubjectId,
    totalCritical,
    totalHigh,
  };
}
