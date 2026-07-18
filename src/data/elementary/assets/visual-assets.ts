import type {
  ElementaryVisualAsset,
} from "@/types/elementary-assets";
import type {
  ElementaryInlineContent,
  ElementaryInlineSegment,
} from "@/types/elementary-content";

const text = (value: string): ElementaryInlineSegment => Object.freeze({ type: "text", text: value });
const plain = (value: string): ElementaryInlineContent => Object.freeze([text(value)]);

const divisionCookiesAsset: ElementaryVisualAsset = Object.freeze({
  id: "division-cookies-12-into-3",
  kind: "diagram",
  title: "12個のクッキーを3人に等分する図",
  creator: "Cyber Math",
  source: Object.freeze({
    sourceType: "original",
    downloadedFilename: "division-cookies-12-into-3.svg",
  }),
  localPath: "/elementary/assets/division-cookies-12-into-3.svg",
  rightsStatus: "cyber-math-original",
  licenseId: null,
  licenseUrl: null,
  attributionText: "Cyber Math独自作成",
  shortCredit: plain("Cyber Mathが作った図"),
  modification: Object.freeze({ modified: false }),
  retrievedAt: "2026-07-17",
  reviewedAt: "2026-07-17",
  reviewStatus: "approved",
  sourceVerified: true,
  humanReviewNotes: "独自作成SVG。外部素材、外部参照、個人情報を含まないことを確認済み。",
  checksumSha256: "6dd384baed2a03111b5f3706ce2e3a137f47119eca9ad666185aed517cd74c0c",
  mimeType: "image/svg+xml",
  width: 960,
  height: 480,
  fileSizeBytes: 2565,
  alt: plain("12このクッキーを3人へ4こずつ分けた図"),
  caption: plain("3人へ同じ数ずつ分けると、一人分は4こです。"),
  decorative: false,
  usage: Object.freeze({
    purpose: "concept-explanation",
    gradeIds: Object.freeze(["grade-3"] as const),
    subjectIds: Object.freeze(["math"] as const),
    lessonIds: Object.freeze([
      "elementary-grade-3-math-division-dialogue-showcase",
      "elementary-grade-3-math-division-meaning",
    ] as const),
  }),
});

const neighborhoodMapAsset: ElementaryVisualAsset = Object.freeze({
  id: "hikari-city-aoba-neighborhood-map",
  kind: "map",
  title: "ひかり市 あおば小学校のまわりの学習用地図",
  creator: "Cyber Math",
  source: Object.freeze({
    sourceType: "original",
    downloadedFilename: "hikari-city-aoba-neighborhood-map.svg",
  }),
  localPath: "/elementary/assets/hikari-city-aoba-neighborhood-map.svg",
  rightsStatus: "cyber-math-original",
  licenseId: null,
  licenseUrl: null,
  attributionText: "Cyber Math独自作成",
  shortCredit: plain("Cyber Mathが作った学習用の地図"),
  modification: Object.freeze({ modified: false }),
  retrievedAt: "2026-07-17",
  reviewedAt: "2026-07-17",
  reviewStatus: "approved",
  sourceVerified: true,
  humanReviewNotes:
    "独自作成SVG。実在の市・学校・店を使わない学習用の地図。外部素材、外部参照、個人情報を含まないことを確認済み。",
  checksumSha256: "fa3163358453eec8048d73f9676e60aac63f5c62b22dc059625ae50c739464b7",
  mimeType: "image/svg+xml",
  width: 720,
  height: 560,
  fileSizeBytes: 6287,
  alt: plain(
    "学習用の地図です。中央にあおば小学校、上（北）に公園、下（南）に駅とお店、右（東）に家、左（西）に川があります。",
  ),
  caption: plain("学習用の地図です。上が北で、はんれいや記号を使って読み取ります。"),
  decorative: false,
  usage: Object.freeze({
    purpose: "geographic-reference",
    gradeIds: Object.freeze(["grade-3"] as const),
    subjectIds: Object.freeze(["social-studies"] as const),
    lessonIds: Object.freeze([
      "elementary-grade-3-social-read-neighborhood-map",
    ] as const),
  }),
});

function expansionAsset(options: Readonly<{
  id: string;
  filename: string;
  title: string;
  checksum: string;
  fileSizeBytes: number;
  width: number;
  height: number;
  alt: string;
  caption: string;
  subject: "math" | "social-studies";
  lessonId: string;
}>): ElementaryVisualAsset {
  return Object.freeze({
    id: options.id,
    kind: "diagram",
    title: options.title,
    creator: "Cyber Math",
    source: Object.freeze({ sourceType: "original", downloadedFilename: options.filename }),
    localPath: `/elementary/assets/${options.filename}`,
    rightsStatus: "cyber-math-original",
    licenseId: null,
    licenseUrl: null,
    attributionText: "Cyber Math独自作成",
    shortCredit: plain("Cyber Mathが作った図"),
    modification: Object.freeze({ modified: false }),
    retrievedAt: "2026-07-18",
    reviewedAt: "2026-07-18",
    reviewStatus: "approved",
    sourceVerified: true,
    humanReviewNotes: "独自作成SVG。外部素材、外部参照、個人情報を含まないことを確認済み。公開可否は教材のrelease reviewで別に判断する。",
    checksumSha256: options.checksum,
    mimeType: "image/svg+xml",
    width: options.width,
    height: options.height,
    fileSizeBytes: options.fileSizeBytes,
    alt: plain(options.alt),
    caption: plain(options.caption),
    decorative: false,
    usage: Object.freeze({
      purpose: "concept-explanation",
      gradeIds: Object.freeze(["grade-3"] as const),
      subjectIds: Object.freeze([options.subject]),
      lessonIds: Object.freeze([options.lessonId]),
    }),
  });
}

