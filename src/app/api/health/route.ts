import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let database = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = true;
  } catch {
    database = false;
  }

  return Response.json(
    {
      status: database ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      version:
        process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 12) ??
        process.env.npm_package_version ??
        "unknown",
      database,
    },
    {
      status: database ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
