import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { ELEMENTARY_SITE } from "../src/data/elementary";
import {
  ELEMENTARY_READINESS_AREAS,
  ELEMENTARY_RELEASE_GATES,
} from "../src/data/elementary/readiness";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import {
  buildElementaryPublicationReadiness,
  normalizeElementaryReadinessStatus,
} from "../src/lib/elementary-readiness";
import { buildCombinedContentInventory } from "./content-inventory-lib";

type Issue = Readonly<{
  checkId: string;
  area: string;
  ruleId: string;
  expected: unknown;
  actual: unknown;
  source: string;
}>;

const issues: Issue[] = [];
const root = process.cwd();

function check(
  condition: boolean,
  issue: Issue,
) {
  if (!condition) issues.push(issue);
}

function duplicateIds(ids: readonly string[]) {
  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))].sort();
}

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

async function main() {
  const packageJson = JSON.parse(read("package.json")) as {
    scripts?: Record<string, string>;
  };
  const readiness = buildElementaryPublicationReadiness();
  const combined = buildCombinedContentInventory("phase-k-readiness", "2026-07-18T00:00:00.000Z");
  const guardianSource = read("src/app/elementary/for-guardians/page.tsx");
  const readinessPageSource = read("src/app/elementary/showcase/publication-readiness/page.tsx");
  const hiddenSpecSource = read("e2e/elementary-pilot-hidden.spec.ts");
  const prohibitedClaims = [
    "完全対応",
    "教科書完全準拠",
    "必ず成績が上がる",
    "絶対に理解できる",
    "全国の小学3年生に対応済み",
    "個別最適化済み",
    "小学3年生完成",
    "正式公開可能",
    "全国対応済み",
    "保証",
    "必ず伸びる",
  ];
  const statusValues = new Set(["pass", "warning", "fail", "not-applicable", "not-reviewed"]);
  const humanReviewValues = new Set(["not-reviewed", "reviewed", "approved", "changes-requested"]);

  const gateDuplicates = duplicateIds(ELEMENTARY_RELEASE_GATES.map((gate) => gate.id));
  check(gateDuplicates.length === 0, {
    checkId: gateDuplicates.join(",") || "release-gates",
    area: "publication",
    ruleId: "readiness-id-unique",
    expected: "duplicate ID 0",
    actual: gateDuplicates,
    source: "src/data/elementary/readiness.ts",
  });

  const knownAreas = new Set(ELEMENTARY_READINESS_AREAS);
  for (const gate of ELEMENTARY_RELEASE_GATES) {
    check(knownAreas.has(gate.area), {
      checkId: gate.id,
      area: gate.area,
      ruleId: "area-resolves",
      expected: "registered readiness area",
      actual: gate.area,
      source: gate.source,
    });
    check(statusValues.has(gate.defaultStatus), {
      checkId: gate.id,
      area: gate.area,
      ruleId: "status-valid",
      expected: [...statusValues],
      actual: gate.defaultStatus,
      source: gate.source,
    });
    if (gate.humanReview) {
      check(humanReviewValues.has(gate.humanReview.status), {
        checkId: gate.id,
        area: gate.area,
        ruleId: "human-review-status-valid",
        expected: [...humanReviewValues],
        actual: gate.humanReview.status,
        source: gate.source,
      });
      check(
        gate.humanReview.reviewerType === "human-owner" &&
          gate.humanReview.reviewSource === "user-explicit-review",
        {
          checkId: gate.id,
          area: gate.area,
          ruleId: "human-review-provenance",
          expected: "human-owner / user-explicit-review",
          actual: `${gate.humanReview.reviewerType} / ${gate.humanReview.reviewSource}`,
          source: gate.source,
        },
      );
    }
    if (gate.sourceQa) {
      check(Boolean(packageJson.scripts?.[gate.sourceQa]), {
        checkId: gate.id,
        area: gate.area,
        ruleId: "source-qa-resolves",
        expected: `package script ${gate.sourceQa}`,
        actual: packageJson.scripts?.[gate.sourceQa] ?? "missing",
        source: "package.json",
      });
    }
  }

  const invalidStatus = normalizeElementaryReadinessStatus("approved");
  check(invalidStatus === "fail", {
    checkId: "unknown-status",
    area: "publication",
    ruleId: "unknown-status-fail-closed",
    expected: "fail",
    actual: invalidStatus,
    source: "src/lib/elementary-readiness.ts",
  });
  const forcedFailure = buildElementaryPublicationReadiness({ "qa-registry": "fail" });
  check(forcedFailure.recommendation.beta === "hold", {
    checkId: "qa-registry",
    area: "publication",
    ruleId: "fail-blocks-beta",
    expected: "hold",
    actual: forcedFailure.recommendation.beta,
    source: "src/lib/elementary-readiness.ts",
  });
  const forcedNotReviewed = buildElementaryPublicationReadiness({ "review-math-content": "not-reviewed" });
  check(forcedNotReviewed.recommendation.beta === "hold", {
    checkId: "manual-reviews",
    area: "publication",
    ruleId: "not-reviewed-is-not-pass",
    expected: "hold",
    actual: forcedNotReviewed.recommendation.beta,
    source: "src/lib/elementary-readiness.ts",
  });
  const expectedHumanReviews = [
    ["review-child-safety", "approved"],
    ["review-guardian-information", "approved"],
    ["review-asset-rights", "approved"],
    ["review-release-decision", "reviewed"],
    ["review-math-content", "approved"],
    ["review-japanese-content", "approved"],
    ["review-social-content", "approved"],
  ] as const;
  for (const [id, expected] of expectedHumanReviews) {
    const gate = ELEMENTARY_RELEASE_GATES.find((candidate) => candidate.id === id);
    check(gate?.humanReview?.status === expected, {
      checkId: id,
      area: gate?.area ?? "unresolved",
      ruleId: "user-review-reflected",
      expected,
      actual: gate?.humanReview?.status ?? "not-reviewed",
      source: "src/data/elementary/readiness.ts",
    });
  }
  const readinessCountExpectations = [
    ["pass", readiness.counts.pass, 33],
    ["warning", readiness.counts.warning, 2],
    ["fail", readiness.counts.fail, 0],
    ["not-reviewed", readiness.counts["not-reviewed"], 0],
  ] as const;
  for (const [id, actual, expected] of readinessCountExpectations) {
    check(actual === expected, {
      checkId: `readiness-count-${id}`,
      area: "publication",
      ruleId: "readiness-count",
      expected,
      actual,
      source: "src/lib/elementary-readiness.ts",
    });
  }

  check(fs.existsSync(path.join(root, "src/app/elementary/for-guardians/page.tsx")), {
    checkId: "guardian-page",
    area: "guardian-information",
    ruleId: "guardian-page-exists",
    expected: true,
    actual: false,
    source: "src/app/elementary/for-guardians/page.tsx",
  });
  check(ELEMENTARY_SITE.publicationStatus === "hidden", {
    checkId: "publication-status",
    area: "publication",
    ruleId: "hidden-maintained",
    expected: "hidden",
    actual: ELEMENTARY_SITE.publicationStatus,
    source: "src/data/elementary/index.ts",
  });
  check(
    readiness.recommendation.publicationStatus === "hidden" && !readinessPageSource.includes("publicationStatus: \"beta\""),
    {
      checkId: "no-auto-publish",
      area: "publication",
      ruleId: "beta-not-automatic",
      expected: "hidden and no beta assignment",
      actual: readiness.recommendation.publicationStatus,
      source: "src/lib/elementary-readiness.ts",
    },
  );

  const sitemapUrls = (await sitemap()).map((entry) => entry.url);
  check(!sitemapUrls.some((url) => url.includes("/elementary")), {
    checkId: "sitemap",
    area: "publication",
    ruleId: "sitemap-excluded",
    expected: "0 elementary URLs",
    actual: sitemapUrls.filter((url) => url.includes("/elementary")),
    source: "src/app/sitemap.ts",
  });
  check(!PRIMARY_NAVIGATION.some((item) => item.href.startsWith("/elementary")), {
    checkId: "global-navigation",
    area: "publication",
    ruleId: "navigation-excluded",
    expected: "0 elementary links",
    actual: PRIMARY_NAVIGATION.filter((item) => item.href.startsWith("/elementary")),
    source: "src/data/navigation.ts",
  });
  for (const route of [
    "/elementary/for-guardians",
    "/elementary/showcase/publication-readiness",
  ]) {
    check(hiddenSpecSource.includes(`\"${route}\"`), {
      checkId: route,
      area: "publication",
      ruleId: "production-404-covered",
      expected: "route in hidden Playwright spec",
      actual: "missing",
      source: "e2e/elementary-pilot-hidden.spec.ts",
    });
  }

  const inventoryExpectations = [
    ["lesson-count", readiness.lessonCount, 3],
    ["elementary-problem-count", combined.combined.elementaryProblemCount, 24],
    ["high-school-problem-count", combined.combined.highSchoolProblemCount, 1_348],
    ["combined-problem-count", combined.combined.problemCount, 1_372],
  ] as const;
  for (const [id, actual, expected] of inventoryExpectations) {
    check(actual === expected, {
      checkId: id,
      area: "content-inventory",
      ruleId: "inventory-count",
      expected,
      actual,
      source: "scripts/content-inventory-lib.ts",
    });
  }

  for (const claim of prohibitedClaims) {
    check(!guardianSource.includes(claim) && !readinessPageSource.includes(claim), {
      checkId: claim,
      area: "guardian-information",
      ruleId: "prohibited-marketing-claim",
      expected: "absent",
      actual: "present",
      source: "src/app/elementary/for-guardians/page.tsx",
    });
  }
  for (const [id, phrase] of [
    ["pilot-copy", "pilot教材"],
    ["privacy-copy", "個人情報入力を求めません"],
    ["progress-copy", "学習進捗をサーバーやデータベースへ保存していません"],
    ["ai-grading-copy", "AIによる自由記述の自動採点は使っていません"],
    ["unimplemented-copy", "まだ実装していないこと"],
  ] as const) {
    check(guardianSource.includes(phrase), {
      checkId: id,
      area: id === "privacy-copy" || id === "progress-copy" ? "privacy" : "guardian-information",
      ruleId: "guardian-explanation-present",
      expected: phrase,
      actual: "missing",
      source: "src/app/elementary/for-guardians/page.tsx",
    });
  }
  check(readiness.recommendation.formal === "hold", {
    checkId: "formal-readiness",
    area: "publication",
    ruleId: "formal-not-ready",
    expected: "hold",
    actual: readiness.recommendation.formal,
    source: "src/lib/elementary-readiness.ts",
  });
  check(
    readinessPageSource.includes("限定beta準備完了") &&
      readinessPageSource.includes("小学3年生全体対応ではなく") &&
      readinessPageSource.includes("β公開") &&
      readinessPageSource.includes("正式公開") &&
      readiness.recommendation.beta === "limited-beta-ready" &&
      readiness.recommendation.formal === "hold",
    {
      checkId: "release-stage-separation",
      area: "publication",
      ruleId: "beta-formal-separated",
      expected: "separate gates and labels",
      actual: "missing separation",
      source: "src/app/elementary/showcase/publication-readiness/page.tsx",
    },
  );

  if (issues.length) {
    console.error(`elementary publication readiness QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) {
      console.error(
        `- check ID=${issue.checkId} | area=${issue.area} | rule ID=${issue.ruleId} | expected=${JSON.stringify(issue.expected)} | actual=${JSON.stringify(issue.actual)} | source=${issue.source}`,
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `elementary publication readiness QA passed: ${readiness.areas.length} areas, pass ${readiness.counts.pass}, warning ${readiness.counts.warning}, fail ${readiness.counts.fail}, not-reviewed ${readiness.counts["not-reviewed"]}; beta=${readiness.recommendation.beta}, formal=${readiness.recommendation.formal}, publication=${readiness.publicationStatus}.`,
  );
}

void main();
