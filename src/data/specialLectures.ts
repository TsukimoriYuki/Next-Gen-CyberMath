import {
  createTriangleGeometryLayerBlock,
  DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
} from "@/lib/lecture-geometry-svg";
import {
  createPowerOfPointSvg,
  createProbabilityCountingSvg,
  createQuadraticAxisCasesSvg,
} from "@/lib/lecture-diagram-svg";

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

export interface SpecialLectureRoadmapStep {
  slug: string;
  purpose: string;
  recommendedTiming: string;
}

export interface GeometryLayer {
  id: string;
  label: string;
  image: {
    src: string;
    alt: string;
  };
  explanation?: string;
}

export interface GeometryLayerBlock {
  id: string;
  type: "geometryLayers";
  title?: string;
  description?: string;
  baseImage: {
    src: string;
    alt: string;
  };
  layers: GeometryLayer[];
}

export type LectureBlock =
  | { id: string; type: "heading"; level: 2 | 3; text: string }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "math"; expression: string; caption?: string }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | GeometryLayerBlock
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

export const SPECIAL_LECTURE_ROADMAP: SpecialLectureRoadmapStep[] = [
  {
    slug: "quadratic-case-split-intensive",
    purpose: "軸・定義域・端点比較を整理し、場合分け不足を減らす",
    recommendedTiming: "二次関数の最大最小で境界値が曖昧なとき",
  },
  {
    slug: "probability-guided-reading",
    purpose: "条件・事象・同様に確からしい単位をそろえる",
    recommendedTiming: "確率で条件見落としや読み違いが増えたとき",
  },
  {
    slug: "geometry-measurement-intensive",
    purpose: "辺・角・面積から使う公式を選び切る",
    recommendedTiming: "図形と計量で公式選択ミスが出たとき",
  },
  {
    slug: "geometry-properties-auxiliary-lines",
    purpose: "円周角・相似・方べきから補助線を判断する",
    recommendedTiming: "図の見落としや補助線判断で止まるとき",
  },
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
      createTriangleGeometryLayerBlock(
        {
          ...DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
          title: "図形レイヤー：条件から解法ルートまで",
          description:
            "同じ図形でも、見るレイヤーを分けると公式選択が安定します。条件、角、補助線、公式、求める順番を一つずつ重ねて確認します。",
          sideLabels: {
            ab: "AB=6",
            bc: "BC=?",
            ca: "AC=8",
          },
          angleLabels: {
            a: "60°",
            b: "",
            c: "",
          },
          equalAngleLabel: "向かい合う辺と角の対応を見る",
          auxiliaryLine: "altitude-from-a",
          formulaNotes: ["余弦定理で BC", "面積公式で S", "正弦定理で sinB"],
          routeSteps: ["BCを求める", "面積を出す", "sinBへつなぐ"],
        },
        "geometry-layer-first-look",
      ),
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
          "三角形ABCにおいて、$AB=6$, $AC=8$, $\\angle A=60^\\circ$ とする。辺BCの長さを $a$ とおく。次の問いに答えよ。\n\n(1) $a^2$ の値を求めよ。\n(2) 三角形ABCの面積 $S$ を求めよ。\n(3) $\\sin B$ の値を求めよ。",
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
            body: "$AB=6$, $AC=8$, $\\angle A=60^\\circ$。2辺とはさむ角がそろっているので、辺BCは余弦定理で出せる。",
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
            body: "三角形ABCで $AB=5$, $AC=9$, $\\angle A=120^\\circ$ とする。$BC^2$、面積、$\\sin B$ を同じ流れで求めてください。鈍角なので $\\cos120^\\circ$ の符号に注意します。",
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
  {
    id: "lecture-quadratic-case-split-001",
    slug: "quadratic-case-split-intensive",
    title: "共通テスト 二次関数 場合分け完全攻略",
    description:
      "軸・定義域・端点比較・境界値を整理し、パラメータ付き二次関数の最大最小を本番で崩さないための重点講座です。",
    subject: "数学IA",
    unit: "二次関数",
    difficulty: "標準",
    recommendedMinutes: 40,
    tags: ["数学IA", "共通テスト", "二次関数", "場合分け", "できる人の頭の中", "重点講座"],
    publishedAt: "2026-06-27",
    blocks: [
      {
        id: "quadratic-opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "二次関数の最大・最小は、計算よりも「軸が定義域のどこにあるか」を先に決める問題です。境界値を言語化して、場合分けを機械的に処理できる状態にします。",
      },
      {
        id: "quadratic-first-look-heading",
        type: "heading",
        level: 2,
        text: "1. 二次関数で最初に見るもの",
      },
      {
        id: "quadratic-first-look-text",
        type: "paragraph",
        text:
          "最初に見るのは、開き方、軸、定義域の3つです。式を展開する前に、平方完成で軸を出し、定義域の左端・右端・軸の位置関係を比べます。",
      },
      {
        id: "quadratic-axis-math",
        type: "math",
        expression: "f(x)=a(x-p)^2+q",
        caption: "$a>0$ なら最小は軸に近いところ、最大は端点候補から選ぶ。$a<0$ なら逆に考える。",
      },
      {
        id: "quadratic-axis-heading",
        type: "heading",
        level: 2,
        text: "2. 軸と定義域の位置関係",
      },
      {
        id: "quadratic-axis-text",
        type: "paragraph",
        text:
          "定義域が $0\\le x\\le 4$、軸が $x=t$ なら、境界は $t=0$ と $t=4$ です。軸が左にある、内側にある、右にある、の3つに分けます。下の図で、軸の位置によって最小値がどこで起きるかを見比べてください。",
      },
      {
        id: "quadratic-axis-cases-figure",
        type: "image",
        src: createQuadraticAxisCasesSvg(),
        alt: "軸が定義域の左・中・右にある3パターンと、それぞれの最小値の位置",
        caption:
          "上に開く放物線の最小値は、軸が定義域の左なら左端、内側なら頂点、右なら右端で起きる。最大値は逆に、軸から遠い端点で起きる。",
      },
      {
        id: "quadratic-endpoint-callout",
        type: "callout",
        tone: "success",
        title: "端点比較の型",
        text:
          "最大値は端点で起きることが多いです。$f(0)$ と $f(4)$ を先に比べ、どちらが大きいかを式で判定します。端点比較の境界は $f(0)=f(4)$ から出します。",
      },
      {
        id: "quadratic-boundary-heading",
        type: "heading",
        level: 2,
        text: "3. 場合分けの境界値",
      },
      {
        id: "quadratic-boundary-text",
        type: "paragraph",
        text:
          "場合分けの境界は、気分で作りません。軸が端点をまたぐ値、端点の値が入れ替わる値、条件が等号になる値だけを候補にします。",
      },
      {
        id: "quadratic-parameter-heading",
        type: "heading",
        level: 2,
        text: "4. パラメータ付き二次関数",
      },
      {
        id: "quadratic-parameter-text",
        type: "paragraph",
        text:
          "パラメータ $t$ があるときも、見る順番は同じです。軸を $t$ で表し、定義域との位置関係を不等式で書きます。式変形より先に、図の横軸上で整理します。",
      },
      {
        id: "quadratic-original-heading",
        type: "heading",
        level: 2,
        text: "5. 共通テスト形式オリジナル問題",
      },
      {
        id: "quadratic-original-problem",
        type: "problem",
        title: "二次関数：軸と端点で最大最小を決める",
        prompt:
          "実数 $t$ に対して、関数 $f(x)=(x-t)^2+2t$ を $0\\le x\\le4$ で考える。\n\n(1) $f(x)$ の最小値を $t$ の範囲に分けて求めよ。\n(2) $f(x)$ の最大値を $t$ の範囲に分けて求めよ。\n(3) $t=3$ のとき、最大値と最小値の差を求めよ。",
        choices: [
          "最小値：$t<0$で$t^2+2t$、$0\\le t\\le4$で$2t$、$t>4$で$(4-t)^2+2t$。最大値：$t<2$で$(4-t)^2+2t$、$t\\ge2$で$t^2+2t$。$t=3$の差は9。",
          "最小値：常に$2t$。最大値：常に$(4-t)^2+2t$。$t=3$の差は1。",
          "最小値：$t<2$で$t^2+2t$、$t\\ge2$で$(4-t)^2+2t$。最大値：常に$2t$。$t=3$の差は0。",
          "最小値：$0\\le t\\le4$で$t^2+2t$。最大値：$t<2$で$t^2+2t$。$t=3$の差は5。",
        ],
        answer:
          "最小値：$t<0$で$t^2+2t$、$0\\le t\\le4$で$2t$、$t>4$で$(4-t)^2+2t$。最大値：$t<2$で$(4-t)^2+2t$、$t\\ge2$で$t^2+2t$。$t=3$の差は9。",
        points: 8,
        mistakeTags: ["場合分け不足", "条件見落とし", "計算ミス", "自信ありで間違えた"],
      },
      {
        id: "quadratic-expert-thinking",
        type: "expertThinking",
        items: [
          {
            label: "まず見るところ",
            body: "$f(x)=(x-t)^2+2t$ なので軸は $x=t$、上に開く放物線。定義域は $0\\le x\\le4$。",
          },
          {
            label: "怪しい条件",
            body: "最小値は軸が定義域に入るかで変わる。最大値は両端 $x=0,4$ の比較で変わる。",
          },
          {
            label: "使う公式候補",
            body: "平方完成、端点代入、端点比較 $f(0)=f(4)$。特別な公式より、軸と端点の位置関係を使う。",
          },
          {
            label: "決め手",
            body: "最小値の境界は $t=0,4$。最大値の境界は $f(0)=f(4)$ から $t=2$。",
          },
          {
            label: "本番判断",
            body: "先に境界値だけ書き出す。境界が $0,2,4$ と見えたら、答案の骨格はほぼ完成。",
          },
          {
            label: "撤退ライン",
            body: "最大値で迷ったら、最小値だけ確実に取り、端点比較の式 $f(0),f(4)$ を残して次へ進む。",
          },
        ],
      },
      {
        id: "quadratic-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "ヒント",
            body: "最小値は軸 $x=t$ が $[0,4]$ に入るかで分けます。最大値は $f(0)$ と $f(4)$ の大きい方です。",
          },
          {
            label: "方針",
            body: "$f(0)=t^2+2t$、$f(4)=(4-t)^2+2t$、軸での値は $2t$。最小値は軸の位置、最大値は端点比較で決めます。",
          },
          {
            label: "詳しい解説",
            body:
              "上に開くので、軸 $x=t$ が定義域内なら最小値は $2t$。$t<0$ なら定義域で軸に最も近いのは $x=0$ なので $t^2+2t$。$t>4$ なら $x=4$ なので $(4-t)^2+2t$。\n\n最大値は端点比較です。$f(0)-f(4)=t^2+2t-((4-t)^2+2t)=8t-16$。よって $t<2$ なら $f(4)$、$t\\ge2$ なら $f(0)$。\n\n$t=3$ では最小値 $6$、最大値 $15$ なので差は $9$。",
          },
          {
            label: "最速解法",
            body: "境界だけ先に出します。最小値は軸が端点をまたぐ $t=0,4$。最大値は端点が入れ替わる $t=2$。あとは $f(0),f(4),2t$ を並べるだけです。",
          },
          {
            label: "よくあるミス",
            body: "最小値と最大値の境界を混ぜる。$t=2$ を最小値の境界に入れてしまう。$t=3$ のとき最大値を軸の値だと思う。端点比較で符号を逆に読む。",
          },
          {
            label: "類題",
            body: "$g(x)=-(x-a)^2+3a$ を $-1\\le x\\le3$ で考え、最大値と最小値を $a$ で場合分けしてください。下に開くので、最大と最小の考え方が入れ替わります。",
          },
        ],
      },
      {
        id: "quadratic-checklist",
        type: "checklist",
        title: "二次関数の確認チェック",
        items: [
          "平方完成して軸を書いた",
          "定義域の左端・右端を確認した",
          "最小値の境界と最大値の境界を分けた",
          "端点比較は $f(左端)=f(右端)$ から出した",
          "境界値を含む・含まないを最後に確認した",
        ],
      },
      {
        id: "quadratic-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "数学IA 第2問 二次関数",
            href: "/common-test/math-1a/section-2",
            note: "軸と端点比較を10分で確認",
          },
          {
            title: "共通テスト本番演習",
            href: "/common-test/simulator",
            note: "時間内に場合分けを書き切る練習",
          },
        ],
      },
    ],
  },
  {
    id: "lecture-probability-guided-reading-001",
    slug: "probability-guided-reading",
    title: "共通テスト 確率 誘導の読み方講座",
    description:
      "確率で条件・状態・誘導文を整理し、表・樹形図・組合せ・余事象を使い分けるための重点講座です。",
    subject: "数学IA",
    unit: "確率",
    difficulty: "標準",
    recommendedMinutes: 40,
    tags: ["数学IA", "共通テスト", "確率", "誘導読解", "できる人の頭の中", "重点講座"],
    publishedAt: "2026-06-27",
    blocks: [
      {
        id: "probability-opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "確率は、ただ数える単元ではありません。条件を言い換え、何を同様に確からしいものとして数えるかを決める読解の単元です。",
      },
      {
        id: "probability-first-heading",
        type: "heading",
        level: 2,
        text: "1. 確率で最初に確認すること",
      },
      {
        id: "probability-first-text",
        type: "paragraph",
        text:
          "最初に、試行の回数、戻す・戻さない、順序を区別するか、条件付きかを確認します。この4つを外すと、式が合っていても分母がずれます。",
      },
      {
        id: "probability-rephrase-heading",
        type: "heading",
        level: 2,
        text: "2. 事象の言い換え",
      },
      {
        id: "probability-rephrase-text",
        type: "paragraph",
        text:
          "「少なくとも1つ」「ちょうど2つ」「連続しない」などは、そのまま数えるより言い換えた方が速いことがあります。特に「少なくとも」は余事象を疑います。",
      },
      {
        id: "probability-complement-callout",
        type: "callout",
        tone: "success",
        title: "余事象を使う判断",
        text:
          "条件が「少なくとも1回」「全部ではない」「失敗しない」なら、反対側を数えた方が少ないかを先に見ます。余事象は楽をするための選択肢です。",
      },
      {
        id: "probability-tools-heading",
        type: "heading",
        level: 2,
        text: "3. 表・樹形図・組合せの使い分け",
      },
      {
        id: "probability-tools-text",
        type: "paragraph",
        text:
          "状態が少ないなら表、手順が分岐するなら樹形図、順序を問わず個数だけなら組合せです。共通テストの誘導は、この道具選びを自然に促してきます。下の表のように、まず分母（全体の数え方）を1つに固定すると、各事象は分子を数えるだけになります。",
      },
      {
        id: "probability-counting-figure",
        type: "image",
        src: createProbabilityCountingSvg(),
        alt: "玉の取り出し問題の状態整理表。全体20通りを分母に固定し、各事象の分子を数える。",
        caption:
          "分母を $\\binom{6}{3}=20$ に固定すると、各小問は分子の数え方だけに集中できる。「少なくとも」は余事象、「すべて異なる」は1個ずつ、「ちょうど2個」は残り1個の色に注意。",
      },
      {
        id: "probability-original-heading",
        type: "heading",
        level: 2,
        text: "4. 共通テスト形式オリジナル問題",
      },
      {
        id: "probability-original-problem",
        type: "problem",
        title: "確率：誘導文を言い換えて数える",
        prompt:
          "袋の中に赤玉3個、白玉2個、青玉1個が入っている。この袋から玉を戻さずに3個取り出す。\n\n(1) 3個の中に赤玉が少なくとも1個含まれる確率を求めよ。\n(2) 取り出した3個の色がすべて異なる確率を求めよ。\n(3) 取り出した3個の中に赤玉がちょうど2個含まれる確率を求めよ。",
        choices: [
          "(1) $\\frac{19}{20}$、(2) $\\frac{3}{10}$、(3) $\\frac{9}{20}$",
          "(1) $\\frac{1}{20}$、(2) $\\frac{3}{10}$、(3) $\\frac{3}{10}$",
          "(1) $\\frac{19}{20}$、(2) $\\frac{1}{10}$、(3) $\\frac{9}{20}$",
          "(1) $\\frac{3}{5}$、(2) $\\frac{3}{10}$、(3) $\\frac{1}{2}$",
        ],
        answer: "(1) $\\frac{19}{20}$、(2) $\\frac{3}{10}$、(3) $\\frac{9}{20}$",
        points: 8,
        mistakeTags: ["問題文の読み違い", "条件見落とし", "場合分け不足", "公式選択ミス"],
      },
      {
        id: "probability-expert-thinking",
        type: "expertThinking",
        items: [
          {
            label: "まず見るところ",
            body: "戻さずに3個。順序は問われていないので、全体は $\\binom{6}{3}=20$ 通りで数える。",
          },
          {
            label: "怪しい条件",
            body: "「少なくとも1個」は余事象が速い。「すべて異なる」は赤・白・青を1個ずつ。「ちょうど2個」は残り1個の色に注意。",
          },
          {
            label: "使う公式候補",
            body: "組合せ、余事象、場合分け。確率の公式を先に探すより、分母と分子を同じ数え方にそろえる。",
          },
          {
            label: "決め手",
            body: "全体20通りで統一できる。分母を固定すると、各設問が分子を数えるだけになる。",
          },
          {
            label: "本番判断",
            body: "誘導が小問ごとに事象を変えているので、毎回分母を作り直さない。全体を固定して時間を節約する。",
          },
          {
            label: "撤退ライン",
            body: "後半で迷ったら、事象を日本語で言い換えて式だけ残す。分母20を守れば部分点を取りやすい。",
          },
        ],
      },
      {
        id: "probability-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "ヒント",
            body: "順序を区別せず、全体を $\\binom{6}{3}$ で数えます。(1)は赤玉が0個の余事象を考えると速いです。",
          },
          {
            label: "方針",
            body: "全体は20通り。(1)は $1-\\frac{\\binom{3}{0}\\binom{3}{3}}{20}$、(2)は赤白青を1個ずつ、(3)は赤2個と赤以外1個です。",
          },
          {
            label: "詳しい解説",
            body:
              "全体は6個から3個を選ぶので $\\binom{6}{3}=20$。\n\n(1) 赤が1個もないのは、白2個と青1個をすべて選ぶ1通り。よって $1-\\frac{1}{20}=\\frac{19}{20}$。\n\n(2) 3色すべて異なるには、赤3個から1個、白2個から1個、青1個から1個を選ぶので $3\\cdot2\\cdot1=6$ 通り。確率は $\\frac{6}{20}=\\frac{3}{10}$。\n\n(3) 赤を2個、赤以外を1個選ぶので $\\binom{3}{2}\\binom{3}{1}=9$ 通り。確率は $\\frac{9}{20}$ です。",
          },
          {
            label: "最速解法",
            body: "全体20通り。(1)は赤なし1通りなので $19/20$。(2)は $3\\times2\\times1=6$ で $3/10$。(3)は $\\binom32\\binom31=9$ で $9/20$。分母を固定すると一気に処理できます。",
          },
          {
            label: "よくあるミス",
            body: "戻さずに取るのに毎回確率を掛けて分母をずらす。少なくとも1個を赤1個だけと読む。赤以外1個を白だけにして青を落とす。同様に確からしい単位を途中で変える。",
          },
          {
            label: "類題",
            body: "赤4個、白3個、青2個から4個を戻さずに取り出す。赤が少なくとも1個、3色すべて含む、赤がちょうど2個、を同じ分母で数えてください。",
          },
        ],
      },
      {
        id: "probability-equally-likely-callout",
        type: "callout",
        tone: "warning",
        title: "同様に確からしいかの確認",
        text:
          "確率の分母は、同じ条件で同じ単位を数えている必要があります。この問題では、順序を区別しない3個の組を全体20通りとして統一します。",
      },
      {
        id: "probability-checklist",
        type: "checklist",
        title: "確率の確認チェック",
        items: [
          "戻す・戻さないを確認した",
          "順序を区別するかを決めた",
          "分母と分子を同じ数え方にそろえた",
          "少なくともは余事象を疑った",
          "条件に含まれる色・個数を落としていない",
        ],
      },
      {
        id: "probability-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "数学IA 第3問 確率",
            href: "/common-test/math-1a/section-3",
            note: "誘導文を読みながら10分演習",
          },
          {
            title: "復習キュー",
            href: "/common-test/review",
            note: "条件見落としの危険度Aを優先確認",
          },
        ],
      },
    ],
  },
  {
    id: "lecture-geometry-properties-auxiliary-001",
    slug: "geometry-properties-auxiliary-lines",
    title: "共通テスト 図形の性質 補助線発見講座",
    description:
      "円周角・相似・方べき・補助線の見つけ方を、図形レイヤーと本番判断で整理する重点講座です。",
    subject: "数学IA",
    unit: "図形の性質",
    difficulty: "標準",
    recommendedMinutes: 45,
    tags: ["数学IA", "共通テスト", "図形の性質", "補助線", "できる人の頭の中", "重点講座"],
    publishedAt: "2026-06-27",
    blocks: [
      {
        id: "geometry-properties-opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "図形の性質は、補助線を思いつく単元ではありません。同じ角、円周角、相似、方べきの形を順番に確認し、引くべき線を判断する単元です。",
      },
      {
        id: "geometry-properties-first-heading",
        type: "heading",
        level: 2,
        text: "1. 図形の性質で最初に見るもの",
      },
      {
        id: "geometry-properties-first-text",
        type: "paragraph",
        text:
          "最初に見るのは、円、接線、平行線、同じ長さ、同じ角です。図にある情報を増やす前に、すでに見えている等しさを拾います。",
      },
      {
        id: "geometry-properties-angle-heading",
        type: "heading",
        level: 2,
        text: "2. 同じ角・円周角・相似を疑う",
      },
      {
        id: "geometry-properties-angle-text",
        type: "paragraph",
        text:
          "同じ弧に対する円周角は等しくなります。同じ角が2組見えたら相似を疑います。相似が見えたら、辺の比と積の関係が一気につながります。",
      },
      {
        id: "geometry-properties-power-callout",
        type: "callout",
        tone: "success",
        title: "方べきを疑う形",
        text:
          "円と2本の割線、接線と割線、交わる弦が見えたら方べきを疑います。式を覚えるより、同じ点から円へ伸びる線の積を見るのがコツです。",
      },
      {
        id: "geometry-properties-power-figure",
        type: "image",
        src: createPowerOfPointSvg(),
        alt: "円の外の点Pから2本の割線を引いた図。PA·PB=PC·PDが成り立つ。",
        caption:
          "外部点Pから出る2本の割線では $PA\\cdot PB=PC\\cdot PD$ が成り立つ。「同じ点から円へ伸びる線分の積」をそろえて式にするのがコツ。",
      },
      createTriangleGeometryLayerBlock(
        {
          ...DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
          title: "図形レイヤー：補助線を引く前に見るもの",
          description:
            "補助線を引く前に、点名、辺、角、同じ角、使う性質、解法ルートを段階的に確認します。",
          pointLabels: {
            a: "A",
            b: "B",
            c: "C",
          },
          sideLabels: {
            ab: "AB",
            bc: "BC",
            ca: "CA",
          },
          angleLabels: {
            a: "",
            b: "∠B",
            c: "∠C",
          },
          equalAngleLabel: "同じ弧に対する角を探す",
          auxiliaryLine: "median-from-a",
          formulaNotes: ["円周角の定理", "相似", "方べき"],
          routeSteps: ["同じ角を探す", "相似を作る", "辺の比へ進む"],
        },
        "geometry-properties-layer",
      ),
      {
        id: "geometry-properties-original-heading",
        type: "heading",
        level: 2,
        text: "3. 共通テスト形式オリジナル問題",
      },
      {
        id: "geometry-properties-original-problem",
        type: "problem",
        title: "図形の性質：相似と方べきへつなぐ",
        prompt:
          "円O上に4点A, B, C, Dがこの順にある。直線ABと直線CDの延長が点Pで交わっている。$PA=3$, $PB=9$, $PC=4$ とする。\n\n(1) 方べきの定理を用いて $PD$ を求めよ。\n(2) もし $\\angle PBC=\\angle PDA$ が分かっているとき、相似になる三角形の組を1つ答えよ。\n(3) 補助線を引くなら、まずどの2点を結ぶと角の対応を見つけやすいか。",
        choices: [
          "(1) $PD=\\frac{27}{4}$、(2) $\\triangle PBC \\sim \\triangle PDA$、(3) BとDを結ぶ",
          "(1) $PD=12$、(2) $\\triangle PAB \\sim \\triangle PCD$、(3) AとCを結ぶ",
          "(1) $PD=\\frac{4}{27}$、(2) $\\triangle PBC \\sim \\triangle PCD$、(3) PとOを結ぶ",
          "(1) $PD=6$、(2) $\\triangle ABC \\sim \\triangle CDA$、(3) AとDを結ぶ",
        ],
        answer:
          "(1) $PD=\\frac{27}{4}$、(2) $\\triangle PBC \\sim \\triangle PDA$、(3) BとDを結ぶ",
        points: 8,
        mistakeTags: ["図の見落とし", "公式選択ミス", "条件見落とし", "場合分け不足"],
      },
      {
        id: "geometry-properties-expert-thinking",
        type: "expertThinking",
        items: [
          {
            label: "まず見るところ",
            body: "円と外部点P、2本の割線が見える。これは方べきの形。$PA\\cdot PB=PC\\cdot PD$ を疑う。",
          },
          {
            label: "怪しい条件",
            body: "角の等しさが与えられているので、後半は相似へ誘導している。辺の積だけで終わらない。",
          },
          {
            label: "使う公式候補",
            body: "方べき、円周角、相似。補助線は同じ角を見つけるために引く。",
          },
          {
            label: "決め手",
            body: "$PA\\cdot PB=3\\cdot9=27$。$PC=4$ なので $PD=27/4$。角条件から相似の対応を見る。",
          },
          {
            label: "本番判断",
            body: "数値が3,9,4のように積を作りやすいなら、まず方べき。図形を眺め続けるより、積の式を置く。",
          },
          {
            label: "撤退ライン",
            body: "相似が見えなければ、方べきの(1)を確実に取り、角の対応を書き込んで次へ進む。",
          },
        ],
      },
      {
        id: "geometry-properties-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "ヒント",
            body: "点Pから円に向かう2本の割線があります。方べきの定理では、同じ外部点から出る線分の積を比べます。",
          },
          {
            label: "方針",
            body: "$PA\\cdot PB=PC\\cdot PD$ を立てます。相似は、与えられた角と共通角または円周角から対応を探します。",
          },
          {
            label: "詳しい解説",
            body:
              "(1) 方べきの定理より $PA\\cdot PB=PC\\cdot PD$。したがって $3\\cdot9=4\\cdot PD$ なので $PD=\\frac{27}{4}$。\n\n(2) $\\angle PBC=\\angle PDA$ があり、さらにPを含む角の対応を確認すると、$\\triangle PBC \\sim \\triangle PDA$ が候補になります。\n\n(3) BとDを結ぶと、円周角や同じ弧に対する角が見つけやすくなります。補助線は、角の対応を増やすために引きます。",
          },
          {
            label: "最速解法",
            body: "円＋外部点＋2本の割線を見た瞬間に方べきです。$3\\cdot9=4\\cdot PD$ で $PD=27/4$。後半は角条件を図に写し、相似の候補を1つに絞ります。",
          },
          {
            label: "よくあるミス",
            body: "$PA\\cdot PB$ ではなく $AB\\cdot PB$ としてしまう。外部点からの長さを使うことを忘れる。補助線を目的なく引き、角の対応を増やせていない。",
          },
          {
            label: "類題",
            body: "外部点Pから円に2本の割線PAB, PCDを引く。PA=2, PB=10, PC=5のときPDを求め、補助線BDを引いたときに見える角の等しさを探してください。",
          },
        ],
      },
      {
        id: "geometry-properties-checklist",
        type: "checklist",
        title: "図形の性質の確認チェック",
        items: [
          "円周角で同じ角を探した",
          "相似を作るための角が2組あるか確認した",
          "方べきは同じ外部点からの線分で式を作った",
          "補助線は角の対応を増やす目的で引いた",
          "図にない思い込みの等しさを使っていない",
        ],
      },
      {
        id: "geometry-properties-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "数学IA 第4問 図形の性質",
            href: "/common-test/math-1a/section-4",
            note: "補助線と相似を20分練習",
          },
          {
            title: "図形と計量 徹底講座",
            href: "/common-test/lectures/geometry-measurement-intensive",
            note: "三角比との接続を復習",
          },
        ],
      },
    ],
  },
];

export function getSpecialLectureBySlug(slug: string): Lecture | undefined {
  return SPECIAL_LECTURES.find((lecture) => lecture.slug === slug);
}
