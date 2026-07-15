import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import {
  getCourseSubject,
  isPublicCourseSubject,
} from "@/data/course-curriculum";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default async function CourseSubjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const subject = getCourseSubject(subjectId);
  if (!subject) notFound();

  const access = requireSubjectPageAccess(subject.parentSubjectId, "courses", {
    resourcePublished: isPublicCourseSubject(subject),
  });

  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
