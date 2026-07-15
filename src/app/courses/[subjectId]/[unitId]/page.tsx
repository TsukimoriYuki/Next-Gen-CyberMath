import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PUBLIC_COURSE_SUBJECTS,
  getCourseSubject,
  getCourseUnit,
  isPublicCourseSubject,
} from "@/data/course-curriculum";
import { CourseUnitPageView } from "@/components/courses/CourseUnitPageView";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string; unitId: string }>;
}): Promise<Metadata> {
  const { subjectId, unitId } = await params;
  const subject = getCourseSubject(subjectId);
  const unit = getCourseUnit(subjectId, unitId);
  if (!subject || !unit || !isPublicCourseSubject(subject)) {
    return { title: unit ? `${unit.unitTitle} 講座一覧` : "講座一覧", robots: { index: false, follow: false } };
  }
  return createPublicMetadata({
    title: `${unit.unitTitle} 講座一覧`,
    description: unit.unitDescription,
    path: `/courses/${subjectId}/${unitId}`,
  });
}

export function generateStaticParams() {
  return PUBLIC_COURSE_SUBJECTS.flatMap((subject) =>
    subject.units.map((unit) => ({
      subjectId: subject.subjectId,
      unitId: unit.unitId,
    })),
  );
}

export default async function CourseUnitPage({
  params,
}: {
  params: Promise<{ subjectId: string; unitId: string }>;
}) {
  const { subjectId, unitId } = await params;
  const subject = getCourseSubject(subjectId);
  const unit = getCourseUnit(subjectId, unitId);
  if (!subject || !unit) notFound();
  requireSubjectPageAccess(subject.parentSubjectId, "courses", {
    resourcePublished: isPublicCourseSubject(subject),
  });
  return <CourseUnitPageView subject={subject} unit={unit} />;
}
