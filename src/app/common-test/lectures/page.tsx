import type { Metadata } from "next";
import { LectureRoadmapCatalog } from "@/components/lectures/LectureRoadmapCatalog";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";

export const metadata: Metadata = {
  title: "特別講義 — 共通テスト数学",
  description:
    "共通テスト数学の考え方、公式選択、本番判断、満点講義、時間短縮講義を学ぶ特別講義一覧です。",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/common-test/lectures",
  },
  openGraph: {
    title: "特別講義",
    description:
      "共通テスト数学の満点講義、判別ドリル、本番判断、時間短縮講義への入口。",
    url: "/common-test/lectures",
  },
};

export default function CommonTestLecturesPage() {
  return (
    <LearningPageShell width="content" className="max-w-5xl">
      <LearningBreadcrumbs
        items={[
          { label: "共通テスト対策", href: "/common-test" },
          { label: "特別講義" },
        ]}
      />
      <LearningPageHeader
        eyebrow="特別講義 / 重点講座"
        title="公式を覚えるだけで終わらせない講義"
        description="共通テスト数学で差がつくのは、条件を見る順番、公式を選ぶ判断、時間をかけるか撤退するかの見極めです。特別講義では「できる人の頭の中」まで分解します。"
      />
      <LectureRoadmapCatalog />
    </LearningPageShell>
  );
}
