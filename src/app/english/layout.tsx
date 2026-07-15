import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("english");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
