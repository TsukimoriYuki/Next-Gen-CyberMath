"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
import { MathText } from "@/components/math/Math";
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

  // initialQuestionId または orderedItems（= items）が変わったら表示状態をリセットする。
  // レンダー中に直接 setState することで、コミット後の余分な再レンダーを避ける。
  const [resetTracker, setResetTracker] = useState({ initialQuestionId, orderedItems });
  if (
    resetTracker.initialQuestionId !== initialQuestionId ||
    resetTracker.orderedItems !== orderedItems
  ) {
    setResetTracker({ initialQuestionId, orderedItems });
    setOpenId(initialQuestionId ?? orderedItems[0]?.questionId ?? null);
    setRevealedCounts({});
    setVariantPracticeId(null);
  }

  if (orderedItems.length === 0) return null;

  const wrongCount = orderedItems.filter((item) => item.isCorrect === false).length;
  const unresolvedCount = orderedItems.filter((item) => item.isCorrect !== true).length;

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${compact ? "p-4" : "p-5 sm:p-6"} space-y-4`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: `${theme.primary}14`, color: theme.primary }}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            段階復習
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
          <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <MiniBadge label="対象" value={`${orderedItems.length}問`} color={theme.primary} />
          {wrongCount > 0 && <MiniBadge label="不正解" value={`${wrongCount}問`} color="#e11d48" />}
          {unresolvedCount > wrongCount && (
            <MiniBadge label="要確認" value={`${unresolvedCount - wrongCount}問`} color="#ea580c" />
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
              className="overflow-hidden rounded-xl border bg-white"
              style={{ borderColor: isOpen ? `${theme.primary}40` : "#e2e8f0" }}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.questionId)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-extrabold"
                  style={{
                    background: `${status.color}14`,
                    border: `1px solid ${status.color}33`,
                    color: status.color,
                  }}
                >
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                      style={{ color: status.color, background: `${status.color}14` }}
                    >
                      {status.label}
                    </span>
                    {item.difficultyStage && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                        {formatStage(item.difficultyStage)}
                        {item.dependsOnPrevious ? "・前問利用" : ""}
                      </span>
                    )}
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                      {formatAnswerFormat(item.answerFormat)}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-[13px] font-bold text-slate-800">
                    {item.title}
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-3">
                  <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="text-[11px] font-bold text-slate-400">
                      問題の確認
                    </div>
                    <QuestionMaterial item={item} />
                    <div className="text-[13px] leading-relaxed text-slate-700">
                      <RenderMath text={item.statement} className="text-[13px] leading-relaxed text-slate-700" />
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
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-extrabold" style={{ color: getStepColor(step.kind).text }}>
                          {getStepIcon(step.kind)}
                          {step.label}
                        </div>
                        <div className="text-xs leading-relaxed text-slate-700">
                          <RenderMath text={step.body} className="text-xs leading-relaxed text-slate-700" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skillTags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500"
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
                          className="rounded-lg px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                          style={{ background: theme.primary }}
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
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          この型の類題を解く
                        </button>
                      )}
                      <Link
                        href={item.nextHref}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300"
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
    <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
      {(item.examContext || item.examPassage || item.context || item.passage) && (
        <div className="whitespace-pre-wrap text-xs leading-relaxed text-slate-600">
          <RenderMath
            text={item.examContext ?? item.examPassage ?? item.context ?? item.passage ?? ""}
            className="text-xs leading-relaxed text-slate-600"
          />
        </div>
      )}
      {item.sharedData && (
        <div className="overflow-x-auto rounded border border-slate-200">
          {item.sharedData.title && (
            <div className="border-b border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-bold text-slate-600">
              <RenderMath text={item.sharedData.title} className="text-[11px] font-bold text-slate-600" />
            </div>
          )}
          {item.sharedData.headers?.length ? (
            <table className="min-w-full text-left text-[11px] text-slate-600">
              <thead>
                <tr>
                  {item.sharedData.headers.map((header) => (
                    <th key={header} className="border-b border-slate-200 bg-slate-50 px-2 py-1.5 font-bold">
                      <RenderMath text={header} className="text-[11px] font-bold text-slate-600" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(item.sharedData.rows ?? []).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`} className="border-b border-slate-100 px-2 py-1.5">
                        <RenderMath text={cell} className="text-[11px] text-slate-600" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {item.sharedData.notes?.length ? (
            <div className="space-y-1 px-2 py-1.5 text-[11px] text-slate-500">
              {item.sharedData.notes.map((note) => (
                <div key={note}>
                  <RenderMath text={note} className="text-[11px] leading-relaxed text-slate-500" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
      {item.sharedStem && (
        <div className="rounded bg-slate-100 px-2 py-1.5 text-xs leading-relaxed text-slate-600">
          <RenderMath text={item.sharedStem} className="text-xs leading-relaxed text-slate-600" />
        </div>
      )}
    </div>
  );
}

function AnswerLine({ item }: { item: CommonTestGuidedReviewItem }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="text-[10px] font-bold text-slate-400">
          あなたの解答
        </div>
        <div className="mt-1 text-xs font-bold text-slate-700">
          {item.userAnswerText ? (
            <RenderMath text={item.userAnswerText} className="text-xs font-bold text-slate-700" />
          ) : (
            "未解答または未記録"
          )}
        </div>
      </div>
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
        <div className="text-[10px] font-bold text-emerald-600">
          正答
        </div>
        <div className="mt-1 text-xs font-bold text-emerald-700">
          <RenderMath text={item.correctAnswerText} className="text-xs font-bold text-emerald-700" />
        </div>
      </div>
    </div>
  );
}

function MiniBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg px-3 py-2 text-right" style={{ background: `${color}12`, border: `1px solid ${color}33` }}>
      <div className="text-[10px] text-slate-400">{label}</div>
      <div className="font-mono text-sm font-extrabold" style={{ color }}>{value}</div>
    </div>
  );
}

function getStatus(item: CommonTestGuidedReviewItem): { label: string; color: string } {
  if (item.isCorrect === true) return { label: "正解", color: "#059669" };
  if (item.userAnswerText) return { label: "不正解", color: "#e11d48" };
  if (item.isCorrect === false) return { label: "未解答", color: "#ea580c" };
  return { label: "復習", color: "#d97706" };
}

function getStepColor(kind: string): { bg: string; border: string; text: string } {
  if (kind === "explanation") return { bg: "#f0fdf4", border: "#bbf7d0", text: "#059669" };
  if (kind === "trap") return { bg: "#fff1f2", border: "#fecdd3", text: "#e11d48" };
  if (kind === "strategy") return { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" };
  return { bg: "#fffbeb", border: "#fde68a", text: "#d97706" };
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

function RenderMath({
  text,
  className = "text-xs leading-relaxed text-slate-700",
}: {
  text: string;
  className?: string;
}) {
  return (
    <MathText className={`space-y-1 [&_p]:my-0 ${className}`}>
      {text}
    </MathText>
  );
}
