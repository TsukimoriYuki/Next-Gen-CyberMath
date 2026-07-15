import type { CourseLesson, CourseUnit } from "@/types/course";

const PSEUDOCODE_RULES =
  "共通規則：←は代入、=は等価比較を表す。配列の添字は1から始める。『iをaからbまで』はaとbを含む。÷は通常の除算、divは小数部分を切り捨てる整数除算とする。random(a, b)はa以上b以下の整数を同じ確率で返す。";

function programmingLesson(input: {
  lessonId: string;
  lessonTitle: string;
  lessonDescription: string;
  estimatedMinutes: number;
  prerequisites: string[];
  goals: string[];
  conceptTitle: string;
  concept: string;
  pseudocodeTitle: string;
  pseudocode: string;
  traceColumns: string[];
  traceRows: string[][];
  exampleTitle: string;
  example: string;
  mistakes: string;
  summary: string;
  nextStep: string;
  checks: readonly [string, string, string?][];
  practiceId: string;
  tags: string[];
}): CourseLesson {
  return {
    lessonId: input.lessonId,
    lessonTitle: input.lessonTitle,
    lessonDescription: input.lessonDescription,
    level: "beginner",
    estimatedMinutes: input.estimatedMinutes,
    prerequisites: input.prerequisites,
    goals: input.goals,
    lessonBlocks: [
      {
        kind: "intro",
        title: "この講座で使う擬似コード",
        body: `${PSEUDOCODE_RULES} 特定の言語の書き方を覚えるのではなく、値が変化する順序と条件を正確に追います。`,
      },
      {
        kind: "concept",
        title: input.conceptTitle,
        body: input.concept,
      },
      {
        kind: "workedExample",
        title: input.pseudocodeTitle,
        body: `${input.pseudocode}\n\n${PSEUDOCODE_RULES}`,
      },
      {
        kind: "comparisonTable",
        title: "トレース表で値の変化を確かめる",
        body:
          "各命令を実行した直後の値を1行ずつ記録します。頭の中だけで追わず、変化した列だけでなく必要な状態を残すと、条件や反復の読み違いを防げます。",
        columns: input.traceColumns,
        rows: input.traceRows.map((cells) => ({ cells })),
      },
      {
        kind: "workedExample",
        title: input.exampleTitle,
        body: input.example,
      },
      {
        kind: "commonMistake",
        title: "よくある誤解",
        body: input.mistakes,
      },
      {
        kind: "summary",
        title: "まとめ",
        body: input.summary,
      },
      {
        kind: "nextStep",
        title: "次に学ぶ内容",
        body: input.nextStep,
      },
    ],
    checkQuestions: input.checks.map(([question, answer, hint]) => ({
      question,
      answer,
      hint,
    })),
    relatedPracticeLinks: [
      {
        label: `${input.lessonTitle}の演習へ`,
        href: `/informatics/problems/${input.practiceId}`,
        description: "講座の規則を使い、値や処理の流れを自分で追って確認します。",
      },
    ],
    qualityTags: ["original", "informatics-1", "sprint-3", ...input.tags],
  };
}

