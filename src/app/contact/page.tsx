import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Cyber Mathへの教材誤り報告、一般問い合わせ、削除依頼、脆弱性報告の窓口案内と、現在の準備状況を説明します。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "お問い合わせ | Cyber Math",
    description: "教材誤り報告、一般問い合わせ、削除依頼、脆弱性報告の窓口案内と準備状況。",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PublicInfoPage
      eyebrow="Contact"
      title="お問い合わせ"
      lead="Cyber Mathは個人が開発・運営している学習サイトです。正式な問い合わせ窓口は、一般公開に向けて準備を進めています。報告いただきたい内容の種類は、あらかじめ以下のように整理しています。"
      sections={[
        {
          title: "教材内容の誤り報告",
          body: [
            "問題文、解答、解説、図、復習導線に誤りがある場合に報告いただきたい内容です。ページURL、問題名、気づいた内容をセットで記録しておくと、窓口の公開後すぐに調査できます。",
            "数式の表示崩れやraw TeXがそのまま見えている箇所も、同じ形式で対象にしています。",
          ],
        },
        {
          title: "一般のお問い合わせ",
          body: [
            "使い方、表示不具合、学習データ、公開ページに関する質問を想定しています。",
            "学校・塾などで案内された指導者向け招待コードについての相談も、このカテゴリに含みます。",
          ],
        },
        {
          title: "削除依頼",
          body: [
            "学習履歴やアカウント情報の削除を希望する場合は、本人確認に必要な情報と削除対象を明記いただく想定です。",
            "確認でき次第、保持している範囲のデータを削除または匿名化します。",
          ],
        },
        {
          title: "脆弱性報告",
          body: [
            "認証、権限、データ閲覧、入力値処理などの安全性に関する問題は、再現手順と影響範囲を添えて報告いただきたい最優先カテゴリです。",
            "学習者のデータを保護するため、公開前QA（品質方針ページ参照）とあわせて安全性の確認を継続します。",
          ],
        },
        {
          title: "現在の窓口の状況",
          body: [
            "個人運営・準備中のため、上記カテゴリを受け付ける正式な窓口（メールアドレス・フォーム等）は現時点では未整備です。",
            "窓口の公開はサイトの品質方針・更新履歴で告知します。",
          ],
          links: [
            { label: "教材・品質方針を見る", href: "/quality" },
            { label: "更新履歴を見る", href: "/quality/changelog" },
          ],
        },
      ]}
    />
  );
}
