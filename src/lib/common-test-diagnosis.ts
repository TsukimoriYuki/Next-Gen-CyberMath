import {
  COMMON_TEST_MISTAKE_TAGS,
  getCommonTestAnswerMistakeTagIds,
  getCommonTestMistakeTagLabel,
  getCommonTestRiskLevel,
  type CommonTestDrillHistoryItem,
  type CommonTestMistakeTagId,
  type CommonTestRiskLevel,
} from "@/lib/common-test-history";

export interface CommonTestReviewQueueLike {
  status: string;
  nextReviewAt: string;
  reasonFlags: string[];
}

export interface CommonTestMistakeStrategy {
  tagId: CommonTestMistakeTagId;
  title: string;
  action: string;
  lectureHref?: string;
  lectureLabel?: string;
}

export interface CommonTestPrescription {
  title: string;
  reason: string;
  priority: "高" | "中" | "低";
  estimatedMinutes: number;
  ctaLabel: string;
  href: string;
  lectureStatus?: "available" | "coming-soon";
}

export interface CommonTestRecommendedLecture {
  slug: string;
  title: string;
  reason: string;
  estimatedMinutes: number;
  href: string;
  sourceTagId?: CommonTestMistakeTagId;
}

export interface CommonTestSectionMistakeTrend {
  key: string;
  subjectId: string;
  sectionId: string;
  subjectLabel: string;
  sectionLabel: string;
  tagId: CommonTestMistakeTagId;
  count: number;
}

export interface CommonTestLearningDiagnosis {
  riskCounts: Partial<Record<CommonTestRiskLevel, number>>;
  tagCounts: Partial<Record<CommonTestMistakeTagId, number>>;
  topMistake: { tagId: CommonTestMistakeTagId; count: number } | null;
  increasingMistake: { tagId: CommonTestMistakeTagId; recent: number; previous: number } | null;
  sectionTendencies: CommonTestSectionMistakeTrend[];
  confidentWrongCount: number;
  unsureCorrectCount: number;
  dueReviewCount: number | null;
  prescription: CommonTestPrescription;
  recommendedLecture: CommonTestRecommendedLecture;
  strategies: CommonTestMistakeStrategy[];
}

const SUBJECT_LABELS: Record<string, string> = {
  "math-1a": "数学IA",
  "math-2bc": "数学IIB(C)",
  "english-reading": "英語R",
};

const RISK_PRIORITY: CommonTestRiskLevel[] = ["S", "A", "B", "C"];

const COMMON_TEST_LECTURE_RECOMMENDATIONS: Record<
  CommonTestMistakeTagId,
  CommonTestRecommendedLecture
> = {
  calculation: {
    slug: "quadratic-case-split-intensive",
    title: "共通テスト 二次関数 場合分け完全攻略",
    reason: "計算だけでなく、端点比較と境界値を先に固定すると処理ミスを減らせます。",
    estimatedMinutes: 40,
    href: "/common-test/lectures/quadratic-case-split-intensive",
    sourceTagId: "calculation",
  },
  "formula-selection": {
    slug: "geometry-measurement-intensive",
    title: "共通テスト 図形と計量 徹底講座",
    reason: "公式選択ミスが目立つときは、辺・角・面積から候補を絞る順番を確認します。",
    estimatedMinutes: 45,
    href: "/common-test/lectures/geometry-measurement-intensive",
    sourceTagId: "formula-selection",
  },
  "reading-misread": {
    slug: "probability-guided-reading",
    title: "共通テスト 確率 誘導の読み方講座",
    reason: "条件文を事象に言い換え、分母と分子の数え方をそろえる練習ができます。",
    estimatedMinutes: 40,
    href: "/common-test/lectures/probability-guided-reading",
    sourceTagId: "reading-misread",
  },
  "condition-missed": {
    slug: "probability-guided-reading",
    title: "共通テスト 確率 誘導の読み方講座",
    reason: "条件見落としが増えています。誘導文の条件を分解して読む練習が効果的です。",
    estimatedMinutes: 40,
    href: "/common-test/lectures/probability-guided-reading",
    sourceTagId: "condition-missed",
  },
  "case-split": {
    slug: "quadratic-case-split-intensive",
    title: "共通テスト 二次関数 場合分け完全攻略",
    reason: "場合分け不足が目立つときは、境界値を先に出す型を固めます。",
    estimatedMinutes: 40,
    href: "/common-test/lectures/quadratic-case-split-intensive",
    sourceTagId: "case-split",
  },
  "figure-reading": {
    slug: "geometry-properties-course",
    title: "数学IA 図形の性質 通常コース",
    reason: "図の見落としが多いときは、円周角・方べき・補助線を範囲内の通常コースで確認します。",
    estimatedMinutes: 40,
    href: "/courses/math-1a/geometry-properties",
    sourceTagId: "figure-reading",
  },
  "time-up": {
    slug: "numbers-expressions-core-skills",
    title: "共通テスト 数と式 徹底講座",
    reason: "時間切れが目立つ日は、範囲内の式変形・有理化・検算手順を固めて処理時間を短縮します。",
    estimatedMinutes: 40,
    href: "/common-test/lectures/numbers-expressions-core-skills",
    sourceTagId: "time-up",
  },
  "confident-wrong": {
    slug: "geometry-measurement-intensive",
    title: "共通テスト 図形と計量 徹底講座",
    reason: "自信ありで間違えた問題は、最初に見た条件や公式選択の思い込みを点検します。",
    estimatedMinutes: 45,
    href: "/common-test/lectures/geometry-measurement-intensive",
    sourceTagId: "confident-wrong",
  },
  "unsure-correct": {
    slug: "probability-guided-reading",
    title: "共通テスト 確率 誘導の読み方講座",
    reason: "正解していても根拠が弱いときは、条件整理と言い換えで説明できる状態にします。",
    estimatedMinutes: 40,
    href: "/common-test/lectures/probability-guided-reading",
    sourceTagId: "unsure-correct",
  },
};

