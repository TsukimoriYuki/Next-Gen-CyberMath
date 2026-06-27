import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Home,
  RotateCcw,
  Timer,
  XCircle,
} from "lucide-react";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestDrillHistoryItem } from "@/lib/common-test-history";
import {
  getCommonTestMistakeTagLabel,
  getCommonTestRiskMeta,
  TAG_RECOMMENDATIONS,
} from "@/lib/common-test-history";
import type { AnswerEntry } from "./common-test-drill-types";
import { ReviewQueueRegistrar, type ReviewCandidate } from "./ReviewQueueRegistrar";

export type { AnswerEntry };

interface Props {
  questions: CommonTestDrillQuestion[];
  answers: AnswerEntry[];
  historyItem: CommonTestDrillHistoryItem;
  totalElapsedSec: number;
  theme: CommonTestTheme;
  sectionTitle: string;
  subjectRoute: string;
  onRetry: () => void;
}

type ReviewBucket =
  | "理解できている"
  | "少し不安"
  | "勘で正解"
  | "自信ありの誤答"
  | "要復習"
  | "未解答";

const BUCKET_STYLE: Record<ReviewBucket, { className: string; color: string }> = {
  理解できている: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", color: "#059669" },
  少し不安: { className: "border-amber-200 bg-amber-50 text-amber-700", color: "#d97706" },
  勘で正解: { className: "border-violet-200 bg-violet-50 text-violet-700", color: "#7c3aed" },
  自信ありの誤答: { className: "border-rose-200 bg-rose-50 text-rose-700", color: "#e11d48" },
  要復習: { className: "border-orange-200 bg-orange-50 text-orange-700", color: "#ea580c" },
  未解答: { className: "border-slate-200 bg-slate-50 text-slate-600", color: "#64748b" },
};

