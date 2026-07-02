// 共通テスト対策タブ「問題解体型講座」のデータ構造。
//
// 冊子型模試や中核講義（MASTERY_LECTURE_GUIDES / SPECIAL_LECTURES）とは別に、
// public/problem1a/ に置かれたオリジナル問題PDFそのものを公開用の正本として、1つの大問（または
// その前半・後半）を「見るべきポイント」「本番での思考順」「詳しい解説」
// 「よくあるミス」「関連導線」で読み解くための講座ページ用の型。
// problem1a/ はローカル投入用フォルダとして扱う。
//
// 問題PDFの内容は改変しない。ここでの説明は概要・判断のポイントに絞り、
// PDF本文の逐語的な書き写しはしない。

export interface ProblemInsight {
  /** 問題文中の表現・記号（例: 「絶対値」「d > 0」）。 */
  expression: string;
  /** その表現を見たときに反応すべきこと（例: 「場合分けまたは区間化」）。 */
  reaction: string;
}

export interface ProblemExplanationSection {
  /** 設問番号やブロックの見出し（例: 「(1) 有理化と対称式」）。 */
  heading: string;
  /** 簡潔な解説。PDF本文の書き写しではなく、方針・着眼点の要約。 */
  body: string;
  /** この設問の基礎が不安なときに戻る、MATHタブの基礎講座（任意）。 */
  mathCourseLink?: RelatedLink;
}

export interface ProblemMistake {
  /** 起きやすいミス。 */
  mistake: string;
  /** そのミスが起きる原因。 */
  cause: string;
  /** 戻るべき講座（MATHタブの基礎講座、または共通テスト対策タブの中核講義）。 */
  returnTo: RelatedLink;
}

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

export interface CommonTestProblemLecture {
  id: string;
  title: string;
  /** 問題PDFの public 配下URL。この講座の正本であり、内容を改変しない。 */
  pdfUrl: string;
  /** 対応する大問・小問（例: 「第1問前半」）。 */
  targetSection: string;
  /** 出典科目の表示名（例: 「数学I・数学A」）。 */
  subjectLabel: string;
  /** 単元タグ。 */
  concepts: string[];
  /** この講座で鍛えること（箇条書き）。 */
  goals: string[];
  /** 見るべきポイント（問題文の表現 → 反応すべきこと）。 */
  insights: ProblemInsight[];
  /** 本番での思考順（時系列の番号付きステップ）。 */
  thinkingFlow: string[];
  /** 詳しい解説（設問ごと、簡潔に）。 */
  explanations: ProblemExplanationSection[];
  /** よくあるミス回収表。 */
  mistakes: ProblemMistake[];
  /** 基礎が不安なときに戻る、MATHタブの基礎講座（複数可）。 */
  relatedMathCourses: RelatedLink[];
  /** 判別フロー・代表例題を深く復習したいときの、共通テスト対策タブの中核講義。 */
  relatedCoreLectures: RelatedLink[];
  /** 関連する共通テスト模試・大問型演習。 */
  relatedMocks: RelatedLink[];
  /** 次に解くべき問題解体型講座（任意）。 */
  nextProblemLectures?: RelatedLink[];
  difficulty: string;
  estimatedTime: string;
}
