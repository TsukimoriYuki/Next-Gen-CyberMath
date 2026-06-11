import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import { getCommonTestDrillsBySection } from "@/lib/common-test-drills";
import { DrillSectionPageShell } from "@/components/common-test/DrillSectionPageShell";

const SUBJECT = COMMON_TEST_SUBJECTS_MAP["english-reading"];

export function generateStaticParams() {
  return SUBJECT.sections.map((s) => ({ sectionId: `section-${s.number}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}): Promise<Metadata> {
  const { sectionId } = await params;
  const num = parseInt(sectionId.replace("section-", ""), 10);
  const section = SUBJECT.sections.find((s) => s.number === num);
  if (!section) return { title: "Not Found" };
  return {
    title: `英語R 第${section.number}問 — ${section.title}`,
    description: `共通テスト 英語リーディング 第${section.number}問「${section.title}」の大問別ドリル演習。`,
  };
}

export default async function EnglishReadingSectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;
  const num = parseInt(sectionId.replace("section-", ""), 10);
  const section = SUBJECT.sections.find((s) => s.number === num);
  if (!section) notFound();

  const questions = getCommonTestDrillsBySection("english-reading", sectionId);

  return (
    <DrillSectionPageShell
      subject={SUBJECT}
      section={section}
      questions={questions}
      sectionId={sectionId}
    />
  );
}