export const COMMON_TEST_MISTAKE_STRATEGIES: Record<
  CommonTestMistakeTagId,
  CommonTestMistakeStrategy
> = {
  calculation: {
    tagId: "calculation",
    title: "計算ミス",
    action: "式変形を1行ずつ残し、最後に符号と分母だけ確認する。",
  },
  "formula-selection": {
    tagId: "formula-selection",
    title: "公式選択ミス",
    action: "使える公式候補を先に並べ、与えられた辺・角・面積で絞る。",
    lectureHref: "/common-test/lectures/geometry-measurement-intensive",
    lectureLabel: "共通テスト 図形と計量 徹底講座",
  },
  "reading-misread": {
    tagId: "reading-misread",
    title: "問題文の読み違い",
    action: "問われている値、条件、単位を分けて読み直す。",
  },
  "condition-missed": {
    tagId: "condition-missed",
    title: "条件見落とし",
    action: "問題文に下線を引くつもりで条件を抽出する。",
    lectureHref: "/common-test/lectures/probability-guided-reading",
    lectureLabel: "共通テスト 確率 誘導の読み方講座",
  },
  "case-split": {
    tagId: "case-split",
    title: "場合分け不足",
    action: "境界値を先に出し、等号が入る場所を確認する。",
    lectureHref: "/common-test/lectures/quadratic-case-split-intensive",
    lectureLabel: "共通テスト 二次関数 場合分け完全攻略",
  },
  "figure-reading": {
    tagId: "figure-reading",
    title: "図の見落とし",
    action: "等しい角・同じ辺・円周角を探してから計算に入る。",
    lectureHref: "/courses/math-1a/geometry-properties",
    lectureLabel: "数学IA 図形の性質 通常コース",
  },
  "time-up": {
    tagId: "time-up",
    title: "時間切れ",
    action: "正攻法で方針を確認した後、即殺公式・選択肢処理・検算で短縮する。",
    lectureHref: "/common-test/lectures/numbers-expressions-core-skills",
    lectureLabel: "共通テスト 数と式 徹底講座",
  },
  "confident-wrong": {
    tagId: "confident-wrong",
    title: "自信ありで間違えた",
    action: "解説を読む前に、なぜ正しいと思ったかを確認する。",
  },
  "unsure-correct": {
    tagId: "unsure-correct",
    title: "自信なしで正解した",
    action: "正解していても根拠が弱い問題を軽めに再演習する。",
  },
};

export function getRiskLevelFromReviewReasonFlags(
  flags: readonly string[]
): CommonTestRiskLevel | null {
  for (const level of RISK_PRIORITY) {
    if (flags.includes(`risk:${level}`)) return level;
  }
  if (flags.includes("dangerous-misconception")) return "S";
  return null;
}

export function getMistakeTagIdsFromReviewReasonFlags(
  flags: readonly string[]
): CommonTestMistakeTagId[] {
  const knownIds = new Set(COMMON_TEST_MISTAKE_TAGS.map((tag) => tag.id));
  return flags
    .filter((flag) => flag.startsWith("mistake:"))
    .map((flag) => flag.replace("mistake:", ""))
    .filter((tagId): tagId is CommonTestMistakeTagId =>
      knownIds.has(tagId as CommonTestMistakeTagId)
    );
}

