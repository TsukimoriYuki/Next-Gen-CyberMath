import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import { getCommonTestDrillsBySection } from "@/lib/common-test-drills";
import { DrillSectionPageShell } from "@/components/common-test/DrillSectionPageShell";

const SUBJECT = COMMON_TEST_SUBJECTS_MAP["math-2bc"];

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
    title: `数学II・B・C 第${section.number}問 — ${section.title}`,
    description: `共通テスト 数学II・B・C 第${section.number}問「${section.title}」の大問別ドリル演習。`,
  };
}

export default async function Math2BCSectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;
  const num = parseInt(sectionId.replace("section-", ""), 10);
  const section = SUBJECT.sections.find((s) => s.number === num);
  if (!section) notFound();

  const questions = getCommonTestDrillsBySection("math-2bc", sectionId);

  return (
    <DrillSectionPageShell
      subject={SUBJECT}
      section={section}
      questions={questions}
      sectionId={sectionId}
    />
  );
}
