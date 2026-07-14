import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "数学の挑戦問題",
  description: "発展・最難関レベルの数学問題からランダムに1問を選び、段階的な解説で学びます。",
  path: "/challenge-problems",
});

export default function ChallengeProblemsLayout({ children }: { children: ReactNode }) {
  return children;
}
