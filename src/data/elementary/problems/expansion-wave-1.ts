import { plain } from "@/data/elementary/inline";
import type { ElementaryProblem } from "@/types/elementary-problems";

type ChoiceSeed = Readonly<{
  id: string;
  title: string;
  prompt: string;
  labels: readonly [string, string, string, string];
  correct: readonly number[];
  detailed: string;
  objectiveId: string;
  difficulty?: "basic" | "standard";
}>;

type NumericSeed = Readonly<{
  id: string;
  title: string;
  prompt: string;
  value: number;
  unit: string;
  detailed: string;
  objectiveId: string;
  difficulty?: "basic" | "standard";
}>;

const LETTERS = ["a", "b", "c", "d"] as const;

function choiceProblems(
  seeds: readonly ChoiceSeed[],
  context: Readonly<{ subject: "math" | "japanese" | "social-studies"; unitId: string; lessonId: string; entryId: string }>,
): readonly ElementaryProblem[] {
  return seeds.map((seed, index) => {
    const correctChoiceIds = seed.correct.map((choiceIndex) => LETTERS[choiceIndex]);
    const isMultiple = correctChoiceIds.length > 1;
    return {
      id: seed.id,
      slug: seed.id,
      grade: "grade-3",
      subject: context.subject,
      unitId: context.unitId,
      lessonIds: [context.lessonId],
      order: index + 1,
      title: plain(seed.title),
      prompt: plain(`${seed.prompt}${isMultiple ? ` あてはまるものを${correctChoiceIds.length}つえらびましょう。` : " 正しいものを1つえらびましょう。"}`),
      type: isMultiple ? "multiple-choice" : "single-choice",
      choices: seed.labels.map((label, choiceIndex) => ({
        id: LETTERS[choiceIndex],
        label: plain(label),
        reason: plain(seed.correct.includes(choiceIndex)
          ? `正しいです。${seed.detailed}`
          : `この答えではありません。問いの大切なこととくらべると、${seed.detailed}`),
      })),
      answer: isMultiple
        ? { kind: "multiple-choice" as const, correctChoiceIds, selectionCount: correctChoiceIds.length }
        : { kind: "single-choice" as const, correctChoiceIds: [correctChoiceIds[0]] as readonly [string] },
      explanation: {
        detailed: plain(seed.detailed),
        firstCheck: plain("問いで聞かれていることと、もとになる数や文をたしかめます。"),
        verification: plain("えらんだ答えを、図・式・本文のことばにもどしてたしかめます。"),
        commonMistake: plain("一つのことばや数字だけで決めず、問い全体を読むことが大切です。"),
      },
      hint: plain("問いの中の大切なことばに目をつけましょう。"),
      curriculumEntryIds: [context.entryId],
      curriculumObjectiveIds: [seed.objectiveId],
      difficulty: seed.difficulty ?? (index >= 6 ? "standard" : "basic"),
      estimatedSeconds: seed.difficulty === "standard" || index >= 6 ? 90 : 60,
      reviewTags: [context.entryId, "expansion-wave-1"],
      mistakeTags: ["問いの読みちがい"],
      publicationStatus: "hidden",
      reviewStatus: "pilot",
      sourceType: "original",
      copyrightStatus: "original",
    } satisfies ElementaryProblem;
  });
}

function numericProblems(
  seeds: readonly NumericSeed[],
  context: Readonly<{ unitId: string; lessonId: string; entryId: string }>,
): readonly ElementaryProblem[] {
  return seeds.map((seed, index) => ({
    id: seed.id,
    slug: seed.id,
    grade: "grade-3",
    subject: "math",
    unitId: context.unitId,
    lessonIds: [context.lessonId],
    order: index + 5,
    title: plain(seed.title),
    prompt: plain(`${seed.prompt} 数を書きましょう。`),
    type: "numeric-input",
    choices: [],
    answer: { kind: "numeric-input", numeric: { value: seed.value, tolerance: 0, unit: plain(seed.unit) } },
    explanation: {
      detailed: plain(seed.detailed),
      firstCheck: plain("何をもとめるのかと、使う数をたしかめます。"),
      verification: plain("答えを、図やもとの式にもどしてたしかめます。"),
      commonMistake: plain("答えの数だけでなく、何を表す数かもたしかめましょう。"),
    },
    hint: plain("図や式の一つ分に目をつけましょう。"),
    curriculumEntryIds: [context.entryId],
    curriculumObjectiveIds: [seed.objectiveId],
    difficulty: seed.difficulty ?? (index >= 2 ? "standard" : "basic"),
    estimatedSeconds: seed.difficulty === "standard" || index >= 2 ? 90 : 60,
    reviewTags: [context.entryId, "expansion-wave-1"],
    mistakeTags: ["数と意味の取りちがい"],
    publicationStatus: "hidden",
    reviewStatus: "pilot",
    sourceType: "original",
    copyrightStatus: "original",
  } satisfies ElementaryProblem));
}

