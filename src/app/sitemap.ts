import type { MetadataRoute } from "next";
import {
  getAllProblems,
  getAllLessonSlugs,
  getAllTags,
  getUnitSlugs,
} from "@/lib/content";
import { COMMON_TEST_SUBJECTS } from "@/data/common-test";
import { SECTION_PRACTICE_EXAMS } from "@/data/common-test/section-practice";
import { COMMON_TEST_PROBLEM_LECTURES } from "@/data/common-test/problem-lectures";
import { getPublicCommonTestMockExams } from "@/data/common-test-mock-exams";
import { PUBLIC_SPECIAL_LECTURES } from "@/data/specialLectures";
import { PUBLIC_COURSE_SUBJECTS } from "@/data/course-curriculum";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import { ENGLISH_LEVEL_SLUG } from "@/lib/english-types";
import { getTagIndexingDecision } from "@/lib/tag-indexing";
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
  "/units",
  "/tags",
  "/common-test",
  "/common-test/simulator",
  "/common-test/practice",
  "/common-test/problem-lectures",
  "/common-test/math-1a",
  "/common-test/math-2bc",
  "/common-test/english-reading",
  "/english",
  "/english/speed-reading",
  "/english/comprehension",
  "/english/multi-source",
  "/english/grammar",
  "/english/vocab",
  "/english/dojo",
] as const;

function sitemapEntry(
  baseUrl: string,
  route: string,
  priority = 0.7,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const routes = new Set<string>(STATIC_ROUTES);

  for (const slug of getUnitSlugs()) routes.add(`/units/${slug}`);
  for (const slug of getAllLessonSlugs()) routes.add(`/lessons/${slug}`);
  for (const problem of getAllProblems()) routes.add(`/problems/${problem.slug}`);
  for (const tag of getAllTags()) {
    if (getTagIndexingDecision(tag.tag, tag.total).includeInSitemap) {
      routes.add(`/tags/${encodeURIComponent(tag.tag)}`);
    }
  }

  for (const subject of COMMON_TEST_SUBJECTS) {
    for (const section of subject.sections) {
      routes.add(`${subject.route}/section-${section.number}`);
    }
  }
  for (const exam of getPublicCommonTestMockExams()) {
    routes.add(`/common-test/simulator/${exam.id}`);
  }
  for (const exam of SECTION_PRACTICE_EXAMS) {
    routes.add(`/common-test/practice/${exam.id}`);
  }
  for (const lecture of COMMON_TEST_PROBLEM_LECTURES) {
    routes.add(`/common-test/problem-lectures/${lecture.id}`);
  }
  for (const lecture of PUBLIC_SPECIAL_LECTURES) {
    if (!lecture.noindex) routes.add(`/common-test/lectures/${lecture.slug}`);
  }

  for (const subject of PUBLIC_COURSE_SUBJECTS) {
    routes.add(`/courses/${subject.subjectId}`);
    for (const unit of subject.units) {
      routes.add(`/courses/${subject.subjectId}/${unit.unitId}`);
      for (const lesson of unit.lessons) {
        routes.add(`/courses/${subject.subjectId}/${unit.unitId}/${lesson.lessonId}`);
      }
    }
  }

  const speedReadingLevels = new Set(SPEED_READING_PROBLEMS.map((problem) => problem.level));
  for (const level of speedReadingLevels) {
    routes.add(`/english/speed-reading/level/${ENGLISH_LEVEL_SLUG[level]}`);
  }
  for (const problem of SPEED_READING_PROBLEMS) {
    routes.add(`/english/speed-reading/${problem.id}`);
  }
  for (const problem of COMPREHENSION_PROBLEMS) {
    routes.add(`/english/comprehension/${problem.id}`);
  }
  for (const problem of MULTI_SOURCE_PROBLEMS) {
    routes.add(`/english/multi-source/${problem.id}`);
  }

  return Array.from(routes)
    .sort()
    .map((route) => sitemapEntry(baseUrl, route, route === "/" ? 1 : 0.7));
}
