import type { Metadata } from "next";
import { AdminLectureList } from "@/components/lectures/LectureEditor";

export const metadata: Metadata = {
  title: "特別講義管理",
  description: "共通テスト数学の特別講義を作成・編集する管理者向けページ。",
};

export default function AdminLecturesPage() {
  return <AdminLectureList />;
}
