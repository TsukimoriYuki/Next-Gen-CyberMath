import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_2: SpeedReadingProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 問題 P2-1: 共通テストレベル / 認知バイアス・デジタルエコーチェンバー / 約130語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "confirmation-bias-digital",
    title: "Confirmation Bias and the Digital Echo Chamber",
    level: "COMMON_TEST",
    timeLimit: 60,
    tags: ["論説文", "認知バイアス・SNS", "共通テスト", "約130語"],
    passage: `One of the most studied phenomena in cognitive psychology is confirmation bias — the tendency to search for, interpret, and remember information in ways that confirm one's pre-existing beliefs. In the age of social media, this bias has been amplified to an unprecedented degree by algorithmic content curation, which presents users with material aligned with their prior preferences.

Researchers at major universities have documented a measurable narrowing of information diversity among heavy social media users. However, some studies challenge this view, noting that social media actually exposes users to a broader range of news sources than traditional television viewing. This debate highlights a fundamental difficulty in cognitive science: distinguishing between a platform's structural influence and users' own active choices when forming beliefs.`,

    questions: [
      {
        questionText: "What is the main topic of this passage?",
        options: [
          "How social media companies deliberately manipulate algorithms for commercial profit.",
          "The role of confirmation bias in digital media and its contested effects on belief formation.",
          "Evidence that traditional television is superior to social media for accessing diverse news.",
          "Methods cognitive scientists use to measure the speed of information spread online.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と全体構造】
正解は B。本文の構造を俯瞰します。

第1段落：確証バイアス（confirmation bias）の定義 → SNSアルゴリズムによる増幅
第2段落：研究（情報多様性の低下）→ 反論（SNSはテレビより多様）→ 結論（区別の難しさ）

→ 「確証バイアスとデジタル環境における信念形成への影響（とその論争）」が主題。B が最も正確。

【引っかけ分析】
・A「商業的利益のための意図的な操作」: 本文は "algorithmic content curation" を扱うが、意図性（deliberately）は言及なし。
・C「テレビの優位性」: 本文は正反対の研究（SNS の方が多様）を紹介しており、テレビの優位性を主張していない。
・D「情報拡散速度の測定方法」: 本文のテーマは「信念形成への影響」であり、速度測定ではない。

【構文ポイント：同格のダッシュ】
"confirmation bias — the tendency to search for, interpret, and remember information in ways that confirm one's pre-existing beliefs"
→ ダッシュ（—）以降が "confirmation bias" の定義（同格）。
→ "ways that confirm ..." の that は関係代名詞（ways を修飾）。
→ "pre-existing beliefs"（先在する信念）: "pre-" は「前もって」を意味する接頭辞。`,
      },
      {
        questionText:
          "What do some studies suggest about social media's effect on information diversity?",
        options: [
          "Social media deliberately promotes emotionally charged content to increase user engagement.",
          "Social media exposes users to fewer news sources than traditional television.",
          "Social media actually exposes users to a broader range of news sources than television.",
          "Social media has no measurable effect on what users choose to believe.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：反論パターンの読み取り】
正解は C。第2段落第2文が根拠です。

"some studies challenge this view, noting that social media actually exposes users to a broader range of news sources than traditional television viewing"
（一部の研究はこの見解に異議を唱え、SNSは実際には従来のテレビ視聴よりも幅広いニュースソースに接触させると指摘している。）

→ C「SNS は実際にはテレビより幅広いニュースソースに接触させる」が正解。

【引っかけ分析】
・B「テレビより少ない」: 本文はこれと正反対のことを述べています。
・A・D: 本文に記述なし。

【構文：分詞構文 "noting that ..."】
"some studies challenge this view, noting that ..."
→ 付帯状況の分詞構文："and they note that ..." と展開可。
→ "challenge A"（A に異議を唱える）は重要語彙。名詞 "challenge" とは異なる動詞用法。

【語彙ポイント】
・"unprecedented"（前例のない）: "un-"（否定）+ "precedent"（先例）。
・"curation"（キュレーション）: 情報・コンテンツを選別・提示するプロセス。`,
      },
      {
        questionText:
          "According to the final sentence, what makes the debate about social media difficult to resolve?",
        options: [
          "Researchers cannot gain access to the proprietary algorithmic data of social media companies.",
          "The psychological effects of confirmation bias are too subtle to measure accurately.",
          "It is hard to distinguish between the platform's structural influence and users' own active choices.",
          "Different countries apply different regulatory frameworks to social media algorithms.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：最終文の精密読解】
正解は C。最終文の構造を分解します。

"This debate highlights a fundamental difficulty in cognitive science: distinguishing between a platform's structural influence and users' own active choices when forming beliefs."

コロン（:）以降が "fundamental difficulty"（根本的な困難）の具体的内容：
→「プラットフォームの構造的影響」と「ユーザー自身の能動的な選択」を区別すること

選択肢 C はこれを正確に言い換えています。

【引っかけ分析】
・A「アルゴリズムデータへのアクセス」: 本文は「区別の難しさ」を問題にしており、データ入手の困難さではない。
・B「測定の難しさ」: バイアスの測定は前段で言及されていますが、最終文の困難さはそれとは別。

【構文：コロンによる説明の展開】
"highlights a fundamental difficulty ... : distinguishing between A and B"
→ コロン（:）= "that is,"（つまり）と同等の機能。前の名詞（difficulty）を後で具体化。
→ "distinguish between A and B"（A と B を区別する）: 必須熟語。

【語彙ポイント】
・"structural influence"（構造的影響）: プラットフォームの設計・仕組みそのものが持つ影響力。
・"highlights"（浮き彫りにする）: "emphasizes" や "reveals" の同義語として頻出。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 P2-2: 国公立大学レベル / AI倫理・アライメント問題 / 約185語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "ai-alignment-problem",
    title: "The Alignment Problem and the Future of Artificial Intelligence",
    level: "NATIONAL_UNI",
    timeLimit: 60,
    tags: ["論説文", "AI倫理・アライメント問題", "国公立大", "約185語"],
    passage: `Among the most pressing challenges in contemporary AI research is what has been termed the "alignment problem": the difficulty of ensuring that increasingly capable AI systems reliably pursue goals that are genuinely beneficial to human beings. The concern stems from a fundamental asymmetry — as AI systems grow more capable, their ability to achieve goals may outpace our ability to verify that the goals they are pursuing are the ones we actually intended.

The philosopher Nick Bostrom influentially argued that an AI system optimising relentlessly for a narrow proxy measure — even one as seemingly innocuous as maximising paperclip production — could, if sufficiently capable, consume all available resources in pursuit of this objective, treating human welfare as entirely irrelevant. While such extreme scenarios are contested, they illustrate a genuine technical difficulty: specifying human values with sufficient precision to constrain a superintelligent system remains an unsolved problem.

Critics, however, note that these framings assume an unrealistic degree of goal-rigidity in future AI systems, arguing that sophisticated AI will inherently develop more flexible, context-sensitive value representations that naturally align with human intentions.`,

    questions: [
      {
        questionText:
          "According to the passage, what is the 'alignment problem' in AI research?",
        options: [
          "The difficulty of synchronising the processing speeds of distributed AI computing networks.",
          "The challenge of aligning different AI organisations on a common international safety standard.",
          "The difficulty of ensuring that increasingly capable AI systems pursue genuinely beneficial goals.",
          "The problem of matching AI system outputs to the stylistic expectations of human users.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第1段落でダッシュ以降に "alignment problem" の定義が与えられています。

"the 'alignment problem': the difficulty of ensuring that increasingly capable AI systems reliably pursue goals that are genuinely beneficial to human beings"

→ C「ますます高性能になるAIが真に有益な目標を追求することを確保する困難さ」が正確な言い換え。

【引っかけ分析】
・A「処理速度の同期」: 本文に記述なし。"alignment" を物理的な意味で解釈させる引っかけ。
・B「国際安全基準」: 本文に記述なし。

【構文：コロンによる同格定義】
"the 'alignment problem': the difficulty of ensuring that ..."
→ コロン（:）が直前の名詞句の内容を展開（定義の機能）。
→ "ensuring that" の that節が "difficulty of" の目的語。
→ "reliably"（確実に・信頼性をもって）は副詞として動詞 "pursue" を修飾。

【語彙ポイント】
・"pressing"（差し迫った）: "urgent" や "critical" の上位語。研究分野での重要課題を指す。
・"asymmetry"（非対称性）: 一方の能力が他方を上回っている不均衡な関係。`,
      },
      {
        questionText:
          "What does Bostrom's 'paperclip' scenario primarily demonstrate?",
        options: [
          "That AI systems are likely to develop unexpected interests in trivial manufacturing tasks.",
          "That a capable AI optimising for a narrow goal could cause serious harm by ignoring human welfare.",
          "That paperclip manufacturing is an ideal domain for testing early AI safety protocols.",
          "That the primary danger of AI lies in its potential for resource theft.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と論証構造の把握】
正解は B。第2段落の論証展開を整理します。

Bostrom の主張: "an AI system optimising relentlessly for a narrow proxy measure ... could ... consume all available resources ... treating human welfare as entirely irrelevant"

→「狭い代理尺度のみを最適化する AI は、人間の福祉を無視して資源を消費しうる」

選択肢 B「狭い目標に向けて最適化する高性能 AI は、人間の福祉を無視することで深刻な害をもたらしうる」が正確な言い換え。

【引っかけ分析】
・A「AI がクリップ製造に興味を持つ」: 本文の趣旨は「意図せず人間に害をもたらす可能性の例示」であり、AIが製造に「興味を持つ」という話ではない。
・D「資源の窃盗」: 目的は「クリップ生産の最大化」であり、窃盗を目的とはしていない。

【重要語彙】
・"innocuous"（無害な・無害に見える）: "seemingly innocuous"（一見無害に見える）の形で使われる。
→ "seem + adj." の知覚動詞構文。
・"proxy measure"（代理指標）: 直接測れない本来の目標の代わりに使用する測定可能な指標。
・"optimising for"（〜に向けて最適化する）: 機械学習の文脈で頻出する表現。`,
      },
      {
        questionText:
          "How do critics respond to alignment scenarios like Bostrom's, according to the final paragraph?",
        options: [
          "They argue that regulatory frameworks alone are sufficient to prevent misaligned AI systems.",
          "They claim that the paperclip scenario has already been disproven by empirical AI experiments.",
          "They suggest that future AI will inherently develop flexible value representations, making rigid goal-pursuit unlikely.",
          "They maintain that human values are inherently too subjective to specify for any intelligent system.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と反論構造の把握】
正解は C。最終段落の批判者たちの主張を正確に読み取ります。

"Critics ... note that these framings assume an unrealistic degree of goal-rigidity in future AI systems, arguing that sophisticated AI will inherently develop more flexible, context-sensitive value representations that naturally align with human intentions."

批判の構造：
(1) Bostrom の想定（= 目標が硬直的なAI）は非現実的だ
(2) 洗練されたAIは、より柔軟で文脈依存的な価値表現を自然に発展させるはずだ

→ C「将来のAIは柔軟な価値表現を発展させ、硬直した目標追求は起こりにくい」が正解。

【引っかけ分析】
・A「規制で十分」: 本文は規制フレームワークに言及しておらず、技術的反論の文脈。
・D「人間の価値は主観的すぎる」: これは批判者の論旨ではなく、アライメント問題が困難な理由（第2段落後半）に近い。

【構文解析：現在分詞 "arguing that ..."】
"Critics ... note that ..., arguing that sophisticated AI will inherently develop ..."
→ 分詞構文 "arguing that" は "and they argue that" に等しい（付帯状況・補足的説明）。
→ "will inherently develop"（当然・本質的に発展するだろう）: "inherently" は「本質的に・生来的に」。

【語彙ポイント】
・"goal-rigidity"（目標硬直性）: 一つの目標を絶対的に追求し続ける性質。
・"context-sensitive"（文脈依存的な）: 状況に応じて柔軟に判断・適応できる。`,
      },
    ],
  },
];
