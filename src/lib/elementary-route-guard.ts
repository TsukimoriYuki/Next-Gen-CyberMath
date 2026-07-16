import "server-only";

import { notFound } from "next/navigation";
import { ELEMENTARY_SITE } from "@/data/elementary";
import {
  evaluateElementaryPublication,
  resolveElementaryPublicationRuntime,
  type ElementaryPublicationRuntime,
} from "@/lib/elementary-publication";
import type { ElementaryPublicationStatus } from "@/types/elementary";

export type ElementaryPageAccess = Readonly<{
  isBeta: boolean;
  isInternal: boolean;
  runtime: ElementaryPublicationRuntime;
  status: ElementaryPublicationStatus;
}>;

export function requireElementaryPageAccess(
  options: Readonly<{
    status?: ElementaryPublicationStatus;
    internalAccess?: boolean;
  }> = {},
): ElementaryPageAccess {
  const runtime = resolveElementaryPublicationRuntime();
  const decision = evaluateElementaryPublication(
    options.status ?? ELEMENTARY_SITE.publicationStatus,
    runtime,
    { internalAccess: options.internalAccess },
  );
  if (!decision.allowed) notFound();
  return decision;
}
