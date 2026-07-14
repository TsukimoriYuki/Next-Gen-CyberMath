import type { Metadata } from "next";

type PublicMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  index?: boolean;
  openGraphType?: "website" | "article";
};

export function normalizeCanonicalPath(path: `/${string}`): `/${string}` {
  if (path.includes("?") || path.includes("#") || path.includes("\\")) {
    throw new RangeError(`canonical paths cannot contain query, fragment, or backslash: ${path}`);
  }
  if (path.startsWith("//")) throw new RangeError(`canonical paths must be same-origin: ${path}`);
  return path !== "/" && path.endsWith("/")
    ? (path.replace(/\/+$/, "") as `/${string}`)
    : path;
}

/** Keeps canonical and Open Graph URLs aligned for a public route. */
export function createPublicMetadata({
  title,
  description,
  path,
  index = true,
  openGraphType = "website",
}: PublicMetadataInput): Metadata {
  const canonical = normalizeCanonicalPath(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: openGraphType,
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        },
  };
}
