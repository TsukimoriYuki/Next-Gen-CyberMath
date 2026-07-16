import type { ElementaryCurriculumSource } from "@/types/elementary-curriculum";

const RETRIEVED_AT = "2026-07-17" as const;
const LANDING_PAGE = "https://www.mext.go.jp/a_menu/shotou/new-cs/1387014.htm" as const;
const ALL_GRADES = ["grade-3", "grade-4", "grade-5", "grade-6"] as const;

export const ELEMENTARY_CURRICULUM_SOURCES: readonly ElementaryCurriculumSource[] =
  Object.freeze([
    Object.freeze({
      id: "mext-elementary-curriculum-2017",
      authority: "MEXT",
      title: "小学校学習指導要領（平成29年告示）",
      documentType: "curriculum-guideline",
      noticeYear: 2017,
      publicationYear: 2017,
      officialUrl: "https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_01.pdf",
      landingPageUrl: "https://www.mext.go.jp/a_menu/shotou/new-cs/1384661.htm",
      retrievedAt: RETRIEVED_AT,
      subject: "all",
      applicableGrades: ALL_GRADES,
      reviewStatus: "approved",
      notes: "告示本文。各教科の内容と学年配当を解説編と照合する正本。",
      verification: Object.freeze({
        algorithm: "sha256",
        value: "6af90f134b243e44f9767c37ee3079fac092883fd6359b836a5733dd25b43902",
        verifiedAt: RETRIEVED_AT,
      }),
    }),
    Object.freeze({
      id: "mext-elementary-general-commentary-2017",
      authority: "MEXT",
      title: "小学校学習指導要領（平成29年告示）解説 総則編",
      documentType: "curriculum-commentary",
      noticeYear: 2017,
      publicationYear: 2017,
      officialUrl: "https://www.mext.go.jp/content/20230308-mxt_kyoiku02-100002607_001.pdf",
      landingPageUrl: LANDING_PAGE,
      retrievedAt: RETRIEVED_AT,
      subject: "all",
      applicableGrades: ALL_GRADES,
      reviewStatus: "approved",
      notes: "三つの資質・能力の柱と教育課程全体の考え方を確認する資料。",
      verification: Object.freeze({
        algorithm: "sha256",
        value: "3bd0282ece62ce9415b56c6197017194d73bf3ce6f261832b60c6396875944b9",
        verifiedAt: RETRIEVED_AT,
      }),
    }),
    Object.freeze({
      id: "mext-elementary-japanese-commentary-2017",
      authority: "MEXT",
      title: "小学校学習指導要領（平成29年告示）解説 国語編",
      documentType: "curriculum-commentary",
      noticeYear: 2017,
      publicationYear: 2017,
      officialUrl: "https://www.mext.go.jp/content/20220606-mxt_kyoiku02-100002607_002.pdf",
      landingPageUrl: LANDING_PAGE,
      retrievedAt: RETRIEVED_AT,
      subject: "japanese",
      applicableGrades: ALL_GRADES,
      reviewStatus: "approved",
      notes: "第3・4学年の知識及び技能と三領域を確認。第3学年固有事項は別途明示。",
      verification: Object.freeze({
        algorithm: "sha256",
        value: "4a18f8d0247415c9e27a86e2688b3759cdb0c032a8e07ab51690a13a5fc27c2e",
        verifiedAt: RETRIEVED_AT,
      }),
    }),
    Object.freeze({
      id: "mext-elementary-social-commentary-2017",
      authority: "MEXT",
      title: "小学校学習指導要領（平成29年告示）解説 社会編",
      documentType: "curriculum-commentary",
      noticeYear: 2017,
      publicationYear: 2017,
      officialUrl: "https://www.mext.go.jp/content/20230308-mxt_kyoiku02-100002607_003.pdf",
      landingPageUrl: LANDING_PAGE,
      retrievedAt: RETRIEVED_AT,
      subject: "social-studies",
      applicableGrades: ALL_GRADES,
      reviewStatus: "approved",
      notes: "第3学年の四つの内容項目と調査・資料活用の技能を確認する資料。",
      verification: Object.freeze({
        algorithm: "sha256",
        value: "42e890c5dec5e74f971bd49c2d2e799a5bad9904e9a291903dd987494ca1e3aa",
        verifiedAt: RETRIEVED_AT,
      }),
    }),
    Object.freeze({
      id: "mext-elementary-math-commentary-2017",
      authority: "MEXT",
      title: "小学校学習指導要領（平成29年告示）解説 算数編",
      documentType: "curriculum-commentary",
      noticeYear: 2017,
      publicationYear: 2017,
      officialUrl: "https://www.mext.go.jp/content/20211102-mxt_kyoiku02-100002607_04.pdf",
      landingPageUrl: LANDING_PAGE,
      retrievedAt: RETRIEVED_AT,
      subject: "math",
      applicableGrades: ALL_GRADES,
      reviewStatus: "approved",
      notes: "第3学年のA〜D領域、内容項目、余りを含む除法の学年配当を確認する資料。",
      verification: Object.freeze({
        algorithm: "sha256",
        value: "5eebb7f4ddc516aa47451999659596523a888eb68d49ed7dadeb489c2cd27129",
        verifiedAt: RETRIEVED_AT,
      }),
    }),
  ] satisfies readonly ElementaryCurriculumSource[]);

export const ELEMENTARY_CURRICULUM_SOURCES_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_CURRICULUM_SOURCES.map((source) => [source.id, source])),
) as Readonly<Record<string, ElementaryCurriculumSource>>;
