import type {
  InformaticsChoice,
  InformaticsDifficulty,
  InformaticsPracticeArea,
  InformaticsPracticeQuestionType,
  InformaticsProblem,
  InformaticsTableData,
  InformaticsChartData,
} from "./problem-types";

const PSEUDOCODE_RULES =
  "規則：←は代入、=は等価比較。配列の添字は1から始まる。『aからbまで』は両端を含む。divは小数部分を切り捨てる整数除算、modは整数除算の余り。";

type ChoiceSeed = readonly [text: string, reason: string];

type PracticeSeed = Readonly<{
  id: string;
  area: InformaticsPracticeArea;
  lessonId: string;
  title: string;
  difficulty: InformaticsDifficulty;
  questionType: InformaticsPracticeQuestionType;
  minutes: number;
  prompt: string;
  choices: readonly ChoiceSeed[];
  correctIndices: readonly number[];
  correctNumber?: number;
  acceptedNumericAnswers?: readonly number[];
  numericTolerance?: number;
  answerUnit?: string;
  roundingRule?: string;
  firstCheck: string;
  organization: string;
  knowledge: string;
  steps: string;
  answer: string;
  verification: string;
  commonMistake: string;
  strategy: string;
  reviewGuide: string;
  reviewTags: readonly string[];
  mistakeTags: readonly string[];
  programCode?: string;
  traceTable?: InformaticsProblem["traceTable"];
  expectedOutput?: string;
  variableStates?: readonly string[];
  indexRule?: string;
  tableData?: InformaticsTableData;
  chartData?: InformaticsChartData;
  calculationRule?: string;
  sourceNote?: string;
}>;

const AREA_LABEL: Record<InformaticsPracticeArea, string> = {
  "data-use": "データの活用",
  programming: "プログラミング",
  network: "ネットワーク",
  security: "情報セキュリティ",
  "digital-representation": "デジタル表現",
  "computer-systems": "コンピュータの仕組み",
  "information-design": "情報デザイン",
  "information-society": "情報社会と問題解決",
};

function buildProblem(seed: PracticeSeed): InformaticsProblem {
  const correctIndices = new Set(seed.correctIndices);
  const choices: InformaticsChoice[] = seed.choices.map(([text, reason], index) => ({
    id: String.fromCharCode(65 + index),
    text,
    reason: `${correctIndices.has(index) ? "正答" : "誤り"}：${reason}`,
  }));
  const correctChoiceIds = choices
    .filter((_, index) => correctIndices.has(index))
    .map((choice) => choice.id);
  const commonTestNotes = seed.difficulty === "ct-prep"
    ? `\n\n共通テスト準備：先に読む資料は「${seed.firstCheck}」。後回しにできるのは結論に直接関係しない固有名詞や飾りの説明です。選択肢は条件を一つずつ照合し、時間を使いすぎたら根拠が残る二択まで絞って保留します。類似問題では、資料の数値や変数名が変わっても「${seed.strategy}」を再利用します。`
    : "";
  const detailedExplanation = [
    `1. 最初に見る箇所：${seed.firstCheck}`,
    `2. 条件・資料・プログラムの整理：${seed.organization}`,
    `3. 使用する知識：${seed.knowledge}`,
    `4. 解法または判断手順：${seed.steps}`,
    `5. 正答：${seed.answer}`,
    `6. 検算・再確認：${seed.verification}`,
    `7. よくある誤答：${seed.commonMistake}`,
    `8. 関連講座への復習導線：${seed.reviewGuide}`,
  ].join("\n") + commonTestNotes;
  const kind = seed.questionType === "multiple-select"
    ? "multi-select"
    : seed.questionType === "numeric-input"
      ? "number"
      : seed.questionType === "program-trace"
        ? "pseudocode-output"
        : seed.questionType === "matching-ordering"
          ? "algorithm-choice"
          : seed.questionType === "table-graph"
            ? "scenario"
            : "single-choice";
  const distractorReasons = Object.fromEntries(
    choices.filter((_, index) => !correctIndices.has(index)).map((choice) => [choice.id, choice.reason]),
  );
  const correctAnswer = seed.questionType === "numeric-input"
    ? seed.correctNumber!
    : seed.questionType === "multiple-select"
      ? correctChoiceIds
      : correctChoiceIds[0];

  return {
    id: seed.id,
    slug: seed.id,
    subjectId: "informatics",
    unitId: seed.area,
    title: seed.title,
    lessonId: seed.lessonId,
    kind,
    difficulty: seed.difficulty,
    estimatedMinutes: seed.minutes,
    estimatedTime: seed.minutes * 60,
    prompt: seed.prompt,
    statement: seed.prompt,
    questionType: seed.questionType,
    choices,
    correctChoiceIds,
    correctNumber: seed.correctNumber,
    correctAnswer,
    acceptedNumericAnswers: seed.acceptedNumericAnswers,
    numericTolerance: seed.numericTolerance,
    answerUnit: seed.answerUnit,
    roundingRule: seed.roundingRule,
    explanation: detailedExplanation,
    detailedExplanation,
    solutionProcess: `${seed.steps}\n${seed.verification}`,
    distractorReasons,
    strategy: seed.strategy,
    firstCheck: seed.firstCheck,
    verification: seed.verification,
    commonMistake: seed.commonMistake,
    relatedCourseIds: [seed.lessonId],
    reviewTags: [AREA_LABEL[seed.area], ...seed.reviewTags],
    mistakeTags: seed.mistakeTags,
    copyrightStatus: "original",
    sourceType: "original",
    publicationStatus: "beta",
    pseudocodeRules: seed.programCode ? PSEUDOCODE_RULES : undefined,
    programCode: seed.programCode,
    traceTable: seed.traceTable,
    expectedOutput: seed.expectedOutput,
    variableStates: seed.variableStates,
    indexRule: seed.indexRule,
    tableData: seed.tableData,
    chartData: seed.chartData,
    calculationRule: seed.calculationRule,
    sourceNote: seed.sourceNote,
  };
}

const DATA_SOURCE_NOTE = "Cyber Mathが作成した架空データ。個人情報や実在組織の情報は含まない。";

