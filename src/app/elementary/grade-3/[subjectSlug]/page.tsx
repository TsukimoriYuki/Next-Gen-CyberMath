import { notFound } from "next/navigation";
import {
  ElementaryCardGrid,
  ElementaryLinkCard,
  ElementaryPageHeader,
  ElementarySection,
} from "@/components/elementary/ElementaryShell";
import { ElementaryBetaNotice } from "@/components/elementary/ElementaryBetaNotice";
import { ElementaryText } from "@/components/elementary/ElementaryText";
import { getElementaryGradeSubjects } from "@/data/elementary";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import { getElementaryUnitsForSubject } from "@/lib/elementary-lessons";
import { requireElementaryGrade3RegularSubjectAccess } from "@/lib/elementary-route-guard";

const SUBJECT_COPY_IDS: Readonly<Record<string, readonly [string, string]>> = {
  math: ["grade-3-math-title", "grade-3-math-description"],
  japanese: ["grade-3-japanese-title", "grade-3-japanese-description"],
  "social-studies": ["grade-3-social-title", "grade-3-social-description"],
};

function isPlannedGrade3Subject(subjectSlug: string): boolean {
  return getElementaryGradeSubjects("grade-3", "regular").some(
    (entry) => entry.subjectId === subjectSlug && entry.availability === "planned",
  );
}

export default async function ElementarySubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const { subjectSlug } = await params;
  requireElementaryGrade3RegularSubjectAccess(subjectSlug);
  const copyIds = SUBJECT_COPY_IDS[subjectSlug];
  if (!copyIds || !isPlannedGrade3Subject(subjectSlug)) notFound();

  const units = getElementaryUnitsForSubject("grade-3", subjectSlug)
    .filter((unit) => unit.publicationStatus === "beta");

  return (
    <>
      <ElementaryPageHeader
        eyebrow={elementaryUiCopy("grade-3-title")}
        title={elementaryUiCopy(copyIds[0])}
        description={elementaryUiCopy(copyIds[1])}
      />
      <ElementaryBetaNotice />
      <ElementarySection title={elementaryUiCopy("subject-units-heading")}>
        <ElementaryCardGrid>
          {units.map((unit) => (
            <ElementaryLinkCard
              key={unit.id}
              href={`/elementary/grade-3/${subjectSlug}/units/${unit.slug}`}
              heading={<ElementaryText content={unit.title} />}
              description={<ElementaryText content={unit.description} />}
              action={elementaryUiCopy("subject-open")}
              testId="elementary-unit-card"
            />
          ))}
        </ElementaryCardGrid>
      </ElementarySection>
    </>
  );
}
