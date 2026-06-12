// ── 共通テスト型ドリル問題データ ──────────────────────────────────────────
// COMMON TEST COMMAND CENTER — Phase 2
// オリジナル問題のみ。公式過去問の転載なし。

import type { CommonTestSubjectId } from "@/data/common-test";
export type { CommonTestSubjectId };

export type CommonTestQuestionType =
  | "single-choice"
  | "multiple-choice"
  | "blank-number"
  | "mark-combination"
  | "information-match";

export type CommonTestAnswerFormat = "choice" | "number" | "digits" | "text";

export interface CommonTestDigitSlot {
  label: string;
  length: number;
  allowNegative?: boolean;
  allowDecimal?: boolean;
}

export interface CommonTestSharedData {
  title?: string;
  headers?: string[];
  rows?: string[][];
  notes?: string[];
}

export type CommonTestSkillTag =
  | "誘導読解"
  | "条件整理"
  | "計算処理"
  | "データ読み取り"
  | "図表読解"
  | "情報照合"
  | "時間配分"
  | "選択肢消去"
  | "会話文"
  | "数式変形"
  | "英語スキャニング"
  | "要旨把握"
  | "時系列整理"
  | "レポート完成";

export interface CommonTestDrillQuestion {
  id: string;
  subjectId: CommonTestSubjectId;
  sectionId: string;
  title: string;
  passage?: string;
  context?: string;
  examPassage?: string;
  examContext?: string;
  sharedStem?: string;
  sharedData?: CommonTestSharedData;
  subQuestionIndex?: number;
  difficultyStage?: "basic" | "standard" | "guided" | "advanced";
  dependsOnPrevious?: boolean;
  statement: string;
  type: CommonTestQuestionType;
  options?: string[];
  correctAnswer: string | string[];
  markLabels?: string[];
  answerFormat?: CommonTestAnswerFormat;
  digitSlots?: CommonTestDigitSlot[];
  explanation: string;
  strategy: string;
  trapExplanation?: string;
  estimatedMinutes: number;
  difficulty: "BASIC" | "STANDARD" | "HARD";
  skillTags: CommonTestSkillTag[];
  /** 個別配点（未設定の場合は大問配点を均等割り） */
  questionScore?: number;
  /** 「問1」「問2」などの設問ラベル */
  subQuestionLabel?: string;
  /** マークシート欄ラベル（例: "[ ア ]"） */
  marksheetLabel?: string;
  /** 出題形式の様式（例: "会話文" "資料読み取り"） */
  sourceStyle?: string;
  /** 資料の種類（例: "poster" "email" "graph"） */
  stimulusType?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 問題データ
// ═══════════════════════════════════════════════════════════════════════════

export const COMMON_TEST_DRILL_QUESTIONS: CommonTestDrillQuestion[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // 数学IA
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ct-m1a-s1-q1",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "集合と命題 — 補集合の要素の個数",
    statement:
      "全体集合 $U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}$ において、$A = \\{n \\in U \\mid n \\text{ は 2 の倍数}\\}$、$B = \\{n \\in U \\mid n \\text{ は 3 の倍数}\\}$ とする。$\\overline{A \\cap B}$ の要素の個数を求めよ。",
    type: "single-choice",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9",
    markLabels: ["ア"],
    answerFormat: "number",
    explanation:
      "$A = \\{2, 4, 6, 8, 10\\}$（2の倍数）、$B = \\{3, 6, 9\\}$（3の倍数）。よって $A \\cap B = \\{6\\}$（2かつ3の倍数、すなわち6の倍数）。$\\overline{A \\cap B}$ は全体集合から $A \\cap B$ を除いた集合なので、$n(\\overline{A \\cap B}) = 10 - 1 = 9$。",
    strategy:
      "まず $A \\cap B$ を具体的に列挙する（30秒以内）。ド・モルガンの法則を使っても解けるが、この問題は直接列挙が最速。補集合の個数 = 全体 − 元の集合の個数 を確認。目安は2分以内。",
    trapExplanation:
      "$A \\cup B$ と $A \\cap B$ を混同しやすい。$\\cap$（共通部分）を $\\cup$（和集合）と読み間違えると全く別の答えになる。問題文の記号を必ず確認すること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "選択肢消去"],
  },

  {
    id: "ct-m1a-s1-q2",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "図形と計量 — 弦の長さ",
    statement:
      "半径 5 の円において、円の中心 $O$ から弦 $PQ$ への距離が 3 であるとき、弦 $PQ$ の長さを求めよ。",
    type: "single-choice",
    options: ["6", "7", "8", "10"],
    correctAnswer: "8",
    answerFormat: "digits",
    digitSlots: [{ label: "ア", length: 1 }],
    explanation:
      "円の中心 $O$ から弦 $PQ$ への垂線の足を $M$ とすると、$OM = 3$、$OP = 5$（半径）。直角三角形 $OMP$ において、$PM = \\sqrt{OP^2 - OM^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$。よって $PQ = 2PM = 8$。",
    strategy:
      "「中心から弦への距離 → 弦の半分の長さ → ピタゴラスの定理」という流れを自動化する。図を描かずに公式 $PM = \\sqrt{r^2 - d^2}$ で処理できると速い。1分30秒以内が目標。",
    trapExplanation:
      "$PM$ を求めて答えとしてしまう誤答（$PM = 4$）が最も多い。$PQ = 2PM$ という最後の2倍を忘れないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m1a-s1-q3",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "命題 — 必要条件と十分条件",
    context:
      "太郎さんと花子さんが、実数 $x$ についての2つの条件 $p$ : $x^2 = 4$ と $q$ : $x = 2$ の関係について話している。\n\n太郎：$x = 2$ なら $x^2 = 4$ は必ず成り立つよね。\n花子：でも $x^2 = 4$ だからといって $x = 2$ とは限らないよ。$x = -2$ の場合もあるから。",
    statement:
      "2人の会話をもとに考えると、条件 $p$ : $x^2 = 4$ は、条件 $q$ : $x = 2$ であるための何にあたるか。最も適切なものを選べ。",
    type: "single-choice",
    options: [
      "必要条件であるが、十分条件ではない",
      "十分条件であるが、必要条件ではない",
      "必要十分条件である",
      "必要条件でも十分条件でもない",
    ],
    correctAnswer: "必要条件であるが、十分条件ではない",
    explanation:
      "$q \\Rightarrow p$（$x = 2$ ならば $x^2 = 4$）は真なので、$p$ は $q$ であるための必要条件。一方 $p \\Rightarrow q$（$x^2 = 4$ ならば $x = 2$）は $x = -2$ が反例となり偽なので、$p$ は $q$ の十分条件ではない。よって「必要条件であるが、十分条件ではない」が正しい。",
    strategy:
      "「$p$ は $q$ であるための◯◯条件」と問われたら、矢印を2本書く：$q \\Rightarrow p$ が真なら $p$ は必要条件、$p \\Rightarrow q$ が真なら $p$ は十分条件。会話文に反例（$x = -2$）のヒントが含まれていることが多いので、誘導を素直に使う。2分以内。",
    trapExplanation:
      "「必要」と「十分」の向きを逆に覚えていると正反対の選択肢を選んでしまう。「ならば矢印の先（結論側）が必要条件」と機械的に確認すること。主語が $p$ か $q$ かの読み違いにも注意。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["会話文", "条件整理", "誘導読解"],
    sourceStyle: "会話文",
  },

  {
    id: "ct-m1a-s1-q4",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "図形と計量 — 仰角から木の高さを求める",
    context:
      "図書委員会の活動で、校庭にある木の高さを測ることになった。巻き尺と角度測定器を使い、木の根もとと同じ高さの地点から先端を見上げる角度（仰角）を2か所で測定した。",
    statement:
      "地点 $A$ から木の先端を見上げると仰角は $30°$ であった。$A$ から木に向かってまっすぐ $20$ m 近づいた地点 $B$ では、仰角は $45°$ であった。木の高さを求めよ。ただし、目の高さは考えないものとする。",
    type: "single-choice",
    options: [
      "$10(\\sqrt{3}+1)$ m",
      "$10(\\sqrt{3}-1)$ m",
      "$20(\\sqrt{3}-1)$ m",
      "$\\dfrac{20\\sqrt{3}}{3}$ m",
    ],
    correctAnswer: "$10(\\sqrt{3}+1)$ m",
    explanation:
      "木の高さを $h$ とする。地点 $B$ では仰角 $45°$ なので、$B$ から木までの距離は $h$。地点 $A$ では仰角 $30°$ なので、$A$ から木までの距離は $\\dfrac{h}{\\tan 30°} = \\sqrt{3}\\,h$。$A$ と $B$ の距離が $20$ m だから $\\sqrt{3}\\,h - h = 20$。よって $h = \\dfrac{20}{\\sqrt{3}-1} = \\dfrac{20(\\sqrt{3}+1)}{(\\sqrt{3}-1)(\\sqrt{3}+1)} = \\dfrac{20(\\sqrt{3}+1)}{2} = 10(\\sqrt{3}+1)$ m。",
    strategy:
      "仰角の問題は必ず直角三角形の図を描く。$45°$ なら「距離 = 高さ」、$30°$ なら「距離 = $\\sqrt{3} \\times$ 高さ」と即座に変換し、2地点の距離の差で方程式を立てる。分母の有理化まで含めて4分以内が目標。",
    trapExplanation:
      "$\\tan 30° = \\dfrac{1}{\\sqrt{3}}$ と $\\tan 60° = \\sqrt{3}$ を取り違えると距離の式が逆になる。また、有理化のときに分母 $(\\sqrt{3}-1)(\\sqrt{3}+1) = 2$ を $3-1=2$ と正しく処理できているか確認すること。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "計算処理", "数式変形"],
    sourceStyle: "日常場面",
  },

  {
    id: "ct-m1a-s2-q1",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "データの分析 — 分散の計算",
    statement:
      "5 人の小テストの点数が 4, 8, 10, 6, 12 であるとき、この得点の分散を求めよ。",
    type: "single-choice",
    options: ["6.4", "7.0", "8.0", "9.6"],
    correctAnswer: "8",
    markLabels: ["ア"],
    answerFormat: "number",
    explanation:
      "平均 $\\bar{x} = (4+8+10+6+12)/5 = 40/5 = 8$。偏差の2乗の合計：$(4-8)^2 + (8-8)^2 + (10-8)^2 + (6-8)^2 + (12-8)^2 = 16+0+4+4+16 = 40$。分散 $= 40/5 = 8$。",
    strategy:
      "手順を固定する：①平均を計算 ②各データから平均を引く ③2乗して合計 ④データ数で割る。計算は整数が多いので丁寧に。2分以内が目標。暗算で偏差の2乗を処理できれば時間短縮できる。",
    trapExplanation:
      "標準偏差（$\\sqrt{分散}$）と分散を混同しないこと。また「偏差」（平均との差）を2乗せずに合計する誤り（$= 0$になる）にも注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["計算処理", "データ読み取り"],
  },

  {
    id: "ct-m1a-s2-q2",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "2次関数 — 最小値の場合分け",
    statement:
      "$f(x) = x^2 - 4x + 5$ の $0 \\leq x \\leq a$（$a > 0$）における最小値を求めよ。ただし $a = 3$ の場合を答えよ。",
    type: "single-choice",
    options: ["1", "2", "4", "5"],
    correctAnswer: "1",
    explanation:
      "$f(x) = (x-2)^2 + 1$。頂点は $(2, 1)$。$a = 3$ のとき定義域 $0 \\leq x \\leq 3$ に頂点 $x = 2$ が含まれるので、最小値は頂点の値 $f(2) = 1$。",
    strategy:
      "まず平方完成して頂点を確認（必須）。次に頂点が定義域に含まれるかを即座に判断。共通テストでは $a$ が変わるたびに場合分けが問われるが、今は $a=3$ の具体値なので判断は1ステップ。頂点確認 → 含まれる/含まれない → 最小値の場所を決定、で2分。",
    trapExplanation:
      "区間の右端 $f(3) = 9 - 12 + 5 = 2$ を最小値と間違える。定義域に頂点が入っているかを必ず確認すること。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "条件整理"],
  },

  {
    id: "ct-m1a-s2-q3",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "データの分析 — 箱ひげ図から確実に言えること",
    context:
      "ある高校の1年生40人が受けた数学のテスト（100点満点）の得点を箱ひげ図にまとめたところ、次の値が読み取れた。\n\n最小値: 35点 ／ 第1四分位数: 48点 ／ 中央値: 56点 ／ 第3四分位数: 70点 ／ 最大値: 92点",
    statement:
      "この箱ひげ図から確実に正しいと言えるものを、次のうちから一つ選べ。",
    type: "single-choice",
    options: [
      "平均点は56点である",
      "四分位範囲は22点である",
      "半数以上の生徒が60点以上である",
      "最高点と最低点の差は50点である",
    ],
    correctAnswer: "四分位範囲は22点である",
    explanation:
      "四分位範囲 = 第3四分位数 − 第1四分位数 = $70 - 48 = 22$ 点。これは確実に正しい。「平均点は56点」は誤り（56点は中央値であり、平均値は箱ひげ図からは分からない）。「半数以上が60点以上」も誤り（中央値が56点なので、半数の生徒は56点以下）。「最高点と最低点の差」（範囲）は $92 - 35 = 57$ 点であり、50点ではない。",
    strategy:
      "箱ひげ図の問題は「確実に言えること」と「言えそうで言えないこと」の区別が核心。平均値・各データの個数・分布の形は箱ひげ図からは原則分からない。四分位範囲・範囲・中央値の位置だけが確実に読み取れる。各選択肢を1つずつ検証して3分以内。",
    trapExplanation:
      "中央値と平均値の混同が最頻出のワナ。箱の真ん中の線は「中央値」であって平均値ではない。また「範囲（レンジ）」と「四分位範囲」の取り違えにも注意。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "選択肢消去", "条件整理"],
    stimulusType: "boxplot",
  },

