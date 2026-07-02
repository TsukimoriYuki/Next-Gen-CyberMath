"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Sigma,
  Sparkles,
  TimerReset,
} from "lucide-react";
import type { Lecture, LectureBlock, ExplanationTab } from "@/data/specialLectures";
import { MathText, BlockMath } from "@/components/math/Math";
import { GeometryLayersBlock } from "./GeometryLayersBlock";
import { LectureProblemInteraction } from "./LectureProblemInteraction";
import {
  DiscriminationDrillBlock,
  MistakeRecoveryBlock,
  SolutionFlowBlock,
} from "./MasteryBlocks";

const TAB_ORDER: ExplanationTab["label"][] = [
  "ヒント",
  "方針",
  "詳しい解説",
  "別解",
  "最速解法",
  "よくあるミス",
  "類題",
];

export function LectureRenderer({ lecture }: { lecture: Lecture }) {
  return (
    <article className="space-y-7">
      {lecture.blocks.map((block) => (
        <LectureBlockView key={block.id} lecture={lecture} block={block} />
      ))}
    </article>
  );
}

export function LectureBlockView({
  lecture,
  block,
  onProblemAnswered,
  onTabsViewed,
  onGeometryLayersCompleted,
  onDiscriminationDrillCompleted,
}: {
  lecture: Lecture;
  block: LectureBlock;
  /** problem ブロックを解答したときに呼ばれる（進捗連携）。 */
  onProblemAnswered?: () => void;
  /** explanationTabs のタブを開いたときに呼ばれる（進捗連携）。 */
  onTabsViewed?: () => void;
  /** geometryLayers の全レイヤーを確認したときに呼ばれる（進捗連携）。 */
  onGeometryLayersCompleted?: () => void;
  /** discriminationDrill を全問解答したときに呼ばれる（進捗連携）。 */
  onDiscriminationDrillCompleted?: () => void;
}) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <div className="border-t border-slate-200 pt-7 first:border-t-0 first:pt-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
            {block.text}
          </h2>
        </div>
      ) : (
        <h3 className="pt-2 text-lg font-extrabold text-slate-900">{block.text}</h3>
      );
    case "paragraph":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 leading-7 shadow-sm sm:p-6">
          <MathText className="text-[15px] text-slate-700">{block.text}</MathText>
        </div>
      );
    case "math":
      return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <Sigma className="h-4 w-4" />
            公式・計算
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-5 ring-1 ring-blue-100">
            <BlockMath math={block.expression} />
          </div>
          {block.caption && (
            <MathText className="mt-3 text-xs leading-5 text-slate-600">{block.caption}</MathText>
          )}
        </div>
      );
    case "image":
      return (
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-b from-white to-slate-50 p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-[640px] object-contain"
            />
          </div>
          {block.caption && (
            <figcaption className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              <MathText className="text-xs leading-5 text-slate-500">{block.caption}</MathText>
            </figcaption>
          )}
        </figure>
      );
    case "geometryLayers":
      return (
        <GeometryLayersBlock
          block={block}
          onComplete={onGeometryLayersCompleted}
        />
      );
    case "problem":
      return (
        <LectureProblemInteraction
          lecture={lecture}
          block={block}
          onAnswered={onProblemAnswered}
        />
      );
    case "explanationTabs":
      return <ExplanationTabs tabs={block.tabs} onView={onTabsViewed} />;
    case "expertThinking":
      return <ExpertThinkingBlock block={block} />;
    case "checklist":
      return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-extrabold text-slate-950">{block.title ?? "確認リスト"}</h2>
          </div>
          <ul className="space-y-2">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                <MathText>{item}</MathText>
              </li>
            ))}
          </ul>
        </section>
      );
    case "relatedProblems":
      return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-extrabold text-slate-950">{block.title ?? "関連演習"}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {block.items.map((item) =>
              item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    {item.title}
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  {item.note && <p className="mt-1 text-xs text-slate-500">{item.note}</p>}
                </Link>
              ) : (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  {item.note && <p className="mt-1 text-xs text-slate-500">{item.note}</p>}
                </div>
              ),
            )}
          </div>
        </section>
      );
    case "callout":
      return <Callout block={block} />;
    case "solutionFlow":
      return <SolutionFlowBlock block={block} />;
    case "discriminationDrill":
      return (
        <DiscriminationDrillBlock
          block={block}
          onComplete={onDiscriminationDrillCompleted}
        />
      );
    case "mistakeRecovery":
      return <MistakeRecoveryBlock block={block} />;
  }
}

