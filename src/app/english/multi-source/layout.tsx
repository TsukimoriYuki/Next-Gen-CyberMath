import type { Metadata } from "next";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "英語マルチソース",
  description: "複数資料を横断して必要な情報を統合する英語読解トレーニングです。",
  path: "/english/multi-source",
});

export default function MultiSourceLayout({ children }: LayoutProps<"/english/multi-source">) {
  return children;
}
