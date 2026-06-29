import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Cyber Mathへの問い合わせ、教材誤りの報告、アカウント相談の窓口について説明します。",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "お問い合わせ | Cyber Math",
    description: "教材誤りの報告、表示崩れ、アカウント相談の窓口について。",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PublicInfoPage
      eyebrow="Contact"
      title="お問い合わせ"
      lead="教材の誤り、表示崩れ、アカウントや師範権限に関する相談は、利用中の学校・塾・担当者を通じてご連絡ください。"
      sections={[
        {
          title: "教材内容の報告",
          body: [
            "問題文、解答、解説、図、復習導線に誤りがある場合は、ページURL、問題名、気づいた内容を添えて報告してください。",
            "数式の表示崩れや、raw TeXがそのまま見えている箇所も、同じ形式で報告できます。",
          ],
        },
        {
          title: "アカウントと師範権限",
          body: [
            "パスコードを忘れた場合や、師範コードの付与が必要な場合は、担当者に相談してください。",
            "師範コードは許可された指導者向けの権限管理情報です。生徒アカウントの作成には不要です。",
          ],
        },
        {
          title: "公開連絡先",
          body: [
            "正式運用時には、運営者名、連絡先、対応時間をこのページに掲載します。",
            "現在のビルドでは、公開前QA用の案内として最小限の窓口情報を表示しています。",
          ],
        },
      ]}
    />
  );
}
