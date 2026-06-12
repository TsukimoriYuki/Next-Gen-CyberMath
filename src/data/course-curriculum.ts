// Course curriculum — Phase 19 静的データ
// 本文は今後 Phase20 以降で拡充する。ここでは構造・見出し・短い説明のみ。
// 数式はインライン数式のみ使う（display math delimiter は禁止）。

import type { CourseLesson, CourseSubject, CourseUnit } from "@/types/course";

// ─── 数学IA ─── 二次関数 ────────────────────────────────────────────────────

const QUADRATIC_BEGINNER: CourseLesson[] = [
  {
    lessonId: "quadratic-what-is",
    lessonTitle: "二次関数とは何か",
    lessonDescription: "$y=ax^2+bx+c$ の意味を、グラフの形から丁寧に理解する。",
    level: "beginner",
    estimatedMinutes: 15,
    prerequisites: ["一次関数の読み方", "変数と定数の区別"],
    goals: [
      "$a,b,c$ が変わるとグラフがどう変わるかを説明できる",
      "放物線の「開き方」と $a$ の符号・大きさの関係を理解する",
    ],
    lessonBlocks: [
      {
        kind: "intro",
        title: "二次関数を「見た目」で理解する",
        body: "一次関数 $y=ax+b$ のグラフは直線でした。二次関数 $y=ax^2+bx+c$ のグラフは**放物線**になります。なぜ曲がるのか、$a$ の符号がなぜ重要なのかを確認します。",
      },
      {
        kind: "concept",
        title: "放物線の「開き方」",
        body: "$a>0$ のとき放物線は上に開き、$a<0$ のとき下に開きます。$|a|$ が大きいほど細く（急峻に）なり、小さいほど平たく（なだらかに）なります。まず $y=x^2$、$y=2x^2$、$y=\\frac{1}{2}x^2$ を比べて確認しましょう。",
      },
      {
        kind: "workedExample",
        title: "例：$y=x^2$ と $y=-x^2$ を比べる",
        body: "$y=x^2$ は下に凸（上に開く）、$y=-x^2$ は上に凸（下に開く）です。$x=0$ で頂点は $(0,0)$ です。$a$ の符号だけ変えると、グラフが $x$ 軸に対して折り返した形になります。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- $a>0$：下に凸（上に開く）\n- $a<0$：上に凸（下に開く）\n- $|a|$ が大きい → 細い放物線\n- $|a|$ が小さい → 平たい放物線",
      },
      {
        kind: "nextStep",
        title: "次は「平方完成」へ",
        body: "グラフの形が分かったら、次は頂点の位置を「平方完成」で求めます。",
      },
    ],
    checkQuestions: [
      {
        question: "$y=-3x^2+2x-1$ の放物線は上に凸か下に凸か？",
        answer: "$a=-3<0$ なので**上に凸**。",
        hint: "$a$ の符号を見る。",
      },
    ],
    relatedPracticeLinks: [
      { label: "二次関数 基礎演習", href: "/units/quadratic-functions", description: "大問別ドリル" },
      { label: "共通テスト 数学IA 演習", href: "/common-test/math-1a", description: "共通テスト対策" },
    ],
    qualityTags: ["途中式あり", "グラフ理解重視", "よくあるミスあり"],
  },
  {
    lessonId: "quadratic-completing-square",
    lessonTitle: "平方完成とグラフ",
    lessonDescription: "$y=ax^2+bx+c$ を $y=a(x-p)^2+q$ に変形し、頂点 $(p,q)$ を求める。",
    level: "beginner",
    estimatedMinutes: 20,
    prerequisites: ["二次関数とは何か", "展開・因数分解の基本"],
    goals: [
      "平方完成の手順を $x$ の係数 $b$ から機械的に実行できる",
      "頂点 $(p,q)$ と軸 $x=p$ を読み取れる",
    ],
    lessonBlocks: [
      {
        kind: "intro",
        title: "なぜ平方完成するのか",
        body: "$y=ax^2+bx+c$ のままでは頂点が読み取れません。$y=a(x-p)^2+q$ の形にすると、頂点 $(p,q)$ が一目でわかります。",
      },
      {
        kind: "formula",
        title: "平方完成の公式",
        body: "$y=ax^2+bx+c=a\\left(x+\\frac{b}{2a}\\right)^2-\\frac{b^2-4ac}{4a}$\n\n頂点は $\\left(-\\frac{b}{2a},\\ -\\frac{b^2-4ac}{4a}\\right)$。ただし公式を暗記するより、**手順を理解して毎回実行する**ほうが確実です。",
      },
      {
        kind: "workedExample",
        title: "例：$y=x^2-4x+1$ を平方完成する",
        body: "$y=x^2-4x+1=(x^2-4x+4)-4+1=(x-2)^2-3$\n\n手順：$x$ の係数 $-4$ の半分 $-2$ の 2 乗 $4$ を**足して引く**。頂点 $(2,-3)$、軸 $x=2$。",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：$a\\neq1$ のとき",
        body: "$y=2x^2-8x+3$ の場合、先に $2$ でくくって $y=2(x^2-4x)+3$ とし、括弧の中だけを平方完成します。$y=2(x^2-4x+4)-8+3=2(x-2)^2-5$。$2\\times 4=8$ を**外に出すとき符号に注意**。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "1. $a\\neq1$ なら先に $a$ でくくる\n2. $x$ の係数の半分の 2 乗を足して引く\n3. 括弧を $(x-p)^2$ の形にまとめる\n4. 頂点 $(p,q)$、軸 $x=p$ を読み取る",
      },
    ],
    checkQuestions: [
      {
        question: "$y=x^2+6x+5$ を平方完成して頂点を求めよ。",
        answer: "$y=(x+3)^2-4$、頂点 $(-3,-4)$。",
        hint: "$6\\div2=3$、$3^2=9$ を足して引く。",
      },
      {
        question: "$y=2x^2-4x+7$ の頂点を求めよ。",
        answer: "$y=2(x-1)^2+5$、頂点 $(1,5)$。",
        hint: "先に $2$ でくくる。",
      },
    ],
    relatedPracticeLinks: [
      { label: "平方完成 演習", href: "/units/quadratic-functions", description: "難易度A問題から" },
      { label: "共通テスト 数学IA 演習", href: "/common-test/math-1a", description: "共通テスト対策" },
    ],
    qualityTags: ["途中式あり", "よくあるミスあり", "確認問題2問"],
  },
  {
    lessonId: "quadratic-max-min-basic",
    lessonTitle: "最大値・最小値の考え方",
    lessonDescription: "定義域がないとき、頂点から最大・最小を読み取る基本を理解する。",
    level: "beginner",
    estimatedMinutes: 15,
    prerequisites: ["平方完成とグラフ"],
    goals: [
      "定義域が実数全体のときの最大・最小を正しく答えられる",
      "下に凸と上に凸で最小・最大が入れ替わることを理解する",
    ],
    lessonBlocks: [
      {
        kind: "concept",
        title: "頂点＝最小値（または最大値）の場所",
        body: "$a>0$ の放物線（下に凸）は頂点で**最小値**をとり、最大値はない（$+\\infty$）。$a<0$（上に凸）は頂点で**最大値**をとり、最小値はない（$-\\infty$）。",
      },
      {
        kind: "workedExample",
        title: "例：$y=x^2-2x+3$ の最小値",
        body: "$y=(x-1)^2+2$。頂点 $(1,2)$、$a=1>0$ なので $x=1$ で最小値 $2$ をとる。最大値はない。",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：最大・最小の言い方",
        body: "「最小値は $2$」が正しい表現。「最小値は $x=1$ のとき $2$」も可。「最大値はない（存在しない）」と明記することも大切です。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 定義域が全実数のとき → 頂点を求めれば OK\n- $a>0$：最小値は $q$（頂点の $y$ 座標）、最大値なし\n- $a<0$：最大値は $q$、最小値なし",
      },
      {
        kind: "nextStep",
        title: "次は「定義域つき最大最小」へ（中級者講座）",
        body: "定義域がある場合は、軸の位置と定義域の関係で場合分けが必要になります。",
      },
    ],
    checkQuestions: [
      {
        question: "$y=-x^2+4x-1$ の最大値を求めよ。",
        answer: "$y=-(x-2)^2+3$、最大値 $3$（$x=2$ のとき）。",
        hint: "$a<0$ なので最大値をもつ。頂点を求める。",
      },
    ],
    relatedPracticeLinks: [
      { label: "最大・最小 演習", href: "/units/quadratic-functions", description: "難易度A〜B問題" },
      { label: "共通テスト 数学IA", href: "/common-test/math-1a" },
    ],
    qualityTags: ["途中式あり", "よくあるミスあり"],
  },
];

