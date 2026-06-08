import { Sparkles, ListChecks, Target, Timer } from "lucide-react";
import { type HistorySummary, formatDuration } from "@/lib/history";

interface Props {
  summary: HistorySummary;
}

export function SummaryCards({ summary }: Props) {
  const cards = [
    {
      label: "総受験回数",
      value: `${summary.attempts}`,
      unit: "回",
      icon: Sparkles,
      accent: "var(--neon-cyan)",
    },
    {
      label: "総解答問題数",
      value: `${summary.totalAnswered}`,
      unit: "問",
      icon: ListChecks,
      accent: "var(--neon-violet)",
    },
    {
      label: "平均スコア",
      value: `${summary.avgScorePct}`,
      unit: "%",
      icon: Target,
      accent: "var(--neon-magenta)",
    },
    {
      label: "累計学習時間",
      value: formatDuration(summary.totalTimeSec),
      unit: "",
      icon: Timer,
      accent: "var(--neon-amber)",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="glass rounded-2xl p-4"
            style={{ borderColor: `color-mix(in oklch, ${c.accent} 30%, transparent)` }}
          >
            <div className="mb-2 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Icon className="h-3.5 w-3.5" style={{ color: c.accent }} />
              {c.label}
            </div>
            <div className="font-display text-2xl font-extrabold" style={{ color: c.accent }}>
              {c.value}
              {c.unit && <span className="ml-0.5 text-sm font-bold">{c.unit}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
