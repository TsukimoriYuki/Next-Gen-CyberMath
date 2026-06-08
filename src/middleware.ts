// Edge Runtime で動作するルートガード。
// jose のみ使用（bcryptjs / Prisma は Node.js 専用のため middleware 内では不可）。

import { type NextRequest, NextResponse } from "next/server";
import { verifyJWT, SESSION_COOKIE } from "@/lib/auth";

/** ガード対象パターン */
const MENTOR_PATTERN = /^\/mentor(\/|$)/;
const AUTH_PATTERN   = /^\/auth(\/|$)/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value ?? null;
  const session = token ? await verifyJWT(token) : null;

  // /mentor/** — 未ログイン or STUDENT は弾く
  if (MENTOR_PATTERN.test(pathname)) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (session.role !== "MENTOR") {
      const url = req.nextUrl.clone();
      url.pathname = "/dojo";
      return NextResponse.redirect(url);
    }
  }

  // /auth/** — 既にログイン済みなら / へ
  if (AUTH_PATTERN.test(pathname) && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mentor/:path*", "/auth/:path*"],
};
