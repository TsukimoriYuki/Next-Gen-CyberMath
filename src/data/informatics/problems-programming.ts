import type {
  InformaticsChoice,
  InformaticsDifficulty,
  InformaticsProblem,
  InformaticsProblemKind,
} from "./problem-types";

const RULES =
  "規則：←は代入、=は等価比較。配列の添字は1から始まる。『aからbまで』は両端を含む。divは小数部分を切り捨てる整数除算。random(a, b)はa以上b以下の整数を同じ確率で返す。";

const choice = (id: string, text: string, correct: boolean, reason: string): InformaticsChoice => ({
  id,
  text,
  reason: `${correct ? "正答" : "誤り"}：${reason}`,
});

function problem(input: {
  id: string;
  title: string;
  lessonId: string;
  kind: InformaticsProblemKind;
  difficulty: InformaticsDifficulty;
  prompt: string;
  choices: readonly InformaticsChoice[];
  correctChoiceIds: readonly string[];
  explanation: string;
  solutionProcess: string;
  reviewTags: readonly string[];
  estimatedMinutes?: number;
  pseudocode?: boolean;
}): InformaticsProblem {
  return {
    id: input.id,
    slug: input.id,
    title: input.title,
    lessonId: input.lessonId,
    kind: input.kind,
    difficulty: input.difficulty,
    estimatedMinutes: input.estimatedMinutes ?? (input.difficulty === "ct-prep" ? 5 : 3),
    prompt: input.prompt,
    choices: input.choices,
    correctChoiceIds: input.correctChoiceIds,
    explanation: input.explanation,
    solutionProcess: input.solutionProcess,
    pseudocodeRules: input.pseudocode ? RULES : undefined,
    reviewTags: input.reviewTags,
  };
}

function numberProblem(input: {
  id: string;
  title: string;
  lessonId: string;
  difficulty: InformaticsDifficulty;
  prompt: string;
  answer: number;
  mistake: number;
  mistakeReason: string;
  explanation: string;
  solutionProcess: string;
  reviewTags: readonly string[];
  estimatedMinutes?: number;
  pseudocode?: boolean;
}): InformaticsProblem {
  return {
    ...problem({
      ...input,
      kind: "number",
      choices: [
        choice("answer", String(input.answer), true, "命令を順に追った値と一致する。"),
        choice("mistake", String(input.mistake), false, input.mistakeReason),
      ],
      correctChoiceIds: ["answer"],
    }),
    correctNumber: input.answer,
  };
}

