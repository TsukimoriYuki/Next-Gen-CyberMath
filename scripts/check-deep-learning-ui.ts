import fs from "node:fs";
import path from "node:path";
import { PUBLIC_COURSE_SUBJECTS } from "../src/data/course-curriculum";

// 深い学習ページの共通骨格と、loading/error 状態のアクセシビリティ契約を
// ブラウザを起動せずに検査する。
// 実行例: npx tsx scripts/check-deep-learning-ui.ts

const ROOT = process.cwd();
const issues: string[] = [];

type SourceTarget = Readonly<{
  label: string;
  file: string;
  breadcrumbOrder: readonly string[];
  currentItem: string;
}>;

const PRIORITY_TARGETS: readonly SourceTarget[] = [
  {
    label: "講座一覧",
    file: "src/app/courses/page.tsx",
    breadcrumbOrder: ['label: "ホーム"', 'label: "講座"'],
    currentItem: '{ label: "講座" }',
  },
  {
    label: "教科講座一覧",
    file: "src/components/courses/CourseSubjectPageView.tsx",
    breadcrumbOrder: ['label: "講座"', "label: subject.subjectName"],
    currentItem: "{ label: subject.subjectName }",
  },
  {
    label: "単元講座一覧",
    file: "src/components/courses/CourseUnitPageView.tsx",
    breadcrumbOrder: [
      'label: "講座"',
      "label: subject.subjectName",
      "label: unit.unitTitle",
    ],
    currentItem: "{ label: unit.unitTitle }",
  },
  {
    label: "講座詳細",
    file: "src/components/courses/CourseLessonPageView.tsx",
    breadcrumbOrder: [
      'label: "講座"',
      "label: subject.subjectName",
      "label: unit.unitTitle",
      "label: lesson.lessonTitle",
    ],
    currentItem: "{ label: lesson.lessonTitle }",
  },
  {
    label: "問題詳細",
    file: "src/app/problems/[slug]/page.tsx",
    breadcrumbOrder: [
      'label: "数学"',
      'label: "単元一覧"',
      "label: problem.title",
    ],
    currentItem: "{ label: problem.title }",
  },
  {
    label: "単元一覧",
    file: "src/app/units/page.tsx",
    breadcrumbOrder: ['label: "数学"', 'label: "単元別問題"'],
    currentItem: '{ label: "単元別問題" }',
  },
  {
    label: "単元詳細",
    file: "src/app/units/[unitSlug]/page.tsx",
    breadcrumbOrder: [
      'label: "数学"',
      'label: "単元別問題"',
      "label: unit.name",
    ],
    currentItem: "{ label: unit.name }",
  },
  {
    label: "共通テスト大問型演習一覧",
    file: "src/app/common-test/practice/page.tsx",
    breadcrumbOrder: [
      'label: "試験対策"',
      'label: "共通テスト"',
      'label: "大問型演習"',
    ],
    currentItem: '{ label: "大問型演習" }',
  },
  {
    label: "問題解体型講座一覧",
    file: "src/app/common-test/problem-lectures/page.tsx",
    breadcrumbOrder: [
      'label: "試験対策"',
      'label: "共通テスト"',
      'label: "問題解体型講座"',
    ],
    currentItem: '{ label: "問題解体型講座" }',
  },
  {
    label: "特別講義一覧",
    file: "src/app/common-test/lectures/page.tsx",
    breadcrumbOrder: [
      'label: "共通テスト対策"',
      'label: "特別講義"',
    ],
    currentItem: '{ label: "特別講義" }',
  },
  {
    label: "特別講義詳細",
    file: "src/app/common-test/lectures/[slug]/page.tsx",
    breadcrumbOrder: [
      'label: "共通テスト対策"',
      'label: "特別講義"',
      "label: lecture.title",
    ],
    currentItem: "{ label: lecture.title }",
  },
  {
    label: "共通テスト型本番模試一覧",
    file: "src/app/common-test/simulator/page.tsx",
    breadcrumbOrder: [
      'label: "共通テスト対策"',
      'label: "本番模試"',
    ],
    currentItem: '{ label: "本番模試" }',
  },
  {
    label: "問題解体型講座",
    file: "src/components/common-test/problem-lecture/CommonTestProblemLecturePage.tsx",
    breadcrumbOrder: [
      'label: "試験対策"',
      'label: "共通テスト"',
      'label: "問題解体型講座"',
      "label: lecture.title",
    ],
    currentItem: "{ label: lecture.title }",
  },
  {
    label: "共通テスト演習結果",
    file: "src/components/common-test/exam/CommonTestExamResultPanel.tsx",
    breadcrumbOrder: [
      'label: "試験対策"',
      'label: "共通テスト"',
      "label: preset.title",
      'label: "演習結果"',
    ],
    currentItem: '{ label: "演習結果" }',
  },
  {
    label: "共通テスト復習",
    file: "src/app/common-test/review/page.tsx",
    breadcrumbOrder: [
      'label: "復習"',
      'label: "共通テスト"',
      'label: "復習キュー"',
    ],
    currentItem: '{ label: "復習キュー" }',
  },
  {
    label: "共通テスト履歴",
    file: "src/app/common-test/history/page.tsx",
    breadcrumbOrder: [
      'label: "復習"',
      'label: "共通テスト"',
      'label: "演習履歴"',
    ],
    currentItem: '{ label: "演習履歴" }',
  },
  {
    label: "模試履歴",
    file: "src/app/mock/history/page.tsx",
    breadcrumbOrder: [
      'label: "復習"',
      'label: "カスタム演習"',
      'label: "演習履歴・弱点分析"',
    ],
    currentItem: '{ label: "演習履歴・弱点分析" }',
  },
  {
    label: "マイページ",
    file: "src/app/mypage/page.tsx",
    breadcrumbOrder: ["label: SITE_NAME", 'label: "マイページ"'],
    currentItem: '{ label: "マイページ" }',
  },
  {
    label: "日次個別課題",
    file: "src/app/mission/[id]/page.tsx",
    breadcrumbOrder: [
      'label: "ホーム"',
      'label: "個別課題"',
      "label: problem.title",
    ],
    currentItem: "{ label: problem.title }",
  },
  {
    label: "英語精読詳細",
    file: "src/app/english/comprehension/[id]/page.tsx",
    breadcrumbOrder: [
      'label: "英語"',
      'label: "精読"',
      "label: problem.title",
    ],
    currentItem: "{ label: problem.title }",
  },
  {
    label: "英語複数資料詳細",
    file: "src/app/english/multi-source/[id]/page.tsx",
    breadcrumbOrder: [
      'label: "英語"',
      'label: "複数資料読解"',
      "label: problem.title",
    ],
    currentItem: "{ label: problem.title }",
  },
  {
    label: "英語速読詳細",
    file: "src/app/english/speed-reading/[id]/page.tsx",
    breadcrumbOrder: [
      'label: "英語"',
      'label: "速読"',
      "label: levelMeta.label",
      "label: problem.title",
    ],
    currentItem: "{ label: problem.title }",
  },
] as const;

