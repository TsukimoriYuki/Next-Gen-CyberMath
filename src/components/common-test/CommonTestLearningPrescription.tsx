"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList, RefreshCw, Stethoscope } from "lucide-react";
import {
  buildCommonTestLearningDiagnosis,
  type CommonTestLearningDiagnosis,
  type CommonTestReviewQueueLike,
} from "@/lib/common-test-diagnosis";
import {
  getCommonTestDrillHistory,
  getCommonTestMistakeTagLabel,
  type CommonTestDrillHistoryItem,
} from "@/lib/common-test-history";
import { CommonTestMistakeStrategyCards } from "./CommonTestMistakeStrategyCards";

interface ReviewListResponse {
  ok: boolean;
  items?: (CommonTestReviewQueueLike & { itemType?: string })[];
}

export function CommonTestLearningPrescription() {
  const [history, setHistory] = useState<CommonTestDrillHistoryItem[]>([]);
  const [reviewLoaded, setReviewLoaded] = useState(false);
  const [reviewItems, setReviewItems] = useState<CommonTestReviewQueueLike[] | null>(null);

  useEffect(() => {
    // localStorage はマウント後にだけ読めるため、診断材料として一度取り込む。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(getCommonTestDrillHistory());
  }, []);

  useEffect(() => {
    fetch("/api/review/list?limit=100")
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as ReviewListResponse;
        return data.ok
          ? (data.items ?? []).filter(
              (item) => item.itemType === "common-test-drill" || item.itemType === "common-test-lecture"
            )
          : null;
      })
      .then((items) => {
        setReviewItems(items);
        setReviewLoaded(true);
      })
      .catch(() => {
        setReviewItems(null);
        setReviewLoaded(true);
      });
  }, []);

  const diagnosis: CommonTestLearningDiagnosis = useMemo(
    () =>
      buildCommonTestLearningDiagnosis({
        history,
        reviewItems,
        now: new Date(),
      }),
    [history, reviewItems]
  );
  const isLoaded = reviewLoaded;
  const prescription = diagnosis.prescription;
  const priorityClass = useMemo(() => {
    if (prescription.priority === "高") return "border-rose-200 bg-rose-50 text-rose-700";
    if (prescription.priority === "中") return "border-amber-200 bg-amber-50 text-amber-700";
    return "border-slate-200 bg-slate-50 text-slate-600";
  }, [prescription.priority]);

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="border-b border-blue-100 bg-blue-50 px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-blue-800">
            <Stethoscope className="h-4 w-4" />
            今日の処方箋
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${priorityClass}`}>
                優先度{prescription.priority}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                推奨{prescription.estimatedMinutes}分
              </span>
              {!isLoaded && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  診断中
                </span>
              )}
            </div>
            <p className="mt-3 text-lg font-extrabold leading-snug text-slate-950">
              {prescription.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              理由：{prescription.reason}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {diagnosis.topMistake && (
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                  最多：{getCommonTestMistakeTagLabel(diagnosis.topMistake.tagId)}
                </span>
              )}
              {diagnosis.increasingMistake && (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  直近増加：{getCommonTestMistakeTagLabel(diagnosis.increasingMistake.tagId)}
                </span>
              )}
            </div>

            {diagnosis.recommendedLecture && (
              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3">
                <div className="text-xs font-extrabold text-violet-700">あなたへのおすすめ講義</div>
                <p className="mt-1 text-sm font-bold leading-6 text-slate-900">
                  {diagnosis.recommendedLecture.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {diagnosis.recommendedLecture.reason}
                </p>
              </div>
            )}

            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              <MiniStat label="危険度S" value={diagnosis.riskCounts.S ?? 0} tone="rose" />
              <MiniStat label="危険度A" value={diagnosis.riskCounts.A ?? 0} tone="amber" />
              <MiniStat
                label="自信なし正解"
                value={diagnosis.unsureCorrectCount}
                tone="slate"
              />
              <MiniStat
                label="復習期限"
                value={diagnosis.dueReviewCount ?? "-"}
                tone="blue"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={prescription.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              {prescription.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/common-test/review"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                <ClipboardList className="h-3.5 w-3.5" />
                復習
              </Link>
              <Link
                href="/common-test/lectures"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
              >
                <BookOpen className="h-3.5 w-3.5" />
                ロードマップ
              </Link>
            </div>
            <Link
              href={diagnosis.recommendedLecture.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
            >
              おすすめ講義を見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {prescription.lectureStatus === "coming-soon" && (
              <p className="text-center text-[11px] text-slate-500">関連講義は準備中</p>
            )}
          </div>
        </div>
      </div>

      <CommonTestMistakeStrategyCards
        strategies={diagnosis.strategies}
        title="ミス原因別の次の一手"
        compact
      />
    </section>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: "rose" | "amber" | "blue" | "slate";
}) {
  const className =
    tone === "rose"
      ? "text-rose-700"
      : tone === "amber"
        ? "text-amber-700"
        : tone === "blue"
          ? "text-blue-700"
          : "text-slate-700";
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-[10px] font-semibold text-slate-500">{label}</div>
      <div className={`mt-1 font-mono text-lg font-extrabold ${className}`}>{value}</div>
    </div>
  );
}
