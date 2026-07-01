import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LectureEditor } from "@/components/lectures/LectureEditor";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "特別講義を編集",
  description: "共通テスト数学の特別講義を編集する管理者向けページ。",
  robots: { index: false, follow: false },
};

export default async function EditLecturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") redirect("/");
  const { id } = await params;
  return <LectureEditor lectureId={id} />;
}