export function compareReviewItemsByRisk(
  a: CommonTestReviewQueueLike,
  b: CommonTestReviewQueueLike
): number {
  const aRisk = getRiskLevelFromReviewReasonFlags(a.reasonFlags);
  const bRisk = getRiskLevelFromReviewReasonFlags(b.reasonFlags);
  const aIndex = aRisk ? RISK_PRIORITY.indexOf(aRisk) : RISK_PRIORITY.length;
  const bIndex = bRisk ? RISK_PRIORITY.indexOf(bRisk) : RISK_PRIORITY.length;
  if (aIndex !== bIndex) return aIndex - bIndex;
  return new Date(a.nextReviewAt).getTime() - new Date(b.nextReviewAt).getTime();
}

export function buildCommonTestLearningDiagnosis({
  history,
  reviewItems,
  now = new Date(),
}: {
  history: CommonTestDrillHistoryItem[];
  reviewItems?: CommonTestReviewQueueLike[] | null;
  now?: Date;
}): CommonTestLearningDiagnosis {
  const tagCounts: Partial<Record<CommonTestMistakeTagId, number>> = {};
  const riskCounts: Partial<Record<CommonTestRiskLevel, number>> = {};
  const sectionCounts = new Map<string, Partial<Record<CommonTestMistakeTagId, number>>>();
  const sectionMeta = new Map<string, { subjectId: string; sectionId: string; subjectLabel: string; sectionLabel: string }>();
  let confidentWrongCount = 0;
  let unsureCorrectCount = 0;

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
  );
  const recentHistory = sortedHistory.slice(0, Math.max(1, Math.ceil(sortedHistory.length / 2)));
  const previousHistory = sortedHistory.slice(recentHistory.length);
  const recentCounts = countMistakeTags(recentHistory);
  const previousCounts = countMistakeTags(previousHistory);

  for (const item of sortedHistory) {
    const sectionKey =
      item.sourceType === "lecture"
        ? `lecture:${item.lectureSlug ?? item.sectionId}`
        : `${item.subjectId}:${item.sectionId}`;
    sectionMeta.set(sectionKey, {
      subjectId: item.subjectId,
      sectionId: item.sectionId,
      subjectLabel: SUBJECT_LABELS[item.subjectId] ?? item.subjectId,
      sectionLabel:
        item.sourceType === "lecture"
          ? `特別講義：${item.lectureTitle ?? item.problemTitle ?? "講義問題"}`
          : `${item.sectionId.replace("section-", "第")}問`,
    });
    const currentSectionCounts = sectionCounts.get(sectionKey) ?? {};
    for (const answer of item.answers) {
      const tagIds = getCommonTestAnswerMistakeTagIds(answer);
      const riskLevel = getCommonTestRiskLevel(tagIds);

      if (riskLevel) riskCounts[riskLevel] = (riskCounts[riskLevel] ?? 0) + 1;
      if (tagIds.includes("confident-wrong")) confidentWrongCount += 1;
      if (tagIds.includes("unsure-correct")) unsureCorrectCount += 1;

      for (const tagId of tagIds) {
        tagCounts[tagId] = (tagCounts[tagId] ?? 0) + 1;
        currentSectionCounts[tagId] = (currentSectionCounts[tagId] ?? 0) + 1;
      }
    }
    sectionCounts.set(sectionKey, currentSectionCounts);
  }

  const topMistake = topTagEntry(tagCounts);
  const increasingMistake = getIncreasingMistake(recentCounts, previousCounts);
  const dueReviewCount =
    reviewItems == null
      ? null
      : reviewItems.filter(
          (item) => item.status === "ACTIVE" && new Date(item.nextReviewAt) <= now
        ).length;
  const sectionTendencies = buildSectionTendencies(sectionCounts, sectionMeta);
  const prescription = buildPrescription({
    topMistake,
    increasingMistake,
    riskCounts,
    dueReviewCount,
    confidentWrongCount,
    unsureCorrectCount,
  });
  const strategies = buildStrategies(topMistake, increasingMistake, tagCounts);

  return {
    riskCounts,
    tagCounts,
    topMistake,
    increasingMistake,
    sectionTendencies,
    confidentWrongCount,
    unsureCorrectCount,
    dueReviewCount,
    prescription,
    recommendedLecture: buildRecommendedLecture({
      topMistake,
      increasingMistake,
      riskCounts,
      tagCounts,
    }),
    strategies,
  };
}

