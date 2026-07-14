"use client";

import { useMemo } from "react";
import type { EnglishAttempt } from "@/lib/english-history";
import { getJstCalendarDate, shiftCalendarDate } from "@/lib/jst-calendar-date";

interface MathAttempt {
  createdAt: string;
}

interface Props {
  mathAttempts: MathAttempt[];
  englishAttempts: EnglishAttempt[];
}

function toDateKey(iso: string): string {
  return getJstCalendarDate(iso);
}

export function LearningCalendar({ mathAttempts, englishAttempts }: Props) {
  const { cells, maxCount, streak, totalDays } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of mathAttempts) counts.set(toDateKey(a.createdAt), (counts.get(toDateKey(a.createdAt)) ?? 0) + 1);
    for (const a of englishAttempts) counts.set(toDateKey(a.completedAt), (counts.get(toDateKey(a.completedAt)) ?? 0) + 1);

    // 今日から過去 105 日 (15 週) 分のセルを生成
    const today = getJstCalendarDate();
    const DAYS = 105;
    const cells: { date: string; count: number }[] = [];
    for (let i = DAYS - 1; i >= 0; i--) {
      const key = shiftCalendarDate(today, -i);
      cells.push({ date: key, count: counts.get(key) ?? 0 });
    }

    const max = Math.max(1, ...cells.map((c) => c.count));

    // 連続学習日数（今日から遡る）
    let s = 0;
    for (let i = cells.length - 1; i >= 0; i--) {
      if (cells[i].count > 0) s++;
      else break;
    }

    const total = cells.filter((c) => c.count > 0).length;
    return { cells, maxCount: max, streak: s, totalDays: total };
  }, [mathAttempts, englishAttempts]);

  function cellColor(count: number): string {
    if (count === 0) return "rgba(255,255,255,0.05)";
    const ratio = count / maxCount;
    if (ratio < 0.3) return "rgba(0,210,255,0.25)";
    if (ratio < 0.6) return "rgba(0,210,255,0.5)";
    if (ratio < 0.9) return "rgba(0,210,255,0.75)";
    return "rgba(0,210,255,1)";
  }

  // 15 週 × 7 日 のグリッド（列=週、行=曜日）
  const weeks: { date: string; count: number }[][] = [];
  for (let w = 0; w < 15; w++) {
    weeks.push(cells.slice(w * 7, w * 7 + 7));
  }

  const dayLabels = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          学習カレンダー · 直近 15 週
        </span>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div
              className="font-display text-xl font-extrabold tabular-nums"
              style={{ color: streak > 0 ? "#f59e0b" : "rgba(255,255,255,0.2)" }}
            >
              {streak}
            </div>
            <div className="font-mono text-[10px] text-white/30">連続日数</div>
          </div>
          <div className="text-center">
            <div className="font-display text-xl font-extrabold tabular-nums text-white/70">
              {totalDays}
            </div>
            <div className="font-mono text-[10px] text-white/30">活動日数</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex gap-0.5 overflow-x-auto pb-1">
        {/* Day labels */}
        <div className="mr-1 flex flex-col gap-0.5 pt-5">
          {dayLabels.map((d, i) => (
            <div
              key={d}
              className="flex h-3 items-center font-mono text-[9px] text-white/20"
              style={{ visibility: i % 2 === 0 ? "visible" : "hidden" }}
            >
              {d}
            </div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {/* Month label above first day of month */}
            <div className="h-4 font-mono text-[9px] text-white/25">
              {week[0]?.date.slice(8) === "01" ? week[0].date.slice(5, 7) + "/" : ""}
            </div>
            {week.map((cell) => (
              <div
                key={cell.date}
                title={`${cell.date}：${cell.count}回`}
                className="h-3 w-3 rounded-sm transition-all duration-200"
                style={{ background: cellColor(cell.count) }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="font-mono text-[10px] text-white/25">少</span>
        {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-sm"
            style={{ background: cellColor(i === 0 ? 0 : Math.ceil(r * maxCount)) }}
          />
        ))}
        <span className="font-mono text-[10px] text-white/25">多</span>
      </div>
    </div>
  );
}