const LEGACY_ONLY_TARGETS = [
  {
    label: "問題解説ステップ",
    file: "src/components/scaffolding/LogicSteps.tsx",
  },
  {
    label: "単元カード",
    file: "src/components/shell/UnitCard.tsx",
  },
  {
    label: "問題カード",
    file: "src/components/shell/ProblemCard.tsx",
  },
  {
    label: "共通テスト復習キュー",
    file: "src/components/common-test/CommonTestReviewQueue.tsx",
  },
  {
    label: "共通テスト演習履歴",
    file: "src/components/common-test/CommonTestHistoryPanel.tsx",
  },
  {
    label: "共通テスト模試履歴",
    file: "src/components/common-test/CommonTestExamHistoryPanel.tsx",
  },
  {
    label: "共通テスト演習結果",
    file: "src/components/common-test/exam/CommonTestExamResultPanel.tsx",
  },
  {
    label: "模試履歴・受験一覧",
    file: "src/components/mock/history/AttemptList.tsx",
  },
  {
    label: "模試履歴・得点推移",
    file: "src/components/mock/history/ScoreTrendChart.tsx",
  },
  {
    label: "模試履歴・集計",
    file: "src/components/mock/history/SummaryCards.tsx",
  },
  {
    label: "模試履歴・単元レーダー",
    file: "src/components/mock/history/UnitRadarChart.tsx",
  },
  {
    label: "模試履歴・弱点",
    file: "src/components/mock/history/WeakTagPanel.tsx",
  },
  {
    label: "マイページ復習キュー",
    file: "src/components/review/ReviewQueuePanel.tsx",
  },
  {
    label: "共通テスト復習サマリー",
    file: "src/components/common-test/CommonTestReviewSummary.tsx",
  },
  {
    label: "学習カレンダー",
    file: "src/components/dashboard/LearningCalendar.tsx",
  },
  {
    label: "日次個別課題パネル",
    file: "src/components/mission/EmergencyMissionPanel.tsx",
  },
] as const;

