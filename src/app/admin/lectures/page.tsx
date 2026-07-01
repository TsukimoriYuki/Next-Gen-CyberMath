import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLectureList } from "@/components/lectures/LectureEditor";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "特別講義管理",
  description: "共通テスト数学の特別講義を作成・編集する管理者向けページ。",
  robots: { index: false, follow: false },
};

export default async function AdminLecturesPage() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") redirect("/");
  return <AdminLectureList />;
}
