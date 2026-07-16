import type { Metadata } from "next";
import Link from "next/link";
import { LearningBreadcrumbs, LearningPageHeader, LearningPageShell } from "@/components/learning/LearningPageFrame";
import { JAPANESE_READING_PASSAGES, READING_GENRE_LABEL } from "@/data/japanese/reading";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = createPublicMetadata({
  title: "現代文読解 20文章",
  description: "完全オリジナルの評論・小説・随筆・実用文20文章、100問を本文根拠から読み解きます。",
  path: "/japanese/reading",
});

export default async function JapaneseReadingPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  requireSubjectPageAccess("japanese", "problems");
  const { course } = await searchParams;
  const passages = JAPANESE_READING_PASSAGES.filter(
    (passage) => !course || passage.questions.some((question) => question.relatedCourseIds.includes(course)),
  );
  return (
    <LearningPageShell>
      <LearningBreadcrumbs items={[{ label: "国語", href: "/japanese" }, { label: "現代文読解" }]} />
      <LearningPageHeader eyebrow="国語演習 β" title="現代文読解 20文章" description="段落番号と本文根拠を使い、評論・小説・随筆・複数資料を読み解きます。" meta={[{ label: "表示中", value: `${passages.length}文章` }, { label: "全体", value: "20文章・100問" }]} />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {passages.map((passage) => (
          <Link key={passage.id} href={`/japanese/reading/${passage.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50">
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600"><span>{READING_GENRE_LABEL[passage.genre]}</span><span>・</span><span>約{passage.estimatedReadingTime}分</span><span>・</span><span>{passage.paragraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0)}字</span></div>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{passage.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{passage.theme}</p>
          </Link>
        ))}
      </div>
    </LearningPageShell>
  );
}