const DATA_PROBLEMS: readonly PracticeSeed[] = [
  {
    id: "info-unit-data-01-data-types", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "データの種類と尺度", difficulty: "basic", questionType: "single-choice", minutes: 2,
    prompt: "架空の植物観察で「鉢の番号」「草丈(cm)」「花の色」「観察日」を記録した。平均を求めることに意味がある項目として最も適切なものを1つ選びなさい。",
    choices: [["鉢の番号", "番号は個体を区別する名義的なラベルで、大小や平均に意味はない。"], ["草丈(cm)", "量的データであり、差や平均を解釈できる。"], ["花の色", "分類を表す質的データなので、色名の平均は定義できない。"], ["観察日", "時系列の比較には使えるが、この設問で単純平均する対象としては草丈が適切である。"]], correctIndices: [1],
    firstCheck: "各項目が数量か、分類用のラベルか", organization: "鉢番号と花の色は分類、草丈は測定値、観察日は時点を表す。", knowledge: "量的データと質的データの区別", steps: "四項目を測定値・識別子・カテゴリ・時点に分け、平均の単位が意味を持つものを探す。", answer: "草丈(cm)", verification: "平均草丈ならcmという単位で説明できるが、平均の花の色や平均の鉢番号は説明できない。", commonMistake: "数字で書かれた鉢番号を量的データと考えること。", strategy: "値の見た目ではなく、演算結果に意味があるかで分類する", reviewGuide: "データ分析・可視化・モデル化講座でデータ型と尺度を復習する。", reviewTags: ["データの種類", "尺度"], mistakeTags: ["識別番号を数量と誤認"], sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-02-mean-median", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "平均値と中央値の比較", difficulty: "basic", questionType: "numeric-input", minutes: 3,
    prompt: "架空の読書会5班の1週間の読書時間は 20, 25, 25, 30, 100 分だった。中央値を半角または全角の整数で入力しなさい。",
    choices: [["25分", "昇順に並んだ5個の中央、3番目は25である。"], ["40分", "合計200を5で割った平均値であり、中央値ではない。"], ["30分", "中央より一つ右の値を選んでいる。"], ["100分", "最大値であって代表値ではない。"]], correctIndices: [0], correctNumber: 25, acceptedNumericAnswers: [25], numericTolerance: 0, answerUnit: "分（入力は数値25のみ）", roundingRule: "整数で答える。許容誤差は0。",
    firstCheck: "データの個数が5個で、すでに昇順であること", organization: "中央位置は(5+1)÷2=3番目。100分は外れた大きな値である。", knowledge: "中央値は並べたときの中央の値", steps: "3番目の25を読む。平均値40とは区別する。", answer: "25分", verification: "25以下が3個、25以上も3個あり、中央の条件を満たす。", commonMistake: "平均値40を求めて答えること。", strategy: "代表値の名称を確認してから計算方法を選ぶ", reviewGuide: "データ分析講座の平均値・中央値と外れ値の節へ戻る。", reviewTags: ["中央値", "代表値"], mistakeTags: ["平均と中央値の混同"], calculationRule: "昇順5個の3番目を採用する。", sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-03-missing-outlier", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "欠損値と外れ値の前処理", difficulty: "standard", questionType: "single-choice", minutes: 4,
    prompt: "温室センサの記録 21.2, 21.5, 欠損, 21.3, 79.9 ℃を分析する。79.9℃は装置点検中の値だった。最も適切な前処理を1つ選びなさい。",
    choices: [["欠損を0℃にし、79.9℃はそのまま使う", "0℃と観測されていないことを混同し、点検中の異常値も残してしまう。"], ["欠損と79.9℃を無条件に平均値へ置換する", "原因を確認せず置換すると、分析目的に合わない補完になる。"], ["欠損は欠測として扱い、79.9℃は点検記録を根拠に除外して処理内容を記録する", "欠損と原因が判明した異常値を区別し、再現可能な処理になる。"], ["21℃台の値をすべて削除する", "正常な観測を失い、残るデータが点検中の値だけになる。"]], correctIndices: [2],
    firstCheck: "欠損と79.9℃の発生理由が別であること", organization: "欠損は値がない状態、79.9℃は点検中という根拠がある外れ値である。", knowledge: "欠損値・外れ値の扱いと前処理記録", steps: "発生原因を確認し、欠損を勝手に0とせず、点検中の値を分析対象外にして処理履歴を残す。", answer: "欠損は欠測、79.9℃は根拠を記録して除外", verification: "処理後も21℃台の正常値が残り、再分析時に除外理由を追跡できる。", commonMistake: "欠損を数値0とみなすこと、または外れ値を理由なく消すこと。", strategy: "値そのものより先に、欠測・異常の発生原因を確認する", reviewGuide: "データ分析講座で欠損処理と外れ値判断を復習する。", reviewTags: ["欠損値", "外れ値", "前処理"], mistakeTags: ["欠損を0で補完", "根拠なし外れ値除外"], sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-04-cross-tab", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "クロス集計表の読み取り", difficulty: "standard", questionType: "table-graph", minutes: 4,
    prompt: "表は架空の講習参加者40人を集計したものだ。「午前参加者のうち提出済み」の割合として正しいものを1つ選びなさい。",
    choices: [["25%", "10を全体40で割った割合で、分母が午前参加者になっていない。"], ["50%", "午前参加20人のうち提出済み10人なので10÷20=0.5である。"], ["66.7%", "提出済み全体15人のうち午前10人という別の条件付き割合である。"], ["75%", "全体の未提出25人など、表の異なる値を混同している。"]], correctIndices: [1],
    firstCheck: "「午前参加者のうち」が分母を指定していること", organization: "午前行は提出済み10、未提出10、計20。", knowledge: "クロス集計の行割合", steps: "条件となる午前参加者20人を分母、該当する提出済み10人を分子にして10÷20×100を計算する。", answer: "50%", verification: "午前行の10人と10人が半数ずつなので50%と直感的にも一致する。", commonMistake: "全体40人を分母にして25%とすること。", strategy: "『AのうちB』ではAを分母に固定する", reviewGuide: "データ分析講座のクロス集計と条件付き割合を復習する。", reviewTags: ["クロス集計", "割合"], mistakeTags: ["分母の取り違え"], tableData: { caption: "参加時間帯と課題提出", headers: ["時間帯", "提出済み", "未提出", "計"], rows: [["午前", "10", "10", "20"], ["午後", "5", "15", "20"], ["計", "15", "25", "40"]] }, calculationRule: "10÷20×100=50%", sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-05-scatter-correlation", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "散布図と相関の解釈", difficulty: "ct-prep", questionType: "multiple-select", minutes: 6,
    prompt: "架空の6教室について、窓を開けた時間と室温低下量を散布図にしたところ右上がりの傾向があった。資料だけから妥当な記述を2つ選びなさい。",
    choices: [["開放時間が長い教室ほど、室温低下量が大きい傾向がある", "散布図の右上がりという観察結果をそのまま述べている。"], ["窓を長く開ければ、どの教室でも必ず同じ量だけ室温が下がる", "相関は個々の値の一致や必然性を保証しない。"], ["この資料だけで、室温低下の原因が窓の開放時間だけだと証明できる", "外気温や教室の広さなど交絡要因を除けていない。"], ["開放時間以外の条件も記録すると、関係をより慎重に検討できる", "他の要因を比較することで因果の検討が改善する。"]], correctIndices: [0, 3],
    firstCheck: "設問が『資料だけから』と『2つ』を指定していること", organization: "右上がりは正の相関傾向を示すが、原因の証明ではない。", knowledge: "散布図、相関、交絡要因、相関と因果の区別", steps: "傾向を述べる選択肢と、追加検証を提案する選択肢を残し、必ず・証明という断定を除く。", answer: "AとD", verification: "Aは観察の範囲内、Dは因果を断定せず検証を改善する。", commonMistake: "右上がりを見ただけで因果関係を確定すること。", strategy: "相関の記述と因果の断定を言葉の強さで分ける", reviewGuide: "データ分析講座の散布図・相関・因果を復習する。", reviewTags: ["散布図", "相関と因果"], mistakeTags: ["相関から因果を断定"], chartData: { kind: "scatter", title: "窓の開放時間と室温低下量", xLabel: "開放時間（分）", yLabel: "室温低下量（℃）", points: [{ label: "教室A", x: 5, y: 0.8 }, { label: "教室B", x: 8, y: 1.1 }, { label: "教室C", x: 12, y: 1.5 }, { label: "教室D", x: 15, y: 1.7 }, { label: "教室E", x: 18, y: 2.2 }, { label: "教室F", x: 22, y: 2.4 }] }, sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-06-standard-score", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "標準化した値の計算", difficulty: "standard", questionType: "numeric-input", minutes: 4,
    prompt: "ある架空テストの平均は60点、標準偏差は10点だった。80点の標準化得点 z=(得点-平均)÷標準偏差 を数値で入力しなさい。",
    choices: [["2", "(80-60)÷10=2である。"], ["8", "80÷10とし、平均を引いていない。"], ["20", "平均との差だけを答え、標準偏差で割っていない。"], ["0.2", "20÷100のように百分率へ変換している。"]], correctIndices: [0], correctNumber: 2, acceptedNumericAnswers: [2], numericTolerance: 0, answerUnit: "なし", roundingRule: "整数2で答える。許容誤差は0。",
    firstCheck: "式に得点・平均・標準偏差のどれを入れるか", organization: "得点80、平均60、標準偏差10。", knowledge: "標準化得点は平均との差を標準偏差で測る", steps: "80-60=20、20÷10=2の順に計算する。", answer: "2", verification: "平均より標準偏差2個分上なので正の2となる。", commonMistake: "得点を直接標準偏差で割ること。", strategy: "分子の平均との差を先に計算する", reviewGuide: "データ分析講座の標準化と分布の比較を復習する。", reviewTags: ["標準化", "標準偏差"], mistakeTags: ["標準化式の誤適用"], calculationRule: "(80-60)/10=2", sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-07-sample-population", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "標本と母集団", difficulty: "standard", questionType: "single-choice", minutes: 4,
    prompt: "全校生徒の通学手段を推定するため、放課後の自転車置き場にいた30人だけへ質問した。改善案として最も適切なものを1つ選びなさい。",
    choices: [["人数を30人のままにして質問文だけ長くする", "抽出の偏りは質問文の長さでは解消しない。"], ["登校時間帯や学年を分け、全校から無作為に近い方法で選ぶ", "母集団の構成を反映しやすくし、自転車利用者への偏りを減らせる。"], ["自転車通学者だけをさらに30人追加する", "同じ偏りを強め、徒歩や公共交通の生徒を代表しない。"], ["調査結果をそのまま全国の高校生へ広げる", "全校生徒を対象とした標本でさえ全国母集団を代表しない。"]], correctIndices: [1],
    firstCheck: "標本が自転車置き場の利用者に偏っていること", organization: "母集団は全校生徒、標本は放課後に自転車置き場にいた30人。", knowledge: "母集団・標本・標本抽出の偏り", steps: "母集団の各層から選ばれる可能性を持つ方法を選ぶ。", answer: "学年や時間帯を考慮し、全校から選ぶ", verification: "自転車を使わない生徒も標本へ入るため、元の偏りが小さくなる。", commonMistake: "標本数だけ増やせば偏りが消えると考えること。", strategy: "人数より先に、誰が選ばれ得る標本かを確認する", reviewGuide: "データ分析講座の母集団と標本を復習する。", reviewTags: ["標本", "母集団", "標本抽出"], mistakeTags: ["偏った標本の一般化"], sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-08-graph-choice", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "目的に合うグラフの選択", difficulty: "standard", questionType: "table-graph", minutes: 4,
    prompt: "架空の図書室で、月ごとの貸出冊数が1年間にどう変化したかを示したい。最も適切なグラフを1つ選びなさい。",
    choices: [["月を横軸、貸出冊数を縦軸にした折れ線グラフ", "時間順の推移と増減を読み取りやすい。"], ["各月を無関係な部分として示す円グラフ", "構成比には向くが、時間変化の連続性を追いにくい。"], ["貸出冊数だけを並べた散布図", "二変量の関係を見る形式でなく、月次推移には折れ線が明確である。"], ["月名を含まない度数分布表", "どの月に増減したかという時系列情報が失われる。"]], correctIndices: [0],
    firstCheck: "目的が構成比ではなく時系列の変化であること", organization: "横軸に時間、縦軸に数量を置けば月ごとのつながりを追える。", knowledge: "グラフは分析目的に合わせて選ぶ", steps: "時間変化を示せる形式を選び、構成比・二変量関係向けの形式を除く。", answer: "折れ線グラフ", verification: "隣接月の増減が線の傾きとして読める。", commonMistake: "見た目の好みだけで円グラフを選ぶこと。", strategy: "比較したい関係が時間・構成・分布・相関のどれかを決める", reviewGuide: "データ分析講座の可視化選択を復習する。", reviewTags: ["グラフ選択", "時系列"], mistakeTags: ["目的とグラフの不一致"], tableData: { caption: "月別貸出冊数（抜粋）", headers: ["月", "4月", "5月", "6月", "7月"], rows: [["貸出冊数", "120", "145", "132", "168"]] }, sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-09-misleading-axis", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "縦軸を省略したグラフ", difficulty: "ct-prep", questionType: "table-graph", minutes: 6,
    prompt: "資料は架空の満足度調査で、前年78%、今年82%だった。縦軸を75%から始めた棒グラフでは差が非常に大きく見えた。資料の説明として最も適切なものを1つ選びなさい。",
    choices: [["今年は前年の約2倍の満足度である", "82÷78は約1.05であり、2倍ではない。"], ["4ポイント増であり、縦軸の開始位置が視覚的な差を強調している", "数値差と表示方法の影響を分けて説明している。"], ["縦軸を省略したので数値78%と82%も無効になる", "表示への注意は必要だが、元の割合自体が直ちに無効になるわけではない。"], ["割合の差は4%ではなく160%である", "百分率の差と合計を混同している。"]], correctIndices: [1],
    firstCheck: "棒の見た目ではなく78%と82%という元の数値", organization: "差は82-78=4ポイント、比は82÷78≈1.05。縦軸75%始まりが差を拡大表示する。", knowledge: "パーセントとポイント、縦軸省略による印象の変化", steps: "数値差を計算してから、グラフの軸範囲が視覚印象へ与える影響を説明する。", answer: "4ポイント増で、縦軸省略が差を強調", verification: "0%始まりに描き直すと棒の高さの差は全体の4/100に相当する。", commonMistake: "棒の高さだけを見て『2倍』と判断すること。", strategy: "グラフを見る前に元の値・差・比を計算する", reviewGuide: "データ分析講座の誤解を招くグラフと割合表示を復習する。", reviewTags: ["誤解を招くグラフ", "縦軸", "割合"], mistakeTags: ["視覚印象で倍率を判断"], tableData: { caption: "架空の満足度調査", headers: ["年度", "満足", "不満足"], rows: [["前年", "78%", "22%"], ["今年", "82%", "18%"]] }, chartData: { kind: "bar", title: "満足度（縦軸75%からの強調表示）", unit: "%", baseline: 75, values: [{ label: "前年", value: 78 }, { label: "今年", value: 82 }] }, calculationRule: "82-78=4ポイント、82/78≈1.05", sourceNote: DATA_SOURCE_NOTE,
  },
  {
    id: "info-unit-data-10-regression-interpretation", area: "data-use", lessonId: "data-analysis-visualization-modeling", title: "回帰的な見方と予測範囲", difficulty: "ct-prep", questionType: "multiple-select", minutes: 7,
    prompt: "架空の機器で、設定値xが10〜50の範囲では消費量yがおおむね y=2x+5 に沿った。資料から妥当な記述を2つ選びなさい。",
    choices: [["x=30なら中心的な予測値は65である", "式へ30を代入すると2×30+5=65となり、観測範囲内の予測である。"], ["x=1000でも必ずy=2005になる", "観測範囲を大きく外れた外挿で、関係が続く保証はない。"], ["式に近い傾向があるので、個々の観測値はすべて式と完全一致する", "回帰的な関係はばらつきを含み、完全一致を意味しない。"], ["予測には観測範囲と残差の大きさも確認する必要がある", "式だけでなく適用範囲とばらつきを確認するのが妥当である。"]], correctIndices: [0, 3],
    firstCheck: "式の代入と、観測したxの範囲10〜50", organization: "回帰式は中心的な傾向を表し、各点の完全一致や範囲外の保証ではない。", knowledge: "回帰式、内挿・外挿、残差", steps: "x=30を代入し、次に各断定が観測範囲とばらつきを無視していないか確認する。", answer: "AとD", verification: "65は観測範囲内の式の値であり、Dは予測の不確実性を残している。", commonMistake: "回帰式を例外のない物理法則として扱うこと。", strategy: "式の計算と式を使える範囲を別々に確認する", reviewGuide: "データ分析講座のモデル化・回帰的な見方へ戻る。", reviewTags: ["回帰", "予測", "外挿"], mistakeTags: ["回帰式の過度な一般化"], calculationRule: "y=2×30+5=65。学習範囲は10≦x≦50。", sourceNote: DATA_SOURCE_NOTE,
  },
];

