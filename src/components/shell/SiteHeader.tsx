import { Sigma } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { SITE_NAME } from "@/lib/site";
import { PrimaryNavigation } from "./PrimaryNavigation";
import { RouteAwareSiteHeader } from "./RouteAwareSiteHeader";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <RouteAwareSiteHeader>
      <header data-testid="site-header" className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="page-container relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label={`${SITE_NAME} ホーム`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <Sigma className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">
            {SITE_NAME}
          </span>
        </Link>

        <PrimaryNavigation
          session={session ? { name: session.name, role: session.role } : null}
        />
      </div>
      </header>
    </RouteAwareSiteHeader>
  );
}
