import { content, emphasis, plain, text } from "@/data/elementary/inline";
import type { ElementaryLesson } from "@/types/elementary-content";

// 小学3年生・社会 pilot 講座「学校のまわりを地図で見てみよう」。
// 架空地域「ひかり市 あおば小学校」の学習用地図を使う。実在の市・学校・店は使わない。
// 地図は Cyber Math のオリジナル SVG（学習用の架空地図）。

const MISCONCEPTION_LINE_ID = "map-only-roads-line";
const MAP_ASSET_ID = "hikari-city-aoba-neighborhood-map";

export const ELEMENTARY_SOCIAL_MAP_LESSON = {
  id: "elementary-grade-3-social-read-neighborhood-map",
  slug: "read-neighborhood-map",
  grade: "grade-3",
  subject: "social-studies",
  courseType: "regular",
  unitId: "g3-social-local-community-unit",
  order: 1,
  title: plain("学校のまわりを地図で見てみよう"),
  description: plain(
    "学習用の地図から、方角・記号・土地の使われ方を読み取り、分かることと分からないことを考えます。",
  ),
  goals: [
    plain("地図は上から見た様子で、上が北だと分かる"),
    plain("方角記号とはんれいを使って、しせつの場所を読み取る"),
    plain("地図から言えることと、言えないことを分けて考える"),
  ],
  estimatedMinutes: 24,
  prerequisiteLessonIds: [],
  curriculumReferenceIds: ["g3-social-local-area-municipality"],
  curriculumObjectiveIds: [
    "g3-social-local-area-municipality-knowledge",
    "g3-social-local-area-municipality-thinking",
  ],
  requirementCoverage: [
    {
      entryId: "g3-social-local-area-municipality",
      objectiveIds: [
        "g3-social-local-area-municipality-knowledge",
        "g3-social-local-area-municipality-thinking",
      ],
      lessonCoverage: "partial",
      assessmentCoverage: "partial",
    },
  ],
  enrichmentReferenceIds: [],
  visualAssetIds: [MAP_ASSET_ID],
  problemIds: [
    "eg3-social-direction-up",
    "eg3-social-legend-role",
    "eg3-social-park-direction",
    "eg3-social-store-cluster",
    "eg3-social-land-use-houses",
    "eg3-social-read-map-facts",
    "eg3-social-inference-say",
    "eg3-social-inference-cannot-say",
  ],
  publicationStatus: "beta",
  reviewStatus: "pilot",
  sourceType: "original",
  copyrightStatus: "original",
  blocks: [
    {
      id: "map-opening-question",
      type: "opening-question",
      question: plain("地図を見ると、どんなことが分かるのかな。"),
    },
    {
      id: "map-learning-goals",
      type: "learning-goals",
      items: [
        plain("地図の上が、どの方角かをたしかめる"),
        plain("記号とはんれいで、しせつの場所を読む"),
        plain("地図で分かることと、分からないことを分ける"),
      ],
    },
    {
      id: "map-first-dialogue",
      type: "dialogue",
      title: plain("地図で何が分かるか考えよう"),
      purpose: "地図は道さがしだけ、という見方を広げる",
      lines: [
        {
          id: MISCONCEPTION_LINE_ID,
          speakerId: "hinano",
          intent: "misconception",
          emotion: "thinking",
          misconceptionId: "map-is-only-roads",
          content: plain("地図は、道をさがすためだけにあるのかな。"),
          rationale: plain("地図で道を調べたことが多いから、道だけだと考えた。"),
        },
        {
          id: "map-acknowledge-line",
          speakerId: "tomiyama",
          intent: "acknowledgement",
          emotion: "encouraging",
          relatedLineId: MISCONCEPTION_LINE_ID,
          content: plain("道をさがすのにも使うね。ほかには何が分かるかな？"),
        },
        {
          id: "map-predict-line",
          speakerId: "hinano",
          intent: "prediction",
          emotion: "curious",
          content: plain("うーん。たてものの場所も、のっている気がするね。"),
        },
        {
          id: "map-prompt-line",
          speakerId: "tomiyama",
          intent: "prompt",
          emotion: "encouraging",
          content: plain("そうだね。方角や記号を手がかりに、読んでみよう。"),
        },
      ],
    },
    {
      id: "map-visual",
      type: "visual",
      title: plain("あおば小学校のまわりの地図"),
      assetId: MAP_ASSET_ID,
      fallbackText: plain(
        "学習用の地図です。中央にあおば小学校、上（北）に公園、下（南）に駅とお店、右（東）に家、左（西）に川があります。",
      ),
      creditDisplay: "inline",
      visualPurpose: "geographic-reference",
    },
    {
      id: "map-direction-explanation",
      type: "explanation",
      title: plain("上から見た地図と方角"),
      paragraphs: [
        plain(
          "地図は、土地を上から見た様子を表しています。多くの地図では、上が北です。上が北なら、右は東、左は西、下は南になります。",
        ),
        content(
          text("地図のすみにある"),
          emphasis("方角記号"),
          text("を見ると、どちらが北かが分かります。"),
        ),
      ],
    },
    {
      id: "map-legend-key-point",
      type: "key-point",
      title: plain("はんれいと記号"),
      points: [
        plain("記号は、たてものや土地の様子を、小さなしるしで表す。"),
        plain("記号の意味は、はんれいを見ると分かる。"),
      ],
    },
    {
      id: "map-land-use-explanation",
      type: "explanation",
      title: plain("土地の使われ方としせつ"),
      paragraphs: [
        plain(
          "この地図では、右（東）に家がたくさん集まっています。下（南）の駅のまわりには、お店が多く集まっています。上（北）には公園、左（西）には川があります。",
        ),
        plain(
          "大きな道路が、学校の前を東西に通っています。道路の近くには、安全を守る交番もあります。",
        ),
      ],
    },
    {
      id: "map-guided-example",
      type: "guided-example",
      title: plain("いっしょに読もう"),
      prompt: plain("あおば小学校から見て、川はどの方角にあるかな。"),
      steps: [
        { id: "map-example-step-school", content: plain("学校の場所を見つける。") },
        { id: "map-example-step-river", content: plain("川の記号をさがす。学校の左にある。") },
        { id: "map-example-step-direction", content: plain("上が北なら、左は西。") },
      ],
      answer: content(emphasis("西（左がわ）"), text(" に川が流れている。")),
      check: plain("上が北であることと合わせると、左は西だとたしかめられる。"),
    },
    {
      id: "map-can-say-key-point",
      type: "key-point",
      title: plain("地図から言えること"),
      points: [
        plain("しせつの場所や、どの方角にあるか。"),
        plain("家やお店が、どのあたりに集まっているか。"),
        plain("駅の近くにお店が多いなど、集まり方から考えられること。"),
      ],
    },
    {
      id: "map-cannot-say-key-point",
      type: "key-point",
      title: plain("地図だけでは分からないこと"),
      points: [
        plain("公園でどんな遊びができるか。"),
        plain("お店で何を売っているか。"),
        plain("そこにいる人の気持ちや、くらしの様子。"),
      ],
    },
    {
      id: "map-deepening-dialogue",
      type: "dialogue",
      title: plain("なぜだろう、を考えよう"),
      purpose: "地図の読み取りから理由を考える",
      lines: [
        {
          id: "map-why-question-line",
          speakerId: "hinano",
          intent: "question",
          emotion: "curious",
          content: plain("どうして駅の近くに、お店が集まるのかな。"),
        },
        {
          id: "map-why-answer-line",
          speakerId: "tomiyama",
          intent: "deepening",
          emotion: "encouraging",
          content: plain(
            "この地図では、駅の近くにお店が集まっているね。人が集まりやすいことが、わけの一つかもしれないよ。",
          ),
        },
      ],
    },
    {
      id: "map-enrichment",
      type: "enrichment",
      title: plain("もう少し先へ"),
      content: [
        plain(
          "この地図では、交番が道路の近くにあります。すぐに動きやすいことが理由かもしれません。本当の理由は、行って調べないと分かりません。この見方は、今はできなくてもだいじょうぶです。",
        ),
      ],
      requiredForCompletion: false,
    },
    {
      id: "map-retry",
      type: "retry",
      title: plain("もう一度考えよう"),
      originalMisconceptionId: "map-is-only-roads",
      prompt: plain("地図では、道のほかにどんなことが分かるかな。"),
      response: {
        id: "map-retry-line",
        speakerId: "hinano",
        intent: "retry",
        emotion: "confident",
        relatedLineId: MISCONCEPTION_LINE_ID,
        content: plain("道だけでなく、方角や土地の使われ方も分かるよ。"),
      },
    },
    {
      id: "map-final-dialogue",
      type: "dialogue",
      title: plain("自分の言葉でまとめよう"),
      purpose: "はじめの考えと比べて説明する",
      lines: [
        {
          id: "map-explain-prompt-line",
          speakerId: "tomiyama",
          intent: "prompt",
          emotion: "encouraging",
          content: plain("はじめの考えとくらべて、地図で分かることを言える？"),
        },
        {
          id: "map-self-explanation-line",
          speakerId: "hinano",
          intent: "self-explanation",
          emotion: "confident",
          relatedLineId: MISCONCEPTION_LINE_ID,
          content: plain("方角や記号を見れば、しせつの場所や使われ方が分かるよ。"),
        },
        {
          id: "map-closing-line",
          speakerId: "tomiyama",
          intent: "summary",
          emotion: "happy",
          content: plain("そうだね。分からないことは、行って調べるといいね。"),
        },
      ],
    },
    {
      id: "map-summary",
      type: "summary",
      items: [
        plain("地図は上から見た様子で、方角や記号、はんれいを手がかりに読む。"),
        plain("地図から言えることと、行って調べることを分けて考える。"),
      ],
    },
    {
      id: "map-practice-set",
      type: "practice-set",
      title: plain("やってみよう"),
      introduction: plain("地図をもとに、問題を8問ときます。方角と記号をたしかめましょう。"),
      problemIds: [
        "eg3-social-direction-up",
        "eg3-social-legend-role",
        "eg3-social-park-direction",
        "eg3-social-store-cluster",
        "eg3-social-land-use-houses",
        "eg3-social-read-map-facts",
        "eg3-social-inference-say",
        "eg3-social-inference-cannot-say",
      ],
      minimumScoreMessage: plain("まよった問題は、地図の方角記号とはんれいをもう一度見ましょう。"),
      completionMessage: plain("よくがんばりました。地図で分かること・分からないことを、言葉にできるといいですね。"),
    },
  ],
} as const satisfies ElementaryLesson;