function ExplanationTabs({ tabs, onView }: { tabs: ExplanationTab[]; onView?: () => void }) {
  const orderedTabs = [...tabs]
    .filter((tab) => tab.body.trim().length > 0)
    .sort((a, b) => TAB_ORDER.indexOf(a.label) - TAB_ORDER.indexOf(b.label));
  const [active, setActive] = useState<ExplanationTab["label"]>(orderedTabs[0]?.label ?? "ヒント");
  const current = orderedTabs.find((tab) => tab.label === active) ?? orderedTabs[0];

  if (!current) return null;

  function openTab(label: ExplanationTab["label"]) {
    setActive(label);
    onView?.();
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-slate-950">解説</h2>
        <span className="hidden text-xs font-bold text-slate-400 sm:inline">
          {current.label}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:pb-1">
        {orderedTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => openTab(tab.label)}
            className={`min-h-11 shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              active === tab.label
                ? tab.label === "最速解法"
                  ? "bg-emerald-600 text-white"
                  : tab.label === "よくあるミス"
                    ? "bg-amber-600 text-white"
                    : "bg-blue-600 text-white"
                : tab.label === "最速解法"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300"
                  : tab.label === "よくあるミス"
                    ? "border border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-slate-500">
          {current.label === "最速解法" && <TimerReset className="h-4 w-4 text-emerald-600" />}
          {current.label === "よくあるミス" && <AlertTriangle className="h-4 w-4 text-amber-600" />}
          {current.label}
        </div>
        <MathText className="text-[15px] leading-7 text-slate-700">{current.body}</MathText>
      </div>
    </section>
  );
}

function ExpertThinkingBlock({ block }: { block: Extract<LectureBlock, { type: "expertThinking" }> }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
      <div className="border-b border-violet-100 bg-violet-50 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-700" />
          <h2 className="text-lg font-extrabold text-slate-950">できる人の頭の中</h2>
        </div>
        <p className="mt-1 text-xs leading-5 text-violet-900/75">
          できる生徒が、問題文を読んでから撤退判断までに見ている順番です。
        </p>
      </div>
      <div className="p-5 sm:p-6">
        <ol className="relative space-y-4">
          {block.items.map((item, index) => (
            <li key={item.label} className="relative grid gap-3 sm:grid-cols-[92px_1fr]">
              {index < block.items.length - 1 && (
                <span className="absolute left-[18px] top-10 hidden h-[calc(100%+16px)] w-px bg-violet-100 sm:block" />
              )}
              <div className="flex items-center gap-3 sm:block">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 font-mono text-sm font-extrabold text-white">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-violet-700 sm:mt-2 sm:block">
                  Step {index + 1}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                  {item.label}
                  {index < block.items.length - 1 && <ArrowRight className="hidden h-3.5 w-3.5 text-slate-300 sm:block" />}
                </div>
                <MathText className="mt-1 text-sm leading-6 text-slate-700">{item.body}</MathText>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Callout({ block }: { block: Extract<LectureBlock, { type: "callout" }> }) {
  const styles = {
    info: { icon: Lightbulb, border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700" },
    warning: { icon: AlertTriangle, border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-700" },
    success: { icon: CheckCircle2, border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700" },
  }[block.tone];
  const Icon = styles.icon;

  return (
    <aside className={`rounded-2xl border ${styles.border} ${styles.bg} p-5 shadow-sm`}>
      <div className={`flex items-center gap-2 text-sm font-extrabold ${styles.text}`}>
        <Icon className="h-4 w-4" />
        {block.title ?? "ポイント"}
      </div>
      <MathText className="mt-2 text-sm text-slate-700">{block.text}</MathText>
    </aside>
  );
}
