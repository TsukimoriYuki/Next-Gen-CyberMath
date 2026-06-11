"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Trophy,
  Filter,
  Clock,
  AlertTriangle,
  LogIn,
} from "lucide-react";

interface ReviewItemData {
  id: string;
  itemType: string;
  itemId: string;
  subjectId: string | null;
  sectionId: string | null;
  title: string;
  source: string;
  status: string;
  level: number;
  wrongCount: number;
  correctStreak: number;
  reasonFlags: string[];
  skillTags: string[];
  nextReviewAt: string;
  lastReviewedAt: string | null;
  createdAt: string;
}

interface ListMeta {
  total: number;
  todayCount: number;
  masteredCount: number;
  overdueCount: number;
}

const REASON_LABEL: Record<string, { label: string; color: string }> = {
  wrong: { label: "不正解", color: "#ef4444" },
  "guessed-correct": { label: "勘で正解", color: "#a78bfa" },
  "dangerous-misconception": { label: "自信あり不正解", color: "#ef4444" },
  overtime: { label: "時間超過", color: "#fbbf24" },
};

const SUBJECT_LABELS: Record<string, { label: string; color: string }> = {
  "math-1a": { label: "数学IA", color: "#60a5fa" },
  "math-2bc": { label: "数学IIB(C)", color: "#a78bfa" },
  "english-reading": { label: "英語R", color: "#34d399" },
  math: { label: "数学", color: "#60a5fa" },
  english: { label: "英語", color: "#34d399" },
};

const LEVEL_LABEL = ["新規", "Lv.1", "Lv.2", "Lv.3", "MASTERED"];

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / 86400000);
  if (diffDays === 0) return "今日";
  if (diffDays === 1) return "明日";
  if (diffDays === -1) return "昨日";
  if (diffDays < 0) return `${-diffDays}日前（期限切れ）`;
  return `${diffDays}日後`;
}

