import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import {
  buildPrimaryNavigation,
  HOME_PRIMARY_ACTIONS,
  PRIMARY_NAVIGATION,
  getActiveNavigationId,
} from "../src/data/navigation";
import {
  filterVisibleSubjectsByCapability,
  filterVisibleSubjects,
  PUBLIC_SUBJECTS,
  SUBJECTS,
  type SubjectConfig,
} from "../src/data/subjects";
import { PUBLIC_COMMON_TEST_SUBJECTS } from "../src/data/common-test";
import { PUBLIC_COURSE_SUBJECTS } from "../src/data/courses";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function unique<T>(items: readonly T[]): boolean {
  return new Set(items).size === items.length;
}

function routePagePath(href: string): string {
  return href === "/"
    ? path.join(ROOT, "src/app/page.tsx")
    : path.join(ROOT, "src/app", href.slice(1), "page.tsx");
}

function read(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function extractLiteralActionHrefs(source: string): string[] {
  return Array.from(source.matchAll(/href:\s*"([/#][^"]*)"/g), (match) => match[1]);
}

check(SUBJECTS.length > 0, "subject registry must not be empty");
check(unique(SUBJECTS.map((subject) => subject.id)), "subject IDs must be unique");
check(unique(SUBJECTS.map((subject) => subject.href)), "subject hrefs must be unique");
check(
  PUBLIC_SUBJECTS.length ===
    SUBJECTS.filter((subject) => subject.status === "public" || subject.status === "beta").length,
  "PUBLIC_SUBJECTS must contain exactly public and beta subjects",
);

const hiddenFixture: SubjectConfig = {
  id: "hidden-fixture",
  name: "非公開テスト",
  shortName: "非公開",
  href: "/hidden-fixture",
  description: "QA fixture",
  status: "hidden",
  capabilities: { courses: true, problems: true, exams: true, review: true },
};
check(
  !filterVisibleSubjects([...SUBJECTS, hiddenFixture]).some(
    (subject) => subject.id === hiddenFixture.id,
  ),
  "hidden subjects must be excluded from visible subject selectors",
);
for (const capability of ["courses", "problems", "exams", "review"] as const) {
  check(
    !filterVisibleSubjectsByCapability([...SUBJECTS, hiddenFixture], capability).some(
      (subject) => subject.id === hiddenFixture.id,
    ),
    `hidden subjects must be excluded from the ${capability} selector`,
  );
  const disabledCapabilityFixture: SubjectConfig = {
    ...hiddenFixture,
    id: `disabled-${capability}`,
    href: `/disabled-${capability}`,
    status: "public",
    capabilities: {
      courses: true,
      problems: true,
      exams: true,
      review: true,
      [capability]: false,
    },
  };
  check(
    !filterVisibleSubjectsByCapability(
      [...SUBJECTS, disabledCapabilityFixture],
      capability,
    ).some((subject) => subject.id === disabledCapabilityFixture.id),
    `subjects with ${capability}=false must be excluded from that intent selector`,
  );
}

const capabilitySectionIds = {
  courses: "learn",
  problems: "practice",
  exams: "exam",
  review: "review",
} as const;

for (const subject of PUBLIC_SUBJECTS) {
  const pagePath = routePagePath(subject.href);
  check(fs.existsSync(pagePath), `public subject ${subject.id} is missing ${pagePath}`);
  check(subject.name.trim().length > 0, `public subject ${subject.id} needs a name`);
  check(subject.description.trim().length > 0, `public subject ${subject.id} needs a description`);
  check(
    Object.values(subject.capabilities).some(Boolean),
    `public subject ${subject.id} must expose at least one capability`,
  );
  if (!fs.existsSync(pagePath)) continue;
  const source = fs.readFileSync(pagePath, "utf8");
  check(source.includes("<LearningPageHero"), `${subject.id} must use the shared subject hero`);
  check(source.includes("requireSubject("), `${subject.id} metadata must read the subject registry`);
  for (const [capability, sectionId] of Object.entries(capabilitySectionIds)) {
    if (!subject.capabilities[capability as keyof typeof subject.capabilities]) continue;
    check(
      source.includes(`id="${sectionId}"`),
      `${subject.id} declares ${capability} but has no ${sectionId} section`,
    );
  }
  const layoutPath = path.join(path.dirname(pagePath), "layout.tsx");
  check(fs.existsSync(layoutPath), `public subject ${subject.id} needs a route publication guard`);
  if (fs.existsSync(layoutPath)) {
    const layoutSource = fs.readFileSync(layoutPath, "utf8");
    check(
      layoutSource.includes("requireSubjectPageAccess"),
      `${subject.id} layout must reject a hidden subject`,
    );
  }
}

const intentHubCapabilities = {
  "src/app/learn/page.tsx": "courses",
  "src/app/practice/page.tsx": "problems",
  "src/app/exams/page.tsx": "exams",
  "src/app/review/page.tsx": "review",
} as const;
for (const [file, capability] of Object.entries(intentHubCapabilities)) {
  const source = read(file);
  check(
    source.includes(`filterVisibleSubjectsByCapability(SUBJECTS, "${capability}")`),
    `${file} must derive sections from visible subjects with ${capability}`,
  );
  check(source.includes("notFound()"), `${file} must not render an empty intent page`);
}

check(PRIMARY_NAVIGATION.length <= 7, "primary navigation must contain at most 7 items");
check(unique(PRIMARY_NAVIGATION.map((item) => item.id)), "primary navigation IDs must be unique");
check(unique(PRIMARY_NAVIGATION.map((item) => item.href)), "primary navigation hrefs must be unique");
for (const item of PRIMARY_NAVIGATION) {
  check(fs.existsSync(routePagePath(item.href)), `navigation target ${item.href} has no page`);
}

const unavailableSubjectFixture: SubjectConfig = {
  ...hiddenFixture,
  id: "unavailable-fixture",
  href: "/unavailable-fixture",
  status: "public",
  capabilities: { courses: false, problems: false, exams: false, review: false },
};
const unavailableNavigation = buildPrimaryNavigation([
  hiddenFixture,
  unavailableSubjectFixture,
]);
for (const intentId of ["learn", "problems", "exams", "review"] as const) {
  check(
    !unavailableNavigation.some((item) => item.id === intentId),
    `navigation must hide ${intentId} when no visible subject supports it`,
  );
}
const problemsOnlyNavigation = buildPrimaryNavigation([
  {
    ...unavailableSubjectFixture,
    id: "problems-only-fixture",
    href: "/problems-only-fixture",
    capabilities: { ...unavailableSubjectFixture.capabilities, problems: true },
  },
]);
check(
  problemsOnlyNavigation.some((item) => item.id === "problems") &&
    !problemsOnlyNavigation.some((item) => item.id === "learn"),
  "navigation must reflect each public subject capability independently",
);

check(HOME_PRIMARY_ACTIONS.length <= 2, "home must have at most 2 primary actions");
check(unique(HOME_PRIMARY_ACTIONS.map((action) => action.href)), "home primary action hrefs must be unique");
const genericLabels = new Set(["開く", "見る", "進む", "始める", "学習する", "挑戦する"]);
for (const action of HOME_PRIMARY_ACTIONS) {
  check(!genericLabels.has(action.label), `home CTA label "${action.label}" is not descriptive`);
}

const activeRouteCases = [
  ["/", "home"],
  ["/learn", "learn"],
  ["/courses/math-1a", "learn"],
  ["/english/vocab", "learn"],
  ["/english/grammar", "learn"],
  ["/practice", "problems"],
  ["/math/calculation", "problems"],
  ["/challenge-problems", "problems"],
  ["/english/speed-reading", "problems"],
  ["/english/comprehension", "problems"],
  ["/english/multi-source", "problems"],
  ["/exams", "exams"],
  ["/dojo", "exams"],
  ["/english/dojo", "exams"],
  ["/common-test/english-reading", "exams"],
  ["/review", "review"],
  ["/common-test/history", "review"],
  ["/subjects", "subjects"],
  ["/math", "subjects"],
  ["/english", "subjects"],
  ["/mypage", "mypage"],
] as const;
for (const [route, expected] of activeRouteCases) {
  check(
    getActiveNavigationId(route) === expected,
    `${route} should activate ${expected}, got ${getActiveNavigationId(route)}`,
  );
}

for (const commonTestSubject of PUBLIC_COMMON_TEST_SUBJECTS) {
  check(
    PUBLIC_SUBJECTS.some((subject) => subject.id === commonTestSubject.parentSubjectId),
    `common-test subject ${commonTestSubject.id} has a non-public parent`,
  );
}
for (const courseSubject of PUBLIC_COURSE_SUBJECTS) {
  check(
    PUBLIC_SUBJECTS.some((subject) => subject.id === courseSubject.parentSubjectId),
    `course subject ${courseSubject.subjectId} has a non-public parent`,
  );
}

const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
check(sitemapPaths.has("/subjects"), "sitemap must include /subjects");
const publicMath = PUBLIC_SUBJECTS.find((subject) => subject.id === "math");
check(
  sitemapPaths.has("/math/calculation") === Boolean(publicMath?.capabilities.problems),
  "sitemap /math/calculation publication must match the math problem capability",
);
check(
  sitemapPaths.has("/challenge-problems") === Boolean(publicMath?.capabilities.problems),
  "sitemap challenge-problems publication must match the math problem capability",
);
check(!sitemapPaths.has("/abyss"), "legacy challenge route must not be in sitemap");
check(
  read("src/app/abyss/page.tsx").includes('permanentRedirect("/challenge-problems")'),
  "legacy challenge route must redirect to the descriptive URL",
);
for (const subject of PUBLIC_SUBJECTS) {
  check(sitemapPaths.has(subject.href), `sitemap is missing public subject ${subject.href}`);
}
for (const subject of (SUBJECTS as readonly SubjectConfig[]).filter(
  (entry) => entry.status === "hidden",
)) {
  check(!sitemapPaths.has(subject.href), `sitemap contains hidden subject ${subject.href}`);
}

const sitemapSource = read("src/app/sitemap.ts");
check(sitemapSource.includes("PUBLIC_SUBJECTS"), "sitemap must derive subject routes from PUBLIC_SUBJECTS");
check(
  sitemapSource.includes("PUBLIC_COMMON_TEST_SUBJECTS"),
  "sitemap must derive common-test routes from the parent-filtered public selector",
);
check(
  sitemapSource.includes("PRIMARY_NAVIGATION"),
  "sitemap intent hubs must use the capability-filtered primary navigation",
);
for (const capability of ["courses", "problems", "exams"] as const) {
  check(
    sitemapSource.includes(`capabilities.${capability}`),
    `sitemap must apply the ${capability} publication boundary`,
  );
}

check(
  read("src/data/common-test.ts").includes("parentSubject.capabilities.exams"),
  "common-test subjects must require the parent exam capability",
);
check(
  read("src/data/courses/index.ts").includes("parentSubject.capabilities.courses"),
  "course subjects must require the parent course capability",
);

const homeSource = read("src/app/page.tsx");
const subjectsSource = read("src/app/subjects/page.tsx");
check(homeSource.includes("PUBLIC_SUBJECTS.map"), "home subject cards must use PUBLIC_SUBJECTS");
check(subjectsSource.includes("PUBLIC_SUBJECTS.map"), "subject index must use PUBLIC_SUBJECTS");

const navSource = read("src/components/shell/PrimaryNavigation.tsx");
for (const requirement of ["aria-current", "aria-expanded", "aria-controls", "Escape"]) {
  check(navSource.includes(requirement), `primary navigation is missing ${requirement}`);
}
check(
  read("src/components/shell/SiteHeader.tsx").includes('href="/"'),
  "site brand must link to the home page",
);

for (const page of [
  "src/app/math/page.tsx",
  "src/app/english/page.tsx",
  "src/app/common-test/page.tsx",
]) {
  const hrefs = extractLiteralActionHrefs(read(page));
  check(unique(hrefs), `${page} contains duplicate literal action hrefs: ${hrefs.join(", ")}`);
}

check(
  !/\border-\d/.test(read("src/app/common-test/page.tsx")),
  "common-test page must not use CSS visual ordering that differs from DOM order",
);

if (issues.length > 0) {
  console.error(`information-architecture QA FAILED: ${issues.length} issue(s).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(
    `information-architecture QA passed: ${PUBLIC_SUBJECTS.length} public subjects, ${PRIMARY_NAVIGATION.length} nav items, registry-linked sitemap and active routes.`,
  );
}
