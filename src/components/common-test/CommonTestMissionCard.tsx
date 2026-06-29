import Link from "next/link";
import { ArrowRight, Timer } from "lucide-react";
import type { DailyMission } from "@/data/common-test";

const DIFFICULTY_META: Record<
  DailyMission["difficulty"],
  { label: string; color: string; bg: string }
> = {
  STANDARD: { label: "標準", color: "#2563eb", bg: "#eff6ff" },
  HARD: { label: "発展", color: "#d97706", bg: "#fffbeb" },
  SPRINT: { label: "速習", color: "#e11d48", bg: "#fff1f2" },
};

export function CommonTestMissionCard({ mission, index }: { mission: DailyMission; index: number }) {
  const diff = DIFFICULTY_META[mission.difficulty];

  return (
    <Link
      href={mission.href}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
    >
      <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold text-slate-400 ring-1 ring-slate-200">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-bold"
          style={{ background: `${mission.accent}14`, color: mission.accent }}
        >
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: mission.accent }} />
          {mission.subjectLabel}
        </span>
        <span
          className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
          style={{ background: diff.bg, color: diff.color }}
        >
          {diff.label}
        </span>
      </div>

      <h3 className="pr-6 text-sm font-bold leading-snug text-slate-900">
        {mission.sectionTitle}
      </h3>
      <p className="flex-1 text-xs leading-relaxed text-slate-500">{mission.purpose}</p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Timer className="h-3.5 w-3.5" />
          推奨 {mission.recommendedMinutes}分
        </div>
        <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-all group-hover:gap-2.5">
          練習を始める
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
