import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LectureEditor } from "@/components/lectures/LectureEditor";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "新規特別講義",
  description: "共通テスト数学の特別講義を新規作成する管理者向けページ。",
  robots: { index: false, follow: false },
};

export default async function NewLecturePage() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") redirect("/");
  return <LectureEditor />;
}
