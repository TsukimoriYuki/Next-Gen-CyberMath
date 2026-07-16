import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";
import type {
  ElementarySubjectConfig,
  ElementarySubjectId,
} from "@/types/elementary";

export const ELEMENTARY_SUBJECTS: readonly ElementarySubjectConfig[] = [
  {
    id: "math",
    slug: "math",
    name: "算数",
    shortName: "算数",
    description: "数や図を使って、考え方を一つずつ確かめる教科です。",
    order: 1,
    availability: "planned",
    publicationStatus: "hidden",
  },
  {
    id: "japanese",
    slug: "japanese",
    name: "国語",
    shortName: "国語",
    description: "ことばや文章を、根拠を見つけながら読む教科です。",
    order: 2,
    availability: "planned",
    publicationStatus: "hidden",
  },
  {
    id: "social-studies",
    slug: "social-studies",
    name: "社会",
    shortName: "社会",
    description: "地図や資料から、くらしと地域のつながりを考える教科です。",
    order: 3,
    availability: "planned",
    publicationStatus: "hidden",
  },
  {
    id: "science",
    slug: "science",
    name: "理科",
    shortName: "理科",
    description: "身近な自然を観察し、分かったことを確かめる教科です。",
    order: 4,
    availability: "unavailable",
    publicationStatus: "hidden",
  },
] as const;

assertUniqueRegistryKeys(
  ELEMENTARY_SUBJECTS,
  (subject) => subject.id,
  "elementary subject ID registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_SUBJECTS,
  (subject) => subject.slug,
  "elementary subject slug registry",
);

export const ELEMENTARY_SUBJECTS_BY_ID = indexByUniqueRegistryKey(
  ELEMENTARY_SUBJECTS,
  (subject) => subject.id,
  "elementary subject ID registry",
);

export function getElementarySubject(
  subjectId: ElementarySubjectId | string,
): ElementarySubjectConfig | undefined {
  return ELEMENTARY_SUBJECTS_BY_ID[subjectId];
}
