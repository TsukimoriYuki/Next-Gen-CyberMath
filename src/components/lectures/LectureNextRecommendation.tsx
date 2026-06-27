"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, GraduationCap, RotateCcw } from "lucide-react";
import {
  SPECIAL_LECTURE_ROADMAP,
  SPECIAL_LECTURES,
  type Lecture,
} from "@/data/specialLectures";
import { useAllLectureProgress } from "@/hooks/useLectureProgress";
import { getLectureEntry, summarizeLecture, type LectureStatus } from "@/lib/lecture-progress";

const lectureBySlug = new Map(SPECIAL_LECTURES.map((lecture) => [lecture.slug, lecture]));

export function LectureNextRecommendation({ currentSlug }: { currentSlug: string }) {
  const { hydrated, state } = useAllLectureProgress();
  const orderedLectures = SPECIAL_LECTURE_ROADMAP.map((step) => lectureBySlug.get(step.slug)).filter(
    (lecture): lecture is Lecture => Boolean(lecture),
  );
  const currentIndex = orderedLectures.findIndex((lecture) => lecture.slug === currentSlug);
  const afterCurrent = currentIndex >= 0 ? orderedLectures.slice(currentIndex + 1) : orderedLectures;
  const beforeAndCurrent = currentIndex >= 0 ? orderedLectures.slice(0, currentIndex + 1) : [];
  const candidates = [...afterCurrent, ...beforeAndCurrent].filter((lecture) => lecture.slug !== currentSlug);
  const next =
    candidates.find((lecture) => summarizeLecture(getLectureEntry(state, lecture.slug), lecture).status !== "completed") ??
    candidates[0];

  if (!next) return null;

  const summary = summarizeLecture(getLectureEntry(state, next.slug), next);
  const status = hydrated ? summary.status : "not-started";
  const roadmapStep = SPECIAL_LECTURE_ROADMAP.find((step) => step.slug === next.slug);

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
      <div className="border-b border-violet-100 bg-violet-50 px-5 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-extrabold text-violet-800">
          <GraduationCap className="h-4 w-4" />
          次におすすめ
        </div>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={status} />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
              推奨{next.recommendedMinutes}分
            </span>
          </div>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950">
            {next.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {roadmapStep?.purpose ?? next.description}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${status === "completed" ? "bg-emerald-500" : "bg-violet-500"}`}
                style={{ width: `${hydrated ? summary.percent : 0}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-slate-600">
              {hydrated ? summary.percent : 0}%
            </span>
          </div>
        </div>
        <Link
          href={status === "in-progress" ? `/common-test/lectures/${next.slug}?resume=1` : `/common-test/lectures/${next.slug}`}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
            status === "completed"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          {status === "completed" ? "もう一度復習する" : status === "in-progress" ? "続きから再開" : "講義を受ける"}
          {status === "completed" ? <RotateCcw className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </Link>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: LectureStatus }) {
  const meta = {
    "not-started": {
      label: "未開始",
      className: "border-slate-200 bg-slate-50 text-slate-600",
      icon: Clock,
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
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${meta.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}
