"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buildCommonTestLearningDiagnosis } from "@/lib/common-test-diagnosis";
import {
  getCommonTestDrillHistory,
  clearCommonTestDrillHistory,
  COMMON_TEST_MISTAKE_TAGS,
  getCommonTestAnswerMistakeTagIds,
  getCommonTestMistakeTagLabel,
  getCommonTestRiskLevel,
  getCommonTestRiskMeta,
  type CommonTestDrillHistoryItem,
  type CommonTestMistakeTagId,
  type CommonTestRiskLevel,
} from "@/lib/common-test-history";
import { AlertTriangle, Clock, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { CommonTestMistakeStrategyCards } from "./CommonTestMistakeStrategyCards";
import { LearningState } from "@/components/learning/LearningPageFrame";

const SUBJECT_LABELS: Record<string, { label: string; color: string; glowRgb: string }> = {
  "math-1a": { label: "数学IA", color: "#2563eb", glowRgb: "37,99,235" },
  "math-2bc": { label: "数学IIB(C)", color: "#7c3aed", glowRgb: "124,58,237" },
  "english-reading": { label: "英語R", color: "#059669", glowRgb: "5,150,105" },
};

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function fmtSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function getGradeColor(pct: number): string {
  if (pct >= 90) return "#ca8a04";
  if (pct >= 75) return "#059669";
  if (pct >= 60) return "#2563eb";
  return "#ea580c";
}

function getGradeLetter(pct: number): string {
  if (pct >= 90) return "S";
  if (pct >= 75) return "A";
  if (pct >= 60) return "B";
  return "C";
}

interface MistakeSummary {
  totalTaggedAnswers: number;
  topMistake: { tagId: CommonTestMistakeTagId; count: number } | null;
  tagCounts: Partial<Record<CommonTestMistakeTagId, number>>;
  riskCounts: Partial<Record<CommonTestRiskLevel, number>>;
  confidentWrongQuestionIds: string[];
  sectionTendencies: {
    key: string;
    subjectLabel: string;
    sectionLabel: string;
    tagId: CommonTestMistakeTagId;
    count: number;
  }[];
}

function computeMistakeSummary(history: CommonTestDrillHistoryItem[]): MistakeSummary {
  const tagCounts: Partial<Record<CommonTestMistakeTagId, number>> = {};
  const riskCounts: Partial<Record<CommonTestRiskLevel, number>> = {};
  const confidentWrongQuestionIds: string[] = [];
  const sectionTagCounts = new Map<string, Partial<Record<CommonTestMistakeTagId, number>>>();
  const sectionMeta = new Map<string, { subjectLabel: string; sectionLabel: string }>();

  for (const item of history) {
    const sectionKey =
      item.sourceType === "lecture"
        ? `lecture:${item.lectureSlug ?? item.sectionId}`
        : `${item.subjectId}:${item.sectionId}`;
    const subject = SUBJECT_LABELS[item.subjectId] ?? {
      label: item.subjectId,
      color: "#64748b",
      glowRgb: "100,116,139",
    };
    sectionMeta.set(sectionKey, {
      subjectLabel: subject.label,
      sectionLabel:
        item.sourceType === "lecture"
          ? `特別講義：${item.lectureTitle ?? item.problemTitle ?? "講義問題"}`
          : `${item.sectionId.replace("section-", "第")}問`,
    });
    const sectionCounts = sectionTagCounts.get(sectionKey) ?? {};
    for (const answer of item.answers) {
      const tagIds = getCommonTestAnswerMistakeTagIds(answer);
      const riskLevel = getCommonTestRiskLevel(tagIds);

      if (riskLevel) riskCounts[riskLevel] = (riskCounts[riskLevel] ?? 0) + 1;
      if (riskLevel === "S") confidentWrongQuestionIds.push(answer.questionId);

      for (const tagId of tagIds) {
        tagCounts[tagId] = (tagCounts[tagId] ?? 0) + 1;
        sectionCounts[tagId] = (sectionCounts[tagId] ?? 0) + 1;
      }
    }
    sectionTagCounts.set(sectionKey, sectionCounts);
  }

  const topMistake =
    COMMON_TEST_MISTAKE_TAGS.map((tag) => ({
      tagId: tag.id,
      count: tagCounts[tag.id] ?? 0,
    }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count)[0] ?? null;

  const sectionTendencies = Array.from(sectionTagCounts.entries())
    .map(([key, counts]) => {
      const [rawSubjectId, rawSectionId] = key.split(":");
      const subjectId = rawSubjectId ?? "";
      const sectionId = rawSectionId ?? "";
      const top = COMMON_TEST_MISTAKE_TAGS.map((tag) => ({
        tagId: tag.id,
        count: counts[tag.id] ?? 0,
      }))
        .filter((entry) => entry.count > 0)
        .sort((a, b) => b.count - a.count)[0];
      if (!top) return null;
      const meta = sectionMeta.get(key);
      const subject = SUBJECT_LABELS[subjectId] ?? {
        label: subjectId,
        color: "#64748b",
        glowRgb: "100,116,139",
      };
      return {
        key,
        subjectLabel: meta?.subjectLabel ?? subject.label,
        sectionLabel: meta?.sectionLabel ?? `${sectionId.replace("section-", "第")}問`,
        tagId: top.tagId,
        count: top.count,
      };
    })
    .filter((entry): entry is MistakeSummary["sectionTendencies"][number] => Boolean(entry))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    totalTaggedAnswers: Object.values(tagCounts).reduce((sum, count) => sum + (count ?? 0), 0),
    topMistake,
    tagCounts,
    riskCounts,
    confidentWrongQuestionIds,
    sectionTendencies,
  };
}

export function CommonTestHistoryPanel() {
  const [history, setHistory] = useState<CommonTestDrillHistoryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    // localStorage はサーバーに存在しないため、hydration mismatch を避けてマウント後に読む
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(getCommonTestDrillHistory());
    setHydrated(true);
  }, []);

  function handleClear() {
    if (confirmClear) {
      clearCommonTestDrillHistory();
      setHistory([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  }

  if (!hydrated) {
    return (
      <LearningState
        kind="loading"
        title="大問別ドリルの履歴を読み込んでいます"
        description="この端末に保存された演習結果を確認しています。"
        compact
      />
    );
  }

  if (history.length === 0) {
    return (
      <LearningState
        kind="empty"
        title="大問別ドリルの履歴はありません"
        description="大問別演習を1つ解くと、ここに正答率、弱点タグ、時間超過、自信度が記録されます。初回は数学IAの大問別ドリルから始めるのがおすすめです。"
        actions={
          <>
          <Link
            href="/common-test/math-1a"
            className="button-primary"
          >
            数学IAの大問別ドリルを始める
          </Link>
          <Link
            href="/common-test/english-reading"
            className="button-secondary"
          >
            英語Rの大問別ドリルを始める
          </Link>
          </>
        }
      />
    );
  }

  const mistakeSummary = computeMistakeSummary(history);
  const diagnosis = buildCommonTestLearningDiagnosis({ history, reviewItems: null });

  return (
    <div className="space-y-3">
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {history.length} 件の演習履歴
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          style={{
            background: confirmClear ? "#fff1f2" : "#ffffff",
            borderColor: confirmClear ? "#fecdd3" : "#e2e8f0",
            color: confirmClear ? "#e11d48" : "#64748b",
          }}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {confirmClear ? "本当に削除する" : "履歴をクリア"}
        </button>
      </div>

      {mistakeSummary.totalTaggedAnswers > 0 && (
        <MistakeSummaryPanel summary={mistakeSummary} />
      )}

      <CommonTestMistakeStrategyCards strategies={diagnosis.strategies} />

      {/* History list */}
      {history.map((item) => {
        const subj = SUBJECT_LABELS[item.subjectId] ?? {
          label: item.subjectId,
          color: "#ffffff",
          glowRgb: "255,255,255",
        };
        const pct =
          item.totalQuestions > 0
            ? Math.round((item.correctCount / item.totalQuestions) * 100)
            : 0;
        const gradeColor = getGradeColor(pct);
        const grade = getGradeLetter(pct);
        const isExpanded = expandedId === item.id;
        const itemSummary = computeMistakeSummary([item]);
        const riskSCount = itemSummary.riskCounts.S ?? 0;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              aria-expanded={isExpanded}
              className="flex min-h-11 w-full items-center gap-4 p-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
            >
              {/* Grade */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-extrabold"
                style={{ background: `${gradeColor}14`, color: gradeColor, border: `1px solid ${gradeColor}33` }}
              >
                {grade}
              </div>

              {/* Main info */}
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-2 py-1 text-xs font-bold"
                    style={{ background: `${subj.color}14`, color: subj.color }}
                  >
                    {subj.label}
                  </span>
                  <span className="text-xs text-slate-600">
                    {item.sourceType === "lecture"
                      ? "講義問題"
                      : `${item.sectionId.replace("section-", "第")}問`}
                  </span>
                  {item.sourceType === "lecture" && (
                    <span className="rounded bg-violet-50 px-2 py-1 text-xs font-bold text-violet-800">
                      特別講義
                    </span>
                  )}
                </div>
                {item.sourceType === "lecture" && item.lectureTitle && (
                  <div className="mb-1 truncate text-xs font-bold text-violet-800">
                    特別講義：{item.lectureTitle}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs">
                  <span style={{ color: gradeColor }}>
                    {item.correctCount}/{item.totalQuestions} ({pct}%)
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {fmtSec(item.totalTimeSec)}
                  </span>
                </div>
              </div>

              {/* Date + expand */}
              <div className="shrink-0 text-right">
                <div className="text-xs text-slate-600">
                  {fmtDate(item.finishedAt)}
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              )}
            </button>

            {/* Expanded detail */}
            {isExpanded && (
              <div className="space-y-3 border-t border-slate-100 px-4 pb-4">
                {item.sourceType === "lecture" && (
                  <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 p-3 text-xs leading-5 text-violet-800">
                    <div className="font-extrabold">特別講義：{item.lectureTitle}</div>
                    {item.problemTitle && <div className="mt-0.5">問題：{item.problemTitle}</div>}
                    {item.lectureSlug && (
                      <Link
                        href={`/common-test/lectures/${item.lectureSlug}`}
                        className="mt-2 inline-flex min-h-11 items-center rounded-lg px-2 font-bold text-violet-700 hover:bg-violet-100 hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                      >
                        講義に戻る →
                      </Link>
                    )}
                  </div>
                )}

                {/* Weak tags */}
                {item.weakSkillTags.length > 0 && (
                  <div>
                    <div className="mb-1.5 mt-3 text-xs font-bold text-slate-600">
                      弱点タグ
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.weakSkillTags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-orange-200 bg-orange-50 px-2 py-1 text-xs text-orange-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Danger + careless stats */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <MiniStat
                    label="危険度S"
                    value={riskSCount}
                    color="#e11d48"
                  />
                  <MiniStat
                    label="ラッキー正解"
                    value={item.guessedCorrectQuestionIds.length}
                    color="#7c3aed"
                  />
                  <MiniStat
                    label="時間超過"
                    value={item.overTimeQuestionIds.length}
                    color="#d97706"
                  />
                  <MiniStat
                    label="ケアレス"
                    value={item.carelessMistakeQuestionIds.length}
                    color="#ea580c"
                  />
                </div>

                {itemSummary.topMistake && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="text-xs font-bold text-slate-600">
                      この回で多いミス原因
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {COMMON_TEST_MISTAKE_TAGS.map((tag) => {
                        const count = itemSummary.tagCounts[tag.id] ?? 0;
                        if (count === 0) return null;
                        return (
                          <span
                            key={tag.id}
                            className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200"
                          >
                            {tag.label} {count}
                          </span>
                        );
                      })}
                    </div>
                    {riskSCount > 0 && (
                      <p className="mt-2 text-sm leading-6 text-rose-700">
                        自信ありで間違えた問題:{" "}
                        {itemSummary.confidentWrongQuestionIds.slice(0, 5).join(" / ")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MistakeSummaryPanel({ summary }: { summary: MistakeSummary }) {
  const riskSMeta = getCommonTestRiskMeta("S");
  const tagEntries = COMMON_TEST_MISTAKE_TAGS.map((tag) => ({
    tag,
    count: summary.tagCounts[tag.id] ?? 0,
  })).filter((entry) => entry.count > 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-extrabold text-slate-950">ミス原因レポート</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            正誤だけでなく、失点理由と危険度を集計しています。
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <MiniStat
          label="最も多い原因"
          value={summary.topMistake ? summary.topMistake.count : 0}
          color="#2563eb"
          suffix={summary.topMistake ? getCommonTestMistakeTagLabel(summary.topMistake.tagId) : "なし"}
        />
        <MiniStat
          label="危険度S"
          value={summary.riskCounts.S ?? 0}
          color={riskSMeta?.color ?? "#e11d48"}
          suffix="自信あり誤答"
        />
        <MiniStat
          label="原因タグ記録"
          value={summary.totalTaggedAnswers}
          color="#64748b"
          suffix="件"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tagEntries.map(({ tag, count }) => {
          const riskMeta = getCommonTestRiskMeta(tag.riskLevel);
          return (
            <span
              key={tag.id}
              className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                riskMeta?.className ?? "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {tag.label} {count}
            </span>
          );
        })}
      </div>

      {summary.sectionTendencies.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-bold text-slate-600">単元別の傾向</div>
          <div className="mt-2 space-y-1.5">
            {summary.sectionTendencies.map((entry) => (
              <div
                key={entry.key}
                className="flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <span className="font-bold text-slate-700">
                  {entry.subjectLabel} {entry.sectionLabel}
                </span>
                <span className="text-slate-500">
                  {getCommonTestMistakeTagLabel(entry.tagId)} {entry.count}件
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function MiniStat({
  label,
  value,
  color,
  suffix,
}: {
  label: string;
  value: number;
  color: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-lg font-bold" style={{ color }}>
        {value}
      </div>
      {suffix && <div className="mt-1 truncate text-xs text-slate-600">{suffix}</div>}
    </div>
  );
}
