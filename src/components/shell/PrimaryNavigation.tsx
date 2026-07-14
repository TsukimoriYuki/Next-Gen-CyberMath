"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogIn, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import {
  getActiveNavigationId,
  PRIMARY_NAVIGATION,
} from "@/data/navigation";

type NavigationSession = Readonly<{
  name: string;
  role: "MENTOR" | "STUDENT";
}> | null;

export function PrimaryNavigation({ session }: { session: NavigationSession }) {
  const pathname = usePathname();
  const activeId = getActiveNavigationId(pathname);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <nav aria-label="主要ナビゲーション" className="hidden items-center gap-0.5 lg:flex">
        {PRIMARY_NAVIGATION.map((item) => (
          <NavigationLink
            key={item.id}
            href={item.href}
            label={item.label}
            active={activeId === item.id}
          />
        ))}
      </nav>

      <div className="hidden items-center gap-2 lg:flex">
        {session?.role === "MENTOR" && (
          <Link href="/mentor" className="header-utility-link">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            指導者
          </Link>
        )}
        <AccountAction session={session} />
      </div>

      <button
        ref={menuButtonRef}
        type="button"
        data-testid="mobile-menu-button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="mobile-primary-navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:hidden"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="mobile-primary-navigation"
          data-testid="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-sm lg:hidden"
        >
          <nav aria-label="モバイル主要ナビゲーション" className="page-container py-4">
            <div className="grid gap-1 sm:grid-cols-2">
              {PRIMARY_NAVIGATION.map((item) => (
                <NavigationLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  active={activeId === item.id}
                  onNavigate={() => setOpen(false)}
                  mobile
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
              {session?.role === "MENTOR" && (
                <Link href="/mentor" onClick={() => setOpen(false)} className="header-utility-link">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  指導者メニュー
                </Link>
              )}
              <AccountAction session={session} onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
function NavigationLink({
  href,
  label,
  active,
  mobile = false,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`${mobile ? "min-h-11 justify-between px-4" : "px-2.5 py-2"} inline-flex items-center rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
        active
          ? "bg-blue-50 text-blue-800"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
    >
      {label}
      {mobile && active && <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />}
    </Link>
  );
}

function AccountAction({
  session,
  onNavigate,
}: {
  session: NavigationSession;
  onNavigate?: () => void;
}) {
  if (!session) {
    return (
      <Link href="/auth/login" onClick={onNavigate} className="header-account-link">
        <LogIn className="h-4 w-4" aria-hidden="true" />
        ログイン
      </Link>
    );
  }
  return (
    <form action="/api/auth/logout" method="POST">
      <button type="submit" className="header-utility-link" title={`${session.name}としてログイン中`}>
        <LogOut className="h-4 w-4" aria-hidden="true" />
        ログアウト
      </button>
    </form>
  );
}
