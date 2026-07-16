import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const migrationName = "20260716000000_initial_schema";
const sql = read(`prisma/migrations/${migrationName}/migration.sql`);

for (const destructive of ["DROP TABLE", "DROP SCHEMA", "TRUNCATE", "DELETE FROM"]) {
  assert(!sql.toUpperCase().includes(destructive), `initial migration contains ${destructive}`);
}
for (const table of [
  "Problem",
  "ExplanationStep",
  "Lesson",
  "User",
  "ExamAttempt",
  "EmergencyMission",
  "Message",
  "EnglishAttempt",
  "ReviewItem",
  "DailyChallenge",
]) {
  assert(sql.includes(`CREATE TABLE "${table}"`), `initial migration is missing ${table}`);
}
assert(sql.includes("ADD CONSTRAINT"), "initial migration must include foreign keys");
assert.equal(read("prisma/migrations/migration_lock.toml").trim(), 'provider = "postgresql"');

const railway = JSON.parse(read("railway.json"));
assert.equal(railway.build.buildCommand, "npm run build");
assert.deepEqual(railway.deploy.preDeployCommand, ["npx prisma db push"]);
assert.equal(railway.deploy.startCommand, "npm run start");

const guide = read("docs/deployment/prisma-migration.md");
for (const required of [
  migrationName,
  "migrate resolve --applied",
  "migrate deploy",
  "バックアップ",
  "baseline登録が未実施",
]) {
  assert(guide.includes(required), `migration guide is missing ${required}`);
}

const health = read("src/app/api/health/route.ts");
for (const forbidden of ["DATABASE_URL", "DB_HOST", "DB_USER", "MENTOR_PASSCODE", "JWT_SECRET"]) {
  assert(!health.includes(forbidden), `health endpoint references forbidden data: ${forbidden}`);
}
for (const field of ["status", "timestamp", "version", "database"]) {
  assert(health.includes(field), `health endpoint is missing ${field}`);
}

const envExample = read(".env.example");
for (const variable of ["DATABASE_URL=", "JWT_SECRET=", "MENTOR_PASSCODE="]) {
  assert(envExample.includes(variable), `.env.example is missing ${variable}`);
}
assert(!envExample.includes("postgresql://"), ".env.example must not contain a database value");

console.log("Prisma migration QA passed: initial CREATE-only SQL, baseline guide, Railway staging config, health response, and env names verified.");