const PROGRAMMING_PROBLEMS: readonly PracticeSeed[] = [
  {
    id: "info-unit-prog-01-assignment", area: "programming", lessonId: "variables-expressions-io", title: "代入による変数の更新", difficulty: "basic", questionType: "single-choice", minutes: 2,
    prompt: "変数aの初期値を3とし、a←a+4 を実行した直後のaとして正しいものを1つ選びなさい。",
    choices: [["3", "代入前の値であり、右辺の計算結果へ更新されていない。"], ["4", "加える数だけを答えている。"], ["7", "右辺は現在のa=3を使うので3+4=7を代入する。"], ["34", "数値の加算を文字列の連結として扱っている。"]], correctIndices: [2],
    firstCheck: "←の右辺を現在の値で計算してから左辺へ入れること", organization: "初期値a=3、更新式a←a+4。", knowledge: "変数と代入", steps: "右辺3+4を先に計算し、結果7でaを上書きする。", answer: "7", verification: "更新後のaを式へ戻すのではなく、代入は一度だけなので7で終了する。", commonMistake: "aという文字をそのまま残す、または4だけを代入すること。", strategy: "代入ごとに右辺を計算し、変数表を書き換える", reviewGuide: "変数・式・入出力講座の代入を復習する。", reviewTags: ["変数", "代入"], mistakeTags: ["代入順序の誤り"],
  },
  {
    id: "info-unit-prog-02-counter-trace", area: "programming", lessonId: "branching-loops", title: "条件付きカウンタのトレース", difficulty: "basic", questionType: "program-trace", minutes: 4,
    prompt: "次の疑似コードを実行したときに表示される値を1つ選びなさい。",
    choices: [["2", "偶数は2と4の2個であり、条件成立のたびにcountが1増える。"], ["3", "繰り返し回数をそのまま数えている。"], ["4", "最後のiの値を出力値と混同している。"], ["6", "偶数の合計を求める処理ではない。"]], correctIndices: [0],
    firstCheck: "countの初期値と、増える条件i mod 2=0", organization: "iは1,2,3,4と変化し、条件成立は2と4のとき。", knowledge: "繰り返し、剰余、カウンタ", steps: "countは0→0→1→1→2と変化する。", answer: "2", verification: "1〜4の偶数を直接列挙しても2個で一致する。", commonMistake: "ループ回数4や偶数の合計6を答えること。", strategy: "条件が成立した回だけカウンタ列を更新する", reviewGuide: "分岐と繰り返し講座でカウンタを復習する。", reviewTags: ["繰り返し", "カウンタ", "剰余"], mistakeTags: ["回数と合計の混同"], programCode: "count ← 0\nfor i を 1 から 4 まで\n  if i mod 2 = 0 then\n    count ← count + 1\n  endif\nendfor\ncount を表示", expectedOutput: "2", variableStates: ["開始: count=0", "i=1: count=0", "i=2: count=1", "i=3: count=1", "i=4: count=2"], indexRule: PSEUDOCODE_RULES,
  },
  {
    id: "info-unit-prog-03-array-sum", area: "programming", lessonId: "arrays-functions-decomposition", title: "配列の条件付き合計", difficulty: "standard", questionType: "program-trace", minutes: 5,
    prompt: "配列の添字は1から始まる。次の疑似コードの表示値を1つ選びなさい。",
    choices: [["12", "配列全体4+7+2+9の合計で、5以上という条件を無視している。"], ["16", "5以上の7と9だけを加えるので16になる。"], ["20", "4を誤って条件成立に含めている。"], ["22", "すべての要素を足した値であり条件付き合計ではない。"]], correctIndices: [1],
    firstCheck: "配列の添字範囲1〜4と条件A[i]≧5", organization: "対象要素は7と9、4と2は加えない。", knowledge: "配列走査、条件分岐、合計変数", steps: "sumは0→0→7→7→16と変化する。", answer: "16", verification: "対象要素を直接7+9と計算しても16。", commonMistake: "全要素の合計22や、添字0を仮定して別の範囲を読むこと。", strategy: "各要素について条件判定列と合計列を分ける", reviewGuide: "配列・関数・分解講座の配列走査を復習する。", reviewTags: ["配列", "条件付き合計"], mistakeTags: ["条件無視", "添字規則の誤認"], programCode: "A ← [4, 7, 2, 9]\nsum ← 0\nfor i を 1 から 4 まで\n  if A[i] >= 5 then\n    sum ← sum + A[i]\n  endif\nendfor\nsum を表示", expectedOutput: "16", variableStates: ["i=1: sum=0", "i=2: sum=7", "i=3: sum=7", "i=4: sum=16"], indexRule: PSEUDOCODE_RULES,
  },
  {
    id: "info-unit-prog-04-branch-purpose", area: "programming", lessonId: "branching-loops", title: "条件分岐の目的", difficulty: "standard", questionType: "single-choice", minutes: 4,
    prompt: "点数scoreに対し、score≧80なら「A」、60≦scoreかつscore<80なら「B」、それ以外は「C」と表示する。score=75の処理結果と理由の組合せを1つ選びなさい。",
    choices: [["A。75は80以上だから", "75は80未満なので最初の条件は成立しない。"], ["B。75は60以上80未満だから", "二つの条件を同時に満たす。"], ["C。75は60未満だから", "75は60以上であり、それ以外には進まない。"], ["何も表示されない。条件が重なるから", "条件範囲は分岐順と上限指定により重ならず、Bに決まる。"]], correctIndices: [1],
    firstCheck: "75が各境界60と80のどちら側か", organization: "75は80以上ではなく、60以上かつ80未満。", knowledge: "条件分岐と論理積", steps: "上から条件を評価し、最初は偽、二番目は真なのでBを表示する。", answer: "B", verification: "60≦75<80を数直線で確認できる。", commonMistake: "境界条件の≧と<を読み落とすこと。", strategy: "境界値を数直線へ置いて条件を順に判定する", reviewGuide: "分岐と繰り返し講座の複合条件を復習する。", reviewTags: ["条件分岐", "論理積"], mistakeTags: ["境界条件の読み落とし"],
  },
  {
    id: "info-unit-prog-05-loop-count", area: "programming", lessonId: "branching-loops", title: "繰り返し回数の計算", difficulty: "basic", questionType: "numeric-input", minutes: 3,
    prompt: "xの初期値を1とし、x<20の間、x←x×2 を繰り返す。繰り返しが実行される回数を数値で入力しなさい。",
    choices: [["5回", "xは1→2→4→8→16→32と5回更新され、32で条件が偽になる。"], ["4回", "x=16の時点でも16<20なので、もう1回実行される。"], ["6回", "条件が偽になった後の判定を実行回数に含めている。"], ["20回", "上限値20と繰り返し回数を混同している。"]], correctIndices: [0], correctNumber: 5, acceptedNumericAnswers: [5], numericTolerance: 0, answerUnit: "回（入力は数値5のみ）", roundingRule: "整数で答える。許容誤差は0。",
    firstCheck: "条件判定は更新前のx<20で行うこと", organization: "xは1,2,4,8,16の各状態で条件が真。", knowledge: "while型繰り返しと終了条件", steps: "更新回数を数えながら1→2→4→8→16→32と追う。", answer: "5回", verification: "5回後は32で20以上となり、6回目は実行されない。", commonMistake: "最後の条件判定を実行回数に含めること。", strategy: "実行前の値・実行後の値・回数を一行ずつ記録する", reviewGuide: "分岐と繰り返し講座の終了条件を復習する。", reviewTags: ["繰り返し", "終了条件"], mistakeTags: ["ループ回数のずれ"], programCode: "x ← 1\ncount ← 0\nwhile x < 20\n  x ← x * 2\n  count ← count + 1\nendwhile\ncount を表示", expectedOutput: "5", variableStates: ["0回: x=1", "1回: x=2", "2回: x=4", "3回: x=8", "4回: x=16", "5回: x=32"],
  },
  {
    id: "info-unit-prog-06-array-maximum", area: "programming", lessonId: "arrays-functions-decomposition", title: "最大値探索のトレース", difficulty: "ct-prep", questionType: "program-trace", minutes: 7,
    prompt: "資料の疑似コードは配列から最大値とその位置を求める。表示される組を1つ選びなさい。",
    choices: [["max=12, pos=1", "初期値のまま更新を止めている。"], ["max=18, pos=4", "18を最大値へ更新し、添字4も同時に保存する。"], ["max=18, pos=18", "posには値ではなく添字を入れる。"], ["max=15, pos=3", "最後の要素を常に最大とする処理ではない。"]], correctIndices: [1],
    firstCheck: "maxとposが同じif文の中で同時に更新される点", organization: "A=[12,7,15,18,15]。更新はi=3で15、i=4で18。i=5は更新なし。", knowledge: "配列走査、最大値、位置の保存", steps: "開始(12,1)→i=2変化なし→i=3(15,3)→i=4(18,4)→i=5変化なし。", answer: "max=18, pos=4", verification: "配列を直接見ても最大値18は4番目に一度だけある。", commonMistake: "最大値をposにも入れる、または最後の添字5を答えること。", strategy: "比較が真の行だけ二つの変数を更新する", reviewGuide: "配列・関数・分解講座の最大値探索を復習する。", reviewTags: ["配列", "最大値探索"], mistakeTags: ["値と添字の混同"], programCode: "A ← [12, 7, 15, 18, 15]\nmax ← A[1]\npos ← 1\nfor i を 2 から 5 まで\n  if A[i] > max then\n    max ← A[i]\n    pos ← i\n  endif\nendfor\nmax, pos を表示", expectedOutput: "18, 4", variableStates: ["開始: max=12,pos=1", "i=2: 12,1", "i=3: 15,3", "i=4: 18,4", "i=5: 18,4"], indexRule: PSEUDOCODE_RULES,
  },
  {
    id: "info-unit-prog-07-search-order", area: "programming", lessonId: "algorithms-search-simulation", title: "線形探索の手順", difficulty: "standard", questionType: "matching-ordering", minutes: 5,
    prompt: "未整列の配列から値keyを線形探索する手順として正しい並びを1つ選びなさい。①現在要素とkeyを比較 ②先頭位置を設定 ③一致なら位置を返す ④不一致なら次の位置へ進む",
    choices: [["②→①→③（一致時）／④（不一致時）→①", "初期位置を決め、比較結果で終了または次要素へ進む正しい流れである。"], ["①→②→④→③", "比較する前に現在位置を設定する必要がある。"], ["②→④→③→①", "比較せず位置を進めたり一致判定したりしている。"], ["③→②→①→④", "一致を確認する前に位置を返している。"]], correctIndices: [0],
    firstCheck: "比較には現在位置が必要で、一致したら探索を終了すること", organization: "初期化→比較→分岐→不一致なら反復という構造。", knowledge: "線形探索と制御の順序", steps: "位置を先頭に設定し、要素を比較する。一致時は返し、不一致時は位置を進めて比較へ戻る。", answer: "②→①→③／④→①", verification: "要素が先頭・途中・末尾のどこでも同じ手順で発見できる。", commonMistake: "比較前に位置を進めて先頭要素を飛ばすこと。", strategy: "初期化・判定・更新の三役に分けて並べる", reviewGuide: "探索とシミュレーション講座の線形探索を復習する。", reviewTags: ["線形探索", "手順"], mistakeTags: ["初期化順序の誤り"],
  },
  {
    id: "info-unit-prog-08-bug-logic", area: "programming", lessonId: "branching-loops", title: "論理条件のバグ特定", difficulty: "standard", questionType: "multiple-select", minutes: 5,
    prompt: "年齢ageが13以上19以下のときだけtrueにしたい。条件 `age >= 13 OR age <= 19` の問題点と修正として正しいものを2つ選びなさい。",
    choices: [["多くの値で少なくとも片方が真になり、範囲外もtrueになり得る", "例えばage=30でもage>=13が真なので全体が真になる。"], ["ORをANDへ変え、`age >= 13 AND age <= 19` とする", "下限と上限を同時に満たす範囲判定になる。"], ["13と19を入れ替えて `age >= 19 OR age <= 13` とする", "中央の範囲ではなく両端側を真にする条件になる。"], ["比較演算をすべて削除する", "範囲判定そのものができなくなる。"]], correctIndices: [0, 1],
    firstCheck: "『以上かつ以下』が二条件の同時成立を要求すること", organization: "元条件はORなので30や5でも片方が真になる。", knowledge: "論理和ORと論理積AND", steps: "境界内の14と範囲外の5・30を代入し、元条件の不具合を確認してANDへ直す。", answer: "AとB", verification: "修正後は13と19を含み、12と20は偽になる。", commonMistake: "日本語の『または』と範囲条件の『かつ』を混同すること。", strategy: "境界値と境界の直外をテストする", reviewGuide: "分岐と繰り返し講座の論理演算を復習する。", reviewTags: ["論理演算", "バグ"], mistakeTags: ["ORとANDの混同"],
  },
  {
    id: "info-unit-prog-09-function-purpose", area: "programming", lessonId: "arrays-functions-decomposition", title: "関数の目的と戻り値", difficulty: "ct-prep", questionType: "single-choice", minutes: 7,
    prompt: "関数average(a,b,c)は (a+b+c) div 3 を返す。mainで x←average(8,11,14)、y←average(2,5,8)、x-yを表示する。処理の説明として最も適切なものを1つ選びなさい。",
    choices: [["二組の整数平均を求め、その差6を表示する", "x=33 div 3=11、y=15 div 3=5なので差は6。"], ["六つの数の合計48を表示する", "関数は合計ではなく3で整数除算した値を返す。"], ["引数a,b,cを変更して14を表示する", "引数は各呼出しの局所的な値で、最大値を返す処理ではない。"], ["小数の平均5.5を表示する", "どちらの平均も整数であり、さらに表示するのは平均同士の差である。"]], correctIndices: [0],
    firstCheck: "関数が返す式と、mainが表示するのはx-yである点", organization: "1回目は33 div 3、2回目は15 div 3。", knowledge: "関数、引数、戻り値、整数除算", steps: "各呼出しを独立に計算し、戻り値11と5をx,yへ代入して差を取る。", answer: "二組の平均の差6", verification: "11-5=6。引数の個数と呼出し回数も一致する。", commonMistake: "関数内部の合計を戻り値と思う、または二回の引数を混ぜること。", strategy: "関数呼出しを小さな式へ置き換えてからmainを読む", reviewGuide: "配列・関数・分解講座の引数と戻り値を復習する。", reviewTags: ["関数", "引数", "戻り値"], mistakeTags: ["戻り値の取り違え"], programCode: "function average(a, b, c)\n  return (a + b + c) div 3\nendfunction\nx ← average(8, 11, 14)\ny ← average(2, 5, 8)\nx - y を表示", expectedOutput: "6", variableStates: ["1回目: a=8,b=11,c=14,戻り値=11", "2回目: a=2,b=5,c=8,戻り値=5", "main: x=11,y=5"],
  },
  {
    id: "info-unit-prog-10-sort-complexity", area: "programming", lessonId: "algorithms-search-simulation", title: "並べ替え1巡と比較回数", difficulty: "ct-prep", questionType: "program-trace", minutes: 7,
    prompt: "隣り合う要素を左から比較し、左が大きければ交換する処理を1巡だけ行う。A=[5,2,4,1] の1巡後と比較回数の組を1つ選びなさい。",
    choices: [["[2,4,1,5]、3回", "(5,2),(5,4),(5,1)を順に比較・交換し、要素数4なので比較は3回。"], ["[1,2,4,5]、3回", "1巡だけでは完全整列せず、最小値1は先頭まで移動しない。"], ["[2,5,4,1]、1回", "最初の交換だけで処理を止めている。"], ["[2,4,1,5]、4回", "隣接する組は4要素なら3組であり、配列外の比較はしない。"]], correctIndices: [0],
    firstCheck: "完全な並べ替えではなく『1巡だけ』であること", organization: "比較位置は1-2、2-3、3-4の3回。交換後の配列を次の比較へ使う。", knowledge: "隣接交換と比較回数の初歩", steps: "[5,2,4,1]→[2,5,4,1]→[2,4,5,1]→[2,4,1,5]。", answer: "[2,4,1,5]、3回", verification: "最大値5が1巡で末尾へ移り、配列外参照はない。", commonMistake: "1巡で完全整列すると考える、または初期配列だけで全比較すること。", strategy: "交換後の配列を毎回書き直し、比較位置を数える", reviewGuide: "探索とシミュレーション講座の並べ替えと計算量を復習する。", reviewTags: ["並べ替え", "比較回数"], mistakeTags: ["1巡と完全整列の混同"], programCode: "A ← [5, 2, 4, 1]\nfor i を 1 から 3 まで\n  if A[i] > A[i+1] then\n    A[i] と A[i+1] を交換\n  endif\nendfor\nA を表示", expectedOutput: "[2, 4, 1, 5]", variableStates: ["開始: [5,2,4,1]", "i=1: [2,5,4,1]", "i=2: [2,4,5,1]", "i=3: [2,4,1,5]"], indexRule: PSEUDOCODE_RULES,
  },
];

