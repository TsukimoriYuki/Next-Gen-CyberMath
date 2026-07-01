// 法務・運営ページ（プライバシー・利用規約・お問い合わせ）に、
// 「正式公開時に更新します」的な弱い先送り文言が残っていないかを検査する。
// npm run qa:legal-pages
//
// Deep Research評価で、法務ページが「ページはあるが正式運用未満に見える」と
// 指摘された。事実と違うことは書かないが、「あとで更新します」感を残さない。

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function read(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

const TARGET_FILES = ["src/app/privacy/page.tsx", "src/app/terms/page.tsx", "src/app/contact/page.tsx"];

const WEAK_PHRASES = [
  "正式公開時",
  "正式運用時",
  "あとで更新",
  "準備中です",
  "正式な公開運用時",
  "追って掲載",
  "追ってお知らせ",
];

for (const file of TARGET_FILES) {
  if (!fs.existsSync(path.join(ROOT, file))) {
    issues.push(`${file} does not exist`);
    continue;
  }
  const content = read(file);
  for (const phrase of WEAK_PHRASES) {
    check(!content.includes(phrase), `${file} still contains the weak/deferred phrase "${phrase}"`);
  }
}

// お問い合わせページには、報告カテゴリ（誤り報告・一般問い合わせ・削除依頼・脆弱性報告）と、
// 現在の運営体制（個人運営・β運用等）についての正直な説明が必要。
const contact = read("src/app/contact/page.tsx");
for (const text of ["教材内容の誤り報告", "一般のお問い合わせ", "削除依頼", "脆弱性報告"]) {
  check(contact.includes(text), `src/app/contact/page.tsx should include the "${text}" category`);
}
check(
  contact.includes("個人") || contact.includes("β運用") || contact.includes("先行公開"),
  "src/app/contact/page.tsx should honestly state the current operating scope (individually run / beta / early access)",
);

report();

function report() {
  if (issues.length > 0) {
    console.error(`legal-pages check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log("legal-pages check passed (no deferred/weak wording in privacy/terms/contact).");
  }
}
