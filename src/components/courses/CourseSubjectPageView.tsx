import Link from "next/link";
import { ArrowRight, ChevronLeft, Clock, Layers } from "lucide-react";
import type { CourseSubject } from "@/types/course";

const PREMIUM_PAGE_DESCRIPTIONS: Record<string, string> = {
  "math-1a-premium":
    "この講座では、数学I・Aを入試標準〜応用レベルまで深く学べる内容を追加予定です。無料版では扱いきれない詳しい解説、典型問題の考え方、場合分け、答案作成の流れ、実戦演習を順次追加していきます。",
  "math-2bc-premium":
    "この講座では、数学II・B・Cを入試標準〜応用レベルまで体系的に学べる内容を追加予定です。関数分野、微分積分、数列、ベクトル、統計的な推測などについて、無料版より詳しい解説と実戦的な問題を追加していきます。",
};

export function CourseSubjectPageView({ subject }: { subject: CourseSubject }) {
  const isPremium = subject.courseKind === "premium";
  const pageDescription = PREMIUM_PAGE_DESCRIPTIONS[subject.subjectId] ?? subject.description;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="inline-flex items-center gap-1 hover:text-blue-600">
            <ChevronLeft className="h-3.5 w-3.5" />
            講座集トップ
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-900">{subject.subjectName}</span>
        </div>

        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
            style={{
              borderColor: `${subject.color}33`,
              background: `${subject.color}12`,
              color: subject.color,
            }}
          >
            <Layers className="h-3.5 w-3.5" />
            {subject.subjectId}
          </div>
          {subject.badges && subject.badges.length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {subject.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {subject.subjectName}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            {pageDescription}
          </p>
          {isPremium ? (
            <div className="mt-5 inline-flex rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              現在は無料教材を優先整備中です。発展講座の公開時期と内容は、決まり次第このページでお知らせします。
            </div>
          ) : null}
        </header>

        {isPremium ? (
          <div className="mb-4">
            <h2 className="text-xl font-extrabold text-slate-950">表示する予定単元</h2>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {subject.units.map((unit) => {
            const lessonCount = unit.lessons.length;
            const totalMinutes = unit.lessons.reduce(
              (sum, lesson) => sum + lesson.estimatedMinutes,
              0,
            );

            return (
              <article
                key={unit.unitId}
                className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 h-1 w-16 rounded-full" style={{ background: subject.color }} />
                <h3 className="text-xl font-extrabold text-slate-950">{unit.unitTitle}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {unit.unitDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    {lessonCount > 0 ? `${lessonCount}講座` : "内容設計中"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    <Clock className="h-3 w-3" />
                    {totalMinutes > 0 ? `約${totalMinutes}分` : "講座追加予定"}
                  </span>
                </div>
                {lessonCount > 0 ? (
                  <Link
                    href={`/courses/${subject.subjectId}/${unit.unitId}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    講座を見る
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-500">
                    公開予定を確認
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
