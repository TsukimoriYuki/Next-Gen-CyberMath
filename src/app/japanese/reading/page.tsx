import type { Metadata } from "next";
import Link from "next/link";
import { LearningBreadcrumbs, LearningPageHeader, LearningPageShell } from "@/components/learning/LearningPageFrame";
import { JAPANESE_READING_CORE_PASSAGES, JAPANESE_READING_EXAM_SETS, READING_GENRE_LABEL, getJapaneseReadingCharacterCount } from "@/data/japanese/reading";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = createPublicMetadata({
  title: "現代文読解",
  description: "完全オリジナルの20文章・100問と共通テスト型大問6セット・30問を本文根拠から読み解きます。",
  path: "/japanese/reading",
});

export default async function JapaneseReadingPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  requireSubjectPageAccess("japanese", "problems");
  const { course } = await searchParams;
  const passages = JAPANESE_READING_CORE_PASSAGES.filter(
    (passage) => !course || passage.questions.some((question) => question.relatedCourseIds.includes(course)),
  );
  const examSets = JAPANESE_READING_EXAM_SETS.filter(
    (passage) => !course || passage.questions.some((question) => question.relatedCourseIds.includes(course)),
  );
  return (
    <LearningPageShell>
      <LearningBreadcrumbs items={[{ label: "国語", href: "/japanese" }, { label: "現代文読解" }]} />
      <LearningPageHeader eyebrow="国語演習 β" title="現代文読解" description="段落番号と本文根拠を使い、文章演習と共通テスト型大問を読み解きます。" meta={[{ label: "表示中", value: `${passages.length}文章・${examSets.length}大問` }, { label: "全体", value: "20文章＋6大問・130問" }]} />
      {examSets.length > 0 ? (
        <section className="mt-8" aria-labelledby="exam-set-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 id="exam-set-heading" className="text-2xl font-bold text-slate-950">共通テスト型・大問演習</h2><p className="mt-2 text-sm leading-6 text-slate-600">長い本文と複数資料を、5問・時間目安つきで解きます。</p></div><Link href="/japanese/reading/exams" className="inline-flex min-h-11 items-center font-bold text-violet-800 underline">6セットの一覧を見る</Link></div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">{examSets.map((passage) => <Link key={passage.id} href={`/japanese/reading/${passage.slug}`} className="rounded-2xl border border-violet-200 bg-violet-50 p-5 transition hover:border-violet-400"><div className="text-xs font-semibold text-violet-800">大問{passage.displayNumber}・{READING_GENRE_LABEL[passage.genre]}・約{passage.estimatedReadingTime}分</div><h3 className="mt-2 text-lg font-bold text-slate-950">{passage.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{passage.theme}</p></Link>)}</div>
        </section>
      ) : null}
      <h2 className="mt-10 text-2xl font-bold text-slate-950">文章別演習 20文章</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {passages.map((passage) => (
          <Link key={passage.id} href={`/japanese/reading/${passage.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50">
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600"><span>{READING_GENRE_LABEL[passage.genre]}</span><span>・</span><span>約{passage.estimatedReadingTime}分</span><span>・</span><span>{getJapaneseReadingCharacterCount(passage)}字</span></div>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{passage.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{passage.theme}</p>
          </Link>
        ))}
      </div>
    </LearningPageShell>
  );
}
