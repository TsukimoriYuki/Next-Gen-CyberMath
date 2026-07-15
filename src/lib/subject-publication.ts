import {
  isVisibleSubject,
  SUBJECTS,
  type SubjectCapabilities,
  type SubjectConfig,
} from "@/data/subjects";

export type SubjectPublicationRuntime =
  | "development"
  | "preview"
  | "production"
  | "test";

export type SubjectPublicationDecision =
  | {
      allowed: true;
      isBeta: boolean;
      runtime: SubjectPublicationRuntime;
      subject: SubjectConfig;
    }
  | {
      allowed: false;
      reason: "unknown-subject" | "capability-disabled" | "hidden";
      runtime: SubjectPublicationRuntime;
      subject?: SubjectConfig;
    };

/**
 * Vercel Preview is intentionally production-like. A public preview URL must
 * never make hidden teaching material discoverable merely because it is not
 * the production deployment. Local `next dev` is the only implicit hidden
 * content preview. A future remote editorial preview must use an authenticated
 * mechanism (for example Draft Mode), not VERCEL_ENV alone.
 */
export function resolveSubjectPublicationRuntime(
  env: Readonly<Record<string, string | undefined>> = process.env,
): SubjectPublicationRuntime {
  if (env.NODE_ENV === "development") return "development";
  if (env.VERCEL_ENV === "preview") return "preview";
  if (env.NODE_ENV === "test") return "test";
  return "production";
}

export function evaluateSubjectPublication(
  subject: SubjectConfig | undefined,
  capability: keyof SubjectCapabilities | undefined,
  runtime: SubjectPublicationRuntime,
): SubjectPublicationDecision {
  if (!subject) {
    return { allowed: false, reason: "unknown-subject", runtime };
  }
  if (capability && !subject.capabilities[capability]) {
    return {
      allowed: false,
      reason: "capability-disabled",
      runtime,
      subject,
    };
  }
  if (subject.status === "hidden" && runtime !== "development") {
    return { allowed: false, reason: "hidden", runtime, subject };
  }
  return {
    allowed: true,
    isBeta: subject.status === "beta",
    runtime,
    subject,
  };
}

export function getSubjectPublicationDecision(
  subjectId: string,
  capability?: keyof SubjectCapabilities,
  runtime = resolveSubjectPublicationRuntime(),
  subjects: readonly SubjectConfig[] = SUBJECTS,
): SubjectPublicationDecision {
  return evaluateSubjectPublication(
    subjects.find((subject) => subject.id === subjectId),
    capability,
    runtime,
  );
}

export function canAccessSubject(
  subjectId: string,
  capability?: keyof SubjectCapabilities,
  runtime = resolveSubjectPublicationRuntime(),
): boolean {
  return getSubjectPublicationDecision(subjectId, capability, runtime).allowed;
}

/**
 * Legacy/domain subject IDs stored in attempts and review rows. Keep this map
 * explicit: prefix guessing would make a new subject public by accident.
 */
const TOP_LEVEL_SUBJECT_BY_RESOURCE_ID: Readonly<Record<string, string>> = {
  math: "math",
  "math-1a": "math",
  "math-1a-premium": "math",
  "math-2bc": "math",
  "math-2bc-premium": "math",
  "math-3c": "math",
  math1a: "math",
  math2bc: "math",
  english: "english",
  "english-reading": "english",
};

export function resolveTopLevelSubjectId(
  subjectOrResourceId: string | null | undefined,
): string | undefined {
  if (!subjectOrResourceId) return undefined;
  return TOP_LEVEL_SUBJECT_BY_RESOURCE_ID[subjectOrResourceId];
}

export function canAccessSubjectResource(
  subjectOrResourceId: string | null | undefined,
  capability: keyof SubjectCapabilities,
  runtime = resolveSubjectPublicationRuntime(),
): boolean {
  const subjectId = resolveTopLevelSubjectId(subjectOrResourceId);
  return Boolean(
    subjectId && canAccessSubject(subjectId, capability, runtime),
  );
}

/** Public catalog/discovery check. Hidden subjects stay absent even in dev. */
export function isSubjectResourceDiscoverable(
  subjectOrResourceId: string | null | undefined,
  capability: keyof SubjectCapabilities,
): boolean {
  const subjectId = resolveTopLevelSubjectId(subjectOrResourceId);
  if (!subjectId) return false;
  const subject = SUBJECTS.find((entry) => entry.id === subjectId);
  return Boolean(
    subject && isVisibleSubject(subject) && subject.capabilities[capability],
  );
}
