import type {
  ElementaryHumanReviewStatus,
  ElementaryReadinessArea,
  ElementaryReleaseGate,
} from "@/types/elementary-readiness";

export const ELEMENTARY_READINESS_AREAS = [
  "curriculum",
  "kanji",
  "lesson-quality",
  "problem-quality",
  "visual-assets",
  "accessibility",
  "responsive",
  "publication",
  "privacy",
  "child-safety",
  "guardian-information",
  "content-inventory",
  "technical-stability",
] as const satisfies readonly ElementaryReadinessArea[];

const automatic = (
  gate: Omit<ElementaryReleaseGate, "reviewKind" | "defaultStatus"> &
    Readonly<{ defaultStatus?: ElementaryReleaseGate["defaultStatus"] }>,
): ElementaryReleaseGate => Object.freeze({
  ...gate,
  reviewKind: "automatic",
  defaultStatus: gate.defaultStatus ?? "pass",
});

const manual = (
  gate: Omit<ElementaryReleaseGate, "reviewKind" | "defaultStatus" | "sourceQa">,
): ElementaryReleaseGate => {
  const reviewStatus: ElementaryHumanReviewStatus = gate.humanReview?.status ?? "not-reviewed";
  const defaultStatus = reviewStatus === "changes-requested"
    ? "fail"
    : reviewStatus === "not-reviewed"
      ? "not-reviewed"
      : "pass";
  return Object.freeze({ ...gate, reviewKind: "manual", defaultStatus });
};

const USER_REVIEW_DATE = "2026-07-17";

