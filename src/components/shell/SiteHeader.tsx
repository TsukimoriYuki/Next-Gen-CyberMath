import Link from "next/link";
import { Sigma, Swords, LogIn, LogOut, ShieldCheck, UserRound } from "lucide-react";
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

          {/* 師範リンク（MENTOR のみ表示） */}
          {session?.role === "MENTOR" && (
            <Link
              href="/mentor"
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-semibold text-neon-amber transition-colors hover:bg-neon-amber/10"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              師範
            </Link>
          )}

          {/* ユーザー表示 / ログインボタン */}
          {session ? (
            <div className="ml-2 flex items-center gap-2">
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
                  <span className="hidden sm:inline">退室</span>
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="ml-2 inline-flex items-center gap-1 rounded-lg border border-neon-cyan/40 bg-neon-cyan/5 px-3 py-1.5 font-mono text-xs font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/15"
            >
              <LogIn className="h-3.5 w-3.5" />
              入室
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
