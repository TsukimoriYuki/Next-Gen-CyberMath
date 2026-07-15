import "server-only";

import { notFound } from "next/navigation";
import type { SubjectCapabilities, SubjectConfig } from "@/data/subjects";
import {
  getSubjectPublicationDecision,
  type SubjectPublicationRuntime,
} from "@/lib/subject-publication";

export type SubjectPageAccess = Readonly<{
  isBeta: boolean;
  isResourcePreview: boolean;
  runtime: SubjectPublicationRuntime;
  subject: SubjectConfig;
}>;

/**
 * Central page boundary. `resourcePublished` handles a child registry's own
 * draft/preparing state while still permitting local development inspection.
 */
export function requireSubjectPageAccess(
  subjectId: string,
  capability?: keyof SubjectCapabilities,
  options: Readonly<{ resourcePublished?: boolean }> = {},
): SubjectPageAccess {
  const decision = getSubjectPublicationDecision(subjectId, capability);
  if (!decision.allowed) notFound();
  if (
    options.resourcePublished === false &&
    decision.runtime !== "development"
  ) {
    notFound();
  }
  return {
    subject: decision.subject,
    isBeta: decision.isBeta,
    isResourcePreview: options.resourcePublished === false,
    runtime: decision.runtime,
  };
}
