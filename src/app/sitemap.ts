import type { MetadataRoute } from "next";
import {
  getAllProblems,
  getAllLessonSlugs,
  getAllTagNames,
  getUnitSlugs,
} from "@/lib/content";
import { SECTION_PRACTICE_EXAMS } from "@/data/common-test/section-practice";
import { COMMON_TEST_PROBLEM_LECTURES } from "@/data/common-test/problem-lectures";
import { getSiteUrl } from "@/lib/site";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/quality",
  "/quality/checklist",
  "/quality/changelog",
  "/quality/roadmap",
  "/privacy",
  "/terms",
  "/contact",
  "/licenses",
  "/math",
  "/courses",
  "/lessons",
  "/units",
  "/tags",
  "/common-test",
  "/common-test/simulator",
  "/common-test/simulator/common-test-math-1a-manual-001",
  "/common-test/simulator/common-test-math-1a-manual-002",
  "/common-test/practice",
  "/common-test/problem-lectures",
  "/common-test/math-1a",
  "/common-test/math-2bc",
] as const;

function sitemapEntry(baseUrl: string, route: string, priority = 0.7): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const routes = new Set<string>();

  for (const route of STATIC_ROUTES) routes.add(route);
  for (const slug of getUnitSlugs()) routes.add(`/units/${slug}`);
  for (const slug of getAllLessonSlugs()) routes.add(`/lessons/${slug}`);
  for (const problem of getAllProblems()) routes.add(`/problems/${problem.slug}`);
  for (const tag of getAllTagNames()) routes.add(`/tags/${encodeURIComponent(tag)}`);
  for (const exam of SECTION_PRACTICE_EXAMS) {
    routes.add(`/common-test/practice/${exam.id}`);
  }
  for (const lecture of COMMON_TEST_PROBLEM_LECTURES) {
    routes.add(`/common-test/problem-lectures/${lecture.id}`);
  }

  return Array.from(routes)
    .sort()
    .map((route) => sitemapEntry(baseUrl, route, route === "/" ? 1 : 0.7));
}
