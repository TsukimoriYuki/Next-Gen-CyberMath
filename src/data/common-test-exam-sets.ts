// ── 共通テスト EXAM SIMULATOR — 第2回・第3回 問題セット ───────────────────
// COMMON TEST COMMAND CENTER — Phase 13
//
// 各科目の本番演習に「第2回・第3回」を追加する。すべてオリジナル問題で、
// 公式過去問・実在の英文/設問の転載は一切ない。
//
// 設計方針：
//  - 大問共通の設定・資料（examContext / sharedStem / sharedData）→
//    小問1 基本確認 → 小問2 標準 → 小問3 誘導 → 小問4 応用 の構造。
//  - 数学は一部を MarkSheet（number / digits）にし、choice と混在させる。
//  - 英語は choice のみ（MarkSheet UI を出さない）。
//  - 各 examId に対応する問題を COMMON_TEST_EXAM_VARIANT_SETS から引く。
//    第1回（math-1a-70 等）は従来どおり COMMON_TEST_DRILL_QUESTIONS から構成する。

import type { CommonTestDrillQuestion } from "@/data/common-test-drills";

// ═══════════════════════════════════════════════════════════════════════════
// 数学IA 第2回（math-1a-70-v2）
// 第1問 数と式・三角比 / 第2問 二次関数・データ分析 /
// 第3問 図形の性質 / 第4問 場合の数・確率
// 配点 30 + 30 + 20 + 20 = 100
// ═══════════════════════════════════════════════════════════════════════════

const M1A_V2_S1 = {
  examContext:
    "第1問は、まっすぐな坂道を題材にする。地点 $A$ から坂を上って地点 $B$ まで進むと、水平方向に8m進み、垂直方向に6m高くなる。坂の傾きは全体で一定とする。",
  sharedStem:
    "まず坂の長さ（斜辺）を求め、続いて傾きの角 $\\theta$ について $\\sin\\theta$、$\\tan\\theta$ を考える。最後に、同じ傾きのまま距離を変えたときの高さを求める。前の小問で求めた値を後の小問でも使う。",
  sharedData: {
    title: "坂道の記録",
    headers: ["区間", "水平距離", "垂直距離"],
    rows: [["$A \\to B$", "8 m", "6 m"]],
    notes: ["坂の傾きは全体で一定とする。"],
  },
};

const M1A_V2_S2 = {
  examContext:
    "第2問は、ある屋外プールの記録を題材にする。下の表は、5日間の最高気温 $x$（℃）と、その日の来場者数 $y$（百人）である。来場者数の傾向を表すモデルとして $g(x)=-2(x-32)^2+24$ を考える。",
  sharedStem:
    "前半で表から平均や傾向を読み取り、後半でモデル $g(x)$ を使う。モデルは観測した範囲の傾向を表す近似であり、範囲外までそのまま当てはまるとは限らない。",
  sharedData: {
    title: "気温と来場者数",
    headers: ["気温 $x$（℃）", "25", "28", "30", "32", "34"],
    rows: [["来場者 $y$（百人）", "14", "18", "22", "24", "22"]],
    notes: ["来場者数は百人単位で表している。"],
  },
};

const M1A_V2_S3 = {
  examContext:
    "第3問は、三角形 $ABC$ を考える。$AB=6$、$AC=4$、$BC=5$ であり、$\\angle A$ の二等分線と辺 $BC$ の交点を $D$ とする。",
  sharedStem:
    "角の二等分線の性質 $BD:DC=AB:AC$ を使う。前半で比と長さを求め、後半で面積の比へ進む。前の小問で求めた値を使う。",
  sharedData: {
    title: "三角形の辺の長さ",
    headers: ["辺", "$AB$", "$AC$", "$BC$"],
    rows: [["長さ", "6", "4", "5"]],
    notes: ["$D$ は $\\angle A$ の二等分線と $BC$ の交点である。"],
  },
};

const M1A_V2_S4 = {
  examContext:
    "第4問は、赤玉3個と白玉2個が入った袋を考える。この袋から同時に2個の玉を取り出す。どの玉が取り出されることも同じ程度に起こるものとする。",
  sharedStem:
    "同時に取り出すので、組合せで数える。場合の数を求めてから確率、最後に「少なくとも1個」の確率へ進む。前の小問の結果を使う。",
  sharedData: {
    title: "袋の中の玉",
    headers: ["色", "個数"],
    rows: [["赤玉", "3"], ["白玉", "2"]],
    notes: ["合計5個から同時に2個を取り出す。"],
  },
};

