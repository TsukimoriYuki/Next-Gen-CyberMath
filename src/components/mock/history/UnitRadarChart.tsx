import { Radar } from "lucide-react";
import type { UnitStat } from "@/lib/history";

interface Props {
  stats: UnitStat[];
  headingLevel?: 2 | 3 | 4;
}

const SIZE = 320;
const CX = SIZE / 2;
const CY = 158;
const R = 104;

function point(angle: number, radius: number): [number, number] {
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
}

export function UnitRadarChart({ stats, headingLevel = 2 }: Props) {
  // 出題のあった単元のみ。レーダーは軸が多すぎると潰れるので最大 8。
  const data = stats.filter((s) => s.attempted > 0).slice(0, 8);
  const n = data.length;
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Heading className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-950">
        <Radar className="h-5 w-5 text-blue-700" />
        単元別の正答率
      </Heading>

      {n < 3 ? (
        // 軸が 3 未満ではレーダーが作れないので棒で代替
        <div className="space-y-2 py-2">
          {n === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              データがありません。
            </p>
          ) : (
            data.map((s) => (
              <div key={s.unit}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{s.unit}</span>
                  <span className="font-semibold text-blue-700">{s.correctPct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${s.correctPct}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto w-full max-w-[340px]"
          role="img"
          aria-label="単元別正答率のレーダーチャート"
        >
          {/* 同心の目盛り環 25/50/75/100 */}
          {[25, 50, 75, 100].map((ring) => {
            const pts = data
              .map((_, i) => {
                const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
                const [px, py] = point(a, (R * ring) / 100);
                return `${px},${py}`;
              })
              .join(" ");
            return (
              <polygon
                key={ring}
                points={pts}
                fill="none"
                stroke="var(--border)"
                strokeWidth={1}
              />
            );
          })}

          {/* 軸線とラベル */}
          {data.map((s, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
            const [ax, ay] = point(a, R);
            const [lx, ly] = point(a, R + 16);
            return (
              <g key={s.unit}>
                <line
                  x1={CX}
                  y1={CY}
                  x2={ax}
                  y2={ay}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={Math.abs(Math.cos(a)) < 0.3 ? "middle" : lx > CX ? "start" : "end"}
                  fontSize={12}
                  fill="var(--muted-foreground)"
                >
                  {s.unit}
                </text>
              </g>
            );
          })}

          {/* 値ポリゴン */}
          <polygon
            points={data
              .map((s, i) => {
                const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
                const [px, py] = point(a, (R * s.correctPct) / 100);
                return `${px},${py}`;
              })
              .join(" ")}
            fill="rgba(37, 99, 235, 0.18)"
            stroke="#2563eb"
            strokeWidth={2}
          />
          {/* 値の頂点 */}
          {data.map((s, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
            const [px, py] = point(a, (R * s.correctPct) / 100);
            return (
              <circle key={s.unit} cx={px} cy={py} r={3} fill="#047857" />
            );
          })}
        </svg>
      )}
      {n >= 3 ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-label="単元別正答率の数値一覧">
          {data.map((stat) => (
            <li
              key={stat.unit}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <span className="font-medium text-slate-700">{stat.unit}</span>
              <span className="font-bold text-blue-800">{stat.correctPct}%</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
