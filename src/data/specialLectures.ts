export type LectureDifficulty = "基礎" | "標準" | "発展";

export type MistakeDiagnosisTag =
  | "計算ミス"
  | "公式選択ミス"
  | "問題文の読み違い"
  | "条件見落とし"
  | "場合分け不足"
  | "図の見落とし"
  | "時間切れ"
  | "自信ありで間違えた"
  | "自信なしで正解した";

export interface Lecture {
  id: string;
  slug: string;
  title: string;
  description: string;
  subject: string;
  unit: string;
  difficulty: LectureDifficulty;
  recommendedMinutes: number;
  tags: string[];
  publishedAt: string;
  blocks: LectureBlock[];
}

export type LectureBlock =
  | { id: string; type: "heading"; level: 2 | 3; text: string }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "math"; expression: string; caption?: string }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | {
      id: string;
      type: "problem";
      title: string;
      prompt: string;
      choices?: string[];
      answer?: string;
      points?: number;
      mistakeTags?: MistakeDiagnosisTag[];
    }
  | { id: string; type: "explanationTabs"; tabs: ExplanationTab[] }
  | { id: string; type: "expertThinking"; items: ExpertThinkingItem[] }
  | { id: string; type: "checklist"; title?: string; items: string[] }
  | { id: string; type: "relatedProblems"; title?: string; items: RelatedProblem[] }
  | { id: string; type: "callout"; tone: "info" | "warning" | "success"; title?: string; text: string };

export interface ExplanationTab {
  label: "ヒント" | "方針" | "詳しい解説" | "最速解法" | "よくあるミス" | "類題";
  body: string;
}

export interface ExpertThinkingItem {
  label:
    | "まず見るところ"
    | "怪しい条件"
    | "使う公式候補"
    | "決め手"
    | "本番判断"
    | "撤退ライン";
  body: string;
}

export interface RelatedProblem {
  title: string;
  href?: string;
  note?: string;
}

export const MISTAKE_DIAGNOSIS_TAGS: MistakeDiagnosisTag[] = [
  "計算ミス",
  "公式選択ミス",
  "問題文の読み違い",
  "条件見落とし",
  "場合分け不足",
  "図の見落とし",
  "時間切れ",
  "自信ありで間違えた",
  "自信なしで正解した",
];