const remainderContext = { subject: "math", unitId: "g3-math-division-unit", lessonId: "elementary-grade-3-math-division-with-remainders", entryId: "g3-math-division" } as const;
export const ELEMENTARY_REMAINDER_PROBLEMS = [
  ...choiceProblems([
    { id: "eg3-math-remainder-01", title: "あまりのある式", prompt: "14こを4こずつ分ける式はどれですか。", labels: ["14÷4", "14−4", "4÷14", "14×4"], correct: [0], detailed: "14÷4＝3あまり2です。", objectiveId: "g3-math-division-one-digit" },
    { id: "eg3-math-remainder-02", title: "あまりの大きさ", prompt: "7でわったとき、あまりにできる数はどれですか。", labels: ["6", "7", "8", "14"], correct: [0], detailed: "あまりは、わる数の7より小さくします。", objectiveId: "g3-math-division-checking" },
    { id: "eg3-math-remainder-03", title: "式のたしかめ", prompt: "23÷5＝4あまり3をたしかめる式はどれですか。", labels: ["5×4＋3＝23", "5×4＝20", "4×3＋5＝17", "23−5＝18"], correct: [0], detailed: "わる数×答え＋あまりでもとの数23になります。", objectiveId: "g3-math-division-checking" },
    { id: "eg3-math-remainder-04", title: "場面にもどす", prompt: "17本を5本ずつのたばにします。できるたばと、のこる本数はどれですか。", labels: ["3たば、2本", "2たば、3本", "3たば、5本", "4たば、2本"], correct: [0], detailed: "5×3＝15で、17−15＝2です。", objectiveId: "g3-math-division-situation-choice", difficulty: "standard" },
  ], remainderContext),
  ...numericProblems([
    { id: "eg3-math-remainder-05", title: "あまりをもとめる", prompt: "11÷3のあまりはいくつですか。", value: 2, unit: "こ", detailed: "3×3＝9なので、11−9＝2。あまりは2です。", objectiveId: "g3-math-division-one-digit", difficulty: "basic" },
    { id: "eg3-math-remainder-06", title: "答えをもとめる", prompt: "29÷6の答えはいくつですか。あまりではなく、答えの数を書きます。", value: 4, unit: "", detailed: "6×4＝24で、6×5は29より大きいので、答えは4です。", objectiveId: "g3-math-division-one-digit", difficulty: "basic" },
    { id: "eg3-math-remainder-07", title: "もとの数", prompt: "8×3＋5でもとめられる、もとの数はいくつですか。", value: 29, unit: "", detailed: "8×3＝24、24＋5＝29です。", objectiveId: "g3-math-division-checking", difficulty: "standard" },
    { id: "eg3-math-remainder-08", title: "はこに入れる", prompt: "26こを1はこに6こずつ入れます。いっぱいになるはこは何こですか。", value: 4, unit: "はこ", detailed: "26÷6＝4あまり2なので、いっぱいになるはこは4こです。", objectiveId: "g3-math-division-situation-choice", difficulty: "basic" },
  ], remainderContext),
] as const satisfies readonly ElementaryProblem[];

