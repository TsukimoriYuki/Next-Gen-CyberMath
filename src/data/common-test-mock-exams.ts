export type CommonTestMockSubject = "math-1a";

export type CommonTestDifficulty =
  | "basic"
  | "standard"
  | "hard"
  | "trap"
  | "time-consuming";

export type CommonTestAnswerFormat =
  | "blank"
  | "choice"
  | "multi-choice"
  | "numeric"
  | "expression";

export type ExamAsset =
  | {
      type: "table";
      id: string;
      title: string;
      headers: string[];
      rows: string[][];
      note?: string;
    }
  | {
      type: "graph";
      id: string;
      title: string;
      variant: "quadratic-domain";
      note?: string;
    }
  | {
      type: "diagram";
      id: string;
      title: string;
      variant: "triangle-incircle-circumcircle";
      note?: string;
    }
  | {
      type: "conversation";
      id: string;
      title: string;
      lines: { speaker: string; text: string }[];
    };

export type ExamBlank = {
  id: string;
  label: string;
  type: "integer" | "signed-integer" | "fraction" | "choice-symbol" | "expression";
  correctAnswer: string;
  width?: number;
};

export type ExamChoice = {
  id: string;
  label: string;
  text: string;
  isCorrect?: boolean;
  trap?: string;
};

export type CommonTestQuestion = {
  id: string;
  prompt: string;
  answerFormat: CommonTestAnswerFormat;
  blanks?: ExamBlank[];
  choices?: ExamChoice[];
  points: number;
  difficulty: CommonTestDifficulty;
  skillTags: string[];
  commonMistakes: string[];
  answer: string | string[] | Record<string, string>;
  explanation: string;
  shortSolution?: string;
  reviewLinks?: string[];
  measuredAbility: string;
  timeSavingTip: string;
  dependsOnPrevious?: boolean;
};

export type CommonTestSection = {
  id: string;
  title: string;
  unit: string;
  points: number;
  estimatedMinutes: number;
  theme: string;
  leadText: string;
  assets?: ExamAsset[];
  questions: CommonTestQuestion[];
};

export type CommonTestMockExam = {
  id: string;
  title: string;
  subject: CommonTestMockSubject;
  durationMinutes: 70;
  totalPoints: 100;
  targetAverage: {
    min: number;
    max: number;
  };
  sections: CommonTestSection[];
};

const CHOICE_LABELS = ["0", "1", "2", "3", "4", "5"];

function choices(items: { text: string; correct?: boolean; trap?: string }[]): ExamChoice[] {
  return items.map((item, index) => ({
    id: String(index),
    label: CHOICE_LABELS[index] ?? String(index),
    text: item.text,
    isCorrect: item.correct,
    trap: item.trap,
  }));
}

