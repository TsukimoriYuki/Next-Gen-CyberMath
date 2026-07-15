"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import type { TrendPoint } from "@/lib/history";

interface Props {
  points: TrendPoint[];
  headingLevel?: 2 | 3 | 4;
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

export function ScoreTrendChart({ points, headingLevel = 2 }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  const n = points.length;
  const x = (i: number) =>
    PAD_L + (n <= 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W);
  const y = (pct: number) => PAD_T + (1 - pct / 100) * PLOT_H;

  const linePts = points.map((p, i) => `${x(i)},${y(p.scorePct)}`).join(" ");
  const gridVals = [0, 25, 50, 75, 100];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Heading className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-950">
        <TrendingUp className="h-5 w-5 text-blue-700" />
        スコアの推移
      </Heading>

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
                fontSize={12}
                fill="var(--muted-foreground)"
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
              stroke="#2563eb"
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
                fill="#047857"
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
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                role="img"
                aria-label={`${i + 1}回目、${p.scorePct}%、${p.score}点／${p.total}点`}
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
            fontSize={12}
            fill="var(--muted-foreground)"
          >
            1回目
          </text>
          {n > 1 && (
            <text
              x={x(n - 1)}
              y={H - 8}
              textAnchor="middle"
              fontSize={12}
              fill="var(--muted-foreground)"
            >
              {n}回目
            </text>
          )}
        </svg>
      )}
      {n > 0 ? (
        <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50">
          <summary className="flex min-h-11 cursor-pointer items-center px-3 py-2 text-sm font-semibold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset">
            各回の得点を表で確認
          </summary>
          <div className="overflow-x-auto border-t border-slate-200 p-3">
            <table className="w-full min-w-80 text-left text-sm">
              <thead>
                <tr className="text-slate-600">
                  <th scope="col" className="px-2 py-1 font-semibold">回</th>
                  <th scope="col" className="px-2 py-1 font-semibold">受験日</th>
                  <th scope="col" className="px-2 py-1 font-semibold">得点</th>
                  <th scope="col" className="px-2 py-1 font-semibold">正答率</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point, index) => (
                  <tr key={`${point.date}-${index}`} className="border-t border-slate-200 text-slate-800">
                    <th scope="row" className="px-2 py-1.5 font-semibold">{index + 1}回目</th>
                    <td className="px-2 py-1.5">{point.date}</td>
                    <td className="px-2 py-1.5">{point.score}/{point.total}点</td>
                    <td className="px-2 py-1.5">{point.scorePct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}
    </section>
  );
}
