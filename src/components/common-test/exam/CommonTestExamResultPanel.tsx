"use client";

import Link from "next/link";
import {
  Trophy,
  Clock,
  AlertTriangle,
  Flag,
  ChevronRight,
  BarChart3,
  BookOpen,
  RefreshCw,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { CommonTestExamHistoryItem, CommonTestExamAnswerRecord } from "@/lib/common-test-exam-history";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import { ReviewQueueRegistrar } from "@/components/common-test/ReviewQueueRegistrar";
import type { ReviewCandidate } from "@/components/common-test/ReviewQueueRegistrar";
import { CommonTestAiStrategyPanel } from "@/components/common-test/ai/CommonTestAiStrategyPanel";
import {
  analyzeExamResult,
  ALL_STAGES,
  type QuestionMetaForAnalysis,
  type DifficultyStage,
} from "@/lib/common-test-result-analysis";

type QuestionMapEntry = {
  title: string;
  skillTags: string[];
  difficultyStage?: DifficultyStage;
  dependsOnPrevious?: boolean;
  answerFormat?: "choice" | "number" | "digits" | "text";
};

interface Props {
  historyItem: CommonTestExamHistoryItem;
  preset: CommonTestExamPreset;
}

interface ExamResultPanelProps extends Props {
  questionTitlesMap: Map<string, QuestionMapEntry>;
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}分${s > 0 ? s + "秒" : ""}`;
}

function buildReviewCandidates(
  historyItem: CommonTestExamHistoryItem,
  questionTitlesMap: Map<string, QuestionMapEntry>,
): ReviewCandidate[] {
  const candidates: ReviewCandidate[] = [];

  for (const ans of historyItem.answers) {
    const info = questionTitlesMap.get(ans.questionId);
    if (!info) continue;

    let reasonFlags: string[] = [];
    let quadrantLabel = "";
    let quadrantColor = "";

    if (!ans.selectedAnswer) {
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
      continue;
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

const STAGE_ACCENT: Record<DifficultyStage, { bg: string; border: string; text: string; bar: string }> = {
  basic:    { bg: "rgba(34,197,94,0.06)",  border: "rgba(34,197,94,0.22)",  text: "#22c55e", bar: "34,197,94" },
  standard: { bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.22)", text: "#3b82f6", bar: "59,130,246" },
  guided:   { bg: "rgba(251,191,36,0.06)", border: "rgba(251,191,36,0.22)", text: "#fbbf24", bar: "251,191,36" },
  advanced: { bg: "rgba(239,68,68,0.06)",  border: "rgba(239,68,68,0.22)",  text: "#ef4444", bar: "239,68,68" },
};

export function CommonTestExamResultPanel({
  historyItem,
  preset,
  questionTitlesMap,
}: ExamResultPanelProps) {
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

  // Build meta map for analysis
  const metaMap = new Map<string, QuestionMetaForAnalysis>(
    Array.from(questionTitlesMap.entries()).map(([id, v]) => [
      id,
      {
        difficultyStage: v.difficultyStage,
        dependsOnPrevious: v.dependsOnPrevious,
        answerFormat: v.answerFormat,
      },
    ]),
  );

  const analysis = analyzeExamResult(
    historyItem.answers,
    metaMap,
    historyItem.examLimitSec,
    historyItem.actualDurationSec,
  );

  const isMath = historyItem.subjectId !== "english-reading";

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
          <SectionLabel color={preset.theme.primary}>◈ スコア分析</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <ScoreCard
              label="時間内スコア"
              sublabel={hasPoints ? "本番と同じ条件" : "時間内正答"}
              value={timeLimitValue}
              total={totalValue}
              unit={unitLabel}
              pct={historyItem.timeLimitScorePct}
              color="#fbbf24"
              glowRgb="251,191,36"
            />
            <ScoreCard
              label="無制限スコア"
              sublabel={hasPoints ? "時間をかけた場合" : "全問正答"}
              value={unlimitedValue}
              total={totalValue}
              unit={unitLabel}
              pct={historyItem.unlimitedScorePct}
              color="#22d3ee"
              glowRgb="34,211,238"
            />
            <div
              className="flex flex-col gap-3 rounded-2xl p-5"
              style={{
                background: gap > 0 ? "rgba(168,85,247,0.07)" : "rgba(34,197,94,0.07)",
                border: gap > 0 ? "1px solid rgba(168,85,247,0.25)" : "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                タイムロス
              </div>
              <div
                className="font-display text-5xl font-extrabold"
                style={{ color: gap > 0 ? "#a855f7" : "#22c55e" }}
              >
                {gap > 0 ? `+${gap}` : "0"}
              </div>
              <div className="font-mono text-[10px] text-white/45 leading-relaxed">
                {gap > 0
                  ? `時間があれば取れていた問題が${gap}${unitLabel}あります。理解はできているので、処理速度と時間配分が次の課題です。`
                  : "時間内に全問解き切れています。理想的なペースです。"}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Results ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary}>▸ 大問別結果</SectionLabel>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
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

        {/* ── Difficulty stage analysis ────────────────────────────────────── */}
        {analysis.hasMeaningfulStageData && (
          <section>
            <SectionLabel color={preset.theme.primary}>
              <BarChart3 className="inline h-3.5 w-3.5 mr-1.5 align-middle" />
              難易度別 正答率
            </SectionLabel>
            <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {analysis.stageStats.map((s) => {
                const accent = STAGE_ACCENT[s.stage];
                const pct = s.accuracy >= 0 ? s.accuracy : 0;
                const barColor =
                  pct >= 80 ? "34,197,94" : pct >= 60 ? "251,191,36" : "239,68,68";
                return (
                  <div key={s.stage} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 font-mono text-[9px] font-bold"
                          style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}
                        >
                          {s.label}
                        </span>
                        <span className="font-mono text-[10px] text-white/40">
                          {s.correct}/{s.total}問
                        </span>
                      </div>
                      <span
                        className="font-mono text-sm font-extrabold"
                        style={{ color: pct >= 80 ? "#22c55e" : pct >= 60 ? "#fbbf24" : "#ef4444" }}
                      >
                        {s.accuracy >= 0 ? `${pct}%` : "—"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: `rgba(${barColor},0.75)` }}
                      />
                    </div>
                  </div>
                );
              })}

              {analysis.weakestStage && (
                <p className="font-mono text-[10px] text-white/45 pt-1 border-t border-white/[0.06]">
                  「{STAGE_ACCENT[analysis.weakestStage] && analysis.stageStats.find((s) => s.stage === analysis.weakestStage)?.label}」レベルの問題が最も正答率が低い状態です。基礎からの見直しを優先してください。
                </p>
              )}

              {analysis.cascadeMisses.length > 0 && (
                <p className="font-mono text-[10px] text-amber-400/70 pt-1">
                  前の問題の結果を引き継ぐ設問で、{analysis.cascadeMisses.length}か所の連続ミスが見られます。誘導の流れを意識した読解練習が有効です。
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── MarkSheet accuracy (math only) ──────────────────────────────── */}
        {isMath && analysis.markSheetStats && (
          <section>
            <SectionLabel color={preset.theme.primary}>
              <Layers className="inline h-3.5 w-3.5 mr-1.5 align-middle" />
              解答形式別 正答率
            </SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <AnswerTypeCard
                label="数値・記述入力"
                description="数値を直接入力する問題"
                correct={analysis.markSheetStats.markSheetCorrect}
                total={analysis.markSheetStats.markSheetTotal}
                accuracy={analysis.markSheetStats.markSheetAccuracy}
                accentRgb="251,191,36"
              />
              {analysis.markSheetStats.choiceTotal > 0 && (
                <AnswerTypeCard
                  label="選択式"
                  description="選択肢から選ぶ問題"
                  correct={analysis.markSheetStats.choiceCorrect}
                  total={analysis.markSheetStats.choiceTotal}
                  accuracy={analysis.markSheetStats.choiceAccuracy}
                  accentRgb="34,211,238"
                />
              )}
            </div>
            {analysis.markSheetStats.markSheetAccuracy < analysis.markSheetStats.choiceAccuracy - 15 && (
              <p className="mt-3 font-mono text-[10px] text-amber-400/70">
                数値入力問題の正答率が選択問題より低い傾向があります。計算ミスや桁の入力ミスに注意してください。
              </p>
            )}
          </section>
        )}

        {/* ── Weak skill tags ─────────────────────────────────────────────── */}
        {historyItem.weakSkillTags.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary}>⚠ 弱点スキルタグ</SectionLabel>
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
          <SectionLabel color={preset.theme.primary}>◈ AI作戦会議</SectionLabel>
          <CommonTestAiStrategyPanel examHistoryItem={historyItem} theme={preset.theme} />
        </section>

        {/* ── Review queue ────────────────────────────────────────────────── */}
        {reviewCandidates.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary}>▸ 復習候補</SectionLabel>
            <ReviewQueueRegistrar candidates={reviewCandidates} theme={preset.theme} />
          </section>
        )}

        {/* ── Next steps ──────────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary}>▸ 次にやること</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">

            {/* Retry */}
            <Link
              href={`/common-test/simulator/${preset.id}`}
              className="group flex items-center gap-4 rounded-xl p-4 transition-all hover:opacity-90"
              style={{
                background: `rgba(${preset.theme.glowRgb},0.08)`,
                border: `1px solid rgba(${preset.theme.glowRgb},0.28)`,
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `rgba(${preset.theme.glowRgb},0.15)` }}
              >
                <RefreshCw className="h-4 w-4" style={{ color: preset.theme.primary }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[11px] font-bold" style={{ color: preset.theme.primary }}>もう一度受験する</div>
                <div className="font-mono text-[10px] text-white/35">同じ科目で再挑戦</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
            </Link>

            {/* Weakness boss */}
            <Link
              href="/common-test/weakness"
              className="group flex items-center gap-4 rounded-xl p-4 transition-all hover:opacity-90"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.22)",
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(239,68,68,0.12)" }}>
                <BarChart3 className="h-4 w-4 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[11px] font-bold text-red-400">弱点分析を確認する</div>
                <div className="font-mono text-[10px] text-white/35">優先して取り組む課題を確認</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
            </Link>

            {/* Daily playlist */}
            <Link
              href="/common-test/daily"
              className="group flex items-center gap-4 rounded-xl p-4 transition-all hover:opacity-90"
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.20)",
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(34,197,94,0.12)" }}>
                <BookOpen className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[11px] font-bold text-emerald-400">今日の学習メニューへ</div>
                <div className="font-mono text-[10px] text-white/35">大問別ドリルで定着を図る</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
            </Link>

            {/* Other exam / history */}
            <div className="flex gap-3">
              <Link
                href="/common-test/simulator"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-4 font-mono text-[10px] transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                科目を変える
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/common-test/history"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-4 font-mono text-[10px] transition-all hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                演習履歴
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
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
}: {
  label: string;
  sublabel: string;
  value: number;
  total: number;
  unit: string;
  pct: number;
  color: string;
  glowRgb: string;
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
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, rgba(${glowRgb},0.6), rgba(${glowRgb},1))`,
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold" style={{ color }}>{pct}%</span>
        <span className="font-mono text-[9px] text-white/30">{sublabel}</span>
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

function AnswerTypeCard({
  label,
  description,
  correct,
  total,
  accuracy,
  accentRgb,
}: {
  label: string;
  description: string;
  correct: number;
  total: number;
  accuracy: number;
  accentRgb: string;
}) {
  const accColor = accuracy >= 80 ? "#22c55e" : accuracy >= 60 ? "#fbbf24" : "#ef4444";
  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{ background: `rgba(${accentRgb},0.05)`, border: `1px solid rgba(${accentRgb},0.18)` }}
    >
      <div>
        <div className="font-mono text-[10px] font-bold" style={{ color: `rgba(${accentRgb},0.9)` }}>{label}</div>
        <div className="font-mono text-[9px] text-white/30 mt-0.5">{description}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-mono text-[11px] text-white/50">{correct}/{total}問</span>
        <span className="font-mono text-xl font-extrabold" style={{ color: accColor }}>{accuracy}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${accuracy}%`, background: `rgba(${accentRgb},0.7)` }}
        />
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "255,255,255";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}
