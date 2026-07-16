import type { MetadataRoute } from "next";
import {
  getAllProblems,
  getAllLessonSlugs,
  getAllTags,
  getUnitSlugs,
} from "@/lib/content";
import { PUBLIC_COMMON_TEST_SUBJECTS } from "@/data/common-test";
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
import { PUBLIC_SUBJECTS } from "@/data/subjects";
import { PRIMARY_NAVIGATION } from "@/data/navigation";
import { INFORMATICS_PROBLEMS } from "@/data/informatics/problems";
import { INFORMATICS_SECTION_PRACTICES } from "@/data/informatics/exam-practice";
import { INFORMATICS_MOCK_EXAM_001 } from "@/data/informatics/mock-exam";
import { JAPANESE_PROBLEMS } from "@/data/japanese";
import { JAPANESE_READING_PASSAGES } from "@/data/japanese/reading";

const GLOBAL_STATIC_ROUTES = [
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
  "/subjects",
] as const;

const MATH_COURSE_ROUTES = ["/courses"] as const;

const MATH_PROBLEM_ROUTES = [
  "/units",
  "/tags",
  "/math/calculation",
  "/challenge-problems",
  "/dojo",
] as const;

const MATH_EXAM_ROUTES = [
  "/common-test/simulator",
  "/common-test/practice",
  "/common-test/problem-lectures",
] as const;

const ENGLISH_COURSE_ROUTES = [
  "/english/grammar",
  "/english/vocab",
] as const;

const ENGLISH_PROBLEM_ROUTES = [
  "/english/speed-reading",
  "/english/comprehension",
  "/english/multi-source",
] as const;

const ENGLISH_EXAM_ROUTES = ["/english/dojo"] as const;

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
  const routes = new Set<string>(GLOBAL_STATIC_ROUTES);
  const mathSubject = PUBLIC_SUBJECTS.find((subject) => subject.id === "math");
  const englishSubject = PUBLIC_SUBJECTS.find((subject) => subject.id === "english");
  const informaticsSubject = PUBLIC_SUBJECTS.find(
    (subject) => subject.id === "informatics",
  );
  const japaneseSubject = PUBLIC_SUBJECTS.find(
    (subject) => subject.id === "japanese",
  );

  for (const item of PRIMARY_NAVIGATION) {
    if (["learn", "problems", "exams", "review"].includes(item.id)) {
      routes.add(item.href);
    }
  }

  if (mathSubject?.capabilities.courses) {
    for (const route of MATH_COURSE_ROUTES) routes.add(route);
  }
  if (mathSubject?.capabilities.problems) {
    for (const route of MATH_PROBLEM_ROUTES) routes.add(route);
  }
  if (mathSubject?.capabilities.exams) {
    for (const route of MATH_EXAM_ROUTES) routes.add(route);
  }
  if (englishSubject?.capabilities.courses) {
    for (const route of ENGLISH_COURSE_ROUTES) routes.add(route);
  }
  if (englishSubject?.capabilities.problems) {
    for (const route of ENGLISH_PROBLEM_ROUTES) routes.add(route);
  }

  if (japaneseSubject?.capabilities.problems) {
    routes.add("/japanese/problems");
    routes.add("/japanese/reading");
    for (const problem of JAPANESE_PROBLEMS) {
      if (problem.area !== "modern-reading") {
        routes.add(`/japanese/problems/${problem.slug}`);
      }
    }
    for (const passage of JAPANESE_READING_PASSAGES) {
      routes.add(`/japanese/reading/${passage.slug}`);
    }
  }
  if (englishSubject?.capabilities.exams) {
    for (const route of ENGLISH_EXAM_ROUTES) routes.add(route);
  }
  if (PUBLIC_COMMON_TEST_SUBJECTS.length > 0) routes.add("/common-test");

  for (const subject of PUBLIC_SUBJECTS) routes.add(subject.href);

  if (mathSubject?.capabilities.problems) {
    for (const slug of getUnitSlugs()) routes.add(`/units/${slug}`);
    for (const problem of getAllProblems()) routes.add(`/problems/${problem.slug}`);
    for (const tag of getAllTags()) {
      if (getTagIndexingDecision(tag.tag, tag.total).includeInSitemap) {
        routes.add(`/tags/${encodeURIComponent(tag.tag)}`);
      }
    }
  }
  if (mathSubject?.capabilities.courses) {
    for (const slug of getAllLessonSlugs()) routes.add(`/lessons/${slug}`);
  }

  for (const subject of PUBLIC_COMMON_TEST_SUBJECTS) {
    routes.add(subject.route);
    for (const section of subject.sections) {
      routes.add(`${subject.route}/section-${section.number}`);
    }
  }
  if (mathSubject?.capabilities.exams) {
    for (const exam of getPublicCommonTestMockExams()) {
      if (exam.subject !== "math-1a") continue;
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

  if (informaticsSubject?.capabilities.problems) {
    routes.add("/informatics/practice");
    for (const exam of INFORMATICS_SECTION_PRACTICES) {
      routes.add(`/informatics/practice/${exam.slug ?? exam.id}`);
    }
    for (const problem of INFORMATICS_PROBLEMS) {
      routes.add(`/informatics/problems/${problem.slug ?? problem.id}`);
    }
  }
  if (informaticsSubject?.capabilities.exams) {
    routes.add("/informatics/mock-exam");
    routes.add(`/informatics/mock-exam/${INFORMATICS_MOCK_EXAM_001.slug ?? INFORMATICS_MOCK_EXAM_001.id}`);
    routes.add("/informatics/history");
  }

  if (englishSubject?.capabilities.problems) {
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
  }

  return Array.from(routes)
    .sort()
    .map((route) => sitemapEntry(baseUrl, route, route === "/" ? 1 : 0.7));
}
