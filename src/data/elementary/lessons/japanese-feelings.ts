import { content, emphasis, plain } from "@/data/elementary/inline";
import type { ElementaryLesson } from "@/types/elementary-content";

// 小学3年生・国語 pilot 講座「お話の中で、気もちがどうかわるか読もう」。
// 物語「風の日のホウセンカ」は完全オリジナル（sourceType/copyrightStatus: original）。
// 既存作品・市販教材・教科書作品は使用していない。

const MISCONCEPTION_LINE_ID = "feelings-guess-line";

export const ELEMENTARY_JAPANESE_FEELINGS_LESSON = {
  id: "elementary-grade-3-japanese-feelings-change",
  slug: "feelings-change",
  grade: "grade-3",
  subject: "japanese",
  courseType: "regular",
  unitId: "g3-japanese-story-reading-unit",
  order: 1,
  title: plain("お話の中で、気持ちがどうかわるか読もう"),
  description: plain(
    "登場人物の行動や会話を手がかりに、気持ちとそのへんかを、本文をもとに読み取ります。",
  ),
  goals: [
    plain("だれの、どの場面の気持ちかを、本文から見つける"),
    plain("行動・会話・様子を手がかりに、気持ちを考える"),
    plain("はじめとおわりの気持ちをくらべて、へんかを読み取る"),
  ],
  estimatedMinutes: 24,
  prerequisiteLessonIds: [],
  curriculumReferenceIds: ["g3-japanese-reading-literary"],
  curriculumObjectiveIds: [
    "g3-japanese-reading-literary-evidence",
    "g3-japanese-reading-literary-imagination",
  ],
  requirementCoverage: [
    {
      entryId: "g3-japanese-reading-literary",
      objectiveIds: [
        "g3-japanese-reading-literary-evidence",
        "g3-japanese-reading-literary-imagination",
      ],
      lessonCoverage: "partial",
      assessmentCoverage: "partial",
    },
  ],
  enrichmentReferenceIds: [],
  visualAssetIds: [],
  problemIds: [
    "eg3-jp-story-characters",
    "eg3-jp-story-scene",
    "eg3-jp-story-reason-cold",
    "eg3-jp-story-reason-stick",
    "eg3-jp-story-line-meaning",
    "eg3-jp-story-feeling-change",
    "eg3-jp-story-change-trigger",
    "eg3-jp-story-whole-text",
  ],
  publicationStatus: "beta",
  reviewStatus: "pilot",
  sourceType: "original",
  copyrightStatus: "original",
  blocks: [
    {
      id: "feelings-opening-question",
      type: "opening-question",
      question: plain("登場人物の気持ちは、どうすれば読み取れるのかな。"),
    },
    {
      id: "feelings-learning-goals",
      type: "learning-goals",
      items: [
        plain("だれの、どの場面の気持ちかをたしかめる"),
        plain("行動や会話から、気持ちを考える"),
        plain("はじめとおわりの気持ちをくらべる"),
      ],
    },
    {
      id: "feelings-first-dialogue",
      type: "dialogue",
      title: plain("気持ちの読み方を考えよう"),
      purpose: "そうぞうだけで決める読み方を、本文の手がかりへ向け直す",
      lines: [
        {
          id: MISCONCEPTION_LINE_ID,
          speakerId: "hinano",
          intent: "misconception",
          emotion: "thinking",
          misconceptionId: "guess-feelings",
          content: plain("気持ちは、自分でそうぞうして当てればいいのかな。"),
          rationale: plain("気持ちは目に見えないから、そうぞうで決めると考えた。"),
        },
        {
          id: "feelings-acknowledge-line",
          speakerId: "tomiyama",
          intent: "acknowledgement",
          emotion: "encouraging",
          relatedLineId: MISCONCEPTION_LINE_ID,
          content: plain("そうぞうは大切だね。でも、何を手がかりにするといいかな？"),
        },
        {
          id: "feelings-predict-line",
          speakerId: "hinano",
          intent: "prediction",
          emotion: "confused",
          content: plain("当てずっぽうだと、人によってちがう気もするね。"),
        },
        {
          id: "feelings-prompt-line",
          speakerId: "tomiyama",
          intent: "prompt",
          emotion: "encouraging",
          content: plain("そうだね。行動や会話、様子から考えてみよう。"),
        },
      ],
    },
    {
      id: "feelings-story-text",
      type: "explanation",
      title: plain("お話「風の日のホウセンカ」"),
      paragraphs: [
        plain(
          "みなととあおいは、同じ3年生のクラスで、花の係をしています。二人は、教室のまどのそばで、ホウセンカを育てていました。土がかわいたら水をやり、少しずつ葉がふえていく様子を見るのが、二人のたのしみでした。「今日はどれくらいのびたかな。」朝、教室に来ると、みなとはいつも、まっ先にはちの前に立ちました。",
        ),
        plain(
          "ある雨あがりの朝、みなとははちを見て、思わず声を上げそうになりました。まっすぐだったはずのくきが、大きく右に曲がっていたのです。みなとの頭に、きのうの帰りにいちばん近くにいたあおいの顔がうかびました。「あおいが、らんぼうにさわったのかもしれない。」そう思うと、みなとの心の中は、だんだんもやもやしてきました。",
        ),
        plain(
          "あおいが「おはよう」と教室に入ってきても、みなとは下を向いたまま、小さな声で返しただけでした。いつものように話しかけることも、できませんでした。あおいは、みなとの様子がいつもとちがうことに気づいて、ふしぎそうな顔をしました。でも、みなとは何も言えませんでした。",
        ),
        plain(
          "昼休みに、先生がみんなの前で話しました。「きのうの夕方、強い風がふきましたね。あおいさんが、たおれそうになっていたホウセンカに気づいて、そっとぼうを立てて、まもってくれたんですよ。」その言葉を聞いて、みなとは、はっとしました。曲がったくきは、あおいのせいではなかったのです。あおいは、花を助けてくれていたのでした。",
        ),
        plain(
          "みなとは、少しの間、下を向いていました。それから、しずかにあおいのそばへ歩いていきました。顔を上げて、はっきりと言いました。「あおい、さっきはつめたい言い方をしてごめん。それと、花をまもってくれて、ありがとう。」あおいは、目を丸くしたあと、にっこりわらいました。「気づいてくれて、うれしいよ。」まどの外では雨がやみ、ホウセンカの葉が、明るい光にゆれていました。",
        ),
      ],
    },
    {
      id: "feelings-scene-key-point",
      type: "key-point",
      title: plain("場面ごとに整理しよう"),
      points: [
        plain("はじめ：二人は花の係で、なかよく育てている。"),
        plain("朝、くきが曲がっていることに気づいた後：みなとは、あおいをうたがってもやもやする。"),
        plain("昼休み：先生の話で、あおいがまもったと分かる。"),
        plain("おわり：みなとがあやまり、二人は元気にもどる。"),
      ],
    },
    {
      id: "feelings-evidence-key-point",
      type: "key-point",
      title: plain("手がかりは、行動・会話・様子"),
      points: [
        plain("行動：小さな声で返す、下を向く、そばへ歩いていく。"),
        plain("会話：「ごめん」「ありがとう」「うれしいよ」。"),
        plain("様子：もやもや、はっとする、にっこりわらう。"),
      ],
    },
    {
      id: "feelings-guided-example",
      type: "guided-example",
      title: plain("いっしょに読もう"),
      prompt: plain("みなとが小さな声で返事をしたのは、どんな気持ちからかな。"),
      steps: [
        { id: "feelings-example-step-place", content: plain("小さな声の場面をさがす。") },
        { id: "feelings-example-step-evidence", content: plain("その前の、心の中の言葉を読む。") },
        { id: "feelings-example-step-connect", content: plain("あおいをうたがう思いと、行動をつなげる。") },
      ],
      answer: content(
        emphasis("あおいがくきを曲げたと思い、もやもやしている気持ち。"),
      ),
      check: plain("行動（小さな声）と、心の中の言葉がつながっている。"),
    },
    {
      id: "feelings-change-explanation",
      type: "explanation",
      title: plain("気持ちがかわるきっかけ"),
      paragraphs: [
        plain(
          "気持ちが動くところには、たいていきっかけがあります。この話では、先生の話を聞いて、みなとは「はっと」します。あおいが花をまもっていたと分かったことが、気持ちのかわるきっかけです。",
        ),
        plain(
          "くきが曲がっていることに気づいた後のみなとは、もやもやしていました。おわりには、あやまってお礼を言い、すっきりしています。二つの場面をくらべると、気持ちのへんかがはっきりします。",
        ),
      ],
    },
    {
      id: "feelings-caution-key-point",
      type: "key-point",
      title: plain("気をつけたい読み方"),
      points: [
        plain("本文にない気持ちを、そうぞうだけで決めない。"),
        plain("登場人物を取りちがえないように、名前をたしかめる。"),
        plain("気持ちは、行動や会話などの手がかりとつなげて読む。"),
      ],
    },
    {
      id: "feelings-retry",
      type: "retry",
      title: plain("もう一度考えよう"),
      originalMisconceptionId: "guess-feelings",
      prompt: plain("みなとの気持ちがかわったのは、何がきっかけかな。"),
      response: {
        id: "feelings-retry-line",
        speakerId: "hinano",
        intent: "retry",
        emotion: "confident",
        relatedLineId: MISCONCEPTION_LINE_ID,
        content: plain("先生の話で、あおいが花をまもったと分かったことだよ。"),
      },
    },
    {
      id: "feelings-final-dialogue",
      type: "dialogue",
      title: plain("自分の言葉でまとめよう"),
      purpose: "はじめの考えと比べて読み方を説明する",
      lines: [
        {
          id: "feelings-explain-prompt-line",
          speakerId: "tomiyama",
          intent: "prompt",
          emotion: "encouraging",
          content: plain("はじめの考えとくらべて、気持ちの読み方をせつめいできる？"),
        },
        {
          id: "feelings-self-explanation-line",
          speakerId: "hinano",
          intent: "self-explanation",
          emotion: "confident",
          relatedLineId: MISCONCEPTION_LINE_ID,
          content: plain("行動や会話、様子を手がかりにして読むと分かるよ。"),
        },
        {
          id: "feelings-closing-line",
          speakerId: "tomiyama",
          intent: "summary",
          emotion: "happy",
          content: plain("そうだね。本文にもどって、たしかめるといいね。"),
        },
      ],
    },
    {
      id: "feelings-summary",
      type: "summary",
      items: [
        plain("気持ちは、行動・会話・様子を手がかりに、本文から読み取る。"),
        plain("はじめとおわりの気持ちをくらべると、へんかとそのきっかけが分かる。"),
      ],
    },
    {
      id: "feelings-practice-set",
      type: "practice-set",
      title: plain("やってみよう"),
      introduction: plain("お話をもとに、問題を8問ときます。本文にもどってたしかめましょう。"),
      problemIds: [
        "eg3-jp-story-characters",
        "eg3-jp-story-scene",
        "eg3-jp-story-reason-cold",
        "eg3-jp-story-reason-stick",
        "eg3-jp-story-line-meaning",
        "eg3-jp-story-feeling-change",
        "eg3-jp-story-change-trigger",
        "eg3-jp-story-whole-text",
      ],
      minimumScoreMessage: plain("まよった問題は、本文のどこに書いてあるかをもう一度さがしましょう。"),
      completionMessage: plain("よくがんばりました。答えのわけを、本文の言葉で言えるといいですね。"),
    },
  ],
} as const satisfies ElementaryLesson;
