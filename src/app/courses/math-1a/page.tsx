import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSubject } from "@/data/course-curriculum";
import { CourseSubjectPageView } from "@/components/courses/CourseSubjectPageView";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "数学IA 講座",
  description: "数学IAの単元一覧です。",
  path: "/courses/math-1a",
});

export default function MathIACoursePage() {
  const subject = getCourseSubject("math-1a");
  if (!subject) notFound();
  return <CourseSubjectPageView subject={subject} />;
}
