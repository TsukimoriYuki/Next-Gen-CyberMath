import Link from "next/link";
import { Sigma, LogIn, LogOut, ShieldCheck, UserRound, LineChart, Home } from "lucide-react";
import { getSession } from "@/lib/auth";

export async function SiteHeader() {
  const session = await getSession();

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
          {/* ホーム */}
          <Link
            href="/"
            aria-label="ホーム"
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">ホーム</span>
          </Link>

          {/* マイページ */}
          <Link
            href="/mypage"
            aria-label="マイページ"
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LineChart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">マイページ</span>
          </Link>

          {/* 師範リンク（MENTOR のみ表示） */}
          {session?.role === "MENTOR" && (
            <Link
              href="/mentor"
              aria-label="師範ページ"
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-semibold text-neon-amber transition-colors hover:bg-neon-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">師範</span>
            </Link>
          )}

          {/* ユーザー表示 / ログインボタン */}
          {session ? (
            <div className="ml-1 flex items-center gap-2">
              <span className="hidden items-center gap-1 rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1.5 font-mono text-xs text-foreground/70 sm:inline-flex">
                {session.role === "MENTOR" ? (
                  <ShieldCheck className="h-3 w-3 text-neon-amber" />
                ) : (
                  <UserRound className="h-3 w-3 text-muted-foreground" />
                )}
                {session.name}
              </span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-neon-magenta/40 hover:text-neon-magenta"
                  aria-label="ログアウト"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">ログアウト</span>
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="ml-2 inline-flex items-center gap-1 rounded-lg border border-neon-cyan/40 bg-neon-cyan/5 px-3 py-1.5 font-mono text-xs font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <LogIn className="h-3.5 w-3.5" />
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
