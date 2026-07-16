/** Public brand copy must reference this constant instead of duplicating it. */
export const SITE_NAME = "Cyber Math";

export const SITE_DESCRIPTION =
  "教科ごとの講義・問題演習・模試・復習を、一つの学習ルートにつなぐ受験学習サービス。";

export const PRODUCTION_SITE_URL = "https://cyber-math-production.up.railway.app";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) return PRODUCTION_SITE_URL;
  try {
    const parsed = new URL(url);
    const isLocal = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    const isVercelPreview =
      parsed.hostname.endsWith(".vercel.app") && parsed.origin !== PRODUCTION_SITE_URL;
    if (parsed.protocol !== "https:" || isLocal || isVercelPreview) return PRODUCTION_SITE_URL;
    return url.replace(/\/+$/, "");
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

export const PUBLIC_INFO_LINKS = [
  { href: "/about", label: "Cyber Mathについて" },
  { href: "/quality", label: "教材・品質方針" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/licenses", label: "教材とライセンス" },
] as const;