export const PROGRAMMING_ALGORITHMS_UNIT: CourseUnit = {
  unitId: "programming-algorithms",
  subjectId: "informatics-1",
  unitTitle: "プログラミングとアルゴリズム",
  unitDescription:
    "変数、条件分岐、反復、配列、関数、探索、並べ替え、乱数を使うシミュレーションを、規則を明示した擬似コードとトレース表で学びます。",
  lessons: [
    programmingLesson({
      lessonId: "variables-expressions-io",
      lessonTitle: "変数・式・入力と出力",
      lessonDescription:
        "変数への代入、定数、四則・比較・論理演算、入力と出力、式の評価順序を、値の変化を追いながら学びます。",
      estimatedMinutes: 35,
      prerequisites: ["整数と小数の四則計算", "真・偽という2通りの判断"],
      goals: [
        "変数と定数の違いを説明し、代入後の値を追える",
        "四則演算・比較演算・論理演算の評価順序を読める",
        "入力、処理、出力を分けて簡単な擬似コードを説明できる",
      ],
      conceptTitle: "変数は値に名前を付けた入れ物",
      concept:
        "変数は処理中に変わり得る値を名前で参照する仕組みです。`x ← 5`はxに5を代入し、続く`x ← x + 2`は代入前のxを使って7を計算してから置き換えます。定数は円周率や料金の基準値のように処理中に変えない値です。四則演算では括弧、乗除、加減の順に評価し、比較演算は真または偽、論理演算and・or・notはその真偽を組み合わせます。入力は外部から値を受け取り、出力は結果を外へ示す命令です。",
      pseudocodeTitle: "入力した単価と個数から税込み金額を出す",
      pseudocode:
        "```text\n定数 taxRate ← 0.10\n入力 price\n入力 count\nsubtotal ← price × count\ntotal ← subtotal × (1 + taxRate)\n出力 total\n```\n定数taxRateは変えず、入力値を変数へ受け取ります。例えばprice=800、count=3ならsubtotal=2400、total=2640です。",
      traceColumns: ["実行後", "price", "count", "subtotal", "total"],
      traceRows: [
        ["入力 price", "800", "—", "—", "—"],
        ["入力 count", "800", "3", "—", "—"],
        ["subtotalを代入", "800", "3", "2400", "—"],
        ["totalを代入", "800", "3", "2400", "2640"],
      ],
      exampleTitle: "式の評価順序と論理演算",
      example:
        "`a ← 2 + 3 × 4`は乗算を先に行うので14です。`b ← (2 + 3) × 4`は括弧を先に行うので20です。a=14のとき、`a >= 10 and a < 20`は両方が真なので真、`not(a = 14)`は真を反転して偽です。比較と論理演算は、条件分岐で処理を選ぶ材料になります。",
      mistakes:
        "- **←を等しいという式と読む** — ←は右辺を先に計算し、左の変数を更新する命令です。\n- **x ← x + 1は矛盾する** — 等式ではなく更新なので、現在値を1増やします。\n- **入力と出力を同じと考える** — 入力は値を受け取り、出力は処理結果を示します。\n- **andとorを混同する** — andは両方が真、orは少なくとも一方が真です。",
      summary:
        "代入では右辺を評価してから変数を更新します。式は括弧、乗除、加減を基本の順序として評価し、比較は真偽を作り、論理演算は真偽を組み合わせます。入力・処理・出力を分けるとプログラムの目的が見えます。",
      nextStep:
        "比較や論理演算で作った条件を使い、処理を選ぶ条件分岐と、同じ処理を安全に繰り返す反復へ進みます。",
      checks: [
        ["x ← 4、x ← x × 3の後のxは何ですか。", "12です。2行目では代入前の4を3倍してからxを更新します。"],
        ["3 + 2 × 5と(3 + 2) × 5の値を答えてください。", "前者は13、後者は25です。", "括弧と乗算の優先順位を確認します。"],
        ["a=8のとき、a>5 and a<10は真ですか。", "両方の比較が真なので、全体も真です。"],
      ],
      practiceId: "joho-prog-assignment-value",
      tags: ["variables", "expressions", "input-output"],
    }),
    programmingLesson({
      lessonId: "branching-loops",
      lessonTitle: "条件分岐と反復処理",
      lessonDescription:
        "if・if/else、複数条件、for・while相当の反復を使い、合計・件数・最大値を安全に求めます。",
      estimatedMinutes: 40,
      prerequisites: ["変数への代入", "比較演算とand・or・not"],
      goals: [
        "条件に応じてifとif/elseを使い分けられる",
        "反復の範囲と回数を正確に数えられる",
        "合計・件数・最大値を更新する変数の初期値を説明できる",
        "whileの条件をいつ偽にするか確認し、無限ループを避けられる",
      ],
      conceptTitle: "選ぶ処理と繰り返す処理",
      concept:
        "ifは条件が真のときだけ処理し、if/elseは真と偽でどちらか一方を処理します。複数条件はand・or・notで組み合わせます。for相当の反復は回数や範囲が先に分かるとき、while相当は終了条件を満たすまで繰り返すときに向きます。合計は0、件数は0から始め、最大値や最小値は実データの最初の値から始めると安全です。",
      pseudocodeTitle: "1から5までの偶数だけを合計する",
      pseudocode:
        "```text\nsum ← 0\ncount ← 0\niを1から5まで繰り返す\n  もし i mod 2 = 0 ならば\n    sum ← sum + i\n    count ← count + 1\n  ここまで\nここまで\n出力 sum, count\n```\nmodは整数除算の余りです。2と4だけが条件を満たすため、sum=6、count=2になります。",
      traceColumns: ["i", "i mod 2", "条件", "sum", "count"],
      traceRows: [
        ["1", "1", "偽", "0", "0"],
        ["2", "0", "真", "2", "1"],
        ["3", "1", "偽", "2", "1"],
        ["4", "0", "真", "6", "2"],
        ["5", "1", "偽", "6", "2"],
      ],
      exampleTitle: "whileの終了条件を先に決める",
      example:
        "`n ← 1`から始め、`n < 20`の間、`n ← n × 2`を繰り返すと、nは1→2→4→8→16→32と変化します。32で条件が偽になるため5回で終了します。更新命令を忘れるとnは1のままで条件が真のままになり、無限ループになります。",
      mistakes:
        "- **1から5までを4回と数える** — この講座では両端を含むので5回です。\n- **sumを毎回0へ戻す** — 初期化は反復の前に1回だけ行います。\n- **最大値を常に0から始める** — 全データが負なら誤るため、最初の実データを使います。\n- **whileの条件だけを見る** — 反復中に条件が偽へ近づく更新があるかも確認します。",
      summary:
        "条件分岐は真偽で処理を選び、反復は範囲または終了条件まで処理を繰り返します。初期値、更新する位置、端点を含むかを明確にし、whileでは必ず終了へ近づく更新を確認します。",
      nextStep:
        "複数の値を配列にまとめて走査し、合計・最大値・条件に合う件数を求めます。まとまった処理を関数へ分ける考え方にも進みます。",
      checks: [
        ["1から7までを両端を含めて繰り返す回数は何回ですか。", "7回です。"],
        ["合計と件数を求める変数の初期値は通常いくつですか。", "どちらも0から始めます。"],
        ["whileで無限ループを避けるための確認点は何ですか。", "反復中に条件がいつか偽になるよう、判定に使う値が更新されているか確認します。"],
      ],
      practiceId: "joho-prog-branch-output",
      tags: ["branch", "loop", "counter"],
    }),
    programmingLesson({
      lessonId: "arrays-functions-decomposition",
      lessonTitle: "配列・関数・プログラムの分割",
      lessonDescription:
        "配列の添字と走査、合計・最大値・件数の集計、関数の引数・戻り値・局所変数を学びます。",
      estimatedMinutes: 40,
      prerequisites: ["条件分岐", "範囲を指定した反復"],
      goals: [
        "配列の有効な添字を確認して全要素を走査できる",
        "配列から合計・最大値・条件に合う件数を求められる",
        "関数の引数と戻り値を区別できる",
        "処理を役割ごとに分ける利点と局所変数の範囲を説明できる",
      ],
      conceptTitle: "配列で同じ種類の値を順番に扱う",
      concept:
        "配列は複数の値を1つの名前と添字で管理します。この講座ではA[1]が先頭です。要素数が5なら有効な添字は1〜5で、A[0]やA[6]へのアクセスは範囲外です。全要素へ同じ処理をすることを走査と呼びます。関数は処理に名前を付けたまとまりで、引数として値を受け取り、結果を戻り値として返せます。関数内だけで使う局所変数は外部の同名変数と分けて考えます。",
      pseudocodeTitle: "配列の平均を返す関数",
      pseudocode:
        "```text\n関数 average(A, n)\n  sum ← 0\n  iを1からnまで繰り返す\n    sum ← sum + A[i]\n  ここまで\n  戻り値 sum ÷ n\n関数ここまで\n\nscores ← [72, 84, 90, 64]\n出力 average(scores, 4)\n```\nAとnが引数、sumとiが関数内の局所変数、77.5が戻り値です。",
      traceColumns: ["i", "A[i]", "加算後sum"],
      traceRows: [
        ["1", "72", "72"],
        ["2", "84", "156"],
        ["3", "90", "246"],
        ["4", "64", "310"],
      ],
      exampleTitle: "最大値と条件に合う件数",
      example:
        "A=[-4,-9,-2,-7]の最大値はA[1]=-4で初期化します。その後A[2]〜A[4]と比較すると、-2で最大値を更新します。0で初期化すると、配列に存在しない0を誤って最大値にしてしまいます。60以上の件数を求めるならcount=0から始め、条件が真の要素ごとに1増やします。",
      mistakes:
        "- **要素数5の配列でA[5]は範囲外** — この講座は1始まりなのでA[1]〜A[5]が有効です。\n- **戻り値と出力は同じ** — 戻り値は呼び出し元へ渡す値、出力は画面など外部へ示す処理です。\n- **局所変数はどこからでも使える** — 原則として定義された関数内だけで使います。\n- **一つの長い処理の方が速く書ける** — 役割で分けると確認・再利用・修正がしやすくなります。",
      summary:
        "配列は有効な添字を守って走査します。合計・件数は0、最大・最小は最初の実データから始めます。関数は引数を受け取り、戻り値を返し、処理を役割ごとに分けます。",
      nextStep:
        "配列から目的の値を探す線形探索と、整列済み配列を半分ずつ絞る二分探索を比較し、並べ替えやシミュレーションへ進みます。",
      checks: [
        ["要素数6の1始まり配列で有効な添字は何から何までですか。", "1から6までです。"],
        ["全て負の配列の最大値を0で初期化してはいけないのはなぜですか。", "配列にない0を最大値として残す可能性があるからです。"],
        ["関数の引数と戻り値の役割を答えてください。", "引数は関数へ渡す値、戻り値は関数から呼び出し元へ返す結果です。"],
      ],
      practiceId: "joho-prog-array-sum",
      tags: ["array", "function", "decomposition"],
    }),
    programmingLesson({
      lessonId: "algorithms-search-simulation",
      lessonTitle: "アルゴリズム・探索・シミュレーション",
      lessonDescription:
        "線形探索と二分探索、単純な並べ替え、処理回数、乱数を使うシミュレーションを比較します。",
      estimatedMinutes: 45,
      prerequisites: ["配列の走査", "条件分岐と反復", "関数の基本"],
      goals: [
        "問題を解く有限の手順としてアルゴリズムを説明できる",
        "線形探索と二分探索の前提・処理回数の違いを説明できる",
        "単純な交換による並べ替えをトレースできる",
        "乱数シミュレーションの確定部分と結果のばらつきを区別できる",
      ],
      conceptTitle: "正しい手順を条件に合わせて選ぶ",
      concept:
        "アルゴリズムは、入力から目的の出力を得るための、明確で有限な手順です。線形探索は先頭から順に調べるので未整列データにも使えます。二分探索は中央と比較して範囲を半分ずつ狭めますが、データが整列済みであることが前提です。データ数が増えると、線形探索の最悪の比較回数はほぼデータ数と同じように増え、二分探索はより緩やかに増えます。",
      pseudocodeTitle: "整列済み配列を二分探索する",
      pseudocode:
        "```text\nleft ← 1\nright ← 7\n見つかるまで繰り返す\n  mid ← (left + right) div 2\n  もし A[mid] = target ならば midを出力して終了\n  そうでなく A[mid] < target ならば left ← mid + 1\n  そうでなければ right ← mid - 1\nここまで\n```\nA=[3,8,12,19,27,31,44]、target=27ならmidは4、次に6、次に5となり3回で見つかります。",
      traceColumns: ["回", "left", "right", "mid", "A[mid]", "判断"],
      traceRows: [
        ["1", "1", "7", "4", "19", "右半分へ"],
        ["2", "5", "7", "6", "31", "左半分へ"],
        ["3", "5", "5", "5", "27", "発見"],
      ],
      exampleTitle: "乱数によるシミュレーション",
      example:
        "random(1,6)を2回使えば、さいころを2回振るモデルを作れます。各回で乱数を2個生成することは確定していますが、和が7になる回数は実行ごとに変わります。試行回数を増やすと割合は理論的な値の近くで安定しやすくなりますが、必ず完全一致するわけではありません。現実の条件を単純化したモデルであることも忘れません。",
      mistakes:
        "- **二分探索はどんな配列にも使える** — 整列済みでなければ大小による範囲の切り捨てができません。\n- **比較回数が少ない方法は常に最適** — 事前の並べ替えにかかる手間やデータ更新も考えます。\n- **シミュレーション結果は毎回同じ** — 乱数を使う部分にはばらつきがあります。\n- **試行回数を増やせば現実を完全に再現できる** — モデルの仮定や偏りによる限界は残ります。",
      summary:
        "アルゴリズムは明確で有限な手順です。線形探索は未整列でも使え、二分探索は整列済みデータを半分ずつ絞ります。並べ替えや探索は処理回数だけでなく前提も比較し、乱数シミュレーションは確定する処理とばらつく結果を分けて評価します。",
      nextStep:
        "プログラムで扱うデータが、ネットワーク上でどのように分割・転送され、Webやデータベースで活用されるかを学びます。",
      checks: [
        ["二分探索を使うために必要な前提は何ですか。", "探索対象の配列がキーの順に整列済みであることです。"],
        ["未整列の小さな配列を1回だけ探すときに線形探索が適する理由は何ですか。", "事前に並べ替えず、先頭から比較するだけで使えるからです。"],
        ["乱数シミュレーションで確定する部分とばらつく部分を1つずつ挙げてください。", "例えば各試行で乱数を生成する回数は確定し、条件を満たす回数や割合は実行ごとにばらつきます。"],
      ],
      practiceId: "joho-algo-linear-search",
      tags: ["algorithm", "search", "simulation"],
    }),
  ],
};

export { PSEUDOCODE_RULES };
