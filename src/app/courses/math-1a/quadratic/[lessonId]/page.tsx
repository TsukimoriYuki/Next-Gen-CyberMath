import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCourseLesson,
  getCourseSubject,
  getCourseUnit,
} from "@/data/course-curriculum";
import { CourseLessonPageView } from "@/components/courses/CourseLessonPageView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getCourseLesson("math-1a", "quadratic", lessonId);
  return {
    title: lesson ? lesson.lessonTitle : "講座",
  };
}

export function generateStaticParams() {
  const unit = getCourseUnit("math-1a", "quadratic");
  return unit?.lessons.map((lesson) => ({ lessonId: lesson.lessonId })) ?? [];
}

export default async function MathIAQuadraticLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const subject = getCourseSubject("math-1a");
  const unit = getCourseUnit("math-1a", "quadratic");
  const lesson = getCourseLesson("math-1a", "quadratic", lessonId);
  if (!subject || !unit || !lesson) notFound();
  return <CourseLessonPageView subject={subject} unit={unit} lesson={lesson} />;
}