// Priority pages often delegate their longest-lived interaction to a child
// viewer/runner. Scanning only the outer page would allow the legacy dark UI
// and undersized controls to survive behind a new shell.
const DEEP_INTERACTION_TARGETS = [
  "src/components/english/ComprehensionViewer.tsx",
  "src/components/english/MultiSourceViewer.tsx",
  "src/components/english/SpeedReadingGame.tsx",
  "src/components/english/SpeedSupportReader.tsx",
  "src/components/common-test/mock-exam/CommonTestPdfMockViewer.tsx",
  "src/components/common-test/mock-exam/CommonTestMockExamRunner.tsx",
  "src/components/common-test/exam-paper/ExamPaperRunner.tsx",
  "src/components/common-test/exam-paper/ExamPaperViewer.tsx",
  "src/components/common-test/exam-paper/ExamMarkSheetPanel.tsx",
  "src/components/lectures/LectureExperience.tsx",
  "src/components/lectures/MasteryBlocks.tsx",
  "src/components/common-test/CommonTestGuidedReviewPanel.tsx",
  "src/components/common-test/ai/CommonTestAiStrategyPanel.tsx",
  "src/components/common-test/CommonTestMistakeStrategyCards.tsx",
  "src/components/lessons/LessonRenderer.tsx",
  "src/components/courses/CourseComparisonTable.tsx",
  "src/components/courses/CourseStepBlock.tsx",
  "src/components/courses/CourseDiagramBlock.tsx",
  "src/components/common-test/problem-lecture/StickyProblemViewer.tsx",
  "src/components/scaffolding/WhyPopover.tsx",
  "src/components/scaffolding/LessonLink.tsx",
  "src/components/scaffolding/ApproachTabs.tsx",
  "src/components/lectures/LectureRoadmapCatalog.tsx",
] as const;

const FRAME_FILE = "src/components/learning/LearningPageFrame.tsx";
// ルート直下の loading.tsx は全ルートをstreaming化し、notFound() がHTTP
// 200になり得るため置かない。実データ境界である模試履歴のfallbackを検査する。
const LOADING_STATE_FILE = "src/app/mock/history/page.tsx";
const ERROR_FILE = "src/app/error.tsx";

check(
  !fs.existsSync(path.join(ROOT, "src/app/loading.tsx")),
  "src/app/loading.tsx: root loading boundaryはnotFound()のHTTP 404をstreaming時に200へ変えるため配置しないでください",
);

