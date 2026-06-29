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
  Lightbulb,
} from "lucide-react";
import { CommonTestGuidedReviewPanel } from "@/components/common-test/CommonTestGuidedReviewPanel";
import {
  buildCommonTestGuidedReviewItem,
  findCommonTestQuestionById,
} from "@/lib/common-test-guided-review";
import {
  compareReviewItemsByRisk,
  getMistakeTagIdsFromReviewReasonFlags,
  getRiskLevelFromReviewReasonFlags,
} from "@/lib/common-test-diagnosis";
import {
  getCommonTestMistakeTagLabel,
  getCommonTestRiskMeta,
  type CommonTestRiskLevel,
} from "@/lib/common-test-history";

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
  wrong: { label: "不正解", color: "#e11d48" },
  "guessed-correct": { label: "勘で正解", color: "#7c3aed" },
  "dangerous-misconception": { label: "自信あり不正解", color: "#e11d48" },
  overtime: { label: "時間超過", color: "#d97706" },
};

const SUBJECT_LABELS: Record<string, { label: string; color: string }> = {
  "math-1a": { label: "数学IA", color: "#2563eb" },
  "math-2bc": { label: "数学IIB(C)", color: "#7c3aed" },
  "english-reading": { label: "英語R", color: "#059669" },
  math: { label: "数学", color: "#2563eb" },
  english: { label: "英語", color: "#059669" },
};

const LEVEL_LABEL = ["新規", "Lv.1", "Lv.2", "Lv.3", "克服済み"];

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

function isCommonTestReviewItem(item: ReviewItemData): boolean {
  return item.itemType === "common-test-drill" || item.itemType === "common-test-lecture";
}

function buildMeta(items: ReviewItemData[]): ListMeta {
  const now = new Date();
  return {
    total: items.length,
    todayCount: items.filter((i) => i.status === "ACTIVE" && new Date(i.nextReviewAt) <= now).length,
    masteredCount: items.filter((i) => i.status === "MASTERED").length,
    overdueCount: items.filter(
      (i) =>
        i.status === "ACTIVE" &&
        new Date(i.nextReviewAt) < now &&
        new Date(i.nextReviewAt).toDateString() !== now.toDateString()
    ).length,
  };
}

function getLectureSlugFromReasonFlags(flags: string[]): string | null {
  return flags.find((flag) => flag.startsWith("lecture-slug:"))?.replace("lecture-slug:", "") ?? null;
}

