import type { ComprehensionProblem } from "@/lib/english-types";
import { COMPREHENSION_PACK_1 } from "./english-comprehension-pack-1";
import { COMPREHENSION_PACK_2 } from "./english-comprehension-pack-2";
import { COMPREHENSION_PACK_3 } from "./english-comprehension-pack-3";
import { COMPREHENSION_PACK_4 } from "./english-comprehension-pack-4";
import { COMPREHENSION_PACK_5 } from "./english-comprehension-pack-5";
import { COMPREHENSION_PACK_6 } from "./english-comprehension-pack-6";
import { COMPREHENSION_PACK_7 } from "./english-comprehension-pack-7";
import { COMPREHENSION_PRIVATE_PACK_1 } from "./english-comprehension-private-pack-1";

export const COMPREHENSION_PROBLEMS: ComprehensionProblem[] = [
  ...COMPREHENSION_PACK_1,
  ...COMPREHENSION_PACK_2,
  ...COMPREHENSION_PACK_3,
  ...COMPREHENSION_PACK_4,
  ...COMPREHENSION_PACK_5,
  ...COMPREHENSION_PACK_6,
  ...COMPREHENSION_PACK_7,
  ...COMPREHENSION_PRIVATE_PACK_1,
  // ────────────────────────────────────────────────────────────────────────
  // 問題 1: 私立大学レベル / 言語とテクノロジー / 約190語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "language-and-technology",
    title: "Language, Technology, and the Digital Transformation of Discourse",
    level: "PRIVATE_UNI",
    tags: ["論説文", "言語とテクノロジー", "私立大", "約190語"],
    passage: `The relationship between language and technology has undergone a profound transformation in the digital era. Social media platforms, in particular, have accelerated the evolution of language at an unprecedented rate, generating new words, abbreviations, and entirely new modes of communication that transcend traditional linguistic boundaries.

Linguists have long debated whether technology enriches or impoverishes language. Critics argue that the brevity demanded by character limits and the informality of online discourse have led to a degradation of linguistic complexity and nuance. They point to the declining use of subordinate clauses and the proliferation of emoji as evidence that digital communication prioritizes efficiency over expressiveness.

Proponents counter that language has always adapted to its medium. The printing press, the telegraph, and the telephone each triggered their own linguistic revolutions. What critics perceive as impoverishment may, in fact, represent the democratization of language — a process whereby previously marginalized voices gain the tools to participate in public discourse and, in doing so, enrich the linguistic landscape with new perspectives and expressions that would otherwise have remained unheard.`,

    questions: [
      {
        questionText:
          "Which of the following best describes the concern that critics raise about technology's effect on language?",
        options: [
          "It has caused language to become excessively formal and standardized.",
          "It has led to a decline in linguistic complexity and nuance.",
          "It has made language more expressive through the widespread use of emoji.",
          "It has prevented marginalized communities from participating in digital discourse.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落が設問の根拠段落です。

本文: "Critics argue that the brevity demanded by character limits and the informality of online discourse have led to a degradation of linguistic complexity and nuance."

「文字数制限が要求する簡潔さ」と「オンライン言説の非形式性」が原因で、「言語的複雑さとニュアンスの劣化」をもたらしたと述べています。

【引っかけ分析】
・A「より形式的・標準化された」: 本文と逆。批評家は「非形式性（informality）」が問題だと指摘しています。
・C「絵文字によりより表現力豊かになった」: 絵文字は批評家が問題の証拠として挙げているものです。
・D「疎外されたコミュニティの参加を制限」: これは支持者側の反論文脈に登場する話であり、批評家の主張ではありません。

【語彙ポイント】
・"brevity"（簡潔さ）: "brief"（短い）の名詞形。
・"degradation"（劣化・低下）: "degrade"（劣化させる）の名詞形。言語の質の低下を指す。
・"nuance"（ニュアンス）: 微妙な意味の差異。言語の繊細さを表す語。`,
      },
      {
        questionText:
          "According to the passage, what do proponents of technology argue about language evolution?",
        options: [
          "Technology has uniquely and irreversibly transformed language for the worse.",
          "The democratization of language is harmful because it reduces linguistic standards.",
          "Language has always changed to suit the means by which it is conveyed.",
          "Emoji and abbreviations will eventually replace traditional grammatical structures.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第1文が直接の根拠です。

"Proponents counter that language has always adapted to its medium."
（支持者たちは、言語は常にその媒体に適応してきたと反論する。）

選択肢 C「言語はそれが伝達される手段に合わせて常に変化してきた」は、"adapted to its medium" の言い換えです。

【引っかけ分析】
・A「技術は言語を悪化させた」: これは批評家（Critics）の主張であり、支持者（Proponents）の主張ではありません。立場の混同を狙った引っかけです。
・B「民主化は有害だ」: 本文は民主化をポジティブなものとして提示しています。
・D「絵文字が文法を置き換える」: 本文に根拠なし。

【構文解析】
"language has always adapted to its medium"
→ 現在完了形（has adapted）＋副詞 "always" の位置に注意。
→ "always" が現在完了に入ると「いつも〜してきた（継続的な傾向）」の意味。
→ "medium"（媒体）: 複数形は "media"。言語が伝達される手段・メディアのこと。`,
      },
      {
        questionText:
          "In the final paragraph, what does the author imply by suggesting that technology may represent 'the democratization of language'?",
        options: [
          "Critics and proponents agree that digital language is impoverished compared to traditional forms.",
          "Technology's effect on language will only become clear through future empirical research.",
          "What appears to be a loss of linguistic quality may actually represent greater inclusivity.",
          "The democratization of language is a direct consequence of government digital policies.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と構文解析】
正解は C。最終文の S-V-O 構造を正確に把握することが鍵です。

核心文: "What critics perceive as impoverishment may, in fact, represent the democratization of language"

この文の構造：
S（主語）: "What critics perceive as impoverishment"
→ what節が主語。"what S perceive as O" = 「SがOと見なすもの」
→ 批評家が「貧困化」と見なすもの

V（述語）: "may, in fact, represent"
→ 推量の助動詞 may（〜かもしれない）＋挿入句 "in fact"（実際には）＋動詞

O（目的語）: "the democratization of language"
→ 言語の民主化（より多くの声が参加できるようになること）

→ 構文の意味：批評家が「貧困化」と見なすものは、実際には「民主化」かもしれない。
→ 一見マイナスに見えるものが実はプラスである可能性を示す逆説的な構文。

選択肢 C「言語的質の喪失に見えるものは、実際にはより大きな包括性を表しているかもしれない」はこの主旨と一致します。

【語彙ポイント】
・"impoverishment"（貧困化）: "im-" + "poverish"（貧しくする）+ "-ment"
・"may represent"（〜を表しているかもしれない）: "may" は話者の不確実性。断言していない点が重要。
・"democratization"（民主化）: より多くの人が参加できるようになること。`,
        syntaxAnalysis: [
          {
            text: "What critics perceive as impoverishment",
            role: "S",
            translation: "批評家たちが貧困化と見なすもの（what節が主語：what S perceive as C = SがCと見なすもの）",
          },
          {
            text: "may, in fact, represent",
            role: "V",
            translation: "実際には〜を表しているかもしれない（may = 推量の助動詞、in fact = 挿入句）",
          },
          {
            text: "the democratization of language",
            role: "O",
            translation: "言語の民主化（動詞 represent の目的語）",
          },
          {
            text: "— a process whereby previously marginalized voices gain the tools to participate in public discourse and, in doing so, enrich the linguistic landscape with new perspectives and expressions that would otherwise have remained unheard",
            role: "M",
            translation: "同格修飾（ダッシュ以降）：以前は疎外されていた声が公的言論に参加するツールを得て、そうすることで、さもなければ聞かれなかったであろう新たな視点と表現で言語の景観を豊かにするプロセス",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 2: 国公立大学レベル / 哲学・自由意志 / 約230語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "free-will-and-neuroscience",
    title: "Determinism, Consciousness, and the Compatibilist Defence of Free Will",
    level: "NATIONAL_UNI",
    tags: ["論説文", "哲学・自由意志", "国公立大", "約230語"],
    passage: `The concept of free will has occupied philosophers for millennia, yet the rise of modern neuroscience has introduced a disquieting dimension to this ancient debate. If human decisions are, at their most fundamental level, the product of electrochemical processes in the brain — processes that are themselves determined by prior causes extending back before any individual's birth — then the notion that individuals genuinely author their own actions becomes exceedingly difficult to defend.

Benjamin Libet's experiments of the 1980s appeared to lend empirical weight to this concern. By monitoring electrical activity in the brain, Libet found that a neural signal indicating readiness to act preceded conscious awareness of the intention to move by several hundred milliseconds. Skeptics of free will interpreted this as evidence that consciousness functions as a retrospective narrator, rationalizing decisions already made by unconscious neural processes rather than originating them.

Nevertheless, the philosophical implications of Libet's findings remain vigorously contested. Compatibilist philosophers deny that determinism and freedom are mutually exclusive. They contend that what makes an action free is not that it be uncaused but that it flow from the agent's own desires, values, and capacity for rational deliberation — even if those very desires and capacities are themselves causally determined. On this account, to be free is to act in accordance with who one is, not to act in the absence of causation.`,

    questions: [
      {
        questionText:
          "What conclusion did skeptics of free will draw from Libet's experimental findings?",
        options: [
          "Consciousness can override neural impulses through deliberate focused intention.",
          "The brain processes sensory information too slowly to allow genuine voluntary choice.",
          "Conscious awareness is the primary driver of all voluntary motor actions.",
          "Consciousness rationalizes decisions already made by unconscious neural processes.",
        ],
        correctAnswerIndex: 3,
        explanation: `【正解の根拠】
正解は D。第2段落末文が直接の根拠です。

"Skeptics of free will interpreted this as evidence that consciousness functions as a retrospective narrator, rationalizing decisions already made by unconscious neural processes rather than originating them."

「自由意志の懐疑論者たちはこれを、意識が遡及的（後ろ向き）な語り手として機能するという証拠と解釈した。意識は決定を生み出すのではなく、無意識の神経プロセスによってすでに下された決定を合理化するのだ。」

選択肢 D は "retrospective narrator, rationalizing decisions already made" の言い換えです。

【引っかけ分析】
・A「意識は神経インパルスを意図によって上書きできる」: Libet の実験はこの逆を示しています。
・B「脳の処理が遅すぎる」: 本文は「速さ」ではなく「順序」の問題（neural signal が意識的認識に先行する）を扱っています。
・C「意識が随意運動の主要な駆動力」: これは懐疑論者が否定しようとしている立場です。

【構文解析：rather than の用法】
"rationalizing decisions already made ... rather than originating them"
→ "rather than + -ing" = 「〜するのではなく（むしろ〜する）」
→ 対比: originating（起源となる）vs. rationalizing（合理化する）
→ 意識の役割：決定を「作り出す」のではなく「後付けで正当化する」

【語彙ポイント】
・"retrospective"（遡及的な・後ろ向きの）: "retro-"（後ろ）＋"spectare"（見る）。過去を振り返る性質。
・"originating"（起源となる・生み出す）: "originate"（〜を生み出す）の動名詞形。`,
      },
      {
        questionText:
          "According to compatibilist philosophers, what is the essential condition for an action to be considered 'free'?",
        options: [
          "The action must occur without any prior causal determination whatsoever.",
          "The action must be consciously initiated before any neural signal appears in the brain.",
          "The action must arise from the agent's own desires, values, and rational capacities.",
          "The action must be performed entirely free from external social influence.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と構文解析】
正解は C。第3段落の both立論者の主張を精密に読み取る問題です。

核心文: "They contend that what makes an action free is not that it be uncaused but that it flow from the agent's own desires, values, and capacity for rational deliberation"

この文は "not A but B"（AではなくB）という対比構造を持ちます：

否定 A: "that it be uncaused"（原因を持たないこと）
→ 仮定法現在 "be uncaused": that節内での要求・主張を表す形式的仮定法。

肯定 B: "that it flow from the agent's own desires, values, and capacity for rational deliberation"
→ 同じく仮定法現在 "flow"
→ 行為者自身の欲求・価値観・合理的熟慮の能力から生まれること

選択肢 C はBの部分「行為者自身の価値観と合理的能力から生まれること」を正確に言い換えています。

【引っかけ分析】
・A「いかなる先行原因も決定もない」: 両立論者はまさにこの要件を否定しています。
・B「意識的に開始される（Libet への反論として）」: 両立論者は Libet の実験の解釈自体に異議を唱えているわけではありません。
・D「外的影響がない」: 「外的影響」については本文に記述なし。

【語彙ポイント】
・"contend"（主張する・力説する）: "argue" より論争的な語感。
・"rational deliberation"（合理的熟慮）: "deliberate"（慎重に考える）+ "-tion"。理性的判断プロセス。
・"compatibilist"（両立論者）: 自由意志と決定論を「両立可能」とする立場。"compatible"（両立する）から。`,
        syntaxAnalysis: [
          {
            text: "They",
            role: "S",
            translation: "両立論者の哲学者たちは（前文 Compatibilist philosophers の代名詞）",
          },
          {
            text: "contend",
            role: "V",
            translation: "主張する（contend that〜：that節を目的語にとる動詞。argue より論争的な語感）",
          },
          {
            text: "that what makes an action free is not that it be uncaused but that it flow from the agent's own desires, values, and capacity for rational deliberation",
            role: "O",
            translation: "that節（目的語）：行為を自由にするのは原因がないこと（A）ではなく、行為者自身の欲求・価値観・合理的熟慮の能力から生まれること（B）だ。not A but B 構文。",
          },
          {
            text: "— even if those very desires and capacities are themselves causally determined",
            role: "M",
            translation: "たとえそれらの欲求や能力自体が因果的に決定されていたとしても（even if = たとえ〜であっても：譲歩の副詞節）",
          },
        ],
      },
      {
        questionText:
          "Which of the following best summarizes the compatibilist position as presented in the final paragraph?",
        options: [
          "Free will is an illusion that the brain constructs to maintain a subjective sense of agency.",
          "Determinism renders genuine freedom impossible, a conclusion Libet's findings confirm.",
          "Freedom and physical causation are not contradictory; to be free is to act from one's own reasons.",
          "True freedom requires that one's desires and values be formed independently of any causal influence.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。最終文が直接の根拠です。

"On this account, to be free is to act in accordance with who one is, not to act in the absence of causation."
（この見解によれば、自由であるとは、因果がない状態で行動することではなく、自分自身のあり方に従って行動することである。）

これは両立論（compatibilism）の核心命題：
・自由 ≠ 因果からの脱却（not to act in the absence of causation）
・自由 ＝ 自分自身の欲求・価値観に従って行動すること（to act in accordance with who one is）
→ たとえそれが因果的に決定されていても「自由」は成立する。

選択肢 C「自由意志と物理的因果は矛盾しない。自由とは自分の理由から行動することだ」はこの主張を正確に言い換えています。

【引っかけ分析】
・A「自由意志は脳が作り出す幻想」: これは懐疑論者の立場に近い表現。両立論者はこれを否定します。
・B「決定論は真の自由を不可能にし、Libet はそれを確認した」: 両立論者はまさにこの結論を拒否しています（"deny that determinism and freedom are mutually exclusive"）。
・D「欲求が因果的影響なしに形成される必要がある」: 本文はこの要件を明確に否定しています（"even if those very desires and capacities are themselves causally determined"）。

【構文解析：不定詞の名詞的用法】
"to be free is to act in accordance with who one is, not to act in the absence of causation"
→ to be free（S：不定詞が主語）= to act in accordance with who one is（C：不定詞が補語）
→ "in accordance with"（〜に従って）: 重要熟語。
→ "in the absence of causation"（因果がない状態で）: "in the absence of"（〜がない状態で）も頻出表現。

【語彙ポイント】
・"mutually exclusive"（相互排他的な）: 両者が同時に成立しえない関係。
・"on this account"（この見解によれば）: "on this view" と同義の哲学的表現。`,
      },
    ],
  },
];
