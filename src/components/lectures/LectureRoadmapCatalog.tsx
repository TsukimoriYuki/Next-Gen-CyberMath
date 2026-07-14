"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Compass, Filter, RotateCcw, Sparkles, Tag } from "lucide-react";
import {
  SPECIAL_LECTURE_ROADMAP,
  PUBLIC_SPECIAL_LECTURES,
  type Lecture,
} from "@/data/specialLectures";
import {
  buildCommonTestLearningDiagnosis,
  type CommonTestLearningDiagnosis,
  type CommonTestReviewQueueLike,
} from "@/lib/common-test-diagnosis";
import {
  getCommonTestDrillHistory,
  getCommonTestMistakeTagLabel,
  type CommonTestDrillHistoryItem,
} from "@/lib/common-test-history";
import { getLectureEntry, summarizeLecture, type LectureStatus } from "@/lib/lecture-progress";
import { useAllLectureProgress } from "@/hooks/useLectureProgress";
import { LectureCardFooter } from "./LectureCardFooter";

type LectureFilter =
  | "all"
  | "not-started"
  | "in-progress"
  | "completed"
  | "quadratic"
  | "probability"
  | "geometry"
  | "risk";

interface ReviewListResponse {
  ok: boolean;
  items?: (CommonTestReviewQueueLike & { itemType?: string })[];
}

const FILTERS: { id: LectureFilter; label: string }[] = [
  { id: "all", label: "すべて" },
  { id: "not-started", label: "未開始" },
  { id: "in-progress", label: "受講中" },
  { id: "completed", label: "完了" },
  { id: "quadratic", label: "二次関数" },
  { id: "probability", label: "確率" },
  { id: "geometry", label: "図形" },
  { id: "risk", label: "危険度対策" },
];

const lectureBySlug = new Map(PUBLIC_SPECIAL_LECTURES.map((lecture) => [lecture.slug, lecture]));

export function LectureRoadmapCatalog() {
  const { hydrated, state } = useAllLectureProgress();
  const [filter, setFilter] = useState<LectureFilter>("all");
  const [history, setHistory] = useState<CommonTestDrillHistoryItem[]>([]);
  const [reviewItems, setReviewItems] = useState<CommonTestReviewQueueLike[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(getCommonTestDrillHistory());
  }, []);

  useEffect(() => {
    fetch("/api/review/list?limit=100")
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as ReviewListResponse;
        return data.ok
          ? (data.items ?? []).filter(
              (item) => item.itemType === "common-test-drill" || item.itemType === "common-test-lecture",
            )
          : null;
      })
      .then((items) => setReviewItems(items))
      .catch(() => setReviewItems(null));
  }, []);

  const diagnosis: CommonTestLearningDiagnosis = useMemo(
    () =>
      buildCommonTestLearningDiagnosis({
        history,
        reviewItems,
        now: new Date(),
      }),
    [history, reviewItems],
  );

  const lectureSummaries = useMemo(
    () =>
      PUBLIC_SPECIAL_LECTURES.map((lecture) => ({
        lecture,
        summary: summarizeLecture(getLectureEntry(state, lecture.slug), lecture),
      })),
    [state],
  );
  const statusBySlug = new Map(lectureSummaries.map((item) => [item.lecture.slug, item.summary.status]));

  const filteredLectures = lectureSummaries
    .filter(({ lecture, summary }) => matchesFilter(lecture, hydrated ? summary.status : "not-started", filter, diagnosis.recommendedLecture.slug))
    .map((item) => item.lecture);

  return (
    <div className="mt-8 space-y-8">
      <RecommendedLectureCard diagnosis={diagnosis} status={statusBySlug.get(diagnosis.recommendedLecture.slug) ?? "not-started"} />
      <LectureRoadmap hydrated={hydrated} />

      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
              <Filter className="h-4 w-4 text-slate-500" />
              講義を選ぶ
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              進捗や単元で絞り込めます。迷ったらロードマップ順に進めてください。
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">{filteredLectures.length}講義</span>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition ${
                filter === item.id
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredLectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </section>
    </div>
  );
}

