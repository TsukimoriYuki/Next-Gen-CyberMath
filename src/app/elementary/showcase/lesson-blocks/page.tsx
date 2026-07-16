import type { Metadata } from "next";
import { ElementaryLessonRenderer } from "@/components/elementary/ElementaryLessonRenderer";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "@/data/elementary/showcases/division-dialogue";

export const metadata: Metadata = {
  title: "開発用の講座見本",
  description: "小学生版の会話授業と構造化講座ブロックを確認する非公開ページです。",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ElementaryLessonBlocksShowcasePage() {
  return <ElementaryLessonRenderer lesson={ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE} />;
}
