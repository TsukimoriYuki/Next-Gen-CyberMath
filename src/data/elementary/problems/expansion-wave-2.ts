import { plain } from "@/data/elementary/inline";
import type { ElementaryProblem } from "@/types/elementary-problems";

type ChoiceSeed = Readonly<{
  title: string;
  prompt: string;
  labels: readonly [string, string, string, string];
  correct: readonly number[];
  detailed: string;
}>;

type NumericSeed = Readonly<{
  title: string;
  prompt: string;
  value: number;
  unit: string;
  detailed: string;
}>;

type LessonProblemSeed = Readonly<{
  slug: string;
  unitId: string;
  lessonId: string;
  entryId: string;
  objectiveIds: readonly [string, string];
  visualAssetId: string;
  choices: readonly ChoiceSeed[];
  numerics: readonly NumericSeed[];
}>;

const LETTERS = ["a", "b", "c", "d"] as const;

function buildLessonProblems(seed: LessonProblemSeed): readonly ElementaryProblem[] {
  const choiceProblems = seed.choices.map((problem, index) => {
    const order = index + 1;
    const correctChoiceIds = problem.correct.map((choiceIndex) => LETTERS[choiceIndex]);
    const multiple = correctChoiceIds.length > 1;
    return {
      id: `eg3-math-${seed.slug}-${String(order).padStart(2, "0")}`,
      slug: `eg3-math-${seed.slug}-${String(order).padStart(2, "0")}`,
      grade: "grade-3",
      subject: "math",
      unitId: seed.unitId,
      lessonIds: [seed.lessonId],
      order,
      title: plain(problem.title),
      prompt: plain(`${problem.prompt} ${multiple ? `正しいものを${correctChoiceIds.length}つえらびましょう。` : "正しいものを1つえらびましょう。"}`),
      type: multiple ? "multiple-choice" : "single-choice",
      choices: problem.labels.map((label, choiceIndex) => ({
        id: LETTERS[choiceIndex],
        label: plain(label),
        reason: plain(problem.correct.includes(choiceIndex)
          ? `正しいです。${problem.detailed}`
          : `「${label}」ではありません。${problem.detailed}`),
      })),
      answer: multiple
        ? { kind: "multiple-choice" as const, correctChoiceIds, selectionCount: correctChoiceIds.length }
        : { kind: "single-choice" as const, correctChoiceIds: [correctChoiceIds[0]] as readonly [string] },
      explanation: {
        detailed: plain(problem.detailed),
        firstCheck: plain("何を聞かれているかと、図や式の数をたしかめます。"),
        verification: plain("えらんだ答えを、図・式・たんいにもどしてたしかめます。"),
        commonMistake: plain("見た目だけで決めず、くらい・目もり・たんいをたしかめましょう。"),
      },
      hint: plain("図のしるしと、もとになる数に目をつけましょう。"),
      visualAssetId: seed.visualAssetId,
      curriculumEntryIds: [seed.entryId],
      curriculumObjectiveIds: [seed.objectiveIds[index % seed.objectiveIds.length]],
      difficulty: order >= 7 ? "standard" : "basic",
      estimatedSeconds: order >= 7 ? 100 : 70,
      reviewTags: [seed.entryId, "expansion-wave-2"],
      mistakeTags: ["くらい・目もり・たんいの取りちがい"],
      publicationStatus: "hidden",
      reviewStatus: "pilot",
      sourceType: "original",
      copyrightStatus: "original",
    } satisfies ElementaryProblem;
  });

  const numericProblems = seed.numerics.map((problem, index) => {
    const order = seed.choices.length + index + 1;
    return {
      id: `eg3-math-${seed.slug}-${String(order).padStart(2, "0")}`,
      slug: `eg3-math-${seed.slug}-${String(order).padStart(2, "0")}`,
      grade: "grade-3",
      subject: "math",
      unitId: seed.unitId,
      lessonIds: [seed.lessonId],
      order,
      title: plain(problem.title),
      prompt: plain(`${problem.prompt} 数を書きましょう。`),
      type: "numeric-input",
      choices: [],
      answer: { kind: "numeric-input", numeric: { value: problem.value, tolerance: 0, unit: plain(problem.unit) } },
      explanation: {
        detailed: plain(problem.detailed),
        firstCheck: plain("何をもとめるかと、答えのたんいをたしかめます。"),
        verification: plain("答えを図や式にもどし、もとの数と合うかたしかめます。"),
        commonMistake: plain("数字だけでなく、くらい・目もり・たんいも見直しましょう。"),
      },
      hint: plain("小さなまとまりに分けて、じゅんに考えましょう。"),
      visualAssetId: seed.visualAssetId,
      curriculumEntryIds: [seed.entryId],
      curriculumObjectiveIds: [seed.objectiveIds[index % seed.objectiveIds.length]],
      difficulty: order >= 7 ? "standard" : "basic",
      estimatedSeconds: order >= 7 ? 100 : 70,
      reviewTags: [seed.entryId, "expansion-wave-2", ...(problem.unit === "" ? ["unitless-answer"] : [])],
      mistakeTags: ["計算・たんいの取りちがい"],
      publicationStatus: "hidden",
      reviewStatus: "pilot",
      sourceType: "original",
      copyrightStatus: "original",
    } satisfies ElementaryProblem;
  });

  if (choiceProblems.length + numericProblems.length !== 8) {
    throw new Error(`${seed.lessonId} must have exactly 8 problems`);
  }
  return Object.freeze([...choiceProblems, ...numericProblems]);
}

