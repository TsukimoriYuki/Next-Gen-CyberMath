"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Play } from "lucide-react";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import {
  buildHistoryItem,
  saveCommonTestDrillHistory,
  type CommonTestAnswerRecord,
  type CommonTestConfidence,
  type CommonTestDrillHistoryItem,
} from "@/lib/common-test-history";
import {
  getCommonTestAnswerFormat,
  isCommonTestAnswerCorrect,
} from "@/lib/common-test-answer-normalize";
import { CommonTestAnswerPanel } from "./CommonTestAnswerPanel";
import { CommonTestQuestionCard } from "./CommonTestQuestionCard";
import { CommonTestResultPanel } from "./CommonTestResultPanel";
import { type AnswerEntry } from "./common-test-drill-types";

export type { AnswerEntry };

interface CompletedDrillResult {
  answers: AnswerEntry[];
  totalElapsedSec: number;
  historyItem: CommonTestDrillHistoryItem;
}

type Phase = "intro" | "running" | "revealed" | "finished";

interface Props {
  questions: CommonTestDrillQuestion[];
  subjectId: string;
  sectionId: string;
  sectionTitle: string;
  sectionNumber: number;
  recommendedMinutes: number;
  theme: CommonTestTheme;
  subjectRoute: string;
}

export function CommonTestDrillRunner({
  questions,
  subjectId,
  sectionId,
  sectionTitle,
  sectionNumber,
  recommendedMinutes,
  theme,
  subjectRoute,
}: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [pendingAnswer, setPendingAnswer] = useState<{
    answer: string;
    isCorrect: boolean;
    timeSpentSec: number;
  } | null>(null);
  const [completedAnswers, setCompletedAnswers] = useState<AnswerEntry[]>([]);
  const [drillResult, setDrillResult] = useState<CompletedDrillResult | null>(null);
  const [questionElapsed, setQuestionElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const sessionStartRef = useRef(0);
  const questionStartRef = useRef(0);

  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => {
      const now = Date.now();
      setTotalElapsed(Math.floor((now - sessionStartRef.current) / 1000));
      setQuestionElapsed(Math.floor((now - questionStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const handleStart = useCallback(() => {
    const now = Date.now();
    sessionStartRef.current = now;
    questionStartRef.current = now;
    setPhase("running");
  }, []);

  const handleSelect = useCallback(
    (answer: string) => {
      if (phase !== "running") return;
      const timeSpent = Math.floor((Date.now() - questionStartRef.current) / 1000);
      const currentQ = questions[currentIdx];
      const correct = isCommonTestAnswerCorrect(
        answer,
        currentQ.correctAnswer,
        getCommonTestAnswerFormat(currentQ),
      );
      setPendingAnswer({ answer, isCorrect: correct, timeSpentSec: timeSpent });
      setPhase("revealed");
    },
    [currentIdx, phase, questions],
  );

  const handleNext = useCallback(
    (confidence: CommonTestConfidence) => {
      if (!pendingAnswer) return;

      const currentQ = questions[currentIdx];
      const newEntry: AnswerEntry = {
        questionId: currentQ.id,
        selectedAnswer: pendingAnswer.answer,
        isCorrect: pendingAnswer.isCorrect,
        timeSpentSec: pendingAnswer.timeSpentSec,
        confidence,
        skillTags: currentQ.skillTags,
      };
      const updatedAnswers = [...completedAnswers, newEntry];
      setCompletedAnswers(updatedAnswers);

      if (currentIdx + 1 >= questions.length) {
        const finishTime = Date.now();
        const elapsed = Math.floor((finishTime - sessionStartRef.current) / 1000);
        const historyAnswers: CommonTestAnswerRecord[] = updatedAnswers.map((entry) => {
          const q = questions.find((candidate) => candidate.id === entry.questionId);
          return {
            questionId: entry.questionId,
            selectedAnswer: entry.selectedAnswer,
            correctAnswer: q?.correctAnswer ?? "",
            isCorrect: entry.isCorrect,
            timeSpentSec: entry.timeSpentSec,
            estimatedMinutes: q?.estimatedMinutes ?? 0,
            confidence: entry.confidence,
            skillTags: entry.skillTags,
          };
        });

        const historyItem = buildHistoryItem({
          subjectId,
          sectionId,
          startedAt: sessionStartRef.current,
          finishedAt: finishTime,
          answers: historyAnswers,
        });

        try {
          saveCommonTestDrillHistory(historyItem);
        } catch {
          // localStorage quota / private mode は結果表示を止めない
        }

        setTotalElapsed(elapsed);
        setDrillResult({ answers: updatedAnswers, totalElapsedSec: elapsed, historyItem });
        setPhase("finished");
        return;
      }

      const now = Date.now();
      questionStartRef.current = now;
      setCurrentIdx((prev) => prev + 1);
      setPendingAnswer(null);
      setQuestionElapsed(0);
      setPhase("running");
    },
    [completedAnswers, currentIdx, pendingAnswer, questions, sectionId, subjectId],
  );

  const handleRetry = useCallback(() => {
    setPhase("intro");
    setCurrentIdx(0);
    setPendingAnswer(null);
    setCompletedAnswers([]);
    setDrillResult(null);
    setQuestionElapsed(0);
    setTotalElapsed(0);
  }, []);

  const currentQ = questions[currentIdx];

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-950">この大問の問題は準備中です</h2>
        <p className="mt-2 text-sm text-slate-600">
          ほかの大問を選ぶか、後ほど追加される問題を確認してください。
        </p>
        <Link
          href={subjectRoute}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          大問一覧に戻る
        </Link>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
              style={{ background: `rgba(${theme.glowRgb},0.10)`, color: theme.primary }}
            >
              <ClipboardCheck className="h-3.5 w-3.5" />
              練習前の確認
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
              第{sectionNumber}問 - {sectionTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {questions.length}問を順に解きます。解答後に正誤・解説・よくあるミスを確認できます。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:w-72">
            <Stat label="問題数" value={`${questions.length}問`} />
            <Stat label="目安" value={`${recommendedMinutes}分`} />
            <Stat label="形式" value="即時確認" />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          自信度も一緒に記録すると、復習キューと弱点分析で「本当に見直すべき問題」を見つけやすくなります。
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto"
        >
          <Play className="h-4 w-4" />
          練習を始める
        </button>
      </div>
    );
  }

  if (phase === "finished" && drillResult) {
    return (
      <CommonTestResultPanel
        questions={questions}
        answers={drillResult.answers}
        historyItem={drillResult.historyItem}
        totalElapsedSec={drillResult.totalElapsedSec}
        theme={theme}
        sectionTitle={`第${sectionNumber}問 - ${sectionTitle}`}
        subjectRoute={subjectRoute}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>経過 {formatTime(totalElapsed)}</span>
        <span>
          {currentIdx + 1} / {questions.length}問
        </span>
      </div>
      <CommonTestQuestionCard
        question={currentQ}
        theme={theme}
        questionNumber={currentIdx + 1}
        totalQuestions={questions.length}
        elapsed={questionElapsed}
      >
        <CommonTestAnswerPanel
          question={currentQ}
          selectedAnswer={pendingAnswer?.answer ?? null}
          isRevealed={phase === "revealed"}
          onSelect={handleSelect}
          onNext={handleNext}
          isLastQuestion={currentIdx + 1 >= questions.length}
          theme={theme}
        />
      </CommonTestQuestionCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-extrabold text-slate-950">{value}</div>
    </div>
  );
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
