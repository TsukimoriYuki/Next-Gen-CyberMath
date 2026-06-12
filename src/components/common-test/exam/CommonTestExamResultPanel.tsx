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
import { CommonTestGuidedReviewPanel } from "@/components/common-test/CommonTestGuidedReviewPanel";
import type { CommonTestGuidedReviewItem } from "@/lib/common-test-guided-review";
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
  guidedReviewItems: CommonTestGuidedReviewItem[];
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
  basic:    { bg: "#f0fdf4", border: "#bbf7d0", text: "#059669", bar: "5,150,105" },
  standard: { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb", bar: "37,99,235" },
  guided:   { bg: "#fffbeb", border: "#fde68a", text: "#d97706", bar: "217,119,6" },
  advanced: { bg: "#fff1f2", border: "#fecdd3", text: "#e11d48", bar: "225,29,72" },
};

export function CommonTestExamResultPanel({
  historyItem,
  preset,
  questionTitlesMap,
  guidedReviewItems,
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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(${preset.theme.glowRgb},0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(${preset.theme.glowRgb},0.05) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 360px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 360px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ background: `${preset.theme.primary}10`, borderColor: `${preset.theme.primary}33`, color: preset.theme.primary }}
          >
            <Trophy className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">演習結果</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-60">Result</span>
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            試験終了
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {preset.title} — 所要時間: {formatDuration(historyItem.actualDurationSec)}
            {!finishedOnTime && (
              <span className="ml-2 text-amber-600">(時間超過 +{formatDuration(historyItem.actualDurationSec - historyItem.examLimitSec)})</span>
            )}
          </p>
        </header>

        {/* ── Dual Score ─────────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary} en="Score">スコア分析</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <ScoreCard
              label="時間内スコア"
              sublabel={hasPoints ? "本番と同じ条件" : "時間内正答"}
              value={timeLimitValue}
              total={totalValue}
              unit={unitLabel}
              pct={historyItem.timeLimitScorePct}
              color="#2563eb"
            />
            <ScoreCard
              label="時間外スコア"
              sublabel={hasPoints ? "時間をかけた場合" : "全問正答"}
              value={unlimitedValue}
              total={totalValue}
              unit={unitLabel}
              pct={historyItem.unlimitedScorePct}
              color="#0891b2"
            />
            <div
              className="flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm"
              style={{ borderColor: gap > 0 ? "#ddd6fe" : "#a7f3d0" }}
            >
              <div className="text-xs font-bold text-slate-500">
                タイムロス
              </div>
              <div
                className="font-display text-5xl font-extrabold"
                style={{ color: gap > 0 ? "#7c3aed" : "#059669" }}
              >
                {gap > 0 ? `+${gap}` : "0"}
              </div>
              <div className="text-xs leading-relaxed text-slate-500">
                {gap > 0
                  ? `時間があれば取れていた問題が${gap}${unitLabel}あります。理解はできているので、処理速度と時間配分が次の課題です。`
                  : "時間内に全問解き切れています。理想的なペースです。"}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Results ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary} en="By Section">大問別結果</SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-4 gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-bold text-slate-400 sm:grid-cols-6">
              <div className="col-span-2">大問</div>
              <div className="hidden text-center sm:block">解答/出題</div>
              <div className="text-center">正答</div>
              <div className="hidden text-center sm:block">得点/配点</div>
              <div className="text-center">正答率</div>
            </div>
            {historyItem.sectionResults.map((sr) => {
              const accuracy =
                sr.answeredCount > 0
                  ? Math.round((sr.correctCount / sr.answeredCount) * 100)
                  : 0;
              const accuracyColor =
                accuracy >= 80 ? "#059669" : accuracy >= 60 ? "#d97706" : "#e11d48";
              return (
                <div
                  key={sr.sectionId}
                  className="grid grid-cols-4 items-center gap-2 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:grid-cols-6"
                >
                  <div className="col-span-2 min-w-0">
                    <div className="text-xs font-bold" style={{ color: preset.theme.primary }}>
                      第{sr.sectionNumber}問
                    </div>
                    {sr.sectionTitle && (
                      <div className="truncate text-[11px] text-slate-400">{sr.sectionTitle}</div>
                    )}
                  </div>
                  <div className="hidden text-center font-mono text-[11px] text-slate-500 sm:block">
                    {sr.answeredCount}/{sr.totalQuestions}
                  </div>
                  <div className="text-center font-mono text-[11px] font-bold text-slate-800">{sr.correctCount}</div>
                  <div className="hidden text-center font-mono text-[11px] font-bold text-slate-800 sm:block">
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
            color="#2563eb"
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
            color={historyItem.unansweredCount > 0 ? "#e11d48" : "#94a3b8"}
          />
          <MiniStatCard
            icon={<Flag className="h-4 w-4" />}
            label="弱点タグ"
            value={historyItem.weakSkillTags[0] ?? "—"}
            color="#ea580c"
            small
          />
        </section>

        {/* ── Difficulty stage analysis ────────────────────────────────────── */}
        {analysis.hasMeaningfulStageData && (
          <section>
            <SectionLabel color={preset.theme.primary} en="By Difficulty" icon={<BarChart3 className="h-4 w-4" />}>
              難易度別 正答率
            </SectionLabel>
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              {analysis.stageStats.map((s) => {
                const accent = STAGE_ACCENT[s.stage];
                const pct = s.accuracy >= 0 ? s.accuracy : 0;
                const barColor =
                  pct >= 80 ? "5,150,105" : pct >= 60 ? "217,119,6" : "225,29,72";
                return (
                  <div key={s.stage} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-[11px] font-bold"
                          style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}
                        >
                          {s.label}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {s.correct}/{s.total}問
                        </span>
                      </div>
                      <span
                        className="font-mono text-sm font-extrabold"
                        style={{ color: pct >= 80 ? "#059669" : pct >= 60 ? "#d97706" : "#e11d48" }}
                      >
                        {s.accuracy >= 0 ? `${pct}%` : "—"}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: `rgb(${barColor})` }}
                      />
                    </div>
                  </div>
                );
              })}

              {analysis.weakestStage && (
                <p className="border-t border-slate-100 pt-3 text-xs text-slate-600">
                  「{STAGE_ACCENT[analysis.weakestStage] && analysis.stageStats.find((s) => s.stage === analysis.weakestStage)?.label}」レベルの問題が最も正答率が低い状態です。基礎からの見直しを優先してください。
                </p>
              )}

              {analysis.cascadeMisses.length > 0 && (
                <p className="pt-1 text-xs text-amber-700">
                  前の問題の結果を引き継ぐ設問で、{analysis.cascadeMisses.length}か所の連続ミスが見られます。誘導の流れを意識した読解練習が有効です。
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── MarkSheet accuracy (math only) ──────────────────────────────── */}
        {isMath && analysis.markSheetStats && (
          <section>
            <SectionLabel color={preset.theme.primary} en="By Format" icon={<Layers className="h-4 w-4" />}>
              解答形式別 正答率
            </SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <AnswerTypeCard
                label="数値・記述入力"
                description="数値を直接入力する問題"
                correct={analysis.markSheetStats.markSheetCorrect}
                total={analysis.markSheetStats.markSheetTotal}
                accuracy={analysis.markSheetStats.markSheetAccuracy}
                accentColor="#2563eb"
              />
              {analysis.markSheetStats.choiceTotal > 0 && (
                <AnswerTypeCard
                  label="選択式"
                  description="選択肢から選ぶ問題"
                  correct={analysis.markSheetStats.choiceCorrect}
                  total={analysis.markSheetStats.choiceTotal}
                  accuracy={analysis.markSheetStats.choiceAccuracy}
                  accentColor="#0891b2"
                />
              )}
            </div>
            {analysis.markSheetStats.markSheetAccuracy < analysis.markSheetStats.choiceAccuracy - 15 && (
              <p className="mt-3 text-xs text-amber-700">
                数値入力問題の正答率が選択問題より低い傾向があります。計算ミスや桁の入力ミスに注意してください。
              </p>
            )}
          </section>
        )}

        {/* ── Weak skill tags ─────────────────────────────────────────────── */}
        {historyItem.weakSkillTags.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary} en="Weak Tags">弱点スキルタグ</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {historyItem.weakSkillTags.slice(0, 6).map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-xl px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: i === 0 ? `${preset.theme.primary}14` : "#f1f5f9",
                    border: i === 0 ? `1px solid ${preset.theme.primary}40` : "1px solid #e2e8f0",
                    color: i === 0 ? preset.theme.primary : "#64748b",
                  }}
                >
                  {i === 0 && "★ "}
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {guidedReviewItems.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary} en="Guided Review">段階復習</SectionLabel>
            <CommonTestGuidedReviewPanel
              items={guidedReviewItems}
              title="間違えた問題から段階的に復習"
              description="不正解・未解答・前問利用の問題を優先して並べます。まずヒントだけを開き、考えてから完全解説へ進みましょう。"
              theme={preset.theme}
            />
          </section>
        )}

        {/* ── AI作戦会議 ──────────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary} en="AI Strategy">AI作戦会議</SectionLabel>
          <CommonTestAiStrategyPanel examHistoryItem={historyItem} theme={preset.theme} />
        </section>

        {/* ── Review queue ────────────────────────────────────────────────── */}
        {reviewCandidates.length > 0 && (
          <section>
            <SectionLabel color={preset.theme.primary} en="Review">復習候補</SectionLabel>
            <ReviewQueueRegistrar candidates={reviewCandidates} theme={preset.theme} />
          </section>
        )}

        {/* ── Next steps ──────────────────────────────────────────────────── */}
        <section>
          <SectionLabel color={preset.theme.primary} en="Next Steps">次にやること</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">

            {/* Retry */}
            <Link
              href={`/common-test/simulator/${preset.id}`}
              className="group flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md"
              style={{ borderColor: `${preset.theme.primary}40` }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${preset.theme.primary}14` }}
              >
                <RefreshCw className="h-4 w-4" style={{ color: preset.theme.primary }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold" style={{ color: preset.theme.primary }}>もう一度受験する</div>
                <div className="text-xs text-slate-500">同じ科目で再挑戦</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </Link>

            {/* Weakness boss */}
            <Link
              href="/common-test/weakness"
              className="group flex items-center gap-4 rounded-xl border border-rose-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                <BarChart3 className="h-4 w-4 text-rose-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-rose-600">弱点分析を確認する</div>
                <div className="text-xs text-slate-500">優先して取り組む課題を確認</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </Link>

            {/* Daily playlist */}
            <Link
              href="/common-test/daily"
              className="group flex items-center gap-4 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                <BookOpen className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-emerald-600">今日の学習メニューへ</div>
                <div className="text-xs text-slate-500">大問別ドリルで定着を図る</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </Link>

            {/* Other exam / history */}
            <div className="flex gap-3">
              <Link
                href="/common-test/simulator"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                科目を変える
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/common-test/history"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
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

function SectionLabel({
  children,
  color,
  en,
  icon,
}: {
  children: React.ReactNode;
  color: string;
  en?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex items-center gap-2">
        {icon && <span style={{ color }}>{icon}</span>}
        <h3 className="text-sm font-bold text-slate-900">{children}</h3>
        {en && (
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">{en}</span>
        )}
      </div>
      <div className="h-px flex-1 bg-slate-200" />
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
}: {
  label: string;
  sublabel: string;
  value: number;
  total: number;
  unit: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-bold text-slate-500">
        {label}
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-5xl font-extrabold" style={{ color }}>
          {value}
        </span>
        <span className="mb-1 font-mono text-sm text-slate-400">/ {total}{unit}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold" style={{ color }}>{pct}%</span>
        <span className="text-[11px] text-slate-400">{sublabel}</span>
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
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div
        className={`font-extrabold leading-tight ${small ? "text-xs" : "font-mono text-lg"}`}
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
  accentColor,
}: {
  label: string;
  description: string;
  correct: number;
  total: number;
  accuracy: number;
  accentColor: string;
}) {
  const accColor = accuracy >= 80 ? "#059669" : accuracy >= 60 ? "#d97706" : "#e11d48";
  return (
    <div className="space-y-3 rounded-xl border bg-white p-4 shadow-sm" style={{ borderColor: `${accentColor}33` }}>
      <div>
        <div className="text-xs font-bold" style={{ color: accentColor }}>{label}</div>
        <div className="mt-0.5 text-[11px] text-slate-400">{description}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-mono text-[11px] text-slate-500">{correct}/{total}問</span>
        <span className="font-mono text-xl font-extrabold" style={{ color: accColor }}>{accuracy}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full" style={{ width: `${accuracy}%`, background: accentColor }} />
      </div>
    </div>
  );
}