function RecommendedLectureCard({
  diagnosis,
  status,
}: {
  diagnosis: CommonTestLearningDiagnosis;
  status: LectureStatus;
}) {
  const recommendation = diagnosis.recommendedLecture;
  const ctaHref =
    status === "in-progress"
      ? `${recommendation.href}?resume=1`
      : recommendation.href;
  const ctaLabel =
    status === "completed"
      ? "もう一度復習する"
      : status === "in-progress"
        ? "続きから再開"
        : "講義を受ける";

  return (
    <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
      <div className="border-b border-violet-100 bg-violet-50 px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-extrabold text-violet-800">
          <Sparkles className="h-4 w-4" />
          あなたへのおすすめ講義
        </div>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
              推奨{recommendation.estimatedMinutes}分
            </span>
            {recommendation.sourceTagId && (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                {getCommonTestMistakeTagLabel(recommendation.sourceTagId)}対策
              </span>
            )}
          </div>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950">
            {recommendation.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {recommendation.reason}
          </p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function LectureRoadmap({ hydrated }: { hydrated: boolean }) {
  const { state } = useAllLectureProgress();
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
          <Compass className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-950">
            数学IA 共通テスト攻略ロードマップ
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            二次関数、確率、図形と計量、図形の性質の順に、失点原因をつぶします。
          </p>
        </div>
      </div>

      <ol className="mt-6 space-y-4">
        {SPECIAL_LECTURE_ROADMAP.map((step, index) => {
          const lecture = lectureBySlug.get(step.slug);
          if (!lecture) return null;
          const summary = summarizeLecture(getLectureEntry(state, lecture.slug), lecture);
          return (
            <li key={step.slug} className="relative grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[42px_1fr_auto] sm:items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-mono text-sm font-extrabold text-blue-700 ring-1 ring-blue-100">
                {index + 1}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-slate-950">{lecture.title}</h3>
                  <StatusPill status={hydrated ? summary.status : "not-started"} />
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600">目的：{step.purpose}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">推奨タイミング：{step.recommendedTiming}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 w-full max-w-[260px] overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${hydrated ? summary.percent : 0}%` }} />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-600">{hydrated ? summary.percent : 0}%</span>
                </div>
              </div>
              <RoadmapCta lecture={lecture} status={hydrated ? summary.status : "not-started"} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function RoadmapCta({ lecture, status }: { lecture: Lecture; status: LectureStatus }) {
  const href =
    status === "in-progress"
      ? `/common-test/lectures/${lecture.slug}?resume=1`
      : `/common-test/lectures/${lecture.slug}`;
  const label =
    status === "completed"
      ? "もう一度復習する"
      : status === "in-progress"
        ? "続きから再開"
        : "講義を受ける";
  return (
    <Link
      href={href}
      aria-label={`${lecture.title}を${label}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
        status === "completed"
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {label}
      {status === "completed" ? <RotateCcw className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}

function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-extrabold text-violet-700 ring-1 ring-violet-100">
            イベント講義
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold text-blue-700 ring-1 ring-blue-100">
            重点講座
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div>
          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-950">
            {lecture.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{lecture.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MetaPill label="科目" value={lecture.subject} />
          <MetaPill label="単元" value={lecture.unit} />
          <MetaPill label="難易度" value={lecture.difficulty} />
          <MetaPill label="推奨" value={`${lecture.recommendedMinutes}分`} />
        </div>

        <div className="flex flex-wrap gap-2">
          {lecture.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
            >
              <Tag className="h-3 w-3 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>

        <LectureCardFooter lecture={lecture} />
      </div>
    </article>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-[10px] font-bold text-slate-500">{label}</div>
      <div className="mt-0.5 truncate text-sm font-extrabold text-slate-900">{value}</div>
    </div>
  );
}

function StatusPill({ status }: { status: LectureStatus }) {
  const meta = {
    "not-started": {
      label: "未開始",
      className: "border-slate-200 bg-white text-slate-500",
      icon: BookOpen,
    },
    "in-progress": {
      label: "受講中",
      className: "border-blue-200 bg-blue-50 text-blue-700",
      icon: Clock,
    },
    completed: {
      label: "完了",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      icon: CheckCircle2,
    },
  }[status];
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${meta.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}

function matchesFilter(
  lecture: Lecture,
  status: LectureStatus,
  filter: LectureFilter,
  recommendedSlug: string,
): boolean {
  if (filter === "all") return true;
  if (filter === "not-started" || filter === "in-progress" || filter === "completed") {
    return status === filter;
  }
  if (filter === "quadratic") return lecture.unit.includes("二次関数");
  if (filter === "probability") return lecture.unit.includes("確率");
  if (filter === "geometry") return lecture.unit.includes("図形");
  if (filter === "risk") {
    return lecture.slug === recommendedSlug || lecture.tags.includes("重点講座");
  }
  return true;
}