export const PROGRAMMING_PROBLEMS: readonly InformaticsProblem[] = [
  numberProblem({
    id: "joho-prog-assignment-value",
    title: "代入後の変数値",
    lessonId: "variables-expressions-io",
    difficulty: "basic",
    prompt: `${RULES}\n次の処理を実行する。x ← 6、y ← x + 4、x ← y × 2。最後のxを数値で答えなさい。`,
    answer: 20,
    mistake: 16,
    mistakeReason: "最後の式で更新前のx=6を使っており、y=10を使っていない。",
    explanation: "代入は上から順に行い、右辺を計算してから左辺を更新します。yは10、そのyを2倍した20が最後のxです。",
    solutionProcess: "x=6 → y=6+4=10 → x=10×2=20",
    reviewTags: ["変数", "代入", "トレース"],
    pseudocode: true,
  }),
  numberProblem({
    id: "joho-prog-expression-order",
    title: "複数の式の評価",
    lessonId: "variables-expressions-io",
    difficulty: "basic",
    prompt: `${RULES}\na ← 3 + 4 × 2、b ← (a - 1) div 3 とする。bを数値で答えなさい。`,
    answer: 3,
    mistake: 2,
    mistakeReason: "3+4を先に計算しており、乗算の優先順位を誤っている。",
    explanation: "乗算を先に計算してa=11です。次に(11-1) div 3=10 div 3となり、小数部分を切り捨てて3です。",
    solutionProcess: "a=3+(4×2)=11 → b=(11-1) div 3=10 div 3=3",
    reviewTags: ["式", "評価順序", "整数除算"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-input-output-blank",
    title: "入力値を使う式の空欄補充",
    lessonId: "variables-expressions-io",
    kind: "fill-blank",
    difficulty: "standard",
    prompt: `${RULES}\n入力した縦hと横wから長方形の周の長さを出す。\n入力 h、入力 w、perimeter ← □、出力 perimeter\n□に入る式を選びなさい。`,
    choices: [
      choice("a", "2 × (h + w)", true, "縦2辺と横2辺の合計を表す。"),
      choice("b", "h × w", false, "面積を求める式である。"),
      choice("c", "h + w", false, "縦と横を1本ずつしか数えていない。"),
      choice("d", "2 × h × w", false, "面積を2倍しており周の長さではない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "周は縦が2辺、横が2辺なのでh+wを2倍します。入力・処理・出力のうち、空欄は処理に当たります。",
    solutionProcess: "h+h+w+w=2h+2w=2×(h+w)",
    reviewTags: ["入力", "出力", "式"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-logic-combination",
    title: "比較と論理演算",
    lessonId: "variables-expressions-io",
    kind: "multi-select",
    difficulty: "standard",
    prompt: "x=12、y=5とする。真になる式をすべて選びなさい。andは両方が真、orは少なくとも一方が真、notは真偽を反転する。",
    choices: [
      choice("a", "x > 10 and y < 8", true, "12>10と5<8がどちらも真である。"),
      choice("b", "x < 10 or y = 5", true, "前半は偽でもy=5が真なのでor全体は真である。"),
      choice("c", "not(x = 12)", false, "x=12が真なのでnotで偽になる。"),
      choice("d", "x < y and y > 0", false, "x<yが偽なのでand全体は偽である。"),
    ],
    correctChoiceIds: ["a", "b"],
    explanation: "比較を一つずつ真偽にしてから論理演算で結びます。正答集合はaとbです。",
    solutionProcess: "a: 真and真=真、b: 偽or真=真、c: not真=偽、d: 偽and真=偽",
    reviewTags: ["比較演算", "論理演算"],
  }),
  problem({
    id: "joho-prog-cafe-trace",
    title: "会話から料金計算をトレースする",
    lessonId: "variables-expressions-io",
    kind: "trace",
    difficulty: "ct-prep",
    estimatedMinutes: 6,
    prompt: `${RULES}\n生徒A「3人分の基本料金は1人700円だね」\n生徒B「クーポン値200円を合計から1回だけ引き、最後に10%の税を加えるよ」\n次の処理を用いる。people←3、base←700、coupon←200、subtotal←people×base-coupon、total←subtotal×1.10。subtotalとtotalの組を選びなさい。`,
    choices: [
      choice("a", "1900円、2090円", true, "クーポンを合計から1回引き、税を最後に加えている。"),
      choice("b", "1500円、1650円", false, "クーポンを3人それぞれから引いている。"),
      choice("c", "1900円、2290円", false, "1900に10%ではなく390円を加えている。"),
      choice("d", "2100円、2310円", false, "クーポンを引いていない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "会話の『合計から1回だけ』を式に対応させます。税は割引後のsubtotalへ掛けます。",
    solutionProcess: "subtotal=3×700-200=1900、total=1900×1.10=2090",
    reviewTags: ["変数", "式", "会話", "トレース"],
    pseudocode: true,
  }),

  problem({
    id: "joho-prog-branch-output",
    title: "条件分岐の出力",
    lessonId: "branching-loops",
    kind: "pseudocode-output",
    difficulty: "basic",
    prompt: `${RULES}\nscore←68。もしscore>=70なら「合格」と出力し、そうでなければ「再確認」と出力する。出力を選びなさい。`,
    choices: [
      choice("a", "再確認", true, "68>=70は偽なのでelse側を実行する。"),
      choice("b", "合格", false, "68は70以上ではない。"),
      choice("c", "両方", false, "if/elseではどちらか一方だけを実行する。"),
      choice("d", "何も出力しない", false, "偽の場合もelse側に出力命令がある。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "条件68>=70は偽です。if/elseは偽のときelse側だけを実行します。",
    solutionProcess: "68>=70 → 偽 → else → 『再確認』",
    reviewTags: ["条件分岐", "if-else"],
    pseudocode: true,
  }),
  numberProblem({
    id: "joho-prog-loop-sum",
    title: "反復による合計",
    lessonId: "branching-loops",
    difficulty: "basic",
    prompt: `${RULES}\nsum←0。iを1から5まで繰り返し、sum←sum+iとする。最後のsumを数値で答えなさい。`,
    answer: 15,
    mistake: 10,
    mistakeReason: "終端5を含めず、1〜4だけを加えている。",
    explanation: "両端を含むため1、2、3、4、5をすべて加え、合計は15です。",
    solutionProcess: "0→1→3→6→10→15（5回反復）",
    reviewTags: ["反復", "合計", "端点"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-branch-logic",
    title: "複数条件の分岐",
    lessonId: "branching-loops",
    kind: "multi-select",
    difficulty: "standard",
    prompt: "利用条件を「年齢が16以上、かつ同意済み」とする。条件を満たす組をすべて選びなさい。",
    choices: [
      choice("a", "年齢16、同意済み", true, "二つの条件がともに真である。"),
      choice("b", "年齢18、同意なし", false, "同意済みの条件が偽である。"),
      choice("c", "年齢15、同意済み", false, "年齢16以上の条件が偽である。"),
      choice("d", "年齢20、同意済み", true, "二つの条件がともに真である。"),
    ],
    correctChoiceIds: ["a", "d"],
    explanation: "andで結ばれた条件は両方を満たす必要があります。正答集合はaとdです。",
    solutionProcess: "各組について age>=16 と consent=true を別々に判定し、真and真だけを残す。",
    reviewTags: ["条件分岐", "and"],
  }),
  numberProblem({
    id: "joho-prog-while-count",
    title: "while相当の反復回数",
    lessonId: "branching-loops",
    difficulty: "standard",
    prompt: `${RULES}\nn←3、count←0。n<50の間、n←n×2、count←count+1を繰り返す。終了時のcountを答えなさい。`,
    answer: 5,
    mistake: 4,
    mistakeReason: "n=48の時点で止めているが、48<50は真なのであと1回実行する。",
    explanation: "判定は各反復の前です。nが3、6、12、24、48のときに実行し、5回目で96になって終了します。",
    solutionProcess: "3→6(1)→12(2)→24(3)→48(4)→96(5)。96<50は偽。",
    reviewTags: ["while", "反復回数", "終了条件"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-loop-table-ct",
    title: "表を使った在庫集計",
    lessonId: "branching-loops",
    kind: "trace",
    difficulty: "ct-prep",
    estimatedMinutes: 6,
    prompt: `${RULES}\n在庫変化の表は[+5,-2,-4,+6,-3]である。stock←4、shortageCount←0から始め、各変化をstockへ加え、stock<3になった直後だけshortageCountを1増やす。最終stockとshortageCountの組を選びなさい。`,
    choices: [
      choice("a", "stock=6、shortageCount=1", false, "各更新後は9,7,3,9,6で、3未満は一度もないため件数1は不正確。"),
      choice("b", "stock=6、shortageCount=0", true, "更新後9,7,3,9,6はいずれも3未満ではない。"),
      choice("c", "stock=2、shortageCount=1", false, "初期値4と全変化の合計2を混同している。"),
      choice("d", "stock=6、shortageCount=2", false, "負の変化の回数を不足回数として数えている。"),
    ],
    correctChoiceIds: ["b"],
    explanation: "負の変化があるだけでは不足ではありません。更新後のstockが3未満かを毎回判定します。",
    solutionProcess: "stock: 4→9→7→3→9→6。3<3は偽なのでshortageCount=0。",
    reviewTags: ["反復", "条件", "表", "トレース"],
    pseudocode: true,
  }),

  numberProblem({
    id: "joho-prog-array-sum",
    title: "配列の走査と合計",
    lessonId: "arrays-functions-decomposition",
    difficulty: "basic",
    prompt: `${RULES}\nA=[4,7,2,9]、sum←0。iを1から4まで繰り返しsum←sum+A[i]とする。sumを答えなさい。`,
    answer: 22,
    mistake: 18,
    mistakeReason: "先頭要素A[1]=4を加えていない。",
    explanation: "有効な添字1〜4をすべて走査し、4+7+2+9=22を計算します。",
    solutionProcess: "sum: 0→4→11→13→22",
    reviewTags: ["配列", "走査", "合計"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-array-maximum",
    title: "配列の最大値トレース",
    lessonId: "arrays-functions-decomposition",
    kind: "trace",
    difficulty: "basic",
    prompt: `${RULES}\nA=[-5,-8,-2,-6]。max←A[1]とし、iを2から4まで繰り返し、A[i]>maxならmax←A[i]とする。maxの変化として正しいものを選びなさい。`,
    choices: [
      choice("a", "-5 → -2", true, "-8では更新せず、-2で更新し、-6では更新しない。"),
      choice("b", "0 → -2", false, "maxは0ではなくA[1]=-5で初期化する。"),
      choice("c", "-5 → -8 → -2", false, "-8は-5より大きくないので更新しない。"),
      choice("d", "-5 → -6", false, "全要素を比較した最大値は-2である。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "全要素が負でも正しく動くよう最初の要素から始めます。比較でより大きい値だけに更新します。",
    solutionProcess: "初期-5、-8>-5は偽、-2>-5は真で-2、-6>-2は偽。",
    reviewTags: ["配列", "最大値", "初期化"],
    pseudocode: true,
  }),
  numberProblem({
    id: "joho-prog-function-return",
    title: "関数の戻り値",
    lessonId: "arrays-functions-decomposition",
    difficulty: "standard",
    prompt: `${RULES}\n関数 f(a,b) は local←a×2+b、戻り値 local div 3 とする。f(5,8)の戻り値を答えなさい。`,
    answer: 6,
    mistake: 18,
    mistakeReason: "関数内のlocalを計算しただけで、div 3を適用していない。",
    explanation: "引数a=5、b=8を式へ代入し、local=18を求めた後、18 div 3=6を戻します。",
    solutionProcess: "local=5×2+8=18 → 戻り値=18 div 3=6",
    reviewTags: ["関数", "引数", "戻り値"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-array-count-blank",
    title: "条件に合う件数の空欄補充",
    lessonId: "arrays-functions-decomposition",
    kind: "fill-blank",
    difficulty: "standard",
    prompt: `${RULES}\nAの値が60以上である件数を数える。count←0、iを1からnまで繰り返し、もしA[i]>=60ならば □。□を選びなさい。`,
    choices: [
      choice("a", "count ← count + 1", true, "条件を満たす要素ごとに件数を1増やす。"),
      choice("b", "count ← A[i]", false, "件数ではなく要素の値を代入してしまう。"),
      choice("c", "count ← count + A[i]", false, "件数ではなく値の合計になる。"),
      choice("d", "count ← 0", false, "見つけるたび件数を初期化してしまう。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "countは該当した要素の数なので、条件が真になるたび現在値を1増やします。",
    solutionProcess: "初期値0。各A[i]について条件が真のときだけcountを1増やす。",
    reviewTags: ["配列", "件数", "空欄補充"],
    pseudocode: true,
  }),
  problem({
    id: "joho-prog-functions-ct",
    title: "関数を分けた得点処理",
    lessonId: "arrays-functions-decomposition",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 6,
    prompt: `${RULES}\n表scores=[58,74,81,47]を使う。関数passed(x)はx>=60を戻す。主処理はcount←0とし、iを1から4まで繰り返し、passed(scores[i])が真ならcountを1増やす。出力と処理分割の説明の組を選びなさい。`,
    choices: [
      choice("a", "2、合否判定を関数に分けたため判定規則を再利用しやすい", true, "74と81の2件が真で、関数化の利点も正しい。"),
      choice("b", "2、局所変数xは主処理からいつでも直接変更できる", false, "件数は正しいが、引数xを主処理から局所変数として直接変更する説明が誤り。"),
      choice("c", "3、60未満を合格として数える", false, "条件x>=60と逆に判定している。"),
      choice("d", "213、合格者の点数を合計する", false, "処理は点数の合計ではなく件数を1ずつ増やす。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "passedは一つの得点の合否だけを担当し、主処理は配列走査と件数集計を担当します。役割が分かれ、同じ判定を再利用できます。",
    solutionProcess: "58→偽、74→真(count=1)、81→真(count=2)、47→偽。出力2。",
    reviewTags: ["関数", "配列", "処理分割", "表"],
    pseudocode: true,
  }),

  numberProblem({
    id: "joho-algo-linear-search",
    title: "線形探索の発見位置",
    lessonId: "algorithms-search-simulation",
    difficulty: "basic",
    prompt: `${RULES}\nA=[14,6,23,9,18]を先頭から線形探索し、target=9を最初に見つける添字を答えなさい。`,
    answer: 4,
    mistake: 3,
    mistakeReason: "0始まりとして数えている。この問題は1始まりである。",
    explanation: "14、6、23、9の順に比較し、4番目の要素で初めて一致します。",
    solutionProcess: "A[1]≠9、A[2]≠9、A[3]≠9、A[4]=9 → 添字4",
    reviewTags: ["線形探索", "添字", "探索位置"],
    pseudocode: true,
  }),
  numberProblem({
    id: "joho-algo-binary-search-count",
    title: "二分探索の比較回数",
    lessonId: "algorithms-search-simulation",
    difficulty: "basic",
    prompt: `${RULES}\n整列済みA=[3,8,12,19,27,31,44]からtarget=27を二分探索する。mid←(left+right) div 2とし、比較回数を答えなさい。`,
    answer: 3,
    mistake: 5,
    mistakeReason: "添字5を比較回数と取り違えている。",
    explanation: "中央19、次に31、最後に27と比較して見つかります。整列済みなので大小により半分を捨てられます。",
    solutionProcess: "[1,7] mid4=19（1回）→[5,7] mid6=31（2回）→[5,5] mid5=27（3回）",
    reviewTags: ["二分探索", "比較回数", "整列済み"],
    pseudocode: true,
  }),
  problem({
    id: "joho-algo-search-selection",
    title: "探索アルゴリズムの選択",
    lessonId: "algorithms-search-simulation",
    kind: "algorithm-choice",
    difficulty: "standard",
    prompt: "順序が毎回変わる20件の短い一覧を、並べ替えずに1回だけ検索する。最も適切な方法を選びなさい。",
    choices: [
      choice("a", "先頭から線形探索する", true, "未整列のまま使え、20件を1回探すため事前整列が不要である。"),
      choice("b", "未整列のまま二分探索する", false, "二分探索は整列済みであることが前提である。"),
      choice("c", "必ず整列してから二分探索する", false, "1回だけの小規模検索では整列の手間を含めると必ず有利とは言えない。"),
      choice("d", "乱数で位置を選び続ける", false, "全件確認や終了が保証されない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "方法は比較回数だけでなく、整列済みか、検索回数、更新頻度も含めて選びます。この条件では線形探索が単純で確実です。",
    solutionProcess: "前提確認：未整列・20件・検索1回 → 整列不要の線形探索を選ぶ。",
    reviewTags: ["アルゴリズム選択", "線形探索", "二分探索"],
  }),
  problem({
    id: "joho-algo-sort-trace",
    title: "単純な並べ替えのトレース",
    lessonId: "algorithms-search-simulation",
    kind: "trace",
    difficulty: "standard",
    prompt: `${RULES}\nA=[5,2,4,1]。左から隣り合う2要素を比べ、左>右なら交換する操作を、(1,2)、(2,3)、(3,4)の順に1巡だけ行う。1巡後のAを選びなさい。`,
    choices: [
      choice("a", "[2,4,1,5]", true, "5が各比較で右へ移動し、最後に末尾へ到達する。"),
      choice("b", "[1,2,4,5]", false, "1巡だけでは全体の整列は完了しない。"),
      choice("c", "[2,5,1,4]", false, "2回目の5と4、3回目の5と1の交換を正しく追えていない。"),
      choice("d", "[5,2,4,1]", false, "5>2なので最初の比較から交換が起きる。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "隣接比較を1巡だけ行うため、最大の5は末尾まで移動しますが、残りはまだ完全には整列しません。",
    solutionProcess: "[5,2,4,1]→[2,5,4,1]→[2,4,5,1]→[2,4,1,5]",
    reviewTags: ["並べ替え", "交換", "トレース"],
    pseudocode: true,
  }),
  problem({
    id: "joho-algo-simulation-ct",
    title: "乱数シミュレーションの設計",
    lessonId: "algorithms-search-simulation",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 7,
    prompt: `${RULES}\n生徒A「random(1,6)を2回使い、和が7になる割合を調べよう」\n生徒B「1000試行なら乱数生成は何回で、結果をどう解釈する？」\n最も適切な組を選びなさい。`,
    choices: [
      choice("a", "乱数生成2000回。割合は毎回同じではないが、試行を増やすと理論値付近で安定しやすい", true, "1試行2回×1000で2000回。乱数結果のばらつきも正しく説明する。"),
      choice("b", "乱数生成1000回。割合は必ず1/6になる", false, "1試行に2回必要で、有限試行の割合は必ず一致しない。"),
      choice("c", "乱数生成2000回。割合が理論値と違えばプログラムは必ず誤り", false, "確率的なばらつきがあるため、違いだけで誤りとは断定できない。"),
      choice("d", "乱数生成6000回。現実のさいころを完全に再現できる", false, "生成回数を6倍しており、モデルにも現実との差がある。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "確定するのは試行回数と各試行の乱数生成回数です。成立回数は実行ごとに変わり、割合は試行数を増やすと安定しやすくなりますが完全一致は保証されません。",
    solutionProcess: "生成回数=2×1000=2000。和7の成立回数は乱数に依存するため非確定。",
    reviewTags: ["乱数", "シミュレーション", "ばらつき", "会話"],
    pseudocode: true,
  }),
];