const LEGACY_PATTERNS = [
  {
    label: "neon",
    pattern: /\bneon(?:-[a-z0-9-]+)?\b/gi,
    reason: "発光系の旧UIトークンは深い学習ページで使用しない",
  },
  {
    label: "glass",
    pattern: /\bglass(?:-[a-z0-9-]+)?\b/gi,
    reason: "glass系の旧UIトークンは教材本文より装飾を強くするため使用しない",
  },
  {
    label: "washi",
    pattern: /\bwashi(?:-[a-z0-9-]+)?\b/gi,
    reason: "washi系のページ固有背景は共通骨格へ持ち込まない",
  },
  {
    label: "8–11px text",
    pattern: /text-\[(?:8|9|10|11)px\]/g,
    reason: "12px未満の任意値テキストは重要情報の可読性を損なう",
  },
  {
    label: "dark text-white opacity",
    pattern: /\btext-white\/(?:\d{1,3}|\[[^\]]+\])/g,
    reason: "暗色前提の半透明white文字は共通の明色ページで可読性を保証できない",
  },
  {
    label: "rgba white",
    pattern: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/g,
    reason: "whiteの透過rgbaは旧暗色面を前提とするため共通トークンへ置き換える",
  },
  {
    label: "legacy display typography",
    pattern: /\bfont-(?:mono|display)\b/g,
    reason: "教材本文と操作UIでは旧サイバー調の表示書体へ依存しない",
  },
  {
    label: "decorative glow or gradient",
    pattern: /\bglow(?:-[a-z0-9-]+)?\b|(?:linear|radial)-gradient|\bbg-gradient-to-[a-z]+\b/gi,
    reason: "教材より装飾を強く見せる発光・グラデーションを深い操作UIへ残さない",
  },
  {
    label: "dark surface with white text",
    pattern:
      /(?:\bbg-(?:(?:slate|gray|zinc|neutral)-(?:800|900|950)|black)\b[^"\r\n]*\btext-white\b|\btext-white\b[^"\r\n]*\bbg-(?:(?:slate|gray|zinc|neutral)-(?:800|900|950)|black)\b)/g,
    reason: "slate/blackの旧暗色面とwhite文字の組み合わせは明色の共通骨格へ移行する",
  },
] as const;

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function readRequired(relativePath: string): string | null {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    issues.push(relativePath + ": 検査対象ファイルが存在しません");
    return null;
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function lineNumberAt(source: string, index: number): number {
  return source.slice(0, index).split(/\r?\n/).length;
}

function collectTsxFiles(directory: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectTsxFiles(absolutePath));
    else if (entry.isFile() && entry.name.endsWith(".tsx")) files.push(absolutePath);
  }
  return files;
}

function checkLegacyTokens(relativePath: string, source: string) {
  for (const legacy of LEGACY_PATTERNS) {
    const pattern = new RegExp(legacy.pattern.source, legacy.pattern.flags);
    for (const match of source.matchAll(pattern)) {
      const line = lineNumberAt(source, match.index ?? 0);
      issues.push(
        relativePath +
          ":" +
          line +
          ': 旧UIトークン "' +
          match[0] +
          '" を検出しました（' +
          legacy.reason +
          "）",
      );
    }
  }
}

function checkBreadcrumbOrder(target: SourceTarget, source: string) {
  let cursor = source.indexOf("<LearningBreadcrumbs");
  check(
    cursor >= 0,
    target.file + ": " + target.label + " は LearningBreadcrumbs を使用してください",
  );
  if (cursor < 0) return;

  for (const fragment of target.breadcrumbOrder) {
    const next = source.indexOf(fragment, cursor + 1);
    if (next < 0) {
      issues.push(
        target.file +
          ': ' +
          target.label +
          ' のパンくず順序に "' +
          fragment +
          '" がありません',
      );
      return;
    }
    cursor = next;
  }

  check(
    source.includes(target.currentItem),
    target.file +
      ": " +
      target.label +
      " の末尾パンくずは href を持たない現在地項目にしてください",
  );
}

const legacyScannedFiles = new Set<string>();

for (const target of PRIORITY_TARGETS) {
  const source = readRequired(target.file);
  if (!source) continue;

  check(
    source.includes("<LearningPageShell"),
    target.file + ": " + target.label + " は共通 LearningPageShell を使用してください",
  );
  check(
    source.includes("<LearningPageHeader"),
    target.file + ": " + target.label + " は共通 LearningPageHeader を使用してください",
  );
  checkBreadcrumbOrder(target, source);

  const localMainCount = source.match(/<main(?:\s|>)/g)?.length ?? 0;
  check(
    localMainCount === 0,
    target.file +
      ": <main> を " +
      localMainCount +
      " 件検出しました。main landmark はルートlayoutだけが所有します",
  );
  checkLegacyTokens(target.file, source);
  legacyScannedFiles.add(target.file);
}

