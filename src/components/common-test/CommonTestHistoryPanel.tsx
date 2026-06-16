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
  "math-1a": { label: "数学IA", color: "#2563eb", glowRgb: "37,99,235" },
  "math-2bc": { label: "数学IIB(C)", color: "#7c3aed", glowRgb: "124,58,237" },
  "english-reading": { label: "英語R", color: "#059669", glowRgb: "5,150,105" },
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
  if (pct >= 90) return "#ca8a04";
  if (pct >= 75) return "#059669";
  if (pct >= 60) return "#2563eb";
  return "#ea580c";
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
    // localStorage はサーバーに存在しないため、hydration mismatch を避けてマウント後に読む
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
        <p className="mb-2 text-sm font-bold text-slate-700">
          大問別ドリルの履歴はありません
        </p>
        <p className="text-xs leading-relaxed text-slate-500">
          大問別演習を解くと、ここに正答率・弱点タグが記録されます。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/common-test/math-1a"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100"
          >
            数学IA →
          </Link>
          <Link
            href="/common-test/english-reading"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
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
        <span className="text-xs text-slate-500">
          {history.length} 件の演習履歴
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors"
          style={{
            background: confirmClear ? "#fff1f2" : "#ffffff",
            borderColor: confirmClear ? "#fecdd3" : "#e2e8f0",
            color: confirmClear ? "#e11d48" : "#64748b",
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
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-slate-50"
            >
              {/* Grade */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-lg font-extrabold"
                style={{ background: `${gradeColor}14`, color: gradeColor, border: `1px solid ${gradeColor}33` }}
              >
                {grade}
              </div>

              {/* Main info */}
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                    style={{ background: `${subj.color}14`, color: subj.color }}
                  >
                    {subj.label}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.sectionId.replace("section-", "第")}問
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span style={{ color: gradeColor }}>
                    {item.correctCount}/{item.totalQuestions} ({pct}%)
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-3 w-3" />
                    {fmtSec(item.totalTimeSec)}
                  </span>
                </div>
              </div>

              {/* Date + expand */}
              <div className="shrink-0 text-right">
                <div className="font-mono text-[10px] text-slate-400">
                  {fmtDate(item.finishedAt)}
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-slate-300" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-300" />
              )}
            </button>

            {/* Expanded detail */}
            {isExpanded && (
              <div className="space-y-3 border-t border-slate-100 px-4 pb-4">
                {/* Weak tags */}
                {item.weakSkillTags.length > 0 && (
                  <div>
                    <div className="mb-1.5 mt-3 text-[11px] font-bold text-slate-400">
                      弱点タグ
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.weakSkillTags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-700"
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
                    color="#e11d48"
                  />
                  <MiniStat
                    label="ラッキー正解"
                    value={item.guessedCorrectQuestionIds.length}
                    color="#7c3aed"
                  />
                  <MiniStat
                    label="時間超過"
                    value={item.overTimeQuestionIds.length}
                    color="#d97706"
                  />
                  <MiniStat
                    label="ケアレス"
                    value={item.carelessMistakeQuestionIds.length}
                    color="#ea580c"
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
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-center">
      <div className="text-[10px] text-slate-400">{label}</div>
      <div className="mt-0.5 font-mono text-lg font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
