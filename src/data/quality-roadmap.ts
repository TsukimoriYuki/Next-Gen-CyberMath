// 「次に人手で仕上げるべき教材」の優先順位付きロードマップ。
// AIによる問題の大量生成ではなく、中核教材の手動監修へ軸足を移す方針を
// 隠さずに見せるためのデータ。実装が進んだら status を更新すること。

export type RoadmapStatus = "todo" | "in-progress" | "done";

export interface RoadmapItem {
  priority: number;
  title: string;
  summary: string;
  status: RoadmapStatus;
  category: "冊子型模試" | "中核講義" | "大問型演習" | "人間レビュー";
}

export const QUALITY_ROADMAP: RoadmapItem[] = [
  {
    priority: 1,
    title: "共通テスト数学IA 冊子型模試 第2回",
    summary:
      "第1回（手動作成版・PDF正本）と同じ品質基準で、第2回のPDF冊子と採点データを作成する。",
    status: "todo",
    category: "冊子型模試",
  },
  {
    priority: 2,
    title: "共通テスト数学IA 冊子型模試 第3回",
    summary: "第2回に続けて、出題テーマを変えた第3回を作成する。",
    status: "todo",
    category: "冊子型模試",
  },
  {
    priority: 3,
    title: "図形と計量 中核講義＋代表例題",
    summary:
      "AM-GM講義と同水準の密度（定義・導出・判別フロー・代表例題・別解・誤答分析・時短ポイント）で書き直す。",
    status: "todo",
    category: "中核講義",
  },
  {
    priority: 4,
    title: "図形の性質 中核講義＋代表例題",
    summary: "円周角・方べき・チェバ/メネラウスの判別フローと代表例題を、AM-GM密度で整備する。",
    status: "todo",
    category: "中核講義",
  },
  {
    priority: 5,
    title: "場合の数と確率 中核講義＋代表例題",
    summary: "順列・組合せ・条件付き確率の判別フローと代表例題を、AM-GM密度で整備する。",
    status: "todo",
    category: "中核講義",
  },
  {
    priority: 6,
    title: "二次関数 中核講義＋代表例題",
    summary: "軸・端点・場合分けの判別フローと代表例題を、AM-GM密度で整備する。",
    status: "todo",
    category: "中核講義",
  },
  {
    priority: 7,
    title: "各大問型手動演習（full-section-manual）",
    summary:
      "技能分解ドリルとは別に、文章量・誘導・時間配分まで本番同等に再現した大問1問分の通し演習を、大問ごとに手動作成する。",
    status: "todo",
    category: "大問型演習",
  },
  {
    priority: 8,
    title: "固定模試 standard-private-math-1a-001 の人間レビュー",
    summary: "手動作成・自己監修の状態から、第三者レビューを経た状態へ引き上げる。",
    status: "todo",
    category: "人間レビュー",
  },
  {
    priority: 9,
    title: "英語リーディング長文の人間レビュー",
    summary: "オリジナル性・出典管理・難度整合の観点で、既存長文セットを第三者レビューする。",
    status: "todo",
    category: "人間レビュー",
  },
];