for (const target of LEGACY_ONLY_TARGETS) {
  if (legacyScannedFiles.has(target.file)) continue;
  const source = readRequired(target.file);
  if (!source) continue;
  checkLegacyTokens(target.file, source);
  legacyScannedFiles.add(target.file);
}

for (const file of DEEP_INTERACTION_TARGETS) {
  if (legacyScannedFiles.has(file)) continue;
  const source = readRequired(file);
  if (!source) continue;
  checkLegacyTokens(file, source);
  legacyScannedFiles.add(file);
}

const frameSource = readRequired(FRAME_FILE);
if (frameSource) {
  check(
    frameSource.includes('data-page-shell="learning"'),
    FRAME_FILE + ': LearningPageShell は data-page-shell="learning" を公開してください',
  );
  check(
    /<nav\s+aria-label="パンくず"/.test(frameSource),
    FRAME_FILE + ': パンくずnavには aria-label="パンくず" が必要です',
  );
  check(
    frameSource.includes("const isCurrent = index === items.length - 1"),
    FRAME_FILE + ": パンくずの末尾項目を現在地として判定してください",
  );
  check(
    /aria-current=\{isCurrent\s*\?\s*"page"\s*:\s*undefined\}/.test(frameSource),
    FRAME_FILE + ': パンくずの現在地には aria-current="page" が必要です',
  );
  check(
    frameSource.includes("item.href && !isCurrent"),
    FRAME_FILE + ": 現在地のパンくずをリンクとして描画しないでください",
  );
  check(
    frameSource.includes("inline-flex min-h-11 items-center"),
    FRAME_FILE + ": パンくずリンクの操作領域を44px以上にしてください",
  );
  check(
    /<h1\b/.test(frameSource),
    FRAME_FILE + ": LearningPageHeader がページ唯一のh1を提供する必要があります",
  );
  check(
    /role=\{isAlert\s*\?\s*"alert"\s*:\s*"status"\}/.test(frameSource),
    FRAME_FILE + ': error状態は role="alert"、loading状態は role="status" にしてください',
  );
  check(
    /aria-live=\{kind === "loading"\s*\?\s*"polite"\s*:\s*undefined\}/.test(frameSource),
    FRAME_FILE + ': loading状態には aria-live="polite" が必要です',
  );
  check(
    /aria-busy=\{kind === "loading"\s*\?\s*"true"\s*:\s*undefined\}/.test(frameSource),
    FRAME_FILE + ': loading状態には aria-busy="true" が必要です',
  );
  checkLegacyTokens(FRAME_FILE, frameSource);
}

const loadingSource = readRequired(LOADING_STATE_FILE);
if (loadingSource) {
  check(
    loadingSource.includes("<LearningPageShell"),
    LOADING_STATE_FILE + ": loading状態も共通 LearningPageShell を使用してください",
  );
  check(
    loadingSource.includes('kind="loading"'),
    LOADING_STATE_FILE + ': loading状態は LearningState kind="loading" を使用してください',
  );
  checkLegacyTokens(LOADING_STATE_FILE, loadingSource);
}

const errorSource = readRequired(ERROR_FILE);
if (errorSource) {
  check(
    errorSource.startsWith('"use client";'),
    ERROR_FILE + ": error境界は再試行操作のためClient Componentにしてください",
  );
  check(
    errorSource.includes("<LearningPageShell"),
    ERROR_FILE + ": error境界も共通 LearningPageShell を使用してください",
  );
  check(
    errorSource.includes('kind="error"'),
    ERROR_FILE + ': error境界は LearningState kind="error" を使用してください',
  );
  check(
    errorSource.includes("headingLevel={1}"),
    ERROR_FILE + ": error境界にはページ見出しとなるh1が必要です",
  );
  check(
    errorSource.includes("onClick") && /(?:unstable_retry|reset)\(\)/.test(errorSource),
    ERROR_FILE + ": error境界に実際の再試行コールバックを呼ぶボタンがありません",
  );
  check(
    errorSource.includes("もう一度試す"),
    ERROR_FILE + ": error境界の再試行ボタンに分かりやすいラベルがありません",
  );
  check(
    errorSource.includes('href="/learn"') && errorSource.includes("学習メニューへ戻る"),
    ERROR_FILE + ": error境界に安全な戻り先（学習メニュー）がありません",
  );
  checkLegacyTokens(ERROR_FILE, errorSource);
}

