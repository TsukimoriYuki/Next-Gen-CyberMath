import type {
  MathUnitPracticeChoice,
  MathUnitPracticeDifficulty,
  MathUnitPracticeQuestionType,
  MathUnitPracticeVisual,
  Problem,
} from "@/lib/types";

const r = String.raw;

type PracticeArea = NonNullable<Problem["unitPractice"]>["practiceArea"];

type PracticeDraft = {
  id: string;
  title: string;
  area: PracticeArea;
  unitId: string;
  difficulty: MathUnitPracticeDifficulty;
  internalKpd: number;
  questionType: MathUnitPracticeQuestionType;
  statement: string;
  choices?: readonly MathUnitPracticeChoice[];
  correctAnswer: string;
  acceptedAnswers?: readonly string[];
  firstCheck: string;
  conditionSummary: string;
  strategy: string;
  solution: string;
  verification: string;
  commonMistake: string;
  distractorReasons?: Readonly<Record<string, string>>;
  relatedCourseIds: readonly string[];
  reviewTags: readonly string[];
  mistakeTags: readonly string[];
  estimatedTime: number;
  visual?: MathUnitPracticeVisual;
  ctGuidance?: {
    guidance: string;
    discardable: string;
    reverseCheck: string;
    timeDecision: string;
    transfer: string;
  };
};

function choices(
  correctId: string,
  entries: ReadonlyArray<readonly [id: string, text: string, reason: string]>,
): readonly MathUnitPracticeChoice[] {
  if (!entries.some(([id]) => id === correctId)) throw new Error(`missing correct choice ${correctId}`);
  return entries.map(([id, text, reason]) => ({ id, text, reason }));
}

function buildDetailedExplanation(draft: PracticeDraft) {
  const correctText = draft.choices?.find((choice) => choice.id === draft.correctAnswer)?.text;
  const wrongReasons = draft.choices
    ?.filter((choice) => choice.id !== draft.correctAnswer)
    .map((choice) => `${choice.id}: ${choice.reason}`)
    .join(" / ");
  const core = [
    `1. 最初に何を見るか: ${draft.firstCheck}`,
    `2. 条件整理: ${draft.conditionSummary}`,
    `3. 解法選択: ${draft.strategy}`,
    `4. 計算・推論: ${draft.solution}`,
    `5. 正答: ${correctText ?? draft.correctAnswer}`,
    `6. 検算: ${draft.verification}`,
    `7. よくある誤答: ${draft.commonMistake}${wrongReasons ? ` 選択肢別では ${wrongReasons}` : ""}`,
    `8. 関連講座: ${draft.relatedCourseIds.join(" / ")} に戻り、同じ判断手順を確認する。`,
  ];
  if (draft.ctGuidance) {
    core.push(
      `共通テスト準備・誘導の読み方: ${draft.ctGuidance.guidance}`,
      `捨ててよい情報: ${draft.ctGuidance.discardable}`,
      `選択肢からの逆算: ${draft.ctGuidance.reverseCheck}`,
      `時間を使いすぎた場合: ${draft.ctGuidance.timeDecision}`,
      `変形問題への橋渡し: ${draft.ctGuidance.transfer}`,
    );
  }
  return core.join("\n\n");
}

function makeProblem(draft: PracticeDraft): Problem {
  const distractorReasons = draft.distractorReasons ?? Object.fromEntries(
    (draft.choices ?? [])
      .filter((choice) => choice.id !== draft.correctAnswer)
      .map((choice) => [choice.id, choice.reason]),
  );
  const detailedExplanation = buildDetailedExplanation(draft);
  const publicDifficulty = ({ basic: "A", standard: "B", "common-test-prep": "C" } as const)[draft.difficulty];
  return {
    slug: draft.id,
    title: draft.title,
    unit: draft.area === "確率" || draft.area === "場合の数" ? "場合の数と確率" : draft.area === "二次関数" ? "2次関数" : draft.area,
    difficulty: publicDifficulty,
    tagline: `${draft.area}・採点可能な単元別演習`,
    statement: draft.statement,
    hasGraph: false,
    tags: [...draft.reviewTags],
    steps: [
      { type: "INSIGHT", order: 0, title: "最初の確認", body: `${draft.firstCheck}\n\n${draft.strategy}` },
      { type: "SOLUTION", order: 1, title: "詳細解説", body: detailedExplanation },
      { type: "HINT", order: 2, title: "誤答を防ぐ", body: draft.commonMistake },
    ],
    unitPractice: {
      id: draft.id,
      slug: draft.id,
      subjectId: "math-1a",
      unitId: draft.unitId,
      practiceArea: draft.area,
      questionType: draft.questionType,
      choices: draft.choices,
      correctAnswer: draft.correctAnswer,
      acceptedAnswers: draft.acceptedAnswers,
      detailedExplanation,
      distractorReasons,
      strategy: draft.strategy,
      firstCheck: draft.firstCheck,
      verification: draft.verification,
      commonMistake: draft.commonMistake,
      relatedCourseIds: draft.relatedCourseIds,
      reviewTags: draft.reviewTags,
      mistakeTags: draft.mistakeTags,
      difficulty: draft.difficulty,
      internalKpd: draft.internalKpd,
      estimatedTime: draft.estimatedTime,
      copyrightStatus: "original",
      sourceType: "original",
      publicationStatus: "public",
      visual: draft.visual,
    },
  };
}

