import type {
  CommonTestMockExam,
  CommonTestQuestion,
  ExamBlank,
} from "@/data/common-test-mock-exams";

const course = {
  logic: "/courses/math-1a/sets-and-logic",
  measurement: "/courses/math-1a/figures-and-measurement",
  quadratic: "/common-test/lectures/quadratic-case-split-intensive",
  data: "/courses/math-1a/data-analysis",
  geometry: "/courses/math-1a/geometry-properties",
  probability: "/common-test/lectures/probability-guided-reading",
};

function blank(label: string, correctAnswer: string, width = Math.max(3, label.length + 2)): ExamBlank {
  const isInteger = /^-?\d+$/.test(correctAnswer);
  return {
    id: label,
    label,
    type: isInteger ? "integer" : "expression",
    correctAnswer,
    width,
  };
}

function explanation({
  plan,
  work,
  answer,
  mistake,
  shortcut,
  link,
}: {
  plan: string;
  work: string;
  answer: string;
  mistake: string;
  shortcut: string;
  link: string;
}) {
  return `方針: ${plan}\n\n計算過程: ${work}\n\n答え: ${answer}\n\nよくあるミス: ${mistake}\n\n時短ポイント: ${shortcut}\n\n復習リンク: ${link}`;
}

function q(base: Omit<CommonTestQuestion, "measuredAbility" | "timeSavingTip" | "commonMistakes"> & {
  measuredAbility?: string;
  timeSavingTip?: string;
  commonMistakes?: string[];
}): CommonTestQuestion {
  const blanks = base.blanks?.map((item) => ({
    ...item,
    id: `${base.id}-${item.id}`,
  }));
  const answer =
    blanks && typeof base.answer === "object" && !Array.isArray(base.answer)
      ? Object.fromEntries(
          blanks.map((item, index) => [
            item.id,
            (base.answer as Record<string, string>)[base.blanks![index].id],
          ]),
        )
      : base.answer;

  return {
    measuredAbility: base.measuredAbility ?? base.skillTags.join("、"),
    timeSavingTip: base.timeSavingTip ?? "PDFの空欄をまとまりで確認し、先に条件を式へ直してから計算する。",
    commonMistakes: base.commonMistakes ?? ["複数文字の空欄を1文字ずつ分けて扱うこと。"],
    ...base,
    blanks,
    answer,
  };
}

