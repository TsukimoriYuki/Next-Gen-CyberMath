import type {
  CommonTestDifficulty,
  CommonTestMockExam,
  CommonTestQuestion,
  ExamAsset,
  ExamChoice,
} from "@/data/common-test-mock-exams";

export const INFORMATICS_DIAGNOSTIC_DOMAINS = [
  "情報社会・情報モラル",
  "セキュリティ",
  "情報デザイン",
  "デジタル表現",
  "プログラミング",
  "ネットワーク・データ活用",
] as const;

export const INFORMATICS_MISTAKE_CAUSES = [
  "用語理解不足",
  "条件の読み落とし",
  "単位変換ミス",
  "計算ミス",
  "擬似コード規則の見落とし",
  "トレースミス",
  "表の対応関係の誤認",
  "相関と因果の混同",
  "グラフ選択ミス",
  "セキュリティ対策の目的の混同",
] as const;

type Domain = (typeof INFORMATICS_DIAGNOSTIC_DOMAINS)[number];
type Mistake = (typeof INFORMATICS_MISTAKE_CAUSES)[number];

type ChoiceInput = Readonly<{
  text: string;
  correct?: boolean;
  reason: string;
}>;

function examChoices(items: readonly ChoiceInput[]): ExamChoice[] {
  return items.map((item, index) => ({
    id: String(index),
    label: String.fromCharCode(65 + index),
    text: item.text,
    isCorrect: item.correct,
    trap: item.reason,
  }));
}

function choiceQuestion(input: {
  id: string;
  prompt: string;
  choices: readonly ChoiceInput[];
  explanation: string;
  lessonHref: string;
  domain: Domain;
  mistake: Mistake;
  difficulty?: CommonTestDifficulty;
  multi?: boolean;
  dependsOnPrevious?: boolean;
}): CommonTestQuestion {
  const correct = input.choices.flatMap((choice, index) =>
    choice.correct ? [String(index)] : [],
  );
  return {
    id: input.id,
    prompt: input.prompt,
    answerFormat: input.multi ? "multi-choice" : "choice",
    choices: examChoices(input.choices),
    points: 5,
    difficulty: input.difficulty ?? "standard",
    skillTags: [input.domain],
    commonMistakes: [input.mistake],
    diagnosticDomains: [input.domain],
    mistakeCauseIds: [input.mistake],
    answer: input.multi ? correct : correct[0],
    explanation: `${input.explanation} 誤答の確認: ${input.choices
      .map((choice, index) => `${String.fromCharCode(65 + index)}は${choice.reason}`)
      .join(" ")}`,
    shortSolution: input.explanation,
    reviewLinks: [input.lessonHref],
    measuredAbility: input.domain,
    timeSavingTip: "資料の条件と問われている目的を先に対応させる。",
    dependsOnPrevious: input.dependsOnPrevious,
  };
}

function numericQuestion(input: {
  id: string;
  prompt: string;
  answer: string;
  explanation: string;
  lessonHref: string;
  domain: Domain;
  mistake: Mistake;
  dependsOnPrevious?: boolean;
}): CommonTestQuestion {
  return {
    id: input.id,
    prompt: input.prompt,
    answerFormat: "numeric",
    points: 5,
    difficulty: "standard",
    skillTags: [input.domain],
    commonMistakes: [input.mistake],
    diagnosticDomains: [input.domain],
    mistakeCauseIds: [input.mistake],
    answer: input.answer,
    explanation: input.explanation,
    shortSolution: input.explanation,
    reviewLinks: [input.lessonHref],
    measuredAbility: input.domain,
    timeSavingTip: "単位をそろえてから式を一行で立てる。",
    dependsOnPrevious: input.dependsOnPrevious,
  };
}

function materials(
  id: string,
  title: string,
  lines: { speaker: string; text: string }[],
  headers: string[],
  rows: string[][],
  note?: string,
): ExamAsset[] {
  return [
    { type: "conversation", id: `${id}-conversation`, title, lines },
    { type: "table", id: `${id}-table`, title: `${title}の資料`, headers, rows, note },
  ];
}