const NETWORK_PROBLEMS: readonly PracticeSeed[] = [
  {
    id: "info-unit-network-01-lan-wan-router", area: "network", lessonId: "network-communication", title: "LAN・WANとルータ", difficulty: "basic", questionType: "single-choice", minutes: 3,
    prompt: "校内の複数教室のLANをまとめ、外部のWANへパケットを転送する装置の役割として最も適切なものを1つ選びなさい。",
    choices: [["ルータが宛先ネットワークを見て転送先を選ぶ", "異なるネットワーク間でパケットの経路を選ぶ役割である。"], ["ディスプレイがIPアドレスを配布する", "表示装置にDHCPの役割はない。"], ["DNSがLANケーブルの信号を増幅する", "DNSは名前とIPアドレスの対応を扱い、物理信号の増幅装置ではない。"], ["クライアントが常に全サーバのデータを保存する", "クライアント・サーバ方式は要求と提供の役割分担であり、全保存を意味しない。"]], correctIndices: [0],
    firstCheck: "LANとWANという異なるネットワークの境界", organization: "端末はLAN内、外部接続はルータを経由する。", knowledge: "LAN、WAN、ルータ、パケット", steps: "異なるネットワーク間の宛先判断を担う装置を選ぶ。", answer: "ルータ", verification: "LAN内だけで完結する通信とWAN向け通信で転送先を分けられる。", commonMistake: "DNSやDHCPとルータの役割を混同すること。", strategy: "装置が扱う対象が名前・アドレス配布・経路のどれかを分ける", reviewGuide: "ネットワーク通信講座のLAN・WAN・ルータを復習する。", reviewTags: ["LAN", "WAN", "ルータ"], mistakeTags: ["ネットワーク機器の役割混同"],
  },
  {
    id: "info-unit-network-02-dns-dhcp-order", area: "network", lessonId: "internet-web-dns", title: "DHCP・DNS・サーバの対応", difficulty: "standard", questionType: "matching-ordering", minutes: 5,
    prompt: "端末が起動後に https://study.example のページを開くまでの役割の対応として正しいものを1つ選びなさい。",
    choices: [["DHCP:端末へ設定を配布／DNS:名前をIPアドレスへ対応／Webサーバ:ページを返す", "三つの役割と通信順の対応が正しい。"], ["DNS:端末へ電源を供給／DHCP:ページ本文を返す／Webサーバ:名前解決", "各サービスの役割がすべて入れ替わっている。"], ["DHCP:名前解決／DNS:ページ本文／Webサーバ:IPアドレスの自動配布", "DHCPとDNSとWebサーバの担当を混同している。"], ["ルータだけで三つの処理をすべて行う", "ルータは経路選択を担うが、名前解決やWeb本文提供を一括して行うとは限らない。"]], correctIndices: [0],
    firstCheck: "起動時の設定、名前解決、ページ提供の三段階", organization: "DHCP→端末設定、DNS→study.exampleの名前解決、Webサーバ→応答。", knowledge: "DHCP、DNS、クライアント・サーバ", steps: "各サービスが入力として受け取り、何を返すかを対応させる。", answer: "DHCP=設定配布、DNS=名前解決、Webサーバ=ページ提供", verification: "名前をIPへ変換した後、クライアントはその宛先へWeb要求を送れる。", commonMistake: "DNSがIPアドレス自体を端末へ自動設定すると考えること。", strategy: "通信手順を『設定→宛先特定→内容取得』に分ける", reviewGuide: "インターネット・Web・DNS講座を復習する。", reviewTags: ["DHCP", "DNS", "クライアント・サーバ"], mistakeTags: ["DNSとDHCPの混同"],
  },
  {
    id: "info-unit-network-03-transfer-time", area: "network", lessonId: "network-communication", title: "データ量と実効転送時間", difficulty: "standard", questionType: "numeric-input", minutes: 5,
    prompt: "40MBのファイルを実効速度20Mbpsで送る。1MB=1,000,000byte、1byte=8bitとし、遅延は無視する。転送時間を秒で入力しなさい。",
    choices: [["16秒", "40×8=320Mbitを20Mbit/sで割ると16秒。"], ["2秒", "byteをbitへ8倍する換算を忘れて40÷20としている。"], ["20秒", "データ量と速度の数値だけを掛け違えている。"], ["160秒", "Mの単位はそろっているのに余分な10倍をしている。"]], correctIndices: [0], correctNumber: 16, acceptedNumericAnswers: [16], numericTolerance: 0, answerUnit: "秒（入力は数値16のみ）", roundingRule: "理論値ではなく、問題文に示した実効速度を使用。許容誤差は0。",
    firstCheck: "データ量はbyte、通信速度はbit毎秒であること", organization: "40MB=320Mbit、実効速度20Mbit/s。", knowledge: "1byte=8bitと転送時間=データ量÷速度", steps: "40×8=320Mbitに直し、320÷20=16秒。", answer: "16秒", verification: "20Mbpsで16秒なら20×16=320Mbitとなり元の40MBへ戻る。", commonMistake: "40MB÷20Mbps=2としてbit/byteを混同すること。", strategy: "割り算の前にデータ量と速度の単位をそろえる", reviewGuide: "ネットワーク通信講座の通信速度計算を復習する。", reviewTags: ["通信速度", "bitとbyte"], mistakeTags: ["bit-byte換算忘れ"], calculationRule: "40MB×8=320Mbit、320Mbit÷20Mbit/s=16s",
  },
  {
    id: "info-unit-network-04-fault-diagnosis", area: "network", lessonId: "internet-web-dns", title: "通信障害箇所の判断", difficulty: "ct-prep", questionType: "table-graph", minutes: 7,
    prompt: "校内端末で障害が起きた。表の確認結果から、最初に重点確認する箇所として最も適切なものを1つ選びなさい。",
    choices: [["端末からルータまでのLAN", "ルータの管理画面へ到達できているので、この区間は少なくとも通信可能である。"], ["DNSの名前解決", "IPアドレス192.0.2.10へ直接到達でき、study.exampleだけ失敗するため名前解決が疑わしい。"], ["Webサーバの電源", "IPアドレスを直接指定すると応答があるので、サーバ停止とは考えにくい。"], ["端末のキーボード", "入力装置は名前解決だけが失敗する状況の原因にならない。"]], correctIndices: [1],
    firstCheck: "IPアドレス直接指定と名前指定で結果が異なる行", organization: "ルータ到達可、IP直接のWeb応答あり、study.exampleの名前だけ失敗。", knowledge: "障害切り分け、DNSとIPアドレス", steps: "物理/LAN、経路、宛先サーバ、名前解決を順に切り分け、成功している区間を候補から外す。", answer: "DNSの名前解決", verification: "名前をIPへ対応できれば、すでに成功したIP直接通信と同じ宛先へ到達できる。", commonMistake: "Webが開かないという結果だけでサーバ停止と決めること。", strategy: "成功した試験を使って正常な区間を消去する", reviewGuide: "インターネット・Web・DNS講座の障害切り分けを復習する。", reviewTags: ["DNS", "障害切り分け"], mistakeTags: ["症状だけで原因を断定"], tableData: { caption: "端末Aの確認結果", headers: ["確認", "結果"], rows: [["ルータ管理画面", "表示できる"], ["192.0.2.10 のWebページ", "表示できる"], ["study.example のWebページ", "表示できない"], ["DNS問い合わせ", "応答なし"]] }, sourceNote: "192.0.2.0/24 と .example は文書用の架空設定として使用。",
  },
  {
    id: "info-unit-network-05-redundancy-protocol", area: "network", lessonId: "network-communication", title: "冗長化とプロトコル", difficulty: "ct-prep", questionType: "multiple-select", minutes: 7,
    prompt: "資料では校内サーバへの経路が1本だけで、途中装置の停止時に全端末が利用不能になった。可用性を高める改善として妥当なものを2つ選びなさい。",
    choices: [["重要な経路や装置を二重化し、片方の停止時に切り替えられるようにする", "単一障害点を減らし、通信継続の可能性を高める。"], ["通信手順を端末ごとに別々の独自仕様にする", "共通プロトコルを失い、相互接続と運用を難しくする。"], ["切替手順を定期的に試験し、監視で障害を検知する", "設備だけでなく実際に切り替わるかを確認できる。"], ["すべてのパケットを永久保存すれば停止しない", "保存量を増やしても経路や装置の停止対策にはならない。"]], correctIndices: [0, 2],
    firstCheck: "原因が単一の経路・装置という単一障害点であること", organization: "冗長経路と切替運用の二面が必要。プロトコルは通信規約であり停止防止装置ではない。", knowledge: "冗長化、可用性、プロトコル、監視", steps: "障害時にも代替を残す案と、代替が機能することを検証する案を選ぶ。", answer: "AとC", verification: "片系停止の模擬試験で通信継続を確認できれば改善効果を測れる。", commonMistake: "予備を置くだけで切替試験や監視は不要と考えること。", strategy: "設備の冗長性と運用の実効性をセットで見る", reviewGuide: "ネットワーク通信講座の冗長化とプロトコルを復習する。", reviewTags: ["冗長化", "可用性", "プロトコル"], mistakeTags: ["予備設備だけで安心"],
  },
];

