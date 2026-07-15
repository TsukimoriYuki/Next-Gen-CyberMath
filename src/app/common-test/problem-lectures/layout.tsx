import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default function CommonTestProblemLecturesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const access = requireSubjectPageAccess("math", "exams");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
