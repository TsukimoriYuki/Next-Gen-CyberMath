import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

// 情報Ⅰは hidden 教科。production / preview では配下すべてが404になり、
// local development でのみ確認バナー付きで閲覧できる。

export default function InformaticsLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("informatics");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
