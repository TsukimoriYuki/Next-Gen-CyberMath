import {
  filterVisibleSubjectsByCapability,
  SUBJECTS,
  type SubjectCapabilities,
  type SubjectConfig,
} from "@/data/subjects";

export type PrimaryNavigationItem = Readonly<{
  id: "home" | "learn" | "problems" | "exams" | "review" | "subjects" | "mypage";
  label: string;
  href: `/${string}`;
}>;

const PRIMARY_NAVIGATION_CANDIDATES = [
  { id: "home", label: "ホーム", href: "/" },
  { id: "learn", label: "学ぶ", href: "/learn" },
  { id: "problems", label: "問題", href: "/practice" },
  { id: "exams", label: "模試・入試対策", href: "/exams" },
  { id: "review", label: "復習", href: "/review" },
  { id: "subjects", label: "教科", href: "/subjects" },
  { id: "mypage", label: "マイページ", href: "/mypage" },
] as const satisfies readonly PrimaryNavigationItem[];

const CAPABILITY_BY_NAVIGATION_ID = {
  learn: "courses",
  problems: "problems",
  exams: "exams",
  review: "review",
} as const satisfies Partial<
  Record<PrimaryNavigationItem["id"], keyof SubjectCapabilities>
>;

export function buildPrimaryNavigation(
  subjects: readonly SubjectConfig[],
): PrimaryNavigationItem[] {
  return PRIMARY_NAVIGATION_CANDIDATES.filter((item) => {
    const capability =
      CAPABILITY_BY_NAVIGATION_ID[
        item.id as keyof typeof CAPABILITY_BY_NAVIGATION_ID
      ];
    return capability
      ? filterVisibleSubjectsByCapability(subjects, capability).length > 0
      : true;
  });
}

export const PRIMARY_NAVIGATION: readonly PrimaryNavigationItem[] =
  buildPrimaryNavigation(SUBJECTS);

export const HOME_PRIMARY_ACTIONS = [
  { label: "目的から始める", href: "/#paths" },
  { label: "教科を選ぶ", href: "/subjects" },
] as const satisfies readonly Readonly<{ label: string; href: `/${string}` }>[];

export function getActiveNavigationId(
  pathname: string,
): PrimaryNavigationItem["id"] | null {
  if (pathname === "/") return "home";
  if (pathname === "/mypage" || pathname.startsWith("/mentor")) return "mypage";
  if (
    pathname === "/review" ||
    pathname.startsWith("/common-test/review") ||
    pathname.startsWith("/common-test/history") ||
    pathname === "/history" ||
    pathname.startsWith("/mock/history")
  ) {
    return "review";
  }
  if (
    pathname === "/learn" ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/lessons") ||
    pathname.startsWith("/english/vocab") ||
    pathname.startsWith("/english/grammar")
  ) {
    return "learn";
  }
  if (
    pathname === "/exams" ||
    pathname.startsWith("/common-test") ||
    pathname.startsWith("/exam-sets") ||
    pathname.startsWith("/english/dojo") ||
    pathname.startsWith("/dojo")
  ) {
    return "exams";
  }
  if (
    pathname === "/practice" ||
    pathname.startsWith("/units") ||
    pathname.startsWith("/problems") ||
    pathname.startsWith("/tags") ||
    pathname.startsWith("/mock") ||
    pathname.startsWith("/drill") ||
    pathname.startsWith("/calc-drill") ||
    pathname.startsWith("/challenge-problems") ||
    pathname.startsWith("/abyss") ||
    pathname.startsWith("/math/calculation") ||
    pathname.startsWith("/english/speed-reading") ||
    pathname.startsWith("/english/comprehension") ||
    pathname.startsWith("/english/multi-source") ||
    pathname.startsWith("/japanese/problems") ||
    pathname.startsWith("/japanese/reading")
  ) {
    return "problems";
  }
  if (
    pathname === "/subjects" ||
    pathname.startsWith("/math") ||
    pathname.startsWith("/english") ||
    pathname === "/japanese"
  ) {
    return "subjects";
  }
  return null;
}