export const ELEMENTARY_RELEASE_GATES: readonly ElementaryReleaseGate[] = Object.freeze([
  automatic({ id: "qa-registry", area: "publication", title: "registry QA", description: "学年・教科・course registryのIDと参照を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:registry", source: "scripts/check-elementary-registry.ts" }),
  automatic({ id: "qa-publication", area: "publication", title: "publication QA", description: "hiddenのfail-closedと公開導線への非掲載を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:publication", source: "scripts/check-elementary-publication.ts" }),
  automatic({ id: "qa-lesson-blocks", area: "lesson-quality", title: "lesson block QA", description: "講座ブロックと会話の構造を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:lesson-blocks", source: "scripts/check-elementary-lesson-blocks.ts" }),
  automatic({ id: "qa-kanji", area: "kanji", title: "学年別漢字QA", description: "未習漢字とふりがなの違反を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:kanji", source: "scripts/check-elementary-kanji.ts" }),
  automatic({ id: "qa-assets", area: "visual-assets", title: "asset QA", description: "権利、checksum、SVG安全性、参照を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:assets", source: "scripts/check-elementary-assets.ts" }),
  automatic({ id: "qa-curriculum", area: "curriculum", title: "curriculum QA", description: "学習指導要領registryと参照を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:curriculum", source: "scripts/check-elementary-curriculum.ts" }),
  automatic({ id: "qa-pilot-lessons", area: "lesson-quality", title: "pilot lesson QA", description: "3講座の内容構造と参照を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:pilot-lessons", source: "scripts/check-elementary-pilot-lessons.ts" }),
  automatic({ id: "qa-pilot-problems", area: "problem-quality", title: "pilot problem QA", description: "24問の形式、正答、解説、学年別漢字を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:pilot-problems", source: "scripts/check-elementary-pilot-problems.ts" }),
  automatic({ id: "qa-inventory", area: "content-inventory", title: "content inventory QA", description: "学校段階別の件数と参照を検査します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:inventory", source: "scripts/check-elementary-content-inventory.ts" }),
  automatic({ id: "unresolved-reference-zero", area: "content-inventory", title: "未解決参照 0", description: "unit、lesson、problem、asset、curriculumの参照切れがないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/lib/elementary-inventory.ts" }),
  automatic({ id: "duplicate-id-zero", area: "content-inventory", title: "duplicate ID 0", description: "正式registry内のID重複がないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/lib/elementary-inventory.ts" }),
  automatic({ id: "kanji-violation-zero", area: "kanji", title: "未習漢字違反 0", description: "子ども向け本文の未習漢字違反が0件であることを確認します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:kanji", source: "scripts/check-elementary-kanji.ts" }),
  automatic({ id: "ruby-violation-zero", area: "kanji", title: "ふりがな違反 0", description: "必要なふりがなの構造違反が0件であることを確認します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:kanji", source: "scripts/check-elementary-kanji.ts" }),
  automatic({ id: "asset-violation-zero", area: "visual-assets", title: "asset違反 0", description: "権利・参照・metadata違反が0件であることを確認します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:assets", source: "scripts/check-elementary-assets.ts" }),
  automatic({ id: "unsafe-svg-zero", area: "visual-assets", title: "unsafe SVG 0", description: "危険なSVG要素や外部参照がないことを確認します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:assets", source: "scripts/check-elementary-assets.ts" }),
  automatic({ id: "a11y-serious-zero", area: "accessibility", title: "serious / critical a11y 0", description: "対象画面で重大なアクセシビリティ違反がないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "e2e/elementary-readiness.spec.ts" }),
  automatic({ id: "responsive-overflow-zero", area: "responsive", title: "対象4幅の横はみ出し 0", description: "375、390、768、1280pxで横スクロールがないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "e2e/elementary-readiness.spec.ts" }),
  automatic({ id: "production-hidden-404", area: "publication", title: "production hidden 404", description: "hiddenの小学生ルートがproductionで404になることを確認します。", requiredForBeta: true, requiredForFormal: true, source: "e2e/elementary-pilot-hidden.spec.ts" }),
  automatic({ id: "sitemap-excluded", area: "publication", title: "sitemap非掲載", description: "小学生版ルートがsitemapに含まれないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/app/sitemap.ts" }),
  automatic({ id: "navigation-excluded", area: "publication", title: "global navigation非掲載", description: "小学生版への公開導線がglobal navigationにないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/data/navigation.ts" }),
  automatic({ id: "high-school-count", area: "content-inventory", title: "高校版 1,348問", description: "高校版の従来集計を維持します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:content-inventory:test", source: "scripts/content-inventory-lib.ts" }),
  automatic({ id: "elementary-count", area: "content-inventory", title: "小学生版 24問", description: "正式pilot registryの問題数を確認します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:elementary:inventory", source: "src/lib/elementary-inventory.ts" }),
  automatic({ id: "combined-count", area: "content-inventory", title: "全体 1,372問", description: "高校版と小学生版を分けた合計を確認します。", requiredForBeta: true, requiredForFormal: true, sourceQa: "qa:content-inventory:test", source: "scripts/content-inventory-lib.ts" }),
  automatic({ id: "guardian-privacy-copy", area: "privacy", title: "個人情報と保存方針の説明", description: "個人情報入力を求めず、学習履歴を保存しない現状を説明します。", requiredForBeta: true, requiredForFormal: true, source: "src/app/elementary/for-guardians/page.tsx" }),
  automatic({ id: "guardian-grading-copy", area: "guardian-information", title: "採点方式の説明", description: "登録済み正答による採点で、AI自由記述採点を使わないことを説明します。", requiredForBeta: true, requiredForFormal: true, source: "src/app/elementary/for-guardians/page.tsx" }),
  automatic({ id: "technical-stability", area: "technical-stability", title: "console / hydration error 0", description: "対象画面でconsole errorとhydration errorがないことを確認します。", requiredForBeta: true, requiredForFormal: true, source: "e2e/elementary-readiness.spec.ts" }),
  automatic({ id: "limited-pilot-scope", area: "guardian-information", title: "小学3年生全体ではなく3講座のpilot", description: "3講座だけで小学3年生全体への対応を示さないよう明記します。", requiredForBeta: false, requiredForFormal: true, defaultStatus: "warning", source: "src/app/elementary/for-guardians/page.tsx", nextAction: "対象単元を拡張し、curriculum coverageを再評価する。" }),
  automatic({ id: "formal-release-completeness", area: "publication", title: "正式公開条件は未充足", description: "beta準備と正式公開準備を分離します。", requiredForBeta: false, requiredForFormal: true, defaultStatus: "warning", source: "src/lib/elementary-readiness.ts", nextAction: "正式公開用のcoverage、運用、保護者確認gateを別工程で満たす。" }),
  manual({ id: "review-math-content", area: "lesson-quality", title: "算数教材の内容妥当性", description: "等分除・包含除、式、単位、正答の妥当性を人間が確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/data/elementary/lessons/math-division.ts", nextAction: "算数の教材責任者が確認する。" }),
  manual({ id: "review-japanese-content", area: "lesson-quality", title: "国語本文・正答の妥当性", description: "本文根拠、人物、気持ち、選択肢を人間が確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/data/elementary/lessons/japanese-feelings.ts", nextAction: "国語の教材責任者が確認する。" }),
  manual({ id: "review-social-content", area: "lesson-quality", title: "社会教材の推測表現", description: "地図から分かることと推測を人間が確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/data/elementary/lessons/social-map.ts", nextAction: "社会の教材責任者が確認する。" }),
  manual({ id: "review-child-safety", area: "child-safety", title: "子ども向け文言", description: "責める表現、不安、競争、固定的役割がないことを人間が確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/data/elementary", humanReview: { status: "approved", reviewedAt: USER_REVIEW_DATE, reviewedBy: "user", note: "ユーザー本人が子ども向け文言に問題なしと確認しました。" } }),
  manual({ id: "review-guardian-information", area: "guardian-information", title: "保護者向け説明", description: "pilotの範囲、採点、保存、権利、未実装事項を人間が確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/app/elementary/for-guardians/page.tsx", humanReview: { status: "approved", reviewedAt: USER_REVIEW_DATE, reviewedBy: "user", note: "ユーザー本人が保護者向け説明に問題なしと確認しました。" } }),
  manual({ id: "review-asset-rights", area: "visual-assets", title: "画像・図の権利確認", description: "自動QAに加えて公開責任者が権利表示を確認します。", requiredForBeta: true, requiredForFormal: true, source: "src/data/elementary/assets/visual-assets.ts", humanReview: { status: "approved", reviewedAt: USER_REVIEW_DATE, reviewedBy: "user", note: "ユーザー本人が画像・図の権利管理に問題なしと確認しました。" } }),
  manual({ id: "review-release-decision", area: "publication", title: "β公開の最終判断", description: "自動判定だけでpublicationStatusを変更しません。", requiredForBeta: true, requiredForFormal: true, source: "src/data/elementary/index.ts", nextAction: "限定betaの公開範囲と運用条件を別工程で確定する。", humanReview: { status: "reviewed", reviewedAt: USER_REVIEW_DATE, reviewedBy: "user", note: "ユーザー本人が限定beta可と判断しました。publicationStatusはhiddenを維持します。" } }),
]);
