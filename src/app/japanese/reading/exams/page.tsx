import type { Metadata } from "next";
import Link from "next/link";

import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import {
  JAPANESE_READING_EXAM_SETS,
  READING_GENRE_LABEL,
  getJapaneseReadingCharacterCount,
} from "@/data/japanese/reading";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = createPublicMetadata({
  title: "共通テスト型・現代文大問演習",
  description: "完全オリジナルの評論・小説・実用文6セット、30問を本文と資料の根拠から解きます。",
  path: "/japanese/reading/exams",
});

export default async function JapaneseReadingExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  requireSubjectPageAccess("japanese", "problems");
  const { course } = await searchParams;
  const sets = JAPANESE_READING_EXAM_SETS.filter(
    (set) => !course || set.questions.some((question) => question.relatedCourseIds.includes(course)),
  );

  return (
    <LearningPageShell>
      <LearningBreadcrumbs items={[{ label: "国語", href: "/japanese" }, { label: "現代文読解", href: "/japanese/reading" }, { label: "大問演習" }]} />
      <LearningPageHeader
        eyebrow="国語・共通テスト型 β"
        title="現代文大問演習 6セット"
        description="本文・表・メモ・複数資料を照合し、5問の得点と全選択肢の理由まで確認します。"
        meta={[{ label: "表示中", value: `${sets.length}セット` }, { label: "全体", value: "6セット・30問" }, { label: "出典", value: "完全オリジナル" }]}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sets.map((set) => (
          <Link key={set.id} href={`/japanese/reading/${set.slug}`} className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm transition hover:border-violet-400 hover:bg-violet-50">
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600"><span>大問{set.displayNumber}</span><span>・</span><span>{READING_GENRE_LABEL[set.genre]}</span><span>・</span><span>約{set.estimatedReadingTime}分</span><span>・</span><span>{getJapaneseReadingCharacterCount(set)}字</span></div>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{set.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{set.theme}</p>
          </Link>
        ))}
      </div>
    </LearningPageShell>
  );
}
