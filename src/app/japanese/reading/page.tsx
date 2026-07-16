import type { Metadata } from "next";
import Link from "next/link";
import { LearningBreadcrumbs, LearningPageHeader, LearningPageShell } from "@/components/learning/LearningPageFrame";
import { JAPANESE_READING_PASSAGES, READING_GENRE_LABEL } from "@/data/japanese/reading";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = { title: "現代文読解演習（開発確認用）", robots: { index: false, follow: false } };

export default function JapaneseReadingPage() {
  requireSubjectPageAccess("japanese", "problems");
  return <LearningPageShell><LearningBreadcrumbs items={[{ label: "国語", href: "/japanese" }, { label: "現代文読解" }]} /><LearningPageHeader eyebrow="国語演習" title="現代文読解 20文章" description="段落番号と本文根拠を使い、評論・小説・随筆・複数資料を読み解きます。" meta={[{ label: "文章", value: `${JAPANESE_READING_PASSAGES.length}題` }, { label: "設問", value: `${JAPANESE_READING_PASSAGES.reduce((sum, passage) => sum + passage.questions.length, 0)}問` }]} /><div className="mt-8 grid gap-4 md:grid-cols-2">{JAPANESE_READING_PASSAGES.map((passage) => <Link key={passage.id} href={`/japanese/reading/${passage.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"><div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600"><span>{READING_GENRE_LABEL[passage.genre]}</span><span>・</span><span>約{passage.estimatedReadingTime}分</span><span>・</span><span>{passage.paragraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0)}字</span></div><h2 className="mt-2 text-lg font-bold text-slate-950">{passage.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{passage.theme}</p></Link>)}</div></LearningPageShell>;
}
