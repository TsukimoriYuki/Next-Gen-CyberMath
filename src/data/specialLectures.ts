import {
  createTriangleGeometryLayerBlock,
  DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
} from "@/lib/lecture-geometry-svg";
import { canonicalLectureSlug } from "@/lib/special-lecture-guidance";
import {
  createPowerOfPointSvg,
  createProbabilityCountingSvg,
  createQuadraticAxisCasesSvg,
  createVennInclusionSvg,
} from "@/lib/lecture-diagram-svg";
import {
  createGeometryDiagramDataUri,
  GEOMETRY_DIAGRAM_META,
  type GeometryDiagramType,
} from "@/lib/geometry-diagrams";
import { enhanceSpecialLectures } from "@/data/specialLectureEnhancements";
import { SHORTCUT_FORMULAS_LECTURE } from "@/data/specialLectures/shortcut-formulas";

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
  isPublished?: boolean;
  noindex?: boolean;
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
  | { id: string; type: "callout"; tone: "info" | "warning" | "success"; title?: string; text: string }
  | { id: string; type: "solutionFlow"; title?: string; intro?: string; steps: SolutionFlowStep[] }
  | { id: string; type: "discriminationDrill"; title?: string; intro?: string; items: DiscriminationDrillItem[] }
  | { id: string; type: "mistakeRecovery"; title?: string; intro?: string; items: MistakeRecoveryItem[] };

export interface ExplanationTab {
  label: "ヒント" | "方針" | "詳しい解説" | "別解" | "最速解法" | "よくあるミス" | "類題";
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

/** 解法判別フロー：「何が見えたら、どの道具を選ぶか」を1行ずつ示す。 */
export interface SolutionFlowStep {
  /** 見えている条件（例: 2辺とその間の角がある）。 */
  condition: string;
  /** 選ぶ道具（例: 余弦定理）。 */
  tool: string;
  /** なぜそれを選ぶか（例: 挟角を含む2辺から第三辺が出るから）。 */
  reason?: string;
}

/** 判別ドリル：計算ではなく「初手＝何を使うか」だけを訓練する1問。 */
export interface DiscriminationDrillItem {
  /** 与えられている状況。 */
  condition: string;
  /** 求めたいもの（任意）。 */
  goal?: string;
  /** 道具の選択肢。answer はこのいずれかと一致させる。 */
  choices: string[];
  /** 正解の道具。 */
  answer: string;
  /** なぜその道具なのか。 */
  reason: string;
}

/** ミス別補講：間違えた理由から、戻るべき場所へ誘導する。 */
export interface MistakeRecoveryItem {
  /** 間違えた症状（例: 公式選択を間違えた）。 */
  symptom: string;
  /** 戻る場所・やること（例: 解法判別フローをもう一度見る）。 */
  action: string;
  /** 講義内アンカー（#blockId）または別講義への絶対パス（任意）。 */
  href?: string;
}

function geometryDiagramBlock(id: string, type: GeometryDiagramType): LectureBlock {
  const meta = GEOMETRY_DIAGRAM_META[type];
  return {
    id,
    type: "image",
    src: createGeometryDiagramDataUri(type),
    alt: meta.alt,
    caption: `この図で見るポイント: ${meta.point}`,
  };
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
    slug: "numbers-expressions-core-skills",
    purpose: "有理化・対称式・整数部分の判断を1本の流れでつなぐ",
    recommendedTiming: "第1問〔1〕で有理化や整数部分・小数部分の誘導につまずいたとき",
  },
  {
    slug: "sets-logic-necessary-sufficient",
    purpose: "必要条件・十分条件・逆裏対偶の向きを機械的に判定する",
    recommendedTiming: "第1問〔1〕で必要十分条件の判定や命題の否定に迷ったとき",
  },
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
    slug: "data-analysis-quartiles-outliers",
    purpose: "四分位数・外れ値・平均値と中央値の変化を、模試復習用に整理する",
    recommendedTiming: "データの分析で四分位数、外れ値、追加・削除後の代表値を取り違えたとき",
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
  {
    slug: "math-1a-shortcut-formulas",
    purpose: "マーク式で使える即殺公式を検算・時間短縮の武器にする",
    recommendedTiming: "通常講義と満点講義を終え、本番で時間を削りたいとき",
  },
];

