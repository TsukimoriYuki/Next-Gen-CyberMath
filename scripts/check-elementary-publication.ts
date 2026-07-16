import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { ELEMENTARY_SITE } from "../src/data/elementary";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import {
  evaluateElementaryPublication,
  isElementaryResourceDiscoverable,
  resolveElementaryPublicationRuntime,
  type ElementaryPublicationRuntime,
} from "../src/lib/elementary-publication";
import { SUBJECTS } from "../src/data/subjects";
import { evaluateSubjectPublication } from "../src/lib/subject-publication";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

function assertAccess(
  status: string,
  runtime: ElementaryPublicationRuntime,
  expected: boolean,
  internalAccess = false,
) {
  const decision = evaluateElementaryPublication(status, runtime, { internalAccess });
  check(decision.allowed === expected, `${status} in ${runtime} expected allowed=${expected}`);
}

async function main() {
  assertAccess("hidden", "development", true);
  assertAccess("hidden", "test", true);
  for (const runtime of ["preview", "production"] as const) {
    assertAccess("hidden", runtime, false);
  }
  assertAccess("internal", "development", true);
  assertAccess("internal", "test", true);
  assertAccess("internal", "production", false);
  assertAccess("internal", "production", true, true);
  for (const status of ["beta", "public"] as const) {
    for (const runtime of ["development", "preview", "production", "test"] as const) {
      assertAccess(status, runtime, true);
    }
  }
  for (const runtime of ["development", "preview", "production", "test"] as const) {
    assertAccess("unknown", runtime, false);
  }

  check(resolveElementaryPublicationRuntime({ NODE_ENV: "development" }) === "development", "development runtime resolution failed");
  check(resolveElementaryPublicationRuntime({ NODE_ENV: "production", VERCEL_ENV: "preview" }) === "preview", "preview must remain production-like");
  check(resolveElementaryPublicationRuntime({ NODE_ENV: "test" }) === "test", "test runtime resolution failed");
  check(!isElementaryResourceDiscoverable("hidden"), "hidden elementary content must not be discoverable");
  check(!isElementaryResourceDiscoverable("internal"), "internal elementary content must not be discoverable");
  check(isElementaryResourceDiscoverable("beta"), "beta elementary content should be discoverable when enabled");
  check(ELEMENTARY_SITE.publicationStatus === "hidden", "elementary site publication status changed from hidden");
  check(
    SUBJECTS.every(
      (subject) => evaluateSubjectPublication(subject, undefined, "production").allowed,
    ),
    "elementary publication logic must not change high-school publication decisions",
  );

  const sitemapUrls = (await sitemap()).map((entry) => entry.url);
  check(!sitemapUrls.some((url) => url.includes("/elementary")), "hidden elementary route leaked into sitemap");
  check(!PRIMARY_NAVIGATION.some((item) => item.href.startsWith("/elementary")), "hidden elementary route leaked into global navigation");

  const root = process.cwd();
  const layoutSource = fs.readFileSync(path.join(root, "src/app/elementary/layout.tsx"), "utf8");
  check(layoutSource.includes("requireElementaryPageAccess()"), "elementary layout is missing its route guard");
  check(layoutSource.includes("index: false") && layoutSource.includes("follow: false"), "elementary metadata must be noindex and nofollow");

  if (issues.length) {
    console.error(`elementary publication QA FAILED: ${issues.length} issue(s).`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
    return;
  }
  console.log("elementary publication QA passed: hidden routes are authoring-only, fail closed, and absent from discovery.");
}

void main();