const drafts: PracticeDraft[] = [
  // 数と式: single 2 / numeric 2 / matching 1
  {
    id: "m1a-ne-01-expand-check",
    title: "展開結果を項ごとに検算する",
    area: "数と式", unitId: "numbers-and-expressions", difficulty: "basic", internalKpd: 43,
    questionType: "single-choice", estimatedTime: 75,
    statement: r`$(x+3)(x-2)$ を展開した式として正しいものを選べ。`,
    choices: choices("B", [["A", r`$x^2-5x-6$`, "外項と内項の和を $-5x$ としている。"], ["B", r`$x^2+x-6$`, "正答。$-2x+3x=x$。"], ["C", r`$x^2+x+6$`, "定数項 $3\times(-2)$ の符号を落としている。"], ["D", r`$x^2-6$`, "一次の項 $-2x+3x$ を消している。"]]),
    correctAnswer: "B", firstCheck: "4つの積の符号、とくに定数項を見る。", conditionSummary: "分配法則で $x^2,-2x,3x,-6$ の4項に分ける。", strategy: "同類項をまとめる前に4項を書き出す。", solution: r`$x^2-2x+3x-6=x^2+x-6$。`, verification: r`$x=0$ を代入すると元の式も展開後も $-6$。`, commonMistake: "定数項の符号と一次項の加減を同時に処理しない。", relatedCourseIds: ["expansion-formulas-basic"], reviewTags: ["展開", "分配法則"], mistakeTags: ["符号ミス", "同類項"],
  },
  {
    id: "m1a-ne-02-radical-square",
    title: "根号を二乗して値を確かめる",
    area: "数と式", unitId: "numbers-and-expressions", difficulty: "basic", internalKpd: 47,
    questionType: "numeric", estimatedTime: 75,
    statement: r`$(\sqrt{12})^2-(\sqrt{3})^2$ の値を半角数字で答えよ。`, correctAnswer: "9", acceptedAnswers: ["9"],
    firstCheck: r`$(\sqrt a)^2=a$ を使える形かを見る。`, conditionSummary: "$12,3$ はともに非負なので平方根の定義をそのまま使える。", strategy: "根号を近似せず、二乗と平方根を先に打ち消す。", solution: "$12-3=9$。", verification: "各項はそれぞれ12と3で、差は正の9。", commonMistake: r`$\sqrt{12}-\sqrt3$ と取り違えない。`, distractorReasons: { "3": "根号の中だけを引いている。", "15": "差を和としている。" }, relatedCourseIds: ["real-numbers-and-radicals"], reviewTags: ["根号", "実数"], mistakeTags: ["平方根の正負", "式の読み違い"],
  },
  {
    id: "m1a-ne-03-absolute-roots-sum",
    title: "絶対値方程式の2解を整理する",
    area: "数と式", unitId: "numbers-and-expressions", difficulty: "standard", internalKpd: 53,
    questionType: "numeric", estimatedTime: 120,
    statement: r`方程式 $|2x-5|=7$ の2つの解の和を答えよ。`, correctAnswer: "5", acceptedAnswers: ["5"],
    firstCheck: "絶対値の中身が $7$ と $-7$ の2通りになることを見る。", conditionSummary: r`$2x-5=7$ または $2x-5=-7$。`, strategy: "2つの一次方程式を別々に解き、最後に和を取る。", solution: r`$x=6,-1$ だから和は $5$。`, verification: r`$x=6,-1$ はどちらも $|2x-5|=7$ を満たす。`, commonMistake: "負の場合を落とす、または解ではなく差を答えるミス。", distractorReasons: { "6": "正の分岐しか数えていない。", "7": "絶対値の右辺をそのまま答えている。" }, relatedCourseIds: ["absolute-value-basic"], reviewTags: ["絶対値", "場合分け"], mistakeTags: ["場合分け漏れ", "条件の見落とし"],
  },
  {
    id: "m1a-ne-04-inequality-direction",
    title: "負の数で割る不等式",
    area: "数と式", unitId: "numbers-and-expressions", difficulty: "standard", internalKpd: 55,
    questionType: "single-choice", estimatedTime: 105,
    statement: r`不等式 $3-2x\le 7$ の解として正しいものを選べ。`,
    choices: choices("C", [["A", r`$x\le-2$`, "負の数で割るとき不等号を反転していない。"], ["B", r`$x\ge2$`, "移項時の符号を誤っている。"], ["C", r`$x\ge-2$`, "正答。$-2x\le4$ から反転する。"], ["D", r`$x\le2$`, "符号と反転の両方がずれている。"]]),
    correctAnswer: "C", firstCheck: "$x$ の係数が負であることを見る。", conditionSummary: r`$-2x\le4$ まで移項する。`, strategy: "最後に $-2$ で割る瞬間だけ不等号を反転する。", solution: r`$x\ge-2$。`, verification: "$x=0$ は元の不等式を満たし、選んだ範囲にも含まれる。", commonMistake: "移項の符号変更と不等号の反転を混同しない。", relatedCourseIds: ["linear-equations-inequalities"], reviewTags: ["一次不等式", "符号"], mistakeTags: ["不等号反転", "符号ミス"],
  },
  {
    id: "m1a-ne-05-expression-matching",
    title: "条件から式の値を対応させる",
    area: "数と式", unitId: "numbers-and-expressions", difficulty: "common-test-prep", internalKpd: 61,
    questionType: "matching", estimatedTime: 180,
    statement: r`$a+b=5,\ ab=4$ のとき、ア $a^2+b^2$、イ $(a-b)^2$ の値の対応として正しいものを選べ。`,
    choices: choices("D", [["A", "ア=17、イ=17", "2式の差 $2ab$ を反映していない。"], ["B", "ア=21、イ=9", "$a^2+b^2$ で $2ab$ を足している。"], ["C", "ア=9、イ=17", "2つの公式を逆に対応させている。"], ["D", "ア=17、イ=9", "正答。25から8を引く式と、さらに8を引く式を区別できている。"]]),
    correctAnswer: "D", firstCheck: r`$(a+b)^2$ から $2ab$ を引けば $a^2+b^2$ が出る。`, conditionSummary: r`$(a+b)^2=25,\ 2ab=8$。`, strategy: "アを先に求め、イはアからさらに $2ab$ を引く。", solution: r`ア $=25-8=17$、イ $=17-8=9$。`, verification: "$a,b=1,4$ と置くと17と9になる。", commonMistake: r`$(a-b)^2=a^2+b^2-2ab$ の符号を忘れない。`, relatedCourseIds: ["expression-transformation-strategy"], reviewTags: ["式の値", "恒等式"], mistakeTags: ["公式混同", "対応ミス"], ctGuidance: { guidance: "与えられた2量から直接作れる平方を起点にする。", discardable: "$a,b$ を個別に解く必要はない。", reverseCheck: "選択肢の差が8かを見るとイを素早く絞れる。", timeDecision: "30秒で方針が立たなければ $(a+b)^2$ を展開して書く。", transfer: "$a^3+b^3$ でも和と積から作る考えへつながる。" },
  },

  // 集合と命題: single 2 / numeric 1 / multiple 1 / matching 1
  {
    id: "m1a-sl-01-set-union",
    title: "集合の和を重複なく並べる",
    area: "集合と命題", unitId: "sets-and-logic", difficulty: "basic", internalKpd: 42,
    questionType: "single-choice", estimatedTime: 75,
    statement: r`$A=\{1,2,4\},\ B=\{2,3,4\}$ のとき $A\cup B$ を選べ。`,
    choices: choices("A", [["A", r`$\{1,2,3,4\}$`, "正答。共通要素は1回だけ書く。"], ["B", r`$\{2,4\}$`, "これは共通部分。"], ["C", r`$\{1,3\}$`, "片方だけに属する要素だけを集めている。"], ["D", r`$\{1,2,2,3,4,4\}$`, "集合では同じ要素を重複して書かない。"]]),
    correctAnswer: "A", firstCheck: "$\cup$ が和集合を表すことを見る。", conditionSummary: "AまたはBに属する要素を集める。", strategy: "小さい順に、既出の要素は重ねず並べる。", solution: r`$1,2,3,4$ の4要素。`, verification: "AとBの全要素が結果に含まれている。", commonMistake: "$\cap$ と取り違えない。", relatedCourseIds: ["set-basics"], reviewTags: ["集合演算", "和集合"], mistakeTags: ["記号混同", "重複"],
  },
  {
    id: "m1a-sl-02-union-cardinality",
    title: "共通部分を1回引く",
    area: "集合と命題", unitId: "sets-and-logic", difficulty: "basic", internalKpd: 48,
    questionType: "numeric", estimatedTime: 90,
    statement: r`$n(A)=18,\ n(B)=15,\ n(A\cap B)=6$ のとき $n(A\cup B)$ を答えよ。`, correctAnswer: "27", acceptedAnswers: ["27"],
    firstCheck: "共通部分が二重に数えられていることを見る。", conditionSummary: "$18+15$ では共通の6人を2回数える。", strategy: "和から共通部分を1回引く。", solution: "$18+15-6=27$。", verification: "27は18以上かつ33以下で範囲も妥当。", commonMistake: "共通部分を引かない、または2回引くミス。", distractorReasons: { "33": "共通部分を引いていない。", "21": "共通部分を2回引いている。" }, relatedCourseIds: ["set-operations-venn"], reviewTags: ["要素数", "包除"], mistakeTags: ["二重計上", "引き忘れ"],
  },
  {
    id: "m1a-sl-03-necessary-sufficient",
    title: "必要条件と十分条件の向きを判定する",
    area: "集合と命題", unitId: "sets-and-logic", difficulty: "standard", internalKpd: 52,
    questionType: "single-choice", estimatedTime: 120,
    statement: r`実数 $x$ について、条件 $p:x=2$ は条件 $q:x^2=4$ であるための何条件か。`,
    choices: choices("B", [["A", "必要十分条件", "$q$ から $x=2$ とは限らず $x=-2$ もある。"], ["B", "十分条件だが必要条件ではない", "正答。$p\Rightarrow q$ のみ成り立つ。"], ["C", "必要条件だが十分条件ではない", "矢印の向きを逆にしている。"], ["D", "必要条件でも十分条件でもない", "$x=2$ なら必ず $x^2=4$。"]]),
    correctAnswer: "B", firstCheck: "$p\Rightarrow q$ と $q\Rightarrow p$ を別々に調べる。", conditionSummary: "$x^2=4$ の解は $2,-2$。", strategy: "反例 $x=-2$ を使って逆向きを否定する。", solution: "$p\Rightarrow q$ は真、$q\Rightarrow p$ は偽。", verification: "$x=2$ と $x=-2$ の両方を代入する。", commonMistake: "日本語の『ための』だけで判断せず矢印を書く。", relatedCourseIds: ["necessary-sufficient-basic"], reviewTags: ["必要条件", "十分条件"], mistakeTags: ["必要十分の逆", "反例不足"],
  },
  {
    id: "m1a-sl-04-proposition-multi",
    title: "真の命題を組み合わせで選ぶ",
    area: "集合と命題", unitId: "sets-and-logic", difficulty: "standard", internalKpd: 56,
    questionType: "multiple-select", estimatedTime: 150,
    statement: "実数について次の命題を考える。ア: $x>3\Rightarrow x>1$、イ: $x^2>4\Rightarrow x>2$、ウ: $x\le0\Rightarrow x^3\le0$。真である命題の組合せを選べ。",
    choices: choices("C", [["A", "アのみ", "ウも単調性から真。"], ["B", "イのみ", "$x=-3$ がイの反例。"], ["C", "アとウ", "正答。イだけが反例を持つ。"], ["D", "ア・イ・ウ", "イを絶対値条件と混同している。"]]),
    correctAnswer: "C", firstCheck: "各命題を別々に判定し、最後に組合せる。", conditionSummary: "イでは負の実数も候補に残る。", strategy: "真は包含、偽は反例1つで判定する。", solution: "アは真、イは $x=-3$ で偽、ウは真。", verification: "境界値0と、イの負の反例を代入する。", commonMistake: r`$x^2>4$ を $x>2$ だけにしてしまう。`, relatedCourseIds: ["proposition-basic", "contrapositive-and-proof"], reviewTags: ["命題", "反例"], mistakeTags: ["反例不足", "平方の条件"],
  },
  {
    id: "m1a-sl-05-negation-matching",
    title: "量化記号と否定を対応させる",
    area: "集合と命題", unitId: "sets-and-logic", difficulty: "common-test-prep", internalKpd: 60,
    questionType: "matching", estimatedTime: 180,
    statement: "命題『すべての実数 $x$ について、$x^2+1>0$』の否定として正しいものを選べ。",
    choices: choices("D", [["A", "すべての実数 $x$ について $x^2+1\le0$", "『すべて』を残したまま述語だけを否定している。"], ["B", "ある実数 $x$ について $x^2+1>0$", "述語を否定していない。"], ["C", "すべての実数 $x$ について $x^2+1<0$", "$>0$ の否定は $\le0$。"], ["D", "ある実数 $x$ について $x^2+1\le0$", "正答。全称を存在に、$>0$ を $\le0$ にする。"]]),
    correctAnswer: "D", firstCheck: "『すべて』と不等号の両方を否定する。", conditionSummary: r`$\forall$ の否定は $\exists$、$>0$ の否定は $\le0$。`, strategy: "日本語を量化部分と性質部分に分ける。", solution: "『ある実数で0以下』が否定。", verification: "元の命題と否定が同時に真にならない形になっている。", commonMistake: "全称・存在の交換か不等号の変更の片方だけで止める。", relatedCourseIds: ["negation-and-quantifiers"], reviewTags: ["命題の否定", "量化"], mistakeTags: ["否定範囲", "不等号"], ctGuidance: { guidance: "文を『対象の範囲』『主張』に区切る。", discardable: "実際に $x^2+1$ が正かどうかの証明は不要。", reverseCheck: "選択肢で『ある』かつ『0以下』のものを探せる。", timeDecision: "迷ったら反対の文と同時に成立しないかを確認する。", transfer: "『少なくとも1つ』『存在しない』を含む否定へ広げる。" },
  },

  // 二次関数: single 2 / numeric 2 / table 1
  {
    id: "m1a-qf-01-completing-square",
    title: "平方完成の形を選ぶ",
    area: "二次関数", unitId: "quadratic", difficulty: "basic", internalKpd: 44,
    questionType: "single-choice", estimatedTime: 90,
    statement: r`$y=x^2-6x+11$ を平方完成した形を選べ。`,
    choices: choices("A", [["A", r`$y=(x-3)^2+2$`, "正答。9を足して引く。"], ["B", r`$y=(x+3)^2+2$`, "一次項の符号が逆。"], ["C", r`$y=(x-3)^2+11$`, "平方を作るために加えた9を調整していない。"], ["D", r`$y=(x-6)^2-25$`, "一次項の係数をそのまま移動量にしている。"]]),
    correctAnswer: "A", firstCheck: "$x$ の係数 $-6$ の半分を見る。", conditionSummary: "半分は $-3$、その平方は9。", strategy: r`$x^2-6x=(x-3)^2-9$ とする。`, solution: r`$y=(x-3)^2-9+11=(x-3)^2+2$。`, verification: "展開して元の3項に戻る。", commonMistake: "移動量の符号と定数調整を別々に確認する。", relatedCourseIds: ["quadratic-completing-square"], reviewTags: ["平方完成", "二次関数"], mistakeTags: ["符号ミス", "定数調整"],
  },
  {
    id: "m1a-qf-02-vertex-value",
    title: "頂点の座標から最小値を読む",
    area: "二次関数", unitId: "quadratic", difficulty: "basic", internalKpd: 48,
    questionType: "numeric", estimatedTime: 75,
    statement: r`$y=2(x+1)^2-5$ の最小値を答えよ。`, correctAnswer: "-5", acceptedAnswers: ["-5"],
    firstCheck: "平方の係数が正で、上に開くことを見る。", conditionSummary: r`$(x+1)^2\ge0$。`, strategy: "平方部分を最小の0にする。", solution: "$x=-1$ のとき最小値は $-5$。", verification: "他の $x$ では正の量を $-5$ に足すので小さくならない。", commonMistake: "頂点のx座標 $-1$ を最小値として答えない。", distractorReasons: { "-1": "x座標を答えている。", "5": "定数項の符号を落としている。" }, relatedCourseIds: ["quadratic-what-is"], reviewTags: ["頂点", "最小値"], mistakeTags: ["座標混同", "開き方"],
  },
  {
    id: "m1a-qf-03-domain-maximum",
    title: "定義域の端点と頂点を比較する",
    area: "二次関数", unitId: "quadratic", difficulty: "standard", internalKpd: 54,
    questionType: "single-choice", estimatedTime: 150,
    statement: r`$y=-(x-1)^2+4$ の定義域が $-1\le x\le3$ のとき、最大値と最小値の組を選べ。`,
    choices: choices("B", [["A", "最大3、最小0", "頂点の値を3と読み違えている。"], ["B", "最大4、最小0", "正答。頂点で4、両端で0。"], ["C", "最大0、最小4", "最大・最小を逆にしている。"], ["D", "最大4、最小-4", "平方部分の最大を8と誤っている。"]]),
    correctAnswer: "B", firstCheck: "頂点 $x=1$ が定義域内かを見る。", conditionSummary: "候補は頂点と両端 $x=-1,3$。", strategy: "下に開くので頂点が最大、最小は端点比較。", solution: "$y(1)=4, y(-1)=y(3)=0$。", verification: "軸 $x=1$ から両端までの距離がともに2で値が等しい。", commonMistake: "定義域を無視して頂点だけで終えない。", relatedCourseIds: ["quadratic-max-min-domain"], reviewTags: ["定義域", "最大最小"], mistakeTags: ["定義域無視", "端点漏れ"],
  },
  {
    id: "m1a-qf-04-root-count",
    title: "グラフとx軸の交点数を判定する",
    area: "二次関数", unitId: "quadratic", difficulty: "standard", internalKpd: 56,
    questionType: "numeric", estimatedTime: 120,
    statement: r`二次方程式 $x^2-4x+5=0$ の実数解の個数を答えよ。`, correctAnswer: "0", acceptedAnswers: ["0"],
    firstCheck: "判別式または平方完成でx軸との位置を見る。", conditionSummary: r`$(x-2)^2+1=0$。`, strategy: "平方は0以上なので左辺の最小値を調べる。", solution: "左辺は常に1以上で、実数解は0個。", verification: r`判別式 $16-20=-4<0$ でも一致。`, commonMistake: "複素数解2個を実数解として数えない。", distractorReasons: { "1": "頂点を重解と誤認している。", "2": "二次方程式は常に2解と決めつけている。" }, relatedCourseIds: ["quadratic-intersections-root-count"], reviewTags: ["実数解", "判別"], mistakeTags: ["解の個数", "最小値"],
  },
  {
    id: "m1a-qf-05-table-translation",
    title: "値の表から平行移動を読む",
    area: "二次関数", unitId: "quadratic", difficulty: "common-test-prep", internalKpd: 62,
    questionType: "table-reading", estimatedTime: 210,
    statement: "表は二次関数 $f(x)$ の一部である。表と対称性から、グラフの軸と最小値の組を選べ。",
    visual: { type: "table", caption: "二次関数の値", headers: ["x", "-1", "0", "1", "2", "3"], rows: [["f(x)", "8", "3", "0", "-1", "0"]] },
    choices: choices("C", [["A", "軸 x=1、最小値0", "最小値を表の0と読み違えている。"], ["B", "軸 x=2、最小値0", "軸は合うが最小値は-1。"], ["C", "軸 x=2、最小値-1", "正答。x=1,3の値が等しく中心は2。"], ["D", "軸 x=3、最小値-1", "最小値を取るxと軸をずらしている。"]]),
    correctAnswer: "C", firstCheck: "等しい関数値をもつxの中点を見る。", conditionSummary: "$f(1)=f(3)=0$ なので対称軸は中点2。", strategy: "対称性で軸を決め、表の最小値を読む。", solution: "軸は $x=2$、最小値は $f(2)=-1$。", verification: "$x=0,4$ も対称なら同じ値3になる形で整合する。", commonMistake: "0という関数値を最小値と早合点しない。", relatedCourseIds: ["quadratic-construct-from-conditions"], reviewTags: ["値の表", "対称軸"], mistakeTags: ["表の読み違い", "頂点"], ctGuidance: { guidance: "表の中央ではなく、等しい値の組を先に探す。", discardable: "関数式を完全に求める必要はない。", reverseCheck: "選択肢の軸候補について左右の値が等しいか確認できる。", timeDecision: "式の決定に入る前に20秒で対称性を確認する。", transfer: "欠けた表の値や平行移動量を推定する問題へつながる。" },
  },

  // 図形と計量: single 3 / numeric 1 / ordering 1
  {
    id: "m1a-gm-01-special-angle",
    title: "辺の対応から三角比を選ぶ",
    area: "図形と計量", unitId: "figures-and-measurement", difficulty: "basic", internalKpd: 43,
    questionType: "single-choice", estimatedTime: 75,
    statement: r`直角三角形で、角 $A=30^\circ$、斜辺が10のとき、角Aの向かいの辺の長さを選べ。`,
    choices: choices("B", [["A", r`$5\sqrt3$`, "$\cos30^\circ$ を使って隣辺を求めている。"], ["B", "$5$", "正答。向かいの辺は斜辺×sin。"], ["C", r`$10\sqrt3$`, "比の分母を落としている。"], ["D", "$20$", "sinを割る向きにしている。"]]),
    correctAnswer: "B", firstCheck: "求める辺が角Aの向かいか隣かを見る。", conditionSummary: r`対辺/斜辺 $=\sin30^\circ=1/2$。`, strategy: "斜辺にsinを掛ける。", solution: "$10\times1/2=5$。", verification: "対辺は斜辺10より短い。", commonMistake: "sinとcosの辺対応を図で確認する。", relatedCourseIds: ["trigonometric-ratios-basic"], reviewTags: ["三角比", "30度"], mistakeTags: ["三角比対応", "辺の取り違え"],
  },
  {
    id: "m1a-gm-02-right-triangle-length",
    title: "三角比から高さを求める",
    area: "図形と計量", unitId: "figures-and-measurement", difficulty: "basic", internalKpd: 49,
    questionType: "numeric", estimatedTime: 90,
    statement: r`水平な地面上の点Pから塔の頂点を見上げた仰角が $45^\circ$、塔の根元までの水平距離が12 mである。目の高さを0 mとすると塔の高さを答えよ。`, correctAnswer: "12", acceptedAnswers: ["12", "12.0"],
    firstCheck: "高さ/水平距離に対応するtanを使う。", conditionSummary: r`$\tan45^\circ=h/12=1$。`, strategy: "測量設定を直角三角形へ置き換える。", solution: "$h=12$ m。", verification: "45度の直角三角形では2つの直角辺が等しい。", commonMistake: "斜辺を12 mと誤読しない。", distractorReasons: { "6": "tan45度を1/2としている。", "16.97": "斜辺を答えている。" }, relatedCourseIds: ["trigonometric-ratios-basic"], reviewTags: ["測量", "正接"], mistakeTags: ["辺の取り違え", "単位"],
  },
  {
    id: "m1a-gm-03-cosine-law",
    title: "余弦定理で向かいの辺を求める",
    area: "図形と計量", unitId: "figures-and-measurement", difficulty: "standard", internalKpd: 52,
    questionType: "single-choice", estimatedTime: 135,
    statement: r`三角形ABCで $AB=5, AC=7, \angle A=60^\circ$ のとき $BC$ を選べ。`,
    choices: choices("C", [["A", r`$\sqrt{109}$`, "余弦項の符号を足し算にしている。"], ["B", "$2$", "2辺の差だけを使っている。"], ["C", r`$\sqrt{39}$`, "正答。25+49-35=39。"], ["D", "$6$", "平方根を近い整数へ丸めている。"]]),
    correctAnswer: "C", firstCheck: "2辺とその間の角が与えられている。", conditionSummary: "求めるBCは角Aの向かい。", strategy: "余弦定理を辺の対応を保って使う。", solution: r`$BC^2=5^2+7^2-2\cdot5\cdot7\cdot\frac12=39$。`, verification: r`$|7-5|<\sqrt{39}<12$ で三角形の成立範囲内。`, commonMistake: "向かいの辺と角の対応、余弦項のマイナスを確認する。", relatedCourseIds: ["sine-law-cosine-law"], reviewTags: ["余弦定理", "三角形"], mistakeTags: ["定理選択", "符号ミス"],
  },
  {
    id: "m1a-gm-04-triangle-area",
    title: "2辺と挟角から面積を求める",
    area: "図形と計量", unitId: "figures-and-measurement", difficulty: "standard", internalKpd: 55,
    questionType: "single-choice", estimatedTime: 120,
    statement: r`2辺の長さが8と5、その間の角が $30^\circ$ の三角形の面積を選べ。`,
    choices: choices("A", [["A", "$10$", "正答。1/2×8×5×1/2。"], ["B", "$20$", "面積公式の1/2を落としている。"], ["C", r`$10\sqrt3$`, "sin30度とcos30度を取り違えている。"], ["D", "$40$", "長方形の面積のまま。"]]),
    correctAnswer: "A", firstCheck: "2辺と挟角なので三角比の面積公式が直接使える。", conditionSummary: r`$S=\frac12 ab\sin C$。`, strategy: "sin30度を最後に代入する。", solution: r`$S=\frac12\cdot8\cdot5\cdot\frac12=10$。`, verification: "底辺8、高さは5より小さい2.5なので面積10は妥当。", commonMistake: "1/2が公式とsin30度の2か所にある。", relatedCourseIds: ["triangle-area-with-trigonometry"], reviewTags: ["面積", "正弦"], mistakeTags: ["係数漏れ", "三角比対応"],
  },
  {
    id: "m1a-gm-05-survey-order",
    title: "測量の計算順を選ぶ",
    area: "図形と計量", unitId: "figures-and-measurement", difficulty: "common-test-prep", internalKpd: 63,
    questionType: "ordering", estimatedTime: 210,
    statement: "地点A・B間の距離と、A・Bから目標Cへの角が与えられた。ACを求める手順の並びとして適切なものを選べ。",
    choices: choices("B", [["A", "面積→余弦定理→正弦定理", "面積を先に求める情報がそろっていない。"], ["B", "残りの角Cを求める→正弦定理でAC", "正答。1辺と3角がそろう。"], ["C", "三平方の定理→正接", "直角三角形とは限らない。"], ["D", "余弦定理→面積公式", "既知の辺が1本だけなので余弦定理を開始できない。"]]),
    correctAnswer: "B", firstCheck: "既知が1辺と2角であることを見る。", conditionSummary: "内角和で3つ目の角を出せば正弦定理の比が作れる。", strategy: "与えられた情報の型から定理を選ぶ。", solution: "角C=180度-角A-角B、その後 AB/sinC=AC/sinB。", verification: "求めたい辺ACの向かいが角Bになっている。", commonMistake: "直角の記載がないのに三平方・tanへ進まない。", relatedCourseIds: ["theorem-selection-mastery", "figure-info-translation-mastery"], reviewTags: ["測量", "正弦定理"], mistakeTags: ["定理選択", "対応ミス"], ctGuidance: { guidance: "数値計算より先に、既知情報を『1辺2角』と分類する。", discardable: "図の見た目や方位の説明は定理選択には不要。", reverseCheck: "選択肢に正弦定理へ必要な向かい合う組があるかを見る。", timeDecision: "定理が決まらなければ既知の辺・角へ印を付け直す。", transfer: "2辺1角なら余弦定理か正弦定理かを判定する問題へ広げる。" },
  },

  // データの分析: single 2 / numeric 1 / multiple 1 / table 1
  {
    id: "m1a-da-01-mean-change",
    title: "平均への追加データの影響を読む",
    area: "データの分析", unitId: "data-analysis", difficulty: "basic", internalKpd: 43,
    questionType: "single-choice", estimatedTime: 90,
    statement: "4個のデータの平均が6である。値10を1個追加したとき、新しい平均を選べ。",
    choices: choices("C", [["A", "6", "追加した値が平均より大きいので平均は変わる。"], ["B", "7", "合計を31としている。"], ["C", "6.8", "正答。(24+10)/5。"], ["D", "8", "6と10の単純平均にしている。"]]),
    correctAnswer: "C", firstCheck: "元の平均から元の合計を復元する。", conditionSummary: "元の合計は4×6=24。", strategy: "合計と個数をそれぞれ更新する。", solution: "(24+10)/5=6.8。", verification: "新平均は元の6と追加値10の間にある。", commonMistake: "平均どうしを平均しない。", relatedCourseIds: ["data-analysis-what-is"], reviewTags: ["平均", "データ追加"], mistakeTags: ["合計復元", "個数"],
  },
  {
    id: "m1a-da-02-variance-basic",
    title: "偏差の二乗から分散を求める",
    area: "データの分析", unitId: "data-analysis", difficulty: "basic", internalKpd: 48,
    questionType: "numeric", estimatedTime: 105,
    statement: "データ $2,2,4,4$ の分散を答えよ。母分散としてデータ数4で割る。", correctAnswer: "1", acceptedAnswers: ["1", "1.0"],
    firstCheck: "平均を先に求める。", conditionSummary: "平均3、偏差は-1,-1,1,1。", strategy: "偏差を二乗して平均する。", solution: "(1+1+1+1)/4=1。", verification: "標準偏差は√1=1で非負。", commonMistake: "偏差の和0を分散としない。", distractorReasons: { "0": "偏差を二乗せず足している。", "4": "二乗和をデータ数で割っていない。" }, relatedCourseIds: ["variance-standard-deviation-basic"], reviewTags: ["分散", "標準偏差"], mistakeTags: ["分散と標準偏差", "割り忘れ"],
  },
  {
    id: "m1a-da-03-quartile",
    title: "並べ替えて第1四分位数を求める",
    area: "データの分析", unitId: "data-analysis", difficulty: "standard", internalKpd: 51,
    questionType: "single-choice", estimatedTime: 120,
    statement: "データ $9,2,7,4,6,5,1,8$ の第1四分位数を選べ。",
    choices: choices("B", [["A", "2", "下位4個の中央2個の平均を取っていない。"], ["B", "3", "正答。下位1,2,4,5の中央は2と4。"], ["C", "4.5", "全体の中央値。"], ["D", "6.5", "第3四分位数。"]]),
    correctAnswer: "B", firstCheck: "必ず昇順に並べ替える。", conditionSummary: "1,2,4,5,6,7,8,9の下位半分を見る。", strategy: "下位4個の中央値を取る。", solution: "(2+4)/2=3。", verification: "Q1=3<Q2=5.5<Q3=7.5。", commonMistake: "元の並び順の前半を使わない。", relatedCourseIds: ["quartiles-boxplot-basic"], reviewTags: ["四分位数", "中央値"], mistakeTags: ["並べ替え忘れ", "四分位混同"],
  },
  {
    id: "m1a-da-04-correlation-multi",
    title: "相関から言えることを選ぶ",
    area: "データの分析", unitId: "data-analysis", difficulty: "standard", internalKpd: 56,
    questionType: "multiple-select", estimatedTime: 150,
    statement: "散布図が強い正の相関を示している。ア: 一方が大きいほど他方も大きい傾向、イ: 必ず因果関係がある、ウ: 外れ値が相関係数へ影響しうる。正しい組合せを選べ。",
    choices: choices("C", [["A", "アのみ", "ウも正しい。"], ["B", "イとウ", "相関だけで因果は確定しない。"], ["C", "アとウ", "正答。傾向と外れ値の影響は言える。"], ["D", "ア・イ・ウ", "因果関係を過剰に主張している。"]]),
    correctAnswer: "C", firstCheck: "相関と因果を区別する。", conditionSummary: "散布図から読めるのは共変動の傾向。", strategy: "『必ず』『原因』を含む断定を警戒する。", solution: "アとウが正しく、イは誤り。", verification: "第三の要因が両方へ影響する例を考えればイを否定できる。", commonMistake: "相関係数が大きいことを因果の証明にしない。", relatedCourseIds: ["correlation-scatter-basic"], reviewTags: ["相関", "散布図"], mistakeTags: ["相関と因果", "外れ値"],
  },
  {
    id: "m1a-da-05-table-standardization",
    title: "表からデータ変換後の平均を判断する",
    area: "データの分析", unitId: "data-analysis", difficulty: "common-test-prep", internalKpd: 60,
    questionType: "table-reading", estimatedTime: 210,
    statement: "表の得点 $x$ を $y=2x+5$ に変換した。変換後の平均を選べ。",
    visual: { type: "table", caption: "4人の得点", headers: ["人", "P", "Q", "R", "S"], rows: [["x", "4", "6", "8", "10"]] },
    choices: choices("D", [["A", "7", "元の平均のまま。"], ["B", "14", "2倍だけで+5を忘れている。"], ["C", "17", "元の平均を6としている。"], ["D", "19", "正答。元平均7を2倍して5を足す。"]]),
    correctAnswer: "D", firstCheck: "個別変換より平均の変換則を使えるかを見る。", conditionSummary: "元の平均は(4+6+8+10)/4=7。", strategy: "全データ共通の一次変換なので平均も同じ式で変換する。", solution: "$2\times7+5=19$。", verification: "変換後13,17,21,25の平均も19。", commonMistake: "+5を各人分足した後、さらに人数で割る必要はない。", relatedCourseIds: ["data-transformation-effects"], reviewTags: ["データ変換", "平均"], mistakeTags: ["変換則", "定数項"], ctGuidance: { guidance: "表を全部計算する前に共通変換を見つける。", discardable: "各人の名前は計算に不要。", reverseCheck: "選択肢へ逆変換 $(y-5)/2$ を行い元平均7になるか見られる。", timeDecision: "平均がすぐ出なければ合計28だけ計算する。", transfer: "分散は4倍、標準偏差は2倍になる変換へつながる。" },
  },

  // 場合の数: single 2 / numeric 2 / multiple 1
  {
    id: "m1a-co-01-product-rule",
    title: "積の法則で服装の組を数える",
    area: "場合の数", unitId: "counting-probability", difficulty: "basic", internalKpd: 42,
    questionType: "single-choice", estimatedTime: 75,
    statement: "シャツ3種類とズボン4種類から1つずつ選ぶ組合せの数を選べ。",
    choices: choices("C", [["A", "7", "選択肢数を足している。"], ["B", "9", "3×3としている。"], ["C", "12", "正答。各シャツにズボン4通り。"], ["D", "24", "順序を区別して2倍している。"]]),
    correctAnswer: "C", firstCheck: "2段階を両方行う選択かを見る。", conditionSummary: "各シャツに対してズボン4通り。", strategy: "『かつ』の段階なので積の法則。", solution: "$3\times4=12$。", verification: "3行×4列の表でも12マス。", commonMistake: "和の法則と積の法則を言葉で判定する。", relatedCourseIds: ["counting-what-is"], reviewTags: ["積の法則", "場合の数"], mistakeTags: ["和積混同", "重複"],
  },
  {
    id: "m1a-co-02-permutation",
    title: "役割のある2人を選ぶ",
    area: "場合の数", unitId: "counting-probability", difficulty: "basic", internalKpd: 48,
    questionType: "numeric", estimatedTime: 90,
    statement: "4人から委員長と副委員長を1人ずつ選ぶ方法は何通りか。兼任はできない。", correctAnswer: "12", acceptedAnswers: ["12"],
    firstCheck: "2つの役割を区別する。", conditionSummary: "委員長4通り、その後副委員長3通り。", strategy: "順序のある選び方として積を取る。", solution: "$4\times3=12$。", verification: r`$_4P_2=12$ と一致。`, commonMistake: r`$_4C_2=6$ として役割を無視しない。`, distractorReasons: { "6": "役割を区別していない。", "16": "同じ人の兼任を含めている。" }, relatedCourseIds: ["permutation-combination-basic"], reviewTags: ["順列", "役割"], mistakeTags: ["順序の有無", "重複"],
  },
  {
    id: "m1a-co-03-combination",
    title: "順序を区別しない選び方",
    area: "場合の数", unitId: "counting-probability", difficulty: "standard", internalKpd: 51,
    questionType: "single-choice", estimatedTime: 105,
    statement: "異なる6冊の本から2冊を選ぶ方法の数を選べ。並べる順序は区別しない。",
    choices: choices("B", [["A", "12", "6×2としている。"], ["B", "15", "正答。6C2。"], ["C", "30", "選ぶ順序を区別している。"], ["D", "36", "同じ本を2回選ぶ場合を含む。"]]),
    correctAnswer: "B", firstCheck: "『選ぶ』だけで順序を区別しない。", conditionSummary: "6冊から異なる2冊。", strategy: "組合せ $6C2$ を使う。", solution: "$6\times5/2=15$。", verification: "全30順列を2!で割る。", commonMistake: "順列30のままにしない。", relatedCourseIds: ["permutation-combination-basic"], reviewTags: ["組合せ", "選択"], mistakeTags: ["順序の有無", "階乗"],
  },
  {
    id: "m1a-co-04-nonadjacent",
    title: "隣り合う場合を除いて数える",
    area: "場合の数", unitId: "counting-probability", difficulty: "standard", internalKpd: 56,
    questionType: "numeric", estimatedTime: 150,
    statement: "A,B,C,Dの4人を1列に並べる。AとBが隣り合わない並べ方は何通りか。", correctAnswer: "12", acceptedAnswers: ["12"],
    firstCheck: "直接数えるより全体から隣り合う場合を引く。", conditionSummary: "全体24通り。ABを1ブロックとすると3!×2通り。", strategy: "余事象的な数え方で重複を避ける。", solution: "$24-3!\times2=24-12=12$。", verification: "隣り合う/隣り合わないが対称的に12ずつ。", commonMistake: "ABとBAの2通りを掛け忘れない。", distractorReasons: { "18": "ブロック内の順序を一部だけ数えている。", "24": "条件を引いていない。" }, relatedCourseIds: ["casework-and-double-counting"], reviewTags: ["隣接", "余事象"], mistakeTags: ["引き忘れ", "ブロック順列"],
  },
  {
    id: "m1a-co-05-method-multi",
    title: "数え方の方針を比較する",
    area: "場合の数", unitId: "counting-probability", difficulty: "common-test-prep", internalKpd: 61,
    questionType: "multiple-select", estimatedTime: 210,
    statement: "0,1,2,3から異なる3個を使って3桁の整数を作る。ア: 全順列から先頭0を引く、イ: 百の位を1,2,3から選び残りを並べる、ウ: 4C3だけで求める。正しい方針の組合せを選べ。",
    choices: choices("B", [["A", "アのみ", "イも重複なく数えられる。"], ["B", "アとイ", "正答。どちらも12通りになる。"], ["C", "イとウ", "ウは並び順を数えていない。"], ["D", "ア・イ・ウ", "ウが不十分。"]]),
    correctAnswer: "B", firstCheck: "先頭0禁止と、順序を区別する条件を見る。", conditionSummary: "全体4P3=24、先頭0は3P2=6なので18通り。別法は3×3P2=18。", strategy: "各方針が漏れ・重複なく同じ対象を数えるか比較する。", solution: "アとイが正しく、ウは使用数字の選択しか数えない。", verification: "2つの正しい方法がともに18になる。", commonMistake: "組合せで数字を選んだ後の並べ方を忘れない。", relatedCourseIds: ["advanced-counting-techniques"], reviewTags: ["数え方", "先頭0"], mistakeTags: ["場合の重複", "順序の有無"], ctGuidance: { guidance: "答えより先に各方針の数え漏れを読む。", discardable: "実際の整数をすべて列挙する必要はない。", reverseCheck: "各方針の式が同じ18になるかで選択肢を確認できる。", timeDecision: "1分で比較できなければ百の位からの積の法則へ切り替える。", transfer: "重複あり、偶数条件、桁和条件の整数作成へ広げる。" },
  },

  // 確率: single 3 / numeric 1 / multiple 1
  {
    id: "m1a-pr-01-sample-space",
    title: "標本空間から事象を数える",
    area: "確率", unitId: "counting-probability", difficulty: "basic", internalKpd: 43,
    questionType: "single-choice", estimatedTime: 75,
    statement: "1個の公平なさいころを投げるとき、出る目が4以上である確率を選べ。",
    choices: choices("B", [["A", "1/6", "4だけを数えている。"], ["B", "1/2", "正答。4,5,6の3通り。"], ["C", "2/3", "2以上の事象と混同。"], ["D", "3/4", "標本空間を4通りとしている。"]]),
    correctAnswer: "B", firstCheck: "全結果6通りと有利な目を列挙する。", conditionSummary: "有利な目は4,5,6の3通り。", strategy: "同様に確からしいので有利/全体。", solution: "$3/6=1/2$。", verification: "4以上と3以下が3通りずつで対称。", commonMistake: "『以上』に4を含める。", relatedCourseIds: ["probability-meaning-basic"], reviewTags: ["標本空間", "さいころ"], mistakeTags: ["以上以下", "分母"],
  },
  {
    id: "m1a-pr-02-complement",
    title: "余事象から少なくとも1回を求める",
    area: "確率", unitId: "counting-probability", difficulty: "basic", internalKpd: 49,
    questionType: "numeric", estimatedTime: 105,
    statement: "公平な硬貨を2回投げる。少なくとも1回表が出る確率を小数で答えよ。", correctAnswer: "0.75", acceptedAnswers: ["0.75", ".75"],
    firstCheck: "『少なくとも1回』は0回の余事象。", conditionSummary: "表0回は裏裏だけで確率1/4。", strategy: "1から0回の確率を引く。", solution: "$1-1/4=3/4=0.75$。", verification: "表裏,裏表,表表の3/4通り。", commonMistake: "1回だけ表の確率1/2で止めない。", distractorReasons: { "0.5": "ちょうど1回だけを数えている。", "0.25": "余事象をそのまま答えている。" }, relatedCourseIds: ["complement-and-repeated-trials"], reviewTags: ["余事象", "反復試行"], mistakeTags: ["余事象の引き忘れ", "少なくとも"],
  },
  {
    id: "m1a-pr-03-independence",
    title: "独立な事象の積を使う",
    area: "確率", unitId: "counting-probability", difficulty: "standard", internalKpd: 52,
    questionType: "single-choice", estimatedTime: 120,
    statement: "独立な事象A,Bについて $P(A)=0.4, P(B)=0.5$ のとき $P(A\cap B)$ を選べ。",
    choices: choices("A", [["A", "0.20", "正答。独立なので積。"], ["B", "0.45", "2確率の平均。"], ["C", "0.90", "和を取っている。"], ["D", "0.10", "積からさらに引いている。"]]),
    correctAnswer: "A", firstCheck: "独立という条件が積の公式を許す。", conditionSummary: r`$P(A\cap B)=P(A)P(B)$。`, strategy: "同時に起こる確率なので積。", solution: "$0.4\times0.5=0.20$。", verification: "共通部分の確率は各事象の確率以下。", commonMistake: "排反の和の公式と独立の積を混同しない。", relatedCourseIds: ["probability-meaning-basic"], reviewTags: ["独立", "積事象"], mistakeTags: ["独立と排反", "公式選択"],
  },
  {
    id: "m1a-pr-04-conditional",
    title: "条件付き確率から積事象を戻す",
    area: "確率", unitId: "counting-probability", difficulty: "standard", internalKpd: 56,
    questionType: "single-choice", estimatedTime: 135,
    statement: "$P(A)=0.5, P(B\mid A)=0.4$ のとき $P(A\cap B)$ を選べ。",
    choices: choices("C", [["A", "0.9", "2つの確率を足している。"], ["B", "0.4", "条件付き確率をそのまま答えている。"], ["C", "0.2", "正答。0.5×0.4。"], ["D", "0.1", "不要な2で割っている。"]]),
    correctAnswer: "C", firstCheck: "条件付き確率の分母がAである。", conditionSummary: r`$P(B|A)=P(A\cap B)/P(A)$。`, strategy: "両辺に $P(A)$ を掛けて積事象を戻す。", solution: "$0.4\times0.5=0.2$。", verification: "$0.2/0.5=0.4$ に戻る。", commonMistake: "独立とは書かれていないので $P(B)$ と読み替えない。", relatedCourseIds: ["conditional-probability-basic"], reviewTags: ["条件付き確率", "積事象"], mistakeTags: ["分母更新", "独立の誤認"],
  },
  {
    id: "m1a-pr-05-expectation-multi",
    title: "確率分布と期待値の記述を選ぶ",
    area: "確率", unitId: "counting-probability", difficulty: "common-test-prep", internalKpd: 62,
    questionType: "multiple-select", estimatedTime: 210,
    statement: "得点Xが0点を確率0.5、2点を確率0.3、5点を確率0.2で取る。ア: 確率の和は1、イ: 期待値は1.6、ウ: 最も起こりやすい得点は2点。正しい組合せを選べ。",
    choices: choices("B", [["A", "アのみ", "イも $0+0.6+1.0=1.6$ で正しい。"], ["B", "アとイ", "正答。ウは0点が最頻。"], ["C", "イとウ", "ウが誤りで、アは確率分布の条件。"], ["D", "ア・イ・ウ", "確率0.5の0点が最も起こりやすい。"]]),
    correctAnswer: "B", firstCheck: "確率の和、期待値、最頻値を別々に判定する。", conditionSummary: "期待値は値×確率の総和。", strategy: "3記述を独立に計算してから組合せる。", solution: "和1、期待値1.6、最大確率は0点の0.5。", verification: "期待値1.6は最小0と最大5の間。", commonMistake: "期待値と最も起こりやすい値を同じものと考えない。", relatedCourseIds: ["probability-meaning-basic", "counting-probability-exam-standard"], reviewTags: ["期待値", "確率分布"], mistakeTags: ["期待値計算", "最頻値混同"], ctGuidance: { guidance: "文章の3主張を一括判定せず、チェック欄を分ける。", discardable: "ゲームの背景設定がなくても分布だけで解ける。", reverseCheck: "選択肢に共通する記述から先に真偽を決める。", timeDecision: "期待値計算を30秒で終え、残りは確率の大小比較にする。", transfer: "料金・得点・利益の期待値比較へ広げる。" },
  },

  // 図形の性質: single 4 / ordering 1
  {
    id: "m1a-gp-01-incenter",
    title: "三角形の心と性質を対応させる",
    area: "図形の性質", unitId: "geometry-properties", difficulty: "basic", internalKpd: 42,
    questionType: "single-choice", estimatedTime: 75,
    statement: "三角形の3つの内角の二等分線の交点を選べ。",
    choices: choices("B", [["A", "外心", "垂直二等分線の交点。"], ["B", "内心", "正答。内接円の中心でもある。"], ["C", "重心", "3本の中線の交点。"], ["D", "垂心", "3本の高さの交点。"]]),
    correctAnswer: "B", firstCheck: "交わる3本の線の種類を見る。", conditionSummary: "内角の二等分線。", strategy: "五心を定義で対応させる。", solution: "内心。", verification: "内心から3辺への距離は等しい。", commonMistake: "辺の垂直二等分線の外心と混同しない。", relatedCourseIds: ["geometry-properties-triangle-centers"], reviewTags: ["五心", "内心"], mistakeTags: ["五心混同", "線の種類"],
  },
  {
    id: "m1a-gp-02-angle-bisector",
    title: "角の二等分線の比を使う",
    area: "図形の性質", unitId: "geometry-properties", difficulty: "basic", internalKpd: 48,
    questionType: "single-choice", estimatedTime: 90,
    statement: "三角形ABCで、Aの内角の二等分線がBCとDで交わる。AB=6, AC=9のとき BD:DC を選べ。",
    choices: choices("C", [["A", "1:1", "角を二等分しても対辺を等分するとは限らない。"], ["B", "3:2", "対応を逆にしている。"], ["C", "2:3", "正答。BD:DC=AB:AC。"], ["D", "4:9", "辺の長さを二乗している。"]]),
    correctAnswer: "C", firstCheck: "内角二等分線なので両隣の辺の比を使う。", conditionSummary: "$BD:DC=AB:AC$。", strategy: "対応順を図の頂点順でそろえる。", solution: "$6:9=2:3$。", verification: "ACの方が長いので対応するDCもBDより長い。", commonMistake: "比を逆にしない。", relatedCourseIds: ["geometry-properties-triangle-centers"], reviewTags: ["角の二等分線", "比"], mistakeTags: ["対応ミス", "図の見た目"],
  },
  {
    id: "m1a-gp-03-cyclic-angle",
    title: "内接四角形の対角を使う",
    area: "図形の性質", unitId: "geometry-properties", difficulty: "standard", internalKpd: 52,
    questionType: "single-choice", estimatedTime: 105,
    statement: "円に内接する四角形ABCDで $\angle A=72^\circ$ のとき $\angle C$ を選べ。",
    choices: choices("D", [["A", "$72^\circ$", "同じ弧を見る円周角と混同。"], ["B", "$36^\circ$", "半分にしている。"], ["C", "$252^\circ$", "内角の範囲を超える。"], ["D", "$108^\circ$", "正答。対角の和は180度。"]]),
    correctAnswer: "D", firstCheck: "円に内接する四角形の対角である。", conditionSummary: "$\angle A+\angle C=180^\circ$。", strategy: "補角の関係を使う。", solution: "$180-72=108^\circ$。", verification: "72+108=180。", commonMistake: "向かい合う角と隣り合う角を取り違えない。", relatedCourseIds: ["geometry-properties-cyclic-quadrilateral"], reviewTags: ["内接四角形", "円周角"], mistakeTags: ["対角", "補角"],
  },
  {
    id: "m1a-gp-04-power-tangent",
    title: "接線と割線の方べきを使う",
    area: "図形の性質", unitId: "geometry-properties", difficulty: "standard", internalKpd: 57,
    questionType: "single-choice", estimatedTime: 150,
    statement: "円の外部の点Pから引いた接線の接点をT、割線が円と近い順にA,Bで交わる。PA=4, PB=9のとき PT を選べ。",
    choices: choices("B", [["A", "3", "4と9の差を長さとしている。"], ["B", "6", "正答。PT²=4×9。"], ["C", "13", "PA+PBを取っている。"], ["D", "36", "PT²をそのまま長さとしている。"]]),
    correctAnswer: "B", firstCheck: "接線と割線が同じ外部点Pから出ている。", conditionSummary: r`$PT^2=PA\cdot PB$。`, strategy: "方べきで長さの積を対応させる。", solution: r`$PT^2=36$、長さなので $PT=6$。`, verification: "平方根の負の値は長さとして採用しない。", commonMistake: "PBは円の中の部分ABではなくPから遠い交点まで。", relatedCourseIds: ["geometry-properties-power-of-a-point"], reviewTags: ["方べき", "接線"], mistakeTags: ["線分対応", "平方根の正負"],
  },
  {
    id: "m1a-gp-05-ceva-order",
    title: "チェバの定理の比を順序よく配置する",
    area: "図形の性質", unitId: "geometry-properties", difficulty: "common-test-prep", internalKpd: 64,
    questionType: "ordering", estimatedTime: 210,
    statement: "三角形ABCの辺BC,CA,AB上にD,E,Fがあり、AD,BE,CFが1点で交わる。チェバの定理を使う比の積として正しいものを選べ。",
    choices: choices("C", [["A", "$BD/DC\cdot CE/EA\cdot BF/FA=1$", "最後の比だけ辺AB上の向きがつながらない。"], ["B", "$DC/BD\cdot CE/EA\cdot AF/FB=1$", "最初だけ逆向き。"], ["C", "$BD/DC\cdot CE/EA\cdot AF/FB=1$", "正答。B→C→A→Bと循環する。"], ["D", "$BD/DC+CE/EA+AF/FB=1$", "チェバは和ではなく積。"]]),
    correctAnswer: "C", firstCheck: "3本が1点で交わるのでチェバを選ぶ。", conditionSummary: "各辺を同じ向きに循環する比でつなぐ。", strategy: "B→C、C→A、A→Bの順で分子・分母を書く。", solution: r`$\frac{BD}{DC}\frac{CE}{EA}\frac{AF}{FB}=1$。`, verification: "各頂点文字B,C,Aが分子・分母に1回ずつ現れる。", commonMistake: "1つの比だけ逆にする、またはメネラウスの一直線条件と混同する。", relatedCourseIds: ["geometry-properties-ceva-menelaus"], reviewTags: ["チェバ", "比"], mistakeTags: ["比の向き", "定理混同"], ctGuidance: { guidance: "交点条件から定理を決め、文字を循環順に追う。", discardable: "図の線分の実際の長さは不要。", reverseCheck: "各文字が分子・分母に同数現れる選択肢を先に残せる。", timeDecision: "比の向きで迷ったら頂点Bから一周して書き直す。", transfer: "3点が一直線ならメネラウスへ切り替える判断につながる。" },
  },
];

export const MATH_1A_UNIT_PRACTICE_PROBLEMS: readonly Problem[] = drafts.map(makeProblem);

export function getNextMathUnitPracticeProblem(problemId: string): Problem | undefined {
  const index = MATH_1A_UNIT_PRACTICE_PROBLEMS.findIndex((problem) => problem.slug === problemId);
  if (index < 0) return undefined;
  const currentArea = MATH_1A_UNIT_PRACTICE_PROBLEMS[index].unitPractice?.practiceArea;
  return MATH_1A_UNIT_PRACTICE_PROBLEMS.slice(index + 1).find(
    (problem) => problem.unitPractice?.practiceArea === currentArea,
  );
}
