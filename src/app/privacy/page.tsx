import type { Metadata } from "next";
import { PublicInfoPage } from "@/components/public/PublicInfoPage";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Cyber Mathで扱う学習データ、アカウント情報、Cookieの利用方針について説明します。",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "プライバシーポリシー | Cyber Math",
    description: "学習データ、アカウント情報、Cookieの利用方針について。",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <PublicInfoPage
      eyebrow="Privacy"
      title="プライバシーポリシー"
      lead="Cyber Mathは、学習体験の改善と進捗管理に必要な範囲で情報を扱います。正式運用時には、運営者情報と問い合わせ先を明示したうえで更新します。"
      sections={[
        {
          title: "取得する情報",
          body: [
            "登録時の表示名、パスコードのハッシュ、学習進捗、解答履歴、復習状態など、サービス提供に必要な情報を扱います。",
            "パスコードは平文では保存せず、認証用にハッシュ化して保存します。",
          ],
        },
        {
          title: "利用目的",
          body: [
            "学習進捗の保存、復習キューの作成、講義の続きから再開、教材改善、障害調査のために利用します。",
            "取得した情報を、学習目的と無関係な広告配信のために利用することは想定していません。",
          ],
        },
        {
          title: "Cookieとセッション",
          body: [
            "ログイン状態を維持するため、httpOnly Cookieにセッショントークンを保存します。",
            "共用端末では、利用後にログアウトしてください。",
          ],
        },
        {
          title: "外部送信",
          body: [
            "正式運用で外部解析、決済、問い合わせ管理などを導入する場合は、このページで送信先と目的を明示します。",
          ],
        },
      ]}
    />
  );
}