const mypageSource = readRequired("src/app/mypage/page.tsx");
if (mypageSource) {
  check(
    mypageSource.includes("const hasValue = value !== null;"),
    "src/app/mypage/page.tsx: 0%・0回を有効な計測値として表示してください",
  );
  check(
    !mypageSource.includes("const hasValue = value !== null && value > 0;"),
    "src/app/mypage/page.tsx: 0をデータなし判定に使用しないでください",
  );
}

// RootLayoutが唯一のmain landmarkを所有する。ページやrunnerがmainを重ねると、
// screen readerのランドマーク移動と「本文へ移動」の到達先が曖昧になる。
const rootLayoutFile = "src/app/layout.tsx";
const rootLayoutSource = readRequired(rootLayoutFile);
if (rootLayoutSource) {
  const rootMainCount = rootLayoutSource.match(/<main(?:\s|>)/g)?.length ?? 0;
  check(rootMainCount === 1, `${rootLayoutFile}: root main landmarkは1件だけ必要です`);
}
for (const sourceRoot of ["src/app", "src/components"] as const) {
  for (const absolutePath of collectTsxFiles(path.join(ROOT, sourceRoot))) {
    const relativePath = path.relative(ROOT, absolutePath).replaceAll("\\", "/");
    if (relativePath === rootLayoutFile) continue;
    const source = fs.readFileSync(absolutePath, "utf8");
    const nestedMainCount = source.match(/<main(?:\s|>)/g)?.length ?? 0;
    check(
      nestedMainCount === 0,
      `${relativePath}: root layoutと重複するmain landmarkを${nestedMainCount}件検出しました`,
    );
  }
}

const courseUnitSource = readRequired(
  "src/components/courses/CourseUnitPageView.tsx",
);
if (courseUnitSource) {
  check(
    courseUnitSource.includes("const levelsToShow = LEVELS.filter"),
    "CourseUnitPageView: 実在講座のあるレベルだけを公開表示してください",
  );
  check(
    !courseUnitSource.includes("現在は無料・基礎講座を優先整備中です"),
    "CourseUnitPageView: 0件レベルを準備中ブロックとして公開しないでください",
  );
}

const activeExamHeaderSource = readRequired(
  "src/components/common-test/exam/CommonTestExamHeader.tsx",
);
if (activeExamHeaderSource) {
  check(
    activeExamHeaderSource.includes('<h1 className="sr-only">{preset.title} — 受験中</h1>'),
    "CommonTestExamHeader: 受験中・時間超過中にもページ見出しとなるh1が必要です",
  );
  checkLegacyTokens(
    "src/components/common-test/exam/CommonTestExamHeader.tsx",
    activeExamHeaderSource,
  );
}

const problemLectureSource = readRequired(
  "src/components/common-test/problem-lecture/CommonTestProblemLecturePage.tsx",
);
if (problemLectureSource) {
  check(
    problemLectureSource.indexOf("<LearningPageHeader") >= 0 &&
      problemLectureSource.indexOf("<LearningPageHeader") <
        problemLectureSource.indexOf("<StickyProblemViewer"),
    "CommonTestProblemLecturePage: DOM上はページ見出しをPDF viewerより先に置いてください",
  );
}

const stickyProblemViewerSource = readRequired(
  "src/components/common-test/problem-lecture/StickyProblemViewer.tsx",
);
if (stickyProblemViewerSource) {
  check(
    stickyProblemViewerSource.includes('className="inline-flex h-11 w-11') &&
      stickyProblemViewerSource.includes('aria-label="問題PDFを別タブで開く"'),
    "StickyProblemViewer: PDF操作は44px以上と別タブ導線を維持してください",
  );
}

