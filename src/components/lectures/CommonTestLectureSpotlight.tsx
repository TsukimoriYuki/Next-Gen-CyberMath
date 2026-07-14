"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PUBLIC_SPECIAL_LECTURES } from "@/data/specialLectures";
import { useAllLectureProgress } from "@/hooks/useLectureProgress";
import { getLectureEntry, summarizeLecture } from "@/lib/lecture-progress";
import { MASTERY_LECTURE_GUIDES } from "@/lib/special-lecture-guidance";

// /common-test の特別講義枠。受講中の講義があれば進捗と再開導線を出し、
// なければ既存の「講義を開く」導線をそのまま表示する。
export function CommonTestLectureSpotlight() {
  const { hydrated, state } = useAllLectureProgress();

  // 受講中（in-progress）のうち、最後に開いた講義を優先表示する。
  const active = hydrated
    ? PUBLIC_SPECIAL_LECTURES.map((lecture) => ({
        lecture,
        summary: summarizeLecture(getLectureEntry(state, lecture.slug), lecture),
      }))
        .filter((item) => item.summary.status === "in-progress")
        .sort(
          (a, b) => (b.summary.lastAccessedAt ?? 0) - (a.summary.lastAccessedAt ?? 0),
        )[0]
    : undefined;

  if (active) {
    const { lecture, summary } = active;
    return (
      <div className="space-y-3">
        <Link
          href={`/common-test/lectures/${lecture.slug}?resume=1`}
          className="group flex flex-col gap-4 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-md sm:flex-row sm:items-center"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-100">
            <GraduationCap className="h-5 w-5 text-violet-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-violet-600">受講中</div>
            <div className="truncate text-base font-extrabold text-slate-950">{lecture.title}</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${summary.percent}%` }}
                />
              </div>
              <span className="shrink-0 font-mono text-xs font-bold text-slate-600">
                進捗 {summary.percent}%
              </span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white transition group-hover:bg-violet-700">
            続きから再開
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
        <MasteryLectureMiniGrid />
      </div>
    );
  }

  // 未開始（または完了済みのみ）: 満点講義への導線を表示する。
  return (
    <div className="space-y-3">
      <Link
        href="/common-test/lectures"
        className="group flex flex-col gap-4 rounded-2xl border border-violet-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-md sm:flex-row sm:items-center"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-100">
          <GraduationCap className="h-5 w-5 text-violet-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-extrabold text-slate-950">満点講義で判別力を鍛える</div>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            図形・二次関数・確率の「何を見たら何を使うか」を、判別フローとドリルで固めます。
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white transition group-hover:bg-violet-700">
          講義を開く
        </span>
      </Link>
      <MasteryLectureMiniGrid />
    </div>
  );
}

function MasteryLectureMiniGrid() {
  const publicLectureSlugs = new Set(
    PUBLIC_SPECIAL_LECTURES.map((lecture) => lecture.slug),
  );
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {MASTERY_LECTURE_GUIDES.filter((guide) =>
        guide.isPublished !== false && publicLectureSlugs.has(guide.lectureSlug),
      ).map((guide) => (
        <Link
          key={guide.lectureSlug}
          href={`/common-test/lectures/${guide.lectureSlug}`}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs transition hover:border-violet-200 hover:bg-violet-50"
        >
          <div className="font-extrabold text-slate-900">{guide.shortTitle}</div>
          <p className="mt-1 line-clamp-2 leading-5 text-slate-500">
            {guide.masteryFocus}
          </p>
        </Link>
      ))}
    </div>
  );
}
