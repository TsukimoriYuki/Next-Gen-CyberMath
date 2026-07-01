import type { Metadata } from "next";
import { LectureEditor } from "@/components/lectures/LectureEditor";

export const metadata: Metadata = {
  title: "特別講義を編集",
  description: "共通テスト数学の特別講義を編集する管理者向けページ。",
};

export default async function EditLecturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LectureEditor lectureId={id} />;
}
