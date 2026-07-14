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
  Sigma,
  BookOpen,
  Zap,
  BookMarked,
  Network,
  ChevronRight,
} from "lucide-react";
import type { Problem } from "@/lib/types";
import { difficultyColor } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

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

export interface EnglishProblemItem {
  id: string;
  title: string;
  category: "SPEED_READING" | "COMPREHENSION" | "MULTI_SOURCE";
  categoryLabel: string;
  level: string;
  tags: string[];
  path: string;
}

interface Props {
  students: StudentRow[];
  allProblems: (Pick<Problem, "slug" | "title" | "unit" | "difficulty" | "tags"> & { tier?: string })[];
  allEnglishProblems: EnglishProblemItem[];
  defaultSubject?: "MATH" | "ENGLISH";
}

// ── Constants ──────────────────────────────────────────────────────────────

type MathCategory = "standard" | "abyss";
type EnglishCategory = "SPEED_READING" | "COMPREHENSION" | "MULTI_SOURCE";

const MATH_CATEGORIES: { key: MathCategory; label: string }[] = [
  { key: "standard", label: "通常問題" },
  { key: "abyss",    label: "挑戦問題（発展・最難関）" },
];

const ENGLISH_CATEGORIES: { key: EnglishCategory; label: string; icon: React.ElementType }[] = [
  { key: "SPEED_READING", label: "速読長文",     icon: Zap       },
  { key: "COMPREHENSION", label: "精読長文",     icon: BookMarked },
  { key: "MULTI_SOURCE",  label: "マルチソース", icon: Network    },
];

// ── Component ─────────────────────────────────────────────────────────────