export function buildRecommendedLecture({
  topMistake,
  increasingMistake,
  riskCounts,
  tagCounts,
}: {
  topMistake: { tagId: CommonTestMistakeTagId; count: number } | null;
  increasingMistake: { tagId: CommonTestMistakeTagId; recent: number; previous: number } | null;
  riskCounts: Partial<Record<CommonTestRiskLevel, number>>;
  tagCounts: Partial<Record<CommonTestMistakeTagId, number>>;
}): CommonTestRecommendedLecture {
  const focusTag =
    increasingMistake?.tagId ??
    ((riskCounts.S ?? 0) > 0 ? "confident-wrong" : null) ??
    topMistake?.tagId ??
    COMMON_TEST_MISTAKE_TAGS.map((tag) => ({
      tagId: tag.id,
      count: tagCounts[tag.id] ?? 0,
    }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count)[0]?.tagId ??
    "case-split";

  return COMMON_TEST_LECTURE_RECOMMENDATIONS[focusTag];
}

function countMistakeTags(
  history: CommonTestDrillHistoryItem[]
): Partial<Record<CommonTestMistakeTagId, number>> {
  const counts: Partial<Record<CommonTestMistakeTagId, number>> = {};
  for (const item of history) {
    for (const answer of item.answers) {
      for (const tagId of getCommonTestAnswerMistakeTagIds(answer)) {
        counts[tagId] = (counts[tagId] ?? 0) + 1;
      }
    }
  }
  return counts;
}

function topTagEntry(counts: Partial<Record<CommonTestMistakeTagId, number>>) {
  return (
    COMMON_TEST_MISTAKE_TAGS.map((tag) => ({
      tagId: tag.id,
      count: counts[tag.id] ?? 0,
    }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count)[0] ?? null
  );
}

function getIncreasingMistake(
  recentCounts: Partial<Record<CommonTestMistakeTagId, number>>,
  previousCounts: Partial<Record<CommonTestMistakeTagId, number>>
) {
  return (
    COMMON_TEST_MISTAKE_TAGS.map((tag) => {
      const recent = recentCounts[tag.id] ?? 0;
      const previous = previousCounts[tag.id] ?? 0;
      return { tagId: tag.id, recent, previous, delta: recent - previous };
    })
      .filter((entry) => entry.recent > 0 && entry.delta > 0)
      .sort((a, b) => b.delta - a.delta || b.recent - a.recent)
      .map(({ tagId, recent, previous }) => ({ tagId, recent, previous }))[0] ?? null
  );
}

function buildSectionTendencies(
  sectionCounts: Map<string, Partial<Record<CommonTestMistakeTagId, number>>>,
  sectionMeta: Map<string, { subjectId: string; sectionId: string; subjectLabel: string; sectionLabel: string }>
): CommonTestSectionMistakeTrend[] {
  return Array.from(sectionCounts.entries())
    .map(([key, counts]) => {
      const top = topTagEntry(counts);
      if (!top) return null;
      const [subjectId = "", sectionId = ""] = key.split(":");
      const meta = sectionMeta.get(key);
      return {
        key,
        subjectId: meta?.subjectId ?? subjectId,
        sectionId: meta?.sectionId ?? sectionId,
        subjectLabel: meta?.subjectLabel ?? SUBJECT_LABELS[subjectId] ?? subjectId,
        sectionLabel: meta?.sectionLabel ?? `${sectionId.replace("section-", "第")}問`,
        tagId: top.tagId,
        count: top.count,
      };
    })
    .filter((entry): entry is CommonTestSectionMistakeTrend => Boolean(entry))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
}

function buildPrescription({
  topMistake,
  increasingMistake,
  riskCounts,
  dueReviewCount,
  confidentWrongCount,
  unsureCorrectCount,
}: {
  topMistake: { tagId: CommonTestMistakeTagId; count: number } | null;
  increasingMistake: { tagId: CommonTestMistakeTagId; recent: number; previous: number } | null;
  riskCounts: Partial<Record<CommonTestRiskLevel, number>>;
  dueReviewCount: number | null;
  confidentWrongCount: number;
  unsureCorrectCount: number;
}): CommonTestPrescription {
  if ((dueReviewCount ?? 0) > 0 && (riskCounts.S ?? 0) > 0) {
    return {
      title: `危険度Sの復習を${Math.min(dueReviewCount ?? 2, 3)}問解く`,
      reason: "自信ありで間違えた問題は、理解しているつもりの危険ミスです。",
      priority: "高",
      estimatedMinutes: Math.min(10 + (dueReviewCount ?? 0), 20),
      ctaLabel: "復習キューを開く",
      href: "/common-test/review",
    };
  }

  const focusTag = increasingMistake?.tagId ?? topMistake?.tagId;
  if (focusTag === "formula-selection") {
    return {
      title: "図形と計量の「できる人の頭の中」を確認",
      reason: `${getCommonTestMistakeTagLabel(focusTag)}が目立っています。まず何を見るかを復習しましょう。`,
      priority: "高",
      estimatedMinutes: 15,
      ctaLabel: "問題解体型講座を見る",
      href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement",
    };
  }

  if (focusTag === "condition-missed") {
    return {
      title: "確率の誘導文から条件を拾う",
      reason: "条件見落としが増えています。事象の言い換えと条件整理を講義で確認しましょう。",
      priority: "高",
      estimatedMinutes: 15,
      ctaLabel: "問題解体型講座を見る",
      href: "/common-test/problem-lectures/ct-ia-q4-probability",
    };
  }

  if (focusTag === "figure-reading") {
    return {
      title: "図形の性質で補助線の判断を確認",
      reason: "図の見落としが目立っています。同じ角・円周角・補助線の見る順番を復習しましょう。",
      priority: "高",
      estimatedMinutes: 15,
      ctaLabel: "問題解体型講座を見る",
      href: "/common-test/problem-lectures/ct-ia-q3-plane-geometry",
    };
  }

  if (focusTag === "time-up") {
    return {
      title: "短時間ドリルで方針決定を練習",
      reason: "時間切れが目立つ日は、本番演習より短時間ドリルを優先します。",
      priority: "中",
      estimatedMinutes: 12,
      ctaLabel: "第1問を練習する",
      href: "/common-test/math-1a/section-1",
    };
  }

  if (focusTag === "case-split") {
    return {
      title: "二次関数の境界値を講義で復習",
      reason: "場合分け不足が増えています。軸・端点・境界値を先に出す型を確認しましょう。",
      priority: "高",
      estimatedMinutes: 15,
      ctaLabel: "問題解体型講座を見る",
      href: "/common-test/problem-lectures/ct-ia-q2-front-quadratic-1",
    };
  }

  if (unsureCorrectCount >= Math.max(2, confidentWrongCount)) {
    return {
      title: "自信なしで正解した問題を軽く再演習",
      reason: "正解しているが定着不足です。根拠を言える問題に変えましょう。",
      priority: "中",
      estimatedMinutes: 10,
      ctaLabel: "履歴を確認する",
      href: "/common-test/history",
    };
  }

  if ((dueReviewCount ?? 0) > 0) {
    return {
      title: `今日の復習${dueReviewCount}問を先に解く`,
      reason: "復習期限が来ています。間隔反復を先に片付けると定着が安定します。",
      priority: "中",
      estimatedMinutes: Math.min(10 + (dueReviewCount ?? 0), 20),
      ctaLabel: "復習キューを開く",
      href: "/common-test/review",
    };
  }

  return {
    title: "数学IA 第1問を15分で診断",
    reason: "まだ診断材料が少ないため、図形と計量・命題・誘導読解をまとめて測ります。",
    priority: "低",
    estimatedMinutes: 15,
    ctaLabel: "15分演習を始める",
    href: "/common-test/math-1a/section-1",
  };
}

function buildStrategies(
  topMistake: { tagId: CommonTestMistakeTagId; count: number } | null,
  increasingMistake: { tagId: CommonTestMistakeTagId; recent: number; previous: number } | null,
  tagCounts: Partial<Record<CommonTestMistakeTagId, number>>
): CommonTestMistakeStrategy[] {
  const selected = new Set<CommonTestMistakeTagId>();
  if (increasingMistake) selected.add(increasingMistake.tagId);
  if (topMistake) selected.add(topMistake.tagId);

  for (const tag of COMMON_TEST_MISTAKE_TAGS) {
    if ((tagCounts[tag.id] ?? 0) > 0) selected.add(tag.id);
    if (selected.size >= 4) break;
  }

  if (selected.size === 0) {
    selected.add("condition-missed");
    selected.add("formula-selection");
    selected.add("time-up");
  }

  return Array.from(selected)
    .slice(0, 4)
    .map((tagId) => COMMON_TEST_MISTAKE_STRATEGIES[tagId]);
}
