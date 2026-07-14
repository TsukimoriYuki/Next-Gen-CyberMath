// ── 共通テスト Daily Playlist — ルールベース生成 ──────────────────────────
// AIを使わず、localStorage履歴・目標点・復習キューからタスクを組み立てる。
// DB・Prismaは参照しない。副作用は localStorage の mode 保存のみ。

import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import type { CommonTestSubjectId } from "@/data/common-test";
import type { CommonTestDrillHistoryItem } from "@/lib/common-test-history";
import type { CommonTestExamHistoryItem } from "@/lib/common-test-exam-history";
import type { CommonTestTargetScores } from "@/lib/common-test-targets";
import { getJstCalendarDate } from "@/lib/jst-calendar-date";

// ── 公開型 ────────────────────────────────────────────────────────────────

export type CommonTestDailyPlanMode = "short" | "standard" | "intensive";

export type CommonTestDailyTaskType =
  | "review"
  | "drill"
  | "exam"
  | "analysis"
  | "mark-sheet"
  | "target";

export type CommonTestDailyTask = {
  id: string;
  type: CommonTestDailyTaskType;
  title: string;
  description: string;
  subjectId?: CommonTestSubjectId;
  sectionId?: string;
  href: string;
  estimatedMinutes: number;
  priority: "high" | "medium" | "low";
  reason: string;
};

export type CommonTestDailyPlaylist = {
  date: string;
  mode: CommonTestDailyPlanMode;
  totalMinutes: number;
  summary: string;
  tasks: CommonTestDailyTask[];
};

export interface BuildPlaylistInput {
  mode: CommonTestDailyPlanMode;
  drillHistory: CommonTestDrillHistoryItem[];
  examHistory: CommonTestExamHistoryItem[];
  targetScores: CommonTestTargetScores;
  /**
   * null  = 未ログイン（APIが401を返した）
   * 0     = ログイン済み・今日の期限なし
   * N > 0 = 今日期限の復習アイテム N 件
   */
  reviewTodayCount: number | null;
}

// ── localStorage mode 保存 ────────────────────────────────────────────────

const PLAYLIST_MODE_KEY = "cyber-os:common-test-daily-playlist-mode";

export function loadDailyPlaylistMode(): CommonTestDailyPlanMode {
  if (typeof window === "undefined") return "standard";
  try {
    const v = localStorage.getItem(PLAYLIST_MODE_KEY);
    if (v === "short" || v === "standard" || v === "intensive") return v;
  } catch {
    // ignore
  }
  return "standard";
}

export function saveDailyPlaylistMode(mode: CommonTestDailyPlanMode): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PLAYLIST_MODE_KEY, mode);
  } catch {
    // ignore
  }
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

const MODE_LIMITS: Record<
  CommonTestDailyPlanMode,
  { maxMinutes: number; maxTasks: number }
> = {
  short:     { maxMinutes: 35, maxTasks: 3 },
  standard:  { maxMinutes: 65, maxTasks: 4 },
  intensive: { maxMinutes: 95, maxTasks: 5 },
};

// ── ユーティリティ ────────────────────────────────────────────────────────

function getSectionMeta(subjectId: CommonTestSubjectId, sectionId: string) {
  return COMMON_TEST_SUBJECTS_MAP[subjectId]?.sections.find(
    (s) => `section-${s.number}` === sectionId
  ) ?? null;
}

function getLatestExam(
  history: CommonTestExamHistoryItem[],
  subjectId: string
): CommonTestExamHistoryItem | null {
  const items = history
    .filter((h) => h.subjectId === subjectId)
    .sort((a, b) => {
      const bt = Date.parse(b.finishedAt || b.startedAt);
      const at = Date.parse(a.finishedAt || a.startedAt);
      return (isFinite(bt) ? bt : 0) - (isFinite(at) ? at : 0);
    });
  return items[0] ?? null;
}

// ── タスク候補生成 ────────────────────────────────────────────────────────

