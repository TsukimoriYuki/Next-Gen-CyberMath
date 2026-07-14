import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isVisibleSubject, requireSubject } from "@/data/subjects";

const ENGLISH_SUBJECT = requireSubject("english");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  if (!isVisibleSubject(ENGLISH_SUBJECT)) notFound();
  return children;
}
