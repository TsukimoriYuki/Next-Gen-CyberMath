import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Cyber Mathへの教材誤り報告、一般問い合わせ、削除依頼、脆弱性報告について説明します。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "お問い合わせ | Cyber Math",
    description: "教材誤り報告、一般問い合わせ、削除依頼、脆弱性報告について。",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PublicInfoPage
      eyebrow="Contact"
      title="お問い合わせ"
      lead="教材の誤り、表示崩れ、アカウントや指導者向け招待コードに関する相談、削除依頼、脆弱性報告はこのページの案内に沿ってご連絡ください。"
      sections={[
        {
          title: "教材内容の誤り報告",
          body: [
            "問題文、解答、解説、図、復習導線に誤りがある場合は、ページURL、問題名、気づいた内容を添えて報告してください。",
            "数式の表示崩れやraw TeXがそのまま見えている箇所も、同じ形式で報告できます。",
          ],
        },
        {
          title: "一般のお問い合わせ",
          body: [
            "使い方、表示不具合、学習データ、公開ページに関する質問を受け付けます。",
            "学校・塾などで案内された指導者向け招待コードについて不明点がある場合も、ここから相談してください。",
          ],
        },
        {
          title: "削除依頼",
          body: [
            "学習履歴やアカウント情報の削除を希望する場合は、本人確認に必要な情報と削除対象を明記してください。",
            "確認後、保持している範囲のデータを削除または匿名化します。",
          ],
        },
        {
          title: "脆弱性報告",
          body: [
            "認証、権限、データ閲覧、入力値処理などの安全性に関する問題を見つけた場合は、再現手順と影響範囲を添えて報告してください。",
            "学習者のデータを保護するため、公開前QAとあわせて安全性の確認を継続します。",
          ],
        },
        {
          title: "正式な連絡先",
          body: [
            "正式公開時には、運営者名、連絡先、対応時間をこのページに掲載します。",
            "現在のビルドでは、公開前QA用の案内として最小限の連絡情報を表示しています。",
          ],
        },
      ]}
    />
  );
}
