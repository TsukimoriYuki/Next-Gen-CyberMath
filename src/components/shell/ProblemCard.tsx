import Link from "next/link";
import { ArrowUpRight, Clock3, FlaskConical } from "lucide-react";
import type { Problem } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-offset-4"
    >
      <div className="flex items-center justify-between">
        <DifficultyBadge difficulty={problem.difficulty} withName />
        <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-blue-700" aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold leading-snug text-slate-950">
        {problem.title}
      </h3>

      {problem.tagline && (
        <p className="text-sm leading-6 text-slate-600">
          {problem.tagline}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 pt-1 text-sm text-slate-600">
        <span>
          {problem.unit}
        </span>
        {problem.hasGraph && (
          <span className="inline-flex items-center gap-1 text-blue-700">
            <FlaskConical className="h-4 w-4" aria-hidden="true" />
            グラフあり
          </span>
        )}
      </div>

      {problem.unitPractice && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
          <span>{formatPracticeType(problem.unitPractice.questionType)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {formatSeconds(problem.unitPractice.estimatedTime)}
          </span>
        </div>
      )}

    </Link>
  );
}

function formatPracticeType(type: NonNullable<Problem["unitPractice"]>["questionType"]) {
  return ({
    "single-choice": "単一選択",
    numeric: "数値入力",
    "multiple-select": "複数選択",
    matching: "対応選択",
    ordering: "並べ替え",
    "table-reading": "表の読み取り",
  } as const)[type];
}

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0
    ? `${minutes}分${remainder ? `${remainder}秒` : ""}`
    : `${seconds}秒`;
}
