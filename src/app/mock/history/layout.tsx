import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "演習履歴",
  description: "保存された演習結果、得点推移、復習候補を確認します。",
  robots: { index: false, follow: true },
};

export default function MockHistoryLayout({ children }: { children: ReactNode }) {
  return children;
}
