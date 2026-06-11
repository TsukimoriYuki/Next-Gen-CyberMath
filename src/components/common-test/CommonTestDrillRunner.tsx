"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";
import {
  type CommonTestConfidence,
  type CommonTestAnswerRecord,
  type CommonTestDrillHistoryItem,
  buildHistoryItem,
  saveCommonTestDrillHistory,
} from "@/lib/common-test-history";
import { CommonTestQuestionCard } from "./CommonTestQuestionCard";
import { CommonTestAnswerPanel } from "./CommonTestAnswerPanel";
import { CommonTestResultPanel } from "./CommonTestResultPanel";
import { type AnswerEntry } from "./common-test-drill-types";
import { Play, Zap } from "lucide-react";

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

  const sessionStartRef = useRef<number>(0);
  const questionStartRef = useRef<number>(0);

  // ── Timer ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => {
      const now = Date.now();
      setTotalElapsed(Math.floor((now - sessionStartRef.current) / 1000));
      setQuestionElapsed(Math.floor((now - questionStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // ── Start drill ───────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    const now = Date.now();
    sessionStartRef.current = now;
    questionStartRef.current = now;
    setPhase("running");
  }, []);

  // ── Answer selected ───────────────────────────────────────────────────
  const handleSelect = useCallback(
    (answer: string) => {
      if (phase !== "running") return;
      const timeSpent = Math.floor((Date.now() - questionStartRef.current) / 1000);
      const currentQ = questions[currentIdx];
      const correct = Array.isArray(currentQ.correctAnswer)
        ? currentQ.correctAnswer.includes(answer)
        : currentQ.correctAnswer === answer;

      setPendingAnswer({ answer, isCorrect: correct, timeSpentSec: timeSpent });
      setPhase("revealed");
    },
    [phase, questions, currentIdx]
  );

  // ── Next question or finish (receives confidence from AnswerPanel) ────
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

        const historyAnswers: CommonTestAnswerRecord[] = updatedAnswers.map((a) => {
          const q = questions.find((q) => q.id === a.questionId);
          return {
            questionId: a.questionId,
            selectedAnswer: a.selectedAnswer,
            correctAnswer: q?.correctAnswer ?? "",
            isCorrect: a.isCorrect,
            timeSpentSec: a.timeSpentSec,
            estimatedMinutes: q?.estimatedMinutes ?? 0,
            confidence: a.confidence,
            skillTags: a.skillTags,
          };
        });

        const historyItem = buildHistoryItem({
          subjectId,
          sectionId,
          startedAt: sessionStartRef.current,
          finishedAt: finishTime,
          answers: historyAnswers,
        });

        console.log("[CYBER OS] Drill Result:", JSON.stringify(historyItem, null, 2));

        try {
          saveCommonTestDrillHistory(historyItem);
        } catch {
          // quota / private mode — silently ignore
        }

        setTotalElapsed(elapsed);
        setDrillResult({ answers: updatedAnswers, totalElapsedSec: elapsed, historyItem });
        setPhase("finished");
      } else {
        const now = Date.now();
        questionStartRef.current = now;
        setCurrentIdx((prev) => prev + 1);
        setPendingAnswer(null);
        setQuestionElapsed(0);
        setPhase("running");
      }
    },
    [pendingAnswer, completedAnswers, currentIdx, questions, subjectId, sectionId]
  );

  // ── Retry ─────────────────────────────────────────────────────────────
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

  // ── No questions ──────────────────────────────────────────────────────
  if (questions.length === 0) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
          この大問の問題は現在準備中です
        </div>
        <p className="mt-2 font-mono text-[10px] text-white/25">
          今後のアップデートで追加予定
        </p>
      </div>
    );
  }

  // ── Intro screen ──────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div
        className="rounded-2xl p-6 sm:p-8 space-y-5"
        style={{
          background: `linear-gradient(135deg, rgba(${theme.glowRgb},0.06) 0%, rgba(0,0,0,0.5) 100%)`,
          border: `1px solid rgba(${theme.glowRgb},0.22)`,
        }}
      >
        <div className="text-center space-y-2">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{
              background: `rgba(${theme.glowRgb},0.08)`,
              border: `1px solid rgba(${theme.glowRgb},0.22)`,
              color: theme.primary,
            }}
          >
            <Zap className="h-3 w-3" />
            DRILL READY
          </div>
          <h2 className="font-display text-2xl font-extrabold text-white">
            第{sectionNumber}問 — {sectionTitle}
          </h2>
          <p className="font-mono text-sm text-white/45">
            {questions.length}問 ／ 推奨時間 {recommendedMinutes}分
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: "問題数", value: `${questions.length} 問` },
            { label: "推奨時間", value: `${recommendedMinutes}分` },
            { label: "難易度", value: questions[0]?.difficulty ?? "—" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="font-mono text-[9px] text-white/35 uppercase tracking-wider">
                {label}
              </div>
              <div
                className="mt-1 font-mono text-sm font-bold"
                style={{ color: theme.primary }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-3 font-mono text-[10px] leading-relaxed text-white/45"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          ◎ 解答後に自信度を記録できます。自信×正誤の分析で弱点を精密に特定します。
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, rgba(${theme.glowRgb},0.25), rgba(${theme.glowRgb},0.12))`,
            border: `1px solid rgba(${theme.glowRgb},0.50)`,
            color: theme.primary,
          }}
        >
          <Play className="h-4 w-4" />
          START DRILL
        </button>
      </div>
    );
  }

  // ── Finished screen ───────────────────────────────────────────────────
  if (phase === "finished" && drillResult) {
    return (
      <CommonTestResultPanel
        questions={questions}
        answers={drillResult.answers}
        historyItem={drillResult.historyItem}
        totalElapsedSec={drillResult.totalElapsedSec}
        theme={theme}
        sectionTitle={`第${sectionNumber}問 — ${sectionTitle}`}
        subjectRoute={subjectRoute}
        onRetry={handleRetry}
      />
    );
  }

  // ── Running / Revealed ────────────────────────────────────────────────
  return (
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
  );
}
