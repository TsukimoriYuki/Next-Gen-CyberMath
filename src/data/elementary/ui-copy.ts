import type {
  ElementaryKanjiPolicyId,
  ElementaryTextAudience,
  ElementaryTextFieldContext,
} from "@/types/elementary-kanji";

export type ElementaryUiCopyEntry = Readonly<{
  id: string;
  text: string;
  audience: ElementaryTextAudience;
  policyId: ElementaryKanjiPolicyId | null;
  context: ElementaryTextFieldContext;
  sourceLocation: string;
}>;

const learner = (
  id: string,
  text: string,
  context: ElementaryTextFieldContext = "ui-copy",
): ElementaryUiCopyEntry => ({
  id,
  text,
  audience: "learner",
  policyId: "grade-3",
  context,
  sourceLocation: "src/data/elementary/ui-copy.ts",
});

const developer = (
  id: string,
  text: string,
  context: ElementaryTextFieldContext = "ui-copy",
): ElementaryUiCopyEntry => ({
  id,
  text,
  audience: "developer",
  policyId: null,
  context,
  sourceLocation: "src/data/elementary/ui-copy.ts",
});

export const ELEMENTARY_UI_COPY: readonly ElementaryUiCopyEntry[] = [
  learner("shell-brand", "Cyber Math 小学生"),
  learner("shell-nav-label", "小学生のページ", "accessibility"),
  learner("shell-nav-top", "小学生トップ"),
  learner("shell-nav-grade-3", "3年生"),
  learner("shell-nav-math", "算数"),
  learner("shell-nav-japanese", "国語"),
  learner("shell-nav-social", "社会"),
  learner("shell-nav-guardians", "おうちの方へ"),
  learner("shell-nav-menu", "メニュー"),
  learner("shell-nav-mobile-label", "小学生のページメニュー", "accessibility"),
  learner("home-eyebrow", "小学生の学び場"),
  learner("home-title", "いっしょに学ぼう"),
  learner("home-description", "学年をえらんで、算数・国語・社会を少しずつ学べます。"),
  learner("home-section-title", "学年をえらぼう"),
  learner("home-grade-3-title", "小学3年生"),
  learner("home-grade-3-description", "算数・国語・社会の、いま公開しているこうざを学びます。"),
  learner("home-grade-3-status", "3年生をひらく"),
  learner("grade-3-eyebrow", "いつもの学び"),
  learner("grade-3-title", "小学3年生"),
  learner("grade-3-description", "算数・国語・社会を、学校のじゅ業にそって学びます。"),
  learner("grade-3-subject-section", "教科をえらぼう"),
  learner("grade-3-math-title", "算数"),
  learner("grade-3-math-description", "数や図を使って、考え方を一つずつたしかめます。"),
  learner("grade-3-japanese-title", "国語"),
  learner("grade-3-japanese-description", "ことばや文章から、大切なことを見つけます。"),
  learner("grade-3-social-title", "社会"),
  learner("grade-3-social-description", "地図を見ながら、まちのくらしを考えます。"),
  learner("grade-3-status-section", "いま学べること"),
  learner("grade-3-status-title", "いま つくっています"),
  learner("grade-3-status-description", "教科のページと学ぶものを、いまつくっています。"),
  learner("grade-3-status-badge", "もう少しまってね"),
  learner("status-default", "いま つくっています"),
  learner("lesson-opening-heading", "今日の問い"),
  learner("lesson-goals-heading", "できるようになること"),
  learner("lesson-dialogue-heading", "会話で考えよう"),
  learner("lesson-answer-heading", "答え"),
  learner("lesson-check-heading", "たしかめ"),
  learner("lesson-visual-fallback-label", "図がないときのことば", "visual-fallback"),
  learner("visual-credit-link", "図の出どころ"),
  learner("lesson-summary-heading", "今日のまとめ"),
  learner("lesson-enrichment-label", "もう少し先・できなくてもだいじょうぶ"),
  learner("dialogue-order-label", "会話のならび", "accessibility"),
  learner("emotion-neutral", "おだやか"),
  learner("emotion-curious", "知りたい"),
  learner("emotion-thinking", "考え中"),
  learner("emotion-confused", "まよい"),
  learner("emotion-surprised", "気づき"),
  learner("emotion-encouraging", "おうえん"),
  learner("emotion-happy", "うれしい"),
  learner("emotion-confident", "できそう"),
  learner("practice-group-label", "練習問題", "accessibility"),
  learner("practice-progress-aria", "問題のしんちょく", "accessibility"),
  learner("practice-problem-label", "問題"),
  learner("practice-multi-instruction", "あてはまるものをえらびます"),
  learner("practice-single-instruction", "一つえらびます"),
  learner("practice-numeric-instruction", "数を書きます"),
  learner("practice-numeric-label", "答えの数"),
  learner("practice-submit", "答え合わせ"),
  learner("practice-prev", "まえへ"),
  learner("practice-next", "つぎへ"),
  learner("practice-see-result", "けっかを見る"),
  learner("practice-correct", "できました！"),
  learner("practice-incorrect", "おしい！ もう一度見てみよう。"),
  learner("practice-correct-answer-label", "正しい答え"),
  learner("practice-explanation-label", "せつめい"),
  learner("practice-first-check-label", "はじめのたしかめ"),
  learner("practice-verification-label", "答えのたしかめ"),
  learner("practice-common-mistake-label", "気をつけること"),
  learner("practice-hint-label", "ヒント"),
  learner("practice-hint-show", "ヒントを見る"),
  learner("practice-result-status", "答え合わせがすみました"),
  learner("practice-summary-title", "けっか"),
  learner("practice-summary-unit", "問 できました"),
  learner("practice-summary-of", "問中"),
  learner("practice-retry-wrong", "まちがえた問題だけ、もう一度"),
  learner("practice-restart", "はじめから、もう一度"),
  learner("practice-answered-mark", "答えました"),
  learner("subject-units-heading", "たんげんをえらぶ"),
  learner("unit-lessons-heading", "こうざをえらぶ"),
  learner("subject-open", "ひらく"),
  learner("lesson-open", "はじめる"),
  learner("lesson-minutes-prefix", "やく"),
  learner("lesson-minutes-suffix", "分"),
  developer("layout-metadata-title", "小学生版", "metadata"),
  developer("layout-metadata-description", "Cyber Mathの小学生版を準備するための内部ページです。", "metadata"),
  developer("internal-banner", "内部準備中 — 現在は公開されていません"),
  developer("showcase-metadata-title", "開発用の講座見本", "metadata"),
  developer("showcase-metadata-description", "小学生版の会話授業と構造化講座ブロックを確認する非公開ページです。", "metadata"),
  developer("visual-showcase-metadata-title", "開発用の視覚素材見本", "metadata"),
  developer("visual-showcase-metadata-description", "小学生版の視覚素材、クレジット、fallbackを確認する非公開ページです。", "metadata"),
  developer("credits-metadata-title", "画像・図のクレジット", "metadata"),
  developer("credits-metadata-description", "小学生版・限定betaで使う画像や図の出典とクレジットをご案内します。", "metadata"),
  developer("lesson-prototype-label", "開発用の講座見本"),
  developer("lesson-meta-target-label", "対象"),
  developer("lesson-meta-target-value", "小学3年生・算数"),
  developer("lesson-meta-duration-label", "所要時間"),
  developer("lesson-meta-duration-prefix", "約"),
  developer("lesson-meta-duration-suffix", "分"),
  developer("lesson-meta-status-label", "状態"),
  developer("lesson-meta-status-value", "非公開プロトタイプ"),
  developer("lesson-prototype-notice", "これは表示と構造を確認する見本で、正式教材ではありません。"),
] as const;

export const ELEMENTARY_UI_COPY_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_UI_COPY.map((entry) => [entry.id, entry])),
) as Readonly<Record<string, ElementaryUiCopyEntry>>;

export function elementaryUiCopy(id: string): string {
  const entry = ELEMENTARY_UI_COPY_BY_ID[id];
  if (!entry) throw new Error(`Unknown elementary UI copy: ${id}`);
  return entry.text;
}