const QUADRATIC_STANDARD: CourseLesson[] = [
  {
    lessonId: "quadratic-max-min-domain",
    lessonTitle: "定義域つき最大最小",
    lessonDescription: "定義域に制限があるとき、軸の位置を場合分けして最大・最小を求める。",
    level: "standard",
    estimatedMinutes: 25,
    prerequisites: ["平方完成とグラフ", "最大値・最小値の考え方"],
    goals: [
      "定義域 $a\\leq x\\leq b$ のとき、軸の位置で3ケースに分けて考えられる",
      "「軸が定義域の左・中・右」でそれぞれ最大・最小を正しく答えられる",
    ],
    lessonBlocks: [
      {
        kind: "intro",
        title: "定義域があるとグラフが「切り取られる」",
        body: "$1\\leq x\\leq4$ という制限があると、放物線の一部しか使えません。この「切り取られた部分」の最大・最小を求めます。",
      },
      {
        kind: "strategy",
        title: "3ケースの場合分け",
        body: "頂点の軸 $x=p$ と定義域 $[a,b]$ の位置関係で3つに分けます。\n\n1. **軸が左端より外（$p<a$）**：定義域内で単調増加 → 最小は $x=a$、最大は $x=b$\n2. **軸が定義域内（$a\\leq p\\leq b$）**：頂点が最小（または最大）\n3. **軸が右端より外（$p>b$）**：定義域内で単調減少 → 最小は $x=b$、最大は $x=a$",
      },
      {
        kind: "workedExample",
        title: "例：$1\\leq x\\leq4$ での $y=x^2-2x+3$ の最大・最小",
        body: "$y=(x-1)^2+2$、軸 $x=1$。定義域 $[1,4]$ に軸 $x=1$ が左端に一致。\n- 最小値：$x=1$ で $y=2$\n- 最大値：軸から最も遠い $x=4$ で $y=16-8+3=11$",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：最大値の場所を間違える",
        body: "「最大値は両端のどちらか大きい方」が基本。軸から遠い端点で最大になります。$x=1$ と $x=4$ のどちらが軸 $x=1$ から遠いかを確認。$|4-1|=3>|1-1|=0$ なので $x=4$。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 軸が定義域の外 → 端点で最大・最小\n- 軸が定義域の内 → 頂点が最小（$a>0$）か最大（$a<0$）\n- 最大は「軸から最も遠い端点」を確認",
      },
    ],
    checkQuestions: [
      {
        question: "$-1\\leq x\\leq3$ での $y=x^2-2x-3$ の最大値・最小値を求めよ。",
        answer: "最小値：$x=1$ で $-4$。最大値：$x=-1$ で $0$（$|-1-1|=2 > |3-1|=2$ なので両端を確認、$x=-1$ で $0$、$x=3$ で $0$、同じなので最大値 $0$）。",
        hint: "軸は $x=1$、定義域 $[-1,3]$ の中間。両端 $x=-1,3$ で $y$ を計算。",
      },
    ],
    relatedPracticeLinks: [
      { label: "定義域つき最大最小 演習", href: "/units/quadratic-functions" },
      { label: "共通テスト 数学IA", href: "/common-test/math-1a" },
    ],
    qualityTags: ["場合分け", "途中式あり", "よくあるミスあり"],
  },
  {
    lessonId: "quadratic-param-function",
    lessonTitle: "文字を含む二次関数",
    lessonDescription: "係数に文字パラメータが入るとき、軸の位置が変わり場合分けが必要になる。",
    level: "standard",
    estimatedMinutes: 30,
    prerequisites: ["定義域つき最大最小"],
    goals: [
      "パラメータ $a$ が変わると軸 $x=a$ が動くことを理解する",
      "場合分けの境界を「軸が定義域に入るかどうか」で設定できる",
    ],
    lessonBlocks: [
      {
        kind: "concept",
        title: "軸が「動く」とき",
        body: "$y=x^2-2ax+1$ （$a$ は定数）の軸は $x=a$。$a$ の値によって軸の位置が変わります。定義域 $0\\leq x\\leq2$ が固定されていれば、$a$ の範囲で3つの場合に分けます。",
      },
      {
        kind: "strategy",
        title: "場合分けの立て方",
        body: "軸 $x=a$ と定義域 $[0,2]$ の関係で分類。\n- $a<0$：軸が左端より外\n- $0\\leq a\\leq2$：軸が定義域内\n- $a>2$：軸が右端より外\n\n各場合について最小値（または最大値）の式を $a$ で表します。",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：境界の等号",
        body: "「$a=0$ と $a=2$ はどちらに含むか？」→ どちらの場合式で計算しても同じ値になるので、どちらに含めても正解。ただし、重複や漏れのない分類が大切。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 軸（$x=$ 何か）がパラメータを含む場合 → 軸と定義域の位置関係で場合分け\n- 各ケースの最小値を $a$ の式で表す\n- 解答には「$a<0$ のとき〜、$0\\leq a\\leq2$ のとき〜、$a>2$ のとき〜」と明記",
      },
    ],
    checkQuestions: [
      {
        question: "$0\\leq x\\leq4$ で $y=x^2-2ax+a^2+1$ の最小値を $a$ を用いて表せ。",
        answer: "$a<0$ のとき $x=0$ で最小値 $a^2+1$、$0\\leq a\\leq4$ のとき $x=a$ で最小値 $1$、$a>4$ のとき $x=4$ で最小値 $(4-a)^2+1$。",
        hint: "頂点は $(a, 1)$。定義域との関係で3ケース。",
      },
    ],
    relatedPracticeLinks: [
      { label: "文字係数 二次関数 演習", href: "/units/quadratic-functions" },
      { label: "共通テスト 数学IA", href: "/common-test/math-1a" },
    ],
    qualityTags: ["場合分け", "パラメータ", "途中式あり"],
  },
  {
    lessonId: "quadratic-case-analysis",
    lessonTitle: "場合分けの考え方",
    lessonDescription: "場合分けが必要な状況を見抜き、漏れ・重複のない分類ができるようになる。",
    level: "standard",
    estimatedMinutes: 20,
    prerequisites: ["文字を含む二次関数"],
    goals: [
      "場合分けの「境界」をどこに置くかを論理的に決められる",
      "答えを $a$ の各範囲ごとに整理して書ける",
    ],
    lessonBlocks: [
      {
        kind: "strategy",
        title: "場合分けが必要な3つのパターン",
        body: "1. 軸の位置が定義域に対して変化する\n2. 二次方程式 $ax^2+bx+c=0$ の判別式 $D$ の正負\n3. 最大・最小が端点か頂点かで変わる\n\n「何が変わると何が変わるか」を意識することが重要。",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：場合分けの漏れ",
        body: "「$a=0$ のとき」を忘れる。$a=0$ だと二次関数でなく一次関数（または定数）になるので、別扱いが必要な問題があります。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 場合分けは「境界値を含む/含まない」を明示する\n- 各ケースが過不足なく全体をカバーしているか確認\n- 答えは各ケースごとに式と条件をセットで書く",
      },
    ],
    checkQuestions: [
      {
        question: "$y=ax^2+2x-3$ （$a\\neq0$）の頂点の $y$ 座標を $a$ で表せ。",
        answer: "$-\\frac{1}{a}-3$。",
        hint: "頂点の $x$ 座標は $-\\frac{1}{a}$。",
      },
    ],
    relatedPracticeLinks: [
      { label: "場合分け 演習", href: "/units/quadratic-functions" },
      { label: "共通テスト 数学IA 本番演習", href: "/common-test/simulator" },
    ],
    qualityTags: ["場合分け", "よくあるミスあり"],
  },
];

