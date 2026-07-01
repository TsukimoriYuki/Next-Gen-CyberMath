// /admin 配下が一般公開されていないことを静的に検査する。
// npm run qa:admin
//
// 検査内容:
//  - /admin/**/page.tsx が全て getSession() によるロールガード（redirect含む）を持つか
//  - /admin へのリンクが、admin 自身のコンポーネント以外（公開ナビ・トップ・フッター等）に出ていないか
//  - robots.ts が /admin/ を disallow しているか
//  - sitemap.ts に /admin 配下のルートが含まれていないか
//
// 実際にログインしていない状態で /admin/lectures にアクセスして
// リダイレクトされることまでは確認できない（サーバー起動が必要）。
// その確認は Playwright の e2e QA (npm run qa:routes:e2e) 側で行う。

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function listFilesRecursive(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFilesRecursive(full);
    return [full];
  });
}

// ── /admin/**/page.tsx がロールガードを持つか ─────────────────────────────
const adminDir = path.join(ROOT, "src/app/admin");
const adminPageFiles = fs.existsSync(adminDir)
  ? listFilesRecursive(adminDir).filter((f) => f.endsWith("page.tsx"))
  : [];

check(adminPageFiles.length > 0, "no page.tsx found under src/app/admin — is the directory structure as expected?");

for (const file of adminPageFiles) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");
  check(
    /getSession\s*\(/.test(content),
    `${rel} does not call getSession() — it may be reachable without authentication`,
  );
  check(
    /redirect\s*\(/.test(content),
    `${rel} has no redirect() call — a failed auth check would not send the visitor anywhere safe`,
  );
  check(
    /role\s*!==\s*["']MENTOR["']|role\s*===\s*["']MENTOR["']/.test(content),
    `${rel} does not check session.role === "MENTOR" — any logged-in user (not just mentors) may reach it`,
  );
}

// ── 公開UI（admin 自身を除く）から /admin へのリンクが出ていないか ─────────
const srcDir = path.join(ROOT, "src");
const allSourceFiles = listFilesRecursive(srcDir).filter(
  (f) => (f.endsWith(".tsx") || f.endsWith(".ts")) && !f.startsWith(adminDir),
);
for (const file of allSourceFiles) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");
  const isAdminOwnComponent = rel.includes(`components${path.sep}lectures${path.sep}LectureEditor`);
  if (isAdminOwnComponent) continue; // 管理画面自身の内部ナビは対象外
  check(
    !/href=["'`]\/admin\b/.test(content),
    `${rel} links to /admin from outside the admin UI — this exposes the admin tool from public pages`,
  );
}

// ── robots.ts / sitemap.ts ─────────────────────────────────────────────
const robotsPath = path.join(ROOT, "src/app/robots.ts");
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8");
  check(/["'`]\/admin\/?["'`]/.test(robots), "src/app/robots.ts does not disallow /admin/ from crawling");
}

const sitemapPath = path.join(ROOT, "src/app/sitemap.ts");
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  check(!/\/admin/.test(sitemap), "src/app/sitemap.ts references /admin — admin routes should never be listed in the sitemap");
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`admin-access check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(
      `admin-access check passed (${adminPageFiles.length} admin page(s) all role-gated, no public links, robots/sitemap clean).`,
    );
  }
}
