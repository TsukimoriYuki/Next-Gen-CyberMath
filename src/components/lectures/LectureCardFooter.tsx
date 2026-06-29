"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  RotateCcw,
} from "lucide-react";
import type { Lecture } from "@/data/specialLectures";
import { useAllLectureProgress } from "@/hooks/useLectureProgress";
import { getLectureEntry, summarizeLecture } from "@/lib/lecture-progress";

// 講義一覧カードのフッター。進捗率と、状態に応じた導線（受ける/再開/復習）を出す。
export function LectureCardFooter({ lecture }: { lecture: Lecture }) {
  const { hydrated, state } = useAllLectureProgress();
  const summary = summarizeLecture(getLectureEntry(state, lecture.slug), lecture);
  const status = hydrated ? summary.status : "not-started";

  const cta = {
    "not-started": {
      label: "講義を受ける",
      href: `/common-test/lectures/${lecture.slug}`,
      icon: BookOpen,
      className: "bg-blue-600 text-white hover:bg-blue-700",
    },
    "in-progress": {
      label: "続きから再開",
      href: `/common-test/lectures/${lecture.slug}?resume=1`,
      icon: ArrowRight,
      className: "bg-blue-600 text-white hover:bg-blue-700",
    },
    completed: {
      label: "もう一度復習する",
      href: `/common-test/lectures/${lecture.slug}`,
      icon: RotateCcw,
      className: "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    },
  }[status];
  const CtaIcon = cta.icon;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
      {hydrated && status !== "not-started" && (
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500">
              {status === "completed" ? "受講完了" : "受講中"}
            </span>
            <span className="font-mono font-bold text-slate-700">
              {summary.percent}%
              <span className="ml-1.5 font-sans font-medium text-slate-400">
                {summary.completedCount}/{summary.totalCount}
              </span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${status === "completed" ? "bg-emerald-500" : "bg-blue-500"}`}
              style={{ width: `${summary.percent}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />1講座 {lecture.recommendedMinutes}分
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {lecture.publishedAt}
          </span>
        </div>
        <Link
          href={cta.href}
          aria-label={`${lecture.title}を${cta.label}`}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${cta.className}`}
        >
          {cta.label}
          <CtaIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
