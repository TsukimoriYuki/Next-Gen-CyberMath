"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, FileText, RotateCcw, Send } from "lucide-react";
import type { ExamPaper } from "@/data/exam-papers";
import { getExamPaperStats } from "@/data/exam-papers";
import { MathText } from "@/components/math/Math";
import {
  scoreExamPaper,
  type ExamPaperAnswers,
  type ExamPaperFlags,
  type ExamSectionScore,
  type ExamSlotResult,
} from "@/lib/exam-paper-scoring";
import { ExamMarkSheetPanel } from "./ExamMarkSheetPanel";
import { ExamPaperViewer } from "./ExamPaperViewer";

type ExamMode = "taking" | "submitted" | "review";
type MobileTab = "paper" | "marksheet";

interface Props {
  paper: ExamPaper;
}

export function ExamPaperRunner({ paper }: Props) {
  const [mode, setMode] = useState<ExamMode>("taking");
  const [answers, setAnswers] = useState<ExamPaperAnswers>({});
  const [flags, setFlags] = useState<ExamPaperFlags>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [mobileTab, setMobileTab] = useState<MobileTab>("paper");
  const [elapsedSec, setElapsedSec] = useState(0);
  const stats = getExamPaperStats(paper);
  const score = useMemo(() => scoreExamPaper(paper, answers), [paper, answers]);

  useEffect(() => {
    if (mode !== "taking") return;
    const startedAt = Date.now() - elapsedSec * 1000;
    const timer = window.setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, elapsedSec]);

  const remainingSec = Math.max(0, paper.durationMin * 60 - elapsedSec);

  function updateAnswer(slotId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [slotId]: value,
    }));
  }

  function toggleFlag(slotId: string) {
    setFlags((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  }

  function reset() {
    setMode("taking");
    setAnswers({});
    setFlags({});
    setCurrentPage(0);
    setMobileTab("paper");
    setElapsedSec(0);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/common-test/simulator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              本番演習一覧へ戻る
            </Link>
            <h1 className="mt-1 truncate text-base font-extrabold text-slate-950 sm:text-lg">
              {paper.title}
            </h1>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
              <span>{stats.sectionCount}大問</span>
              <span>/</span>
              <span>{stats.questionCount}小問</span>
              <span>/</span>
              <span>{stats.answerSlotCount}マーク</span>
              <span>/</span>
              <span>{paper.totalScore}点</span>
              <span>/</span>
              <span>{paper.durationMin}分</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusPill
              icon={<Clock className="h-4 w-4" />}
              label={mode === "taking" ? "残り時間" : "経過時間"}
              value={mode === "taking" ? formatTime(remainingSec) : formatTime(elapsedSec)}
              danger={remainingSec === 0 && mode === "taking"}
            />
            {mode === "taking" ? (
              <button
                type="button"
                onClick={() => setMode("submitted")}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />
                提出する
              </button>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                <RotateCcw className="h-4 w-4" />
                もう一度
              </button>
            )}
          </div>
        </div>
      </header>

      {mode !== "taking" && (
        <ResultSummary
          mode={mode}
          paper={paper}
          totalScore={score.totalScore}
          maxScore={score.maxScore}
          answeredCount={score.answeredCount}
          unansweredCount={score.unansweredCount}
          correctSlots={score.correctSlots}
          totalSlots={score.totalSlots}
          sectionScores={score.sectionScores}
          slotResults={score.slotResults}
          flags={flags}
          onReview={() => setMode("review")}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="mb-3 grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-1 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileTab("paper")}
            className={`rounded-lg px-3 py-2 text-sm font-bold ${
              mobileTab === "paper" ? "bg-slate-950 text-white" : "text-slate-600"
            }`}
          >
            冊子
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("marksheet")}
            className={`rounded-lg px-3 py-2 text-sm font-bold ${
              mobileTab === "marksheet" ? "bg-slate-950 text-white" : "text-slate-600"
            }`}
          >
            マーク欄
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className={mobileTab === "paper" ? "block" : "hidden lg:block"}>
            <ExamPaperViewer
              paper={paper}
              currentPage={currentPage}
              zoom={zoom}
              onPageChange={setCurrentPage}
              onZoomChange={setZoom}
            />
          </div>
          <div className={mobileTab === "marksheet" ? "block" : "hidden lg:block"}>
            <ExamMarkSheetPanel
              paper={paper}
              answers={answers}
              flags={flags}
              mode={mode}
              onAnswerChange={updateAnswer}
              onToggleFlag={toggleFlag}
            />
          </div>
        </div>

        {mode === "review" && <ReviewPanel paper={paper} />}
      </div>
    </main>
  );
}

function ResultSummary({
  mode,
  paper,
  totalScore,
  maxScore,
  answeredCount,
  unansweredCount,
  correctSlots,
  totalSlots,
  sectionScores,
  slotResults,
  flags,
  onReview,
}: {
  mode: ExamMode;
  paper: ExamPaper;
  totalScore: number;
  maxScore: number;
  answeredCount: number;
  unansweredCount: number;
  correctSlots: number;
  totalSlots: number;
  sectionScores: ExamSectionScore[];
  slotResults: ExamSlotResult[];
  flags: ExamPaperFlags;
  onReview: () => void;
}) {
  const unansweredLabels = slotResults
    .filter((result) => result.selectedAnswer === "")
    .map((result) => result.slot.label);
  const flaggedLabels = paper.answerSlots
    .filter((slot) => flags[slot.id])
    .map((slot) => slot.label);

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Metric label="得点" value={`${formatScore(totalScore)} / ${formatScore(maxScore)}点`} />
            <Metric label="正答マーク" value={`${correctSlots} / ${totalSlots}`} />
            <Metric label="入力済み" value={`${answeredCount} / ${paper.answerSlots.length}`} />
            <Metric label="未入力" value={`${unansweredCount}`} muted={unansweredCount === 0} />
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-[11px] font-bold text-slate-500">大問別得点</div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {sectionScores.map((section) => (
                  <div
                    key={section.sectionId}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-xs font-bold text-slate-800">
                        {section.title}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500">
                        {section.correctSlots} / {section.totalSlots}マーク
                      </div>
                    </div>
                    <div className="shrink-0 font-mono text-sm font-extrabold text-slate-950">
                      {formatScore(section.score)} / {formatScore(section.maxScore)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-[11px] font-bold text-slate-500">見直しメモ</div>
              <div className="mt-2 space-y-2 text-xs leading-6 text-slate-600">
                <SlotLabelList title="未入力" labels={unansweredLabels} emptyText="未入力なし" />
                <SlotLabelList title="フラグ" labels={flaggedLabels} emptyText="フラグなし" />
              </div>
            </div>
          </div>
        </div>

        {mode === "submitted" && (
          <button
            type="button"
            onClick={onReview}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
          >
            <CheckCircle2 className="h-4 w-4" />
            復習モードで解説を見る
          </button>
        )}
      </div>
    </section>
  );
}

function SlotLabelList({
  title,
  labels,
  emptyText,
}: {
  title: string;
  labels: string[];
  emptyText: string;
}) {
  return (
    <div>
      <span className="font-bold text-slate-700">{title}: </span>
      {labels.length > 0 ? (
        <span className="break-words font-mono">{labels.map((label) => `[${label}]`).join(" ")}</span>
      ) : (
        <span className="text-emerald-700">{emptyText}</span>
      )}
    </div>
  );
}

function ReviewPanel({ paper }: { paper: ExamPaper }) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-extrabold text-slate-950">提出後レビュー</h2>
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        試験中には出さない解説・考え方・復習ポイントをここで確認します。
      </p>

      <div className="mt-5 space-y-5">
        {paper.reviewBlocks.map((block) => (
          <article key={block.sectionId} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-extrabold text-slate-950">{block.title}</h3>
            <p className="mt-1 text-sm leading-7 text-slate-600">{block.summary}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {block.explanations.map((item) => (
                <div key={item.heading} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-bold text-blue-700">
                    {item.slotLabels.map((label) => `[${label}]`).join(" ")}
                  </div>
                  <h4 className="mt-2 text-sm font-extrabold text-slate-950">{item.heading}</h4>
                  <MathText className="mt-2 text-sm leading-7 text-slate-600">
                    {item.body}
                  </MathText>
                </div>
              ))}
            </div>
            {block.relatedLectures && block.relatedLectures.length > 0 && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-800">
                  <BookOpen className="h-4 w-4" />
                  関連講義で復習する
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {block.relatedLectures.map((lecture) => (
                    <Link
                      key={lecture.href}
                      href={lecture.href}
                      className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      <span className="block">{lecture.label}</span>
                      {lecture.note && (
                        <span className="mt-0.5 block text-xs font-medium leading-5 text-slate-500">
                          {lecture.note}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function StatusPill({
  icon,
  label,
  value,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 ${
        danger ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {icon}
      <div>
        <div className="text-[10px] font-bold text-slate-500">{label}</div>
        <div className="font-mono text-sm font-extrabold">{value}</div>
      </div>
    </div>
  );
}

function Metric({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-bold text-slate-500">{label}</div>
      <div className={`mt-1 font-mono text-lg font-extrabold ${muted ? "text-emerald-600" : "text-slate-950"}`}>
        {value}
      </div>
    </div>
  );
}

function formatTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatScore(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
