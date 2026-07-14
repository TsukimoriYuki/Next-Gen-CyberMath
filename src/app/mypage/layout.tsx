import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "マイページ",
  description: "数学と英語の学習履歴、復習予定、学習状況を確認します。",
  robots: { index: false, follow: true },
};

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return children;
}
