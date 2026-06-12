"use client";

import { useState, useEffect } from "react";
import { PlusCircle, CheckCircle2, AlertCircle, Loader2, LogIn } from "lucide-react";

export interface ReviewCandidate {
  questionId: string;
  title: string;
  subjectId: string;
  sectionId: string;
  reasonFlags: string[];
  skillTags: string[];
  quadrantLabel: string;
  quadrantColor: string;
}

interface Props {
  candidates: ReviewCandidate[];
  theme: { primary: string; glowRgb: string };
}

type AddStatus = "idle" | "loading" | "added" | "error";

interface CandidateState {
  status: AddStatus;
  errorMsg?: string;
}

export function ReviewQueueRegistrar({ candidates, theme }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [states, setStates] = useState<Record<string, CandidateState>>({});
  const [addingAll, setAddingAll] = useState(false);

  // Check login status
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        setIsLoggedIn(r.ok);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  async function addOne(candidate: ReviewCandidate): Promise<boolean> {
    setStates((prev) => ({
      ...prev,
      [candidate.questionId]: { status: "loading" },
    }));
    try {
      const res = await fetch("/api/review/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "common-test-drill",
          itemId: candidate.questionId,
          subjectId: candidate.subjectId,
          sectionId: candidate.sectionId,
          title: candidate.title,
          source: "common-test-drill",
          reasonFlags: candidate.reasonFlags,
          skillTags: candidate.skillTags,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStates((prev) => ({
          ...prev,
          [candidate.questionId]: {
            status: "error",
            errorMsg: data.error ?? "登録失敗",
          },
        }));
        return false;
      }
      setStates((prev) => ({
        ...prev,
        [candidate.questionId]: { status: "added" },
      }));
      return true;
    } catch {
      setStates((prev) => ({
        ...prev,
        [candidate.questionId]: { status: "error", errorMsg: "ネットワークエラー" },
      }));
      return false;
    }
  }

  async function handleAddAll() {
    setAddingAll(true);
    const pending = candidates.filter(
      (c) => states[c.questionId]?.status !== "added"
    );
    await Promise.allSettled(pending.map((c) => addOne(c)));
    setAddingAll(false);
  }

  if (candidates.length === 0) return null;

  const addedCount = Object.values(states).filter((s) => s.status === "added").length;
  const allAdded = addedCount === candidates.length;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          <h3 className="text-sm font-bold text-slate-900">復習キュー候補</h3>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {isLoggedIn && !allAdded && (
          <button
            type="button"
            onClick={handleAddAll}
            disabled={addingAll}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: theme.primary }}
          >
            {addingAll ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <PlusCircle className="h-3 w-3" />
            )}
            すべて追加
          </button>
        )}
      </div>

      {/* Not logged in */}
      {isLoggedIn === false && (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <LogIn className="h-4 w-4 shrink-0 text-slate-400" />
          <p className="text-xs text-slate-500">
            ログインすると復習キューに保存できます。次回セッション以降も弱点を追跡できます。
          </p>
        </div>
      )}

      {/* All added success */}
      {allAdded && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700">
            {addedCount}件を復習キューに追加しました — 明日以降復習できます
          </span>
        </div>
      )}

      {/* Candidate list */}
      <div className="space-y-2">
        {candidates.map((c) => {
          const st = states[c.questionId] ?? { status: "idle" };
          const isAdded = st.status === "added";
          const isLoading = st.status === "loading";
          const isError = st.status === "error";

          return (
            <div
              key={c.questionId}
              className="flex items-center gap-3 rounded-xl border bg-white p-3"
              style={{ borderColor: isAdded ? "#a7f3d0" : "#e2e8f0", background: isAdded ? "#f0fdf4" : "#ffffff" }}
            >
              {/* Quadrant badge */}
              <div className="h-10 w-1.5 shrink-0 rounded-full" style={{ background: c.quadrantColor }} />

              <div className="min-w-0 flex-1 space-y-1">
                <div className="truncate text-xs font-bold text-slate-700">
                  {c.title}
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                    style={{ color: c.quadrantColor, background: `${c.quadrantColor}15` }}
                  >
                    {c.quadrantLabel}
                  </span>
                  {c.skillTags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400">推奨復習日：明日</div>
              </div>

              {/* Action */}
              {isLoggedIn && (
                <div className="shrink-0">
                  {isAdded ? (
                    <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" />
                      追加済み
                    </div>
                  ) : isError ? (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1.5 text-[10px] text-rose-600">
                        <AlertCircle className="h-3 w-3" />
                        {st.errorMsg}
                      </div>
                      <button
                        type="button"
                        onClick={() => addOne(c)}
                        className="text-[10px] text-slate-400 hover:text-slate-600"
                      >
                        再試行
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addOne(c)}
                      disabled={isLoading}
                      className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-opacity hover:opacity-80 disabled:opacity-50"
                      style={{ background: `${theme.primary}12`, borderColor: `${theme.primary}40`, color: theme.primary }}
                    >
                      {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <PlusCircle className="h-3 w-3" />
                      )}
                      追加
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
