import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSE_SUBJECTS, getCourseSubject } from "@/data/course-curriculum";
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
  };
}

export function generateStaticParams() {
  return COURSE_SUBJECTS.map((subject) => ({
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
  return <CourseSubjectPageView subject={subject} />;
}
