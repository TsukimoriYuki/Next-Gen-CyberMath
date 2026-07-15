import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default function CalcDrillLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("math", "problems");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
