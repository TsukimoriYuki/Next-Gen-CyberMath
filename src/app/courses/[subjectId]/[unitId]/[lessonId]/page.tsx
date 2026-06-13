import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COURSE_SUBJECTS,
  getCourseLesson,
  getCourseSubject,
  getCourseUnit,
} from "@/data/course-curriculum";
import { CourseLessonPageView } from "@/components/courses/CourseLessonPageView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string; unitId: string; lessonId: string }>;
}): Promise<Metadata> {
  const { subjectId, unitId, lessonId } = await params;
  const lesson = getCourseLesson(subjectId, unitId, lessonId);
  return {
    title: lesson ? `${lesson.lessonTitle} | CYBER OS` : "講座 | CYBER OS",
  };
}

export function generateStaticParams() {
  return COURSE_SUBJECTS.flatMap((subject) =>
    subject.units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        subjectId: subject.subjectId,
        unitId: unit.unitId,
        lessonId: lesson.lessonId,
      })),
    ),
  );
}

export default async function CourseLessonPage({
  params,
}: {
  params: Promise<{ subjectId: string; unitId: string; lessonId: string }>;
}) {
  const { subjectId, unitId, lessonId } = await params;
  const subject = getCourseSubject(subjectId);
  const unit = getCourseUnit(subjectId, unitId);
  const lesson = getCourseLesson(subjectId, unitId, lessonId);
  if (!subject || !unit || !lesson) notFound();
  return <CourseLessonPageView subject={subject} unit={unit} lesson={lesson} />;
}
