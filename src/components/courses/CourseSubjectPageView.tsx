import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { CourseSubject } from "@/types/course";
import { STANDARD_COURSE_SUBJECTS } from "@/data/courses";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";

const PREMIUM_PAGE_DESCRIPTIONS: Record<string, string> = {
  "math-1a-premium":
    "この講座では、数学I・Aを入試標準〜応用レベルまで深く学べる内容を追加予定です。無料版では扱いきれない詳しい解説、典型問題の考え方、場合分け、答案作成の流れ、実戦演習を順次追加していきます。",
  "math-2bc-premium":
    "この講座では、数学II・B・Cを入試標準〜応用レベルまで体系的に学べる内容を追加予定です。関数分野、微分積分、数列、ベクトル、統計的な推測などについて、無料版より詳しい解説と実戦的な問題を追加していきます。",
};

export function CourseSubjectPageView({ subject }: { subject: CourseSubject }) {
  const isPremium = subject.courseKind === "premium";
  const isPreparing = subject.status === "preparing" || subject.status === "coming-soon";
  const pageDescription = isPreparing
    ? (PREMIUM_PAGE_DESCRIPTIONS[subject.subjectId] ?? subject.description)
    : subject.description;
  const availableAlternatives = isPreparing
    ? STANDARD_COURSE_SUBJECTS.filter(
        (s) => s.subjectId !== subject.subjectId && s.units.some((u) => u.lessons.length > 0),
      )
    : [];

  return (
    <LearningPageShell width="content" className="max-w-5xl">
      <LearningBreadcrumbs
        items={[
          { label: "講座", href: "/courses" },
          { label: subject.subjectName },
        ]}
      />
      <LearningPageHeader
        status={subject.subjectId === "japanese" ? "beta" : undefined}
        eyebrow={isPremium ? "発展講座" : "体系講座"}
        title={subject.subjectName}
        description={pageDescription}
        meta={[
          { label: "単元", value: `${subject.units.length}単元` },
          { label: "講座種別", value: isPremium ? "発展編" : "標準課程" },
        ]}
      />

      {subject.badges && subject.badges.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
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

      {isPreparing ? (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-800">
          {isPremium
            ? "現在は無料教材を優先整備中です。発展講座の公開時期と内容は、決まり次第このページでお知らせします。"
            : "現在準備中の講座です。公開時期と内容は、決まり次第このページでお知らせします。"}
        </div>
      ) : null}

      {availableAlternatives.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-500">今すぐ学べる講座:</span>
          {availableAlternatives.map((alt) => (
            <Link
              key={alt.subjectId}
              href={`/courses/${alt.subjectId}`}
              className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-bold text-blue-700 transition hover:bg-blue-100"
            >
              {alt.subjectName}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      ) : null}

      {isPreparing ? (
        <div className="mb-4 mt-8">
          <h2 className="text-xl font-extrabold text-slate-950">表示する予定単元</h2>
        </div>
      ) : null}

      <div className={`grid gap-4 md:grid-cols-2 ${isPreparing ? "" : "mt-8"}`}>
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
                {isPreparing ? (
                  <h3 className="text-xl font-extrabold text-slate-950">{unit.unitTitle}</h3>
                ) : (
                  <h2 className="text-xl font-extrabold text-slate-950">{unit.unitTitle}</h2>
                )}
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
    </LearningPageShell>
  );
}
