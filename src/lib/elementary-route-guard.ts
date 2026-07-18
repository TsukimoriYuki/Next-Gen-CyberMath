import "server-only";

import { notFound } from "next/navigation";
import {
  ELEMENTARY_COURSE_TYPES,
  ELEMENTARY_GRADE_SUBJECTS_BY_ID,
  ELEMENTARY_SITE,
  getElementaryGrade,
  getElementarySubject,
} from "@/data/elementary";
import {
  evaluateElementaryPublication,
  resolveElementaryPublicationRuntime,
  type ElementaryPublicationRuntime,
} from "@/lib/elementary-publication";
import type { ElementaryPublicationStatus } from "@/types/elementary";

export type ElementaryPageAccess = Readonly<{
  isBeta: boolean;
  isInternal: boolean;
  runtime: ElementaryPublicationRuntime;
  status: ElementaryPublicationStatus;
}>;

export function requireElementaryPageAccess(
  options: Readonly<{
    status?: ElementaryPublicationStatus;
    internalAccess?: boolean;
  }> = {},
): ElementaryPageAccess {
  const runtime = resolveElementaryPublicationRuntime();
  const decision = evaluateElementaryPublication(
    options.status ?? ELEMENTARY_SITE.publicationStatus,
    runtime,
    { internalAccess: options.internalAccess },
  );
  if (!decision.allowed) notFound();
  return decision;
}

export function requireElementaryGrade3RegularCourseAccess() {
  const grade = getElementaryGrade("grade-3");
  const course = ELEMENTARY_COURSE_TYPES.find((entry) => entry.id === "regular");
  if (!grade || !course || grade.availability !== "planned" || course.availability !== "planned") notFound();
  requireElementaryPageAccess({ status: grade.publicationStatus });
  requireElementaryPageAccess({ status: course.publicationStatus });
  return { grade, course } as const;
}

export function requireElementaryGrade3RegularSubjectAccess(subjectSlug: string) {
  const scope = requireElementaryGrade3RegularCourseAccess();
  const subject = getElementarySubject(subjectSlug);
  if (!subject) notFound();
  const gradeSubject = ELEMENTARY_GRADE_SUBJECTS_BY_ID[`grade-3:regular:${subject.id}`];
  if (!gradeSubject || gradeSubject.availability !== "planned") notFound();
  requireElementaryPageAccess({ status: subject.publicationStatus });
  requireElementaryPageAccess({ status: gradeSubject.publicationStatus });
  return { ...scope, subject, gradeSubject } as const;
}
