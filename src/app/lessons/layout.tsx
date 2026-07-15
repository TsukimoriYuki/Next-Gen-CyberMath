import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default function LessonsLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("math", "courses");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