const QUADRATIC_ADVANCED: CourseLesson[] = [
  {
    lessonId: "quadratic-construct-from-conditions",
    lessonTitle: "条件から式を作る",
    lessonDescription: "「通る点」「頂点」「軸」などの条件から $a,b,c$ を連立方程式で求める。",
    level: "advanced",
    estimatedMinutes: 25,
    prerequisites: ["文字を含む二次関数", "場合分けの考え方"],
    goals: [
      "与えられた条件を $a(x-p)^2+q$ や $y=ax^2+bx+c$ の係数についての方程式に翻訳できる",
      "3条件（頂点・通る点 2 つなど）から連立方程式を立てて解ける",
    ],
    lessonBlocks: [
      {
        kind: "strategy",
        title: "条件→方程式の翻訳",
        body: "通る点 $(x_0,y_0)$ → $y_0=ax_0^2+bx_0+c$\n頂点 $(p,q)$ → $b=-2ap,\\ c=ap^2+q$（頂点形式を展開）\n$x$ 軸との交点 $\\alpha,\\beta$ → $y=a(x-\\alpha)(x-\\beta)$\n\n「どの形に置くと楽か」を選ぶのが技術です。",
      },
      {
        kind: "workedExample",
        title: "例：頂点 $(1,-3)$ で点 $(3,5)$ を通る二次関数",
        body: "頂点形式 $y=a(x-1)^2-3$ に $(3,5)$ を代入：$5=4a-3$ → $a=2$。よって $y=2(x-1)^2-3=2x^2-4x-1$。",
      },
      {
        kind: "strategy",
        title: "3点を通る場合",
        body: "$y=ax^2+bx+c$ に3点を代入して連立3元1次方程式。加減法・代入法で解くか、差を取って $a,b$ を消去する技法が有効。",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：軸の条件",
        body: "「軸が $x=2$」は $b=-2a\\cdot2=-4a$ を意味します。これを $b=2$ と混同しないこと。軸の情報は $b$ と $a$ の関係式であって、$b$ の値ではありません。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 頂点既知 → $y=a(x-p)^2+q$ を使う\n- $x$ 切片既知 → $y=a(x-\\alpha)(x-\\beta)$ を使う\n- 3点既知 → $y=ax^2+bx+c$ に代入して連立",
      },
    ],
    checkQuestions: [
      {
        question: "$x$ 軸と $x=1$、$x=3$ で交わり、点 $(0,-3)$ を通る二次関数を求めよ。",
        answer: "$y=-x^2+4x-3$。",
        hint: "$y=a(x-1)(x-3)$ と置き、$(0,-3)$ を代入。",
      },
    ],
    relatedPracticeLinks: [
      { label: "二次関数の決定 演習", href: "/units/quadratic-functions" },
      { label: "共通テスト 数学IA 本番演習", href: "/common-test/simulator" },
      { label: "過去問道場（二次関数）", href: "/dojo" },
    ],
    qualityTags: ["入試標準", "連立方程式", "よくあるミスあり"],
  },
  {
    lessonId: "quadratic-max-min-no-guidance",
    lessonTitle: "誘導なしで最大最小を攻める",
    lessonDescription: "場合分けの境界設定から答えの整理まで、誘導なしで自力で完成させる。",
    level: "advanced",
    estimatedMinutes: 30,
    prerequisites: ["定義域つき最大最小", "文字を含む二次関数"],
    goals: [
      "「どこで場合分けするか」を自分で決められる",
      "場合分け → 各ケースの最大最小 → まとめ、を途切れず実行できる",
    ],
    lessonBlocks: [
      {
        kind: "strategy",
        title: "誘導なし問題の解き方",
        body: "1. 平方完成して頂点・軸を確認\n2. 「何が変化しているか」（軸か定義域か）を特定\n3. 場合分けの境界を設定\n4. 各ケースで最大・最小を求める\n5. 答えを $a$ や $t$ などのパラメータで整理して書く",
      },
      {
        kind: "workedExample",
        title: "例：$0\\leq x\\leq2$ で $f(x)=x^2-2tx+1$（$t$：実数）の最小値",
        body: "$f(x)=(x-t)^2+1-t^2$、軸 $x=t$。\n- $t<0$：軸左外 → 最小は $x=0$、$f(0)=1$\n- $0\\leq t\\leq2$：軸定義域内 → 最小は $x=t$、$f(t)=1-t^2$\n- $t>2$：軸右外 → 最小は $x=2$、$f(2)=5-4t$",
      },
      {
        kind: "commonMistake",
        title: "よくあるミス：ケースの境界で値が連続か確認しない",
        body: "良い答案は各ケースの境界 $t=0,t=2$ で式が連続することを確認しています。$t=0$：$1$ と $1-0=1$ → 一致。$t=2$：$1-4=-3$ と $5-8=-3$ → 一致。これで分類に矛盾がないと確認できます。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 軸の場所でなく「軸がどこに来るか」という問いを自分で立てる\n- 境界での連続性チェックが答案の信頼度を上げる\n- 答えは「$t<0$ のとき〜」と条件を必ず書く",
      },
    ],
    checkQuestions: [
      {
        question: "$-1\\leq x\\leq1$ で $f(x)=x^2+2ax+1$（$a$：実数）の最大値を求めよ。",
        answer: "$a<-1$：最大値 $f(1)=2+2a$（ただし $2+2a>f(-1)=2-2a$ となるのは $a>0$… ）\n\n正しくは：$f(-1)=2-2a$、$f(1)=2+2a$、頂点 $f(-a)=1-a^2$（軸 $x=-a$）。\n- $-a<-1$（$a>1$）：最大 $x=1$ で $2+2a$\n- $-1\\leq-a\\leq1$（$-1\\leq a\\leq1$）：最大は両端の大きい方 → $a\\geq0$ なら $x=1$ で $2+2a$、$a<0$ なら $x=-1$ で $2-2a$\n- $-a>1$（$a<-1$）：最大 $x=-1$ で $2-2a$",
        hint: "軸は $x=-a$。定義域との関係で場合分け。",
      },
    ],
    relatedPracticeLinks: [
      { label: "発展問題 演習", href: "/units/quadratic-functions" },
      { label: "共通テスト 本番演習", href: "/common-test/simulator" },
      { label: "段階復習キュー", href: "/common-test/review" },
    ],
    qualityTags: ["入試標準", "場合分け", "誘導なし", "よくあるミスあり"],
  },
  {
    lessonId: "quadratic-exam-standard",
    lessonTitle: "入試標準問題の切り崩し",
    lessonDescription: "実力を試す入試標準レベルの問題で、典型手法を組み合わせる戦略を学ぶ。",
    level: "advanced",
    estimatedMinutes: 35,
    prerequisites: ["条件から式を作る", "誘導なしで最大最小を攻める"],
    goals: [
      "複数の手法（頂点形式・因数分解・二次方程式との組み合わせ）を使い分けられる",
      "問題文から「何を求めているか」を整理して解法を選べる",
    ],
    lessonBlocks: [
      {
        kind: "intro",
        title: "入試標準問題の特徴",
        body: "入試標準レベルの二次関数問題は、①条件設定→②式の構築→③場合分け・計算→④整理、の4ステップが絡み合います。過去問本文のコピーは使いませんが、同等の思考が必要なオリジナル問題で練習します。",
      },
      {
        kind: "strategy",
        title: "頻出組み合わせパターン",
        body: "**パターン1：グラフと直線の交点**\n$y=x^2-2x$ と $y=ax+b$ の交点 → $x^2-(2+a)x-b=0$ の判別式を使う\n\n**パターン2：解の配置**\n$f(x)=0$ の解が特定の範囲にある条件 → $f(a)>0$、$f(b)>0$、頂点の $y<0$ などの連立条件\n\n**パターン3：最大最小の最大最小**\n$t$ を動かすときの最小値 $m(t)$ のさらなる最大を求める",
      },
      {
        kind: "workedExample",
        title: "例題（オリジナル問題）：解の配置",
        body: "$f(x)=x^2-ax+a-1$ が $0<x<2$ に 2 解をもつ条件を求めよ。\n\n条件：$f(0)>0$、$f(2)>0$、$0<\\frac{a}{2}<2$（軸が区間内）、$D>0$。\n- $f(0)=a-1>0$ → $a>1$\n- $f(2)=4-2a+a-1=3-a>0$ → $a<3$\n- $0<\\frac{a}{2}<2$ → $0<a<4$\n- $D=a^2-4(a-1)=a^2-4a+4=(a-2)^2\\geq0$（常に成立）\n\n合わせると $1<a<3$。",
      },
      {
        kind: "summary",
        title: "まとめ",
        body: "- 解の配置問題は「端点の値・軸の位置・判別式」の3条件を立てる\n- グラフと直線の交点は判別式で本数を議論\n- 複合問題では「何の条件か」を一つずつ整理してから計算する",
      },
    ],
    checkQuestions: [
      {
        question: "$x^2-ax+a=0$ が $1<x<4$ に少なくとも 1 解をもつ条件を求めよ。",
        answer: "… （Phase20で詳細を補完予定）",
        hint: "$f(x)=x^2-ax+a$として $f(1)$ と $f(4)$ の符号、軸の位置を調べる。",
      },
    ],
    relatedPracticeLinks: [
      { label: "発展・難問 演習", href: "/units/quadratic-functions" },
      { label: "過去問道場", href: "/dojo" },
      { label: "共通テスト 本番演習", href: "/common-test/simulator" },
      { label: "段階復習・類題演習", href: "/common-test/review" },
    ],
    qualityTags: ["入試標準", "解の配置", "複合問題", "Phase20補完予定"],
  },
];

