import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSubject, getCourseUnit } from "@/data/course-curriculum";
import { CourseUnitPageView } from "@/components/courses/CourseUnitPageView";

export const metadata: Metadata = {
  title: "二次関数 講座一覧 | CYBER OS",
  description: "数学IA 二次関数の講座一覧です。",
};

export default function QuadraticCoursePage() {
  const subject = getCourseSubject("math-1a");
  const unit = getCourseUnit("math-1a", "quadratic");
  if (!subject || !unit) notFound();
  return <CourseUnitPageView subject={subject} unit={unit} />;
}
