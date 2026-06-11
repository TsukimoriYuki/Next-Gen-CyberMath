// "use client" は不要 — 全て props で受け取る純粋な表示コンポーネント
import Link from "next/link";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestDrillHistoryItem } from "@/lib/common-test-history";
import { TAG_RECOMMENDATIONS } from "@/lib/common-test-history";
import type { AnswerEntry } from "./common-test-drill-types";
import { ReviewQueueRegistrar, type ReviewCandidate } from "./ReviewQueueRegistrar";
import {
  RotateCcw,
  ArrowLeft,
  Home,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Re-export for consumers
export type { AnswerEntry };

interface Props {
  questions: CommonTestDrillQuestion[];
  answers: AnswerEntry[];
  historyItem: CommonTestDrillHistoryItem;
  totalElapsedSec: number;
  theme: CommonTestTheme;
  sectionTitle: string;
  subjectRoute: string;
  onRetry: () => void;
}

// ── Quadrant ──────────────────────────────────────────────────────────────
type QuadrantId =
  | "MEMORY_STABLE"
  | "REVIEW_REQUIRED"
  | "LUCKY_HIT"
  | "DANGEROUS"
  | "WEAK_POINT"
  | "FUNDAMENTAL_GAP"
  | "TIME_LOSS";

interface QuadrantDef {
  id: QuadrantId;
  label: string;
  sub: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
}

const QUADRANT_DEFS: QuadrantDef[] = [
  {
    id: "MEMORY_STABLE",
    label: "MEMORY STABLE",
    sub: "正解 × 自信あり",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.25)",
    icon: "✓",
  },
  {
    id: "REVIEW_REQUIRED",
    label: "REVIEW REQUIRED",
    sub: "正解 × 少し不安",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.25)",
    icon: "△",
  },
  {
    id: "LUCKY_HIT",
    label: "LUCKY HIT",
    sub: "正解 × 勘",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.25)",
    icon: "◇",
  },
  {
    id: "DANGEROUS",
    label: "DANGEROUS",
    sub: "不正解 × 自信あり",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.30)",
    icon: "⚡",
  },
  {
    id: "WEAK_POINT",
    label: "WEAK POINT",
    sub: "不正解 × 少し不安",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
    icon: "✕",
  },
  {
    id: "FUNDAMENTAL_GAP",
    label: "FUNDAMENTAL GAP",
    sub: "不正解 × 勘",
    color: "#fb7185",
    bg: "rgba(251,113,133,0.08)",
    border: "rgba(251,113,133,0.25)",
    icon: "☓",
  },
  {
    id: "TIME_LOSS",
    label: "TIME LOSS",
    sub: "わからない",
    color: "rgba(255,255,255,0.35)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.10)",
    icon: "○",
  },
];

function getQuadrantId(entry: AnswerEntry): QuadrantId {
  if (entry.confidence === "blank") return "TIME_LOSS";
  if (entry.isCorrect && entry.confidence === "confident") return "MEMORY_STABLE";
  if (entry.isCorrect && entry.confidence === "unsure") return "REVIEW_REQUIRED";
  if (entry.isCorrect && entry.confidence === "guessed") return "LUCKY_HIT";
  if (!entry.isCorrect && entry.confidence === "confident") return "DANGEROUS";
  if (!entry.isCorrect && entry.confidence === "unsure") return "WEAK_POINT";
  return "FUNDAMENTAL_GAP";
}

// ── Grade ─────────────────────────────────────────────────────────────────
function getGrade(pct: number) {
  if (pct >= 90) return { grade: "S", label: "PERFECT", color: "#facc15", glowRgb: "250,204,21" };
  if (pct >= 75) return { grade: "A", label: "EXCELLENT", color: "#22c55e", glowRgb: "34,197,94" };
  if (pct >= 60) return { grade: "B", label: "GOOD", color: "#38bdf8", glowRgb: "56,189,248" };
  return { grade: "C", label: "NEEDS WORK", color: "#fb923c", glowRgb: "251,146,60" };
}

function fmtSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// ─────────────────────────────────────────────────────────────────────────
export function CommonTestResultPanel({
  questions,
  answers,
  historyItem,
  totalElapsedSec,
  theme,
  sectionTitle,
  subjectRoute,
  onRetry,
}: Props) {
  const totalQ = answers.length;
  const correctCount = historyItem.correctCount;
  const pct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const grade = getGrade(pct);
  const estimatedSec = historyItem.estimatedTotalTimeSec;
  const timeDiff = totalElapsedSec - estimatedSec;

  // Quadrant groups
  const groups = new Map<QuadrantId, AnswerEntry[]>();
  for (const qdef of QUADRANT_DEFS) groups.set(qdef.id, []);
  for (const entry of answers) {
    const qid = getQuadrantId(entry);
    groups.get(qid)!.push(entry);
  }

  // Weak skill tags top 5
  const top5Tags = historyItem.weakSkillTags.slice(0, 5);

  // Review queue: danger-first order — build ReviewCandidate[]
  const queueEntries = [
    ...(groups.get("DANGEROUS") ?? []).map((e) => ({ entry: e, def: QUADRANT_DEFS.find((d) => d.id === "DANGEROUS")! })),
    ...(groups.get("WEAK_POINT") ?? []).map((e) => ({ entry: e, def: QUADRANT_DEFS.find((d) => d.id === "WEAK_POINT")! })),
    ...(groups.get("FUNDAMENTAL_GAP") ?? []).map((e) => ({ entry: e, def: QUADRANT_DEFS.find((d) => d.id === "FUNDAMENTAL_GAP")! })),
    ...(groups.get("LUCKY_HIT") ?? []).map((e) => ({ entry: e, def: QUADRANT_DEFS.find((d) => d.id === "LUCKY_HIT")! })),
    ...(groups.get("TIME_LOSS") ?? []).map((e) => ({ entry: e, def: QUADRANT_DEFS.find((d) => d.id === "TIME_LOSS")! })),
  ].slice(0, 8);

  const reviewCandidates: ReviewCandidate[] = queueEntries.map(({ entry, def }) => {
    const q = questions.find((q) => q.id === entry.questionId);
    const reasonFlags: string[] = [];
    if (def.id === "DANGEROUS") reasonFlags.push("dangerous-misconception");
    if (def.id === "WEAK_POINT" || def.id === "FUNDAMENTAL_GAP") reasonFlags.push("wrong");
    if (def.id === "LUCKY_HIT") reasonFlags.push("guessed-correct");
    if (def.id === "TIME_LOSS") reasonFlags.push("wrong");
    if (historyItem.overTimeQuestionIds.includes(entry.questionId)) reasonFlags.push("overtime");
    return {
      questionId: entry.questionId,
      title: q?.title ?? entry.questionId,
      subjectId: q?.subjectId ?? "",
      sectionId: q?.sectionId ?? "",
      reasonFlags,
      skillTags: entry.skillTags,
      quadrantLabel: def.label,
      quadrantColor: def.color,
    };
  });

  return (
    <div className="space-y-6">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{
          background: `linear-gradient(135deg, rgba(${grade.glowRgb},0.08) 0%, rgba(0,0,0,0.6) 100%)`,
          border: `1px solid rgba(${grade.glowRgb},0.28)`,
          boxShadow: `0 0 40px rgba(${grade.glowRgb},0.08)`,
        }}
      >
        <div className="flex items-center gap-5">
          <div className="text-center shrink-0">
            <div
              className="font-display text-7xl font-extrabold leading-none"
              style={{
                color: grade.color,
                textShadow: `0 0 30px rgba(${grade.glowRgb},0.6)`,
              }}
            >
              {grade.grade}
            </div>
            <div
              className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color: `rgba(${grade.glowRgb},0.7)` }}
            >
              {grade.label}
            </div>
          </div>

          <div className="flex-1 space-y-3 min-w-0">
            <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider truncate">
              {sectionTitle}
            </div>

            <div>
              <div className="flex justify-between mb-1 font-mono text-[10px]">
                <span className="text-white/60">正答率</span>
                <span style={{ color: grade.color }}>
                  {correctCount} / {totalQ} ({pct}%)
                </span>
              </div>
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, rgba(${grade.glowRgb},0.7), rgba(${grade.glowRgb},1))`,
                    boxShadow: `0 0 8px rgba(${grade.glowRgb},0.5)`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <StatChip label="実際の時間" value={fmtSec(totalElapsedSec)} color="rgba(255,255,255,0.7)" />
              <StatChip label="推奨時間" value={fmtSec(estimatedSec)} color="rgba(255,255,255,0.4)" />
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{
            background: timeDiff > 0 ? "rgba(239,68,68,0.07)" : "rgba(34,197,94,0.07)",
            border: `1px solid ${timeDiff > 0 ? "rgba(239,68,68,0.22)" : "rgba(34,197,94,0.22)"}`,
          }}
        >
          {timeDiff > 0 ? (
            <TrendingUp className="h-4 w-4 text-red-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-green-400" />
          )}
          <span
            className="font-mono text-[11px] font-bold"
            style={{ color: timeDiff > 0 ? "#ef4444" : "#22c55e" }}
          >
            {timeDiff > 0
              ? `推奨より ${fmtSec(timeDiff)} オーバー`
              : `推奨より ${fmtSec(-timeDiff)} 短縮`}
          </span>
          {historyItem.overTimeQuestionIds.length > 0 && (
            <span className="ml-auto font-mono text-[9px] text-white/30">
              {historyItem.overTimeQuestionIds.length}問で時間超過
            </span>
          )}
        </div>
      </div>

      {/* ── TIME TRACE ────────────────────────────────────────────────── */}
      <SectionBlock label="TIME TRACE" color={theme.primary} glowRgb={theme.glowRgb}>
        <div className="space-y-1.5">
          {answers.map((entry, i) => {
            const q = questions.find((q) => q.id === entry.questionId);
            const estimatedForQ = (q?.estimatedMinutes ?? 0) * 60;
            const isOver = entry.timeSpentSec > estimatedForQ;
            const allTimes = answers.flatMap((a) => {
              const qq = questions.find((q) => q.id === a.questionId);
              return [a.timeSpentSec, (qq?.estimatedMinutes ?? 0) * 60];
            });
            const maxSec = Math.max(...allTimes, 1);
            const barPct = (entry.timeSpentSec / maxSec) * 100;
            const estPct = (estimatedForQ / maxSec) * 100;

            return (
              <div key={entry.questionId} className="flex items-center gap-2">
                <div className="w-6 shrink-0 text-right font-mono text-[9px] text-white/30">
                  Q{i + 1}
                </div>
                <div
                  className="flex-1 relative h-5 rounded overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded"
                    style={{
                      width: `${barPct}%`,
                      background: isOver ? "rgba(239,68,68,0.45)" : "rgba(34,197,94,0.35)",
                    }}
                  />
                  <div
                    className="absolute inset-y-0 w-px bg-white/20"
                    style={{ left: `${estPct}%` }}
                  />
                  <div className="absolute inset-y-0 left-2 flex items-center font-mono text-[8px] text-white/40">
                    {fmtSec(entry.timeSpentSec)}
                  </div>
                </div>
                <div className="w-5 shrink-0 flex justify-center">
                  {entry.isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                  )}
                </div>
              </div>
            );
          })}
          <div className="flex gap-4 font-mono text-[9px] text-white/25 mt-1 ml-8">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-sm bg-green-500/40" />時間内
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-sm bg-red-500/40" />超過
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-0.5 h-3 bg-white/25" />推奨
            </span>
          </div>
        </div>
      </SectionBlock>

      {/* ── CONFIDENCE MATRIX ─────────────────────────────────────────── */}
      <SectionBlock label="CONFIDENCE MATRIX" color={theme.primary} glowRgb={theme.glowRgb}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {QUADRANT_DEFS.filter((d) => (groups.get(d.id)?.length ?? 0) > 0).map((qdef) => {
            const entries = groups.get(qdef.id)!;
            return (
              <div
                key={qdef.id}
                className="rounded-xl p-3"
                style={{ background: qdef.bg, border: `1px solid ${qdef.border}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div
                      className="font-mono text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: qdef.color }}
                    >
                      {qdef.icon} {qdef.label}
                    </div>
                    <div className="font-mono text-[9px] text-white/35 mt-0.5">{qdef.sub}</div>
                  </div>
                  <div className="font-mono text-xl font-extrabold" style={{ color: qdef.color }}>
                    {entries.length}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entries.map((e) => {
                    const idx = answers.indexOf(e);
                    return (
                      <span
                        key={e.questionId}
                        className="rounded px-1.5 py-0.5 font-mono text-[9px]"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}
                      >
                        Q{idx + 1}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {(groups.get("DANGEROUS")?.length ?? 0) > 0 && (
          <div
            className="mt-3 flex items-start gap-3 rounded-xl p-3"
            style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)" }}
          >
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
            <div>
              <div className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-wide">
                DANGEROUS MISCONCEPTION 検出
              </div>
              <p className="mt-1 font-mono text-[10px] text-white/50 leading-relaxed">
                自信を持って解答したにもかかわらず不正解でした。誤った理解が定着している可能性があります。最優先で復習してください。
              </p>
            </div>
          </div>
        )}
      </SectionBlock>

      {/* ── WEAK SKILL TAGS ───────────────────────────────────────────── */}
      {top5Tags.length > 0 && (
        <SectionBlock label="WEAK SKILL TAGS" color={theme.primary} glowRgb={theme.glowRgb}>
          <div className="space-y-2">
            {top5Tags.map((tag, i) => (
              <div
                key={tag}
                className="flex items-start gap-3 rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[9px] font-bold"
                  style={{ background: `rgba(${theme.glowRgb},0.12)`, color: theme.primary }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded px-2 py-0.5 font-mono text-[10px] font-bold"
                      style={{
                        background: `rgba(${theme.glowRgb},0.10)`,
                        border: `1px solid rgba(${theme.glowRgb},0.25)`,
                        color: theme.primary,
                      }}
                    >
                      {tag}
                    </span>
                    {i === 0 && (
                      <span className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase"
                        style={{ background: "rgba(239,68,68,0.10)", color: "#f87171", border: "1px solid rgba(239,68,68,0.20)" }}>
                        TOP WEAKNESS
                      </span>
                    )}
                  </div>
                  {TAG_RECOMMENDATIONS[tag] && (
                    <p className="mt-1 font-mono text-[10px] leading-relaxed text-white/45">
                      → {TAG_RECOMMENDATIONS[tag]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* ── REVIEW QUEUE (DB登録) ─────────────────────────────────────── */}
      <ReviewQueueRegistrar candidates={reviewCandidates} theme={theme} />

      {/* ── NEXT ACTION ───────────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, rgba(${theme.glowRgb},0.22), rgba(${theme.glowRgb},0.10))`,
            border: `1px solid rgba(${theme.glowRgb},0.40)`,
            color: theme.primary,
          }}
        >
          <RotateCcw className="h-4 w-4" />
          RETRY
        </button>

        <Link
          href={`/common-test/${subjectRoute}`}
          className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.60)",
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          SUBJECT
        </Link>

        <Link
          href="/common-test"
          className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          <Home className="h-4 w-4" />
          COMMAND CENTER
        </Link>
      </div>
    </div>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────
function SectionBlock({
  label,
  color,
  glowRgb,
  children,
}: {
  label: string;
  color: string;
  glowRgb: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color }}
        >
          ▸ {label}
        </span>
        <div className="flex-1 h-px" style={{ background: `rgba(${glowRgb},0.18)` }} />
      </div>
      {children}
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="font-mono text-[8px] text-white/30 uppercase tracking-wide">{label}</div>
      <div className="mt-0.5 font-mono text-sm font-bold" style={{ color }}>{value}</div>
    </div>
  );
}
