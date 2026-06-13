import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSubject } from "@/data/course-curriculum";
import { CourseSubjectPageView } from "@/components/courses/CourseSubjectPageView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = getCourseSubject(subjectId);
  return {
    title: subject ? `${subject.subjectName} 講座 | CYBER OS` : "講座 | CYBER OS",
  };
}

export function generateStaticParams() {
  return [
    { subjectId: "math-1a" },
    { subjectId: "math-2bc" },
    { subjectId: "math-3c" },
  ];
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
