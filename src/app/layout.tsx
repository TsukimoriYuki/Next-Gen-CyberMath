import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SiteHeader } from "@/components/shell/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Next-Gen Cyber Math",
    template: "%s | Cyber Math",
  },
  description:
    "数学の美しさと真の理解を追求する、高校数学の次世代学習プラットフォーム。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Upgrades to the real cyber webfonts when reachable; the CSS stacks
            in globals.css are the offline-safe fallback. This lives in the
            root layout head, so it applies to every route (the pages-router
            "single page" lint heuristic does not apply here). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Orbitron:wght@500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
          <p>
            Next-Gen Cyber Math · 数学の美しさと真の理解 ·{" "}
            <span className="font-mono text-neon-cyan/80">MVP build</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
