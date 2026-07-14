import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PUBLIC_COURSE_SUBJECTS,
  getCourseSubject,
  isPublicCourseSubject,
} from "@/data/course-curriculum";
import { CourseSubjectPageView } from "@/components/courses/CourseSubjectPageView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = getCourseSubject(subjectId);
  return {
    title: subject ? `${subject.subjectName} 講座` : "講座",
    robots: subject && !isPublicCourseSubject(subject) ? { index: false, follow: false } : undefined,
  };
}

export function generateStaticParams() {
  return PUBLIC_COURSE_SUBJECTS.map((subject) => ({
    subjectId: subject.subjectId,
  }));
}

export default async function CourseSubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const subject = getCourseSubject(subjectId);
  if (!subject) notFound();
  if (!isPublicCourseSubject(subject) && process.env.NODE_ENV === "production") notFound();
  return <CourseSubjectPageView subject={subject} />;
}