const decimalContext = { subject: "math", unitId: "g3-math-decimals-unit", lessonId: "elementary-grade-3-math-tenths-and-decimals", entryId: "g3-math-decimals" } as const;
export const ELEMENTARY_DECIMAL_PROBLEMS = [
  ...choiceProblems([
    { id: "eg3-math-decimal-01", title: "0.1のいみ", prompt: "1を10こに同じ大きさで分けた1つ分はどれですか。", labels: ["0.1", "1.0", "0.01", "10"], correct: [0], detailed: "1を10等分した1つ分を0.1と書きます。", objectiveId: "g3-math-decimals-knowledge" },
    { id: "eg3-math-decimal-02", title: "小数の読み方", prompt: "0.7の読み方はどれですか。", labels: ["れい点七", "七点れい", "れい点一", "七"], correct: [0], detailed: "0.7は、れい点七と読みます。", objectiveId: "g3-math-decimals-knowledge" },
    { id: "eg3-math-decimal-03", title: "大きさをくらべる", prompt: "0.4と0.9では、どちらが大きいですか。", labels: ["0.9", "0.4", "同じ", "くらべられない"], correct: [0], detailed: "0.1が9こある0.9の方が大きいです。", objectiveId: "g3-math-decimals-thinking" },
    { id: "eg3-math-decimal-04", title: "数直線のいち", prompt: "0と1の間を10等分したとき、0から6つ目のいちはどれですか。", labels: ["0.6", "6", "0.06", "1.6"], correct: [0], detailed: "0.1が6こ分なので0.6です。", objectiveId: "g3-math-decimals-thinking", difficulty: "standard" },
  ], decimalContext),
  ...numericProblems([
    { id: "eg3-math-decimal-05", title: "0.1のいくつ分", prompt: "0.1が3こ分の数はいくつですか。", value: 0.3, unit: "", detailed: "0.1を3こ合わせると0.3です。", objectiveId: "g3-math-decimals-knowledge", difficulty: "basic" },
    { id: "eg3-math-decimal-06", title: "小数で書く", prompt: "1より0.2小さい数はいくつですか。", value: 0.8, unit: "", detailed: "1.0から0.2をひくと0.8です。", objectiveId: "g3-math-decimals-knowledge", difficulty: "basic" },
    { id: "eg3-math-decimal-07", title: "かんたんなたし算", prompt: "0.4＋0.3はいくつですか。", value: 0.7, unit: "", detailed: "0.1が4こと3こで7こ分なので0.7です。", objectiveId: "g3-math-decimals-knowledge", difficulty: "standard" },
    { id: "eg3-math-decimal-08", title: "長さを小数で", prompt: "1mを10等分した3こ分は何mですか。", value: 0.3, unit: "m", detailed: "0.1mの3こ分なので0.3mです。", objectiveId: "g3-math-decimals-thinking", difficulty: "basic" },
  ], decimalContext),
] as const satisfies readonly ElementaryProblem[];

