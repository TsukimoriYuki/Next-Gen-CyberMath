import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "../src/app/sitemap";
import { getAllTags } from "../src/lib/content";
import { createPublicMetadata, normalizeCanonicalPath } from "../src/lib/public-metadata";
import {
  TAG_MERGE_CANDIDATE_GROUPS,
  getTagIndexingDecision,
} from "../src/lib/tag-indexing";
import { getSiteUrl, PRODUCTION_SITE_URL } from "../src/lib/site";

const rootLayout = readFileSync(join(process.cwd(), "src/app/layout.tsx"), "utf8");
assert.doesNotMatch(
  rootLayout,
  /alternates\s*:\s*\{\s*canonical\s*:\s*["']\/["']/,
  "root layout must not leak the home canonical to descendants",
);
assert.doesNotMatch(
  rootLayout,
  /openGraph\s*:\s*\{[\s\S]*?url\s*:\s*["']\/["']/,
  "root layout must not leak the home Open Graph URL to descendants",
);

assert.equal(normalizeCanonicalPath("/math/"), "/math");
assert.throws(() => normalizeCanonicalPath("/math?mode=1"), RangeError);
assert.throws(() => normalizeCanonicalPath("//preview.example.com/math"), RangeError);
const sampleMetadata = createPublicMetadata({
  title: "Sample",
  description: "Sample page",
  path: "/sample",
});
assert.equal(sampleMetadata.alternates?.canonical, "/sample");
assert.equal(sampleMetadata.openGraph?.url, "/sample");

const siteUrl = getSiteUrl();
assert.ok(siteUrl.startsWith("https://"), "canonical origin must use HTTPS");
assert.ok(!/localhost|127\.0\.0\.1/i.test(siteUrl), "canonical origin must not be local");
assert.ok(
  !siteUrl.endsWith(".vercel.app") || siteUrl === PRODUCTION_SITE_URL,
  "canonical origin must not use a Vercel preview deployment",
);

const entries = sitemap();
const urls = entries.map((entry) => entry.url);
assert.equal(new Set(urls).size, urls.length, "sitemap URLs must be unique");
assert.ok(urls.every((url) => url.startsWith(`${siteUrl}/`) || url === siteUrl));
assert.ok(entries.every((entry) => entry.lastModified === undefined), "unknown update dates must be omitted");

const forbiddenRoutes = [
  "/lessons",
  "/exam-sets",
  "/mock",
  "/common-test/lectures",
  "/common-test/lectures/math-1a-shortcut-formulas",
  "/common-test/lectures/geometry-properties-auxiliary-lines",
  "/common-test/simulator/paper-sample",
  "/common-test/simulator/common-test-math-1a-manual-001/structured-prototype",
  "/common-test/simulator/common-test-math-1a-mock-001",
];
for (const route of forbiddenRoutes) {
  assert.ok(!urls.includes(`${siteUrl}${route}`), `sitemap must exclude ${route}`);
}

for (const requiredRoute of [
  "/math",
  "/courses",
  "/common-test/simulator",
  "/common-test/english-reading",
  "/common-test/lectures/numbers-expressions-core-skills",
  "/english",
  "/english/grammar",
  "/english/speed-reading",
]) {
  assert.ok(urls.includes(`${siteUrl}${requiredRoute}`), `sitemap is missing ${requiredRoute}`);
}

const tags = getAllTags();
const indexableTags = tags.filter((tag) => getTagIndexingDecision(tag.tag, tag.total).index);
const noindexTags = tags.filter((tag) => !getTagIndexingDecision(tag.tag, tag.total).index);
for (const tag of tags) {
  const inSitemap = urls.includes(`${siteUrl}/tags/${encodeURIComponent(tag.tag)}`);
  assert.equal(
    inSitemap,
    getTagIndexingDecision(tag.tag, tag.total).includeInSitemap,
    `tag sitemap decision mismatch: ${tag.tag}`,
  );
}

const mergeCandidates = new Set(TAG_MERGE_CANDIDATE_GROUPS.flat());
console.log(
  `public metadata QA passed: ${entries.length} unique URLs, ${indexableTags.length} index tags, ` +
    `${noindexTags.length} noindex tags, ${mergeCandidates.size} merge candidates, no fabricated lastModified.`,
);