export function CommonTestReviewQueue() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [allItems, setAllItems] = useState<ReviewItemData[]>([]);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [activeGuidedId, setActiveGuidedId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, listRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/review/list?limit=100"),
      ]);

      setIsLoggedIn(meRes.ok);

      if (listRes.ok) {
        const data = await listRes.json();
        if (data.ok) {
          const items = (data.items as ReviewItemData[]).filter(isCommonTestReviewItem);
          setAllItems(items);
          setMeta(buildMeta(items));
        }
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // API フェッチ（ローディング状態の設定を含む）はマウント時の正規の副作用
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <LogIn className="mx-auto mb-3 h-8 w-8 text-slate-300" />
        <div className="mb-2 text-sm font-bold text-slate-700">
          ログインが必要です
        </div>
        <p className="mb-6 text-xs text-slate-500">
          ログインすると、間違えた問題を復習キューに保存し、間隔反復で繰り返し確認できます。
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-orange-700"
        >
          ログインして復習キューを使う →
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl border border-slate-200 bg-white" />
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
  ).sort(compareReviewItemsByRisk);
  const upcomingItems = filtered.filter(
    (i) => i.status === "ACTIVE" && new Date(i.nextReviewAt) > now
  ).sort(compareReviewItemsByRisk);
  const masteredItems = filtered.filter((i) => i.status === "MASTERED");

  const uniqueSubjects = Array.from(new Set(allItems.map((i) => i.subjectId).filter(Boolean)));

  return (
    <div className="space-y-8">
      {/* Stats bar */}
      {meta && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="今日の復習" value={meta.todayCount} color="#ea580c" />
          <StatCard label="期限切れ" value={meta.overdueCount} color="#e11d48" />
          <StatCard label="合計" value={meta.total - meta.masteredCount} color="#2563eb" />
          <StatCard label="克服済み" value={meta.masteredCount} color="#059669" />
        </div>
      )}

      <RiskPriorityGuide />

      {/* Subject filter + refresh */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-slate-400" />
        <button
          type="button"
          onClick={() => setSubjectFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors ${
            subjectFilter === "all"
              ? "bg-slate-900 text-white"
              : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300"
          }`}
        >
          すべて
        </button>
        {uniqueSubjects.map((subj) => {
          const meta = subj ? SUBJECT_LABELS[subj] : null;
          const isActive = subjectFilter === subj;
          return (
            <button
              key={subj}
              type="button"
              onClick={() => setSubjectFilter(subj ?? "all")}
              className="rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-colors"
              style={{
                background: isActive ? `${meta?.color ?? "#475569"}14` : "#ffffff",
                borderColor: isActive ? `${meta?.color ?? "#475569"}55` : "#e2e8f0",
                color: isActive ? (meta?.color ?? "#475569") : "#64748b",
              }}
            >
              {meta?.label ?? subj}
            </button>
          );
        })}
        <button
          type="button"
          onClick={fetchAll}
          className="ml-auto rounded-lg p-2 transition-colors hover:bg-slate-100"
        >
          <RefreshCw className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* DUE TODAY / OVERDUE */}
      {todayItems.length > 0 && (
        <ReviewSection
          title="今日の復習"
          titleColor="#ea580c"
          items={todayItems}
          completing={completing}
          doneIds={doneIds}
          onComplete={handleComplete}
          activeGuidedId={activeGuidedId}
          onToggleGuided={(id) => setActiveGuidedId((current) => (current === id ? null : id))}
          highlight
        />
      )}

      {/* UPCOMING */}
      {upcomingItems.length > 0 && (
        <ReviewSection
          title="今後の予定"
          titleColor="#2563eb"
          items={upcomingItems}
          completing={completing}
          doneIds={doneIds}
          onComplete={handleComplete}
          activeGuidedId={activeGuidedId}
          onToggleGuided={(id) => setActiveGuidedId((current) => (current === id ? null : id))}
          showActions={false}
        />
      )}

      {/* MASTERED */}
      {masteredItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Trophy className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">
              克服済み — {masteredItems.length}件
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {masteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3"
              >
                <Trophy className="h-4 w-4 shrink-0 text-emerald-500" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-bold text-slate-700">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-[10px] text-emerald-600">
                    克服済み · {item.correctStreak}連続正解
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {allItems.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold text-slate-700">
          復習キューはまだ空です
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
            まずは10分ほどの大問別ドリルを解くと、間違えた問題や自信があいまいな問題がここに入ります。
            <br />
            今日の復習、次回の確認日、危険度を自動で並べ替えます。
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-bold text-slate-500">
            <span className="rounded-full bg-slate-100 px-2.5 py-1">所要時間: 約10分</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1">初回は3問から</span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/common-test/math-1a"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
            >
              10分診断を始める →
            </Link>
            <Link
              href="/common-test/lectures"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300"
            >
              講義ロードマップを見る
            </Link>
          </div>
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
  activeGuidedId,
  onToggleGuided,
  highlight = false,
  showActions = true,
}: {
  title: string;
  titleColor: string;
  items: ReviewItemData[];
  completing: string | null;
  doneIds: Set<string>;
  onComplete: (id: string, isCorrect: boolean) => void;
  activeGuidedId: string | null;
  onToggleGuided: (id: string) => void;
  highlight?: boolean;
  showActions?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {highlight && <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: titleColor }} />}
        <span className="text-sm font-bold" style={{ color: titleColor }}>
          {title}
        </span>
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] text-slate-400">{items.length}件</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isCompleting = completing === item.id;
          const isDone = doneIds.has(item.id);
          const subjMeta = item.subjectId ? SUBJECT_LABELS[item.subjectId] : null;
          const levelLabel = LEVEL_LABEL[item.level] ?? `Lv.${item.level}`;
          const lectureSlug = getLectureSlugFromReasonFlags(item.reasonFlags);
          const reviewHref =
            item.itemType === "common-test-lecture" && lectureSlug
              ? `/common-test/lectures/${lectureSlug}`
              : item.subjectId && item.sectionId
                ? `/common-test/${item.subjectId}/${item.sectionId}`
                : "#";
          const guidedQuestion =
            item.itemType === "common-test-drill"
              ? findCommonTestQuestionById(item.itemId)
              : undefined;
          const guidedItem = guidedQuestion
            ? buildCommonTestGuidedReviewItem(guidedQuestion)
            : null;
          const riskLevel = getRiskLevelFromReviewReasonFlags(item.reasonFlags);
          const riskMeta = getCommonTestRiskMeta(riskLevel);
          const mistakeTagIds = getMistakeTagIdsFromReviewReasonFlags(item.reasonFlags);
          const guidedTheme = {
            primary: subjMeta?.color ?? "#f97316",
            glowRgb: hexToRgb(subjMeta?.color ?? "#f97316"),
          };

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border bg-white"
              style={{
                borderColor: isDone ? "#a7f3d0" : "#e2e8f0",
                background: isDone ? "#f0fdf4" : "#ffffff",
                opacity: isDone ? 0.7 : 1,
              }}
            >
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Info */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                      {levelLabel}
                    </span>
                    {subjMeta && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                        style={{ background: `${subjMeta.color}14`, color: subjMeta.color }}
                      >
                        {subjMeta.label}
                        {item.sectionId && ` ${item.sectionId.replace("section-", "第")}問`}
                      </span>
                    )}
                    {item.itemType === "common-test-lecture" && (
                      <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold text-violet-700">
                        出典：特別講義
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      {fmtDate(item.nextReviewAt)}
                    </span>
                  </div>

                  <div className="truncate text-[13px] font-bold text-slate-800">
                    {item.title}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {riskMeta && (
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${riskMeta.className}`}
                      >
                        {riskMeta.label}
                      </span>
                    )}
                    {item.reasonFlags.map((f) => {
                      const r = REASON_LABEL[f];
                      if (!r) return null;
                      return (
                        <span
                          key={f}
                          className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                          style={{ background: `${r.color}14`, color: r.color }}
                        >
                          {r.label}
                        </span>
                      );
                    })}
                    {mistakeTagIds.map((tagId) => (
                      <span
                        key={tagId}
                        className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 ring-1 ring-rose-100"
                      >
                        {getCommonTestMistakeTagLabel(tagId)}
                      </span>
                    ))}
                    {item.skillTags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                        {t}
                      </span>
                    ))}
                  </div>
                  {item.wrongCount > 1 && (
                    <p className="text-[11px] text-rose-500">
                      ✕ {item.wrongCount}回 間違えた問題
                    </p>
                  )}
                  {riskMeta && (
                    <p className="text-[11px] leading-5 text-slate-500">
                      {riskMeta.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {showActions && (
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {guidedItem && (
                      <button
                        type="button"
                        onClick={() => onToggleGuided(item.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700 transition-colors hover:bg-amber-100"
                      >
                        <Lightbulb className="h-3 w-3" />
                        段階復習
                      </button>
                    )}
                    {reviewHref !== "#" && (
                      <Link
                        href={reviewHref}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 transition-colors hover:border-slate-300"
                      >
                        <ExternalLink className="h-3 w-3" />
                        演習
                      </Link>
                    )}
                    <button
                      type="button"
                      disabled={isCompleting || isDone}
                      onClick={() => onComplete(item.id, false)}
                      className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-40"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      不正解
                    </button>
                    <button
                      type="button"
                      disabled={isCompleting || isDone}
                      onClick={() => onComplete(item.id, true)}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-40"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      正解
                    </button>
                  </div>
                )}
              </div>
              {guidedItem && activeGuidedId === item.id && (
                <div className="px-4 pb-4">
                  <CommonTestGuidedReviewPanel
                    items={[guidedItem]}
                    title="この問題を段階復習する"
                    description="ヒントから順に開き、解説を見る前にもう一度考えてみましょう。"
                    theme={guidedTheme}
                    compact
                    initialQuestionId={guidedItem.questionId}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RiskPriorityGuide() {
  const items: { level: CommonTestRiskLevel; text: string }[] = [
    { level: "S", text: "最優先。理解しているつもりの危険ミス" },
    { level: "A", text: "優先。解法選択や条件処理のミス" },
    { level: "B", text: "通常。計算・時間・読み違い" },
    { level: "C", text: "軽め。正解したが自信が弱い" },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-extrabold text-slate-950">危険度別の復習優先度</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const meta = getCommonTestRiskMeta(item.level);
          return (
            <div
              key={item.level}
              className={`rounded-xl border px-3 py-2 text-xs leading-5 ${
                meta?.className ?? "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              <span className="font-extrabold">{item.level}：</span>
              {item.text}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[10px] text-slate-400">{label}</div>
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
