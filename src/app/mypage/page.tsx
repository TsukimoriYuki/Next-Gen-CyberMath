"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  BookMarked,
  BookOpen,
  Network,
  RotateCcw,
  Sigma,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  clearAttemptsLocal,
  getAttemptsServerSnapshot,
  getAttemptsSnapshot,
  subscribeAttempts,
} from "@/lib/exam";
import {
  recommendedLessons,
  scoreTrend,
  summarize,
  unitStats,
  weakTagRanking,
} from "@/lib/history";
import { AttemptList } from "@/components/mock/history/AttemptList";
import { ScoreTrendChart } from "@/components/mock/history/ScoreTrendChart";
import { SummaryCards } from "@/components/mock/history/SummaryCards";
import { UnitRadarChart } from "@/components/mock/history/UnitRadarChart";
import { WeakTagPanel } from "@/components/mock/history/WeakTagPanel";
import {
  clearEnglishAttemptsLocal,
  computeEnglishStats,
  getEnglishAttemptsServerSnapshot,
  getEnglishAttemptsSnapshot,
  subscribeEnglishAttempts,
  type EnglishAttempt,
} from "@/lib/english-history";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";
import { LearningCalendar } from "@/components/dashboard/LearningCalendar";
import { ReviewQueuePanel } from "@/components/review/ReviewQueuePanel";
import { CommonTestReviewSummary } from "@/components/common-test/CommonTestReviewSummary";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
  LearningState,
  LearningStatusBadge,
} from "@/components/learning/LearningPageFrame";
import { SITE_NAME } from "@/lib/site";

type Subject = "MATH" | "ENGLISH";

const SUBJECT_TABS: readonly {
  value: Subject;
  label: string;
  icon: React.ElementType;
  tabId: string;
  panelId: string;
}[] = [
  {
    value: "MATH",
    label: "数学",
    icon: Sigma,
    tabId: "mypage-math-tab",
    panelId: "mypage-math-panel",
  },
  {
    value: "ENGLISH",
    label: "英語",
    icon: BookOpen,
    tabId: "mypage-english-tab",
    panelId: "mypage-english-panel",
  },
];

const noopSubscribe = () => () => {};

