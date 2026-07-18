"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import styles from "./ElementaryShell.module.css";

const LINKS = [
  ["/elementary", "shell-nav-top"],
  ["/elementary/grade-3", "shell-nav-grade-3"],
  ["/elementary/grade-3/math", "shell-nav-math"],
  ["/elementary/grade-3/japanese", "shell-nav-japanese"],
  ["/elementary/grade-3/social-studies", "shell-nav-social"],
  ["/elementary/for-guardians", "shell-nav-guardians"],
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/elementary") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLinks({ pathname }: { pathname: string }) {
  return LINKS.map(([href, copyId]) => (
    <Link
      key={href}
      href={href}
      className={styles.navLink}
      aria-current={isActive(pathname, href) ? "page" : undefined}
    >
      {elementaryUiCopy(copyId)}
    </Link>
  ));
}

export function ElementaryNavigation() {
  const pathname = usePathname();

  return (
    <>
      <nav aria-label={elementaryUiCopy("shell-nav-label")} className={styles.desktopNav}>
        <NavigationLinks pathname={pathname} />
      </nav>
      <details className={styles.mobileNav}>
        <summary>{elementaryUiCopy("shell-nav-menu")}</summary>
        <nav aria-label={elementaryUiCopy("shell-nav-mobile-label")} className={styles.mobileNavLinks}>
          <NavigationLinks pathname={pathname} />
        </nav>
      </details>
    </>
  );
}