export function EmergencyMissionEditor({ students, allProblems, allEnglishProblems, defaultSubject = "MATH" }: Props) {
  // Step state
  const [subject,       setSubject]       = useState<"MATH" | "ENGLISH">(defaultSubject);
  const [mathCategory,  setMathCategory]  = useState<MathCategory>("standard");
  const [engCategory,   setEngCategory]   = useState<EnglishCategory>("SPEED_READING");

  // Selection state
  const [userId,        setUserId]        = useState("");
  const [problemSlug,   setProblemSlug]   = useState("");
  const [problemQuery,  setProblemQuery]  = useState("");
  const [comment,       setComment]       = useState("");

  // Submission state
  const [loading,         setLoading]         = useState(false);
  const [status,          setStatus]          = useState<"idle" | "ok" | "err">("idle");
  const [errMsg,          setErrMsg]          = useState("");
  const [missions,        setMissions]        = useState<MissionRow[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(true);

  const loadMissions = useCallback(async () => {
    setMissionsLoading(true);
    try {
      const res = await fetch("/api/mentor/mission", { credentials: "include" });
      const data = await res.json();
      if (data.ok) setMissions(data.missions);
    } catch {
      // silent
    } finally {
      setMissionsLoading(false);
    }
  }, []);

  // API フェッチ（ローディング状態の設定を含む）はマウント時の正規の副作用
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadMissions(); }, [loadMissions]);

  // Reset problem selection when subject/category changes
  const switchSubject = (s: "MATH" | "ENGLISH") => {
    setSubject(s);
    setProblemSlug("");
    setProblemQuery("");
  };
  const switchMathCat = (c: MathCategory) => {
    setMathCategory(c);
    setProblemSlug("");
    setProblemQuery("");
  };
  const switchEngCat = (c: EnglishCategory) => {
    setEngCategory(c);
    setProblemSlug("");
    setProblemQuery("");
  };

  // ── Math problem filtering ─────────────────────────────────────────────
  const mathPool = allProblems.filter((p) =>
    mathCategory === "abyss"
      ? p.tier === "ABYSS"
      : p.tier !== "ABYSS",
  );
  const filteredMathProblems = problemQuery
    ? mathPool
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
    : mathPool.slice(0, 10);

  // ── English problem filtering ──────────────────────────────────────────
  const englishPool = allEnglishProblems.filter((p) => p.category === engCategory);
  const filteredEngProblems = problemQuery
    ? englishPool.filter((p) => {
        const q = problemQuery.toLowerCase();
        return (
          p.id.includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.level.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : englishPool;

  // ── Selected item label ───────────────────────────────────────────────
  const selectedMathProblem   = allProblems.find((p) => p.slug === problemSlug);
  const selectedEnglishProblem = allEnglishProblems.find((p) => p.path === problemSlug);
  const selectedUser          = students.find((s) => s.id === userId);

  // ── Submit ────────────────────────────────────────────────────────────
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
        credentials: "include",
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

  const canSubmit = !!userId && !!problemSlug && !!comment.trim();

  return (
    <div className="space-y-8">
      {/* ─── 発令フォーム ──────────────────────────────────────────── */}
      <div className="space-y-6">

        {/* ── STEP 1: 生徒選択 ───────────────────────────────────── */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            STEP 1 · ターゲット生徒
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
              <span className="font-semibold text-neon-magenta">{selectedUser.name}</span>
            </p>
          )}
        </div>

        {/* ── STEP 2: 科目選択 ───────────────────────────────────── */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            STEP 2 · 科目
          </label>
          <div className="flex gap-2">
            {(["MATH", "ENGLISH"] as const).map((s) => {
              const active = subject === s;
              const Icon = s === "MATH" ? Sigma : BookOpen;
              const accent = s === "MATH" ? "var(--neon-cyan)" : "var(--neon-lime)";
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => switchSubject(s)}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-semibold transition-colors"
                  style={{
                    color:        active ? accent : "var(--muted-foreground)",
                    borderColor:  active ? `color-mix(in oklch, ${accent} 45%, transparent)` : "var(--border)",
                    background:   active ? `color-mix(in oklch, ${accent} 8%, transparent)` : "transparent",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── STEP 3: カテゴリ選択 ───────────────────────────────── */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            STEP 3 · カテゴリ
          </label>
          {subject === "MATH" ? (
            <div className="flex gap-2">
              {MATH_CATEGORIES.map((c) => {
                const active = mathCategory === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => switchMathCat(c.key)}
                    className="rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors"
                    style={{
                      color:       active ? "var(--neon-cyan)" : "var(--muted-foreground)",
                      borderColor: active ? "color-mix(in oklch, var(--neon-cyan) 45%, transparent)" : "var(--border)",
                      background:  active ? "color-mix(in oklch, var(--neon-cyan) 8%, transparent)" : "transparent",
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {ENGLISH_CATEGORIES.map((c) => {
                const active = engCategory === c.key;
                const Icon = c.icon;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => switchEngCat(c.key)}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors"
                    style={{
                      color:       active ? "var(--neon-lime)" : "var(--muted-foreground)",
                      borderColor: active ? "color-mix(in oklch, var(--neon-lime) 45%, transparent)" : "var(--border)",
                      background:  active ? "color-mix(in oklch, var(--neon-lime) 8%, transparent)" : "transparent",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── STEP 4: 問題選択 ───────────────────────────────────── */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            STEP 4 · 問題
          </label>

          {/* Selected problem badge */}
          {subject === "MATH" && selectedMathProblem && (
            <div
              className="mb-2 flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm"
              style={{
                borderColor: `color-mix(in oklch, ${difficultyColor(selectedMathProblem.difficulty)} 40%, transparent)`,
                background:  `color-mix(in oklch, ${difficultyColor(selectedMathProblem.difficulty)} 6%, transparent)`,
              }}
            >
              <span>
                <span
                  className="mr-2 font-mono text-xs font-bold"
                  style={{ color: difficultyColor(selectedMathProblem.difficulty) }}
                >
                  {selectedMathProblem.difficulty}
                </span>
                <span className="font-semibold text-foreground">{selectedMathProblem.title}</span>
                <span className="ml-2 text-xs text-muted-foreground">{selectedMathProblem.unit}</span>
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

          {subject === "ENGLISH" && selectedEnglishProblem && (
            <div
              className="mb-2 flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm"
              style={{
                borderColor: "color-mix(in oklch, var(--neon-lime) 40%, transparent)",
                background:  "color-mix(in oklch, var(--neon-lime) 6%, transparent)",
              }}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-neon-lime">
                  {selectedEnglishProblem.categoryLabel}
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <span className="font-semibold text-foreground">{selectedEnglishProblem.title}</span>
                <span className="ml-1 text-xs text-muted-foreground">{selectedEnglishProblem.level}</span>
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

          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="search"
              placeholder={
                subject === "MATH"
                  ? "タイトル・単元・タグで検索..."
                  : "タイトル・レベル・タグで検索..."
              }
              value={problemQuery}
              onChange={(e) => setProblemQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-white/60 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/25"
            />
          </div>

          {/* Problem list */}
          <div className="mt-2 max-h-48 space-y-1 overflow-y-auto">
            {subject === "MATH"
              ? filteredMathProblems.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => { setProblemSlug(p.slug); setProblemQuery(""); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                  >
                    <span
                      className="shrink-0 font-mono text-xs font-bold"
                      style={{ color: difficultyColor(p.difficulty) }}
                    >
                      {p.difficulty}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                      {p.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">{p.unit}</span>
                  </button>
                ))
              : filteredEngProblems.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setProblemSlug(p.path); setProblemQuery(""); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                  >
                    <span className="shrink-0 font-mono text-xs font-semibold text-neon-lime">
                      {p.level}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                      {p.title}
                    </span>
                  </button>
                ))}
          </div>
        </div>

        {/* ── コメント ────────────────────────────────────────────── */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            指導者からのコメント
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

        {/* ── Status ──────────────────────────────────────────────── */}
        {status === "ok" && (
          <div className="flex items-center gap-2 rounded-xl border border-neon-lime/40 bg-neon-lime/8 px-4 py-3 text-sm text-neon-lime">
            <CheckCircle2 className="h-4 w-4" /> 個別課題を割り当てました
          </div>
        )}
        {status === "err" && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive">
            <XCircle className="h-4 w-4" /> {errMsg}
          </div>
        )}

        {/* ── 発令ボタン ──────────────────────────────────────────── */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-bold transition-colors disabled:opacity-40"
          style={{
            background: "color-mix(in oklch, var(--neon-magenta) 15%, transparent)",
            border: "1px solid color-mix(in oklch, var(--neon-magenta) 45%, transparent)",
            color: "var(--neon-magenta)",
          }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "割り当て中..." : "個別課題を割り当てる"}
        </button>
      </div>

      {/* ─── 発令済みミッション一覧 ──────────────────────────────── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Flame className="h-4 w-4 text-neon-magenta" />
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            割り当て済みの個別課題（最新30件）
          </span>
        </div>
        {missionsLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> 読み込み中...
          </div>
        ) : missions.length === 0 ? (
          <p className="text-sm text-muted-foreground">まだ個別課題は割り当てられていません。</p>
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
                <div className="flex shrink-0 items-center gap-2">
                  {m.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-neon-lime" />
                  ) : (
                    <Clock className="h-4 w-4 text-neon-magenta/70" />
                  )}
                  <span
                    className="font-mono text-xs"
                    style={{ color: m.isCompleted ? "var(--neon-lime)" : "var(--neon-magenta)" }}
                  >
                    {m.isCompleted ? "完了" : "未完了"}
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
