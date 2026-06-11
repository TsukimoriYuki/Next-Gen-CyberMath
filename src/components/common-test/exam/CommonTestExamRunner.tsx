"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, BookOpen, Clock, AlertTriangle } from "lucide-react";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestConfidence } from "@/lib/common-test-history";
import {
  saveCommonTestExamHistory,
  type CommonTestExamHistoryItem,
  type CommonTestExamAnswerRecord,
  type CommonTestExamSectionResult,
} from "@/lib/common-test-exam-history";
import { CommonTestExamHeader } from "./CommonTestExamHeader";
import { CommonTestExamNavigator } from "./CommonTestExamNavigator";
import type { QuestionNavState } from "./CommonTestExamNavigator";
import { CommonTestExamQuestionPanel } from "./CommonTestExamQuestionPanel";
import { CommonTestExamResultPanel } from "./CommonTestExamResultPanel";

interface QuestionState {
  selectedAnswer: string | null;
  markedForReview: boolean;
  answeredAtSec: number | null;
  confidence: CommonTestConfidence | null;
}

type Phase = "intro" | "running" | "overtime" | "finished";

interface Props {
  preset: CommonTestExamPreset;
  questions: CommonTestDrillQuestion[];
}

function isRealAnswer(v: string | null | undefined): v is string {
  return v !== null && v !== undefined && v !== "";
}

