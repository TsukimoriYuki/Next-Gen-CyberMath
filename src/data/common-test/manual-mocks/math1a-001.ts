import type {
  CommonTestMockExam,
  CommonTestQuestion,
  ExamBlank,
  ExamChoice,
} from "@/data/common-test-mock-exams";

const course = {
  numbers: "/courses/math-1a/numbers-and-expressions",
  measurement: "/courses/math-1a/figures-and-measurement",
  quadratic: "/courses/math-1a/quadratic",
  data: "/courses/math-1a/data-analysis",
  geometry: "/courses/math-1a/geometry-properties",
  probability: "/courses/math-1a/counting-probability",
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

function choices(items: { text: string; correct?: boolean; trap?: string }[]): ExamChoice[] {
  return items.map((item, index) => ({
    id: String(index),
    label: String(index),
    text: item.text,
    isCorrect: item.correct,
    trap: item.trap,
  }));
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
    timeSavingTip: base.timeSavingTip ?? "先に条件を式へ移し、必要な値だけを計算する。",
    commonMistakes: base.commonMistakes ?? ["空欄を1桁ずつではなく、指定されたまとまりで扱うことを忘れる"],
    ...base,
    blanks,
    answer,
  };
}

export const COMMON_TEST_MATH_1A_MANUAL_001: CommonTestMockExam = {
  id: "common-test-math-1a-manual-001",
  title: "共通テスト型本番模試 数学I・数学A 手動作成版 第1回",
  subject: "math-1a",
  durationMinutes: 70,
  totalPoints: 100,
  targetAverage: { min: 45, max: 60 },
  source: "manual-pdf",
  status: "published",
  sections: [
    {
      id: "section-1",
      title: "第1問",
      unit: "数と式 / 図形と計量",
      points: 30,
      estimatedMinutes: 20,
      theme: "有理化、漸化式、三角比、余弦定理",
      leadText: "数学I，数学A。全問必答。第1問は〔1〕数と式、〔2〕図形と計量からなる。（配点30）",
      assets: [
        {
          type: "diagram",
          id: "tower-elevation",
          title: "図1 タワーの仰角",
          variant: "tower-elevation",
          alt: "地面上に A, B, T がこの順に並び、AB=60m。Tの真上に頂上Pがあり、AからPへの仰角は30度、BからPへの仰角は45度。",
          note: "PDFの図1を、ラベルと角度が読み取れるようにSVGで再現しています。",
        },
      ],
      questions: [
        q({
          id: "m1a-manual-001-s1-1-rationalize",
          prompt:
            "〔1〕次の数と式について考えよう。$a=\\dfrac{1}{2-\\sqrt{3}},\\ b=\\dfrac{1}{2+\\sqrt{3}}$ とする。\n\n(1) 分母を有理化すると $a=[ア]+\\sqrt{[イ]},\\ b=[ア]-\\sqrt{[イ]}$ である。したがって $a+b=[ウ],\\ ab=[エ]$ である。",
          answerFormat: "blank",
          blanks: [blank("ア", "2"), blank("イ", "3"), blank("ウ", "4"), blank("エ", "1")],
          points: 6,
          difficulty: "basic",
          skillTags: ["有理化", "平方根", "対称式"],
          answer: { ア: "2", イ: "3", ウ: "4", エ: "1" },
          shortSolution: "$a=2+\\sqrt3,\\ b=2-\\sqrt3$ なので $a+b=4,\\ ab=1$。",
          explanation: explanation({
            plan: "分母の共役をかけて有理化し、和と積をまとめて求める。",
            work: "$a=(2+\\sqrt3)/(4-3)=2+\\sqrt3$, $b=(2-\\sqrt3)/(4-3)=2-\\sqrt3$。よって和は $4$、積は $(2+\\sqrt3)(2-\\sqrt3)=1$。",
            answer: "ア=2、イ=3、ウ=4、エ=1",
            mistake: "$2\\pm\\sqrt3$ の符号を取り違えると、以後の漸化式も崩れる。",
            shortcut: "共役の積 $4-3=1$ を見れば、分子がそのまま答えになる。",
            link: course.numbers,
          }),
          reviewLinks: [course.numbers],
        }),
        q({
          id: "m1a-manual-001-s1-1-recurrence",
          prompt:
            "(2) 自然数 $n$ に対して $S_n=a^n+b^n$ とおく。$S_0=2,\\ S_1=[ウ]$ である。また、$a,b$ はともに $x^2-[ウ]x+[エ]=0$ の解であるから、$n\\geqq0$ に対して $S_{n+2}=[オ]S_{n+1}-[カ]S_n$ が成り立つ。このことを用いると $S_3=[キク],\\ S_7=[ケコサシス]$ である。",
          answerFormat: "blank",
          blanks: [blank("オ", "4"), blank("カ", "1"), blank("キク", "52"), blank("ケコサシス", "10084", 7)],
          points: 8,
          difficulty: "standard",
          skillTags: ["漸化式", "対称式", "累乗"],
          answer: { オ: "4", カ: "1", キク: "52", ケコサシス: "10084" },
          shortSolution: "$a,b$ は $x^2-4x+1=0$ の解なので $S_{n+2}=4S_{n+1}-S_n$。",
          explanation: explanation({
            plan: "$a,b$ が同じ2次方程式の解であることから、両辺に累乗を掛けて足す。",
            work: "$a^2=4a-1$, $b^2=4b-1$。これに $a^n,b^n$ を掛けて足すと $S_{n+2}=4S_{n+1}-S_n$。$S_0=2,S_1=4$ より $S_2=14,S_3=52,S_4=194,S_5=724,S_6=2702,S_7=10084$。",
            answer: "オ=4、カ=1、キク=52、ケコサシス=10084",
            mistake: "$S_{n+2}=4S_{n+1}+S_n$ と符号を逆にしない。定数項が $+1$ なので引く形になる。",
            shortcut: "まず $S_0,S_1$ を置き、表で $S_2$ から順に1行ずつ進めると速い。",
            link: course.numbers,
          }),
          reviewLinks: [course.numbers],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s1-1-integer-part",
          prompt:
            "(3) $0<b<1$ であることに注意すると、$a^7$ の整数部分は [セソタチツ] である。",
          answerFormat: "blank",
          blanks: [blank("セソタチツ", "10083", 7)],
          points: 4,
          difficulty: "standard",
          skillTags: ["整数部分", "小数部分", "累乗"],
          answer: { セソタチツ: "10083" },
          shortSolution: "$S_7=a^7+b^7=10084$ かつ $0<b^7<1$ なので $10083<a^7<10084$。",
          explanation: explanation({
            plan: "$S_7=a^7+b^7$ と $0<b^7<1$ を使って $a^7$ をはさむ。",
            work: "$a^7=10084-b^7$。$0<b<1$ だから $0<b^7<1$ であり、$10083<a^7<10084$。したがって整数部分は $10083$。",
            answer: "セソタチツ=10083",
            mistake: "$S_7$ そのものを整数部分にしない。$b^7$ を引くので1つ小さくなる。",
            shortcut: "小さい正の数を引く形なら、整数部分は合計値から1を引く。",
            link: course.numbers,
          }),
          reviewLinks: [course.numbers],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s1-1-decimal-part",
          prompt:
            "また、$a^7$ の小数部分を $d$ とすると、$d=[テ]-b^7$ と表される。[テ] の解答群から正しいものを選べ。\n\n0: 0　1: 1　2: 2　3: 3",
          answerFormat: "choice",
          choices: choices([{ text: "0" }, { text: "1", correct: true }, { text: "2" }, { text: "3" }]),
          points: 3,
          difficulty: "trap",
          skillTags: ["小数部分", "選択肢", "累乗"],
          answer: "1",
          shortSolution: "$a^7=10083+(1-b^7)$ なので $d=1-b^7$。",
          explanation: explanation({
            plan: "$a^7$ を「整数部分 + 小数部分」の形に直す。",
            work: "$a^7=10084-b^7=10083+(1-b^7)$。$0<b^7<1$ より $1-b^7$ が小数部分。",
            answer: "テ=1",
            mistake: "小数部分を $-b^7$ としない。必ず $0$ 以上 $1$ 未満の形にする。",
            shortcut: "$N-b^7=(N-1)+(1-b^7)$ と1を借りる。",
            link: course.numbers,
          }),
          reviewLinks: [course.numbers],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s1-2-tower-first",
          prompt:
            "〔2〕海辺に立つタワーの高さを、離れた二つの地点から観測して求める。タワーの真下の点を $T$、頂上を $P$ とする。ただし、地面は水平で、$PT$ は地面に垂直であるとする。\n\nまず、地点 $A,B$ は $A,B,T$ の順に一直線上にあり、$AB=60$ mである。地点 $A$ から頂上 $P$ を見上げる角は $30^\\circ$、地点 $B$ から頂上 $P$ を見上げる角は $45^\\circ$ であった。\n\n$BT=x$ m とすると、$PT=x$ m であり、また $AT=[ト]x$ mである。したがって $60=([ト]-[ナ])x$ であるから、$PT=[ニヌ](\\sqrt{[ネ]}+[ノ])$ m である。ただし、必要ならば $\\tan30^\\circ=\\dfrac{1}{\\sqrt3}$ を用いてよい。",
          answerFormat: "blank",
          blanks: [blank("ト", "√3"), blank("ナ", "1"), blank("ニヌ", "30"), blank("ネ", "3"), blank("ノ", "1")],
          points: 5,
          difficulty: "standard",
          skillTags: ["三角比", "仰角", "有理化"],
          answer: { ト: "√3", ナ: "1", ニヌ: "30", ネ: "3", ノ: "1" },
          shortSolution: "$BT=PT=x$, $AT=\\sqrt3x$ なので $60=(\\sqrt3-1)x$。",
          explanation: explanation({
            plan: "45度で $BT=PT$、30度で $PT/AT=1/\\sqrt3$ と読む。",
            work: "$BT=x$ なら $PT=x$。また $\\tan30^\\circ=PT/AT=1/\\sqrt3$ だから $AT=\\sqrt3x$。$AB=AT-BT=(\\sqrt3-1)x=60$ より $x=60/(\\sqrt3-1)=30(\\sqrt3+1)$。",
            answer: "ト=√3、ナ=1、ニヌ=30、ネ=3、ノ=1",
            mistake: "$AT=BT+60$ と図の順序を見落とすと式が逆になる。",
            shortcut: "45度の直角三角形は二辺が等しいので、まず $BT=PT$ と置く。",
            link: course.measurement,
          }),
          reviewLinks: [course.measurement],
        }),
        q({
          id: "m1a-manual-001-s1-2-tower-cosine",
          prompt:
            "次に、地点 $A,B$ がタワーの真下 $T$ から見て一直線上にはない場合を考える。いま、$\\angle ATB=60^\\circ$、地点 $A$ からの仰角が $30^\\circ$、地点 $B$ からの仰角が $45^\\circ$ であり、$AB=10\\sqrt{4-\\sqrt3}$ m であった。このとき、タワーの高さを $h$ m とすると $AT=\\sqrt3h,\\ BT=h$ である。三角形 $ATB$ に余弦定理を用いると $AB^2=[ハ]h^2-[ヒ]\\sqrt3h^2$ であるから、$h=[フヘ]$ m である。\n\n[ハ, ヒ] の解答群: 0:1  1:2  2:3  3:4  4:5  5:6",
          answerFormat: "blank",
          blanks: [blank("ハ", "4"), blank("ヒ", "1"), blank("フヘ", "10")],
          points: 4,
          difficulty: "hard",
          skillTags: ["余弦定理", "三角比", "図形と計量"],
          answer: { ハ: "4", ヒ: "1", フヘ: "10" },
          shortSolution: "$AB^2=3h^2+h^2-2\\sqrt3h^2\\cos60^\\circ=(4-\\sqrt3)h^2$。",
          explanation: explanation({
            plan: "仰角から $AT,BT$ を $h$ で表し、三角形 $ATB$ に余弦定理を使う。",
            work: "$AT=\\sqrt3h$, $BT=h$, $\\angle ATB=60^\\circ$。したがって $AB^2=3h^2+h^2-2\\sqrt3h^2\\cdot1/2=(4-\\sqrt3)h^2$。一方 $AB^2=100(4-\\sqrt3)$ なので $h=10$。",
            answer: "ハ=4、ヒ=1、フヘ=10",
            mistake: "余弦定理の $-2ab\\cos C$ の2と $\\cos60^\\circ=1/2$ が打ち消し合う点を落としやすい。",
            shortcut: "$AB$ に同じ因数 $4-\\sqrt3$ が出るように計算を整理する。",
            link: course.measurement,
          }),
          reviewLinks: [course.measurement],
          dependsOnPrevious: true,
        }),
      ],
    },
    {
      id: "section-2",
      title: "第2問",
      unit: "二次関数 / データの分析",
      points: 30,
      estimatedMinutes: 20,
      theme: "定義域つき二次関数、合成関数、四分位数、外れ値",
      leadText: "第2問は〔1〕二次関数の最大値・最小値、〔2〕データの分析からなる。（配点30）",
      assets: [
        {
          type: "conversation",
          id: "quadratic-dialogue",
          title: "会話",
          lines: [
            { speaker: "太郎", text: "$f(f(x))$ を全部展開すると、4次式になるから大変そうだね。" },
            { speaker: "花子", text: "でも、$f(x)$ の値の範囲を先に調べれば、もう一度同じ二次関数の最大値・最小値として考えられるよ。" },
          ],
        },
        {
          type: "conversation",
          id: "data-dialogue",
          title: "会話",
          lines: [
            { speaker: "太郎", text: "平均値を見ると、解くのにかかった時間はかなり長いように感じるね。" },
            { speaker: "花子", text: "でも、外れ値が含まれているから、中央値や四分位数も見た方がよさそうだね。" },
          ],
        },
      ],
      questions: [
        q({
          id: "m1a-manual-001-s2-1-vertex",
          prompt:
            "〔1〕二次関数の最大値，最小値について考えよう。実数 $a$ に対して $f(x)=x^2-2ax+a^2+1$ とする。\n\n(1) $y=f(x)$ のグラフの頂点の座標は $([ア],[イ])$ である。",
          answerFormat: "blank",
          blanks: [blank("ア", "a"), blank("イ", "1")],
          points: 4,
          difficulty: "basic",
          skillTags: ["平方完成", "二次関数", "頂点"],
          answer: { ア: "a", イ: "1" },
          shortSolution: "$f(x)=(x-a)^2+1$。",
          explanation: explanation({
            plan: "平方完成して頂点を読む。",
            work: "$x^2-2ax+a^2+1=(x-a)^2+1$ なので、頂点は $(a,1)$。",
            answer: "ア=a、イ=1",
            mistake: "頂点の $x$ 座標を $-a$ としない。$(x-a)^2$ の形を読む。",
            shortcut: "$x^2-2ax+a^2$ はすでに $(x-a)^2$。",
            link: course.quadratic,
          }),
          reviewLinks: [course.quadratic],
        }),
        q({
          id: "m1a-manual-001-s2-1-composite",
          prompt:
            "(2) ここからしばらく $a=2$ とする。このとき $f(x)=(x-2)^2+1$ であり、$0≦x≦4$ における $f(x)$ の最小値は [ウ]、最大値は [エ] である。\n\n$0≦x≦4$ のとき、$f(x)$ の値の範囲は $[ウ]≦f(x)≦[エ]$ である。そこで $t=f(x)$ とおくと、$f(f(x))=f(t)$ であり、$t$ は $[ウ]≦t≦[エ]$ を動く。したがって $0≦x≦4$ における $f(f(x))$ の最小値は [オ]、最大値は [カキ] である。",
          answerFormat: "blank",
          blanks: [blank("ウ", "1"), blank("エ", "5"), blank("オ", "1"), blank("カキ", "10")],
          points: 8,
          difficulty: "standard",
          skillTags: ["二次関数", "値域", "合成関数"],
          answer: { ウ: "1", エ: "5", オ: "1", カキ: "10" },
          shortSolution: "$f(x)$ の値域は $1≦t≦5$。$f(t)=(t-2)^2+1$ の最小は1、最大は10。",
          explanation: explanation({
            plan: "合成関数を展開せず、内側 $f(x)$ の値域を新しい変数 $t$ の範囲にする。",
            work: "$0≦x≦4$ では頂点 $x=2$ が含まれるので最小値は1、端点で最大値5。$t=f(x)$ とすると $1≦t≦5$。$f(t)=(t-2)^2+1$ は $t=2$ で最小1、端点 $t=5$ で最大10。",
            answer: "ウ=1、エ=5、オ=1、カキ=10",
            mistake: "$f(f(x))$ を4次式に展開して範囲の制約を見失うこと。",
            shortcut: "内側の値域を先に出すと、同じ二次関数をもう一度見るだけで済む。",
            link: course.quadratic,
          }),
          reviewLinks: [course.quadratic],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s2-1-parameter",
          prompt:
            "(3) 次に、$a$ を変化させる。$0≦x≦4$ における $f(x)$ の最小値を $m(a)$ とする。$m(a)$ について正しいものを、次の0から5のうちから一つ選ぶと、[ク] である。\n\n0: すべての $a$ で $m(a)=1$ である。\n1: $0≦a≦4$ のとき $m(a)=1$ である。\n2: $a<0$ のとき $m(a)=f(4)$ である。\n3: $a>4$ のとき $m(a)=f(0)$ である。\n4: $0≦a≦4$ のとき $m(a)=a^2+1$ である。\n5: $a<0$ または $a>4$ のとき $m(a)=1$ である。",
          answerFormat: "choice",
          choices: choices([
            { text: "すべての $a$ で $m(a)=1$ である。" },
            { text: "$0≦a≦4$ のとき $m(a)=1$ である。", correct: true },
            { text: "$a<0$ のとき $m(a)=f(4)$ である。" },
            { text: "$a>4$ のとき $m(a)=f(0)$ である。" },
            { text: "$0≦a≦4$ のとき $m(a)=a^2+1$ である。" },
            { text: "$a<0$ または $a>4$ のとき $m(a)=1$ である。" },
          ]),
          points: 4,
          difficulty: "trap",
          skillTags: ["二次関数", "場合分け", "最小値"],
          answer: "1",
          shortSolution: "頂点 $x=a$ が区間 $0≦x≦4$ に入るときだけ最小値は1。",
          explanation: explanation({
            plan: "頂点 $x=a$ が定義域に入るかどうかで場合分けする。",
            work: "$f(x)=(x-a)^2+1$。$0≦a≦4$ なら頂点が区間内にあり $m(a)=1$。$a<0$ なら最も近い端点 $x=0$、$a>4$ なら最も近い端点 $x=4$ で最小。",
            answer: "ク=1",
            mistake: "区間外の頂点をそのまま使わない。定義域の端点を見る。",
            shortcut: "上に開く放物線は、頂点に最も近い区間内の点で最小。",
            link: course.quadratic,
          }),
          reviewLinks: [course.quadratic],
        }),
        q({
          id: "m1a-manual-001-s2-2-quartiles",
          prompt:
            "〔2〕次のデータは、あるクラスの11人が小テストを解くのにかかった時間を、秒単位で小さい順に並べたものである。\n\n$12,15,17,18,20,22,23,24,25,28,40$\n\n以下の問題では、外れ値を次の基準で判断する。第1四分位数 $Q_1$、第3四分位数 $Q_3$、四分位範囲 $IQR=Q_3-Q_1$ に対して、$Q_1-1.5IQR$ 以下の値、$Q_3+1.5IQR$ 以上の値を外れ値とする。\n\nこのデータの中央値は [ケコ]、第1四分位数は [サシ]、第3四分位数は [スセ] である。したがって、四分位範囲は [ソ] であり、外れ値と判断される値は [タチ] である。",
          answerFormat: "blank",
          blanks: [blank("ケコ", "22"), blank("サシ", "17"), blank("スセ", "25"), blank("ソ", "8"), blank("タチ", "40")],
          points: 7,
          difficulty: "standard",
          skillTags: ["中央値", "四分位数", "外れ値"],
          answer: { ケコ: "22", サシ: "17", スセ: "25", ソ: "8", タチ: "40" },
          shortSolution: "中央値22、下半分の中央値17、上半分の中央値25。上側基準は37なので40は外れ値。",
          explanation: explanation({
            plan: "11個の中央値を取り、中央値を除いた下5個・上5個から四分位数を取る。",
            work: "6番目が22。下側 $12,15,17,18,20$ の中央値が17、上側 $23,24,25,28,40$ の中央値が25。$IQR=8$。上側基準は $25+1.5\\times8=37$ なので、40は「以上」に入り外れ値。",
            answer: "ケコ=22、サシ=17、スセ=25、ソ=8、タチ=40",
            mistake: "中央値22を上下の組に含めない。基準は「以下」「以上」である点にも注意する。",
            shortcut: "個数が奇数なら、中央を外して左右同数にしてから四分位数を取る。",
            link: course.data,
          }),
          reviewLinks: [course.data],
        }),
        q({
          id: "m1a-manual-001-s2-2-outlier-change",
          prompt:
            "このデータについて、太郎さんと花子さんは次のように話している。\n\n太郎: 平均値を見ると、解くのにかかった時間はかなり長いように感じるね。\n花子: でも、外れ値が含まれているから、中央値や四分位数も見た方がよさそうだね。\n\nこのデータから外れ値を除くと、残り10個のデータの中央値は [ツテ] である。また、外れ値を除いたときの平均値は、除く前の平均値と比べて [ト]。\n\n[ト] の解答群: 0: 大きくなる　1: 小さくなる　2: 変わらない\n\nさらに、この11個のデータに新しい値 $x$ を1個加える。ただし、$x$ は $28<x<40$ を満たす整数とする。このとき、もとの外れ値40が外れ値ではなくなるような $x$ の値の個数は [ナ] 個である。",
          answerFormat: "blank",
          blanks: [blank("ツテ", "21"), blank("ト", "1"), blank("ナ", "0")],
          points: 7,
          difficulty: "hard",
          skillTags: ["外れ値", "平均値", "四分位範囲"],
          answer: { ツテ: "21", ト: "1", ナ: "0" },
          shortSolution: "40を除くと中央値は $(20+22)/2=21$、平均は小さくなる。$28<x<40$ を加えても40は外れ値のまま。",
          explanation: explanation({
            plan: "外れ値を除いた10個の中央値と平均を確認し、追加後は12個データの四分位数を取り直す。",
            work: "40を除くと $12,15,17,18,20,22,23,24,25,28$ で中央値は $(20+22)/2=21$。大きい40を除くので平均は小さくなる。整数 $x$ は29から39。追加後の上半分は $23,24,25,28,x,40$ となり、$Q_3=(25+28)/2=26.5$。下半分は $12,15,17,18,20,22$ で $Q_1=(17+18)/2=17.5$。$IQR=9$ だから上側基準は $26.5+13.5=40$。基準は「以上」なので40はなお外れ値。したがって個数は0。",
            answer: "ツテ=21、ト=1、ナ=0",
            mistake: "40が基準値ちょうどのとき外れ値ではない、と読んでしまうこと。PDFの基準は「以上」なので40も外れ値。",
            shortcut: "$x$ の位置は常に28と40の間なので、四分位数が実は $x$ に依存しないと見抜く。",
            link: course.data,
          }),
          reviewLinks: [course.data],
          dependsOnPrevious: true,
        }),
      ],
    },
    {
      id: "section-3",
      title: "第3問",
      unit: "図形の性質",
      points: 20,
      estimatedMinutes: 14,
      theme: "球の断面円、接線の長さ、方べきの定理",
      leadText: "空間内の球を平面で切ったときにできる円について考えよう。（配点20）",
      assets: [
        {
          type: "diagram",
          id: "sphere-plane",
          title: "参考図 球と平面の断面",
          variant: "sphere-plane",
          alt: "半径13の球の中心Oから距離5の平面αで切った断面円。断面円の中心をC、半径をrとする。",
        },
        {
          type: "diagram",
          id: "circle-tangent",
          title: "図1 円と接線",
          variant: "circle-tangent",
          alt: "円Γの中心C、外部の点P、接点T。CTはPTに垂直で、PC=20。",
        },
      ],
      questions: [
        q({
          id: "m1a-manual-001-s3-radius",
          prompt:
            "半径13の球 $S$ の中心を $O$ とする。点 $O$ から距離5の平面 $\\alpha$ で球 $S$ を切ると、切り口は円になる。この円の中心を $C$、半径を $r$ とする。\n\n三平方の定理より $r^2=13^2-5^2$ であるから、$r=[アイ]$ である。",
          answerFormat: "blank",
          blanks: [blank("アイ", "12")],
          points: 5,
          difficulty: "basic",
          skillTags: ["三平方の定理", "球の断面", "円"],
          answer: { アイ: "12" },
          shortSolution: "$r^2=169-25=144$。",
          explanation: explanation({
            plan: "球の中心、断面円の中心、断面円上の点で直角三角形を作る。",
            work: "球の半径は13、中心から平面までの距離は5。断面円の半径を $r$ とすると $r^2+5^2=13^2$。よって $r=12$。",
            answer: "アイ=12",
            mistake: "断面円の半径を球の半径13としない。",
            shortcut: "$5,12,13$ の直角三角形を思い出す。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
        }),
        q({
          id: "m1a-manual-001-s3-tangent",
          prompt:
            "この切り口の円を $\\Gamma$ とする。平面 $\\alpha$ 上に点 $P$ をとり、$PC=20$ とする。点 $P$ から円 $\\Gamma$ に引いた接線の接点を $T$ とすると、$CT\\perp PT$ であるから $PT=[ウエ]$ である。",
          answerFormat: "blank",
          blanks: [blank("ウエ", "16")],
          points: 4,
          difficulty: "standard",
          skillTags: ["接線", "三平方の定理", "円"],
          answer: { ウエ: "16" },
          shortSolution: "$PT^2=20^2-12^2=256$。",
          explanation: explanation({
            plan: "半径と接線は接点で垂直なので、直角三角形 $CPT$ を使う。",
            work: "$CT=12$, $PC=20$。$PT^2=PC^2-CT^2=400-144=256$ より $PT=16$。",
            answer: "ウエ=16",
            mistake: "$PC$ を直径のように扱わない。斜辺は $PC$。",
            shortcut: "$12,16,20$ は $3,4,5$ の4倍。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s3-power",
          prompt:
            "次に、点 $P$ を通る直線が円 $\\Gamma$ と2点 $A,B$ で交わっているとする。ただし、点は $P,A,B$ の順に並び、$PA=8$ である。\n\n方べきの定理を用いると $PT^2=PA\\cdot PB$ であるから、$PB=[オカ]$ である。",
          answerFormat: "blank",
          blanks: [blank("オカ", "32")],
          points: 4,
          difficulty: "standard",
          skillTags: ["方べきの定理", "接線", "円"],
          answer: { オカ: "32" },
          shortSolution: "$16^2=8\\cdot PB$。",
          explanation: explanation({
            plan: "外部点からの接線と割線に対して方べきの定理を使う。",
            work: "$PT=16$、$PA=8$。$PT^2=PA\\cdot PB$ だから $256=8PB$、よって $PB=32$。",
            answer: "オカ=32",
            mistake: "$AB$ を32としない。式の $PB$ は点PからBまでの長さ。",
            shortcut: "$16^2/8$ と一気に割る。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s3-distance-formula",
          prompt:
            "さらに、別の平面 $\\beta$ で球 $S$ を切ったところ、切り口の円の半径は10であった。このとき、中心 $O$ から平面 $\\beta$ までの距離は [キ] である。\n\n[キ] の解答群: 0: 3　1: 5　2: $\\sqrt{69}$　3: $\\sqrt{269}$　4: $\\sqrt{169}$　5: 13　6: $\\sqrt{119}$　7: 23\n\n球の問題に見えても、平面で切った断面を考えれば円の問題として扱うことができる。このことから、半径13の球に対して、中心から距離 $d$ の平面で切った断面円の半径を $\\rho$ とすると $\\rho^2=[クケコ]-d^2$ であることがわかる。",
          answerFormat: "blank",
          blanks: [blank("キ", "2"), blank("クケコ", "169")],
          points: 7,
          difficulty: "hard",
          skillTags: ["球の断面", "三平方の定理", "一般化"],
          answer: { キ: "2", クケコ: "169" },
          shortSolution: "$10^2+d^2=13^2$ より $d=\\sqrt{69}$。選択肢番号は2。",
          explanation: explanation({
            plan: "断面円の半径、中心から平面までの距離、球の半径で直角三角形を作る。",
            work: "半径10の断面なら $10^2+d^2=13^2$ なので $d^2=69$、距離は $\\sqrt{69}$。選択肢番号は2。一般には $\\rho^2+d^2=13^2$ より $\\rho^2=169-d^2$。",
            answer: "キ=2、クケコ=169",
            mistake: "[キ] は値そのものではなく選択肢番号で答える。",
            shortcut: "球の断面は毎回 $断面半径^2+距離^2=球半径^2$。",
            link: course.geometry,
          }),
          reviewLinks: [course.geometry],
          dependsOnPrevious: true,
        }),
      ],
    },
    {
      id: "section-4",
      title: "第4問",
      unit: "場合の数と確率",
      points: 20,
      estimatedMinutes: 16,
      theme: "順列、辞書式順序、条件付き確率",
      leadText: "1から6までの数字から異なる4個を選び、左から順に並べてできる4個の数字の列を考える。（配点20）",
      questions: [
        q({
          id: "m1a-manual-001-s4-order",
          prompt:
            "1から6までの数字から異なる4個を選び、左から順に並べてできる4個の数字の列を考える。例えば、2415はこのような列の一つである。これらの列を、左から順に見て小さいものから並べる。この並べ方を辞書式順序という。\n\nこのような列は全部で [アイウ] 個ある。\n\n(1) 列3412が辞書式順序で何番目に現れるかを考える。先頭の数字が3より小さい列は [エ] $\\times {}_5P_3=[オカキ]$ 個である。また、先頭が3で、2番目の数字が4より小さい列は [ク] $\\times {}_4P_2=[ケコ]$ 個である。したがって、3412は [サシス] 番目に現れる。",
          answerFormat: "blank",
          blanks: [
            blank("アイウ", "360"),
            blank("エ", "2"),
            blank("オカキ", "120"),
            blank("ク", "2"),
            blank("ケコ", "24"),
            blank("サシス", "145"),
          ],
          points: 5,
          difficulty: "standard",
          skillTags: ["順列", "辞書式順序", "場合の数"],
          answer: { アイウ: "360", エ: "2", オカキ: "120", ク: "2", ケコ: "24", サシス: "145" },
          shortSolution: "総数は ${}_6P_4=360$。3412の前は120+24、本人を足して145番目。",
          explanation: explanation({
            plan: "辞書式順序は、左から一桁ずつ固定して前にある列を数える。",
            work: "総数は $6\\times5\\times4\\times3=360$。先頭が1,2の2通りなら残り3桁は ${}_5P_3=60$ で120個。先頭3で2番目が1,2の2通りなら残り2桁は ${}_4P_2=12$ で24個。さらに3412自身を数えて $120+24+1=145$。",
            answer: "アイウ=360、エ=2、オカキ=120、ク=2、ケコ=24、サシス=145",
            mistake: "最後に3412自身の1個を足し忘れる。",
            shortcut: "辞書式は「より前にある個数 + 1」で順位になる。",
            link: course.probability,
          }),
          reviewLinks: [course.probability],
        }),
        q({
          id: "m1a-manual-001-s4-prob-ab",
          prompt:
            "(2) これらの列から1つを無作為に選ぶ。条件 $A,B$ を $A$: 先頭の数字が偶数である、$B$: 最後の数字が奇数である、とする。このとき $P(A)=\\dfrac{[セ]}{[ソ]},\\ P(B|A)=\\dfrac{[タ]}{[チ]}$ である。",
          answerFormat: "blank",
          blanks: [blank("セ", "1"), blank("ソ", "2"), blank("タ", "3"), blank("チ", "5")],
          points: 4,
          difficulty: "basic",
          skillTags: ["確率", "条件付き確率", "順列"],
          answer: { セ: "1", ソ: "2", タ: "3", チ: "5" },
          shortSolution: "先頭偶数は半分。先頭を偶数に固定すると残り5個のうち奇数は3個。",
          explanation: explanation({
            plan: "条件Aで先頭を偶数にした後、最後に置ける奇数の割合を見る。",
            work: "1から6には偶数が3個、奇数が3個なので $P(A)=3/6=1/2$。Aが起きた後も残り5個の中に奇数は3個あるため $P(B|A)=3/5$。",
            answer: "セ=1、ソ=2、タ=3、チ=5",
            mistake: "Aのあとに母数を6のままにしない。先頭で1個使っている。",
            shortcut: "列全体を数えなくても、対称性と残り個数で出せる。",
            link: course.probability,
          }),
          reviewLinks: [course.probability],
        }),
        q({
          id: "m1a-manual-001-s4-cde",
          prompt:
            "(3) 条件 $C,D$ を $C$: 列の中に3と5の両方が含まれる、$D$: その列が辞書式順序で3412より前に現れる、とする。\n\n$C$ かつ $D$ を満たす列の個数を調べるため、先頭の数字で場合分けする。\n\n先頭の数字 1,2,3 に対して、$C$ かつ $D$ を満たす列の個数はそれぞれ [ツ], [テ], [ト] である。したがって、$C$ かつ $D$ を満たす列は全部で [ナニ] 個である。\n\nさらに、条件 $E$ を $E$: 列の中で5が3より左にある、とする。このとき、$C$ かつ $D$ を満たす列のうち、さらに $E$ を満たす列は [ヌネ] 個である。よって $P(E|C\\cap D)=\\dfrac{[ノ]}{[ハ]}$ である。\n\n[ノ, ハ] の解答群: 0:1  1:2  2:3  3:4  4:5  5:6  6:7  7:8",
          answerFormat: "blank",
          blanks: [
            blank("ツ", "18"),
            blank("テ", "18"),
            blank("ト", "12"),
            blank("ナニ", "48"),
            blank("ヌネ", "18"),
            blank("ノ", "3"),
            blank("ハ", "8"),
          ],
          points: 7,
          difficulty: "hard",
          skillTags: ["場合分け", "条件付き確率", "辞書式順序"],
          answer: { ツ: "18", テ: "18", ト: "12", ナニ: "48", ヌネ: "18", ノ: "3", ハ: "8" },
          shortSolution: "$C\\cap D$ は先頭1,2,3で18,18,12個、合計48個。Eは18個なので $18/48=3/8$。",
          explanation: explanation({
            plan: "3412より前という条件を、先頭1・2・3に分けて数える。",
            work: "先頭1または2では、残り3枠に3と5を含める。残り1個の選び方3通り、並べ方 $3!$ で各18個。先頭3ではDのため2番目は1または2。残り2枠に5を含め、もう1個を3通りから選び、並べて各6個、合計12個。よって48個。Eは先頭1,2で3と5の順が半分ずつなので各9個、先頭3では5が3より左になれないため0個、合計18個。$18/48=3/8$。",
            answer: "ツ=18、テ=18、ト=12、ナニ=48、ヌネ=18、ノ=3、ハ=8",
            mistake: "先頭3の場合、3412より前にするため2番目が1または2に限られる点を落としやすい。",
            shortcut: "先頭1,2は対称、先頭3だけ別処理と分けると速い。",
            link: course.probability,
          }),
          reviewLinks: [course.probability],
          dependsOnPrevious: true,
        }),
        q({
          id: "m1a-manual-001-s4-multi",
          prompt:
            "(4) 次の0から5のうち、正しいものをすべて選ぶと、[ヒ] である。\n\n0: 条件 $A$ のもとで条件 $B$ が成り立つ確率は $\\dfrac12$ である。\n1: 条件 $C$ のもとで条件 $E$ が成り立つ確率は $\\dfrac12$ である。\n2: 3412より前に現れる列は144個である。\n3: 条件 $C\\cap D$ のもとで条件 $E$ が成り立つ確率は $\\dfrac38$ である。\n4: 先頭が偶数である列は180個である。\n5: 最後が奇数である列は120個である。",
          answerFormat: "multi-choice",
          choices: choices([
            { text: "条件 $A$ のもとで条件 $B$ が成り立つ確率は $\\dfrac12$ である。" },
            { text: "条件 $C$ のもとで条件 $E$ が成り立つ確率は $\\dfrac12$ である。", correct: true },
            { text: "3412より前に現れる列は144個である。", correct: true },
            { text: "条件 $C\\cap D$ のもとで条件 $E$ が成り立つ確率は $\\dfrac38$ である。", correct: true },
            { text: "先頭が偶数である列は180個である。", correct: true },
            { text: "最後が奇数である列は120個である。" },
          ]),
          points: 4,
          difficulty: "trap",
          skillTags: ["複数選択", "条件付き確率", "順列"],
          answer: ["1", "2", "3", "4"],
          shortSolution: "0は $3/5$ なので誤り、5は180個なので誤り。1,2,3,4が正しい。",
          explanation: explanation({
            plan: "各選択肢を、前問までの結果と全体360個から照合する。",
            work: "0は前問で $P(B|A)=3/5$ だから誤り。1はCのもとでは3と5の左右は対称なので $1/2$。2は3412が145番目なので前は144個。3は前問で $3/8$。4は先頭偶数3通り、残り ${}_5P_3=60$ で180個。5は最後奇数3通り、残り ${}_5P_3=60$ で180個だから誤り。",
            answer: "ヒ=1,2,3,4",
            mistake: "複数選択で1つだけ選んでしまうこと。選択肢5は120ではなく180。",
            shortcut: "すでに出した値を再利用し、未確認の選択肢だけ数える。",
            link: course.probability,
          }),
          reviewLinks: [course.probability],
          dependsOnPrevious: true,
          commonMistakes: ["選択肢0を前問の $3/5$ と照合し忘れる", "複数選択を単一選択として扱う"],
        }),
      ],
    },
  ],
};
