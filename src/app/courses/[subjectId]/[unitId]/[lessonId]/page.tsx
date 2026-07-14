import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PUBLIC_COURSE_SUBJECTS,
  getCourseLesson,
  getCourseSubject,
  getCourseUnit,
  isPublicCourseSubject,
} from "@/data/course-curriculum";
import { CourseLessonPageView } from "@/components/courses/CourseLessonPageView";
import { createPublicMetadata } from "@/lib/public-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string; unitId: string; lessonId: string }>;
}): Promise<Metadata> {
  const { subjectId, unitId, lessonId } = await params;
  const subject = getCourseSubject(subjectId);
  const lesson = getCourseLesson(subjectId, unitId, lessonId);
  if (!subject || !lesson || !isPublicCourseSubject(subject)) {
    return { title: lesson ? lesson.lessonTitle : "講座", robots: { index: false, follow: false } };
  }
  return createPublicMetadata({
    title: lesson.lessonTitle,
    description: lesson.lessonDescription,
    path: `/courses/${subjectId}/${unitId}/${lessonId}`,
    openGraphType: "article",
  });
}

export function generateStaticParams() {
  return PUBLIC_COURSE_SUBJECTS.flatMap((subject) =>
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
  if (!isPublicCourseSubject(subject) && process.env.NODE_ENV === "production") notFound();
  return <CourseLessonPageView subject={subject} unit={unit} lesson={lesson} />;
}
