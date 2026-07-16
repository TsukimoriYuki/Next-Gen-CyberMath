import type { ElementaryCurriculumEntry } from "@/types/elementary-curriculum";
import {
  defineGrade3CurriculumEntry,
  SOCIAL_SOURCE_ID,
  subjectLocators,
} from "./shared";

const source = (heading: string, printedPages: string) =>
  subjectLocators(
    SOCIAL_SOURCE_ID,
    "第3章 各学年の目標及び内容",
    "第1節 第3学年の目標及び内容",
    heading,
    printedPages,
  );

export const GRADE_3_SOCIAL_STUDIES_CURRICULUM: readonly ElementaryCurriculumEntry[] =
  Object.freeze([
    defineGrade3CurriculumEntry({
      id: "g3-social-local-area-municipality",
      subject: "social-studies",
      domainId: "g3-social-local-area",
      title: "身近な地域や市区町村の様子",
      summary: "場所による土地利用、交通、公共施設、古くから残る建造物などの違いを、方位・地図記号・見学・地図で捉える。",
      objectives: [
        { id: "g3-social-local-area-municipality-knowledge", competency: "knowledge-and-skills", summary: "市の場所によって土地利用、交通、公共施設などの様子に違いがあることを理解する。", assessmentSuitability: "directly-scorable", suggestedEvidence: "地図・写真・資料の読み取り" },
        { id: "g3-social-local-area-municipality-research", competency: "knowledge-and-skills", summary: "見学や地図帳などから情報を集め、方位や主な地図記号を使って白地図等にまとめる。", assessmentSuitability: "project-or-discussion", suggestedEvidence: "架空地域または実地域の調査記録と地図" },
        { id: "g3-social-local-area-municipality-thinking", competency: "thinking-judgment-expression", summary: "場所ごとの様子を比較し、市の特色を考えて表現する。", assessmentSuitability: "observable-in-lesson", suggestedEvidence: "複数資料を根拠にした比較説明" },
      ],
      sourceLocators: source("内容(1) 身近な地域や市区町村の様子", "34-39"),
      recommendedUnitIds: ["local-area-municipality"],
      notes: "架空地域で学べる共通技能と実地域調査を区別し、地域差を全国一律の事実として断定しない。",
    }),
    defineGrade3CurriculumEntry({
      id: "g3-social-production-sales",
      subject: "social-studies",
      domainId: "g3-social-production-sales",
      title: "地域の生産と販売の仕事",
      summary: "販売の仕事と地域で見られる生産の仕事を、消費者の願い、仕事の工夫、他地域との関わりから調べる。",
      objectives: [
        { id: "g3-social-production-sales-knowledge", competency: "knowledge-and-skills", summary: "販売や生産の仕事が消費者の願いを踏まえ、工夫や他地域との関わりをもって行われることを理解する。", assessmentSuitability: "directly-scorable", suggestedEvidence: "仕事の流れや関係を示す資料問題" },
        { id: "g3-social-production-sales-research", competency: "knowledge-and-skills", summary: "見学・聞き取り・地図等から必要な情報を調べ、白地図や文にまとめる。", assessmentSuitability: "project-or-discussion", suggestedEvidence: "架空事例または地域調査の記録" },
        { id: "g3-social-production-sales-thinking", competency: "thinking-judgment-expression", summary: "仕事の種類、場所、工程に着目し、仕事の工夫と人々の生活の関係を考えて表現する。", assessmentSuitability: "observable-in-lesson", suggestedEvidence: "資料比較と理由を伴う説明" },
      ],
      sourceLocators: source("内容(2) 地域に見られる生産や販売の仕事", "39-43"),
      recommendedUnitIds: ["production-sales"],
      notes: "実在店舗・企業を正答条件にせず、地域で選ぶ具体例と全国共通の調査技能を分ける。",
    }),
    defineGrade3CurriculumEntry({
      id: "g3-social-community-safety",
      subject: "social-studies",
      domainId: "g3-social-safety",
      title: "地域の安全を守る働き",
      summary: "火災や事故などから安全を守る関係機関と地域の人々の働き、連携、備えを資料や調査から捉える。",
      objectives: [
        { id: "g3-social-community-safety-knowledge", competency: "knowledge-and-skills", summary: "消防・警察などの関係機関と地域の人々が協力して安全を守ることを理解する。", assessmentSuitability: "directly-scorable", suggestedEvidence: "関係機関の役割と連携を示す資料問題" },
        { id: "g3-social-community-safety-research", competency: "knowledge-and-skills", summary: "見学・聞き取り・地図等から安全を守る働きを調べてまとめる。", assessmentSuitability: "project-or-discussion", suggestedEvidence: "施設・設備・連携の調査記録" },
        { id: "g3-social-community-safety-thinking", competency: "thinking-judgment-expression", summary: "施設・設備の配置や緊急時への備えに着目し、働きの意味を考えて表現する。", assessmentSuitability: "observable-in-lesson", suggestedEvidence: "地図や統計を根拠にした説明" },
      ],
      sourceLocators: source("内容(3) 地域の安全を守る働き", "43-46"),
      recommendedUnitIds: ["community-safety"],
      notes: "地域で選択する事例に応じ、火災・事故等を全国一律の同じ教材に固定しない。",
    }),
    defineGrade3CurriculumEntry({
      id: "g3-social-municipality-change",
      subject: "social-studies",
      domainId: "g3-social-city-change",
      title: "市の様子の移り変わり",
      summary: "交通、公共施設、土地利用、人口、生活道具などの時期による変化を資料から調べ、生活との関わりを考える。",
      objectives: [
        { id: "g3-social-municipality-change-knowledge", competency: "knowledge-and-skills", summary: "市と人々の生活の様子が時間の経過に伴って変化してきたことを理解する。", assessmentSuitability: "directly-scorable", suggestedEvidence: "時期の異なる地図・写真・統計の読み取り" },
        { id: "g3-social-municipality-change-research", competency: "knowledge-and-skills", summary: "古い地図・写真・道具、聞き取り等から情報を調べ、年表などにまとめる。", assessmentSuitability: "project-or-discussion", suggestedEvidence: "複数時点の資料を整理した年表" },
        { id: "g3-social-municipality-change-thinking", competency: "thinking-judgment-expression", summary: "交通や公共施設等の変化を相互に関連付け、市や生活の変化を考えて表現する。", assessmentSuitability: "observable-in-lesson", suggestedEvidence: "変化と生活の関係を示す比較説明" },
      ],
      sourceLocators: source("内容(4) 市の様子の移り変わり", "46-48"),
      recommendedUnitIds: ["municipality-change"],
      notes: "小学6年の歴史内容には広げず、市の生活の変化として扱う。",
    }),
  ]);
