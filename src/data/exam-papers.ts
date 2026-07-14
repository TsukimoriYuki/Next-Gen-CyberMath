export type ExamPaperSubject = "math1a" | "math2bc" | "private-mid";

export type ExamAnswerSlotType =
  | "digit"
  | "signedDigit"
  | "choice"
  | "symbol"
  | "decimal"
  | "fractionPart";

export type ExamPaper = {
  id: string;
  title: string;
  subject: ExamPaperSubject;
  durationMin: number;
  totalScore: number;
  questionCount: number;
  paperPdfUrl?: string;
  pageImages?: string[];
  sections: ExamPaperSection[];
  answerSlots: ExamAnswerSlot[];
  reviewBlocks: ExamPaperReviewBlock[];
};

export type ExamAnswerSlot = {
  id: string;
  label: string;
  sectionId: string;
  groupLabel?: string;
  type: ExamAnswerSlotType;
  choices: string[];
  correctAnswer: string;
  score: number;
};

export type ExamPaperSection = {
  id: string;
  title: string;
  pageStart?: number;
  pageEnd?: number;
  score: number;
  questionCount: number;
  answerSlotIds: string[];
};

export type ExamPaperReviewBlock = {
  sectionId: string;
  title: string;
  summary: string;
  explanations: {
    slotLabels: string[];
    heading: string;
    body: string;
  }[];
  relatedLectures?: {
    label: string;
    href: string;
    note?: string;
  }[];
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const CHOICE_4 = ["0", "1", "2", "3"];
const CHOICE_5 = ["0", "1", "2", "3", "4"];

const MATH_1A_PAPER_001_SECTION_1_SLOTS = [
  paperSlot("section-1", "m1a001-s1-a", "ア", "第1問[1]", "digit", DIGITS, "1"),
  paperSlot("section-1", "m1a001-s1-i", "イ", "第1問[1]", "digit", DIGITS, "1"),
  paperSlot("section-1", "m1a001-s1-u", "ウ", "第1問[1]", "digit", DIGITS, "0"),
  paperSlot("section-1", "m1a001-s1-e", "エ", "第1問[1]", "choice", CHOICE_4, "2"),
  paperSlot("section-1", "m1a001-s1-o", "オ", "第1問[2]", "choice", CHOICE_4, "1"),
  paperSlot("section-1", "m1a001-s1-ka", "カ", "第1問[2]", "digit", DIGITS, "4"),
  paperSlot("section-1", "m1a001-s1-ki", "キ", "第1問[3]", "digit", DIGITS, "4"),
  paperSlot("section-1", "m1a001-s1-ku", "ク", "第1問[3]", "digit", DIGITS, "2"),
  paperSlot("section-1", "m1a001-s1-ke", "ケ", "第1問[4]", "digit", DIGITS, "6"),
  paperSlot("section-1", "m1a001-s1-ko", "コ", "第1問[4]", "choice", CHOICE_5, "0"),
  paperSlot("section-1", "m1a001-s1-sa", "サ", "第1問[5]", "choice", CHOICE_4, "1"),
  paperSlot("section-1", "m1a001-s1-shi", "シ", "第1問[5]", "digit", DIGITS, "4"),
  paperSlot("section-1", "m1a001-s1-su", "ス", "第1問[6]", "digit", DIGITS, "6"),
  paperSlot("section-1", "m1a001-s1-se", "セ", "第1問[6]", "choice", CHOICE_5, "2"),
  paperSlot("section-1", "m1a001-s1-so", "ソ", "第1問[6]", "choice", CHOICE_4, "0", 1),
  paperSlot("section-1", "m1a001-s1-ta", "タ", "第1問[6]", "choice", CHOICE_4, "3", 1),
];

const MATH_1A_PAPER_001_SECTION_2_SLOTS = [
  paperSlot("section-2", "m1a001-s2-chi", "チ", "第2問[1]", "digit", DIGITS, "4"),
  paperSlot("section-2", "m1a001-s2-tsu", "ツ", "第2問[1]", "digit", DIGITS, "2"),
  paperSlot("section-2", "m1a001-s2-te", "テ", "第2問[1]", "digit", DIGITS, "5"),
  paperSlot("section-2", "m1a001-s2-to", "ト", "第2問[2]", "choice", CHOICE_5, "0"),
  paperSlot("section-2", "m1a001-s2-na", "ナ", "第2問[2]", "choice", CHOICE_5, "1"),
  paperSlot("section-2", "m1a001-s2-ni", "ニ", "第2問[2]", "digit", DIGITS, "6"),
  paperSlot("section-2", "m1a001-s2-nu", "ヌ", "第2問[3]", "choice", CHOICE_4, "2"),
  paperSlot("section-2", "m1a001-s2-ne", "ネ", "第2問[3]", "digit", DIGITS, "1"),
  paperSlot("section-2", "m1a001-s2-no", "ノ", "第2問[3]", "digit", DIGITS, "6"),
  paperSlot("section-2", "m1a001-s2-ha", "ハ", "第2問[4]", "choice", CHOICE_5, "0"),
  paperSlot("section-2", "m1a001-s2-hi", "ヒ", "第2問[4]", "digit", DIGITS, "6"),
  paperSlot("section-2", "m1a001-s2-fu", "フ", "第2問[4]", "choice", CHOICE_4, "1"),
  paperSlot("section-2", "m1a001-s2-he", "ヘ", "第2問[5]", "choice", CHOICE_4, "2"),
  paperSlot("section-2", "m1a001-s2-ho", "ホ", "第2問[5]", "choice", CHOICE_4, "0"),
  paperSlot("section-2", "m1a001-s2-ma", "マ", "第2問[6]", "choice", CHOICE_4, "1", 1),
  paperSlot("section-2", "m1a001-s2-mi", "ミ", "第2問[6]", "choice", CHOICE_4, "3", 1),
];

const MATH_1A_PAPER_001_SECTION_3_SLOTS = [
  paperSlot("section-3", "m1a001-s3-mu", "ム", "第3問[1]", "choice", CHOICE_5, "2"),
  paperSlot("section-3", "m1a001-s3-me", "メ", "第3問[1]", "choice", CHOICE_4, "1"),
  paperSlot("section-3", "m1a001-s3-mo", "モ", "第3問[2]", "choice", CHOICE_5, "3"),
  paperSlot("section-3", "m1a001-s3-ya", "ヤ", "第3問[2]", "digit", DIGITS, "6"),
  paperSlot("section-3", "m1a001-s3-yu", "ユ", "第3問[3]", "digit", DIGITS, "6"),
  paperSlot("section-3", "m1a001-s3-yo", "ヨ", "第3問[3]", "choice", CHOICE_5, "2"),
  paperSlot("section-3", "m1a001-s3-ra", "ラ", "第3問[4]", "digit", DIGITS, "2"),
  paperSlot("section-3", "m1a001-s3-ri", "リ", "第3問[4]", "choice", CHOICE_5, "3"),
  paperSlot("section-3", "m1a001-s3-ru", "ル", "第3問[5]", "choice", CHOICE_4, "0", 1),
  paperSlot("section-3", "m1a001-s3-re", "レ", "第3問[5]", "choice", CHOICE_4, "2", 1),
  paperSlot("section-3", "m1a001-s3-ro", "ロ", "第3問[5]", "choice", CHOICE_4, "1", 1),
  paperSlot("section-3", "m1a001-s3-wa", "ワ", "第3問[5]", "choice", CHOICE_4, "3", 1),
];

const MATH_1A_PAPER_001_SECTION_4_SLOTS = [
  paperSlot("section-4", "m1a001-s4-wo", "ヲ", "第4問[1]", "digit", DIGITS, "6"),
  paperSlot("section-4", "m1a001-s4-n", "ン", "第4問[1]", "choice", CHOICE_4, "0"),
  paperSlot("section-4", "m1a001-s4-a", "A", "第4問[2]", "choice", CHOICE_5, "1"),
  paperSlot("section-4", "m1a001-s4-b", "B", "第4問[2]", "digit", DIGITS, "5"),
  paperSlot("section-4", "m1a001-s4-c", "C", "第4問[3]", "choice", CHOICE_5, "2"),
  paperSlot("section-4", "m1a001-s4-d", "D", "第4問[3]", "choice", CHOICE_4, "3"),
  paperSlot("section-4", "m1a001-s4-e", "E", "第4問[4]", "choice", CHOICE_4, "0"),
  paperSlot("section-4", "m1a001-s4-f", "F", "第4問[4]", "choice", CHOICE_4, "1"),
  paperSlot("section-4", "m1a001-s4-g", "G", "第4問[5]", "choice", CHOICE_4, "0", 1),
  paperSlot("section-4", "m1a001-s4-h", "H", "第4問[5]", "choice", CHOICE_4, "2", 1),
  paperSlot("section-4", "m1a001-s4-i", "I", "第4問[5]", "choice", CHOICE_4, "1", 1),
  paperSlot("section-4", "m1a001-s4-j", "J", "第4問[5]", "choice", CHOICE_4, "3", 1),
];

const MATH_1A_PAPER_001_SLOTS = [
  ...MATH_1A_PAPER_001_SECTION_1_SLOTS,
  ...MATH_1A_PAPER_001_SECTION_2_SLOTS,
  ...MATH_1A_PAPER_001_SECTION_3_SLOTS,
  ...MATH_1A_PAPER_001_SECTION_4_SLOTS,
];

export const MATH_1A_PAPER_001: ExamPaper = {
  id: "math-1a-paper-001",
  title: "共通テスト型 数学IA 70分模試 第1回",
  subject: "math1a",
  durationMin: 70,
  totalScore: 100,
  questionCount: 22,
  pageImages: [
    "/exam-papers/math-1a-paper-001/page-1.svg",
    "/exam-papers/math-1a-paper-001/page-2.svg",
    "/exam-papers/math-1a-paper-001/page-3.svg",
    "/exam-papers/math-1a-paper-001/page-4.svg",
    "/exam-papers/math-1a-paper-001/page-5.svg",
    "/exam-papers/math-1a-paper-001/page-6.svg",
    "/exam-papers/math-1a-paper-001/page-7.svg",
  ],
  sections: [
    {
      id: "section-1",
      title: "第1問 数と式・図形と計量",
      pageStart: 2,
      pageEnd: 2,
      score: 30,
      questionCount: 6,
      answerSlotIds: MATH_1A_PAPER_001_SECTION_1_SLOTS.map((slot) => slot.id),
    },
    {
      id: "section-2",
      title: "第2問 二次関数・データの分析",
      pageStart: 3,
      pageEnd: 4,
      score: 30,
      questionCount: 6,
      answerSlotIds: MATH_1A_PAPER_001_SECTION_2_SLOTS.map((slot) => slot.id),
    },
    {
      id: "section-3",
      title: "第3問 図形の性質",
      pageStart: 5,
      pageEnd: 5,
      score: 20,
      questionCount: 5,
      answerSlotIds: MATH_1A_PAPER_001_SECTION_3_SLOTS.map((slot) => slot.id),
    },
    {
      id: "section-4",
      title: "第4問 場合の数と確率",
      pageStart: 6,
      pageEnd: 7,
      score: 20,
      questionCount: 5,
      answerSlotIds: MATH_1A_PAPER_001_SECTION_4_SLOTS.map((slot) => slot.id),
    },
  ],
  answerSlots: MATH_1A_PAPER_001_SLOTS,
  reviewBlocks: [
    {
      sectionId: "section-1",
      title: "第1問の復習",
      summary:
        "前半は式の処理を短く済ませ、後半は面積、半径、高さのどのルートで処理するかを選ぶ大問です。",
      explanations: [
        {
          slotLabels: ["ア", "イ", "ウ", "エ"],
          heading: "根号計算は対称式で短く処理する",
          body:
            "$a=\\sqrt3+\\sqrt2,\\ b=\\sqrt3-\\sqrt2$ では、積は差の平方型で $ab=1$、平方和は展開して $a^2+b^2=10$ になる。最後の大小判断は近似ではなく、$a+b=2\\sqrt3$ から読む。",
        },
        {
          slotLabels: ["キ", "ク", "ケ", "コ"],
          heading: "高さと面積の往復",
          body:
            "面積と底辺が先に見えたら $h=\\frac{2S}{底辺}$ で高さへ戻す。辺と角が見えているときは、高さが角の向かい側になるので $h=辺\\times\\sin\\theta$ を使う。",
        },
        {
          slotLabels: ["サ", "シ", "ス", "セ", "ソ", "タ"],
          heading: "内接円半径と外接円半径",
          body:
            "13,14,15 の三角形は $S=84,\\ s=21$ なので内接円半径は $r=S/s=4$。外接円半径は正弦定理 $a/\\sin A=2R$ を使う。空間図形では、まず垂線を含む断面へ落とす。",
        },
      ],
      relatedLectures: [
        {
          label: "図形と計量 満点講義",
          href: "/common-test/lectures/geometry-measurement-intensive",
          note: "半径と高さの判別ドリルへ戻る",
        },
        {
          label: "垂線と高さの求め方",
          href: "/lessons/geometry-altitude-height-routes",
          note: "高さを面積・sin・断面から選ぶ復習",
        },
      ],
    },
    {
      sectionId: "section-2",
      title: "第2問の復習",
      summary:
        "二次関数の最大最小と、データの分析を同じ大問内で読み替える構成です。式だけでなく観測範囲の確認が必要です。",
      explanations: [
        {
          slotLabels: ["チ", "ツ", "テ", "ト", "ナ", "ニ"],
          heading: "頂点と定義域",
          body:
            "平方完成後は頂点だけでなく、定義域の端点も比べる。最大値が頂点で取れない場合もあるため、範囲の確認を先に行う。",
        },
        {
          slotLabels: ["ヌ", "ネ", "ノ", "ハ", "ヒ", "フ"],
          heading: "平均・中央値・散らばり",
          body:
            "表の値は行と列を固定して読む。学習時間の中央値は4.5、範囲は6で、散布図は強い正の相関を示す。ただし相関があることと因果があることは別である。",
        },
        {
          slotLabels: ["ヘ", "ホ", "マ", "ミ"],
          heading: "モデルの使いすぎを避ける",
          body:
            "相関があることと因果があることは別である。共通テストでは、計算結果を観測範囲の外へ広げてよいかをよく問う。",
        },
      ],
      relatedLectures: [
        {
          label: "二次関数 場合分け完全攻略",
          href: "/common-test/lectures/quadratic-case-split-intensive",
          note: "軸・端点・定義域の比較を復習",
        },
        {
          label: "共通テスト数学IA 裏技・即殺公式講義",
          href: "/common-test/lectures/numbers-expressions-core-skills",
          note: "選択肢処理と近似チェックを復習",
        },
      ],
    },
    {
      sectionId: "section-3",
      title: "第3問の復習",
      summary:
        "中心、角の二等分線、中線、補助線を条件から選ぶ大問です。定義の取り違えを防ぐことが最優先です。",
      explanations: [
        {
          slotLabels: ["ム", "メ", "モ", "ヤ"],
          heading: "中心の定義を言葉で判別する",
          body:
            "内心は各辺から等距離、外心は各頂点から等距離である。角の二等分線では $BD:DC=AB:AC$ なので、$6:9=2:3$ から $DC=6$ と読める。",
        },
        {
          slotLabels: ["ユ", "ヨ", "ラ", "リ"],
          heading: "二等分線と中線を混ぜない",
          body:
            "二等分線長は $AD^2=AB\\times AC-BD\\times DC$。中線では $AM^2=(2AB^2+2AC^2-BC^2)/4$ を使う。角を半分にする条件と、中点へ向かう条件を分ける。",
        },
        {
          slotLabels: ["ル", "レ", "ロ", "ワ"],
          heading: "補助線は目的から選ぶ",
          body:
            "円の中心が絡むなら半径、面積比が絡むなら高さ共有、長さを出すなら二等分線や中線を疑う。作図の目的を一言で決めてから線を引く。",
        },
      ],
      relatedLectures: [
        {
          label: "図形の性質 満点講義",
          href: "/common-test/lectures/geometry-properties-intensive",
          note: "中心と補助線の判別ドリルへ戻る",
        },
        {
          label: "三角形の中心と二等分線",
          href: "/lessons/triangle-centers-bisectors",
          note: "中心と線分比の基礎復習",
        },
      ],
    },
    {
      sectionId: "section-4",
      title: "第4問の復習",
      summary:
        "数え上げ、余事象、条件付き確率を切り替える大問です。母集団をどのタイミングでリセットするかを確認します。",
      explanations: [
        {
          slotLabels: ["ヲ", "ン", "A", "B"],
          heading: "全体数を先に固定する",
          body:
            "同じ色のカードを区別しない並べ方は $6!/(3!2!1!)=60$ 通り。少なくとも1枚が赤は、赤がない場合を引く余事象で $1-3/15=4/5$ と処理できる。",
        },
        {
          slotLabels: ["C", "D", "E", "F"],
          heading: "少なくともは余事象から",
          body:
            "少なくとも1枚が青という条件が付いたら、条件を満たす9通りだけを新しい全体にする。そのうち赤を含むのは6通りなので $2/3$ である。",
        },
        {
          slotLabels: ["G", "H", "I", "J"],
          heading: "独立と排反を混同しない",
          body:
            "同時に起こらないことは排反であり、互いに影響しないことは独立である。言葉が似ていても計算の式は別物である。",
        },
      ],
      relatedLectures: [
        {
          label: "確率 誘導の読み方講座",
          href: "/common-test/lectures/probability-guided-reading",
          note: "余事象・条件付き確率の母集団整理",
        },
        {
          label: "共通テスト数学IA 裏技・即殺公式講義",
          href: "/common-test/lectures/numbers-expressions-core-skills",
          note: "余事象と母集団リセットを復習",
        },
      ],
    },
  ],
};

export const MATH_1A_SECTION_2_PAPER_SAMPLE: ExamPaper = {
  id: "math-1a-section-2-paper-sample",
  title: "Cyber Math 共通テスト型模試 数学IA 第2問サンプル",
  subject: "math1a",
  durationMin: 20,
  totalScore: 30,
  questionCount: 6,
  pageImages: [
    "/exam-papers/math-1a-section-2-sample-page-1.svg",
    "/exam-papers/math-1a-section-2-sample-page-2.svg",
  ],
  sections: [
    {
      id: "section-2",
      title: "第2問 二次関数・データの分析",
      pageStart: 1,
      pageEnd: 2,
      score: 30,
      questionCount: 6,
      answerSlotIds: [
        "a",
        "i",
        "u",
        "e",
        "o",
        "ka",
        "ki",
        "ku",
        "ke",
        "ko",
        "sa",
        "shi",
        "su",
        "se",
        "so",
        "ta",
        "chi",
        "tsu",
        "te",
        "to",
        "na",
        "ni",
        "nu",
        "ne",
      ],
    },
  ],
  answerSlots: [
    slot("a", "ア", "問1", "digit", DIGITS, "6"),
    slot("i", "イ", "問1", "digit", DIGITS, "4"),
    slot("u", "ウ", "問1", "digit", DIGITS, "7"),
    slot("e", "エ", "問1", "digit", DIGITS, "2"),
    slot("o", "オ", "問2", "choice", CHOICE_4, "2"),
    slot("ka", "カ", "問2", "choice", CHOICE_4, "1"),
    slot("ki", "キ", "問3", "symbol", ["+", "-"], "+"),
    slot("ku", "ク", "問3", "digit", DIGITS, "3"),
    slot("ke", "ケ", "問3", "digit", DIGITS, "6"),
    slot("ko", "コ", "問3", "digit", DIGITS, "7"),
    slot("sa", "サ", "問4", "digit", DIGITS, "5"),
    slot("shi", "シ", "問4", "digit", DIGITS, "5"),
    slot("su", "ス", "問4", "choice", CHOICE_5, "0"),
    slot("se", "セ", "問4", "choice", CHOICE_5, "0"),
    slot("so", "ソ", "問5", "digit", DIGITS, "3"),
    slot("ta", "タ", "問5", "digit", DIGITS, "1"),
    slot("chi", "チ", "問5", "digit", DIGITS, "9"),
    slot("tsu", "ツ", "問5", "digit", DIGITS, "5"),
    slot("te", "テ", "問6", "choice", CHOICE_5, "1", 2),
    slot("to", "ト", "問6", "choice", CHOICE_5, "1", 2),
    slot("na", "ナ", "問6", "digit", DIGITS, "2", 2),
    slot("ni", "ニ", "問6", "digit", DIGITS, "4", 2),
    slot("nu", "ヌ", "問6", "choice", CHOICE_4, "2", 2),
    slot("ne", "ネ", "問6", "choice", CHOICE_4, "3", 2),
  ],
  reviewBlocks: [
    {
      sectionId: "section-2",
      title: "第2問の復習",
      summary:
        "試験中は冊子とマーク欄だけを表示し、提出後に平均、分散、二次関数モデルの解釈を確認します。",
      explanations: [
        {
          slotLabels: ["ア", "イ", "ウ", "エ"],
          heading: "表の読み取り",
          body:
            "データの平均と中央値は、先に表の行を固定してから計算する。気温の行と得点の行を混ぜないこと。",
        },
        {
          slotLabels: ["キ", "ク", "ケ", "コ"],
          heading: "二次関数モデル",
          body:
            "$f(x)=-3(x-3)^2+67$ では頂点が $(3,67)$ である。最大値は67、軸は $x=3$ と読む。",
        },
        {
          slotLabels: ["テ", "ト", "ナ", "ニ", "ヌ", "ネ"],
          heading: "モデルの限界",
          body:
            "観測範囲の外まで式をそのまま広げると危険である。共通テスト型では、計算結果だけでなく条件の範囲を確認する。",
        },
      ],
    },
  ],
};

export const EXAM_PAPERS: ExamPaper[] = [
  MATH_1A_PAPER_001,
  MATH_1A_SECTION_2_PAPER_SAMPLE,
];

export function getExamPaper(id: string): ExamPaper | null {
  return EXAM_PAPERS.find((paper) => paper.id === id) ?? null;
}

export function getExamPaperStats(paper: ExamPaper) {
  return {
    questionCount: paper.questionCount,
    sectionCount: paper.sections.length,
    answerSlotCount: paper.answerSlots.length,
    totalScore: paper.totalScore,
  };
}

function paperSlot(
  sectionId: string,
  id: string,
  label: string,
  groupLabel: string,
  type: ExamAnswerSlotType,
  choices: string[],
  correctAnswer: string,
  score = 2,
): ExamAnswerSlot {
  return {
    id,
    label,
    sectionId,
    groupLabel,
    type,
    choices,
    correctAnswer,
    score,
  };
}

function slot(
  id: string,
  label: string,
  groupLabel: string,
  type: ExamAnswerSlotType,
  choices: string[],
  correctAnswer: string,
  score = 1,
): ExamAnswerSlot {
  return {
    id,
    label,
    sectionId: "section-2",
    groupLabel,
    type,
    choices,
    correctAnswer,
    score,
  };
}
