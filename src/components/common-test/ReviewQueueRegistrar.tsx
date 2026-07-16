"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  LogIn,
  PlusCircle,
} from "lucide-react";
import {
  getCommonTestMistakeTagLabel,
  getCommonTestRiskMeta,
  type CommonTestMistakeTagId,
  type CommonTestRiskLevel,
} from "@/lib/common-test-history";

export interface ReviewCandidate {
  questionId: string;
  title: string;
  subjectId: string;
  sectionId: string;
  reasonFlags: string[];
  skillTags: string[];
  mistakeTagIds?: CommonTestMistakeTagId[];
  riskLevel?: CommonTestRiskLevel;
  quadrantLabel: string;
  quadrantColor: string;
  itemType?: string;
  source?: string;
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

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setIsLoggedIn(Boolean(data.ok)))
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
          itemType: candidate.itemType ?? "common-test-drill",
          itemId: candidate.questionId,
          subjectId: candidate.subjectId,
          sectionId: candidate.sectionId,
          title: candidate.title,
          source: candidate.source ?? "common-test-drill",
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
            errorMsg: data.error ?? "登録できませんでした",
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
        [candidate.questionId]: {
          status: "error",
          errorMsg: "通信に失敗しました",
        },
      }));
      return false;
    }
  }

  async function handleAddAll() {
    setAddingAll(true);
    const pending = candidates.filter((c) => states[c.questionId]?.status !== "added");
    await Promise.allSettled(pending.map((c) => addOne(c)));
    setAddingAll(false);
  }

  if (candidates.length === 0) return null;

  const addedCount = Object.values(states).filter((s) => s.status === "added").length;
  const allAdded = addedCount === candidates.length;

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-950">復習キュー候補</h3>
          <p className="mt-1 text-sm text-slate-600">
            不安が残る問題をログイン後の復習キューに保存できます。
          </p>
        </div>

        {isLoggedIn && !allAdded && (
          <button
            type="button"
            onClick={handleAddAll}
            disabled={addingAll}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            style={{ background: theme.primary }}
          >
            {addingAll ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            すべて追加
          </button>
        )}
      </div>

      {isLoggedIn === false && (
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <LogIn className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p className="text-sm leading-6 text-slate-600">
            ログインすると復習キューに保存できます。未ログインでも結果と解説はこの画面で確認できます。
          </p>
        </div>
      )}

      {allAdded && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">
            {addedCount}件を復習キューに追加しました。
          </span>
        </div>
      )}

      <div className="space-y-2">
        {candidates.map((candidate) => {
          const state = states[candidate.questionId] ?? { status: "idle" };
          const isAdded = state.status === "added";
          const isLoading = state.status === "loading";
          const isError = state.status === "error";
          const riskMeta = getCommonTestRiskMeta(candidate.riskLevel);

          return (
            <div
              key={candidate.questionId}
              className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center ${
                isAdded
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div
                className="h-2 w-full rounded-full sm:h-10 sm:w-1.5"
                style={{ background: candidate.quadrantColor }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-slate-800">
                  {candidate.title}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{
                      background: `${candidate.quadrantColor}15`,
                      color: candidate.quadrantColor,
                    }}
                  >
                    {candidate.quadrantLabel}
                  </span>
                  {riskMeta && (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-bold ${riskMeta.className}`}
                    >
                      {riskMeta.label}
                    </span>
                  )}
                  {candidate.mistakeTagIds?.slice(0, 3).map((tagId) => (
                    <span
                      key={tagId}
                      className="rounded-full bg-white px-2 py-0.5 text-xs text-rose-600 ring-1 ring-rose-100"
                    >
                      {getCommonTestMistakeTagLabel(tagId)}
                    </span>
                  ))}
                  {candidate.skillTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {isLoggedIn && (
                <div className="shrink-0">
                  {isAdded ? (
                    <div className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      追加済み
                    </div>
                  ) : isError ? (
                    <div className="space-y-1 text-right">
                      <div className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 ring-1 ring-rose-200">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {state.errorMsg}
                      </div>
                      <button
                        type="button"
                        onClick={() => addOne(candidate)}
                        className="block text-xs font-semibold text-slate-500 hover:text-slate-700"
                      >
                        再試行
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addOne(candidate)}
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition hover:bg-white disabled:opacity-50"
                      style={{
                        borderColor: `rgba(${theme.glowRgb},0.30)`,
                        color: theme.primary,
                        background: `rgba(${theme.glowRgb},0.08)`,
                      }}
                    >
                      {isLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <PlusCircle className="h-3.5 w-3.5" />
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
    </section>
  );
}
