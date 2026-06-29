export const SITE_NAME = "Cyber Math";

export const SITE_DESCRIPTION =
  "共通テスト数学IAを中心に、講義・演習・復習導線を一体化した高校数学の学習プラットフォーム。";

export const PRODUCTION_SITE_URL = "https://next-gen-cyber-math.vercel.app";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) return PRODUCTION_SITE_URL;
  return url.replace(/\/+$/, "");
}

export const PUBLIC_INFO_LINKS = [
  { href: "/about", label: "Cyber Mathについて" },
  { href: "/quality", label: "教材・品質方針" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/licenses", label: "教材とライセンス" },
] as const;
