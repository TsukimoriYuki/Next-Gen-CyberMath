"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getCommonTestExamHistory,
  type CommonTestExamHistoryItem,
} from "@/lib/common-test-exam-history";

export function InformaticsExamHistory() {
  const [items, setItems] = useState<CommonTestExamHistoryItem[]>([]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(getCommonTestExamHistory().filter((item) => item.subjectId === "informatics"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  if (items.length === 0) {
    return <p className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">まだ受験履歴はありません。模試を提出すると、この端末に結果が保存されます。</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-black text-slate-950">情報Ⅰ オリジナル模試</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(item.finishedAt).toLocaleString("ja-JP")}</p>
            </div>
            <p className="text-xl font-black tabular-nums text-teal-800">{item.unlimitedScore ?? item.unlimitedScorePct} / {item.maxScore ?? 100}点</p>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {item.sectionResults.map((section) => (
              <div key={section.sectionId} className="rounded-lg bg-slate-50 p-3 text-xs">
                <span className="block font-bold text-slate-600">{section.sectionTitle ?? `第${section.sectionNumber}問`}</span>
                <span className="mt-1 block font-black text-slate-950">{section.earnedScore ?? section.correctCount} / {section.maxScore ?? section.totalQuestions}</span>
              </div>
            ))}
          </div>
          <Link href="/informatics/mock-exam/information-1-original-001" className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-teal-800">再挑戦する <ArrowRight className="h-4 w-4" /></Link>
        </li>
      ))}
    </ul>
  );
}
