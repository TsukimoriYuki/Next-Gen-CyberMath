import type { ComprehensionProblem } from "@/lib/english-types";

// ── 私立文系精読パック1：MARCH / 関関同立 対策（3問）─────────────────────
// 語数 350〜420 語、抽象的テーマ、論説・哲学・社会科学系

export const COMPREHENSION_PRIVATE_PACK_1: ComprehensionProblem[] = [
  // ── 問題 1: MARCH — 言語と思考（360語）──────────────────────────────────
  {
    id: "private-cp-language-thought",
    title: "Language, Thought, and the Limits of Translation",
    level: "PRIVATE_UNI",
    universityGroup: "MARCH",
    tags: ["論説文", "言語哲学", "MARCH", "約360語", "私立文系"],
    passage: `Language is more than a vehicle for communication; according to many philosophers, it is the very medium through which thought becomes possible. The question of whether language shapes thought or thought precedes language has occupied linguists and philosophers alike for centuries.

The Sapir-Whorf hypothesis, also known as linguistic relativity, proposes that the language one speaks influences — and in its stronger version, determines — the way one perceives and conceptualizes reality. If this is correct, speakers of different languages do not merely express the same thoughts in different ways; they actually inhabit different cognitive worlds. A culture with many distinct words for a single phenomenon, such as the multiple terms for snow among Arctic peoples, may perceive and categorize that phenomenon with far greater nuance than a culture possessing only a single term.

Critics of the stronger version of this hypothesis argue that the existence of translation itself refutes the claim that thought is entirely constrained by language. If the thoughts of one linguistic community were wholly inaccessible to speakers of another language, translation would be impossible. Yet translators routinely bridge linguistic worlds, carrying meaning across great divides. This suggests that at some level, thought operates independently of the specific vocabulary or grammar of any given language.

The debate has been reinvigorated by neuroscientific research. Brain imaging studies indicate that when people think, they do not necessarily rely on inner speech — the silent rehearsal of words. Abstract reasoning, spatial problem-solving, and emotional processing appear to involve brain regions not primarily dedicated to language. This implies that rich cognitive life may be possible even in the absence of a fully developed linguistic system, casting doubt on the most radical claims of linguistic determinism.

Yet even if language does not wholly determine thought, it remains a powerful tool for refining mental experience. The act of naming a concept — of finding the precise word for a feeling or a relationship — makes that concept more accessible to conscious reflection. In this sense, language may not create thought, but it undeniably sculpts and sharpens it.`,
    questions: [
      {
        questionText: "What is the primary purpose of the second paragraph?",
        options: [
          "To introduce the Sapir-Whorf hypothesis and its implications",
          "To argue that all languages are equally capable of expressing any thought",
          "To explain why translation between very different languages is impossible",
          "To criticize the idea that language influences thought at all",
        ],
        correctAnswerIndex: 0,
        explanation: `第2段落は「サピア＝ウォーフ仮説（言語相対性）」を導入し，言語が現実の認識を決定する可能性を論じている。北極の民族が雪を表す多様な語彙を持つ例は，その仮説の具体的な根拠として提示されている。`,
      },
      {
        questionText: "According to critics of the strong Sapir-Whorf hypothesis, what does the practice of translation imply?",
        options: [
          "That language determines thought more completely than previously assumed",
          "That thought can operate at some level independently of any particular language",
          "That all languages share an identical deep structure beneath surface differences",
          "That emotional concepts are the most difficult to translate across cultures",
        ],
        correctAnswerIndex: 1,
        explanation: `批判者は「翻訳が実際に行われている」という事実から，思考はある程度言語から独立していると論じる。もし思考が完全に言語に拘束されているなら，翻訳は不可能なはずだという反論。`,
      },
      {
        questionText: `The word "sculpts" in the final paragraph most closely means:`,
        options: [
          "Destroys and rebuilds from scratch",
          "Gives precise shape and refinement to",
          "Limits and constrains severely",
          "Generates entirely without prior input",
        ],
        correctAnswerIndex: 1,
        explanation: `"sculpts"（彫刻する）は比喩的に「形を与え，磨く・洗練させる」という意味。最終段落の文脈は「言語は思考を生み出すのではなく，思考を精緻化し鋭くする」という主張であり，「形を与え洗練させる」が最も適切。`,
      },
    ],
  },

  // ── 問題 2: 関関同立 — デジタル資本主義と注意の商品化（400語）──────────
  {
    id: "private-cp-attention-economy",
    title: "The Attention Economy and Cognitive Sovereignty",
    level: "NATIONAL_UNI",
    universityGroup: "KANKANDORITSU",
    tags: ["論説文", "デジタル資本主義", "関関同立", "約400語", "私立文系"],
    passage: `In the contemporary economy, attention has become a resource more valuable than oil. Every second a user spends scrolling through a social media feed, lingering on an advertisement, or clicking a video recommendation represents a quantifiable economic transaction. The architecture of digital platforms is engineered, often with remarkable precision, to extract the maximum quantity of this resource from human minds.

This phenomenon — the commodification of attention — is not merely a commercial strategy but a profound restructuring of the relationship between technology and human cognition. Persuasive design principles, pioneered by researchers at laboratories that later became the foundations of major technology companies, exploit well-documented psychological vulnerabilities. Variable reward schedules, derived from behavioral psychology experiments originally conducted on laboratory animals, drive compulsive checking behaviors in users who would often prefer to spend their time otherwise.

The consequences extend beyond individual inconvenience. A society whose collective attention is continuously fragmented and redirected by profit-seeking algorithms may find its deliberative capacities diminished. Democracy, in particular, depends on citizens capable of sustained engagement with complex issues. If the dominant information environment systematically discourages depth in favor of emotional reactivity and novelty, the very conditions necessary for informed public deliberation are eroded.

Defenders of the attention economy argue that digital platforms represent an unprecedented democratization of information. Any individual with a smartphone and an internet connection can access knowledge and audiences previously available only to those with institutional power. The question, however, is not whether access has expanded — it clearly has — but whether the structures governing that access are designed to serve human flourishing or to maximize extraction.

The emerging regulatory movement for digital rights frames attention as a form of property deserving legal protection. Just as labor rights movements of the nineteenth century sought to limit the extraction of workers' physical energy by industrial capitalism, advocates today argue that cognitive sovereignty — the right of individuals to direct their own attention according to their own values — must be defended against commercial encroachment. Whether such protections can be achieved without stifling technological innovation remains the central challenge of the coming decades.`,
    questions: [
      {
        questionText: "What does the author mean by the 'commodification of attention' in the second paragraph?",
        options: [
          "The process by which attention spans are measured and studied by scientists",
          "The transformation of human mental focus into an economically exploitable resource",
          "The tendency of advertisers to create emotionally compelling content",
          "The practice of paying users directly for the time they spend on platforms",
        ],
        correctAnswerIndex: 1,
        explanation: `「注意の商品化」とは，人間の注意（精神的な集中）が経済的に利用可能な資源に変換されるプロセスを指す。プラットフォームが設計上ユーザーの注意を最大限に引き出し，それを広告主に販売するという構造を批判的に述べている。`,
      },
      {
        questionText: "According to the third paragraph, why does the attention economy pose a threat to democracy?",
        options: [
          "Because it gives technology companies direct control over election results",
          "Because it makes citizens so distracted that they stop voting altogether",
          "Because it fragments collective attention and discourages sustained engagement with complex issues",
          "Because digital platforms systematically censor political content",
        ],
        correctAnswerIndex: 2,
        explanation: `第3段落は，アルゴリズムによる注意の断片化が「熟慮的な民主主義」の基盤を損なうと論じる。民主主義には市民が複雑な問題に持続的に関与する能力が必要だが，感情的反応性と新奇性を優先する環境がその能力を侵食するという論旨。`,
      },
      {
        questionText: "What is the main argument of those who defend the attention economy?",
        options: [
          "That the psychological harms of social media have been greatly exaggerated",
          "That digital platforms have democratized access to information and audiences",
          "That cognitive sovereignty is an outdated concept in the age of artificial intelligence",
          "That regulatory intervention would be more harmful than the problem it aims to solve",
        ],
        correctAnswerIndex: 1,
        explanation: `第4段落で注意経済の擁護論として示されているのは「情報と聴衆へのアクセスの民主化」。スマートフォンがあれば誰でも従来は機関権力を持つ者にしか届かなかった知識や聴衆にアクセスできるという主張。`,
      },
    ],
  },

  // ── 問題 3: MARCH / 関関同立 — 生物多様性の倫理（390語）─────────────────
  {
    id: "private-cp-biodiversity-ethics",
    title: "Biodiversity Loss and the Ethics of Extinction",
    level: "PRIVATE_UNI",
    universityGroup: "MARCH",
    tags: ["論説文", "生物多様性", "環境倫理", "MARCH", "約390語", "私立文系"],
    passage: `The current rate of species extinction is estimated to be between one hundred and one thousand times higher than the natural background rate, a phenomenon many scientists now refer to as the sixth mass extinction. Unlike the five previous mass extinctions, which were driven by geological and astronomical events, the present crisis is primarily anthropogenic — caused by human land use, pollution, climate change, and the overexploitation of natural resources.

The loss of biodiversity raises profound ethical questions that go beyond the utilitarian argument that healthy ecosystems provide services essential to human survival. From a biocentric perspective, each species has intrinsic value independent of its usefulness to humanity. The elimination of a species is, on this view, a moral wrong comparable to the destruction of an irreplaceable cultural artifact — and perhaps more serious, since extinction is permanent in a way that the loss of human-made objects is not.

Yet the utilitarian case for conservation is itself compelling. Biodiversity underpins the resilience of ecosystems: the more species an ecosystem contains, the better it can absorb shocks such as drought, disease, and climate disruption. The loss of a single "keystone species" — one whose presence maintains the structure of an entire community — can trigger cascading collapses affecting dozens of other species and the human communities that depend on them.

Critics of conservation policy sometimes argue that extinction is a natural process and that species have always disappeared and been replaced. This objection confuses the rate of change with the process itself. Natural extinction is a gradual transition that allows ecosystems time to adapt; the current crisis compresses that process into decades, leaving no time for evolutionary adjustment.

The challenge for policymakers is to translate the ethical and scientific arguments for biodiversity conservation into effective action. This requires not only the protection of existing habitats and the restoration of degraded ones, but also a fundamental reassessment of economic models that treat the natural world as an inexhaustible resource. Whether the institutions of global governance are capable of responding at the necessary scale and speed remains an open and urgent question.`,
    questions: [
      {
        questionText: "How does the author distinguish the current mass extinction from previous ones?",
        options: [
          "By arguing that it is happening more slowly than past extinctions",
          "By noting that it is caused primarily by human activity rather than natural events",
          "By claiming that it will ultimately result in greater biodiversity",
          "By showing that it affects only small and insignificant species",
        ],
        correctAnswerIndex: 1,
        explanation: `第1段落で「過去5回の大量絶滅は地質・天文現象が原因だったのに対し，現在の危機は主に人為的（anthropogenic）なもの」と明確に区別している。`,
      },
      {
        questionText: "According to the second paragraph, what is the biocentric argument for species conservation?",
        options: [
          "Every species has value because it contributes to human economic welfare",
          "Species should be preserved because they may contain undiscovered medical compounds",
          "Each species has inherent worth that exists independently of its usefulness to humans",
          "Conservation is justified because popular species attract tourism revenue",
        ],
        correctAnswerIndex: 2,
        explanation: `生命中心主義（biocentric）の立場では，各種は人間にとっての有用性とは無関係に内在的価値（intrinsic value）を持つと主張する。これは功利主義的な議論（人間の生存に必要）とは対照的な根拠として提示されている。`,
      },
      {
        questionText: "What is the author's response to the argument that 'extinction is a natural process'?",
        options: [
          "The author accepts this argument but argues that human-caused extinction is still undesirable",
          "The author argues that what matters is the rate of extinction, not the process itself",
          "The author rejects the claim that any species have ever gone extinct naturally",
          "The author suggests that natural extinctions were in fact caused by early human activity",
        ],
        correctAnswerIndex: 1,
        explanation: `第4段落で著者は「プロセスそのもの（絶滅）ではなく，その速度（rate）が問題だ」と論じる。自然の絶滅は生態系が適応する時間的余裕を与える緩やかな移行だが，現在の危機はその過程を数十年に圧縮し，進化的適応の時間を与えないと反論している。`,
      },
    ],
  },
];
