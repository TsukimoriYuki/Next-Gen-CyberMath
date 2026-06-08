// JWT 認証ユーティリティ — jose を使用（Edge Runtime 対応）。
// bcryptjs は Node.js ランタイム専用のため API ルートで直接 import すること。
//
// 環境変数:
//   JWT_SECRET       — 署名鍵（本番では最低 32 文字のランダム文字列）
//   MENTOR_PASSCODE  — 師範コード（登録時に一致すれば MENTOR ロールを付与）

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

/** セッション Cookie 名。 */
export const SESSION_COOKIE = "cy_session";

/** JWT の有効期限（7日）。 */
const EXPIRES_IN = 60 * 60 * 24 * 7; // seconds

/** JWT ペイロード（アプリ固有フィールド）。 */
export interface SessionPayload extends JWTPayload {
  sub: string;  // userId
  name: string;
  role: "MENTOR" | "STUDENT";
}

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

/** JWT を署名して返す。API ルートで使用。 */
export async function signJWT(payload: Omit<SessionPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_IN}s`)
    .sign(getSecret());
}

/** JWT を検証してペイロードを返す。無効なら null。 */
export async function verifyJWT(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/** httpOnly Cookie にセッションを書き込む（API ルート / Server Action 用）。 */
export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: EXPIRES_IN,
    path: "/",
  });
}

/** セッション Cookie を削除する。 */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Server Component / Server Action からセッションを取得する。認証されていなければ null。 */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyJWT(token);
}
