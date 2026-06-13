import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSE_SUBJECTS, getCourseSubject, getCourseUnit } from "@/data/course-curriculum";
import { CourseUnitPageView } from "@/components/courses/CourseUnitPageView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string; unitId: string }>;
}): Promise<Metadata> {
  const { subjectId, unitId } = await params;
  const unit = getCourseUnit(subjectId, unitId);
  return {
    title: unit ? `${unit.unitTitle} 講座一覧 | CYBER OS` : "講座一覧 | CYBER OS",
  };
}

export function generateStaticParams() {
  return COURSE_SUBJECTS.flatMap((subject) =>
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
  return <CourseUnitPageView subject={subject} unit={unit} />;
}
