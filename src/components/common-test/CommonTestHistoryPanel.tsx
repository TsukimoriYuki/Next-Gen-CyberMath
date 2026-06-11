"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getCommonTestDrillHistory,
  clearCommonTestDrillHistory,
  type CommonTestDrillHistoryItem,
} from "@/lib/common-test-history";
import { CheckCircle2, Clock, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const SUBJECT_LABELS: Record<string, { label: string; color: string; glowRgb: string }> = {
  "math-1a": { label: "数学IA", color: "#60a5fa", glowRgb: "96,165,250" },
  "math-2bc": { label: "数学IIB(C)", color: "#a78bfa", glowRgb: "167,139,250" },
  "english-reading": { label: "英語R", color: "#34d399", glowRgb: "52,211,153" },
};

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function fmtSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function getGradeColor(pct: number): string {
  if (pct >= 90) return "#facc15";
  if (pct >= 75) return "#22c55e";
  if (pct >= 60) return "#38bdf8";
  return "#fb923c";
}

function getGradeLetter(pct: number): string {
  if (pct >= 90) return "S";
  if (pct >= 75) return "A";
  if (pct >= 60) return "B";
  return "C";
}

export function CommonTestHistoryPanel() {
  const [history, setHistory] = useState<CommonTestDrillHistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setHistory(getCommonTestDrillHistory());
  }, []);

  function handleClear() {
    if (confirmClear) {
      clearCommonTestDrillHistory();
      setHistory([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  }

  if (history.length === 0) {
    return (
      <div
        className="rounded-2xl px-6 py-10 text-center"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
          大問別ドリルの履歴はありません
        </p>
        <p className="font-mono text-[11px] leading-relaxed text-white/20">
          大問別演習を解くと、ここに正答率・弱点タグが記録されます。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/common-test/math-1a"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-90"
            style={{ background: "rgba(96,165,250,0.10)", border: "1px solid rgba(96,165,250,0.25)", color: "#60a5fa" }}
          >
            数学IA →
          </Link>
          <Link
            href="/common-test/english-reading"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-90"
            style={{ background: "rgba(52,211,153,0.10)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399" }}
          >
            英語R →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
          {history.length} 件の演習履歴
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] transition-all"
          style={{
            background: confirmClear ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${confirmClear ? "rgba(239,68,68,0.30)" : "rgba(255,255,255,0.10)"}`,
            color: confirmClear ? "#f87171" : "rgba(255,255,255,0.30)",
          }}
        >
          <Trash2 className="h-3 w-3" />
          {confirmClear ? "本当に削除する" : "履歴をクリア"}
        </button>
      </div>

      {/* History list */}
      {history.map((item) => {
        const subj = SUBJECT_LABELS[item.subjectId] ?? {
          label: item.subjectId,
          color: "#ffffff",
          glowRgb: "255,255,255",
        };
        const pct =
          item.totalQuestions > 0
            ? Math.round((item.correctCount / item.totalQuestions) * 100)
            : 0;
        const gradeColor = getGradeColor(pct);
        const grade = getGradeLetter(pct);
        const isExpanded = expandedId === item.id;

        return (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="w-full flex items-center gap-4 p-4 text-left transition-all hover:bg-white/[0.02]"
            >
              {/* Grade */}
              <div
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg font-display text-lg font-extrabold"
                style={{
                  background: `rgba(${gradeColor.slice(1).match(/../g)?.map((h) => parseInt(h, 16)).join(",") ?? "255,255,255"},0.10)`,
                  color: gradeColor,
                  border: `1px solid ${gradeColor}33`,
                }}
              >
                {grade}
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                    style={{
                      background: `rgba(${subj.glowRgb},0.10)`,
                      color: subj.color,
                      border: `1px solid rgba(${subj.glowRgb},0.25)`,
                    }}
                  >
                    {subj.label}
                  </span>
                  <span className="font-mono text-[10px] text-white/50">
                    {item.sectionId.replace("section-", "第")}問
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span style={{ color: gradeColor }}>
                    {item.correctCount}/{item.totalQuestions} ({pct}%)
                  </span>
                  <span className="text-white/30 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {fmtSec(item.totalTimeSec)}
                  </span>
                </div>
              </div>

              {/* Date + expand */}
              <div className="shrink-0 text-right">
                <div className="font-mono text-[9px] text-white/25">
                  {fmtDate(item.finishedAt)}
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-white/25 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/25 shrink-0" />
              )}
            </button>

            {/* Expanded detail */}
            {isExpanded && (
              <div
                className="px-4 pb-4 space-y-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Weak tags */}
                {item.weakSkillTags.length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] text-white/30 uppercase tracking-wider mb-1.5 mt-3">
                      弱点タグ
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.weakSkillTags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded px-1.5 py-0.5 font-mono text-[9px]"
                          style={{
                            background: "rgba(249,115,22,0.08)",
                            border: "1px solid rgba(249,115,22,0.20)",
                            color: "#fb923c",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Danger + careless stats */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <MiniStat
                    label="危険な誤解"
                    value={item.dangerousMisunderstandingQuestionIds.length}
                    color="#ef4444"
                  />
                  <MiniStat
                    label="ラッキー正解"
                    value={item.guessedCorrectQuestionIds.length}
                    color="#a78bfa"
                  />
                  <MiniStat
                    label="時間超過"
                    value={item.overTimeQuestionIds.length}
                    color="#fbbf24"
                  />
                  <MiniStat
                    label="ケアレス"
                    value={item.carelessMistakeQuestionIds.length}
                    color="#f97316"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className="rounded-lg p-2 text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="font-mono text-[8px] text-white/30">{label}</div>
      <div className="font-mono text-lg font-bold mt-0.5" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
