"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, BookOpen, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestConfidence } from "@/lib/common-test-history";
import {
  filterExamQuestionsBySections,
  getExamSectionInfos,
  type ExamSectionInfo,
} from "@/lib/common-test-exams";
import {
  saveCommonTestExamHistory,
  type CommonTestExamHistoryItem,
  type CommonTestExamAnswerRecord,
  type CommonTestExamSectionResult,
} from "@/lib/common-test-exam-history";
import {
  getCommonTestAnswerFormat,
  isCommonTestAnswerCorrect,
  normalizeCommonTestAnswer,
} from "@/lib/common-test-answer-normalize";
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
  return v !== null && v !== undefined && normalizeCommonTestAnswer(v) !== "";
}

export function CommonTestExamRunner({ preset, questions }: Props) {
  const isSelective =
    !!preset.requiredSectionIds &&
    !!preset.optionalSectionIds &&
    !!preset.optionalSelectCount;

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [historyItem, setHistoryItem] = useState<CommonTestExamHistoryItem | null>(null);
  // 選択制（数IIBC）: 選択中の選択大問ID
  const [selectedOptional, setSelectedOptional] = useState<string[]>([]);
  // 実際に出題する問題（選択確定後にセット。非選択制は全問題）
  const [activeQuestions, setActiveQuestions] = useState<CommonTestDrillQuestion[]>(
    isSelective ? [] : questions
  );
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

  const toggleOptionalSection = useCallback(
    (sectionId: string) => {
      setSelectedOptional((prev) => {
        if (prev.includes(sectionId)) return prev.filter((s) => s !== sectionId);
        if (prev.length >= (preset.optionalSelectCount ?? 0)) return prev;
        return [...prev, sectionId];
      });
    },
    [preset.optionalSelectCount]
  );

  const startExam = useCallback(() => {
    let active = questions;
    if (isSelective) {
      const allowed = [...(preset.requiredSectionIds ?? []), ...selectedOptional];
      active = filterExamQuestionsBySections(questions, allowed);
      if (active.length === 0) return;
      setActiveQuestions(active);
    }
    const initial: Record<string, QuestionState> = {};
    for (const q of active) {
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
  }, [questions, isSelective, preset.requiredSectionIds, selectedOptional]);

  // handleAnswer omits elapsedSec from deps — uses ref to avoid recreating every second
  const handleAnswer = useCallback(
    (answer: string) => {
      const qId = activeQuestions[currentIdx]?.id;
      if (!qId) return;
      const effectiveAnswer = normalizeCommonTestAnswer(answer) === "" ? null : answer;
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
    [currentIdx, activeQuestions]
  );

  const handleToggleFlag = useCallback(() => {
    const qId = activeQuestions[currentIdx]?.id;
    if (!qId) return;
    setQuestionStates((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        markedForReview: !prev[qId]?.markedForReview,
      },
    }));
  }, [currentIdx, activeQuestions]);

  const handleSetConfidence = useCallback(
    (c: CommonTestConfidence) => {
      const qId = activeQuestions[currentIdx]?.id;
      if (!qId) return;
      setQuestionStates((prev) => ({
        ...prev,
        [qId]: {
          ...prev[qId],
          confidence: prev[qId]?.confidence === c ? null : c,
        },
      }));
    },
    [currentIdx, activeQuestions]
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
    const answerRecords: CommonTestExamAnswerRecord[] = activeQuestions.map((q) => {
      const qs = questionStates[q.id] ?? {
        selectedAnswer: null,
        markedForReview: false,
        answeredAtSec: null,
        confidence: null,
      };
      const selected = isRealAnswer(qs.selectedAnswer) ? qs.selectedAnswer : null;
      const isCorrect =
        selected !== null &&
        isCommonTestAnswerCorrect(
          selected,
          q.correctAnswer,
          getCommonTestAnswerFormat(q)
        );

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

    const isTimeLimitCorrect = (a: CommonTestExamAnswerRecord) =>
      a.isCorrect && a.answeredAtSec !== null && a.answeredAtSec <= preset.examLimitSec;

    // Dual scores (question counts)
    const timeLimitCorrect = answerRecords.filter(isTimeLimitCorrect).length;
    const unlimitedCorrect = answerRecords.filter((a) => a.isCorrect).length;
    const total = activeQuestions.length;

    // Section results — 配点ベース（大問配点 × 正答率を四捨五入）
    const sectionInfos = getExamSectionInfos(preset, activeQuestions);
    const sectionResults: CommonTestExamSectionResult[] = [];
    for (const info of sectionInfos) {
      const records = answerRecords.filter((a) => a.sectionId === info.sectionId);
      if (records.length === 0) continue; // 選択しなかった大問はスキップ
      const correctCount = records.filter((a) => a.isCorrect).length;
      const timeLimitCorrectCount = records.filter(isTimeLimitCorrect).length;
      const answeredCount = records.filter((a) => isRealAnswer(a.selectedAnswer)).length;
      const hasScore = info.maxScore > 0;
      sectionResults.push({
        sectionId: info.sectionId,
        sectionNumber: info.sectionNumber,
        sectionTitle: info.title,
        totalQuestions: records.length,
        answeredCount,
        correctCount,
        timeLimitCorrectCount,
        maxScore: hasScore ? info.maxScore : undefined,
        earnedScore: hasScore
          ? Math.round((info.maxScore * correctCount) / records.length)
          : undefined,
        timeLimitEarnedScore: hasScore
          ? Math.round((info.maxScore * timeLimitCorrectCount) / records.length)
          : undefined,
      });
    }

    // 配点合計（全大問に配点がある場合のみ配点ベースを有効化）
    const allScored =
      sectionResults.length > 0 && sectionResults.every((s) => (s.maxScore ?? 0) > 0);
    const maxScore = allScored
      ? sectionResults.reduce((s, r) => s + (r.maxScore ?? 0), 0)
      : undefined;
    const timeLimitScore = allScored
      ? sectionResults.reduce((s, r) => s + (r.timeLimitEarnedScore ?? 0), 0)
      : undefined;
    const unlimitedScore = allScored
      ? sectionResults.reduce((s, r) => s + (r.earnedScore ?? 0), 0)
      : undefined;

    // パーセントは配点ベースがあれば配点から、なければ問題数から算出
    const timeLimitScorePct =
      maxScore && maxScore > 0
        ? Math.round(((timeLimitScore ?? 0) / maxScore) * 100)
        : total > 0
          ? Math.round((timeLimitCorrect / total) * 100)
          : 0;
    const unlimitedScorePct =
      maxScore && maxScore > 0
        ? Math.round(((unlimitedScore ?? 0) / maxScore) * 100)
        : total > 0
          ? Math.round((unlimitedCorrect / total) * 100)
          : 0;

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
      maxScore,
      timeLimitScore,
      unlimitedScore,
      selectedSectionIds: sectionResults.map((s) => s.sectionId),
    };

    saveCommonTestExamHistory(item);
    setHistoryItem(item);
    setPhase("finished");
  }, [activeQuestions, questionStates, preset]);

  // Build nav states — safe for intro phase where questionStates = {}
  const navStates: QuestionNavState[] = activeQuestions.map((q) => {
    const qs = questionStates[q.id];
    return {
      answered: isRealAnswer(qs?.selectedAnswer),
      flagged: qs?.markedForReview ?? false,
    };
  });

  const unansweredCount = navStates.filter((s) => !s.answered).length;
  const flaggedCount = navStates.filter((s) => s.flagged).length;

  // ── Intro phase（司令室トーンのまま） ────────────────────────────────────
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
    const sectionInfos = getExamSectionInfos(preset, questions);
    const requiredInfos = isSelective
      ? sectionInfos.filter((s) => preset.requiredSectionIds!.includes(s.sectionId))
      : sectionInfos;
    const optionalInfos = isSelective
      ? sectionInfos.filter((s) => preset.optionalSectionIds!.includes(s.sectionId))
      : [];
    const selectCount = preset.optionalSelectCount ?? 0;
    const canStart = !isSelective || selectedOptional.length === selectCount;
    const activeSectionIds = isSelective
      ? [...preset.requiredSectionIds!, ...selectedOptional]
      : preset.sectionIds;
    const activeQuestionCount = questions.filter((q) =>
      activeSectionIds.includes(q.sectionId)
    ).length;

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
                {
                  icon: <BookOpen className="h-4 w-4" />,
                  label: "大問数",
                  value: isSelective ? `必答${requiredInfos.length}+選択${selectCount}` : `${sectionInfos.length}大問`,
                },
                { icon: <Zap className="h-4 w-4" />, label: "問題数", value: `${activeQuestionCount}問` },
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

            {/* 選択問題ピッカー（数IIBC のみ） */}
            {isSelective && (
              <div
                className="rounded-xl p-4 space-y-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                    選択問題 — 第4問〜第7問から{selectCount}題を選ぶ
                  </div>
                  <div
                    className="font-mono text-[10px] font-bold"
                    style={{ color: canStart ? "#34d399" : "#fbbf24" }}
                  >
                    {selectedOptional.length} / {selectCount}
                  </div>
                </div>

                {/* 必答の表示 */}
                <div className="flex flex-wrap gap-1.5">
                  {requiredInfos.map((info) => (
                    <span
                      key={info.sectionId}
                      className="rounded-lg px-2.5 py-1.5 font-mono text-[10px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      第{info.sectionNumber}問 {info.title}（必答・{info.maxScore}点）
                    </span>
                  ))}
                </div>

                {/* 選択トグル */}
                <div className="grid gap-2 sm:grid-cols-2">
                  {optionalInfos.map((info) => {
                    const isOn = selectedOptional.includes(info.sectionId);
                    const isFull = !isOn && selectedOptional.length >= selectCount;
                    return (
                      <button
                        key={info.sectionId}
                        type="button"
                        onClick={() => toggleOptionalSection(info.sectionId)}
                        disabled={isFull}
                        className="flex items-center gap-2.5 rounded-xl p-3 text-left transition-all hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed"
                        style={{
                          background: isOn
                            ? `rgba(${preset.theme.glowRgb},0.12)`
                            : "rgba(255,255,255,0.03)",
                          border: isOn
                            ? `1px solid rgba(${preset.theme.glowRgb},0.55)`
                            : "1px solid rgba(255,255,255,0.10)",
                        }}
                      >
                        <div
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{
                            background: isOn ? `rgba(${preset.theme.glowRgb},0.3)` : "rgba(255,255,255,0.06)",
                            border: isOn
                              ? `1px solid rgba(${preset.theme.glowRgb},0.7)`
                              : "1px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          {isOn && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: preset.theme.primary }} />}
                        </div>
                        <div className="min-w-0">
                          <div
                            className="font-mono text-[11px] font-bold"
                            style={{ color: isOn ? preset.theme.primary : "rgba(255,255,255,0.70)" }}
                          >
                            第{info.sectionNumber}問 {info.title}
                          </div>
                          <div className="font-mono text-[9px] text-white/35">
                            {info.maxScore}点 · {info.questionCount}問
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dual score explanation */}
            <div
              className="rounded-xl p-4 space-y-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/35 mb-3">
                採点方式（100点満点・大問配点 × 正答率）
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 mt-1.5 rounded-full shrink-0" style={{ background: "#fbbf24" }} />
                  <div className="font-mono text-[10px] text-white/55 leading-relaxed">
                    <span className="text-amber-400 font-bold">時間内スコア</span> — 制限時間内に解答した分の得点（本番の実力）
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 mt-1.5 rounded-full shrink-0" style={{ background: "#22d3ee" }} />
                  <div className="font-mono text-[10px] text-white/55 leading-relaxed">
                    <span className="text-cyan-400 font-bold">無制限スコア</span> — 時間超過分も含めた得点（知識の上限）
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
                試験中は問題を自由に行き来できます。制限時間が過ぎた後も解答を続けられますが、
                時間内スコアには反映されません。試験画面は本番に近い紙面表示に切り替わります。
              </div>
            </div>

            {/* Start button */}
            <button
              type="button"
              onClick={startExam}
              disabled={!canStart}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-mono text-sm font-extrabold uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, rgba(${preset.theme.glowRgb},0.30), rgba(${preset.theme.glowRgb},0.15))`,
                border: `1px solid rgba(${preset.theme.glowRgb},0.50)`,
                color: preset.theme.primary,
                boxShadow: `0 0 30px rgba(${preset.theme.glowRgb},0.18)`,
              }}
            >
              <Zap className="h-4 w-4" />
              {canStart
                ? "試験を開始する"
                : `選択問題をあと${selectCount - selectedOptional.length}題選んでください`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result phase ─────────────────────────────────────────────────────────
  if (phase === "finished") {
    if (!historyItem) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="font-mono text-sm text-white/40">結果を読み込んでいます…</p>
        </div>
      );
    }
    const questionTitlesMap = new Map(
      activeQuestions.map((q) => [
        q.id,
        {
          title: q.title,
          skillTags: q.skillTags,
          difficultyStage: q.difficultyStage,
          dependsOnPrevious: q.dependsOnPrevious,
          // 解答形式は解決済みの値を渡す（choice 問題は answerFormat 未設定でも
          // "choice" になるよう正規化し、結果画面の解答形式別分析を正確にする）
          answerFormat: getCommonTestAnswerFormat(q),
        },
      ])
    );
    return (
      <CommonTestExamResultPanel
        historyItem={historyItem}
        preset={preset}
        questionTitlesMap={questionTitlesMap}
      />
    );
  }

  // ── Running / Overtime phase（紙面風） ───────────────────────────────────
  const currentQuestion = activeQuestions[currentIdx];
  const currentQState: QuestionState = questionStates[currentQuestion?.id ?? ""] ?? {
    selectedAnswer: null,
    markedForReview: false,
    answeredAtSec: null,
    confidence: null,
  };

  return (
    <div className="min-h-screen" style={{ background: "#eef0f2", color: "#1f2937" }}>
      {/* Header */}
      <CommonTestExamHeader
        preset={preset}
        elapsedSec={elapsedSec}
        phase={phase as "running" | "overtime"}
        currentIdx={currentIdx}
        totalQuestions={activeQuestions.length}
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
                totalQuestions={activeQuestions.length}
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
            <div className="flex items-center justify-between mt-5">
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 rounded px-4 py-2.5 text-xs font-bold transition-all hover:opacity-75 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "#ffffff", border: "1px solid #d1d5db", color: "#374151" }}
              >
                ← 前の問題
              </button>
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.min(activeQuestions.length - 1, i + 1))}
                disabled={currentIdx === activeQuestions.length - 1}
                className="flex items-center gap-2 rounded px-4 py-2.5 text-xs font-bold transition-all hover:opacity-75 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "#ffffff", border: "1px solid #d1d5db", color: "#374151" }}
              >
                次の問題 →
              </button>
            </div>
          </div>

          {/* Navigator (desktop sidebar) */}
          <div className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <CommonTestExamNavigator
                preset={preset}
                questions={activeQuestions}
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
            questions={activeQuestions}
            currentIdx={currentIdx}
            navStates={navStates}
            onNavigate={handleNavigate}
          />
        </div>
      </div>

      {/* Finish confirmation modal — 紙面風 */}
      {showFinishModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          <div
            className="w-full max-w-sm rounded-lg p-6 sm:p-7 space-y-5"
            style={{
              background: "#ffffff",
              border: "1px solid #d1d5db",
              boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold" style={{ color: "#111827" }}>
                解答を提出しますか？
              </h3>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                提出後は解答を修正できません。
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "未解答",
                  value: unansweredCount,
                  warn: unansweredCount > 0,
                  warnColor: "#dc2626",
                },
                {
                  label: "見直しフラグ",
                  value: flaggedCount,
                  warn: flaggedCount > 0,
                  warnColor: "#d97706",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded p-3 text-center"
                  style={{
                    background: s.warn ? (s.warnColor === "#dc2626" ? "#fef2f2" : "#fffbeb") : "#f9fafb",
                    border: s.warn
                      ? `1px solid ${s.warnColor === "#dc2626" ? "#fca5a5" : "#fcd34d"}`
                      : "1px solid #e5e7eb",
                  }}
                >
                  <div
                    className="font-mono text-2xl font-bold"
                    style={{ color: s.warn ? s.warnColor : "#9ca3af" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: "#6b7280" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Warnings */}
            <div className="space-y-2">
              {unansweredCount > 0 && (
                <div
                  className="flex items-start gap-2 rounded p-3"
                  style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#991b1b" }}>
                    {unansweredCount}問が未解答です。提出後は修正できません。
                  </p>
                </div>
              )}
              {flaggedCount > 0 && (
                <div
                  className="flex items-start gap-2 rounded p-3"
                  style={{ background: "#fffbeb", border: "1px solid #fcd34d" }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#d97706" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#92400e" }}>
                    見直しフラグが{flaggedCount}問に付いています。確認しましたか？
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 rounded py-3 text-xs font-bold transition-all hover:opacity-75"
                style={{ background: "#ffffff", border: "1px solid #d1d5db", color: "#374151" }}
              >
                試験に戻る
              </button>
              <button
                type="button"
                onClick={handleFinishConfirm}
                className="flex-1 rounded py-3 text-xs font-bold transition-all hover:opacity-85 active:scale-[0.97]"
                style={{ background: "#111827", color: "#ffffff" }}
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
