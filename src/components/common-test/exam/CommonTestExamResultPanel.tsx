"use client";

import Link from "next/link";
import { Trophy, Clock, AlertTriangle, Flag, ChevronRight } from "lucide-react";
import type { CommonTestExamHistoryItem, CommonTestExamAnswerRecord } from "@/lib/common-test-exam-history";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import { ReviewQueueRegistrar } from "@/components/common-test/ReviewQueueRegistrar";
import type { ReviewCandidate } from "@/components/common-test/ReviewQueueRegistrar";
import { CommonTestAiStrategyPanel } from "@/components/common-test/ai/CommonTestAiStrategyPanel";

interface Props {
  historyItem: CommonTestExamHistoryItem;
  preset: CommonTestExamPreset;
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}分${s > 0 ? s + "秒" : ""}`;
}

function buildReviewCandidates(
  historyItem: CommonTestExamHistoryItem,
  questionTitlesMap: Map<string, { title: string; skillTags: string[] }>
): ReviewCandidate[] {
  const candidates: ReviewCandidate[] = [];

  for (const ans of historyItem.answers) {
    const info = questionTitlesMap.get(ans.questionId);
    if (!info) continue;

    let reasonFlags: string[] = [];
    let quadrantLabel = "";
    let quadrantColor = "";

    if (!ans.selectedAnswer) {
      // Unanswered
      reasonFlags = ["unanswered"];
      quadrantLabel = "未解答";
      quadrantColor = "#6b7280";
    } else if (!ans.isCorrect && ans.confidence === "confident") {
      reasonFlags = ["wrong", "confident"];
      quadrantLabel = "思い込みミス";
      quadrantColor = "#ef4444";
    } else if (!ans.isCorrect) {
      reasonFlags = ["wrong"];
      quadrantLabel = "要復習";
      quadrantColor = "#f97316";
    } else if (ans.isCorrect && ans.confidence === "guessed") {
      reasonFlags = ["guessed_correct"];
      quadrantLabel = "まぐれ正解";
      quadrantColor = "#fbbf24";
    } else {
      continue; // Correct + confident — skip
    }

    if (reasonFlags.length > 0) {
      candidates.push({
        questionId: ans.questionId,
        title: info.title,
        subjectId: historyItem.subjectId,
        sectionId: ans.sectionId,
        reasonFlags,
        skillTags: info.skillTags,
        quadrantLabel,
        quadrantColor,
      });
    }
  }

  return candidates;
}

interface ExamResultPanelProps extends Props {
  questionTitlesMap: Map<string, { title: string; skillTags: string[] }>;
}

export function CommonTestExamResultPanel({
  historyItem,
  preset,
  questionTitlesMap,
}: ExamResultPanelProps) {
  // 配点ベースのスコアがあればそれを優先、なければ問題数ベース
  const hasPoints =
    historyItem.maxScore != null &&
    historyItem.timeLimitScore != null &&
    historyItem.unlimitedScore != null;
  const timeLimitValue = hasPoints ? historyItem.timeLimitScore! : historyItem.timeLimitCorrect;
  const unlimitedValue = hasPoints ? historyItem.unlimitedScore! : historyItem.unlimitedCorrect;
  const totalValue = hasPoints ? historyItem.maxScore! : historyItem.totalQuestions;
  const unitLabel = hasPoints ? "点" : "問";
  const gap = unlimitedValue - timeLimitValue;
  const finishedOnTime = historyItem.actualDurationSec <= historyItem.examLimitSec;
  const reviewCandidates = buildReviewCandidates(historyItem, questionTitlesMap);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(${preset.theme.glowRgb},0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(${preset.theme.glowRgb},0.018) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(${preset.theme.glowRgb},0.07) 0%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 space-y-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{ background: `rgba(${preset.theme.glowRgb},0.08)`, border: `1px solid rgba(${preset.theme.glowRgb},0.22)`, color: preset.theme.primary }}
          >
            <Trophy className="h-3.5 w-3.5" />
            EXAM RESULT
          </div>
          <h2
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: `linear-gradient(135deg, ${preset.theme.primary} 0%, #ffffff 50%, ${preset.theme.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            試験終了
          </h2>
          <p className="mt-3 font-mono text-sm text-white/40">
            {preset.title} — 所要時間: {formatDuration(historyItem.actualDurationSec)}
            {!finishedOnTime && (
              <span className="text-amber-400 ml-2">(時間超過 +{formatDuration(historyItem.actualDurationSec - historyItem.examLimitSec)})</span>
            )}
          </p>
        </header>

        {/* ── Dual Score ─────────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary}>◈ DUAL SCORE ANALYSIS</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Time-limit score */}
            <ScoreCard
              label="時間内スコア"
              sublabel={hasPoints ? "100点換算" : "時間内正答"}
              value={timeLimitValue}
              total={totalValue}
              unit={unitLabel}
              pct={historyItem.timeLimitScorePct}
              color="#fbbf24"
              glowRgb="251,191,36"
              description="本番と同じ条件での得点"
            />
            {/* Unlimited score */}
            <ScoreCard
              label="無制限スコア"
              sublabel={hasPoints ? "100点換算" : "全問正答"}
              value={unlimitedValue}
              total={totalValue}
              unit={unitLabel}
              pct={historyItem.unlimitedScorePct}
              color="#22d3ee"
              glowRgb="34,211,238"
              description="時間をかければ取れる得点"
            />
            {/* Gap */}
            <div
              className="flex flex-col gap-3 rounded-2xl p-5"
              style={{
                background: gap > 0 ? "rgba(168,85,247,0.07)" : "rgba(34,197,94,0.07)",
                border: gap > 0 ? "1px solid rgba(168,85,247,0.25)" : "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                スコア差
              </div>
              <div
                className="font-display text-5xl font-extrabold"
                style={{ color: gap > 0 ? "#a855f7" : "#22c55e" }}
              >
                {gap > 0 ? `+${gap}` : "0"}
              </div>
              <div className="font-mono text-[10px] text-white/45 leading-relaxed">
                {gap > 0
                  ? `時間内に解き切れていれば、あと${gap}${unitLabel}上積みできました。理解はできているので、処理速度と時間配分が次の課題です。`
                  : "時間内のスコアと無制限スコアが一致しています。理想的な時間配分です。"}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Results ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary}>▸ SECTION ANALYSIS</SectionLabel>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-4 sm:grid-cols-6 gap-2 px-4 py-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white/30"
              style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="col-span-2">大問</div>
              <div className="hidden sm:block text-center">解答/出題</div>
              <div className="text-center">正答</div>
              <div className="hidden sm:block text-center">得点/配点</div>
              <div className="text-center">正答率</div>
            </div>
            {historyItem.sectionResults.map((sr, idx) => {
              const accuracy =
                sr.answeredCount > 0
                  ? Math.round((sr.correctCount / sr.answeredCount) * 100)
                  : 0;
              const accuracyColor =
                accuracy >= 80 ? "#22c55e" : accuracy >= 60 ? "#fbbf24" : "#ef4444";
              return (
                <div
                  key={sr.sectionId}
                  className="grid grid-cols-4 sm:grid-cols-6 gap-2 px-4 py-3 items-center"
                  style={{
                    background: idx % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="col-span-2 min-w-0">
                    <div className="font-mono text-[10px] font-bold" style={{ color: preset.theme.primary }}>
                      第{sr.sectionNumber}問
                    </div>
                    {sr.sectionTitle && (
                      <div className="font-mono text-[9px] text-white/35 truncate">{sr.sectionTitle}</div>
                    )}
                  </div>
                  <div className="hidden sm:block text-center font-mono text-[11px] text-white/55">
                    {sr.answeredCount}/{sr.totalQuestions}
                  </div>
                  <div className="text-center font-mono text-[11px] text-white/80 font-bold">{sr.correctCount}</div>
                  <div className="hidden sm:block text-center font-mono text-[11px] font-bold text-white/80">
                    {sr.maxScore != null ? `${sr.earnedScore ?? 0}/${sr.maxScore}` : "—"}
                  </div>
                  <div className="text-center font-mono text-[11px] font-bold" style={{ color: accuracyColor }}>
                    {sr.answeredCount > 0 ? `${accuracy}%` : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Summary stats ───────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStatCard
            icon={<Trophy className="h-4 w-4" />}
            label="合計正答"
            value={`${historyItem.unlimitedCorrect} / ${historyItem.totalQuestions}`}
            color="#fbbf24"
          />
          <MiniStatCard
            icon={<Clock className="h-4 w-4" />}
            label="所要時間"
            value={formatDuration(historyItem.actualDurationSec)}
            color={preset.theme.primary}
          />
          <MiniStatCard
            icon={<AlertTriangle className="h-4 w-4" />}
            label="未回答"
            value={`${historyItem.unansweredCount}問`}
            color={historyItem.unansweredCount > 0 ? "#ef4444" : "rgba(255,255,255,0.35)"}
          />
          <MiniStatCard
            icon={<Flag className="h-4 w-4" />}
            label="弱点タグ"
            value={historyItem.weakSkillTags[0] ?? "—"}
            color="#f97316"
            small
          />
        </section>

        {/* ── Weak skill tags ─────────────────────────────────────────────── */}
        {historyItem.weakSkillTags.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary}>⚠ WEAK SKILL TAGS</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {historyItem.weakSkillTags.slice(0, 6).map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-xl px-3 py-1.5 font-mono text-[10px] font-bold"
                  style={{
                    background:
                      i === 0
                        ? `rgba(${preset.theme.glowRgb},0.14)`
                        : "rgba(255,255,255,0.05)",
                    border:
                      i === 0
                        ? `1px solid rgba(${preset.theme.glowRgb},0.35)`
                        : "1px solid rgba(255,255,255,0.10)",
                    color: i === 0 ? preset.theme.primary : "rgba(255,255,255,0.50)",
                  }}
                >
                  {i === 0 && "★ "}
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── AI作戦会議 ──────────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary}>◈ AI STRATEGY — AI作戦会議</SectionLabel>
          <CommonTestAiStrategyPanel examHistoryItem={historyItem} theme={preset.theme} />
        </section>

        {/* ── Review queue ────────────────────────────────────────────────── */}
        {reviewCandidates.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary}>▸ REVIEW QUEUE CANDIDATES</SectionLabel>
            <ReviewQueueRegistrar candidates={reviewCandidates} theme={preset.theme} />
          </section>
        )}

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <section className="flex flex-wrap gap-3 pt-4">
          <Link
            href={`/common-test/simulator/${preset.id}`}
            className="flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-90"
            style={{
              background: `rgba(${preset.theme.glowRgb},0.14)`,
              border: `1px solid rgba(${preset.theme.glowRgb},0.35)`,
              color: preset.theme.primary,
            }}
          >
            もう一度受験する
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/common-test/simulator"
            className="flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            科目を変える
          </Link>
          <Link
            href="/common-test/history"
            className="flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            演習履歴
          </Link>
        </section>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────
function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  const rgb = hexToRgb(color);
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: `rgba(${rgb},0.18)` }} />
    </div>
  );
}

function ScoreCard({
  label,
  sublabel,
  value,
  total,
  unit,
  pct,
  color,
  glowRgb,
  description,
}: {
  label: string;
  sublabel: string;
  value: number;
  total: number;
  unit: string;
  pct: number;
  color: string;
  glowRgb: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-5"
      style={{
        background: `rgba(${glowRgb},0.05)`,
        border: `1px solid rgba(${glowRgb},0.22)`,
      }}
    >
      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: `rgba(${glowRgb},0.8)` }}>
        {label}
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-5xl font-extrabold" style={{ color }}>
          {value}
        </span>
        <span className="font-mono text-sm text-white/35 mb-1">/ {total}{unit}</span>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, rgba(${glowRgb},0.6), rgba(${glowRgb},1))`,
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold" style={{ color }}>{pct}%</span>
        <span className="font-mono text-[9px] text-white/30">{description}</span>
      </div>
    </div>
  );
}

function MiniStatCard({
  icon,
  label,
  value,
  color,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-2 rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-1.5 font-mono text-[8px] text-white/25">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div
        className={`font-mono font-extrabold leading-tight ${small ? "text-[11px]" : "text-lg"}`}
        style={{ color }}
      >
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