const MATH_1A_70_V2: CommonTestDrillQuestion[] = [
  // ── 第1問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V2_S1,
    id: "ct-m1a-v2-s1-q1",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "坂道と三角比 — 坂の長さ",
    statement:
      "地点 $A$ から地点 $B$ まで坂を上ると、水平方向に8m、垂直方向に6m進む。坂に沿った長さ $AB$ を求めよ。",
    type: "blank-number",
    correctAnswer: "10",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "水平距離8m、垂直距離6mを2辺とする直角三角形を考える。三平方の定理より $AB=\\sqrt{8^2+6^2}=\\sqrt{64+36}=\\sqrt{100}=10$ m である。この長さ10mを、次の小問で $\\sin\\theta$ を求めるときに斜辺として使う。",
    strategy:
      "坂の長さは斜辺にあたる。まず水平距離と垂直距離を直角をはさむ2辺とみて、三平方の定理で斜辺を出す。",
    trapExplanation:
      "$8+6=14$ のように単純に足さないこと。坂は斜辺なので、二乗の和の平方根で求める。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V2_S1,
    id: "ct-m1a-v2-s1-q2",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "坂道と三角比 — sinの値",
    statement:
      "坂の傾きの角を $\\theta$ とする。小問1で求めた坂の長さを用いて、$\\sin\\theta$ を求めよ。",
    type: "single-choice",
    options: ["$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$"],
    correctAnswer: "$\\dfrac{3}{5}$",
    explanation:
      "$\\sin\\theta=\\dfrac{垂直距離}{坂の長さ}=\\dfrac{6}{10}=\\dfrac{3}{5}$ である。小問1で求めた斜辺10mを分母に使う。",
    strategy:
      "$\\sin$ は「高さ÷斜辺」。前問で求めた坂の長さ10mをそのまま分母に置く。",
    trapExplanation:
      "$\\sin\\theta$ を「高さ÷水平距離」としないこと。それは $\\tan\\theta$ の式である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V2_S1,
    id: "ct-m1a-v2-s1-q3",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "坂道と三角比 — tanの値",
    statement: "同じ角 $\\theta$ について、$\\tan\\theta$ を求めよ。",
    type: "single-choice",
    options: ["$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$"],
    correctAnswer: "$\\dfrac{3}{4}$",
    explanation:
      "$\\tan\\theta=\\dfrac{垂直距離}{水平距離}=\\dfrac{6}{8}=\\dfrac{3}{4}$ である。前問の $\\sin\\theta=\\dfrac{3}{5}$ に対し、$\\cos\\theta=\\dfrac{8}{10}=\\dfrac{4}{5}$ なので、$\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}=\\dfrac{3/5}{4/5}=\\dfrac{3}{4}$ としても同じになる。",
    strategy:
      "$\\tan$ は「高さ÷水平距離」。前問の $\\sin\\theta$ と $\\cos\\theta$ の比として確認してもよい。",
    trapExplanation:
      "$\\tan\\theta=\\dfrac{4}{3}$ は高さと水平距離を逆にした誤り。分子は垂直距離6である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "誘導読解"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V2_S1,
    id: "ct-m1a-v2-s1-q4",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "坂道と三角比 — 距離を変える",
    statement:
      "同じ傾きの坂を、水平方向に20m進む。このとき垂直方向には何m上がるか。",
    type: "blank-number",
    correctAnswer: "15",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "傾きが一定なので、$\\dfrac{垂直}{水平}=\\dfrac{6}{8}$ は変わらない。水平が20mのとき、垂直を $h$ とすると $\\dfrac{h}{20}=\\dfrac{6}{8}$。よって $h=20\\times\\dfrac{6}{8}=15$ m である。前問の $\\tan\\theta=\\dfrac{3}{4}$ を使い、$h=20\\times\\dfrac{3}{4}=15$ としてもよい。",
    strategy:
      "傾き一定の坂では、垂直と水平の比は常に同じ。前問の $\\tan\\theta=\\dfrac{3}{4}$ に水平距離を掛ける。",
    trapExplanation:
      "「水平が20mなら垂直も最初の6mのまま」と考えないこと。距離が増えれば、比に従って高さも増える。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "誘導読解"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第2問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V2_S2,
    id: "ct-m1a-v2-s2-q1",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "気温と来場者 — 平均",
    statement: "共通資料の5日間の来場者数（百人）について、平均を求めよ。",
    type: "blank-number",
    correctAnswer: "20",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "来場者数は $14,18,22,24,22$（百人）。合計は $14+18+22+24+22=100$、日数は5なので、平均は $100\\div5=20$（百人）である。この平均は、後の小問で傾向を見る基準になる。",
    strategy:
      "表の来場者数の行だけを横に足し、日数で割る。気温の行を混ぜないように、対象の行を先に確認する。",
    trapExplanation:
      "気温 $x$ の行を足してしまわないこと。平均を求める対象は来場者数 $y$ の行である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V2_S2,
    id: "ct-m1a-v2-s2-q2",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "気温と来場者 — 最も多い日",
    statement: "来場者数が最も多かった日の最高気温を、表から読み取れ。",
    type: "single-choice",
    options: ["28℃", "30℃", "32℃", "34℃"],
    correctAnswer: "32℃",
    explanation:
      "表の来場者数を見ると、$14,18,22,24,22$ のうち最大は24（百人）で、それは気温32℃の日である。次の小問のモデル $g(x)$ は、この32℃を頂点とする式になっている。",
    strategy:
      "最大値を探すときは、まず来場者数の行で最も大きい数を見つけ、その上の気温を読む。",
    trapExplanation:
      "気温が最も高い34℃の日を選ばないこと。気温の最大と来場者数の最大は一致していない。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M1A_V2_S2,
    id: "ct-m1a-v2-s2-q3",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "気温と来場者 — モデルの値",
    statement:
      "モデル $g(x)=-2(x-32)^2+24$ を用いて、気温が30℃のときの来場者数の予測値を求めよ。",
    type: "single-choice",
    options: ["12", "14", "16", "20"],
    correctAnswer: "16",
    explanation:
      "$g(30)=-2(30-32)^2+24=-2\\times(-2)^2+24=-2\\times4+24=-8+24=16$（百人）である。前問で確認したように、このモデルは32℃を頂点としており、そこから離れるほど値が小さくなる。",
    strategy:
      "モデルに $x=30$ を代入する。$(x-32)$ を先に計算し、2乗してから $-2$ を掛ける順に進めるとミスが減る。",
    trapExplanation:
      "$-2(x-32)^2$ の2乗を忘れて $-2(30-32)=4$ としないこと。先に2乗してから係数を掛ける。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "データ読み取り"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V2_S2,
    id: "ct-m1a-v2-s2-q4",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "気温と来場者 — モデルの限界",
    statement:
      "このモデルを使って来場者数を考えるとき、最も適切な判断を選べ。",
    type: "single-choice",
    options: [
      "気温25〜34℃の範囲では傾向の参考になるが、40℃などの範囲外でも同じ式が成り立つとは限らない",
      "気温が高いほど来場者数は必ず増え続ける",
      "34℃で来場者が減っているので、気温が高い日は休業すべきである",
      "平均が20百人なので、すべての日が20百人に近いと断定できる",
    ],
    correctAnswer:
      "気温25〜34℃の範囲では傾向の参考になるが、40℃などの範囲外でも同じ式が成り立つとは限らない",
    explanation:
      "モデル $g(x)$ は、観測した25〜34℃のデータの傾向を表す近似である。範囲内では参考になるが、40℃のような範囲外の予測まで保証するものではない。データのない範囲に式をそのまま広げて断定するのは誤りである。",
    strategy:
      "モデルの解釈では、どの範囲のデータから作られた式かを必ず確認する。「必ず」「断定できる」など強い表現の選択肢は、根拠があるか疑う。",
    trapExplanation:
      "二次関数で計算できることと、現実が範囲外までその式に従うことは別である。観測範囲の外は、追加データなしに断定しない。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "選択肢消去", "データ読み取り"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第3問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V2_S3,
    id: "ct-m1a-v2-s3-q1",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "角の二等分線 — 比の確認",
    statement:
      "共通設定の三角形で、$BD:DC$ を最も簡単な整数比で表せ。",
    type: "single-choice",
    options: ["3:2", "2:3", "6:5", "5:6"],
    correctAnswer: "3:2",
    explanation:
      "角の二等分線の性質より、$BD:DC=AB:AC=6:4=3:2$ である。この比を、次の小問で $BD$ の長さを求めるときに使う。",
    strategy:
      "$\\angle A$ の二等分線が対辺を分けるとき、比はとなり合う2辺 $AB:AC$ に等しい。約分して最も簡単な整数比にする。",
    trapExplanation:
      "$BD:DC=AC:AB=4:6$ と逆にしないこと。$BD$ 側の比は、$B$ を含む辺 $AB$ に対応する。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V2_S3,
    id: "ct-m1a-v2-s3-q2",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "角の二等分線 — BDの長さ",
    statement: "$BC=5$ のとき、小問1の比を用いて $BD$ の長さを求めよ。",
    type: "blank-number",
    correctAnswer: "3",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$BD:DC=3:2$ なので、$BD$ は $BC$ 全体の $\\dfrac{3}{3+2}=\\dfrac{3}{5}$ にあたる。よって $BD=5\\times\\dfrac{3}{5}=3$ である。",
    strategy:
      "比で分けられた線分の一部は、（その比）÷（比の合計）×（全体の長さ）で求める。前問の3:2をそのまま使う。",
    trapExplanation:
      "$BD=5\\times\\dfrac{3}{2}$ としないこと。分母は比の合計 $3+2=5$ である。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V2_S3,
    id: "ct-m1a-v2-s3-q3",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "角の二等分線 — 面積比",
    statement:
      "三角形 $ABD$ と三角形 $ACD$ の面積の比を、最も簡単な整数比で表せ。",
    type: "single-choice",
    options: ["3:2", "2:3", "9:4", "1:1"],
    correctAnswer: "3:2",
    explanation:
      "三角形 $ABD$ と三角形 $ACD$ は、頂点 $A$ から直線 $BC$ までの高さが共通である。底辺はそれぞれ $BD$、$DC$ なので、面積比は底辺の比 $BD:DC=3:2$ に等しい。",
    strategy:
      "高さが同じ三角形どうしの面積比は、底辺の比に等しい。前問までの $BD:DC=3:2$ をそのまま使う。",
    trapExplanation:
      "面積比を $(3:2)^2=9:4$ としないこと。2乗の比になるのは相似な図形の場合で、ここは高さが共通な三角形である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "条件整理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V2_S3,
    id: "ct-m1a-v2-s3-q4",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "角の二等分線 — 部分の面積",
    statement:
      "三角形 $ABC$ の面積が15のとき、三角形 $ABD$ の面積を求めよ。",
    type: "blank-number",
    correctAnswer: "9",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "三角形 $ABD$ と三角形 $ABC$ は、頂点 $A$ からの高さが共通で、底辺が $BD$ と $BC$ である。$BD:BC=3:5$ なので、面積比も $3:5$。よって三角形 $ABD$ の面積は $15\\times\\dfrac{3}{5}=9$ である。",
    strategy:
      "全体 $BC$ に対する部分 $BD$ の割合を使う。$BD:BC=3:(3+2)=3:5$ を面積にそのまま掛ける。",
    trapExplanation:
      "$BD:DC=3:2$ の2や、面積比3:2を使わないこと。ここで比べる底辺は $BD$ と全体 $BC$ である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理", "条件整理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第4問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V2_S4,
    id: "ct-m1a-v2-s4-q1",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "玉の確率 — 総数",
    statement:
      "袋から同時に2個の玉を取り出す取り出し方は、全部で何通りあるか。",
    type: "blank-number",
    correctAnswer: "10",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "5個から同時に2個を選ぶので、組合せの数 $_5\\mathrm{C}_2=\\dfrac{5\\times4}{2\\times1}=10$ 通りである。この10通りを、後の小問で確率の分母として使う。",
    strategy:
      "「同時に取り出す」ので順序は区別しない。組合せ $_n\\mathrm{C}_r$ で数える。",
    trapExplanation:
      "順序を区別する $5\\times4=20$ としないこと。同時に取り出す場合は組合せで数える。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V2_S4,
    id: "ct-m1a-v2-s4-q2",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "玉の確率 — 2個とも赤",
    statement: "取り出した2個がどちらも赤玉である場合の数を求めよ。",
    type: "blank-number",
    correctAnswer: "3",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "赤玉は3個あり、その中から2個を選ぶ組合せは $_3\\mathrm{C}_2=\\dfrac{3\\times2}{2\\times1}=3$ 通りである。",
    strategy:
      "条件を満たす場合の数も、同じく組合せで数える。赤玉の個数3から2個を選ぶ。",
    trapExplanation:
      "白玉の個数2を混ぜて数えないこと。ここでは赤玉だけから2個を選ぶ。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M1A_V2_S4,
    id: "ct-m1a-v2-s4-q3",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "玉の確率 — 2個とも赤の確率",
    statement: "取り出した2個がどちらも赤玉である確率を求めよ。",
    type: "single-choice",
    options: ["$\\dfrac{3}{10}$", "$\\dfrac{3}{5}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{5}$"],
    correctAnswer: "$\\dfrac{3}{10}$",
    explanation:
      "小問1より全事象は10通り、小問2より2個とも赤になる場合は3通りである。よって確率は $\\dfrac{3}{10}$ である。",
    strategy:
      "確率は（条件を満たす場合の数）÷（全体の場合の数）。前問までの3と10をそのまま分子・分母に置く。",
    trapExplanation:
      "場合の数3をそのまま答えないこと。確率にするには全事象10で割る。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V2_S4,
    id: "ct-m1a-v2-s4-q4",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "玉の確率 — 少なくとも1個白",
    statement: "取り出した2個のうち、少なくとも1個が白玉である確率を求めよ。",
    type: "single-choice",
    options: ["$\\dfrac{7}{10}$", "$\\dfrac{2}{5}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{5}$"],
    correctAnswer: "$\\dfrac{7}{10}$",
    explanation:
      "「少なくとも1個白」の余事象は「2個とも赤」である。前問より2個とも赤の確率は $\\dfrac{3}{10}$ なので、求める確率は $1-\\dfrac{3}{10}=\\dfrac{7}{10}$ である。",
    strategy:
      "「少なくとも」は余事象を使うのが速い。全体1から「2個とも赤」の確率を引く。",
    trapExplanation:
      "白玉の場合をすべて数え上げようとすると手間がかかり、数え漏れも起きやすい。余事象で処理する。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "条件整理", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 数学IA 第3回（math-1a-70-v3）
// 第1問 三角比・余弦定理・命題 / 第2問 二次関数・データ分析 /
// 第3問 図形の性質（相似） / 第4問 場合の数・確率
// 配点 30 + 30 + 20 + 20 = 100
// ═══════════════════════════════════════════════════════════════════════════

const M1A_V3_S1 = {
  examContext:
    "第1問は、三角形 $ABC$ を考える。$AB=3$、$AC=8$、$\\angle A=60°$ とする。",
  sharedStem:
    "余弦定理で残りの辺を求め、面積や外接円の半径へ進む。最後に、条件に関する命題の真偽を考える。前の小問の結果を使う。",
  sharedData: {
    title: "三角形の条件",
    headers: ["量", "値"],
    rows: [["$AB$", "3"], ["$AC$", "8"], ["$\\angle A$", "$60°$"]],
    notes: ["$\\cos 60°=\\dfrac{1}{2}$、$\\sin 60°=\\dfrac{\\sqrt{3}}{2}$ を用いてよい。"],
  },
};

const M1A_V3_S2 = {
  examContext:
    "第2問は、ある商品の1日の売上を考える。下の表は、価格 $x$（百円）と、その価格で売れた個数 $y$（個）の関係である。価格と売上個数の関係は、表のように一定の割合で変化している。",
  sharedStem:
    "前半で表から平均や変化の割合を読み取る。後半では、売上金額（価格×個数）を二次関数とみて、最大になる価格を考える。前の小問で確認した関係を使う。",
  sharedData: {
    title: "価格と売上個数",
    headers: ["価格 $x$（百円）", "2", "3", "4", "5", "6"],
    rows: [["売上個数 $y$（個）", "90", "80", "70", "60", "50"]],
    notes: ["売上金額は（価格）×（個数）で求め、百円単位で考える。"],
  },
};

const M1A_V3_S3 = {
  examContext:
    "第3問は、三角形 $ABC$ を考える。辺 $AB$ 上に点 $D$、辺 $AC$ 上に点 $E$ があり、$DE$ は $BC$ に平行である。$AD=3$、$DB=6$ とする。",
  sharedStem:
    "平行線によってできる相似な三角形を使う。相似比から長さの比、面積の比へと進む。前の小問で求めた比を使う。",
  sharedData: {
    title: "線分の長さ",
    headers: ["線分", "$AD$", "$DB$"],
    rows: [["長さ", "3", "6"]],
    notes: ["$DE \\parallel BC$ である。"],
  },
};

const M1A_V3_S4 = {
  examContext:
    "第4問は、大小2個のさいころを同時に1回投げることを考える。大きいさいころの出た目を $a$、小さいさいころの出た目を $b$ とする。どの目も同じ程度に出るものとする。",
  sharedStem:
    "全事象を数え、目の和が特定の値になる場合の数、確率、最後に賞金の期待値へと進む。前の小問の結果を使う。",
  sharedData: {
    title: "ゲームの条件",
    headers: ["項目", "内容"],
    rows: [
      ["さいころ", "大小2個を同時に投げる"],
      ["出た目", "大を $a$、小を $b$"],
      ["賞金", "$a+b=7$ なら600円、その他は0円"],
    ],
    notes: ["2個のさいころの目は独立に決まる。"],
  },
};

const MATH_1A_70_V3: CommonTestDrillQuestion[] = [
  // ── 第1問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V3_S1,
    id: "ct-m1a-v3-s1-q1",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "三角形と余弦定理 — 残りの辺",
    statement:
      "共通設定の三角形で、余弦定理を用いて $BC$ の長さを求めよ。",
    type: "blank-number",
    correctAnswer: "7",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "余弦定理より $BC^2=AB^2+AC^2-2\\cdot AB\\cdot AC\\cos A=3^2+8^2-2\\cdot3\\cdot8\\cdot\\cos 60°=9+64-48\\times\\dfrac{1}{2}=73-24=49$。よって $BC=\\sqrt{49}=7$ である。",
    strategy:
      "2辺とその間の角が分かっているので余弦定理を使う。$\\cos 60°=\\dfrac{1}{2}$ を代入し、最後に平方根をとる。",
    trapExplanation:
      "$2\\cdot AB\\cdot AC$ の係数2を忘れないこと。また $BC^2=49$ までで止めず、平方根をとって $BC=7$ とする。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V3_S1,
    id: "ct-m1a-v3-s1-q2",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "三角形と余弦定理 — 面積",
    statement: "三角形 $ABC$ の面積を求めよ。",
    type: "single-choice",
    options: ["$6\\sqrt{3}$", "$12\\sqrt{3}$", "$6$", "$12$"],
    correctAnswer: "$6\\sqrt{3}$",
    explanation:
      "三角形の面積は $\\dfrac{1}{2}\\cdot AB\\cdot AC\\sin A=\\dfrac{1}{2}\\cdot3\\cdot8\\cdot\\sin 60°=12\\times\\dfrac{\\sqrt{3}}{2}=6\\sqrt{3}$ である。",
    strategy:
      "2辺と間の角が分かるときは、面積 $=\\dfrac{1}{2}ab\\sin C$ を使う。$\\sin 60°=\\dfrac{\\sqrt{3}}{2}$ を代入する。",
    trapExplanation:
      "$\\sin 60°$ を $\\dfrac{1}{2}$（$\\cos 60°$ の値）と取り違えないこと。面積では $\\sin$ を使う。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M1A_V3_S1,
    id: "ct-m1a-v3-s1-q3",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "三角形と余弦定理 — 外接円の半径",
    statement:
      "小問1で求めた $BC$ を用いて、三角形 $ABC$ の外接円の半径 $R$ を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{7\\sqrt{3}}{3}$",
      "$\\dfrac{14\\sqrt{3}}{3}$",
      "$\\dfrac{7\\sqrt{3}}{6}$",
      "$7\\sqrt{3}$",
    ],
    correctAnswer: "$\\dfrac{7\\sqrt{3}}{3}$",
    explanation:
      "正弦定理より $\\dfrac{BC}{\\sin A}=2R$。$BC=7$、$\\sin 60°=\\dfrac{\\sqrt{3}}{2}$ なので $\\dfrac{7}{\\sqrt{3}/2}=\\dfrac{14}{\\sqrt{3}}=2R$。よって $R=\\dfrac{7}{\\sqrt{3}}=\\dfrac{7\\sqrt{3}}{3}$ である。",
    strategy:
      "外接円の半径は正弦定理 $\\dfrac{a}{\\sin A}=2R$ から求める。$\\angle A$ の対辺が $BC$ であることを確認し、前問の $BC=7$ を使う。",
    trapExplanation:
      "$\\dfrac{BC}{\\sin A}=2R$ の $2R$ を $R$ と取り違えないこと。求めた値を2で割ってから有理化する。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V3_S1,
    id: "ct-m1a-v3-s1-q4",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "三角形と命題 — 真偽の判断",
    statement:
      "命題「三角形 $ABC$ で $\\angle A=60°$ かつ $AB=AC$ ならば、三角形 $ABC$ は正三角形である」の真偽を判断せよ。",
    type: "single-choice",
    options: [
      "正しい",
      "正しくない（反例がある）",
      "$AB=AC$ でも頂角が $60°$ なら二等辺三角形にしかならない",
      "条件だけでは判断できない",
    ],
    correctAnswer: "正しい",
    explanation:
      "$AB=AC$ より三角形は二等辺三角形で、底角 $\\angle B=\\angle C$ が等しい。内角の和は $180°$ で、$\\angle A=60°$ だから $\\angle B+\\angle C=120°$、よって $\\angle B=\\angle C=60°$。3つの角がすべて $60°$ なので正三角形である。したがって命題は正しい。",
    strategy:
      "命題の真偽は、定義にさかのぼって確かめる。二等辺の底角が等しいことと、内角の和が $180°$ であることを組み合わせる。",
    trapExplanation:
      "「頂角が $60°$ でも二等辺どまり」と考えるのは誤り。頂角が $60°$ の二等辺三角形は、底角も $60°$ になり正三角形になる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "選択肢消去"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
  },

  // ── 第2問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V3_S2,
    id: "ct-m1a-v3-s2-q1",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "価格と売上 — 平均",
    statement: "共通資料の5つの価格における売上個数の平均を求めよ。",
    type: "blank-number",
    correctAnswer: "70",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "売上個数は $90,80,70,60,50$（個）。合計は $90+80+70+60+50=350$、データ数は5なので、平均は $350\\div5=70$ 個である。",
    strategy:
      "売上個数の行だけを足し、データ数で割る。価格の行を混ぜないように注意する。",
    trapExplanation:
      "価格 $x$ の行を足してしまわないこと。平均を求める対象は売上個数 $y$ の行である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V3_S2,
    id: "ct-m1a-v3-s2-q2",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "価格と売上 — 変化の割合",
    statement: "価格が1百円上がるごとに、売上個数はどう変化しているか。",
    type: "single-choice",
    options: ["10個ずつ増える", "10個ずつ減る", "変わらない", "20個ずつ減る"],
    correctAnswer: "10個ずつ減る",
    explanation:
      "表を見ると、価格が $2\\to3\\to4\\to5\\to6$ と1ずつ上がるにつれ、売上個数は $90\\to80\\to70\\to60\\to50$ と10ずつ減っている。よって、価格が1百円上がるごとに売上個数は10個ずつ減る。",
    strategy:
      "変化の割合は、となり合う値の差を見る。価格が等間隔に増えているとき、個数の差が一定かどうかを確認する。",
    trapExplanation:
      "減っているのに「増える」を選ばないこと。値の増減の向きを表で確認する。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M1A_V3_S2,
    id: "ct-m1a-v3-s2-q3",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "価格と売上 — 売上金額",
    statement:
      "価格が5百円のときの売上金額（百円）を求めよ。売上金額は（価格）×（個数）で考える。",
    type: "single-choice",
    options: ["250", "300", "330", "360"],
    correctAnswer: "300",
    explanation:
      "価格5百円のときの売上個数は表より60個。売上金額は $5\\times60=300$（百円）である。前問で確認した「価格が上がると個数が減る」関係のもとで、価格と個数を掛け合わせる。",
    strategy:
      "売上金額は価格と個数の積。表から価格5に対応する個数60を読み取り、掛ける。",
    trapExplanation:
      "価格だけ、個数だけを答えないこと。売上金額は2つの積である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V3_S2,
    id: "ct-m1a-v3-s2-q4",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "価格と売上 — 最大の売上金額",
    statement: "売上金額について、最も適切な判断を選べ。",
    type: "single-choice",
    options: [
      "価格を5百円または6百円にしたとき、売上金額は最大の300百円になる",
      "価格を高くするほど、売上金額は増え続ける",
      "価格2百円のとき、売上金額が最大になる",
      "売上金額は価格に関係なく一定である",
    ],
    correctAnswer:
      "価格を5百円または6百円にしたとき、売上金額は最大の300百円になる",
    explanation:
      "売上個数は $y=110-10x$ と表せる（$x=2$ で $y=90$）。売上金額 $R=x\\,y=x(110-10x)=-10x^2+110x$ で、これは上に凸の二次関数。表の価格 $2,3,4,5,6$ で計算すると $180,240,280,300,300$ となり、$x=5$ と $x=6$ のとき最大の300百円になる。",
    strategy:
      "売上金額を価格ごとに計算して比べる。二次関数として頂点付近（$x=5.5$）の整数値5と6を調べると速い。",
    trapExplanation:
      "「価格を上げるほど増える」は誤り。個数が減るため、ある価格を超えると売上金額は下がりに転じる。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["数式変形", "データ読み取り", "選択肢消去"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第3問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V3_S3,
    id: "ct-m1a-v3-s3-q1",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "相似と平行線 — 相似比",
    statement:
      "$DE \\parallel BC$ のとき、$DE:BC$ を最も簡単な整数比で表せ。",
    type: "single-choice",
    options: ["1:2", "1:3", "2:3", "3:1"],
    correctAnswer: "1:3",
    explanation:
      "$DE \\parallel BC$ より、三角形 $ADE$ と三角形 $ABC$ は相似である。相似比は $AD:AB=3:(3+6)=3:9=1:3$。対応する辺なので $DE:BC=1:3$ である。",
    strategy:
      "平行線があれば相似を疑う。相似比は $AD:AB$ で、$AB=AD+DB$ を先に求めてから比をとる。",
    trapExplanation:
      "$AD:DB=3:6=1:2$ を相似比にしないこと。相似比は $AD$ と全体 $AB$ の比である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V3_S3,
    id: "ct-m1a-v3-s3-q2",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "相似と平行線 — DEの長さ",
    statement: "$BC=12$ のとき、小問1の比を用いて $DE$ の長さを求めよ。",
    type: "blank-number",
    correctAnswer: "4",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$DE:BC=1:3$ なので、$DE=BC\\times\\dfrac{1}{3}=12\\times\\dfrac{1}{3}=4$ である。",
    strategy:
      "相似比を長さに掛ける。前問の $1:3$ から、$DE$ は $BC$ の $\\dfrac{1}{3}$ と分かる。",
    trapExplanation:
      "$DE=12\\times3=36$ と逆数を掛けないこと。$DE$ は $BC$ より短いので $\\dfrac{1}{3}$ を掛ける。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V3_S3,
    id: "ct-m1a-v3-s3-q3",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "相似と平行線 — 面積比",
    statement:
      "三角形 $ADE$ と三角形 $ABC$ の面積比を、最も簡単な整数比で表せ。",
    type: "single-choice",
    options: ["1:3", "1:6", "1:9", "2:9"],
    correctAnswer: "1:9",
    explanation:
      "相似な図形の面積比は、相似比の2乗に等しい。相似比が $1:3$ なので、面積比は $1^2:3^2=1:9$ である。",
    strategy:
      "相似な図形では、面積比＝（相似比）$^2$。前問までの相似比 $1:3$ を2乗する。",
    trapExplanation:
      "面積比を相似比のまま $1:3$ としないこと。長さの比を2乗したものが面積比になる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "条件整理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V3_S3,
    id: "ct-m1a-v3-s3-q4",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "相似と平行線 — 台形の面積比",
    statement:
      "台形 $DBCE$ の面積は、三角形 $ABC$ の面積の何倍か。",
    type: "single-choice",
    options: ["$\\dfrac{1}{9}$", "$\\dfrac{2}{3}$", "$\\dfrac{8}{9}$", "$\\dfrac{1}{3}$"],
    correctAnswer: "$\\dfrac{8}{9}$",
    explanation:
      "台形 $DBCE$ は、三角形 $ABC$ から三角形 $ADE$ を除いた部分である。前問より三角形 $ADE$ は三角形 $ABC$ の $\\dfrac{1}{9}$ なので、台形は $1-\\dfrac{1}{9}=\\dfrac{8}{9}$ 倍である。",
    strategy:
      "台形＝全体−小三角形 と考える。前問の面積比 $\\dfrac{1}{9}$ を1から引く。",
    trapExplanation:
      "台形の面積比を $\\dfrac{1}{9}$ としないこと。$\\dfrac{1}{9}$ は除いた三角形 $ADE$ の方の割合である。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "条件整理", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第4問 ───────────────────────────────────────────────────────────────
  {
    ...M1A_V3_S4,
    id: "ct-m1a-v3-s4-q1",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "さいころの確率 — 全事象",
    statement:
      "大小2個のさいころを投げるとき、目の出方は全部で何通りあるか。",
    type: "blank-number",
    correctAnswer: "36",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "大きいさいころの目が6通り、小さいさいころの目が6通りで、これらは独立に決まる。よって目の出方は $6\\times6=36$ 通りである。この36通りを、後の小問で確率の分母に使う。",
    strategy:
      "2個のさいころは区別できるので、積の法則で $6\\times6$ と数える。",
    trapExplanation:
      "$6+6=12$ としないこと。大と小の目の組合せなので、和ではなく積で数える。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M1A_V3_S4,
    id: "ct-m1a-v3-s4-q2",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "さいころの確率 — 和が7",
    statement: "目の和 $a+b$ が7になる場合の数を求めよ。",
    type: "blank-number",
    correctAnswer: "6",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$a+b=7$ となる $(a,b)$ は $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ の6通りである。大小を区別して数える。",
    strategy:
      "和が一定になる組を、$a$ を1から順に決めて数える。大小を区別するので $(1,6)$ と $(6,1)$ は別に数える。",
    trapExplanation:
      "$(1,6)$ と $(6,1)$ を同じものとして3通りとしないこと。大小のさいころは区別される。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M1A_V3_S4,
    id: "ct-m1a-v3-s4-q3",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "さいころの確率 — 和が7の確率",
    statement: "目の和が7になる確率を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{1}{6}$",
      "$\\dfrac{1}{9}$",
      "$\\dfrac{5}{36}$",
      "$\\dfrac{1}{12}$",
    ],
    correctAnswer: "$\\dfrac{1}{6}$",
    explanation:
      "小問1より全事象は36通り、小問2より和が7になるのは6通り。よって確率は $\\dfrac{6}{36}=\\dfrac{1}{6}$ である。",
    strategy:
      "確率は（条件を満たす場合の数）÷（全事象）。前問までの6と36を約分する。",
    trapExplanation:
      "$\\dfrac{6}{36}$ を約分し忘れないこと。また分母を全事象36にする（場合の数6を分母にしない）。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M1A_V3_S4,
    id: "ct-m1a-v3-s4-q4",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "さいころの確率 — 期待値",
    statement:
      "共通資料のゲームでは、$a+b=7$ なら600円、その他は0円を受け取る。受け取る金額の期待値（円）を求めよ。",
    type: "blank-number",
    correctAnswer: "100",
    answerFormat: "digits",
    digitSlots: [{ label: "アイウ", length: 3 }],
    explanation:
      "前問より $a+b=7$ になる確率は $\\dfrac{1}{6}$。期待値は $600\\times\\dfrac{1}{6}+0\\times\\dfrac{5}{6}=100$ 円である。前問で求めた確率をそのまま賞金に掛ける。",
    strategy:
      "期待値は（金額）×（その確率）の合計。前問の $\\dfrac{1}{6}$ を使えば計算し直さずに済む。",
    trapExplanation:
      "場合の数6を直接600に掛けないこと。期待値では場合の数ではなく確率を使う。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理", "条件整理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 数学II・B・C 第2回（math-2bc-70-v2）
