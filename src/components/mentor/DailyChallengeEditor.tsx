"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarDays, Save, Loader2, CheckCircle2, XCircle, Search } from "lucide-react";
import type { Problem } from "@/lib/types";

interface SlotEntry {
  slot: number;
  problem: { slug: string; title: string; unit: string; difficulty: string };
}

interface DailyChallengeEditorProps {
  allProblems: Pick<Problem, "slug" | "title" | "unit" | "difficulty" | "tags">[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function diffColor(d: string): string {
  const map: Record<string, string> = {
    A: "var(--neon-lime)",
    B: "var(--neon-cyan)",
    C: "var(--neon-violet)",
    D: "var(--neon-amber)",
    S: "var(--neon-magenta)",
  };
  return map[d] ?? "var(--muted-foreground)";
}

export function DailyChallengeEditor({ allProblems }: DailyChallengeEditorProps) {
  const [date, setDate] = useState(today());
  const [slugs, setSlugs] = useState<[string, string, string]>(["", "", ""]);
  const [queries, setQueries] = useState<[string, string, string]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  const fetchForDate = useCallback(async (d: string) => {
    setFetching(true);
    setStatus("idle");
    try {
      const res = await fetch(`/api/mentor/daily?date=${d}`);
      const data = await res.json();
      if (data.ok && Array.isArray(data.challenges)) {
        const next: [string, string, string] = ["", "", ""];
        (data.challenges as SlotEntry[]).forEach(({ slot, problem }) => {
          if (slot >= 1 && slot <= 3) next[slot - 1] = problem.slug;
        });
        setSlugs(next);
        setQueries(next.map((s) => s) as [string, string, string]);
      } else {
        setSlugs(["", "", ""]);
        setQueries(["", "", ""]);
      }
    } catch {
      setSlugs(["", "", ""]);
      setQueries(["", "", ""]);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchForDate(date); }, [date, fetchForDate]);

  async function handleSave() {
    if (slugs.some((s) => !s)) {
      setErrMsg("3問すべてを選択してください");
      setStatus("err");
      return;
    }
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/mentor/daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, slugs }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
      } else {
        setErrMsg(data.error ?? "保存に失敗しました");
        setStatus("err");
      }
    } catch {
      setErrMsg("通信エラーが発生しました");
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  function filtered(q: string) {
    if (!q) return allProblems.slice(0, 12);
    const lq = q.toLowerCase();
    return allProblems
      .filter(
        (p) =>
          p.slug.includes(lq) ||
          p.title.toLowerCase().includes(lq) ||
          p.unit.toLowerCase().includes(lq) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(lq)),
      )
      .slice(0, 12);
  }

  return (
    <div className="space-y-6">
      {/* 日付選択 */}
      <div className="flex items-center gap-3">
        <CalendarDays className="h-4 w-4 text-neon-cyan" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-border bg-white/60 px-4 py-2 font-mono text-sm text-foreground outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30"
        />
        {fetching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>

      {/* 3スロット */}
      <div className="space-y-4">
        {([0, 1, 2] as const).map((i) => {
          const candidates = filtered(queries[i]);
          const selected = allProblems.find((p) => p.slug === slugs[i]);
          return (
            <div key={i} className="glass rounded-2xl p-4">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full font-display text-xs font-bold text-white"
                  style={{ background: "color-mix(in oklch, var(--neon-cyan) 55%, transparent)" }}
                >
                  {i + 1}
                </span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.12em]">
                  スロット {i + 1}
                </span>
              </div>

              {/* 選択済み表示 */}
              {selected && (
                <div
                  className="mb-3 flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm"
                  style={{
                    borderColor: `color-mix(in oklch, ${diffColor(selected.difficulty)} 40%, transparent)`,
                    background: `color-mix(in oklch, ${diffColor(selected.difficulty)} 6%, transparent)`,
                  }}
                >
                  <div className="min-w-0">
                    <span
                      className="mr-2 font-mono text-xs font-bold"
                      style={{ color: diffColor(selected.difficulty) }}
                    >
                      {selected.difficulty}
                    </span>
                    <span className="font-semibold text-foreground">{selected.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{selected.unit}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...slugs] as [string, string, string];
                      const nq = [...queries] as [string, string, string];
                      next[i] = "";
                      nq[i] = "";
                      setSlugs(next);
                      setQueries(nq);
                    }}
                    className="ml-2 shrink-0 text-muted-foreground hover:text-neon-magenta"
                    aria-label="選択を解除"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* 検索 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="search"
                  placeholder="タイトル・単元・タグで検索..."
                  value={queries[i]}
                  onChange={(e) => {
                    const nq = [...queries] as [string, string, string];
                    nq[i] = e.target.value;
                    setQueries(nq);
                  }}
                  className="w-full rounded-xl border border-border bg-white/60 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/25"
                />
              </div>

              {/* 候補リスト */}
              <div className="mt-2 max-h-44 space-y-1 overflow-y-auto">
                {candidates.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => {
                      const next = [...slugs] as [string, string, string];
                      const nq = [...queries] as [string, string, string];
                      next[i] = p.slug;
                      nq[i] = p.slug;
                      setSlugs(next);
                      setQueries(nq);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                  >
                    <span
                      className="shrink-0 font-mono text-xs font-bold"
                      style={{ color: diffColor(p.difficulty) }}
                    >
                      {p.difficulty}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                      {p.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">{p.unit}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ステータス */}
      {status === "ok" && (
        <div className="flex items-center gap-2 rounded-xl border border-neon-lime/40 bg-neon-lime/8 px-4 py-3 text-sm text-neon-lime">
          <CheckCircle2 className="h-4 w-4" /> 挑戦状をセットしました
        </div>
      )}
      {status === "err" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          <XCircle className="h-4 w-4" /> {errMsg}
        </div>
      )}

      {/* 保存ボタン */}
      <button
        type="button"
        onClick={handleSave}
        disabled={loading || slugs.some((s) => !s)}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-bold transition-colors disabled:opacity-50"
        style={{
          background: "color-mix(in oklch, var(--neon-amber) 15%, transparent)",
          border: "1px solid color-mix(in oklch, var(--neon-amber) 45%, transparent)",
          color: "var(--neon-amber)",
        }}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {loading ? "保存中..." : "挑戦状をセット"}
      </button>
    </div>
  );
}
