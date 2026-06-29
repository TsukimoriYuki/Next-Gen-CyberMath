import Link from "next/link";
import { ArrowRight, Clock, Target } from "lucide-react";
import type { CommonTestSubject } from "@/data/common-test";

export function CommonTestSubjectCard({ subject }: { subject: CommonTestSubject }) {
  const { theme, route, title, shortTitle, examMinutes, sections, targetScoreDefault } = subject;
  const isSubSubject = subject.id === "english-reading";
  const priority = getPriorityLabel(subject);
  const examId =
    subject.id === "math-1a"
      ? "math-1a-70"
      : subject.id === "math-2bc"
        ? "math-2bc-70"
        : "english-reading-80";

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        isSubSubject ? "border-slate-200 opacity-85" : "border-slate-200 hover:border-blue-200"
      }`}
    >
      <span className="h-1 w-full" style={{ background: theme.primary }} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500">{sections.length}大問構成</span>
              {isSubSubject && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                  β版 / サブ科目
                </span>
              )}
            </div>
            <h2 className="mt-1 flex items-center gap-2 font-display text-2xl font-extrabold text-slate-900">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: theme.primary }} />
              {isSubSubject ? shortTitle : title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
            <Clock className="h-3 w-3" />
            {examMinutes}分
          </div>
        </div>

        {isSubSubject ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-sm font-extrabold text-slate-900">数学対策を優先中</div>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              読解演習は残しています。必要な日にだけ開ける補助科目です。
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold text-slate-500">目標点</div>
                <div className="mt-1 font-mono text-2xl font-extrabold text-slate-950">
                  {targetScoreDefault}
                  <span className="ml-1 text-xs text-slate-400">点</span>
                </div>
              </div>
              <div className="rounded-lg bg-white px-3 py-2 text-right ring-1 ring-slate-200">
                <div className="text-[10px] font-bold text-slate-500">構成</div>
                <div className="font-mono text-sm font-extrabold text-slate-700">
                  {sections.length}大問 / {examMinutes}分
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-500">
              現在地は、演習・模試を解くと「目標点トラッカー」に表示されます。
            </p>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <div>
            <div className="text-[11px] font-bold text-blue-700">
              {isSubSubject ? "扱い" : "最優先"}
            </div>
            <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-700">{priority}</p>
          </div>
        </div>

        <div className={isSubSubject ? "mt-auto" : "mt-auto grid gap-2 sm:grid-cols-2"}>
          {isSubSubject ? (
            <Link
              href={route}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700"
            >
              英語Rを開く
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                href={`${route}/section-${subject.id === "math-1a" ? "1" : "2"}`}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                10分演習を始める
              </Link>
              <Link
                href={`/common-test/simulator/${examId}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                本番形式で解く
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function getPriorityLabel(subject: CommonTestSubject): string {
  if (subject.id === "math-1a") {
    return "第1問 図形と計量。命題・三角比・誘導読解をまとめて伸ばす。";
  }
  if (subject.id === "math-2bc") {
    return "第2問 微分積分。計算精度と時間配分を同時に確認する。";
  }
  return "β版 / サブ科目。数学の演習後に読解速度を補強する。";
}
