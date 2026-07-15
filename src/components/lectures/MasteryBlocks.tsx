"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  LifeBuoy,
  RotateCcw,
  Target,
  Wrench,
  XCircle,
} from "lucide-react";
import type { LectureBlock } from "@/data/specialLectures";
import { MathText } from "@/components/math/Math";

type SolutionFlowBlockData = Extract<LectureBlock, { type: "solutionFlow" }>;
type DiscriminationDrillBlockData = Extract<LectureBlock, { type: "discriminationDrill" }>;
type MistakeRecoveryBlockData = Extract<LectureBlock, { type: "mistakeRecovery" }>;

function mathLabel(text: string) {
  return text
    .replace(/\$/g, "")
    .replace(/\\le\b/g, "≤")
    .replace(/\\ge\b/g, "≥")
    .replace(/\\lt\b/g, "<")
    .replace(/\\gt\b/g, ">")
    .replace(/\\cdot\b/g, "×")
    .replace(/\\times\b/g, "×")
    .replace(/\\sqrt\b/g, "平方根")
    .replace(/\\frac\b/g, "分数")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ── 解法判別フロー：「何が見えたら、どの道具を選ぶか」 ─────────────────────
export function SolutionFlowBlock({ block }: { block: SolutionFlowBlockData }) {
  return (
    <section
      data-testid="solution-flow"
      data-block-id={block.id}
      className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm"
    >
      <div className="border-b border-blue-100 bg-blue-50 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-extrabold text-blue-800">
          <GitBranch className="h-4 w-4" />
          {block.title ?? "解法判別フロー"}
        </div>
        {block.intro && (
          <MathText className="mt-1 text-xs leading-5 text-blue-900">{block.intro}</MathText>
        )}
      </div>
      <ol className="divide-y divide-slate-100">
        {block.steps.map((step, i) => (
          <li
            key={i}
            className="grid gap-2 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-6"
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                  {i + 1}
                </span>
                見えている条件
              </div>
              <MathText className="mt-1 text-sm font-semibold text-slate-800">{step.condition}</MathText>
            </div>
            <div className="flex items-center justify-center text-blue-400">
              <ArrowRight className="hidden h-5 w-5 sm:block" />
              <span className="text-xs font-bold text-blue-700 sm:hidden">↓ 道具を選ぶ</span>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                <Wrench className="h-3 w-3" />
                使う道具
              </div>
              <MathText className="mt-1 text-sm font-extrabold text-blue-800">{step.tool}</MathText>
              {step.reason && (
                <MathText className="mt-1 text-xs leading-5 text-slate-600">{step.reason}</MathText>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── 判別ドリル：計算せず「初手＝何を使うか」だけを訓練する ────────────────
export function DiscriminationDrillBlock({
  block,
  onComplete,
}: {
  block: DiscriminationDrillBlockData;
  onComplete?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = block.items.filter((item, i) => answers[i] === item.answer).length;
  const total = block.items.length;
  const allDone = answeredCount >= total && total > 0;

  function choose(index: number, choice: string) {
    if (answers[index] != null) return; // 一度選んだら確定
    const next = { ...answers, [index]: choice };
    setAnswers(next);
    if (Object.keys(next).length >= total) onComplete?.();
  }

  function reset() {
    setAnswers({});
  }

  return (
    <section
      data-testid="discrimination-drill"
      data-block-id={block.id}
      className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm"
    >
      <div className="border-b border-blue-100 bg-blue-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-extrabold text-blue-800">
            <Target className="h-4 w-4" />
            {block.title ?? "判別ドリル：初手は何を使う？"}
          </div>
          <span
            aria-live="polite"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold ${
              allDone
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-blue-200 bg-white text-blue-700"
            }`}
          >
            {allDone ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                正答 {correctCount} / {total}
              </>
            ) : (
              <>
                {answeredCount} / {total} 問
              </>
            )}
          </span>
        </div>
        <MathText className="mt-1 text-xs leading-5 text-blue-900">
          {block.intro ??
            "計算はしません。条件を見て「最初に使う道具」を選び、理由まで言えるかを確認します。"}
        </MathText>
      </div>

      <div className="space-y-3 p-4 sm:p-6">
        {block.items.map((item, i) => {
          const chosen = answers[i];
          const answered = chosen != null;
          return (
            <div
              key={i}
              data-testid="discrimination-drill-item"
              data-drill-index={i}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-extrabold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <MathText className="text-sm font-semibold text-slate-800">{item.condition}</MathText>
                  {item.goal && (
                    <MathText className="mt-1 text-xs font-bold text-blue-700">
                      {`求めたいもの：${item.goal}`}
                    </MathText>
                  )}
                </div>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {item.choices.map((choice) => {
                  const isAnswer = choice === item.answer;
                  const isChosen = choice === chosen;
                  const showCorrect = answered && isAnswer;
                  const showWrong = answered && isChosen && !isAnswer;
                  return (
                    <button
                      key={choice}
                      type="button"
                      data-testid="discrimination-drill-choice"
                      data-choice={choice}
                      data-is-answer={String(isAnswer)}
                      disabled={answered}
                      onClick={() => choose(i, choice)}
                      aria-label={`選択肢: ${mathLabel(choice)}`}
                      aria-pressed={isChosen}
                      className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                        showCorrect
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : showWrong
                            ? "border-rose-300 bg-rose-50 text-rose-800"
                            : answered
                              ? "border-slate-200 bg-white text-slate-400"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {showCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                      {showWrong && <XCircle className="h-4 w-4 shrink-0 text-rose-600" />}
                      <MathText>{choice}</MathText>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  role="status"
                  className={`mt-3 rounded-xl border p-3 text-xs leading-5 ${
                    chosen === item.answer
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-amber-200 bg-amber-50 text-amber-900"
                  }`}
                >
                  <div className="mb-0.5 flex flex-wrap items-center gap-x-1 font-extrabold">
                    <span>{chosen === item.answer ? "正解" : "もう一度ここを意識"}：</span>
                    <MathText>{item.answer}</MathText>
                  </div>
                  <MathText>{item.reason}</MathText>
                </div>
              )}
            </div>
          );
        })}

        {answeredCount > 0 && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              もう一度
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── ミス別補講：間違えた理由から戻る場所へ ───────────────────────────────
export function MistakeRecoveryBlock({ block }: { block: MistakeRecoveryBlockData }) {
  return (
    <section
      data-testid="mistake-recovery"
      data-block-id={block.id}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <LifeBuoy className="h-4 w-4" />
          {block.title ?? "ミス別補講：間違えた理由から戻る"}
        </div>
        {block.intro && (
          <MathText className="mt-1 text-xs leading-5 text-slate-700">{block.intro}</MathText>
        )}
      </div>
      <ul className="divide-y divide-slate-100">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="grid gap-2 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-6"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                間違えた理由
              </div>
              <MathText className="mt-0.5 text-sm font-semibold text-slate-800">{item.symptom}</MathText>
            </div>
            <ArrowRight className="hidden h-5 w-5 justify-self-center text-blue-500 sm:block" />
            <RecoveryAction action={item.action} href={item.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function RecoveryAction({ action, href }: { action: string; href?: string }) {
  const inner = (
    <>
      <div className="text-xs font-bold uppercase tracking-wide text-blue-700">戻る場所</div>
      <MathText className="mt-0.5 text-sm font-bold text-blue-900">{action}</MathText>
    </>
  );
  const baseClass =
    "block min-h-11 rounded-xl border border-blue-200 bg-blue-50 p-3 transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";

  if (!href) {
    return <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">{inner}</div>;
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={baseClass}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={baseClass}>
      {inner}
    </Link>
  );
}
