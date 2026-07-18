import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { ELEMENTARY_SITE } from "../src/data/elementary";
import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import { ELEMENTARY_RELEASE_GATES } from "../src/data/elementary/readiness";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import { buildElementaryContentInventory } from "../src/lib/elementary-inventory";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import { buildElementaryLimitedBetaRelease } from "../src/lib/elementary-release";
import { buildElementaryPublicationReadiness } from "../src/lib/elementary-readiness";
import { buildCombinedContentInventory } from "./content-inventory-lib";

type Issue = Readonly<{
  checkId: string;
  area: "review" | "technical" | "content" | "release" | "high-school";
  expected: unknown;
  actual: unknown;
  source: string;
  blocking: boolean;
}>;

const issues: Issue[] = [];
const root = process.cwd();

function check(condition: boolean, issue: Issue) {
  if (!condition) issues.push(issue);
}

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

async function main() {
  const release = buildElementaryLimitedBetaRelease();
  const readiness = buildElementaryPublicationReadiness();
  const inventory = buildElementaryContentInventory();
  const combined = buildCombinedContentInventory("phase-k-limited-beta", "2026-07-18T00:00:00.000Z");
  const packageJson = JSON.parse(read("package.json")) as { scripts?: Record<string, string> };
  const releasePageSource = read("src/app/elementary/showcase/limited-beta-release/page.tsx");
  const productionSpecSource = read("e2e/elementary-limited-beta-production.spec.ts");
  const dataSource = read("src/data/elementary/release.ts");

  const expectedReviews = [
    ["review-math-content", "approved"],
    ["review-japanese-content", "approved"],
    ["review-social-content", "approved"],
    ["review-child-safety", "approved"],
    ["review-guardian-information", "approved"],
    ["review-asset-rights", "approved"],
    ["review-release-decision", "reviewed"],
  ] as const;
  for (const [id, expected] of expectedReviews) {
    const gate = ELEMENTARY_RELEASE_GATES.find((candidate) => candidate.id === id);
    check(
      gate?.humanReview?.status === expected &&
        gate.humanReview.reviewerType === "human-owner" &&
        gate.humanReview.reviewSource === "user-explicit-review",
      {
        checkId: id,
        area: "review",
        expected: `${expected} from human-owner / user-explicit-review`,
        actual: gate?.humanReview ?? "missing",
        source: gate?.source ?? "src/data/elementary/readiness.ts",
        blocking: true,
      },
    );
  }
  check(readiness.counts["not-reviewed"] === 0, {
    checkId: "not-reviewed-zero", area: "review", expected: 0,
    actual: readiness.counts["not-reviewed"], source: "src/lib/elementary-readiness.ts", blocking: true,
  });

  const requiredQa = [
    "qa:elementary:registry",
    "qa:elementary:publication",
    "qa:elementary:lesson-blocks",
    "qa:elementary:kanji",
    "qa:elementary:assets",
    "qa:elementary:curriculum",
    "qa:elementary:pilot-lessons",
    "qa:elementary:pilot-problems",
    "qa:elementary:inventory",
    "qa:elementary:readiness",
  ] as const;
  const referencedQa = new Set(ELEMENTARY_RELEASE_GATES.flatMap((gate) => gate.sourceQa ? [gate.sourceQa] : []));
  for (const qa of requiredQa) {
    check(Boolean(packageJson.scripts?.[qa]) && (qa === "qa:elementary:readiness" || referencedQa.has(qa)), {
      checkId: qa, area: "technical", expected: "package script and resolved readiness reference",
      actual: packageJson.scripts?.[qa] ?? "missing", source: "package.json", blocking: true,
    });
  }
  for (const id of ["unresolved-reference-zero", "duplicate-id-zero", "a11y-serious-zero", "unsafe-svg-zero"]) {
    const gate = readiness.checks.find((candidate) => candidate.id === id);
    check(gate?.status === "pass", {
      checkId: id, area: "technical", expected: "pass", actual: gate?.status ?? "missing",
      source: gate?.source ?? "src/data/elementary/readiness.ts", blocking: true,
    });
  }

  const contentExpectations = [
    ["unit-count", inventory.totals.unitCount, 3],
    ["lesson-count", inventory.totals.lessonCount, 3],
    ["problem-count", inventory.totals.problemCount, 24],
    ["visual-asset-count", inventory.totals.visualAssetCount, 2],
  ] as const;
  for (const [id, actual, expected] of contentExpectations) {
    check(actual === expected, {
      checkId: id, area: "content", expected, actual,
      source: "src/lib/elementary-inventory.ts", blocking: true,
    });
  }
  for (const subject of ["math", "japanese", "social-studies"] as const) {
    const scope = inventory.subjects.find((item) => item.subject === subject);
    check(scope?.lessonCount === 1 && scope.problemCount === 8, {
      checkId: `subject-${subject}`, area: "content", expected: "1 lesson / 8 problems",
      actual: scope ? `${scope.lessonCount} / ${scope.problemCount}` : "missing",
      source: "src/lib/elementary-inventory.ts", blocking: true,
    });
  }
  check(
    inventory.totals.lessonCoverage.partial === 3 &&
      inventory.totals.lessonCoverage.covered === 0 &&
      inventory.totals.assessmentCoverage.partial === 3 &&
      inventory.totals.assessmentCoverage.covered === 0,
    {
      checkId: "curriculum-coverage", area: "content", expected: "lesson/assessment partial 3; covered 0",
      actual: { lesson: inventory.totals.lessonCoverage, assessment: inventory.totals.assessmentCoverage },
      source: "src/lib/elementary-inventory.ts", blocking: true,
    },
  );

  const releaseChecks = [
    ["current-status", ELEMENTARY_SITE.publicationStatus, "beta"],
    ["current-channel", release.currentChannel, "limited-beta"],
    ["target-channel", release.targetChannel, "limited-beta"],
    ["release-readiness", release.readiness, "ready"],
    ["release-recommendation", release.recommendation, "limited-beta-ready"],
    ["explicit-approval", release.explicitReleaseApproval, "approved"],
    ["approval-source", release.approvalSource, "user-explicit-approval"],
    ["approved-at", release.approvedAt, "2026-07-18"],
    ["release-state", release.releaseState, "active"],
    ["formal-release", release.formalReleaseRecommendation, "hold"],
  ] as const;
  for (const [id, actual, expected] of releaseChecks) {
    check(actual === expected, {
      checkId: id, area: "release", expected, actual,
      source: "src/data/elementary/release.ts", blocking: true,
    });
  }
  check(release.automaticRelease === false, {
    checkId: "automatic-release", area: "release", expected: false,
    actual: release.automaticRelease, source: "src/data/elementary/release.ts", blocking: true,
  });
  for (const [id, values] of [
    ["approved-scope", release.approvedScope],
    ["excluded-scope", release.excludedScope],
    ["rollback-conditions", release.rollbackConditions],
  ] as const) {
    check(values.length > 0 && new Set(values.map((value) => value.id)).size === values.length, {
      checkId: id, area: "release", expected: "non-empty unique entries",
      actual: values.map((value) => value.id), source: "src/data/elementary/release.ts", blocking: true,
    });
  }
  check(productionSpecSource.includes('"/elementary/showcase/limited-beta-release"'), {
    checkId: "production-hidden-route", area: "release", expected: "production 404 Playwright coverage",
    actual: "missing", source: "e2e/elementary-limited-beta-production.spec.ts", blocking: true,
  });
  const sitemapUrls = (await sitemap()).map((entry) => entry.url);
  check(!sitemapUrls.some((url) => url.includes("/elementary")), {
    checkId: "sitemap-excluded", area: "release", expected: "0 elementary URLs",
    actual: sitemapUrls.filter((url) => url.includes("/elementary")), source: "src/app/sitemap.ts", blocking: true,
  });
  check(!PRIMARY_NAVIGATION.some((item) => item.href.startsWith("/elementary")), {
    checkId: "navigation-excluded", area: "release", expected: "0 elementary links",
    actual: PRIMARY_NAVIGATION.filter((item) => item.href.startsWith("/elementary")), source: "src/data/navigation.ts", blocking: true,
  });
  check(!releasePageSource.includes("<button") && !releasePageSource.includes("<input"), {
    checkId: "no-browser-release-control", area: "release", expected: "no button or input",
    actual: "interactive release control found", source: "src/app/elementary/showcase/limited-beta-release/page.tsx", blocking: true,
  });

  const policy = getElementaryKanjiPolicy("grade-3");
  for (const [index, content] of [release.learnerDisplay.badge, ...release.learnerDisplay.messages].entries()) {
    const result = inspectElementaryText({
      content,
      grade: 3,
      audience: "learner",
      policy,
      context: "ui-copy",
      sourceLocation: "src/data/elementary/release.ts",
      contentId: "limited-beta-display",
      fieldPath: `learnerDisplay.${index}`,
    });
    check(result.violations.length === 0, {
      checkId: `learner-copy-${index}`, area: "content", expected: "grade-3 kanji violations 0",
      actual: result.violations, source: "src/data/elementary/release.ts", blocking: true,
    });
  }
  for (const claim of ["完全対応", "教科書完全準拠", "必ず成績が上がる", "小学3年生完成", "全国対応済み"]) {
    check(!dataSource.includes(claim) && !releasePageSource.includes(claim), {
      checkId: `unsupported-claim-${claim}`, area: "release", expected: "absent",
      actual: "present", source: "src/data/elementary/release.ts", blocking: true,
    });
  }

  for (const [id, actual, expected] of [
    ["high-school-problems", combined.combined.highSchoolProblemCount, 1_348],
    ["elementary-problems", combined.combined.elementaryProblemCount, 24],
    ["combined-problems", combined.combined.problemCount, 1_372],
  ] as const) {
    check(actual === expected, {
      checkId: id, area: "high-school", expected, actual,
      source: "scripts/content-inventory-lib.ts", blocking: true,
    });
  }

  if (issues.length) {
    console.error(`elementary limited beta release QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) {
      console.error(
        `- check ID=${issue.checkId} | area=${issue.area} | expected=${JSON.stringify(issue.expected)} | actual=${JSON.stringify(issue.actual)} | source=${issue.source} | blocking=${issue.blocking}`,
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log("limited beta release: active");
  console.log("formal release: hold");
}

void main();
