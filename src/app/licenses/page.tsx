import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "教材とライセンス",
  description:
    "Cyber Mathの教材、図解、利用ライブラリ、ライセンス表記について説明します。",
  alternates: {
    canonical: "/licenses",
  },
  openGraph: {
    title: "教材とライセンス",
    description: "Cyber Mathの教材、図解、利用ライブラリ、ライセンス表記について。",
    url: "/licenses",
  },
};

export default function LicensesPage() {
  return (
    <PublicInfoPage
      eyebrow="Licenses"
      title="教材とライセンス"
      lead="Cyber Mathの教材と図解は、学習利用を前提に構成しています。外部ライブラリを含む公開品質の確認項目です。"
      sections={[
        {
          title: "教材と図解",
          body: [
            "講義、問題、解説、図解、判別ドリルは、Cyber Math内での学習利用を前提としています。",
            "教材の複製、再配布、商用利用の可否は、利用規約に従ってください。",
          ],
          links: [{ label: "利用規約を見る", href: "/terms" }],
        },
        {
          title: "利用ライブラリ",
          body: [
            "本サイトは、Next.js、React、TypeScript、Tailwind CSS、KaTeX、lucide-reactなどのオープンソースライブラリを利用しています。",
            "各ライブラリのライセンスは、それぞれの配布元の条件に従います。",
          ],
        },
        {
          title: "数式と図の表示",
          body: [
            "数式はKaTeXを用いて表示し、図解はSVGまたはアプリ内コンポーネントとして提供します。",
            "表示崩れやアクセシビリティ上の不備を見つけた場合は、お問い合わせページの案内に沿って報告してください。",
          ],
        },
      ]}
    />
  );
}
