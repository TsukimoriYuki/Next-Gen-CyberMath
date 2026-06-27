"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  PlusCircle,
  XCircle,
} from "lucide-react";
import type { Lecture, LectureBlock, MistakeDiagnosisTag } from "@/data/specialLectures";
import { MathText } from "@/components/math/Math";
import {
  buildHistoryItem,
  COMMON_TEST_MISTAKE_TAGS,
  getCommonTestMistakeTagLabel,
  getCommonTestRiskLevel,
  getCommonTestRiskMeta,
  normalizeCommonTestMistakeTags,
  saveCommonTestDrillHistory,
  type CommonTestConfidence,
  type CommonTestMistakeTagId,
} from "@/lib/common-test-history";

type ProblemBlock = Extract<LectureBlock, { type: "problem" }>;
type SaveState = "idle" | "saved" | "registering" | "registered" | "error";

const CONFIDENCE_OPTIONS: { value: CommonTestConfidence; label: string; sub: string }[] = [
  { value: "confident", label: "自信あり", sub: "根拠を持って選べた" },
  { value: "unsure", label: "少し不安", sub: "迷いは残った" },
  { value: "guessed", label: "勘で解答", sub: "根拠が弱い" },
  { value: "blank", label: "わからない", sub: "復習優先" },
];

