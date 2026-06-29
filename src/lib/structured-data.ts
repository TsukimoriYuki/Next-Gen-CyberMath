import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export function getSiteStructuredData() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        url: siteUrl,
        inLanguage: "ja",
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        description: SITE_DESCRIPTION,
        educationalLevel: "HighSchool",
        teaches: [
          "共通テスト数学IA",
          "高校数学",
          "図形と計量",
          "二次関数",
          "確率",
        ],
      },
    ],
  };
}
