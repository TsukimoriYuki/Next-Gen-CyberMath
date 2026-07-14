import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isVisibleSubject, requireSubject } from "@/data/subjects";

const MATH_SUBJECT = requireSubject("math");

export default function MathLayout({ children }: { children: ReactNode }) {
  if (!isVisibleSubject(MATH_SUBJECT)) notFound();
  return children;
}
