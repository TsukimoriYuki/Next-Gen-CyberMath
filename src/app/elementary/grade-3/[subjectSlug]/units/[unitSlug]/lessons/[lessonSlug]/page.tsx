import { notFound } from "next/navigation";
import { ElementaryLessonRenderer } from "@/components/elementary/ElementaryLessonRenderer";
import { getElementaryGradeSubjects } from "@/data/elementary";
import {
  getElementaryLessonBySlug,
  getElementaryUnitBySlug,
} from "@/lib/elementary-lessons";
import { requireElementaryGrade3RegularSubjectAccess, requireElementaryPageAccess } from "@/lib/elementary-route-guard";

function isPlannedGrade3Subject(subjectSlug: string): boolean {
  return getElementaryGradeSubjects("grade-3", "regular").some(
    (entry) => entry.subjectId === subjectSlug && entry.availability === "planned",
  );
}

export default async function ElementaryLessonPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; unitSlug: string; lessonSlug: string }>;
}) {
  const { subjectSlug, unitSlug, lessonSlug } = await params;
  requireElementaryGrade3RegularSubjectAccess(subjectSlug);
  if (!isPlannedGrade3Subject(subjectSlug)) {
    notFound();
  }
  const unit = getElementaryUnitBySlug("grade-3", subjectSlug, unitSlug);
  if (!unit) notFound();
  const lesson = getElementaryLessonBySlug(unit.id, lessonSlug);
  if (!lesson) notFound();
  requireElementaryPageAccess({ status: unit.publicationStatus });
  requireElementaryPageAccess({ status: lesson.publicationStatus });

  return <ElementaryLessonRenderer lesson={lesson} />;
}
