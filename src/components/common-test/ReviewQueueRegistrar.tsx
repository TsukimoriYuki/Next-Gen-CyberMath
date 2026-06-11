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
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: theme.primary }}
          >
            ▸ REVIEW QUEUE CANDIDATES
          </span>
          <div className="flex-1 h-px" style={{ background: `rgba(${theme.glowRgb},0.18)` }} />
        </div>

        {isLoggedIn && !allAdded && (
          <button
            type="button"
            onClick={handleAddAll}
            disabled={addingAll}
            className="shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            style={{
              background: `rgba(${theme.glowRgb},0.12)`,
              border: `1px solid rgba(${theme.glowRgb},0.30)`,
              color: theme.primary,
            }}
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
        <div
          className="flex items-center gap-3 rounded-xl p-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <LogIn className="h-4 w-4 text-white/40 shrink-0" />
          <p className="font-mono text-[10px] text-white/45">
            ログインすると復習キューに保存できます。次回セッション以降も弱点を追跡できます。
          </p>
        </div>
      )}

      {/* All added success */}
      {allAdded && (
        <div
          className="flex items-center gap-2 rounded-xl p-3"
          style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.22)" }}
        >
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
          <span className="font-mono text-[10px] text-green-400 font-bold">
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
              className="flex items-center gap-3 rounded-xl p-3"
              style={{
                background: isAdded
                  ? "rgba(34,197,94,0.05)"
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${isAdded ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.07)"}`,
              }}
            >
              {/* Quadrant badge */}
              <div
                className="shrink-0 w-1.5 h-10 rounded-full"
                style={{ background: c.quadrantColor }}
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-mono text-[10px] font-bold text-white/70 truncate">
                  {c.title}
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase"
                    style={{ color: c.quadrantColor, background: `${c.quadrantColor}15`, border: `1px solid ${c.quadrantColor}30` }}
                  >
                    {c.quadrantLabel}
                  </span>
                  {c.skillTags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded px-1 py-px font-mono text-[8px]"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[8px] text-white/25">推奨復習日：明日</div>
              </div>

              {/* Action */}
              {isLoggedIn && (
                <div className="shrink-0">
                  {isAdded ? (
                    <div
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-mono text-[9px] font-bold"
                      style={{ background: "rgba(34,197,94,0.10)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      ADDED
                    </div>
                  ) : isError ? (
                    <div className="flex flex-col items-end gap-1">
                      <div
                        className="flex items-center gap-1 rounded-lg px-2 py-1.5 font-mono text-[8px]"
                        style={{ background: "rgba(239,68,68,0.10)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }}
                      >
                        <AlertCircle className="h-3 w-3" />
                        {st.errorMsg}
                      </div>
                      <button
                        type="button"
                        onClick={() => addOne(c)}
                        className="font-mono text-[8px] text-white/30 hover:text-white/60"
                      >
                        再試行
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addOne(c)}
                      disabled={isLoading}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                      style={{
                        background: `rgba(${theme.glowRgb},0.10)`,
                        border: `1px solid rgba(${theme.glowRgb},0.28)`,
                        color: theme.primary,
                      }}
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
