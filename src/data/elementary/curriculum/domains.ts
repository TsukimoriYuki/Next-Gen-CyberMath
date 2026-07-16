import type { ElementaryCurriculumDomain } from "@/types/elementary-curriculum";

const GENERAL = "mext-elementary-curriculum-2017";

const DOMAINS = [
    { id: "g3-math-numbers-calculation", subject: "math", gradeIds: ["grade-3"], title: "A 数と計算", developerLabel: "numbers-and-calculation", childFacingTitle: "数と計算", order: 1, sourceIds: [GENERAL, "mext-elementary-math-commentary-2017"] },
    { id: "g3-math-geometry", subject: "math", gradeIds: ["grade-3"], title: "B 図形", developerLabel: "geometry", childFacingTitle: "図形", order: 2, sourceIds: [GENERAL, "mext-elementary-math-commentary-2017"] },
    { id: "g3-math-measurement", subject: "math", gradeIds: ["grade-3"], title: "C 測定", developerLabel: "measurement", childFacingTitle: "長さ・重さ・時間", order: 3, sourceIds: [GENERAL, "mext-elementary-math-commentary-2017"] },
    { id: "g3-math-data", subject: "math", gradeIds: ["grade-3"], title: "D データの活用", developerLabel: "data-use", childFacingTitle: "表とグラフ", order: 4, sourceIds: [GENERAL, "mext-elementary-math-commentary-2017"] },
    { id: "g3-japanese-knowledge-skills", subject: "japanese", gradeIds: ["grade-3"], title: "知識及び技能", developerLabel: "knowledge-and-skills", childFacingTitle: "ことばの力", order: 1, sourceIds: [GENERAL, "mext-elementary-japanese-commentary-2017"] },
    { id: "g3-japanese-speaking-listening", subject: "japanese", gradeIds: ["grade-3"], title: "A 話すこと・聞くこと", developerLabel: "speaking-and-listening", childFacingTitle: "話す・聞く", order: 2, sourceIds: [GENERAL, "mext-elementary-japanese-commentary-2017"] },
    { id: "g3-japanese-writing", subject: "japanese", gradeIds: ["grade-3"], title: "B 書くこと", developerLabel: "writing", childFacingTitle: "書く", order: 3, sourceIds: [GENERAL, "mext-elementary-japanese-commentary-2017"] },
    { id: "g3-japanese-reading", subject: "japanese", gradeIds: ["grade-3"], title: "C 読むこと", developerLabel: "reading", childFacingTitle: "読む", order: 4, sourceIds: [GENERAL, "mext-elementary-japanese-commentary-2017"] },
    { id: "g3-social-local-area", subject: "social-studies", gradeIds: ["grade-3"], title: "身近な地域や市区町村の様子", developerLabel: "local-area-and-municipality", order: 1, sourceIds: [GENERAL, "mext-elementary-social-commentary-2017"] },
    { id: "g3-social-production-sales", subject: "social-studies", gradeIds: ["grade-3"], title: "地域に見られる生産や販売の仕事", developerLabel: "local-production-and-sales", order: 2, sourceIds: [GENERAL, "mext-elementary-social-commentary-2017"] },
    { id: "g3-social-safety", subject: "social-studies", gradeIds: ["grade-3"], title: "地域の安全を守る働き", developerLabel: "local-safety", order: 3, sourceIds: [GENERAL, "mext-elementary-social-commentary-2017"] },
    { id: "g3-social-city-change", subject: "social-studies", gradeIds: ["grade-3"], title: "市の様子の移り変わり", developerLabel: "municipality-change", order: 4, sourceIds: [GENERAL, "mext-elementary-social-commentary-2017"] },
  ] as const satisfies readonly ElementaryCurriculumDomain[];

export const ELEMENTARY_CURRICULUM_DOMAINS: readonly ElementaryCurriculumDomain[] =
  Object.freeze(DOMAINS.map((domain) => Object.freeze({
    ...domain,
    gradeIds: Object.freeze(domain.gradeIds),
    sourceIds: Object.freeze(domain.sourceIds),
  })));

export const ELEMENTARY_CURRICULUM_DOMAINS_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_CURRICULUM_DOMAINS.map((domain) => [domain.id, domain])),
) as Readonly<Record<string, ElementaryCurriculumDomain>>;
