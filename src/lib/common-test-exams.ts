// ── 共通テスト EXAM SIMULATOR — 問題取得ユーティリティ ───────────────────

import { COMMON_TEST_DRILL_QUESTIONS } from "@/data/common-test-drills";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import { getCommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";

type ExamFlowPatch = Partial<CommonTestDrillQuestion>;

const COMMON_TEST_EXAM_SECTION_FLOW: Record<string, ExamFlowPatch> = {
  "math-1a:section-1": {
    examContext:
      "第1問は、集合・命題・図形量を短時間で処理する構成です。前半で定義や基本公式を確認し、後半では会話文や日常場面から必要な条件を読み取ります。",
    sharedStem:
      "必要な記号の意味を先に確認し、選択肢を見る前に式や図の骨格を作ってから答えを選びなさい。",
  },
  "math-1a:section-2": {
    examContext:
      "第2問は、二次関数とデータの分析を組み合わせて、式・表・要約値を読み取る力をみます。後半では前半と同じ読み取り手順を使って、判断理由まで確認します。",
    sharedStem:
      "数値をそのまま見るのではなく、平均・散らばり・端点・頂点のどれを使う問題かを見分けなさい。",
    sharedData: {
      title: "資料：小テスト結果の読み取りで注意する量",
      headers: ["量", "見るポイント"],
      rows: [
        ["平均・分散", "偏差を2乗して合計し、データ数で割る"],
        ["四分位範囲", "問題文で指定された四分位数の定義を優先する"],
        ["二次関数の最小値", "頂点が定義域に入るかを最初に確認する"],
      ],
      notes: ["後半の設問では、前の小問で確認した読み取り方を別の資料へ適用する。"],
    },
  },
  "math-1a:section-3": {
    examContext:
      "第3問は、同じ図形設定を描き直しながら、角・比・円の性質を順に確認する構成です。図に分かっている長さや角を追記してから解き進めます。",
    sharedStem:
      "図形問題では、結論を急がず、使える定理の条件がそろっているかを図上で確認しなさい。",
  },
  "math-1a:section-4": {
    examContext:
      "第4問は、場合の数と確率について、全体から不要な場合を除く考え方と、条件が分かった後の状態を作り直す考え方を扱います。",
    sharedStem:
      "少なくとも1つ、戻さない、条件が分かっている、という語に印を付けてから数え上げなさい。",
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
    dependsOnPrevious: true,
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
    subQuestionIndex: 1,
    difficultyStage: "standard",
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
    subQuestionIndex: 2,
    difficultyStage: "guided",
    dependsOnPrevious: true,
  },
  "ct-eng-s8-q4": {
    subQuestionIndex: 1,
    difficultyStage: "standard",
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
    subQuestionIndex: 2,
    difficultyStage: "guided",
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

export function getCommonTestExamQuestions(examId: string): CommonTestDrillQuestion[] {
  const preset = getCommonTestExamPreset(examId);
  if (!preset) return [];
  const questions = COMMON_TEST_DRILL_QUESTIONS.filter(
    (q) =>
      q.subjectId === preset.subjectId &&
      preset.sectionIds.includes(q.sectionId)
  ).sort((a, b) => {
    const sa = parseInt(a.sectionId.replace("section-", ""), 10);
    const sb = parseInt(b.sectionId.replace("section-", ""), 10);
    if (sa !== sb) return sa - sb;
    return a.id.localeCompare(b.id);
  });
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