const fractionContext = { subject: "math", unitId: "g3-math-fractions-unit", lessonId: "elementary-grade-3-math-parts-of-a-whole", entryId: "g3-math-fractions" } as const;
export const ELEMENTARY_FRACTION_PROBLEMS = [
  ...choiceProblems([
    { id: "eg3-math-fraction-01", title: "4分の1", prompt: "1本のテープを同じ長さに4つに分けた1つ分はどれですか。", labels: ["1/4", "4/1", "1/3", "4"], correct: [0], detailed: "4つに同じ長さで分けた1つ分は4分の1です。", objectiveId: "g3-math-fractions-knowledge" },
    { id: "eg3-math-fraction-02", title: "3つ分", prompt: "4分の1が3つ分の大きさはどれですか。", labels: ["3/4", "1/4", "4/3", "3"], correct: [0], detailed: "4分の1を3つ合わせるので4分の3です。", objectiveId: "g3-math-fractions-knowledge" },
    { id: "eg3-math-fraction-03", title: "同じ大きさに分ける", prompt: "分数で表すために大切な分け方はどれですか。", labels: ["同じ大きさに分ける", "すきな大きさに分ける", "大きい所だけ使う", "分けない"], correct: [0], detailed: "もとの大きさを同じ大きさに分けます。", objectiveId: "g3-math-fractions-thinking" },
    { id: "eg3-math-fraction-04", title: "大きさをくらべる", prompt: "同じ長さのテープの2/5と4/5では、どちらが大きいですか。", labels: ["4/5", "2/5", "同じ", "分からない"], correct: [0], detailed: "5分の1が4つ分ある4/5の方が大きいです。", objectiveId: "g3-math-fractions-thinking", difficulty: "standard" },
  ], fractionContext),
  ...numericProblems([
    { id: "eg3-math-fraction-05", title: "いくつに分けた", prompt: "1本を同じ長さに6つに分けた1つ分を1/□と書きます。□はいくつですか。", value: 6, unit: "", detailed: "6つに分けた1つ分なので6分の1です。", objectiveId: "g3-math-fractions-knowledge", difficulty: "basic" },
    { id: "eg3-math-fraction-06", title: "いくつ分", prompt: "1/5が3つ分あります。3/□の□はいくつですか。", value: 5, unit: "", detailed: "もとの1つ分は5分の1なので、3つ分は5分の3です。", objectiveId: "g3-math-fractions-knowledge", difficulty: "basic" },
    { id: "eg3-math-fraction-07", title: "1になる分数", prompt: "1/4がいくつ分あると、もとの1になりますか。", value: 4, unit: "こ分", detailed: "4分の1を4こ合わせるともとの1になります。", objectiveId: "g3-math-fractions-thinking", difficulty: "standard" },
    { id: "eg3-math-fraction-08", title: "テープの長さ", prompt: "1mのテープの1/3が1本あります。同じ長さを3本合わせると何mですか。", value: 1, unit: "m", detailed: "3分の1が3つ分でもとの1mです。", objectiveId: "g3-math-fractions-thinking", difficulty: "basic" },
  ], fractionContext),
] as const satisfies readonly ElementaryProblem[];

const keySentenceContext = { subject: "japanese", unitId: "g3-japanese-explanatory-text-unit", lessonId: "elementary-grade-3-japanese-find-key-sentences", entryId: "g3-japanese-reading-expository" } as const;
export const ELEMENTARY_KEY_SENTENCE_PROBLEMS = choiceProblems([
  { id: "eg3-japanese-key-01", title: "話題を見つける", prompt: "本文で、いちばんくり返し書かれている話題は何ですか。", labels: ["図書室の本をさがしやすくするくふう", "校庭の広さ", "きゅう食のこんだて", "雨の日の遊び"], correct: [0], detailed: "題名とそれぞれのだんらくに、本をさがすくふうがくり返し出ます。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-key-02", title: "大切な文", prompt: "第2だんらくで、いちばん大切な文はどれですか。", labels: ["本は、なかまごとに分けてならべられています。", "本だなは木でできています。", "まどの外は晴れています。", "休み時間は短いです。"], correct: [0], detailed: "後のれいをまとめる文が、そのだんらくの大切な文です。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-key-03", title: "れいのはたらき", prompt: "『物語』『生き物』『工作』と書いたのはなぜですか。", labels: ["なかま分けのれいをしめすため", "本のねだんをしめすため", "文字数をふやすため", "読むならびをきめるため"], correct: [0], detailed: "なかま分けがどのようなものか、ぐたいてきに分かります。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-key-04", title: "理由を読む", prompt: "本のせなかにしるしがあるのはなぜですか。", labels: ["もどす場所を見つけやすくするため", "本を重くするため", "表紙をかくすため", "かし出しを止めるため"], correct: [0], detailed: "本文に、もどす場所が分かると書かれています。", objectiveId: "g3-japanese-reading-expository-summary" },
  { id: "eg3-japanese-key-05", title: "まとめの文", prompt: "さいごのだんらくのはたらきはどれですか。", labels: ["前に書いたくふうをまとめる", "新しい人物を出す", "話の場所をかえる", "本の数を数える"], correct: [0], detailed: "それまでのくふうが、さがしやすさにつながるとまとめています。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-key-06", title: "本文のこんきょ", prompt: "『本をさがしやすい』と言えるこんきょはどれですか。", labels: ["なかま分けとしるしがあること", "いすが青いこと", "時計があること", "外が明るいこと"], correct: [0], detailed: "本文でせつめいされた二つのくふうがこんきょです。", objectiveId: "g3-japanese-reading-expository-summary" },
  { id: "eg3-japanese-key-07", title: "二つえらぶ", prompt: "大切な文を見つける手がかりをえらびます。", labels: ["題名とつながる", "後のれいをまとめる", "文字がいちばん長い", "かならずさいごにある"], correct: [0, 1], detailed: "題名とのつながりと、れいをまとめるはたらきを見ます。", objectiveId: "g3-japanese-reading-expository-structure", difficulty: "standard" },
  { id: "eg3-japanese-key-08", title: "読み方をまとめる", prompt: "せつめい文の大切な文を見つける読み方はどれですか。", labels: ["話題・くり返し・れいとのつながりを見る", "一文だけを読む", "知らないことをそうぞうする", "さいしょの言葉だけで決める"], correct: [0], detailed: "文どうしのつながりを見て、大切な文を決めます。", objectiveId: "g3-japanese-reading-expository-structure", difficulty: "standard" },
], keySentenceContext);

