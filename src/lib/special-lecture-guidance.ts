import type { Difficulty, Problem } from "@/lib/types";

export interface MasteryLectureGuide {
  lectureSlug: string;
  legacySlugs: string[];
  unitNames: string[];
  unitSlugs: string[];
  title: string;
  shortTitle: string;
  description: string;
  ctaLabel: string;
  masteryFocus: string;
  weapons: string[];
  recoveryLinks: { symptom: string; label: string; href: string }[];
  commonTestAppearance: string;
  targetMinutes: number;
}

export const MASTERY_LECTURE_GUIDES: MasteryLectureGuide[] = [
  {
    lectureSlug: "geometry-measurement-intensive",
    legacySlugs: [],
    unitNames: ["図形と計量"],
    unitSlugs: ["measurement-trigonometry", "figures-and-measurement"],
    title: "図形と計量 満点講義",
    shortTitle: "図形と計量",
    description:
      "正弦定理・余弦定理の判別、sinの求め方、外接円・内接円、測量・空間図形まで一気に確認します。",
    ctaLabel: "特別授業で判別力を鍛える",
    masteryFocus: "辺・角・面積から使う公式を選び切る",
    weapons: ["余弦定理で第三辺を出す", "面積公式からsinを逆算する", "円周角で角を移して正弦定理につなぐ"],
    recoveryLinks: [
      { symptom: "公式選択を間違えた", label: "解法判別フロー", href: "/common-test/lectures/geometry-measurement-intensive#tool-flow" },
      { symptom: "sin/cosの符号を間違えた", label: "鋭角・鈍角確認", href: "/common-test/lectures/geometry-measurement-intensive#angle-sign-heading" },
      { symptom: "外接円・内接円で止まった", label: "R・rの章", href: "/common-test/lectures/geometry-measurement-intensive#circumradius-heading" },
    ],
    commonTestAppearance:
      "第1問で、辺の長さ、面積、sinの値を誘導で順に求めさせる形で出ます。",
    targetMinutes: 6,
  },
  {
    lectureSlug: "geometry-properties-auxiliary-lines",
    legacySlugs: ["geometry-properties-intensive"],
    unitNames: ["図形の性質"],
    unitSlugs: ["geometry-properties"],
    title: "図形の性質 満点講義",
    shortTitle: "図形の性質",
    description:
      "円・比・相似・方べき・チェバ・メネラウスの使い分けと、補助線を引く基準を鍛えます。",
    ctaLabel: "図形の性質 満点講義へ",
    masteryFocus: "円周角・相似・方べきから補助線を判断する",
    weapons: ["円周角・接弦定理で角を移す", "相似・方べきで辺の比や積を作る", "球は断面円に落として平面図形として処理する"],
    recoveryLinks: [
      { symptom: "方べきに気づかなかった", label: "円の章", href: "/common-test/lectures/geometry-properties-auxiliary-lines#gp-circle-heading" },
      { symptom: "チェバとメネラウスを取り違えた", label: "比の章", href: "/common-test/lectures/geometry-properties-auxiliary-lines#gp-ratio-heading" },
      { symptom: "補助線が思いつかなかった", label: "図形レイヤー", href: "/common-test/lectures/geometry-properties-auxiliary-lines#geometry-properties-layer" },
      { symptom: "接線の長さの相等や半径との垂直に気づかなかった", label: "円と接線の判断", href: "/common-test/lectures/geometry-properties-auxiliary-lines#gp-core-circle-tangent-heading" },
      { symptom: "球の断面で直角三角形を作れなかった", label: "球の断面への接続", href: "/common-test/lectures/geometry-properties-auxiliary-lines#gp-core-sphere-heading" },
    ],
    commonTestAppearance:
      "冊子型模試の第3問で、円・接線・方べき・球の断面として単独で出るほか、図形と計量との融合で辺を作る前段階として円周角・相似・方べきが使われます。",
    targetMinutes: 8,
  },
  {
    lectureSlug: "quadratic-case-split-intensive",
    legacySlugs: [],
    unitNames: ["2次関数", "二次関数"],
    unitSlugs: ["quadratic-functions"],
    title: "二次関数 場合分け満点講義",
    shortTitle: "二次関数",
    description:
      "軸・定義域・端点比較・場合分けを、本番形式で迷わず処理するための講義です。",
    ctaLabel: "二次関数 満点講義へ",
    masteryFocus: "軸・端点・境界値を先に出す",
    weapons: ["平方完成で軸を読む", "端点比較で最大値を決める", "境界値で場合分けを閉じる"],
    recoveryLinks: [
      { symptom: "場合分けが足りなかった", label: "解法判別フロー", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-flow" },
      { symptom: "端点比較を忘れた", label: "端点比較の型", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-endpoint-callout" },
      { symptom: "文字定数の最大最小で詰まった", label: "軸と定義域の完全判別", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-parameter-flow" },
      { symptom: "場合分けの境界を間違えた", label: "場合分け境界ドリル", href: "/common-test/lectures/quadratic-case-split-intensive#quadratic-boundary-drill" },
    ],
    commonTestAppearance:
      "第2問で、軸が定義域の内外を動く最大最小として出ます。",
    targetMinutes: 6,
  },
  {
    lectureSlug: "probability-guided-reading",
    legacySlugs: ["probability-counting-intensive"],
    unitNames: ["場合の数と確率", "確率"],
    unitSlugs: ["counting-probability", "probability"],
    title: "確率 誘導読解満点講義",
    shortTitle: "確率",
    description:
      "順列・組合せ・余事象・条件付き確率の判別を鍛え、誘導文を事象に言い換える講義です。",
    ctaLabel: "確率 満点講義へ",
    masteryFocus: "分母と分子を同じ数え方にそろえる",
    weapons: ["順列と組合せを判別する", "少なくともを余事象で処理する", "条件付き確率で母集団を更新する"],
    recoveryLinks: [
      { symptom: "順列と組合せを取り違えた", label: "解法判別フロー", href: "/common-test/lectures/probability-guided-reading#probability-flow" },
      { symptom: "余事象を使えなかった", label: "余事象の判断", href: "/common-test/lectures/probability-guided-reading#probability-complement-callout" },
      { symptom: "条件付きで分母を間違えた", label: "条件付きの判別フロー", href: "/common-test/lectures/probability-guided-reading#probability-conditional-flow" },
      { symptom: "独立と排反を混同した", label: "独立・排反の判別ドリル", href: "/common-test/lectures/probability-guided-reading#probability-conditional-drill" },
    ],
    commonTestAppearance:
      "第3問で、条件整理、表や樹形図、余事象を誘導文に沿って選ばせる形で出ます。",
    targetMinutes: 6,
  },
];

const GUIDE_BY_CANONICAL_SLUG = new Map(
  MASTERY_LECTURE_GUIDES.map((guide) => [guide.lectureSlug, guide]),
);

const CANONICAL_BY_ANY_SLUG = new Map<string, string>();
for (const guide of MASTERY_LECTURE_GUIDES) {
  CANONICAL_BY_ANY_SLUG.set(guide.lectureSlug, guide.lectureSlug);
  for (const slug of guide.legacySlugs) CANONICAL_BY_ANY_SLUG.set(slug, guide.lectureSlug);
}

export function canonicalLectureSlug(slug: string): string {
  return CANONICAL_BY_ANY_SLUG.get(slug) ?? slug;
}

export function getMasteryLectureGuideBySlug(slug: string): MasteryLectureGuide | undefined {
  return GUIDE_BY_CANONICAL_SLUG.get(canonicalLectureSlug(slug));
}

export function getMasteryLectureGuideForUnit({
  unitName,
  unitSlug,
}: {
  unitName?: string;
  unitSlug?: string;
}): MasteryLectureGuide | undefined {
  return MASTERY_LECTURE_GUIDES.find(
    (guide) =>
      (unitName ? guide.unitNames.includes(unitName) : false) ||
      (unitSlug ? guide.unitSlugs.includes(unitSlug) : false),
  );
}

// ---------------------------------------------------------------------------
// 単元別コンテキストテンプレート（この問題の核 / 身につく武器 / 出方）。
//
// 上の MASTERY_LECTURE_GUIDES は「実在する特別講義 4 本」専用のテーブルで、
// 以前はこれしか無かったため、講義の無い単元（三角関数・微積分・数列など）の
// 問題は「unit名 + title + tagline + tags を連結した文字列」に対する緩い
// 正規表現（例: /正弦|軸|最大最小/）でマッチさせるフォールバックに落ちていた。
// この正規表現はキーワード単位でユニットを区別していないため、
// 「サインカーブの合成」が二次関数テンプレートに、「正弦加法定理の証明」が
// 図形と計量テンプレートに誤爆する事故が起きていた。
//
// ここでは単元名の**完全一致**のみでテンプレートを引く。存在しない単元は
// undefined を返し、呼び出し側が問題自身の情報から作る一般的な文言に
// フォールバックする（＝他単元のテンプレートを誤って借りることは無い）。
export interface UnitContextGuide {
  /** 完全一致させる unit 名（表記ゆれ・別名込み）。 */
  unitNames: string[];
  /** この問題の核。 */
  masteryFocus: string;
  /** 身につく武器（3つ程度）。 */
  weapons: string[];
  /** A〜C 向け：共通テストでの出方。 */
  commonTestContext: string;
  /** D 以上向け：発展文脈（ラベルは難度に応じて変える）。 */
  advancedContext: string;
  /** 間違えた場合の戻り先。 */
  recoveryLinks: { symptom: string; label: string; href: string }[];
  /** 実在する特別講義があれば紐付ける（無ければ復習導線は単元ページへ）。 */
  lectureSlug?: string;
}

const UNIT_CONTEXT_GUIDES: UnitContextGuide[] = [
  {
    unitNames: ["数と式"],
    masteryFocus: "展開・因数分解・絶対値・根号の式を、同値性を保ったまま整理して最初の一手を選ぶ",
    weapons: ["因数分解の型の識別", "絶対値を含む場合分け", "根号を含む式の有理化"],
    commonTestContext: "第1問前半で、式変形や絶対値・不等式の場合分けを短時間で正確に処理させる形で出やすい",
    advancedContext: "式変形の厳密さと同値性の意識を鍛える基礎固めの問題として位置づく",
    recoveryLinks: [
      { symptom: "因数分解の型を見抜けなかった", label: "数と式の問題に戻る", href: "/units/numbers-and-expressions" },
      { symptom: "絶対値の場合分けが崩れた", label: "数と式の単元ページ", href: "/units/numbers-and-expressions" },
    ],
  },
  {
    unitNames: ["集合と命題", "集合と論理"],
    masteryFocus: "必要条件・十分条件・命題の否定を、集合の包含関係に置き換えて整理する",
    weapons: ["ベン図による包含関係の可視化", "対偶・背理法の使い分け", "ド・モルガンの法則による否定"],
    commonTestContext: "必要十分条件の判定や命題の真偽を、具体例と反例を使い分けて判断させる形で出やすい",
    advancedContext: "論理の構造そのものを問う出題で、証明の型（対偶・背理法）を正確に運用できるかが問われる",
    recoveryLinks: [
      { symptom: "必要・十分を取り違えた", label: "集合と命題の問題に戻る", href: "/units/sets-and-logic" },
      { symptom: "命題の否定でミスした", label: "集合と命題の単元ページ", href: "/units/sets-and-logic" },
    ],
  },
  {
    unitNames: ["データの分析"],
    masteryFocus: "代表値・分散・相関係数・仮説検定の意味を、公式の暗記ではなくデータの解釈として使う",
    weapons: ["分散・標準偏差の変形計算", "相関係数の符号と散布図の対応", "仮説検定の判断基準の運用"],
    commonTestContext: "実データの表やグラフを読み取り、代表値・散布図・仮説検定を選択形式で判断させる形で出やすい",
    advancedContext: "統計的な考え方そのものを問う発展問題で、公式の適用条件や検定の解釈の妥当性を吟味させる",
    recoveryLinks: [
      { symptom: "分散・標準偏差の計算でミスした", label: "データの分析の問題に戻る", href: "/units/data-analysis" },
      { symptom: "相関係数の解釈を誤った", label: "データの分析の単元ページ", href: "/units/data-analysis" },
    ],
  },
  {
    unitNames: ["整数の性質"],
    masteryFocus: "約数・倍数・互除法・合同式を使い、整数特有の性質から条件を絞り込む",
    weapons: ["ユークリッドの互除法", "合同式によるあまりの分類", "一次不定方程式の一般解"],
    commonTestContext: "n進法や不定方程式の整数解を、誘導に沿って絞り込ませる形で出やすい",
    advancedContext: "入試・発展問題や競技数学では、合同式・無限降下法・鳩の巣原理などを組み合わせた証明が中心になる",
    recoveryLinks: [
      { symptom: "互除法の計算でミスした", label: "整数の性質の問題に戻る", href: "/units/integer-properties" },
      { symptom: "合同式の扱いに詰まった", label: "整数の性質の単元ページ", href: "/units/integer-properties" },
    ],
  },
  {
    unitNames: ["式と証明"],
    masteryFocus: "二項定理・恒等式・不等式の証明を、同値変形と大小比較の根拠を明示して進める",
    weapons: ["二項定理による展開項の抽出", "相加相乗平均の適用条件の確認", "等式・不等式証明の同値変形"],
    commonTestContext: "恒等式の係数比較や、不等式の証明過程の空欄補充として出やすい",
    advancedContext: "発展問題では、複数の不等式を組み合わせた総合的な証明や、等号成立条件の吟味が問われる",
    recoveryLinks: [
      { symptom: "係数比較でミスした", label: "式と証明の問題に戻る", href: "/units/expressions-and-proofs" },
      { symptom: "不等式の証明の方針が立たなかった", label: "式と証明の単元ページ", href: "/units/expressions-and-proofs" },
    ],
  },
  {
    unitNames: ["複素数と方程式", "高次方程式"],
    masteryFocus: "複素数の計算・解と係数の関係・剰余の定理を使い、高次方程式の構造を分解する",
    weapons: ["解と係数の関係", "剰余の定理・因数定理", "複素数の絶対値・共役の性質"],
    commonTestContext: "高次方程式の解の探索や係数決定を、誘導に沿って進めさせる形で出やすい",
    advancedContext: "発展問題では、複素数の幾何的な意味づけや、高次方程式の解の分類を一般化して問われる",
    recoveryLinks: [
      { symptom: "解と係数の関係を立式できなかった", label: "複素数と方程式の問題に戻る", href: "/units/complex-numbers-equations" },
      { symptom: "因数定理の適用でミスした", label: "複素数と方程式の単元ページ", href: "/units/complex-numbers-equations" },
    ],
  },
  {
    unitNames: ["図形と方程式"],
    masteryFocus: "点・直線・円をすべて座標と式に翻訳し、軌跡・領域の条件を代数的に処理する",
    weapons: ["円と直線の位置関係の判定", "軌跡の方程式の導出", "領域における最大最小"],
    commonTestContext: "円と直線の関係や軌跡を、誘導に沿って式で表させる形で出やすい",
    advancedContext: "発展問題では、複数の図形条件を同時に満たす軌跡・領域を、パラメータ込みで一般化して問う",
    recoveryLinks: [
      { symptom: "軌跡の方程式を立てられなかった", label: "図形と方程式の問題に戻る", href: "/units/figures-and-equations" },
      { symptom: "領域の図示でミスした", label: "図形と方程式の単元ページ", href: "/units/figures-and-equations" },
    ],
  },
  {
    unitNames: ["三角関数"],
    masteryFocus: "三角関数の合成により、位相をそろえて最大値・最小値や方程式・不等式を判断する",
    weapons: ["三角関数の合成 (a sin x + b cos x)", "加法定理・倍角公式の運用", "定義域を絞った最大最小の確認"],
    commonTestContext: "誘導に従って合成・グラフの移動・最大最小を判断させる形で出やすい",
    advancedContext: "発展問題や思考力問題では、加法定理や単位円上の定義に立ち返って公式そのものを証明・拡張させる出題が中心になる",
    recoveryLinks: [
      { symptom: "合成の位相がずれた", label: "三角関数の問題に戻る", href: "/units/trigonometric-functions" },
      { symptom: "加法定理の適用でミスした", label: "三角関数の単元ページ", href: "/units/trigonometric-functions" },
    ],
  },
  {
    unitNames: ["指数関数と対数関数"],
    masteryFocus: "指数法則・対数の性質で式を同じ底にそろえ、置き換えで方程式・不等式・最大最小を処理する",
    weapons: ["指数・対数の底の統一", "置き換えによる次数下げ", "対数関数の増減と真数条件の確認"],
    commonTestContext: "誘導に沿って置き換えを行い、方程式・不等式・最大最小を順に求めさせる形で出やすい",
    advancedContext: "発展問題では、真数・底の条件を精密に管理しながら複数の指数・対数を組み合わせた証明や評価が問われる",
    recoveryLinks: [
      { symptom: "真数条件を見落とした", label: "指数・対数関数の問題に戻る", href: "/units/exponential-and-logarithmic" },
      { symptom: "底の統一でミスした", label: "指数・対数関数の単元ページ", href: "/units/exponential-and-logarithmic" },
    ],
  },
  {
    unitNames: ["微分法"],
    masteryFocus: "増減表を作り、極値・接線・方程式の実数解の個数を微分の符号から読み切る",
    weapons: ["接線の方程式の導出", "増減表による極値判定", "方程式の実数解の個数への応用"],
    commonTestContext: "誘導に沿って接線・増減・最大最小を順に求めさせる形で出やすい",
    advancedContext: "発展問題では、パラメータを含む関数の増減や、複数の曲線の共通接線などを一般化して問う",
    recoveryLinks: [
      { symptom: "増減表の符号でミスした", label: "微分法の問題に戻る", href: "/units/differentiation" },
      { symptom: "接線の方程式を立てられなかった", label: "微分法の単元ページ", href: "/units/differentiation" },
    ],
  },
  {
    unitNames: ["積分法"],
    masteryFocus: "定積分を面積・図形に翻訳し、対称性や公式で計算量を圧縮する",
    weapons: ["定積分と面積の対応", "対称性を使った計算の簡略化", "1/6公式などの面積公式"],
    commonTestContext: "誘導に沿って面積を求め、対称性や公式で検算させる形で出やすい",
    advancedContext: "発展問題では、絶対値付き積分やパラメータ付き面積の最大最小など、複数分野を組み合わせた出題になる",
    recoveryLinks: [
      { symptom: "面積の立式でミスした", label: "積分法の問題に戻る", href: "/units/integration" },
      { symptom: "絶対値付き積分の場合分けが崩れた", label: "積分法の単元ページ", href: "/units/integration" },
    ],
  },
  {
    unitNames: ["数列", "数列と極限", "数列・解析"],
    masteryFocus: "漸化式を特性方程式やタイプ分類で解き、一般項・和・帰納法の証明に落とし込む",
    weapons: ["漸化式の特性方程式", "Σ計算・階差数列の利用", "数学的帰納法による証明"],
    commonTestContext: "誘導に沿って漸化式を変形し、一般項や和を求めさせる形で出やすい",
    advancedContext: "発展問題や競技数学では、漸化式の一般化や極限の評価、帰納法の精密な運用が問われる",
    recoveryLinks: [
      { symptom: "漸化式の型を判別できなかった", label: "数列の問題に戻る", href: "/units/sequences" },
      { symptom: "帰納法の証明が崩れた", label: "数列の単元ページ", href: "/units/sequences" },
    ],
  },
  {
    unitNames: ["ベクトル"],
    masteryFocus: "内積と位置ベクトルで図形条件を式に翻訳し、成分・内積計算で答えを導く",
    weapons: ["内積による角度・垂直条件の処理", "位置ベクトルでの分点・交点表示", "空間ベクトルでの図形への応用"],
    commonTestContext: "誘導に沿って位置ベクトルを設定し、内積や交点を求めさせる形で出やすい",
    advancedContext: "発展問題では、空間図形や複数条件を同時に満たす位置ベクトルの決定など、応用範囲が広がる",
    recoveryLinks: [
      { symptom: "内積の条件を立式できなかった", label: "ベクトルの問題に戻る", href: "/units/vectors" },
      { symptom: "空間ベクトルで方針を見失った", label: "ベクトルの単元ページ", href: "/units/vectors" },
    ],
  },
  {
    unitNames: ["複素数平面"],
    masteryFocus: "複素数を極形式に直し、回転・拡大として図形的に扱う",
    weapons: ["極形式とド・モアブルの定理", "複素数の回転・拡大の図形的解釈", "1のn乗根と正多角形の対応"],
    commonTestContext: "誘導に沿って極形式に変換し、回転や図形的な意味を答えさせる形で出やすい",
    advancedContext: "発展問題では、複素数の軌跡や図形条件との融合など、代数と幾何を行き来する出題が中心になる",
    recoveryLinks: [
      { symptom: "極形式への変換でミスした", label: "複素数平面の問題に戻る", href: "/units/complex-plane" },
      { symptom: "回転の向きを取り違えた", label: "複素数平面の単元ページ", href: "/units/complex-plane" },
    ],
  },
  {
    unitNames: ["平面曲線"],
    masteryFocus: "放物線・楕円・双曲線・極方程式を標準形や媒介変数表示に直し、図形の性質を読む",
    weapons: ["2次曲線の標準形への変形", "媒介変数表示とパラメータの消去", "極方程式と直交座標の対応"],
    commonTestContext: "数学IIIの範囲であり、共通テスト数学I・Aでは直接扱われない",
    advancedContext: "数学IIIの入試・発展問題では、曲線の接線・焦点性質・回転体の体積など幾何と解析の融合が中心になる",
    recoveryLinks: [
      { symptom: "標準形への変形でミスした", label: "数学III・C講座を見る", href: "/courses/math-3c" },
    ],
  },
  {
    unitNames: ["整数論・競技数学", "関数方程式・解析"],
    masteryFocus: "定石の当てはめではなく、不変量・極端な場合の考察・構成的証明で問題固有の発想を組み立てる",
    weapons: ["不変量・単調性による評価", "極端な場合 (extremal) からの考察", "構成的証明・具体例による当たりづけ"],
    commonTestContext: "共通テストでは扱われない、競技数学・数学的探究の領域",
    advancedContext: "共通テスト直接対策ではなく、競技数学・数学的探究として発想力・証明力を鍛える拡張問題として位置づく",
    recoveryLinks: [
      { symptom: "発想の糸口が見えなかった", label: "特異点ガチャで類題を探す", href: "/abyss" },
      { symptom: "議論の構成でつまずいた", label: "過去問道場で類題を探す", href: "/dojo" },
    ],
  },
];

const UNIT_CONTEXT_BY_NAME = new Map<string, UnitContextGuide>();
for (const guide of UNIT_CONTEXT_GUIDES) {
  for (const name of guide.unitNames) UNIT_CONTEXT_BY_NAME.set(name, guide);
}

/** A〜C は共通テストが前提になるが、D 以上は難度ごとに文脈のラベルを変える。 */
export function getExamContextLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "A":
    case "B":
    case "C":
      return "共通テストでの出方";
    case "D":
      return "入試・発展問題での出方";
    case "D_PLUS":
      return "思考力問題での出方";
    case "EX":
      return "発展探究での位置づけ";
    case "OLYMPIAD":
      return "競技数学・研究的数学での位置づけ";
    default:
      return "共通テストでの出方";
  }
}

export function isCommonTestDifficulty(difficulty: Difficulty): boolean {
  return difficulty === "A" || difficulty === "B" || difficulty === "C";
}

const DEFAULT_COMMON_TEST_CONTEXT =
  "小問の誘導に沿って、条件整理から計算へ進む形で出やすい。";
const DEFAULT_ADVANCED_CONTEXT =
  "共通テスト直接対策ではなく、発想力・証明力を鍛える拡張問題として位置づく。";

export interface ProblemContextGuide {
  masteryFocus: string;
  weapons: string[];
  recoveryLinks: { symptom: string; label: string; href: string }[];
  commonTestContext: string;
  advancedContext: string;
  /** 実在する特別講義（4本のみ）。無い単元は undefined のままにする。 */
  lecture?: { lectureSlug: string; title: string; description: string; ctaLabel: string };
}

/**
 * 問題の unit 名に完全一致するテンプレートを返す。表記ゆれ (2次関数/二次関数 等) は
 * 呼び出し前にデータ側で正規化する方針だが、念のためこの関数内でも主要な別名を吸収する。
 * 一致しない場合は undefined を返し、呼び出し側が問題自身の情報から一般的な文言を組み立てる
 * （＝他単元のテンプレートを誤って借りることは無い）。
 */
export function getProblemContextGuide(problem: Problem): ProblemContextGuide | undefined {
  const contextGuide = UNIT_CONTEXT_BY_NAME.get(problem.unit);
  const lectureGuide = getMasteryLectureGuideForUnit({ unitName: problem.unit });

  if (!contextGuide && !lectureGuide) return undefined;

  return {
    masteryFocus: contextGuide?.masteryFocus ?? lectureGuide!.masteryFocus,
    weapons: contextGuide?.weapons ?? lectureGuide!.weapons,
    recoveryLinks: contextGuide?.recoveryLinks ?? lectureGuide!.recoveryLinks,
    commonTestContext:
      contextGuide?.commonTestContext ?? lectureGuide!.commonTestAppearance ?? DEFAULT_COMMON_TEST_CONTEXT,
    advancedContext: contextGuide?.advancedContext ?? DEFAULT_ADVANCED_CONTEXT,
    lecture: lectureGuide
      ? {
          lectureSlug: lectureGuide.lectureSlug,
          title: lectureGuide.title,
          description: lectureGuide.description,
          ctaLabel: lectureGuide.ctaLabel,
        }
      : undefined,
  };
}

export function getSimilarProblems(
  problem: Problem,
  allProblems: Problem[],
  limit: number,
): Problem[] {
  const problemTags = new Set(problem.tags ?? []);
  return allProblems
    .filter((candidate) => candidate.slug !== problem.slug && !candidate.isMockOnly)
    .map((candidate) => ({
      problem: candidate,
      score:
        (candidate.unit === problem.unit ? 10 : 0) +
        (candidate.difficulty === problem.difficulty ? 3 : 0) +
        (candidate.tags ?? []).filter((tag) => problemTags.has(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || difficultyDistance(a.problem.difficulty, problem.difficulty) - difficultyDistance(b.problem.difficulty, problem.difficulty))
    .slice(0, limit)
    .map((item) => item.problem);
}

export function getReversePatternProblems(
  problem: Problem,
  allProblems: Problem[],
  limit: number,
): Problem[] {
  return allProblems
    .filter(
      (candidate) =>
        candidate.slug !== problem.slug &&
        !candidate.isMockOnly &&
        candidate.unit === problem.unit &&
        candidate.difficulty !== problem.difficulty,
    )
    .sort(
      (a, b) =>
        difficultyDistance(b.difficulty, problem.difficulty) -
        difficultyDistance(a.difficulty, problem.difficulty),
    )
    .slice(0, limit);
}

function difficultyDistance(a: Difficulty, b: Difficulty): number {
  const order: Difficulty[] = ["A", "B", "C", "D", "D_PLUS", "EX", "OLYMPIAD"];
  return Math.abs(order.indexOf(a) - order.indexOf(b));
}
