import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSubject, getCourseUnit } from "@/data/course-curriculum";
import { CourseUnitPageView } from "@/components/courses/CourseUnitPageView";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "二次関数 講座一覧",
  description: "数学IA 二次関数の講座一覧です。",
  path: "/courses/math-1a/quadratic",
});

export default function QuadraticCoursePage() {
  const subject = getCourseSubject("math-1a");
  const unit = getCourseUnit("math-1a", "quadratic");
  if (!subject || !unit) notFound();
  return <CourseUnitPageView subject={subject} unit={unit} />;
}
