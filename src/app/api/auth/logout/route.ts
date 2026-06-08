import { clearSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  await clearSessionCookie();
  const origin = new URL(req.url).origin;
  return Response.redirect(`${origin}/`, 303);
}
