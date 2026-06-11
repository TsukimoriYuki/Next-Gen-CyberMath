"use client";

// 目標点の設定・保存つきスコアトラッカー（司令室用）
import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import {
  COMMON_TEST_SUBJECTS,
  type CommonTestSubjectId,
} from "@/data/common-test";
import {
  getCommonTestTargetScores,
  saveCommonTestTargetScores,
  normalizeTargetScore,
  type CommonTestTargetScores,
} from "@/lib/common-test-targets";

export function CommonTestTargetScorePanel() {
  const [targets, setTargets] = useState<CommonTestTargetScores>({});
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<"saved" | "error" | null>(null);

  useEffect(() => {
    setTargets(getCommonTestTargetScores());
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  const targetOf = (id: CommonTestSubjectId, fallback: number) =>
    targets[id] ?? fallback;

  function startEdit() {
    const d: Record<string, string> = {};
    for (const s of COMMON_TEST_SUBJECTS) {
      d[s.id] = String(targetOf(s.id, s.targetScoreDefault));
    }
    setDraft(d);
    setEditing(true);
  }

  function handleSave() {
    const next: CommonTestTargetScores = { ...targets };
    for (const s of COMMON_TEST_SUBJECTS) {
      const v = normalizeTargetScore(draft[s.id]);
      if (v === null) {
        setFeedback("error");
        return;
      }
      next[s.id] = v;
    }
    if (saveCommonTestTargetScores(next)) {
      setTargets(next);
      setEditing(false);
      setFeedback("saved");
    } else {
      setFeedback("error");
    }
  }

  const totalTarget = COMMON_TEST_SUBJECTS.reduce(
    (sum, s) => sum + targetOf(s.id, s.targetScoreDefault),
    0
  );
  const totalEstimate = COMMON_TEST_SUBJECTS.reduce(
    (sum, s) => sum + s.estimatedScoreMock,
    0
  );
  const totalGap = totalTarget - totalEstimate;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Panel header */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-5 py-3"
        style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          ◈ System Status — Score Tracker
        </span>
        <div className="flex items-center gap-3">
          {feedback === "saved" && (
            <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400">
              <Check className="h-3 w-3" />
              目標点を保存しました
            </span>
          )}
          {feedback === "error" && (
            <span className="font-mono text-[10px] font-bold text-red-400">
              0〜100の数値を入力してください
            </span>
          )}
          <span
            className="font-mono text-[10px] font-bold"
            style={{ color: totalGap <= 30 ? "#34d399" : "#f59e0b" }}
          >
            合計目標 {totalTarget}点 ／ 推定 {totalEstimate}点
          </span>
          {editing ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold transition-all hover:opacity-80"
                style={{
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.35)",
                  color: "#34d399",
                }}
              >
                <Check className="h-3 w-3" />
                保存
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[9px] transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                <X className="h-3 w-3" />
                取消
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startEdit}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[9px] transition-all hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <Pencil className="h-3 w-3" />
              目標点を設定
            </button>
          )}
        </div>
      </div>

      {/* Subject status grid */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 sm:divide-x divide-white/5">
        {COMMON_TEST_SUBJECTS.map((subject) => {
          const { theme, shortTitle, title, estimatedScoreMock } = subject;
          const target = targetOf(subject.id, subject.targetScoreDefault);
          const pct =
            target > 0
              ? Math.min(100, Math.round((estimatedScoreMock / target) * 100))
              : 100;
          const gap = target - estimatedScoreMock;

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
                {editing ? (
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft[subject.id] ?? ""}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [subject.id]: e.target.value }))
                    }
                    className="w-16 rounded-md px-2 py-0.5 font-mono text-sm font-semibold text-white outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid rgba(${theme.glowRgb},0.45)`,
                    }}
                    aria-label={`${title}の目標点`}
                  />
                ) : (
                  <span className="font-mono text-sm font-semibold text-white/55">{target}</span>
                )}
                <span className="font-mono text-[10px] text-white/35">点</span>
                <span
                  className="ml-auto font-mono text-[10px] font-bold"
                  style={{
                    color: gap <= 0 ? "#34d399" : gap <= 10 ? "#34d399" : gap <= 20 ? "#60a5fa" : "#f59e0b",
                  }}
                >
                  {gap <= 0 ? "目標達成圏" : `あと ${gap}点`}
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

              <div className="mt-1 font-mono text-[9px] text-white/25 text-right">
                {pct}% of target
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