export function CommonTestExamRunner({ preset, questions }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [historyItem, setHistoryItem] = useState<CommonTestExamHistoryItem | null>(null);
  const startedAtRef = useRef<number>(0);
  // Ref tracks elapsed seconds without causing handleAnswer to recreate every second
  const elapsedSecRef = useRef(0);

  // Timer — runs only during active exam phases
  useEffect(() => {
    if (phase !== "running" && phase !== "overtime") return;
    const interval = setInterval(() => {
      setElapsedSec((prev) => {
        const next = prev + 1;
        elapsedSecRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // Transition to overtime when time limit reached
  useEffect(() => {
    if (phase === "running" && elapsedSec >= preset.examLimitSec) {
      setPhase("overtime");
    }
  }, [elapsedSec, phase, preset.examLimitSec]);

  const startExam = useCallback(() => {
    const initial: Record<string, QuestionState> = {};
    for (const q of questions) {
      initial[q.id] = {
        selectedAnswer: null,
        markedForReview: false,
        answeredAtSec: null,
        confidence: null,
      };
    }
    setQuestionStates(initial);
    setElapsedSec(0);
    elapsedSecRef.current = 0;
    setCurrentIdx(0);
    startedAtRef.current = Date.now();
    setPhase("running");
  }, [questions]);

  // handleAnswer omits elapsedSec from deps — uses ref to avoid recreating every second
  const handleAnswer = useCallback(
    (answer: string) => {
      const qId = questions[currentIdx]?.id;
      if (!qId) return;
      // Convert empty string to null (blank-number clearing)
      const effectiveAnswer = answer === "" ? null : answer;
      const now = elapsedSecRef.current;
      setQuestionStates((prev) => ({
        ...prev,
        [qId]: {
          ...prev[qId],
          selectedAnswer: effectiveAnswer,
          answeredAtSec: effectiveAnswer !== null
            ? (prev[qId]?.answeredAtSec ?? now)
            : null,
        },
      }));
    },
    [currentIdx, questions]
  );

  const handleToggleFlag = useCallback(() => {
    const qId = questions[currentIdx]?.id;
    if (!qId) return;
    setQuestionStates((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        markedForReview: !prev[qId]?.markedForReview,
      },
    }));
  }, [currentIdx, questions]);

  const handleSetConfidence = useCallback(
    (c: CommonTestConfidence) => {
      const qId = questions[currentIdx]?.id;
      if (!qId) return;
      setQuestionStates((prev) => ({
        ...prev,
        [qId]: {
          ...prev[qId],
          confidence: prev[qId]?.confidence === c ? null : c,
        },
      }));
    },
    [currentIdx, questions]
  );

  const handleNavigate = useCallback((idx: number) => {
    setCurrentIdx(idx);
  }, []);

  const handleFinishRequest = useCallback(() => {
    setShowFinishModal(true);
  }, []);

  const handleFinishConfirm = useCallback(() => {
    setShowFinishModal(false);
    const finishedAt = Date.now();
    const actualDurationSec = Math.floor((finishedAt - startedAtRef.current) / 1000);

    // Build answer records — treat "" same as null (unanswered)
    const answerRecords: CommonTestExamAnswerRecord[] = questions.map((q) => {
      const qs = questionStates[q.id] ?? {
        selectedAnswer: null,
        markedForReview: false,
        answeredAtSec: null,
        confidence: null,
      };
      const selected = isRealAnswer(qs.selectedAnswer) ? qs.selectedAnswer : null;
      const isCorrect =
        selected !== null &&
        (Array.isArray(q.correctAnswer)
          ? q.correctAnswer.includes(selected)
          : selected === q.correctAnswer);

      return {
        questionId: q.id,
        sectionId: q.sectionId,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        estimatedSec: q.estimatedMinutes * 60,
        answeredAtSec: selected !== null ? qs.answeredAtSec : null,
        markedForReview: qs.markedForReview,
        confidence: qs.confidence,
        skillTags: q.skillTags,
      };
    });

    // Dual scores
    const timeLimitCorrect = answerRecords.filter(
      (a) =>
        a.isCorrect &&
        a.answeredAtSec !== null &&
        a.answeredAtSec <= preset.examLimitSec
    ).length;
    const unlimitedCorrect = answerRecords.filter((a) => a.isCorrect).length;
    const total = questions.length;
    const timeLimitScorePct = total > 0 ? Math.round((timeLimitCorrect / total) * 100) : 0;
    const unlimitedScorePct = total > 0 ? Math.round((unlimitedCorrect / total) * 100) : 0;

    // Section results
    const sectionMap = new Map<string, CommonTestExamSectionResult>();
    for (const q of questions) {
      const num = parseInt(q.sectionId.replace("section-", ""), 10);
      if (!sectionMap.has(q.sectionId)) {
        sectionMap.set(q.sectionId, {
          sectionId: q.sectionId,
          sectionNumber: num,
          totalQuestions: 0,
          answeredCount: 0,
          correctCount: 0,
        });
      }
      const sr = sectionMap.get(q.sectionId)!;
      sr.totalQuestions += 1;
      const ar = answerRecords.find((a) => a.questionId === q.id);
      if (ar && isRealAnswer(ar.selectedAnswer)) sr.answeredCount += 1;
      if (ar?.isCorrect) sr.correctCount += 1;
    }
    const sectionResults = [...sectionMap.values()].sort(
      (a, b) => a.sectionNumber - b.sectionNumber
    );

    // Unanswered count — null only (isRealAnswer normalisation already applied above)
    const unansweredCount = answerRecords.filter((a) => a.selectedAnswer === null).length;

    // Weak skill tags (wrong + guessed-correct)
    const weakCandidates = answerRecords.filter(
      (a) => !a.isCorrect || a.confidence === "guessed"
    );
    const tagFreq = new Map<string, number>();
    for (const a of weakCandidates) {
      for (const tag of a.skillTags) {
        tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
      }
    }
    const weakSkillTags = [...tagFreq.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t);

    const item: CommonTestExamHistoryItem = {
      id: `${preset.id}-${finishedAt}`,
      examId: preset.id,
      subjectId: preset.subjectId,
      startedAt: new Date(startedAtRef.current).toISOString(),
      finishedAt: new Date(finishedAt).toISOString(),
      examLimitSec: preset.examLimitSec,
      actualDurationSec,
      totalQuestions: total,
      timeLimitCorrect,
      unlimitedCorrect,
      timeLimitScorePct,
      unlimitedScorePct,
      unansweredCount,
      sectionResults,
      answers: answerRecords,
      weakSkillTags,
    };

    saveCommonTestExamHistory(item);
    setHistoryItem(item);
    setPhase("finished");
  }, [questions, questionStates, preset]);

  // Build nav states — safe for intro phase where questionStates = {}
  // Uses !!(qs?.selectedAnswer) to safely handle undefined qs
  const navStates: QuestionNavState[] = questions.map((q) => {
    const qs = questionStates[q.id];
    return {
      answered: isRealAnswer(qs?.selectedAnswer),
      flagged: qs?.markedForReview ?? false,
    };
  });

  const unansweredCount = navStates.filter((s) => !s.answered).length;
  const flaggedCount = navStates.filter((s) => s.flagged).length;

  // ── Intro phase ──────────────────────────────────────────────────────────
  if (phase === "intro") {
    if (questions.length === 0) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              EXAM SIMULATOR
            </div>
            <p className="font-mono text-sm text-white/50">
              この試験プリセットには問題が登録されていません。
            </p>
            <Link href="/common-test/simulator" className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white/70 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              試験選択に戻る
            </Link>
          </div>
        </div>
      );
    }

    const minutes = preset.examLimitSec / 60;
    const sectionCount = new Set(questions.map((q) => q.sectionId)).size;

    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(${preset.theme.glowRgb},0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(${preset.theme.glowRgb},0.018) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${preset.theme.glowRgb},0.07) 0%, transparent 70%)` }}
        />

        <div className="relative w-full max-w-xl space-y-6">
          {/* Back */}
          <Link
            href="/common-test/simulator"
            className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
            style={{ color: `rgba(${preset.theme.glowRgb},0.6)` }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            試験選択に戻る
          </Link>

          {/* Exam card */}
          <div
            className="rounded-3xl p-6 sm:p-8 space-y-6"
            style={{
              background: `linear-gradient(145deg, rgba(${preset.theme.glowRgb},0.06) 0%, rgba(0,0,0,0.6) 100%)`,
              border: `1px solid rgba(${preset.theme.glowRgb},0.25)`,
              boxShadow: `0 0 60px rgba(${preset.theme.glowRgb},0.08)`,
            }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ background: `rgba(${preset.theme.glowRgb},0.10)`, border: `1px solid rgba(${preset.theme.glowRgb},0.28)`, color: preset.theme.primary }}
            >
              <Zap className="h-3.5 w-3.5" />
              EXAM SIMULATOR
            </div>

            <h1
              className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{
                background: `linear-gradient(135deg, ${preset.theme.primary} 0%, #ffffff 55%, ${preset.theme.secondary} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {preset.title}
            </h1>

            <p className="font-mono text-sm leading-relaxed text-white/45">
              {preset.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Clock className="h-4 w-4" />, label: "試験時間", value: `${minutes}分` },
                { icon: <BookOpen className="h-4 w-4" />, label: "大問数", value: `${sectionCount}大問` },
                { icon: <Zap className="h-4 w-4" />, label: "問題数", value: `${questions.length}問` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <div className="flex justify-center mb-1.5" style={{ color: preset.theme.primary }}>
                    {s.icon}
                  </div>
                  <div className="font-mono text-sm font-extrabold text-white">{s.value}</div>
                  <div className="font-mono text-[8px] text-white/30 uppercase tracking-wider mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Dual score explanation */}
            <div
              className="rounded-xl p-4 space-y-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/35 mb-3">
                採点方式
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 mt-1.5 rounded-full shrink-0" style={{ background: "#fbbf24" }} />
                  <div className="font-mono text-[10px] text-white/55 leading-relaxed">
                    <span className="text-amber-400 font-bold">TIME-LIMIT SCORE</span> — 制限時間内の正答数（本番の実力）
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 mt-1.5 rounded-full shrink-0" style={{ background: "#22d3ee" }} />
                  <div className="font-mono text-[10px] text-white/55 leading-relaxed">
                    <span className="text-cyan-400 font-bold">UNLIMITED SCORE</span> — 全問回答した場合の正答数（知識の上限）
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}
            >
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400/70 mt-0.5" />
              <div className="font-mono text-[10px] text-white/45 leading-relaxed">
                試験中はいつでも問題を行き来できます。制限時間後もOVERTIMEとして回答継続できます。
                見直しフラグで気になる問題を記録しながら進めましょう。
              </div>
            </div>

            {/* Start button */}
            <button
              type="button"
              onClick={startExam}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-mono text-sm font-extrabold uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, rgba(${preset.theme.glowRgb},0.30), rgba(${preset.theme.glowRgb},0.15))`,
                border: `1px solid rgba(${preset.theme.glowRgb},0.50)`,
                color: preset.theme.primary,
                boxShadow: `0 0 30px rgba(${preset.theme.glowRgb},0.18)`,
              }}
            >
              <Zap className="h-4 w-4" />
              試験を開始する
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result phase ─────────────────────────────────────────────────────────
  if (phase === "finished") {
    if (!historyItem) {
      // Should not happen — both states set together in handleFinishConfirm
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="font-mono text-sm text-white/40">結果を読み込んでいます…</p>
        </div>
      );
    }
    const questionTitlesMap = new Map(
      questions.map((q) => [q.id, { title: q.title, skillTags: q.skillTags }])
    );
    return (
      <CommonTestExamResultPanel
        historyItem={historyItem}
        preset={preset}
        questionTitlesMap={questionTitlesMap}
      />
    );
  }

  // ── Running / Overtime phase ─────────────────────────────────────────────
  const currentQuestion = questions[currentIdx];
  const currentQState: QuestionState = questionStates[currentQuestion?.id ?? ""] ?? {
    selectedAnswer: null,
    markedForReview: false,
    answeredAtSec: null,
    confidence: null,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <CommonTestExamHeader
        preset={preset}
        elapsedSec={elapsedSec}
        phase={phase as "running" | "overtime"}
        currentIdx={currentIdx}
        totalQuestions={questions.length}
        unansweredCount={unansweredCount}
        onFinish={handleFinishRequest}
      />

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex gap-6">
          {/* Main question area */}
          <div className="flex-1 min-w-0">
            {currentQuestion && (
              <CommonTestExamQuestionPanel
                question={currentQuestion}
                questionNumber={currentIdx + 1}
                totalQuestions={questions.length}
                selectedAnswer={currentQState.selectedAnswer}
                markedForReview={currentQState.markedForReview}
                confidence={currentQState.confidence}
                theme={preset.theme}
                onAnswer={handleAnswer}
                onToggleFlag={handleToggleFlag}
                onSetConfidence={handleSetConfidence}
              />
            )}

            {/* Navigation arrows */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.50)" }}
              >
                ← 前の問題
              </button>
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIdx === questions.length - 1}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.50)" }}
              >
                次の問題 →
              </button>
            </div>
          </div>

          {/* Navigator (desktop sidebar) */}
          <div className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-20">
              <CommonTestExamNavigator
                preset={preset}
                questions={questions}
                currentIdx={currentIdx}
                navStates={navStates}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </div>

        {/* Mobile navigator — below question area */}
        <div className="mt-6 lg:hidden">
          <CommonTestExamNavigator
            preset={preset}
            questions={questions}
            currentIdx={currentIdx}
            navStates={navStates}
            onNavigate={handleNavigate}
          />
        </div>
      </div>

      {/* Finish confirmation modal */}
      {showFinishModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 sm:p-7 space-y-5"
            style={{
              background: "rgba(10,10,10,0.97)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 0 60px rgba(0,0,0,0.6)",
            }}
          >
            <div className="text-center space-y-1">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] mb-3"
                style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}
              >
                提出確認
              </div>
              <h3 className="font-display text-xl font-extrabold text-white">
                本当に提出しますか？
              </h3>
              <p className="font-mono text-[10px] text-white/40">
                この操作は取り消せません。
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "未回答",
                  value: unansweredCount,
                  color: unansweredCount > 0 ? "#ef4444" : "rgba(255,255,255,0.35)",
                  warn: unansweredCount > 0,
                },
                {
                  label: "見直し中",
                  value: flaggedCount,
                  color: flaggedCount > 0 ? "#fbbf24" : "rgba(255,255,255,0.35)",
                  warn: flaggedCount > 0,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: s.warn
                      ? s.color === "#ef4444"
                        ? "rgba(239,68,68,0.06)"
                        : "rgba(251,191,36,0.06)"
                      : "rgba(255,255,255,0.03)",
                    border: s.warn
                      ? s.color === "#ef4444"
                        ? "1px solid rgba(239,68,68,0.20)"
                        : "1px solid rgba(251,191,36,0.20)"
                      : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="font-mono text-2xl font-extrabold" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-[8px] text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Warnings */}
            <div className="space-y-2">
              {unansweredCount > 0 && (
                <div
                  className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)" }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-mono text-[9px] text-red-400/80 leading-relaxed">
                    {unansweredCount}問が未回答です。提出後は修正できません。
                  </p>
                </div>
              )}
              {flaggedCount > 0 && (
                <div
                  className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.20)" }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400/70 shrink-0 mt-0.5" />
                  <p className="font-mono text-[9px] text-amber-400/70 leading-relaxed">
                    {flaggedCount}問に見直しフラグがあります。確認しましたか？
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 rounded-xl py-3 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleFinishConfirm}
                className="flex-1 rounded-xl py-3 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-90 active:scale-[0.97]"
                style={{
                  background: `rgba(${preset.theme.glowRgb},0.22)`,
                  border: `1px solid rgba(${preset.theme.glowRgb},0.50)`,
                  color: preset.theme.primary,
                }}
              >
                提出する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
