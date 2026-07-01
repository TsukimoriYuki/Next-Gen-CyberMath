// 公開ブランドは "Cyber Math Next-Gen" に統一する。
// "CYBER OS" は使わない — 過去に一部ページのtitle/見出しに残っていた開発中の内部呼称で、
// ブランド混線として外部評価で指摘された。新しくページ/タイトルを書くときは、
// リテラルで "CYBER OS" 等を書かず、必ずこの定数を参照すること。
export const SITE_NAME = "Cyber Math Next-Gen";

export const SITE_DESCRIPTION =
  "共通テスト数学IAを中心に、講義・演習・模試・復習導線を一体化した高校数学の学習プラットフォーム。";

export const PRODUCTION_SITE_URL = "https://next-gen-cyber-math.vercel.app";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) return PRODUCTION_SITE_URL;
  return url.replace(/\/+$/, "");
}

export const PUBLIC_INFO_LINKS = [
  { href: "/about", label: "Cyber Mathについて" },
  { href: "/quality", label: "教材・品質方針" },
  { href: "/quality/checklist", label: "公開QAチェックリスト" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/licenses", label: "教材とライセンス" },
] as const;
