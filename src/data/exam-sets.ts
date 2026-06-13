// ── 本番レベル模試集 カテゴリ定義 ─────────────────────────────────────────
// 共通テスト（/common-test）とサイバー模試（/mock）とは別の、
// 大学別・レベル別の本番演習カテゴリを定義する。
//
// 今後、各カテゴリ内に ExamSet（模試セット）を追加するには:
//   1. ExamSet 型のオブジェクトを作成し、対応するカテゴリの examSets 配列に追加する。
//   2. 問題データは別ファイル（例: exam-sets-standard-private-1.ts）に定義し、
//      ここから参照する。
// ─────────────────────────────────────────────────────────────────────────

export type ExamSetCategoryId =
  | "standard-private"
  | "advanced-private"
  | "standard-national"
  | "advanced-national";

export type ExamSetStatus = "available" | "coming-soon";

export type ExamSet = {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  problemCount: number;
  status: ExamSetStatus;
};

export type ExamSetCategory = {
  id: ExamSetCategoryId;
  title: string;
  subtitle: string;
  targetSchools: string;
  format: string;
  description: string;
  /** Tailwind bg + text クラス（アイコン用）例: "bg-neon-cyan/10 text-neon-cyan" */
  iconColorClass: string;
  /** Tailwind テキストクラス（アクセント文字用）例: "text-neon-cyan" */
  accentTextClass: string;
  /** border + bg（カードのグロー枠線用） */
  borderColorClass: string;
  examSets: ExamSet[];
};

export const EXAM_SET_CATEGORIES: ExamSetCategory[] = [
  {
    id: "standard-private",
    title: "中堅私立模試",
    subtitle: "Standard Private",
    targetSchools: "日東駒専・産近甲龍・大東亜帝国など",
    format: "選択式・短答式中心",
    description:
      "基礎〜標準問題で計算力と典型解法を確認。速度と正確さを重視した構成で、基本方針の定着に最適です。",
    iconColorClass: "bg-neon-cyan/10 text-neon-cyan",
    accentTextClass: "text-neon-cyan",
    borderColorClass: "border-neon-cyan/20",
    examSets: [],
  },
  {
    id: "advanced-private",
    title: "上級私立模試",
    subtitle: "Advanced Private",
    targetSchools: "MARCH・関関同立・理科大・上位私大など",
    format: "標準〜応用問題・融合問題",
    description:
      "処理力と融合問題への対応力を鍛える。複数分野を横断した問題と、限られた時間内での判断力が問われます。",
    iconColorClass: "bg-neon-magenta/10 text-neon-magenta",
    accentTextClass: "text-neon-magenta",
    borderColorClass: "border-neon-magenta/20",
    examSets: [],
  },
  {
    id: "standard-national",
    title: "中堅国公立模試",
    subtitle: "Standard National",
    targetSchools: "地方国公立・中堅国公立など",
    format: "記述式・標準問題中心",
    description:
      "基本方針を立てて答案として書く練習。部分点を意識した記述力の養成と、論理的な解答構成の訓練。",
    iconColorClass: "bg-neon-lime/10 text-neon-lime",
    accentTextClass: "text-neon-lime",
    borderColorClass: "border-neon-lime/20",
    examSets: [],
  },
  {
    id: "advanced-national",
    title: "難関国公立模試",
    subtitle: "Advanced National",
    targetSchools: "旧帝大・東工大・一橋大・神戸大・筑波大など",
    format: "記述式・応用融合問題",
    description:
      "本格的な二次試験対策。記述力・発想力・論述力を問う難問で、最難関国公立への実戦力を養います。",
    iconColorClass: "bg-neon-amber/10 text-neon-amber",
    accentTextClass: "text-neon-amber",
    borderColorClass: "border-neon-amber/20",
    examSets: [],
  },
];

export function getExamSetCategory(id: ExamSetCategoryId): ExamSetCategory | undefined {
  return EXAM_SET_CATEGORIES.find((c) => c.id === id);
}
