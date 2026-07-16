import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ElementaryShell } from "@/components/elementary/ElementaryShell";
import { requireElementaryPageAccess } from "@/lib/elementary-route-guard";

export const metadata: Metadata = {
  title: {
    default: "小学生版",
    template: "%s | Cyber Math 小学生版",
  },
  description: "Cyber Mathの小学生版を準備するための内部ページです。",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ElementaryLayout({ children }: { children: ReactNode }) {
  requireElementaryPageAccess();
  return <ElementaryShell>{children}</ElementaryShell>;
}
