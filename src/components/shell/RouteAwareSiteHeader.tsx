"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function RouteAwareSiteHeader({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/elementary" || pathname.startsWith("/elementary/")) {
    return null;
  }

  return children;
}
