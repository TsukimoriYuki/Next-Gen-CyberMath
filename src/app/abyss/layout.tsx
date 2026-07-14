import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "数学の挑戦問題",
  robots: { index: false, follow: true },
};

export default function ChallengeProblemsLayout({ children }: { children: ReactNode }) {
  return children;
}
