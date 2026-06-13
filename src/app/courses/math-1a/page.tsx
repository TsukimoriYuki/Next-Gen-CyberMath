import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSubject } from "@/data/course-curriculum";
import { CourseSubjectPageView } from "@/components/courses/CourseSubjectPageView";

export const metadata: Metadata = {
  title: "数学IA 講座 | CYBER OS",
  description: "数学IAの単元一覧です。",
};

export default function MathIACoursePage() {
  const subject = getCourseSubject("math-1a");
  if (!subject) notFound();
  return <CourseSubjectPageView subject={subject} />;
}
