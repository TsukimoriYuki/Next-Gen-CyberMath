import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default function JapaneseLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("japanese");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