const SOCIETY = "/courses/informatics-1/information-society-problem-solving/info-society-problem-solving";
const MORALS = "/courses/informatics-1/information-society-problem-solving/info-morals-ip-privacy";
const SECURITY = "/courses/informatics-1/information-society-problem-solving/info-security-basics";
const DESIGN = "/courses/informatics-1/information-design-communication/info-design-communication";
const BITS = "/courses/informatics-1/computer-digital-data/number-systems-bits";
const MEDIA = "/courses/informatics-1/computer-digital-data/digital-text-image-audio";
const DATA_SIZE = "/courses/informatics-1/computer-digital-data/data-size-compression-error";
const VARIABLES = "/courses/informatics-1/programming-algorithms/variables-expressions-io";
const LOOPS = "/courses/informatics-1/programming-algorithms/branching-loops";
const ARRAYS = "/courses/informatics-1/programming-algorithms/arrays-functions-decomposition";
const ALGORITHMS = "/courses/informatics-1/programming-algorithms/algorithms-search-simulation";
const NETWORK = "/courses/informatics-1/network-data-use/network-communication";
const WEB = "/courses/informatics-1/network-data-use/internet-web-dns";
const DATABASE = "/courses/informatics-1/network-data-use/databases-data-organization";
const ANALYSIS = "/courses/informatics-1/network-data-use/data-analysis-visualization-modeling";

function practice(input: {
  id: string;
  title: string;
  unit: string;
  theme: string;
  leadText: string;
  assets: ExamAsset[];
  questions: CommonTestQuestion[];
  lessons: { label: string; href: string }[];
}): CommonTestMockExam {
  return {
    id: input.id,
    slug: input.id,
    title: input.title,
    subject: "informatics",
    subjectLabel: "情報Ⅰ",
    backHref: "/informatics/practice",
    durationMinutes: 20,
    totalPoints: 25,
    targetAverage: { min: 14, max: 18 },
    source: "original-web",
    status: "published",
    lectureLinks: input.lessons,
    sections: [
      {
        id: `${input.id}-section`,
        title: "大問",
        unit: input.unit,
        points: 25,
        estimatedMinutes: 20,
        theme: input.theme,
        leadText: input.leadText,
        assets: input.assets,
        questions: input.questions,
      },
    ],
  };
}