const expansionAssets = [
  expansionAsset({
    id: "division-remainders-14-into-4", filename: "division-remainders-14-into-4.svg", title: "14個を4個ずつ分ける図",
    checksum: "ba7b9d7ec7015b8917b5381e11ad22cdf0c450fa5155bd16537c9bfb6cc97035", fileSizeBytes: 1588, width: 960, height: 480,
    alt: "14こを4こずつに分けると、3つのまとまりと、あまり2こになる図", caption: "14÷4＝3あまり2を、まとまりとあまりで表します。", subject: "math", lessonId: "elementary-grade-3-math-division-with-remainders",
  }),
  expansionAsset({
    id: "decimal-tenths-number-line", filename: "decimal-tenths-number-line.svg", title: "0から1までを10等分した数直線",
    checksum: "056f93b15aa5c669e3662d83deca0c544e2e27ad08ae8152acefd08ef4a18e90", fileSizeBytes: 1414, width: 960, height: 420,
    alt: "0から1までを10こに同じ大きさで分け、0.1ずつしめした数直線", caption: "1を10等分した一つ分が0.1です。", subject: "math", lessonId: "elementary-grade-3-math-tenths-and-decimals",
  }),
  expansionAsset({
    id: "fraction-equal-parts-tape", filename: "fraction-equal-parts-tape.svg", title: "1本のテープを4等分した図",
    checksum: "d9a06776d30102cf51801c577fa6495d6376e68ec41e95de4722be6d12adf5f0", fileSizeBytes: 1075, width: 960, height: 420,
    alt: "1本のテープを同じ長さに4つへ分け、一つ分を4分の1としめす図", caption: "4分の1が3つ分なら、4分の3です。", subject: "math", lessonId: "elementary-grade-3-math-parts-of-a-whole",
  }),
  expansionAsset({
    id: "goods-to-store-flow", filename: "goods-to-store-flow.svg", title: "品物がお店へ届くまでの流れ",
    checksum: "3e3dd4361d543cae4c8b958f1eeae189ae9ddbd4e491a537434ecd4d877322ad", fileSizeBytes: 1668, width: 960, height: 480,
    alt: "作る場所、そうこ、はいたつトラック、あおば店、家を矢じるしでつないだ学習用の図", caption: "ひかり市の学習用のれいです。品物や地いきで道すじはちがいます。", subject: "social-studies", lessonId: "elementary-grade-3-social-goods-to-store",
  }),
] as const;

function waveTwoAsset(options: Readonly<{
  id: string;
  filename: string;
  title: string;
  checksum: string;
  fileSizeBytes: number;
  alt: string;
  caption: string;
  lessonIds: readonly string[];
  kind?: "diagram" | "chart";
}>): ElementaryVisualAsset {
  return Object.freeze({
    id: options.id,
    kind: options.kind ?? "diagram",
    title: options.title,
    creator: "Cyber Math",
    source: Object.freeze({ sourceType: "original", downloadedFilename: options.filename }),
    localPath: `/elementary/assets/${options.filename}`,
    rightsStatus: "cyber-math-original",
    licenseId: null,
    licenseUrl: null,
    attributionText: "Cyber Math独自作成",
    shortCredit: plain("Cyber Mathが作った図"),
    modification: Object.freeze({ modified: false }),
    retrievedAt: "2026-07-18",
    reviewedAt: "2026-07-18",
    reviewStatus: "approved",
    sourceVerified: true,
    humanReviewNotes: "独自作成SVG。外部素材、外部参照、個人情報、安全でない要素を含まないことを確認済み。教材内容の人間レビューは別に行う。",
    checksumSha256: options.checksum,
    mimeType: "image/svg+xml",
    width: 960,
    height: 480,
    fileSizeBytes: options.fileSizeBytes,
    alt: plain(options.alt),
    caption: plain(options.caption),
    decorative: false,
    usage: Object.freeze({
      purpose: "concept-explanation",
      gradeIds: Object.freeze(["grade-3"] as const),
      subjectIds: Object.freeze(["math"] as const),
      lessonIds: Object.freeze([...options.lessonIds]),
    }),
  });
}

