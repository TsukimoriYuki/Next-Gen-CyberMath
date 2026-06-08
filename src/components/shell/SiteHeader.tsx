import Link from "next/link";
import { Sigma, Swords } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="glow-cyan flex h-9 w-9 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan transition-transform group-hover:scale-105">
            <Sigma className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-widest text-foreground">
              CYBER<span className="text-neon-cyan">MATH</span>
            </span>
            <span className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Next-Gen
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/units"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-neon-cyan"
          >
            単元
          </Link>
          <Link
            href="/lessons"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-neon-magenta"
          >
            授業
          </Link>
          <Link
            href="/tags"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-neon-cyan"
          >
            タグ
          </Link>
          <Link
            href="/mock"
            className="rounded-md px-3 py-2 font-semibold text-neon-magenta/90 transition-colors hover:bg-secondary/60 hover:text-neon-magenta"
          >
            模試
          </Link>
          <Link
            href="/drill"
            className="rounded-md px-3 py-2 font-semibold text-neon-amber/90 transition-colors hover:bg-secondary/60 hover:text-neon-amber"
          >
            特訓
          </Link>
          <Link
            href="/dojo"
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-semibold text-neon-amber/90 transition-colors hover:bg-secondary/60 hover:text-neon-amber"
          >
            <Swords className="h-3.5 w-3.5" />
            道場
          </Link>
          <Link
            href="/#daily"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-neon-cyan"
          >
            挑戦
          </Link>
        </nav>
      </div>
    </header>
  );
}
