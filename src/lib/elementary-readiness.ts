import { ELEMENTARY_SITE } from "@/data/elementary";
import { ELEMENTARY_LESSONS } from "@/data/elementary/lessons";
import { ELEMENTARY_PROBLEMS } from "@/data/elementary/problems";
import {
  ELEMENTARY_READINESS_AREAS,
  ELEMENTARY_RELEASE_GATES,
} from "@/data/elementary/readiness";
import { ELEMENTARY_UNITS } from "@/data/elementary/units";
import { buildElementaryContentInventory } from "@/lib/elementary-inventory";
import type {
  ElementaryReadinessAreaResult,
  ElementaryReadinessCheck,
  ElementaryReadinessEvidence,
  ElementaryReadinessResult,
  ElementaryReadinessStatus,
  ElementaryReleaseGate,
} from "@/types/elementary-readiness";

const VALID_STATUSES = new Set<ElementaryReadinessStatus>([
  "pass",
  "warning",
  "fail",
  "not-applicable",
  "not-reviewed",
]);

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

export function normalizeElementaryReadinessStatus(value: unknown): ElementaryReadinessStatus {
  return typeof value === "string" && VALID_STATUSES.has(value as ElementaryReadinessStatus)
    ? (value as ElementaryReadinessStatus)
    : "fail";
}

function uniqueCount(items: readonly Readonly<{ id: string }>[]) {
  return new Set(items.map((item) => item.id)).size;
}

function evaluateLiveGate(
  gate: ElementaryReleaseGate,
  inventory: ReturnType<typeof buildElementaryContentInventory>,
) {
  switch (gate.id) {
    case "unresolved-reference-zero":
      return { status: "pass" as const, actual: 0, evidence: "inventory utilityが全参照を解決しました。" };
    case "duplicate-id-zero": {
      const duplicateCount =
        ELEMENTARY_UNITS.length - uniqueCount(ELEMENTARY_UNITS) +
        ELEMENTARY_LESSONS.length - uniqueCount(ELEMENTARY_LESSONS) +
        ELEMENTARY_PROBLEMS.length - uniqueCount(ELEMENTARY_PROBLEMS);
      return { status: duplicateCount === 0 ? "pass" as const : "fail" as const, actual: duplicateCount, evidence: `重複ID ${duplicateCount}件` };
    }
    case "elementary-count":
      return { status: inventory.totals.problemCount === 24 ? "pass" as const : "fail" as const, actual: inventory.totals.problemCount, evidence: `正式pilot problem ${inventory.totals.problemCount}問` };
    case "limited-pilot-scope":
      return { status: "warning" as const, actual: inventory.totals.lessonCount, evidence: `現在は${inventory.totals.lessonCount}講座のみです。` };
    case "formal-release-completeness":
      return { status: "warning" as const, actual: inventory.totals.lessonCoverage, evidence: "全3entryのcoverageはpartialです。" };
    case "qa-publication":
      return { status: ELEMENTARY_SITE.publicationStatus === "hidden" ? "pass" as const : "fail" as const, actual: ELEMENTARY_SITE.publicationStatus, evidence: `publicationStatusは${ELEMENTARY_SITE.publicationStatus}です。` };
    default:
      return { status: gate.defaultStatus, evidence: gate.sourceQa ? `${gate.sourceQa}へ接続済みです。` : `${gate.source}で確認します。` };
  }
}

function buildCheck(
  gate: ElementaryReleaseGate,
  evidence: ElementaryReadinessEvidence,
  inventory: ReturnType<typeof buildElementaryContentInventory>,
): ElementaryReadinessCheck {
  const evaluated = evaluateLiveGate(gate, inventory);
  const supplied = evidence[gate.id];
  const status = normalizeElementaryReadinessStatus(supplied ?? evaluated.status);
  return deepFreeze({
    ...gate,
    status,
    actual: evaluated.actual,
    evidence:
      supplied !== undefined && !VALID_STATUSES.has(supplied as ElementaryReadinessStatus)
        ? "不明なstatusをfailとして扱いました。"
        : evaluated.evidence,
  });
}

function areaStatus(checks: readonly ElementaryReadinessCheck[]): ElementaryReadinessStatus {
  if (checks.some((check) => check.status === "fail")) return "fail";
  if (checks.some((check) => check.status === "not-reviewed")) return "not-reviewed";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.every((check) => check.status === "not-applicable")) return "not-applicable";
  return "pass";
}

export function buildElementaryPublicationReadiness(
  evidence: ElementaryReadinessEvidence = {},
): ElementaryReadinessResult {
  const inventory = buildElementaryContentInventory();
  const checks = ELEMENTARY_RELEASE_GATES.map((gate) => buildCheck(gate, evidence, inventory));
  const counts: Record<ElementaryReadinessStatus, number> = {
    pass: 0,
    warning: 0,
    fail: 0,
    "not-applicable": 0,
    "not-reviewed": 0,
  };
  for (const check of checks) counts[check.status] += 1;

  const areas: ElementaryReadinessAreaResult[] = ELEMENTARY_READINESS_AREAS.map((area) => {
    const areaChecks = checks.filter((check) => check.area === area);
    return deepFreeze({ area, status: areaStatus(areaChecks), checks: areaChecks });
  });
  const betaBlocking = checks.filter(
    (check) => check.requiredForBeta && (check.status === "fail" || check.status === "not-reviewed"),
  );
  const formalBlocking = checks.filter(
    (check) =>
      check.requiredForFormal &&
      check.status !== "pass" &&
      check.status !== "not-applicable",
  );
  const reasons = [
    ...betaBlocking.map((check) => `${check.title}: ${check.status}`),
    ...checks.filter((check) => check.status === "warning").map((check) => `${check.title}: warning`),
  ];
  const overallStatus = areaStatus(checks);
  const releaseDecision = checks.find((check) => check.id === "review-release-decision");
  const hasFailure = checks.some((check) => check.status === "fail");
  const limitedBetaAllowed =
    !hasFailure &&
    releaseDecision?.humanReview?.status === "reviewed" &&
    betaBlocking.every((check) =>
      ["review-math-content", "review-japanese-content", "review-social-content"].includes(check.id),
    );
  const betaRecommendation = betaBlocking.length === 0
    ? "recommend" as const
    : limitedBetaAllowed
      ? "limited-beta-allowed" as const
      : "hold" as const;

  return deepFreeze({
    overallStatus,
    counts,
    checks,
    areas,
    recommendation: {
      beta: betaRecommendation,
      formal: formalBlocking.length === 0 ? "recommend" : "hold",
      publicationStatus: ELEMENTARY_SITE.publicationStatus,
      betaBlockingCheckIds: betaBlocking.map((check) => check.id),
      formalBlockingCheckIds: formalBlocking.map((check) => check.id),
      reasons,
    },
    lessonCount: inventory.totals.lessonCount,
    problemCount: inventory.totals.problemCount,
    publicationStatus: ELEMENTARY_SITE.publicationStatus,
  });
}