const LESSON_SEEDS: readonly LessonProblemSeed[] = [
  {
    slug: "read-large-numbers",
    unitId: "g3-math-large-numbers-unit",
    lessonId: "elementary-grade-3-math-read-large-numbers",
    entryId: "g3-math-whole-numbers",
    objectiveIds: ["g3-math-whole-numbers-knowledge", "g3-math-whole-numbers-thinking"],
    visualAssetId: "large-number-place-value-chart",
    choices: [
      { title: "三万五千", prompt: "三万五千を数字で書いたものはどれですか。", labels: ["35000", "30500", "3500", "30005"], correct: [0], detailed: "三万は30000、五千は5000なので35000です。" },
      { title: "0のやくわり", prompt: "30005の百のくらいと十のくらいはどうなっていますか。", labels: ["どちらも0", "百だけ3", "十だけ5", "どちらも5"], correct: [0], detailed: "30005では百と十のくらいに0をおき、一のくらいが5です。" },
      { title: "くらいのねうち", prompt: "47218の7が表す数はどれですか。", labels: ["7000", "700", "70", "7"], correct: [0], detailed: "7は千のくらいにあるので7000を表します。" },
      { title: "大きさくらべ", prompt: "大きい数はどれですか。", labels: ["48219", "48192", "47819", "42819"], correct: [0], detailed: "万、千、百のくらいのじゅんにくらべると48219がいちばん大きいです。" },
    ],
    numerics: [
      { title: "数字で書く", prompt: "六万二百を数字で書くといくつですか。", value: 60200, unit: "", detailed: "六万は60000、二百は200なので60200です。" },
      { title: "万のくらい", prompt: "85304の万のくらいの数字はいくつですか。", value: 8, unit: "", detailed: "いちばん左の8が万のくらいです。" },
      { title: "数直線", prompt: "20000から1000ずつ進む数直線で、5つ進んだ数はいくつですか。", value: 25000, unit: "", detailed: "1000を5回たすので20000＋5000＝25000です。" },
      { title: "10ばい", prompt: "4300を10ばいした数はいくつですか。", value: 43000, unit: "", detailed: "4300を10こ分にすると43000です。" },
    ],
  },
  {
    slug: "large-number-addition-subtraction",
    unitId: "g3-math-addition-subtraction-unit",
    lessonId: "elementary-grade-3-math-large-number-addition-subtraction",
    entryId: "g3-math-addition-subtraction",
    objectiveIds: ["g3-math-addition-subtraction-knowledge", "g3-math-addition-subtraction-thinking"],
    visualAssetId: "addition-subtraction-columns",
    choices: [
      { title: "くらいをそろえる", prompt: "2345＋408をひっ算にするとき、8はどこに書きますか。", labels: ["一のくらい", "十のくらい", "百のくらい", "千のくらい"], correct: [0], detailed: "408の8は一のくらいなので、2345の5の下にそろえます。" },
      { title: "ひっ算の見直し", prompt: "3002−178で大切なことはどれですか。", labels: ["0のくらいもじゅんにくり下げる", "0の列をとばす", "たし算にかえる", "一のくらいだけ計算する"], correct: [0], detailed: "0がつづくときも、千から百、十、一へじゅんにくり下げます。" },
      { title: "えんざんをえらぶ", prompt: "2450円持っていて780円使いました。のこりをもとめる式はどれですか。", labels: ["2450−780", "2450＋780", "780−2450", "2450×780"], correct: [0], detailed: "使ったあとののこりなので、もとの金がくから使った金がくをひきます。" },
      { title: "二つのたしかめ", prompt: "3210−985＝2225をたしかめるやり方を2つえらびます。", labels: ["2225＋985を計算する", "3210−2225を計算する", "2225−985を計算する", "3210＋985を計算する"], correct: [0, 1], detailed: "ちがいとひいた数をたすやり方、もとの数からちがいをひくやり方でたしかめられます。" },
    ],
    numerics: [
      { title: "たし算", prompt: "2347＋1526はいくつですか。", value: 3873, unit: "", detailed: "一のくらいからたすと3873です。" },
      { title: "ひき算", prompt: "4205−1832はいくつですか。", value: 2373, unit: "", detailed: "くらいをそろえてひくと2373です。" },
      { title: "見つもりと計算", prompt: "1980＋2050の正しい答えはいくつですか。", value: 4030, unit: "", detailed: "2000＋2000でおよそ4000と見つもれ、正しく計算すると4030です。" },
      { title: "本の数", prompt: "図書室に1825さつあり、375さつふえました。ぜんぶで何さつですか。", value: 2200, unit: "さつ", detailed: "ふえたので1825＋375＝2200です。" },
    ],
  },
  {
    slug: "two-digit-times-one-digit",
    unitId: "g3-math-written-multiplication-unit",
    lessonId: "elementary-grade-3-math-two-digit-times-one-digit",
    entryId: "g3-math-multiplication",
    objectiveIds: ["g3-math-multiplication-knowledge", "g3-math-multiplication-thinking"],
    visualAssetId: "multiplication-decomposition-array",
    choices: [
      { title: "24を分ける", prompt: "24×3を考えるための分け方はどれですか。", labels: ["20×3と4×3", "2×3と4×3", "24＋3", "20×4と3"], correct: [0], detailed: "24を20と4に分け、それぞれを3ばいします。" },
      { title: "ぶぶんの答え", prompt: "24×3で、20×3と4×3の答えはどれですか。", labels: ["60と12", "6と12", "60と7", "20と12"], correct: [0], detailed: "20×3＝60、4×3＝12です。" },
      { title: "ひっ算の0", prompt: "30×4で正しい考え方はどれですか。", labels: ["3十が4こで12十", "3×0＝3", "30＋4", "0をとって答えを12にする"], correct: [0], detailed: "3十が4こで12十、答えは120です。" },
      { title: "見つもり", prompt: "48×3の答えにもっともちかい数はどれですか。", labels: ["150", "50", "500", "15"], correct: [0], detailed: "48を50と見ると50×3＝150なので、答え144に近いです。" },
    ],
    numerics: [
      { title: "ひっ算1", prompt: "32×3はいくつですか。", value: 96, unit: "", detailed: "30×3＝90、2×3＝6、合わせて96です。" },
      { title: "ひっ算2", prompt: "47×2はいくつですか。", value: 94, unit: "", detailed: "40×2＝80、7×2＝14、合わせて94です。" },
      { title: "えんぴつ", prompt: "1はこに28本のえんぴつが3はこあります。ぜんぶで何本ですか。", value: 84, unit: "本", detailed: "28×3＝84です。" },
      { title: "いすの数", prompt: "1列に36きゃくずつ、4列にならべます。いすは何きゃくですか。", value: 144, unit: "きゃく", detailed: "36×4＝144です。" },
    ],
  },
  {
    slug: "three-digit-times-one-digit",
    unitId: "g3-math-written-multiplication-unit",
    lessonId: "elementary-grade-3-math-three-digit-times-one-digit",
    entryId: "g3-math-multiplication",
    objectiveIds: ["g3-math-multiplication-knowledge", "g3-math-multiplication-thinking"],
    visualAssetId: "multiplication-decomposition-array",
    choices: [
      { title: "三つに分ける", prompt: "234×3を考える分け方はどれですか。", labels: ["200×3、30×3、4×3", "2×3、3×3、4×3", "234＋3", "200×34"], correct: [0], detailed: "234を200、30、4に分けてそれぞれを3ばいします。" },
      { title: "0をとばさない", prompt: "205×4の正しい答えはどれですか。", labels: ["820", "100", "802", "80"], correct: [0], detailed: "200×4＝800、0×4＝0、5×4＝20で820です。" },
      { title: "0でおわる数", prompt: "120×3の正しい考え方はどれですか。", labels: ["12十×3＝36十", "12×3＝36でおわり", "1×2×3", "120＋3"], correct: [0], detailed: "120は12十なので、12十が3こで36十、360です。" },
      { title: "見つもり", prompt: "298×3の答えにもっともちかい数はどれですか。", labels: ["900", "300", "600", "90"], correct: [0], detailed: "298を300と見ると300×3＝900で、正しい答え894に近いです。" },
    ],
    numerics: [
      { title: "三けたのひっ算1", prompt: "123×4はいくつですか。", value: 492, unit: "", detailed: "一、十、百のくらいをじゅんに計算すると492です。" },
      { title: "三けたのひっ算2", prompt: "246×3はいくつですか。", value: 738, unit: "", detailed: "6×3＝18からくり上げて計算すると738です。" },
      { title: "0をふくむ数", prompt: "304×2はいくつですか。", value: 608, unit: "", detailed: "300×2＝600、4×2＝8で608です。" },
      { title: "紙のまい数", prompt: "1たばに215まいの紙が4たばあります。ぜんぶで何まいですか。", value: 860, unit: "まい", detailed: "215×4＝860です。" },
    ],
  },
  {
    slug: "measure-length",
    unitId: "g3-math-measurement-unit",
    lessonId: "elementary-grade-3-math-measure-length",
    entryId: "g3-math-length-weight",
    objectiveIds: ["g3-math-length-weight-knowledge", "g3-math-length-weight-thinking"],
    visualAssetId: "length-ruler-and-route",
    choices: [
      { title: "合うたんい", prompt: "学校からこうえんまでの道のりを表すのに合うたんいはどれですか。", labels: ["km", "mm", "g", "秒"], correct: [0], detailed: "長い道のりにはkmが合います。" },
      { title: "ものさし", prompt: "ものさしの2cmから7cmまでの長さはどれですか。", labels: ["5cm", "7cm", "9cm", "2cm"], correct: [0], detailed: "おわりの7からはじめの2をひいて5cmです。" },
      { title: "mmとcm", prompt: "3cmと同じ長さはどれですか。", labels: ["30mm", "3mm", "300mm", "13mm"], correct: [0], detailed: "1cm＝10mmなので3cm＝30mmです。" },
      { title: "道のり", prompt: "家から店まで400m、店からこうえんまで350mです。店を通る道のりはどれですか。", labels: ["750m", "50m", "400m", "350m"], correct: [0], detailed: "道のりは400＋350＝750mです。" },
    ],
    numerics: [
      { title: "目もり", prompt: "1cmを10こに分けた目もり3こ分は何mmですか。", value: 3, unit: "mm", detailed: "小さい目もり1こが1mmなので3mmです。" },
      { title: "mをcmへ", prompt: "2mは何cmですか。", value: 200, unit: "cm", detailed: "1m＝100cmなので2m＝200cmです。" },
      { title: "長さのちがい", prompt: "85cmのひもと47cmのひもの長さのちがいは何cmですか。", value: 38, unit: "cm", detailed: "85−47＝38cmです。" },
      { title: "道のりののこり", prompt: "1kmの道を620m進みました。のこりは何mですか。", value: 380, unit: "m", detailed: "1km＝1000mなので1000−620＝380mです。" },
    ],
  },
  {
    slug: "measure-weight",
    unitId: "g3-math-measurement-unit",
    lessonId: "elementary-grade-3-math-measure-weight",
    entryId: "g3-math-length-weight",
    objectiveIds: ["g3-math-length-weight-knowledge", "g3-math-length-weight-thinking"],
    visualAssetId: "weight-scale-and-time-line",
    choices: [
      { title: "合うたんい", prompt: "ランドセルの重さを表すのに合うたんいはどれですか。", labels: ["kg", "km", "秒", "mm"], correct: [0], detailed: "ランドセルの重さにはkgが合います。" },
      { title: "1kg", prompt: "1kgと同じ重さはどれですか。", labels: ["1000g", "100g", "10g", "10000g"], correct: [0], detailed: "1kg＝1000gです。" },
      { title: "はかりの目もり", prompt: "0gから500gまでを5つに分けた目もり1こ分はどれですか。", labels: ["100g", "50g", "500g", "5g"], correct: [0], detailed: "500÷5＝100なので目もり1こ分は100gです。" },
      { title: "大きな重さ", prompt: "大きなトラックの重さを表すのに合うたんいはどれですか。", labels: ["t", "g", "mm", "分"], correct: [0], detailed: "とても重いものにはtを使います。" },
    ],
    numerics: [
      { title: "kgをgへ", prompt: "3kgは何gですか。", value: 3000, unit: "g", detailed: "1kg＝1000gなので3kg＝3000gです。" },
      { title: "はかりを読む", prompt: "目もり1こが50gのはかりで、0から7目もりの重さは何gですか。", value: 350, unit: "g", detailed: "50×7＝350gです。" },
      { title: "合わせた重さ", prompt: "750gと480gを合わせると何gですか。", value: 1230, unit: "g", detailed: "750＋480＝1230gです。" },
      { title: "中みの重さ", prompt: "はこと中みで920g、はこだけで170gです。中みは何gですか。", value: 750, unit: "g", detailed: "920−170＝750gです。" },
    ],
  },
  {
    slug: "time-and-duration",
    unitId: "g3-math-measurement-unit",
    lessonId: "elementary-grade-3-math-time-and-duration",
    entryId: "g3-math-time",
    objectiveIds: ["g3-math-time-knowledge", "g3-math-time-thinking"],
    visualAssetId: "weight-scale-and-time-line",
    choices: [
      { title: "時こくと時間", prompt: "『午前9時に始まる』の9時が表すものはどれですか。", labels: ["時こく", "時間", "長さ", "重さ"], correct: [0], detailed: "時計のある一点を表すので時こくです。" },
      { title: "60分", prompt: "1時間と同じ時間はどれですか。", labels: ["60分", "100分", "30分", "10分"], correct: [0], detailed: "1時間＝60分です。" },
      { title: "20分後", prompt: "午前10時50分の20分後はどれですか。", labels: ["午前11時10分", "午前10時70分", "午前11時20分", "午後10時10分"], correct: [0], detailed: "10分で11時、さらに10分で11時10分です。" },
      { title: "正午をこえる", prompt: "午前11時45分から30分後はどれですか。", labels: ["午後0時15分", "午前11時75分", "午後1時15分", "午前0時15分"], correct: [0], detailed: "15分で正午、さらに15分で午後0時15分です。" },
    ],
    numerics: [
      { title: "秒へ", prompt: "2分は何秒ですか。", value: 120, unit: "秒", detailed: "1分＝60秒なので60×2＝120秒です。" },
      { title: "すぎた時間", prompt: "午前9時20分から午前10時まで、何分ですか。", value: 40, unit: "分", detailed: "9時20分から10時までは40分です。" },
      { title: "おわる時こく", prompt: "午後1時35分から50分べんきょうします。おわりは午後2時何分ですか。", value: 25, unit: "分", detailed: "25分で2時、のこり25分で午後2時25分です。" },
      { title: "二つの時間", prompt: "35分と50分を合わせると何分ですか。", value: 85, unit: "分", detailed: "35＋50＝85分で、1時間25分と同じです。" },
    ],
  },
  {
    slug: "classify-triangles",
    unitId: "g3-math-triangles-unit",
    lessonId: "elementary-grade-3-math-classify-triangles",
    entryId: "g3-math-triangles",
    objectiveIds: ["g3-math-triangles-knowledge", "g3-math-triangles-thinking"],
    visualAssetId: "triangle-classification",
    choices: [
      { title: "三角形", prompt: "三角形のせつめいとして正しいものはどれですか。", labels: ["3本のまっすぐな線でかこまれた形", "2本の線でかこまれた形", "まがった線がある形", "線がつながっていない形"], correct: [0], detailed: "三角形は3本のまっすぐなへんでかこまれています。" },
      { title: "へんとちょう点", prompt: "三角形のへんとちょう点の数はどれですか。", labels: ["へん3本、ちょう点3こ", "へん2本、ちょう点3こ", "へん3本、ちょう点4こ", "へん4本、ちょう点4こ"], correct: [0], detailed: "三角形にはへんが3本、ちょう点が3こあります。" },
      { title: "二等へん三角形", prompt: "二等へん三角形はどれですか。", labels: ["同じ長さのへんが2本ある三角形", "へんがすべてちがう四角形", "まるい形", "へんが1本の形"], correct: [0], detailed: "同じ長さのへんが2本ある三角形を二等へん三角形といいます。" },
      { title: "正三角形", prompt: "正三角形はどれですか。", labels: ["3本のへんが同じ長さの三角形", "2本だけがまっすぐな形", "角がない形", "4本のへんが同じ形"], correct: [0], detailed: "正三角形は3本のへんがすべて同じ長さです。" },
      { title: "向きをかえる", prompt: "二等へん三角形を横向きにするとどうなりますか。", labels: ["二等へん三角形のまま", "三角形ではなくなる", "円になる", "正方形になる"], correct: [0], detailed: "向きをかえてもへんの長さはかわらないので、なかまは同じです。" },
      { title: "二つのなかま", prompt: "3本のへんがすべて同じ三角形について正しいものを2つえらびます。", labels: ["正三角形である", "同じ長さのへんが2本あると見ることもできる", "三角形ではない", "へんが4本ある"], correct: [0, 1], detailed: "3本が同じなら正三角形で、同じ長さのへんを2本見つけることもできます。" },
    ],
    numerics: [
      { title: "へんの数", prompt: "三角形のへんは何本ですか。", value: 3, unit: "本", detailed: "三角形は3本のへんでできています。" },
      { title: "まわりの長さ", prompt: "へんが5cm、5cm、8cmの二等へん三角形のまわりは何cmですか。", value: 18, unit: "cm", detailed: "5＋5＋8＝18cmです。" },
    ],
  },
  {
    slug: "circles-and-spheres",
    unitId: "g3-math-circles-spheres-unit",
    lessonId: "elementary-grade-3-math-circles-and-spheres",
    entryId: "g3-math-circles-spheres",
    objectiveIds: ["g3-math-circles-spheres-knowledge", "g3-math-circles-spheres-thinking"],
    visualAssetId: "circle-sphere-structure",
    choices: [
      { title: "円の中心", prompt: "円のまん中の点を何といいますか。", labels: ["中心", "半けい", "直けい", "ちょう点"], correct: [0], detailed: "円のまん中の点を中心といいます。" },
      { title: "半けい", prompt: "半けいはどの線ですか。", labels: ["中心から円のまわりまでの線", "円のまわりだけの線", "中心を通らない長い線", "円の外の線"], correct: [0], detailed: "半けいは中心と円のまわりをむすぶ線です。" },
      { title: "直けい", prompt: "直けいにかならずあるものはどれですか。", labels: ["円の中心を通る", "円の外だけを通る", "まがった線である", "半けいより短い"], correct: [0], detailed: "直けいは円の中心を通り、円のまわりから反対がわまでの線です。" },
      { title: "円と球", prompt: "ボールのような立体の形はどれですか。", labels: ["球", "円", "三角形", "正方形"], correct: [0], detailed: "ボールのようにどちらから見てもまるい立体を球といいます。" },
      { title: "コンパス", prompt: "同じ半けいの円をかくどうぐはどれですか。", labels: ["コンパス", "はかり", "時計", "じしゃく"], correct: [0], detailed: "コンパスは中心から同じ長さをたもって円をかきます。" },
      { title: "正しいせつめい", prompt: "円について正しいものを2つえらびます。", labels: ["半けいはどこでも同じ長さ", "直けいは半けい2本分", "中心を通らない線も直けい", "円と球は同じ立体"], correct: [0, 1], detailed: "半けいは同じ長さで、直けいは中心を通る半けい2本分です。" },
    ],
    numerics: [
      { title: "直けい", prompt: "半けいが4cmの円の直けいは何cmですか。", value: 8, unit: "cm", detailed: "直けいは半けい2本分なので4×2＝8cmです。" },
      { title: "半けい", prompt: "直けいが14cmの円の半けいは何cmですか。", value: 7, unit: "cm", detailed: "半けいは直けいの半分なので14÷2＝7cmです。" },
    ],
  },
  {
    slug: "tables-and-bar-graphs",
    unitId: "g3-math-tables-bar-graphs-unit",
    lessonId: "elementary-grade-3-math-tables-and-bar-graphs",
    entryId: "g3-math-tables-bar-graphs",
    objectiveIds: ["g3-math-tables-bar-graphs-knowledge", "g3-math-tables-bar-graphs-thinking"],
    visualAssetId: "table-and-bar-graph",
    choices: [
      { title: "いちばん多い", prompt: "図の表で、いちばん人数が多いすきな遊びはどれですか。", labels: ["おにごっこ", "なわとび", "読書", "おり紙"], correct: [0], detailed: "おにごっこは12人で、4つの中でもっとも多いです。" },
      { title: "いちばん少ない", prompt: "図の表で、いちばん人数が少ないすきな遊びはどれですか。", labels: ["おり紙", "読書", "なわとび", "おにごっこ"], correct: [0], detailed: "おり紙は4人で、もっとも少ないです。" },
      { title: "目もり", prompt: "ぼうグラフの目もり1こ分が2人なら、目もり4こ分は何人ですか。", labels: ["8人", "4人", "6人", "2人"], correct: [0], detailed: "2×4＝8人です。" },
      { title: "表とグラフ", prompt: "表が12人のとき、目もり1こ分が2人のぼうはどこまでですか。", labels: ["6目もり", "12目もり", "2目もり", "10目もり"], correct: [0], detailed: "12÷2＝6なので6目もりまでです。" },
      { title: "分からないこと", prompt: "すきな遊びのぼうグラフだけでは分からないことはどれですか。", labels: ["なぜその遊びがすきか", "いちばん多い遊び", "それぞれの人数", "人数のちがい"], correct: [0], detailed: "理由は人数を表すグラフだけでは分かりません。" },
      { title: "二つの読み取り", prompt: "図から正しく読めることを2つえらびます。", labels: ["おにごっこは12人", "読書は6人", "全員が同じ遊びをすき", "すきな理由まで分かる"], correct: [0, 1], detailed: "ぼうの高さから人数は読めますが、理由までは分かりません。" },
    ],
    numerics: [
      { title: "人数のちがい", prompt: "おにごっこ12人となわとび8人のちがいは何人ですか。", value: 4, unit: "人", detailed: "12−8＝4人です。" },
      { title: "人数の合計", prompt: "おにごっこ12人、なわとび8人、読書6人、おり紙4人の合計は何人ですか。", value: 30, unit: "人", detailed: "12＋8＋6＋4＝30人です。" },
    ],
  },
] as const;

export const ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS = Object.freeze(
  LESSON_SEEDS.flatMap(buildLessonProblems),
);