const expansionWaveTwoAssets = [
  waveTwoAsset({
    id: "large-number-place-value-chart", filename: "large-number-place-value-chart.svg", title: "大きな数のくらい表",
    checksum: "caf41f6e0ff5c1f4ec6f8a19ee6aa5bd95a437e19d6b27d08a2765b8b9a0179f", fileSizeBytes: 1408,
    alt: "30005を万、千、百、十、一のくらいに分け、3、0、0、0、5をおいた表", caption: "0も、ほかの数字のくらいをたもつ大切な数字です。",
    lessonIds: ["elementary-grade-3-math-read-large-numbers"],
  }),
  waveTwoAsset({
    id: "addition-subtraction-columns", filename: "addition-subtraction-columns.svg", title: "たし算とひき算のくらいをそろえる図",
    checksum: "3d3defca8d6b153959a3bb144d65d46618418cbe13054b291618291980acea51", fileSizeBytes: 1307,
    alt: "2345と408を、一、十、百、千の同じくらいがたてにそろうようにならべた図", caption: "ひっ算は、同じくらいをたてにそろえます。",
    lessonIds: ["elementary-grade-3-math-large-number-addition-subtraction"],
  }),
  waveTwoAsset({
    id: "multiplication-decomposition-array", filename: "multiplication-decomposition-array.svg", title: "かけ算を分けて考えるはい列図",
    checksum: "fb783a91014394ea51d1ac04c65b6d4f10bb5175eeb9aabe6e5b551ba97ea121", fileSizeBytes: 1301,
    alt: "24かける3を、20こが3だんと4こが3だんに分け、60と12を合わせて72にする図", caption: "24を20と4に分けると、かけ算のひっ算のわけが見えます。",
    lessonIds: ["elementary-grade-3-math-two-digit-times-one-digit", "elementary-grade-3-math-three-digit-times-one-digit"],
  }),
  waveTwoAsset({
    id: "length-ruler-and-route", filename: "length-ruler-and-route.svg", title: "ものさしと道のりの図",
    checksum: "0fde426f917ceb0d06fbf2debcee05b7fb5cb645d831ec63e10a741cf1a8d45f", fileSizeBytes: 1932,
    alt: "ものさしの2cmから7cmまでが5cmになるれいと、家から店、学校へ進む道のりの図", caption: "長さは目もりのちがい、道のりは通った道の合計で考えます。",
    lessonIds: ["elementary-grade-3-math-measure-length"],
  }),
  waveTwoAsset({
    id: "weight-scale-and-time-line", filename: "weight-scale-and-time-line.svg", title: "重さのはかりと時間の線",
    checksum: "e64b237fc373752938c04232419949b10bdf34c6ea7d3fbd48e291dec03a4911", fileSizeBytes: 1502,
    alt: "0gから1kgまでのはかりと、10時50分から11時10分までを10分ずつに分けた時間の線", caption: "目もり1こ分と、60分の区切りをたしかめます。",
    lessonIds: ["elementary-grade-3-math-measure-weight", "elementary-grade-3-math-time-and-duration"],
  }),
  waveTwoAsset({
    id: "triangle-classification", filename: "triangle-classification.svg", title: "三角形のなかま分け",
    checksum: "3027abcaa580d44f9e60223d2eac062aa9f3330a3ec42e8ff074dd5f453c089b", fileSizeBytes: 1140,
    alt: "同じ長さのへんをしるしでしめした二等へん三角形と正三角形、まがった線をふくむ三角形ではない形", caption: "向きや色ではなく、へんの数と長さでなかまを見つけます。",
    lessonIds: ["elementary-grade-3-math-classify-triangles"],
  }),
  waveTwoAsset({
    id: "circle-sphere-structure", filename: "circle-sphere-structure.svg", title: "円と球の中心・半けい・直けい",
    checksum: "7881db6fe8d372198c9a7ba79bf8ef554be202530f4157fc5932f3e52a90e3d0", fileSizeBytes: 1370,
    alt: "平らな円の中心、半けい、直けいと、立体の球をくらべた図", caption: "直けいは中心を通る半けい2本分です。円は平ら、球は立体です。",
    lessonIds: ["elementary-grade-3-math-circles-and-spheres"],
  }),
  waveTwoAsset({
    id: "table-and-bar-graph", filename: "table-and-bar-graph.svg", title: "すきな遊びの表とぼうグラフ",
    checksum: "a3226b29a77cb9d9d708cdf71d72def9551eeec0f3eeee369a6d42e16372e8ce", fileSizeBytes: 1918,
    alt: "おにごっこ12人、なわとび8人、読書6人、おり紙4人を表とぼうグラフでしめした図", caption: "題名、たんい、目もりを見て、表とぼうグラフをくらべます。",
    lessonIds: ["elementary-grade-3-math-tables-and-bar-graphs"], kind: "chart",
  }),
] as const;

export const ELEMENTARY_VISUAL_ASSETS: readonly ElementaryVisualAsset[] = Object.freeze([
  divisionCookiesAsset,
  neighborhoodMapAsset,
  ...expansionAssets,
  ...expansionWaveTwoAssets,
]);
