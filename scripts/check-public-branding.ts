// 公開ページのブランド表記・開発者向け文言を検査する。
// npm run qa:public-branding
//
// Deep Research評価で、フッターの「MVP build」と、"Cyber Math" / "CYBER OS" の
// ブランド混線が指摘された。公開ブランドは "Cyber Math Next-Gen"（src/lib/site.ts の
// SITE_NAME）に統一し、"CYBER OS" は公開ページの主見出し・titleに出さない。
//
// 検査内容:
//  - src/lib/site.ts の SITE_NAME が "Cyber Math Next-Gen" である
//  - 公開ソース（src/app, src/components）に "MVP build" が出ない
//  - 公開ソースの独立した "MVP" 表記（開発者向け表現）が出ない
//    ("MVP" が正当な文脈で使われるコード内コメントは対象外)
//  - "CYBER OS" が公開ページ（title/見出し/OGタイトル）に出ない
//  - "デュアルコア学習プラットフォーム" が公開ページに出ない

import fs from "node:fs";
import path from "node:path";
import { SITE_NAME } from "../src/lib/site";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function listFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFilesRecursive(full);
    return [full];
  });
}

check(SITE_NAME === "Cyber Math Next-Gen", `SITE_NAME should be "Cyber Math Next-Gen", got "${SITE_NAME}"`);

const scanDirs = [path.join(ROOT, "src/app"), path.join(ROOT, "src/components")];
const files = scanDirs.flatMap(listFilesRecursive).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isComment = /^\s*(\/\/|\*|\/\*)/.test(line);
    if (isComment) continue; // コード内コメントは開発者向けメモとして許容する

    if (line.includes("MVP build")) {
      issues.push(`${rel}:${i + 1} contains "MVP build" in rendered/user-facing code`);
    }
    if (/\bMVP\b/.test(line) && !line.includes("MVP build")) {
      issues.push(`${rel}:${i + 1} contains a bare "MVP" reference outside a comment — check it isn't rendered to users`);
    }
    if (line.includes("CYBER OS") || line.includes("Cyber OS")) {
      issues.push(`${rel}:${i + 1} contains "CYBER OS" — public branding should use ${SITE_NAME}`);
    }
    if (line.includes("デュアルコア学習プラットフォーム")) {
      issues.push(`${rel}:${i + 1} contains "デュアルコア学習プラットフォーム" — should not be the public-facing brand tagline`);
    }
  }
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`public-branding check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(`public-branding check passed (SITE_NAME="${SITE_NAME}", no MVP/CYBER OS/デュアルコア leaks found).`);
  }
}
