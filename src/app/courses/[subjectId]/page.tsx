import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PUBLIC_COURSE_SUBJECTS,
  getCourseSubject,
  isPublicCourseSubject,
} from "@/data/course-curriculum";
import { CourseSubjectPageView } from "@/components/courses/CourseSubjectPageView";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}): Promise<Metadata> {
  const { subjectId } = await params;
  const subject = getCourseSubject(subjectId);
  if (!subject || !isPublicCourseSubject(subject)) {
    return { title: subject ? `${subject.subjectName} 講座` : "講座", robots: { index: false, follow: false } };
  }
  return createPublicMetadata({
    title: `${subject.subjectName} 講座`,
    description: subject.description,
    path: `/courses/${subjectId}`,
  });
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
  requireSubjectPageAccess(subject.parentSubjectId, "courses", {
    resourcePublished: isPublicCourseSubject(subject),
  });
  return <CourseSubjectPageView subject={subject} />;
}