export const SPECIAL_LECTURES: Lecture[] = [
  {
    id: "lecture-geometry-measurement-001",
    slug: "geometry-measurement-intensive",
    title: "共通テスト 図形と計量 徹底講座",
    description:
      "正弦定理・余弦定理・面積公式を、共通テストの誘導に合わせて選び切るための特別講義です。",
    subject: "数学IA",
    unit: "図形と計量",
    difficulty: "標準",
    recommendedMinutes: 35,
    tags: ["正弦定理", "余弦定理", "面積公式", "本番判断", "図形読解"],
    publishedAt: "2026-06-26",
    blocks: [
      {
        id: "intro-heading",
        type: "heading",
        level: 2,
        text: "図形と計量で最初に見る条件",
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        text:
          "図形と計量は、計算を始める前の条件整理でほぼ勝負が決まります。辺が分かっているのか、角が分かっているのか、面積が絡むのかを先に見ます。",
      },
      {
        id: "law-selection",
        type: "checklist",
        title: "公式を選ぶ前の確認",
        items: [
          "向かい合う辺と角のペアがあるなら正弦定理を疑う",
          "2辺とその間の角、または3辺が見えるなら余弦定理を疑う",
          "面積が出るなら $S=\\frac12 ab\\sin C$ を候補に入れる",
          "角が鋭角か鈍角かで符号や値の取り違えを確認する",
        ],
      },
      {
        id: "sine-rule",
        type: "heading",
        level: 3,
        text: "正弦定理を使う場面",
      },
      {
        id: "sine-rule-text",
        type: "paragraph",
        text:
          "正弦定理は、辺とその向かいの角をつなぐ公式です。共通テストでは、直接求めるよりも、誘導の途中で比をそろえるために使うことが多いです。",
      },
      {
        id: "sine-rule-math",
        type: "math",
        expression: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R",
        caption: "辺と向かいの角のペアを見つけたら候補に入れる。",
      },
      {
        id: "cosine-rule",
        type: "heading",
        level: 3,
        text: "余弦定理を使う場面",
      },
      {
        id: "cosine-rule-text",
        type: "paragraph",
        text:
          "余弦定理は、2辺とその間の角、または3辺から角を調べるときに使います。$\\cos C$ の符号で鋭角・鈍角を判断する場面は特に注意します。",
      },
      {
        id: "cosine-rule-math",
        type: "math",
        expression: "c^2=a^2+b^2-2ab\\cos C",
        caption: "角の種類まで判断できるのが強み。",
      },
      {
        id: "sin-thinking",
        type: "callout",
        tone: "info",
        title: "sinを求めるときの考え方",
        text:
          "$\\sin\\theta$ を直接求めにいく前に、$\\cos\\theta$ が出せるかを確認します。$\\sin^2\\theta=1-\\cos^2\\theta$ を使う場合、角の範囲で符号を決めます。",
      },
      {
        id: "expert-thinking",
        type: "expertThinking",
        items: [
          {
            label: "まず見るところ",
            body: "辺、角、面積のどれが与えられているか。向かい合うペアがあるか。",
          },
          {
            label: "怪しい条件",
            body: "鈍角、最大の角、円に内接、面積一定など。符号ミスや公式選択ミスが起きやすい。",
          },
          {
            label: "使う公式候補",
            body: "正弦定理、余弦定理、面積公式、$\\sin^2\\theta+\\cos^2\\theta=1$。",
          },
          {
            label: "決め手",
            body: "向かいの辺と角がセットなら正弦定理。2辺とはさむ角なら余弦定理。",
          },
          {
            label: "本番判断",
            body: "最初の2分で図に情報を書き込み、使う公式を2候補まで絞る。",
          },
          {
            label: "撤退ライン",
            body: "式が2本以上立たない場合は深追いしない。次の設問の誘導で戻れるか確認する。",
          },
        ],
      },
      {
        id: "original-problem",
        type: "problem",
        title: "共通テスト形式のオリジナル問題",
        prompt:
          "三角形ABCにおいて、AB=5, AC=7, \\angle A=60^\\circ とする。辺BCの長さと、三角形ABCの面積を求めよ。",
        choices: ["BC=\\sqrt{39}, 面積=\\frac{35\\sqrt3}{4}", "BC=\\sqrt{37}, 面積=\\frac{35\\sqrt3}{4}", "BC=\\sqrt{39}, 面積=\\frac{35}{4}", "BC=39, 面積=\\frac{35\\sqrt3}{2}"],
        answer: "BC=\\sqrt{39}, 面積=\\frac{35\\sqrt3}{4}",
        points: 6,
        mistakeTags: ["公式選択ミス", "計算ミス", "図の見落とし"],
      },
      {
        id: "tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "ヒント",
            body: "2辺とその間の角が分かっているので、まず余弦定理を使います。面積は $\\frac12 ab\\sin C$ です。",
          },
          {
            label: "方針",
            body: "BCを余弦定理で求め、面積はABとACとはさむ角Aから求めます。",
          },
          {
            label: "詳しい解説",
            body: "$BC^2=5^2+7^2-2\\cdot5\\cdot7\\cos60^\\circ=25+49-35=39$。よって $BC=\\sqrt{39}$。面積は $\\frac12\\cdot5\\cdot7\\cdot\\sin60^\\circ=\\frac{35\\sqrt3}{4}$。",
          },
          {
            label: "最速解法",
            body: "2辺とはさむ角が見えた瞬間に余弦定理、面積公式を同時に確定します。計算は $74-35=39$ だけです。",
          },
          {
            label: "よくあるミス",
            body: "$2ab\\cos A$ の2を落とす、$\\sin60^\\circ$ と $\\cos60^\\circ$ を逆にする、最後に平方根を取り忘れる。",
          },
          {
            label: "類題",
            body: "AB=6, AC=8, \\angle A=120^\\circ のとき、BCと面積を求めてください。鈍角なので余弦の符号に注意します。",
          },
        ],
      },
      {
        id: "related",
        type: "relatedProblems",
        title: "次に解くと定着しやすい演習",
        items: [
          {
            title: "数学IA 第1問 図形と計量",
            href: "/common-test/math-1a/section-1",
            note: "講義直後に15分で確認する",
          },
          {
            title: "数学IA 本番演習",
            href: "/common-test/simulator/math-1a-70",
            note: "時間内スコアとの差を見る",
          },
        ],
      },
    ],
  },
];

export function getSpecialLectureBySlug(slug: string): Lecture | undefined {
  return SPECIAL_LECTURES.find((lecture) => lecture.slug === slug);
}
