export type ElementaryGradeId =
  | "grade-3"
  | "grade-4"
  | "grade-5"
  | "grade-6";

export type ElementarySubjectId =
  | "math"
  | "japanese"
  | "social-studies"
  | "science";

export type ElementaryCourseType = "regular" | "exam-prep";

export type ElementaryAvailability = "planned" | "unavailable";

export type ElementaryPublicationStatus =
  | "hidden"
  | "internal"
  | "beta"
  | "public";

export type ElementaryGradeConfig = Readonly<{
  id: ElementaryGradeId;
  slug: ElementaryGradeId;
  grade: 3 | 4 | 5 | 6;
  name: string;
  shortName: string;
  order: number;
  availability: ElementaryAvailability;
  publicationStatus: ElementaryPublicationStatus;
  /** Only implemented landing pages receive an href. */
  href?: `/elementary/${ElementaryGradeId}`;
}>;

export type ElementarySubjectConfig = Readonly<{
  id: ElementarySubjectId;
  slug: ElementarySubjectId;
  name: string;
  shortName: string;
  description: string;
  order: number;
  availability: ElementaryAvailability;
  publicationStatus: ElementaryPublicationStatus;
}>;

export type ElementaryCourseTypeConfig = Readonly<{
  id: ElementaryCourseType;
  slug: ElementaryCourseType;
  name: string;
  description: string;
  order: number;
  availability: ElementaryAvailability;
  publicationStatus: ElementaryPublicationStatus;
}>;

export type ElementaryGradeSubjectConfig = Readonly<{
  id: `${ElementaryGradeId}:${ElementaryCourseType}:${ElementarySubjectId}`;
  gradeId: ElementaryGradeId;
  courseType: ElementaryCourseType;
  subjectId: ElementarySubjectId;
  order: number;
  availability: ElementaryAvailability;
  publicationStatus: ElementaryPublicationStatus;
}>;

export type ElementarySiteConfig = Readonly<{
  id: "elementary";
  name: string;
  href: "/elementary";
  defaultGradeId: ElementaryGradeId;
  publicationStatus: ElementaryPublicationStatus;
}>;