const paragraphContext = { subject: "japanese", unitId: "g3-japanese-explanatory-text-unit", lessonId: "elementary-grade-3-japanese-connect-paragraphs", entryId: "g3-japanese-reading-expository" } as const;
export const ELEMENTARY_PARAGRAPH_PROBLEMS = choiceProblems([
  { id: "eg3-japanese-paragraph-01", title: "はじめの話題", prompt: "本文のはじめに出された問題は何ですか。", labels: ["ろうかを安全に歩くにはどうするか", "校庭で何をするか", "本を何さつ読むか", "花をどこへうえるか"], correct: [0], detailed: "はじめのだんらくで、安全な歩き方を考える問いが出ています。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-paragraph-02", title: "『まず』のはたらき", prompt: "『まず』は、何をしめしますか。", labels: ["一つ目のくふう", "反対の意見", "話のおわり", "同じことのくり返し"], correct: [0], detailed: "いくつかあるくふうの、一つ目をしめします。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-paragraph-03", title: "『また』のはたらき", prompt: "『また』でつながるなかみはどれですか。", labels: ["もう一つのくふう", "前のくふうを取りけす話", "べつの日の物語", "書いた人の名前"], correct: [0], detailed: "前のなかみに、もう一つのくふうをつけ足します。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-paragraph-04", title: "理由のだんらく", prompt: "ゆっくり歩くと安全な理由はどれですか。", labels: ["人や物に気づいて止まりやすいから", "ろうかが短くなるから", "休み時間が長くなるから", "音が聞こえなくなるから"], correct: [0], detailed: "本文に、まわりに気づき、止まりやすいとあります。", objectiveId: "g3-japanese-reading-expository-summary" },
  { id: "eg3-japanese-paragraph-05", title: "くらべるだんらく", prompt: "走るときと歩くときをくらべて分かることは何ですか。", labels: ["歩く方が止まりやすい", "走る方が音が小さい", "歩くと道が広がる", "どちらも同じ"], correct: [0], detailed: "くらべることで、歩くよさがはっきりします。", objectiveId: "g3-japanese-reading-expository-summary" },
  { id: "eg3-japanese-paragraph-06", title: "まとめにつなぐ", prompt: "さいごのだんらくの前に合う言葉はどれですか。", labels: ["このように", "ところが", "たとえば", "ある日"], correct: [0], detailed: "前のくふうや理由をまとめるときは『このように』が合います。", objectiveId: "g3-japanese-reading-expository-structure" },
  { id: "eg3-japanese-paragraph-07", title: "二つのつながり", prompt: "本文にある、なかみのつながりをえらびます。", labels: ["くふうと理由", "くらべたことと分かったこと", "人物と会話", "天気と気持ち"], correct: [0, 1], detailed: "くふうには理由があり、走る・歩くのくらべから分かることがあります。", objectiveId: "g3-japanese-reading-expository-structure", difficulty: "standard" },
  { id: "eg3-japanese-paragraph-08", title: "だんらくのならび", prompt: "このせつめい文の組み立てとして正しいものはどれですか。", labels: ["問い→くふうと理由→くらべ→まとめ", "まとめ→物語→問い", "会話→人物→気持ち", "れいだけをならべる"], correct: [0], detailed: "問いから始まり、くふう・理由・くらべを通ってまとめへ進みます。", objectiveId: "g3-japanese-reading-expository-structure", difficulty: "standard" },
], paragraphContext);