const BASE_SPECIAL_LECTURES: Lecture[] = [
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
      geometryDiagramBlock("geometry-measurement-altitude-figure", "altitude-basic"),
      {
        id: "map-heading",
        type: "heading",
        level: 2,
        text: "満点までの地図",
      },
      {
        id: "map-callout",
        type: "callout",
        tone: "info",
        title: "図形と計量で満点を取る地図",
        text:
          "出るパターンは7系統です。①正弦・余弦の選択 ②$\\sin$ を出す優先順位 ③面積から逆算 ④外接円$R$・内接円$r$ ⑤円周角・補角で角を移す ⑥測量・空間図形 ⑦図形の性質との融合。共通テストでは第1問の誘導小問として、$a^2 \\to$ 面積 $\\to \\sin B$ のように1本の流れで出ます。\n\n最初に見るのは「辺・角・面積のどれが与えられ、どれが問われているか」。公式の優先順位は、向かい合う辺と角があれば正弦定理、2辺と挟角または3辺なら余弦定理、面積がからめば $S=\\frac{1}{2}ab\\sin C$。落としやすいのは $\\cos$ の符号、正弦定理の辺と角の対応ずれ、$\\frac{1}{2}$ の付け忘れです。",
      },
      {
        id: "tool-flow-heading",
        type: "heading",
        level: 2,
        text: "解法判別フロー：何を見たら何を使うか",
      },
      {
        id: "tool-flow",
        type: "solutionFlow",
        title: "図形と計量の道具選び",
        intro:
          "計算の前に、まず「見えている条件」から使う道具を1つに絞ります。この対応を覚えると、誘導に迷わなくなります。",
        steps: [
          {
            condition: "2辺とその間の角（挟角）が分かっている",
            tool: "余弦定理",
            reason: "挟角を含む2辺から第三辺 $a^2=b^2+c^2-2bc\\cos A$ が一気に出る。",
          },
          {
            condition: "辺と、その向かいの角がセットで見える",
            tool: "正弦定理",
            reason: "$\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=2R$ で、別の辺・角・外接円 $R$ へ運べる。",
          },
          {
            condition: "面積と2辺（または面積を問われる）",
            tool: "面積公式 $S=\\dfrac{1}{2}ab\\sin C$",
            reason: "はさむ角の $\\sin$ と面積を相互に逆算できる。",
          },
          {
            condition: "3辺がすべて分かっている",
            tool: "余弦定理（角を求める向き）",
            reason: "$\\cos$ の符号で鋭角・鈍角まで判定できる。",
          },
          {
            condition: "円に内接している・補角が見える",
            tool: "円周角・補角 $\\sin(180^\\circ-\\theta)=\\sin\\theta$",
            reason: "同じ $\\sin$ を別の角へ移せる。$\\cos$ は符号が変わる点に注意。",
          },
          {
            condition: "比・相似・方べきが見える",
            tool: "図形の性質（相似・方べき・二等分線）",
            reason: "必要な辺を先に作ってから計量に戻る。",
          },
        ],
      },
      geometryDiagramBlock("geometry-measurement-tool-choice-figure", "auxiliary-line-choice"),
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
        id: "sin-priority-flow",
        type: "solutionFlow",
        title: "sin を求めるときの優先順位",
        intro:
          "「$\\sin$ を出せ」と言われても、上から順に「これで出せるか？」を当てていきます。最初に止まったところがその問題の解法です。",
        steps: [
          {
            condition: "角そのものが分かる（$30^\\circ,45^\\circ,60^\\circ,120^\\circ$ など）",
            tool: "三角比の値を直接代入",
            reason: "有名角ならその場で値が確定する。",
          },
          {
            condition: "辺と、その向かいの角がそろう",
            tool: "正弦定理で直接",
            reason: "$\\sin B=\\dfrac{b\\sin A}{a}$ の形に乗せるだけ。",
          },
          {
            condition: "面積と、はさむ2辺が分かる",
            tool: "面積公式から逆算",
            reason: "$\\sin C=\\dfrac{2S}{ab}$ で一発。",
          },
          {
            condition: "2辺と挟角、または3辺で $\\cos$ が出る",
            tool: "相互関係 $\\sin^2\\theta+\\cos^2\\theta=1$",
            reason: "三角形なら $\\sin\\theta>0$ なので $\\sin\\theta=\\sqrt{1-\\cos^2\\theta}$。",
          },
          {
            condition: "補角の関係がある",
            tool: "$\\sin(180^\\circ-\\theta)=\\sin\\theta$",
            reason: "違う角でも同じ $\\sin$ を使える。$\\cos$ は符号反転に注意。",
          },
          {
            condition: "円に内接している",
            tool: "円周角で同じ角を別の場所へ移す",
            reason: "同じ弧に対する円周角は等しい。",
          },
          {
            condition: "辺が足りない／空間図形",
            tool: "方べき・相似で辺を作る／断面・直角三角形に落とす",
            reason: "計量に必要な辺を先に用意してから戻る。",
          },
        ],
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
      geometryDiagramBlock("geometry-measurement-area-height-figure", "area-height-reverse"),
      geometryDiagramBlock("geometry-measurement-trig-height-figure", "trig-height"),
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
        id: "circumradius-heading",
        type: "heading",
        level: 2,
        text: "外接円の半径 R を出す",
      },
      {
        id: "circumradius-text",
        type: "paragraph",
        text:
          "外接円の半径 $R$ は、正弦定理の右端 $\\dfrac{a}{\\sin A}=2R$ から出します。「辺とその向かいの角」が1組見えれば $R$ は確定です。共通テストでは $R$ そのものより、$R$ を経由して別の辺や $\\sin$ を出させる誘導が多いです。",
      },
      {
        id: "circumradius-math",
        type: "math",
        expression: "2R=\\frac{a}{\\sin A}\\quad\\Longleftrightarrow\\quad a=2R\\sin A",
        caption: "辺と向かいの角が1組あれば $R$ が出る。$a=2R\\sin A$ の向きも使えると速い。",
      },
      geometryDiagramBlock("geometry-measurement-circumcenter-figure", "circumcenter-circumcircle"),
      {
        id: "inradius-heading",
        type: "heading",
        level: 2,
        text: "内接円の半径 r と面積 S=rs",
      },
      {
        id: "inradius-text",
        type: "paragraph",
        text:
          "内接円の半径 $r$ は、面積 $S$ と「周の半分」$s=\\dfrac{a+b+c}{2}$ を使って $S=rs$ から出します。面積を先に余弦定理＋面積公式で求めておき、最後に $r=\\dfrac{S}{s}$ とするのが定番の流れです。",
      },
      {
        id: "inradius-math",
        type: "math",
        expression: "S=rs,\\quad s=\\frac{a+b+c}{2}\\ \\Longrightarrow\\ r=\\frac{S}{s}=\\frac{2S}{a+b+c}",
        caption: "$s$ は周の半分。$r=\\dfrac{2S}{a+b+c}$ まで一気に書けると本番で速い。",
      },
      geometryDiagramBlock("geometry-measurement-incenter-figure", "incenter-incircle"),
      {
        id: "circle-angle-heading",
        type: "heading",
        level: 2,
        text: "円周角・補角で角を移す",
      },
      {
        id: "circle-angle-text",
        type: "paragraph",
        text:
          "図形が円に内接しているときは、求めたい角を「同じ弧に対する別の円周角」へ移せないかを見ます。直接は求めにくい角でも、移した先なら辺とセットになって正弦定理に乗ることがあります。四角形が内接しているなら対角の和は $180^\\circ$ で、補角の $\\sin$ が等しい性質と直結します。",
      },
      {
        id: "survey-space-heading",
        type: "heading",
        level: 2,
        text: "測量・空間図形を平面に落とす",
      },
      {
        id: "survey-space-text",
        type: "paragraph",
        text:
          "測量問題は、まず「2つの直角三角形」または「1つの三角形＋仰角」の図を自分で描きます。見上げる角（仰角）と水平距離を、$\\tan$ で高さに変換するのが基本です。空間図形は、求めたい長さや角を含む「断面の三角形」を取り出し、平面の図形と計量に落とし込みます。立体のまま考えないのがコツです。",
      },
      geometryDiagramBlock("geometry-measurement-spatial-section-figure", "spatial-section"),
      {
        id: "fusion-heading",
        type: "heading",
        level: 2,
        text: "図形の性質との融合",
      },
      {
        id: "fusion-text",
        type: "paragraph",
        text:
          "計量で必要な辺や比が直接与えられないとき、図形の性質（相似・方べき・角の二等分線・チェバ・メネラウス）で先に辺を作ってから、正弦・余弦定理に戻ります。「比が出たら相似や二等分線」「円と割線が出たら方べき」を疑い、足りない辺を補ってから計量に入ります。",
      },
      {
        id: "discrimination-drill",
        type: "discriminationDrill",
        title: "判別ドリル：初手は何を使う？（図形と計量）",
        intro:
          "計算はしません。条件を読んで「最初に使う道具」を選び、理由まで言えるかを確認します。10問連続で、初手選択のスピードを上げましょう。",
        items: [
          {
            condition: "$AB=7$, $AC=5$, $\\angle A=60^\\circ$。辺 $BC$ を求めたい。",
            goal: "$BC$",
            choices: ["余弦定理", "正弦定理", "面積公式"],
            answer: "余弦定理",
            reason: "2辺と挟角があるので、第三辺は余弦定理で直接出る。",
          },
          {
            condition: "$BC=6$, $\\angle A=30^\\circ$ が分かっていて、外接円の半径 $R$ を求めたい。",
            goal: "$R$",
            choices: ["正弦定理", "余弦定理", "面積公式"],
            answer: "正弦定理",
            reason: "辺と向かいの角が1組。$\\dfrac{a}{\\sin A}=2R$ で $R$ が出る。",
          },
          {
            condition: "3辺 $a=8,b=7,c=5$ が分かっていて、$\\cos A$ を求めたい。",
            goal: "$\\cos A$",
            choices: ["余弦定理", "正弦定理", "面積公式"],
            answer: "余弦定理",
            reason: "3辺がそろえば余弦定理で角の余弦が出る。符号で鋭角・鈍角も分かる。",
          },
          {
            condition: "面積 $S=10$、はさむ2辺が $4,5$。間の角の $\\sin$ を求めたい。",
            goal: "$\\sin C$",
            choices: ["面積公式から逆算", "正弦定理", "余弦定理"],
            answer: "面積公式から逆算",
            reason: "$S=\\dfrac12 ab\\sin C$ を $\\sin C=\\dfrac{2S}{ab}$ と変形するだけ。",
          },
          {
            condition: "余弦定理で $\\cos\\theta=-\\dfrac{1}{3}$ が出た。$\\sin\\theta$ を求めたい（三角形の内角）。",
            goal: "$\\sin\\theta$",
            choices: ["相互関係 $\\sin^2+\\cos^2=1$", "正弦定理", "面積公式"],
            answer: "相互関係 $\\sin^2+\\cos^2=1$",
            reason: "三角形の内角は $\\sin>0$。$\\sin\\theta=\\sqrt{1-\\cos^2\\theta}$ で出す。",
          },
          {
            condition: "3辺 $a,b,c$ と面積 $S$ が分かっていて、内接円の半径 $r$ を求めたい。",
            goal: "$r$",
            choices: ["$S=rs$", "正弦定理", "円周角の定理"],
            answer: "$S=rs$",
            reason: "$s=\\dfrac{a+b+c}{2}$ として $r=\\dfrac{S}{s}$。面積から内接円半径へ。",
          },
          {
            condition: "円に内接する四角形で $\\angle A=110^\\circ$。向かいの $\\angle C$ を求めたい。",
            goal: "$\\angle C$",
            choices: ["対角の和 $180^\\circ$", "正弦定理", "余弦定理"],
            answer: "対角の和 $180^\\circ$",
            reason: "内接四角形は対角の和が $180^\\circ$。$\\angle C=70^\\circ$。",
          },
          {
            condition: "地点 $A$ から仰角 $30^\\circ$、$20$m 近づいた $B$ から仰角 $45^\\circ$。木の高さを求めたい。",
            goal: "木の高さ",
            choices: ["2つの直角三角形＋$\\tan$", "正弦定理だけ", "面積公式"],
            answer: "2つの直角三角形＋$\\tan$",
            reason: "測量は図を描き、$\\tan$ で高さに変換して2式の差から解く。",
          },
          {
            condition: "正四面体の1つの面の中で、頂点から対辺へ下ろした長さを求めたい。",
            goal: "断面の長さ",
            choices: ["断面の三角形に落として計量", "立体のまま余弦定理", "方べきの定理"],
            answer: "断面の三角形に落として計量",
            reason: "空間は求めたい長さを含む断面を取り出し、平面の図形と計量に落とす。",
          },
          {
            condition: "円の外の点 $P$ から割線 $PAB$ と接線 $PT$。$PA,PB$ から $PT$ を求めたい。",
            goal: "$PT$",
            choices: ["方べきの定理", "正弦定理", "面積公式"],
            answer: "方べきの定理",
            reason: "円＋外部点＋接線は方べき。$PT^2=PA\\cdot PB$ で辺を作ってから計量へ。",
          },
        ],
      },
      {
        id: "original-problem-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習①：誘導に乗る基本問題",
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
        id: "fusion-problem-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習②：誘導が薄い融合問題",
      },
      {
        id: "fusion-problem-callout",
        type: "callout",
        tone: "warning",
        title: "ここからは自分で道具を選ぶ",
        text:
          "次の問題は小問の誘導が薄く、外接円・内接円・面積をまたぎます。さっきの判別フローを思い出しながら、6分を目安に解いてください。",
      },
      {
        id: "fusion-problem",
        type: "problem",
        title: "図形と計量：外接円と内接円の融合",
        prompt:
          "三角形ABCにおいて $a=BC=7$, $b=CA=5$, $c=AB=3$ とする。\n\n(1) $\\cos A$ を求めよ。\n(2) 三角形ABCの面積 $S$ を求めよ。\n(3) 外接円の半径 $R$ と内接円の半径 $r$ を求めよ。",
        choices: [
          "$\\cos A=-\\dfrac{1}{2},\\ S=\\dfrac{15\\sqrt3}{4},\\ R=\\dfrac{7\\sqrt3}{3},\\ r=\\dfrac{\\sqrt3}{2}$",
          "$\\cos A=\\dfrac{1}{2},\\ S=\\dfrac{15\\sqrt3}{4},\\ R=\\dfrac{7}{2},\\ r=\\sqrt3$",
          "$\\cos A=-\\dfrac{1}{2},\\ S=\\dfrac{15\\sqrt3}{2},\\ R=\\dfrac{7\\sqrt3}{3},\\ r=\\sqrt3$",
          "$\\cos A=-\\dfrac{1}{5},\\ S=\\dfrac{15\\sqrt3}{4},\\ R=\\dfrac{7\\sqrt3}{3},\\ r=\\dfrac{\\sqrt3}{2}$",
        ],
        answer:
          "$\\cos A=-\\dfrac{1}{2},\\ S=\\dfrac{15\\sqrt3}{4},\\ R=\\dfrac{7\\sqrt3}{3},\\ r=\\dfrac{\\sqrt3}{2}$",
        points: 9,
        mistakeTags: ["公式選択ミス", "計算ミス", "条件見落とし"],
      },
      {
        id: "fusion-problem-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body: "3辺がそろっているので $\\cos A$ は余弦定理。$\\sin A$ は相互関係。面積は $S=\\frac12 bc\\sin A$。$R$ は正弦定理 $\\frac{a}{\\sin A}=2R$、$r$ は $S=rs$。",
          },
          {
            label: "詳しい解説",
            body:
              "(1) $\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{25+9-49}{30}=-\\dfrac{1}{2}$。よって $A=120^\\circ$。\n\n(2) $\\sin A=\\sqrt{1-\\cos^2A}=\\dfrac{\\sqrt3}{2}$。$S=\\dfrac12\\cdot5\\cdot3\\cdot\\dfrac{\\sqrt3}{2}=\\dfrac{15\\sqrt3}{4}$。\n\n(3) $2R=\\dfrac{a}{\\sin A}=\\dfrac{7}{\\sqrt3/2}=\\dfrac{14}{\\sqrt3}$ より $R=\\dfrac{7}{\\sqrt3}=\\dfrac{7\\sqrt3}{3}$。$s=\\dfrac{7+5+3}{2}=\\dfrac{15}{2}$、$r=\\dfrac{S}{s}=\\dfrac{15\\sqrt3/4}{15/2}=\\dfrac{\\sqrt3}{2}$。",
          },
          {
            label: "よくあるミス",
            body: "(1) で $\\cos A$ の符号を $+$ にしてしまう（$a=7$ が最長辺なので $A$ は鈍角、$\\cos A<0$）。$R$ の有理化で $\\dfrac{7}{\\sqrt3}=\\dfrac{7\\sqrt3}{3}$ を忘れる。$s$ を周そのもの $15$ としてしまう（$s$ は半分）。",
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
        id: "mistake-recovery",
        type: "mistakeRecovery",
        title: "ミス別補講：間違えた理由から戻る",
        intro:
          "演習で間違えたら、原因に合わせて戻る場所を変えます。やみくもに解き直さず、つまずいた「種類」から復習しましょう。",
        items: [
          {
            symptom: "公式選択を間違えた（余弦か正弦か迷った）",
            action: "解法判別フローをもう一度",
            href: "#tool-flow",
          },
          {
            symptom: "sinをどこから出すか迷った",
            action: "sinの優先順位フローへ",
            href: "#sin-priority-flow",
          },
          {
            symptom: "sinとcosの符号を間違えた",
            action: "鋭角・鈍角の符号確認へ",
            href: "#angle-sign-heading",
          },
          {
            symptom: "図の条件を読み落とした",
            action: "図形レイヤーで条件を1段ずつ確認",
            href: "#geometry-layer-first-look",
          },
          {
            symptom: "外接円R・内接円rで詰まった",
            action: "R と S=rs のチャプターへ",
            href: "#circumradius-heading",
          },
          {
            symptom: "比・方べきに気づかなかった",
            action: "図形の性質 補助線発見講座へ",
            href: "/common-test/lectures/geometry-properties-auxiliary-lines",
          },
        ],
      },
      {
        id: "related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "数学IA 第1問 図形と計量",
            href: "/common-test/math-1a/section-1",
            note: "講義後に15分で確認する",
          },
          {
            title: "数学IA 本番演習",
            href: "/common-test/simulator/common-test-math-1a-manual-001",
            note: "時間内スコアとの差を見る",
          },
          {
            title: "数学IA 本番演習 第2回",
            href: "/common-test/simulator/common-test-math-1a-manual-002",
            note: "測量と公式選択をもう一度確認する",
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
        id: "quadratic-flow-heading",
        type: "heading",
        level: 2,
        text: "解法判別フロー：何を見て場合分けするか",
      },
      {
        id: "quadratic-flow",
        type: "solutionFlow",
        title: "二次関数の道具選び",
        intro:
          "二次関数は、聞かれているもの（最大か最小か、解の個数か）と、軸・定義域の位置関係で、やることが決まります。",
        steps: [
          {
            condition: "最小値を聞かれている（上に開く）",
            tool: "軸が定義域に入るか",
            reason: "入れば頂点が最小、入らなければ軸に近い端点が最小。",
          },
          {
            condition: "最大値を聞かれている（上に開く）",
            tool: "端点比較 $f(左端)$ と $f(右端)$",
            reason: "軸から遠い端点が最大。境界は $f(左)=f(右)$ から出す。",
          },
          {
            condition: "下に開く（$a<0$）",
            tool: "最大と最小の考え方を入れ替える",
            reason: "頂点が最大になる。上に開く場合の逆を当てはめる。",
          },
          {
            condition: "文字定数で軸が動く",
            tool: "軸を文字で表し、定義域の端と比較",
            reason: "軸が端をまたぐ値が場合分けの境界。先に境界だけ書き出す。",
          },
          {
            condition: "解の個数・符号を聞かれている",
            tool: "判別式 ＋ 軸の位置 ＋ 端点の符号",
            reason: "$D$ だけでは足りない。区間内の解は軸と端点の符号もそろえる。",
          },
          {
            condition: "$x$ 軸との共有点・不等式の解",
            tool: "グラフと $x$ 軸の上下で読む",
            reason: "$f(x)>0$ はグラフが $x$ 軸より上の範囲。頂点の符号で判断。",
          },
        ],
      },
      {
        id: "quadratic-drill",
        type: "discriminationDrill",
        title: "判別ドリル：どう場合分けする？（二次関数）",
        intro:
          "計算はしません。聞かれているものと軸・定義域の関係から、最小・最大がどこで起きるか、境界はどこかを即答します。",
        items: [
          {
            condition: "上に開く放物線。軸が定義域の内側にある。最小値はどこ？",
            goal: "最小値の位置",
            choices: ["頂点", "左端", "右端"],
            answer: "頂点",
            reason: "上に開いて軸が定義域内なら、最小は頂点。",
          },
          {
            condition: "上に開く放物線。軸が定義域より右にある。最小値はどこ？",
            goal: "最小値の位置",
            choices: ["右端", "頂点", "左端"],
            answer: "右端",
            reason: "軸が右外なら定義域では減少。軸に最も近い右端が最小。",
          },
          {
            condition: "上に開く放物線で、最大値を求めたい。まず何をする？",
            goal: "最大値",
            choices: ["両端 $f(左),f(右)$ を比較", "頂点を求める", "判別式を計算"],
            answer: "両端 $f(左),f(右)$ を比較",
            reason: "上に開くと最大は端点。軸から遠い端が最大。",
          },
          {
            condition: "最大値の場合分けの境界はどこから出す？",
            choices: ["$f(左端)=f(右端)$", "頂点 $=0$", "判別式 $=0$"],
            answer: "$f(左端)=f(右端)$",
            reason: "端点の大小が入れ替わるところが境界。",
          },
          {
            condition: "下に開く放物線。軸が定義域内。最大値はどこ？",
            goal: "最大値の位置",
            choices: ["頂点", "左端", "右端"],
            answer: "頂点",
            reason: "下に開くと頂点が最大（上に開く場合の逆）。",
          },
          {
            condition: "2次方程式が異なる2つの実数解をもつ条件を調べたい。",
            choices: ["判別式 $D>0$", "判別式 $D\\geqq0$", "頂点の $y$ 座標"],
            answer: "判別式 $D>0$",
            reason: "異なる2解は $D>0$（等号なし）。重解は1つの解。",
          },
          {
            condition: "ある区間に2解がともに入る条件を調べたい。何をそろえる？",
            choices: ["判別式・軸の位置・端点の符号", "判別式だけ", "頂点の符号だけ"],
            answer: "判別式・軸の位置・端点の符号",
            reason: "区間内の解配置は $D$・軸・端点の符号の3点セット。",
          },
          {
            condition: "$f(x)>0$ の解の範囲（上に開く）を求めたい。",
            goal: "不等式の解",
            choices: ["グラフが $x$ 軸より上の範囲", "頂点の $x$ 座標", "判別式の値"],
            answer: "グラフが $x$ 軸より上の範囲",
            reason: "不等式はグラフと $x$ 軸の上下で読む。",
          },
          {
            condition: "文字定数 $t$ で軸 $x=t$ が動く。場合分けの境界の候補は？",
            choices: ["軸が定義域の端をまたぐ $t$", "$t=0$ だけ", "頂点の $y=0$"],
            answer: "軸が定義域の端をまたぐ $t$",
            reason: "軸が左端・右端をまたぐ値が境界。気分で作らない。",
          },
          {
            condition: "最大値と最小値、両方を $t$ で場合分けする。境界は同じ？",
            choices: ["別々に出す（最小は軸、最大は端点比較）", "同じ境界を使う", "判別式で決める"],
            answer: "別々に出す（最小は軸、最大は端点比較）",
            reason: "最小の境界は軸が端をまたぐ値、最大の境界は端点が入れ替わる値。混ぜない。",
          },
        ],
      },
      {
        id: "quadratic-original-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習：軸と端点で最大最小を決める",
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
        id: "quadratic-mistake-recovery",
        type: "mistakeRecovery",
        title: "ミス別補講：間違えた理由から戻る",
        intro: "場合分けは「どこでつまずいたか」で戻る場所が変わります。",
        items: [
          {
            symptom: "最大か最小か、どこで起きるか迷った",
            action: "解法判別フローをもう一度",
            href: "#quadratic-flow",
          },
          {
            symptom: "軸と定義域の位置関係が描けない",
            action: "軸の左・中・右の3パターン図へ",
            href: "#quadratic-axis-cases-figure",
          },
          {
            symptom: "場合分けの境界を作り間違えた",
            action: "場合分けの境界値のチャプターへ",
            href: "#quadratic-boundary-heading",
          },
          {
            symptom: "最小と最大の境界を混ぜた",
            action: "判別ドリルで境界の出し方を再確認",
            href: "#quadratic-drill",
          },
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
        id: "probability-flow-heading",
        type: "heading",
        level: 2,
        text: "解法判別フロー：数える前に決めること",
      },
      {
        id: "probability-flow",
        type: "solutionFlow",
        title: "確率の道具選び",
        intro:
          "確率は数え始める前に「何を1通りと数えるか」を決めます。次の判別で、順序・道具・余事象を先に確定させましょう。",
        steps: [
          {
            condition: "順番に意味があるか（並び・くじの順）",
            tool: "順列で数える",
            reason: "並べる順を区別するなら順列。同じ組でも順序違いは別と数える。",
          },
          {
            condition: "順番に意味がない（選ぶだけ・組）",
            tool: "組合せで数える",
            reason: "順序を区別しないなら組合せ。分母・分子を同じ数え方にそろえる。",
          },
          {
            condition: "「少なくとも」「〜でない」が出てきた",
            tool: "余事象",
            reason: "反対側を数える方が速いことが多い。$1-(\\text{反対})$。",
          },
          {
            condition: "毎回同じ条件で繰り返す試行",
            tool: "反復試行 $\\binom{n}{k}p^k(1-p)^{n-k}$",
            reason: "成功回数の選び方×成功×失敗の3点セット。",
          },
          {
            condition: "「〜が起きたとき」と前提がついた",
            tool: "条件付き確率（母集団を絞る）",
            reason: "前提が起きた後の状態で数え直す。分母が変わる。",
          },
          {
            condition: "状態が少ない／手順が分岐する",
            tool: "表・樹形図で全列挙",
            reason: "数え漏れ・重複を防ぐ。小さい問題は描いた方が速い。",
          },
        ],
      },
      {
        id: "probability-drill",
        type: "discriminationDrill",
        title: "判別ドリル：数える前に何を決める？（確率）",
        intro:
          "計算はしません。設定を読んで、順序を区別するか、余事象を使うか、どの道具で数えるかを即決します。",
        items: [
          {
            condition: "5人を1列に並べる並べ方の数を求めたい。",
            goal: "並べ方",
            choices: ["順列", "組合せ", "余事象"],
            answer: "順列",
            reason: "並ぶ順を区別するので順列。$5!$。",
          },
          {
            condition: "10人から委員3人を選ぶ選び方の数を求めたい。",
            goal: "選び方",
            choices: ["組合せ", "順列", "反復試行"],
            answer: "組合せ",
            reason: "役職がなく順序を区別しないので組合せ。$\\binom{10}{3}$。",
          },
          {
            condition: "3個のさいころで、少なくとも1個が6である確率を求めたい。",
            goal: "確率",
            choices: ["余事象", "順列", "条件付き確率"],
            answer: "余事象",
            reason: "「少なくとも1個」は1個も6でない確率を引く方が速い。",
          },
          {
            condition: "1個のさいころを5回投げ、偶数がちょうど3回出る確率を求めたい。",
            goal: "確率",
            choices: ["反復試行", "条件付き確率", "順列"],
            answer: "反復試行",
            reason: "同じ試行の繰り返し。$\\binom{5}{3}p^3(1-p)^2$。",
          },
          {
            condition: "袋から戻さず2個取り、1個目が赤と分かったとき2個目が赤の確率。",
            goal: "確率",
            choices: ["条件付き確率（母集団を絞る）", "反復試行", "順列"],
            answer: "条件付き確率（母集団を絞る）",
            reason: "1個目が赤の後の残りで数え直す。分母が変わる。",
          },
          {
            condition: "赤白青の玉から3個取る。3色すべて異なる場合の数を数えたい。",
            goal: "場合の数",
            choices: ["各色から1個ずつの積", "余事象", "順列"],
            answer: "各色から1個ずつの積",
            reason: "色ごとに1個ずつ選ぶ積で数える。順序は区別しない。",
          },
          {
            condition: "コインを4回投げ、表と裏の出方を全部調べたい（少数）。",
            choices: ["樹形図・表で全列挙", "条件付き確率", "余事象"],
            answer: "樹形図・表で全列挙",
            reason: "状態が少ないときは全列挙が確実で速い。",
          },
          {
            condition: "「ちょうど2個が赤」を数える。残りの1個はどう数える？",
            choices: ["赤以外からちょうど1個", "赤を含めて1個", "区別しない"],
            answer: "赤以外からちょうど1個",
            reason: "「ちょうど2個」は残りを赤以外に限定して数える。",
          },
          {
            condition: "確率の分母を作るとき、最も大事なことは？",
            choices: ["分母と分子を同じ数え方にそろえる", "必ず順列で数える", "必ず組合せで数える"],
            answer: "分母と分子を同じ数え方にそろえる",
            reason: "同様に確からしい単位をそろえる。途中で順序の扱いを変えない。",
          },
          {
            condition: "「A または B」の確率で、A と B が同時に起こりうる。",
            choices: ["和の法則＋重複を引く", "そのまま足す", "余事象だけ"],
            answer: "和の法則＋重複を引く",
            reason: "排反でないなら $P(A)+P(B)-P(A\\cap B)$。重複を一度引く。",
          },
        ],
      },
      {
        id: "probability-original-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習：誘導文を言い換えて数える",
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
        id: "probability-mistake-recovery",
        type: "mistakeRecovery",
        title: "ミス別補講：間違えた理由から戻る",
        intro: "数え間違いは原因が分かれます。種類に合わせて戻りましょう。",
        items: [
          {
            symptom: "順列か組合せか迷った／取り違えた",
            action: "解法判別フローをもう一度",
            href: "#probability-flow",
          },
          {
            symptom: "「少なくとも」を直接数えて手間取った",
            action: "余事象を使う判断へ",
            href: "#probability-complement-callout",
          },
          {
            symptom: "分母と分子の数え方がずれた",
            action: "状態整理表で分母を固定し直す",
            href: "#probability-counting-figure",
          },
          {
            symptom: "条件付きで母集団を更新し忘れた",
            action: "判別ドリルで前提の扱いを再確認",
            href: "#probability-drill",
          },
        ],
      },
      {
        id: "probability-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "数学IA 第4問 場合の数と確率",
            href: "/common-test/math-1a/section-4",
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
      geometryDiagramBlock("geometry-properties-auxiliary-choice-figure", "auxiliary-line-choice"),
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
      {
        id: "gp-map-heading",
        type: "heading",
        level: 2,
        text: "満点までの地図",
      },
      {
        id: "gp-map-callout",
        type: "callout",
        tone: "info",
        title: "図形の性質で満点を取る地図",
        text:
          "図形の性質は「定理を知っている」だけでは点になりません。図のどの形を見たら、どの定理を出すかの判別が勝負です。出る形は、円（円周角・接弦・方べき）、比（相似・角の二等分線・チェバ・メネラウス）、内接四角形（対角の和・トレミー）の3系統。共通テストでは、計量（正弦・余弦定理）とつないで「辺を作る道具」として出ることが多いです。\n\n最初に見るのは「円があるか」「比が出ているか」「点がどこに並んでいるか」。落としやすいのは、方べきで外部点からの距離ではなく弦の長さを掛ける、チェバとメネラウスの取り違え、相似の対応順のずれです。",
      },
      {
        id: "gp-flow-heading",
        type: "heading",
        level: 2,
        text: "解法判別フロー：その形は何を疑うか",
      },
      {
        id: "gp-flow",
        type: "solutionFlow",
        title: "図形の性質の道具選び",
        intro:
          "図に出ている「形」から、疑う定理を1つに絞ります。形と定理の対応を覚えると、補助線も自然に決まります。",
        steps: [
          {
            condition: "比が出ている（線分の比・面積比）",
            tool: "相似・角の二等分線・チェバ・メネラウス",
            reason: "比は比を生む。まず相似、内部の交点ならチェバ、直線が横切るならメネラウス。",
          },
          {
            condition: "円があり、同じ弧・等しい角が見える",
            tool: "円周角の定理",
            reason: "同じ弧に対する円周角は等しい。角を別の場所へ移せる。",
          },
          {
            condition: "円の接線と弦が見える",
            tool: "接弦定理",
            reason: "接線と弦のなす角＝その弦に対する円周角。",
          },
          {
            condition: "円と2本の割線・接線・交わる弦（外部点や交点）",
            tool: "方べきの定理",
            reason: "同じ点から円へ伸びる線分の積が等しい。$PA\\cdot PB=PC\\cdot PD$。",
          },
          {
            condition: "三角形の内部で3頂点からの線が1点で交わる",
            tool: "チェバの定理",
            reason: "内部の交点まわりの3つの辺の比の積が1。",
          },
          {
            condition: "1本の直線が三角形の3辺（延長含む）を横切る",
            tool: "メネラウスの定理",
            reason: "横切る直線まわりの3つの比の積が1。",
          },
          {
            condition: "四角形が円に内接している",
            tool: "対角の和 $180^\\circ$・トレミーの定理",
            reason: "向かい合う角の和は $180^\\circ$。対角線と辺の積はトレミーで結べる。",
          },
        ],
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
        id: "gp-theorems-heading",
        type: "heading",
        level: 2,
        text: "パターン別ミニ講義：使う場面と初手",
      },
      {
        id: "gp-ratio-heading",
        type: "heading",
        level: 3,
        text: "比が出たら：相似・角の二等分線・チェバ・メネラウス",
      },
      {
        id: "gp-ratio-text",
        type: "paragraph",
        text:
          "辺の比や面積比が出たら、まず相似な三角形を探します。三角形の内角の二等分線は、対辺を「はさむ2辺の比」に内分します（$BD:DC=AB:AC$）。中点が出れば中点連結定理で「平行かつ半分」。内部で3本の線が1点に集まればチェバ、1本の直線が3辺を横切ればメネラウスです。",
      },
      geometryDiagramBlock("geometry-properties-bisector-ratio-figure", "angle-bisector-ratio"),
      {
        id: "gp-ratio-math",
        type: "math",
        expression: "\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB}=1",
        caption: "チェバ（内部の交点）もメネラウス（横切る直線）も、3つの比の積=1。どの点を回るかで使い分ける。",
      },
      geometryDiagramBlock("geometry-properties-bisector-length-figure", "angle-bisector-length"),
      geometryDiagramBlock("geometry-properties-median-length-figure", "median-length"),
      {
        id: "gp-circle-heading",
        type: "heading",
        level: 3,
        text: "円が出たら：円周角・接弦定理・方べき",
      },
      {
        id: "gp-circle-text",
        type: "paragraph",
        text:
          "円があれば、まず同じ弧に対する円周角の等しさで角を移します。接線があれば接弦定理（接線と弦のなす角＝弦に対する円周角）。外部点や交点から2本の線が円に伸びていれば方べきの定理です。方べきは「同じ点からの距離の積」で、弦の長さを掛けないのが鉄則です。",
      },
      {
        id: "gp-circle-math",
        type: "math",
        expression: "PA\\cdot PB=PC\\cdot PD,\\qquad PT^2=PA\\cdot PB",
        caption: "左は2本の割線、右は接線と割線。どちらも外部点Pからの距離の積でそろえる。",
      },
      geometryDiagramBlock("geometry-properties-circumcenter-figure", "circumcenter-circumcircle"),
      geometryDiagramBlock("geometry-properties-incenter-figure", "incenter-incircle"),
      {
        id: "gp-cyclic-heading",
        type: "heading",
        level: 3,
        text: "円に内接する四角形：対角の和とトレミー",
      },
      {
        id: "gp-cyclic-text",
        type: "paragraph",
        text:
          "四角形が円に内接していれば、向かい合う角の和は $180^\\circ$。補角なので $\\sin$ が等しく、計量へつなぎやすい形です。対角線と辺の積を結びたいときはトレミーの定理 $AC\\cdot BD=AB\\cdot CD+AD\\cdot BC$ を使います。",
      },
      {
        id: "gp-fusion-text",
        type: "paragraph",
        text:
          "図形の性質で求めた辺や比は、最後に正弦・余弦定理へ渡して長さや角を出すことが多いです。「性質で辺を作る → 計量で仕上げる」という二段構えを意識しましょう。",
      },
      {
        id: "gp-drill",
        type: "discriminationDrill",
        title: "判別ドリル：その形は何を疑う？（図形の性質）",
        intro:
          "図の特徴を読んで、最初に疑う定理を選びます。計算はしません。比・円・交点・内接の手がかりに反応できるかを確認しましょう。",
        items: [
          {
            condition: "三角形の内部で、3頂点から対辺へ引いた線が1点で交わっている。",
            choices: ["チェバの定理", "メネラウスの定理", "方べきの定理"],
            answer: "チェバの定理",
            reason: "内部の1点で交わる3本＝チェバ。3辺の比の積が1。",
          },
          {
            condition: "1本の直線が三角形の3辺（またはその延長）を横切っている。",
            choices: ["メネラウスの定理", "チェバの定理", "接弦定理"],
            answer: "メネラウスの定理",
            reason: "三角形を横切る直線＝メネラウス。比の積が1。",
          },
          {
            condition: "円の外部の点から接線と割線が引かれ、接線の長さを求めたい。",
            goal: "接線の長さ",
            choices: ["方べきの定理", "正弦定理", "中点連結定理"],
            answer: "方べきの定理",
            reason: "接線と割線は $PT^2=PA\\cdot PB$。外部点からの距離の積。",
          },
          {
            condition: "$\\angle A$ の二等分線が対辺 $BC$ と交わり、$BD:DC$ を求めたい。",
            goal: "$BD:DC$",
            choices: ["角の二等分線の性質", "方べきの定理", "円周角の定理"],
            answer: "角の二等分線の性質",
            reason: "$BD:DC=AB:AC$。はさむ2辺の比に内分する。",
          },
          {
            condition: "円に内接する四角形で、1つの角から向かいの角を求めたい。",
            goal: "向かいの角",
            choices: ["対角の和 $180^\\circ$", "接弦定理", "チェバの定理"],
            answer: "対角の和 $180^\\circ$",
            reason: "内接四角形は対角の和が $180^\\circ$。引き算で出る。",
          },
          {
            condition: "円の接線と、接点から引いた弦のなす角を、別の角に移したい。",
            choices: ["接弦定理", "方べきの定理", "中点連結定理"],
            answer: "接弦定理",
            reason: "接線と弦のなす角＝その弦に対する円周角に等しい。",
          },
          {
            condition: "2つの三角形で2組の角が等しいと分かり、辺の比を求めたい。",
            goal: "辺の比",
            choices: ["相似", "方べきの定理", "メネラウスの定理"],
            answer: "相似",
            reason: "2角が等しければ相似。対応する辺の比が等しい。",
          },
          {
            condition: "三角形の2辺の中点を結んだ線分について調べたい。",
            choices: ["中点連結定理", "角の二等分線の性質", "方べきの定理"],
            answer: "中点連結定理",
            reason: "中点どうしを結ぶと、第三辺に平行で長さは半分。",
          },
          {
            condition: "円に内接する四角形で、対角線と辺の積を結びつけたい。",
            choices: ["トレミーの定理", "方べきの定理", "正弦定理"],
            answer: "トレミーの定理",
            reason: "$AC\\cdot BD=AB\\cdot CD+AD\\cdot BC$。対角線×対角線＝辺の積の和。",
          },
          {
            condition: "円の中で2本の弦が交わり、交点から各端までの積を比べたい。",
            choices: ["方べきの定理", "接弦定理", "チェバの定理"],
            answer: "方べきの定理",
            reason: "交わる弦も方べき。交点から各弦の両端までの積が等しい。",
          },
        ],
      },
      {
        id: "geometry-properties-original-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習：方べきと相似へつなぐ",
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
        id: "gp-mistake-recovery",
        type: "mistakeRecovery",
        title: "ミス別補講：間違えた理由から戻る",
        intro: "つまずいた種類に合わせて、戻る場所を変えましょう。",
        items: [
          {
            symptom: "どの定理を使うか選べなかった",
            action: "解法判別フローをもう一度",
            href: "#gp-flow",
          },
          {
            symptom: "チェバとメネラウスを取り違えた",
            action: "比のミニ講義（内部の交点か、横切る直線か）へ",
            href: "#gp-ratio-heading",
          },
          {
            symptom: "方べきで掛ける長さを間違えた",
            action: "円のミニ講義（外部点からの距離の積）へ",
            href: "#gp-circle-heading",
          },
          {
            symptom: "補助線が思いつかなかった",
            action: "図形レイヤーで同じ角・相似を探す",
            href: "#geometry-properties-layer",
          },
          {
            symptom: "性質は出せたが長さで詰まった",
            action: "図形と計量 徹底講座へ",
            href: "/common-test/lectures/geometry-measurement-intensive",
          },
        ],
      },
      {
        id: "geometry-properties-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "数学IA 第3問 図形の性質",
            href: "/common-test/math-1a/section-3",
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
  {
    id: "lecture-data-analysis-quartiles-outliers-001",
    slug: "data-analysis-quartiles-outliers",
    title: "共通テスト データの分析 四分位数・外れ値講座",
    description:
      "中央値、四分位数、四分位範囲、外れ値、平均値と中央値の変化を、冊子型模試の復習に必要な範囲へ絞って整理する講座です。",
    subject: "数学IA",
    unit: "データの分析",
    difficulty: "標準",
    recommendedMinutes: 45,
    tags: ["数学IA", "共通テスト", "データの分析", "四分位数", "外れ値", "箱ひげ図", "重点講座"],
    publishedAt: "2026-07-03",
    blocks: [
      {
        id: "data-analysis-opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "冊子型模試 第1回・第2回の第2問後半で必要な、中央値、Q1、Q3、IQR、外れ値、外れ値を除いた平均値・中央値、データ追加後の判定に集中します。散布図・相関係数と代表値の使い分けは基本のみ扱い、仮説検定のような発展的な内容までは広げません。あくまで模試復習に戻るための中核を固めることが目的です。",
      },
      {
        id: "data-analysis-scope-heading",
        type: "heading",
        level: 2,
        text: "データの分析で扱うこと",
      },
      {
        id: "data-analysis-scope-text",
        type: "paragraph",
        text:
          "ここで扱うのは、データを小さい順に並べ、位置で中央値と四分位数を決め、IQRから外れ値を判定し、平均値と中央値が追加・削除でどう変わるかを読む力です。共通テストでは、計算そのものよりも「何個のデータか」「中央値を上下に含めるか」「外れ値の境界が以下・以上か」を読めるかで差がつきます。",
      },
      {
        id: "data-analysis-importance",
        type: "callout",
        tone: "success",
        title: "共通テストで重要な理由",
        text:
          "第2問後半では、会話文や表の流れに沿って、中央値、Q1、Q3、IQR、外れ値、平均値の変化を連続して埋めます。前半で四分位数を1つずらすと、外れ値判定、外れ値除去後の平均、追加後の判定まで連鎖して失点します。",
      },
      {
        id: "data-analysis-terms-heading",
        type: "heading",
        level: 2,
        text: "用語・公式一覧",
      },
      {
        id: "data-analysis-terms",
        type: "checklist",
        title: "今回使う道具",
        items: [
          "中央値：小さい順に並べたときの中央の値。個数が偶数なら中央2個の平均。",
          "第1四分位数 Q1：下半分の中央値。",
          "第3四分位数 Q3：上半分の中央値。",
          "このサイト・冊子型模試では、データ数が奇数のとき、全体の中央値は下半分・上半分に含めない。",
          "データ数が偶数のときは、下位半分と上位半分に分け、それぞれの中央値を Q1, Q3 とする。",
          "四分位範囲 IQR：Q3 - Q1。最大値 - 最小値ではない。",
          "外れ値の下側境界：Q1 - 1.5 × IQR。これ以下の値を外れ値とする。",
          "外れ値の上側境界：Q3 + 1.5 × IQR。これ以上の値を外れ値とする。",
          "平均値：合計 ÷ 個数。極端な値の影響を受けやすい。",
          "中央値：位置で決まる。極端な値には比較的強いが、追加・削除で中央位置が変われば値も変わる。",
          "箱ひげ図：最小値、Q1、中央値、Q3、最大値を読む図。平均値は示されていなければ読めない。",
        ],
      },
      {
        id: "data-analysis-quartile-method",
        type: "callout",
        tone: "warning",
        title: "四分位数の流儀を必ず確認する",
        text:
          "四分位数には、中央値を下半分・上半分に含める流儀と、含めない流儀があります。このサイトと冊子型模試では、奇数個のデータでは全体の中央値を除いて左右に分けます。ただし、共通テスト本番では問題文の定義や与えられたデータ数に従うことを最優先にしてください。",
      },
      {
        id: "data-analysis-flow-heading",
        type: "heading",
        level: 2,
        text: "判別フロー",
      },
      {
        id: "data-analysis-flow",
        type: "solutionFlow",
        title: "四分位数・外れ値・代表値の読み順",
        intro:
          "データの分析では、計算前に個数と位置を固定します。追加・削除後は必ず最初から数え直します。",
        steps: [
          {
            condition: "データの分析が出た",
            tool: "まずデータ数を数える",
            reason: "中央値と四分位数は、値の大きさより先に位置で決まる。",
          },
          {
            condition: "データが並んでいる",
            tool: "小さい順か確認",
            reason: "並びが崩れていると、中央値も四分位数もずれる。",
          },
          {
            condition: "中央位置を決める",
            tool: "中央値を求める",
            reason: "奇数なら中央1個、偶数なら中央2個の平均。",
          },
          {
            condition: "四分位数を求める",
            tool: "下半分・上半分を分ける",
            reason: "Q1 は下半分の中央値、Q3 は上半分の中央値。",
          },
          {
            condition: "外れ値判定がある",
            tool: "IQR と境界値を計算",
            reason: "IQR=Q3-Q1、下側は Q1-1.5IQR 以下、上側は Q3+1.5IQR 以上。",
          },
          {
            condition: "平均値を聞かれた",
            tool: "合計 ÷ 個数",
            reason: "平均値は合計から考える。外れ値を除くなら合計も個数も変える。",
          },
          {
            condition: "中央値を聞かれた",
            tool: "位置で決める",
            reason: "中央値は合計ではなく、並び直した後の中央位置で決まる。",
          },
          {
            condition: "データを追加・削除した",
            tool: "並び直して、個数と中央位置を再確認",
            reason: "四分位数も外れ値境界も変わることがある。",
          },
        ],
      },
      {
        id: "data-analysis-mean-median",
        type: "callout",
        tone: "info",
        title: "平均値と中央値の違い",
        text:
          "平均値は値そのものを全部足すので、40秒のような極端な値に引っ張られます。中央値は順番の中央で決まるので、極端な値には比較的強いです。ただし、データを追加・削除すると中央位置が変わるため、中央値も変わる場合があります。平均値は合計、中央値は位置。この区別を最後まで保ちます。",
      },
      {
        id: "data-analysis-common-test-cautions",
        type: "checklist",
        title: "共通テスト型の注意点",
        items: [
          "小さい順に並んでいるかを確認する。",
          "データ数を最初に数える。",
          "中央値を上下に含めて分けるかどうかを確認する。",
          "外れ値判定の「以下」「以上」を読み落とさない。",
          "境界値ちょうどの値も外れ値になる設定がある。",
          "平均値は合計から考える。",
          "中央値は位置から考える。",
          "追加・削除後は必ずデータ数と中央位置を見直す。",
          "小数・分数の境界値を焦って丸めない。",
          "箱ひげ図では、箱の中の線は中央値であり、平均値ではない。",
          "マーク式では整数部分、小数第1位、分数部分の入力順を確認する。",
        ],
      },
      {
        id: "data-analysis-example-1-heading",
        type: "heading",
        level: 2,
        text: "代表例題1：四分位数と外れ値の基本",
      },
      {
        id: "data-analysis-example-1",
        type: "problem",
        title: "11個のデータで外れ値を判定する",
        prompt:
          "次の11個のデータは、小さい順に並んでいる。\n\n12, 15, 17, 18, 20, 22, 23, 24, 25, 28, 40\n\nこのサイトの流儀に従い、中央値、第1四分位数 Q1、第3四分位数 Q3、四分位範囲 IQR を求めよ。また、Q1 - 1.5IQR 以下、Q3 + 1.5IQR 以上を外れ値とするとき、外れ値をすべて求めよ。",
        answer:
          "中央値は22、Q1=17、Q3=25、IQR=8。下側境界は5、上側境界は37。外れ値は40。",
        points: 16,
        mistakeTags: ["条件見落とし", "問題文の読み違い", "計算ミス"],
      },
      {
        id: "data-analysis-example-1-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "11個なので、まず6番目を中央値にします。奇数個のときは中央値を除き、下5個と上5個に分けて Q1, Q3 を求めます。",
          },
          {
            label: "詳しい解説",
            body:
              "データはすでに小さい順です。11個の中央は6番目なので、中央値は22です。\n\n中央値22を除くと、下半分は 12,15,17,18,20。この中央値は17なので Q1=17。上半分は 23,24,25,28,40。この中央値は25なので Q3=25。\n\nIQR=Q3-Q1=25-17=8。下側境界は 17-1.5×8=5、上側境界は 25+1.5×8=37。5以下の値はなく、37以上の値は40だけなので、外れ値は40です。",
          },
          {
            label: "別解",
            body:
              "位置だけで見る別視点も有効です。11個なら Q2 は6番目、Q1 は下側5個の3番目、Q3 は上側5個の3番目です。つまり全体の並びでは、Q1 は3番目、Q2 は6番目、Q3 は9番目に対応します。",
          },
          {
            label: "最速解法",
            body:
              "奇数個なら中央を丸で囲んで消し、左右の中央を拾います。計算は最後に IQR と境界だけ。外れ値の候補は端の値だけ見れば十分です。",
          },
          {
            label: "よくあるミス",
            body:
              "中央値22を下半分・上半分に含める、IQRを40-12にする、37を超える値だけを外れ値として40の判定を曖昧にする、が典型です。基準が「以上」なら37ちょうども外れ値です。",
          },
          {
            label: "類題",
            body:
              "冊子型模試 第1回・第2回の第2問後半に戻ります。この問題から学ぶことは、四分位数は公式ではなく、並べた位置で決まるということです。",
          },
        ],
      },
      {
        id: "data-analysis-example-2-heading",
        type: "heading",
        level: 2,
        text: "代表例題2：外れ値を除いた平均値・中央値",
      },
      {
        id: "data-analysis-example-2",
        type: "problem",
        title: "外れ値を除くと代表値はどう変わるか",
        prompt:
          "代表例題1のデータから外れ値40を除く。\n\n(1) 残り10個の中央値を求めよ。\n(2) 外れ値を除く前の平均値と、除いた後の平均値を比べよ。\n(3) 中央値と平均値の変化の違いを説明せよ。",
        answer:
          "残り10個の中央値は21。平均値は除く前が244/11、除いた後が204/10=20.4なので小さくなる。平均値は40に強く引っ張られていたが、中央値は位置の変化として22から21へ下がる。",
        points: 16,
        mistakeTags: ["問題文の読み違い", "条件見落とし", "計算ミス"],
      },
      {
        id: "data-analysis-example-2-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "外れ値を除いたら、データ数が10個に変わります。中央値は5番目と6番目の平均、平均値は合計から40を引いて個数10で割ります。",
          },
          {
            label: "詳しい解説",
            body:
              "40を除くと、データは 12,15,17,18,20,22,23,24,25,28 です。10個なので中央値は5番目20と6番目22の平均で、21です。\n\n除く前の合計は244なので平均値は244/11です。除いた後の合計は204、個数は10なので平均値は204/10=20.4です。40は他の値よりかなり大きいため、これを除くと平均値は小さくなります。\n\n中央値も22から21に変わりますが、平均値ほど極端な値そのものに引っ張られるわけではなく、中央位置が変わったために下がっています。",
          },
          {
            label: "別解",
            body:
              "平均値の大小は、厳密な割り算を最後までしなくても判断できます。もとの平均は20台前半で、40は平均より大きい値です。平均より大きい値を1つ除くと、残りの平均は必ず下がります。",
          },
          {
            label: "最速解法",
            body:
              "平均値は合計、中央値は位置。外れ値を除いた瞬間に、平均は「大きい値を抜いたから下がる」、中央値は「10個なので5番目と6番目」と切り替えます。",
          },
          {
            label: "よくあるミス",
            body:
              "40を除いたのに個数を11のままにする、中央値を除く前の22のままにする、平均値と中央値が同じ方向に同じ量だけ動くと思い込む、が多いです。",
          },
          {
            label: "類題",
            body:
              "外れ値を除いた平均値・中央値の比較問題に進みます。この問題から学ぶことは、平均値は値の大きさ、中央値は位置で動くという違いです。",
          },
        ],
      },
      {
        id: "data-analysis-example-3-heading",
        type: "heading",
        level: 2,
        text: "代表例題3：データを1つ追加したときの外れ値判定",
      },
      {
        id: "data-analysis-example-3",
        type: "problem",
        title: "境界値ちょうどでも外れ値になる",
        prompt:
          "代表例題1の11個のデータに、新しい整数 x を1個加える。ただし、28 < x < 40 とする。このとき、もとの最大値40が外れ値ではなくなるような x の個数を求めよ。外れ値の基準は、Q1 - 1.5IQR 以下、Q3 + 1.5IQR 以上とする。",
        answer:
          "0個。追加後は Q1=17.5、Q3=26.5、IQR=9、上側境界は40。基準は40以上なので、40は外れ値のまま。",
        points: 18,
        mistakeTags: ["条件見落とし", "問題文の読み違い", "自信ありで間違えた"],
      },
      {
        id: "data-analysis-example-3-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "追加後は12個のデータです。x は必ず28と40の間に入るので、下位6個・上位6個を分け直します。境界値の「以上」も最後に確認します。",
          },
          {
            label: "詳しい解説",
            body:
              "x は29から39の整数です。追加後の並びは、12,15,17,18,20,22,23,24,25,28,x,40 です。\n\n12個なので、下位6個は 12,15,17,18,20,22。したがって Q1=(17+18)/2=17.5。上位6個は 23,24,25,28,x,40。x は5番目なので、Q3=(25+28)/2=26.5 で、x の値に依存しません。\n\nIQR=26.5-17.5=9。上側境界は 26.5+1.5×9=26.5+13.5=40。外れ値は上側境界以上なので、40は境界値ちょうどでも外れ値です。したがって、40が外れ値ではなくなる x は存在せず、個数は0です。",
          },
          {
            label: "別解",
            body:
              "x を1つずつ代入する必要はありません。28 < x < 40 なら、x の順位は常に11番目、40は常に12番目です。Q3を決めるのは上位6個の3番目と4番目、つまり25と28なので、境界はすべての x で同じです。",
          },
          {
            label: "最速解法",
            body:
              "追加後の上半分だけを見ると 23,24,25,28,x,40。Q3 は真ん中2つの25と28で固定です。x に依存しないと分かれば、1回計算して終わりです。",
          },
          {
            label: "よくあるミス",
            body:
              "40が境界値ちょうどなら外れ値ではない、と読むミスが最重要です。この基準は「以上」なので40も外れ値です。また、x がQ3に入ると思い込むと、存在しない解を数えてしまいます。",
          },
          {
            label: "類題",
            body:
              "第1回模試の [ナ]=0 に直接戻ります。この問題から学ぶことは、追加後は四分位数を取り直すこと、そして境界値ちょうどを捨てないことです。",
          },
        ],
      },
      {
        id: "data-analysis-boxplot-heading",
        type: "heading",
        level: 2,
        text: "箱ひげ図の読み取り",
      },
      {
        id: "data-analysis-boxplot-checklist",
        type: "checklist",
        title: "箱ひげ図で読めること・読めないこと",
        items: [
          "箱の左端が Q1、箱の中の線が中央値、箱の右端が Q3。",
          "箱の幅 Q3-Q1 が四分位範囲。",
          "ひげの端は最小値・最大値、または外れ値を除いた端を表す場合があるので、問題文の注を読む。",
          "中央値の大小、四分位範囲の大小、全体の範囲は読み取れる。",
          "平均値、各値の個数、細かい分布の形は、別表示がなければ断定できない。",
        ],
      },
      {
        id: "data-analysis-scatter-heading",
        type: "heading",
        level: 2,
        text: "散布図と相関係数の基本",
      },
      {
        id: "data-analysis-scatter-text",
        type: "paragraph",
        text:
          "2つの量（たとえば数学の得点と理科の得点）を点で並べたものが散布図です。点が右上がりに集まっていれば正の相関、右下がりに集まっていれば負の相関、決まった傾向がなければ相関はほぼ0です。相関係数 $r$ は $-1\\leqq r\\leqq1$ の値を取り、$1$ に近いほど右上がりの直線的な関係が強く、$-1$ に近いほど右下がりの関係が強いことを表します。ここでは模試復習に必要な基本の読み取りだけを扱い、検定のような発展的な内容までは扱いません。",
      },
      {
        id: "data-analysis-scatter-checklist",
        type: "checklist",
        title: "散布図・相関係数の基本ルール",
        items: [
          "点が右上がりに集まる → 正の相関（$r>0$）",
          "点が右下がりに集まる → 負の相関（$r<0$）",
          "点がばらばらで傾向がない → 相関が弱い（$r$ が0に近い）",
          "$r$ の絶対値が1に近いほど、直線的な関係が強い",
          "相関が強くても、片方がもう片方の「原因」であるとは言えない（相関と因果は別）",
          "外れ値が1つあるだけで、相関係数の値は大きく動くことがある",
        ],
      },
      {
        id: "data-analysis-comparison-heading",
        type: "heading",
        level: 2,
        text: "代表値の比較：平均値・中央値・四分位数の使い分け",
      },
      {
        id: "data-analysis-comparison-text",
        type: "paragraph",
        text:
          "「代表値は何を使えばよいか」は、データの分布によって変わります。極端に大きい・小さい値（外れ値）が無ければ平均値でおおよその実態が分かりますが、外れ値があると平均値はそちらに引っ張られます。そのようなときは、位置で決まる中央値の方が「多くの人の実態」に近くなります。データ全体の散らばりを比べたいときは、外れ値の影響を受けにくい四分位範囲（IQR）を使います。共通テストの会話文では、「平均値と中央値のどちらを見るべきか」「散らばりをどう比べるか」を、この使い分けに沿って選ばせる出方をします。",
      },
      {
        id: "data-analysis-example-4-heading",
        type: "heading",
        level: 2,
        text: "代表例題4：会話文から必要な統計量を選ぶ",
      },
      {
        id: "data-analysis-example-4",
        type: "problem",
        title: "極端な値がある得点データで、代表値を選ぶ",
        prompt:
          "生徒10人の小テストの得点（点）は、小さい順に次の通りである。\n\n2, 55, 58, 60, 62, 63, 65, 67, 70, 72\n\n太郎「平均点と中央値、どちらを見ればいいかな。」花子「点数の分布に極端に低い人がいるなら、中央値の方が実態に近いよ。」太郎「じゃあ、上位と下位の広がりを比べたいときは？」花子「それは四分位範囲を見ればいいね。」\n\n(1) 平均値と中央値をそれぞれ求めよ。\n(2) 会話を踏まえ、「多くの生徒の実態」を表す代表値として適切なのはどちらか、理由とともに答えよ。\n(3) $Q_1,\\ Q_3,\\ \\text{IQR}$ を求めよ。",
        answer:
          "平均値は57.4、中央値は62.5。極端に低い2点に引っ張られる平均値より、位置で決まる中央値の方が実態に近い。$Q_1=58,\\ Q_3=67,\\ \\text{IQR}=9$。",
        points: 16,
        mistakeTags: ["問題文の読み違い", "計算ミス", "条件見落とし"],
      },
      {
        id: "data-analysis-example-4-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "平均値は合計÷個数、中央値は10個なので5番目と6番目の平均です。会話の流れどおり、外れ値（2点）の影響を確認してから、四分位数を下半分・上半分に分けて求めます。",
          },
          {
            label: "詳しい解説",
            body:
              "(1) 合計は $2+55+58+60+62+63+65+67+70+72=574$ なので平均値は $574\\div10=57.4$。中央値は5番目 $62$ と6番目 $63$ の平均で $62.5$。\n\n(2) $2$点という極端に低い値が平均値を押し下げているため、平均値 $57.4$ は「多くの生徒」の実態より低く出ている。中央値 $62.5$ の方が、実際に多くの生徒が取っている点数帯に近い。\n\n(3) 下半分（$2,55,58,60,62$）の中央値は $58$ なので $Q_1=58$。上半分（$63,65,67,70,72$）の中央値は $67$ なので $Q_3=67$。$\\text{IQR}=67-58=9$。",
          },
          {
            label: "別解",
            body:
              "平均値と中央値の差（$62.5-57.4=5.1$）の大きさそのものが、外れ値の影響の目安になります。差が大きいほど、分布のどこかに極端な値がある可能性が高いと、計算前に予想することもできます。",
          },
          {
            label: "最速解法",
            body:
              "極端に離れた値（この場合は $2$点）を見つけたら、平均値より中央値を優先して読む、という判断を先に済ませてから計算に入ります。",
          },
          {
            label: "よくあるミス",
            body:
              "平均値と中央値のどちらが「実態に近いか」を、計算結果を見ずに感覚だけで判断してしまう。$Q_1,\\ Q_3$ を求めるときに、外れ値の $2$ を下半分から除外して数えてしまう。",
          },
          {
            label: "類題",
            body:
              "この問題から学ぶことは、平均値と中央値の差が大きいこと自体が「外れ値がある」というサインになるということです。会話文形式の問題では、登場人物の発言がそのままヒントになります。",
          },
        ],
      },
      {
        id: "data-analysis-practice-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習：散布図・相関と、追加後の代表値",
      },
      {
        id: "data-analysis-practice-1",
        type: "problem",
        title: "本番形式演習1：散布図と相関係数の読み取り",
        prompt:
          "生徒20人の数学の得点 $x$ と理科の得点 $y$ について散布図を描いたところ、右上がりの傾向が見られ、相関係数は $r=0.72$ であった。この結果から言えることとして、正しいものを選べ。",
        choices: [
          "数学の得点が高い生徒は、理科の得点も高い傾向がある（正の相関がある）",
          "数学の得点が理科の得点の原因になっている",
          "$r=0.72$ は負の相関を示している",
          "相関係数が1に近いほど、2つの量の関係は弱い",
        ],
        answer: "数学の得点が高い生徒は、理科の得点も高い傾向がある（正の相関がある）",
        points: 10,
        mistakeTags: ["問題文の読み違い", "公式選択ミス"],
      },
      {
        id: "data-analysis-practice-1-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body: "$r>0$ なので正の相関があると言えます。相関があることと、原因・結果の関係（因果関係）があることは別だと意識します。",
          },
          {
            label: "詳しい解説",
            body:
              "$r=0.72$ は正の値なので、右上がりの正の相関があることが分かります。ただし、これは「一方が高いともう一方も高い傾向がある」という関係を示すだけで、「数学ができるから理科もできる」という因果関係までは主張できません。",
          },
          {
            label: "よくあるミス",
            body: "相関があることを、そのまま因果関係（原因と結果）があることだと言い切ってしまう。$r$ の符号と相関の向き（正・負）を逆に覚える。",
          },
        ],
      },
      {
        id: "data-analysis-practice-2",
        type: "problem",
        title: "本番形式演習2：転入生が加わった後の代表値",
        prompt:
          "あるクラス9人の小テストの得点（点）は、小さい順に次の通りである。\n\n40, 45, 50, 52, 55, 58, 60, 65, 70\n\nここに転入生が加わり、10人目の得点として90点が追加された。\n\n(1) 追加前の中央値を求めよ。\n(2) 追加後の中央値を求めよ。\n(3) 追加によって、中央値と平均値はそれぞれどう変化するか説明せよ。",
        choices: [
          "追加前の中央値55、追加後56.5。平均値は55から58.5へ、中央値より大きく上がる",
          "追加前の中央値52、追加後58。平均値は変わらない",
          "追加前の中央値55、追加後90。中央値の方が大きく変化する",
          "追加前後で中央値・平均値ともに変化しない",
        ],
        answer: "追加前の中央値55、追加後56.5。平均値は55から58.5へ、中央値より大きく上がる",
        points: 12,
        mistakeTags: ["計算ミス", "条件見落とし"],
      },
      {
        id: "data-analysis-practice-2-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body: "追加前は9個、追加後は10個なので、中央値の位置（何番目か）が変わることに注意します。平均値は合計と個数を両方更新します。",
          },
          {
            label: "詳しい解説",
            body:
              "追加前（9個）の中央値は5番目の $55$。追加後（10個、$40,45,50,52,55,58,60,65,70,90$）の中央値は5番目 $55$ と6番目 $58$ の平均で $56.5$。\n\n追加前の合計は $495$、平均値 $495\\div9=55$。追加後の合計は $585$、平均値 $585\\div10=58.5$。中央値は $55\\to56.5$ と小さく動くのに対し、平均値は $55\\to58.5$ と大きく動く。90点という高い値1つが、平均値をより強く引き上げている。",
          },
          {
            label: "よくあるミス",
            body: "追加後も9個のときと同じ位置（5番目）を中央値だと思い込む。平均値の計算で、個数を9のまま更新し忘れる。",
          },
        ],
      },
      {
        id: "data-analysis-mistake-recovery",
        type: "mistakeRecovery",
        title: "ミス別補講：どこへ戻るか",
        intro:
          "模試第2問後半での失点を、四分位数、外れ値、平均値・中央値、箱ひげ図のどこで起きたかに分解します。",
        items: [
          { symptom: "Q1, Q3 がずれた", action: "四分位数の流儀と代表例題1へ戻る", href: "#data-analysis-quartile-method" },
          { symptom: "IQRを最大値-最小値にした", action: "用語・公式一覧で IQR=Q3-Q1 を確認する", href: "#data-analysis-terms" },
          { symptom: "境界値ちょうどを外れ値から外した", action: "代表例題3で「以上」の扱いを確認する", href: "#data-analysis-example-3" },
          { symptom: "外れ値を除いた平均値で個数を変え忘れた", action: "代表例題2で合計と個数を作り直す", href: "#data-analysis-example-2" },
          { symptom: "箱ひげ図の線を平均値と読んだ", action: "箱ひげ図の読み取りへ戻る", href: "#data-analysis-boxplot-heading" },
          { symptom: "相関と因果を混同した", action: "散布図と相関係数の基本へ戻る", href: "#data-analysis-scatter-heading" },
          { symptom: "平均値と中央値のどちらを見るべきか迷った", action: "代表例題4で使い分けを確認する", href: "#data-analysis-example-4" },
          { symptom: "データ追加後の中央値の位置を数え直さなかった", action: "本番形式演習2で個数の更新を確認する", href: "#data-analysis-practice-2" },
        ],
      },
      {
        id: "data-analysis-related",
        type: "relatedProblems",
        title: "復習先と確認問題",
        items: [
          {
            title: "共通テスト型本番模試 数学I・A 第1回 第2問",
            href: "/common-test/simulator/common-test-math-1a-manual-001",
            note: "11個データ、外れ値40、追加後の [ナ]=0 を復習する。",
          },
          {
            title: "共通テスト型本番模試 数学I・A 第2回 第2問",
            href: "/common-test/simulator/common-test-math-1a-manual-002",
            note: "12個データ、Q3=24.5、外れ値35・36、平均値・中央値の変化を復習する。",
          },
          {
            title: "通常コース データの分析",
            href: "/courses/math-1a/data-analysis",
            note: "代表値、四分位数、箱ひげ図の基礎へ戻る。",
          },
          {
            title: "データの分析 演習",
            href: "/units/data-analysis",
            note: "四分位数・箱ひげ図・外れ値の追加演習。",
          },
        ],
      },
    ],
  },
  {
    id: "lecture-numbers-expressions-core-001",
    slug: "numbers-expressions-core-skills",
    title: "共通テスト 数と式 徹底講座",
    description:
      "展開・因数分解、有理化、対称式、整数部分・小数部分、絶対値を、共通テスト第1問前半の誘導に合わせて選び切るための重点講座です。",
    subject: "数学IA",
    unit: "数と式",
    difficulty: "標準",
    recommendedMinutes: 50,
    tags: ["数学IA", "共通テスト", "数と式", "有理化", "対称式", "整数部分・小数部分", "重点講座"],
    publishedAt: "2026-07-04",
    blocks: [
      {
        id: "na-opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "数と式は、公式の暗記量よりも「今の式をどの形に変形すべきか」の判断で差がつきます。有理化、対称式、整数部分・小数部分という共通テスト第1問前半の定番の流れを、1本の判断フローとしてつなげます。",
      },
      {
        id: "na-first-look-heading",
        type: "heading",
        level: 2,
        text: "1. 数と式で最初に見るもの",
      },
      {
        id: "na-first-look-text",
        type: "paragraph",
        text:
          "最初に見るのは、式の形が「展開すれば済む」のか「因数分解が必要」なのか「分母に根号がある」のか「2つの数の和・積が使える対称式」なのかです。共通テストでは、1つの小問の結果を次の小問がそのまま使う誘導が多いため、今どの形に立っているかを見失わないことが重要です。",
      },
      {
        id: "na-map-heading",
        type: "heading",
        level: 2,
        text: "満点までの地図",
      },
      {
        id: "na-map-callout",
        type: "callout",
        tone: "info",
        title: "数と式で満点を取る地図",
        text:
          "出るパターンは5系統です。①展開・因数分解 ②平方根の有理化 ③対称式（$a+b,\\ ab$ から $a^2+b^2,\\ a^3+b^3$ へ） ④整数部分・小数部分 ⑤絶対値を含む式の場合分け。共通テストでは、①〜③がそのまま④につながり、⑤は必要条件・十分条件の判定と組み合わさることがあります。\n\n最初に見るのは「分母に根号があるか」「2つの数の和・積が使えそうか」「絶対値記号があるか」の3点です。落としやすいのは、有理化の符号ミス、対称式の変形公式の取り違え、整数部分を1つずらすミスです。",
      },
      {
        id: "na-flow-heading",
        type: "heading",
        level: 2,
        text: "解法判別フロー：何を見たら何をするか",
      },
      {
        id: "na-flow",
        type: "solutionFlow",
        title: "数と式の道具選び",
        intro:
          "共通テストの第1問前半は、有理化→対称式→整数部分・小数部分と1本の流れで誘導されることが多いです。この対応を先に覚えておくと、誘導に迷わなくなります。",
        steps: [
          {
            condition: "分母に根号が入った分数がある",
            tool: "有理化（分母の共役を掛ける）",
            reason: "分母を整数にすると、その後の和・積の計算が一気に楽になる。",
          },
          {
            condition: "2つの数の和 $a+b$ と積 $ab$ が使えそう（$a^2+b^2,\\ a^3+b^3$ を求めたい）",
            tool: "対称式の変形公式",
            reason: "$a^2+b^2=(a+b)^2-2ab$、$a^3+b^3=(a+b)^3-3ab(a+b)$ で、$a,b$ 単体を求めずに済む。",
          },
          {
            condition: "式が複雑、または因数分解できそうな形がある",
            tool: "因数分解（公式または平方の差への変形）",
            reason: "見た目では分解できない式も、$A^2-B^2$ の形に持ち込めることがある。",
          },
          {
            condition: "無理数の大きさを評価したい（整数部分・小数部分がほしい）",
            tool: "整数で挟み撃ちする",
            reason: "根号の値の範囲から $n<x<n+1$ を作り、整数部分 $n$、小数部分 $x-n$ を決める。",
          },
          {
            condition: "絶対値記号がある",
            tool: "中身の符号で場合分け",
            reason: "境目の値で区間を分け、各区間で絶対値を外してから計算する。",
          },
          {
            condition: "「〜であるための条件」という言い方が出た",
            tool: "必要条件・十分条件の判定へ切り替える",
            reason: "求めた範囲がもう一方の範囲を含むかどうかを確認する（集合と命題講義と接続）。",
          },
        ],
      },
      {
        id: "na-formula-list-heading",
        type: "heading",
        level: 2,
        text: "公式一覧：暗記ではなく形とセットで持つ",
      },
      {
        id: "na-formula-list",
        type: "checklist",
        title: "数と式の公式セット",
        items: [
          "展開: $(a+b)^2=a^2+2ab+b^2$、$(a-b)^2=a^2-2ab+b^2$、$(a+b)(a-b)=a^2-b^2$",
          "展開（3乗）: $(a+b)^3=a^3+3a^2b+3ab^2+b^3$、$(a-b)^3=a^3-3a^2b+3ab^2-b^3$",
          "因数分解（3乗の和・差）: $a^3+b^3=(a+b)(a^2-ab+b^2)$、$a^3-b^3=(a-b)(a^2+ab+b^2)$",
          "有理化: 分母が $c-\\sqrt{d}$ の形なら、共役 $c+\\sqrt{d}$ を分母・分子に掛ける",
          "対称式: $a+b,\\ ab$ が分かれば $a^2+b^2=(a+b)^2-2ab$、$a^3+b^3=(a+b)^3-3ab(a+b)$",
          "整数部分・小数部分: 実数 $x$ について、整数部分は $n\\leqq x<n+1$ を満たす整数 $n$。小数部分は $x-n$（$0\\leqq$ 小数部分 $<1$）",
          "絶対値: $|x-a|$ は数直線上での $x$ と $a$ の距離。$|A|\\leqq k\\ (k\\geqq0)$ は $-k\\leqq A\\leqq k$",
        ],
      },
      {
        id: "na-expand-factor-heading",
        type: "heading",
        level: 3,
        text: "展開・因数分解",
      },
      {
        id: "na-expand-factor-text",
        type: "paragraph",
        text:
          "展開は公式に当てはめるだけですが、因数分解は「どの公式の形に見えるか」を探す作業です。共通テストでは、そのままでは因数分解できない式でも、$A^2-B^2$ の形へ変形すれば分解できることがあります。平方の差に持ち込めないか、という視点を持つと選択肢が増えます。",
      },
      {
        id: "na-radical-heading",
        type: "heading",
        level: 3,
        text: "平方根と有理化",
      },
      {
        id: "na-radical-text",
        type: "paragraph",
        text:
          "分母に根号が残っていると、その後の計算がすべて重くなります。分母が $c-\\sqrt{d}$ の形なら、共役 $c+\\sqrt{d}$ を分母・分子に掛けて $(c-\\sqrt d)(c+\\sqrt d)=c^2-d$ で分母を整数にします。共役の積が単純な整数になることを確認してから計算を進めると、符号ミスに早く気づけます。",
      },
      {
        id: "na-symmetric-heading",
        type: "heading",
        level: 3,
        text: "対称式",
      },
      {
        id: "na-symmetric-text",
        type: "paragraph",
        text:
          "$a,b$ を入れ替えても変わらない式（対称式）は、$a,b$ そのものを求めなくても、$a+b$ と $ab$ だけから作れます。$a^2+b^2$ や $a^3+b^3$ を求めろと言われたら、まず $a+b$ と $ab$ を先に確定させるのが最短ルートです。",
      },
      {
        id: "na-symmetric-math",
        type: "math",
        expression: "a^2+b^2=(a+b)^2-2ab,\\qquad a^3+b^3=(a+b)^3-3ab(a+b)",
        caption: "$a,b$ 単体の値を経由せず、和と積だけで次数を上げていく。",
      },
      {
        id: "na-integer-part-heading",
        type: "heading",
        level: 3,
        text: "整数部分・小数部分",
      },
      {
        id: "na-integer-part-text",
        type: "paragraph",
        text:
          "整数部分・小数部分の問題は、対称式で求めた和や累乗の値を、整数ではさみ撃ちすることで解きます。$0<b<1$ のような小さい正の数の性質を使い、「合計値から小さい数を引くと整数部分が1つ下がる」という感覚を持っておくと計算が速くなります。",
      },
      {
        id: "na-absolute-value-heading",
        type: "heading",
        level: 3,
        text: "絶対値を含む式",
      },
      {
        id: "na-absolute-value-text",
        type: "paragraph",
        text:
          "絶対値は、境目の値（中身が0になる値）で区間を分け、各区間で中身の符号を確認してから外します。複数の絶対値が入った式では、境目の値をすべて数直線に書き込み、区間ごとに順番に処理するのが安全です。",
      },
      {
        id: "na-necessary-sufficient-heading",
        type: "heading",
        level: 3,
        text: "必要条件・十分条件との接続",
      },
      {
        id: "na-necessary-sufficient-callout",
        type: "callout",
        tone: "warning",
        title: "数と式の範囲と条件判定をつなぐ",
        text:
          "不等式や絶対値の条件を解いて範囲を求めたあと、「この範囲はもう一方の条件であるための何条件か」と問われることがあります。求めた範囲が、比べたい範囲を含んでいれば十分条件、含まれていれば必要条件です。両方成り立てば必要十分条件、どちらも成り立たなければ反例を1つ挙げて終わりです。判定の詳しい手順は、集合と命題講義で扱います。",
      },
      {
        id: "na-example-1-heading",
        type: "heading",
        level: 2,
        text: "代表例題1：有理化と対称式",
      },
      {
        id: "na-example-1",
        type: "problem",
        title: "有理化してから対称式で処理する",
        prompt:
          "$a=\\dfrac{1}{3-2\\sqrt2},\\ b=\\dfrac{1}{3+2\\sqrt2}$ とする。\n\n(1) 分母を有理化して $a,b$ を求めよ。\n(2) $a+b,\\ ab$ を求めよ。\n(3) $a^2+b^2,\\ a^3+b^3$ を求めよ。",
        choices: [
          "$a=3+2\\sqrt2,\\ b=3-2\\sqrt2$、$a+b=6,\\ ab=1$、$a^2+b^2=34,\\ a^3+b^3=198$",
          "$a=3+2\\sqrt2,\\ b=3-2\\sqrt2$、$a+b=6,\\ ab=17$、$a^2+b^2=2,\\ a^3+b^3=6$",
          "$a=2+3\\sqrt2,\\ b=2-3\\sqrt2$、$a+b=4,\\ ab=1$、$a^2+b^2=14,\\ a^3+b^3=52$",
          "$a=3+2\\sqrt2,\\ b=3-2\\sqrt2$、$a+b=6,\\ ab=1$、$a^2+b^2=36,\\ a^3+b^3=216$",
        ],
        answer:
          "$a=3+2\\sqrt2,\\ b=3-2\\sqrt2$、$a+b=6,\\ ab=1$、$a^2+b^2=34,\\ a^3+b^3=198$",
        points: 12,
        mistakeTags: ["計算ミス", "公式選択ミス"],
      },
      {
        id: "na-example-1-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "分母の共役を掛けて有理化します。$(3-2\\sqrt2)(3+2\\sqrt2)=9-8=1$ になることを先に確認すると、以後の計算が単純になります。",
          },
          {
            label: "詳しい解説",
            body:
              "(1) $a=\\dfrac{3+2\\sqrt2}{(3-2\\sqrt2)(3+2\\sqrt2)}=\\dfrac{3+2\\sqrt2}{1}=3+2\\sqrt2$。同様に $b=3-2\\sqrt2$。\n\n(2) $a+b=6$、$ab=(3+2\\sqrt2)(3-2\\sqrt2)=9-8=1$。\n\n(3) $a^2+b^2=(a+b)^2-2ab=36-2=34$。$a^3+b^3=(a+b)^3-3ab(a+b)=216-3\\cdot1\\cdot6=216-18=198$。",
          },
          {
            label: "別解",
            body:
              "$a,b$ は $x^2-6x+1=0$ の2解でもあります（和6、積1）。$S_n=a^n+b^n$ とおくと $S_{n+2}=6S_{n+1}-S_n$ が成り立つので、$S_0=2,\\ S_1=6$ から $S_2=34,\\ S_3=6\\cdot34-6=198$ と、漸化式でも同じ値を確認できます。",
          },
          {
            label: "最速解法",
            body:
              "共役の積が $1$ になると分かった瞬間、$a,b$ の分子だけを見れば答えが出ます。$a+b,ab$ が出たら、あとは公式に代入するだけです。",
          },
          {
            label: "よくあるミス",
            body:
              "有理化の符号を逆にする（$a=3-2\\sqrt2$ としてしまう）。$a^2+b^2$ を $(a+b)^2$ のまま答えて $-2ab$ を引き忘れる。$a^3+b^3$ の公式で $3ab(a+b)$ の代わりに $3ab$ だけを引いてしまう。",
          },
          {
            label: "類題",
            body:
              "冊子型模試 第1回 第1問〔1〕（$a=\\frac{1}{2-\\sqrt3},\\ b=\\frac{1}{2+\\sqrt3}$）と同じ流れです。この問題から学ぶことは、有理化の結果をすぐ和・積にまとめ、対称式の公式で次数を上げていく手順です。",
          },
        ],
      },
      {
        id: "na-example-1-takeaway",
        type: "callout",
        tone: "success",
        title: "この問題から何を学ぶか",
        text:
          "有理化は「共役の積が単純になるか」を先に確認するのがコツです。対称式は $a,b$ 単体を経由せず、和と積だけで $a^2+b^2$、$a^3+b^3$ まで一気に作れます。",
      },
      {
        id: "na-example-2-heading",
        type: "heading",
        level: 2,
        text: "代表例題2：整数部分・小数部分",
      },
      {
        id: "na-example-2",
        type: "problem",
        title: "対称式の結果から整数部分・小数部分を求める",
        prompt:
          "代表例題1の $a=3+2\\sqrt2$ について考える。\n\n(1) $a$ の整数部分 $n$ と小数部分 $\\alpha=a-n$ を求めよ。\n(2) $\\alpha^2+4\\alpha$ の値を求めよ。",
        choices: [
          "$n=5,\\ \\alpha=2\\sqrt2-2$、$\\alpha^2+4\\alpha=4$",
          "$n=5,\\ \\alpha=2\\sqrt2-2$、$\\alpha^2+4\\alpha=8$",
          "$n=6,\\ \\alpha=2\\sqrt2-3$、$\\alpha^2+4\\alpha=4$",
          "$n=5,\\ \\alpha=3-2\\sqrt2$、$\\alpha^2+4\\alpha=4$",
        ],
        answer: "$n=5,\\ \\alpha=2\\sqrt2-2$、$\\alpha^2+4\\alpha=4$",
        points: 12,
        mistakeTags: ["計算ミス", "条件見落とし"],
      },
      {
        id: "na-example-2-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "$\\sqrt2$ の値をはさみ撃ちして $a$ の範囲を決め、整数部分 $n$ と小数部分 $\\alpha=a-n$ を求めます。$\\alpha+n=a$ の形に戻すと (2) が楽になります。",
          },
          {
            label: "詳しい解説",
            body:
              "$1<\\sqrt2<2$ より $2<2\\sqrt2<4$ なので $5<3+2\\sqrt2<7$ ではまだ範囲が粗いです。より正確に $1.4<\\sqrt2<1.5$ を使うと $2.8<2\\sqrt2<3$ なので $5.8<a<6$。よって整数部分は $n=5$、小数部分は $\\alpha=a-5=2\\sqrt2-2$。\n\n$\\alpha+2=2\\sqrt2$ なので $(\\alpha+2)^2=8$、すなわち $\\alpha^2+4\\alpha+4=8$。したがって $\\alpha^2+4\\alpha=4$。",
          },
          {
            label: "別解",
            body:
              "$\\alpha^2+4\\alpha$ を直接展開してもよいです。$\\alpha=2\\sqrt2-2$ なので $\\alpha^2=(2\\sqrt2-2)^2=8-8\\sqrt2+4=12-8\\sqrt2$。$4\\alpha=8\\sqrt2-8$。足すと $12-8\\sqrt2+8\\sqrt2-8=4$。$(\\alpha+2)^2$ に気づけなくても、展開だけで同じ答えにたどり着けます。",
          },
          {
            label: "最速解法",
            body:
              "$\\alpha=a-n$ の形のまま、$\\alpha+n$ が根号だけになるように定数を移項してから2乗するのが最短です。$\\alpha+2=2\\sqrt2$ に気づけば、2乗するだけで終わります。",
          },
          {
            label: "よくあるミス",
            body:
              "$\\sqrt2\\approx1.4$ の精度が粗く、整数部分を1つ間違える。小数部分を $a-n$ ではなく $n-a$ としてしまい符号を反転させる。$\\alpha^2+4\\alpha$ を求める際、$\\alpha$ の値を代入し直さずに公式を丸暗記しようとして止まる。",
          },
          {
            label: "類題",
            body:
              "冊子型模試 第1回 第1問〔1〕(3)(4)（$a^7$ の整数部分・小数部分）と同じ考え方です。この問題から学ぶことは、整数部分・小数部分は定義（$n\\leqq x<n+1$）に戻って範囲を作ることです。",
          },
        ],
      },
      {
        id: "na-example-2-takeaway",
        type: "callout",
        tone: "success",
        title: "この問題から何を学ぶか",
        text:
          "整数部分・小数部分は、根号の評価を少し精密にするだけで確定します。小数部分を求めたあとの式は、定数を移項して2乗すると根号が消えることが多いです。",
      },
      {
        id: "na-example-3-heading",
        type: "heading",
        level: 2,
        text: "代表例題3：絶対値の場合分けと条件判定",
      },
      {
        id: "na-example-3",
        type: "problem",
        title: "絶対値を場合分けし、条件判定につなげる",
        prompt:
          "$f(x)=|x-1|+|x+2|$ とする。\n\n(1) $x<-2$、$-2\\leqq x<1$、$x\\geqq1$ の3つの場合に分けて $f(x)$ を表せ。また $f(x)$ の最小値を求めよ。\n(2) 不等式 $f(x)\\leqq5$ を解け。\n(3) (2)で求めた $x$ の範囲は、「$-2\\leqq x\\leqq1$」であるための何条件か。",
        choices: [
          "最小値3、$-3\\leqq x\\leqq2$、必要条件だが十分条件ではない",
          "最小値3、$-3\\leqq x\\leqq2$、十分条件だが必要条件ではない",
          "最小値3、$-2\\leqq x\\leqq1$、必要十分条件",
          "最小値0、$-3\\leqq x\\leqq2$、必要条件だが十分条件ではない",
        ],
        answer: "最小値3、$-3\\leqq x\\leqq2$、必要条件だが十分条件ではない",
        points: 14,
        mistakeTags: ["場合分け不足", "条件見落とし", "問題文の読み違い"],
      },
      {
        id: "na-example-3-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "絶対値の境目 $x=1,\\ x=-2$ で区間を3つに分け、各区間で符号を外して1次式にします。(2)は区間ごとに不等式を解いて合わせます。(3)は(2)の範囲がもう一方の範囲を含むかどうかで判定します。",
          },
          {
            label: "詳しい解説",
            body:
              "(1) $x<-2$: $f(x)=-(x-1)-(x+2)=-2x-1$。$-2\\leqq x<1$: $f(x)=-(x-1)+(x+2)=3$。$x\\geqq1$: $f(x)=(x-1)+(x+2)=2x+1$。中央の区間で $f(x)=3$ と一定になり、両端では $x$ が動くほど値が増えるので、最小値は $3$。\n\n(2) $x<-2$ では $-2x-1\\leqq5$ より $x\\geqq-3$、区間と合わせて $-3\\leqq x<-2$。$-2\\leqq x<1$ では常に $3\\leqq5$ なのでこの区間全体が解。$x\\geqq1$ では $2x+1\\leqq5$ より $x\\leqq2$、区間と合わせて $1\\leqq x\\leqq2$。合わせて $-3\\leqq x\\leqq2$。\n\n(3) $-2\\leqq x\\leqq1$ ならば必ず $-3\\leqq x\\leqq2$ なので、「$-3\\leqq x\\leqq2$」は「$-2\\leqq x\\leqq1$」であるための必要条件。逆に $x=-3$ は $-3\\leqq x\\leqq2$ を満たすが $-2\\leqq x\\leqq1$ は満たさないので、十分条件ではない。",
          },
          {
            label: "別解",
            body:
              "$f(x)=|x-1|+|x+2|$ は「$x$ から $1$ までの距離」と「$x$ から $-2$ までの距離」の和と読めます。$1$ と $-2$ の間（距離3）を移動する $x$ では和が常に $3$、外側に出ると増える、というグラフの形から、場合分けの計算をせずに最小値3を直接読み取ることもできます。",
          },
          {
            label: "最速解法",
            body:
              "絶対値が2つ以上あるときは、境目をすべて数直線に書き、区間ごとに符号を確認してから式を立てます。中央区間で定数になるのは、2点間の距離の和の典型パターンです。",
          },
          {
            label: "よくあるミス",
            body:
              "区間の端（$x=-2,\\ x=1$）をどちらの区間に含めるか曖昧にして重複や漏れを作る。(3)で「範囲が広い方が必要条件、狭い方が十分条件」という向きを逆にする。反例を挙げずに「たぶん必要十分条件」と決めつける。",
          },
          {
            label: "類題",
            body:
              "この問題から学ぶことは、絶対値の場合分けで求めた範囲を、そのまま必要条件・十分条件の判定に使えるということです。判定の手順そのものは、集合と命題講義でさらに練習します。",
          },
        ],
      },
      {
        id: "na-example-3-takeaway",
        type: "callout",
        tone: "success",
        title: "この問題から何を学ぶか",
        text:
          "絶対値は境目で場合分けすれば必ず1次式になります。求めた範囲同士の包含関係を見れば、必要条件・十分条件の判定はほぼ機械的に決まります。",
      },
      {
        id: "na-practice-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習：誘導なしで初手を選ぶ",
      },
      {
        id: "na-practice-callout",
        type: "callout",
        tone: "warning",
        title: "ここからは自分で変形の形を選ぶ",
        text:
          "代表例題は誘導つきでしたが、ここからは誘導が薄い問題です。「どの形に変形すべきか」を自分で判断してから計算してください。",
      },
      {
        id: "na-practice-1",
        type: "problem",
        title: "本番形式演習1：見た目で判断できない因数分解",
        prompt:
          "$x^4+4$ を因数分解せよ。（$x^2$ の項が無いので、そのままでは公式に当てはまらないことに注意する。）",
        choices: [
          "$(x^2-2x+2)(x^2+2x+2)$",
          "$(x^2+2)(x^2-2)$",
          "$(x^2+2x+2)(x^2-2x-2)$",
          "因数分解できない",
        ],
        answer: "$(x^2-2x+2)(x^2+2x+2)$",
        points: 10,
        mistakeTags: ["公式選択ミス", "計算ミス"],
      },
      {
        id: "na-practice-1-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "$x^4+4$ に $4x^2$ を足して引き、$(x^2+2)^2-(2x)^2$ という平方の差の形を作ります。",
          },
          {
            label: "詳しい解説",
            body:
              "$x^4+4=x^4+4x^2+4-4x^2=(x^2+2)^2-(2x)^2=(x^2+2-2x)(x^2+2+2x)=(x^2-2x+2)(x^2+2x+2)$。",
          },
          {
            label: "最速解法",
            body:
              "$x^4$ に定数を足すだけの式（$x^2$ の項がない）を見たら、平方の差 $A^2-B^2$ を作れないか疑います。$4x^2$ を足して引くのがこの型の定番です。",
          },
          {
            label: "よくあるミス",
            body:
              "$x^2$ の項がないので「因数分解できない」と諦めてしまう。$(x^2+2)(x^2-2)$ のように、$4x^2$ を足し引きせず単純に分解しようとして展開が合わない。",
          },
        ],
      },
      {
        id: "na-practice-2",
        type: "problem",
        title: "本番形式演習2：逆数を含む対称式",
        prompt:
          "$x+\\dfrac1x=3$ のとき、$x^2+\\dfrac1{x^2}$ と $x^3+\\dfrac1{x^3}$ の値を求めよ。",
        choices: [
          "$x^2+\\frac1{x^2}=7,\\ x^3+\\frac1{x^3}=18$",
          "$x^2+\\frac1{x^2}=9,\\ x^3+\\frac1{x^3}=27$",
          "$x^2+\\frac1{x^2}=7,\\ x^3+\\frac1{x^3}=27$",
          "$x^2+\\frac1{x^2}=5,\\ x^3+\\frac1{x^3}=18$",
        ],
        answer: "$x^2+\\frac1{x^2}=7,\\ x^3+\\frac1{x^3}=18$",
        points: 10,
        mistakeTags: ["公式選択ミス", "計算ミス"],
      },
      {
        id: "na-practice-2-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "$x$ と $\\frac1x$ を対称式の $a,b$ とみなします。$ab=x\\cdot\\frac1x=1$ が常に成り立つので、$a+b=3,\\ ab=1$ から同じ公式が使えます。",
          },
          {
            label: "詳しい解説",
            body:
              "$\\left(x+\\dfrac1x\\right)^2=x^2+2+\\dfrac1{x^2}=9$ なので $x^2+\\dfrac1{x^2}=7$。\n\n$\\left(x+\\dfrac1x\\right)^3=x^3+3x+\\dfrac3x+\\dfrac1{x^3}=x^3+\\dfrac1{x^3}+3\\left(x+\\dfrac1x\\right)=27$ なので $x^3+\\dfrac1{x^3}=27-9=18$。",
          },
          {
            label: "最速解法",
            body:
              "$x+\\frac1x$ 型は、$ab=1$ が自動的に決まるので、代表例題1の公式にそのまま代入するだけです。2乗して2を引く、3乗して $3(a+b)$ を引く、の2手で終わります。",
          },
          {
            label: "よくあるミス",
            body:
              "$\\left(x+\\frac1x\\right)^2$ の展開で中央の $2$ を落とす。3乗の展開で $3x+\\frac3x$ をまとめて $3\\left(x+\\frac1x\\right)$ と見抜けず、計算が止まる。",
          },
        ],
      },
      {
        id: "na-practice-3",
        type: "problem",
        title: "本番形式演習3：整数部分の逆数",
        prompt:
          "$x=2+\\sqrt5$ とし、$x$ の整数部分を $n$、小数部分を $\\alpha$ とする。\n\n(1) $n,\\ \\alpha$ を求めよ。\n(2) $\\dfrac1{\\alpha}$ の値を求めよ。",
        choices: [
          "$n=4,\\ \\alpha=\\sqrt5-2$、$\\dfrac1\\alpha=\\sqrt5+2$",
          "$n=4,\\ \\alpha=\\sqrt5-2$、$\\dfrac1\\alpha=\\sqrt5-2$",
          "$n=2,\\ \\alpha=\\sqrt5$、$\\dfrac1\\alpha=\\dfrac{\\sqrt5}5$",
          "$n=5,\\ \\alpha=\\sqrt5-3$、$\\dfrac1\\alpha=\\sqrt5+3$",
        ],
        answer: "$n=4,\\ \\alpha=\\sqrt5-2$、$\\dfrac1\\alpha=\\sqrt5+2$",
        points: 10,
        mistakeTags: ["計算ミス", "公式選択ミス"],
      },
      {
        id: "na-practice-3-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "$2<\\sqrt5<3$ から $x=2+\\sqrt5$ の範囲をはさみ、整数部分・小数部分を決めます。$\\dfrac1\\alpha$ は分母に根号が残るので、もう一度有理化します。",
          },
          {
            label: "詳しい解説",
            body:
              "$2<\\sqrt5<3$ より $4<x<5$。整数部分は $n=4$、小数部分は $\\alpha=x-4=\\sqrt5-2$。\n\n$\\dfrac1\\alpha=\\dfrac{1}{\\sqrt5-2}=\\dfrac{\\sqrt5+2}{(\\sqrt5-2)(\\sqrt5+2)}=\\dfrac{\\sqrt5+2}{5-4}=\\sqrt5+2$。",
          },
          {
            label: "最速解法",
            body:
              "整数部分・小数部分の問題の最後に「小数部分の逆数」を聞かれたら、有理化の作業がもう一度必要だと先に見抜いておきます。$\\dfrac1\\alpha=\\sqrt5+2=x$ となり、$x$ 自身に戻ることもあります。",
          },
          {
            label: "よくあるミス",
            body:
              "$\\dfrac1\\alpha$ を約分だけで済ませようとして、有理化を忘れる。整数部分を求めるときに $\\sqrt5\\approx2.2$ の評価が粗く、範囲を間違える。",
          },
        ],
      },
      {
        id: "na-cautions-heading",
        type: "heading",
        level: 2,
        text: "共通テスト型の注意点",
      },
      {
        id: "na-cautions",
        type: "checklist",
        title: "数と式で落としやすい注意点",
        items: [
          "有理化する前に、共役を掛けた分母が本当に整数になるか確認する",
          "対称式は $a,b$ を単体で求めず、和と積のまま次数を上げる",
          "整数部分・小数部分は定義（$n\\leqq x<n+1$）に戻って範囲を作る",
          "小数部分を求めたら、必ず $0$ 以上 $1$ 未満になっているか確認する",
          "絶対値の場合分けは、境目の値をすべて数直線に書き出してから始める",
          "場合分けの端の値をどちらの区間に含めるか、一貫させる",
          "「〜であるための条件」は、範囲の包含関係で判定し、反例も1つ用意する",
          "マーク式では、根号の中の数や符号を空欄ごとに慎重に確認する",
        ],
      },
      {
        id: "na-advanced-connection",
        type: "callout",
        tone: "success",
        title: "発展への接続",
        text:
          "対称式の考え方は、数学IIの高次方程式の解と係数の関係、数学Bの数列（漸化式）にそのまま再登場します。整数部分・小数部分の評価は、数学IIIの極限や数値評価にもつながる基礎です。絶対値の場合分けは、関数のグラフをかく場面全般で使う技術です。",
      },
      {
        id: "na-mistake-recovery",
        type: "mistakeRecovery",
        title: "冊子型模試 第1回 第1問前半から戻る復習先",
        intro:
          "第1回の第1問〔1〕（有理化・対称式・整数部分・小数部分）で失点した場合は、症状ごとに戻る場所を変えます。",
        items: [
          { symptom: "有理化の符号を間違えた", action: "平方根と有理化の章へ戻る", href: "#na-radical-heading" },
          { symptom: "対称式の公式を取り違えた", action: "代表例題1で公式の使い方を確認する", href: "#na-example-1" },
          { symptom: "整数部分・小数部分がずれた", action: "代表例題2で範囲の作り方を確認する", href: "#na-example-2" },
          { symptom: "絶対値の場合分けで区間を間違えた", action: "代表例題3で境目の扱いを確認する", href: "#na-example-3" },
          { symptom: "「何条件か」の判定を逆にした", action: "必要条件・十分条件との接続へ戻る", href: "#na-necessary-sufficient-heading" },
        ],
      },
      {
        id: "na-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "共通テスト型本番模試 数学I・A 第1回 第1問〔1〕",
            href: "/common-test/simulator/common-test-math-1a-manual-001",
            note: "有理化・対称式・整数部分・小数部分の流れを本番形式で確認する。",
          },
          {
            title: "大問型演習：数と式（3本）",
            href: "/common-test/practice",
            note: "誘導つきの大問1問分で、有理化・因数分解・整数部分をまとめて演習する。",
          },
          {
            title: "集合と命題 判定講座",
            href: "/common-test/lectures/sets-logic-necessary-sufficient",
            note: "必要条件・十分条件の判定手順を詳しく練習する。",
          },
          {
            title: "通常コース 数と式",
            href: "/courses/math-1a/numbers-and-expressions",
            note: "展開・因数分解・実数の基礎へ戻る。",
          },
          {
            title: "数と式 演習",
            href: "/units/numbers-and-expressions",
            note: "有理化・対称式の追加演習。",
          },
        ],
      },
    ],
  },
  {
    id: "lecture-sets-logic-necessary-sufficient-001",
    slug: "sets-logic-necessary-sufficient",
    title: "共通テスト 集合と命題 判定講座",
    description:
      "命題・条件・集合の対応、必要条件・十分条件、逆・裏・対偶、ド・モルガンの法則を、共通テスト第1問前半の判定問題に合わせて整理する重点講座です。",
    subject: "数学IA",
    unit: "集合と命題",
    difficulty: "標準",
    recommendedMinutes: 50,
    tags: ["数学IA", "共通テスト", "集合と命題", "必要条件", "十分条件", "対偶", "重点講座"],
    publishedAt: "2026-07-04",
    blocks: [
      {
        id: "sl-opening",
        type: "callout",
        tone: "info",
        title: "この講義のゴール",
        text:
          "集合と命題は、用語を覚えるだけでは得点になりません。「PならばQ」の向きを毎回確認し、必要条件・十分条件・対偶・反例を機械的に判定できるようにします。",
      },
      {
        id: "sl-first-look-heading",
        type: "heading",
        level: 2,
        text: "1. 集合と命題で最初に見るもの",
      },
      {
        id: "sl-first-look-text",
        type: "paragraph",
        text:
          "最初に見るのは、「PならばQ」の矢印がどちら向きかです。共通テストでは「PはQであるための◯条件」と「QはPであるための◯条件」を両方問われることが多く、向きを取り違えると連鎖して失点します。",
      },
      {
        id: "sl-map-heading",
        type: "heading",
        level: 2,
        text: "満点までの地図",
      },
      {
        id: "sl-map-callout",
        type: "callout",
        tone: "info",
        title: "集合と命題で満点を取る地図",
        text:
          "出るパターンは4系統です。①集合の要素・包含関係 ②必要条件・十分条件の判定 ③逆・裏・対偶と反例 ④ド・モルガンの法則。共通テストでは、会話文が集合の条件を1つずつ言い換えながら、最後に必要条件・十分条件の判定へ着地する形が多いです。\n\n最初に見るのは「PならばQ」の矢印の向きと、比べる相手がどちらかです。落としやすいのは、必要条件と十分条件の向きの逆転、逆と対偶の混同、反例を1つ挙げただけで満足してしまうことです。",
      },
      {
        id: "sl-flow-heading",
        type: "heading",
        level: 2,
        text: "解法判別フロー：何を見たら何をするか",
      },
      {
        id: "sl-flow",
        type: "solutionFlow",
        title: "集合と命題の判定手順",
        intro:
          "「PはQであるための何条件か」と問われたら、この順で機械的に確認します。感覚で答えず、必ず両方向を確認します。",
        steps: [
          {
            condition: "命題「PならばQ」の真偽を判定したい",
            tool: "Pを満たす具体例でQが常に成り立つか確認する",
            reason: "1つでも反例（Pは満たすがQは満たさない例）があれば、その命題は偽と即断できる。",
          },
          {
            condition: "反例が見つからない、または見つけにくい",
            tool: "対偶「QでないならPでない」で確認する",
            reason: "対偶の真偽は原命題と必ず一致するため、対偶の方が示しやすいことがある。",
          },
          {
            condition: "「PはQであるための何条件か」と問われた",
            tool: "PならばQと、QならばPの両方を確認する",
            reason: "PならばQが真なら十分条件、QならばPが真なら必要条件。両方真なら必要十分条件。",
          },
          {
            condition: "「PがQの十分条件」だと分かった",
            tool: "「QはPの必要条件」と即座に言い換える",
            reason: "PならばQが真であることと、QがPの必要条件であることは同じ内容の言い換えにすぎない。",
          },
          {
            condition: "「かつ」「または」を含む条件の否定を作りたい",
            tool: "ド・モルガンの法則",
            reason: "「AかつB」の否定は「Aでない、またはBでない」。「または」の否定は逆に「かつ」になる。",
          },
          {
            condition: "条件が集合として与えられている（範囲・倍数など）",
            tool: "ベン図または数直線で包含関係を確認する",
            reason: "P⊂Qなら「PならばQ」が成り立ち、PはQの十分条件だと視覚的に確認できる。",
          },
          {
            condition: "会話文・誘導文で条件が式に言い換えられている",
            tool: "式・集合・言葉の対応を1つずつ確認する",
            reason: "会話文は、命題を集合や式に翻訳する手順を1歩ずつ示していることが多い。",
          },
        ],
      },
      {
        id: "sl-terms-heading",
        type: "heading",
        level: 2,
        text: "用語一覧",
      },
      {
        id: "sl-terms",
        type: "checklist",
        title: "今回使う用語",
        items: [
          "命題：真偽がただ1つに定まる文や式。",
          "条件：変数を含み、真偽が変数の値によって変わる文や式。変数に具体的な値を入れると命題になる。",
          "集合との対応：条件Pを満たすもの全体の集合を、条件と同じ記号 $P$ で表すことが多い。「PならばQ」は集合として $P\\subset Q$ に対応する。",
          "十分条件：「PならばQ」が真であるとき、PはQであるための十分条件。",
          "必要条件：「PならばQ」が真であるとき、QはPであるための必要条件。",
          "必要十分条件：「PならばQ」と「QならばP」がともに真であるとき、PとQは必要十分条件（同値）。",
          "逆：「PならばQ」に対して「QならばP」。",
          "裏：「PならばQ」に対して「PでないならQでない」。",
          "対偶：「PならばQ」に対して「QでないならPでない」。原命題と真偽が必ず一致する。",
          "ド・モルガンの法則：$\\overline{A\\cap B}=\\overline A\\cup\\overline B$、$\\overline{A\\cup B}=\\overline A\\cap\\overline B$。",
          "反例：命題が偽であることを示す、条件は満たすが結論が成り立たない具体例。1つ見つければ十分。",
        ],
      },
      {
        id: "sl-correspondence-heading",
        type: "heading",
        level: 3,
        text: "命題・条件・集合の対応",
      },
      {
        id: "sl-correspondence-text",
        type: "paragraph",
        text:
          "「$x$ は3の倍数である」は、$x$ の値によって真偽が変わるので条件です。この条件を満たす $x$ の集合を $P$ とすると、「PならばQ」という命題は、集合の言葉では「$P\\subset Q$」（Pに属するものは必ずQにも属する）と同じ内容になります。命題・条件・集合はすべて同じ関係を別の言葉で言っているだけだと意識すると、混乱が減ります。",
      },
      {
        id: "sl-necessary-sufficient-heading",
        type: "heading",
        level: 3,
        text: "必要条件・十分条件・必要十分条件",
      },
      {
        id: "sl-necessary-sufficient-text",
        type: "paragraph",
        text:
          "「PならばQ」が真であるとき、Pの方が条件として厳しく（狭く）、Qの方がゆるい（広い）という関係になります。狭い方の条件Pは、広い方の条件Qが成り立つために「それだけで十分」なので、PはQであるための十分条件です。逆に、広い方の条件Qは、狭い方の条件Pが成り立つために「最低限必要」なので、QはPであるための必要条件です。",
      },
      {
        id: "sl-necessary-sufficient-callout",
        type: "callout",
        tone: "warning",
        title: "向きを逆にしないための合言葉",
        text:
          "「PはQであるための十分条件」「QはPであるための必要条件」は、同じ命題「PならばQ」の2つの言い換えです。片方が分かれば、もう片方は自動的に決まります。狭い条件（十分条件）→広い条件（必要条件）の向きだけを覚えておけば、どちらを先に聞かれても迷いません。",
      },
      {
        id: "sl-necessary-sufficient-venn",
        type: "image",
        src: createVennInclusionSvg(),
        alt: "PがQに含まれるベン図。PはQであるための十分条件、QはPであるための必要条件であることを示す。",
        caption: "$P\\subset Q$ なら、PはQの十分条件、QはPの必要条件。QにはPでない要素も含まれる。",
      },
      {
        id: "sl-inverse-contrapositive-heading",
        type: "heading",
        level: 3,
        text: "逆・裏・対偶",
      },
      {
        id: "sl-inverse-contrapositive-text",
        type: "paragraph",
        text:
          "原命題「PならばQ」に対して、逆は「QならばP」、裏は「PでないならQでない」、対偶は「QでないならPでない」です。対偶は原命題と必ず真偽が一致しますが、逆・裏はそうとは限りません。逆と裏は互いに対偶の関係にあるため、逆と裏の真偽は必ず一致します。",
      },
      {
        id: "sl-inverse-contrapositive-math",
        type: "math",
        expression: "P\\Rightarrow Q\\ (\\text{原命題})\\quad\\overset{\\text{真偽一致}}{\\Longleftrightarrow}\\quad \\lnot Q\\Rightarrow\\lnot P\\ (\\text{対偶})",
        caption: "原命題と対偶は必ず真偽が一致する。逆「$Q\\Rightarrow P$」と裏「$\\lnot P\\Rightarrow\\lnot Q$」も互いに真偽が一致するが、原命題とは別に確認が必要。",
      },
      {
        id: "sl-counterexample-heading",
        type: "heading",
        level: 3,
        text: "反例の作り方",
      },
      {
        id: "sl-counterexample-text",
        type: "paragraph",
        text:
          "命題「PならばQ」が偽であることを示すには、Pを満たすがQを満たさない具体例を1つ挙げれば十分です。全部のパターンを確認する必要はありません。反例を探すときは、境界値（範囲の端）、0、負の数、偶数と奇数の境目など、うっかり条件を崩しやすい値から先に試すと見つけやすくなります。",
      },
      {
        id: "sl-cautions-heading",
        type: "heading",
        level: 2,
        text: "真偽判定でのミスパターン",
      },
      {
        id: "sl-cautions",
        type: "checklist",
        title: "共通テスト型で落としやすい注意点",
        items: [
          "逆と対偶を混同する。対偶は必ず原命題と真偽が一致するが、逆はそうとは限らない",
          "必要条件と十分条件の矢印の向きを逆にする",
          "「PはQであるための条件」と「QはPであるための条件」を取り違える",
          "反例を1つ見つけただけで、逆方向の真偽まで判定した気になる",
          "ド・モルガンで「かつ」と「または」を入れ替え忘れる",
          "会話文中の「少なくとも」「〜でない」を条件式に直すときに、否定を1つ飛ばす",
          "全体集合や範囲が指定されているのに、それを忘れて要素を数える",
        ],
      },
      {
        id: "sl-conversation-heading",
        type: "heading",
        level: 2,
        text: "共通テスト型の会話文・誘導文への対応",
      },
      {
        id: "sl-conversation-text",
        type: "paragraph",
        text:
          "共通テストの集合と命題は、会話文の中で「これは集合で言うとどういうことか」を1歩ずつ言い換えさせる形で出ます。会話の中の「〜でない」「少なくとも」「〜かつ〜」を、その場で条件式や集合の記号に直しながら読み進めるのがコツです。会話の最後で必要条件・十分条件の判定に着地することが多いので、会話の前半で作った式や集合を、後半でそのまま使えるように整理しておきます。",
      },
      {
        id: "sl-example-1-heading",
        type: "heading",
        level: 2,
        text: "代表例題1：必要条件・十分条件の向きを両方確認する",
      },
      {
        id: "sl-example-1",
        type: "problem",
        title: "PはQの何条件か、QはPの何条件か",
        prompt:
          "実数 $x,y$ について、条件 $P$：「$x=1$ かつ $y=1$」、条件 $Q$：「$x+y=2$」とする。\n\n(1) PはQであるための何条件か。\n(2) QはPであるための何条件か。\n(3) (1)(2)の結果から、PとQの関係を一言で説明せよ。",
        choices: [
          "(1) 十分条件だが必要条件ではない (2) 必要条件だが十分条件ではない (3) PはQより狭い条件",
          "(1) 必要条件だが十分条件ではない (2) 十分条件だが必要条件ではない (3) PはQより広い条件",
          "(1) 必要十分条件 (2) 必要十分条件 (3) PとQは同じ条件",
          "(1) 十分条件でも必要条件でもない (2) 十分条件でも必要条件でもない (3) 無関係",
        ],
        answer: "(1) 十分条件だが必要条件ではない (2) 必要条件だが十分条件ではない (3) PはQより狭い条件",
        points: 12,
        mistakeTags: ["公式選択ミス", "問題文の読み違い"],
      },
      {
        id: "sl-example-1-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "「PならばQ」と「QならばP」を別々に確認します。片方が真で終わらせず、必ずもう片方も確認します。",
          },
          {
            label: "詳しい解説",
            body:
              "$P\\Rightarrow Q$：$x=1,y=1$ ならば $x+y=1+1=2$ なので真。よってPはQであるための十分条件。\n\n$Q\\Rightarrow P$：$x+y=2$ を満たすが $x=1,y=1$ ではない例、たとえば $x=0,y=2$ がある（$0+2=2$ だが $x=1,y=1$ ではない）ので偽。よってPはQであるための必要条件ではない。\n\n(2) は(1)の言い換えです。PがQの十分条件（$P\\Rightarrow Q$ が真）ということは、そのままQがPの必要条件であることを意味します。$Q\\Rightarrow P$ が偽なので、QはPの十分条件ではありません。\n\n(3) $P\\subset Q$ の関係にあり、Pの方がQより狭い（厳しい）条件です。",
          },
          {
            label: "別解",
            body:
              "集合として考えると、$P=\\{(1,1)\\}$（1点だけ）、$Q$ は直線 $x+y=2$ 上のすべての点です。明らかに $P\\subset Q$ なので、ベン図の包含関係からも同じ結論（PはQの十分条件、QはPの必要条件）が直接読み取れます。",
          },
          {
            label: "最速解法",
            body:
              "「PはQの何条件か」を聞かれたら、$P\\Rightarrow Q$ が真か偽かだけを先に判定します。真なら「PはQの十分条件」、同時に「QはPの必要条件」も自動的に決まるので、2問目を独立に考え直す必要はありません。",
          },
          {
            label: "よくあるミス",
            body:
              "(2)を(1)と独立に一から確認しようとして時間を使う。$Q\\Rightarrow P$ の反例を探すときに、たまたま $x=1,y=1$ に近い値ばかり試して反例を見つけられない。「十分条件」と「必要条件」の言葉の意味を毎回逆に覚えてしまう。",
          },
          {
            label: "類題",
            body:
              "冊子型模試 第2回 第1問〔1〕の集合の包含条件（$Q_a\\subset P$ となる $a$ の範囲）も、同じ「PならばQ」の判定です。この問題から学ぶことは、必要条件・十分条件は独立した2つの作業ではなく、1つの矢印の向きの言い換えだということです。",
          },
        ],
      },
      {
        id: "sl-example-1-takeaway",
        type: "callout",
        tone: "success",
        title: "この問題から何を学ぶか",
        text:
          "「PはQの何条件か」と「QはPの何条件か」は別々の問題ではありません。$P\\Rightarrow Q$ の真偽が分かれば、両方の答えが同時に決まります。",
      },
      {
        id: "sl-example-2-heading",
        type: "heading",
        level: 2,
        text: "代表例題2：逆・裏・対偶と反例",
      },
      {
        id: "sl-example-2",
        type: "problem",
        title: "対偶を使って原命題の真偽を確認する",
        prompt:
          "自然数 $n$ について、命題「$n$ が4の倍数ならば $n$ は偶数である」を考える。\n\n(1) この命題の逆・裏・対偶をそれぞれ述べ、真偽を判定せよ。\n(2) 逆が偽であることを示す反例を1つ挙げよ。\n(3) 対偶を用いて、原命題が真であることを確認せよ。",
        choices: [
          "逆は偽（反例 $n=2$）、裏は偽、対偶は真。対偶「$n$が奇数なら$n$は4の倍数でない」は奇数が2で割り切れないことから真",
          "逆は真、裏は真、対偶は偽。すべて原命題と同じ真偽になる",
          "逆は偽、裏は真、対偶は偽。逆と裏は無関係なので真偽が異なってよい",
          "逆・裏・対偶はすべて原命題と無関係なので判定できない",
        ],
        answer:
          "逆は偽（反例 $n=2$）、裏は偽、対偶は真。対偶「$n$が奇数なら$n$は4の倍数でない」は奇数が2で割り切れないことから真",
        points: 14,
        mistakeTags: ["公式選択ミス", "条件見落とし"],
      },
      {
        id: "sl-example-2-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "原命題を $P$：「$n$は4の倍数」、$Q$：「$n$は偶数」として、逆・裏・対偶をそれぞれ機械的に作ります。逆と裏は対偶の関係にあるので真偽が一致することを利用します。",
          },
          {
            label: "詳しい解説",
            body:
              "原命題「$P\\Rightarrow Q$」：$n$が4の倍数なら $n=4k$ と書け、$n=2(2k)$ なので偶数。真。\n\n逆「$Q\\Rightarrow P$」：$n$が偶数なら4の倍数、は $n=2$ で反例（偶数だが4の倍数でない）があるので偽。\n\n裏「$\\lnot P\\Rightarrow\\lnot Q$」：$n$が4の倍数でないなら偶数でない、も $n=6$ で反例（4の倍数でないが偶数）があるので偽。逆と裏の真偽が一致していることも確認できる。\n\n対偶「$\\lnot Q\\Rightarrow\\lnot P$」：$n$が偶数でない（奇数）なら4の倍数でない。奇数はそもそも2で割り切れないので4でも割り切れず、真。対偶が真なので、原命題も真だと確認できる。",
          },
          {
            label: "別解",
            body:
              "原命題を直接示すこともできます。$n$が4の倍数のとき $n=4k=2\\cdot(2k)$ と書けるので、$n$は明らかに2の倍数（偶数）です。対偶を経由しなくても直接証明できますが、直接証明がやりにくい命題では対偶が有効な手段になることを、この問題で確認しておきます。",
          },
          {
            label: "最速解法",
            body:
              "「4の倍数ならば偶数」のように、原命題が直感的に明らかな場合は直接確認して構いません。原命題が直接示しにくいときに初めて対偶を使う、という優先順位を持っておくと時間を無駄にしません。",
          },
          {
            label: "よくあるミス",
            body:
              "逆と対偶を混同し、対偶を作るときに否定し忘れる（「QならばP」を対偶だと思い込む）。裏を「PでないならQでない」ではなく「QでないならPでない」（対偶と同じ形）にしてしまう。反例を挙げるときに、$n=4$ のようなPもQも満たす値を選んでしまい、反例になっていない。",
          },
          {
            label: "類題",
            body:
              "「$n^2$が偶数ならば$n$は偶数である」を対偶「$n$が奇数ならば$n^2$は奇数」で示す問題も同じパターンです。この問題から学ぶことは、逆・裏・対偶は原命題の否定と入れ替えのパターンを機械的に作れるということと、対偶は証明の道具として使えるということです。",
          },
        ],
      },
      {
        id: "sl-example-2-takeaway",
        type: "callout",
        tone: "success",
        title: "この問題から何を学ぶか",
        text:
          "対偶は原命題と真偽が必ず一致するので、原命題が示しにくいときの代わりの証明手段になります。逆・裏は対偶の関係にあるため、真偽は互いに一致しますが、原命題とは独立に確認が必要です。",
      },
      {
        id: "sl-example-3-heading",
        type: "heading",
        level: 2,
        text: "代表例題3：会話文とド・モルガンの法則",
      },
      {
        id: "sl-example-3",
        type: "problem",
        title: "会話文から集合の要素数を求める",
        prompt:
          "全体集合を $U=\\{1,2,\\ldots,20\\}$ とし、$A$ を3の倍数の集合、$B$ を5の倍数の集合とする。\n\n太郎「3の倍数でも5の倍数でもない数を数えたい。」\n花子「それは $\\overline{A\\cup B}$ の要素数だね。」\n太郎「ド・モルガンの法則を使うと $\\overline A\\cap\\overline B$ とも表せるね。」\n\n(1) $n(A),\\ n(B),\\ n(A\\cap B)$ を求めよ。\n(2) $n(A\\cup B)$ を求めよ。\n(3) 「3の倍数でも5の倍数でもない数」の個数を求めよ。",
        choices: [
          "$n(A)=6,\\ n(B)=4,\\ n(A\\cap B)=1$、$n(A\\cup B)=9$、個数は11",
          "$n(A)=6,\\ n(B)=4,\\ n(A\\cap B)=2$、$n(A\\cup B)=8$、個数は12",
          "$n(A)=7,\\ n(B)=4,\\ n(A\\cap B)=1$、$n(A\\cup B)=10$、個数は10",
          "$n(A)=6,\\ n(B)=4,\\ n(A\\cap B)=1$、$n(A\\cup B)=10$、個数は10",
        ],
        answer: "$n(A)=6,\\ n(B)=4,\\ n(A\\cap B)=1$、$n(A\\cup B)=9$、個数は11",
        points: 14,
        mistakeTags: ["計算ミス", "問題文の読み違い"],
      },
      {
        id: "sl-example-3-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "3の倍数、5の倍数、15の倍数（両方の倍数）の個数をそれぞれ数え、和集合の要素数の公式 $n(A\\cup B)=n(A)+n(B)-n(A\\cap B)$ を使います。最後は全体からこれを引きます。",
          },
          {
            label: "詳しい解説",
            body:
              "$1$〜$20$ の中の3の倍数は $3,6,9,12,15,18$ の6個なので $n(A)=6$。5の倍数は $5,10,15,20$ の4個なので $n(B)=4$。両方の倍数（15の倍数）は $15$ の1個なので $n(A\\cap B)=1$。\n\n$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)=6+4-1=9$。\n\n全体は20個なので、「3の倍数でも5の倍数でもない数」の個数は $\\overline{A\\cup B}$ の要素数で $20-9=11$。",
          },
          {
            label: "別解",
            body:
              "花子の発言どおり、ド・モルガンの法則で $\\overline{A\\cup B}=\\overline A\\cap\\overline B$ と考えることもできます。$\\overline A$（3の倍数でない数）は $20-6=14$個、$\\overline B$（5の倍数でない数）は $20-4=16$個ですが、これらをそのまま引き算で組み合わせるより、$n(A\\cup B)$ を先に求めて全体から引く方が計算が短くて済みます。",
          },
          {
            label: "最速解法",
            body:
              "「AでもBでもない」は、素直に $n(A\\cup B)$ を先に求めて全体から引くのが最短です。$15$ が3の倍数と5の倍数の重複分であることを見落とさないようにします。",
          },
          {
            label: "よくあるミス",
            body:
              "$n(A\\cap B)$（両方の倍数）を数え忘れ、$n(A\\cup B)=n(A)+n(B)$ としてしまい重複分を二重に数える。全体集合が $1$〜$20$ であることを忘れ、範囲外の数まで数えてしまう。「でも〜でもない」を「または」の否定ではなく「かつ」のまま計算してしまう。",
          },
          {
            label: "類題",
            body:
              "冊子型模試 第2回 第1問〔1〕の集合の要素数・確率の問題と同じ考え方です。この問題から学ぶことは、会話文中の「でも〜でもない」がド・モルガンの法則の言い換えであり、和集合の要素数公式と組み合わせて使うということです。",
          },
        ],
      },
      {
        id: "sl-example-3-takeaway",
        type: "callout",
        tone: "success",
        title: "この問題から何を学ぶか",
        text:
          "「AでもBでもない」はド・モルガンの法則で $\\overline A\\cap\\overline B=\\overline{A\\cup B}$ と言い換えられます。重複分（共通部分）を引き忘れないことが、集合の要素数を数える最大のポイントです。",
      },
      {
        id: "sl-practice-heading",
        type: "heading",
        level: 2,
        text: "本番形式演習：誘導なしで初手を選ぶ",
      },
      {
        id: "sl-practice-callout",
        type: "callout",
        tone: "warning",
        title: "ここからは自分で判定の道具を選ぶ",
        text:
          "代表例題は誘導つきでしたが、ここからは誘導が薄い問題です。「必要条件か十分条件か」「対偶を使うべきか」を自分で判断してください。",
      },
      {
        id: "sl-practice-1",
        type: "problem",
        title: "本番形式演習1：整数条件の必要十分条件判定",
        prompt:
          "整数 $n$ について、条件 $P$：「$n$は6の倍数」、条件 $Q$：「$n$は2の倍数かつ3の倍数」とする。PはQであるための何条件か。",
        choices: ["必要十分条件", "十分条件だが必要条件ではない", "必要条件だが十分条件ではない", "どちらでもない"],
        answer: "必要十分条件",
        points: 10,
        mistakeTags: ["公式選択ミス"],
      },
      {
        id: "sl-practice-1-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "$P\\Rightarrow Q$ と $Q\\Rightarrow P$ を両方確認します。6の倍数であることと、2の倍数かつ3の倍数であることが同値かどうかを考えます。",
          },
          {
            label: "詳しい解説",
            body:
              "6の倍数は必ず2の倍数かつ3の倍数なので $P\\Rightarrow Q$ は真。逆に、2の倍数かつ3の倍数なら（2と3は互いに素なので）6の倍数になるので $Q\\Rightarrow P$ も真。両方向とも真なので、PとQは必要十分条件。",
          },
          {
            label: "よくあるミス",
            body:
              "「2の倍数かつ3の倍数」を見て反射的に「十分条件だけ」と判断し、$Q\\Rightarrow P$ の確認を省略してしまう。",
          },
        ],
      },
      {
        id: "sl-practice-2",
        type: "problem",
        title: "本番形式演習2：不等式の必要条件・十分条件",
        prompt:
          "実数 $x$ について、条件 $P$：「$0<x<2$」、条件 $Q$：「$x<3$」とする。PはQであるための何条件か。",
        choices: ["十分条件だが必要条件ではない", "必要条件だが十分条件ではない", "必要十分条件", "どちらでもない"],
        answer: "十分条件だが必要条件ではない",
        points: 10,
        mistakeTags: ["公式選択ミス", "条件見落とし"],
      },
      {
        id: "sl-practice-2-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "$0<x<2$ の範囲が $x<3$ の範囲に含まれるかどうかを確認します。範囲の広さを比べると向きが分かります。",
          },
          {
            label: "詳しい解説",
            body:
              "$0<x<2$ ならば必ず $x<3$ なので $P\\Rightarrow Q$ は真。よってPはQの十分条件。一方、$x<3$ であっても $0<x<2$ とは限らない（たとえば $x=-1$ や $x=2.5$）ので $Q\\Rightarrow P$ は偽。よってPはQの必要条件ではない。",
          },
          {
            label: "よくあるミス",
            body:
              "範囲が狭い方が「必要条件」だと勘違いする。狭い範囲の方が十分条件であることを、数直線で範囲を書いて確認する習慣をつけると間違えにくい。",
          },
        ],
      },
      {
        id: "sl-practice-3",
        type: "problem",
        title: "本番形式演習3：対偶による証明の選択",
        prompt:
          "整数 $n$ について、命題「$n^2$が偶数ならば $n$ は偶数である」を証明したい。直接証明と対偶による証明のうち、どちらが適しているか、理由とともに選べ。",
        choices: [
          "対偶「$n$が奇数ならば$n^2$は奇数」の方が、$n=2k+1$とおいて直接計算できるので示しやすい",
          "直接「$n^2$が偶数」から$n$の偶奇を作る方が、対偶より計算が少ない",
          "どちらの方法でも証明できないので、具体例を並べるしかない",
          "この命題は反例があるため、そもそも真ではない",
        ],
        answer: "対偶「$n$が奇数ならば$n^2$は奇数」の方が、$n=2k+1$とおいて直接計算できるので示しやすい",
        points: 10,
        mistakeTags: ["公式選択ミス", "問題文の読み違い"],
      },
      {
        id: "sl-practice-3-tabs",
        type: "explanationTabs",
        tabs: [
          {
            label: "方針",
            body:
              "「$n^2$が偶数」から出発すると $n$ の形を作りにくいですが、対偶「$n$が奇数」から出発すると $n=2k+1$ と具体的に置けます。",
          },
          {
            label: "詳しい解説",
            body:
              "対偶は「$n$が奇数ならば $n^2$ は奇数」。$n$が奇数なら $n=2k+1$（$k$は整数）と書け、$n^2=(2k+1)^2=4k^2+4k+1=2(2k^2+2k)+1$ となり、奇数であることが直接示せる。対偶が真なので、原命題も真。",
          },
          {
            label: "よくあるミス",
            body:
              "原命題を直接示そうとして、「$n^2$が偶数」から $n$ の形を作れず止まってしまう。対偶を作る際に、「$n$が奇数」ではなく「$n$が偶数でない数」という言い方の違いに戸惑って否定を誤る。",
          },
        ],
      },
      {
        id: "sl-advanced-connection",
        type: "callout",
        tone: "success",
        title: "発展への接続",
        text:
          "必要条件・十分条件の考え方は、数学の証明全体で使う土台です。対偶による証明は、背理法の考え方ともつながっています。集合の要素数の公式は、場合の数と確率の包除原理にそのまま再登場します。",
      },
      {
        id: "sl-mistake-recovery",
        type: "mistakeRecovery",
        title: "冊子型模試 第2回 第1問前半から戻る復習先",
        intro:
          "第2回の第1問〔1〕（集合の包含・命題・確率）で失点した場合は、症状ごとに戻る場所を変えます。",
        items: [
          { symptom: "必要条件・十分条件の向きを逆にした", action: "必要条件・十分条件の章へ戻る", href: "#sl-necessary-sufficient-heading" },
          { symptom: "逆と対偶を混同した", action: "逆・裏・対偶の章へ戻る", href: "#sl-inverse-contrapositive-heading" },
          { symptom: "反例を挙げられなかった", action: "反例の作り方へ戻る", href: "#sl-counterexample-heading" },
          { symptom: "集合の要素数で重複分を引き忘れた", action: "代表例題3でド・モルガンの使い方を確認する", href: "#sl-example-3" },
          { symptom: "会話文の条件を読み落とした", action: "会話文・誘導文への対応へ戻る", href: "#sl-conversation-heading" },
        ],
      },
      {
        id: "sl-related",
        type: "relatedProblems",
        title: "類題と次の演習",
        items: [
          {
            title: "共通テスト型本番模試 数学I・A 第2回 第1問〔1〕",
            href: "/common-test/simulator/common-test-math-1a-manual-002",
            note: "集合の包含・命題・確率の流れを本番形式で確認する。",
          },
          {
            title: "大問型演習：集合と命題（3本）",
            href: "/common-test/practice",
            note: "誘導つきの大問1問分で、必要十分条件・対偶・ド・モルガンをまとめて演習する。",
          },
          {
            title: "数と式 徹底講座",
            href: "/common-test/lectures/numbers-expressions-core-skills",
            note: "絶対値の範囲判定と条件判定のつながりを復習する。",
          },
          {
            title: "通常コース 集合と命題",
            href: "/courses/math-1a/sets-and-logic",
            note: "集合の基礎、命題の基礎へ戻る。",
          },
          {
            title: "集合と命題 演習",
            href: "/units/sets-and-logic",
            note: "必要条件・十分条件・対偶の追加演習。",
          },
        ],
      },
    ],
  },
  SHORTCUT_FORMULAS_LECTURE,
];

export const SPECIAL_LECTURES: Lecture[] = enhanceSpecialLectures(BASE_SPECIAL_LECTURES).map((lecture) => ({
  ...lecture,
  isPublished: false,
  noindex: true,
}));

export function getSpecialLectureBySlug(slug: string): Lecture | undefined {
  const canonicalSlug = canonicalLectureSlug(slug);
  return SPECIAL_LECTURES.find((lecture) => lecture.slug === canonicalSlug);
}