const QUADRATIC_UNIT: CourseUnit = {
  unitId: "quadratic",
  subjectId: "math-1a",
  unitTitle: "二次関数",
  unitDescription:
    "放物線の形から解の配置まで。共通テスト・入試で最頻出の単元を3段階で完全攻略する。",
  lessons: [
    ...QUADRATIC_BEGINNER,
    ...QUADRATIC_STANDARD,
    ...QUADRATIC_ADVANCED,
  ],
};

// ─── 数学IA 科目 ────────────────────────────────────────────────────────────

const MATH_1A: CourseSubject = {
  subjectId: "math-1a",
  subjectName: "数学IA",
  description: "数と式・図形・確率・データ分析。共通テスト数学IAを軸に、基礎から入試標準まで体系的に学ぶ。",
  color: "#2563eb",
  units: [
    QUADRATIC_UNIT,
    // 今後追加予定: 場合の数と確率、図形と計量、集合と命題、整数の性質 …
  ],
};

// ─── 数学IIB 科目（準備中） ──────────────────────────────────────────────────

const MATH_2BC: CourseSubject = {
  subjectId: "math-2bc",
  subjectName: "数学II・B・C",
  description: "三角関数・指数対数・微積分・数列・ベクトル。共通テスト数学II・B・Cを体系的に学ぶ。",
  color: "#7c3aed",
  units: [
    // 今後追加予定: 三角関数、指数・対数、微分・積分、数列、ベクトル …
  ],
};

// ─── 英語R 科目（準備中） ────────────────────────────────────────────────────

const ENGLISH_READING: CourseSubject = {
  subjectId: "english-reading",
  subjectName: "英語リーディング",
  description: "速読・精読・語彙・文法。共通テスト英語リーディングを速度・精度の両面から強化する。",
  color: "#059669",
  units: [
    // 今後追加予定: 速読トレーニング、長文読解、語彙・熟語 …
  ],
};

// ─── エクスポート ────────────────────────────────────────────────────────────

export const COURSE_SUBJECTS: CourseSubject[] = [
  MATH_1A,
  MATH_2BC,
  ENGLISH_READING,
];

export const COURSE_SUBJECT_MAP: Record<string, CourseSubject> = Object.fromEntries(
  COURSE_SUBJECTS.map((s) => [s.subjectId, s]),
);

export function getCourseSubject(subjectId: string): CourseSubject | undefined {
  return COURSE_SUBJECT_MAP[subjectId];
}

export function getCourseUnit(subjectId: string, unitId: string): CourseUnit | undefined {
  return getCourseSubject(subjectId)?.units.find((u) => u.unitId === unitId);
}
