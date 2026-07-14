import type { Metadata } from "next";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "英語精読",
  description: "英文の構造と論旨を丁寧に読み解く精読トレーニングです。",
  path: "/english/comprehension",
});

export default function ComprehensionLayout({ children }: LayoutProps<"/english/comprehension">) {
  return children;
}