  {
    id: "ct-m1a-s2-q4",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "2次関数 — グラフの平行移動",
    statement:
      "放物線 $y = x^2 - 2x + 3$ を、$x$ 軸方向に $2$、$y$ 軸方向に $-1$ だけ平行移動して得られる放物線の方程式を求めよ。",
    type: "single-choice",
    options: [
      "$y = x^2 - 6x + 10$",
      "$y = x^2 - 6x + 8$",
      "$y = x^2 + 2x + 2$",
      "$y = x^2 - 2x + 2$",
    ],
    correctAnswer: "$y = x^2 - 6x + 10$",
    explanation:
      "$y = x^2 - 2x + 3 = (x-1)^2 + 2$ より頂点は $(1,\\ 2)$。$x$ 軸方向に $2$、$y$ 軸方向に $-1$ 移動すると頂点は $(3,\\ 1)$ になる。よって $y = (x-3)^2 + 1 = x^2 - 6x + 9 + 1 = x^2 - 6x + 10$。",
    strategy:
      "平行移動は「頂点の移動」で処理するのが最速：①平方完成して頂点を出す ②頂点を移動する ③頂点形式から展開する。公式（$x$ を $x-p$ に置き換える）でも解けるが、符号ミスが起きやすいので頂点方式を推奨。3分以内。",
    trapExplanation:
      "置き換え公式を使う場合、$x$ 軸方向に $+2$ の移動は「$x$ を $x-2$ に置き換える」こと。$x+2$ を代入してしまう符号の取り違えが最も多い誤り。頂点の移動で検算すると確実。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m1a-s3-q1",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 — メネラウスの定理",
    statement:
      "三角形 $ABC$ において、辺 $BC$ 上に点 $D$、辺 $CA$ の延長上に点 $E$ があり、$BD:DC = 1:2$、$CE:EA = 1:3$ とする。直線 $DE$ と辺 $AB$ の延長との交点を $F$ とするとき、$BF:FA$ を求めよ。",
    type: "single-choice",
    options: ["1:2", "2:3", "3:4", "1:6"],
    correctAnswer: "1:6",
    explanation:
      "メネラウスの定理を三角形 $ABC$ と直線 $DEF$ に適用する。$\\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} \\cdot \\dfrac{AF}{FB} = 1$（各比は「通過する辺の比」）。$\\dfrac{1}{2} \\cdot \\dfrac{1}{3} \\cdot \\dfrac{AF}{FB} = 1$ より $\\dfrac{AF}{FB} = 6$、すなわち $BF:FA = 1:6$。",
    strategy:
      "メネラウスは「3辺の比の積 = 1」。まず図を描いて直線が三角形の3辺（または延長）をどの順で横切るかを確認。記号の向き（内分・外分）に気をつけて定理を適用。3分以内に完答できるよう練習する。",
    trapExplanation:
      "チェバの定理（三角形の3頂点から対辺への線が1点で交わる）と混同する。メネラウスは「横切る直線」に適用し、チェバは「内部の点」に適用する。問題文で確認すること。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形"],
  },

  {
    id: "ct-m1a-s3-q2",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 — 方べきの定理と接線",
    statement:
      "円の外部の点 $P$ から円に2本の直線を引く。1本は円と2点 $A$, $B$ で交わり、$PA = 4$、$PB = 9$ である（$A$ は $P$ に近い方の交点）。もう1本は円と点 $T$ で接している。接線の長さ $PT$ を求めよ。",
    type: "single-choice",
    options: ["$6$", "$\\sqrt{13}$", "$\\dfrac{13}{2}$", "$13$"],
    correctAnswer: "$6$",
    explanation:
      "方べきの定理より、円外の点 $P$ から引いた割線と接線について $PT^2 = PA \\times PB$ が成り立つ。$PT^2 = 4 \\times 9 = 36$ なので $PT = 6$。",
    strategy:
      "「円外の点から接線と割線」と読んだ瞬間に方べきの定理 $PT^2 = PA \\times PB$ を適用する。数値が $4 \\times 9 = 36 = 6^2$ のようにきれいになるのが共通テストの特徴なので、平方数にならなければ計算ミスを疑う。2分以内。",
    trapExplanation:
      "$PT^2 = PA \\times AB$ のように、$P$ からの距離ではなく弦の長さ $AB$ を掛けてしまう誤りが多い。方べきの定理は「$P$ から各交点までの距離の積」であることを確認。$PT = \\sqrt{36}$ の後、$36$ をそのまま答えにしないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m1a-s3-q3",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 — 円に内接する四角形",
    statement:
      "四角形 $ABCD$ は円に内接しており、$\\angle BAD = 75°$ である。このとき $\\angle BCD$ の大きさを求めよ。",
    type: "single-choice",
    options: ["$75°$", "$95°$", "$105°$", "$115°$"],
    correctAnswer: "$105°$",
    explanation:
      "円に内接する四角形では、向かい合う内角の和は $180°$ になる。$\\angle BAD + \\angle BCD = 180°$ より $\\angle BCD = 180° - 75° = 105°$。",
    strategy:
      "「円に内接する四角形」と読んだら反射的に「対角の和 $= 180°$」。この性質は単独でも問われるが、本番では後続の設問（円周角や接弦定理との組合せ）の入り口になることが多い。30秒〜1分で確実に取る。",
    trapExplanation:
      "「隣り合う角」と「向かい合う角」の取り違えに注意。$\\angle BAD$ の対角は $\\angle BCD$（頂点 $A$ と $C$ が向かい合う）。図を描かずに記号だけで処理すると対応を誤りやすい。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },

  {
    id: "ct-m1a-s3-q4",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 — 内心と角の大きさ",
    context:
      "太郎さんと花子さんが、三角形の内心の性質について話している。\n\n太郎：内心は3つの内角の二等分線が交わる点だったよね。\n花子：ということは、内心 $I$ と2つの頂点を結んでできる角は、もとの三角形の角で表せそうだね。",
    statement:
      "三角形 $ABC$ において $\\angle A = 80°$ とし、内心を $I$ とする。このとき $\\angle BIC$ の大きさを求めよ。",
    type: "single-choice",
    options: ["$100°$", "$115°$", "$130°$", "$140°$"],
    correctAnswer: "$130°$",
    explanation:
      "$\\angle B + \\angle C = 180° - 80° = 100°$。$I$ は内心なので $BI$, $CI$ はそれぞれ $\\angle B$, $\\angle C$ の二等分線。三角形 $IBC$ の内角の和より $\\angle BIC = 180° - \\dfrac{\\angle B + \\angle C}{2} = 180° - 50° = 130°$。一般に $\\angle BIC = 90° + \\dfrac{\\angle A}{2}$ が成り立つ（$90° + 40° = 130°$）。",
    strategy:
      "内心の角の問題は公式 $\\angle BIC = 90° + \\dfrac{\\angle A}{2}$ を覚えておくと一瞬で解ける。覚えていなくても「二等分線 → 三角形 $IBC$ の内角の和」から1分で導出できる。会話文の誘導はこの導出の流れを示している。3分以内。",
    trapExplanation:
      "外心と内心の混同が最大のワナ。外心なら中心角の関係（$\\angle BOC = 2\\angle A = 160°$）になる。「内角の二等分線の交点 = 内心」「辺の垂直二等分線の交点 = 外心」を確認してから手を動かすこと。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["会話文", "誘導読解", "条件整理"],
    sourceStyle: "会話文",
  },

  {
    id: "ct-m1a-s4-q1",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "条件付き確率",
    statement:
      "袋の中に赤玉 3 個、白玉 2 個が入っている。1 個取り出して色を確認してから戻さずにもう 1 個取り出す。1 回目が赤玉であったとき、2 回目も赤玉である確率を求めよ。",
    type: "single-choice",
    options: [
      "$\\frac{1}{2}$",
      "$\\frac{2}{5}$",
      "$\\frac{3}{5}$",
      "$\\frac{3}{10}$",
    ],
    correctAnswer: "$\\frac{1}{2}$",
    explanation:
      "1回目が赤玉の場合、残りは「赤2個・白2個」の合計4個。その中から赤玉を引く確率は $\\dfrac{2}{4} = \\dfrac{1}{2}$。条件付き確率の公式 $P(B|A) = \\dfrac{P(A \\cap B)}{P(A)}$ でも確認できる：$P(A) = \\dfrac{3}{5}$、$P(A \\cap B) = \\dfrac{3}{5} \\cdot \\dfrac{2}{4} = \\dfrac{3}{10}$、$P(B|A) = \\dfrac{3/10}{3/5} = \\dfrac{1}{2}$。",
    strategy:
      "1回目が起きた「後の状態」を正確に把握する。「1回目が赤 → 残り赤2個・白2個・計4個」を図示すると判断が速い。2分以内が目安。条件付き確率の公式より、状態を直接数える方が速い。",
    trapExplanation:
      "「戻さない」抽出なのに「戻す」前提で計算する（$\\frac{3}{5}$ を答えとする）誤りが最多。問題文の「戻さず」を見落とさないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },

  {
    id: "ct-m1a-s4-q2",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "場合の数 — 委員会の選び方",
    context:
      "文化祭の実行委員を、男子4人、女子3人の合計7人の候補者から3人選ぶことになった。",
    statement:
      "選ばれた3人の中に女子が少なくとも1人含まれる選び方は何通りあるか。",
    type: "single-choice",
    options: ["$18$ 通り", "$30$ 通り", "$31$ 通り", "$35$ 通り"],
    correctAnswer: "31",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "全体から「女子が1人も含まれない（全員男子）」場合を引く余事象の考え方を使う。全体は $_7\\mathrm{C}_3 = 35$ 通り。全員男子になるのは $_4\\mathrm{C}_3 = 4$ 通り。よって $35 - 4 = 31$ 通り。",
    strategy:
      "「少なくとも1人」と読んだら余事象（全体 − 1人も含まれない場合）を最初に検討する。直接数える（女子1人・2人・3人で場合分け）と $_3\\mathrm{C}_1 {}_4\\mathrm{C}_2 + {}_3\\mathrm{C}_2 {}_4\\mathrm{C}_1 + {}_3\\mathrm{C}_3 = 18 + 12 + 1 = 31$ で検算もできる。3分以内。",
    trapExplanation:
      "全体の $35$ 通り（選択肢にある）をそのまま答えにしないこと。また、場合分けで直接数えるとき $_3\\mathrm{C}_1 \\times {}_4\\mathrm{C}_2$ の組合せの掛け算を足し算と混同する誤りも多い。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理", "選択肢消去"],
    sourceStyle: "日常場面",
  },

  {
    id: "ct-m1a-s4-q3",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "確率 — 反復試行",
    statement:
      "1個のさいころを4回投げるとき、3の倍数の目（3または6）がちょうど2回出る確率を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{8}{27}$",
      "$\\dfrac{4}{27}$",
      "$\\dfrac{8}{81}$",
      "$\\dfrac{1}{9}$",
    ],
    correctAnswer: "$\\dfrac{8}{27}$",
    explanation:
      "3の倍数の目が出る確率は $\\dfrac{2}{6} = \\dfrac{1}{3}$、出ない確率は $\\dfrac{2}{3}$。4回中ちょうど2回出る確率は、反復試行の公式より $_4\\mathrm{C}_2 \\left(\\dfrac{1}{3}\\right)^2 \\left(\\dfrac{2}{3}\\right)^2 = 6 \\times \\dfrac{1}{9} \\times \\dfrac{4}{9} = \\dfrac{24}{81} = \\dfrac{8}{27}$。",
    strategy:
      "反復試行は「回数の選び方 $\\times$ 成功確率のべき $\\times$ 失敗確率のべき」の3点セット。まず1回あたりの確率（ここでは $\\dfrac{1}{3}$）を確定してから公式に乗せる。約分（$\\dfrac{24}{81} = \\dfrac{8}{27}$）まで丁寧に。3分以内。",
    trapExplanation:
      "係数 $_4\\mathrm{C}_2 = 6$ の掛け忘れが最頻出（その場合 $\\dfrac{4}{81}$ になり、選択肢の $\\dfrac{8}{81}$ や $\\dfrac{4}{27}$ と紛らわしい）。また「3の倍数」を「3の目だけ」（確率 $\\dfrac{1}{6}$）と誤読しないこと。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "条件整理"],
  },

  {
    id: "ct-m1a-s4-q4",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "確率 — くじ引きの期待値",
    context:
      "生徒会のバザーで、次のようなくじを企画している。\n\nくじは全部で10本。そのうち1等（賞品券500円分）が1本、2等（賞品券100円分）が3本、残り6本ははずれ（賞品券なし）である。",
    statement:
      "このくじを1本引くとき、もらえる賞品券の金額の期待値を求めよ。",
    type: "single-choice",
    options: ["$50$ 円", "$60$ 円", "$80$ 円", "$100$ 円"],
    correctAnswer: "$80$ 円",
    explanation:
      "期待値 $=$（金額 $\\times$ 確率）の総和。$500 \\times \\dfrac{1}{10} + 100 \\times \\dfrac{3}{10} + 0 \\times \\dfrac{6}{10} = 50 + 30 + 0 = 80$ 円。",
    strategy:
      "期待値は「表を作る」のが確実：金額の行と確率の行を並べ、積を足す。はずれ（金額0）も表に含めると確率の合計が1になっているか検算できる。2分以内。",
    trapExplanation:
      "確率を「本数」のまま掛けて10で割り忘れる、あるいは1等と2等の本数（1本と3本）を取り違える誤りが多い。確率の合計 $\\dfrac{1}{10} + \\dfrac{3}{10} + \\dfrac{6}{10} = 1$ の確認を習慣にすること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "計算処理"],
    sourceStyle: "日常場面",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 数学II・B・C
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ct-m2bc-s1-q1",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数 — sin+cos から sincos を求める",
    statement:
      "$\\sin\\theta + \\cos\\theta = \\dfrac{\\sqrt{6}}{2}$ であるとき、$\\sin\\theta\\cos\\theta$ の値を求めよ。",
    type: "single-choice",
    options: [
      "$\\frac{1}{8}$",
      "$\\frac{1}{4}$",
      "$\\frac{\\sqrt{6}}{4}$",
      "$\\frac{1}{2}$",
    ],
    correctAnswer: "$\\frac{1}{4}$",
    explanation:
      "$(\\sin\\theta + \\cos\\theta)^2 = \\sin^2\\theta + 2\\sin\\theta\\cos\\theta + \\cos^2\\theta = 1 + 2\\sin\\theta\\cos\\theta$。左辺 $= \\left(\\dfrac{\\sqrt{6}}{2}\\right)^2 = \\dfrac{6}{4} = \\dfrac{3}{2}$。よって $1 + 2\\sin\\theta\\cos\\theta = \\dfrac{3}{2}$、$\\sin\\theta\\cos\\theta = \\dfrac{1}{4}$。",
    strategy:
      "「和 → 2乗 → $\\sin^2+\\cos^2=1$ 利用 → 積を求める」は三角関数の典型変形。両辺を2乗することを反射的に判断できるよう訓練する。計算は2分以内。$\\sqrt{6}$ の2乗 $= 6$ を素早く処理すること。",
    trapExplanation:
      "$(\\sqrt{6}/2)^2 = 6/4 = 3/2$ の計算を $6/2 = 3$ と誤る（分母を2乗し忘れる）ケースが頻出。分数の2乗は分子・分母それぞれ2乗すること。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s1-q2",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "図形と方程式 — 円と直線が接する条件",
    statement:
      "円 $x^2 + y^2 = 25$ と直線 $3x + 4y = k$（$k > 0$）が接するとき、定数 $k$ の値を求めよ。",
    type: "single-choice",
    options: ["$5$", "$20$", "$25$", "$30$"],
    correctAnswer: "$25$",
    explanation:
      "円の中心は原点 $(0,0)$、半径は $5$。直線 $3x + 4y - k = 0$ と原点の距離は $\\dfrac{|{-k}|}{\\sqrt{3^2+4^2}} = \\dfrac{k}{5}$（$k>0$）。接する条件は「中心と直線の距離 $=$ 半径」なので $\\dfrac{k}{5} = 5$、よって $k = 25$。",
    strategy:
      "円と直線の位置関係は「中心からの距離 $d$ と半径 $r$ の比較」で処理するのが最速（判別式より計算が軽い）。点と直線の距離の公式 $d = \\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$ を即座に使えるようにしておく。$3, 4, 5$ の組はよく出る。3分以内。",
    trapExplanation:
      "$\\sqrt{3^2+4^2} = 5$ を計算せずに $d = \\dfrac{k}{7}$（$3+4$）とする誤り、また「距離 $=$ 半径の2乗」と混同して $k = 5 \\times 25$ とする誤りに注意。接する条件は $d = r$（2乗しない）。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s1-q3",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数 — 加法定理による値の計算",
    statement:
      "$\\sin 75°$ の値を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$",
      "$\\dfrac{\\sqrt{6}-\\sqrt{2}}{4}$",
      "$\\dfrac{\\sqrt{3}+1}{2}$",
      "$\\dfrac{\\sqrt{2}+1}{2}$",
    ],
    correctAnswer: "$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$",
    explanation:
      "$75° = 45° + 30°$ と分解して加法定理を使う。$\\sin 75° = \\sin(45°+30°) = \\sin 45° \\cos 30° + \\cos 45° \\sin 30° = \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{1}{2} = \\dfrac{\\sqrt{6}}{4} + \\dfrac{\\sqrt{2}}{4} = \\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$。",
    strategy:
      "$75°$, $105°$, $15°$ などの角は「$30°$, $45°$, $60°$ の和か差」に分解するのが定石。加法定理の符号（$\\sin$ の和は $+$）を確実に。$75°$ は第1象限なので答えは正、かつ $\\sin 60° \\approx 0.87$ より大きいはず、という見積もりで検算できる。2分以内。",
    trapExplanation:
      "$\\sin 75°$ と $\\sin 15° = \\dfrac{\\sqrt{6}-\\sqrt{2}}{4}$ の取り違えが典型（加法定理の符号ミスで起こる）。$\\sin 75° > \\sin 45° \\approx 0.71$ なので、$\\dfrac{\\sqrt{6}-\\sqrt{2}}{4} \\approx 0.26$ は明らかに小さすぎると気づけるはず。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s2-q1",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "積分 — 定積分の計算",
    statement:
      "$\\displaystyle\\int_0^2 (3x^2 - 2x + 1)\\,dx$ の値を求めよ。",
    type: "single-choice",
    options: ["4", "5", "6", "8"],
    correctAnswer: "6",
    explanation:
      "$\\displaystyle\\int_0^2 (3x^2 - 2x + 1)\\,dx = \\Big[x^3 - x^2 + x\\Big]_0^2 = (8 - 4 + 2) - (0 - 0 + 0) = 6$。",
    strategy:
      "不定積分 → 上端代入 → 下端代入 → 引き算、の3ステップを素早く処理。計算は1分30秒以内が目安。$x=2$ の代入で $8, 4, 2$ を混乱しないよう、各項を別々に計算して合計する。",
    trapExplanation:
      "係数 3 を $x^3$ に残したまま（$3x^3/3$ を $x^3$ にしない）計算する誤り。不定積分で各項の係数を忘れずに割ること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m2bc-s2-q2",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "対数 — 対数方程式と真数条件",
    statement:
      "方程式 $\\log_2 (x-1) + \\log_2 (x+1) = 3$ を解け。",
    type: "single-choice",
    options: ["$x = 3$", "$x = \\pm 3$", "$x = 9$", "$x = \\sqrt{7}$"],
    correctAnswer: "$x = 3$",
    explanation:
      "真数条件より $x - 1 > 0$ かつ $x + 1 > 0$、すなわち $x > 1$。対数の和は積の対数なので $\\log_2 (x-1)(x+1) = 3$、つまり $x^2 - 1 = 2^3 = 8$。$x^2 = 9$ より $x = \\pm 3$ だが、真数条件 $x > 1$ を満たすのは $x = 3$ のみ。",
    strategy:
      "対数方程式は「①真数条件を先に書く → ②対数をまとめる → ③指数の形に直す → ④真数条件で解を選別」の4ステップを固定化する。①を最初にやっておくと最後の選別を忘れない。3分以内。",
    trapExplanation:
      "$x = \\pm 3$ をそのまま答えにするのが最頻出の誤り（選択肢にも用意されている）。$x = -3$ では真数 $x - 1 = -4 < 0$ となり対数が定義できない。真数条件の確認は対数方程式の必須手順。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "条件整理"],
  },

  {
    id: "ct-m2bc-s2-q3",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "微分 — 3次関数の極大値",
    statement:
      "関数 $f(x) = x^3 - 3x + 1$ の極大値を求めよ。",
    type: "single-choice",
    options: ["$3$", "$1$", "$-1$", "$2$"],
    correctAnswer: "$3$",
    explanation:
      "$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$。$f'(x) = 0$ となるのは $x = \\pm 1$。増減表を書くと、$x < -1$ で増加、$-1 < x < 1$ で減少、$x > 1$ で増加。よって $x = -1$ で極大となり、極大値は $f(-1) = (-1)^3 - 3(-1) + 1 = -1 + 3 + 1 = 3$。",
    strategy:
      "3次関数の極値は「微分 → 因数分解 → 増減表」の流れを機械的に。$x^3$ の係数が正なら「先に極大、後に極小」（増減が増→減→増）なので、小さい方の解 $x = -1$ が極大と即断できる。3分以内。",
    trapExplanation:
      "極大値を与える $x$（$=-1$）と極大値そのもの（$f(-1) = 3$）の混同に注意。また $f(-1)$ の計算で $(-1)^3 = -1$ と $-3 \\times (-1) = +3$ の符号処理を慎重に。$x = 1$（極小）に代入すると $f(1) = -1$ で、これも選択肢に並んでいる。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m2bc-s3-q1",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — 漸化式の計算",
    statement:
      "数列 $\\{a_n\\}$ が $a_1 = 2$、$a_{n+1} = 3a_n - 2$ で定義されるとき、$a_3$ の値を求めよ。",
    type: "single-choice",
    options: ["10", "16", "22", "28"],
    correctAnswer: "10",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "$a_2 = 3 \\cdot 2 - 2 = 4$。$a_3 = 3 \\cdot 4 - 2 = 10$。一般項を求めるなら：$a_{n+1} - 1 = 3(a_n - 1)$ と変形して公比 3 の等比数列に帰着。$b_n = a_n - 1$ とおくと $b_1 = 1$、$b_n = 3^{n-1}$、$a_n = 3^{n-1} + 1$。$a_3 = 9 + 1 = 10$。",
    strategy:
      "具体的な値を問われているときは一般項を出さず「1個ずつ代入」が最速。$a_1 \\to a_2 \\to a_3$ と2回計算するだけ。共通テストでは一般項の問いと具体値の問いが混在するので、求めるものを見極めてから手を動かす。",
    trapExplanation:
      "$a_3 = 3a_1 - 2 = 4$ と $n=1$ をそのまま $a_3$ の式に代入する誤り。$a_{n+1}$ は「直前の $a_n$」を使うので、$a_2$ を経由してから $a_3$ を求めること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["誘導読解", "計算処理"],
  },

  {
    id: "ct-m2bc-s3-q2",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — 等差数列の一般項と第10項",
    context:
      "太郎さんは、文化祭の看板を飾る電飾の個数を段ごとに増やしていく計画を立てている。各段の電飾の個数は等差数列になるように並べる。",
    statement:
      "等差数列 $\\{a_n\\}$ において $a_3 = 7$、$a_7 = 19$ であるとき、$a_{10}$ の値を求めよ。",
    type: "single-choice",
    options: ["$22$", "$25$", "$28$", "$31$"],
    correctAnswer: "$28$",
    explanation:
      "公差を $d$ とすると $a_7 - a_3 = 4d = 19 - 7 = 12$ より $d = 3$。$a_3 = a_1 + 2d = 7$ から $a_1 = 7 - 6 = 1$。よって $a_{10} = a_1 + 9d = 1 + 27 = 28$。または $a_{10} = a_7 + 3d = 19 + 9 = 28$ と直接求めてもよい。",
    strategy:
      "2つの項の値が与えられたら「項数の差 $\\times$ 公差 $=$ 値の差」で公差を即求める（$a_7 - a_3 = 4d$）。初項に戻らず $a_{10} = a_7 + 3d$ と進む方が速くてミスも少ない。3分以内。",
    trapExplanation:
      "$a_7 - a_3$ の項数差を $7 - 3 = 4$ ではなく $7$ や $3$ と数え違える誤り、$a_{10} = a_7 + 3d$ を $a_{10} = a_7 + 4d$ とする「植木算」型のずれに注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
    sourceStyle: "日常場面",
  },

  {
    id: "ct-m2bc-s3-q3",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — Σの計算",
    statement:
      "$\\displaystyle\\sum_{k=1}^{10} (2k + 1)$ の値を求めよ。",
    type: "single-choice",
    options: ["$100$", "$110$", "$120$", "$130$"],
    correctAnswer: "$120$",
    explanation:
      "$\\displaystyle\\sum_{k=1}^{10} (2k+1) = 2\\sum_{k=1}^{10} k + \\sum_{k=1}^{10} 1 = 2 \\times \\dfrac{10 \\times 11}{2} + 10 = 110 + 10 = 120$。",
    strategy:
      "$\\Sigma$ は線形性で分解して公式 $\\sum k = \\dfrac{n(n+1)}{2}$ に帰着させるのが基本。定数項の $\\sum 1 = n$ を忘れないこと。等差数列の和の公式（初項3、末項21、項数10 → $\\dfrac{10(3+21)}{2} = 120$）でも検算できる。2分以内。",
    trapExplanation:
      "定数 $1$ の和を $1$ とする（$n$ 倍し忘れる）誤りが最頻出で、その場合 $111$ になり選択肢の $110$ と紛らわしい。また $\\sum k$ の公式の $n$ に $10$ 以外を入れないよう、上端の値を確認すること。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m2bc-s4-q1",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計的推測 — 二項分布の標準偏差",
    statement:
      "コインを 100 回投げるとき、表が出る回数 $X$ は二項分布 $B(100,\\ 0.5)$ に従う。$X$ の標準偏差 $\\sigma(X)$ を求めよ。",
    type: "single-choice",
    options: ["2.5", "5", "10", "25"],
    correctAnswer: "5",
    explanation:
      "二項分布 $B(n, p)$ の分散は $np(1-p)$。$n=100, p=0.5$ のとき、分散 $= 100 \\times 0.5 \\times 0.5 = 25$。標準偏差 $= \\sqrt{25} = 5$。",
    strategy:
      "公式 $\\sigma = \\sqrt{np(1-p)}$ を暗記して即座に代入。$\\sqrt{25} = 5$ の計算は瞬時に。1分30秒以内が目標。統計の問題は公式を当てはめるだけのことが多いので、公式の正確な記憶が高得点の鍵。",
    trapExplanation:
      "分散 $(=25)$ を標準偏差と答えてしまう誤りが多い。「標準偏差 = $\\sqrt{分散}$」を確認すること。また $np$ のみ（期待値）を答えにしないよう注意。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "データ読み取り"],
  },

  {
    id: "ct-m2bc-s4-q2",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計的推測 — 母平均の95%信頼区間",
    context:
      "ある工場で製造される飲料1本あたりの内容量を調べるため、無作為に100本を抽出したところ、標本平均は500.0 mLであった。母標準偏差は10.0 mLであることが分かっている。\n\n標準正規分布において P(-1.96 ≦ Z ≦ 1.96) = 0.95 とする。",
    statement:
      "母平均 $m$ に対する信頼度95%の信頼区間を求めよ。",
    type: "single-choice",
    options: [
      "$498.04 \\leqq m \\leqq 501.96$",
      "$499.80 \\leqq m \\leqq 500.20$",
      "$490.00 \\leqq m \\leqq 510.00$",
      "$498.00 \\leqq m \\leqq 502.00$",
    ],
    correctAnswer: "$498.04 \\leqq m \\leqq 501.96$",
    explanation:
      "標本平均の標準偏差（標準誤差）は $\\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{10.0}{\\sqrt{100}} = 1.0$。信頼度95%の信頼区間は $\\bar{x} \\pm 1.96 \\times \\dfrac{\\sigma}{\\sqrt{n}} = 500.0 \\pm 1.96 \\times 1.0$。よって $498.04 \\leqq m \\leqq 501.96$。",
    strategy:
      "信頼区間は公式 $\\bar{x} \\pm 1.96 \\cdot \\dfrac{\\sigma}{\\sqrt{n}}$ に値を当てはめるだけ。まず $\\dfrac{\\sigma}{\\sqrt{n}}$ を計算してから $1.96$ 倍する2段階で処理するとミスが減る。$\\sqrt{100} = 10$ のようにきれいな値になるのが共通テストの典型。4分以内。",
    trapExplanation:
      "$\\sqrt{n}$ で割り忘れて $500 \\pm 19.6$ とする誤りが最頻出。「標本平均のばらつきは元のばらつきより小さい（$\\sqrt{n}$ 分の1）」というイメージを持っておくと気づける。母標準偏差と標本平均の値の取り違えにも注意。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "計算処理", "条件整理"],
    stimulusType: "survey",
  },

  {
    id: "ct-m2bc-s4-q3",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計的推測 — 正規分布と確率",
    context:
      "ある高校の3年生の模試の得点 $X$ は、平均50点、標準偏差10点の正規分布 $N(50,\\ 10^2)$ に従うとみなせる。\n\n標準正規分布表（抜粋）: P(0 ≦ Z ≦ 1) = 0.3413 ／ P(0 ≦ Z ≦ 2) = 0.4772",
    statement:
      "得点が70点以上である生徒の割合はおよそ何%か。最も近いものを選べ。",
    type: "single-choice",
    options: ["約 $2.3$ %", "約 $4.6$ %", "約 $15.9$ %", "約 $47.7$ %"],
    correctAnswer: "約 $2.3$ %",
    explanation:
      "標準化すると $Z = \\dfrac{X - 50}{10}$ なので、$X \\geqq 70$ は $Z \\geqq 2$ に対応する。$P(Z \\geqq 2) = 0.5 - P(0 \\leqq Z \\leqq 2) = 0.5 - 0.4772 = 0.0228$。よって約2.3%。",
    strategy:
      "正規分布の問題は「標準化 → 表の値 → 0.5 から引く（または足す）」の3手順。求める範囲が右すそ（$Z \\geqq 2$）なのか中央部なのかを図を描いて確認してから表を引く。表の値 $0.4772$ は「0からZまで」の面積であることに注意。3分以内。",
    trapExplanation:
      "表の値 $0.4772$ をそのまま答えとする誤り（選択肢に用意されている）が典型。表は「中心から $Z$ まで」の確率なので、すその確率は $0.5$ から引く必要がある。$Z = 1$ と $Z = 2$ の取り違え（その場合 約15.9%）にも注意。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "計算処理"],
    stimulusType: "table",
  },

  {
    id: "ct-m2bc-s5-q1",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 空間ベクトルの内積",
    statement:
      "$\\vec{a} = (2, -1, 2)$、$\\vec{b} = (1, 3, -1)$ のとき、内積 $\\vec{a} \\cdot \\vec{b}$ を求めよ。",
    type: "single-choice",
    options: ["-3", "-1", "1", "3"],
    correctAnswer: "-3",
    markLabels: ["ア"],
    answerFormat: "number",
    explanation:
      "$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 1 + (-1) \\cdot 3 + 2 \\cdot (-1) = 2 - 3 - 2 = -3$。",
    strategy:
      "内積は「対応する成分を掛けて足す」のみ。符号ミスが命取りなので、各積を個別に書き出してから合計する。1分以内が目標。マイナスが多い問題は特に慎重に。",
    trapExplanation:
      "$2 \\times 1 = 2$、$(-1) \\times 3 = -3$、$2 \\times (-1) = -2$ の計算で、負号を付け忘れて $2 + 3 + 2 = 7$ などとする誤りが典型。符号付きの掛け算を丁寧に。",
    estimatedMinutes: 1,
    difficulty: "BASIC",
    skillTags: ["計算処理"],
  },

  {
    id: "ct-m2bc-s5-q2",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 内分点の位置ベクトル",
    statement:
      "三角形 $OAB$ において、$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$ とする。辺 $AB$ を $2:1$ に内分する点を $P$ とするとき、$\\overrightarrow{OP}$ を $\\vec{a}$、$\\vec{b}$ で表せ。",
    type: "single-choice",
    options: [
      "$\\dfrac{1}{3}\\vec{a} + \\dfrac{2}{3}\\vec{b}$",
      "$\\dfrac{2}{3}\\vec{a} + \\dfrac{1}{3}\\vec{b}$",
      "$\\dfrac{1}{2}\\vec{a} + \\dfrac{1}{2}\\vec{b}$",
      "$2\\vec{a} + \\vec{b}$",
    ],
    correctAnswer: "$\\dfrac{1}{3}\\vec{a} + \\dfrac{2}{3}\\vec{b}$",
    explanation:
      "$AB$ を $m:n$ に内分する点の位置ベクトルは $\\dfrac{n\\vec{a} + m\\vec{b}}{m+n}$。$2:1$ の内分なので $\\overrightarrow{OP} = \\dfrac{1 \\cdot \\vec{a} + 2 \\cdot \\vec{b}}{2+1} = \\dfrac{1}{3}\\vec{a} + \\dfrac{2}{3}\\vec{b}$。$P$ は $B$ 寄り（$A$ から3分の2進んだ点）なので $\\vec{b}$ の係数が大きくなることと整合する。",
    strategy:
      "内分点の公式は「比とベクトルがたすき掛け」（$m:n$ なら $n\\vec{a} + m\\vec{b}$）。暗記が不安なら「$2:1$ の内分点は $B$ 寄り → $\\vec{b}$ の係数が大」という図のイメージで検算する習慣をつける。係数の和が1になることも必ず確認。2分以内。",
    trapExplanation:
      "比の順序を逆にして $\\dfrac{2}{3}\\vec{a} + \\dfrac{1}{3}\\vec{b}$ とするのが最頻出の誤り（選択肢に用意されている）。「$2:1$ に内分」は $A$ 側から $2$、$B$ 側から $1$ の比。図を描いて $P$ がどちらに寄るかを見れば防げる。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "条件整理"],
  },

  {
    id: "ct-m2bc-s5-q3",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 垂直条件",
    statement:
      "$\\vec{a} = (1,\\ 2)$、$\\vec{b} = (x,\\ -3)$ について、$\\vec{a} \\perp \\vec{b}$ であるとき、$x$ の値を求めよ。",
    type: "single-choice",
    options: ["$6$", "$-6$", "$\\dfrac{3}{2}$", "$-\\dfrac{3}{2}$"],
    correctAnswer: "$6$",
    explanation:
      "垂直条件は内積が $0$：$\\vec{a} \\cdot \\vec{b} = 1 \\times x + 2 \\times (-3) = x - 6 = 0$。よって $x = 6$。",
    strategy:
      "「垂直 → 内積 $= 0$」「平行 → 成分が比例」の対応を即座に使い分ける。内積の計算は成分の積の和だけなので、1分で確実に得点する問題。検算は $\\vec{b} = (6, -3)$ と $\\vec{a} = (1,2)$ の内積 $6 - 6 = 0$ で一瞬。",
    trapExplanation:
      "平行条件（$1 \\times (-3) - 2x = 0$ より $x = -\\dfrac{3}{2}$）と混同する誤りが典型で、選択肢にも並んでいる。「垂直は内積ゼロ」を確認してから式を立てること。",
    estimatedMinutes: 1,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m2bc-s6-q2",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "平面上の曲線 — 楕円の焦点",
    statement:
      "楕円 $\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$ の焦点の座標を求めよ。",
    type: "single-choice",
    options: [
      "$(\\pm\\sqrt{5},\\ 0)$",
      "$(\\pm\\sqrt{13},\\ 0)$",
      "$(0,\\ \\pm\\sqrt{5})$",
      "$(\\pm 3,\\ 0)$",
    ],
    correctAnswer: "$(\\pm\\sqrt{5},\\ 0)$",
    explanation:
      "$a^2 = 9$、$b^2 = 4$ で $a^2 > b^2$ なので、焦点は $x$ 軸上にある。$c^2 = a^2 - b^2 = 9 - 4 = 5$ より $c = \\sqrt{5}$。よって焦点は $(\\pm\\sqrt{5},\\ 0)$。",
    strategy:
      "楕円の焦点は「大きい分母の軸の上」にあり、$c^2 = a^2 - b^2$（引き算）。双曲線の $c^2 = a^2 + b^2$（足し算）との対比で覚える。分母の大小を見て焦点の軸を判定 → $c$ を計算、の2手で3分以内。",
    trapExplanation:
      "双曲線の公式と混同して $c^2 = 9 + 4 = 13$ とする誤り（選択肢の $\\sqrt{13}$）が最頻出。また、分母の大小を確認せずに焦点を $y$ 軸上としないこと。頂点 $(\\pm 3, 0)$ と焦点の混同にも注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["数式変形", "条件整理"],
  },

  {
    id: "ct-m2bc-s6-q3",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "平面上の曲線 — 媒介変数表示の曲線",
    statement:
      "媒介変数 $\\theta$ を用いて $x = 3\\cos\\theta$、$y = 2\\sin\\theta$ と表される点 $(x,\\ y)$ が描く曲線の方程式を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$",
      "$\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1$",
      "$x^2 + y^2 = 6$",
      "$\\dfrac{x^2}{9} - \\dfrac{y^2}{4} = 1$",
    ],
    correctAnswer: "$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$",
    explanation:
      "$\\cos\\theta = \\dfrac{x}{3}$、$\\sin\\theta = \\dfrac{y}{2}$ と解いて、$\\sin^2\\theta + \\cos^2\\theta = 1$ に代入すると $\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$。これは長軸が $x$ 軸方向の楕円である。",
    strategy:
      "三角関数の媒介変数表示は「$\\cos\\theta$ と $\\sin\\theta$ について解いて、2乗の和 $= 1$ に放り込む」が定石。$x$ の係数が $\\cos$ 側、$y$ の係数が $\\sin$ 側という対応を崩さないこと。2分以内。",
    trapExplanation:
      "分母の $9$ と $4$ を逆にする誤り（$x = 3\\cos\\theta$ なら $x^2$ の分母は $3^2 = 9$）。また、$+$ と $-$ を取り違えて双曲線にしないこと。媒介変数消去の符号は $\\sin^2 + \\cos^2 = 1$ なので必ず $+$。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s6-q4",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "平面上の曲線 — 双曲線の漸近線",
    statement:
      "双曲線 $\\dfrac{x^2}{4} - \\dfrac{y^2}{9} = 1$ の漸近線の方程式を求めよ。",
    type: "single-choice",
    options: [
      "$y = \\pm\\dfrac{3}{2}x$",
      "$y = \\pm\\dfrac{2}{3}x$",
      "$y = \\pm\\dfrac{9}{4}x$",
      "$y = \\pm\\dfrac{4}{9}x$",
    ],
    correctAnswer: "$y = \\pm\\dfrac{3}{2}x$",
    explanation:
      "双曲線 $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ の漸近線は $y = \\pm\\dfrac{b}{a}x$。$a = 2$、$b = 3$ なので漸近線は $y = \\pm\\dfrac{3}{2}x$。",
    strategy:
      "漸近線は「右辺の $1$ を $0$ に置き換えた式 $\\dfrac{x^2}{4} - \\dfrac{y^2}{9} = 0$ を解く」と導出でき、公式を忘れても対応できる。$\\dfrac{y^2}{9} = \\dfrac{x^2}{4}$ から $y = \\pm\\dfrac{3}{2}x$。3分以内。",
    trapExplanation:
      "$\\dfrac{b}{a}$ と $\\dfrac{a}{b}$ の取り違え（$y = \\pm\\dfrac{2}{3}x$）が最頻出。「$y = $ の式だから分子が $y$ 側の $b$」と覚えるか、$1$ を $0$ にする導出で確認する。分母の2乗 $\\dfrac{9}{4}$ のまま答えにしないこと。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "条件整理"],
  },

  {
    // 注: idは復習キュー互換のため変更しない（第6問分割前のID）
    id: "ct-m2bc-s6-q1",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数平面 — 複素数のべき乗",
    statement:
      "$z = 1 + i$ のとき、$z^4$ を求めよ。（$i$ は虚数単位）",
    type: "single-choice",
    options: ["-4", "-4i", "4", "4i"],
    correctAnswer: "-4",
    explanation:
      "$z^2 = (1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i$。$z^4 = (z^2)^2 = (2i)^2 = 4i^2 = 4 \\cdot (-1) = -4$。極形式では $|z| = \\sqrt{2}$、$\\arg z = \\pi/4$ なので $z^4 = (\\sqrt{2})^4 \\left(\\cos\\pi + i\\sin\\pi\\right) = 4(-1) = -4$。",
    strategy:
      "まず $z^2$ を計算してから $z^4 = (z^2)^2$ と進む。$i^2 = -1$ の使いどころを逃さない。極形式（ド・モアブル）を使うとより汎用的だが、小さい $n$ では直接計算が速い。2分以内。",
    trapExplanation:
      "$(1+i)^4$ を展開するとき、$(1+i)^2 = 2 + 2i$ と計算する誤り（$i^2 = -1$ を忘れて $i^2 = 1$ と扱う）が頻出。$i^2 = -1$ を必ず意識すること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s7-q2",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数平面 — 絶対値と偏角",
    statement:
      "複素数 $z = 1 + \\sqrt{3}\\,i$ の絶対値 $|z|$ と偏角 $\\arg z$（$0 \\leqq \\arg z < 2\\pi$）を求めよ。",
    type: "single-choice",
    options: [
      "$|z| = 2$, $\\arg z = \\dfrac{\\pi}{3}$",
      "$|z| = \\sqrt{3}$, $\\arg z = \\dfrac{\\pi}{3}$",
      "$|z| = 2$, $\\arg z = \\dfrac{\\pi}{6}$",
      "$|z| = 4$, $\\arg z = \\dfrac{\\pi}{3}$",
    ],
    correctAnswer: "$|z| = 2$, $\\arg z = \\dfrac{\\pi}{3}$",
    explanation:
      "$|z| = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{1+3} = 2$。偏角は $\\cos\\theta = \\dfrac{1}{2}$、$\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$ を満たす角なので $\\theta = \\dfrac{\\pi}{3}$。よって $z = 2\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right)$。",
    strategy:
      "極形式への変換は「①絶対値（2乗和のルート）②偏角（実部・虚部の比から特別角を判定）」の2手順。$1 : \\sqrt{3} : 2$ の比を見たら $60°$（$\\dfrac{\\pi}{3}$）と即断できるようにしておく。ド・モアブルを使う問題の前提になるので確実に。2分以内。",
    trapExplanation:
      "$|z|^2 = 4$ と $|z| = 2$ の混同（選択肢の $4$）、および偏角 $\\dfrac{\\pi}{3}$ と $\\dfrac{\\pi}{6}$ の取り違えに注意。実部と虚部のどちらが $\\sqrt{3}$ かで角が変わる：虚部が $\\sqrt{3}$ なら $60°$、実部が $\\sqrt{3}$ なら $30°$。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s7-q3",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数平面 — 原点中心の回転",
    statement:
      "複素数平面上で、点 $z = 1 + i$ を原点を中心に $\\dfrac{\\pi}{2}$ だけ回転した点を表す複素数を求めよ。",
    type: "single-choice",
    options: ["$-1 + i$", "$1 - i$", "$-1 - i$", "$1 + i$"],
    correctAnswer: "$-1 + i$",
    explanation:
      "原点中心に $\\dfrac{\\pi}{2}$ 回転することは、$\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2} = i$ を掛けることに対応する。$i(1+i) = i + i^2 = -1 + i$。図形的には、第1象限の点 $(1,1)$ が第2象限の点 $(-1,1)$ に移ることと一致する。",
    strategy:
      "「原点中心の $\\theta$ 回転 $=$ $(\\cos\\theta + i\\sin\\theta)$ を掛ける」は複素数平面の最重要操作。特に $\\dfrac{\\pi}{2}$ 回転は「$i$ を掛けるだけ」と覚える。計算後は図を描いて象限が合っているか10秒で検算する。2分以内。",
    trapExplanation:
      "$i(1+i) = i + i^2$ で $i^2 = -1$ の処理を忘れて $1 + i$ のままにする誤り、回転方向（反時計回りが正）を逆にして $1 - i$ とする誤りが典型。回転前後で原点からの距離（絶対値）が変わらないことも確認材料になる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 英語リーディング
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ct-eng-s1-q1",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "案内文読解 — 参加条件の特定",
    passage: `Community Library — Winter Reading Event

Date: December 14–28
Location: Main Hall, Floor 2
Open to: All library card holders (ages 10 and above)

Participants who read three or more books during the event period will receive a certificate of achievement. Registration forms are available at the front desk from December 1. Please bring your library card and a completed form when you arrive.

Note: Participants under age 16 must be accompanied by an adult guardian during the event.`,
    statement:
      "According to the notice, which of the following people can attend the event WITHOUT a guardian?",
    type: "single-choice",
    options: [
      "A 12-year-old who has a library card",
      "A 15-year-old with a completed registration form",
      "A 17-year-old who has a library card",
      "A 9-year-old who comes with a parent",
    ],
    correctAnswer: "A 17-year-old who has a library card",
    explanation:
      "The notice states that participants under age 16 must be accompanied by a guardian. A 17-year-old is 16 or above, so they do not need a guardian. A 12-year-old (option 1) and a 15-year-old (option 2) are under 16 and need guardians. A 9-year-old (option 4) is under the minimum age of 10 and cannot participate at all.",
    strategy:
      "案内文問題は「誰が / 何ができる / 何が必要か」の条件を素早く拾う。まず選択肢を読んで「何を探すか」を確認し（約10秒）、それから本文をスキャン。全文精読は不要。16歳未満→保護者必要、という1行を見つければ即答できる。目安は2分以内。",
    trapExplanation:
      "「ages 10 and above」という最低年齢制限を見落として、9歳の選択肢4を「保護者がいれば大丈夫」と判断してしまう誤りが多い。制限条件（年齢・カード保有）は複数あることに注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "条件整理", "情報照合"],
  },

  {
    id: "ct-eng-s1-q2",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "案内文読解 — 締切と提出方法の特定",
    passage: `Hillside High School Cafeteria — New Menu Trial

From May 12 to May 23, the cafeteria will offer three new lunch items: vegetable curry, chicken rice bowl, and tofu salad.

We want your opinion! After trying a new item, please fill out a feedback card. Cards are available next to the cash register. Completed cards should be placed in the red box by the cafeteria entrance no later than May 26.

Students who submit a feedback card will receive a free drink coupon, which can be used until the end of June.`,
    statement:
      "What should students do to receive a free drink coupon?",
    type: "single-choice",
    options: [
      "Buy all three new lunch items by May 23",
      "Put a completed feedback card in the red box by May 26",
      "Hand a feedback card to the cashier by May 23",
      "Use a drink coupon before the end of May",
    ],
    correctAnswer: "Put a completed feedback card in the red box by May 26",
    explanation:
      "本文に \"Completed cards should be placed in the red box by the cafeteria entrance no later than May 26\" とあり、その直後に \"Students who submit a feedback card will receive a free drink coupon\" とある。つまりクーポンの条件は「5月26日までに赤い箱にカードを入れること」。3品すべて買う必要はなく、提出先はレジ係ではなく赤い箱。クーポンの使用期限は6月末である。",
    strategy:
      "設問の \"to receive a free drink coupon\" を先に読み、本文から「クーポン」の語を探してその前後の条件文だけを精読する。日付が複数出てくる案内文では「何の締切か」をメモしながら読むと混同しない。2分以内。",
    trapExplanation:
      "日付のすり替えに注意：May 23 は新メニューの提供終了日、May 26 はカード提出の締切。\"by May 23\" を含む選択肢は期間の混同を狙ったワナ。また提出先（red box）と入手場所（next to the cash register）の取り違えも狙われている。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "条件整理"],
    stimulusType: "notice",
  },

  {
    id: "ct-eng-s1-q3",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "ポスター読解 — 入館可能時刻の計算",
    passage: `Riverside Science Museum — Spring Schedule

Opening hours: 9:30 a.m. – 5:30 p.m. (Tuesday to Sunday)
Closed on Mondays

Please note:
- Last admission is 60 minutes before closing time.
- The planetarium show (40 minutes) starts at 11:00 a.m., 1:00 p.m., and 3:00 p.m.
- Visitors with a student ID receive a 20% discount on admission.`,
    statement:
      "According to the poster, what is the latest time visitors can enter the museum?",
    type: "single-choice",
    options: ["4:30 p.m.", "5:00 p.m.", "5:30 p.m.", "4:50 p.m."],
    correctAnswer: "4:30 p.m.",
    explanation:
      "閉館時刻は5:30 p.m.で、\"Last admission is 60 minutes before closing time\" とあるので、最終入館時刻は閉館の60分前、つまり4:30 p.m.である。",
    strategy:
      "\"last admission\"（最終入館）のような掲示物特有の表現は頻出。設問が時刻を問うていたら、本文の時刻をそのまま答えにせず「計算が必要か」を必ず確認する。ここでは 5:30 − 60分 の一手間が問われている。1分30秒以内。",
    trapExplanation:
      "閉館時刻の 5:30 p.m. をそのまま選ぶのが最頻出の誤り。また \"60 minutes\" を「30分」と思い込んで 5:00 p.m. を選ばないこと。プラネタリウムの上映時間（40分）は最終入館と無関係なダミー情報。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "データ読み取り"],
    stimulusType: "poster",
  },

  {
    id: "ct-eng-s2-q1",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "投稿比較 — 両面を論じている投稿者を特定",
    passage: `[Post by YumiK — March 5]
I have been studying online for six months now. I love the flexibility — I can study at any time. But I really miss asking questions face-to-face. Sometimes I feel quite isolated.

[Post by TakeshiR — March 7]
Online learning is incredible! No commute, no wasted travel time. My grades have actually improved since I switched. I honestly think it is better than sitting in a classroom.

[Post by MaiN — March 9]
I tried online learning last semester. Honestly, it did not suit me. I found it difficult to focus at home, and I fell behind on deadlines. I am returning to in-person classes next term.`,
    statement:
      "Which poster mentions BOTH an advantage AND a disadvantage of online learning?",
    type: "single-choice",
    options: ["YumiK only", "TakeshiR only", "MaiN only", "All three posters"],
    correctAnswer: "YumiK only",
    explanation:
      "YumiK mentions a clear advantage (flexibility) AND disadvantages (missing face-to-face, feeling isolated). TakeshiR mentions only advantages (no commute, better grades). MaiN mentions only disadvantages (hard to focus, fell behind). Therefore, only YumiK presents both sides.",
    strategy:
      "選択肢を先に確認して「誰が両面を述べているか」を探すと決める（5秒）。各投稿を読みながらポジティブ・ネガティブをマーク。YumiKの第1文（優点）と第2文（欠点）を見つけたら即解答できる。全文精読不要。目安3分。",
    trapExplanation:
      "\"I really miss asking questions face-to-face\" が欠点の表現だと見落として、YumiKが優点のみを述べていると誤解するケースがある。\"miss\" + \"isolated\" はネガティブ表現。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "英語スキャニング", "選択肢消去"],
  },

  {
    id: "ct-eng-s2-q2",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "レビュー比較 — 2人の共通意見の特定",
    passage: `Customer Reviews — "Starlight" Wireless Earphones

★★★★☆ Posted by Kenta_M
I have used these earphones for two months. The sound quality is clear, and the battery lasts more than eight hours, which is perfect for my long commute. My only complaint is the carrying case — it is too large for my pocket.

★★★☆☆ Posted by Aoi_S
The battery life is impressive; I only charge them twice a week. However, I was disappointed with the touch controls, which often do not respond. The sound is acceptable but not as rich as I expected for the price.`,
    statement:
      "What do both reviewers say about the earphones?",
    type: "single-choice",
    options: [
      "The battery lasts a long time",
      "The sound quality is excellent",
      "The carrying case is inconvenient",
      "The touch controls are unreliable",
    ],
    correctAnswer: "The battery lasts a long time",
    explanation:
      "Kentaは \"the battery lasts more than eight hours\"、Aoiは \"The battery life is impressive\" と、2人ともバッテリーの持ちを高く評価している。音質はKentaが \"clear\" と肯定する一方、Aoiは \"not as rich as I expected\" と不満。ケースへの不満はKentaのみ、タッチ操作への不満はAoiのみ。",
    strategy:
      "「両者に共通する内容」を問う問題は、各レビューの評価ポイントを「+/−」つきでメモしながら読む（例: Kenta: 音+ 電池+ ケース− / Aoi: 電池+ 操作− 音±）。メモが揃えば共通項は機械的に見つかる。3分以内。",
    trapExplanation:
      "片方しか述べていない内容（ケース、タッチ操作）を「どこかで読んだ」記憶だけで選ばないこと。また音質はKentaが褒めてAoiが物足りないと述べる「評価が割れた」項目で、共通点と真逆のワナ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "要旨把握", "選択肢消去"],
    stimulusType: "review",
  },

  {
    id: "ct-eng-s2-q3",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "ブログ読解 — 事実と意見の区別",
    passage: `My First School Festival — Posted by Hana, October 20

Last weekend, our school held its annual festival. My class ran a small cafe, and we served about 300 cups of tea and coffee over two days. I think our handmade decorations were the best part of the cafe.

On the second day, the drama club performed a 30-minute play in the gym. In my opinion, the main actor's performance was more impressive than any professional play I have seen. The festival ended with a fireworks display that lasted fifteen minutes.`,
    statement:
      "Which of the following is a fact stated in the blog, rather than an opinion?",
    type: "single-choice",
    options: [
      "The class cafe served about 300 cups of drinks",
      "The handmade decorations were the best part of the cafe",
      "The main actor was better than any professional",
      "The fireworks were the most exciting event",
    ],
    correctAnswer: "The class cafe served about 300 cups of drinks",
    explanation:
      "「約300杯提供した」は数値で確認できる事実の記述。一方、装飾が \"the best part\"、俳優が \"more impressive than any professional\" という記述はそれぞれ \"I think\" \"In my opinion\" に導かれた筆者の意見である。「花火が最も盛り上がった」という記述はそもそも本文にない（15分間続いたという事実のみ）。",
    strategy:
      "fact / opinion 問題は \"I think\" \"In my opinion\" \"the best\" \"more ... than\" などの主観マーカーを本文に印をつけながら読む。数値・日付・出来事の記述が fact、評価・比較・感想が opinion。マーカーを見つければ消去法で素早く解ける。3分以内。",
    trapExplanation:
      "本文に書かれていない内容（花火が最も盛り上がった）を「ありそうだから」と選ばないこと。また \"the best part\" のような最上級表現は、内容が魅力的でも意見であって事実ではない。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去", "英語スキャニング"],
    stimulusType: "blog",
  },

  {
    id: "ct-eng-s3-q1",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "説明文読解 — 筆者の目的",
    passage: `Urban Farming: Growing Food in the City

Urban farming — growing food within city environments — is gaining popularity worldwide. Rooftop gardens, vertical farms, and community plots are now found in cities from Tokyo to Toronto. Supporters argue that urban farming reduces transportation costs, improves local air quality, and reconnects residents with their food sources. Critics, however, point out that urban land is expensive and that food production volumes remain too small to meet city needs. Despite these concerns, many city governments are funding urban farming programs as part of broader environmental sustainability initiatives.`,
    statement:
      "What is the main purpose of this article?",
    type: "single-choice",
    options: [
      "To argue that urban farming can solve global food shortages",
      "To present both the benefits and the limitations of urban farming",
      "To explain why urban farming is replacing traditional agriculture",
      "To criticize city governments for investing in urban farming",
    ],
    correctAnswer:
      "To present both the benefits and the limitations of urban farming",
    explanation:
      "The article does not take a one-sided position. It presents supporters' views (cost reduction, air quality, reconnection with food) and critics' views (expensive land, small volume). The phrase 'Despite these concerns' shows balance. Option 2 correctly reflects this balanced, informative purpose.",
    strategy:
      "「目的」問題は本文全体の構造を把握する。最初の文と最後の文（トピックセンテンスとまとめ）を読めば方向性がわかる。本文に \"Supporters argue...Critics, however...\" という対比構造があれば「両面提示型」の記事と判断できる。3分以内が目安。",
    trapExplanation:
      "「都市農業を支持している」ように読んでしまい、選択肢1（食料危機の解決）を選ぶ誤りが多い。最後の文は「都市政府が投資している」事実を述べているが、それは「解決策である」とは言っていない。誇張した選択肢に注意。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去", "英語スキャニング"],
  },

  {
    id: "ct-eng-s3-q2",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "記事読解 — 研究結果の正確な把握",
    passage: `Sleep and Learning: What Recent Research Tells Us

Many students stay up late before exams, believing that extra study hours lead to better results. However, recent research suggests the opposite may be true. In one study, students who slept at least seven hours before a test scored, on average, 10% higher than those who slept fewer than five hours.

Researchers explain that the brain organizes and stores new information during sleep. Without enough rest, much of what students review at night may simply not be retained. This does not mean that studying is unimportant — rather, the findings suggest that combining regular study with sufficient sleep is more effective than sacrificing sleep for extra review.`,
    statement:
      "What does the research described in the article suggest?",
    type: "single-choice",
    options: [
      "Studying late at night guarantees higher test scores",
      "Students who sleep enough tend to perform better on tests",
      "Studying is less important than sleeping",
      "Five hours of sleep is enough for most students",
    ],
    correctAnswer: "Students who sleep enough tend to perform better on tests",
    explanation:
      "本文は「7時間以上眠った生徒は5時間未満の生徒より平均10%高得点だった」という研究結果を紹介し、睡眠中に脳が情報を整理・定着させると説明している。最終段落で「学習が不要なのではなく、学習と十分な睡眠の組合せが効果的」と述べているので、「勉強より睡眠が大事」（選択肢3）は言い過ぎ。徹夜の有効性（選択肢1）は本文の主張と正反対。",
    strategy:
      "研究紹介型の記事は「研究結果の数値」と「研究者の解釈」を分けて読む。設問が \"suggest\" を使うときは、本文の表現より強い断定（guarantee, always など）を含む選択肢を疑う。\"This does not mean...\" の譲歩部分は選択肢のワナの種になりやすいので必ず読む。4分以内。",
    trapExplanation:
      "\"This does not mean that studying is unimportant\" を読み飛ばすと「勉強より睡眠」型の選択肢に引っかかる。また \"guarantees\"（保証する）は本文の \"suggests\"（示唆する）より強すぎる表現で、典型的な言い過ぎ選択肢。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    stimulusType: "article",
  },

  {
    id: "ct-eng-s3-q3",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "記事読解 — 段落の役割の把握",
    passage: `School Uniforms: A Continuing Debate

School uniforms have a long history in Japan, and the debate about them continues today. Supporters argue that uniforms save time in the morning, reduce pressure to buy fashionable clothes, and create a sense of community among students.

On the other hand, opponents point out that uniforms can be expensive, may be uncomfortable in extreme weather, and limit students' freedom of expression. Some schools have responded by introducing more flexible rules, such as allowing students to choose between several uniform styles.

Whether a school keeps, changes, or removes its uniform policy, what matters most is that students, parents, and teachers discuss the issue together.`,
    statement:
      "What is the role of the final paragraph?",
    type: "single-choice",
    options: [
      "To argue that uniforms should be removed",
      "To emphasize the importance of discussion among those involved",
      "To list additional advantages of uniforms",
      "To explain the history of school uniforms in detail",
    ],
    correctAnswer: "To emphasize the importance of discussion among those involved",
    explanation:
      "最終段落は \"what matters most is that students, parents, and teachers discuss the issue together\" と述べており、制服の存廃そのものよりも関係者の話し合いの重要性を強調して記事を締めくくっている。賛成・反対のどちらかに立つ結論ではない。",
    strategy:
      "段落の役割を問う問題は、その段落の最初と最後の文だけ精読すれば判断できることが多い。本文全体が「賛成 → 反対 → まとめ」という両論併記の構造であることを掴めば、最終段落が一方の肩を持つ選択肢は消去できる。3分以内。",
    trapExplanation:
      "本文中盤の \"opponents point out...\" の印象に引きずられて「制服廃止を主張」を選ばないこと。両論併記型の記事の結論は中立になるのが普通。最終段落に書かれていない「歴史の詳述」「追加の利点」も本文との照合で即消去できる。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去", "英語スキャニング"],
    stimulusType: "article",
  },

  {
    id: "ct-eng-s4-q1",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "表読み取り — 最大の伸びを示した生徒",
    context: `Test Score Summary

| Name   | Test 1 | Test 2 | Test 3 |
|--------|--------|--------|--------|
| Alex   |   62   |   70   |   75   |
| Bianca |   80   |   83   |   82   |
| Carlos |   55   |   64   |   71   |
| Diana  |   90   |   89   |   91   |`,
    statement:
      "Which student showed the greatest improvement from Test 1 to Test 3?",
    type: "single-choice",
    options: ["Alex", "Bianca", "Carlos", "Diana"],
    correctAnswer: "Carlos",
    explanation:
      "The improvements from Test 1 to Test 3 are: Alex: 75 − 62 = 13, Bianca: 82 − 80 = 2, Carlos: 71 − 55 = 16, Diana: 91 − 90 = 1. Carlos has the largest improvement of 16 points.",
    strategy:
      "「最大の伸び = Test3 − Test1」を4人分計算するだけ。引き算なので暗算で十分。選択肢の順に計算して最大値を探す（約1分）。「Test2」はこの問いに関係ないので読み飛ばす。表問題は「何を計算すれば答えが出るか」を先に決めてから表を見ること。",
    trapExplanation:
      "「最大スコア」（Diana, 91点）と「最大の伸び」を混同して Diana を選ぶ誤りが最多。問いは「伸び」（差分）であることを必ず確認。また Test 2 から Test 3 だけを見て Alex (75 − 70 = 5) と Carlos (71 − 64 = 7) を比較する部分最適の誤りにも注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り", "時間配分"],
  },

  {
    id: "ct-eng-s4-q2",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "資料読み取り — 増加幅が最大の項目",
    context: `Recycling Rates at Midori City (percentage of waste recycled)

| Material  | 2018 | 2024 |
|-----------|------|------|
| Paper     |  58% |  66% |
| Plastic   |  22% |  41% |
| Glass     |  70% |  74% |
| Metal     |  62% |  75% |`,
    statement:
      "According to the table, which material showed the largest increase in its recycling rate between 2018 and 2024?",
    type: "single-choice",
    options: ["Paper", "Plastic", "Glass", "Metal"],
    correctAnswer: "Plastic",
    explanation:
      "増加幅（ポイント差）は Paper: 66−58 = 8、Plastic: 41−22 = 19、Glass: 74−70 = 4、Metal: 75−62 = 13。最大の増加は Plastic の19ポイント。2024年時点の率が最も高いのは Metal（75%）だが、問われているのは「増加幅」である。",
    strategy:
      "表問題は計算する前に「何を比べるのか」（最終値か、変化量か、割合か）を設問から確定する。ここでは increase なので各行の引き算を4回するだけ。暗算しやすいよう、差をメモ欄に書き出して最大値を選ぶ。2分以内。",
    trapExplanation:
      "「2024年に最も高い」Metal や Glass を選ぶのが典型的な誤り。increase（変化量）と highest（最終値）の読み分けが全て。また、Plastic は率自体が最も低いので「低いから違う」と直感で除外しないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り"],
    stimulusType: "table",
  },

  {
    id: "ct-eng-s4-q3",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "レポート推敲 — 結論文の選択",
    passage: `Student Report Draft — "Bicycle Use Among Our Students"

Our group surveyed 120 students about how they come to school. We found that 45% come by bicycle, 30% walk, and 25% use the bus or train. Of the students who cycle, almost 60% said they would ride more often if the school provided a covered bicycle parking area.

Based on these results, [  X  ]`,
    statement:
      "Which sentence best completes the report at [ X ]?",
    type: "single-choice",
    options: [
      "we recommend that the school consider building covered bicycle parking.",
      "we conclude that most students dislike riding bicycles.",
      "we suggest that bus services should be reduced.",
      "we found that walking is the most popular way to come to school.",
    ],
    correctAnswer: "we recommend that the school consider building covered bicycle parking.",
    explanation:
      "調査結果は「自転車通学が45%で最多」「自転車通学者の約60%が屋根付き駐輪場があればもっと利用したい」というもの。この流れを受ける結論として自然なのは駐輪場の提案。「自転車が嫌い」はデータと矛盾し、「徒歩が最多」は45% > 30%に反する。バス削減はデータから導けない飛躍。",
    strategy:
      "レポート完成問題は「直前のデータ → 結論」の論理接続だけを見る。\"Based on these results\" とあるので、数値が支持しない選択肢は機械的に消去できる。データ（45%, 30%, 60%）と各選択肢を1対1で照合する。3分以内。",
    trapExplanation:
      "数値の照合をせずに常識で選ぶと「徒歩が最多」のような事実誤認の選択肢を見逃さず消去できない。30%（徒歩）と45%（自転車）の大小、60%は「自転車通学者のうちの」割合である点（全体の60%ではない）に注意。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["レポート完成", "データ読み取り", "選択肢消去"],
    stimulusType: "report",
  },

  {
    id: "ct-eng-s5-q1",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "情報照合 — 複数条件を満たすイベント",
    passage: `Event Listings — November

Event A — Photography Workshop
Date: Saturday, November 15 / Fee: ¥2,000
Age restriction: 18 and above / Duration: 3 hours
Location: Community Center

Event B — Drawing for Beginners
Date: Sunday, November 16 / Fee: Free
Age restriction: None / Duration: 2 hours
Location: Art Gallery

Event C — Digital Art Introduction
Date: Saturday, November 15 / Fee: ¥1,500
Age restriction: 16 and above / Duration: 4 hours
Location: Tech Hub

Event D — Watercolor Basics
Date: Sunday, November 16 / Fee: ¥1,200
Age restriction: 14 and above / Duration: 3 hours
Location: Community Center`,
    statement:
      "Hiro is 17 years old and has ¥1,500 to spend. He is available only on Saturdays. Which event can Hiro attend?",
    type: "single-choice",
    options: ["Event A only", "Event C only", "Events A and C", "Events B and D"],
    correctAnswer: "Event C only",
    explanation:
      "Conditions: Saturday only, age 17, budget ¥1,500. Event A: Saturday ✓, but ¥2,000 (over budget) ✗, and age 18+ (Hiro is 17) ✗ → NO. Event B: Sunday ✗ → NO. Event C: Saturday ✓, ¥1,500 (within budget) ✓, age 16+ (17 ≥ 16) ✓ → YES. Event D: Sunday ✗ → NO. Only Event C satisfies all three conditions.",
    strategy:
      "条件を先にリストする（曜日・年齢・予算の3つ）。各イベントを表のように照合する。1条件でも×なら即除外。「Event Aは土曜だが予算超過 → 除外」のように、最も絞れる条件（土曜限定）から先に処理すると速い。3分以内が目安。",
    trapExplanation:
      "Event Aに絞って「年齢制限は18+だが...」と迷う間に Event C を見落とす。また ¥1,500 のイベントを「¥1,500 以内」と解釈して Event A（¥2,000）を除外できない誤りも。予算は「以内」か「ぴったり」かを確認すること。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "条件整理", "英語スキャニング"],
  },

  {
    id: "ct-eng-s5-q2",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "メール照合 — 両者の都合が合う日時",
    passage: `[Email 1 — From: Risa  To: Megumi  Subject: Practice for the speech contest]
Hi Megumi,
Could you help me practice for the English speech contest next week? I am free on Tuesday and Thursday after 4 p.m., and any time on Saturday morning. The library meeting rooms are available until 6 p.m. on weekdays.

[Email 2 — From: Megumi  To: Risa  Subject: Re: Practice for the speech contest]
Hi Risa,
Of course! I have piano lessons every Tuesday, and on Saturday I need to leave home before 11 a.m. for a family event. Thursday works for me, but I have a club meeting until 4:30 p.m.`,
    statement:
      "When can Risa and Megumi most likely practice together?",
    type: "single-choice",
    options: [
      "Tuesday at 4:30 p.m.",
      "Thursday at 5:00 p.m.",
      "Saturday at 11:30 a.m.",
      "Thursday at 4:00 p.m.",
    ],
    correctAnswer: "Thursday at 5:00 p.m.",
    explanation:
      "Risaの都合は「火・木の16時以降、土曜午前」。Megumiは「火曜はピアノで不可、土曜は11時前に家を出る、木曜は16時30分まで部活」。両者が揃うのは木曜の16時30分以降で、図書館は平日18時まで使える。よって Thursday at 5:00 p.m. が適切。木曜16時はMegumiの部活中、土曜11時30分はMegumiが外出済み。",
    strategy:
      "日程調整問題は、人物ごとに「可/不可」の表を作るのが最速：曜日を列に、2人の条件を行に書き、両方◯の枠だけ残す。最後に施設の制約（図書館は18時まで）でダブルチェックする。4分以内。",
    trapExplanation:
      "Thursday at 4:00 p.m. はRisaの条件（16時以降）だけ見ると正しそうだが、Megumiの \"club meeting until 4:30 p.m.\" を見落とすと引っかかる。2通目のメールの条件を1通目に上書きして照合するのがこの形式の核心。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "条件整理", "時系列整理"],
    stimulusType: "email",
  },

  {
    id: "ct-eng-s5-q3",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "求人照合 — 条件を満たすアルバイト",
    passage: `Part-Time Job Listings — Summer

Job A — Bookstore Assistant
Hours: Weekdays 5 p.m. – 8 p.m. / Requirement: age 16+
Pay: 1,050 yen per hour / Note: experience preferred

Job B — Ice Cream Shop Staff
Hours: Weekends 10 a.m. – 4 p.m. / Requirement: age 18+
Pay: 1,200 yen per hour / Note: no experience needed

Job C — Library Helper
Hours: Weekends 9 a.m. – 1 p.m. / Requirement: age 16+
Pay: 1,000 yen per hour / Note: no experience needed

Job D — Convenience Store Staff
Hours: Weekdays 10 p.m. – 6 a.m. / Requirement: age 18+
Pay: 1,400 yen per hour / Note: night shift`,
    statement:
      "Sora is a 17-year-old high school student who has never had a part-time job. Sora has classes on weekdays until 6 p.m. Which job can Sora apply for?",
    type: "single-choice",
    options: ["Job A", "Job B", "Job C", "Job D"],
    correctAnswer: "Job C",
    explanation:
      "Soraの条件は「17歳・未経験・平日は18時まで授業」。Job Aは平日17時開始で授業と重なり不可（経験者優遇も不利）。Job BとJob Dは18歳以上の条件を満たさない。Job Cは週末勤務・16歳以上・未経験可で、すべての条件に合う。",
    strategy:
      "求人照合は応募者の条件（年齢・経験・時間帯）を先にリスト化し、最も絞り込める条件から各求人を消していく。ここでは年齢（17歳）でBとDが即消え、平日の授業でAが消える。残ったCを念のため全条件で確認。3分以内。",
    trapExplanation:
      "時給の高さ（Job D の1,400円）に目を奪われて年齢制限を見落とすのが典型。また Job A は「17時〜」だけ見ると可能に見えるが、「平日18時まで授業」との重なりに気づく必要がある。数値条件は1つずつ淡々と照合すること。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "条件整理", "英語スキャニング"],
    stimulusType: "listing",
  },

  {
    id: "ct-eng-s6-q1",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "物語読解 — 登場人物の心情",
    passage: `Mia had spent weeks preparing for the school science fair. The night before, she rehearsed her presentation forty times and double-checked every diagram. But when she walked into the gymnasium the next morning and saw the long rows of polished displays from older students, her confidence wavered. She kept telling herself she had done her best. When the judges finally reached her table, her heart raced so fast she could barely speak.`,
    statement:
      "Why did Mia feel nervous when the judges approached her table?",
    type: "single-choice",
    options: [
      "She had not prepared enough for the presentation",
      "Her diagrams contained several errors",
      "Despite thorough preparation, facing the actual judges felt overwhelming",
      "She had forgotten to bring her materials to the gymnasium",
    ],
    correctAnswer:
      "Despite thorough preparation, facing the actual judges felt overwhelming",
    explanation:
      "The passage clearly states Mia prepared intensively ('rehearsed forty times', 'double-checked every diagram'). Her nervousness came not from lack of preparation, but from seeing the polished displays of older students ('her confidence wavered') and the pressure of the actual moment. Option 3 correctly captures this contrast between preparation and real-world anxiety.",
    strategy:
      "「なぜ緊張したか」の問いは、本文で緊張の直接の原因として述べられている箇所を探す。「準備不足で緊張した」という選択肢1は本文と矛盾（本文は十分な準備を述べている）。本文の対比構造（準備充分 → でも実際は緊張）を把握できれば即答。3分以内。",
    trapExplanation:
      "\"forty times\" \"double-checked\" といった準備の徹底ぶりの記述を「逆に自信があった」と誤読するケース。これらは準備は充分だったが「それでも緊張した」という対比を強調している。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "英語スキャニング"],
  },

  {
    id: "ct-eng-s6-q2",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "物語読解 — 心情の変化を追う",
    passage: `Ren had trained for the city marathon relay for almost a year, and he was chosen to run the final section. On the day of the race, however, his team was in fifth place when he received the sash. Frustrated, he started too fast and felt his legs grow heavy after only two kilometers.

Then he remembered his coach's words: "Run your own race, not someone else's." He slowed down, found his usual rhythm, and began passing runners one by one. His team finished third — not first, but when his teammates ran toward him with smiles, Ren realized that what he had gained was worth more than a medal.`,
    statement:
      "How did Ren's feelings change during the race?",
    type: "single-choice",
    options: [
      "From frustration to a sense of fulfillment",
      "From confidence to deep disappointment",
      "From boredom to excitement",
      "From fear to anger at his teammates",
    ],
    correctAnswer: "From frustration to a sense of fulfillment",
    explanation:
      "レース序盤のRenは \"Frustrated\" と明記されており、焦りから飛ばしすぎて失速する。コーチの言葉を思い出して立て直し、最後は \"what he had gained was worth more than a medal\"（メダル以上のものを得た）と感じている。つまり「いら立ち → 充実感」の変化。チームメイトへの怒りや失望で終わる描写はない。",
    strategy:
      "心情変化の問題は「最初の感情」と「最後の感情」を表す形容詞・描写をそれぞれ本文から拾い、選択肢の \"From A to B\" と照合する。転機（ここではコーチの言葉の回想）にマークをつけると変化の流れが整理できる。4分以内。",
    trapExplanation:
      "「3位でフィニッシュ＝目標未達＝失望」と推測で選ばないこと。本文は \"worth more than a medal\" と肯定的に締めている。結果（順位）と心情は別物として、心情は本文の表現だけから判断する。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "時系列整理"],
    stimulusType: "story",
  },

  {
    id: "ct-eng-s6-q3",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "物語読解 — 出来事の順序整理",
    passage: `When Yuna moved to a new town in April, she did not know anyone at her school. In May, her homeroom teacher suggested she join a club, so she visited the photography club, where a second-year student named Kana showed her how to use the darkroom.

During summer vacation, the two traveled to a lake to take pictures of the sunrise. In September, one of Yuna's photographs from that trip won a prize in the city photo contest, and Kana was the first person she told.`,
    statement:
      "Which of the following shows the correct order of events?",
    type: "single-choice",
    options: [
      "Moving to a new town → joining the club → the lake trip → winning a prize",
      "Joining the club → moving to a new town → winning a prize → the lake trip",
      "Moving to a new town → the lake trip → joining the club → winning a prize",
      "The lake trip → joining the club → moving to a new town → winning a prize",
    ],
    correctAnswer: "Moving to a new town → joining the club → the lake trip → winning a prize",
    explanation:
      "本文の時系列は、4月に引っ越し（moved in April）→ 5月に写真部を訪ねる（In May）→ 夏休みに湖へ撮影旅行（During summer vacation）→ 9月にコンテスト入賞（In September）。月や季節を表す語がそのまま順序の根拠になる。",
    strategy:
      "出来事の順序問題は、本文中の時を表す語（April, In May, During summer vacation, In September）に印をつけ、出来事と対応させたミニ年表を作る。物語の叙述順と時系列が一致しているかも確認する（回想が挟まる文章では一致しない）。3分以内。",
    trapExplanation:
      "この文章は叙述順 = 時系列だが、選択肢は順序を入れ替えて作られている。1つ目の出来事と最後の出来事だけ確認して中間を流すと、湖旅行と入賞の順序（夏 → 9月）のような近接ペアで誤る。時の語句を全部拾うこと。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["時系列整理", "英語スキャニング"],
    stimulusType: "story",
  },

  {
    id: "ct-eng-s7-q1",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "論説文 — 筆者の主張",
    passage: `Social media platforms often claim to connect people, but recent studies suggest they may increase loneliness among young users. When teenagers spend hours scrolling through curated images of seemingly perfect lives, they tend to compare themselves unfavorably, which can lead to feelings of inadequacy and isolation. Rather than fostering genuine relationships, excessive social media use may replace meaningful conversation with shallow, passive observation. For this reason, limiting screen time for minors is not merely reasonable — it is essential for their emotional well-being.`,
    statement:
      "What is the author's main argument?",
    type: "single-choice",
    options: [
      "Social media companies should face legal consequences for teen mental health issues",
      "Excessive social media use harms the emotional well-being of young people",
      "Teenagers should be completely banned from all social media platforms",
      "The research on social media effects is still inconclusive",
    ],
    correctAnswer:
      "Excessive social media use harms the emotional well-being of young people",
    explanation:
      "The author argues that excessive social media use leads to loneliness, inadequacy, and isolation, and concludes that limiting screen time is 'essential for emotional well-being'. This matches option 2. Option 1 (legal consequences) is not mentioned. Option 3 (complete ban) is too extreme — the author says 'limiting', not 'banning'. Option 4 is the opposite of the author's stance.",
    strategy:
      "論説文の「主張」は最終文付近またはトピックセンテンスに集中している。最後の文 \"limiting screen time... is essential\" が筆者の結論。選択肢はこの結論と比較する。極端な表現（ban, illegal）は「誇張選択肢」として消去候補。3分以内が目安。",
    trapExplanation:
      "\"limiting screen time\" を \"banning social media\" と読み替えて選択肢3を選ぶ誤りが多い。「制限（limit）」と「禁止（ban）」は別物。選択肢の過剰な言い換えに注意。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去", "英語スキャニング"],
  },

  {
    id: "ct-eng-s7-q2",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "論説文 — 筆者が同意する内容の推論",
    passage: `Every year, a huge amount of food is thrown away while it is still safe to eat. Supermarkets often remove products from their shelves days before the expiration date, and consumers frequently buy more than they can finish. Some people argue that food waste is unavoidable in a modern economy, but evidence from several cities shows otherwise.

In these cities, stores donate unsold food to community kitchens, and apps connect restaurants with customers who buy leftover meals at a discount. Within three years, food waste in one such city fell by nearly 30%. Reducing food waste does not require new technology so much as new habits — and habits can be changed.`,
    statement:
      "Which statement would the author most likely agree with?",
    type: "single-choice",
    options: [
      "Food waste can be reduced through changes in everyday behavior",
      "Food waste is an unavoidable part of modern life",
      "Only advanced technology can solve the food waste problem",
      "Supermarkets should remove products earlier to keep food safe",
    ],
    correctAnswer: "Food waste can be reduced through changes in everyday behavior",
    explanation:
      "筆者は「食品廃棄は避けられない」という意見を紹介した上で \"evidence from several cities shows otherwise\"（複数の都市の事例がそうではないと示している）と反論し、最終文で \"Reducing food waste does not require new technology so much as new habits\" と述べている。つまり「習慣の変化で削減できる」が筆者の立場。",
    strategy:
      "「筆者が同意しそうな文」を選ぶ問題は、本文中の譲歩（Some people argue...）と反論（but...）の構造を掴むことが核心。筆者の主張は通常、譲歩の後の but 以降と最終文に現れる。各選択肢を本文の該当箇所と1対1で照合する。4分以内。",
    trapExplanation:
      "\"Some people argue that food waste is unavoidable\" は筆者が反論するために紹介した他者の意見であり、筆者の主張ではない。譲歩部分をそのまま選択肢にしたワナは論説文の定番。また本文は \"does not require new technology so much as...\" と技術偏重を否定している。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    stimulusType: "essay",
  },

  {
    id: "ct-eng-s7-q3",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "論説文 — 主張と根拠の対応",
    passage: `Public libraries are sometimes described as outdated in the age of the internet, yet they are serving more people than ever. According to a national survey, library visits increased by 12% over the past five years.

The reason is that libraries have changed their role. They now offer free computer access for job seekers, reading programs for young children, and quiet study spaces for students. For people who cannot afford home internet or private tutoring, these services are not a luxury but a necessity. Far from being outdated, the public library has become one of the few places where everyone, regardless of income, has equal access to information.`,
    statement:
      "Which evidence does the author use to support the claim that libraries are NOT outdated?",
    type: "single-choice",
    options: [
      "Library visits have increased and libraries now provide a wider range of services",
      "Most people now prefer e-books to paper books",
      "Libraries have reduced their opening hours to save money",
      "Private tutoring has become cheaper than before",
    ],
    correctAnswer: "Library visits have increased and libraries now provide a wider range of services",
    explanation:
      "筆者は「図書館は時代遅れではない」という主張の根拠として、①来館者数が5年間で12%増加したという調査結果、②求職者向けPC、子ども向け読書プログラム、学習スペースなど役割の拡大、の2点を挙げている。電子書籍の好み・開館時間の短縮・家庭教師の価格は本文に記述がない。",
    strategy:
      "主張と根拠の問題では、設問の NOT outdated に対応する本文の表現（Far from being outdated）を起点に、その前にある数値・事例を根拠として拾う。NOTが大文字の設問は読み落とし防止のサイン。本文にない選択肢は即消去。4分以内。",
    trapExplanation:
      "選択肢の中で本文に登場する語（e-books, tutoring など）が含まれていても、本文の使われ方と異なれば誤り。\"private tutoring\" は「それを買えない人にとって図書館が必需品」という文脈で登場しており、価格の変化は述べられていない。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["要旨把握", "情報照合", "選択肢消去"],
    stimulusType: "essay",
  },

  {
    id: "ct-eng-s8-q1",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "レポート完成 — 複数資料からの情報統合",
    passage: `[Source 1 — Travel Guide Excerpt]
The Greenfield Nature Reserve covers 3,500 hectares and is home to over 200 species of birds. The reserve offers guided hiking tours on weekends and self-guided trails that are open daily from sunrise to sunset.

[Source 2 — Community Blog Post]
I visited Greenfield last weekend with my family. The guided tour was very informative and the guide was extremely knowledgeable. However, the trail near the wetlands was quite muddy after the recent rain. We still managed to spot about 15 different bird species during our two-hour walk.`,
    context: `Field Study Notes — Greenfield Nature Reserve

Total area: [A]
Total bird species: over 200
Guided tours available: weekends only
Self-guided trails: open daily (sunrise to sunset)

Recent visitor observations:
- Guided tour quality: informative, knowledgeable guide
- Trail condition near wetlands: [B]
- Bird species spotted: approximately 15`,
    statement:
      "According to the sources, what should fill blank [A] in the field study notes?",
    type: "single-choice",
    options: ["200 hectares", "2,500 hectares", "3,500 hectares", "35,000 hectares"],
    correctAnswer: "3,500 hectares",
    explanation:
      "Source 1 directly states 'The Greenfield Nature Reserve covers 3,500 hectares'. Blank [A] asks for the total area. The answer is 3,500 hectares (option 3). The number 200 refers to bird species, not area.",
    strategy:
      "ノート完成形式は「空欄に対応する情報を資料のどこから取るか」を確認してから本文を読む。[A]は「Total area」なので Source 1 の面積情報を探す（10秒でスキャン）。数値が複数登場するので混同しないよう、「面積 = hectares」「種数 = species」と単位を確認する。2分以内が目安。",
    trapExplanation:
      "200（鳥の種数）をそのまま「200 hectares」と面積として読む誤りが典型。同じ文章に複数の数値が出てくるとき、それぞれの単位・意味を照合してから選ぶこと。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["レポート完成", "情報照合", "英語スキャニング"],
  },

  {
    id: "ct-eng-s8-q2",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "複数資料統合 — グラフと記事からノートを完成させる",
    passage: `[Source 1 — Article Excerpt]
A recent survey of 500 high school students examined how they use their smartphones on school days. Watching videos was the most common activity, followed by messaging friends. Although many adults assume that games dominate teenagers' screen time, gaming ranked only third, and studying with learning apps came fourth.

[Source 2 — Survey Results (average minutes per day)]
Watching videos: 85
Messaging: 60
Games: 45
Learning apps: 30`,
    context: `Study Notes — Smartphone Use Among High School Students

Survey size: 500 students
Most common activity: watching videos (85 min/day)
Second: messaging (60 min/day)
Point to remember: adults often assume [ B ] takes up the most time, but it actually ranked third.`,
    statement:
      "According to the sources, what should fill blank [ B ] in the study notes?",
    type: "single-choice",
    options: ["gaming", "messaging", "watching videos", "using learning apps"],
    correctAnswer: "gaming",
    explanation:
      "Source 1 に \"many adults assume that games dominate teenagers' screen time, but gaming ranked only third\" とある。ノートの \"adults often assume [ B ] takes up the most time, but it actually ranked third\" はこの文の言い換えなので、[ B ] には gaming が入る。Source 2 の数値（Games: 45分で3番目）とも整合する。",
    strategy:
      "ノート完成問題は、空欄の前後の語句（assume / ranked third）を本文から探して対応箇所を特定する。2つの資料がある場合、文章（Source 1）で見つけた答えを数値（Source 2）で裏取りすると確実。3分以内。",
    trapExplanation:
      "「最も時間が長い」activity（watching videos）を機械的に選ぶのが典型的な誤り。空欄は「大人がそう思い込んでいるが実際は3位」という文脈であり、実際の1位ではなく思い込みの対象を問うている。文脈を読まず数値だけ照合すると引っかかる。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["レポート完成", "情報照合", "データ読み取り"],
    stimulusType: "multi-source",
  },

  {
    id: "ct-eng-s8-q3",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "複数資料統合 — レポートの結論を完成させる",
    passage: `[Source 1 — Local News Report]
About 80 volunteers joined the spring cleanup at Aoba Beach last Sunday. In three hours, they collected 120 bags of trash. Plastic bottles and food packaging made up the largest share of the waste collected.

[Source 2 — Volunteer Survey Comments]
"I was surprised that most of the trash was everyday plastic items, not things left by beach visitors." — participant, age 17
"We need garbage bins near the beach entrance. People want to throw trash away properly, but there is no place to do it." — participant, age 45`,
    context: `Student Report Draft — "What the Beach Cleanup Taught Us"

The cleanup collected 120 bags of trash in three hours, and plastic items made up the largest share. Participants' comments suggest that the problem is not simply visitors' bad manners. Therefore, in addition to holding cleanups, [ C ]`,
    statement:
      "Which sentence best completes the report at [ C ]?",
    type: "single-choice",
    options: [
      "installing garbage bins near the beach entrance could help reduce litter.",
      "the beach should be closed to visitors during the spring.",
      "volunteers should collect trash every day instead of once a season.",
      "plastic products should be banned from all shops in the city.",
    ],
    correctAnswer: "installing garbage bins near the beach entrance could help reduce litter.",
    explanation:
      "Source 2 の45歳の参加者が「入口付近にゴミ箱が必要。捨てたくても場所がない」と指摘しており、レポートの \"the problem is not simply visitors' bad manners. Therefore...\" という流れに自然につながる結論はゴミ箱の設置。ビーチ閉鎖・毎日の清掃・プラスチック全面禁止は資料中に根拠がなく、提案として飛躍している。",
    strategy:
      "複数資料の結論完成は「資料に根拠がある提案か」だけで判定する。\"Therefore\" の直前の文（マナーだけの問題ではない）と矛盾しない選択肢を探す。極端な対策（閉鎖・全面禁止）は資料の裏付けがない限り誤り。4分以内。",
    trapExplanation:
      "もっともらしい環境対策でも、資料に言及がなければ選べない。「プラスチックが多かった→プラスチック禁止」は一見論理的だが、資料は『捨てる場所がない』ことを問題にしており、飛躍がある。資料との対応を一つずつ確認すること。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["レポート完成", "情報照合", "要旨把握"],
    stimulusType: "multi-source",
  },

  // Phase 11 additions: original common-test style items.
  {
    id: "ct-m1a-s1-q5",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "数と式 - 式の値",
    context:
      "ある量 $x$ について、$A = 2(x-3) + 5$、$B = x + 4$ と表される2つの値を考える。",
    statement:
      "$A = B$ となるときの $x$ の値を求めよ。",
    type: "single-choice",
    options: ["5", "7", "9", "11"],
    correctAnswer: "5",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$2(x-3)+5 = x+4$ より、$2x-6+5 = x+4$、すなわち $2x-1 = x+4$。移項して $x = 5$ となる。選択肢では 5 が正しい。",
    strategy:
      "かっこを外してから同類項をまとめる。途中で暗算せず、$2x-1=x+4$ の形まで整理すると符号のミスを減らせる。",
    trapExplanation:
      "$2(x-3)$ を $2x-3$ としてしまうと答えがずれる。かっこの前の係数は中の全ての項にかける。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m1a-s1-q6",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "集合と命題 - 逆の真偽",
    statement:
      "整数 $n$ について、命題 $p$:「$n$ は 12 の倍数である」、命題 $q$:「$n$ は 3 の倍数である」とする。$p$ は $q$ であるための何条件か。",
    type: "single-choice",
    options: [
      "必要条件であるが、十分条件ではない",
      "十分条件であるが、必要条件ではない",
      "必要十分条件である",
      "必要条件でも十分条件でもない",
    ],
    correctAnswer: "十分条件であるが、必要条件ではない",
    explanation:
      "$n$ が12の倍数なら必ず3の倍数なので $p \\Rightarrow q$ は真である。一方、3の倍数でも12の倍数とは限らないので $q \\Rightarrow p$ は偽である。したがって $p$ は $q$ であるための十分条件であるが、必要条件ではない。",
    strategy:
      "「pならばq」と「qならばp」を別々に確かめる。反例は $n=3$ や $n=6$ のように小さい数で探すと速い。",
    trapExplanation:
      "12の倍数と3の倍数の包含関係を逆に読むと、必要条件と十分条件を取り違える。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "選択肢消去"],
  },
  {
    id: "ct-m1a-s1-q7",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "三角比 - 日常場面の高さ",
    context:
      "校庭の地点Aから校舎の屋上を見ると仰角が $30°$ であった。地点Aから校舎の真下までの水平距離は $24$ m である。目の高さは考えない。",
    statement:
      "校舎の高さを求めよ。ただし、$\\tan 30° = \\dfrac{1}{\\sqrt{3}}$ とする。",
    type: "single-choice",
    options: ["$8\\sqrt{3}$ m", "$12\\sqrt{3}$ m", "$24\\sqrt{3}$ m", "$\\dfrac{24}{\\sqrt{3}}$ m"],
    correctAnswer: "$8\\sqrt{3}$ m",
    explanation:
      "高さを $h$ m とすると、$\\tan 30° = \\dfrac{h}{24}$。よって $\\dfrac{1}{\\sqrt{3}} = \\dfrac{h}{24}$ なので、$h = \\dfrac{24}{\\sqrt{3}} = 8\\sqrt{3}$ m。",
    strategy:
      "直角三角形を描き、$\\tan = \\dfrac{高さ}{水平距離}$ を確認してから式を立てる。",
    trapExplanation:
      "$\\tan 30°$ を $\\sqrt{3}$ と覚え違えると $24\\sqrt{3}$ m を選びやすい。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    sourceStyle: "日常場面",
  },
  {
    id: "ct-m1a-s2-q5",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "二次関数 - 範囲内の最小値",
    statement:
      "$f(x) = x^2 - 6x + 11$ について、$1 \\leq x \\leq 5$ における最小値を求めよ。",
    type: "single-choice",
    options: ["1", "2", "3", "6"],
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$f(x) = (x-3)^2 + 2$ と平方完成できる。頂点の $x=3$ は範囲 $1 \\leq x \\leq 5$ に含まれるので、最小値は $2$。",
    strategy:
      "二次関数はまず平方完成し、頂点が指定範囲に入るかを見る。端点だけを代入する前に頂点を確認する。",
    trapExplanation:
      "端点 $x=1,5$ だけを見ると $6$ を選びやすい。上に開く放物線では頂点が範囲内なら頂点が最小になる。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "条件整理"],
  },
  {
    id: "ct-m1a-s2-q6",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "データの分析 - 四分位範囲",
    context:
      "9人の読書時間（分）は、短い順に 12, 18, 20, 25, 28, 31, 35, 39, 46 であった。",
    statement:
      "このデータの四分位範囲を求めよ。ただし、中央値を除いた下位4個と上位4個から第1四分位数、第3四分位数を求める。",
    type: "single-choice",
    options: ["16", "18", "20", "22"],
    correctAnswer: "18",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "中央値は5番目の28。下位4個 12,18,20,25 の中央値は $(18+20)/2=19$、上位4個 31,35,39,46 の中央値は $(35+39)/2=37$。四分位範囲は $37-19=18$。",
    strategy:
      "四分位数は学校や資料で定義が分かれる場合がある。問題文に指定された方法を優先し、中央値を含めるかどうかを確認する。",
    trapExplanation:
      "四分位数の定義を確認せずに機械的に計算すると、選択肢と合わない値になることがある。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "計算処理"],
    stimulusType: "table",
  },
  {
    id: "ct-m1a-s2-q7",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "データの分析 - 箱ひげ図の読み取り",
    context:
      "あるクラスの小テストについて、最小値 42点、第1四分位数 55点、中央値 68点、第3四分位数 76点、最大値 94点であった。",
    statement:
      "このデータについて、確実に正しいといえるものを選べ。",
    type: "single-choice",
    options: [
      "半数以上の生徒が68点以上である",
      "平均点は68点である",
      "四分位範囲は21点である",
      "最高点と最低点の差は50点である",
    ],
    correctAnswer: "四分位範囲は21点である",
    explanation:
      "四分位範囲は第3四分位数から第1四分位数を引いて $76-55=21$ 点。平均点は箱ひげ図の5数要約からは分からない。範囲は $94-42=52$ 点である。",
    strategy:
      "箱ひげ図では、中央値・四分位数・最大最小から確実に分かることだけを選ぶ。平均や細かな人数分布は原則分からない。",
    trapExplanation:
      "中央値を平均と混同するのが典型的なミス。中央値はデータを順に並べた中央の値であり、平均とは限らない。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "図表読解", "選択肢消去"],
    stimulusType: "boxplot",
  },
  {
    id: "ct-m1a-s3-q5",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 - 円周角",
    statement:
      "円に内接する四角形 $ABCD$ において、$\\angle ABC = 72°$ である。$\\angle ADC$ の大きさを求めよ。",
    type: "single-choice",
    options: ["72°", "98°", "108°", "118°"],
    correctAnswer: "108°",
    explanation:
      "円に内接する四角形の向かい合う角の和は $180°$。したがって $\\angle ADC = 180° - 72° = 108°$。",
    strategy:
      "円に内接する四角形では、対角の和が $180°$ になることをまず確認する。",
    trapExplanation:
      "同じ弧に対する円周角と混同して、同じ72°と考えないようにする。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "図表読解"],
  },
  {
    id: "ct-m1a-s3-q6",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 - 角の二等分線",
    statement:
      "三角形 $ABC$ において、$AB=6$、$AC=9$ である。角 $A$ の二等分線が辺 $BC$ と交わる点を $D$ とするとき、$BD:DC$ を求めよ。",
    type: "single-choice",
    options: ["1:1", "2:3", "3:2", "4:9"],
    correctAnswer: "2:3",
    explanation:
      "角の二等分線の定理より、$BD:DC = AB:AC = 6:9 = 2:3$。",
    strategy:
      "角の二等分線が出たら、隣り合う2辺の長さの比が、分けられた辺の比になることを使う。",
    trapExplanation:
      "$AB:AC$ を逆にして $3:2$ を選ぶミスが多い。点Dが辺BC上にあることを図で確認する。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "図表読解"],
  },
  {
    id: "ct-m1a-s4-q5",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "場合の数 - 委員の選び方",
    context:
      "男子4人、女子3人から3人の委員を選ぶ。ただし、少なくとも1人は女子を含める。",
    statement:
      "選び方は何通りあるか。",
    type: "single-choice",
    options: ["18", "30", "31", "35"],
    correctAnswer: "31",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "全体から男子だけを選ぶ場合を除く。全体は $_7\\mathrm{C}_3 = 35$ 通り、男子だけは $_4\\mathrm{C}_3 = 4$ 通り。よって $35-4=31$ 通り。",
    strategy:
      "「少なくとも1人」は余事象で処理すると速い。全体から条件に反する場合だけを引く。",
    trapExplanation:
      "女子が1人の場合だけを数えて終わると、女子2人・3人の場合を落としてしまう。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },
  {
    id: "ct-m1a-s4-q6",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "確率 - くじの条件付き確率",
    context:
      "箱に当たりくじ2本、はずれくじ3本が入っている。くじを1本引いて戻さず、続けてもう1本引く。",
    statement:
      "1本目が当たりであったと分かっているとき、2本目も当たりである確率を求めよ。",
    type: "single-choice",
    options: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{3}$", "$\\dfrac{2}{5}$", "$\\dfrac{1}{2}$"],
    correctAnswer: "$\\dfrac{1}{4}$",
    explanation:
      "1本目が当たりなら、残りは当たり1本、はずれ3本の計4本。したがって2本目も当たりである確率は $\\dfrac{1}{4}$。",
    strategy:
      "条件付き確率では、条件が分かった後の状態を作り直す。今回は1本目を取り除いた後の箱を見る。",
    trapExplanation:
      "最初の当たりの割合 $\\dfrac{2}{5}$ をそのまま使うと誤り。戻さないので母数も当たりの本数も変わる。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },

  {
    id: "ct-m2bc-s1-q4",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "図形と方程式 - 2点間の距離",
    statement:
      "座標平面上の2点 $A(1, 2)$、$B(7, 10)$ の距離を求めよ。",
    type: "single-choice",
    options: ["8", "10", "12", "14"],
    correctAnswer: "10",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "$AB = \\sqrt{(7-1)^2+(10-2)^2} = \\sqrt{36+64} = \\sqrt{100}=10$。",
    strategy:
      "2点間の距離は、x座標の差とy座標の差をそれぞれ2乗して足す。差の符号は2乗で消える。",
    trapExplanation:
      "座標の差を足して $6+8=14$ とするミスに注意。距離は三平方の定理で求める。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m2bc-s1-q5",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "指数・対数 - 対数方程式",
    statement:
      "$\\log_2 x + \\log_2 4 = 5$ を満たす $x$ の値を求めよ。",
    type: "single-choice",
    options: ["4", "6", "8", "16"],
    correctAnswer: "8",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\log_2 4 = 2$ なので、$\\log_2 x = 3$。したがって $x=2^3=8$。",
    strategy:
      "まず定数部分の対数を計算する。対数の式を指数の式に直すと、値をすばやく確定できる。",
    trapExplanation:
      "$\\log_2 4$ を4として扱うと誤る。対数は「2を何乗すると4か」を表す。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m2bc-s2-q4",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "三角関数 - 最大値",
    statement:
      "$0 \\leq x \\leq 2\\pi$ において、$2\\sin x + 1$ の最大値を求めよ。",
    type: "single-choice",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\sin x$ の最大値は1である。したがって $2\\sin x + 1$ の最大値は $2\\cdot1+1=3$。",
    strategy:
      "$\\sin x$ の取り得る範囲 $-1 \\leq \\sin x \\leq 1$ を使い、係数と定数を反映する。",
    trapExplanation:
      "$\\sin x$ の最大値を $0$ と考えたり、係数2を忘れたりすると誤る。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
  },
  {
    id: "ct-m2bc-s2-q5",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "微分 - 接線の傾き",
    statement:
      "関数 $f(x)=x^3-2x$ について、$x=2$ における接線の傾きを求めよ。",
    type: "single-choice",
    options: ["6", "8", "10", "12"],
    correctAnswer: "10",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "$f'(x)=3x^2-2$。したがって $f'(2)=3\\cdot4-2=10$ である。",
    strategy:
      "接線の傾きは微分係数で求める。まず導関数を作り、指定されたxの値を代入する。",
    trapExplanation:
      "$f(2)$ を計算してしまうと、点のy座標を求めているだけで傾きではない。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m2bc-s3-q4",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 - 等差数列",
    statement:
      "等差数列 $\\{a_n\\}$ で、$a_2=7$、$a_6=19$ である。公差を求めよ。",
    type: "single-choice",
    options: ["2", "3", "4", "6"],
    correctAnswer: "3",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$a_6-a_2$ は4つ分の公差にあたる。$19-7=12$ なので、$4d=12$、よって $d=3$。",
    strategy:
      "項番号の差と値の差を対応させる。$6-2=4$ なので、公差4個分である。",
    trapExplanation:
      "項番号の差を5と考えるミスがある。第2項から第6項までは4ステップ進む。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m2bc-s3-q5",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 - 和の計算",
    statement:
      "$\\displaystyle\\sum_{k=1}^{8} (3k-1)$ の値を求めよ。",
    type: "single-choice",
    options: ["92", "96", "100", "104"],
    correctAnswer: "100",
    answerFormat: "digits",
    digitSlots: [{ label: "アイウ", length: 3 }],
    explanation:
      "$\\sum_{k=1}^{8}(3k-1)=3\\sum_{k=1}^{8}k-\\sum_{k=1}^{8}1 = 3\\cdot36-8 = 108-8=100$。",
    strategy:
      "シグマは項ごとに分けて、$\\sum k = \\dfrac{n(n+1)}{2}$ と $\\sum 1=n$ を使う。",
    trapExplanation:
      "定数 $-1$ の和を $-1$ のままにすると $107$ になる。8項分あるので $-8$ である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m2bc-s4-q4",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計的推測 - 標本平均",
    statement:
      "母平均が50、母標準偏差が12の母集団から、大きさ36の無作為標本を抽出する。標本平均の標準偏差を求めよ。",
    type: "single-choice",
    options: ["2", "3", "6", "12"],
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "標本平均の標準偏差は $\\dfrac{\\sigma}{\\sqrt{n}}$。ここでは $\\dfrac{12}{\\sqrt{36}}=\\dfrac{12}{6}=2$。",
    strategy:
      "標本平均では標準偏差が $\\sqrt{n}$ で割られる。母標準偏差そのものを答えないようにする。",
    trapExplanation:
      "標本の大きさ36で割って $\\dfrac{1}{3}$ とするのは誤り。分母は $\\sqrt{36}$ である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "データ読み取り"],
  },
  {
    id: "ct-m2bc-s5-q4",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル - 内積",
    statement:
      "$\\vec{a}=(3, -2, 1)$、$\\vec{b}=(2, 4, -5)$ のとき、$\\vec{a}\\cdot\\vec{b}$ を求めよ。",
    type: "single-choice",
    options: ["-7", "-5", "3", "9"],
    correctAnswer: "-7",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\vec{a}\\cdot\\vec{b}=3\\cdot2+(-2)\\cdot4+1\\cdot(-5)=6-8-5=-7$。",
    strategy:
      "対応する成分どうしを掛けて足す。負の数を含む成分は、積の符号を一つずつ確認する。",
    trapExplanation:
      "$(-2)\\cdot4$ や $1\\cdot(-5)$ の符号を落とすと、正の値を選びやすい。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },
  {
    id: "ct-m2bc-s5-q5",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル - 中点の位置ベクトル",
    statement:
      "点 $A$、$B$ の位置ベクトルをそれぞれ $\\vec{a}$、$\\vec{b}$ とする。線分 $AB$ の中点 $M$ の位置ベクトルを選べ。",
    type: "single-choice",
    options: [
      "$\\dfrac{\\vec{a}+\\vec{b}}{2}$",
      "$\\vec{a}+\\vec{b}$",
      "$\\dfrac{\\vec{a}-\\vec{b}}{2}$",
      "$2\\vec{a}+2\\vec{b}$",
    ],
    correctAnswer: "$\\dfrac{\\vec{a}+\\vec{b}}{2}$",
    explanation:
      "中点の位置ベクトルは両端の位置ベクトルの平均である。したがって $\\overrightarrow{OM}=\\dfrac{\\vec{a}+\\vec{b}}{2}$。",
    strategy:
      "中点は比が $1:1$ の内分点。内分公式に入れても、単に平均と見てもよい。",
    trapExplanation:
      "和を2で割り忘れると、点ではなく2倍された位置を表してしまう。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "数式変形"],
  },
  {
    id: "ct-m2bc-s6-q5",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "平面上の曲線 - 楕円",
    statement:
      "楕円 $\\dfrac{x^2}{16}+\\dfrac{y^2}{9}=1$ について、長軸の長さを求めよ。",
    type: "single-choice",
    options: ["4", "6", "8", "16"],
    correctAnswer: "8",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "分母の大きい方が $16=4^2$ なので、x方向の半長軸は4。長軸の長さはその2倍で $8$。",
    strategy:
      "楕円の標準形では、分母が半軸の長さの2乗を表す。長軸は半長軸の2倍である。",
    trapExplanation:
      "分母16をそのまま長軸の長さと読むミスがある。まず平方根を取って半軸を求める。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["図表読解", "計算処理"],
  },
  {
    id: "ct-m2bc-s7-q4",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数平面 - 絶対値",
    statement:
      "複素数 $z=3-4i$ の絶対値 $|z|$ を求めよ。",
    type: "single-choice",
    options: ["1", "5", "7", "25"],
    correctAnswer: "5",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$|z|=\\sqrt{3^2+(-4)^2}=\\sqrt{9+16}=5$。",
    strategy:
      "複素数 $a+bi$ の絶対値は、原点から点 $(a,b)$ までの距離である。",
    trapExplanation:
      "$3-4= -1$ のように実部と虚部を単純に引くのではない。三平方の定理を使う。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "図表読解"],
  },

  {
    id: "ct-eng-s1-q4",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Short Notice - Library Workshop",
    passage: `City Library: Weekend Workshop
Learn how to make a simple travel journal.
Date: Saturday, June 15
Time: 10:00 a.m. - 11:30 a.m.
Place: Meeting Room B
Bring: three printed photos and a pen
The workshop is free, but students must sign up by June 12.`,
    statement:
      "What should students bring to the workshop?",
    type: "single-choice",
    options: [
      "A notebook and a lunch box",
      "Three printed photos and a pen",
      "A library card and scissors",
      "A camera and colored paper",
    ],
    correctAnswer: "Three printed photos and a pen",
    explanation:
      "The notice says, 'Bring: three printed photos and a pen.' The other items are not listed as things students need to bring.",
    strategy:
      "案内文では、日時・場所・持ち物などの見出しを先に確認する。設問が 'bring' を聞いているので Bring の行を見る。",
    trapExplanation:
      "travel journal という内容から notebook を連想しやすいが、本文で指定されている持ち物とは違う。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "情報照合"],
    stimulusType: "notice",
  },
  {
    id: "ct-eng-s2-q4",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Email - Club Schedule Change",
    passage: `From: Ms. Rivera
To: Green Club members

Thank you for volunteering for the garden project. Because heavy rain is expected on Friday, we will not meet after school that day. Instead, please come to the school garden at 9:00 a.m. on Saturday. We will finish by 11:00 a.m. You do not need to bring tools, but please bring a water bottle.`,
    statement:
      "Why was the meeting moved to Saturday?",
    type: "single-choice",
    options: [
      "The teacher could not come on Friday.",
      "Heavy rain is expected on Friday.",
      "The garden tools were not ready.",
      "More members can come on Saturday.",
    ],
    correctAnswer: "Heavy rain is expected on Friday.",
    explanation:
      "The email says, 'Because heavy rain is expected on Friday,' the club will not meet after school that day. This gives the reason for the schedule change.",
    strategy:
      "理由を問う設問では because, since, so などのつながりを探す。今回は Because の直後が根拠になる。",
    trapExplanation:
      "Saturdayの集合時刻に目が行くと、理由ではなく変更後の予定を選んでしまいやすい。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "時系列整理"],
    stimulusType: "email",
  },
  {
    id: "ct-eng-s3-q4",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Short Story - A Small Choice",
    passage: `Mika wanted to buy a new phone case, but she also needed a book for her science project. At the store, she saw a case with her favorite design. She held it for a while, then put it back. On the way home with the science book, she felt a little disappointed, but she also felt ready for the project meeting on Monday.`,
    statement:
      "What can be inferred about Mika?",
    type: "single-choice",
    options: [
      "She forgot about the project meeting.",
      "She chose what she needed over what she wanted.",
      "She bought both the case and the book.",
      "She did not like the phone case design.",
    ],
    correctAnswer: "She chose what she needed over what she wanted.",
    explanation:
      "Mika wanted the phone case but put it back and bought the science book. This shows that she chose the item she needed for her project.",
    strategy:
      "物語では、登場人物の行動の変化を見る。wanted と needed の対比が推論の根拠になる。",
    trapExplanation:
      "disappointed だけを見ると否定的な選択肢に引かれるが、最後には project meeting に備えられている。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    stimulusType: "story",
  },
  {
    id: "ct-eng-s4-q4",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Chart - School Lunch Survey",
    passage: `A student council survey asked 120 students which lunch menu they wanted for Sports Day.

Rice balls: 42 students
Sandwiches: 36 students
Curry: 30 students
Noodles: 12 students`,
    statement:
      "Which statement is true according to the survey?",
    type: "single-choice",
    options: [
      "Curry was chosen by more students than sandwiches.",
      "Noodles received one fifth of all votes.",
      "Rice balls and sandwiches together received 78 votes.",
      "More than half of the students chose rice balls.",
    ],
    correctAnswer: "Rice balls and sandwiches together received 78 votes.",
    explanation:
      "Rice balls received 42 votes and sandwiches received 36 votes. Together, they received $42+36=78$ votes. Noodles received 12 out of 120 votes, which is one tenth, not one fifth.",
    strategy:
      "図表問題では、各選択肢を数字で検算する。合計や割合を問うものは、計算式を短くメモする。",
    trapExplanation:
      "割合と人数の両方が出ると、複数の選択肢が正しそうに見える。設問は必ず一つに絞れるか確認する。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["図表読解", "情報照合", "データ読み取り"],
    stimulusType: "chart",
  },
  {
    id: "ct-eng-s5-q4",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Information Match - Volunteer Tasks",
    passage: `Three students are choosing volunteer tasks for the school festival.

Task A: Guide visitors at the front gate. Good for students who enjoy talking. 9:00-11:00.
Task B: Carry boxes from classrooms to the gym. Good for students who do not mind physical work. 8:00-9:30.
Task C: Take photos of performances. Students must bring their own camera. 12:00-2:00.

Students:
Ken can come only before 10:00 and prefers active work.
Sara enjoys speaking with visitors but cannot come before 10:30.
Yui has a camera and is free after lunch.`,
    statement:
      "Which task is best for Yui?",
    type: "single-choice",
    options: ["Task A", "Task B", "Task C", "No task matches her"],
    correctAnswer: "Task C",
    explanation:
      "Yui has a camera and is free after lunch. Task C requires students to bring their own camera and takes place from 12:00 to 2:00, so it matches her conditions.",
    strategy:
      "人物の条件を時間・持ち物・好みに分けて、タスク条件と照合する。Yui は camera と after lunch が決め手。",
    trapExplanation:
      "Task Aは人と話す仕事だが、Yuiについては話すのが好きとは書かれていない。本文の条件だけで判断する。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "英語スキャニング", "条件整理"],
    stimulusType: "matching",
  },
  {
    id: "ct-eng-s5-q5",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Information Match - Course Choice",
    passage: `Community Center Summer Courses

Course 1: Digital Drawing
Tuesday evenings, 6:00-7:30. Students use tablets provided by the center.

Course 2: Local Cooking
Saturday mornings, 10:00-12:00. Students must bring 500 yen for ingredients.

Course 3: Nature Walk
Sunday mornings, 8:30-11:00. Students should wear comfortable shoes.

Rina wants a weekend course, but she is busy on Sundays. She is interested in food and can pay a small fee.`,
    statement:
      "Which course should Rina choose?",
    type: "single-choice",
    options: ["Course 1", "Course 2", "Course 3", "None of the courses"],
    correctAnswer: "Course 2",
    explanation:
      "Rina wants a weekend course and is busy on Sundays, so Saturday is possible. She is interested in food and can pay a small fee, which matches Course 2.",
    strategy:
      "曜日条件で先に候補を絞り、その後に内容と費用を確認する。Sundayが不可なのでCourse 3は外す。",
    trapExplanation:
      "weekendだけを見るとCourse 3も候補になるが、Rinaは日曜日が忙しい。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "条件整理", "英語スキャニング"],
    stimulusType: "matching",
  },
  {
    id: "ct-eng-s6-q4",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Summary - Classroom Plants",
    passage: `Some schools are putting small plants in classrooms. Teachers report that students often become calmer when they can see greenery near their desks. Plants also give students a simple responsibility: watering them and checking their growth. However, plants alone do not improve learning. They work best when teachers use them as part of class activities, such as observation journals or science discussions.`,
    statement:
      "Which is the best summary of the passage?",
    type: "single-choice",
    options: [
      "Classroom plants can help students, especially when they are connected to learning activities.",
      "Schools should replace science classes with plant care activities.",
      "Teachers should put many large plants in every classroom.",
      "Plants improve test scores even when teachers do not use them in lessons.",
    ],
    correctAnswer: "Classroom plants can help students, especially when they are connected to learning activities.",
    explanation:
      "The passage says plants may calm students and give responsibility, but they work best as part of class activities. Option 1 includes both the benefit and the condition.",
    strategy:
      "要約問題では、本文全体の主張と但し書きの両方を含む選択肢を選ぶ。極端な表現は避ける。",
    trapExplanation:
      "plants alone do not improve learning とあるので、植物だけで成績が上がるという選択肢は本文と逆である。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    stimulusType: "essay",
  },
  {
    id: "ct-eng-s7-q4",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "Inference - Public Benches",
    passage: `A town removed several benches from the area near its station because officials wanted people to keep walking and avoid crowding. A month later, shop owners asked the town to bring some benches back. They said older visitors were spending less time in the area because there were few places to rest. The town decided to place fewer benches than before, but to put them near wide sidewalks.`,
    statement:
      "What does the town's final decision suggest?",
    type: "single-choice",
    options: [
      "The town ignored the shop owners' concerns.",
      "The town tried to balance safety and visitors' needs.",
      "The town wanted to close the station area.",
      "The town believed benches were no longer necessary.",
    ],
    correctAnswer: "The town tried to balance safety and visitors' needs.",
    explanation:
      "The town first removed benches to avoid crowding, but later brought back fewer benches near wide sidewalks. This shows a compromise between safety and the need for resting places.",
    strategy:
      "推論問題では、最初の対応と最後の対応の変化を見る。both sides を満たす選択肢が正解になりやすい。",
    trapExplanation:
      "benchesを減らした事実だけを見ると不要と判断したように見えるが、実際には一部を戻している。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    stimulusType: "essay",
  },
  {
    id: "ct-eng-s8-q4",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Report Completion - Bicycle Parking",
    passage: `[Source 1 - Student Survey]
Question: Why do you avoid riding a bicycle to school?
No safe parking space: 46%
Too far from home: 24%
Bad weather: 18%
Other reasons: 12%

[Source 2 - School Notice]
The school has an unused space beside the east gate. It is currently closed, but it could be opened for student use if a teacher is present in the morning.`,
    context: `Report Draft: Encouraging Bicycle Use

The survey shows that the most common reason students avoid riding bicycles is not distance or weather, but the lack of safe parking. The school also has unused space beside the east gate. Therefore, [ A ]`,
    statement:
      "Which sentence best completes [ A ]?",
    type: "single-choice",
    options: [
      "the school should consider creating supervised bicycle parking near the east gate.",
      "students should be told to ride bicycles even when parking is unsafe.",
      "the east gate should remain closed because students do not need it.",
      "weather is the biggest problem for students who ride bicycles.",
    ],
    correctAnswer: "the school should consider creating supervised bicycle parking near the east gate.",
    explanation:
      "Source 1 identifies safe parking as the biggest issue, and Source 2 says there is unused space by the east gate that could be used with teacher supervision. Option 1 combines both sources.",
    strategy:
      "レポート完成では、直前の文と複数資料の情報を同時に満たす文を選ぶ。safe parking と east gate が対応する。",
    trapExplanation:
      "bad weatherは18%で最大ではない。割合の大きさを取り違えると本文と逆の結論になる。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["レポート完成", "情報照合", "図表読解"],
    stimulusType: "multi-source",
  },
  {
    id: "ct-eng-s8-q5",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Report Completion - Museum Visit",
    passage: `[Source 1 - Museum Website]
The River Museum offers a student program on water use. Groups can test water samples and compare old and new maps of the town. The program takes 90 minutes.

[Source 2 - Class Goal]
Our geography class is studying how rivers shape local communities. We need an activity that includes both data collection and map reading.`,
    context: `Field Trip Plan

The River Museum program fits our class goal because students can [ B ].`,
    statement:
      "Which phrase best completes [ B ]?",
    type: "single-choice",
    options: [
      "practice data collection and map reading in one activity",
      "learn how to sell museum tickets to visitors",
      "watch a movie about rivers for three hours",
      "study only the history of old buildings",
    ],
    correctAnswer: "practice data collection and map reading in one activity",
    explanation:
      "Source 1 says students can test water samples and compare old and new maps. Source 2 asks for data collection and map reading. Option 1 matches both.",
    strategy:
      "空所の前後を読み、必要な要素をリスト化する。data collection は water samples、map reading は old and new maps に対応する。",
    trapExplanation:
      "museumという語からticketやmovieを連想しない。資料に明記された活動だけで判断する。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["レポート完成", "情報照合", "英語スキャニング"],
    stimulusType: "multi-source",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// セクションIDと大問番号のマッピング（"section-3" → 3）
// ─────────────────────────────────────────────────────────────────────────
export function sectionIdToNumber(sectionId: string): number {
  return parseInt(sectionId.replace("section-", ""), 10);
}