export function LectureProblemInteraction({
  lecture,
  block,
  onAnswered,
}: {
  lecture: Lecture;
  block: ProblemBlock;
  /** 解答（解答して記録へ進む）した瞬間に呼ばれる。進捗の完了扱いに使う。 */
  onAnswered?: () => void;
}) {
  const startedAtRef = useRef(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [draftAnswer, setDraftAnswer] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [confidence, setConfidence] = useState<CommonTestConfidence | null>(null);
  const [selectedMistakeTagIds, setSelectedMistakeTagIds] = useState<CommonTestMistakeTagId[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const hasChoices = Boolean(block.choices?.length);
  const answerValue = hasChoices ? selectedAnswer : draftAnswer;
  const isCorrect = isRevealed && isLectureAnswerCorrect(answerValue, block.answer ?? "");
  const availableTags = useMemo(
    () => buildAvailableMistakeTags(block.mistakeTags, isCorrect),
    [block.mistakeTags, isCorrect]
  );
  const normalizedMistakeTagIds = useMemo(
    () =>
      normalizeCommonTestMistakeTags({
        tagIds: selectedMistakeTagIds,
        isCorrect,
        confidence: confidence ?? "unsure",
      }),
    [confidence, isCorrect, selectedMistakeTagIds]
  );
  const riskLevel = getCommonTestRiskLevel(normalizedMistakeTagIds);
  const riskMeta = getCommonTestRiskMeta(riskLevel);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  function reveal() {
    if (!normalizeLectureAnswer(answerValue)) return;
    setIsRevealed(true);
    setSaveState("idle");
    setMessage(null);
    onAnswered?.();
  }

  function toggleMistakeTag(tagId: CommonTestMistakeTagId) {
    setSelectedMistakeTagIds((current) =>
      current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId]
    );
    setSaveState("idle");
  }

  function saveLectureHistory() {
    if (saveState === "saved" || saveState === "registered") return;
    const selectedConfidence = confidence ?? "unsure";
    const savedAt = Date.now();
    const startedAt = startedAtRef.current || savedAt;
    const subjectId = getLectureSubjectId(lecture);
    const sectionId = `lecture-${lecture.slug}`;
    const source = {
      sourceType: "lecture" as const,
      lectureId: lecture.id,
      lectureSlug: lecture.slug,
      lectureTitle: lecture.title,
      blockId: block.id,
      problemTitle: block.title,
    };
    const historyItem = buildHistoryItem({
      subjectId,
      sectionId,
      startedAt,
      finishedAt: savedAt,
      source,
      answers: [
        {
          questionId: getLectureQuestionId(lecture, block),
          selectedAnswer: answerValue,
          correctAnswer: block.answer ?? "",
          isCorrect,
          timeSpentSec: Math.max(1, Math.floor((savedAt - startedAt) / 1000)),
          estimatedMinutes: Math.max(3, Math.min(lecture.recommendedMinutes, 10)),
          confidence: selectedConfidence,
          skillTags: buildLectureSkillTags(lecture, block),
          mistakeTagIds: normalizedMistakeTagIds,
          ...(riskLevel ? { riskLevel } : {}),
          ...source,
        },
      ],
    });

    saveCommonTestDrillHistory(historyItem);
    setSaveState("saved");
    setMessage("履歴に保存しました。今日の処方箋にも反映されます。");
  }

  async function registerReview() {
    if (!confidence) {
      setMessage("先に自信度を選んでください。");
      return;
    }
    if (saveState === "idle") saveLectureHistory();
    setSaveState("registering");
    setMessage(null);

    try {
      const res = await fetch("/api/review/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "common-test-lecture",
          itemId: getLectureQuestionId(lecture, block),
          subjectId: getLectureSubjectId(lecture),
          sectionId: `lecture-${lecture.slug}`,
          title: `${lecture.title}：${block.title}`,
          source: "common-test-lecture",
          reasonFlags: [
            isCorrect ? "lecture-correct" : "wrong",
            "source:lecture",
            `lecture-slug:${lecture.slug}`,
            `block-id:${block.id}`,
            `confidence:${confidence}`,
            ...(riskLevel ? [`risk:${riskLevel}`] : []),
            ...normalizedMistakeTagIds.map((tagId) => `mistake:${tagId}`),
          ],
          skillTags: buildLectureSkillTags(lecture, block),
        }),
      });

      if (!res.ok) {
        setSaveState("error");
        setMessage(res.status === 401 ? "ログインすると復習キューに登録できます。" : "復習キューに登録できませんでした。");
        return;
      }

      setSaveState("registered");
      setMessage("復習キューに登録しました。");
    } catch {
      setSaveState("error");
      setMessage("通信に失敗しました。");
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div>
          <div className="text-[11px] font-bold text-slate-500">共通テスト形式</div>
          <h2 className="mt-0.5 text-lg font-extrabold text-slate-950">{block.title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {block.points != null && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
              {block.points}点
            </span>
          )}
          {riskMeta && (
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${riskMeta.className}`}>
              {riskMeta.label}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <MathText className="text-[15px] leading-7 text-slate-800">{block.prompt}</MathText>
        </div>

        {hasChoices ? (
          <div className="grid gap-2">
            {block.choices?.map((choice, index) => {
              const active = selectedAnswer === choice;
              const correctChoice = isRevealed && isLectureAnswerCorrect(choice, block.answer ?? "");
              const wrongChoice = isRevealed && active && !correctChoice;
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => setSelectedAnswer(choice)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    correctChoice
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : wrongChoice
                        ? "border-rose-200 bg-rose-50 text-rose-900"
                        : active
                          ? "border-blue-300 bg-blue-50 text-blue-950"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-white"
                  }`}
                >
                  <div className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-mono text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                      {index + 1}
                    </span>
                    <MathText>{choice}</MathText>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <input
            value={draftAnswer}
            disabled={isRevealed}
            onChange={(event) => setDraftAnswer(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white"
            placeholder="解答を入力"
          />
        )}

        {!isRevealed ? (
          <button
            type="button"
            disabled={!normalizeLectureAnswer(answerValue)}
            onClick={reveal}
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
          >
            解答して記録へ進む
          </button>
        ) : (
          <div className="space-y-4">
            <div
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-rose-200 bg-rose-50 text-rose-900"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
              )}
              <div>
                <div className="font-extrabold">{isCorrect ? "正解です" : "見直しましょう"}</div>
                {!isCorrect && block.answer && (
                  <div className="mt-1 text-sm">
                    正答：<MathText>{block.answer}</MathText>
                  </div>
                )}
                <p className="mt-1 text-xs leading-5 opacity-80">
                  下の「できる人の頭の中」と解説タブで、判断順を確認しましょう。
                </p>
              </div>
            </div>

            <ConfidenceSelector selected={confidence} onSelect={setConfidence} />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-extrabold text-slate-950">今回の原因を記録</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableTags.map((tagId) => {
                  const active = selectedMistakeTagIds.includes(tagId);
                  return (
                    <button
                      key={tagId}
                      type="button"
                      onClick={() => toggleMistakeTag(tagId)}
                      className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                        active
                          ? "border-rose-200 bg-rose-50 text-rose-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
                      }`}
                    >
                      {getCommonTestMistakeTagLabel(tagId)}
                    </button>
                  );
                })}
              </div>
              {riskMeta && <p className="mt-3 text-xs text-slate-500">{riskMeta.description}</p>}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled={!confidence}
                onClick={saveLectureHistory}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                履歴に保存
              </button>
              <button
                type="button"
                disabled={!confidence || saveState === "registering"}
                onClick={registerReview}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saveState === "registering" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="h-4 w-4" />
                )}
                復習キューに登録
              </button>
            </div>

            {message && (
              <div
                className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-xs leading-5 ${
                  saveState === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {saveState === "error" ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ConfidenceSelector({
  selected,
  onSelect,
}: {
  selected: CommonTestConfidence | null;
  onSelect: (confidence: CommonTestConfidence) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-extrabold text-slate-950">自信度を記録</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {CONFIDENCE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`rounded-xl border p-3 text-left transition ${
              selected === option.value
                ? "border-blue-300 bg-blue-50 text-blue-800"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
            }`}
          >
            <div className="text-sm font-bold">{option.label}</div>
            <div className="mt-1 text-xs opacity-80">{option.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function buildAvailableMistakeTags(
  labels: MistakeDiagnosisTag[] | undefined,
  isCorrect: boolean
): CommonTestMistakeTagId[] {
  if (isCorrect) return ["unsure-correct"];
  const ids = new Set<CommonTestMistakeTagId>();
  for (const label of labels ?? []) {
    const tag = COMMON_TEST_MISTAKE_TAGS.find((candidate) => candidate.label === label);
    if (tag?.appliesTo === "wrong") ids.add(tag.id);
  }
  ids.add("confident-wrong");
  ids.add("time-up");
  return Array.from(ids);
}

function buildLectureSkillTags(lecture: Lecture, block: ProblemBlock): string[] {
  return Array.from(
    new Set([
      lecture.subject,
      lecture.unit,
      ...lecture.tags.slice(0, 4),
      ...(block.mistakeTags ?? []),
    ])
  );
}

function getLectureSubjectId(lecture: Lecture): string {
  if (lecture.subject.includes("IIB") || lecture.subject.includes("IIBC")) return "math-2bc";
  if (lecture.subject.includes("英語")) return "english-reading";
  return "math-1a";
}

function getLectureQuestionId(lecture: Lecture, block: ProblemBlock): string {
  return `lecture:${lecture.slug}:${block.id}`;
}

function isLectureAnswerCorrect(value: string, answer: string): boolean {
  return normalizeLectureAnswer(value) === normalizeLectureAnswer(answer);
}

function normalizeLectureAnswer(value: string): string {
  return value.replace(/\s+/g, "").replace(/[，、]/g, ",").trim();
}