const reviewSummarySource = readRequired(
  "src/components/common-test/CommonTestReviewSummary.tsx",
);
if (reviewSummarySource) {
  check(
    reviewSummarySource.includes("const dueCount = meta.todayCount;") &&
      !reviewSummarySource.includes("meta.todayCount + meta.overdueCount"),
    "CommonTestReviewSummary: todayCountに含まれる期限切れ件数を二重加算しないでください",
  );
}

const lectureCatalogSource = readRequired(
  "src/components/lectures/LectureRoadmapCatalog.tsx",
);
if (lectureCatalogSource) {
  check(
    lectureCatalogSource.includes("aria-pressed={filter === item.id}") &&
      lectureCatalogSource.includes('title="条件に合う講義がありません"') &&
      lectureCatalogSource.includes('onClick={() => setFilter("all")}'),
    "LectureRoadmapCatalog: filterの選択状態と0件時の解除導線を提供してください",
  );
}

const scoreTrendSource = readRequired(
  "src/components/mock/history/ScoreTrendChart.tsx",
);
if (scoreTrendSource) {
  check(
    scoreTrendSource.includes("各回の得点を表で確認") &&
      scoreTrendSource.includes('<th scope="col"') &&
      scoreTrendSource.includes("onFocus={() => setHover(i)}"),
    "ScoreTrendChart: hover以外でも各回の得点を確認できる表とfocus操作が必要です",
  );
}

const radarSource = readRequired(
  "src/components/mock/history/UnitRadarChart.tsx",
);
if (radarSource) {
  check(
    radarSource.includes('aria-label="単元別正答率の数値一覧"') &&
      radarSource.includes("fontSize={12}"),
    "UnitRadarChart: touch/支援技術向け数値一覧と12px以上の軸ラベルが必要です",
  );
}

const courseSubjectSource = readRequired(
  "src/components/courses/CourseSubjectPageView.tsx",
);
if (courseSubjectSource) {
  check(
    courseSubjectSource.includes(
      'const isPreparing = subject.status === "preparing" || subject.status === "coming-soon";',
    ) && !courseSubjectSource.includes("const isPreparing = isPremium ||"),
    "CourseSubjectPageView: premium種別と未公開状態を混同しないでください",
  );
}

for (const file of [
  "src/components/common-test/mock-exam/CommonTestPdfMockViewer.tsx",
  "src/components/common-test/exam-paper/ExamPaperRunner.tsx",
]) {
  const source = readRequired(file);
  if (!source) continue;
  check(
    source.includes('role="tablist"') &&
      source.includes('role="tab"') &&
      source.includes('role="tabpanel"') &&
      source.includes("min-h-11"),
    `${file}: mobile切替には44px以上のARIA tab操作が必要です`,
  );
}

const approachTabsSource = readRequired(
  "src/components/scaffolding/ApproachTabs.tsx",
);
if (approachTabsSource) {
  check(
    approachTabsSource.includes('role="tablist"') &&
      approachTabsSource.includes('aria-selected={isActive}') &&
      approachTabsSource.includes("selectFromKeyboard"),
    "ApproachTabs: 解法切替はARIA tabとキーボード移動に対応してください",
  );
}
for (const subject of PUBLIC_COURSE_SUBJECTS) {
  for (const unit of subject.units) {
    check(
      unit.lessons.length > 0,
      `${subject.subjectId}/${unit.unitId}: 公開単元には1件以上の講座が必要です`,
    );
  }
}

if (issues.length > 0) {
  console.error("deep-learning-ui QA FAILED: " + issues.length + " issue(s).");
  for (const issue of issues) console.error("- " + issue);
  process.exitCode = 1;
} else {
  console.log(
    "deep-learning-ui QA passed: " +
      PRIORITY_TARGETS.length +
      " priority views and " +
      LEGACY_ONLY_TARGETS.length +
      " legacy-only components plus " +
      DEEP_INTERACTION_TARGETS.length +
      " deep interactions satisfy the shared-shell and legacy-token contracts.",
  );
}