// 第1問 三角関数 / 第2問 微積分・指数対数 / 第3問 数列 /
// 第4問 統計的推測 / 第5問 ベクトル / 第6問 平面上の曲線 / 第7問 複素数平面
// 必答 1・2・3、選択 4〜7 から3題。配点 15+15+22 + 16×3 = 100
// ═══════════════════════════════════════════════════════════════════════════

const M2BC_V2_S1 = {
  examContext:
    "第1問は、関数 $f(\\theta)=\\sin\\theta+\\cos\\theta$（$0 \\leqq \\theta \\leqq \\dfrac{\\pi}{2}$）を考える。",
  sharedStem:
    "三角関数の合成で $f(\\theta)$ を1つの $\\sin$ にまとめ、最大値や最大になる角を調べる。後半では $t=\\sin\\theta+\\cos\\theta$ とおいて $\\sin\\theta\\cos\\theta$ を表す。前の小問の結果を使う。",
  sharedData: {
    title: "用いる関係",
    headers: ["項目", "内容"],
    rows: [
      ["合成", "$a\\sin\\theta+b\\cos\\theta=\\sqrt{a^2+b^2}\\sin(\\theta+\\alpha)$"],
      ["関係式", "$(\\sin\\theta+\\cos\\theta)^2=1+2\\sin\\theta\\cos\\theta$"],
    ],
    notes: ["$0 \\leqq \\theta \\leqq \\dfrac{\\pi}{2}$ では $t=\\sin\\theta+\\cos\\theta$ は $1$ から $\\sqrt{2}$ まで動く。"],
  },
};

const M2BC_V2_S2 = {
  examContext:
    "第2問は、関数 $f(x)=x^2-4x+3$ のグラフを中心に、微分・積分と指数を考える。",
  sharedStem:
    "前半は微分で接線を、続いて定積分で面積を求める。最後に指数の方程式を解く。前の小問で求めた値を使う。",
  sharedData: {
    title: "確認事項",
    headers: ["項目", "内容"],
    rows: [
      ["因数分解", "$f(x)=x^2-4x+3=(x-1)(x-3)$"],
      ["導関数", "$f'(x)=2x-4$"],
    ],
    notes: ["グラフは下に凸の放物線で、$x$ 軸と $x=1,3$ で交わる。"],
  },
};

const M2BC_V2_S3 = {
  examContext:
    "第3問は、正方形のタイルを階段状に並べる。第1番目の図形はタイル1個で、図形が1つ進むごとにタイルが2個ずつ増える。第 $n$ 番目の図形のタイル数を $a_n$ とする。",
  sharedStem:
    "具体的なタイル数を確認し、一般項、和、そして条件を満たす最小の番号へと進む。前の小問で得た式を後半で使う。",
  sharedData: {
    title: "タイル数の一部",
    headers: ["番号 $n$", "1", "2", "3", "4"],
    rows: [["タイル数 $a_n$", "1", "3", "5", "?"]],
    notes: ["タイル数は1個から始まり、2個ずつ増える等差数列である。"],
  },
};

const M2BC_V2_S4 = {
  examContext:
    "第4問は、ある工場で作る製品の重さを調べる。重さの母標準偏差は $\\sigma=20$ g とする。大きさ $n=100$ の標本をとると、標本平均は $500$ g であった。",
  sharedStem:
    "標本平均の標準偏差（標準誤差）をまず求め、それを用いて信頼区間や判断、標本数を変えたときの変化を考える。前の小問の値を使う。",
  sharedData: {
    title: "標準正規分布の値",
    headers: ["範囲", "確率"],
    rows: [["$P(-1.96 \\leqq Z \\leqq 1.96)$", "0.95"]],
    notes: ["信頼区間では、標本平均の標準偏差（標準誤差）$\\dfrac{\\sigma}{\\sqrt{n}}$ を用いる。"],
  },
};

const M2BC_V2_S5 = {
  examContext:
    "第5問は、座標平面上の三角形 $OAB$ を考える。$O$ は原点で、$A(4,0)$、$B(2,6)$ とする。点 $M$ は辺 $AB$ の中点である。",
  sharedStem:
    "内積、中点の座標、三角形の面積の順に求める。最後に、中点 $M$ を使って小さい三角形の面積を考える。前の小問の結果を使う。",
  sharedData: {
    title: "点の座標",
    headers: ["点", "座標"],
    rows: [["$O$", "$(0,0)$"], ["$A$", "$(4,0)$"], ["$B$", "$(2,6)$"]],
    notes: ["$M$ は辺 $AB$ の中点である。"],
  },
};

const M2BC_V2_S6 = {
  examContext:
    "第6問は、楕円 $\\dfrac{x^2}{9}+\\dfrac{y^2}{4}=1$ を考える。",
  sharedStem:
    "長半径・短半径を確認し、焦点、焦点からの距離の和、楕円上の点へと進む。",
  sharedData: {
    title: "楕円の基本",
    headers: ["量", "意味"],
    rows: [
      ["$a^2$", "$x^2$ の分母（$=9$）"],
      ["$b^2$", "$y^2$ の分母（$=4$）"],
      ["$c$", "$c^2=a^2-b^2$（中心から焦点までの距離）"],
    ],
    notes: ["この楕円は $x$ 軸方向に長い。"],
  },
};

const M2BC_V2_S7 = {
  examContext: "第7問は、複素数 $z=1+\\sqrt{3}\\,i$ を考える。",
  sharedStem:
    "絶対値と偏角を求めて極形式で表し、2乗や回転を調べる。前の小問の結果を使う。",
  sharedData: {
    title: "極形式",
    headers: ["量", "内容"],
    rows: [
      ["絶対値", "$|z|=\\sqrt{a^2+b^2}$"],
      ["極形式", "$z=r(\\cos\\theta+i\\sin\\theta)$"],
    ],
    notes: ["$z=a+bi$ の偏角は、複素数平面上で原点と点 $(a,b)$ を結ぶ向きで考える。"],
  },
};

