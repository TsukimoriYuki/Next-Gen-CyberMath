// Server Component — 今日の特命ミッションカード
import type { DailyMission } from "@/data/common-test";
import { ArrowRight, Zap, Target, Timer } from "lucide-react";

const DIFFICULTY_META: Record<
  DailyMission["difficulty"],
  { label: string; color: string }
> = {
  STANDARD: { label: "STANDARD", color: "#60a5fa" },
  HARD:     { label: "HARD",     color: "#f59e0b" },
  SPRINT:   { label: "SPRINT",   color: "#f43f5e" },
};

export function CommonTestMissionCard({ mission, index }: { mission: DailyMission; index: number }) {
  const diff = DIFFICULTY_META[mission.difficulty];

  return (
    <div
      className="relative flex flex-col gap-3 rounded-2xl p-5 overflow-hidden"
      style={{
        background: `linear-gradient(145deg, rgba(${hexToRgb(mission.accent)},0.07) 0%, rgba(0,0,0,0.5) 100%)`,
        border: `1px solid rgba(${hexToRgb(mission.accent)},0.22)`,
      }}
    >
      {/* Index badge */}
      <div
        className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold"
        style={{
          background: `rgba(${hexToRgb(mission.accent)},0.14)`,
          border: `1px solid rgba(${hexToRgb(mission.accent)},0.3)`,
          color: mission.accent,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Subject + difficulty */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide"
          style={{
            background: `rgba(${hexToRgb(mission.accent)},0.12)`,
            border: `1px solid rgba(${hexToRgb(mission.accent)},0.28)`,
            color: mission.accent,
          }}
        >
          {mission.subjectLabel}
        </span>
        <span
          className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase"
          style={{
            background: `rgba(${hexToRgb(diff.color)},0.10)`,
            border: `1px solid rgba(${hexToRgb(diff.color)},0.25)`,
            color: diff.color,
          }}
        >
          {diff.label}
        </span>
      </div>

      {/* Mission title */}
      <h3 className="font-display text-sm font-bold leading-snug text-white pr-6">
        {mission.sectionTitle}
      </h3>

      {/* Purpose */}
      <p className="font-mono text-[10px] leading-relaxed text-white/50 flex-1">
        {mission.purpose}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/6">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
          <Timer className="h-3 w-3" />
          推奨 {mission.recommendedMinutes} min
        </div>
        <span
          className="flex items-center gap-1 font-mono text-[9px] font-semibold"
          style={{ color: `rgba(${hexToRgb(mission.accent)},0.8)` }}
        >
          MISSION START
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

// hex → "r,g,b" ヘルパー（CSS color-mix が使えない環境向け）
function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "255,255,255";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}
