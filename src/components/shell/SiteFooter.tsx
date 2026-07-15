import Link from "next/link";
import { Sigma } from "lucide-react";
import { PUBLIC_INFO_LINKS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-container flex flex-col gap-6 py-9 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <Sigma className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-950">{SITE_NAME}</p>
            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
              教科ごとの講義、問題演習、試験対策、復習をつなぐ学習サービスです。
            </p>
            <p className="mt-2 text-xs text-slate-600">
              © {new Date().getFullYear()} {SITE_NAME}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-3 text-xs" aria-label="サイト情報">
          {PUBLIC_INFO_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
