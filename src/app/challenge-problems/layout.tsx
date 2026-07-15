import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = createPublicMetadata({
  title: "数学の挑戦問題",
  description: "発展・最難関レベルの数学問題からランダムに1問を選び、段階的な解説で学びます。",
  path: "/challenge-problems",
});

export default function ChallengeProblemsLayout({ children }: { children: ReactNode }) {
  const access = requireSubjectPageAccess("math", "problems");
  return (
    <>
      <SubjectPublicationNotice access={access} />
      {children}
    </>
  );
}
