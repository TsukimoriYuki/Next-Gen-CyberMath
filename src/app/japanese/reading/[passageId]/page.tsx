import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JapaneseReadingRunner } from "@/components/japanese/JapaneseReadingRunner";
import { getJapaneseReadingPassage, getNextJapaneseReadingPassage } from "@/data/japanese/reading";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";
import { createPublicMetadata } from "@/lib/public-metadata";
import { getJapaneseRelatedCourseLinks } from "@/data/courses/japanese";

export async function generateMetadata({ params }: { params: Promise<{ passageId: string }> }): Promise<Metadata> {
  const { passageId } = await params;
  const passage = getJapaneseReadingPassage(passageId);
  if (!passage) return { title: "現代文読解", robots: { index: false, follow: false } };
  return createPublicMetadata({
    title: `${passage.title}｜現代文読解`,
    description: `${passage.theme}を扱う${passage.questions.length}問の現代文読解です。段落番号と本文根拠から解きます。`,
    path: `/japanese/reading/${passage.slug}`,
    openGraphType: "article",
  });
}

export default async function JapaneseReadingDetailPage({ params }: { params: Promise<{ passageId: string }> }) {
  requireSubjectPageAccess("japanese", "problems");
  const { passageId } = await params;
  const passage = getJapaneseReadingPassage(passageId);
  if (!passage) notFound();
  const next = getNextJapaneseReadingPassage(passage.id);
  const courseIds = [...new Set(passage.questions.flatMap((question) => question.relatedCourseIds))];
  return <JapaneseReadingRunner passage={passage} nextPassage={next ? { slug: next.slug, title: next.title } : undefined} relatedCourses={getJapaneseRelatedCourseLinks(courseIds)} />;
}