export function CommonTestResultPanel({
  questions,
  answers,
  historyItem,
  totalElapsedSec,
  theme,
  sectionTitle,
  subjectRoute,
  onRetry,
}: Props) {
  const totalQ = answers.length;
  const correctCount = historyItem.correctCount;
  const pct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const estimatedSec = historyItem.estimatedTotalTimeSec;
  const timeDiff = totalElapsedSec - estimatedSec;
  const topTags = historyItem.weakSkillTags.slice(0, 5);
  const groups = groupAnswers(answers);
  const reviewCandidates = buildReviewCandidates(answers, questions, historyItem);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:items-center">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
            <div className="text-5xl font-extrabold text-blue-700">{pct}%</div>
            <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              結果
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Drill Result
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
              {sectionTitle}
            </h2>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Stat label="正答" value={`${correctCount}/${totalQ}問`} />
              <Stat label="所要時間" value={fmtSec(totalElapsedSec)} />
              <Stat
                label="目安との差"
                value={timeDiff > 0 ? `+${fmtSec(timeDiff)}` : `-${fmtSec(-timeDiff)}`}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionBlock title="問題別の結果">
        <div className="space-y-2">
          {answers.map((answer, index) => {
            const question = questions.find((q) => q.id === answer.questionId);
            const estimated = (question?.estimatedMinutes ?? 0) * 60;
            const isOver = answer.timeSpentSec > estimated;
            const riskMeta = getCommonTestRiskMeta(answer.riskLevel);
            return (
              <div
                key={answer.questionId}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-extrabold text-slate-700 ring-1 ring-slate-200">
                    Q{index + 1}
                  </div>
                  {answer.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-900">
                    {question?.title ?? answer.questionId}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {riskMeta && (
                      <span
                        className={`rounded border px-2 py-0.5 text-xs font-bold ${riskMeta.className}`}
                      >
                        {riskMeta.label}
                      </span>
                    )}
                    {answer.mistakeTagIds?.slice(0, 3).map((tagId) => (
                      <span key={tagId} className="rounded bg-white px-2 py-0.5 text-xs text-rose-600 ring-1 ring-rose-100">
                        {getCommonTestMistakeTagLabel(tagId)}
                      </span>
                    ))}
                    {answer.skillTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded bg-white px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isOver ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Timer className="h-3.5 w-3.5" />
                  {fmtSec(answer.timeSpentSec)}
                </div>
              </div>
            );
          })}
        </div>
      </SectionBlock>

      <SectionBlock title="手応え別の整理">
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(groups)
            .filter(([, entries]) => entries.length > 0)
            .map(([bucket, entries]) => {
              const typedBucket = bucket as ReviewBucket;
              const style = BUCKET_STYLE[typedBucket];
              return (
                <div key={bucket} className={`rounded-xl border p-4 ${style.className}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-extrabold">{bucket}</div>
                    <div className="text-2xl font-extrabold">{entries.length}</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {entries.map((entry) => (
                      <span key={entry.questionId} className="rounded bg-white/70 px-2 py-0.5 text-xs font-semibold">
                        Q{answers.indexOf(entry) + 1}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </SectionBlock>

      {topTags.length > 0 && (
        <SectionBlock title="優先して復習するタグ">
          <div className="space-y-3">
            {topTags.map((tag, index) => (
              <div key={tag} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                    style={{ background: theme.primary }}
                  >
                    {index + 1}
                  </span>
                  <span className="font-extrabold text-slate-950">{tag}</span>
                </div>
                {TAG_RECOMMENDATIONS[tag] && (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {TAG_RECOMMENDATIONS[tag]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      <ReviewQueueRegistrar candidates={reviewCandidates} theme={theme} />

      <div className="grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <RotateCcw className="h-4 w-4" />
          もう一度解く
        </button>
        <Link
          href={subjectRoute}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          大問一覧へ
        </Link>
        <Link
          href="/common-test"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Home className="h-4 w-4" />
          対策室へ
        </Link>
      </div>
    </div>
  );
}

function groupAnswers(answers: AnswerEntry[]): Record<ReviewBucket, AnswerEntry[]> {
  const groups: Record<ReviewBucket, AnswerEntry[]> = {
    理解できている: [],
    少し不安: [],
    勘で正解: [],
    自信ありの誤答: [],
    要復習: [],
    未解答: [],
  };

  for (const answer of answers) {
    if (answer.confidence === "blank") groups.未解答.push(answer);
    else if (answer.isCorrect && answer.confidence === "confident") groups.理解できている.push(answer);
    else if (answer.isCorrect && answer.confidence === "unsure") groups.少し不安.push(answer);
    else if (answer.isCorrect && answer.confidence === "guessed") groups.勘で正解.push(answer);
    else if (!answer.isCorrect && answer.confidence === "confident") groups.自信ありの誤答.push(answer);
    else groups.要復習.push(answer);
  }
  return groups;
}

function buildReviewCandidates(
  answers: AnswerEntry[],
  questions: CommonTestDrillQuestion[],
  historyItem: CommonTestDrillHistoryItem,
): ReviewCandidate[] {
  return answers
    .filter((answer) => !answer.isCorrect || answer.confidence !== "confident")
    .slice(0, 8)
    .map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      const bucket = getBucket(answer);
      const riskFlags = answer.riskLevel ? [`risk:${answer.riskLevel}`] : [];
      const mistakeFlags = (answer.mistakeTagIds ?? []).map((tagId) => `mistake:${tagId}`);
      return {
        questionId: answer.questionId,
        title: question?.title ?? answer.questionId,
        subjectId: question?.subjectId ?? "",
        sectionId: question?.sectionId ?? "",
        reasonFlags: [
          answer.isCorrect ? "guessed-or-unsure" : "wrong",
          ...(historyItem.overTimeQuestionIds.includes(answer.questionId) ? ["overtime"] : []),
          ...riskFlags,
          ...mistakeFlags,
        ],
        skillTags: answer.skillTags,
        ...(answer.mistakeTagIds?.length ? { mistakeTagIds: answer.mistakeTagIds } : {}),
        ...(answer.riskLevel ? { riskLevel: answer.riskLevel } : {}),
        quadrantLabel: bucket,
        quadrantColor: BUCKET_STYLE[bucket].color,
      };
    });
}

function getBucket(answer: AnswerEntry): ReviewBucket {
  if (answer.confidence === "blank") return "未解答";
  if (answer.isCorrect && answer.confidence === "confident") return "理解できている";
  if (answer.isCorrect && answer.confidence === "unsure") return "少し不安";
  if (answer.isCorrect && answer.confidence === "guessed") return "勘で正解";
  if (!answer.isCorrect && answer.confidence === "confident") return "自信ありの誤答";
  return "要復習";
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-extrabold text-slate-950">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-extrabold text-slate-950">{value}</div>
    </div>
  );
}

function fmtSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}分${s}秒` : `${s}秒`;
}