export const INFORMATICS_SECTION_PRACTICES: CommonTestMockExam[] = [
  practice({
    id: "information-society-security",
    title: "情報社会・権利・セキュリティ",
    unit: "学校行事サイトの安全な運営",
    theme: "公開、引用、個人情報、認証を目的に応じて判断する。",
    leadText: "文化祭実行委員会がWebサイトと来場者アンケートを準備している。資料は教育的な一般原則を示し、個別事例の法的判断を行うものではない。",
    assets: materials(
      "society",
      "実行委員の相談",
      [
        { speaker: "ミナ", text: "目的を決めてから、必要な情報だけを集めよう。" },
        { speaker: "ソウ", text: "写真と参考資料の扱い、管理画面の認証も確認したい。" },
      ],
      ["項目", "案", "用途"],
      [
        ["アンケート", "満足度・学年・自由記述", "来年度の改善"],
        ["管理画面", "パスワード＋確認コード", "担当者だけが更新"],
        ["写真", "掲載同意を確認した写真", "当日の紹介"],
      ],
    ),
    lessons: [
      { label: "問題解決", href: SOCIETY },
      { label: "情報モラル", href: MORALS },
      { label: "セキュリティ", href: SECURITY },
    ],
    questions: [
      choiceQuestion({ id: "isp-soc-01", prompt: "アンケート改善を始める最初の行動として最も適切なものを選べ。", choices: [
        { text: "目的と評価基準を明確にする", correct: true, reason: "正答。収集項目を目的から決められる。" },
        { text: "収集できる情報をすべて集める", reason: "誤り。必要性を検討せず過剰収集になる。" },
        { text: "結果を先に公開する", reason: "誤り。収集・分析前には結果がない。" },
        { text: "特定の回答だけ残す", reason: "誤り。分析をゆがめる。" },
      ], explanation: "問題解決は目的の明確化、計画、収集・分析、評価・改善の順に進める。", lessonHref: SOCIETY, domain: "情報社会・情報モラル", mistake: "用語理解不足" }),
      choiceQuestion({ id: "isp-soc-02", prompt: "来年度改善だけが目的である。収集を避けるべき項目をすべて選べ。", multi: true, choices: [
        { text: "満足度", reason: "誤り。改善の評価に直接使える。" },
        { text: "学年", reason: "誤り。学年別傾向を見る目的が明確なら使える。" },
        { text: "自宅の詳細な住所", correct: true, reason: "正答。目的に不要な個人情報である。" },
        { text: "個人用メールのパスワード", correct: true, reason: "正答。収集してはならない認証情報である。" },
      ], explanation: "目的に必要な範囲を超える個人情報や認証情報は収集しない。", lessonHref: MORALS, domain: "情報社会・情報モラル", mistake: "条件の読み落とし", dependsOnPrevious: true }),
      choiceQuestion({ id: "isp-soc-03", prompt: "外部資料をサイトで引用するときの説明として最も適切なものを選べ。", choices: [
        { text: "引用部分を区別し、出所を示し、自分の説明が主になるよう必要な範囲で使う", correct: true, reason: "正答。引用の基本的な考え方を満たす。" },
        { text: "URLを示せば全文を転載できる", reason: "誤り。出所表示だけで無制限な転載にはならない。" },
        { text: "学校内なら出所を示さなくてよい", reason: "誤り。利用場所だけで引用要件は消えない。" },
        { text: "文章を少し変えれば自作になる", reason: "誤り。出所や権利への配慮が必要である。" },
      ], explanation: "引用箇所と自分の文章を明確に分け、必要性のある範囲で出所を示す。", lessonHref: MORALS, domain: "情報社会・情報モラル", mistake: "用語理解不足" }),
      choiceQuestion({ id: "isp-soc-04", prompt: "『管理者確認のため、リンク先で直ちにパスワードを再入力せよ』というメールを受け取った。最も適切な初動を選べ。", choices: [
        { text: "メールのリンクを使わず、既知の公式入口から状況を確認する", correct: true, reason: "正答。偽リンクを避けて確認できる。" },
        { text: "急いでリンク先へ入力する", reason: "誤り。急がせる文面はフィッシングの典型的な注意点である。" },
        { text: "同じメールを全員へ転送する", reason: "誤り。不審リンクを拡散する。" },
        { text: "添付ファイルを開いて確認する", reason: "誤り。不審な添付を開く必要はない。" },
      ], explanation: "不審な連絡は記載リンクを使わず、公式に確認済みの経路から確かめる。", lessonHref: SECURITY, domain: "セキュリティ", mistake: "セキュリティ対策の目的の混同" }),
      choiceQuestion({ id: "isp-soc-05", prompt: "管理画面に多要素認証を加える主な目的を選べ。", choices: [
        { text: "異なる種類の要素を組み合わせ、パスワード流出だけでは侵入しにくくする", correct: true, reason: "正答。単一要素の破綻に備える。" },
        { text: "通信内容を必ず暗号化する", reason: "誤り。通信暗号化とは別の役割である。" },
        { text: "投稿内容を自動で正しくする", reason: "誤り。内容の正確性は保証しない。" },
        { text: "個人情報の収集目的を決める", reason: "誤り。認証と収集目的は別である。" },
      ], explanation: "知識・所持・生体など異なる種類の要素を組み合わせ、認証の耐性を高める。", lessonHref: SECURITY, domain: "セキュリティ", mistake: "セキュリティ対策の目的の混同" }),
    ],
  }),
  practice({
    id: "information-design-reading",
    title: "情報デザイン・資料の読み取り",
    unit: "避難案内の改善",
    theme: "受け手と目的に応じ、誤解しにくい表現を選ぶ。",
    leadText: "生徒会は校内の避難案内と説明会資料を改善する。色覚や画面幅、読み上げ利用の違いも考慮する。",
    assets: materials("design", "案内係の相談", [
      { speaker: "ユイ", text: "色だけでなく、形や文字でも区別しよう。" },
      { speaker: "レン", text: "比較には同じ基準の表とグラフを使いたい。" },
    ], ["案", "区別方法", "目盛"], [
      ["A", "赤・緑だけ", "0から100"],
      ["B", "色＋記号＋文字", "0から100"],
      ["C", "模様だけ", "70から100"],
    ]),
    lessons: [{ label: "情報デザイン", href: DESIGN }],
    questions: [
      choiceQuestion({ id: "isp-des-01", prompt: "避難経路の区別として最もアクセシブルな案を選べ。", choices: [
        { text: "赤と緑だけで示す", reason: "誤り。色の違いを認識しにくい人へ伝わらない。" },
        { text: "色に加えて実線・破線と経路名を併記する", correct: true, reason: "正答。複数の手掛かりで区別できる。" },
        { text: "小さな文字だけで示す", reason: "誤り。視認性が低い。" },
        { text: "点滅だけで示す", reason: "誤り。利用者への負担があり情報も残らない。" },
      ], explanation: "色、形、線種、文字を組み合わせ、色だけに意味を依存させない。", lessonHref: DESIGN, domain: "情報デザイン", mistake: "グラフ選択ミス" }),
      choiceQuestion({ id: "isp-des-02", prompt: "参加率82%と86%の差を比較する棒グラフで、縦軸を80%から始める場合の注意として最も適切なものを選べ。", choices: [
        { text: "差が実際より大きく見えやすいので、軸の範囲を明示する", correct: true, reason: "正答。切断軸による強調を読み手へ示せる。" },
        { text: "差がなく見える", reason: "誤り。むしろ差が強調される。" },
        { text: "目盛は不要になる", reason: "誤り。値を読むため目盛が必要である。" },
        { text: "必ず円グラフへ変える", reason: "誤り。時点や比較目的に合う表現を選ぶ。" },
      ], explanation: "軸の省略や範囲変更は差の見え方を変えるため、明示して解釈する。", lessonHref: DESIGN, domain: "情報デザイン", mistake: "グラフ選択ミス" }),
      choiceQuestion({ id: "isp-des-03", prompt: "3会場について、収容人数・駅からの時間・費用という複数項目を正確に比較したい。最初に使う資料として最も適切なものを選べ。", choices: [
        { text: "項目を列にそろえた比較表", correct: true, reason: "正答。異なる尺度の値を項目ごとに比較できる。" },
        { text: "装飾写真だけのポスター", reason: "誤り。数値比較ができない。" },
        { text: "各会場で縮尺の異なる棒グラフ", reason: "誤り。基準が違い誤解を招く。" },
        { text: "費用だけを示す円グラフ", reason: "誤り。3項目を比較できない。" },
      ], explanation: "複数の対象と複数項目の正確な照合には、見出しをそろえた表が向く。", lessonHref: DESIGN, domain: "情報デザイン", mistake: "表の対応関係の誤認", dependsOnPrevious: true }),
      choiceQuestion({ id: "isp-des-04", prompt: "スマートフォン向け避難ページの優先配置として最も適切なものを選べ。", choices: [
        { text: "現在地別の避難先と緊急連絡をページ上部に置く", correct: true, reason: "正答。緊急時の主要タスクへ早く到達できる。" },
        { text: "沿革を最上部に長文で置く", reason: "誤り。緊急時の優先情報ではない。" },
        { text: "操作ボタンを画面外へ置く", reason: "誤り。発見・操作しにくい。" },
        { text: "意味のない装飾を増やす", reason: "誤り。重要情報の識別を妨げる。" },
      ], explanation: "受け手の状況と最重要タスクを先に定め、情報の優先順位を画面へ反映する。", lessonHref: DESIGN, domain: "情報デザイン", mistake: "条件の読み落とし" }),
      choiceQuestion({ id: "isp-des-05", prompt: "読み上げソフトでも内容を理解しやすくする改善をすべて選べ。", multi: true, choices: [
        { text: "画像に代替テキストを設定する", correct: true, reason: "正答。画像の意味を音声で伝えられる。" },
        { text: "見出しを論理的な順序にする", correct: true, reason: "正答。文書構造を移動しやすい。" },
        { text: "重要情報を色だけで示す", reason: "誤り。色が伝わらない利用方法がある。" },
        { text: "表から見出しセルをなくす", reason: "誤り。セルの関係が分かりにくくなる。" },
      ], explanation: "代替テキスト、見出し構造、表見出しなど意味構造を機械にも伝える。", lessonHref: DESIGN, domain: "情報デザイン", mistake: "用語理解不足" }),
    ],
  }),
  practice({
    id: "digital-data-size",
    title: "デジタル表現・データ量",
    unit: "広報素材のデータ量と転送",
    theme: "進数、画像・音声、圧縮、転送を単位付きで計算する。",
    leadText: "以下では1KB=1000B、1MB=1000KB、1B=8bitとする。画像・音声のヘッダーは無視し、圧縮前後を明記した理論値を用いる。",
    assets: materials("digital", "配信担当の相談", [
      { speaker: "アオ", text: "画像と音声は圧縮前の理論値から計算しよう。" },
      { speaker: "キイ", text: "通信速度はbit/秒だからbyteとの換算が必要だね。" },
    ], ["素材", "条件", "圧縮後"], [
      ["画像", "800×600画素・24bit/画素", "圧縮前の40%"],
      ["音声", "8000Hz・8bit・10秒・モノラル", "圧縮なし"],
    ], "通信速度は4Mbps（4,000,000bit/秒）とする。"),
    lessons: [{ label: "進数", href: BITS }, { label: "画像と音声", href: MEDIA }, { label: "データ量", href: DATA_SIZE }],
    questions: [
      numericQuestion({ id: "isp-dig-01", prompt: "2進数101101を10進数で答えよ。", answer: "45", explanation: "1×32+0×16+1×8+1×4+0×2+1=45。", lessonHref: BITS, domain: "デジタル表現", mistake: "計算ミス" }),
      choiceQuestion({ id: "isp-dig-02", prompt: "2進数11101110を16進数で表したものを選べ。英字の大文字・小文字は同じ値を表す。", choices: [
        { text: "EE", correct: true, reason: "正答。1110と1110はともにEである。" },
        { text: "E7", reason: "誤り。後半1110を0111と取り違えている。" },
        { text: "77", reason: "誤り。1110は7ではなくEである。" },
        { text: "FE", reason: "誤り。前半1110はFではない。" },
      ], explanation: "右から4bitずつ1110・1110に分け、それぞれEへ変換してEE。", lessonHref: BITS, domain: "デジタル表現", mistake: "計算ミス", dependsOnPrevious: true }),
      numericQuestion({ id: "isp-dig-03", prompt: "表の画像の圧縮前データ量をBで答えよ。", answer: "1440000", explanation: "800×600×24÷8=1,440,000B。24bit/画素を8で割ってbyteへ直す。", lessonHref: MEDIA, domain: "デジタル表現", mistake: "単位変換ミス" }),
      numericQuestion({ id: "isp-dig-04", prompt: "表の音声のデータ量をBで答えよ。", answer: "80000", explanation: "8000回/秒×8bit×10秒×1ch÷8=80,000B。", lessonHref: MEDIA, domain: "デジタル表現", mistake: "単位変換ミス" }),
      numericQuestion({ id: "isp-dig-05", prompt: "画像を圧縮前の40%にして4Mbpsで送る。転送時間の理論値を秒で答えよ。", answer: "1.152", explanation: "1,440,000B×0.40×8=4,608,000bit。4,608,000÷4,000,000=1.152秒。", lessonHref: DATA_SIZE, domain: "デジタル表現", mistake: "単位変換ミス", dependsOnPrevious: true }),
    ],
  }),
  practice({
    id: "programming-algorithms",
    title: "プログラミング・アルゴリズム",
    unit: "貸出番号を処理するプログラム",
    theme: "規則を確認してトレースし、探索方法を選ぶ。",
    leadText: "擬似コードでは←を代入、==を等価比較に使う。配列の添字は0から始まる。a以上b以下の反復は両端を含む。整数除算x DIV yは小数部分を切り捨てる。乱数rand(1,6)は1以上6以下の整数を返す。",
    assets: materials("program", "担当者の相談", [
      { speaker: "ナオ", text: "まず規則と初期値を確認してから追跡しよう。" },
      { speaker: "リク", text: "二分探索には整列済みの配列が必要だね。" },
    ], ["添字", "0", "1", "2", "3", "4"], [["data", "3", "8", "8", "12", "17"]]),
    lessons: [{ label: "変数", href: VARIABLES }, { label: "分岐と反復", href: LOOPS }, { label: "配列と関数", href: ARRAYS }, { label: "探索", href: ALGORITHMS }],
    questions: [
      numericQuestion({ id: "isp-pro-01", prompt: "x←5、y←2、x←x×3+y を順に実行した後のxを答えよ。", answer: "17", explanation: "最後の右辺は5×3+2=17なので、xへ17を代入する。", lessonHref: VARIABLES, domain: "プログラミング", mistake: "トレースミス" }),
      numericQuestion({ id: "isp-pro-02", prompt: "s←0 とした後、iを1から5まで1ずつ増やしながら s←s+i を実行する。終了時のsを答えよ。", answer: "15", explanation: "両端を含むため1+2+3+4+5=15。", lessonHref: LOOPS, domain: "プログラミング", mistake: "擬似コード規則の見落とし" }),
      choiceQuestion({ id: "isp-pro-03", prompt: "表のdataについて、count←0 とし、iを0から4まで動かして data[i]==8 ならcountを1増やす。終了時のcountを選べ。", choices: [
        { text: "1", reason: "誤り。8は2要素にある。" },
        { text: "2", correct: true, reason: "正答。添字1と2が8である。" },
        { text: "3", reason: "誤り。値3を個数に含めている。" },
        { text: "5", reason: "誤り。全要素数であり条件一致数ではない。" },
      ], explanation: "data[1]とdata[2]の2回だけ条件が真になる。", lessonHref: ARRAYS, domain: "プログラミング", mistake: "トレースミス", dependsOnPrevious: true }),
      choiceQuestion({ id: "isp-pro-04", prompt: "値17の位置を効率よく探したい。表のdataに対する説明として適切なものを選べ。", choices: [
        { text: "昇順なので二分探索を利用できる", correct: true, reason: "正答。同じ値を含むが非減少順に整列済みである。" },
        { text: "未整列なので二分探索は使えない", reason: "誤り。3,8,8,12,17の順に整列済みである。" },
        { text: "線形探索は必ず利用できない", reason: "誤り。線形探索も利用できる。" },
        { text: "乱数を使わないと探索できない", reason: "誤り。探索に乱数は不要である。" },
      ], explanation: "二分探索は探索対象がキー順に整列済みであることを前提とする。", lessonHref: ALGORITHMS, domain: "プログラミング", mistake: "条件の読み落とし" }),
      numericQuestion({ id: "isp-pro-05", prompt: "score←0 とし、rand(1,6)の結果が順に6,2,6だった。各回、結果が6ならscoreを2増やし、それ以外は1増やす。3回後のscoreを答えよ。", answer: "5", explanation: "6,2,6に対する加点は2+1+2=5。乱数値は問題文で固定されている。", lessonHref: ALGORITHMS, domain: "プログラミング", mistake: "トレースミス" }),
    ],
  }),
  practice({
    id: "network-web-database",
    title: "ネットワーク・Web・データベース",
    unit: "図書貸出サービスの設計",
    theme: "通信と表の役割を区別し、安全で整合的な構成を選ぶ。",
    leadText: "校内の端末からWebサーバへ接続し、図書表と貸出表を使う。HTTPSは通信経路を保護するが、接続先の内容や運営者の安全性まで保証するものではない。",
    assets: materials("network", "開発係の相談", [
      { speaker: "ハル", text: "名前はDNSでIPアドレスへ対応付ける。" },
      { speaker: "メイ", text: "表を結ぶキーと通信の役割を分けて考えよう。" },
    ], ["表", "主キー", "主なフィールド"], [
      ["図書", "book_id", "title, category"],
      ["貸出", "loan_id", "book_id, user_id, due_date"],
    ]),
    lessons: [{ label: "ネットワーク", href: NETWORK }, { label: "WebとDNS", href: WEB }, { label: "データベース", href: DATABASE }],
    questions: [
      choiceQuestion({ id: "isp-net-01", prompt: "DNSの主な役割として適切なものを選べ。", choices: [
        { text: "ドメイン名とIPアドレスの対応を調べる", correct: true, reason: "正答。名前による指定を通信先アドレスへ対応付ける。" },
        { text: "Webページの内容を必ず審査する", reason: "誤り。内容の安全性を保証しない。" },
        { text: "通信内容を圧縮する", reason: "誤り。DNSの主目的ではない。" },
        { text: "表の主キーを決める", reason: "誤り。データベース設計の役割である。" },
      ], explanation: "DNSは人が扱いやすいドメイン名と通信で使うIPアドレスを対応付ける。", lessonHref: WEB, domain: "ネットワーク・データ活用", mistake: "用語理解不足" }),
      choiceQuestion({ id: "isp-net-02", prompt: "HTTPS接続から直接判断できることとして最も適切なものを選べ。", choices: [
        { text: "ブラウザと接続先の間の通信経路が暗号化などで保護される", correct: true, reason: "正答。HTTPSの中心的な役割である。" },
        { text: "掲載情報がすべて正しい", reason: "誤り。内容の正確性は保証しない。" },
        { text: "運営者が必ず信頼できる", reason: "誤り。事業者の善良性まで保証しない。" },
        { text: "端末内の全ファイルが暗号化される", reason: "誤り。通信経路の保護とは別である。" },
      ], explanation: "HTTPSは接続の認証と通信経路の保護に役立つが、内容自体の正しさは別に評価する。", lessonHref: WEB, domain: "セキュリティ", mistake: "セキュリティ対策の目的の混同" }),
      choiceQuestion({ id: "isp-net-03", prompt: "大きなデータを複数のパケットに分けて送る利点として適切なものを選べ。", choices: [
        { text: "回線を複数通信で共有し、失われた部分だけ再送しやすい", correct: true, reason: "正答。パケット交換の利点を表す。" },
        { text: "通信規約が不要になる", reason: "誤り。送受信にはプロトコルが必要である。" },
        { text: "必ず同じ経路を通る", reason: "誤り。経路が異なる場合もある。" },
        { text: "データ量が必ず0になる", reason: "誤り。分割しても情報は送る。" },
      ], explanation: "パケット単位で共有・経路制御・再送を行える。", lessonHref: NETWORK, domain: "ネットワーク・データ活用", mistake: "用語理解不足" }),
      choiceQuestion({ id: "isp-net-04", prompt: "貸出表のbook_idの役割として最も適切なものを選べ。", choices: [
        { text: "図書表のbook_idを参照して貸出中の図書を結び付ける外部キー", correct: true, reason: "正答。2表の対応を表す。" },
        { text: "貸出表の各行を必ず一意にする主キー", reason: "誤り。表ではloan_idが主キーである。" },
        { text: "通信速度を表すフィールド", reason: "誤り。図書の識別子である。" },
        { text: "WebページのURL", reason: "誤り。表間参照の値である。" },
      ], explanation: "貸出.book_idは図書.book_idを参照し、貸出記録と図書を関連付ける。", lessonHref: DATABASE, domain: "ネットワーク・データ活用", mistake: "表の対応関係の誤認", dependsOnPrevious: true }),
      choiceQuestion({ id: "isp-net-05", prompt: "categoryが『科学』の図書だけをtitleの昇順で表示する処理として適切な順序を選べ。", choices: [
        { text: "categoryで条件抽出し、その結果をtitleで昇順に並べる", correct: true, reason: "正答。抽出対象を絞ってから指定順に並べる。" },
        { text: "titleを削除してから全行を表示する", reason: "誤り。必要な表示項目を失う。" },
        { text: "loan_idで降順にするだけ", reason: "誤り。条件も並べ替え列も違う。" },
        { text: "categoryを主キーへ変更する", reason: "誤り。カテゴリ値は重複し主キーに適さない。" },
      ], explanation: "選択条件はcategory='科学'、並べ替えキーはtitleの昇順である。", lessonHref: DATABASE, domain: "ネットワーク・データ活用", mistake: "表の対応関係の誤認" }),
    ],
  }),
  practice({
    id: "data-analysis-modeling",
    title: "データ分析・モデル化",
    unit: "学習支援策の検討",
    theme: "収集から評価までの限界を踏まえ、データを適切に扱う。",
    leadText: "学校は学習時間と確認テスト結果を分析する。欠損や外れ値は原因を確認し、機械的に削除しない。相関だけから因果関係を断定しない。",
    assets: materials("analysis", "分析班の相談", [
      { speaker: "サキ", text: "欠損や外れ値の理由を確認して処理を決めよう。" },
      { speaker: "トウ", text: "訓練用と評価用を分けて性能を確かめたい。" },
    ], ["生徒", "学習時間", "得点", "端末"], [
      ["A", "2.0", "62", "PC"],
      ["B", "欠損", "70", "スマートフォン"],
      ["C", "20.0", "74", "PC"],
      ["D", "3.0", "78", "スマートフォン"],
    ], "学習時間の単位は時間。Cは入力ミスか実測値か未確認である。"),
    lessons: [{ label: "データ分析とモデル化", href: ANALYSIS }],
    questions: [
      choiceQuestion({ id: "isp-ana-01", prompt: "生徒Bの学習時間が欠損している。最初の対応として最も適切なものを選べ。", choices: [
        { text: "欠損理由と収集方法を確認し、除外・補完・別扱いを目的に応じて決める", correct: true, reason: "正答。原因と影響に基づいて処理できる。" },
        { text: "必ず0を入れる", reason: "誤り。未記録と0時間は異なる。" },
        { text: "必ず行を削除する", reason: "誤り。目的や欠損の仕組みを無視している。" },
        { text: "得点も欠損にする", reason: "誤り。得点は観測されている。" },
      ], explanation: "欠損の発生理由、量、分析への影響を確認して処理方法を選ぶ。", lessonHref: ANALYSIS, domain: "ネットワーク・データ活用", mistake: "条件の読み落とし" }),
      choiceQuestion({ id: "isp-ana-02", prompt: "生徒Cの20.0時間が他より大きい。適切な扱いを選べ。", choices: [
        { text: "入力記録や定義を確認し、誤りなら修正し、実測値なら目的に応じて扱う", correct: true, reason: "正答。外れ値の原因を確認している。" },
        { text: "大きい値はすべて削除する", reason: "誤り。重要な実測値かもしれない。" },
        { text: "平均値へ必ず置換する", reason: "誤り。根拠なく情報を変えている。" },
        { text: "得点74も削除する", reason: "誤り。関連する観測まで自動削除する根拠がない。" },
      ], explanation: "外れ値は入力ミス、特殊事例、妥当な観測など原因を調べて判断する。", lessonHref: ANALYSIS, domain: "ネットワーク・データ活用", mistake: "条件の読み落とし", dependsOnPrevious: true }),
      choiceQuestion({ id: "isp-ana-03", prompt: "端末の種類ごとに『得点70以上・未満』の人数を比較したい。適切な集計を選べ。", choices: [
        { text: "端末種類と得点区分のクロス集計", correct: true, reason: "正答。2つのカテゴリの組合せを数えられる。" },
        { text: "生徒名の文字数の平均", reason: "誤り。目的の変数と無関係である。" },
        { text: "得点だけの時系列グラフ", reason: "誤り。時系列情報がなく端末比較もできない。" },
        { text: "学習時間の最大値だけ", reason: "誤り。端末と得点区分の関係を示さない。" },
      ], explanation: "行と列に端末種類・得点区分を置くクロス集計で組合せ別人数を比較する。", lessonHref: ANALYSIS, domain: "ネットワーク・データ活用", mistake: "表の対応関係の誤認" }),
      choiceQuestion({ id: "isp-ana-04", prompt: "多くの生徒で学習時間と得点に正の相関が見られた。この結果だけから言えることを選べ。", choices: [
        { text: "2変数がともに増える傾向はあるが、学習時間が得点上昇の原因とは断定できない", correct: true, reason: "正答。相関と因果を区別している。" },
        { text: "全員が長く学べば必ず満点になる", reason: "誤り。個人差や他要因を無視している。" },
        { text: "学習時間が得点の唯一の原因である", reason: "誤り。相関だけで唯一の原因とは言えない。" },
        { text: "2変数に関係は一切ない", reason: "誤り。正の相関という傾向は観測されている。" },
      ], explanation: "相関は共変動の傾向を示すが、交絡要因や逆方向の関係を排除しない。", lessonHref: ANALYSIS, domain: "ネットワーク・データ活用", mistake: "相関と因果の混同" }),
      choiceQuestion({ id: "isp-ana-05", prompt: "予測モデルを評価する方法として最も適切なものを選べ。", choices: [
        { text: "訓練に使っていない評価データで性能を測り、対象集団の偏りも確認する", correct: true, reason: "正答。未知データへの性能とデータ偏りを確認できる。" },
        { text: "訓練データへの一致だけで完成とする", reason: "誤り。過学習を見逃す。" },
        { text: "一つの成功例だけを見る", reason: "誤り。性能全体を評価できない。" },
        { text: "評価データを先に答えに合わせる", reason: "誤り。公平な評価にならない。" },
      ], explanation: "訓練と評価を分け、未知データでの指標とデータの代表性・偏りを確認する。", lessonHref: ANALYSIS, domain: "ネットワーク・データ活用", mistake: "条件の読み落とし" }),
    ],
  }),
];

export function getInformaticsSectionPractice(slug: string) {
  return INFORMATICS_SECTION_PRACTICES.find(
    (practiceExam) => (practiceExam.slug ?? practiceExam.id) === slug,
  );
}
