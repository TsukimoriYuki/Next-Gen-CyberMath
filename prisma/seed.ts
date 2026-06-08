import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import { PROBLEMS } from '../src/data/problems';
import { LESSONS } from '../src/data/lessons';
import { getDailyTriple } from '../src/lib/content'; // ← これを追加！

// .envファイルを読み込む
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding Cyber Math content…");

  // Clean slate (idempotent re-seed).
  await prisma.dailyChallenge.deleteMany();
  await prisma.explanationStep.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.lesson.deleteMany();

  for (const p of PROBLEMS) {
    console.log(`Inserting: ${p.slug}`);
    await prisma.problem.create({
      data: {
        slug: p.slug,
        title: p.title,
        unit: p.unit,
        difficulty: p.difficulty,
        statement: p.statement,
        tagline: p.tagline ?? null,
        hasGraph: p.hasGraph,
        graphConfig: p.graphKey ? { graphKey: p.graphKey } : undefined,
        relatedLessonSlug: p.relatedLessonSlug ?? null,
        tags: p.tags ?? [],
        // 道場メタ — `prisma db push` + `prisma generate` 後に型が有効になる。
        // @ts-ignore
        university: p.university ?? null,
        // @ts-ignore
        deviation: p.deviation ?? null,
        // @ts-ignore
        year: p.year ?? null,
        // @ts-ignore
        backgroundTag: p.backgroundTag ?? null,
        steps: {
          create: p.steps.map((s) => ({
            type: s.type,
            order: s.order,
            title: s.title,
            body: s.body,
            relatedLessonSlug: s.relatedLessonSlug ?? null,
          })),
        },
      },
    });
  }
  console.log(`  ✓ ${PROBLEMS.length} problems`);

  // Seed Concept Lessons.
  for (const l of LESSONS) {
    await prisma.lesson.create({
      data: {
        slug: l.slug,
        title: l.title,
        unit: l.unit,
        summary: l.summary ?? null,
        content: l.content,
        relatedProblemSlugs: l.relatedProblemSlugs ?? [],
        tags: l.tags ?? [],
      },
    });
  }
  console.log(`  ✓ ${LESSONS.length} lessons`);

  // Seed today's Daily Triple.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const triple = getDailyTriple(today);
  for (let i = 0; i < triple.length; i++) {
    const problem = await prisma.problem.findUnique({
      where: { slug: triple[i].slug },
    });
    if (!problem) continue;
    await prisma.dailyChallenge.create({
      data: { date: today, slot: i + 1, problemId: problem.id },
    });
  }
  console.log(`  ✓ Daily Triple for ${today.toISOString().slice(0, 10)}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
