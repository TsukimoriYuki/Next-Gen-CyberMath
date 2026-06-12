"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import katex from "katex";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ListChecks,
  PlusCircle,
  Target,
} from "lucide-react";
import type { CommonTestGuidedReviewItem } from "@/lib/common-test-guided-review";
import { canGenerateCommonTestVariant } from "@/lib/common-test-variant-generator";
import { CommonTestVariantPracticePanel } from "@/components/common-test/CommonTestVariantPracticePanel";

interface Props {
  items: CommonTestGuidedReviewItem[];
  title?: string;
  description?: string;
  theme?: { primary: string; glowRgb: string };
  compact?: boolean;
  initialQuestionId?: string;
}

const DEFAULT_THEME = { primary: "#fbbf24", glowRgb: "251,191,36" };

export function CommonTestGuidedReviewPanel({
  items,
  title = "Guided Review Mode",
  description = "ヒントを少しずつ開き、考える余地を残したまま復習できます。",
  theme = DEFAULT_THEME,
  compact = false,
  initialQuestionId,
}: Props) {
  const orderedItems = useMemo(
    () => [...items].sort((a, b) => reviewSortScore(b) - reviewSortScore(a)),
    [items],
  );
  const firstId = initialQuestionId ?? orderedItems[0]?.questionId ?? null;
  const [openId, setOpenId] = useState<string | null>(firstId);
  const [revealedCounts, setRevealedCounts] = useState<Record<string, number>>({});
  const [variantPracticeId, setVariantPracticeId] = useState<string | null>(null);

  useEffect(() => {
    setOpenId(initialQuestionId ?? orderedItems[0]?.questionId ?? null);
    setRevealedCounts({});
    setVariantPracticeId(null);
  }, [initialQuestionId, orderedItems]);

  if (orderedItems.length === 0) return null;

  const wrongCount = orderedItems.filter((item) => item.isCorrect === false).length;
  const unresolvedCount = orderedItems.filter((item) => item.isCorrect !== true).length;

  return (
    <div
      className={`rounded-2xl ${compact ? "p-4" : "p-5 sm:p-6"} space-y-4`}
      style={{
        background: `rgba(${theme.glowRgb},0.045)`,
        border: `1px solid rgba(${theme.glowRgb},0.18)`,
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: `rgba(${theme.glowRgb},0.10)`,
              border: `1px solid rgba(${theme.glowRgb},0.24)`,
              color: theme.primary,
            }}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            段階復習
          </div>
          <h3 className="font-mono text-sm font-extrabold text-white/80">{title}</h3>
          <p className="max-w-2xl font-mono text-[10px] leading-relaxed text-white/38">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <MiniBadge label="対象" value={`${orderedItems.length}問`} color={theme.primary} />
          {wrongCount > 0 && <MiniBadge label="不正解" value={`${wrongCount}問`} color="#ef4444" />}
          {unresolvedCount > wrongCount && (
            <MiniBadge label="要確認" value={`${unresolvedCount - wrongCount}問`} color="#f97316" />
          )}
        </div>
      </div>

      <div className="space-y-3">
        {orderedItems.map((item, index) => {
          const isOpen = openId === item.questionId;
          const revealed = revealedCounts[item.questionId] ?? 1;
          const stepsToShow = item.steps.slice(0, revealed);
          const canRevealMore = revealed < item.steps.length;
          const canPracticeVariant = canGenerateCommonTestVariant(item);
          const isVariantPracticeOpen = variantPracticeId === item.questionId;
          const status = getStatus(item);

          return (
            <div
              key={`${item.examId ?? "drill"}:${item.questionId}`}
              className="overflow-hidden rounded-xl"
              style={{
                background: "rgba(0,0,0,0.22)",
                border: `1px solid ${isOpen ? `rgba(${theme.glowRgb},0.30)` : "rgba(255,255,255,0.07)"}`,
              }}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.questionId)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-all hover:bg-white/[0.02]"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-extrabold"
                  style={{
                    background: `${status.color}18`,
                    border: `1px solid ${status.color}35`,
                    color: status.color,
                  }}
                >
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold"
                      style={{ color: status.color, background: `${status.color}14` }}
                    >
                      {status.label}
                    </span>
                    {item.difficultyStage && (
                      <span className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[8px] text-white/35">
                        {formatStage(item.difficultyStage)}
                        {item.dependsOnPrevious ? "・前問利用" : ""}
                      </span>
                    )}
                    <span className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[8px] text-white/35">
                      {formatAnswerFormat(item.answerFormat)}
                    </span>
                  </div>
                  <div className="mt-1 truncate font-mono text-[11px] font-bold text-white/72">
                    {item.title}
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-white/30" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-white/30" />
                )}
              </button>

              {isOpen && (
                <div className="space-y-4 px-4 pb-4 pt-1">
                  <div
                    className="rounded-lg p-3 space-y-3"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/28">
                      問題の確認
                    </div>
                    <QuestionMaterial item={item} />
                    <div className="font-mono text-[12px] leading-relaxed text-white/74">
                      <RenderMath text={item.statement} />
                    </div>
                    <AnswerLine item={item} />
                  </div>

                  <div className="space-y-2">
                    {stepsToShow.map((step) => (
                      <div
                        key={step.kind}
                        className="rounded-lg p-3"
                        style={{
                          background: getStepColor(step.kind).bg,
                          border: `1px solid ${getStepColor(step.kind).border}`,
                        }}
                      >
                        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] font-extrabold" style={{ color: getStepColor(step.kind).text }}>
                          {getStepIcon(step.kind)}
                          {step.label}
                        </div>
                        <div className="font-mono text-[11px] leading-relaxed text-white/66">
                          <RenderMath text={step.body} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skillTags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded px-1.5 py-0.5 font-mono text-[8px]"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.38)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {canRevealMore && (
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedCounts((prev) => ({
                              ...prev,
                              [item.questionId]: Math.min(item.steps.length, revealed + 1),
                            }))
                          }
                          className="rounded-lg px-3 py-2 font-mono text-[10px] font-bold transition-all hover:opacity-85"
                          style={{
                            background: `rgba(${theme.glowRgb},0.13)`,
                            border: `1px solid rgba(${theme.glowRgb},0.32)`,
                            color: theme.primary,
                          }}
                        >
                          次のヒントを開く
                        </button>
                      )}
                      {canPracticeVariant && (
                        <button
                          type="button"
                          onClick={() =>
                            setVariantPracticeId((current) =>
                              current === item.questionId ? null : item.questionId
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[10px] font-bold transition-all hover:opacity-85"
                          style={{
                            background: "rgba(34,197,94,0.08)",
                            border: "1px solid rgba(34,197,94,0.24)",
                            color: "#86efac",
                          }}
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          この型の類題を解く
                        </button>
                      )}
                      <Link
                        href={item.nextHref}
                        className="rounded-lg px-3 py-2 font-mono text-[10px] font-bold transition-all hover:opacity-85"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "rgba(255,255,255,0.62)",
                        }}
                      >
                        関連演習へ
                      </Link>
                    </div>
                  </div>

                  {canPracticeVariant && isVariantPracticeOpen && (
                    <CommonTestVariantPracticePanel
                      sourceItem={item}
                      theme={theme}
                      onClose={() => setVariantPracticeId(null)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuestionMaterial({ item }: { item: CommonTestGuidedReviewItem }) {
  if (!item.examContext && !item.examPassage && !item.context && !item.passage && !item.sharedStem && !item.sharedData) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-lg bg-white/[0.03] p-3">
      {(item.examContext || item.examPassage || item.context || item.passage) && (
        <div className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-white/45">
          <RenderMath text={item.examContext ?? item.examPassage ?? item.context ?? item.passage ?? ""} />
        </div>
      )}
      {item.sharedData && (
        <div className="overflow-x-auto rounded border border-white/[0.08]">
          {item.sharedData.title && (
            <div className="border-b border-white/[0.08] px-2 py-1.5 font-mono text-[9px] font-bold text-white/45">
              <RenderMath text={item.sharedData.title} />
            </div>
          )}
          {item.sharedData.headers?.length ? (
            <table className="min-w-full text-left font-mono text-[9px] text-white/45">
              <thead>
                <tr>
                  {item.sharedData.headers.map((header) => (
                    <th key={header} className="border-b border-white/[0.08] px-2 py-1.5">
                      <RenderMath text={header} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(item.sharedData.rows ?? []).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`} className="border-b border-white/[0.05] px-2 py-1.5">
                        <RenderMath text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {item.sharedData.notes?.length ? (
            <div className="space-y-1 px-2 py-1.5 font-mono text-[9px] text-white/35">
              {item.sharedData.notes.map((note) => (
                <p key={note}>
                  <RenderMath text={note} />
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
      {item.sharedStem && (
        <div className="rounded bg-white/[0.04] px-2 py-1.5 font-mono text-[10px] leading-relaxed text-white/45">
          <RenderMath text={item.sharedStem} />
        </div>
      )}
    </div>
  );
}

function AnswerLine({ item }: { item: CommonTestGuidedReviewItem }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className="rounded-lg bg-white/[0.035] p-3">
        <div className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/28">
          あなたの解答
        </div>
        <div className="mt-1 font-mono text-[11px] font-bold text-white/65">
          {item.userAnswerText ? <RenderMath text={item.userAnswerText} /> : "未解答または未記録"}
        </div>
      </div>
      <div className="rounded-lg bg-emerald-400/[0.06] p-3">
        <div className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-300/70">
          正答
        </div>
        <div className="mt-1 font-mono text-[11px] font-bold text-emerald-200/85">
          <RenderMath text={item.correctAnswerText} />
        </div>
      </div>
    </div>
  );
}

function MiniBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg px-3 py-2 text-right" style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
      <div className="font-mono text-[8px] text-white/32">{label}</div>
      <div className="font-mono text-sm font-extrabold" style={{ color }}>{value}</div>
    </div>
  );
}

function getStatus(item: CommonTestGuidedReviewItem): { label: string; color: string } {
  if (item.isCorrect === true) return { label: "正解", color: "#22c55e" };
  if (item.userAnswerText) return { label: "不正解", color: "#ef4444" };
  if (item.isCorrect === false) return { label: "未解答", color: "#f97316" };
  return { label: "復習", color: "#fbbf24" };
}

function getStepColor(kind: string): { bg: string; border: string; text: string } {
  if (kind === "explanation") return { bg: "rgba(34,197,94,0.055)", border: "rgba(34,197,94,0.18)", text: "#86efac" };
  if (kind === "trap") return { bg: "rgba(239,68,68,0.055)", border: "rgba(239,68,68,0.18)", text: "#fca5a5" };
  if (kind === "strategy") return { bg: "rgba(59,130,246,0.055)", border: "rgba(59,130,246,0.18)", text: "#93c5fd" };
  return { bg: "rgba(251,191,36,0.055)", border: "rgba(251,191,36,0.18)", text: "#fde68a" };
}

function getStepIcon(kind: string) {
  if (kind === "explanation") return <BookOpen className="h-3.5 w-3.5" />;
  if (kind === "trap") return <AlertTriangle className="h-3.5 w-3.5" />;
  if (kind === "strategy") return <ListChecks className="h-3.5 w-3.5" />;
  return <Target className="h-3.5 w-3.5" />;
}

function formatStage(stage: NonNullable<CommonTestGuidedReviewItem["difficultyStage"]>): string {
  return {
    basic: "基本確認",
    standard: "標準",
    guided: "誘導",
    advanced: "応用",
  }[stage];
}

function formatAnswerFormat(format: CommonTestGuidedReviewItem["answerFormat"]): string {
  return {
    choice: "選択式",
    number: "数値入力",
    digits: "桁別入力",
    text: "短答入力",
  }[format];
}

function reviewSortScore(item: CommonTestGuidedReviewItem): number {
  let score = 0;
  if (item.isCorrect === false) score += 10;
  if (!item.userAnswerText) score += 4;
  if (item.dependsOnPrevious) score += 2;
  if (item.difficultyStage === "advanced") score += 2;
  return score;
}

function RenderMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          try {
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(part.slice(1, -1), { throwOnError: false }),
                }}
              />
            );
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
