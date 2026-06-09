"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Flame,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Search,
  UserRound,
  ShieldCheck,
  Clock,
} from "lucide-react";
import type { Problem } from "@/lib/types";

interface StudentRow {
  id: string;
  name: string;
  role: string;
}

interface MissionRow {
  id: string;
  problemSlug: string;
  comment: string;
  isCompleted: boolean;
  createdAt: string;
  user: { name: string };
}

interface Props {
  students: StudentRow[];
  allProblems: Pick<Problem, "slug" | "title" | "unit" | "difficulty" | "tags">[];
}

function diffColor(d: string): string {
  const map: Record<string, string> = {
    A: "var(--neon-lime)",
    B: "var(--neon-cyan)",
    C: "var(--neon-violet)",
    D: "var(--neon-amber)",
    D_PLUS: "var(--neon-magenta)",
  };
  return map[d] ?? "var(--muted-foreground)";
}

export function EmergencyMissionEditor({ students, allProblems }: Props) {
  const [userId, setUserId] = useState("");
  const [problemSlug, setProblemSlug] = useState("");
  const [problemQuery, setProblemQuery] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [missions, setMissions] = useState<MissionRow[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(true);

  const loadMissions = useCallback(async () => {
    setMissionsLoading(true);
    try {
      const res = await fetch("/api/mentor/mission");
      const data = await res.json();
      if (data.ok) setMissions(data.missions);
    } catch {
      // silent
    } finally {
      setMissionsLoading(false);
    }
  }, []);

  useEffect(() => { loadMissions(); }, [loadMissions]);

  const filteredProblems = problemQuery
    ? allProblems
        .filter((p) => {
          const q = problemQuery.toLowerCase();
          return (
            p.slug.includes(q) ||
            p.title.toLowerCase().includes(q) ||
            p.unit.toLowerCase().includes(q) ||
            (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
          );
        })
        .slice(0, 10)
    : allProblems.slice(0, 10);

  const selectedProblem = allProblems.find((p) => p.slug === problemSlug);
  const selectedUser = students.find((s) => s.id === userId);

  async function handleSubmit() {
    if (!userId || !problemSlug || !comment.trim()) {
      setErrMsg("生徒・問題・コメントをすべて入力してください");
      setStatus("err");
      return;
    }
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/mentor/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, problemSlug, comment }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
        setUserId("");
        setProblemSlug("");
        setProblemQuery("");
        setComment("");
        loadMissions();
      } else {
        setErrMsg(data.error ?? "発令に失敗しました");
        setStatus("err");
      }
    } catch {
      setErrMsg("通信エラーが発生しました");
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* ─── 発令フォーム ─── */}
      <div className="space-y-5">
        {/* 生徒選択 */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            ターゲット生徒
          </label>
          <div className="flex flex-wrap gap-2">
            {students.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setUserId(s.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors"
                style={{
                  color: userId === s.id ? "var(--neon-magenta)" : "var(--muted-foreground)",
                  borderColor:
                    userId === s.id
                      ? "color-mix(in oklch, var(--neon-magenta) 50%, transparent)"
                      : "var(--border)",
                  background:
                    userId === s.id
                      ? "color-mix(in oklch, var(--neon-magenta) 8%, transparent)"
                      : "transparent",
                }}
              >
                {s.role === "MENTOR" ? (
                  <ShieldCheck className="h-3.5 w-3.5" />
                ) : (
                  <UserRound className="h-3.5 w-3.5" />
                )}
                {s.name}
              </button>
            ))}
          </div>
          {selectedUser && (
            <p className="mt-1.5 font-mono text-xs text-muted-foreground">
              選択中:{" "}
              <span className="text-neon-magenta font-semibold">{selectedUser.name}</span>
            </p>
          )}
        </div>

        {/* 問題選択 */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            出題する問題
          </label>
          {selectedProblem && (
            <div
              className="mb-2 flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm"
              style={{
                borderColor: `color-mix(in oklch, ${diffColor(selectedProblem.difficulty)} 40%, transparent)`,
                background: `color-mix(in oklch, ${diffColor(selectedProblem.difficulty)} 6%, transparent)`,
              }}
            >
              <span>
                <span
                  className="mr-2 font-mono text-xs font-bold"
                  style={{ color: diffColor(selectedProblem.difficulty) }}
                >
                  {selectedProblem.difficulty}
                </span>
                <span className="font-semibold text-foreground">{selectedProblem.title}</span>
                <span className="ml-2 text-xs text-muted-foreground">{selectedProblem.unit}</span>
              </span>
              <button
                type="button"
                onClick={() => { setProblemSlug(""); setProblemQuery(""); }}
                className="ml-2 text-muted-foreground hover:text-neon-magenta"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="search"
              placeholder="タイトル・単元・タグで検索..."
              value={problemQuery}
              onChange={(e) => setProblemQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-white/60 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/25"
            />
          </div>
          <div className="mt-2 max-h-48 space-y-1 overflow-y-auto">
            {filteredProblems.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => { setProblemSlug(p.slug); setProblemQuery(""); }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
              >
                <span className="shrink-0 font-mono text-xs font-bold" style={{ color: diffColor(p.difficulty) }}>
                  {p.difficulty}
                </span>
                <span className="min-w-0 flex-1 truncate font-medium text-foreground">{p.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{p.unit}</span>
              </button>
            ))}
          </div>
        </div>

        {/* コメント */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            師範からのコメント（魂を込めろ）
          </label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="この問題を通して何を学んでほしいか、なぜこの問題を選んだか..."
            className="w-full resize-none rounded-xl border border-border bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/25"
          />
          <p className="mt-1 text-right font-mono text-xs text-muted-foreground">
            {comment.length} 文字
          </p>
        </div>

        {/* ステータス */}
        {status === "ok" && (
          <div className="flex items-center gap-2 rounded-xl border border-neon-lime/40 bg-neon-lime/8 px-4 py-3 text-sm text-neon-lime">
            <CheckCircle2 className="h-4 w-4" /> 緊急ミッションを発令しました
          </div>
        )}
        {status === "err" && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive">
            <XCircle className="h-4 w-4" /> {errMsg}
          </div>
        )}

        {/* 発令ボタン */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !userId || !problemSlug || !comment.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-bold transition-colors disabled:opacity-40"
          style={{
            background: "color-mix(in oklch, var(--neon-magenta) 15%, transparent)",
            border: "1px solid color-mix(in oklch, var(--neon-magenta) 45%, transparent)",
            color: "var(--neon-magenta)",
          }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "発令中..." : "緊急ミッションを発令する"}
        </button>
      </div>

      {/* ─── 発令済みミッション一覧 ─── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Flame className="h-4 w-4 text-neon-magenta" />
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            発令済みミッション（最新30件）
          </span>
        </div>
        {missionsLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> 読み込み中...
          </div>
        ) : missions.length === 0 ? (
          <p className="text-sm text-muted-foreground">まだミッションは発令されていません。</p>
        ) : (
          <div className="space-y-2">
            {missions.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
                style={{
                  borderColor: m.isCompleted
                    ? "color-mix(in oklch, var(--neon-lime) 35%, transparent)"
                    : "color-mix(in oklch, var(--neon-magenta) 30%, transparent)",
                  background: m.isCompleted
                    ? "color-mix(in oklch, var(--neon-lime) 5%, transparent)"
                    : "color-mix(in oklch, var(--neon-magenta) 4%, transparent)",
                }}
              >
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-foreground">{m.user.name}</span>
                  <span className="mx-2 text-muted-foreground">→</span>
                  <span className="font-mono text-xs text-muted-foreground">{m.problemSlug}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {m.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-neon-lime" />
                  ) : (
                    <Clock className="h-4 w-4 text-neon-magenta/70" />
                  )}
                  <span
                    className="font-mono text-xs"
                    style={{ color: m.isCompleted ? "var(--neon-lime)" : "var(--neon-magenta)" }}
                  >
                    {m.isCompleted ? "完了" : "未クリア"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
