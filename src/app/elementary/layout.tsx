import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ElementaryShell } from "@/components/elementary/ElementaryShell";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import { requireElementaryPageAccess } from "@/lib/elementary-route-guard";

export const metadata: Metadata = {
  title: {
    default: elementaryUiCopy("layout-metadata-title"),
    template: `%s | Cyber Math ${elementaryUiCopy("layout-metadata-title")}`,
  },
  description: elementaryUiCopy("layout-metadata-description"),
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ElementaryLayout({ children }: { children: ReactNode }) {
  requireElementaryPageAccess();
  return <ElementaryShell>{children}</ElementaryShell>;
}
