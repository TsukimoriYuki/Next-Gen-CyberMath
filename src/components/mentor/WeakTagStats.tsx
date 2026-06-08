"use client";

interface TagEntry { tag: string; count: number; }

interface WeakTagStatsProps {
  topTags: TagEntry[];
  totalAttempts: number;
  studentCount: number;
  mentorCount: number;
}

export function WeakTagStats({ topTags, totalAttempts, studentCount, mentorCount }: WeakTagStatsProps) {
  const max = topTags[0]?.count ?? 1;

  return (
    <div className="space-y-6">
      {/* 数値サマリ */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "門下生", value: studentCount, accent: "var(--neon-cyan)" },
          { label: "師範", value: mentorCount, accent: "var(--neon-amber)" },
          { label: "模試回数", value: totalAttempts, accent: "var(--neon-magenta)" },
        ].map(({ label, value, accent }) => (
          <div
            key={label}
            className="glass rounded-xl p-4 text-center"
            style={{ borderColor: `color-mix(in oklch, ${accent} 25%, transparent)` }}
          >
            <div className="font-display text-2xl font-extrabold" style={{ color: accent }}>
              {value}
            </div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* 弱点タグバーチャート */}
      {topTags.length === 0 ? (
        <p className="rounded-xl border border-border/50 p-6 text-center text-sm text-muted-foreground">
          まだ模試データがありません。
        </p>
      ) : (
        <div className="space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            弱点タグ Top {topTags.length}
          </h3>
          <div className="space-y-1.5">
            {topTags.map(({ tag, count }) => {
              const pct = Math.round((count / max) * 100);
              return (
                <div key={tag} className="flex items-center gap-3">
                  <span className="w-40 shrink-0 truncate font-mono text-xs text-foreground/80">
                    {tag}
                  </span>
                  <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-secondary/60">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: "color-mix(in oklch, var(--neon-magenta) 65%, transparent)",
                      }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-xs tabular-nums text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
