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
      "正弦定理・余弦定理・面積公式を、共通テストの誘導に合わせて選び切るための重点講座です。",
    subject: "数学IA",
    unit: "図形と計量",
    difficulty: "標準",
    recommendedMinutes: 45,
    tags: ["重点講座", "正弦定理", "余弦定理", "面積公式", "本番判断", "図形読解"],
    publishedAt: "2026-06-26",
    blocks: [
      {
        id: "opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "図形と計量では、計算力よりも「どの条件から見るか」で差がつきます。公式を覚えるだけでなく、共通テストの誘導に乗る判断順を作ります。",
      },
      {
        id: "first-look-heading",
        type: "heading",
        level: 2,
        text: "1. 図形と計量で最初に見るべきもの",
      },
      {
        id: "first-look-text",
        type: "paragraph",
        text:
          "最初に見るのは、辺・角・面積の3つです。どれが与えられ、どれが問われているかを図に書き込みます。ここで公式を決め打ちしないのが大事です。",
      },
      {
        id: "first-look-checklist",
        type: "checklist",
        title: "最初の30秒で確認すること",
        items: [
          "向かい合う辺と角のペアがあるか",
          "2辺とその間の角が分かっているか",
          "3辺、または最大の角に関する条件があるか",
          "面積、円、補角、同じ角が登場しているか",
        ],
      },
      {
        id: "sin-priority-heading",
        type: "heading",
        level: 2,
        text: "2. sinを求めたいときの優先順位",
      },
      {
        id: "sin-priority-text",
        type: "paragraph",
        text:
          "$\\sin\\theta$ を求める問題でも、最初からsinを直接探すとは限りません。角そのもの、$\\cos\\theta$、面積、同じ円周角の順に候補を見ます。",
      },
      {
        id: "sin-priority-callout",
        type: "callout",
        tone: "success",
        title: "優先順位",
        text:
          "1. 角が直接分かる  2. 余弦定理で $\\cos\\theta$ が出る  3. 面積公式から $\\sin\\theta$ が出る  4. 補角・円周角で同じsinを探す",
      },
      {
        id: "sine-rule-heading",
        type: "heading",
        level: 2,
        text: "3. 正弦定理を使える場面",
      },
      {
        id: "sine-rule-text",
        type: "paragraph",
        text:
          "正弦定理は、辺とその向かいの角がセットで見えるときに使います。共通テストでは、外接円の半径を求めるより、別の辺や角へ情報を運ぶために使うことが多いです。",
      },
      {
        id: "sine-rule-math",
        type: "math",
        expression: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R",
        caption: "辺と向かいの角をセットにして読む。隣の角と辺を混ぜない。",
      },
      {
        id: "cos-to-sin-heading",
        type: "heading",
        level: 2,
        text: "4. 余弦定理からcos、そしてsinへ",
      },
      {
        id: "cos-to-sin-text",
        type: "paragraph",
        text:
          "2辺とその間の角、または3辺が見えるなら余弦定理です。$\\cos\\theta$ が出たあとに $\\sin^2\\theta=1-\\cos^2\\theta$ でsinへつなぎます。",
      },
      {
        id: "cosine-rule-math",
        type: "math",
        expression: "c^2=a^2+b^2-2ab\\cos C",
        caption: "$\\cos C$ の符号で鋭角・鈍角の判断までできる。",
      },
      {
        id: "angle-sign-heading",
        type: "heading",
        level: 2,
        text: "5. 鋭角・鈍角の符号確認",
      },
      {
        id: "angle-sign-text",
        type: "paragraph",
        text:
          "数学IAの三角形では $0^\\circ<C<180^\\circ$ なので $\\sin C$ は正です。一方で $\\cos C$ は鈍角なら負になります。符号ミスの多くはここで起きます。",
      },
      {
        id: "area-heading",
        type: "heading",
        level: 2,
        text: "6. 面積公式と辺の長さの関係",
      },
      {
        id: "area-text",
        type: "paragraph",
        text:
          "面積が出てきたら、2辺とはさむ角のsinを考えます。面積からsin、余弦定理からcosが同時に出ると、角の判断がかなり安定します。",
      },
      {
        id: "area-math",
        type: "math",
        expression: "S=\\frac{1}{2}ab\\sin C",
        caption: "辺の長さと角をつなぐ、共通テストで非常に使いやすい式。",
      },
      {
        id: "same-sin-heading",
        type: "heading",
        level: 2,
        text: "7. 補角・円周角・同じsinを探す",
      },
      {
        id: "same-sin-text",
        type: "paragraph",
        text:
          "$\\sin(180^\\circ-\\theta)=\\sin\\theta$ です。円に内接する図形や補角の条件があるときは、違う角に見えても同じsinを使えることがあります。",
      },
      {
        id: "same-sin-math",
        type: "math",
        expression: "\\sin(180^\\circ-\\theta)=\\sin\\theta,\\quad \\cos(180^\\circ-\\theta)=-\\cos\\theta",
        caption: "sinは同じ、cosは符号が変わる。この違いを本番で落とさない。",
      },
      {
        id: "original-problem-heading",
        type: "heading",
        level: 2,
        text: "8. 共通テスト形式オリジナル問題",
      },
      {
        id: "original-problem",
        type: "problem",
        title: "図形と計量：誘導に乗る問題",
        prompt:
          "三角形ABCにおいて、AB=6, AC=8, \\angle A=60^\\circ とする。辺BCを $a$ とする。次の問いに答えよ。\n\n(1) $a^2$ の値を求めよ。\n(2) 三角形ABCの面積 $S$ を求めよ。\n(3) $\\sin B$ の値を求めよ。",
        choices: [
          "$a^2=52,\\ S=12\\sqrt3,\\ \\sin B=\\frac{4\\sqrt3}{\\sqrt{52}}$",
          "$a^2=28,\\ S=12\\sqrt3,\\ \\sin B=\\frac{4\\sqrt3}{\\sqrt{28}}$",
          "$a^2=52,\\ S=24\\sqrt3,\\ \\sin B=\\frac{8\\sqrt3}{\\sqrt{52}}$",
          "$a^2=100,\\ S=24\\sqrt3,\\ \\sin B=\\frac{4\\sqrt3}{10}$",
        ],
        answer: "$a^2=52,\\ S=12\\sqrt3,\\ \\sin B=\\frac{4\\sqrt3}{\\sqrt{52}}$",
        points: 8,
        mistakeTags: ["公式選択ミス", "計算ミス", "条件見落とし", "図の見落とし"],
      },
      {
        id: "expert-thinking",
        type: "expertThinking",
        items: [
          {
            label: "まず見るところ",
            body: "AB=6, AC=8, \\angle A=60^\\circ。2辺とはさむ角がそろっているので、辺BCは余弦定理で出せる。",
          },
          {
            label: "怪しい条件",
            body: "最後に $\\sin B$ を聞いている。角Bを直接求めるより、正弦定理で辺ACと角Bをつなぐのが自然。",
          },
          {
            label: "使う公式候補",
            body: "余弦定理、面積公式、正弦定理。順番は「BC→面積→正弦定理」。",
          },
          {
            label: "決め手",
            body: "2辺とはさむ角があるので余弦定理。$\\sin B$ は向かいの辺AC=8とセットで正弦定理に乗せる。",
          },
          {
            label: "本番判断",
            body: "最初の小問で $a^2$ を出させているので、誘導は余弦定理。角Bを三角比表で探しにいかない。",
          },
          {
            label: "撤退ライン",
            body: "最後の $\\sin B$ で詰まったら、(1)(2)まで確実に取り、正弦定理の形だけ書いて次へ進む。",
          },
        ],
      },
      {
        id: "tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "ヒント",
            body: "(1)は2辺とはさむ角なので余弦定理です。(3)は角Bを直接求めず、正弦定理で $AC$ と $\\sin B$ をつなぎます。",
          },
          {
            label: "方針",
            body: "まず $BC^2$ を求めます。次に面積公式で $S$ を出します。最後は $\\frac{AC}{\\sin B}=\\frac{BC}{\\sin A}$ を使います。",
          },
          {
            label: "詳しい解説",
            body:
              "(1) $a^2=6^2+8^2-2\\cdot6\\cdot8\\cos60^\\circ=36+64-48=52$。\n\n(2) $S=\\frac12\\cdot6\\cdot8\\sin60^\\circ=24\\cdot\\frac{\\sqrt3}{2}=12\\sqrt3$。\n\n(3) 正弦定理より $\\frac{8}{\\sin B}=\\frac{\\sqrt{52}}{\\sin60^\\circ}$。したがって $\\sin B=\\frac{8\\sin60^\\circ}{\\sqrt{52}}=\\frac{4\\sqrt3}{\\sqrt{52}}$。",
          },
          {
            label: "最速解法",
            body: "2辺とはさむ角を見た瞬間に、$a^2=100-48=52$。面積は $24\\cdot\\frac{\\sqrt3}{2}=12\\sqrt3$。最後は正弦定理で $\\sin B=\\frac{8\\sin60^\\circ}{a}$ と置けば終わりです。",
          },
          {
            label: "よくあるミス",
            body: "$2\\cdot6\\cdot8\\cos60^\\circ$ を $96$ のまま引いてしまう。$\\sin60^\\circ$ と $\\cos60^\\circ$ を逆にする。正弦定理で、辺と向かいの角の対応をずらす。",
          },
          {
            label: "類題",
            body: "三角形ABCで AB=5, AC=9, \\angle A=120^\\circ とする。$BC^2$、面積、$\\sin B$ を同じ流れで求めてください。鈍角なので $\\cos120^\\circ$ の符号に注意します。",
          },
        ],
      },
      {
        id: "fast-and-withdraw",
        type: "callout",
        tone: "warning",
        title: "10. 最速解法と撤退ライン",
        text:
          "最速解法は、公式をたくさん試すことではありません。誘導の小問が何を出させたいかを読み、使う公式を1本に絞ることです。最後の設問で式が立たなければ、前半の得点を守って次へ進みます。",
      },
      {
        id: "mistake-check",
        type: "checklist",
        title: "11. よくあるミスを最後に確認",
        items: [
          "$\\cos60^\\circ=\\frac12$ を入れ忘れる",
          "面積公式で $\\frac12$ を落とす",
          "正弦定理で辺と向かいの角をずらす",
          "$\\sqrt{52}$ を無理に小数化して時間を使う",
        ],
      },
      {
        id: "related",
        type: "relatedProblems",
        title: "12. 類題と次の演習",
        items: [
          {
            title: "数学IA 第1問 図形と計量",
            href: "/common-test/math-1a/section-1",
            note: "講義後に15分で確認する",
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
