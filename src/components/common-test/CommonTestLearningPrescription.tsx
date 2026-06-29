"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList, RefreshCw, Stethoscope } from "lucide-react";
import { getCommonTestDrillHistory, type CommonTestDrillHistoryItem } from "@/lib/common-test-history";

interface ReviewListResponse {
  ok: boolean;
  items?: {
    itemType?: string;
    status?: string;
    nextReviewAt?: string;
  }[];
}

export function CommonTestLearningPrescription() {
  const [history, setHistory] = useState<CommonTestDrillHistoryItem[]>([]);
  const [reviewDueCount, setReviewDueCount] = useState<number | null>(null);

  useEffect(() => {
    // localStorage is only available after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(getCommonTestDrillHistory());
  }, []);

  useEffect(() => {
    fetch("/api/review/list?limit=100")
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as ReviewListResponse;
      })
      .then((data) => {
        if (!data?.ok) {
          setReviewDueCount(0);
          return;
        }
        const now = new Date();
        const due = (data.items ?? []).filter(
          (item) =>
            (item.itemType === "common-test-drill" || item.itemType === "common-test-lecture") &&
            item.status === "ACTIVE" &&
            item.nextReviewAt &&
            new Date(item.nextReviewAt) <= now,
        ).length;
        setReviewDueCount(due);
      })
      .catch(() => setReviewDueCount(0));
  }, []);

  const hasHistory = history.length > 0;
  const title = hasHistory
    ? "直近の大問別ドリルを復習してから、本番形式へ進みましょう"
    : "まずは数学IAの現在地を測りましょう";
  const reason = hasHistory
    ? "解いた大問の履歴があるため、復習キューと冊子型模試をつなぐと弱点が残りにくくなります。"
    : "診断前は仮スコアを出さず、10分診断または冊子型模試の結果から現在地を作ります。";
  const primaryHref = hasHistory ? "/common-test/review" : "/common-test/math-1a";
  const primaryLabel = hasHistory ? "復習キューを開く" : "共通テスト対策を始める";

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="border-b border-blue-100 bg-blue-50 px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-blue-800">
            <Stethoscope className="h-4 w-4" />
            今日の学習処方箋
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                優先度 {hasHistory ? "中" : "高"}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                推奨15分
              </span>
              {reviewDueCount === null && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  読み込み中
                </span>
              )}
            </div>
            <p className="mt-3 text-lg font-extrabold leading-snug text-slate-950">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">理由: {reason}</p>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <MiniStat label="大問別履歴" value={history.length} tone="blue" />
              <MiniStat label="今日の復習" value={reviewDueCount ?? "-"} tone="amber" />
              <MiniStat label="診断状態" value={hasHistory ? "記録あり" : "診断前"} tone="slate" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/common-test/math-1a/section-1"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                <ClipboardList className="h-3.5 w-3.5" />
                大問別ドリル
              </Link>
              <Link
                href="/common-test/lectures"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
              >
                <BookOpen className="h-3.5 w-3.5" />
                講義一覧
              </Link>
            </div>
            <Link
              href="/common-test/simulator/math-1a-paper-001"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
            >
              冊子型模試を受ける
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
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
  tone: "amber" | "blue" | "slate";
}) {
  const className =
    tone === "amber" ? "text-amber-700" : tone === "blue" ? "text-blue-700" : "text-slate-700";
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-[10px] font-semibold text-slate-500">{label}</div>
      <div className={`mt-1 font-mono text-lg font-extrabold ${className}`}>{value}</div>
    </div>
  );
}
