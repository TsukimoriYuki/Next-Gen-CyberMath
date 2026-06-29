import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "Cyber Mathについて",
  description:
    "Cyber Mathの目的、対象、教材方針、公開範囲について説明します。",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Cyber Mathについて",
    description: "Cyber Mathの目的、対象、教材方針、公開範囲について。",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <PublicInfoPage
      eyebrow="About"
      title="Cyber Mathについて"
      lead="Cyber Mathは、共通テスト数学IAを中心に、講義、演習、復習導線をひとつの流れに整理する学習プラットフォームです。"
      sections={[
        {
          title: "目的",
          body: [
            "受験生が、公式を暗記するだけでなく、問題文から使う道具を選び、間違えた後に戻る場所まで分かる状態を目指します。",
            "特に共通テスト数学IAでは、図形、確率、二次関数のように、読み取りと初手判断で差がつく単元を重点的に扱います。",
          ],
        },
        {
          title: "対象",
          body: [
            "高校数学の基礎を学び直したい学習者から、共通テスト本番で時間短縮を狙う受験生までを想定しています。",
            "一部の講義や特別授業は、通常講義を終えた後の復習・満点対策として設計しています。",
          ],
        },
        {
          title: "教材方針",
          body: [
            "問題、解説、講義、判別ドリル、復習導線を分断せず、同じ単元内で往復できるようにしています。",
            "数学的な正しさと、受験生が本番で使える判断のしやすさを両立することを重視しています。",
          ],
        },
      ]}
    />
  );
}