export const COMMON_TEST_MATH_1A_MOCK_001: CommonTestMockExam = {
  id: "common-test-math-1a-mock-001",
  title: "Cyber Math 共通テスト数学IA 本番模試 第1回",
  subject: "math-1a",
  durationMinutes: 70,
  totalPoints: 100,
  targetAverage: { min: 38, max: 45 },
  sections: [
    {
      id: "section-1",
      title: "第1問 数と式・集合と命題",
      unit: "数と式 / 集合と命題",
      points: 20,
      estimatedMinutes: 12,
      theme: "条件を読み替えて、式変形と論理を短時間で処理する",
      leadText:
        "第1問では、計算結果だけでなく、条件が何を意味しているかを読み替えながら進める。前半は取りやすいが、後半では必要条件・十分条件と反例の選び方で差がつく。",
      assets: [
        {
          type: "conversation",
          id: "s1-conversation",
          title: "命題の確認",
          lines: [
            {
              speaker: "先生",
              text: "命題が正しいか迷ったときは、式を変形するだけでなく、反例が作れないかを考えよう。",
            },
            {
              speaker: "生徒",
              text: "反例は、条件を満たすのに結論を満たさないものを探せばよいのですね。",
            },
          ],
        },
      ],
      questions: [
        {
          id: "m1a-mock-001-s1-q1",
          prompt:
            "$|x-2|\\leqq 3$ を満たす実数 $x$ の範囲は、$[ア]\\leqq x\\leqq[イ]$ である。",
          answerFormat: "blank",
          blanks: [
            { id: "a", label: "ア", type: "signed-integer", correctAnswer: "-1", width: 3 },
            { id: "i", label: "イ", type: "integer", correctAnswer: "5", width: 2 },
          ],
          points: 4,
          difficulty: "basic",
          skillTags: ["絶対値", "不等式", "条件整理"],
          commonMistakes: ["中心2からの距離を片側だけにする", "不等号の向きを取り違える"],
          answer: { a: "-1", i: "5" },
          shortSolution: "$|x-2|\\leqq3$ は $-3\\leqq x-2\\leqq3$ と読む。",
          explanation:
            "方針: 絶対値は「中心からの距離」と読む。$|x-2|\\leqq3$ は、$x$ が2から3以内にあるという意味である。\n\n解答: $-3\\leqq x-2\\leqq3$ より、両辺に2を加えて $-1\\leqq x\\leqq5$。\n\nよくあるミス: $x\\leqq5$ だけで止めると、左側の条件を落としている。共通テストでは片側だけ合っている選択肢が置かれやすい。",
          reviewLinks: ["/courses/math-1a/numbers-and-expressions"],
          measuredAbility: "絶対値を距離として読み替え、範囲を両側から処理できるか",
          timeSavingTip: "中心2、半径3と見れば、左端と右端を暗算で出せる。",
        },
        {
          id: "m1a-mock-001-s1-q2",
          prompt:
            "二次式 $x^2-6x+5$ は $(x-[ウ])^2-[エ]$ と変形できる。したがって、この式の最小値は $-[エ]$ である。",
          answerFormat: "blank",
          blanks: [
            { id: "u", label: "ウ", type: "integer", correctAnswer: "3", width: 2 },
            { id: "e", label: "エ", type: "integer", correctAnswer: "4", width: 2 },
          ],
          points: 4,
          difficulty: "basic",
          skillTags: ["平方完成", "二次式", "最小値"],
          commonMistakes: ["定数項を足し戻さない", "$6$ をそのまま軸とする"],
          answer: { u: "3", e: "4" },
          shortSolution: "$x^2-6x+5=(x-3)^2-9+5=(x-3)^2-4$。",
          explanation:
            "方針: $x$ の係数 $-6$ の半分である $-3$ を使って平方を作る。\n\n解答: $x^2-6x+5=(x-3)^2-9+5=(x-3)^2-4$。よって $[ウ]=3$, $[エ]=4$。\n\n選択肢の罠: $(x-6)^2$ とすると一次の係数が $-12$ になってしまう。係数の半分を見る。",
          reviewLinks: ["/common-test/lectures/quadratic-case-split-intensive"],
          measuredAbility: "平方完成の結果を、最小値の読み取りまでつなげられるか",
          timeSavingTip: "半分、二乗、引き戻しの順に固定する。",
        },
        {
          id: "m1a-mock-001-s1-q3",
          prompt:
            "全体集合を $U=\\{1,2,\\ldots,12\\}$ とする。$P$ を「4の倍数である」、$Q$ を「偶数である」とする。このとき、命題 $P\\Rightarrow Q$ と $Q\\Rightarrow P$ について正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            {
              text: "$P\\Rightarrow Q$ は真、$Q\\Rightarrow P$ は偽",
              correct: true,
            },
            { text: "$P\\Rightarrow Q$ は偽、$Q\\Rightarrow P$ は真" },
            { text: "どちらも真" },
            { text: "どちらも偽" },
          ]),
          points: 4,
          difficulty: "standard",
          skillTags: ["集合", "必要十分条件", "反例選択"],
          commonMistakes: ["包含関係を逆に読む", "偶数と4の倍数を同じ集合とみなす"],
          answer: "0",
          shortSolution: "4の倍数は必ず偶数だが、2や6は偶数でも4の倍数ではない。",
          explanation:
            "方針: 集合の包含で読む。$P=\\{4,8,12\\}$、$Q=\\{2,4,6,8,10,12\\}$ なので $P\\subset Q$。\n\n解答: $P$ ならば必ず $Q$ であるから $P\\Rightarrow Q$ は真。一方、$2\\in Q$ だが $2\\notin P$ なので $Q\\Rightarrow P$ は偽。\n\nよくあるミス: 「4の倍数」と「偶数」の言葉の近さだけで同値と判断しない。反例を1つ出せるかで決める。",
          reviewLinks: ["/courses/math-1a/sets-and-logic"],
          measuredAbility: "包含関係を命題の向きに翻訳できるか",
          timeSavingTip: "迷ったら小さい反例を探す。ここでは2が最短。",
        },
        {
          id: "m1a-mock-001-s1-q4",
          prompt:
            "会話文を参考にする。命題「整数 $n$ について、$n^2$ が4の倍数ならば $n$ は4の倍数である」は正しいか。最も適切な判断を選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "正しい。$n^2$ が4の倍数なら $n$ も必ず4で割り切れる" },
            {
              text: "正しくない。$n=2$ は反例である",
              correct: true,
            },
            { text: "正しくない。$n=3$ は反例である" },
            { text: "整数の範囲では判断できない" },
          ]),
          points: 8,
          difficulty: "trap",
          skillTags: ["命題", "反例", "整数"],
          commonMistakes: ["平方と元の数の倍数条件を同一視する", "反例が条件を満たすか確認しない"],
          answer: "1",
          shortSolution: "$2^2=4$ は4の倍数だが、$2$ は4の倍数ではない。",
          explanation:
            "方針: 命題を否定するには、条件を満たして結論を満たさない例を1つ示せばよい。\n\n解答: $n=2$ とすると $n^2=4$ は4の倍数である。しかし $n=2$ は4の倍数ではない。したがって命題は偽。\n\n選択肢の罠: $n=3$ は $n^2=9$ が4の倍数でないため、そもそも条件を満たしていない。反例にはならない。",
          reviewLinks: ["/courses/math-1a/integers", "/courses/math-1a/sets-and-logic"],
          measuredAbility: "反例の条件と結論を分けて確認できるか",
          timeSavingTip: "反例選択では、まず条件側に代入して合うものだけを残す。",
        },
      ],
    },
    {
      id: "section-2",
      title: "第2問 二次関数・データの分析",
      unit: "二次関数 / データの分析",
      points: 20,
      estimatedMinutes: 16,
      theme: "定義域つき二次関数と、表から読むデータの判断",
      leadText:
        "ある学校の探究活動で、屋外イベントの来場者数を予測するモデルを考える。前半では二次関数のグラフを読み、後半では観測データの表から、平均や相関の解釈を判断する。",
      assets: [
        {
          type: "graph",
          id: "s2-graph",
          title: "モデル $y=-(x-t)^2+9$ と定義域 $0\\leqq x\\leqq6$",
          variant: "quadratic-domain",
          note: "横軸は準備時間 $x$、縦軸は来場者数の指標を表す。",
        },
        {
          type: "table",
          id: "s2-table",
          title: "準備時間と当日の満足度",
          headers: ["班", "準備時間 $x$（時間）", "満足度 $y$（点）"],
          rows: [
            ["A", "1", "42"],
            ["B", "2", "49"],
            ["C", "3", "55"],
            ["D", "4", "60"],
            ["E", "8", "61"],
          ],
          note: "E班は他の班より準備時間が長い。観測された範囲を越える予測には注意する。",
        },
      ],
      questions: [
        {
          id: "m1a-mock-001-s2-q1",
          prompt:
            "$t=2$ のとき、$y=-(x-2)^2+9$ の軸は $x=[オ]$、定義域 $0\\leqq x\\leqq6$ における最大値は $[カ]$ である。",
          answerFormat: "blank",
          blanks: [
            { id: "o", label: "オ", type: "integer", correctAnswer: "2", width: 2 },
            { id: "ka", label: "カ", type: "integer", correctAnswer: "9", width: 2 },
          ],
          points: 4,
          difficulty: "basic",
          skillTags: ["二次関数", "頂点", "最大最小"],
          commonMistakes: ["頂点が定義域に入るか確認しない", "符号を見ずに最小値を答える"],
          answer: { o: "2", ka: "9" },
          shortSolution: "頂点は $(2,9)$ で、$x=2$ は定義域内にある。",
          explanation:
            "方針: 平方完成された形から頂点を読む。係数が負なので、頂点で最大になる。\n\n解答: $y=-(x-2)^2+9$ の軸は $x=2$、頂点は $(2,9)$。$2$ は定義域 $0\\leqq x\\leqq6$ に含まれるので最大値は9。\n\nよくあるミス: 係数が負の二次関数は下に開く。頂点は最小値ではなく最大値を与える。",
          reviewLinks: ["/courses/math-1a/quadratic"],
          measuredAbility: "頂点と定義域を同時に確認できるか",
          timeSavingTip: "平方の中身が0になる場所を先に見る。",
        },
        {
          id: "m1a-mock-001-s2-q2",
          prompt:
            "$t=8$ のとき、同じ定義域 $0\\leqq x\\leqq6$ で最大値をとる $x$ と、その最大値の組として正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "$x=8$, 最大値9" },
            {
              text: "$x=6$, 最大値5",
              correct: true,
            },
            { text: "$x=0$, 最大値-55" },
            { text: "$x=2$, 最大値-27" },
          ]),
          points: 5,
          difficulty: "standard",
          skillTags: ["定義域", "最大最小", "グラフ読解"],
          commonMistakes: ["定義域外の頂点をそのまま選ぶ", "端点比較をしない"],
          answer: "1",
          shortSolution: "頂点 $x=8$ は定義域外。定義域内で頂点に最も近い端点 $x=6$ で最大。",
          explanation:
            "方針: 頂点が定義域に入らないときは、定義域の端点を比較する。\n\n解答: $y=-(x-8)^2+9$ の頂点は $x=8$ だが、定義域は $0\\leqq x\\leqq6$ なので頂点は使えない。下に開く放物線では、頂点に近いほど値が大きい。したがって $x=6$ で最大、値は $-(6-8)^2+9=-4+9=5$。\n\n選択肢の罠: $x=8$ はグラフ上の頂点だが、今回の問題で許された範囲の外である。",
          reviewLinks: ["/common-test/lectures/quadratic-case-split-intensive"],
          measuredAbility: "公式暗記ではなく、定義域制限を反映して判断できるか",
          timeSavingTip: "軸が範囲の外なら、近い端点だけを計算する。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s2-q3",
          prompt:
            "表のデータについて、準備時間と満足度の関係を読む。最も適切な判断を選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "準備時間が長いほど、満足度は必ず同じ割合で増える" },
            {
              text: "A〜D班では準備時間が増えるほど満足度も増えているが、E班を含めると増え方は小さく見える",
              correct: true,
            },
            { text: "E班は準備時間が最も長いので、満足度も他の班の2倍以上である" },
            { text: "相関が見えるので、準備時間だけが満足度を決めると断定できる" },
          ]),
          points: 5,
          difficulty: "hard",
          skillTags: ["データ読み取り", "外れ値", "相関"],
          commonMistakes: ["外れ値の影響を無視する", "相関を因果と断定する"],
          answer: "1",
          shortSolution: "A〜Dは増加傾向、Eは時間が大きい割に満足度の増加が小さい。",
          explanation:
            "方針: 表の値を、A〜Dの近い範囲とE班を含む全体に分けて読む。\n\n解答: A〜D班では $42,49,55,60$ と増えている。しかしE班は準備時間が8時間と大きいのに満足度は61点で、D班からの増え方は小さい。したがって、E班を含めると単純な比例的増加とは見にくい。\n\nよくあるミス: 相関があるように見えても、満足度を決める要因が準備時間だけとは限らない。",
          reviewLinks: ["/courses/math-1a/data-analysis"],
          measuredAbility: "表の値を根拠に、外れ値と傾向を区別できるか",
          timeSavingTip: "選択肢の「必ず」「だけ」「断定」は表で確認する。",
        },
        {
          id: "m1a-mock-001-s2-q4",
          prompt:
            "この表だけを根拠にして、準備時間を10時間にすれば満足度が必ず70点を超える、と結論づけることについて最も適切なものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "正しい。準備時間と満足度には正の相関があるからである" },
            { text: "正しい。E班が8時間で61点なので、10時間なら必ず70点を超える" },
            {
              text: "正しくない。観測範囲の外への予測であり、他の要因も考える必要がある",
              correct: true,
            },
            { text: "正しくない。平均値を使えば、すべての班が同じ点になるからである" },
          ]),
          points: 6,
          difficulty: "time-consuming",
          skillTags: ["データの解釈", "相関と因果", "選択肢消去"],
          commonMistakes: ["観測範囲外へ式や傾向を無批判に延長する", "強い断定表現を見落とす"],
          answer: "2",
          shortSolution: "データは1〜8時間までで、10時間の観測はない。相関は因果の断定ではない。",
          explanation:
            "方針: データから言えることと言えないことを分ける。共通テストでは、計算よりも結論の強さを問う選択肢がよく出る。\n\n解答: 表からは、観測範囲内で準備時間と満足度に関係がありそうだとは言える。しかし10時間は観測範囲外であり、疲労や内容の質など他の要因もあり得る。したがって「必ず70点を超える」とは断定できない。\n\n時短ポイント: 「必ず」「だけ」「すべて」などの強い表現は、データに直接根拠があるか確認する。",
          reviewLinks: ["/courses/math-1a/data-analysis"],
          measuredAbility: "統計的な傾向と現実の判断を混同しない読解力",
          timeSavingTip: "計算せず、観測範囲と断定表現だけで絞れる。",
          dependsOnPrevious: true,
        },
      ],
    },
    {
      id: "section-3",
      title: "第3問 図形と計量・図形の性質",
      unit: "図形と計量 / 図形の性質",
      points: 20,
      estimatedMinutes: 15,
      theme: "三角形の面積・内接円・外接円を、図から定理選択してつなぐ",
      leadText:
        "三角形 $ABC$ において、$AB=13$, $AC=14$, $BC=15$ とする。内接円、外接円、接点の長さを順に考える。図は関係を読み取るためのもので、長さを直接測ってはいけない。",
      assets: [
        {
          type: "diagram",
          id: "s3-diagram",
          title: "三角形 $ABC$ と内接円・外接円",
          variant: "triangle-incircle-circumcircle",
          note: "図は正確な縮尺ではない。辺の長さと定理から判断する。",
        },
      ],
      questions: [
        {
          id: "m1a-mock-001-s3-q1",
          prompt:
            "$\\angle A$ について、$\\cos A$ の値として正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "$\\dfrac{5}{13}$", correct: true },
            { text: "$\\dfrac{12}{13}$" },
            { text: "$\\dfrac{13}{14}$" },
            { text: "$-\\dfrac{5}{13}$" },
          ]),
          points: 4,
          difficulty: "standard",
          skillTags: ["余弦定理", "角度判定", "図形読解"],
          commonMistakes: ["向かい合う辺を取り違える", "鈍角と誤判定する"],
          answer: "0",
          shortSolution:
            "$15^2=13^2+14^2-2\\cdot13\\cdot14\\cos A$ より $\\cos A=5/13$。",
          explanation:
            "方針: 求めたい角 $A$ の向かいの辺は $BC=15$ である。余弦定理で角の情報へ移る。\n\n解答: $15^2=13^2+14^2-2\\cdot13\\cdot14\\cos A$。よって $225=365-364\\cos A$ なので、$364\\cos A=140$、$\\cos A=5/13$。\n\nよくあるミス: $13$ や $14$ を向かいの辺として使うと別の角を求めてしまう。",
          reviewLinks: ["/courses/math-1a/figures-and-measurement"],
          measuredAbility: "余弦定理で、対象の角と向かいの辺を対応させられるか",
          timeSavingTip: "角Aなら、式の左は必ず $BC^2$。",
        },
        {
          id: "m1a-mock-001-s3-q2",
          prompt:
            "三角形 $ABC$ の面積を $S$ とする。ヘロンの公式を用いると、$S=[キ][ク]$ である。",
          answerFormat: "blank",
          blanks: [
            { id: "ki", label: "キ", type: "integer", correctAnswer: "8", width: 2 },
            { id: "ku", label: "ク", type: "integer", correctAnswer: "4", width: 2 },
          ],
          points: 4,
          difficulty: "standard",
          skillTags: ["面積", "ヘロンの公式", "計算処理"],
          commonMistakes: ["半周長を周長と間違える", "平方根を外し忘れる"],
          answer: { ki: "8", ku: "4" },
          shortSolution: "$s=21$、$S=\\sqrt{21\\cdot8\\cdot7\\cdot6}=84$。",
          explanation:
            "方針: 13,14,15 の三角形はヘロンの公式で面積を短く出せる。\n\n解答: 半周長は $s=(13+14+15)/2=21$。$S=\\sqrt{21(21-13)(21-14)(21-15)}=\\sqrt{21\\cdot8\\cdot7\\cdot6}=84$。\n\n別解: 第1問で求めた $\\cos A=5/13$ から $\\sin A=12/13$ として、$S=\\frac12\\cdot13\\cdot14\\cdot\\frac{12}{13}=84$ としてもよい。",
          reviewLinks: ["/common-test/lectures/geometry-measurement-intensive"],
          measuredAbility: "面積公式を条件に応じて選べるか",
          timeSavingTip: "13-14-15 は面積84を覚えていてもよいが、根拠は確認する。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s3-q3",
          prompt:
            "内接円の半径を $r$ とすると、$S=rs$ である。$r$ の値を求めよ。",
          answerFormat: "numeric",
          blanks: [{ id: "ke", label: "ケ", type: "integer", correctAnswer: "4", width: 2 }],
          points: 5,
          difficulty: "hard",
          skillTags: ["内接円", "面積", "前問利用"],
          commonMistakes: ["半周長ではなく周長で割る", "外接円半径の公式と混同する"],
          answer: { ke: "4" },
          shortSolution: "$r=S/s=84/21=4$。",
          explanation:
            "方針: 内接円が出たら、面積 $S=rs$ を使えるかを見る。ここで $s$ は半周長である。\n\n解答: 前問より $S=84$、半周長は $s=21$。したがって $r=84/21=4$。\n\nよくあるミス: 周長42で割って2としてしまう誤答が多い。$S=rs$ の $s$ は半周長。",
          reviewLinks: ["/courses/math-1a/geometry-properties"],
          measuredAbility: "前問の面積を内接円の公式に接続できるか",
          timeSavingTip: "面積と半周長が出ているなら、内接円半径は1手。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s3-q4",
          prompt:
            "内接円が辺 $AB$ と接する点を $D$ とする。$AD$ の長さとして正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "5" },
            { text: "6", correct: true },
            { text: "7" },
            { text: "8" },
          ]),
          points: 7,
          difficulty: "time-consuming",
          skillTags: ["接線の長さ", "内接円", "線分比"],
          commonMistakes: ["接点からの長さを辺全体と混同する", "半周長から引く辺を誤る"],
          answer: "1",
          shortSolution: "$AD=(AB+AC-BC)/2=(13+14-15)/2=6$。",
          explanation:
            "方針: 同じ点から円に引いた接線の長さは等しい。辺の分割を文字で置くと速い。\n\n解答: $AD=AE=x$、$BD=BF=y$、$CE=CF=z$ とおくと、$x+y=13$, $x+z=14$, $y+z=15$。前2式を足して3式目を引くと $2x=12$、よって $x=6$。\n\n別解: $AD=s-BC=21-15=6$ と見てもよい。\n\n選択肢の罠: 半径4をそのまま接線の長さにしない。半径は接点に垂直だが、接線の長さではない。",
          reviewLinks: ["/common-test/lectures/geometry-properties-intensive"],
          measuredAbility: "図の接線関係を式に翻訳し、前問の情報と区別できるか",
          timeSavingTip: "$s-a$ 型で接点までの長さを出すと速い。",
          dependsOnPrevious: true,
        },
      ],
    },
    {
      id: "section-4",
      title: "第4問 場合の数と確率",
      unit: "場合の数 / 確率",
      points: 20,
      estimatedMinutes: 14,
      theme: "同様に確からしい全体を固定し、条件付き確率へ進む",
      leadText:
        "文化祭の抽選箱には、赤カード3枚、青カード2枚、黄カード1枚の合計6枚が入っている。カードは同じ色でも1枚ずつ区別できるものとし、同時に2枚を取り出す。",
      assets: [
        {
          type: "table",
          id: "s4-table",
          title: "抽選箱のカード",
          headers: ["色", "枚数", "ゲームの得点"],
          rows: [
            ["赤", "3", "2点"],
            ["青", "2", "1点"],
            ["黄", "1", "0点"],
          ],
          note: "同時に2枚を取り出すので、順序は区別しない。",
        },
      ],
      questions: [
        {
          id: "m1a-mock-001-s4-q1",
          prompt:
            "2枚のカードの取り出し方は全部で $[コ][サ]$ 通りである。",
          answerFormat: "blank",
          blanks: [
            { id: "ko", label: "コ", type: "integer", correctAnswer: "1", width: 2 },
            { id: "sa", label: "サ", type: "integer", correctAnswer: "5", width: 2 },
          ],
          points: 4,
          difficulty: "basic",
          skillTags: ["組合せ", "同様に確からしい", "場合の数"],
          commonMistakes: ["順序を区別して30通りとする", "同じ色を区別しない"],
          answer: { ko: "1", sa: "5" },
          shortSolution: "${}_6C_2=15$。",
          explanation:
            "方針: 同時に2枚を取り出すので、順序を区別しない組合せで数える。\n\n解答: 6枚から2枚を選ぶので、${}_6C_2=15$ 通り。\n\nよくあるミス: 1枚目、2枚目の順に考えて $6\\times5=30$ とした場合は、同じ2枚を2回数えている。",
          reviewLinks: ["/courses/math-1a/counting-probability"],
          measuredAbility: "順列と組合せの使い分け",
          timeSavingTip: "「同時に」はまず組合せを疑う。",
        },
        {
          id: "m1a-mock-001-s4-q2",
          prompt:
            "ちょうど1枚が赤である確率として正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "$\\dfrac{1}{5}$" },
            { text: "$\\dfrac{2}{5}$" },
            { text: "$\\dfrac{3}{5}$", correct: true },
            { text: "$\\dfrac{4}{5}$" },
          ]),
          points: 4,
          difficulty: "standard",
          skillTags: ["確率", "場合分け", "組合せ"],
          commonMistakes: ["少なくとも1枚赤と混同する", "赤以外の3枚を数え忘れる"],
          answer: "2",
          shortSolution: "赤1枚の選び方3通り、赤以外1枚の選び方3通りで9通り。$9/15=3/5$。",
          explanation:
            "方針: 「ちょうど1枚」なので、赤1枚と赤でない1枚に分けて数える。\n\n解答: 赤は3枚、赤以外は青2枚と黄1枚で3枚。したがって有利な場合は $3\\times3=9$ 通り。全体15通りより、確率は $9/15=3/5$。\n\n選択肢の罠: 赤を含む場合をすべて数えると、赤2枚の場合まで入ってしまう。",
          reviewLinks: ["/common-test/lectures/probability-guided-reading"],
          measuredAbility: "「ちょうど」と「少なくとも」を区別できるか",
          timeSavingTip: "条件語を丸で囲むつもりで読む。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s4-q3",
          prompt:
            "取り出した2枚のうち少なくとも1枚が青であった。この条件のもとで、赤カードを含む確率として正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "$\\dfrac{1}{3}$" },
            { text: "$\\dfrac{1}{2}$" },
            { text: "$\\dfrac{2}{3}$", correct: true },
            { text: "$\\dfrac{3}{5}$" },
          ]),
          points: 6,
          difficulty: "hard",
          skillTags: ["条件付き確率", "母集団整理", "重複カウント"],
          commonMistakes: ["条件が付いた後も全体15通りで割る", "青2枚の場合を落とす"],
          answer: "2",
          shortSolution:
            "青を少なくとも1枚含む場合は9通り。そのうち赤も含むのは赤青の6通り。",
          explanation:
            "方針: 条件付き確率では、条件を満たす場合だけを新しい全体にする。\n\n解答: 少なくとも1枚が青である場合は、全体15通りから青を含まない場合 ${}_4C_2=6$ 通りを引いて9通り。赤も含む場合は、赤3枚から1枚、青2枚から1枚を選ぶので $3\\times2=6$ 通り。よって $6/9=2/3$。\n\nよくあるミス: 分母を15のままにすると、条件が付いた後の全体を取り違えている。",
          reviewLinks: ["/courses/math-1a/counting-probability"],
          measuredAbility: "条件付き確率で母集団を更新できるか",
          timeSavingTip: "「この条件のもとで」を見たら、分母を作り直す。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s4-q4",
          prompt:
            "表の得点を用いる。取り出した2枚の得点の合計が3点以上になる確率を求めよ。",
          answerFormat: "choice",
          choices: choices([
            { text: "$\\dfrac{2}{5}$" },
            { text: "$\\dfrac{3}{5}$", correct: true },
            { text: "$\\dfrac{2}{3}$" },
            { text: "$\\dfrac{4}{5}$" },
          ]),
          points: 6,
          difficulty: "trap",
          skillTags: ["場合分け", "余事象", "得点条件"],
          commonMistakes: ["3点ちょうどだけを数える", "赤赤と赤青を重複して数える"],
          answer: "1",
          shortSolution: "赤赤3通り、赤青6通りで合計9通り。$9/15=3/5$。",
          explanation:
            "方針: 得点が3点以上になる組合せを色で分類する。赤は2点、青は1点、黄は0点。\n\n解答: 赤赤は4点で ${}_3C_2=3$ 通り。赤青は3点で $3\\times2=6$ 通り。その他は3点以上にならない。有利な場合は9通りなので、確率は $9/15=3/5$。\n\n選択肢の罠: 「3点以上」なので、赤赤の4点も含める。3点ちょうどだけなら赤青6通りで $2/5$ になってしまう。",
          reviewLinks: ["/common-test/lectures/probability-guided-reading"],
          measuredAbility: "条件語を正確に読み、場合分けを過不足なく行えるか",
          timeSavingTip: "得点条件は表を見ながら、成立する色の組だけを書き出す。",
          dependsOnPrevious: true,
        },
      ],
    },
    {
      id: "section-5",
      title: "第5問 整数の性質",
      unit: "整数の性質",
      points: 20,
      estimatedMinutes: 13,
      theme: "周期の一致を、最大公約数・最小公倍数・包除で処理する",
      leadText:
        "駅前の案内板Aは84秒ごと、案内板Bは60秒ごとに音を鳴らす。時刻0秒で2つの案内板が同時に音を鳴らした。以後、同じ周期で音が鳴るものとする。",
      assets: [
        {
          type: "conversation",
          id: "s5-conversation",
          title: "周期の考え方",
          lines: [
            {
              speaker: "生徒",
              text: "同時に鳴る時刻は、84と60の公倍数を考えればよいですか。",
            },
            {
              speaker: "先生",
              text: "その通り。さらに、片方だけ鳴る回数を数えるときは、同時に鳴る時刻を重複として扱う必要があるよ。",
            },
          ],
        },
      ],
      questions: [
        {
          id: "m1a-mock-001-s5-q1",
          prompt: "$84$ と $60$ の最大公約数は $[シ][ス]$ である。",
          answerFormat: "blank",
          blanks: [
            { id: "shi", label: "シ", type: "integer", correctAnswer: "1", width: 2 },
            { id: "su", label: "ス", type: "integer", correctAnswer: "2", width: 2 },
          ],
          points: 4,
          difficulty: "basic",
          skillTags: ["最大公約数", "互除法", "整数"],
          commonMistakes: ["約数を途中で止める", "最小公倍数と混同する"],
          answer: { shi: "1", su: "2" },
          shortSolution: "$84=60+24$, $60=2\\cdot24+12$, $24=2\\cdot12$。",
          explanation:
            "方針: 大きい数を小さい数で割り、余りを追う互除法を使う。\n\n解答: $84=60+24$, $60=2\\cdot24+12$, $24=2\\cdot12$ なので最大公約数は12。\n\nよくあるミス: 6で止めず、12でも両方割れることを確認する。",
          reviewLinks: ["/courses/math-1a/integers"],
          measuredAbility: "互除法で最大公約数を安定して求められるか",
          timeSavingTip: "差24を見たら、60を24で割る流れに入る。",
        },
        {
          id: "m1a-mock-001-s5-q2",
          prompt:
            "2つの案内板が再び同時に鳴るのは、最初の同時時刻から $[セ][ソ][タ]$ 秒後である。",
          answerFormat: "blank",
          blanks: [
            { id: "se", label: "セ", type: "integer", correctAnswer: "4", width: 2 },
            { id: "so", label: "ソ", type: "integer", correctAnswer: "2", width: 2 },
            { id: "ta", label: "タ", type: "integer", correctAnswer: "0", width: 2 },
          ],
          points: 4,
          difficulty: "standard",
          skillTags: ["最小公倍数", "周期", "前問利用"],
          commonMistakes: ["最大公約数をそのまま答える", "84と60を足す"],
          answer: { se: "4", so: "2", ta: "0" },
          shortSolution: "$\\operatorname{lcm}(84,60)=84\\cdot60/12=420$。",
          explanation:
            "方針: 同時に鳴る時刻は、2つの周期の公倍数。最初に再び同時になるのは最小公倍数である。\n\n解答: 前問より最大公約数は12。したがって最小公倍数は $84\\cdot60/12=420$ 秒。\n\n選択肢の罠: 最大公約数12秒ごとに同時に鳴るわけではない。12は共通に割れる長さであり、周期の一致そのものではない。",
          reviewLinks: ["/courses/math-1a/integers"],
          measuredAbility: "最大公約数から最小公倍数へ接続できるか",
          timeSavingTip: "$ab=\\gcd(a,b)\\operatorname{lcm}(a,b)$ を使う。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s5-q3",
          prompt:
            "時刻630秒の直後、次に音を鳴らす案内板として正しいものを選べ。",
          answerFormat: "choice",
          choices: choices([
            { text: "Aだけ" },
            { text: "Bだけ", correct: true },
            { text: "AとBが同時" },
            { text: "どちらも630秒後から60秒以上鳴らない" },
          ]),
          points: 5,
          difficulty: "hard",
          skillTags: ["余り", "周期", "条件整理"],
          commonMistakes: ["630が420の倍数でないことを見落とす", "直前と直後を混同する"],
          answer: "1",
          shortSolution: "630はAの直前/直後で見ると次のAまで42秒、Bは次のBまで30秒。",
          explanation:
            "方針: 630秒を各周期で割った余りから、次に鳴るまでの時間を比べる。\n\n解答: $630=84\\cdot7+42$ なので、Aが次に鳴るまで $84-42=42$ 秒。$630=60\\cdot10+30$ なので、Bが次に鳴るまで $60-30=30$ 秒。したがって直後に先に鳴るのはBだけ。\n\nよくあるミス: 630は420の倍数ではないため、同時時刻ではない。",
          reviewLinks: ["/courses/math-1a/integers"],
          measuredAbility: "余りを、次の周期までの時間に読み替えられるか",
          timeSavingTip: "余りが0でなければ、周期から余りを引く。",
          dependsOnPrevious: true,
        },
        {
          id: "m1a-mock-001-s5-q4",
          prompt:
            "時刻0秒以上420秒以下で、AとBのちょうど一方だけが音を鳴らす時刻は何回あるか。",
          answerFormat: "numeric",
          blanks: [{ id: "chi", label: "チ", type: "integer", correctAnswer: "10", width: 3 }],
          points: 7,
          difficulty: "time-consuming",
          skillTags: ["包除原理", "周期", "整数"],
          commonMistakes: ["0秒と420秒の同時時刻を片方だけに数える", "端点を落とす"],
          answer: { chi: "10" },
          shortSolution:
            "Aは6回、Bは8回、同時は2回。片方だけは $(6-2)+(8-2)=10$ 回。",
          explanation:
            "方針: まずAが鳴る回数、Bが鳴る回数、同時に鳴る回数をそれぞれ数える。片方だけなので、同時に鳴る時刻を除く。\n\n解答: 0秒以上420秒以下でAが鳴る時刻は $0,84,168,252,336,420$ の6回。Bが鳴る時刻は $0,60,120,180,240,300,360,420$ の8回。同時に鳴るのは0秒と420秒の2回。したがって、ちょうど一方だけ鳴る回数は $(6-2)+(8-2)=10$ 回。\n\nよくあるミス: 0秒と420秒は両方が鳴るので、「片方だけ」には含めない。端点を含む条件も忘れない。",
          reviewLinks: ["/common-test/lectures/probability-guided-reading", "/courses/math-1a/integers"],
          measuredAbility: "端点を含む周期カウントと包除を組み合わせられるか",
          timeSavingTip: "一覧を書き切るより、各周期の回数から同時分を引く。",
          dependsOnPrevious: true,
        },
      ],
    },
  ],
};

export const COMMON_TEST_MOCK_EXAMS: CommonTestMockExam[] = [
  COMMON_TEST_MATH_1A_MOCK_001,
];

export function getCommonTestMockExam(id: string): CommonTestMockExam | null {
  return COMMON_TEST_MOCK_EXAMS.find((exam) => exam.id === id) ?? null;
}

export function getCommonTestMockExamStats(exam: CommonTestMockExam) {
  const questions = exam.sections.flatMap((section) => section.questions);
  return {
    sectionCount: exam.sections.length,
    questionCount: questions.length,
    answerSlotCount: questions.reduce(
      (sum, question) => sum + Math.max(1, question.blanks?.length ?? 0),
      0,
    ),
    assetCount: exam.sections.reduce((sum, section) => sum + (section.assets?.length ?? 0), 0),
    totalPoints: exam.sections.reduce((sum, section) => sum + section.points, 0),
    estimatedMinutes: exam.sections.reduce((sum, section) => sum + section.estimatedMinutes, 0),
  };
}
