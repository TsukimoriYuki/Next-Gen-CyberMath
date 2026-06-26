"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ExternalLink, Lightbulb, ListChecks, Sigma, Sparkles } from "lucide-react";
import type { Lecture, LectureBlock, ExplanationTab } from "@/data/specialLectures";
import { MathText, BlockMath } from "@/components/math/Math";

const TAB_ORDER: ExplanationTab["label"][] = [
  "ヒント",
  "方針",
  "詳しい解説",
  "最速解法",
  "よくあるミス",
  "類題",
];

export function LectureRenderer({ lecture }: { lecture: Lecture }) {
  return (
    <article className="space-y-5">
      {lecture.blocks.map((block) => (
        <LectureBlockView key={block.id} block={block} />
      ))}
    </article>
  );
}

function LectureBlockView({ block }: { block: LectureBlock }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="pt-3 text-2xl font-extrabold tracking-tight text-slate-950">
          {block.text}
        </h2>
      ) : (
        <h3 className="pt-2 text-lg font-extrabold text-slate-900">{block.text}</h3>
      );
    case "paragraph":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <MathText className="text-sm text-slate-700">{block.text}</MathText>
        </div>
      );
    case "math":
      return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <Sigma className="h-4 w-4" />
            公式・計算
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl bg-white p-4 ring-1 ring-blue-100">
            <BlockMath math={block.expression} />
          </div>
          {block.caption && <p className="mt-3 text-xs leading-5 text-slate-600">{block.caption}</p>}
        </div>
      );
    case "image":
      return (
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="max-h-[420px] w-full object-cover" />
          {block.caption && (
            <figcaption className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "problem":
      return <ProblemBlock block={block} />;
    case "explanationTabs":
      return <ExplanationTabs tabs={block.tabs} />;
    case "expertThinking":
      return (
        <section className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-600" />
            <h2 className="text-lg font-extrabold text-slate-950">できる人の頭の中</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold text-violet-700">{item.label}</div>
                <MathText className="mt-1 text-xs text-slate-700">{item.body}</MathText>
              </div>
            ))}
          </div>
        </section>
      );
    case "checklist":
      return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
  }
}

function ProblemBlock({ block }: { block: Extract<LectureBlock, { type: "problem" }> }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-extrabold text-slate-950">{block.title}</h2>
        {block.points != null && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            {block.points}点
          </span>
        )}
      </div>
      <MathText className="mt-4 text-sm text-slate-700">{block.prompt}</MathText>
      {block.choices && block.choices.length > 0 && (
        <div className="mt-4 grid gap-2">
          {block.choices.map((choice, index) => (
            <div key={choice} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex gap-3 text-sm text-slate-700">
                <span className="font-mono font-bold text-slate-400">{index + 1}</span>
                <MathText>{choice}</MathText>
              </div>
            </div>
          ))}
        </div>
      )}
      {block.mistakeTags && block.mistakeTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {block.mistakeTags.map((tag) => (
            <span key={tag} className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
              {tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function ExplanationTabs({ tabs }: { tabs: ExplanationTab[] }) {
  const orderedTabs = [...tabs].sort((a, b) => TAB_ORDER.indexOf(a.label) - TAB_ORDER.indexOf(b.label));
  const [active, setActive] = useState<ExplanationTab["label"]>(orderedTabs[0]?.label ?? "ヒント");
  const current = orderedTabs.find((tab) => tab.label === active) ?? orderedTabs[0];

  if (!current) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-950">解説</h2>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {orderedTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(tab.label)}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              active === tab.label
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <MathText className="text-sm text-slate-700">{current.body}</MathText>
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
