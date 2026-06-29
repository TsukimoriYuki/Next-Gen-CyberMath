import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ ok: false, authenticated: false });
  return Response.json({ ok: true, name: session.name, role: session.role });
}