const SECURITY_PROBLEMS: readonly PracticeSeed[] = [
  {
    id: "info-unit-security-01-cia", area: "security", lessonId: "info-security-basics", title: "機密性・完全性・可用性", difficulty: "basic", questionType: "single-choice", minutes: 3,
    prompt: "学習記録サービスで障害が起きても授業中に利用を続けられるよう、予備サーバへ切り替える対策が主に高める性質を1つ選びなさい。",
    choices: [["機密性", "許可されない閲覧を防ぐ性質で、予備サーバの主目的ではない。"], ["完全性", "不正な改ざんを防ぎ正しさを保つ性質で、切替の中心目的とは異なる。"], ["可用性", "必要なときにサービスを使える状態を保つ対策である。"], ["匿名性", "利用者を特定しない性質であり、CIAの三要素のこの場面には当たらない。"]], correctIndices: [2],
    firstCheck: "対策の目的が『利用を続ける』ことである点", organization: "予備サーバは停止時間を減らす。", knowledge: "機密性・完全性・可用性", steps: "秘密を守る、正しさを守る、使える状態を守るの三つへ目的を分類する。", answer: "可用性", verification: "主サーバ停止時も代替へ切り替われば利用可能時間が増える。", commonMistake: "安全対策をすべて機密性と呼ぶこと。", strategy: "守りたい対象が秘密・正しさ・利用可能性のどれかを問う", reviewGuide: "情報セキュリティ基礎講座のCIAを復習する。", reviewTags: ["CIA", "可用性"], mistakeTags: ["CIAの目的混同"],
  },
  {
    id: "info-unit-security-02-auth-hash-match", area: "security", lessonId: "info-security-basics", title: "認証・認可・ハッシュ・暗号化", difficulty: "standard", questionType: "matching-ordering", minutes: 5,
    prompt: "用語と目的の対応として正しい組合せを1つ選びなさい。",
    choices: [["認証:本人確認／認可:操作権限の決定／ハッシュ:改ざん検知など／暗号化:鍵で内容を読める形へ戻せる保護", "四用語の役割を区別できている。"], ["認証:権限付与／認可:本人確認／ハッシュ:必ず復号／暗号化:復号不能", "認証と認可、ハッシュと暗号化をそれぞれ逆にしている。"], ["認証と認可は同義、ハッシュと暗号化も同義", "目的と可逆性が異なるため同義ではない。"], ["ハッシュ:予備サーバへの切替／暗号化:通信速度の増加", "どちらもその用途を直接担う技術ではない。"]], correctIndices: [0],
    firstCheck: "本人か、何を許すか、元へ戻す必要があるか", organization: "認証は主体、認可は権限。一般的なハッシュは一方向、暗号化は鍵で復号する。", knowledge: "認証・認可・ハッシュ・暗号化の役割", steps: "各用語を質問『誰か』『何をしてよいか』『同一性確認か』『秘密化か』へ対応させる。", answer: "Aの組合せ", verification: "ログイン後でも管理者操作が許されるとは限らないため認証と認可は別である。", commonMistake: "パスワードハッシュを暗号化されたパスワードと呼ぶこと。", strategy: "目的と可逆性の二軸で整理する", reviewGuide: "情報セキュリティ基礎講座の認証・暗号技術を復習する。", reviewTags: ["認証", "認可", "ハッシュ", "暗号化"], mistakeTags: ["認証と認可の混同", "ハッシュと暗号化の混同"],
  },
  {
    id: "info-unit-security-03-layered-defense", area: "security", lessonId: "info-security-basics", title: "多要素認証とバックアップ", difficulty: "standard", questionType: "multiple-select", minutes: 5,
    prompt: "学習サービスの防御を改善する対策として、目的の説明が妥当なものを2つ選びなさい。",
    choices: [["パスワードと端末上の確認コードを組み合わせ、認証要素を増やす", "知識要素と所持要素を組み合わせ、パスワード漏えいだけでの侵入を難しくする。"], ["バックアップを本体と同じ場所だけに置き、常時上書きする", "障害やマルウェアの影響を同時に受け、復旧用コピーを失う可能性がある。"], ["復元試験を行った分離バックアップを保ち、障害時の可用性回復に備える", "コピーの存在だけでなく復元可能性を確かめる対策である。"], ["パスワードを長くすれば、認可設定や更新は不要になる", "一つの対策でアクセス制御や脆弱性対策を代替できない。"]], correctIndices: [0, 2],
    firstCheck: "対策と目的の因果が具体的に結びついているか", organization: "多要素認証は認証強化、分離バックアップは復旧と可用性に関係する。", knowledge: "多要素認証、バックアップ、アクセス制御、層状防御", steps: "『一つで完全』という案と単一障害点を残す案を除き、異なる失敗へ備える二案を選ぶ。", answer: "AとC", verification: "認証情報漏えいとデータ破損という別のリスクへそれぞれ対応する。", commonMistake: "複雑なパスワード一つで全リスクを解消できると考えること。", strategy: "各対策がどの脅威と資産を守るかを対応させる", reviewGuide: "情報セキュリティ基礎講座の多層防御を復習する。", reviewTags: ["多要素認証", "バックアップ"], mistakeTags: ["単一対策への過信"],
  },
  {
    id: "info-unit-security-04-phishing-response", area: "security", lessonId: "info-security-basics", title: "フィッシング疑いへの初動", difficulty: "ct-prep", questionType: "single-choice", minutes: 6,
    prompt: "校内サービスを名乗る『至急、リンクから再認証』というメールが届いた。差出人表示は似ているが、リンク先が校内案内と異なる。最適な初動を1つ選びなさい。",
    choices: [["リンクを開き、正しいパスワードか試す", "疑わしいサイトへ認証情報を渡す危険を高める。"], ["メールへ返信して本物か尋ねる", "送信者が偽装されている可能性があり、同じ経路での確認は不十分である。"], ["リンクを開かず、既知の公式窓口やブックマークから確認し、担当へ報告する", "疑わしい経路を避け、独立した連絡手段で確認できる。"], ["同級生全員へそのメールを転送する", "被害範囲を広げる可能性がある。"]], correctIndices: [2],
    firstCheck: "緊急性をあおる文面と、公式案内と異なるリンク先", organization: "フィッシングの疑いがあるため、メール内のリンク・返信経路を信用しない。", knowledge: "フィッシング、ソーシャルエンジニアリング、独立経路での確認", steps: "操作を止め、既知の公式経路から状態を確認し、組織の担当へ共有する。", answer: "リンクを開かず公式経路で確認・報告", verification: "疑わしいURLへアクセスせずに正規サービスの状態と担当者の判断を得られる。", commonMistake: "表示名が正しい、または急ぎだから本物だと判断すること。", strategy: "疑わしい通信と同じ経路を使わず確認する", reviewGuide: "情報セキュリティ基礎講座のフィッシング対策を復習する。", reviewTags: ["フィッシング", "初動対応"], mistakeTags: ["疑わしいリンクを開く"],
  },
  {
    id: "info-unit-security-05-incident-logs", area: "security", lessonId: "info-security-basics", title: "インシデント対応とログ", difficulty: "ct-prep", questionType: "multiple-select", minutes: 7,
    prompt: "共有端末で見覚えのない警告と大量通信が確認された。安全な初動と調査の原則として妥当なものを2つ選びなさい。",
    choices: [["組織の手順に従いネットワークから隔離し、担当者へ速やかに連絡する", "被害拡大を抑えつつ正式な対応へ引き継げる。"], ["原因不明のままログをすべて削除して端末を使い続ける", "調査証拠を失い、通信や被害が継続する恐れがある。"], ["時刻・端末・検知内容を記録し、ログを保全して影響範囲の確認に使う", "事実を追跡し、どこまで影響したかの判断材料になる。"], ["警告を閉じれば完全に解決したと判断する", "表示を消しても原因や不正通信が止まったとは限らない。"]], correctIndices: [0, 2],
    firstCheck: "被害拡大防止と調査証拠保全の両方が必要な点", organization: "隔離・連絡と、記録・ログ保全を並行する。勝手な削除や継続利用は避ける。", knowledge: "インシデント対応、隔離、ログ、脆弱性・マルウェアへの防御原則", steps: "まず影響を広げない状態にし、時系列を保全して組織手順へ引き継ぐ。", answer: "AとC", verification: "隔離後も担当者がログから発生時刻や影響端末を追跡できる。", commonMistake: "証拠を消して初期化すれば報告不要と考えること。", strategy: "封じ込め・証拠保全・報告の三点を欠かさない", reviewGuide: "情報セキュリティ基礎講座のインシデント対応とログを復習する。", reviewTags: ["インシデント対応", "ログ", "マルウェア"], mistakeTags: ["ログ削除", "報告遅延"],
  },
];