function buildCandidateTasks(input: BuildPlaylistInput): CommonTestDailyTask[] {
  const { drillHistory, examHistory, targetScores, reviewTodayCount } = input;
  const tasks: CommonTestDailyTask[] = [];
  const hasAnyHistory = drillHistory.length > 0 || examHistory.length > 0;

  // ── 優先度1：復習キュー ──────────────────────────────────────────────
  if (reviewTodayCount === null) {
    // 未ログイン：低優先で案内タスク
    tasks.push({
      id: "login-for-review",
      type: "review",
      title: "ログインして復習キューを有効化",
      description:
        "ログインすると、演習で間違えた問題が復習キューに自動登録されます。",
      href: "/login",
      estimatedMinutes: 2,
      priority: "low",
      reason: "ログインすると復習キューを今日のメニューに反映できます。",
    });
  } else if (reviewTodayCount > 0) {
    tasks.push({
      id: "review-queue",
      type: "review",
      title: `復習キューを確認（${reviewTodayCount}問）`,
      description:
        "今日期限の復習問題を確認します。間隔反復で記憶を定着させます。",
      href: "/common-test/review",
      estimatedMinutes: Math.min(10 + reviewTodayCount, 20),
      priority: "high",
      reason: `今日の復習期限が ${reviewTodayCount} 問あります。先に片付けることで記憶定着を確保できます。`,
    });
  }

  // ── 優先度2：目標点との差が大きい科目の弱点大問 ──────────────────────
  for (const subjectId of ALL_SUBJECTS) {
    const latest = getLatestExam(examHistory, subjectId);
    if (!latest) continue;

    const target =
      targetScores[subjectId] ??
      COMMON_TEST_SUBJECTS_MAP[subjectId].targetScoreDefault;
    const current = latest.timeLimitScore ?? latest.timeLimitScorePct ?? 0;
    const gap = target - current;
    if (gap < 10) continue;

    // 正答率が最も低い大問を選ぶ
    const weakest = [...(latest.sectionResults ?? [])].sort((a, b) => {
      const ar = a.totalQuestions > 0 ? a.correctCount / a.totalQuestions : 1;
      const br = b.totalQuestions > 0 ? b.correctCount / b.totalQuestions : 1;
      return ar - br;
    })[0];
    if (!weakest) continue;

    const meta = getSectionMeta(subjectId, weakest.sectionId);
    const sectionTitle =
      weakest.sectionTitle ?? meta?.title ?? weakest.sectionId;
    const accuracy =
      weakest.totalQuestions > 0
        ? Math.round((weakest.correctCount / weakest.totalQuestions) * 100)
        : 0;

    tasks.push({
      id: `score-gap-${subjectId}`,
      type: "drill",
      title: `${SUBJECT_LABELS[subjectId]} ${sectionTitle}`,
      description: `本番演習で正答率 ${accuracy}% だった大問を重点演習します。`,
      subjectId,
      sectionId: weakest.sectionId,
      href: `/common-test/${subjectId}/${weakest.sectionId}`,
      estimatedMinutes: meta?.recommendedMinutes ?? 12,
      priority: gap >= 20 ? "high" : "medium",
      reason:
        gap >= 20
          ? `目標点まで約 ${Math.round(gap)} 点差があります。まずこの大問を強化することが最短ルートです。`
          : `目標点まで約 ${Math.round(gap)} 点差があります。弱点大問の演習で得点を積み上げましょう。`,
    });
  }

  // ── 優先度3：時間超過が大きい大問 ────────────────────────────────────
  for (const subjectId of ALL_SUBJECTS) {
    const latest = getLatestExam(examHistory, subjectId);
    if (!latest) continue;

    const tl = latest.timeLimitScore ?? latest.timeLimitScorePct;
    const ul = latest.unlimitedScore ?? latest.unlimitedScorePct;
    if (tl == null || ul == null) continue;

    const maxScore = latest.maxScore ?? 100;
    const delta = ul - tl;
    if (delta / maxScore <= 0.12) continue;

    // 時間内スコアとの差が最も大きい大問
    const pressured = [...(latest.sectionResults ?? [])].sort((a, b) => {
      const ag =
        (a.earnedScore ?? a.correctCount) -
        (a.timeLimitEarnedScore ?? a.timeLimitCorrectCount ?? 0);
      const bg =
        (b.earnedScore ?? b.correctCount) -
        (b.timeLimitEarnedScore ?? b.timeLimitCorrectCount ?? 0);
      return bg - ag;
    })[0];
    if (!pressured) continue;

    const taskId = `time-pressure-${subjectId}`;
    // score-gap タスクで同じ大問が既に選ばれている場合はスキップ
    if (
      tasks.some(
        (t) =>
          t.id === taskId ||
          (t.subjectId === subjectId && t.sectionId === pressured.sectionId)
      )
    )
      continue;

    const meta = getSectionMeta(subjectId, pressured.sectionId);
    const sectionTitle =
      pressured.sectionTitle ?? meta?.title ?? pressured.sectionId;

    tasks.push({
      id: taskId,
      type: "drill",
      title: `${SUBJECT_LABELS[subjectId]} ${sectionTitle}（時間制限あり）`,
      description:
        "時間内スコアと無制限スコアの差が大きい大問です。時間を計りながら演習します。",
      subjectId,
      sectionId: pressured.sectionId,
      href: `/common-test/${subjectId}/${pressured.sectionId}`,
      estimatedMinutes: meta?.recommendedMinutes ?? 12,
      priority: "medium",
      reason: `時間内スコアと無制限スコアに ${Math.round(delta)} 点の差があります。この大問を時間を区切って演習することで処理速度を改善できます。`,
    });
  }

  // ── 優先度4：弱点タグが多い大問（ドリル履歴から）────────────────────
  if (drillHistory.length > 0) {
    const recent = drillHistory.slice(0, 10);
    const sectionScore = new Map<
      string,
      { subjectId: string; sectionId: string; score: number }
    >();

    for (const h of recent) {
      if (!h.weakSkillTags.length) continue;
      const key = `${h.subjectId}/${h.sectionId}`;
      const cur = sectionScore.get(key);
      if (cur) {
        cur.score += h.weakSkillTags.length;
      } else {
        sectionScore.set(key, {
          subjectId: h.subjectId,
          sectionId: h.sectionId,
          score: h.weakSkillTags.length,
        });
      }
    }

    const topWeak = [...sectionScore.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    for (const weak of topWeak) {
      const href = `/common-test/${weak.subjectId}/${weak.sectionId}`;
      if (tasks.some((t) => t.href === href)) continue;

      const subjectId = weak.subjectId as CommonTestSubjectId;
      const meta = getSectionMeta(subjectId, weak.sectionId);
      const sectionTitle = meta?.title ?? weak.sectionId;

      tasks.push({
        id: `weak-tag-${weak.subjectId}-${weak.sectionId}`,
        type: "drill",
        subjectId,
        sectionId: weak.sectionId,
        title: `${SUBJECT_LABELS[subjectId] ?? subjectId} ${sectionTitle}`,
        description: "過去の演習で弱点タグが多く記録されている大問です。",
        href,
        estimatedMinutes: meta?.recommendedMinutes ?? 12,
        priority: "medium",
        reason:
          "この大問で弱点タグが繰り返し検出されています。集中的に演習して定着させましょう。",
      });
    }
  }

  // ── 分析タスク（本番演習履歴がある場合のみ）────────────────────────
  if (examHistory.length > 0 && !tasks.some((t) => t.type === "analysis")) {
    tasks.push({
      id: "ai-analysis",
      type: "analysis",
      title: "AI作戦会議で弱点分析",
      description:
        "本番演習の結果から、時間配分・弱点・次の演習方針をAIが分析します。",
      href: "/common-test/history",
      estimatedMinutes: 5,
      priority: "low",
      reason: "演習結果を分析することで、次の学習方針が明確になります。",
    });
  }

  // ── 優先度5：初回ユーザー or 本番演習未受験 ──────────────────────────
  if (!hasAnyHistory) {
    // 完全初回：ドリルと本番演習の体験タスクを追加
    tasks.push(
      {
        id: "first-math-1a",
        type: "drill",
        subjectId: "math-1a",
        sectionId: "section-1",
        title: "数学IA 第1問を解いてみる",
        description:
          "数と式・図形と計量の基本問題です。まず共通テストの出題形式をつかみましょう。",
        href: "/common-test/math-1a/section-1",
        estimatedMinutes: 10,
        priority: "high",
        reason: "共通テスト形式の問題に慣れるところからスタートします。",
      },
      {
        id: "first-english",
        type: "drill",
        subjectId: "english-reading",
        sectionId: "section-1",
        title: "英語R 第1問を解いてみる",
        description:
          "短文・案内文読解の基本問題です。情報を素早く読み取る練習をします。",
        href: "/common-test/english-reading/section-1",
        estimatedMinutes: 10,
        priority: "high",
        reason:
          "英語リーディングの出題形式を確認し、解答スタイルを身につけます。",
      },
      {
        id: "first-exam",
        type: "exam",
        title: "本番形式演習を1回受ける",
        description:
          "70〜80分の本番形式で全大問を通し実施します。まず現在地を測りましょう。",
        href: "/common-test/simulator",
        estimatedMinutes: 75,
        priority: "medium",
        reason:
          "現時点での実力を本番形式で測ることで、弱点と学習方針が明確になります。",
      }
    );
  } else if (examHistory.length === 0 && drillHistory.length >= 3) {
    // ドリル実績はあるが本番演習未受験
    tasks.push({
      id: "first-exam-suggest",
      type: "exam",
      title: "本番形式演習にチャレンジ",
      description:
        "大問別演習を積んできました。次は本番形式で時間配分の実力を測りましょう。",
      href: "/common-test/simulator",
      estimatedMinutes: 75,
      priority: "medium",
      reason:
        "大問別演習から本番形式へのステップアップで、時間配分の実力を測れます。",
    });
  }

  return tasks;
}

// ── サマリー文生成 ────────────────────────────────────────────────────────

function generateSummary(input: BuildPlaylistInput): string {
  const { drillHistory, examHistory, targetScores, reviewTodayCount } = input;

  if (drillHistory.length === 0 && examHistory.length === 0) {
    return "共通テスト対策をスタートします。まず基本問題で出題形式を確認しましょう。";
  }

  if (reviewTodayCount && reviewTodayCount > 0) {
    return `今日は ${reviewTodayCount} 問の復習期限があります。まず復習を片付けてから演習に進みましょう。`;
  }

  // 目標点との最大ギャップを探す
  let maxGap = 0;
  let maxGapLabel = "";
  for (const subjectId of ALL_SUBJECTS) {
    const latest = getLatestExam(examHistory, subjectId);
    if (!latest) continue;
    const target =
      targetScores[subjectId] ??
      COMMON_TEST_SUBJECTS_MAP[subjectId].targetScoreDefault;
    const current = latest.timeLimitScore ?? latest.timeLimitScorePct ?? 0;
    const gap = target - current;
    if (gap > maxGap) {
      maxGap = gap;
      maxGapLabel = SUBJECT_LABELS[subjectId];
    }
  }
  if (maxGap >= 20 && maxGapLabel) {
    return `${maxGapLabel}の目標点まで約 ${Math.round(maxGap)} 点差があります。まず得点効率の高い大問から優先して演習します。`;
  }

  // 時間超過チェック
  for (const subjectId of ALL_SUBJECTS) {
    const latest = getLatestExam(examHistory, subjectId);
    if (!latest) continue;
    const tl = latest.timeLimitScore ?? latest.timeLimitScorePct;
    const ul = latest.unlimitedScore ?? latest.unlimitedScorePct;
    if (
      tl != null &&
      ul != null &&
      (ul - tl) / (latest.maxScore ?? 100) > 0.12
    ) {
      return "時間内スコアと無制限スコアの差が大きいため、今日は時間を区切った演習を優先します。";
    }
  }

  if (examHistory.length === 0 && drillHistory.length > 0) {
    return "大問別演習の実績があります。今日はさらに弱点大問を演習して実力を固めましょう。";
  }

  return "弱点データをもとに、今日重点的に取り組む大問を選びました。一つずつ取り組みましょう。";
}

// ── メイン：プレイリスト生成 ──────────────────────────────────────────────

export function buildCommonTestDailyPlaylist(
  input: BuildPlaylistInput
): CommonTestDailyPlaylist {
  const candidates = buildCandidateTasks(input);

  // 優先度順にソート
  const ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };
  candidates.sort(
    (a, b) => (ORDER[a.priority] ?? 2) - (ORDER[b.priority] ?? 2)
  );

  const { maxMinutes, maxTasks } = MODE_LIMITS[input.mode];
  const selected: CommonTestDailyTask[] = [];
  let totalMinutes = 0;

  for (const task of candidates) {
    if (selected.length >= maxTasks) break;
    // short モードでは本番演習（70〜80分）はスキップ
    if (input.mode === "short" && task.type === "exam") continue;
    // standard モードではドリルが1件以上あれば本番演習はスキップ
    if (
      input.mode === "standard" &&
      task.type === "exam" &&
      selected.some((t) => t.type === "drill")
    )
      continue;
    // 高優先タスクが既にあればログイン案内はスキップ
    if (
      task.id === "login-for-review" &&
      selected.some((t) => t.priority === "high")
    )
      continue;

    if (totalMinutes + task.estimatedMinutes <= maxMinutes) {
      selected.push(task);
      totalMinutes += task.estimatedMinutes;
    }
  }

  return {
    date: getJstCalendarDate(),
    mode: input.mode,
    totalMinutes,
    summary: generateSummary(input),
    tasks: selected,
  };
}