const socialContext = { subject: "social-studies", unitId: "g3-social-work-and-sales-unit", lessonId: "elementary-grade-3-social-goods-to-store", entryId: "g3-social-production-sales" } as const;
export const ELEMENTARY_GOODS_TO_STORE_PROBLEMS = choiceProblems([
  { id: "eg3-social-goods-01", title: "品物の道すじ", prompt: "図で、そうこのつぎに品物が向かう場所はどこですか。", labels: ["はいたつトラック", "作る場所", "家", "学校"], correct: [0], detailed: "図の矢じるしは、そうこからはいたつトラックへ進みます。", objectiveId: "g3-social-production-sales-knowledge" },
  { id: "eg3-social-goods-02", title: "そうこのはたらき", prompt: "この図から分かる、そうこのはたらきはどれですか。", labels: ["品物をいったん集める", "品物を家で食べる", "学校で教える", "道を作る"], correct: [0], detailed: "作る場所から来た品物が、はいたつの前に集まっています。", objectiveId: "g3-social-production-sales-knowledge" },
  { id: "eg3-social-goods-03", title: "お店のくふう", prompt: "あおば店でたしかめるとよいことはどれですか。", labels: ["どの品物をどこにならべるか", "全国すべての店が同じか", "空の色", "学校の時間わり"], correct: [0], detailed: "お店のしごとを調べるには、品物のならべ方をたしかめます。", objectiveId: "g3-social-production-sales-thinking" },
  { id: "eg3-social-goods-04", title: "図から分からないこと", prompt: "この図だけでは分からないことはどれですか。", labels: ["店ではたらく人の思い", "品物が店を通ること", "そうこがあること", "家へ運ばれること"], correct: [0], detailed: "人の思いは、話を聞くなどして調べます。", objectiveId: "g3-social-production-sales-thinking" },
  { id: "eg3-social-goods-05", title: "品物によるちがい", prompt: "図を読むときに気をつけることはどれですか。", labels: ["品物によって道すじがちがうことがある", "全国でかならず同じ", "どの品物もそうこを通らない", "一つの図ですべて分かる"], correct: [0], detailed: "この図は一つの学習れいで、品物や地いきによりちがいます。", objectiveId: "g3-social-production-sales-thinking" },
  { id: "eg3-social-goods-06", title: "調べる方ほう", prompt: "お店の人のくふうをたしかめる方ほうはどれですか。", labels: ["見学してしつ問する", "図を見ずに決める", "そうぞうだけで書く", "全国同じと考える"], correct: [0], detailed: "見学やしつ問で、図だけでは分からないことをたしかめます。", objectiveId: "g3-social-production-sales-thinking" },
  { id: "eg3-social-goods-07", title: "図から分かること", prompt: "この図から分かることをえらびます。", labels: ["品物は何か所かを通る", "店から家へ品物がわたる", "すべての店が同じ道すじ", "店の人の気持ち"], correct: [0, 1], detailed: "矢じるしから道すじは分かりますが、全国で同じか、人の気持ちは分かりません。", objectiveId: "g3-social-production-sales-knowledge", difficulty: "standard" },
  { id: "eg3-social-goods-08", title: "これから調べること", prompt: "図を見たあと、さらに調べるとよいことをえらびます。", labels: ["品物がとどく時こく", "店の人がするくふう", "全国すべての店は同じだということ", "図にないことはないということ"], correct: [0, 1], detailed: "時こくや人のくふうは、店で見たり聞いたりしてたしかめます。", objectiveId: "g3-social-production-sales-thinking", difficulty: "standard" },
], socialContext);

export const ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS = Object.freeze([
  ...ELEMENTARY_REMAINDER_PROBLEMS,
  ...ELEMENTARY_DECIMAL_PROBLEMS,
  ...ELEMENTARY_FRACTION_PROBLEMS,
  ...ELEMENTARY_KEY_SENTENCE_PROBLEMS,
  ...ELEMENTARY_PARAGRAPH_PROBLEMS,
  ...ELEMENTARY_GOODS_TO_STORE_PROBLEMS,
]);