const OTHER_AREA_PROBLEMS: readonly PracticeSeed[] = [
  {
    id: "info-unit-digital-01-binary", area: "digital-representation", lessonId: "number-systems-bits", title: "2進数から10進数への変換", difficulty: "basic", questionType: "single-choice", minutes: 3,
    prompt: "2進数 10110 を10進数で表したものを1つ選びなさい。",
    choices: [["18", "16+2としており、4の位を落としている。"], ["20", "16+4で、2の位を落としている。"], ["22", "16+4+2=22である。"], ["10110", "桁列を10進数の一万百十として読んでいる。"]], correctIndices: [2],
    firstCheck: "右端から1,2,4,8,16の位を対応させること", organization: "10110は16の位、4の位、2の位が1。", knowledge: "2進数の位取り", steps: "1×16+0×8+1×4+1×2+0×1を計算する。", answer: "22", verification: "22を16,4,2へ分解すると10110へ戻る。", commonMistake: "1が立つ位を一つ落とすこと。", strategy: "各桁の重みを書いてから1の位だけ足す", reviewGuide: "数体系とビット講座の2進数変換を復習する。", reviewTags: ["2進数", "位取り"], mistakeTags: ["桁の重みの誤り"], calculationRule: "16+4+2=22",
  },
  {
    id: "info-unit-digital-02-image-size", area: "digital-representation", lessonId: "digital-text-image-audio", title: "画像の解像度と色深度", difficulty: "basic", questionType: "single-choice", minutes: 4,
    prompt: "圧縮しない横800画素×縦600画素、1画素24bitの画像のおよそのデータ量として正しいものを1つ選びなさい。1byte=8bitとする。",
    choices: [["1,440,000byte", "800×600×24÷8=1,440,000byte。"], ["480,000byte", "画素数だけで、1画素3byteを掛けていない。"], ["11,520,000byte", "bitの総数をbyteへ換算せずbyteとした。"], ["33,600byte", "縦横や色深度を足しており、画素ごとのデータ量を掛けていない。"]], correctIndices: [0],
    firstCheck: "画素数と1画素あたりbit数、最後のbit→byte換算", organization: "画素数480,000、1画素24bit=3byte。", knowledge: "解像度、色深度、データ量", steps: "800×600×24÷8を計算する。", answer: "1,440,000byte", verification: "480,000画素×3byteでも同じ値になる。", commonMistake: "24bitを24byteとして8倍大きくすること。", strategy: "画素数×色深度を計算し、単位を最後にそろえる", reviewGuide: "文字・画像・音のデジタル化講座を復習する。", reviewTags: ["画像", "解像度", "色深度"], mistakeTags: ["bit-byte換算忘れ"], calculationRule: "800×600×24÷8=1,440,000byte",
  },
  {
    id: "info-unit-digital-03-compression-audio", area: "digital-representation", lessonId: "data-size-compression-error", title: "用途に応じた圧縮", difficulty: "standard", questionType: "single-choice", minutes: 4,
    prompt: "同じ音声を保存する方法を選ぶ。編集用の原音を保ちたい場合と、通信量を減らして配信したい場合の考え方として最も適切なものを1つ選びなさい。",
    choices: [["編集用は可逆または非圧縮、配信用は許容品質を確認して非可逆圧縮も検討する", "復元性と容量という用途の違いに合わせている。"], ["どちらも必ず最大の非可逆圧縮にする", "編集用原音の情報を失い、品質要件も無視する。"], ["圧縮率が高いほど必ず音質も高い", "一般に強い非可逆圧縮は情報損失が増える可能性がある。"], ["音声はデジタル化してもデータ量を持たない", "標本化・量子化された音声はbit列としてデータ量を持つ。"]], correctIndices: [0],
    firstCheck: "編集用は復元性、配信用は容量と品質の両立が目的", organization: "可逆圧縮は元へ戻せ、非可逆圧縮は一部情報を省いて小さくできる。", knowledge: "音のデジタル化、可逆・非可逆圧縮", steps: "用途ごとの優先順位を整理し、一律に圧縮率だけを最大化する案を除く。", answer: "編集用と配信用で方式を使い分ける", verification: "編集用コピーから原音を保ち、配信コピーは試聴などで品質を確認できる。", commonMistake: "圧縮率と品質を同じ方向の指標と考えること。", strategy: "復元性・容量・品質のどれを優先するか決める", reviewGuide: "データ量・圧縮・誤り講座を復習する。", reviewTags: ["音声", "圧縮", "データ量"], mistakeTags: ["圧縮率と品質の混同"],
  },
  {
    id: "info-unit-computer-01-components", area: "computer-systems", lessonId: "computer-components-operation", title: "CPU・メモリ・補助記憶", difficulty: "basic", questionType: "single-choice", minutes: 3,
    prompt: "アプリを起動するとき、補助記憶装置に保存されたプログラムを主記憶へ読み込み、CPUが命令を処理する説明として正しいものを1つ選びなさい。",
    choices: [["CPUは命令を処理し、主記憶は実行中のデータや命令を保持する", "各装置の基本的な役割に合う。"], ["主記憶は電源を切っても必ず永久保存する", "一般的な主記憶は電源断で内容を失う。"], ["補助記憶装置だけがすべての演算を実行する", "長期保存が主な役割で、命令実行の中心はCPUである。"], ["入力装置がOSを使わず直接すべての資源を管理する", "資源管理はOSの重要な役割である。"]], correctIndices: [0],
    firstCheck: "処理・実行中保持・長期保存の役割分担", organization: "CPU=処理、主記憶=実行中保持、補助記憶=長期保存。", knowledge: "コンピュータの構成要素", steps: "各装置の主目的を対応させ、役割を入れ替えた案を除く。", answer: "CPUが処理し、主記憶が実行中情報を保持", verification: "起動前は補助記憶、実行中は主記憶とCPUという流れになる。", commonMistake: "主記憶と補助記憶の揮発性・用途を逆にすること。", strategy: "処理・一時保持・長期保持の三語へ分類する", reviewGuide: "コンピュータの構成と動作講座を復習する。", reviewTags: ["CPU", "主記憶", "補助記憶"], mistakeTags: ["装置役割の混同"],
  },
  {
    id: "info-unit-computer-02-os-io", area: "computer-systems", lessonId: "computer-components-operation", title: "OSと入出力管理", difficulty: "standard", questionType: "single-choice", minutes: 4,
    prompt: "複数アプリが同時にプリンタを使おうとしたとき、OSの役割として最も適切なものを1つ選びなさい。",
    choices: [["印刷要求を管理し、装置を安全に共有できるよう順序を調整する", "OSは入出力装置や処理資源を管理する。"], ["すべてのアプリの内容をインターネットへ公開する", "資源管理と無関係で、機密性も損なう。"], ["CPUのクロック周波数を無限に上げる", "物理的制約があり、印刷要求の調整方法でもない。"], ["プリンタを論理回路のANDゲートへ置き換える", "論理回路は装置共有の運用を直接代替しない。"]], correctIndices: [0],
    firstCheck: "複数アプリが一つの入出力装置を共有する状況", organization: "同時要求を待ち行列などで調整する必要がある。", knowledge: "OSの資源管理と入出力制御", steps: "競合する資源を仲介し、利用順序を管理する説明を選ぶ。", answer: "OSが印刷要求と装置共有を管理", verification: "各アプリが直接競合せず、要求ごとに印刷を完了できる。", commonMistake: "OSを単なる画面デザインと考えること。", strategy: "利用者・アプリとハードウェアの間を管理する役割を見る", reviewGuide: "コンピュータの構成と動作講座のOSを復習する。", reviewTags: ["OS", "入出力"], mistakeTags: ["OS役割の過小評価"],
  },
  {
    id: "info-unit-computer-03-performance-logic", area: "computer-systems", lessonId: "computer-components-operation", title: "性能指標と論理回路", difficulty: "standard", questionType: "single-choice", minutes: 5,
    prompt: "装置の安全条件を「センサAとBがともに1のときだけ動作」とする。必要な論理と、性能比較の注意の組合せとして正しいものを1つ選びなさい。",
    choices: [["AND。クロック周波数だけでなくコア数や処理内容も含めて比較する", "両入力が1のときだけ1となり、性能も単一指標だけでは決まらない。"], ["OR。周波数が高ければ条件に関係なく必ず高速", "ORはどちらか一方でも動作し、性能の断定も強すぎる。"], ["NOT。メモリ容量だけでCPU性能が完全に決まる", "入力反転は二入力同時条件でなく、性能要因も一つではない。"], ["XOR。補助記憶容量が大きければ演算回数は0", "XORは片方だけ1のとき動作し、記憶容量と演算回数を混同している。"]], correctIndices: [0],
    firstCheck: "『AとBがともに』という条件語", organization: "論理条件はAND。性能は周波数、コア、メモリ、処理内容など複数要因。", knowledge: "AND回路と性能指標", steps: "真理値条件をANDへ対応させ、性能を一指標だけで断定しない組を選ぶ。", answer: "ANDと複数指標での比較", verification: "A=B=1の一通りだけ出力1になる。", commonMistake: "日常語の『または』と論理回路、容量と速度を混同すること。", strategy: "論理条件と性能評価を別々に判定してから組を選ぶ", reviewGuide: "コンピュータの構成と動作講座の論理回路・性能を復習する。", reviewTags: ["論理回路", "性能指標"], mistakeTags: ["ANDとORの混同", "単一性能指標への依存"],
  },
  {
    id: "info-unit-design-01-accessibility", area: "information-design", lessonId: "info-design-communication", title: "対象利用者とアクセシビリティ", difficulty: "basic", questionType: "single-choice", minutes: 3,
    prompt: "高齢者を含む利用者向けの避難案内画面を改善する。最も適切な案を1つ選びなさい。",
    choices: [["重要情報を見出しで階層化し、十分な文字サイズとコントラストを確保し、色だけに頼らない", "対象利用者と緊急時の読み取りやすさ、アクセシビリティを同時に考えている。"], ["すべての文字を薄い灰色の最小サイズにする", "視認性を下げ、読みにくくする。"], ["危険度を赤と緑の色だけで区別する", "色覚特性や白黒表示では区別できない可能性がある。"], ["情報を一段落に詰め、見出しをなくす", "情報の階層が失われ、必要箇所を探しにくい。"]], correctIndices: [0],
    firstCheck: "対象利用者と緊急時に素早く読めるか", organization: "階層、文字サイズ、配色、色以外の手掛かりが必要。", knowledge: "情報デザイン、視認性、アクセシビリティ", steps: "対象者の利用状況を想定し、複数の感覚的手掛かりと情報階層を備える案を選ぶ。", answer: "階層化・十分な視認性・色以外の手掛かり", verification: "白黒表示や色の見え方が異なる場合も、文字と形で意味を確認できる。", commonMistake: "見栄えの統一を優先してコントラストを下げること。", strategy: "対象者・目的・利用環境の順で表現を評価する", reviewGuide: "情報デザインとコミュニケーション講座を復習する。", reviewTags: ["アクセシビリティ", "視認性", "対象利用者"], mistakeTags: ["色だけに依存"],
  },
  {
    id: "info-unit-design-02-process-order", area: "information-design", lessonId: "info-design-communication", title: "情報デザインの改善手順", difficulty: "standard", questionType: "matching-ordering", minutes: 5,
    prompt: "案内ページを改善する手順として最も適切な並びを1つ選びなさい。①対象利用者と目的を確認 ②情報を階層化して試作 ③利用テストで課題を記録 ④結果を基に改善",
    choices: [["①→②→③→④", "目的設定、試作、評価、改善という反復可能な順序である。"], ["④→③→②→①", "目的を確認する前に改善内容を決めている。"], ["②→④→①→③", "対象利用者を後回しにし、評価前に改善している。"], ["③→①→④→②", "試作物がない段階で利用テストを始めている。"]], correctIndices: [0],
    firstCheck: "評価には試作が必要で、試作には目的確認が必要なこと", organization: "調査・設計・評価・改善の流れ。", knowledge: "情報デザインのプロセスと評価", steps: "各工程の前提関係を確認して、①②③④へ並べる。", answer: "①→②→③→④", verification: "改善後は再び利用テストへ戻る反復も可能になる。", commonMistake: "作り手の好みで試作し、対象利用者の確認を最後にすること。", strategy: "各工程に必要な入力が前工程で得られるかを見る", reviewGuide: "情報デザイン講座の設計・評価・改善を復習する。", reviewTags: ["デザインプロセス", "評価改善"], mistakeTags: ["対象利用者の確認不足"],
  },
  {
    id: "info-unit-society-01-rights-reliability", area: "information-society", lessonId: "info-morals-ip-privacy", title: "著作権・個人情報・信頼性", difficulty: "basic", questionType: "single-choice", minutes: 4,
    prompt: "学校広報へ資料を載せる前の確認として最も適切なものを1つ選びなさい。",
    choices: [["画像の利用条件を確認し、個人が特定される情報は必要性と同意・取扱いを確認し、内容を複数の根拠で確かめる", "権利、個人情報、信頼性を目的に沿って確認している。"], ["検索結果に出た画像はすべて自由に転載する", "公開されていることと自由に利用できることは同じではない。"], ["氏名を消せば写真や位置情報の確認は不要", "顔や背景などから個人が特定される可能性がある。"], ["最初に見つけた投稿だけを根拠に断定する", "情報源の信頼性や他の根拠を確認していない。"]], correctIndices: [0],
    firstCheck: "素材の権利、個人の特定可能性、情報源の三点", organization: "広報目的に必要な範囲で、利用条件と根拠を確認する。", knowledge: "著作権、個人情報、情報モラル、情報の信頼性", steps: "素材ごとに利用許諾、個人情報、事実確認を行う案を選ぶ。", answer: "権利・個人情報・根拠を確認する", verification: "掲載後に説明できるよう、出典・許諾・確認結果を記録できる。", commonMistake: "インターネット上の公開物はすべて転載自由と考えること。", strategy: "使えるか、載せてよいか、正しいかを別々に確認する", reviewGuide: "情報モラル・知的財産・プライバシー講座を復習する。", reviewTags: ["著作権", "個人情報", "信頼性"], mistakeTags: ["公開と自由利用の混同"],
  },
  {
    id: "info-unit-society-02-problem-solving", area: "information-society", lessonId: "info-society-problem-solving", title: "問題解決の評価と改善", difficulty: "standard", questionType: "single-choice", minutes: 5,
    prompt: "図書委員会が待ち時間短縮を目標に受付方法を変更した。変更後の評価として最も適切なものを1つ選びなさい。",
    choices: [["変更前後で同じ定義の待ち時間を測り、利用者の困りごとも確認して次の改善へつなげる", "目標指標と副作用を比較し、改善を反復できる。"], ["担当者の印象だけで成功と決める", "客観的な評価基準や利用者の状況を確認していない。"], ["待ち時間以外の影響は一切記録しない", "入力ミスや利用しにくさなどの副作用を見落とす。"], ["結果が悪ければ測定値を削除する", "評価の信頼性を損ない、原因分析ができない。"]], correctIndices: [0],
    firstCheck: "目標が待ち時間短縮で、変更前後を同条件で比べる必要があること", organization: "評価指標、利用者の声、副作用を記録する。", knowledge: "問題発見、解決案、実行、評価、改善", steps: "目標に対応する測定と質的な確認を組み合わせ、次の改善に使える案を選ぶ。", answer: "同じ定義で前後比較し、困りごとも確認", verification: "待ち時間が減っても入力ミスが増えていないかを同時に判断できる。", commonMistake: "実施したこと自体を成果とみなし、評価を省くこと。", strategy: "目標指標・比較条件・副作用の三点を確認する", reviewGuide: "情報社会と問題解決講座の評価・改善を復習する。", reviewTags: ["問題解決", "評価", "改善"], mistakeTags: ["評価基準不足"],
  },
];

export const INFORMATICS_UNIT_PRACTICE_PROBLEMS: readonly InformaticsProblem[] = [
  ...DATA_PROBLEMS,
  ...PROGRAMMING_PROBLEMS,
  ...NETWORK_PROBLEMS,
  ...SECURITY_PROBLEMS,
  ...OTHER_AREA_PROBLEMS,
].map(buildProblem);
