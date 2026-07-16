import type { ElementaryPublicationStatus } from "@/types/elementary";

export type ElementaryPublicationRuntime =
  | "development"
  | "preview"
  | "production"
  | "test";

export type ElementaryPublicationDecision =
  | Readonly<{
      allowed: true;
      isBeta: boolean;
      isInternal: boolean;
      runtime: ElementaryPublicationRuntime;
      status: ElementaryPublicationStatus;
    }>
  | Readonly<{
      allowed: false;
      reason: "hidden" | "internal-access-required" | "unknown-status";
      runtime: ElementaryPublicationRuntime;
      status: string;
    }>;

export function resolveElementaryPublicationRuntime(
  env: Readonly<Record<string, string | undefined>> = process.env,
): ElementaryPublicationRuntime {
  if (env.NODE_ENV === "development") return "development";
  if (env.VERCEL_ENV === "preview") return "preview";
  if (env.NODE_ENV === "test") return "test";
  return "production";
}

const ELEMENTARY_PUBLICATION_STATUSES = new Set<ElementaryPublicationStatus>([
  "hidden",
  "internal",
  "beta",
  "public",
]);

export function evaluateElementaryPublication(
  status: ElementaryPublicationStatus | string,
  runtime: ElementaryPublicationRuntime,
  options: Readonly<{ internalAccess?: boolean }> = {},
): ElementaryPublicationDecision {
  if (!ELEMENTARY_PUBLICATION_STATUSES.has(status as ElementaryPublicationStatus)) {
    return { allowed: false, reason: "unknown-status", runtime, status };
  }
  const publicationStatus = status as ElementaryPublicationStatus;
  if (
    publicationStatus === "hidden" &&
    runtime !== "development" &&
    runtime !== "test"
  ) {
    return {
      allowed: false,
      reason: "hidden",
      runtime,
      status: publicationStatus,
    };
  }
  if (
    publicationStatus === "internal" &&
    runtime !== "development" &&
    runtime !== "test" &&
    options.internalAccess !== true
  ) {
    return {
      allowed: false,
      reason: "internal-access-required",
      runtime,
      status: publicationStatus,
    };
  }
  return {
    allowed: true,
    isBeta: publicationStatus === "beta",
    isInternal:
      publicationStatus === "internal" || publicationStatus === "hidden",
    runtime,
    status: publicationStatus,
  };
}

export function isElementaryResourceDiscoverable(
  status: ElementaryPublicationStatus | string,
): boolean {
  return status === "beta" || status === "public";
}
