import type { ReactNode } from "react";
import { requireElementaryPageAccess } from "@/lib/elementary-route-guard";

export default function ElementaryShowcaseLayout({ children }: { children: ReactNode }) {
  requireElementaryPageAccess({ status: "hidden" });
  return children;
}
