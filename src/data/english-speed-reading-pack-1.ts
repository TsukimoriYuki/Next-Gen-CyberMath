import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_1: SpeedReadingProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 問題 P1-1: 教科書レベル / 睡眠と記憶 / 約90語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "sleep-and-memory",
    title: "Sleep and Memory Consolidation",
    level: "TEXTBOOK",
    timeLimit: 60,
    tags: ["説明文", "睡眠・記憶", "教科書", "約90語"],
    passage: `Sleep is essential not only for rest but also for learning. Scientists have discovered that during sleep, the brain processes and consolidates new information gathered throughout the day. This process, known as memory consolidation, helps transfer short-term memories into long-term storage.

Research shows that students who sleep well after studying perform better on tests than those who stay awake to study longer. Even a short nap of about twenty minutes can improve concentration and recall. For this reason, getting sufficient sleep is considered one of the most effective strategies for academic success.`,

    questions: [
      {
        questionText:
          "What is the primary topic of this passage?",
        options: [
          "The biological process of dreaming during REM sleep.",
          "The relationship between sleep and learning or memory.",
          "Medical strategies for treating insomnia in students.",
          "How long-term memories are permanently erased over time.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。本文は第1段落から「睡眠は学習にも不可欠（essential not only for rest but also for learning）」と主題を提示し、「記憶固定（memory consolidation）」と「睡眠と学業成績の関係」を一貫して論じています。

【引っかけ分析】
・A「夢（dreaming）」: 本文に "dream" の記述は一切なし。
・C「不眠症の治療」: 本文のテーマは睡眠不足の治療ではなく、睡眠の学習効果。
・D「記憶の消去」: 本文は逆に記憶を「長期保存に移す」と述べています。

【構文】
"Sleep is essential not only for rest but also for learning."
→ "not only A but also B"（AだけでなくBもまた）の相関接続詞。
→ A = for rest（休息のために）, B = for learning（学習のために）
→ "essential for"（〜に不可欠な）は重要熟語。`,
      },
      {
        questionText:
          "According to the passage, what does 'memory consolidation' involve?",
        options: [
          "Eliminating unnecessary memories during the rest period.",
          "Extending how long short-term memories last in the brain.",
          "Transferring information from short-term to long-term memory.",
          "Creating entirely new information during the sleep cycle.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落の定義文が直接の根拠です。

"This process, known as memory consolidation, helps transfer short-term memories into long-term storage."
（記憶固定と呼ばれるこのプロセスは、短期記憶を長期保存へ移すのを助ける。）

→ C「短期記憶から長期記憶への転送」がそのまま言い換えです。

【引っかけ分析】
・A「不要な記憶の削除」: 本文はそのような記述をしていません。
・B「短期記憶の持続時間を延ばす」: 本文は「移す（transfer）」と言っており、「延ばす（extend）」とは異なります。
・D「新たな情報の生成」: 睡眠中に新情報を「生み出す」という記述はありません。

【構文：同格の分詞句】
"This process, known as memory consolidation, ..."
→ "known as ..."（〜として知られる）は過去分詞の同格句で "This process" を修飾。
→ "This process, which is known as memory consolidation" と展開できます。`,
      },
      {
        questionText:
          "The passage suggests that a student aiming for good test results should:",
        options: [
          "Study for as many hours as possible without sleeping.",
          "Review all material immediately before the exam begins.",
          "Take long naps throughout the day instead of studying.",
          "Sleep well after studying rather than extending study time further.",
        ],
        correctAnswerIndex: 3,
        explanation: `【正解の根拠】
正解は D。第2段落の比較構文が根拠です。

"students who sleep well after studying perform better on tests than those who stay awake to study longer"
（勉強後によく眠る学生は、より長く勉強するために起き続ける学生よりテストで好成績を収める。）

「より長く起き続けて勉強する（stay awake to study longer）」よりも「よく眠る（sleep well）」方が有効だという主張です。

【引っかけ分析】
・A「できるだけ長時間勉強する」: 本文はこれよりも睡眠の方が効果的と述べています。
・B「試験直前に復習する」: 本文に「試験直前」の記述はありません。
・C「終日長い昼寝を取る」: 本文は「20分の短い昼寝（a short nap of about twenty minutes）」であり、「代わりに」ではなく「勉強後の睡眠」を勧めています。

【構文：比較構文】
"students who sleep well ... perform better ... than those who stay awake ..."
→ "比較級 + than" の構造。"those" = "those students" の代名詞的用法。
→ "stay awake to 〜"（〜するために起き続ける）: 不定詞の目的用法。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 P1-2: 私立大学レベル / 認知バイアス・アンカリング効果 / 約170語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "anchoring-bias-pricing",
    title: "The Anchoring Effect and Consumer Behaviour",
    level: "PRIVATE_UNI",
    timeLimit: 60,
    tags: ["論説文", "認知バイアス・消費者行動", "私立大", "約170語"],
    passage: `One of the most robust and well-documented cognitive biases in behavioural economics is the anchoring effect — the tendency for individuals to rely disproportionately on the first piece of information they encounter when making subsequent judgements or decisions.

In commercial contexts, anchoring is employed with remarkable sophistication. When a retailer displays an original price crossed out beside a discounted price, consumers anchor their perception of value to the original figure, making the reduced price appear far more attractive than it might otherwise seem in isolation. This technique, sometimes called "reference pricing," exploits the brain's inclination to evaluate new information not in absolute terms but relative to a pre-established reference point.

The effect extends beyond pricing. In negotiations, the first offer made typically exerts disproportionate influence over the final settlement, regardless of its objective reasonableness. Social psychologists have demonstrated that even arbitrary numbers — such as a randomly generated lottery figure — can shift people's estimates of completely unrelated quantities, a finding that underscores how profoundly unconscious and pervasive the anchoring mechanism truly is.`,

    questions: [
      {
        questionText:
          "According to the passage, what is the anchoring effect?",
        options: [
          "A tendency to immediately reject the first offer made in a negotiation.",
          "The brain's habit of evaluating all new information in absolute, objective terms.",
          "A cognitive bias toward placing excessive weight on the first information encountered.",
          "A commercial pricing strategy designed to hide the true value of a product.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落のダッシュ以降が「アンカリング効果」の定義です。

"the anchoring effect — the tendency for individuals to rely disproportionately on the first piece of information they encounter when making subsequent judgements or decisions"
（アンカリング効果 = 個人が後続の判断や決定を行う際に、最初に接した情報に不均衡に依存する傾向）

"rely disproportionately on"（不均衡に依存する）= "placing excessive weight on"（過度に重きを置く）の言い換えが C。

【引っかけ分析】
・A「最初の提案を即座に拒否する」: 本文とは逆。アンカリングは最初の情報に「引きずられる」傾向。
・B「絶対的な基準で評価する」: 本文は "not in absolute terms but relative to"（絶対的な基準ではなく相対的に）と述べており、逆。
・D「真の価値を隠す価格戦略」: 商業的応用の説明はあるが、それが「定義」ではありません。

【構文：同格のダッシュ】
"the anchoring effect — the tendency for ..."
→ ダッシュ（—）は同格・定義を示す。直後が "anchoring effect" の説明。
→ "the tendency for individuals to rely on ..."（個人が〜に依存する傾向）
→ "tendency for 人 to do"（〜する傾向）の形に注意。`,
      },
      {
        questionText:
          "How do retailers exploit the anchoring effect in their pricing strategies?",
        options: [
          "By offering flash sales lasting only a few hours to create urgency.",
          "By displaying the original price next to a discounted price to enhance perceived value.",
          "By concealing original prices so consumers cannot make comparisons.",
          "By using lottery numbers to suggest a product is exceptionally rare.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落が根拠です。

"When a retailer displays an original price crossed out beside a discounted price, consumers anchor their perception of value to the original figure, making the reduced price appear far more attractive..."
（小売業者が割引価格の横に元の価格を取り消し線付きで表示すると、消費者は元の価格に価値の基準点を固定し、値引き後の価格をより魅力的に感じる。）

→ B「元の価格を割引価格の横に表示して知覚価値を高める」が正解。

【引っかけ分析】
・A「期間限定セール」: 「緊急性の演出」は本文のテーマ（アンカリング）とは別の心理的手法。
・C「元の価格を隠す」: 本文では逆に「見せる」ことが効果の源。
・D「宝くじの数字を使う」: これは最終段落の別の文脈（恣意的な数字の影響）の話。

【構文：分詞構文】
"making the reduced price appear far more attractive than it might otherwise seem in isolation"
→ 分詞構文（結果・付帯状況）: "and this makes ..."
→ "appear + 形容詞"（〜に見える・思われる）
→ "than it might otherwise seem in isolation"（単独で見ればそう思えるよりも）: "otherwise"（さもなければ・別の状況では）が比較の文脈で使われている。`,
      },
      {
        questionText:
          "The example of lottery numbers in the final paragraph is used to show that:",
        options: [
          "Anchoring only operates in financial or pricing contexts.",
          "Random numbers have no meaningful effect on human cognition.",
          "The anchoring effect can alter estimates even when the anchor is logically unrelated to the task.",
          "Consumers are fully aware of anchoring and can easily compensate for it.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と論証構造】
正解は C。最終段落の論理展開を追います。

"Social psychologists have demonstrated that even arbitrary numbers — such as a randomly generated lottery figure — can shift people's estimates of completely unrelated quantities, a finding that underscores how profoundly unconscious and pervasive the anchoring mechanism truly is."

【論証の構造】
・主張: アンカリングは価格や交渉を超えた領域にも及ぶ（"The effect extends beyond pricing."）
・証拠: 無関係な乱数（宝くじ）でさえ、全く別の量の推定を変えてしまう
・結論: アンカリングは「いかに深く無意識的で広範囲か」を示す

→ C「アンカリングは論理的に無関係なアンカーでさえ推定を変えられる」が論証のポイント。

【引っかけ分析】
・A「金融・価格文脈のみ」: 本文はこれを否定し "extends beyond pricing" と述べています。
・B「無作為な数字は効果がない」: 本文は逆。"can shift people's estimates" と効果があることを示しています。
・D「消費者はアンカリングを認識して補正できる」: 本文は "profoundly unconscious"（深く無意識的）と述べており、逆。

【語彙ポイント】
・"arbitrary"（恣意的な・無作為な）: 根拠のない、思いつきの。
・"pervasive"（広範囲に及ぶ・浸透した）: "pervade"（〜に浸透する）の形容詞形。
・"underscores"（強調する・裏付ける）: "underscore" = "emphasize" の同義語。`,
      },
    ],
  },
];