export function CommonTestReviewQueue() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [allItems, setAllItems] = useState<ReviewItemData[]>([]);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, listRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/review/list?itemType=common-test-drill&limit=100"),
      ]);

      setIsLoggedIn(meRes.ok);

      if (listRes.ok) {
        const data = await listRes.json();
        if (data.ok) {
          setAllItems(data.items);
          setMeta(data.meta);
        }
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleComplete = async (reviewItemId: string, isCorrect: boolean) => {
    setCompleting(reviewItemId);
    try {
      const res = await fetch("/api/review/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewItemId, isCorrect }),
      });
      if (res.ok) {
        setDoneIds((prev) => new Set([...prev, reviewItemId]));
        // Re-fetch to get updated nextReviewAt
        await fetchAll();
      }
    } finally {
      setCompleting(null);
    }
  };

  if (!loading && isLoggedIn === false) {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <LogIn className="mx-auto mb-3 h-8 w-8 text-white/20" />
        <div className="font-mono text-sm font-bold text-white/40 uppercase tracking-widest mb-2">
          ログインが必要です
        </div>
        <p className="font-mono text-[11px] text-white/30 mb-6">
          復習キューはログインユーザーのみ利用できます。
        </p>
        <Link
          href="/api/auth/login"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.70)" }}
        >
          ログインページへ
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl animate-pulse"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />
        ))}
      </div>
    );
  }

  const now = new Date();

  // Filter items
  const filtered = allItems.filter((item) => {
    if (subjectFilter !== "all" && item.subjectId !== subjectFilter) return false;
    return true;
  });

  const todayItems = filtered.filter(
    (i) => i.status === "ACTIVE" && new Date(i.nextReviewAt) <= now
  );
  const upcomingItems = filtered.filter(
    (i) => i.status === "ACTIVE" && new Date(i.nextReviewAt) > now
  );
  const masteredItems = filtered.filter((i) => i.status === "MASTERED");

  const uniqueSubjects = Array.from(new Set(allItems.map((i) => i.subjectId).filter(Boolean)));

  return (
    <div className="space-y-8">
      {/* Stats bar */}
      {meta && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="今日の復習" value={meta.todayCount} color="#f97316" accent="249,115,22" />
          <StatCard label="期限切れ" value={meta.overdueCount} color="#ef4444" accent="239,68,68" />
          <StatCard label="合計" value={meta.total - meta.masteredCount} color="#38bdf8" accent="56,189,248" />
          <StatCard label="MASTERED" value={meta.masteredCount} color="#22c55e" accent="34,197,94" />
        </div>
      )}

      {/* Subject filter + refresh */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-white/30" />
        <button
          type="button"
          onClick={() => setSubjectFilter("all")}
          className="rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all"
          style={{
            background: subjectFilter === "all" ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${subjectFilter === "all" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
            color: subjectFilter === "all" ? "white" : "rgba(255,255,255,0.40)",
          }}
        >
          ALL
        </button>
        {uniqueSubjects.map((subj) => {
          const meta = subj ? SUBJECT_LABELS[subj] : null;
          const isActive = subjectFilter === subj;
          return (
            <button
              key={subj}
              type="button"
              onClick={() => setSubjectFilter(subj ?? "all")}
              className="rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{
                background: isActive ? `rgba(${hexToRgb(meta?.color ?? "#fff")},0.12)` : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? `rgba(${hexToRgb(meta?.color ?? "#fff")},0.30)` : "rgba(255,255,255,0.08)"}`,
                color: isActive ? (meta?.color ?? "#fff") : "rgba(255,255,255,0.40)",
              }}
            >
              {meta?.label ?? subj}
            </button>
          );
        })}
        <button
          type="button"
          onClick={fetchAll}
          className="ml-auto rounded-lg p-2 transition-all hover:bg-white/5"
        >
          <RefreshCw className="h-4 w-4 text-white/30" />
        </button>
      </div>

      {/* DUE TODAY / OVERDUE */}
      {todayItems.length > 0 && (
        <ReviewSection
          title="DUE TODAY — 今日の復習"
          titleColor="#f97316"
          items={todayItems}
          completing={completing}
          doneIds={doneIds}
          onComplete={handleComplete}
          highlight
        />
      )}

      {/* UPCOMING */}
      {upcomingItems.length > 0 && (
        <ReviewSection
          title="SCHEDULED — 今後の予定"
          titleColor="#38bdf8"
          items={upcomingItems}
          completing={completing}
          doneIds={doneIds}
          onComplete={handleComplete}
          showActions={false}
        />
      )}

      {/* MASTERED */}
      {masteredItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Trophy className="h-4 w-4 text-green-400" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
              MASTERED MEMORY — {masteredItems.length}件
            </span>
            <div className="flex-1 h-px bg-green-500/15" />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {masteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}
              >
                <Trophy className="h-4 w-4 shrink-0 text-green-400/60" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] font-bold text-white/60 truncate">
                    {item.title}
                  </div>
                  <div className="font-mono text-[8px] text-green-400/50 mt-0.5">
                    MASTERED · {item.correctStreak}連続正解
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {allItems.length === 0 && (
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="font-mono text-3xl text-white/10 mb-4">🎯</div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/25">
            NO ITEMS IN QUEUE
          </div>
          <p className="mt-2 font-mono text-[10px] text-white/20">
            ドリル演習後に「復習キューに追加」すると、ここに表示されます。
          </p>
          <Link
            href="/common-test"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
          >
            COMMAND CENTER へ
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Review item section ───────────────────────────────────────────────────
function ReviewSection({
  title,
  titleColor,
  items,
  completing,
  doneIds,
  onComplete,
  highlight = false,
  showActions = true,
}: {
  title: string;
  titleColor: string;
  items: ReviewItemData[];
  completing: string | null;
  doneIds: Set<string>;
  onComplete: (id: string, isCorrect: boolean) => void;
  highlight?: boolean;
  showActions?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {highlight && <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: titleColor }} />}
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: titleColor }}
        >
          {title}
        </span>
        <div className="flex-1 h-px" style={{ background: `${titleColor}20` }} />
        <span className="font-mono text-[9px] text-white/25">{items.length}件</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isCompleting = completing === item.id;
          const isDone = doneIds.has(item.id);
          const subjMeta = item.subjectId ? SUBJECT_LABELS[item.subjectId] : null;
          const levelLabel = LEVEL_LABEL[item.level] ?? `Lv.${item.level}`;
          const reviewHref =
            item.subjectId && item.sectionId
              ? `/common-test/${item.subjectId}/${item.sectionId}`
              : "#";

          return (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: isDone ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isDone ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.07)"}`,
                opacity: isDone ? 0.6 : 1,
              }}
            >
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b" }}
                    >
                      {levelLabel}
                    </span>
                    {subjMeta && (
                      <span
                        className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                        style={{
                          background: `rgba(${hexToRgb(subjMeta.color)},0.10)`,
                          border: `1px solid rgba(${hexToRgb(subjMeta.color)},0.25)`,
                          color: subjMeta.color,
                        }}
                      >
                        {subjMeta.label}
                        {item.sectionId && ` ${item.sectionId.replace("section-", "第")}問`}
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-mono text-[9px] text-white/30">
                      <Clock className="h-3 w-3" />
                      {fmtDate(item.nextReviewAt)}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] font-bold text-white/75 truncate">
                    {item.title}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.reasonFlags.map((f) => {
                      const r = REASON_LABEL[f];
                      if (!r) return null;
                      return (
                        <span
                          key={f}
                          className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold"
                          style={{
                            background: `${r.color}15`,
                            border: `1px solid ${r.color}30`,
                            color: r.color,
                          }}
                        >
                          {r.label}
                        </span>
                      );
                    })}
                    {item.skillTags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded px-1 py-px font-mono text-[8px]"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {item.wrongCount > 1 && (
                    <p className="font-mono text-[9px] text-red-400/60">
                      ✕ {item.wrongCount}回 間違えた問題
                    </p>
                  )}
                </div>

                {/* Actions */}
                {showActions && (
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {reviewHref !== "#" && (
                      <Link
                        href={reviewHref}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[10px] font-medium transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        演習
                      </Link>
                    )}
                    <button
                      type="button"
                      disabled={isCompleting || isDone}
                      onClick={() => onComplete(item.id, false)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[10px] font-medium transition-all disabled:opacity-40"
                      style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.25)", color: "#f43f5e" }}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      不正解
                    </button>
                    <button
                      type="button"
                      disabled={isCompleting || isDone}
                      onClick={() => onComplete(item.id, true)}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[10px] font-semibold transition-all disabled:opacity-40"
                      style={{ background: "rgba(52,211,153,0.10)", border: "1px solid rgba(52,211,153,0.30)", color: "#34d399" }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      正解
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  accent,
}: {
  label: string;
  value: number;
  color: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: `rgba(${accent},0.06)`, border: `1px solid rgba(${accent},0.18)` }}
    >
      <div className="font-mono text-[9px] uppercase tracking-wider text-white/30">{label}</div>
      <div className="mt-1 font-mono text-2xl font-extrabold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "255,255,255";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}
