import {
  createTriangleGeometryLayerBlock,
  DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT,
} from "@/lib/lecture-geometry-svg";
import { canonicalLectureSlug } from "@/lib/special-lecture-guidance";
import {
  createPowerOfPointSvg,
  createProbabilityCountingSvg,
  createQuadraticAxisCasesSvg,
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
  SHORTCUT_FORMULAS_LECTURE,
];

export const SPECIAL_LECTURES: Lecture[] = enhanceSpecialLectures(BASE_SPECIAL_LECTURES);

export function getSpecialLectureBySlug(slug: string): Lecture | undefined {
  const canonicalSlug = canonicalLectureSlug(slug);
  return SPECIAL_LECTURES.find((lecture) => lecture.slug === canonicalSlug);
}
