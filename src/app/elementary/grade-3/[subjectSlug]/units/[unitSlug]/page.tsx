import { notFound } from "next/navigation";
import {
  ElementaryCardGrid,
  ElementaryLinkCard,
  ElementaryRichPageHeader,
  ElementarySection,
} from "@/components/elementary/ElementaryShell";
import { ElementaryText } from "@/components/elementary/ElementaryText";
import { getElementaryGradeSubjects, getElementarySubject } from "@/data/elementary";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import {
  getElementaryLessonsForUnit,
  getElementaryUnitBySlug,
} from "@/lib/elementary-lessons";

function isPlannedGrade3Subject(subjectSlug: string): boolean {
  return getElementaryGradeSubjects("grade-3", "regular").some(
    (entry) => entry.subjectId === subjectSlug && entry.availability === "planned",
  );
}

export default async function ElementaryUnitPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; unitSlug: string }>;
}) {
  const { subjectSlug, unitSlug } = await params;
  const subject = getElementarySubject(subjectSlug);
  if (!subject || !isPlannedGrade3Subject(subjectSlug)) notFound();

  const unit = getElementaryUnitBySlug("grade-3", subjectSlug, unitSlug);
  if (!unit) notFound();

  const lessons = getElementaryLessonsForUnit(unit.id);

  return (
    <>
      <ElementaryRichPageHeader
        eyebrow={subject.name}
        heading={<ElementaryText content={unit.title} />}
        lead={<ElementaryText content={unit.description} />}
      />
      <ElementarySection title={elementaryUiCopy("unit-lessons-heading")}>
        <ElementaryCardGrid>
          {lessons.map((lesson) => (
            <ElementaryLinkCard
              key={lesson.id}
              href={`/elementary/grade-3/${subjectSlug}/units/${unitSlug}/lessons/${lesson.slug}`}
              heading={<ElementaryText content={lesson.title} />}
              description={<ElementaryText content={lesson.description} />}
              meta={
                <>
                  {elementaryUiCopy("lesson-minutes-prefix")}
                  {lesson.estimatedMinutes}
                  {elementaryUiCopy("lesson-minutes-suffix")}
                </>
              }
              action={elementaryUiCopy("lesson-open")}
              testId="elementary-lesson-card"
            />
          ))}
        </ElementaryCardGrid>
      </ElementarySection>
    </>
  );
}
