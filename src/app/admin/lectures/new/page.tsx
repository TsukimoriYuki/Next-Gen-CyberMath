import type { Metadata } from "next";
import { LectureEditor } from "@/components/lectures/LectureEditor";

export const metadata: Metadata = {
  title: "新規特別講義",
  description: "共通テスト数学の特別講義を新規作成する管理者向けページ。",
};

export default function NewLecturePage() {
  return <LectureEditor />;
}
