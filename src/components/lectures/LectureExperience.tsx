"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  List,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { Lecture, LectureBlock } from "@/data/specialLectures";
import {
  getTrackableBlockIds,
  isTrackableBlock,
  type LectureProgressSummary,
} from "@/lib/lecture-progress";
import { useLectureProgress } from "@/hooks/useLectureProgress";
import { LectureBlockView } from "./LectureRenderer";

interface TocItem {
  id: string;
  label: string;
  kind: "heading" | "problem";
  level: 2 | 3;
  problemIndex?: number;
}

function stripDollar(text: string): string {
  return text.replace(/\$/g, "").trim();
}

function scrollToBlock(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 表示中のブロックを IntersectionObserver で追う（スクロールスパイ）。
function useActiveBlock(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-block-id");
          if (!id) continue;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        // 文書順で最初に見えているブロックを active にする。
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function LectureExperience({ lecture }: { lecture: Lecture }) {
  const {
    hydrated,
    summary,
    completedSet,
    completeBlock,
    toggleBlock,
    setLastBlock,
    resetLecture,
  } = useLectureProgress(lecture);

  const trackableIds = useMemo(() => getTrackableBlockIds(lecture), [lecture]);
  const typeMap = useMemo(() => {
    const map = new Map<string, LectureBlock["type"]>();
    for (const block of lecture.blocks) map.set(block.id, block.type);
    return map;
  }, [lecture]);
  const blockOrder = useMemo(() => {
    const map = new Map<string, number>();
    lecture.blocks.forEach((block, index) => map.set(block.id, index));
    return map;
  }, [lecture]);

  const tocItems = useMemo<TocItem[]>(() => {
    const items: TocItem[] = [];
    let problemNo = 0;
    for (const block of lecture.blocks) {
      if (block.type === "heading") {
        items.push({ id: block.id, label: stripDollar(block.text), kind: "heading", level: block.level });
      } else if (block.type === "problem") {
        problemNo += 1;
        items.push({ id: block.id, label: stripDollar(block.title), kind: "problem", level: 2, problemIndex: problemNo });
      }
    }
    return items;
  }, [lecture]);

  const activeBlockId = useActiveBlock(trackableIds);

  const activeTocId = useMemo(() => {
    if (!activeBlockId) return tocItems[0]?.id ?? null;
    const order = blockOrder.get(activeBlockId) ?? 0;
    let current = tocItems[0]?.id ?? null;
    for (const item of tocItems) {
      if ((blockOrder.get(item.id) ?? 0) <= order) current = item.id;
      else break;
    }
    return current;
  }, [activeBlockId, tocItems, blockOrder]);

  // 「続きから再開」: ?resume=1 もしくは #blockId のときに最後のブロックへ移動。
  const [tracking, setTracking] = useState(false);
  const resumedRef = useRef(false);
  useEffect(() => {
    if (!hydrated || resumedRef.current) return;
    resumedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const hashId = window.location.hash ? window.location.hash.slice(1) : "";
    const wantResume = params.get("resume") === "1" || Boolean(hashId);

    if (wantResume) {
      // hash が優先、なければ保存済みの lastBlockId。
      const targetId = hashId || summary.lastBlockId;
      if (targetId) {
        requestAnimationFrame(() => scrollToBlock(targetId));
      }
    }
    // 再開スクロールが落ち着いてから、表示中ブロックの追跡を開始する。
    const timer = window.setTimeout(() => setTracking(true), 450);
    return () => window.clearTimeout(timer);
    // summary.lastBlockId は初回ハイドレーション時の値を一度だけ使う。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  // 表示中ブロックを lastBlockId として保存（続きから再開・最終アクセス）。
  useEffect(() => {
    if (!tracking || !activeBlockId) return;
    setLastBlock(activeBlockId);
  }, [tracking, activeBlockId, setLastBlock]);

  // prev / next ナビゲーション（trackable ブロック単位）。
  const currentIndex = useMemo(() => {
    if (!activeBlockId) return 0;
    const idx = trackableIds.indexOf(activeBlockId);
    return idx < 0 ? 0 : idx;
  }, [activeBlockId, trackableIds]);
  const prevId = currentIndex > 0 ? trackableIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < trackableIds.length - 1 ? trackableIds[currentIndex + 1] : null;

  const handlePrev = useCallback(() => {
    if (prevId) scrollToBlock(prevId);
  }, [prevId]);

  const handleNext = useCallback(() => {
    const currentId = trackableIds[currentIndex];
    // problem は解答前に勝手に完了扱いにしない。それ以外は次へで完了扱い。
    if (currentId && typeMap.get(currentId) !== "problem") {
      completeBlock(currentId);
    }
    if (nextId) scrollToBlock(nextId);
  }, [completeBlock, currentIndex, nextId, trackableIds, typeMap]);

  const jumpTo = useCallback((id: string) => scrollToBlock(id), []);

  const showCompletion = hydrated && summary.status === "completed";

  return (
    <div className="mt-6 space-y-6">
      <LectureProgressHeader summary={summary} hydrated={hydrated} />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_236px] lg:gap-8">
        <div className="min-w-0 space-y-6">
          {/* スマホ: 折りたたみ目次 */}
          <MobileToc
            items={tocItems}
            activeId={activeTocId}
            completedSet={completedSet}
            hydrated={hydrated}
            onJump={jumpTo}
          />

          <article className="space-y-7">
            {lecture.blocks.map((block) => {
              const trackable = isTrackableBlock(block);
              const completable = trackable && block.type !== "problem";
              const isProblem = block.type === "problem";
              const completed = hydrated && completedSet.has(block.id);
              return (
                <div key={block.id} id={block.id} data-block-id={block.id} className="scroll-mt-24">
                  <LectureBlockView
                    lecture={lecture}
                    block={block}
                    onProblemAnswered={() => completeBlock(block.id)}
                    onTabsViewed={() => completeBlock(block.id)}
                    onGeometryLayersCompleted={() => completeBlock(block.id)}
                  />
                  {completable && (
                    <div className="mt-2 flex justify-end">
                      <CheckToggle completed={completed} onToggle={() => toggleBlock(block.id)} />
                    </div>
                  )}
                  {isProblem && completed && (
                    <div className="mt-2 flex justify-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        解答済み
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </article>

          {showCompletion && (
            <LectureCompletionCard lecture={lecture} onReplay={resetLecture} />
          )}
        </div>

        {/* PC: サイド目次 */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-slate-500">
                <List className="h-3.5 w-3.5" />
                目次
              </div>
              <TocList
                items={tocItems}
                activeId={activeTocId}
                completedSet={completedSet}
                hydrated={hydrated}
                onJump={jumpTo}
              />
            </div>
          </div>
        </aside>
      </div>

      <LectureStickyNav
        prevId={prevId}
        nextId={nextId}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

function LectureProgressHeader({
  summary,
  hydrated,
}: {
  summary: LectureProgressSummary;
  hydrated: boolean;
}) {
  const percent = hydrated ? summary.percent : 0;
  const completedCount = hydrated ? summary.completedCount : 0;
  const completed = hydrated && summary.status === "completed";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-extrabold text-slate-900">進捗</span>
          <span className={`font-mono text-lg font-extrabold ${completed ? "text-emerald-600" : "text-blue-700"}`}>
            {percent}%
          </span>
        </div>
        <div className="text-xs font-medium text-slate-500">
          {summary.totalCount}ブロック中 {completedCount}ブロック完了
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${completed ? "bg-emerald-500" : "bg-blue-500"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function CheckToggle({
  completed,
  onToggle,
}: {
  completed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={completed}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition ${
        completed
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300"
          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
      }`}
    >
      {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
      {completed ? "読了" : "読了にする"}
    </button>
  );
}

function TocList({
  items,
  activeId,
  completedSet,
  hydrated,
  onJump,
}: {
  items: TocItem[];
  activeId: string | null;
  completedSet: Set<string>;
  hydrated: boolean;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="space-y-0.5">
      {items.map((item) => {
        const done = hydrated && completedSet.has(item.id);
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onJump(item.id)}
            className={`group flex w-full items-start gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
              item.level === 3 ? "pl-5" : ""
            } ${
              active
                ? "bg-blue-50 text-blue-800"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="mt-0.5 shrink-0">
              {done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Circle className={`h-3.5 w-3.5 ${active ? "text-blue-400" : "text-slate-300"}`} />
              )}
            </span>
            <span className={`line-clamp-2 leading-5 ${active ? "font-bold" : "font-medium"}`}>
              {item.kind === "problem" && (
                <span className="mr-1 rounded bg-violet-100 px-1 py-0.5 text-[10px] font-bold text-violet-700">
                  問題{item.problemIndex}
                </span>
              )}
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function MobileToc({
  items,
  activeId,
  completedSet,
  hydrated,
  onJump,
}: {
  items: TocItem[];
  activeId: string | null;
  completedSet: Set<string>;
  hydrated: boolean;
  onJump: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4 text-slate-500" />
          目次を開く
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <TocList
            items={items}
            activeId={activeId}
            completedSet={completedSet}
            hydrated={hydrated}
            onJump={(id) => {
              onJump(id);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

function LectureStickyNav({
  prevId,
  nextId,
  onPrev,
  onNext,
}: {
  prevId: string | null;
  nextId: string | null;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="sticky bottom-3 z-20">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <button
          type="button"
          onClick={onPrev}
          disabled={!prevId}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          前へ
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!nextId}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          次へ
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function LectureCompletionCard({
  lecture,
  onReplay,
}: {
  lecture: Lecture;
  onReplay: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
      <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-5 sm:px-7">
        <div className="flex items-center gap-2 text-emerald-700">
          <Trophy className="h-5 w-5" />
          <span className="text-xs font-extrabold tracking-wide">LECTURE COMPLETE</span>
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">講義完了！</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {lecture.unit}の基本戦略を一通り確認しました。
        </p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
        <Link
          href="/common-test/review"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          <RefreshCw className="h-4 w-4" />
          復習キューを見る
        </Link>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300"
        >
          <BookOpen className="h-4 w-4" />
          もう一度講義を復習する
        </button>
        <Link
          href="/common-test/lectures"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-100"
        >
          <Sparkles className="h-4 w-4" />
          関連講義を見る
        </Link>
      </div>
      <div className="border-t border-slate-100 px-5 py-3 text-right sm:px-6">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-slate-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          進捗をリセット
        </button>
      </div>
    </section>
  );
}
