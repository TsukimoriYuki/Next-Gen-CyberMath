import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/auth/",
        "/mentor/",
        "/mypage/",
        "/common-test/history",
        "/common-test/review",
        "/common-test/weakness",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
