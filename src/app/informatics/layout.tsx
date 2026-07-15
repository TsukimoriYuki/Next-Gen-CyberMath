import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

// 親教科のpublic / beta / hidden状態を共通guardで配下すべてへ適用する。

export default function InformaticsLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("informatics");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
