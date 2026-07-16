"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Target,
  XCircle,
} from "lucide-react";

import { ReviewQueueRegistrar } from "@/components/common-test/ReviewQueueRegistrar";
import { MathText } from "@/components/math/Math";
import type { MathUnitPracticeMetadata } from "@/lib/types";
import { isCommonTestAnswerCorrect } from "@/lib/common-test-answer-normalize";

type PublicPracticeMetadata = Omit<MathUnitPracticeMetadata, "internalKpd">;

type Props = {
  practice: PublicPracticeMetadata;
  statement: string;
  unitHref: string;
  nextProblem?: { title: string; href: string };
  courseLinks: readonly { id: string; label: string; href: string }[];
};

const QUESTION_TYPE_LABEL: Record<MathUnitPracticeMetadata["questionType"], string> = {
  "single-choice": "単一選択",
  numeric: "数値入力",
  "multiple-select": "複数選択・組合せ",
  matching: "対応選択",
  ordering: "並べ替え",
  "table-reading": "表の読み取り",
};

const DIFFICULTY_LABEL: Record<MathUnitPracticeMetadata["difficulty"], string> = {
  basic: "基礎",
  standard: "標準",
  "common-test-prep": "共通テスト準備",
};

export function MathUnitPracticeRunner({
  practice,
  statement,
  unitHref,
  nextProblem,
  courseLinks,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [numericAnswer, setNumericAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const answer = practice.questionType === "numeric" ? numericAnswer : selectedAnswer;
  const isCorrect = useMemo(
    () =>
      revealed &&
      (practice.questionType === "numeric"
        ? isCommonTestAnswerCorrect(
            answer,
            practice.acceptedAnswers
              ? [...practice.acceptedAnswers]
              : [practice.correctAnswer],
            "number",
          )
        : answer === practice.correctAnswer),
    [answer, practice, revealed],
  );
  const selectedChoice = practice.choices?.find((choice) => choice.id === selectedAnswer);
  const canSubmit = answer.trim().length > 0;

  function reset() {
    setSelectedAnswer("");
    setNumericAnswer("");
    setRevealed(false);
  }

  return (
    <section className="space-y-6" aria-label="採点可能な数学IA単元別演習">
      <div className="flex flex-wrap gap-2">
        <MetaBadge label={QUESTION_TYPE_LABEL[practice.questionType]} />
        <MetaBadge label={practice.practiceArea} />
        <MetaBadge label={DIFFICULTY_LABEL[practice.difficulty]} />
        <MetaBadge
          label={`目安 ${formatEstimatedTime(practice.estimatedTime)}`}
          icon={<Clock3 className="h-3.5 w-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-sm font-bold text-blue-700">問題</h2>
        <MathText className="mt-3 text-base leading-8 text-slate-950">
          {statement}
        </MathText>
        {practice.visual && <PracticeTable visual={practice.visual} />}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        {practice.questionType === "numeric" ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (canSubmit && !revealed) setRevealed(true);
            }}
            className="space-y-3"
          >
            <label htmlFor="math-unit-answer" className="block text-sm font-bold text-slate-900">
              解答
            </label>
            <input
              id="math-unit-answer"
              inputMode="decimal"
              value={numericAnswer}
              onChange={(event) => setNumericAnswer(event.target.value)}
              disabled={revealed}
              placeholder="半角数字で入力"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 sm:max-w-xs"
            />
            <p className="text-xs leading-5 text-slate-500">
              整数または有限小数を入力してください。全角数字も正規化して採点します。
            </p>
            {!revealed && (
              <button type="submit" disabled={!canSubmit} className="button-primary disabled:opacity-50">
                答え合わせ
              </button>
            )}
          </form>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {practice.choices?.map((choice, index) => {
              const selected = choice.id === selectedAnswer;
              const correct = choice.id === practice.correctAnswer;
              return (
                <button
                  key={choice.id}
                  type="button"
                  disabled={revealed}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedAnswer(choice.id);
                    setRevealed(true);
                  }}
                  className={choiceClass({ selected, correct, revealed })}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-extrabold ring-1 ring-slate-200">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <MathText className="min-w-0 flex-1 text-sm leading-6">{choice.text}</MathText>
                  {revealed && correct && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />}
                  {revealed && selected && !correct && <XCircle className="mt-1 h-4 w-4 shrink-0 text-rose-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {revealed && (
        <div className="space-y-4">
          <div
            role="status"
            aria-live="polite"
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {isCorrect ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0" />}
            <div>
              <p className="font-extrabold">{isCorrect ? "正解です" : "見直しましょう"}</p>
              {!isCorrect && (
                <p className="mt-1 text-sm">
                  正答: {practice.choices?.find((choice) => choice.id === practice.correctAnswer)?.text ?? practice.correctAnswer}
                </p>
              )}
            </div>
          </div>

          {!isCorrect && selectedChoice && (
            <ExplainCard title="選んだ答えが違う理由" icon={<XCircle className="h-4 w-4" />} tone="text-rose-700">
              <MathText className="text-sm leading-7 text-slate-700">{selectedChoice.reason}</MathText>
            </ExplainCard>
          )}

          <ExplainCard title="詳細解説" icon={<Target className="h-4 w-4" />} tone="text-blue-700">
            <MathText className="whitespace-pre-line text-sm leading-7 text-slate-700">
              {practice.detailedExplanation}
            </MathText>
          </ExplainCard>
          <div className="grid gap-4 lg:grid-cols-3">
            <ExplainCard title="最初の確認" icon={<Lightbulb className="h-4 w-4" />} tone="text-amber-700">
              <MathText className="text-sm leading-7 text-slate-700">{practice.firstCheck}</MathText>
            </ExplainCard>
            <ExplainCard title="解法戦略" icon={<Target className="h-4 w-4" />} tone="text-violet-700">
              <MathText className="text-sm leading-7 text-slate-700">{practice.strategy}</MathText>
            </ExplainCard>
            <ExplainCard title="検算" icon={<ShieldCheck className="h-4 w-4" />} tone="text-emerald-700">
              <MathText className="text-sm leading-7 text-slate-700">{practice.verification}</MathText>
            </ExplainCard>
          </div>

          {courseLinks.length > 0 && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h3 className="text-sm font-extrabold text-blue-900">関連講座で復習</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {courseLinks.map((course) => (
                  <Link key={course.id} href={course.href} className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100">
                    {course.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <ReviewQueueRegistrar
            candidates={[
              {
                questionId: practice.id,
                title: `${practice.practiceArea} 単元別演習`,
                subjectId: "math",
                sectionId: practice.unitId,
                reasonFlags: isCorrect ? ["self-review"] : ["wrong-answer"],
                skillTags: [...practice.reviewTags],
                quadrantLabel: isCorrect ? "定着確認" : "要復習",
                quadrantColor: isCorrect ? "#059669" : "#e11d48",
                itemType: "math-problem",
                source: "math-unit-practice",
              },
            ]}
            theme={{ primary: "#2563eb", glowRgb: "37,99,235" }}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={reset} className="button-secondary inline-flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4" />
              もう一度解く
            </button>
            <Link href={nextProblem?.href ?? unitHref} className="button-primary inline-flex items-center justify-center gap-2">
              {nextProblem ? "次の問題" : "単元一覧へ戻る"}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function PracticeTable({ visual }: { visual: NonNullable<PublicPracticeMetadata["visual"]> }) {
  return (
    <figure className="mt-5 overflow-x-auto">
      <figcaption className="mb-2 text-sm font-bold text-slate-700">{visual.caption}</figcaption>
      <table className="min-w-full border-collapse text-center text-sm">
        <thead>
          <tr>{visual.headers.map((header) => <th key={header} scope="col" className="border border-slate-300 bg-slate-100 px-3 py-2 font-bold">{header}</th>)}</tr>
        </thead>
        <tbody>{visual.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="border border-slate-300 bg-white px-3 py-2">{cell}</td>)}</tr>)}</tbody>
      </table>
    </figure>
  );
}

function ExplainCard({ title, icon, tone, children }: { title: string; icon: React.ReactNode; tone: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className={`mb-2 flex items-center gap-2 text-sm font-extrabold ${tone}`}>{icon}{title}</h3>{children}</div>;
}

function MetaBadge({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">{icon}{label}</span>;
}

function choiceClass({ selected, correct, revealed }: { selected: boolean; correct: boolean; revealed: boolean }) {
  if (revealed && correct) return "flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left text-emerald-950";
  if (revealed && selected) return "flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-left text-rose-950";
  return `flex items-start gap-3 rounded-2xl border p-4 text-left transition ${selected ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"}`;
}

function formatEstimatedTime(seconds: number) {
  if (seconds < 60) return `${seconds}秒`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return remainder ? `${minutes}分${remainder}秒` : `${minutes}分`;
}
