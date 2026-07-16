import type { ElementarySiteConfig } from "@/types/elementary";

export const ELEMENTARY_SITE = {
  id: "elementary",
  name: "Cyber Math 小学生版",
  href: "/elementary",
  defaultGradeId: "grade-3",
  publicationStatus: "hidden",
} as const satisfies ElementarySiteConfig;

export * from "./grades";
export * from "./registry";
export * from "./subjects";
