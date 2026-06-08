"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import type { TrendPoint } from "@/lib/history";

interface Props {
  points: TrendPoint[];
}

// レイアウト定数（viewBox 座標）
const W = 600;
const H = 260;
const PAD_L = 38;
const PAD_R = 16;
const PAD_T = 18;
const PAD_B = 30;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

export function ScoreTrendChart({ points }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const n = points.length;
  const x = (i: number) =>
    PAD_L + (n <= 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W);
  const y = (pct: number) => PAD_T + (1 - pct / 100) * PLOT_H;

  const linePts = points.map((p, i) => `${x(i)},${y(p.scorePct)}`).join(" ");
  const gridVals = [0, 25, 50, 75, 100];

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold tracking-wide">
        <TrendingUp className="h-4 w-4 text-neon-cyan" />
        スコアの推移
      </h2>

      {n === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          データがありません。
        </p>
      ) : (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="スコア推移の折れ線グラフ"
        >
          {/* grid + y labels */}
          {gridVals.map((v) => (
            <g key={v}>
              <line
                x1={PAD_L}
                y1={y(v)}
                x2={W - PAD_R}
                y2={y(v)}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={PAD_L - 6}
                y={y(v) + 3}
                textAnchor="end"
                fontSize={10}
                fill="var(--muted-foreground)"
                fontFamily="var(--font-mono, monospace)"
              >
                {v}
              </text>
            </g>
          ))}

          {/* line */}
          {n > 1 && (
            <polyline
              points={linePts}
              fill="none"
              stroke="var(--neon-cyan)"
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}

          {/* points + hover hit-area */}
          {points.map((p, i) => (
            <g key={p.date}>
              <circle
                cx={x(i)}
                cy={y(p.scorePct)}
                r={hover === i ? 6 : 4}
                fill="var(--neon-magenta)"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <rect
                x={x(i) - 14}
                y={PAD_T}
                width={28}
                height={PLOT_H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
              {hover === i && (
                <text
                  x={x(i)}
                  y={y(p.scorePct) - 12}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill="var(--foreground)"
                  fontFamily="var(--font-mono, monospace)"
                >
                  {p.scorePct}% ({p.score}/{p.total})
                </text>
              )}
            </g>
          ))}

          {/* x label: first / last 受験 index */}
          <text
            x={x(0)}
            y={H - 8}
            textAnchor="middle"
            fontSize={10}
            fill="var(--muted-foreground)"
            fontFamily="var(--font-mono, monospace)"
          >
            1回目
          </text>
          {n > 1 && (
            <text
              x={x(n - 1)}
              y={H - 8}
              textAnchor="middle"
              fontSize={10}
              fill="var(--muted-foreground)"
              fontFamily="var(--font-mono, monospace)"
            >
              {n}回目
            </text>
          )}
        </svg>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        点にカーソルを合わせると各回のスコアが表示されます。
      </p>
    </section>
  );
}
