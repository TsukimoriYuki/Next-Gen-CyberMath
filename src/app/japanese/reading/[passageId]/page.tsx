import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JapaneseReadingRunner } from "@/components/japanese/JapaneseReadingRunner";
import { getJapaneseReadingPassage, getNextJapaneseReadingPassage } from "@/data/japanese/reading";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export async function generateMetadata({ params }: { params: Promise<{ passageId: string }> }): Promise<Metadata> { const { passageId } = await params; const passage = getJapaneseReadingPassage(passageId); return { title: passage?.title ?? "現代文読解", robots: { index: false, follow: false } }; }

export default async function JapaneseReadingDetailPage({ params }: { params: Promise<{ passageId: string }> }) {
  requireSubjectPageAccess("japanese", "problems");
  const { passageId } = await params;
  const passage = getJapaneseReadingPassage(passageId);
  if (!passage) notFound();
  const next = getNextJapaneseReadingPassage(passage.id);
  return <JapaneseReadingRunner passage={passage} nextPassage={next ? { slug: next.slug, title: next.title } : undefined} />;
}
