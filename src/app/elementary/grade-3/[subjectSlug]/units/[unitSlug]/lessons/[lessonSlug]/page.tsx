import { notFound } from "next/navigation";
import { ElementaryLessonRenderer } from "@/components/elementary/ElementaryLessonRenderer";
import { getElementaryGradeSubjects, getElementarySubject } from "@/data/elementary";
import {
  getElementaryLessonBySlug,
  getElementaryUnitBySlug,
} from "@/lib/elementary-lessons";

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
  if (!getElementarySubject(subjectSlug) || !isPlannedGrade3Subject(subjectSlug)) {
    notFound();
  }
  const unit = getElementaryUnitBySlug("grade-3", subjectSlug, unitSlug);
  if (!unit) notFound();
  const lesson = getElementaryLessonBySlug(unit.id, lessonSlug);
  if (!lesson) notFound();

  return <ElementaryLessonRenderer lesson={lesson} />;
}
