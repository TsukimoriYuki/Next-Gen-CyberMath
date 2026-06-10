import { PROBLEMS } from "@/data/problems";

// GET /api/abyss/gacha — Returns a random ABYSS-tier problem as JSON.
export async function GET() {
  const pool = PROBLEMS.filter((p) => p.tier === "ABYSS");

  if (pool.length === 0) {
    return Response.json({ ok: false, error: "No ABYSS problems found" }, { status: 404 });
  }

  const idx = Math.floor(Math.random() * pool.length);
  const problem = pool[idx];

  return Response.json({ ok: true, problem });
}
