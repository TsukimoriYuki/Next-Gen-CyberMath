import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "Cyber Mathの利用条件、禁止事項、教材利用上の注意について説明します。",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "利用規約 | Cyber Math",
    description: "Cyber Mathの利用条件、禁止事項、教材利用上の注意について。",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <PublicInfoPage
      eyebrow="Terms"
      title="利用規約"
      lead="Cyber Mathは個人が開発・運営している学習サイトです。安心して使っていただくための基本ルールをまとめています。運営体制の詳細は、一般公開に向けて準備を進めています。"
      sections={[
        {
          title: "利用条件",
          body: [
            "本サービスは、高校数学の学習支援を目的とした教材サイトです。",
            "教材内容は正確性を重視して作成していますが、入試制度、出題範囲、学校や塾の指導方針に合わせて最終確認してください。",
          ],
        },
        {
          title: "禁止事項",
          body: [
            "不正アクセス、過度な自動アクセス、他者アカウントの利用、教材やデータの無断再配布を禁止します。",
            "指導者向け招待コードや管理者向け情報を、許可なく共有しないでください。",
          ],
        },
        {
          title: "教材の扱い",
          body: [
            "掲載している問題・解説・講義は、学習用途での利用を前提としています。",
            "学校、塾、個人指導などで利用する場合は、運営者が指定する利用条件に従ってください。",
          ],
        },
        {
          title: "免責",
          body: [
            "本サービスの利用により発生した学習計画、成績、受験結果について、サービスは結果を保証しません。",
            "障害や保守により、予告なく機能を停止または変更する場合があります。",
          ],
        },
      ]}
    />
  );
}