export const COMMON_TEST_MATH_1A_MANUAL_002: CommonTestMockExam = {
  id: "common-test-math-1a-manual-002",
  title: "共通テスト型本番模試 数学I・数学A 手動作成版 第2回",
  subject: "math-1a",
  durationMinutes: 70,
  totalPoints: 100,
  targetAverage: { min: 45, max: 60 },
  pdfUrl: "/mock-exams/math1a/common-test-math-1a-manual-002.pdf",
  source: "manual-pdf",
  status: "published",
  sections: [
    {
      id: "section-1",
      title: "第1問",
      unit: "集合と命題 / 図形と計量",
      points: 30,
      estimatedMinutes: 20,
      theme: "集合の包含、命題、測量、三角比",
      leadText:
        "PDF冊子の第1問を正本とする。〔1〕集合・命題、〔2〕図形と計量・測量からなる。",
      questions: [
        q({
          id: "m1a-manual-002-s1-1-sets",
          prompt:
            "PDF p.1-2 第1問〔1〕 集合・命題。P, Q_a の要素数、包含条件、確率に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [
            blank("ア", "-3"),
            blank("イ", "5"),
            blank("ウ", "9"),
            blank("エ", "6"),
            blank("オカ", "10"),
            blank("キ", "5"),
            blank("ク", "3"),
            blank("ケ", "8"),
          ],
          points: 12,
          difficulty: "standard",
          skillTags: ["集合", "命題", "確率"],
          answer: { "ア": "-3", "イ": "5", "ウ": "9", "エ": "6", "オカ": "10", "キ": "5", "ク": "3", "ケ": "8" },
          shortSolution: "P={-3,-2,-1,0,1,2,3,4,5}。Q_a⊂P となる a は 1,2,3,4,5。",
          explanation: explanation({
            plan: "絶対値不等式で P を決め、Q_a={0,1,...,a} が P に含まれる条件を端点で判定する。",
            work: "|x-1|≦4 より -3≦x≦5 なので P の要素数は 9。a=6 では Q_6={0,1,2,3,4,5,6} だから共通部分は 6 個、和集合は 10 個。Q_a⊂P には a≦5 が必要で、a=1,2,3,4,5 の 5 個。そのうち奇数は 1,3,5 なので確率は 3/8。",
            answer: "ア=-3、イ=5、ウ=9、エ=6、オカ=10、キ=5、ク=3、ケ=8",
            mistake: "Q_a の 0 を数え忘れると、要素数が1つずれる。",
            shortcut: "包含条件は全要素を書き出すより、Q_a の最大値 a が P の右端 5 以下かで見る。",
            link: course.logic,
          }),
          reviewLinks: [course.logic],
        }),
        q({
          id: "m1a-manual-002-s1-2-surveying",
          prompt:
            "PDF p.3-4 第1問〔2〕 測量。塔の高さ、点Cからの仰角、仰角30度以上の範囲に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [
            blank("コサ", "72"),
            blank("シス", "72"),
            blank("セソ", "72"),
            blank("タ", "2"),
            blank("チ", "2"),
            blank("ツ", "2"),
            blank("テト", "72"),
            blank("ナ", "3"),
          ],
          points: 18,
          difficulty: "standard",
          skillTags: ["三角比", "測量", "平面図形"],
          answer: { "コサ": "72", "シス": "72", "セソ": "72", "タ": "2", "チ": "2", "ツ": "2", "テト": "72", "ナ": "3" },
          shortSolution: "tanβ=1 から h=x、h/(x+24)=3/4 から x=h=72。仰角30度以上は半径 72√3 の円内。",
          explanation: explanation({
            plan: "仰角のタンジェントを高さ/水平距離で表し、最後は tan30°=1/√3 を境界にする。",
            work: "tanβ=1 より h/x=1 で h=x。tanα=3/4 より h/(x+24)=3/4。h=x を代入して 4x=3x+72、x=h=72。C については OC=√(72^2+72^2)=72√2、tanθ=72/(72√2)=√2/2。仰角30°以上は h/r≧1/√3、つまり r≦72√3。",
            answer: "コサ=72、シス=72、セソ=72、タ=2、チ=2、ツ=2、テト=72、ナ=3",
            mistake: "点Cの水平距離を BC=72 としてしまうと、OC を使うべき場面を取り違える。",
            shortcut: "45度なら高さと水平距離が等しい、と先に置くと式が一気に短くなる。",
            link: course.measurement,
          }),
          reviewLinks: [course.measurement],
        }),
      ],
    },
    {
      id: "section-2",
      title: "第2問",
      unit: "二次関数 / データの分析",
      points: 30,
      estimatedMinutes: 20,
      theme: "二次関数の最大最小、合成関数、四分位数、外れ値",
      leadText:
        "PDF冊子の第2問を正本とする。〔1〕二次関数、〔2〕データの分析からなる。",
      questions: [
        q({
          id: "m1a-manual-002-s2-1-quadratic",
          prompt:
            "PDF p.5-6 第2問〔1〕 二次関数。頂点、区間0≦x≦4での最大最小、M(a)、f(f(x))に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [
            blank("ア", "a"),
            blank("イ", "-a"),
            blank("ウ", "1"),
            blank("エオ", "-1"),
            blank("カ", "4"),
            blank("キ", "8"),
            blank("ク", "2"),
            blank("ケ", "1"),
            blank("コサ", "-1"),
            blank("シ", "8"),
            blank("スセ", "-1"),
            blank("ソタ", "48"),
            blank("チ", "3"),
          ],
          points: 18,
          difficulty: "hard",
          skillTags: ["二次関数", "最大最小", "合成関数"],
          answer: {
            "ア": "a",
            "イ": "-a",
            "ウ": "1",
            "エオ": "-1",
            "カ": "4",
            "キ": "8",
            "ク": "2",
            "ケ": "1",
            "コサ": "-1",
            "シ": "8",
            "スセ": "-1",
            "ソタ": "48",
            "チ": "3",
          },
          shortSolution: "f(x)=(x-a)^2-a。a=1 では f(x)=x^2-2x、範囲は -1≦f(x)≦8。",
          explanation: explanation({
            plan: "平方完成で頂点を押さえ、最大値は区間の両端 f(0), f(4) を比較する。合成関数は t=f(x) と置く。",
            work: "f(x)=(x-a)^2-a なので頂点は (a,-a)。a=1 では f(x)=x^2-2x=(x-1)^2-1 だから 0≦x≦4 で最小値 -1、最大値 8。M(a) は f(0)=a^2-a と f(4)=a^2-9a+16 の比較で、境目は a=2、したがって選択肢1。t=f(x) は -1≦t≦8 を動き、f(t)=t^2-2t は t=1 で最小 -1、端 t=8 で最大 48。f(f(x))=0 は f(x)=0,2 を解き、x=0,2,1+√3 の 3 個。",
            answer: "ア=a、イ=-a、ウ=1、エオ=-1、カ=4、キ=8、ク=2、ケ=1、コサ=-1、シ=8、スセ=-1、ソタ=48、チ=3",
            mistake: "M(a) で頂点の値を最大値として使うと誤る。最大値は上に開く放物線なので端点比較。",
            shortcut: "合成関数は x を直接代入展開せず、まず t=f(x) の範囲を作る。",
            link: course.quadratic,
          }),
          reviewLinks: [course.quadratic],
        }),
        q({
          id: "m1a-manual-002-s2-2-data",
          prompt:
            "PDF p.6-7 第2問〔2〕 データの分析。四分位数、外れ値、外れ値除去後の平均値・中央値に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [
            blank("ツテ", "22"),
            blank("トナ", "20"),
            blank("ニヌ", "24"),
            blank("ネ", "2"),
            blank("ノ", "4"),
            blank("ハ", "2"),
            blank("ヒフ", "31"),
            blank("ヘ", "4"),
            blank("ホ", "2"),
            blank("マミ", "21"),
            blank("ム", "4"),
            blank("メモ", "21"),
            blank("ヤ", "5"),
            blank("ユ", "0"),
          ],
          points: 12,
          difficulty: "standard",
          skillTags: ["データの分析", "四分位数", "外れ値"],
          answer: {
            "ツテ": "22",
            "トナ": "20",
            "ニヌ": "24",
            "ネ": "2",
            "ノ": "4",
            "ハ": "2",
            "ヒフ": "31",
            "ヘ": "4",
            "ホ": "2",
            "マミ": "21",
            "ム": "4",
            "メモ": "21",
            "ヤ": "5",
            "ユ": "0",
          },
          shortSolution: "中央値22、Q1=20、Q3=24.5、IQR=4.5。上側境界31.25なので外れ値は35,36。",
          explanation: explanation({
            plan: "12個なので中央値は6番目と7番目の平均、四分位数は下位6個・上位6個それぞれの中央値で取る。",
            work: "データは 18,19,20,20,21,22,22,23,24,25,35,36。中央値は (22+22)/2=22。下位6個の中央値は (20+20)/2=20、上位6個の中央値は (24+25)/2=24.5。IQR=4.5、上側境界は 24.5+1.5×4.5=31.25。外れ値は35,36。除去後10個の平均は214/10=21.4、中央値は (21+22)/2=21.5。除去前より平均値も中央値も小さくなる。",
            answer: "ツテ=22、トナ=20、ニヌ=24、ネ=2、ノ=4、ハ=2、ヒフ=31、ヘ=4、ホ=2、マミ=21、ム=4、メモ=21、ヤ=5、ユ=0",
            mistake: "12個全体を4等分する位置だけで四分位数を取ると、Q1,Q3 がずれやすい。",
            shortcut: "偶数個の四分位数は、まず下位半分・上位半分に分けてから各中央値を出す。",
            link: course.data,
          }),
          reviewLinks: [course.data],
        }),
      ],
    },
    {
      id: "section-3",
      title: "第3問",
      unit: "図形の性質",
      points: 20,
      estimatedMinutes: 15,
      theme: "接線の長さ、方べきの定理、球の断面円",
      leadText:
        "PDF冊子の第3問を正本とする。円の接線、方べきの定理、球の断面を平面上の円として扱う考え方を問う。",
      questions: [
        q({
          id: "m1a-manual-002-s3-power-circle",
          prompt:
            "PDF p.8 第3問(1)(2)。円外の点からの接線の長さと、接線と割線の関係に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [blank("ア", "8"), blank("イウ", "16")],
          points: 8,
          difficulty: "standard",
          skillTags: ["三平方の定理", "方べきの定理"],
          answer: { "ア": "8", "イウ": "16" },
          shortSolution: "PA=√(10^2-6^2)=8。PB・PC=PA^2 より PC=16。",
          explanation: explanation({
            plan: "半径と接線は垂直なので直角三角形を作り、次に方べきの定理を使う。",
            work: "OA⊥PA だから PA=√(10^2-6^2)=√64=8。接線と割線の関係より PB・PC=PA^2。PB=4 なので 4PC=64、PC=16。",
            answer: "ア=8、イウ=16",
            mistake: "PC を円内の弦の長さとして扱うと、Pから遠い交点までの長さであることを忘れやすい。",
            shortcut: "接線が出たら、まず半径との直角と方べきの2つを候補にする。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
        }),
        q({
          id: "m1a-manual-002-s3-sphere-section",
          prompt:
            "PDF p.8-10 第3問(3)。球の半径と断面円の半径から、中心から平面までの距離に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [blank("エ", "2"), blank("オ", "5")],
          points: 4,
          difficulty: "standard",
          skillTags: ["球", "断面円", "三平方の定理"],
          answer: { "エ": "2", "オ": "5" },
          shortSolution: "OO'=√(6^2-4^2)=√20=2√5。",
          explanation: explanation({
            plan: "球の中心、断面円の中心、断面円上の点で直角三角形を作る。",
            work: "球の半径は6、断面円の半径は4。OO'^2+4^2=6^2 なので OO'=√(36-16)=√20=2√5。",
            answer: "エ=2、オ=5",
            mistake: "断面円の半径4を球の中心から平面までの距離と取り違えない。",
            shortcut: "球の断面は、中心から平面へ垂線を下ろすと必ず直角三角形になる。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
        }),
        q({
          id: "m1a-manual-002-s3-plane-circle",
          prompt:
            "PDF p.10 第3問(4)(5)。断面円上の接線、方べき、球の断面の扱いに対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [blank("カ", "3"), blank("キ", "9"), blank("ク", "1")],
          points: 8,
          difficulty: "standard",
          skillTags: ["接線", "方べきの定理", "空間図形"],
          answer: { "カ": "3", "キ": "9", "ク": "1" },
          shortSolution: "QD=√(5^2-4^2)=3。QE・QF=QD^2 で QF=9。正しい記述は1。",
          explanation: explanation({
            plan: "球の断面円を平面上の普通の円として見直し、接線と方べきをそのまま使う。",
            work: "QO'=5、半径4より QD=√(5^2-4^2)=3。方べきの定理から QE・QF=QD^2。QE=1 なので QF=9。球の切り口の円では、平面上の円の性質をそのまま用いることができるので選択肢1。",
            answer: "カ=3、キ=9、ク=1",
            mistake: "空間図形だからといって、断面平面内の円の定理を使えないと思い込まない。",
            shortcut: "問題を平面β上だけに落とせたら、以後は通常の円の問題として処理する。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
        }),
      ],
    },
    {
      id: "section-4",
      title: "第4問",
      unit: "場合の数と確率",
      points: 20,
      estimatedMinutes: 15,
      theme: "順列、余事象、条件付き確率、和事象",
      leadText:
        "PDF冊子の第4問を正本とする。6席に4人が座る場合の数と条件付き確率を扱う。",
      questions: [
        q({
          id: "m1a-manual-002-s4-counting",
          prompt:
            "PDF p.11-12 第4問(1)〜(4)。全座り方、事象A、事象B、A∩B の場合の数に対応する空欄を入力する。",
          answerFormat: "blank",
          blanks: [
            blank("アイウ", "360"),
            blank("エオカ", "120"),
            blank("キクケ", "216"),
            blank("コサ", "48"),
          ],
          points: 12,
          difficulty: "standard",
          skillTags: ["順列", "余事象", "積事象"],
          answer: { "アイウ": "360", "エオカ": "120", "キクケ": "216", "コサ": "48" },
          shortSolution: "全体は 6P4=360。A=120、B=216、A∩B=48。",
          explanation: explanation({
            plan: "全体は席を選んで人を並べる順列。B は余事象で数え、A∩B は端の隣接ペアだけを数える。",
            work: "全座り方は 6P4=360。A は隣り合う2席の選び方5通り、太郎・花子の順序2通り、残り2人の座り方4P2=12通りなので 5×2×12=120。B が起こらないのは太郎・花子がともに席2,3,4,5に座る場合で、4P2×4P2=144。よって B=360-144=216。A∩B は席1,2 または席5,6に太郎・花子が座るので 2×2×4P2=48。",
            answer: "アイウ=360、エオカ=120、キクケ=216、コサ=48",
            mistake: "B を直接数えようとして、席1と席6の両方に関わる重複を二重に数える。",
            shortcut: "「少なくとも一方」は余事象で数えると重複処理が不要になる。",
            link: course.probability,
          }),
          reviewLinks: [course.probability],
        }),
        q({
          id: "m1a-manual-002-s4-probabilities",
          prompt:
            "PDF p.12 第4問(5)(6)。条件付き確率、和事象、Aが起こらなかった条件でのBに対応する分数空欄を入力する。",
          answerFormat: "blank",
          blanks: [
            blank("シ", "2"),
            blank("ス", "5"),
            blank("セ", "2"),
            blank("ソ", "9"),
            blank("タ", "4"),
            blank("チ", "5"),
            blank("ツ", "7"),
            blank("テト", "10"),
          ],
          points: 8,
          difficulty: "standard",
          skillTags: ["条件付き確率", "和事象", "余事象"],
          answer: { "シ": "2", "ス": "5", "セ": "2", "ソ": "9", "タ": "4", "チ": "5", "ツ": "7", "テト": "10" },
          shortSolution: "P(B|A)=48/120=2/5、P(A|B)=48/216=2/9、P(A∪B)=4/5、P(B|A^c)=7/10。",
          explanation: explanation({
            plan: "前問で数えた A, B, A∩B を分母・分子に正しく入れ、最後は A^c の中で B が起こる数を使う。",
            work: "P(B|A)=|A∩B|/|A|=48/120=2/5。P(A|B)=|A∩B|/|B|=48/216=2/9。P(A∪B)=(120+216-48)/360=288/360=4/5。A^c は 360-120=240 通りで、そのうち B は 216-48=168 通り。よって P(B|A^c)=168/240=7/10。",
            answer: "シ=2、ス=5、セ=2、ソ=9、タ=4、チ=5、ツ=7、テト=10",
            mistake: "P(B|A) と P(A|B) は分母が違う。条件の後ろにある事象が分母になる。",
            shortcut: "条件付き確率は、まず「条件で母集団を絞る」と言葉で確認してから分数を書く。",
            link: course.probability,
          }),
          reviewLinks: [course.probability],
        }),
      ],
    },
  ],
};
