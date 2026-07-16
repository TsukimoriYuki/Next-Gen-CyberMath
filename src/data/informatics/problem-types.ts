// 情報Ⅰ 演習問題の型定義。
// 数学の Problem 型（tier / unit / LogicSteps 前提）へ押し込まず、
// 選択式・場面判断中心の情報Ⅰ用に最小限の独立した型を定義する。

export type InformaticsProblemKind =
  | "single-choice" // 単一選択
  | "multi-select" // 複数選択（正答集合を明示する）
  | "true-false" // 正誤判定
  | "scenario" // 短い状況判断（単一選択形式）
  | "number" // 数値入力（共通の number 正規化を利用）
  | "pseudocode-output" // 擬似コードの出力を選ぶ
  | "trace" // トレース表を読んで選ぶ
  | "fill-blank" // プログラムの空欄補充
  | "algorithm-choice"; // 条件に合うアルゴリズムを選ぶ

export const INFORMATICS_KIND_META: Record<
  InformaticsProblemKind,
  { label: string; instruction: string }
> = {
  "single-choice": {
    label: "単一選択",
    instruction: "最も適切なものを1つ選んでください。",
  },
  "multi-select": {
    label: "複数選択",
    instruction: "適切なものをすべて選んでください。",
  },
  "true-false": {
    label: "正誤判定",
    instruction: "次の記述が正しいか誤りかを判定してください。",
  },
  scenario: {
    label: "状況判断",
    instruction: "場面を読み、最も適切な判断を1つ選んでください。",
  },
  number: {
    label: "数値回答",
    instruction: "答えを半角または全角の有限小数で入力してください。",
  },
  "pseudocode-output": {
    label: "擬似コードの出力",
    instruction: "規則と処理を追い、出力として正しいものを1つ選んでください。",
  },
  trace: {
    label: "トレース表",
    instruction: "変数や配列の変化を追い、正しいものを1つ選んでください。",
  },
  "fill-blank": {
    label: "空欄補充",
    instruction: "空欄に入る最も適切なものを1つ選んでください。",
  },
  "algorithm-choice": {
    label: "アルゴリズム選択",
    instruction: "条件に合う方法を1つ選んでください。",
  },
};

export type InformaticsDifficulty = "basic" | "standard" | "ct-prep";

export const INFORMATICS_DIFFICULTY_META: Record<
  InformaticsDifficulty,
  { label: string; description: string }
> = {
  basic: { label: "基礎", description: "講座の基本事項をそのまま確認する問題" },
  standard: {
    label: "標準",
    description: "基本事項を身近な場面に当てはめて判断する問題",
  },
  "ct-prep": {
    label: "共通テスト準備",
    description: "複数の観点を組み合わせて判断する、共通テストを意識した問題",
  },
};

export type InformaticsChoice = Readonly<{
  id: string;
  text: string;
  /** この選択肢が正答／誤答である理由。全選択肢に必須。 */
  reason: string;
}>;

export type InformaticsPracticeArea =
  | "data-use"
  | "programming"
  | "network"
  | "security"
  | "digital-representation"
  | "computer-systems"
  | "information-design"
  | "information-society";

export type InformaticsPracticeQuestionType =
  | "single-choice"
  | "multiple-select"
  | "numeric-input"
  | "matching-ordering"
  | "table-graph"
  | "program-trace";

export const INFORMATICS_PRACTICE_QUESTION_TYPE_LABEL: Record<
  InformaticsPracticeQuestionType,
  string
> = {
  "single-choice": "単一選択",
  "multiple-select": "複数選択",
  "numeric-input": "数値入力",
  "matching-ordering": "対応・並べ替え",
  "table-graph": "表・グラフ・資料読解",
  "program-trace": "プログラム読解・トレース",
};

export type InformaticsTableData = Readonly<{
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}>;

export type InformaticsChartData =
  | Readonly<{
      kind: "bar";
      title: string;
      unit: string;
      baseline?: number;
      values: readonly Readonly<{ label: string; value: number }>[];
    }>
  | Readonly<{
      kind: "scatter";
      title: string;
      xLabel: string;
      yLabel: string;
      points: readonly Readonly<{ label: string; x: number; y: number }>[];
    }>;

export type InformaticsTraceRow = Readonly<{
  step: string;
  values: readonly string[];
}>;

export type InformaticsProblem = Readonly<{
  /** URL slug を兼ねる一意ID。 */
  id: string;
  /** 明示的なURL slug。既存問題は未指定時に id をslugとして扱う。 */
  slug?: string;
  title: string;
  /** 対応する講座の lessonId（informatics-1 に実在すること）。 */
  lessonId: string;
  kind: InformaticsProblemKind;
  difficulty: InformaticsDifficulty;
  estimatedMinutes: number;
  prompt: string;
  choices: readonly InformaticsChoice[];
  /** 正答の選択肢ID。single-choice / true-false / scenario は必ず1つ。 */
  correctChoiceIds: readonly string[];
  /** kind === "number" の有限な数値正答。 */
  correctNumber?: number;
  /** 正答の考え方をまとめた解説。 */
  explanation: string;
  /** 独立検算できる計算過程またはトレース過程。 */
  solutionProcess?: string;
  /** 擬似コードを含む問題で採用する記号・添字・端点などの規則。 */
  pseudocodeRules?: string;
  reviewTags: readonly string[];
  /** 以下は2026年追加の単元別演習に必要な、既存問題と互換な拡張metadata。 */
  subjectId?: "informatics";
  unitId?: InformaticsPracticeArea;
  statement?: string;
  questionType?: InformaticsPracticeQuestionType;
  correctAnswer?: string | number | readonly string[];
  acceptedNumericAnswers?: readonly number[];
  numericTolerance?: number;
  answerUnit?: string;
  roundingRule?: string;
  detailedExplanation?: string;
  distractorReasons?: Readonly<Record<string, string>>;
  strategy?: string;
  firstCheck?: string;
  verification?: string;
  commonMistake?: string;
  relatedCourseIds?: readonly string[];
  mistakeTags?: readonly string[];
  estimatedTime?: number;
  copyrightStatus?: "original";
  sourceType?: "original";
  publicationStatus?: "beta";
  programCode?: string;
  traceTable?: Readonly<{
    headers: readonly string[];
    rows: readonly InformaticsTraceRow[];
  }>;
  expectedOutput?: string;
  variableStates?: readonly string[];
  indexRule?: string;
  tableData?: InformaticsTableData;
  chartData?: InformaticsChartData;
  calculationRule?: string;
  sourceNote?: string;
}>;
