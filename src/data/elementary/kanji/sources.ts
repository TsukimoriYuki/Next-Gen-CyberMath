import type { ElementaryKanjiSource } from "@/types/elementary-kanji";

export const ELEMENTARY_KANJI_SOURCES: readonly ElementaryKanjiSource[] = [
  {
    id: "mext-elementary-curriculum-2017",
    authority: "MEXT",
    title: "小学校学習指導要領（平成29年告示）",
    documentYear: 2017,
    noticeYear: 2017,
    officialUrl:
      "https://www.mext.go.jp/content/20230120-mxt_kyoiku02-100002604_01.pdf",
    retrievedAt: "2026-07-17",
    usage: "primary-assignment-table",
    reviewStatus: "reviewed",
    notes:
      "別表の学年別漢字配当表を正本とし、画像化された表を公式PDF上で確認した。平成29年改訂の1,026字版。",
  },
  {
    id: "mext-elementary-japanese-guide-2017",
    authority: "MEXT",
    title: "小学校学習指導要領（平成29年告示）解説 国語編",
    documentYear: 2017,
    noticeYear: 2017,
    officialUrl:
      "https://www.mext.go.jp/content/20220606-mxt_kyoiku02-100002607_002.pdf",
    retrievedAt: "2026-07-17",
    usage: "interpretation",
    reviewStatus: "reviewed",
    notes:
      "都道府県名に用いる20字を第4学年へ加え、配当字数を変更した説明を確認した。",
  },
  {
    id: "mext-onkun-allocation-2017",
    authority: "MEXT",
    title: "音訓の小・中・高等学校段階別割り振り表（平成29年3月）",
    documentYear: 2017,
    noticeYear: 2017,
    officialUrl:
      "https://www.mext.go.jp/a_menu/shotou/new-cs/__icsFiles/afieldfile/2017/05/15/1385768.pdf",
    retrievedAt: "2026-07-17",
    usage: "independent-grade-cross-check",
    reviewStatus: "reviewed",
    notes:
      "各漢字の右側に示された平成29年告示の配当学年を独立抽出し、学年別集合の照合に使用した。",
  },
] as const;

export const ELEMENTARY_KANJI_INDEPENDENT_SET_SHA256 = {
  1: "96607bc038db97fb88b350d5be6f867385bb8b68a4532ecfc93683a862afb7bf",
  2: "86028261162a9a067bd232ad240f38b5025057c7e5924ad8fb52777bd471183f",
  3: "436082f9596126c8681c1934727ea59f1968b85a12e38200566d987178b9984a",
  4: "2ac5808d8c89465c843f5a0c06c6644d7a942d5a63d4240606318a1cd3a55d4e",
  5: "143c95e0dbf0aec1c44205f047649ddcf82e49e214a1c559fe0c7ba49242325b",
  6: "7b3d7ae2342f74f5d39fdb756b867d52c0db8967f4c637877ebebf735cd43573",
} as const;

export const ELEMENTARY_KANJI_INDEPENDENT_ALL_SET_SHA256 =
  "4fd20a8ce6d85349e05b5b9ff2e438cab40f8edd1e2a301f8a74eeb7d4fa3ef1";
