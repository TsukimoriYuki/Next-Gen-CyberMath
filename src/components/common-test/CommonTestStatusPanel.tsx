// Server Component — mock データでステータスを表示（Phase 1）
import { COMMON_TEST_SUBJECTS } from "@/data/common-test";

export function CommonTestStatusPanel() {
  const totalTarget = COMMON_TEST_SUBJECTS.reduce((s, x) => s + x.targetScoreDefault, 0);
  const totalEstimate = COMMON_TEST_SUBJECTS.reduce((s, x) => s + x.estimatedScoreMock, 0);
  const totalGap = totalTarget - totalEstimate;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-[10px] font-bold text-white/60">
          目標点との差
        </span>
        <span
          className="font-mono text-[10px] font-bold"
          style={{ color: totalGap <= 30 ? "#34d399" : "#f59e0b" }}
        >
          合計目標 {totalTarget}点 ／ 推定 {totalEstimate}点
        </span>
      </div>

      {/* Subject status grid */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 sm:divide-x divide-white/5">
        {COMMON_TEST_SUBJECTS.map((subject) => {
          const { theme, shortTitle, title, targetScoreDefault, estimatedScoreMock } = subject;
          const pct = Math.min(100, Math.round((estimatedScoreMock / targetScoreDefault) * 100));
          const gap = targetScoreDefault - estimatedScoreMock;

          return (
            <div key={subject.id} className="px-5 py-4">
              {/* Subject label */}
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-display text-sm font-extrabold" style={{ color: theme.primary }}>
                  {shortTitle}
                </span>
                <span className="font-mono text-[10px] text-white/35">{title}</span>
              </div>

              {/* Score row */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-mono text-xl font-bold text-white">{estimatedScoreMock}</span>
                <span className="font-mono text-xs text-white/35">／</span>
                <span className="font-mono text-sm font-semibold text-white/55">{targetScoreDefault}</span>
                <span className="font-mono text-[10px] text-white/35">点</span>
                <span
                  className="ml-auto font-mono text-[10px] font-bold"
                  style={{ color: gap <= 10 ? "#34d399" : gap <= 20 ? "#60a5fa" : "#f59e0b" }}
                >
                  あと {gap}点
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, rgba(${theme.glowRgb},0.7), rgba(${theme.glowRgb},1))`,
                    boxShadow: `0 0 8px rgba(${theme.glowRgb},0.6)`,
                  }}
                />
              </div>

              <div className="mt-1 text-right font-mono text-[9px] text-white/25">
                目標到達率 {pct}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