export default function MyPage() {
  const [subject, setSubject] = useState<Subject>("MATH");

  const attempts = useSyncExternalStore(
    subscribeAttempts,
    getAttemptsSnapshot,
    getAttemptsServerSnapshot,
  );
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const summary = useMemo(() => summarize(attempts), [attempts]);
  const trend = useMemo(() => scoreTrend(attempts), [attempts]);
  const units = useMemo(() => unitStats(attempts), [attempts]);
  const weak = useMemo(() => weakTagRanking(attempts, 8), [attempts]);
  const lessons = useMemo(() => recommendedLessons(weak, 4), [weak]);

  const englishAttempts = useSyncExternalStore(
    subscribeEnglishAttempts,
    getEnglishAttemptsSnapshot,
    getEnglishAttemptsServerSnapshot,
  );
  const englishStats = useMemo(
    () => computeEnglishStats(englishAttempts),
    [englishAttempts],
  );

  const clearHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("数学の演習履歴をすべて削除します。よろしいですか？")) return;
    clearAttemptsLocal();
  };

  const clearEnglishHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("英語の学習履歴をすべて削除します。よろしいですか？")) return;
    clearEnglishAttemptsLocal();
  };

  const selectTab = (nextSubject: Subject, moveFocus = false) => {
    setSubject(nextSubject);
    if (!moveFocus) return;
    const nextTab = SUBJECT_TABS.find((tab) => tab.value === nextSubject);
    if (nextTab) document.getElementById(nextTab.tabId)?.focus();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentSubject: Subject,
  ) => {
    const currentIndex = SUBJECT_TABS.findIndex(
      (tab) => tab.value === currentSubject,
    );
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % SUBJECT_TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + SUBJECT_TABS.length) % SUBJECT_TABS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = SUBJECT_TABS.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    selectTab(SUBJECT_TABS[nextIndex].value, true);
  };

  const activeAttemptCount =
    subject === "MATH" ? attempts.length : englishAttempts.length;

  return (
    <LearningPageShell width="content">
      <LearningBreadcrumbs
        items={[
          { label: SITE_NAME, href: "/" },
          { label: "マイページ" },
        ]}
      />
      <LearningPageHeader
        eyebrow="学習管理"
        title="学習分析"
        description="数学と英語の学習データ、復習キュー、次に解くべき内容をまとめて確認できます。"
      />

      <section className="mt-10" aria-labelledby="review-overview-heading">
        <div className="max-w-3xl">
          <h2
            id="review-overview-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            復習の状況
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            今日取り組む内容と、共通テスト対策で復習が必要な項目を確認できます。
          </p>
        </div>

        <div className="mt-5">
          <ReviewQueuePanel />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-slate-950">共通テストの復習</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            保存した弱点問題と、次の復習日をまとめています。
          </p>
          <div className="mt-4">
            <CommonTestReviewSummary />
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="learning-calendar-heading">
        <div className="max-w-3xl">
          <h2
            id="learning-calendar-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            学習カレンダー
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            数学と英語の記録を日ごとにまとめ、学習の継続状況を表示します。
          </p>
        </div>
        <div className="mt-5">
          {mounted ? (
            <div>
              <LearningCalendar
                mathAttempts={attempts}
                englishAttempts={englishAttempts}
              />
            </div>
          ) : (
            <LearningState
              kind="loading"
              headingLevel={3}
              title="学習カレンダーを読み込んでいます"
              description="この端末に保存された学習記録を集計しています。"
              compact
            />
          )}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="subject-analysis-heading">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <h2
              id="subject-analysis-heading"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              教科別の学習状況
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              教科を切り替えて、得点推移、弱点、最近の演習を確認できます。
            </p>
          </div>
          {mounted && activeAttemptCount > 0 ? (
            <LearningStatusBadge status="in-progress" />
          ) : null}
        </div>

        <div
          className="mt-6 inline-flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="教科別の学習履歴"
          aria-orientation="horizontal"
        >
          {SUBJECT_TABS.map((tab) => {
            const active = subject === tab.value;
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                id={tab.tabId}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={tab.panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => selectTab(tab.value)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.value)}
                className={
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
                  (active
                    ? "border-blue-200 bg-blue-50 text-blue-800 shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-950")
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <section
          id="mypage-math-panel"
          role="tabpanel"
          aria-labelledby="mypage-math-tab"
          hidden={subject !== "MATH"}
          tabIndex={0}
          className="mt-6 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
        >
          {!mounted ? (
            <LearningState
              kind="loading"
              headingLevel={3}
              title="数学の学習記録を読み込んでいます"
              description="得点推移と弱点を集計しています。"
              compact
            />
          ) : attempts.length === 0 ? (
            <NoMathData />
          ) : (
            <div className="space-y-6">
              <SummaryCards summary={summary} />
              <div className="grid gap-6 lg:grid-cols-2">
                <ScoreTrendChart points={trend} headingLevel={3} />
                <UnitRadarChart stats={units} headingLevel={3} />
              </div>
              <WeakTagPanel weakTags={weak} lessons={lessons} headingLevel={3} />
              <AttemptList attempts={attempts} headingLevel={3} />
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link href="/mock" className="button-secondary">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  新しい模試を受ける
                </Link>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  履歴を削除
                </button>
              </div>
            </div>
          )}
        </section>

        <section
          id="mypage-english-panel"
          role="tabpanel"
          aria-labelledby="mypage-english-tab"
          hidden={subject !== "ENGLISH"}
          tabIndex={0}
          className="mt-6 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
        >
          <EnglishPanel
            mounted={mounted}
            attempts={englishAttempts}
            stats={englishStats}
            onClear={clearEnglishHistory}
          />
        </section>
      </section>
    </LearningPageShell>
  );
}

function NoMathData() {
  return (
    <LearningState
      kind="empty"
      headingLevel={3}
      title="まだ学習データがありません"
      description="数学の共通テスト診断または大問別ドリルを解くと、正答率・弱点単元・復習予定がここに表示されます。"
      actions={
        <>
          <Link href="/common-test" className="button-primary">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            共通テスト対策を始める
          </Link>
          <Link
            href="/common-test/math-1a/section-1"
            className="button-secondary"
          >
            <Sigma className="h-4 w-4" aria-hidden="true" />
            大問別ドリルを解く
          </Link>
          <Link
            href="/common-test/simulator/common-test-math-1a-manual-001"
            className="button-secondary"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            冊子型模試を受ける
          </Link>
        </>
      }
    />
  );
}

function EnglishPanel({
  mounted,
  attempts,
  stats,
  onClear,
}: {
  mounted: boolean;
  attempts: EnglishAttempt[];
  stats: ReturnType<typeof computeEnglishStats>;
  onClear: () => void;
}) {
  if (!mounted) {
    return (
      <LearningState
        kind="loading"
        headingLevel={3}
        title="英語の学習記録を読み込んでいます"
        description="正答率と最近の演習を集計しています。"
        compact
      />
    );
  }

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <EnglishStat
          label="速読 回数"
          value={stats.speedReading.count}
          unit="回"
          icon={Zap}
        />
        <EnglishStat
          label="速読 正答率"
          value={
            stats.speedReading.count > 0
              ? stats.speedReading.avgAccuracy
              : null
          }
          unit="%"
          icon={TrendingUp}
        />
        <EnglishStat
          label="精読 正答率"
          value={
            stats.comprehension.count > 0
              ? stats.comprehension.avgAccuracy
              : null
          }
          unit="%"
          icon={BookMarked}
        />
        <EnglishStat
          label="資料読解"
          value={stats.multiSource.count}
          unit="問"
          icon={Network}
        />
      </dl>

      {attempts.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
            <span className="text-sm font-semibold text-slate-700">
              最近の演習 / {attempts.length}件
            </span>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              履歴を削除
            </button>
          </div>
          <ul className="divide-y divide-slate-200">
            {attempts.slice(0, 10).map((attempt) => {
              const pct = Math.round((attempt.score / attempt.total) * 100);
              const modeLabel = {
                "speed-reading": "速読",
                comprehension: "精読",
                "multi-source": "資料",
              }[attempt.mode];
              const levelMeta = ENGLISH_LEVEL_META[attempt.level];
              return (
                <li
                  key={attempt.id}
                  className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                      {modeLabel}
                    </span>
                    <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {levelMeta.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-sm font-bold tabular-nums text-slate-950">
                      {attempt.score}/{attempt.total}
                      <span className="ml-1 text-xs font-normal text-slate-500">
                        ({pct}%)
                      </span>
                    </span>
                    <time
                      className="text-xs tabular-nums text-slate-500"
                      dateTime={attempt.completedAt}
                    >
                      {new Date(attempt.completedAt).toLocaleDateString("ja-JP", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <LearningState
          kind="empty"
          headingLevel={3}
          title="まだ英語の記録がありません"
          description="速読、精読、資料読解に取り組むと、正答率と学習時間がここに記録されます。"
          actions={
            <Link href="/english/speed-reading" className="button-primary">
              速読を始める
            </Link>
          }
        />
      )}
    </div>
  );
}

function EnglishStat({
  label,
  value,
  unit,
  icon: Icon,
}: {
  label: string;
  value: number | null;
  unit: string;
  icon: React.ElementType;
}) {
  const hasValue = value !== null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <dt className="mb-3 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700"
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold text-slate-600">{label}</span>
      </dt>
      <dd className="text-2xl font-bold tabular-nums text-slate-950">
        {value !== null ? value : "—"}
        {hasValue ? (
          <span className="ml-1 text-sm font-semibold text-slate-500">{unit}</span>
        ) : null}
      </dd>
      {!hasValue ? (
        <dd className="mt-1 text-xs text-slate-500">まだデータがありません</dd>
      ) : null}
    </div>
  );
}
