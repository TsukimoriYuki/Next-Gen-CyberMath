// ── 共通テスト EXAM SIMULATOR — 問題取得ユーティリティ ───────────────────

import { COMMON_TEST_DRILL_QUESTIONS } from "@/data/common-test-drills";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import { getCommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import { getCommonTestExamVariantSet } from "@/data/common-test-exam-sets";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";

type ExamFlowPatch = Partial<CommonTestDrillQuestion>;

const COMMON_TEST_EXAM_SECTION_FLOW: Record<string, ExamFlowPatch> = {
  "math-1a:section-1": {
    examContext:
      "第1問は、校庭で木の高さを測る場面を考える。木の根もとを $O$、木の先端を $T$ とし、地面は水平、木は地面に垂直に立っているものとする。地点 $B$ は $O$ から12 m離れた地点で、地点 $A$ は $B$ からさらに木と反対側へ12 m離れた地点である。",
    sharedStem:
      "まず $\\tan \\theta = \\dfrac{高さ}{水平距離}$ の関係を確認する。小問1、2で求めた高さを使い、小問3、4では条件を変えたときの距離や判断へ進む。",
    sharedData: {
      title: "三角比の表",
      headers: ["角度", "$30°$", "$45°$", "$60°$"],
      rows: [["$\\tan$", "$\\dfrac{1}{\\sqrt{3}}$", "1", "$\\sqrt{3}$"]],
      notes: ["目の高さは考えない。距離はすべて水平距離とする。"],
    },
  },
  "math-1a:section-2": {
    examContext:
      "第2問は、あるクラスの小テスト結果と学習時間の関係を考える。5人の学習時間 $x$ 時間と得点 $y$ 点は下の表の通りである。さらに、得点の変化を表す簡単なモデルとして $f(x)=-3(x-3)^2+67$ を考える。",
    sharedStem:
      "前半で表から代表値と傾向を読み取り、後半で二次関数モデルを使う。モデルは観測範囲の傾向を説明するための近似であり、範囲外へそのまま広げてよいとは限らない。",
    sharedData: {
      title: "学習時間と小テスト得点",
      headers: ["生徒", "A", "B", "C", "D", "E"],
      rows: [
        ["学習時間 $x$（時間）", "0", "1", "2", "3", "4"],
        ["得点 $y$（点）", "40", "55", "64", "67", "64"],
      ],
      notes: ["モデル $f(x)=-3(x-3)^2+67$ は、0時間から4時間までの範囲で得点の傾向を見るために使う。"],
    },
  },
  "math-1a:section-3": {
    examContext:
      "第3問は、円の外部の点 $P$ から2本の割線と1本の接線を引く図形を考える。1本目の割線は円と近い方から $A,B$ で交わり、$PA=3$、$PB=12$ である。2本目の割線は円と近い方から $C,D$ で交わり、$PC=4$ である。接線の接点を $T$ とする。",
    sharedStem:
      "同じ点 $P$ から引いた割線どうしでは $PA\\cdot PB=PC\\cdot PD$ が成り立つ。接線については $PT^2=PA\\cdot PB$ を使う。前の小問で求めた積を後半でも使う。",
    sharedData: {
      title: "与えられた長さ",
      headers: ["線分", "$PA$", "$PB$", "$PC$", "$PD$", "$PT$"],
      rows: [["長さ", "3", "12", "4", "?", "?"]],
      notes: ["$A,C$ はそれぞれ点 $P$ に近い方の交点である。"],
    },
  },
  "math-1a:section-4": {
    examContext:
      "第4問は、1から6までの数字が1つずつ書かれた6枚のカードを使う。カードを2枚、順に取り出し、取り出したカードは戻さない。1枚目の数を $a$、2枚目の数を $b$ とする。",
    sharedStem:
      "順に取り出すので、基本の全事象は順序を区別して数える。小問1、2で場合の数を数え、小問3で確率、小問4で期待値へ進む。",
    sharedData: {
      title: "ゲームの条件",
      headers: ["条件", "内容"],
      rows: [
        ["カード", "1, 2, 3, 4, 5, 6"],
        ["取り出し方", "2枚を順に取り出し、戻さない"],
        ["賞金", "$a+b$ が偶数なら100円、奇数なら0円"],
      ],
      notes: ["偶数の和になるのは、2枚の数がどちらも奇数、またはどちらも偶数の場合である。"],
    },
  },
  "math-2bc:section-3": {
    examContext:
      "第3問は、講堂の座席を段ごとに増やす設定です。第1段の座席数を $a_1=10$ とし、1段下がるごとに3席ずつ増える。第 $n$ 段の座席数を $a_n$、第1段から第 $n$ 段までの合計を $S_n$ とする。",
    sharedStem:
      "まず具体的な項を確認し、一般項、和、条件を満たす最小の $n$ へ進む。前の小問で得た式を後半で使いなさい。",
    sharedData: {
      title: "座席数の一部",
      headers: ["段", "1", "2", "3", "...", "n"],
      rows: [["座席数", "10", "13", "16", "...", "$a_n$"]],
      notes: ["座席数は等差数列で、公差は3である。"],
    },
  },
  "math-2bc:section-4": {
    examContext:
      "第4問は、飲料の内容量調査をもとに標本平均と信頼区間を考える。母標準偏差は $12$ mL、標本の大きさは $36$、標本平均は $502$ mL とする。",
    sharedStem:
      "標本平均の標準偏差を先に求め、その値を使って信頼区間や判断問題へ進みなさい。",
    sharedData: {
      title: "標準正規分布表の抜粋",
      headers: ["範囲", "確率"],
      rows: [
        ["$P(-1.96 \\leqq Z \\leqq 1.96)$", "0.95"],
        ["$P(0 \\leqq Z \\leqq 2)$", "0.4772"],
      ],
      notes: ["信頼区間では、標本平均の標準偏差を用いる。"],
    },
  },
  "math-2bc:section-5": {
    examContext:
      "第5問は、平面上の三角形 $OAB$ を考える。$\\overrightarrow{OA}=\\vec{a}=(4,0)$、$\\overrightarrow{OB}=\\vec{b}=(1,3)$ とし、点 $P$ は辺 $AB$ を $2:1$ に内分する。",
    sharedStem:
      "内積、内分点、座標表示、面積比の順に考える。前半で求めた点 $P$ の位置を後半の判断に使いなさい。",
    sharedData: {
      title: "点とベクトル",
      headers: ["記号", "意味"],
      rows: [
        ["$\\vec{a}$", "$\\overrightarrow{OA}=(4,0)$"],
        ["$\\vec{b}$", "$\\overrightarrow{OB}=(1,3)$"],
        ["$P$", "$AB$ を $2:1$ に内分する点"],
      ],
      notes: ["$AP:PB=2:1$ なので、点 $P$ は $B$ に近い。"],
    },
  },
  "english-reading:section-5": {
    examPassage:
      "Section 5 contains information-matching tasks. Each item presents a list, email exchange, notice, or schedule, and you must choose the option that satisfies all given conditions.",
    sharedStem:
      "Read the conditions first. Then check time, age, cost, place, requirement, and preference one by one. An option is correct only when all required conditions match.",
  },
  "english-reading:section-8": {
    examPassage:
      "Students are preparing short reports based on two sources. Each blank must be completed with a statement supported by both the data and the written source.",
    sharedStem:
      "Before choosing an answer, identify which source gives the number and which source explains the reason. Avoid choices that sound reasonable but are not supported by the sources.",
  },
};

const COMMON_TEST_EXAM_QUESTION_PATCHES: Record<string, ExamFlowPatch> = {
  "ct-m1a-s1-q1": {
    title: "測量と三角比 — 表の確認",
    statement:
      "三角比の表から、$\\tan 45°$ の値を求めよ。",
    options: ["0", "1", "$\\dfrac{1}{\\sqrt{3}}$", "$\\sqrt{3}$"],
    correctAnswer: "1",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "共通資料の三角比の表を見ると、$45°$ の行に対応する $\\tan$ の値は1である。この値は、地点 $B$ から木を見たときの高さと水平距離の関係を調べる小問2で使う。",
    strategy:
      "最初の小問は表の確認である。表から必要な値だけを拾い、次の小問でどの比に入れるかを意識しておく。",
    trapExplanation:
      "$\\tan 30°$ や $\\tan 60°$ と取り違えやすい。角度の列を確認してから値を読むこと。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
    estimatedMinutes: 1,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "計算処理"],
  },
  "ct-m1a-s1-q2": {
    title: "測量と三角比 — 木の高さ",
    statement:
      "地点 $B$ から木の先端 $T$ を見上げた仰角は $45°$ である。$BO=12$ m のとき、木の高さ $OT$ を求めよ。",
    options: ["8", "10", "12", "24"],
    correctAnswer: "12",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "共通設定より、$\\tan 45°=\\dfrac{OT}{BO}$ である。小問1より $\\tan 45°=1$、また $BO=12$ なので、$1=\\dfrac{OT}{12}$。よって $OT=12$ m である。",
    strategy:
      "高さを求めるときは、先に $\\tan \\theta=\\dfrac{高さ}{水平距離}$ を書く。小問1で確認した $\\tan 45°=1$ をそのまま代入すればよい。",
    trapExplanation:
      "$45°$ では高さと水平距離が等しくなる。$12$ を2倍したり半分にしたりする必要はない。",
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },
  "ct-m1a-s1-q3": {
    title: "測量と三角比 — 前問の高さを使う",
    statement:
      "小問2で求めた高さを用いる。木の先端 $T$ の仰角が $30°$ になる地点 $C$ を、木の根もと $O$ から一直線上にとる。このとき、$CO$ の長さを求めよ。",
    options: [
      "$12\\sqrt{3}$ m",
      "$\\dfrac{12}{\\sqrt{3}}$ m",
      "$24$ m",
      "$6\\sqrt{3}$ m",
    ],
    correctAnswer: "$12\\sqrt{3}$ m",
    explanation:
      "小問2より木の高さは $OT=12$ m。仰角が $30°$ なので、$\\tan 30°=\\dfrac{OT}{CO}$。共通資料から $\\tan 30°=\\dfrac{1}{\\sqrt{3}}$ であるから、$\\dfrac{1}{\\sqrt{3}}=\\dfrac{12}{CO}$。よって $CO=12\\sqrt{3}$ m である。",
    strategy:
      "前問で求めた高さ $12$ m を使い回す。新しく高さを置き直すより、$\\tan 30°=12/CO$ とすぐ式にする方が速い。",
    trapExplanation:
      "$\\tan 30°$ を $\\sqrt{3}$ と覚え違えると、距離が $12/\\sqrt{3}$ m になってしまう。表の値を確認してから式を立てること。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形", "計算処理"],
  },
  "ct-m1a-s1-q4": {
    title: "測量と三角比 — 条件変更の判断",
    statement:
      "地点 $A$ は $O$ から24 m離れている。小問2で求めた木の高さを用いるとき、地点 $A$ から見た仰角について正しいものを選べ。",
    options: [
      "仰角は $30°$ より小さい",
      "仰角はちょうど $30°$ である",
      "仰角は $45°$ より大きい",
      "高さが分からないので判断できない",
    ],
    correctAnswer: "仰角は $30°$ より小さい",
    explanation:
      "小問2より高さは12 m。地点 $A$ では $\\tan \\theta=\\dfrac{12}{24}=\\dfrac{1}{2}$ である。共通資料より $\\tan 30°=\\dfrac{1}{\\sqrt{3}}$ で、これは約0.577である。$\\dfrac{1}{2}$ はそれより小さいので、仰角は $30°$ より小さい。",
    strategy:
      "条件変更の判断では、角度そのものを無理に求めず、$\\tan$ の値を比較する。前問までの高さ12 mを使えば、$12/24$ だけで判断できる。",
    trapExplanation:
      "地点 $A$ が遠くなるほど仰角は小さくなる。距離が大きいのに角度が大きくなる選択肢は図の感覚とも合わない。",
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "選択肢消去", "誘導読解"],
  },
  "ct-m1a-s2-q1": {
    title: "データとモデル — 平均の読み取り",
    statement:
      "共通資料の5人の得点について、平均点を求めよ。",
    options: ["56", "58", "60", "62"],
    correctAnswer: "58",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "得点は $40,55,64,67,64$ である。合計は $40+55+64+67+64=290$、人数は5人なので、平均は $290\\div5=58$ 点である。この平均は、後の小問で表全体の傾向を見る基準になる。",
    strategy:
      "表の値を横に足し、人数で割る。平均の計算では、表のどの行を使うかを先に確認する。",
    trapExplanation:
      "学習時間の行を混ぜて計算しないこと。平均を求める対象は得点 $y$ の行である。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["データ読み取り", "計算処理"],
  },
  "ct-m1a-s2-q2": {
    title: "データとモデル — 散布図の傾向",
    statement:
      "共通資料の表から読み取れる、学習時間と得点の関係として最も適切なものを選べ。",
    options: [
      "0時間から3時間までは得点が上がり、4時間では少し下がっている",
      "学習時間が長いほど、得点は常に同じ割合で上がっている",
      "学習時間が長いほど、得点は常に下がっている",
      "学習時間と得点にはまったく関係がないと断定できる",
    ],
    correctAnswer:
      "0時間から3時間までは得点が上がり、4時間では少し下がっている",
    explanation:
      "表では、学習時間が0,1,2,3時間のとき得点は $40,55,64,67$ と上がる。一方、4時間では64点に下がっている。したがって、少なくともこの5人のデータでは、3時間付近まで上昇し、その後は少し下がる傾向が読み取れる。",
    strategy:
      "散布図や表の解釈では、値の並びを順に追う。『常に』や『まったく』のような強い表現は、表のすべての値と合うかを確認してから選ぶ。",
    trapExplanation:
      "3時間までの上昇だけを見て、4時間でも上がると思い込むのが典型的な誤り。最後のデータまで確認すること。",
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: false,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["データ読み取り", "選択肢消去"],
  },
  "ct-m1a-s2-q3": {
    title: "データとモデル — 二次関数の最大値",
    statement:
      "モデル $f(x)=-3(x-3)^2+67$ を用いる。このモデルで、$0\\leqq x\\leqq4$ における最大値を求めよ。",
    options: ["64", "67", "70", "76"],
    correctAnswer: "67",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "モデルは $f(x)=-3(x-3)^2+67$ で、頂点は $(3,67)$ である。係数が負なのでグラフは下向きに開く。$x=3$ は範囲 $0\\leqq x\\leqq4$ に含まれるため、最大値は67である。これは小問2で読み取った『3時間付近で高い』という傾向とも合っている。",
    strategy:
      "二次関数モデルは、まず頂点を見る。展開せずに頂点形式のまま、開き方と定義域を確認する。",
    trapExplanation:
      "得点表の最大値67と一致するが、理由はモデルの頂点にある。端点 $x=4$ の値64だけを見て最大値としないこと。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "データ読み取り", "誘導読解"],
  },
  "ct-m1a-s2-q4": {
    title: "データとモデル — モデルの限界",
    statement:
      "小問3のモデルを使って学習時間と得点を考えるとき、最も適切な判断を選べ。",
    options: [
      "0時間から4時間の範囲では傾向を見る参考になるが、範囲外までそのまま正しいとは限らない",
      "学習時間を増やせば、何時間でも得点は必ず上がり続ける",
      "4時間の得点が下がっているので、学習は常に逆効果である",
      "平均点が58点なので、全員の得点は58点に近いと断定できる",
    ],
    correctAnswer:
      "0時間から4時間の範囲では傾向を見る参考になるが、範囲外までそのまま正しいとは限らない",
    explanation:
      "共通資料のモデルは、表にある0時間から4時間のデータの傾向を見るための近似である。小問3で最大が3時間付近にあることは分かるが、5時間、6時間と範囲外へ広げたときにも同じモデルが必ず正しいとはいえない。",
    strategy:
      "モデルの解釈では、計算結果だけでなく、どの範囲のデータから作ったモデルかを確認する。極端な断定を含む選択肢は、資料の根拠があるかを疑う。",
    trapExplanation:
      "二次関数で計算できるからといって、現実のすべてを表すわけではない。観測範囲外の予測は、追加データなしに断定しない。",
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "選択肢消去", "データ読み取り"],
  },
  "ct-m1a-s3-q1": {
    title: "円と方べき — 積の確認",
    statement:
      "共通設定において、$PA\\cdot PB$ の値を求めよ。",
    options: ["15", "24", "36", "48"],
    correctAnswer: "36",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "共通資料より $PA=3$、$PB=12$ である。したがって $PA\\cdot PB=3\\times12=36$。この積は、次の小問で $PC\\cdot PD$ や $PT^2$ と等しくなる量である。",
    strategy:
      "方べきの問題では、最初に基準となる積を計算する。ここで求めた36を後の小問で使い回す。",
    trapExplanation:
      "$PB$ は $AB$ の長さではなく、点 $P$ から遠い交点 $B$ までの長さである。与えられた長さの意味を図で確認すること。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "条件整理"],
  },
  "ct-m1a-s3-q2": {
    title: "円と方べき — もう一方の割線",
    statement:
      "小問1の結果を用いる。$PC=4$ のとき、$PD$ の長さを求めよ。",
    options: ["6", "8", "9", "12"],
    correctAnswer: "9",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "同じ点 $P$ から引いた2本の割線について、$PA\\cdot PB=PC\\cdot PD$ が成り立つ。小問1より $PA\\cdot PB=36$、また $PC=4$ なので、$4\\cdot PD=36$。よって $PD=9$ である。",
    strategy:
      "前問で求めた36をそのまま右辺に置く。式を $4\\cdot PD=36$ と短く作れば、計算はすぐ終わる。",
    trapExplanation:
      "$PC+PD=36$ としてしまう誤りに注意。方べきで等しくなるのは和ではなく積である。",
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形"],
  },
  "ct-m1a-s3-q3": {
    title: "円と方べき — 前問から弦の一部を求める",
    statement:
      "小問2の結果を用いる。線分 $CD$ の長さを求めよ。",
    options: ["4", "5", "9", "13"],
    correctAnswer: "5",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "点の順序は $P,C,D$ であり、小問2より $PD=9$、共通資料より $PC=4$ である。したがって $CD=PD-PC=9-4=5$。前問で求めた $PD$ を使うのがポイントである。",
    strategy:
      "図上の順序を確認して、長い線分から短い線分を引く。前問の値を使う問題なので、新しく方べきの式を立て直さなくてよい。",
    trapExplanation:
      "$PC$ と $CD$ を混同しやすい。$PD$ は $P$ から遠い交点 $D$ までの長さで、$CD$ は円の中にある部分である。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "誘導読解", "計算処理"],
  },
  "ct-m1a-s3-q4": {
    title: "円と方べき — 接線の長さ",
    statement:
      "同じ点 $P$ から円に接線 $PT$ を引く。小問1の結果を用いて、$PT$ の長さを求めよ。",
    options: ["5", "6", "9", "36"],
    correctAnswer: "6",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "接線と割線の方べきより、$PT^2=PA\\cdot PB$。小問1で $PA\\cdot PB=36$ と求めたので、$PT^2=36$、したがって $PT=6$ である。",
    strategy:
      "接線が出たら、長さそのものではなく2乗が方べきに等しいことを思い出す。小問1の36を使い、最後に平方根を取る。",
    trapExplanation:
      "$PT=36$ としてしまう誤りが多い。$36$ は $PT^2$ の値であり、接線の長さはその平方根の6である。",
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
    estimatedMinutes: 3,
    difficulty: "HARD",
    skillTags: ["誘導読解", "数式変形", "計算処理"],
  },
  "ct-m1a-s4-q1": {
    title: "カードの確率 — 全事象",
    statement:
      "共通設定で、2枚を順に取り出すときの取り出し方は全部で何通りあるか。ただし、順序を区別する。",
    options: ["15", "20", "30", "36"],
    correctAnswer: "30",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "1枚目は6通り、2枚目は1枚目を戻さないので5通り。順序を区別するため、全事象は $6\\times5=30$ 通りである。この30通りを小問3の確率の分母として使う。",
    strategy:
      "順に取り出す場合は、組合せではなく順列として数える。『戻さない』ので2枚目は5通りになる。",
    trapExplanation:
      "$_6\\mathrm{C}_2=15$ としてしまうのは、順序を区別しない場合の数え方である。今回は $a,b$ の順序がある。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },
  "ct-m1a-s4-q2": {
    title: "カードの確率 — 条件を満たす場合の数",
    statement:
      "$a+b$ が偶数になる取り出し方は何通りあるか。",
    options: ["6", "12", "15", "18"],
    correctAnswer: "12",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "$a+b$ が偶数になるのは、2枚とも奇数、または2枚とも偶数の場合である。奇数カードは1,3,5の3枚なので順に2枚取る方法は $3\\times2=6$ 通り。偶数カードも2,4,6の3枚なので $3\\times2=6$ 通り。合計で $6+6=12$ 通りである。",
    strategy:
      "和が偶数になる条件を『同じ偶奇』と言い換える。奇数どうし、偶数どうしに分けて数えると漏れにくい。",
    trapExplanation:
      "奇数3枚と偶数3枚を選ぶだけで終わると、順序を落としてしまう。今回は順に取り出すので、それぞれ $3\\times2$ 通りで数える。",
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: false,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["条件整理", "計算処理"],
  },
  "ct-m1a-s4-q3": {
    title: "カードの確率 — 前問から確率へ",
    statement:
      "$a+b$ が偶数になる確率を求めよ。",
    options: [
      "$\\dfrac{1}{5}$",
      "$\\dfrac{2}{5}$",
      "$\\dfrac{1}{2}$",
      "$\\dfrac{3}{5}$",
    ],
    correctAnswer: "$\\dfrac{2}{5}$",
    explanation:
      "小問1より全事象は30通り、小問2より $a+b$ が偶数になる場合は12通りである。したがって確率は $\\dfrac{12}{30}=\\dfrac{2}{5}$ である。",
    strategy:
      "前問までの結果を分子と分母に入れる。確率は『条件を満たす場合の数 ÷ 全体の場合の数』で処理する。",
    trapExplanation:
      "$12$ 通りをそのまま答えにしないこと。また、全体を36通りとすると、戻さない条件を無視した確率になる。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
    estimatedMinutes: 2,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理"],
  },
  "ct-m1a-s4-q4": {
    title: "カードの確率 — 期待値",
    statement:
      "共通資料のゲームでは、$a+b$ が偶数なら100円、奇数なら0円を受け取る。受け取る金額の期待値を求めよ。",
    options: ["20", "40", "50", "60"],
    correctAnswer: "40",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "小問3より、$a+b$ が偶数になる確率は $\\dfrac{2}{5}$ である。したがって期待値は $100\\times\\dfrac{2}{5}+0\\times\\dfrac{3}{5}=40$ 円である。前問の確率をそのまま賞金に掛ける。",
    strategy:
      "期待値は『金額 $\\times$ 確率』の合計で求める。前問で求めた成功確率 $\\dfrac{2}{5}$ を使うと、計算し直さずに済む。",
    trapExplanation:
      "偶数になる場合の数12を直接100に掛けないこと。期待値では場合の数ではなく確率を使う。",
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "計算処理", "条件整理"],
  },
  "ct-m2bc-s3-q1": {
    title: "数列 — 座席数の具体値",
    statement:
      "共通設定において、第3段の座席数 $a_3$ を求めよ。",
    options: ["13", "16", "19", "22"],
    correctAnswer: "16",
    explanation:
      "$a_1=10$、公差が3なので、$a_2=13$、$a_3=16$ である。まず具体的な項を確認して、以後の一般項や和の計算につなげる。",
    strategy:
      "具体的な項を聞かれたら、一般項を作る前に表を1段ずつ埋める。短時間で $10,13,16$ と確認できる。",
    trapExplanation:
      "第3段を $10+3\\times3=19$ とする誤りに注意。第1段から第3段までは2回だけ増える。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  "ct-m2bc-s3-q2": {
    title: "数列 — 一般項と第10段",
    statement:
      "前問の増え方を用いるとき、第10段の座席数 $a_{10}$ を求めよ。",
    options: ["$34$", "$37$", "$40$", "$43$"],
    correctAnswer: "$37$",
    explanation:
      "等差数列の一般項は $a_n=10+3(n-1)$。したがって $a_{10}=10+3\\times9=37$ である。前問の表から、公差が3であることを使う。",
    strategy:
      "第 $n$ 項は初項に「公差 $\\times (n-1)$」を足す。$n$ 回ではなく $n-1$ 回増えることを先に確認する。",
    trapExplanation:
      "$10+3\\times10=40$ とするのが典型的なずれ。第1段の時点で10席があるので、増える回数は9回である。",
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s3-q3": {
    title: "数列 — 座席数の合計",
    statement:
      "第1段から第10段までの座席数の合計 $S_{10}$ を求めよ。",
    options: ["$185$", "$205$", "$235$", "$255$"],
    correctAnswer: "$235$",
    explanation:
      "前問より第10段は37席。等差数列の和を用いると、$S_{10}=\\dfrac{10(10+37)}{2}=235$。初項と末項の平均に項数を掛けると考える。",
    strategy:
      "和では、前問で求めた末項を使うと速い。初項10、末項37、項数10を並べてから公式に入れる。",
    trapExplanation:
      "末項を40と誤ると合計もずれる。また、10段の平均を取り忘れて $10+37=47$ のまま処理しないこと。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s3-q4": {
    title: "数列 — 公差の確認",
    statement:
      "同じ座席設定で、$a_2=13$、$a_6=25$ である。この2つの値から公差を求めよ。",
    options: ["2", "3", "4", "6"],
    correctAnswer: "3",
    explanation:
      "$a_6-a_2$ は4つ分の公差にあたる。$25-13=12$ なので、$4d=12$、よって $d=3$。前問までの設定と一致する。",
    strategy:
      "項番号の差と値の差を対応させる。第2段から第6段までは4ステップ進む。",
    trapExplanation:
      "第2段から第6段までを5ステップと数えると、公差を誤る。差は $6-2=4$ である。",
    subQuestionIndex: 4,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s3-q5": {
    title: "数列 — 条件を満たす最小の段数",
    statement:
      "第1段から第 $n$ 段までの合計座席数 $S_n$ が初めて200以上になる最小の $n$ を求めよ。",
    options: ["8", "9", "10", "11"],
    correctAnswer: "10",
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: 2 }],
    explanation:
      "$S_n=\\dfrac{n\\{20+3(n-1)\\}}{2}=\\dfrac{n(3n+17)}{2}$。$S_9=198$、$S_{10}=235$ なので、初めて200以上になるのは $n=10$ である。",
    strategy:
      "条件を満たす最小値は、境目の前後を確認する。前問の $S_{10}=235$ と、1つ前の $S_9=198$ を比べる。",
    trapExplanation:
      "$S_9=198$ は200に近いが、まだ200未満である。近い数値で止めず、条件を満たしているかを最後に確認する。",
    subQuestionIndex: 5,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s4-q1": {
    title: "統計的推測 — 標本平均の標準偏差",
    statement:
      "共通設定において、標本平均の標準偏差を求めよ。",
    options: ["2", "3", "6", "12"],
    correctAnswer: "2",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "標本平均の標準偏差は $\\dfrac{\\sigma}{\\sqrt{n}}$。ここでは $\\dfrac{12}{\\sqrt{36}}=\\dfrac{12}{6}=2$ である。この値を次の信頼区間で使う。",
    strategy:
      "標本平均では母標準偏差をそのまま使わず、$\\sqrt{n}$ で割る。まず標準誤差を求めてから後半へ進む。",
    trapExplanation:
      "母標準偏差12をそのまま答える、または36で割る誤りが多い。割るのは標本の大きさではなく、その平方根である。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  "ct-m2bc-s4-q2": {
    title: "統計的推測 — 95%信頼区間",
    statement:
      "前問の値を用いて、母平均 $m$ に対する信頼度95%の信頼区間を求めよ。",
    options: [
      "$498.08 \\leqq m \\leqq 505.92$",
      "$500.04 \\leqq m \\leqq 503.96$",
      "$478.48 \\leqq m \\leqq 525.52$",
      "$498.00 \\leqq m \\leqq 506.00$",
    ],
    correctAnswer: "$498.08 \\leqq m \\leqq 505.92$",
    explanation:
      "前問より標準誤差は2。95%信頼区間は $502\\pm1.96\\times2$ なので、$502\\pm3.92$。よって $498.08 \\leqq m \\leqq 505.92$ である。",
    strategy:
      "信頼区間は標本平均を中心に、標準誤差に1.96を掛けた幅を左右へ取る。前問の答えをそのまま使う。",
    trapExplanation:
      "$1.96$ を掛ける前に $\\sqrt{n}$ で割り忘れると区間が広すぎる。標本平均502を中心に左右対称になっているかも確認する。",
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s4-q3": {
    title: "統計的推測 — 区間に基づく判断",
    statement:
      "前問の信頼区間をもとに、母平均が500 mLであるという見方について最も適切なものを選べ。",
    options: [
      "500 mLは信頼区間に含まれるので、この結果だけで500 mLと矛盾するとはいえない",
      "500 mLは標本平均より小さいので、必ず母平均ではない",
      "信頼区間の中心は500 mLである",
      "標本の大きさが36なので、誤差は36 mLである",
    ],
    correctAnswer:
      "500 mLは信頼区間に含まれるので、この結果だけで500 mLと矛盾するとはいえない",
    explanation:
      "前問の信頼区間は $498.08$ から $505.92$ で、500 mLを含む。したがって、この標本だけから母平均500 mLと矛盾すると判断することはできない。",
    strategy:
      "信頼区間の解釈では、まず対象の値が区間に入るかを見る。入っていれば、少なくともその値をただちに否定する根拠にはならない。",
    trapExplanation:
      "標本平均502と母平均の候補500を単純比較して判断しないこと。標本平均にはばらつきがあるため、区間で考える必要がある。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s4-q4": {
    title: "統計的推測 — 標本の大きさを変えたとき",
    statement:
      "同じ母標準偏差 $12$ mL のもとで、標本の大きさを144にしたとき、標本平均の標準偏差を求めよ。",
    options: ["1", "2", "3", "4"],
    correctAnswer: "1",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "標本平均の標準偏差は $\\dfrac{12}{\\sqrt{144}}=\\dfrac{12}{12}=1$。標本を多くすると、標本平均のばらつきは小さくなる。",
    strategy:
      "標本の大きさが変わっても公式は同じ。$\\sqrt{144}=12$ を先に計算し、母標準偏差12を割る。",
    trapExplanation:
      "標本数が4倍になると標準誤差は4分の1ではなく2分の1になる。平方根で効くことを確認する。",
    subQuestionIndex: 4,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s5-q1": {
    title: "ベクトル — 基本の内積",
    statement:
      "共通設定において、内積 $\\vec{a}\\cdot\\vec{b}$ を求めよ。",
    options: ["-3", "1", "4", "7"],
    correctAnswer: "4",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\vec{a}\\cdot\\vec{b}=4\\cdot1+0\\cdot3=4$。まず成分表示で内積を確認しておくと、後の座標計算でも符号を整理しやすい。",
    strategy:
      "内積は対応する成分を掛けて足す。今回は第2成分が0なので、計算は $4\\cdot1$ だけでよい。",
    trapExplanation:
      "点の座標とベクトルの成分を混同しないこと。$\\vec{a}=(4,0)$、$\\vec{b}=(1,3)$ をそのまま使う。",
    subQuestionIndex: 1,
    difficultyStage: "basic",
  },
  "ct-m2bc-s5-q2": {
    subQuestionIndex: 2,
    difficultyStage: "standard",
    dependsOnPrevious: false,
  },
  "ct-m2bc-s5-q3": {
    title: "ベクトル — 内分点をさらに半分にする",
    statement:
      "点 $Q$ を線分 $OP$ の中点とする。$\\overrightarrow{OQ}$ を $\\vec{a}$、$\\vec{b}$ で表せ。",
    options: [
      "$\\dfrac{1}{6}\\vec{a}+\\dfrac{1}{3}\\vec{b}$",
      "$\\dfrac{1}{3}\\vec{a}+\\dfrac{2}{3}\\vec{b}$",
      "$\\dfrac{1}{2}\\vec{a}+\\dfrac{1}{2}\\vec{b}$",
      "$\\dfrac{2}{3}\\vec{a}+\\dfrac{1}{3}\\vec{b}$",
    ],
    correctAnswer: "$\\dfrac{1}{6}\\vec{a}+\\dfrac{1}{3}\\vec{b}$",
    explanation:
      "前問より $\\overrightarrow{OP}=\\dfrac{1}{3}\\vec{a}+\\dfrac{2}{3}\\vec{b}$。$Q$ は $OP$ の中点なので、$\\overrightarrow{OQ}=\\dfrac{1}{2}\\overrightarrow{OP}=\\dfrac{1}{6}\\vec{a}+\\dfrac{1}{3}\\vec{b}$。",
    strategy:
      "中点は位置ベクトルを2分の1にする。前問の $\\overrightarrow{OP}$ を使うので、係数をまとめて半分にする。",
    trapExplanation:
      "前問の $\\overrightarrow{OP}$ をそのまま答える誤りに注意。$Q$ は $P$ ではなく $OP$ の中点である。",
    subQuestionIndex: 3,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s5-q4": {
    title: "ベクトル — 内分点の座標",
    statement:
      "共通設定の点 $P$ の座標を $(x,y)$ とするとき、$x+y$ の値を求めよ。",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    answerFormat: "number",
    markLabels: ["ア"],
    explanation:
      "$\\overrightarrow{OP}=\\dfrac{1}{3}(4,0)+\\dfrac{2}{3}(1,3)=(2,2)$。したがって $x+y=2+2=4$。",
    strategy:
      "前問までのベクトル表示に、実際の成分を代入する。係数ごとに $x$ 成分と $y$ 成分を分けて計算する。",
    trapExplanation:
      "内分比を逆にすると $P$ の座標が変わる。$AP:PB=2:1$ なので、$P$ は $B$ に近い点である。",
    subQuestionIndex: 4,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  "ct-m2bc-s5-q5": {
    title: "ベクトル — 面積比",
    statement:
      "点 $P$ は辺 $AB$ 上にある。三角形 $OPB$ の面積は、三角形 $OAB$ の面積の何倍か。",
    options: [
      "$\\dfrac{1}{3}$",
      "$\\dfrac{1}{2}$",
      "$\\dfrac{2}{3}$",
      "$2$",
    ],
    correctAnswer: "$\\dfrac{1}{3}$",
    explanation:
      "$P$ は $AB$ を $AP:PB=2:1$ に内分するので、$PB$ は $AB$ の $\\dfrac{1}{3}$。三角形 $OAB$ と $OPB$ は、点 $O$ から直線 $AB$ への高さが共通で、底辺だけが $AB$ から $PB$ へ変わる。よって面積比は $\\dfrac{1}{3}$。",
    strategy:
      "同じ高さをもつ三角形は、底辺の比が面積比になる。最後はベクトル計算ではなく、図形的に比で処理する。",
    trapExplanation:
      "$AP:PB=2:1$ の2を見て $\\dfrac{2}{3}$ とする誤りが多い。三角形 $OPB$ の底辺は $PB$ であり、1の部分である。",
    subQuestionIndex: 5,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
  "ct-eng-s5-q4": {
    subQuestionIndex: 4,
    difficultyStage: "guided",
  },
  "ct-eng-s5-q5": {
    title: "Information Match - Festival Volunteer Tasks",
    passage: `Three students are choosing volunteer tasks for the school festival.

Task A: Guide visitors at the front gate. Good for students who enjoy talking. 9:00-11:00.
Task B: Carry boxes from classrooms to the gym. Good for students who do not mind physical work. 8:00-9:30.
Task C: Take photos of performances. Students must bring their own camera. 12:00-2:00.

Students:
Ken can come only before 10:00 and prefers active work.
Sara enjoys speaking with visitors but cannot come before 10:30.
Yui has a camera and is free after lunch.`,
    statement:
      "Using the same task list, which task is best for Ken?",
    options: ["Task A", "Task B", "Task C", "No task matches him"],
    correctAnswer: "Task B",
    explanation:
      "Ken can come only before 10:00 and prefers active work. Task B is from 8:00 to 9:30 and involves carrying boxes, so it matches both the time and the preference. Task A ends at 11:00 but is not mainly active work, and Task C is after lunch.",
    strategy:
      "同じ資料を使う2問目なので、前問で確認したタスク表にKenの条件を重ねる。時間を先に見るとTask Bだけが残る。",
    trapExplanation:
      "Task Aは9:00開始なので一部は参加できそうに見えるが、終了が11:00で、Kenの「before 10:00」と合わない。条件はすべて満たす必要がある。",
    subQuestionIndex: 5,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
  "ct-eng-s8-q4": {
    subQuestionIndex: 4,
    difficultyStage: "guided",
  },
  "ct-eng-s8-q5": {
    title: "Report Completion - Bicycle Parking Evidence",
    passage: `[Source 1 - Student Survey]
Question: Why do you avoid riding a bicycle to school?
No safe parking space: 46%
Too far from home: 24%
Bad weather: 18%
Other reasons: 12%

[Source 2 - School Notice]
The school has an unused space beside the east gate. It is currently closed, but it could be opened for student use if a teacher is present in the morning.`,
    context: `Report Draft: Encouraging Bicycle Use

The survey shows that the most common reason students avoid riding bicycles is not distance or weather, but the lack of safe parking. The school also has unused space beside the east gate. Therefore, the school should consider creating supervised bicycle parking near the east gate.`,
    statement:
      "Which pair of details best supports the report's conclusion?",
    options: [
      "46% chose no safe parking space, and the east gate has unused space that could be opened with a teacher present.",
      "24% said school was too far, and the east gate should remain closed.",
      "18% chose bad weather, and students should ride bicycles in the rain.",
      "12% chose other reasons, and the school should stop all bicycle use.",
    ],
    correctAnswer:
      "46% chose no safe parking space, and the east gate has unused space that could be opened with a teacher present.",
    explanation:
      "The conclusion combines Source 1 and Source 2. Source 1 shows that the largest problem is the lack of safe parking at 46%, and Source 2 gives a possible place near the east gate. The correct option includes both details.",
    strategy:
      "前問の結論を支える根拠を探す問題。資料1の最大割合と資料2の具体的な場所をセットで確認する。",
    trapExplanation:
      "数字だけ、または場所だけでは結論の根拠として不十分。2つの資料を同時に使っている選択肢を選ぶ。",
    subQuestionIndex: 5,
    difficultyStage: "advanced",
    dependsOnPrevious: true,
  },
};

function getQuestionStage(index: number): CommonTestDrillQuestion["difficultyStage"] {
  if (index <= 1) return "basic";
  if (index === 2) return "standard";
  if (index === 3) return "guided";
  return "advanced";
}

function addExamFlowMetadata(questions: CommonTestDrillQuestion[]): CommonTestDrillQuestion[] {
  const counts = new Map<string, number>();
  return questions.map((question) => {
    const sectionKey = `${question.subjectId}:${question.sectionId}`;
    const nextIndex = (counts.get(sectionKey) ?? 0) + 1;
    counts.set(sectionKey, nextIndex);

    const sectionFlow = COMMON_TEST_EXAM_SECTION_FLOW[sectionKey] ?? {};
    const patch = COMMON_TEST_EXAM_QUESTION_PATCHES[question.id] ?? {};

    return {
      ...question,
      ...sectionFlow,
      subQuestionIndex: nextIndex,
      difficultyStage: getQuestionStage(nextIndex),
      ...patch,
    };
  });
}

function limitMathIaExamQuestions(questions: CommonTestDrillQuestion[]): CommonTestDrillQuestion[] {
  return questions.filter((question) => /^ct-m1a-s[1-4]-q[1-4]$/.test(question.id));
}

export function getCommonTestExamQuestions(examId: string): CommonTestDrillQuestion[] {
  // 第2回・第3回（variant セット）は、専用に作問済みの問題をそのまま返す。
  // 各問に shared 設定・difficultyStage・dependsOnPrevious を作問時点で埋めてあるため、
  // addExamFlowMetadata（第1回用のセクションパッチ）は通さない。
  const variant = getCommonTestExamVariantSet(examId);
  if (variant) return variant;

  const preset = getCommonTestExamPreset(examId);
  if (!preset) return [];
  let questions = COMMON_TEST_DRILL_QUESTIONS.filter(
    (q) =>
      q.subjectId === preset.subjectId &&
      preset.sectionIds.includes(q.sectionId)
  ).sort((a, b) => {
    const sa = parseInt(a.sectionId.replace("section-", ""), 10);
    const sb = parseInt(b.sectionId.replace("section-", ""), 10);
    if (sa !== sb) return sa - sb;
    return a.id.localeCompare(b.id);
  });
  if (examId === "math-1a-70") {
    questions = limitMathIaExamQuestions(questions);
  }
  return addExamFlowMetadata(questions);
}

/** 指定大問のみに絞り込む（選択制プリセットの開始時に使用。元の並び順を保持） */
export function filterExamQuestionsBySections(
  questions: CommonTestDrillQuestion[],
  sectionIds: string[]
): CommonTestDrillQuestion[] {
  const allowed = new Set(sectionIds);
  return questions.filter((q) => allowed.has(q.sectionId));
}

export interface ExamSectionInfo {
  sectionId: string;
  sectionNumber: number;
  title: string;
  maxScore: number;
  questionCount: number;
}

/** プリセットの大問情報（タイトル・配点・問題数）を科目定義から引く */
export function getExamSectionInfos(
  preset: CommonTestExamPreset,
  questions: CommonTestDrillQuestion[]
): ExamSectionInfo[] {
  const subject = COMMON_TEST_SUBJECTS_MAP[preset.subjectId];
  return preset.sectionIds
    .map((sectionId) => {
      const num = parseInt(sectionId.replace("section-", ""), 10);
      const section = subject.sections.find((s) => s.number === num);
      return {
        sectionId,
        sectionNumber: num,
        title: section?.title ?? `第${num}問`,
        maxScore: section?.maxScore ?? 0,
        questionCount: questions.filter((q) => q.sectionId === sectionId).length,
      };
    })
    .sort((a, b) => a.sectionNumber - b.sectionNumber);
}

/**
 * 一覧・詳細・採点で表示する問題数の「単一の定義源」。
 * 選択制（数IIBC）は、全大問の総数（一覧で見えていた36など）ではなく、
 * 「必答の小問数」と「選択題数」を分けて表示し、何を数えているかを明確にする。
 */
export interface ExamQuestionSummary {
  /** 大問数（全体） */
  sectionCount: number;
  /** 選択制かどうか */
  isSelective: boolean;
  /** 必答の大問数 */
  requiredSectionCount: number;
  /** 選択候補から選ぶ題数 */
  optionalSelectCount: number;
  /** 必答の小問数 */
  requiredQuestionCount: number;
  /** 全大問の小問総数（選択候補をすべて含む） */
  totalQuestionCount: number;
  /** 一覧・詳細で共通表示する「問題数」ラベル */
  questionCountLabel: string;
  /** 一覧・詳細で共通表示する「大問数」ラベル */
  sectionCountLabel: string;
}

export function getExamQuestionSummary(preset: CommonTestExamPreset): ExamQuestionSummary {
  const questions = getCommonTestExamQuestions(preset.id);
  const sectionCount = preset.sectionIds.length;
  const isSelective =
    !!preset.requiredSectionIds &&
    !!preset.optionalSectionIds &&
    !!preset.optionalSelectCount;
  const requiredSectionCount = preset.requiredSectionIds?.length ?? sectionCount;
  const optionalSelectCount = preset.optionalSelectCount ?? 0;
  const requiredQuestionCount = preset.requiredSectionIds
    ? questions.filter((q) => preset.requiredSectionIds!.includes(q.sectionId)).length
    : questions.length;
  const totalQuestionCount = questions.length;
  const sectionCountLabel = isSelective
    ? `必答${requiredSectionCount}＋選択${optionalSelectCount}大問`
    : `${sectionCount}大問`;
  const questionCountLabel = isSelective
    ? `必答${requiredQuestionCount}問＋選択${optionalSelectCount}題`
    : `${totalQuestionCount}問`;
  return {
    sectionCount,
    isSelective,
    requiredSectionCount,
    optionalSelectCount,
    requiredQuestionCount,
    totalQuestionCount,
    questionCountLabel,
    sectionCountLabel,
  };
}
