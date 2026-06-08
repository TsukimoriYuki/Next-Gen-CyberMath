// 概念タグのユーティリティ。タグは Markdown/データ側では日本語文字列で持ち、
// URL では encodeURIComponent したものをスラッグとして使う。
// 色はタグ名のハッシュからネオンパレットへ決定的に割り当てる（語彙表は不要）。

const TAG_NEON = [
  "var(--neon-cyan)",
  "var(--neon-magenta)",
  "var(--neon-violet)",
  "var(--neon-lime)",
  "var(--neon-amber)",
] as const;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** タグに対応するネオン色（CSS 変数）。 */
export function tagColor(tag: string): string {
  return TAG_NEON[hash(tag) % TAG_NEON.length];
}

/** タグ → URL スラッグ。 */
export function tagSlug(tag: string): string {
  return encodeURIComponent(tag);
}

/** URL スラッグ → タグ名。 */
export function tagFromSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
