import Link from "next/link";
import { Sigma } from "lucide-react";
import { PUBLIC_INFO_LINKS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
            <Sigma className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div>
            <p className="font-display text-sm font-bold tracking-widest text-foreground">
              CYBER<span className="text-neon-cyan">MATH</span>
            </p>
            <p className="mt-1 max-w-xl text-xs leading-5">
              共通テスト数学IAを中心に、講義・演習・復習導線をつなぐ学習プラットフォームです。
            </p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground/70">
              © {new Date().getFullYear()} {SITE_NAME}. MVP build.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs" aria-label="公開情報">
          {PUBLIC_INFO_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-neon-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