const MATH_2BC_70_V2: CommonTestDrillQuestion[] = [
  // ── 第1問 三角関数 ───────────────────────────────────────────────────────
  {
    ...M2BC_V2_S1,
    id: "ct-m2bc-v2-s1-q1",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数の合成 — 最大値",
    statement:
      "$f(\\theta)=\\sin\\theta+\\cos\\theta$ を合成したとき、$f(\\theta)$ の最大値を求めよ。",
    type: "single-choice",
    options: ["$\\sqrt{2}$", "$2$", "$1$", "$\\dfrac{\\sqrt{2}}{2}$"],
    correctAnswer: "$\\sqrt{2}$",
    explanation:
      "合成すると $f(\\theta)=\\sqrt{1^2+1^2}\\sin\\left(\\theta+\\dfrac{\\pi}{4}\\right)=\\sqrt{2}\\sin\\left(\\theta+\\dfrac{\\pi}{4}\\right)$。$\\sin$ の最大値は1なので、$f(\\theta)$ の最大値は $\\sqrt{2}$ である。",
    strategy:
      "$a\\sin\\theta+b\\cos\\theta$ は $\\sqrt{a^2+b^2}$ を振幅とする1つの $\\sin$ にまとめられる。最大値は振幅に等しい。",
    trapExplanation:
      "最大値を $1+1=2$ としないこと。$\\sin\\theta$ と $\\cos\\theta$ が同時に1になる角はないため、和の最大は2にならない。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S1,
    id: "ct-m2bc-v2-s1-q2",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数の合成 — 最大となる角",
    statement:
      "$0 \\leqq \\theta \\leqq \\dfrac{\\pi}{2}$ の範囲で、$f(\\theta)$ が最大となる $\\theta$ を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{\\pi}{6}$",
      "$\\dfrac{\\pi}{4}$",
      "$\\dfrac{\\pi}{3}$",
      "$\\dfrac{\\pi}{2}$",
    ],
    correctAnswer: "$\\dfrac{\\pi}{4}$",
    explanation:
      "前問より $f(\\theta)=\\sqrt{2}\\sin\\left(\\theta+\\dfrac{\\pi}{4}\\right)$。最大になるのは $\\sin\\left(\\theta+\\dfrac{\\pi}{4}\\right)=1$、すなわち $\\theta+\\dfrac{\\pi}{4}=\\dfrac{\\pi}{2}$ のとき。よって $\\theta=\\dfrac{\\pi}{4}$ である。",
    strategy:
      "合成後の $\\sin(\\theta+\\alpha)$ が1になる角を探す。$\\theta+\\dfrac{\\pi}{4}=\\dfrac{\\pi}{2}$ から $\\theta$ を求める。",
    trapExplanation:
      "$\\theta=\\dfrac{\\pi}{2}$ を選ばないこと。そこでは $\\theta+\\dfrac{\\pi}{4}=\\dfrac{3\\pi}{4}$ となり、$\\sin$ は1にならない。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S1,
    id: "ct-m2bc-v2-s1-q3",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数の合成 — 積を t で表す",
    statement:
      "$t=\\sin\\theta+\\cos\\theta$ とおくとき、$\\sin\\theta\\cos\\theta$ を $t$ で表せ。",
    type: "single-choice",
    options: [
      "$\\dfrac{t^2-1}{2}$",
      "$\\dfrac{1-t^2}{2}$",
      "$t^2-1$",
      "$\\dfrac{t^2+1}{2}$",
    ],
    correctAnswer: "$\\dfrac{t^2-1}{2}$",
    explanation:
      "$t^2=(\\sin\\theta+\\cos\\theta)^2=\\sin^2\\theta+\\cos^2\\theta+2\\sin\\theta\\cos\\theta=1+2\\sin\\theta\\cos\\theta$。よって $\\sin\\theta\\cos\\theta=\\dfrac{t^2-1}{2}$ である。",
    strategy:
      "$t$ を2乗して、$\\sin^2\\theta+\\cos^2\\theta=1$ を使う。残った $2\\sin\\theta\\cos\\theta$ について解く。",
    trapExplanation:
      "$t^2=1-2\\sin\\theta\\cos\\theta$ と符号を誤らないこと。展開すると $+2\\sin\\theta\\cos\\theta$ になる。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S1,
    id: "ct-m2bc-v2-s1-q4",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数の合成 — 和と積の最大",
    statement:
      "$g(\\theta)=\\sin\\theta\\cos\\theta+\\sin\\theta+\\cos\\theta$ の最大値を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{1}{2}+\\sqrt{2}$",
      "$\\dfrac{1}{2}$",
      "$1+\\sqrt{2}$",
      "$\\sqrt{2}$",
    ],
    correctAnswer: "$\\dfrac{1}{2}+\\sqrt{2}$",
    explanation:
      "$t=\\sin\\theta+\\cos\\theta$ とおくと、前問より $\\sin\\theta\\cos\\theta=\\dfrac{t^2-1}{2}$。よって $g=\\dfrac{t^2-1}{2}+t=\\dfrac{t^2+2t-1}{2}$。$0 \\leqq \\theta \\leqq \\dfrac{\\pi}{2}$ では $t$ は $1$ から $\\sqrt{2}$ まで動き、$g$ はこの範囲で $t$ について増加する。よって $t=\\sqrt{2}$ で最大となり、$g=\\dfrac{2+2\\sqrt{2}-1}{2}=\\dfrac{1}{2}+\\sqrt{2}$ である。",
    strategy:
      "和と積が混じった式は $t=\\sin\\theta+\\cos\\theta$ で1変数にまとめる。前問の置き換えを使い、$t$ の動く範囲で最大を調べる。",
    trapExplanation:
      "$t$ の範囲を $[-\\sqrt{2},\\sqrt{2}]$ としないこと。$0 \\leqq \\theta \\leqq \\dfrac{\\pi}{2}$ では $t \\geqq 1$ で、最大は $t=\\sqrt{2}$ のとき。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第2問 微積分・指数 ───────────────────────────────────────────────────
  {
    ...M2BC_V2_S2,
    id: "ct-m2bc-v2-s2-q1",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "微分 — 接線の傾き",
    statement: "$f(x)=x^2-4x+3$ について、$x=3$ における接線の傾きを求めよ。",
    type: "blank-number",
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$f'(x)=2x-4$ なので、$x=3$ での傾きは $f'(3)=2\\times3-4=2$ である。接線の傾きは導関数の値で求める。",
    strategy:
      "接線の傾きは導関数に $x$ の値を代入する。$f'(x)=2x-4$ を先に求めておく。",
    trapExplanation:
      "$f(3)=0$（関数の値）を傾きと混同しないこと。傾きは $f'(3)$ である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S2,
    id: "ct-m2bc-v2-s2-q2",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "微分 — 接線の y切片",
    statement:
      "小問1の点における接線の方程式を求め、その $y$ 切片を答えよ。",
    type: "single-choice",
    options: ["$-6$", "$6$", "$-3$", "$3$"],
    correctAnswer: "$-6$",
    explanation:
      "接点は $(3,f(3))=(3,0)$、傾きは前問より2。接線は $y-0=2(x-3)$、すなわち $y=2x-6$。$y$ 切片は $-6$ である。",
    strategy:
      "接線は（点）と（傾き）から $y-f(a)=f'(a)(x-a)$ で立てる。前問の傾き2と接点 $(3,0)$ を使う。",
    trapExplanation:
      "接点の $x$ 座標3を $y$ 切片と混同しないこと。$y$ 切片は $x=0$ を代入した値である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S2,
    id: "ct-m2bc-v2-s2-q3",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "積分 — 曲線と x 軸の面積",
    statement:
      "曲線 $y=x^2-4x+3$ と $x$ 軸で囲まれた部分の面積を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{4}{3}$",
      "$\\dfrac{2}{3}$",
      "$\\dfrac{8}{3}$",
      "$4$",
    ],
    correctAnswer: "$\\dfrac{4}{3}$",
    explanation:
      "曲線は $x=1,3$ で $x$ 軸と交わり、その間では $y<0$（下に凸で下側）。面積は $\\displaystyle\\int_1^3 -(x^2-4x+3)\\,dx$。$\\displaystyle\\int_1^3 (x^2-4x+3)\\,dx=\\Big[\\dfrac{x^3}{3}-2x^2+3x\\Big]_1^3=0-\\dfrac{4}{3}=-\\dfrac{4}{3}$ なので、面積は $\\dfrac{4}{3}$ である。",
    strategy:
      "まず曲線と $x$ 軸の交点を求めて積分区間を決める。曲線が $x$ 軸の下にある区間は、符号を反転して面積にする。",
    trapExplanation:
      "$\\displaystyle\\int_1^3(x^2-4x+3)dx=-\\dfrac{4}{3}$ をそのまま面積にしないこと。面積は絶対値をとって $\\dfrac{4}{3}$ にする。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S2,
    id: "ct-m2bc-v2-s2-q4",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "指数 — 方程式を解く",
    statement: "方程式 $2^x=8\\sqrt{2}$ を満たす $x$ を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{7}{2}$",
      "$\\dfrac{5}{2}$",
      "$3$",
      "$4$",
    ],
    correctAnswer: "$\\dfrac{7}{2}$",
    explanation:
      "右辺を2の累乗で表すと $8\\sqrt{2}=2^3\\cdot2^{1/2}=2^{7/2}$。よって $2^x=2^{7/2}$ より $x=\\dfrac{7}{2}$ である。",
    strategy:
      "両辺を同じ底の累乗にそろえる。$8=2^3$、$\\sqrt{2}=2^{1/2}$ を使い、指数どうしを比べる。",
    trapExplanation:
      "$8\\sqrt{2}$ を $2^3$ だけと見て $x=3$ としないこと。$\\sqrt{2}=2^{1/2}$ の分を足す。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
  },

  // ── 第3問 数列 ───────────────────────────────────────────────────────────
  {
    ...M2BC_V2_S3,
    id: "ct-m2bc-v2-s3-q1",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — タイル数の具体値",
    statement: "第4番目の図形のタイル数 $a_4$ を求めよ。",
    type: "blank-number",
    correctAnswer: "7",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "タイル数は $a_1=1$ から2個ずつ増えるので、$a_2=3$、$a_3=5$、$a_4=7$ である。まず具体的な項を確認しておく。",
    strategy:
      "等差数列では、初項から公差を順に足していく。$1,3,5,\\dots$ と並べれば $a_4=7$ がすぐ分かる。",
    trapExplanation:
      "$a_4=1+2\\times4=9$ としないこと。第1番目で既に1個あるので、増える回数は3回である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S3,
    id: "ct-m2bc-v2-s3-q2",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — 一般項と第10項",
    statement: "一般項を用いて、第10番目の図形のタイル数 $a_{10}$ を求めよ。",
    type: "blank-number",
    correctAnswer: "19",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "初項1、公差2の等差数列なので、一般項は $a_n=1+2(n-1)=2n-1$。よって $a_{10}=2\\times10-1=19$ である。",
    strategy:
      "等差数列の一般項は $a_n=a_1+(n-1)d$。初項1、公差2を代入して $a_n=2n-1$ を作り、$n=10$ を入れる。",
    trapExplanation:
      "$a_{10}=2\\times10=20$ としないこと。一般項は $2n-1$ で、1を引く必要がある。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S3,
    id: "ct-m2bc-v2-s3-q3",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — 和",
    statement:
      "第1番目から第10番目までのタイル数の合計 $S_{10}$ を求めよ。",
    type: "blank-number",
    correctAnswer: "100",
    answerFormat: "digits",
    digitSlots: [{ label: "アイウ", length: 3 }],
    explanation:
      "等差数列の和は $S_n=\\dfrac{n(a_1+a_n)}{2}$。前問より $a_{10}=19$ なので、$S_{10}=\\dfrac{10(1+19)}{2}=\\dfrac{10\\times20}{2}=100$ である。一般に $S_n=n^2$ となることも確かめられる。",
    strategy:
      "和は（初項＋末項）×（項数）÷2 で求める。前問で求めた末項 $a_{10}=19$ を使う。",
    trapExplanation:
      "末項を $a_{10}=20$ と誤ると合計もずれる。前問の値19を正しく使う。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S3,
    id: "ct-m2bc-v2-s3-q4",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — 条件を満たす最小の番号",
    statement:
      "合計タイル数 $S_n$ が初めて200以上になる最小の $n$ を求めよ。",
    type: "blank-number",
    correctAnswer: "15",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "前問の考え方より $S_n=n^2$。$n^2\\geqq200$ を満たす最小の整数を探すと、$14^2=196<200$、$15^2=225\\geqq200$。よって最小の $n$ は15である。",
    strategy:
      "$S_n=n^2$ と分かれば、$n^2\\geqq200$ の境目を調べる。14と15を実際に2乗して比べる。",
    trapExplanation:
      "$14^2=196$ は200に近いが、まだ200未満である。条件を満たす最小値は15である。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "条件整理", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第4問 統計的推測 ─────────────────────────────────────────────────────
  {
    ...M2BC_V2_S4,
    id: "ct-m2bc-v2-s4-q1",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 標準誤差",
    statement: "標本平均の標準偏差（標準誤差）を求めよ。",
    type: "blank-number",
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "標本平均の標準偏差は $\\dfrac{\\sigma}{\\sqrt{n}}=\\dfrac{20}{\\sqrt{100}}=\\dfrac{20}{10}=2$ である。この値を、次の信頼区間で使う。",
    strategy:
      "標本平均のばらつきは、母標準偏差を $\\sqrt{n}$ で割って求める。先に $\\sqrt{100}=10$ を計算する。",
    trapExplanation:
      "母標準偏差20をそのまま使ったり、$n=100$ で割って $0.2$ としないこと。割るのは $\\sqrt{n}=10$ である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S4,
    id: "ct-m2bc-v2-s4-q2",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 95%信頼区間",
    statement:
      "前問の値を用いて、母平均 $m$ に対する信頼度95%の信頼区間を求めよ。",
    type: "single-choice",
    options: [
      "$496.08 \\leqq m \\leqq 503.92$",
      "$498.04 \\leqq m \\leqq 501.96$",
      "$480.4 \\leqq m \\leqq 519.6$",
      "$496 \\leqq m \\leqq 504$",
    ],
    correctAnswer: "$496.08 \\leqq m \\leqq 503.92$",
    explanation:
      "信頼区間は（標本平均）$\\pm1.96\\times$（標準誤差）。前問の標準誤差2を用いると、$500\\pm1.96\\times2=500\\pm3.92$。よって $496.08 \\leqq m \\leqq 503.92$ である。",
    strategy:
      "信頼区間は標本平均を中心に、$1.96\\times$（標準誤差）の幅を左右にとる。前問の標準誤差2をそのまま使う。",
    trapExplanation:
      "$1.96$ を母標準偏差20に掛けないこと。掛けるのは標準誤差2である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S4,
    id: "ct-m2bc-v2-s4-q3",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 区間に基づく判断",
    statement:
      "前問の信頼区間をもとに、母平均が498 g であるという見方について最も適切なものを選べ。",
    type: "single-choice",
    options: [
      "498 g は信頼区間に含まれるので、この標本だけからは母平均が498 g でないとは言い切れない",
      "498 g は信頼区間の外なので、母平均ではない",
      "標本平均が500 g なので、母平均は必ず500 g である",
      "標本の大きさが100なので、誤差は100 g である",
    ],
    correctAnswer:
      "498 g は信頼区間に含まれるので、この標本だけからは母平均が498 g でないとは言い切れない",
    explanation:
      "前問の信頼区間は $496.08$ から $503.92$ で、498 g を含む。区間に含まれる値は、この標本の結果だけでただちに否定することはできない。",
    strategy:
      "信頼区間の解釈では、対象の値が区間に入るかをまず確認する。入っていれば、その値を否定する強い根拠にはならない。",
    trapExplanation:
      "標本平均500と候補498を単純に比べて「違う」と判断しないこと。標本平均にはばらつきがあるため、区間で考える。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S4,
    id: "ct-m2bc-v2-s4-q4",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 標本数を変える",
    statement:
      "同じ母標準偏差 $20$ g のもとで、標本の大きさを400にしたときの標準誤差を求めよ。",
    type: "blank-number",
    correctAnswer: "1",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "標準誤差は $\\dfrac{20}{\\sqrt{400}}=\\dfrac{20}{20}=1$ である。標本を多くすると、標本平均のばらつきは小さくなる。",
    strategy:
      "公式は同じで、$n$ だけが変わる。$\\sqrt{400}=20$ を先に計算してから割る。",
    trapExplanation:
      "標本数が4倍になっても、標準誤差は4分の1ではなく2分の1になる。平方根で効くことを確認する。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第5問 ベクトル ───────────────────────────────────────────────────────
  {
    ...M2BC_V2_S5,
    id: "ct-m2bc-v2-s5-q1",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 内積",
    statement: "$\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$ を求めよ。",
    type: "blank-number",
    correctAnswer: "8",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\overrightarrow{OA}=(4,0)$、$\\overrightarrow{OB}=(2,6)$ なので、内積は $4\\times2+0\\times6=8$ である。",
    strategy:
      "成分どうしの内積は、$x$ 成分の積と $y$ 成分の積を足す。$\\overrightarrow{OA}$ の $y$ 成分が0なので計算は短い。",
    trapExplanation:
      "座標を足すなどしないこと。内積は対応する成分の積の和である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S5,
    id: "ct-m2bc-v2-s5-q2",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 中点の座標",
    statement:
      "辺 $AB$ の中点 $M$ の座標を $(x,y)$ とするとき、$x+y$ の値を求めよ。",
    type: "blank-number",
    correctAnswer: "6",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "中点の座標は両端の平均で、$M=\\left(\\dfrac{4+2}{2},\\dfrac{0+6}{2}\\right)=(3,3)$。よって $x+y=3+3=6$ である。",
    strategy:
      "中点は各座標の平均。$A$ と $B$ の $x$ 座標、$y$ 座標をそれぞれ平均する。",
    trapExplanation:
      "$A$ と $B$ の座標を引いたり足したまま2で割らなかったりしないこと。平均をとる。",
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M2BC_V2_S5,
    id: "ct-m2bc-v2-s5-q3",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 三角形の面積",
    statement: "三角形 $OAB$ の面積を求めよ。",
    type: "blank-number",
    correctAnswer: "12",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "原点を頂点とする三角形の面積は $\\dfrac{1}{2}|x_A y_B-x_B y_A|=\\dfrac{1}{2}|4\\times6-2\\times0|=\\dfrac{1}{2}\\times24=12$ である。",
    strategy:
      "$O$ を頂点にもつ三角形は、$\\dfrac{1}{2}|x_A y_B-x_B y_A|$ で面積が出せる。成分をそのまま代入する。",
    trapExplanation:
      "$x_A y_B-x_B y_A$ の引く順序を入れ替えると符号が変わる。面積は絶対値をとるので、最後に正にする。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
  },
  {
    ...M2BC_V2_S5,
    id: "ct-m2bc-v2-s5-q4",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 中点で分けた三角形",
    statement:
      "中点 $M$ を用いるとき、三角形 $OAM$ の面積を求めよ。",
    type: "single-choice",
    options: ["6", "12", "3", "24"],
    correctAnswer: "6",
    explanation:
      "$M$ は辺 $AB$ の中点なので、$AM=\\dfrac{1}{2}AB$。三角形 $OAM$ と三角形 $OAB$ は頂点 $O$ から底辺 $AB$ への高さが共通で、底辺だけが半分になる。よって面積も半分で、前問の $12$ の半分の $6$ である。",
    strategy:
      "中点で分けると、底辺が半分になり高さは共通。面積は元の三角形の半分になる。前問の面積12を半分にする。",
    trapExplanation:
      "面積を $12$ のままにしたり、$\\dfrac{1}{4}$ にしたりしないこと。底辺だけが半分なので面積も半分である。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "条件整理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第6問 平面上の曲線 ───────────────────────────────────────────────────
  {
    ...M2BC_V2_S6,
    id: "ct-m2bc-v2-s6-q1",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "楕円 — 長半径",
    statement:
      "楕円 $\\dfrac{x^2}{9}+\\dfrac{y^2}{4}=1$ の長半径（$x$ 軸方向の半径）を求めよ。",
    type: "blank-number",
    correctAnswer: "3",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$x^2$ の分母が $a^2=9$ なので、$a=3$。$x$ 軸方向に長いので、長半径は3である。",
    strategy:
      "分母の大きい方が長軸の側。$a^2=9$ から $a=3$ を求める。",
    trapExplanation:
      "$a^2=9$ をそのまま9と答えないこと。半径は平方根の3である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S6,
    id: "ct-m2bc-v2-s6-q2",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "楕円 — 焦点",
    statement: "この楕円の焦点の座標を求めよ。",
    type: "single-choice",
    options: [
      "$(\\pm\\sqrt{5},0)$",
      "$(0,\\pm\\sqrt{5})$",
      "$(\\pm5,0)$",
      "$(\\pm\\sqrt{13},0)$",
    ],
    correctAnswer: "$(\\pm\\sqrt{5},0)$",
    explanation:
      "$c^2=a^2-b^2=9-4=5$ より $c=\\sqrt{5}$。$x$ 軸方向に長い楕円なので、焦点は $x$ 軸上にあり、$(\\pm\\sqrt{5},0)$ である。",
    strategy:
      "焦点までの距離は $c^2=a^2-b^2$ で求める。長軸の向き（ここでは $x$ 軸）に焦点が並ぶ。",
    trapExplanation:
      "$c^2=a^2+b^2$ としないこと。楕円では引き算で、$y$ 軸上ではなく $x$ 軸上に焦点がある。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "条件整理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S6,
    id: "ct-m2bc-v2-s6-q3",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "楕円 — 焦点からの距離の和",
    statement:
      "楕円上の任意の点について、2つの焦点までの距離の和を求めよ。",
    type: "blank-number",
    correctAnswer: "6",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "楕円では、任意の点から2焦点までの距離の和は一定で $2a$ に等しい。$a=3$ なので、和は $2\\times3=6$ である。",
    strategy:
      "楕円の定義「2焦点からの距離の和が一定」を使う。その一定値は長軸の長さ $2a$ である。",
    trapExplanation:
      "和を $a=3$ や $c$ にしないこと。距離の和は $2a$ である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "条件整理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S6,
    id: "ct-m2bc-v2-s6-q4",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "楕円 — 点の位置",
    statement: "点 $(0,2)$ とこの楕円の関係として正しいものを選べ。",
    type: "single-choice",
    options: [
      "点 $(0,2)$ は楕円上にあり、短軸の端である",
      "点 $(0,2)$ は焦点である",
      "点 $(0,2)$ は楕円の外部にある",
      "点 $(0,2)$ は長軸の端である",
    ],
    correctAnswer: "点 $(0,2)$ は楕円上にあり、短軸の端である",
    explanation:
      "$(0,2)$ を方程式に代入すると $\\dfrac{0}{9}+\\dfrac{4}{4}=1$ となり、楕円上にある。$y$ 軸方向の半径（短半径）は $b=2$ なので、$(0,2)$ は短軸の端である。",
    strategy:
      "点が曲線上にあるかは、座標を方程式に代入して1になるか確かめる。$y$ 軸との交点は短軸の端になる。",
    trapExplanation:
      "$(0,2)$ を焦点と混同しないこと。焦点は $x$ 軸上の $(\\pm\\sqrt{5},0)$ で、$(0,2)$ は短軸の端である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "選択肢消去"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
  },

  // ── 第7問 複素数平面 ─────────────────────────────────────────────────────
  {
    ...M2BC_V2_S7,
    id: "ct-m2bc-v2-s7-q1",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 絶対値",
    statement: "$z=1+\\sqrt{3}\\,i$ の絶対値 $|z|$ を求めよ。",
    type: "blank-number",
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$|z|=\\sqrt{1^2+(\\sqrt{3})^2}=\\sqrt{1+3}=\\sqrt{4}=2$ である。",
    strategy:
      "$z=a+bi$ の絶対値は $\\sqrt{a^2+b^2}$。実部1、虚部 $\\sqrt{3}$ を代入する。",
    trapExplanation:
      "$\\sqrt{3}$ を2乗して3にするのを忘れないこと。$(\\sqrt{3})^2=3$ である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V2_S7,
    id: "ct-m2bc-v2-s7-q2",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 偏角",
    statement: "$z=1+\\sqrt{3}\\,i$ の偏角 $\\arg z$ を求めよ（$0 \\leqq \\arg z < 2\\pi$）。",
    type: "single-choice",
    options: [
      "$\\dfrac{\\pi}{6}$",
      "$\\dfrac{\\pi}{4}$",
      "$\\dfrac{\\pi}{3}$",
      "$\\dfrac{\\pi}{2}$",
    ],
    correctAnswer: "$\\dfrac{\\pi}{3}$",
    explanation:
      "点 $(1,\\sqrt{3})$ は第1象限にあり、$\\tan\\theta=\\dfrac{\\sqrt{3}}{1}=\\sqrt{3}$。これを満たすのは $\\theta=\\dfrac{\\pi}{3}$ である。前問の $|z|=2$ と合わせると $z=2\\left(\\cos\\dfrac{\\pi}{3}+i\\sin\\dfrac{\\pi}{3}\\right)$ と極形式で書ける。",
    strategy:
      "偏角は実部と虚部の比 $\\tan\\theta=\\dfrac{虚部}{実部}$ から求める。点がどの象限かも確認する。",
    trapExplanation:
      "$\\tan\\theta=\\sqrt{3}$ を $\\dfrac{\\pi}{6}$ と取り違えないこと。$\\tan\\dfrac{\\pi}{6}=\\dfrac{1}{\\sqrt{3}}$ である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "条件整理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S7,
    id: "ct-m2bc-v2-s7-q3",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 2乗",
    statement: "$z^2$ を $a+bi$ の形で求めよ。",
    type: "single-choice",
    options: [
      "$-2+2\\sqrt{3}\\,i$",
      "$2+2\\sqrt{3}\\,i$",
      "$-2-2\\sqrt{3}\\,i$",
      "$4i$",
    ],
    correctAnswer: "$-2+2\\sqrt{3}\\,i$",
    explanation:
      "極形式 $z=2\\left(\\cos\\dfrac{\\pi}{3}+i\\sin\\dfrac{\\pi}{3}\\right)$ を用いると、$z^2=2^2\\left(\\cos\\dfrac{2\\pi}{3}+i\\sin\\dfrac{2\\pi}{3}\\right)=4\\left(-\\dfrac{1}{2}+\\dfrac{\\sqrt{3}}{2}i\\right)=-2+2\\sqrt{3}\\,i$。直接 $(1+\\sqrt{3}i)^2=1+2\\sqrt{3}i+3i^2=-2+2\\sqrt{3}i$ としても同じである。",
    strategy:
      "極形式なら絶対値を2乗、偏角を2倍する。直接展開する場合は $i^2=-1$ に注意する。",
    trapExplanation:
      "$(1+\\sqrt{3}i)^2$ の展開で $i^2=-1$ を忘れ、$1+3=4$ などとしないこと。実部は $1+3i^2=1-3=-2$ になる。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V2_S7,
    id: "ct-m2bc-v2-s7-q4",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 回転",
    statement:
      "$z$ を原点を中心に $\\dfrac{\\pi}{3}$ だけ回転して得られる複素数を求めよ。",
    type: "single-choice",
    options: [
      "$-1+\\sqrt{3}\\,i$",
      "$1+\\sqrt{3}\\,i$",
      "$-2+2\\sqrt{3}\\,i$",
      "$\\sqrt{3}+i$",
    ],
    correctAnswer: "$-1+\\sqrt{3}\\,i$",
    explanation:
      "原点中心の $\\dfrac{\\pi}{3}$ 回転は $\\left(\\cos\\dfrac{\\pi}{3}+i\\sin\\dfrac{\\pi}{3}\\right)$ を掛けることに等しい。$z$ は絶対値2、偏角 $\\dfrac{\\pi}{3}$ なので、回転後は絶対値2のまま偏角が $\\dfrac{2\\pi}{3}$ になり、$2\\left(\\cos\\dfrac{2\\pi}{3}+i\\sin\\dfrac{2\\pi}{3}\\right)=-1+\\sqrt{3}\\,i$ である。",
    strategy:
      "回転は偏角を足すだけ。絶対値は変わらないので、前問までの $|z|=2$、$\\arg z=\\dfrac{\\pi}{3}$ に回転角を足す。",
    trapExplanation:
      "回転で絶対値が変わると考えないこと。回転後も $|z|=2$ のままで、偏角だけが $\\dfrac{2\\pi}{3}$ になる。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形", "条件整理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 数学II・B・C 第3回（math-2bc-70-v3）
// 第1問 図形と方程式 / 第2問 対数・積分 / 第3問 数列（等比） /
// 第4問 統計的推測 / 第5問 ベクトル / 第6問 平面上の曲線 / 第7問 複素数平面
// 必答 1・2・3、選択 4〜7 から3題。配点 15+15+22 + 16×3 = 100
// ═══════════════════════════════════════════════════════════════════════════

const M2BC_V3_S1 = {
  examContext:
    "第1問は、円 $x^2+y^2=10$ と、その上の点 $A(1,3)$ を考える。",
  sharedStem:
    "円の半径を確認し、点 $A$ が円上にあることを確かめてから、$A$ における接線とその傾きを求める。前の小問の結果を使う。",
  sharedData: {
    title: "円の情報",
    headers: ["項目", "内容"],
    rows: [["円の方程式", "$x^2+y^2=10$"], ["点", "$A(1,3)$"]],
    notes: ["原点を中心とする円上の点 $(a,b)$ における接線は $ax+by=r^2$ と表せる。"],
  },
};

const M2BC_V3_S2 = {
  examContext: "第2問は、対数・指数の計算と定積分を考える。",
  sharedStem:
    "対数の値や指数方程式を求めたあと、定積分で面積を計算する。",
  sharedData: {
    title: "確認事項",
    headers: ["項目", "内容"],
    rows: [
      ["対数", "$\\log_a a^k=k$"],
      ["積分", "$\\displaystyle\\int_a^b kx^2\\,dx=\\Big[\\dfrac{k}{3}x^3\\Big]_a^b$"],
    ],
    notes: ["$y=3x^2$ は原点を頂点とする下に凸の放物線である。"],
  },
};

const M2BC_V3_S3 = {
  examContext:
    "第3問は、初項が3、公比が2の等比数列 $\\{a_n\\}$ を考える。",
  sharedStem:
    "具体的な項を求め、一般項を使った値、和、条件を満たす最小の項数へと進む。前の小問の結果を使う。",
  sharedData: {
    title: "数列の一部",
    headers: ["$n$", "1", "2", "3"],
    rows: [["$a_n$", "3", "6", "?"]],
    notes: ["初項3、公比2の等比数列である。"],
  },
};

const M2BC_V3_S4 = {
  examContext:
    "第4問は、ある市の中学生の通学時間を調べる。通学時間の母標準偏差は $\\sigma=15$ 分とする。大きさ $n=225$ の標本をとると、標本平均は $60$ 分であった。",
  sharedStem:
    "標準誤差を求め、信頼区間とその幅、標本数を変えたときの影響を考える。前の小問の値を使う。",
  sharedData: {
    title: "標準正規分布の値",
    headers: ["範囲", "確率"],
    rows: [["$P(-1.96 \\leqq Z \\leqq 1.96)$", "0.95"]],
    notes: ["信頼区間の幅は $2\\times1.96\\times$（標準誤差）で求められる。"],
  },
};

const M2BC_V3_S5 = {
  examContext:
    "第5問は、座標平面上の三角形 $ABC$ を考える。$A(1,1)$、$B(5,1)$、$C(1,4)$ とする。",
  sharedStem:
    "辺の長さや内積を求めて三角形の形を調べ、面積、重心へと進む。前の小問の結果を使う。",
  sharedData: {
    title: "点の座標",
    headers: ["点", "座標"],
    rows: [["$A$", "$(1,1)$"], ["$B$", "$(5,1)$"], ["$C$", "$(1,4)$"]],
    notes: ["$\\overrightarrow{AB}$、$\\overrightarrow{AC}$ を成分で考える。"],
  },
};

const M2BC_V3_S6 = {
  examContext: "第6問は、放物線 $y^2=8x$ を考える。",
  sharedStem:
    "焦点と準線を求め、放物線上の点や焦点までの距離を調べる。前の小問の結果を使う。",
  sharedData: {
    title: "放物線の基本",
    headers: ["量", "内容"],
    rows: [["標準形", "$y^2=4px$"], ["焦点", "$(p,0)$"], ["準線", "$x=-p$"]],
    notes: ["放物線上の点から焦点までの距離は、準線までの距離に等しい。"],
  },
};

const M2BC_V3_S7 = {
  examContext: "第7問は、複素数 $z=-1+i$ を考える。",
  sharedStem:
    "絶対値と偏角を求めて極形式で表し、2乗や4乗を調べる。前の小問の結果を使う。",
  sharedData: {
    title: "極形式",
    headers: ["量", "内容"],
    rows: [["絶対値", "$|z|=\\sqrt{a^2+b^2}$"], ["極形式", "$z=r(\\cos\\theta+i\\sin\\theta)$"]],
    notes: ["点 $(-1,1)$ は第2象限にある。"],
  },
};

const MATH_2BC_70_V3: CommonTestDrillQuestion[] = [
  // ── 第1問 図形と方程式 ───────────────────────────────────────────────────
  {
    ...M2BC_V3_S1,
    id: "ct-m2bc-v3-s1-q1",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "円と接線 — 半径",
    statement: "円 $x^2+y^2=10$ の半径を求めよ。",
    type: "single-choice",
    options: ["$\\sqrt{10}$", "$10$", "$\\sqrt{5}$", "$5$"],
    correctAnswer: "$\\sqrt{10}$",
    explanation:
      "円 $x^2+y^2=r^2$ の半径は $r$。ここでは $r^2=10$ なので、半径は $\\sqrt{10}$ である。",
    strategy:
      "原点中心の円 $x^2+y^2=r^2$ では、右辺が半径の2乗。平方根をとって半径を求める。",
    trapExplanation:
      "$r^2=10$ をそのまま半径10としないこと。半径は $\\sqrt{10}$ である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S1,
    id: "ct-m2bc-v3-s1-q2",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "円と接線 — 点の位置",
    statement: "点 $A(1,3)$ と円 $x^2+y^2=10$ の関係を選べ。",
    type: "single-choice",
    options: [
      "$A$ は円上にある",
      "$A$ は円の内部にある",
      "$A$ は円の外部にある",
      "条件だけでは判断できない",
    ],
    correctAnswer: "$A$ は円上にある",
    explanation:
      "$A(1,3)$ を左辺に代入すると $1^2+3^2=1+9=10$ となり、円の方程式の右辺10と一致する。よって $A$ は円上にある。",
    strategy:
      "点が円上にあるかは、座標を $x^2+y^2$ に代入して $r^2$ と一致するか確かめる。",
    trapExplanation:
      "$1+9=10$ を計算し間違えないこと。$10$ なら円上、$10$ より小さければ内部、大きければ外部である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M2BC_V3_S1,
    id: "ct-m2bc-v3-s1-q3",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "円と接線 — 接線の方程式",
    statement: "点 $A(1,3)$ における円の接線の方程式を求めよ。",
    type: "single-choice",
    options: ["$x+3y=10$", "$x+3y=0$", "$3x+y=10$", "$x-3y=10$"],
    correctAnswer: "$x+3y=10$",
    explanation:
      "原点中心の円 $x^2+y^2=r^2$ 上の点 $(a,b)$ における接線は $ax+by=r^2$。$A(1,3)$、$r^2=10$ を代入すると $1\\cdot x+3\\cdot y=10$、すなわち $x+3y=10$ である。",
    strategy:
      "円上の点での接線は公式 $ax+by=r^2$ にあてはめる。前問で $A$ が円上にあることを確認済みである。",
    trapExplanation:
      "係数を入れ替えて $3x+y=10$ としないこと。$a=1$、$b=3$ の順にそのまま入れる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S1,
    id: "ct-m2bc-v3-s1-q4",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "円と接線 — 接線の傾き",
    statement: "小問3で求めた接線の傾きを求めよ。",
    type: "single-choice",
    options: [
      "$-\\dfrac{1}{3}$",
      "$\\dfrac{1}{3}$",
      "$-3$",
      "$3$",
    ],
    correctAnswer: "$-\\dfrac{1}{3}$",
    explanation:
      "接線 $x+3y=10$ を $y$ について解くと $y=-\\dfrac{1}{3}x+\\dfrac{10}{3}$。よって傾きは $-\\dfrac{1}{3}$ である。原点と $A$ を結ぶ直線の傾き3と、接線の傾き $-\\dfrac{1}{3}$ の積が $-1$ になっていることからも確認できる。",
    strategy:
      "傾きは方程式を $y=$ の形に直して読む。あるいは、半径 $OA$ と接線が垂直であることを使ってもよい。",
    trapExplanation:
      "$x+3y=10$ の係数3をそのまま傾きにしないこと。$y$ について解いてから傾きを読む。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第2問 対数・積分 ─────────────────────────────────────────────────────
  {
    ...M2BC_V3_S2,
    id: "ct-m2bc-v3-s2-q1",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "対数 — 値を求める",
    statement: "$\\log_3 9$ の値を求めよ。",
    type: "blank-number",
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$9=3^2$ なので、$\\log_3 9=\\log_3 3^2=2$ である。",
    strategy:
      "対数は「底を何乗すると真数になるか」を表す。$9$ を底3の累乗で表す。",
    trapExplanation:
      "$\\log_3 9$ を $9\\div3=3$ などとしないこと。$3$ を2乗すると9になるので、答えは2である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S2,
    id: "ct-m2bc-v3-s2-q2",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "指数 — 方程式を解く",
    statement: "方程式 $9^x=27$ を満たす $x$ を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{3}{2}$",
      "$\\dfrac{2}{3}$",
      "$3$",
      "$\\dfrac{1}{2}$",
    ],
    correctAnswer: "$\\dfrac{3}{2}$",
    explanation:
      "$9=3^2$、$27=3^3$ なので、$9^x=3^{2x}=3^3$。指数を比べて $2x=3$、よって $x=\\dfrac{3}{2}$ である。",
    strategy:
      "両辺を同じ底3にそろえる。$9=3^2$、$27=3^3$ に直して指数を比較する。",
    trapExplanation:
      "$9^x=27$ から $x=3$ としないこと。底をそろえると $2x=3$ になる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...M2BC_V3_S2,
    id: "ct-m2bc-v3-s2-q3",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "積分 — 定積分の計算",
    statement: "定積分 $\\displaystyle\\int_0^2 3x^2\\,dx$ を求めよ。",
    type: "blank-number",
    correctAnswer: "8",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\displaystyle\\int 3x^2\\,dx=x^3$ なので、$\\displaystyle\\int_0^2 3x^2\\,dx=\\big[x^3\\big]_0^2=2^3-0^3=8$ である。",
    strategy:
      "$3x^2$ の不定積分は $x^3$。上端と下端を代入して差をとる。",
    trapExplanation:
      "$3x^2$ の積分を $\\dfrac{3}{3}x^3=x^3$ と正しく求めること。係数3を残したまま $3x^3$ としない。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
  },
  {
    ...M2BC_V3_S2,
    id: "ct-m2bc-v3-s2-q4",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "積分 — 曲線と直線で囲む面積",
    statement:
      "曲線 $y=3x^2$ と直線 $y=12$ で囲まれた部分の面積を求めよ。",
    type: "single-choice",
    options: ["32", "16", "24", "48"],
    correctAnswer: "32",
    explanation:
      "交点は $3x^2=12$ より $x^2=4$、$x=\\pm2$。$-2 \\leqq x \\leqq 2$ では直線が曲線の上にあるので、面積は $\\displaystyle\\int_{-2}^{2}(12-3x^2)\\,dx=\\big[12x-x^3\\big]_{-2}^{2}=(24-8)-(-24+8)=16-(-16)=32$ である。",
    strategy:
      "まず交点を求めて積分区間を決める。上の関数から下の関数を引いて積分する。",
    trapExplanation:
      "片側だけ（$0$ から $2$）で計算して16で止めないこと。区間は $-2$ から $2$ までである。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第3問 数列（等比） ───────────────────────────────────────────────────
  {
    ...M2BC_V3_S3,
    id: "ct-m2bc-v3-s3-q1",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "等比数列 — 第3項",
    statement: "等比数列 $\\{a_n\\}$ の第3項 $a_3$ を求めよ。",
    type: "blank-number",
    correctAnswer: "12",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "初項3、公比2なので、$a_2=3\\times2=6$、$a_3=6\\times2=12$ である。具体的な項をまず確認する。",
    strategy:
      "等比数列は前の項に公比を掛けて次の項を作る。$3\\to6\\to12$ と順に求める。",
    trapExplanation:
      "$a_3=3\\times2\\times3=18$ のように公比を3回掛けないこと。第1項から第3項までは2回掛ける。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S3,
    id: "ct-m2bc-v3-s3-q2",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "等比数列 — 第5項",
    statement: "一般項を用いて、第5項 $a_5$ を求めよ。",
    type: "blank-number",
    correctAnswer: "48",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "等比数列の一般項は $a_n=a_1 r^{n-1}=3\\cdot2^{n-1}$。$a_5=3\\cdot2^4=3\\times16=48$ である。",
    strategy:
      "一般項 $a_n=a_1 r^{n-1}$ に $n=5$ を入れる。$2^4=16$ を先に計算する。",
    trapExplanation:
      "指数を $2^5$ としないこと。$a_n=a_1 r^{n-1}$ なので、第5項では $r$ の指数は4である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S3,
    id: "ct-m2bc-v3-s3-q3",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "等比数列 — 和",
    statement: "初項から第5項までの和 $S_5$ を求めよ。",
    type: "blank-number",
    correctAnswer: "93",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "公比2の等比数列の和は $S_n=\\dfrac{a_1(r^n-1)}{r-1}=\\dfrac{3(2^n-1)}{2-1}=3(2^n-1)$。$S_5=3(2^5-1)=3\\times31=93$ である。",
    strategy:
      "等比数列の和は $S_n=\\dfrac{a_1(r^n-1)}{r-1}$。公比2のとき分母は1なので、$3(2^n-1)$ になる。",
    trapExplanation:
      "$2^5=32$ を $2^5-1=31$ にするのを忘れないこと。和の公式では $r^n-1$ を使う。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S3,
    id: "ct-m2bc-v3-s3-q4",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "等比数列 — 条件を満たす最小の項数",
    statement: "和 $S_n$ が初めて90以上になる最小の $n$ を求めよ。",
    type: "blank-number",
    correctAnswer: "5",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$S_n=3(2^n-1)$。$S_4=3(16-1)=45$、$S_5=3(32-1)=93$ なので、初めて90以上になるのは $n=5$ である。",
    strategy:
      "和の式 $S_n=3(2^n-1)$ に小さい $n$ を順に入れ、90をまたぐところを探す。前問の $S_5=93$ が手がかりになる。",
    trapExplanation:
      "$S_4=45$ はまだ90未満である。境目の前後 $S_4$ と $S_5$ を比べて最小の $n$ を決める。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "条件整理", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第4問 統計的推測 ─────────────────────────────────────────────────────
  {
    ...M2BC_V3_S4,
    id: "ct-m2bc-v3-s4-q1",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 標準誤差",
    statement: "標本平均の標準偏差（標準誤差）を求めよ。",
    type: "blank-number",
    correctAnswer: "1",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "標準誤差は $\\dfrac{\\sigma}{\\sqrt{n}}=\\dfrac{15}{\\sqrt{225}}=\\dfrac{15}{15}=1$ である。",
    strategy:
      "母標準偏差を $\\sqrt{n}$ で割る。$\\sqrt{225}=15$ を先に求める。",
    trapExplanation:
      "$n=225$ でそのまま割って $\\dfrac{15}{225}$ としないこと。割るのは $\\sqrt{225}=15$ である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S4,
    id: "ct-m2bc-v3-s4-q2",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 95%信頼区間",
    statement:
      "前問の値を用いて、母平均 $m$ に対する信頼度95%の信頼区間を求めよ。",
    type: "single-choice",
    options: [
      "$58.04 \\leqq m \\leqq 61.96$",
      "$57.06 \\leqq m \\leqq 62.94$",
      "$45 \\leqq m \\leqq 75$",
      "$59 \\leqq m \\leqq 61$",
    ],
    correctAnswer: "$58.04 \\leqq m \\leqq 61.96$",
    explanation:
      "信頼区間は $60\\pm1.96\\times1=60\\pm1.96$。よって $58.04 \\leqq m \\leqq 61.96$ である。前問の標準誤差1を使う。",
    strategy:
      "標本平均60を中心に、$1.96\\times$（標準誤差1）の幅を左右にとる。",
    trapExplanation:
      "$1.96$ を母標準偏差15に掛けないこと。掛けるのは標準誤差1である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S4,
    id: "ct-m2bc-v3-s4-q3",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 信頼区間の幅",
    statement: "前問の信頼区間の幅を求めよ。",
    type: "single-choice",
    options: ["3.92", "1.96", "7.84", "1"],
    correctAnswer: "3.92",
    explanation:
      "信頼区間の幅は $2\\times1.96\\times$（標準誤差）$=2\\times1.96\\times1=3.92$ である。前問の区間 $58.04$ から $61.96$ の差を計算しても同じになる。",
    strategy:
      "区間の幅は上端と下端の差。あるいは $2\\times1.96\\times$（標準誤差）で求める。",
    trapExplanation:
      "幅を $1.96$（片側）としないこと。区間の幅は左右合わせた $2\\times1.96\\times$（標準誤差）である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S4,
    id: "ct-m2bc-v3-s4-q4",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計 — 標本数の影響",
    statement:
      "同じ母標準偏差のまま、標本の大きさを9倍にしたときの信頼区間の幅について、正しいものを選べ。",
    type: "single-choice",
    options: [
      "信頼区間の幅は3分の1になる",
      "信頼区間の幅は9倍になる",
      "信頼区間の幅は変わらない",
      "信頼区間の幅は9分の1になる",
    ],
    correctAnswer: "信頼区間の幅は3分の1になる",
    explanation:
      "標準誤差は $\\dfrac{\\sigma}{\\sqrt{n}}$ で、幅はこれに比例する。$n$ を9倍にすると $\\sqrt{n}$ は3倍になるので、標準誤差は3分の1、幅も3分の1になる。実際 $\\dfrac{15}{\\sqrt{2025}}=\\dfrac{15}{45}=\\dfrac{1}{3}$ で、幅は $2\\times1.96\\times\\dfrac{1}{3}$ になる。",
    strategy:
      "幅は $\\dfrac{1}{\\sqrt{n}}$ に比例する。標本数を9倍にすると $\\sqrt{n}$ が3倍になり、幅は3分の1になると考える。",
    trapExplanation:
      "標本数を9倍にしたから幅も9分の1、と早合点しないこと。効くのは平方根なので3分の1である。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "条件整理", "選択肢消去"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第5問 ベクトル ───────────────────────────────────────────────────────
  {
    ...M2BC_V3_S5,
    id: "ct-m2bc-v3-s5-q1",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 辺の長さ",
    statement: "$|\\overrightarrow{AB}|$ を求めよ。",
    type: "blank-number",
    correctAnswer: "4",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\overrightarrow{AB}=B-A=(5-1,\\,1-1)=(4,0)$。よって $|\\overrightarrow{AB}|=\\sqrt{4^2+0^2}=4$ である。",
    strategy:
      "成分は終点から始点を引く。$\\overrightarrow{AB}=B-A$ を求め、大きさは成分の2乗和の平方根。",
    trapExplanation:
      "$A$ と $B$ の座標をそのまま足さないこと。ベクトルの成分は $B-A$ で求める。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S5,
    id: "ct-m2bc-v3-s5-q2",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 内積",
    statement: "$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ を求めよ。",
    type: "blank-number",
    correctAnswer: "0",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\overrightarrow{AB}=(4,0)$、$\\overrightarrow{AC}=C-A=(1-1,\\,4-1)=(0,3)$。内積は $4\\times0+0\\times3=0$ である。内積が0なので、$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ は垂直、すなわち $\\angle A$ は直角である。",
    strategy:
      "$\\overrightarrow{AC}=C-A$ を求め、$\\overrightarrow{AB}$ と成分ごとに掛けて足す。0なら垂直と分かる。",
    trapExplanation:
      "内積が0を「計算できない」と考えないこと。0は2つのベクトルが垂直であることを示す重要な値である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S5,
    id: "ct-m2bc-v3-s5-q3",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 三角形の面積",
    statement: "三角形 $ABC$ の面積を求めよ。",
    type: "blank-number",
    correctAnswer: "6",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "前問より $\\angle A$ は直角で、$|\\overrightarrow{AB}|=4$、$|\\overrightarrow{AC}|=3$。直角をはさむ2辺を使うと、面積は $\\dfrac{1}{2}\\times4\\times3=6$ である。",
    strategy:
      "直角三角形なら、直角をはさむ2辺の積の半分が面積。前問で $\\angle A$ が直角と分かっている。",
    trapExplanation:
      "斜辺 $BC$ を使おうとしないこと。直角をはさむ $AB$ と $AC$ の積の半分でよい。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S5,
    id: "ct-m2bc-v3-s5-q4",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 重心",
    statement:
      "三角形 $ABC$ の重心 $G$ の座標を $(x,y)$ とするとき、$x+y$ の値を求めよ。",
    type: "single-choice",
    options: [
      "$\\dfrac{13}{3}$",
      "$\\dfrac{11}{3}$",
      "$5$",
      "$\\dfrac{10}{3}$",
    ],
    correctAnswer: "$\\dfrac{13}{3}$",
    explanation:
      "重心は3頂点の座標の平均で、$G=\\left(\\dfrac{1+5+1}{3},\\dfrac{1+1+4}{3}\\right)=\\left(\\dfrac{7}{3},2\\right)$。よって $x+y=\\dfrac{7}{3}+2=\\dfrac{7}{3}+\\dfrac{6}{3}=\\dfrac{13}{3}$ である。",
    strategy:
      "重心は3頂点の座標を足して3で割る。$x$ 座標、$y$ 座標を別々に平均する。",
    trapExplanation:
      "2で割らないこと。重心は3点の平均なので、3で割る。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["計算処理", "条件整理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
  },

  // ── 第6問 平面上の曲線 ───────────────────────────────────────────────────
  {
    ...M2BC_V3_S6,
    id: "ct-m2bc-v3-s6-q1",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "放物線 — 焦点",
    statement: "放物線 $y^2=8x$ の焦点の $x$ 座標を求めよ。",
    type: "blank-number",
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$y^2=4px$ と比べると $4p=8$、よって $p=2$。焦点は $(p,0)=(2,0)$ なので、$x$ 座標は2である。",
    strategy:
      "標準形 $y^2=4px$ にそろえて $p$ を求める。焦点は $(p,0)$ にある。",
    trapExplanation:
      "$4p=8$ から $p=2$ を求める。$p=8$ や $p=4$ としないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S6,
    id: "ct-m2bc-v3-s6-q2",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "放物線 — 準線",
    statement: "この放物線の準線の方程式を求めよ。",
    type: "single-choice",
    options: ["$x=-2$", "$x=2$", "$y=-2$", "$x=-8$"],
    correctAnswer: "$x=-2$",
    explanation:
      "$y^2=4px$ の準線は $x=-p$。前問より $p=2$ なので、準線は $x=-2$ である。",
    strategy:
      "準線は焦点と原点をはさんで反対側にある $x=-p$。前問の $p=2$ を使う。",
    trapExplanation:
      "準線を $x=2$（焦点と同じ側）としないこと。準線は $x=-p$ で、焦点の反対側である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "数式変形"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S6,
    id: "ct-m2bc-v3-s6-q3",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "放物線 — 上の点",
    statement: "放物線上で $x=2$ となる点の $y$ 座標を求めよ。",
    type: "single-choice",
    options: ["$\\pm4$", "$\\pm2$", "$4$", "$\\pm8$"],
    correctAnswer: "$\\pm4$",
    explanation:
      "$x=2$ を $y^2=8x$ に代入すると $y^2=16$、よって $y=\\pm4$ である。",
    strategy:
      "放物線の式に $x$ の値を代入し、$y$ について解く。2乗の方程式なので符号は $\\pm$ になる。",
    trapExplanation:
      "$y=4$ だけにしないこと。$y^2=16$ の解は正負両方の $\\pm4$ である。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
  },
  {
    ...M2BC_V3_S6,
    id: "ct-m2bc-v3-s6-q4",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "放物線 — 焦点までの距離",
    statement:
      "放物線上の点 $(2,4)$ と焦点との距離を求めよ。",
    type: "blank-number",
    correctAnswer: "4",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "焦点は前問までより $(2,0)$。点 $(2,4)$ との距離は $\\sqrt{(2-2)^2+(4-0)^2}=4$ である。放物線の定義より、焦点までの距離は準線 $x=-2$ までの距離 $2-(-2)=4$ に等しいことからも確かめられる。",
    strategy:
      "2点間の距離の公式で求める。放物線では「焦点までの距離＝準線までの距離」を使うと検算できる。",
    trapExplanation:
      "焦点を原点と取り違えないこと。焦点は前問で求めた $(2,0)$ である。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第7問 複素数平面 ─────────────────────────────────────────────────────
  {
    ...M2BC_V3_S7,
    id: "ct-m2bc-v3-s7-q1",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 絶対値",
    statement: "$z=-1+i$ の絶対値 $|z|$ を求めよ。",
    type: "single-choice",
    options: ["$\\sqrt{2}$", "$2$", "$1$", "$\\sqrt{3}$"],
    correctAnswer: "$\\sqrt{2}$",
    explanation:
      "$|z|=\\sqrt{(-1)^2+1^2}=\\sqrt{1+1}=\\sqrt{2}$ である。",
    strategy:
      "$z=a+bi$ の絶対値は $\\sqrt{a^2+b^2}$。負の実部も2乗すると正になる。",
    trapExplanation:
      "$(-1)^2=-1$ としないこと。2乗すると $(-1)^2=1$ である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...M2BC_V3_S7,
    id: "ct-m2bc-v3-s7-q2",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 偏角",
    statement: "$z=-1+i$ の偏角 $\\arg z$ を求めよ（$0 \\leqq \\arg z < 2\\pi$）。",
    type: "single-choice",
    options: [
      "$\\dfrac{3\\pi}{4}$",
      "$\\dfrac{\\pi}{4}$",
      "$\\dfrac{5\\pi}{4}$",
      "$\\dfrac{2\\pi}{3}$",
    ],
    correctAnswer: "$\\dfrac{3\\pi}{4}$",
    explanation:
      "点 $(-1,1)$ は第2象限にある。実軸となす角を考えると、参照角は $\\dfrac{\\pi}{4}$（$\\tan=\\dfrac{1}{1}$）で、第2象限なので偏角は $\\pi-\\dfrac{\\pi}{4}=\\dfrac{3\\pi}{4}$ である。",
    strategy:
      "まず点がどの象限かを確認する。第2象限なら、参照角を $\\pi$ から引いて偏角を求める。",
    trapExplanation:
      "$\\dfrac{\\pi}{4}$（第1象限の角）のまま答えないこと。点 $(-1,1)$ は第2象限にあるので $\\dfrac{3\\pi}{4}$ になる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "数式変形"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  {
    ...M2BC_V3_S7,
    id: "ct-m2bc-v3-s7-q3",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 2乗",
    statement: "$z^2$ を $a+bi$ の形で求めよ。",
    type: "single-choice",
    options: ["$-2i$", "$2i$", "$-2$", "$2$"],
    correctAnswer: "$-2i$",
    explanation:
      "$(-1+i)^2=(-1)^2+2(-1)(i)+i^2=1-2i+(-1)=-2i$ である。極形式では絶対値 $(\\sqrt{2})^2=2$、偏角 $\\dfrac{3\\pi}{2}$ となり、$2\\left(\\cos\\dfrac{3\\pi}{2}+i\\sin\\dfrac{3\\pi}{2}\\right)=-2i$ と一致する。",
    strategy:
      "$(a+bi)^2$ を展開し、$i^2=-1$ を使う。極形式で偏角を2倍して確かめてもよい。",
    trapExplanation:
      "$i^2$ を $+1$ としないこと。$i^2=-1$ なので実部は $1-1=0$ になる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["計算処理", "数式変形"],
    subQuestionIndex: 3,
    difficultyStage: "guided",
  },
  {
    ...M2BC_V3_S7,
    id: "ct-m2bc-v3-s7-q4",
    subjectId: "math-2bc",
    sectionId: "section-7",
    title: "複素数 — 4乗",
    statement: "$z^4$ を求めよ。",
    type: "single-choice",
    options: ["$-4$", "$4$", "$-4i$", "$16$"],
    correctAnswer: "$-4$",
    explanation:
      "前問より $z^2=-2i$ なので、$z^4=(z^2)^2=(-2i)^2=4i^2=-4$ である。",
    strategy:
      "$z^4=(z^2)^2$ と考えると速い。前問の $z^2=-2i$ を2乗する。",
    trapExplanation:
      "$(-2i)^2$ を $4i^2=-4$ と正しく計算すること。$i^2=-1$ を忘れて $4$ としない。",
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "計算処理"],
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 英語リーディング 第2回（english-reading-80-v2）
// 全8大問。1つの資料・英文に対して複数設問。choice のみ（MarkSheet を出さない）。
// すべて完全オリジナルの英文。
// ═══════════════════════════════════════════════════════════════════════════

const ENG_V2_S1 = {
  passage: `City Library — Spring Notice

Opening hours: 9:00 a.m. to 8:00 p.m. on weekdays, and 10:00 a.m. to 5:00 p.m. on weekends.

The library is closed on the second Monday of each month for cleaning.

Members can borrow up to eight books for two weeks. A borrowing period can be extended once online if no other member is waiting for the book.`,
  sharedStem:
    "案内文では、時間・回数・条件を表す語に印をつけながら読む。設問が問う数字や条件を本文から1つずつ確認する。",
};

const ENG_V2_S2 = {
  passage: `School Blog — "Should we use tablets in class?"

Mika: I think tablets help us a lot. We can search for information quickly and keep all our notes in one place. But some students play games during lessons, so teachers need clear rules.

Ren: Tablets are useful, but I worry about my eyes after looking at a screen for hours. I would prefer using them only for certain subjects, not all day long.`,
  sharedStem:
    "2人の投稿では、それぞれが「良いと思う点」と「心配する点」を分けて読む。共通点と相違点を整理する。",
};

const ENG_V2_S3 = {
  passage: `Last year, our town opened a community garden on an empty lot near the station. Volunteers grow vegetables there and share them with their neighbors. According to the town office, more than sixty families joined in the first year. Many members say the garden has helped them make new friends. In my view, every town should have a space like this.`,
  sharedStem:
    "記事では、事実（数字や出来事）と書き手の意見（should など）を区別しながら読む。",
};

const ENG_V2_S4 = {
  passage: `A class surveyed 120 students about their main after-school activity. The results are shown in the table below.`,
  sharedStem:
    "資料の問題では、設問を読んでから表に戻る。合計や大小関係を表の数値で確認する。",
  sharedData: {
    title: "After-school activity survey (120 students)",
    headers: ["Activity", "Number of students"],
    rows: [
      ["Sports", "42"],
      ["Music", "30"],
      ["Art", "18"],
      ["Study club", "30"],
    ],
    notes: ["Each student chose only one main activity."],
  },
};

const ENG_V2_S5 = {
  passage: `School Festival — Volunteer Tasks

Task P: Sell tickets at the entrance. 9:00-11:00. Good for students who like talking with visitors.
Task Q: Set up chairs in the hall. 8:00-9:00. Some heavy lifting is needed.
Task R: Help in the cooking booth. 11:00-13:00. You must wash your hands often; no experience is needed.

Students:
Aya can help only in the morning before 11:00 and does not like heavy lifting.
Daniel is free all day and enjoys cooking.
Emi likes meeting and talking with many people.`,
  sharedStem:
    "情報照合では、各タスクの「時間」「内容」「条件」を表のように整理し、生徒ごとの条件をすべて満たすものを選ぶ。",
};

const ENG_V2_S6 = {
  passage: `When Lena moved to a new town, she felt nervous about starting at a new school. On her first morning, she could not find the science room and arrived late. Her face turned red as everyone looked at her. But a girl named Sara smiled and showed her an empty seat. After class, Sara introduced Lena to her friends. By the end of the day, Lena was laughing with them. That night, she wrote in her diary that the move was not so bad after all.`,
  sharedStem:
    "物語では、出来事の順序と登場人物の気持ちの変化を追う。最後の場面が気持ちの結論を示すことが多い。",
};

const ENG_V2_S7 = {
  passage: `Some people say that students should not have part-time jobs during the school year. They worry that work takes time away from study. However, a part-time job can also teach useful skills, such as managing time and working with others. The key is balance. If students work only a few hours a week and keep up with their studies, a part-time job can be a valuable experience.`,
  sharedStem:
    "論説文では、反対意見と書き手の主張を区別する。However や The key などの語の後に主張が来やすい。",
};

const ENG_V2_S8 = {
  passage: `[Source 1 — Student Survey: "What stops you from reading more books?"]
No time: 40%
Books are expensive: 35%
Don't know what to read: 15%
Other: 10%

[Source 2 — Library Notice]
The school library has a "Book of the Week" shelf with staff recommendations, and all books can be borrowed for free.

[Report Draft]
Our survey shows that cost and not knowing what to read are common reasons students read less. The school library can help with both problems, because ____.`,
  sharedStem:
    "レポート完成では、結論を支える根拠を2つの資料から探す。空欄には、資料の数値と内容の両方に合う文を選ぶ。",
};

const ENGLISH_READING_80_V2: CommonTestDrillQuestion[] = [
  // ── 第1問 案内文 ─────────────────────────────────────────────────────────
  {
    ...ENG_V2_S1,
    id: "ct-eng-v2-s1-q1",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Library Notice — Borrowing limit",
    statement: "How many books can a member borrow at one time?",
    type: "single-choice",
    options: ["Five", "Six", "Eight", "Ten"],
    correctAnswer: "Eight",
    explanation:
      "本文に「Members can borrow up to eight books」とあるため、一度に借りられるのは8冊である。",
    strategy:
      "数字を問う設問では、本文中の数を表す語（eight など）を探す。borrow の近くを見る。",
    trapExplanation:
      "two weeks（2週間）の「two」を冊数と取り違えないこと。問われているのは冊数である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S1,
    id: "ct-eng-v2-s1-q2",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Library Notice — Closing day",
    statement: "When is the library closed?",
    type: "single-choice",
    options: [
      "Every Monday",
      "The second Monday of each month",
      "Every weekend",
      "The first Friday of each month",
    ],
    correctAnswer: "The second Monday of each month",
    explanation:
      "本文に「closed on the second Monday of each month for cleaning」とあるので、毎月第2月曜日が休館日である。",
    strategy:
      "closed という語の周辺を読む。曜日や頻度を表す語（second Monday）を正確に拾う。",
    trapExplanation:
      "「Every Monday」と読み違えないこと。本文は「the second Monday」と限定している。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S1,
    id: "ct-eng-v2-s1-q3",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Library Notice — Extending a book",
    statement:
      "A member wants to keep a book longer. According to the notice, this is possible",
    type: "single-choice",
    options: [
      "only by visiting the library in person",
      "if no other member is waiting for the book",
      "for up to eight weeks automatically",
      "only on weekends",
    ],
    correctAnswer: "if no other member is waiting for the book",
    explanation:
      "本文に「extended once online if no other member is waiting for the book」とある。延長できる条件は、他に待っている人がいないことである。",
    strategy:
      "条件を問う設問では if 節を探す。延長（extended）の条件が if 以下に書かれている。",
    trapExplanation:
      "「visiting the library in person（来館して）」は誤り。本文は online（オンラインで）と述べている。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第2問 ブログ投稿 ─────────────────────────────────────────────────────
  {
    ...ENG_V2_S2,
    id: "ct-eng-v2-s2-q1",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Tablet Blog — Mika's view",
    statement: "What does Mika say is good about tablets?",
    type: "single-choice",
    options: [
      "They are cheaper than textbooks",
      "They help students search for information quickly",
      "They never break",
      "They can replace teachers",
    ],
    correctAnswer: "They help students search for information quickly",
    explanation:
      "Mika は「We can search for information quickly and keep all our notes in one place」と述べている。情報をすばやく調べられる点を長所として挙げている。",
    strategy:
      "発言者ごとに読む。Mika の発言から「良い点」を述べた部分を探す。",
    trapExplanation:
      "値段や故障の話は本文にない。書かれていない内容の選択肢を選ばないこと。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["要旨把握", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S2,
    id: "ct-eng-v2-s2-q2",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Tablet Blog — Ren's worry",
    statement: "What is Ren worried about?",
    type: "single-choice",
    options: [
      "The price of tablets",
      "Losing his notes",
      "His eyes after long screen use",
      "Other students playing games",
    ],
    correctAnswer: "His eyes after long screen use",
    explanation:
      "Ren は「I worry about my eyes after looking at a screen for hours」と述べている。長時間画面を見たあとの目を心配している。",
    strategy:
      "worry / worried などの語を手がかりに、Ren が心配している対象を探す。",
    trapExplanation:
      "ゲームの心配をしているのは Mika である。発言者を取り違えないこと。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S2,
    id: "ct-eng-v2-s2-q3",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Tablet Blog — Common ground",
    statement: "What do Mika and Ren agree on?",
    type: "single-choice",
    options: [
      "Tablets should be used all day",
      "Tablets are useful in some way",
      "Tablets should be banned from school",
      "Tablets harm everyone's eyes",
    ],
    correctAnswer: "Tablets are useful in some way",
    explanation:
      "Mika は「tablets help us a lot」、Ren は「Tablets are useful, but...」と述べており、2人とも何らかの点でタブレットが役立つと認めている。心配する点は異なるが、有用性については一致している。",
    strategy:
      "2人の発言の共通点を探す。それぞれの but の前にある肯定的な内容を比べる。",
    trapExplanation:
      "「all day（一日中）使うべき」は Ren が反対している。2人が一致している点を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "情報照合"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第3問 記事 ───────────────────────────────────────────────────────────
  {
    ...ENG_V2_S3,
    id: "ct-eng-v2-s3-q1",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Community Garden — Number of families",
    statement: "How many families joined the garden in the first year?",
    type: "single-choice",
    options: ["About sixteen", "More than sixty", "Exactly one hundred", "Fewer than ten"],
    correctAnswer: "More than sixty",
    explanation:
      "本文に「more than sixty families joined in the first year」とある。1年目に参加したのは60を超える家族である。",
    strategy:
      "数字を問う設問では、本文の数を表す語を探す。more than などの表現もそのまま読み取る。",
    trapExplanation:
      "sixteen（16）と sixty（60）を聞き取り・読み違えないこと。本文は sixty である。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S3,
    id: "ct-eng-v2-s3-q2",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Community Garden — Fact and opinion",
    statement: "Which of the following is an opinion, not a fact?",
    type: "single-choice",
    options: [
      "The garden opened last year",
      "More than sixty families joined",
      "Every town should have a space like this",
      "The garden is near the station",
    ],
    correctAnswer: "Every town should have a space like this",
    explanation:
      "「Every town should have a space like this」は書き手の意見（In my view に続く主張）である。他の3つは本文に書かれた事実である。",
    strategy:
      "意見は should / In my view / I think などの語とともに現れる。事実は数字や出来事で確かめられる。",
    trapExplanation:
      "数字や出来事（families joined など）は事実である。should を含む文が意見だと見抜く。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S3,
    id: "ct-eng-v2-s3-q3",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Community Garden — Reported benefit",
    statement: "What is one benefit of the garden mentioned by its members?",
    type: "single-choice",
    options: [
      "It lowered food prices in shops",
      "It helped members make new friends",
      "It is open only in winter",
      "It replaced the train station",
    ],
    correctAnswer: "It helped members make new friends",
    explanation:
      "本文に「the garden has helped them make new friends」とある。メンバーが述べる利点は、新しい友人ができたことである。",
    strategy:
      "members say の後に、メンバーが感じた利点が書かれている。その部分と選択肢を照合する。",
    trapExplanation:
      "食品の値段や駅の話は本文にない。本文に根拠のない選択肢を選ばないこと。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第4問 資料読み取り ───────────────────────────────────────────────────
  {
    ...ENG_V2_S4,
    id: "ct-eng-v2-s4-q1",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Activity Survey — Most popular",
    statement: "Which activity was chosen by the most students?",
    type: "single-choice",
    options: ["Sports", "Music", "Art", "Study club"],
    correctAnswer: "Sports",
    explanation:
      "表より、Sports は42人で最も多い。Music と Study club は各30人、Art は18人である。",
    strategy:
      "「最も多い」を問う設問では、表の数値を比べて最大を探す。",
    trapExplanation:
      "Music と Study club が同数（30人）だが、どちらも Sports の42人より少ない。最大は Sports である。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S4,
    id: "ct-eng-v2-s4-q2",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Activity Survey — Total of two",
    statement: "How many students chose Music or Study club in total?",
    type: "single-choice",
    options: ["48", "60", "72", "30"],
    correctAnswer: "60",
    explanation:
      "Music は30人、Study club は30人なので、合計は $30+30=60$ 人である。",
    strategy:
      "「合計」を問う設問では、該当する2つの数値を表から取り出して足す。",
    trapExplanation:
      "片方だけの30で止めないこと。2つの活動の人数を合わせる。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["図表読解", "データ読み取り"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S4,
    id: "ct-eng-v2-s4-q3",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Activity Survey — Matching statement",
    statement: "Which statement matches the table?",
    type: "single-choice",
    options: [
      "Art was the least popular activity",
      "More students chose Art than Music",
      "Sports and Music were equally popular",
      "Half of the students chose Study club",
    ],
    correctAnswer: "Art was the least popular activity",
    explanation:
      "Art は18人で最も少ない。Music(30) は Art(18) より多く、Sports(42) と Music(30) は同数ではない。Study club は30人で、全体120人の半分（60人）ではない。よって正しいのは「Art was the least popular」である。",
    strategy:
      "各選択肢を表の数値と1つずつ照合する。大小・等しい・半分などの表現を数値で確かめる。",
    trapExplanation:
      "「Half of the students chose Study club」は誤り。半分は60人だが Study club は30人である。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["図表読解", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第5問 情報照合 ───────────────────────────────────────────────────────
  {
    ...ENG_V2_S5,
    id: "ct-eng-v2-s5-q1",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Festival Tasks — Start time",
    statement: "What time does Task R (the cooking booth) start?",
    type: "single-choice",
    options: ["8:00", "9:00", "11:00", "13:00"],
    correctAnswer: "11:00",
    explanation:
      "Task R は「11:00-13:00」と書かれているので、開始時刻は11:00である。",
    strategy:
      "タスクごとの時間欄を見る。開始時刻は範囲の左側の数字である。",
    trapExplanation:
      "終了時刻の13:00を開始時刻としないこと。開始は11:00である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S5,
    id: "ct-eng-v2-s5-q2",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Festival Tasks — Best for Aya",
    statement: "Which task is best for Aya?",
    type: "single-choice",
    options: ["Task P", "Task Q", "Task R", "No task fits her"],
    correctAnswer: "Task P",
    explanation:
      "Aya は11:00より前の午前中だけ手伝え、重い物を運ぶのは苦手。Task P は9:00-11:00で、来場者と話す仕事なので条件に合う。Task Q は重い物を運ぶため不可、Task R は11:00開始で午前中ではない。",
    strategy:
      "生徒の条件（時間・好み）をすべて満たすタスクを探す。1つでも条件に合わなければ消去する。",
    trapExplanation:
      "Task Q も午前中だが「heavy lifting」があり、Aya の苦手な条件に反する。時間だけで選ばない。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S5,
    id: "ct-eng-v2-s5-q3",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Festival Tasks — Best for Daniel",
    statement: "Using the same task list, which task is best for Daniel?",
    type: "single-choice",
    options: ["Task P", "Task Q", "Task R", "No task fits him"],
    correctAnswer: "Task R",
    explanation:
      "Daniel は一日中手伝え、料理が好き。Task R は料理ブースの手伝いで、経験も不要なので最も合う。時間の制限がない Daniel には11:00-13:00の R が問題なく選べる。",
    strategy:
      "前問と同じ表を使い、Daniel の条件（時間が自由・料理が好き）に合うタスクを探す。",
    trapExplanation:
      "Task P や Q も時間は合うが、Daniel の「enjoys cooking」に最も合うのは料理の Task R である。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第6問 物語 ───────────────────────────────────────────────────────────
  {
    ...ENG_V2_S6,
    id: "ct-eng-v2-s6-q1",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Lena's First Day — Why late",
    statement: "Why was Lena late on her first morning?",
    type: "single-choice",
    options: [
      "She woke up late",
      "She could not find the science room",
      "She missed the bus",
      "She forgot her bag",
    ],
    correctAnswer: "She could not find the science room",
    explanation:
      "本文に「she could not find the science room and arrived late」とある。遅刻した理由は理科室が見つからなかったことである。",
    strategy:
      "出来事の原因を問う設問では、late の近くの文を読む。理由が and の前に書かれている。",
    trapExplanation:
      "バスや寝坊の話は本文にない。本文に書かれた理由を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["時系列整理", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S6,
    id: "ct-eng-v2-s6-q2",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Lena's First Day — Sara's help",
    statement: "How did Sara help Lena?",
    type: "single-choice",
    options: [
      "She lent her a textbook",
      "She showed her a seat and introduced her to friends",
      "She walked her home",
      "She gave her lunch",
    ],
    correctAnswer: "She showed her a seat and introduced her to friends",
    explanation:
      "本文に「Sara smiled and showed her an empty seat. After class, Sara introduced Lena to her friends」とある。Sara は席を教え、友達に紹介してくれた。",
    strategy:
      "Sara の行動を表す動詞（showed, introduced）を探し、選択肢と照合する。",
    trapExplanation:
      "教科書や昼食の話は本文にない。実際に書かれた行動を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["時系列整理", "情報照合"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S6,
    id: "ct-eng-v2-s6-q3",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Lena's First Day — Her feeling",
    statement: "How did Lena most likely feel at the end of the day?",
    type: "single-choice",
    options: [
      "Still nervous and lonely",
      "Angry at her classmates",
      "More positive about the move",
      "Eager to move to another town again",
    ],
    correctAnswer: "More positive about the move",
    explanation:
      "本文の最後で「Lena was laughing with them」「the move was not so bad after all」とある。Lena は引っ越しについて前向きな気持ちになっている。",
    strategy:
      "気持ちの結論は最後の場面に表れる。laughing や not so bad after all などの表現から判断する。",
    trapExplanation:
      "「またすぐ引っ越したい（Eager to move again）」は本文の内容を超えた言い過ぎである。前向きになった、までが本文の範囲。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第7問 論説文 ─────────────────────────────────────────────────────────
  {
    ...ENG_V2_S7,
    id: "ct-eng-v2-s7-q1",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "Part-time Jobs — A worry",
    statement: "What do some people worry about regarding part-time jobs?",
    type: "single-choice",
    options: [
      "Jobs are boring",
      "Work takes time away from study",
      "Students earn too much money",
      "Jobs are hard to find",
    ],
    correctAnswer: "Work takes time away from study",
    explanation:
      "本文に「They worry that work takes time away from study」とある。心配されているのは、仕事が勉強の時間を奪うことである。",
    strategy:
      "worry that の後に心配の内容が来る。その部分を選択肢と照合する。",
    trapExplanation:
      "お金や退屈さの話は本文にない。worry の直後の内容を読む。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["要旨把握", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S7,
    id: "ct-eng-v2-s7-q2",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "Part-time Jobs — Useful skills",
    statement: "According to the writer, what skills can a part-time job teach?",
    type: "single-choice",
    options: [
      "Cooking and cleaning",
      "Managing time and working with others",
      "Reading and writing",
      "Driving and swimming",
    ],
    correctAnswer: "Managing time and working with others",
    explanation:
      "本文に「useful skills, such as managing time and working with others」とある。仕事が教える技能は、時間の管理と他者との協働である。",
    strategy:
      "such as の後に具体例が並ぶ。skills の例を本文から取り出す。",
    trapExplanation:
      "料理や運転などは本文に挙げられていない。such as の後の語句を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S7,
    id: "ct-eng-v2-s7-q3",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "Part-time Jobs — Main point",
    statement: "What is the writer's main point?",
    type: "single-choice",
    options: [
      "With balance, a part-time job can be a valuable experience",
      "Students should never have a part-time job",
      "All students must get a part-time job",
      "Studying is a waste of time",
    ],
    correctAnswer: "With balance, a part-time job can be a valuable experience",
    explanation:
      "本文は反対意見を紹介したあと、However と The key is balance を経て「a part-time job can be a valuable experience」と結論づけている。バランスがあれば価値ある経験になる、が主張である。",
    strategy:
      "論説文の主張は However や The key などの後にある結論部分を読む。全体をまとめた文を選ぶ。",
    trapExplanation:
      "「never（決して持つべきでない）」は紹介された反対意見であって、書き手の主張ではない。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第8問 レポート完成 ───────────────────────────────────────────────────
  {
    ...ENG_V2_S8,
    id: "ct-eng-v2-s8-q1",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Reading Report — Most common reason",
    statement:
      "According to Source 1, what is the most common reason students read less?",
    type: "single-choice",
    options: [
      "No time",
      "Books are expensive",
      "Don't know what to read",
      "Other",
    ],
    correctAnswer: "No time",
    explanation:
      "Source 1 では「No time: 40%」が最も高い割合である。最も多い理由は「時間がない」ことである。",
    strategy:
      "割合の最大を探す。調査資料の数値を比べて、最も高い項目を選ぶ。",
    trapExplanation:
      "Books are expensive(35%) は2番目に高いが最大ではない。最も高いのは40%の No time である。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V2_S8,
    id: "ct-eng-v2-s8-q2",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Reading Report — What the library offers",
    statement: "According to Source 2, what does the school library offer?",
    type: "single-choice",
    options: [
      "A café and study rooms",
      "Free borrowing and staff recommendations",
      "Paid reading classes",
      "A bookstore for students",
    ],
    correctAnswer: "Free borrowing and staff recommendations",
    explanation:
      "Source 2 に「'Book of the Week' shelf with staff recommendations」「all books can be borrowed for free」とある。図書館は無料の貸し出しとスタッフのおすすめを提供している。",
    strategy:
      "Source 2 の内容を2つの要素（おすすめ棚・無料貸出）に分けて読み、選択肢と照合する。",
    trapExplanation:
      "本文に café や有料クラスの記述はない。資料に書かれた内容だけを選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V2_S8,
    id: "ct-eng-v2-s8-q3",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Reading Report — Completing the conclusion",
    statement: "Which choice best completes the report's conclusion?",
    type: "single-choice",
    options: [
      "it lends books for free and recommends titles through the \"Book of the Week\" shelf",
      "it is open late at night every day",
      "it sells cheap books to students",
      "it gives students more free time to read",
    ],
    correctAnswer:
      "it lends books for free and recommends titles through the \"Book of the Week\" shelf",
    explanation:
      "レポートは「cost（お金がかかる）」と「not knowing what to read（何を読めばいいか分からない）」の2つの問題を挙げている。Source 2 の無料貸出は前者を、おすすめ棚は後者を解決する。両方に対応する選択肢が正解である。",
    strategy:
      "結論の空欄には、レポートが挙げた2つの問題の両方に答える根拠を選ぶ。資料2の2つの提供内容と結びつける。",
    trapExplanation:
      "「sells cheap books（安く売る）」は誤り。資料は無料で貸し出す（borrowed for free）と述べており、販売ではない。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["レポート完成", "情報照合"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 英語リーディング 第3回（english-reading-80-v3）
// 全8大問。第2回と題材を変えた完全オリジナルの英文。choice のみ。
// ═══════════════════════════════════════════════════════════════════════════

const ENG_V3_S1 = {
  passage: `Green Park Charity Walk

Date: Sunday, October 12. Start time: 9:00 a.m. (please arrive by 8:30 a.m.).
Distance: Choose a 3 km or a 6 km course.
Entry fee: 500 yen per person. All of the money will be donated to the local children's library.
Free water and a small snack will be given to every walker at the goal.`,
  sharedStem:
    "イベント告知では、日時・費用・条件・もらえるものを項目ごとに整理する。設問が問う項目を本文から確認する。",
};

const ENG_V3_S2 = {
  passage: `Online Reviews — School Backpack

★★★★☆ by Kenta: This backpack is light and has many pockets. The straps stay comfortable even when it is full. It is a little expensive, but I think it is worth the price.

★★★☆☆ by Mei: The design is nice and the bag is cheap. However, it is not very strong. One of the straps started to tear after only two months.`,
  sharedStem:
    "2つのレビューでは、評価する点と不満な点を分けて読む。共通して触れている話題（値段など）にも注意する。",
};

const ENG_V3_S3 = {
  passage: `Getting enough sleep is important for students. During sleep, the brain organizes what we have learned during the day. Studies suggest that students who sleep seven to eight hours remember new information better than those who sleep less. Staying up late to study may feel useful, but it can actually make it harder to remember things the next day.`,
  sharedStem:
    "説明文では、述べられている事実とその理由を結びつけて読む。Studies suggest などの後にある内容を押さえる。",
};

const ENG_V3_S4 = {
  passage: `A school asked 200 students how they usually come to school. The results are shown in the table below.`,
  sharedStem:
    "資料の問題では、設問を読んでから表に戻る。合計や大小関係を表の数値で確かめる。",
  sharedData: {
    title: "How 200 students come to school",
    headers: ["Way of coming", "Number of students"],
    rows: [
      ["Walk", "70"],
      ["Bicycle", "80"],
      ["Bus", "40"],
      ["Car", "10"],
    ],
    notes: ["Each student chose only one main way of coming to school."],
  },
};

const ENG_V3_S5 = {
  passage: `Online Weekend Courses

Course X: Beginner Photography. Saturdays 10:00-11:30. No equipment is needed; a smartphone is fine.
Course Y: Cooking Basics. Sundays 14:00-16:00. You must have a kitchen at home.
Course Z: Public Speaking. Saturdays 16:00-17:00. Good for students who want to speak more confidently.

Students:
Hana is busy every Sunday but free on Saturday mornings.
Tom wants to improve how he speaks in front of people.
Yuki loves cooking and is free on weekends.`,
  sharedStem:
    "情報照合では、各講座の「曜日・時間・条件」を整理し、生徒ごとの条件をすべて満たす講座を選ぶ。",
};

const ENG_V3_S6 = {
  passage: `Hiro had practiced the piano for months for the school concert. On the day of the concert, his hands were shaking. When his turn came, he walked slowly to the piano. At first he played a wrong note, and his heart sank. But he took a deep breath and kept going. When he finished, the audience clapped loudly, and his teacher gave him a thumbs-up. Hiro realized that making one mistake did not ruin everything.`,
  sharedStem:
    "物語では、出来事の流れと主人公の気持ちの変化を追う。最後の一文が学びや結論を示すことが多い。",
};

const ENG_V3_S7 = {
  passage: `There is often a debate about whether students should wear school uniforms. Those who are against uniforms say that students should be free to express themselves through their clothes. On the other hand, supporters point out that uniforms save time in the morning and reduce the pressure to follow fashion. A reasonable view is that uniforms have clear benefits, as long as the design is comfortable and practical.`,
  sharedStem:
    "論説文では、反対意見と賛成意見を整理し、書き手自身の立場（A reasonable view など）を見分ける。",
};

const ENG_V3_S8 = {
  passage: `[Source 1 — Survey: "Why don't you exercise more?" (150 students)]
No time: 38%
No place nearby: 30%
Don't like exercising alone: 22%
Other: 10%

[Source 2 — School Notice]
Starting next month, the school gym will be open after class on Tuesdays and Thursdays. A teacher will also lead a group jogging club that anyone can join.

[Report Draft]
Our survey shows that having no place nearby and disliking exercising alone are common reasons students do not exercise. The school's new plan can help, because ____.`,
  sharedStem:
    "レポート完成では、レポートが挙げた問題と、資料が示す解決策を結びつける。空欄には両方の問題に答える文を選ぶ。",
};

const ENGLISH_READING_80_V3: CommonTestDrillQuestion[] = [
  // ── 第1問 イベント告知 ───────────────────────────────────────────────────
  {
    ...ENG_V3_S1,
    id: "ct-eng-v3-s1-q1",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Charity Walk — Arrival time",
    statement: "What time should walkers arrive?",
    type: "single-choice",
    options: ["By 8:00 a.m.", "By 8:30 a.m.", "By 9:00 a.m.", "By 10:00 a.m."],
    correctAnswer: "By 8:30 a.m.",
    explanation:
      "本文に「Start time: 9:00 a.m. (please arrive by 8:30 a.m.)」とある。スタートは9:00だが、到着は8:30までに求められている。",
    strategy:
      "似た時刻が2つあるときは、設問が問う動作（arrive）に対応する方を選ぶ。",
    trapExplanation:
      "9:00はスタート時刻であって到着時刻ではない。arrive by の後の8:30を選ぶ。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S1,
    id: "ct-eng-v3-s1-q2",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Charity Walk — Use of the fee",
    statement: "What will happen to the entry fee money?",
    type: "single-choice",
    options: [
      "It will be returned to the walkers",
      "It will be donated to the local children's library",
      "It will be used to buy prizes",
      "It will pay for a new park",
    ],
    correctAnswer: "It will be donated to the local children's library",
    explanation:
      "本文に「All of the money will be donated to the local children's library」とある。参加費は地元の児童図書館へ寄付される。",
    strategy:
      "money / fee の周辺を読み、お金の使い道を示す動詞（donated）を探す。",
    trapExplanation:
      "賞品や返金の記述は本文にない。donated to の後の対象を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S1,
    id: "ct-eng-v3-s1-q3",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "Charity Walk — At the goal",
    statement: "What does every walker receive at the goal?",
    type: "single-choice",
    options: [
      "A medal",
      "A 500-yen coupon",
      "Free water and a small snack",
      "A free book",
    ],
    correctAnswer: "Free water and a small snack",
    explanation:
      "本文に「Free water and a small snack will be given to every walker at the goal」とある。ゴールでもらえるのは無料の水と軽食である。",
    strategy:
      "goal や given の周辺を読み、もらえるものを正確に拾う。",
    trapExplanation:
      "500 yen は参加費であって、もらえるクーポンではない。本文の given の対象を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第2問 レビュー ───────────────────────────────────────────────────────
  {
    ...ENG_V3_S2,
    id: "ct-eng-v3-s2-q1",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Backpack Reviews — Kenta's praise",
    statement: "What does Kenta like about the backpack?",
    type: "single-choice",
    options: [
      "It is very cheap",
      "It is light and has many pockets",
      "It is waterproof",
      "It comes in many colors",
    ],
    correctAnswer: "It is light and has many pockets",
    explanation:
      "Kenta は「This backpack is light and has many pockets」と述べている。軽くてポケットが多い点を気に入っている。",
    strategy:
      "レビュアーごとに読む。Kenta の星評価の文から良い点を取り出す。",
    trapExplanation:
      "「cheap（安い）」と言っているのは Mei である。Kenta は「a little expensive」と述べている。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["情報照合", "要旨把握"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S2,
    id: "ct-eng-v3-s2-q2",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Backpack Reviews — Mei's problem",
    statement: "What problem did Mei have with the backpack?",
    type: "single-choice",
    options: [
      "The color faded quickly",
      "One of the straps started to tear",
      "It was too heavy to carry",
      "It had no pockets",
    ],
    correctAnswer: "One of the straps started to tear",
    explanation:
      "Mei は「One of the straps started to tear after only two months」と述べている。ストラップが2か月で破れ始めた点が問題である。",
    strategy:
      "However の後に不満点が来やすい。Mei の発言から問題点を探す。",
    trapExplanation:
      "重さや色の話は本文にない。Mei が実際に述べた strap の問題を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S2,
    id: "ct-eng-v3-s2-q3",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "Backpack Reviews — About the price",
    statement: "What is true about the two reviews?",
    type: "single-choice",
    options: [
      "They give different opinions about the price",
      "Both say the bag is cheap",
      "Both say the straps are strong",
      "Neither mentions the price",
    ],
    correctAnswer: "They give different opinions about the price",
    explanation:
      "Kenta は「a little expensive」、Mei は「cheap」と述べており、値段について2人の意見は異なる。どちらも値段に触れているが、評価は逆である。",
    strategy:
      "2つのレビューの共通の話題（price）を見つけ、その評価が同じか違うかを比べる。",
    trapExplanation:
      "「Both say cheap」は誤り。安いと言ったのは Mei だけで、Kenta は高めだと述べている。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第3問 説明文 ─────────────────────────────────────────────────────────
  {
    ...ENG_V3_S3,
    id: "ct-eng-v3-s3-q1",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Sleep and Memory — During sleep",
    statement: "According to the article, what does the brain do during sleep?",
    type: "single-choice",
    options: [
      "It stops working completely",
      "It organizes what we have learned",
      "It forgets everything from the day",
      "It grows larger",
    ],
    correctAnswer: "It organizes what we have learned",
    explanation:
      "本文に「During sleep, the brain organizes what we have learned during the day」とある。睡眠中、脳は学んだことを整理する。",
    strategy:
      "During sleep の後を読む。brain の動作を表す動詞（organizes）を探す。",
    trapExplanation:
      "「stops working completely（完全に働きを止める）」は本文と逆である。脳は整理を行っている。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["要旨把握", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S3,
    id: "ct-eng-v3-s3-q2",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Sleep and Memory — Hours of sleep",
    statement: "How many hours of sleep are linked to better memory?",
    type: "single-choice",
    options: [
      "Three to four hours",
      "Five hours",
      "Seven to eight hours",
      "Ten or more hours",
    ],
    correctAnswer: "Seven to eight hours",
    explanation:
      "本文に「students who sleep seven to eight hours remember new information better」とある。記憶に良いとされるのは7〜8時間の睡眠である。",
    strategy:
      "数字を問う設問では、hours の周辺の数を探す。範囲表現（seven to eight）をそのまま読む。",
    trapExplanation:
      "「Ten or more hours」は本文に書かれていない。本文が挙げる7〜8時間を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["英語スキャニング", "情報照合"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S3,
    id: "ct-eng-v3-s3-q3",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "Sleep and Memory — Main message",
    statement: "What is the main message of the article?",
    type: "single-choice",
    options: [
      "Enough sleep helps students remember what they learn",
      "Students should never sleep before exams",
      "Sleeping more than ten hours is always best",
      "Studying at night is always more effective",
    ],
    correctAnswer: "Enough sleep helps students remember what they learn",
    explanation:
      "本文全体は、十分な睡眠が記憶を助け、夜更かしは翌日の記憶をかえって難しくする、と述べている。中心となる主張は、十分な睡眠が学んだことの記憶を助けるということである。",
    strategy:
      "説明文の主旨は、全体を通して繰り返される考えを選ぶ。一部だけを誇張した選択肢は避ける。",
    trapExplanation:
      "「Studying at night is always more effective」は本文と逆である。夜更かしは記憶を難しくすると述べられている。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第4問 資料読み取り ───────────────────────────────────────────────────
  {
    ...ENG_V3_S4,
    id: "ct-eng-v3-s4-q1",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Commuting Survey — Most common way",
    statement: "What is the most common way students come to school?",
    type: "single-choice",
    options: ["Walk", "Bicycle", "Bus", "Car"],
    correctAnswer: "Bicycle",
    explanation:
      "表より Bicycle が80人で最も多い。Walk は70人、Bus は40人、Car は10人である。",
    strategy:
      "「最も多い」を問う設問では、表の数値を比べて最大の項目を選ぶ。",
    trapExplanation:
      "Walk(70) も多いが、Bicycle(80) の方が多い。最大の数値を確認する。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S4,
    id: "ct-eng-v3-s4-q2",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Commuting Survey — Bus and car total",
    statement: "How many students come to school by bus or car in total?",
    type: "single-choice",
    options: ["40", "50", "60", "110"],
    correctAnswer: "50",
    explanation:
      "Bus は40人、Car は10人なので、合計は $40+10=50$ 人である。",
    strategy:
      "「合計」を問う設問では、該当する2つの数値を表から取り出して足す。",
    trapExplanation:
      "Bus の40だけで止めないこと。Car の10も加える。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["図表読解", "データ読み取り"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S4,
    id: "ct-eng-v3-s4-q3",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "Commuting Survey — Matching statement",
    statement: "Which statement matches the table?",
    type: "single-choice",
    options: [
      "More students walk than take the bus",
      "Car is the most common way",
      "The bus is more common than the bicycle",
      "Half of the students walk to school",
    ],
    correctAnswer: "More students walk than take the bus",
    explanation:
      "Walk(70) は Bus(40) より多いので、最初の文は正しい。Car は最も少なく、Bus(40) は Bicycle(80) より少ない。Walk は70人で、全体200人の半分（100人）ではない。",
    strategy:
      "各選択肢を表の数値と1つずつ照合する。大小・最多・半分などの表現を数値で確かめる。",
    trapExplanation:
      "「Half of the students walk」は誤り。半分は100人だが、Walk は70人である。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["図表読解", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第5問 情報照合 ───────────────────────────────────────────────────────
  {
    ...ENG_V3_S5,
    id: "ct-eng-v3-s5-q1",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Weekend Courses — Course Z time",
    statement: "When is Course Z (Public Speaking) held?",
    type: "single-choice",
    options: [
      "Saturdays 10:00-11:30",
      "Sundays 14:00-16:00",
      "Saturdays 16:00-17:00",
      "Sundays 10:00-11:30",
    ],
    correctAnswer: "Saturdays 16:00-17:00",
    explanation:
      "Course Z は「Saturdays 16:00-17:00」と書かれている。土曜の午後の講座である。",
    strategy:
      "講座ごとの曜日・時間の欄を見る。Course Z の行を正確に読む。",
    trapExplanation:
      "Course X の「Saturdays 10:00-11:30」と混同しないこと。Z は16:00開始である。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S5,
    id: "ct-eng-v3-s5-q2",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Weekend Courses — Best for Hana",
    statement: "Which course best fits Hana?",
    type: "single-choice",
    options: ["Course X", "Course Y", "Course Z", "No course fits her"],
    correctAnswer: "Course X",
    explanation:
      "Hana は毎週日曜は忙しく、土曜の午前は空いている。Course X は土曜10:00-11:30の午前なので合う。Course Y は日曜、Course Z は土曜の夕方なので合わない。",
    strategy:
      "生徒の条件（曜日・時間帯）をすべて満たす講座を探す。1つでも合わなければ消去する。",
    trapExplanation:
      "Course Z も土曜だが16:00開始で午前ではない。Hana の「Saturday mornings」に合うのは X である。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S5,
    id: "ct-eng-v3-s5-q3",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "Weekend Courses — Best for Tom",
    statement: "Using the same course list, which course best fits Tom?",
    type: "single-choice",
    options: ["Course X", "Course Y", "Course Z", "No course fits him"],
    correctAnswer: "Course Z",
    explanation:
      "Tom は人前での話し方を上達させたい。Course Z（Public Speaking）は自信をもって話したい生徒に向いており、最も合う。",
    strategy:
      "前問と同じ表を使い、Tom の目的（speak in front of people）に合う講座を探す。",
    trapExplanation:
      "X（写真）や Y（料理）は Tom の目的に合わない。話し方に関係する Z を選ぶ。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第6問 物語 ───────────────────────────────────────────────────────────
  {
    ...ENG_V3_S6,
    id: "ct-eng-v3-s6-q1",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Hiro's Concert — Shaking hands",
    statement: "Why were Hiro's hands shaking?",
    type: "single-choice",
    options: [
      "He was cold",
      "He was nervous before performing",
      "He had hurt his hand",
      "He was very tired",
    ],
    correctAnswer: "He was nervous before performing",
    explanation:
      "本文では、長く練習してきた発表会の当日に「his hands were shaking」とある。緊張のために手が震えていたと読み取れる。",
    strategy:
      "出来事の前後関係を読む。発表会の当日という場面から、震えの理由（緊張）を判断する。",
    trapExplanation:
      "寒さやけがの記述は本文にない。場面（コンサート当日）から緊張を読み取る。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["時系列整理", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S6,
    id: "ct-eng-v3-s6-q2",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Hiro's Concert — At first",
    statement: "What happened at first when Hiro started to play?",
    type: "single-choice",
    options: [
      "He forgot the whole song",
      "He played a wrong note",
      "He dropped the music sheet",
      "He started much too fast",
    ],
    correctAnswer: "He played a wrong note",
    explanation:
      "本文に「At first he played a wrong note, and his heart sank」とある。最初に間違った音を弾いてしまった。",
    strategy:
      "At first の後の出来事を読む。演奏中に起きたことを順に追う。",
    trapExplanation:
      "「曲を全部忘れた」は言い過ぎである。本文は1つの音を間違えたと述べている。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["時系列整理", "情報照合"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S6,
    id: "ct-eng-v3-s6-q3",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "Hiro's Concert — What he learned",
    statement: "What did Hiro learn from this experience?",
    type: "single-choice",
    options: [
      "One mistake does not ruin everything",
      "He should never play the piano again",
      "Practice is not important",
      "The audience did not notice him",
    ],
    correctAnswer: "One mistake does not ruin everything",
    explanation:
      "本文の最後に「Hiro realized that making one mistake did not ruin everything」とある。1つのミスで全てが台無しになるわけではない、と学んだ。",
    strategy:
      "物語の学びは最後の一文に表れることが多い。realized の後の内容を読む。",
    trapExplanation:
      "演奏後に拍手をもらっているので「もう弾かない」は本文と合わない。最後の realized の内容を選ぶ。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },

  // ── 第7問 論説文 ─────────────────────────────────────────────────────────
  {
    ...ENG_V3_S7,
    id: "ct-eng-v3-s7-q1",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "School Uniforms — Against view",
    statement: "What do people who are against uniforms say?",
    type: "single-choice",
    options: [
      "Uniforms are too cheap",
      "Students should be free to express themselves through clothes",
      "Uniforms are too colorful",
      "Students should wear uniforms at home",
    ],
    correctAnswer: "Students should be free to express themselves through clothes",
    explanation:
      "本文に「Those who are against uniforms say that students should be free to express themselves through their clothes」とある。反対派は、服で自分を表現する自由を主張している。",
    strategy:
      "against（反対）の立場の主張を探す。say that の後の内容を読む。",
    trapExplanation:
      "値段や色の話は本文にない。反対派の主張（自己表現の自由）を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["要旨把握", "情報照合"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S7,
    id: "ct-eng-v3-s7-q2",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "School Uniforms — Supporters' point",
    statement: "What benefit of uniforms do supporters mention?",
    type: "single-choice",
    options: [
      "They are always fashionable",
      "They save time and reduce the pressure to follow fashion",
      "They are free of charge",
      "They never get dirty",
    ],
    correctAnswer: "They save time and reduce the pressure to follow fashion",
    explanation:
      "本文に「uniforms save time in the morning and reduce the pressure to follow fashion」とある。賛成派は、時間の節約と流行に従う圧力の軽減を利点として挙げている。",
    strategy:
      "supporters / On the other hand の後を読み、賛成派が挙げる利点を取り出す。",
    trapExplanation:
      "「無料」「汚れない」は本文にない。supporters point out の後の内容を選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S7,
    id: "ct-eng-v3-s7-q3",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "School Uniforms — Writer's view",
    statement: "What is the writer's own view?",
    type: "single-choice",
    options: [
      "Uniforms have benefits if the design is comfortable and practical",
      "Uniforms should be banned from all schools",
      "Students should design their own uniforms",
      "What students wear does not matter at all",
    ],
    correctAnswer: "Uniforms have benefits if the design is comfortable and practical",
    explanation:
      "本文の最後に「A reasonable view is that uniforms have clear benefits, as long as the design is comfortable and practical」とある。これが書き手自身の立場である。",
    strategy:
      "書き手の立場は A reasonable view などの表現の後にある。両論を紹介した後の結論を選ぶ。",
    trapExplanation:
      "「banned（禁止すべき）」は反対派の極端な立場で、書き手の結論ではない。条件つきで利点を認める文を選ぶ。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
  },

  // ── 第8問 レポート完成 ───────────────────────────────────────────────────
  {
    ...ENG_V3_S8,
    id: "ct-eng-v3-s8-q1",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Exercise Report — Most common reason",
    statement:
      "According to Source 1, what is the most common reason students do not exercise more?",
    type: "single-choice",
    options: [
      "No time",
      "No place nearby",
      "Don't like exercising alone",
      "Other",
    ],
    correctAnswer: "No time",
    explanation:
      "Source 1 では「No time: 38%」が最も高い割合である。最も多い理由は「時間がない」ことである。",
    strategy:
      "割合の最大を探す。調査の数値を比べて最も高い項目を選ぶ。",
    trapExplanation:
      "No place nearby(30%) も高いが最大ではない。最も高いのは38%の No time である。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り"],
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  {
    ...ENG_V3_S8,
    id: "ct-eng-v3-s8-q2",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Exercise Report — The school's plan",
    statement: "According to Source 2, what will the school start next month?",
    type: "single-choice",
    options: [
      "A new sports shop",
      "Opening the gym after class and a group jogging club",
      "Online exercise videos",
      "A new swimming pool",
    ],
    correctAnswer: "Opening the gym after class and a group jogging club",
    explanation:
      "Source 2 に「the school gym will be open after class on Tuesdays and Thursdays」「A teacher will also lead a group jogging club」とある。放課後の体育館開放と、集団ジョギングクラブが始まる。",
    strategy:
      "Source 2 の内容を2つの要素（体育館開放・ジョギングクラブ）に分けて読み、選択肢と照合する。",
    trapExplanation:
      "スポーツ店やプールの記述は本文にない。資料に書かれた2つの取り組みを選ぶ。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "選択肢消去"],
    subQuestionIndex: 2,
    difficultyStage: "standard",
  },
  {
    ...ENG_V3_S8,
    id: "ct-eng-v3-s8-q3",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "Exercise Report — Completing the conclusion",
    statement: "Which choice best completes the report's conclusion?",
    type: "single-choice",
    options: [
      "it opens a gym nearby and offers a group jogging club, so students do not have to exercise alone",
      "it gives students more free time after school",
      "it sells new running shoes at a low price",
      "it makes exercise a required subject for everyone",
    ],
    correctAnswer:
      "it opens a gym nearby and offers a group jogging club, so students do not have to exercise alone",
    explanation:
      "レポートは「no place nearby（近くに場所がない）」と「disliking exercising alone（一人での運動が苦手）」の2つの理由を挙げている。Source 2 の体育館開放は前者を、集団ジョギングクラブは後者を解決する。両方に対応する選択肢が正解である。",
    strategy:
      "結論の空欄には、レポートが挙げた2つの問題の両方に答える根拠を選ぶ。資料2の2つの取り組みと結びつける。",
    trapExplanation:
      "「more free time（自由な時間を増やす）」は最も多い No time には触れているが、レポートが挙げた2つの理由（場所・一人）には答えていない。両方に対応する選択肢を選ぶ。",
    estimatedMinutes: 4,
    difficulty: "HARD",
    skillTags: ["レポート完成", "情報照合"],
    subQuestionIndex: 3,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
];

export const COMMON_TEST_EXAM_VARIANT_SETS: Record<string, CommonTestDrillQuestion[]> = {
  "math-1a-70-v2": MATH_1A_70_V2,
  "math-1a-70-v3": MATH_1A_70_V3,
  "math-2bc-70-v2": MATH_2BC_70_V2,
  "math-2bc-70-v3": MATH_2BC_70_V3,
  "english-reading-80-v2": ENGLISH_READING_80_V2,
  "english-reading-80-v3": ENGLISH_READING_80_V3,
};

export function getCommonTestExamVariantSet(
  examId: string
): CommonTestDrillQuestion[] | null {
  return COMMON_TEST_EXAM_VARIANT_SETS[examId] ?? null;
}
