import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_2: ComprehensionProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 問題 P2-1: 共通テストレベル / SNSと青年期のアイデンティティ形成 / 約140語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "social-media-identity",
    title: "Social Media, Self-Presentation, and Adolescent Identity",
    level: "COMMON_TEST",
    tags: ["論説文", "SNS・アイデンティティ", "共通テスト", "約140語"],
    passage: `The emergence of social media platforms has fundamentally transformed how adolescents construct and present their identities. Unlike previous generations, who developed their sense of self primarily through face-to-face interactions, today's teenagers navigate identity formation across both physical and digital spaces simultaneously.

Psychologists have observed that the selective self-presentation characteristic of social media — where individuals curate idealised versions of their experiences — can create significant psychological pressure. When adolescents perceive their peers' online lives as consistently more fulfilling than their own offline reality, this distorted social comparison may contribute to lower self-esteem and heightened anxiety.

Nevertheless, researchers also note that digital environments can provide valuable spaces for identity exploration, particularly for young people who lack supportive communities in their immediate physical surroundings. The key, many argue, lies not in restricting digital engagement but in cultivating critical digital literacy.`,

    questions: [
      {
        questionText:
          "How does the passage characterise the key difference between today's teenagers and previous generations?",
        options: [
          "Today's teenagers rely more heavily on peer approval to establish their sense of self-worth.",
          "Previous generations experienced higher levels of social anxiety in face-to-face settings.",
          "Today's teenagers form their identity across both physical and digital spaces at the same time.",
          "Previous generations were more creative in expressing identity through arts and performance.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落の対比構造を読み取る問題です。

"Unlike previous generations, who developed their sense of self primarily through face-to-face interactions, today's teenagers navigate identity formation across both physical and digital spaces simultaneously."

→「以前の世代：主に対面交流」vs「今日の十代：物理的・デジタル双方の空間で同時進行」

C「今日の十代は物理的空間とデジタル空間の双方で同時にアイデンティティを形成する」が正解。

【引っかけ分析】
・A「仲間の承認への依存」: 本文の比較対象は「空間（場所）」の違いであり、承認の依存度ではありません。
・B「対面での不安」: 本文は以前の世代の不安については言及していません。
・D「芸術的自己表現」: 本文に記述なし。

【構文：前置詞 unlike + 関係代名詞 who】
"Unlike previous generations, who developed their sense of self primarily through face-to-face interactions,"
→ "unlike A"（A とは異なり）: 対比の前置詞。
→ ", who ..." はコンマ付き関係代名詞（継続用法）で "previous generations" を補足説明。
→ "navigate"（〜をうまく切り抜ける・操作する）: ここでは「〜に対処する」の意味。`,
      },
      {
        questionText:
          "According to the passage, what psychological risk is associated with social media's selective self-presentation?",
        options: [
          "Overconfidence that leads adolescents to form unrealistic expectations about their future careers.",
          "A distorted social comparison that may lower self-esteem and increase anxiety.",
          "Reduced capacity for empathy caused by a decrease in face-to-face interaction.",
          "Addiction to social validation that prevents independent critical thinking.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と構文解析】
正解は B。第2段落の核心文が根拠です。

"When adolescents perceive their peers' online lives as consistently more fulfilling than their own offline reality, this distorted social comparison may contribute to lower self-esteem and heightened anxiety."

この文の構造を分解します：

M（副詞節）: "When adolescents perceive their peers' online lives as consistently more fulfilling than their own offline reality"
→ 「十代が仲間のオンライン生活を自分のオフラインの現実よりも一貫して充実していると認識するとき」
→ "perceive A as B"（A を B と見なす・認識する）: 重要熟語

S（主語）: "this distorted social comparison"（この歪んだ社会的比較）

V（述語）: "may contribute to"（〜に寄与するかもしれない）
→ "contribute to"（〜に寄与する・〜の原因となる）+ 名詞

O（目的語に相当）: "lower self-esteem and heightened anxiety"
→ "lower self-esteem"（低下した自己評価）+ "heightened anxiety"（高まった不安）

→ B「歪んだ社会的比較が自己評価の低下と不安の増加をもたらすかもしれない」が正解。

【語彙ポイント】
・"selective self-presentation"（選択的自己提示）: 自分の理想的な側面のみを意図的に見せること。
・"curate"（キュレートする）: 情報や経験を意図的に選択・編集して提示する行為。
・"heightened"（高まった）: "heighten"（高める）の過去分詞形容詞的用法。`,
        syntaxAnalysis: [
          {
            text: "When adolescents perceive their peers' online lives as consistently more fulfilling than their own offline reality",
            role: "M",
            translation: "十代が仲間のオンライン生活を自分のオフラインの現実よりも一貫して充実していると認識するとき（when節：時の副詞節。perceive A as B = AをBと見なす）",
          },
          {
            text: "this distorted social comparison",
            role: "S",
            translation: "この歪んだ社会的比較は（distorted = 過去分詞が名詞を前置修飾）",
          },
          {
            text: "may contribute to",
            role: "V",
            translation: "〜に寄与するかもしれない（may = 推量の助動詞。contribute to = 〜の原因となる・〜に貢献する）",
          },
          {
            text: "lower self-esteem and heightened anxiety",
            role: "O",
            translation: "自己評価の低下と高まった不安に（contribute to の目的語。lower = 低下した、heightened = 高まった、ともに形容詞的過去分詞）",
          },
        ],
      },
      {
        questionText:
          "What solution does the passage ultimately recommend for the challenges posed by social media?",
        options: [
          "Restricting adolescents' access to social media platforms during school hours.",
          "Training professional psychologists to monitor and intervene in online social dynamics.",
          "Developing government regulations that limit social media companies' algorithmic practices.",
          "Fostering critical digital literacy rather than limiting digital engagement itself.",
        ],
        correctAnswerIndex: 3,
        explanation: `【正解の根拠】
正解は D。最終段落の最後の文が直接の根拠です。

"The key, many argue, lies not in restricting digital engagement but in cultivating critical digital literacy."
（多くの論者が言うように、重要なのはデジタルへの関与を制限することではなく、批判的デジタルリテラシーを育成することにある。）

→ D「デジタルへの関与自体を制限するのではなく、批判的デジタルリテラシーを育成すること」が正解。

【引っかけ分析】
・A「アクセスの制限」: 本文はまさにこれを否定し "not in restricting digital engagement" と述べています。
・B・C: 本文に記述なし。

【構文：not A but B の変形】
"lies not in A but in B"
→ "not in restricting ..." = A（否定される選択肢）
→ "but in cultivating ..." = B（肯定される選択肢）
→ "lie in"（〜にある・〜に起因する）: "The key lies in ..."（重要なのは〜にある）で頻出。

【挿入句】
"The key, many argue, lies ..."
→ "many argue"（多くの論者が主張するように）は挿入句で、主語と述語の間に挿入されている。
→ 挿入句を除いた骨格: "The key lies not in ... but in ..."

【語彙ポイント】
・"cultivating"（育成する・涵養する）: 農耕の比喩から転じて「能力・習慣を時間をかけて育てる」。
・"critical digital literacy"（批判的デジタルリテラシー）: デジタル情報を批判的に評価・活用する能力。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 P2-2: 私立大学レベル / AI倫理・アルゴリズムの偏見 / 約200語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "algorithmic-bias-justice",
    title: "Algorithmic Decision-Making and the Problem of Automated Bias",
    level: "PRIVATE_UNI",
    tags: ["論説文", "AI倫理・アルゴリズム偏見", "私立大", "約200語"],
    passage: `As algorithms increasingly inform high-stakes decisions — from creditworthiness assessments to criminal risk predictions — concerns have intensified regarding the ways in which such systems can perpetuate and amplify existing social inequalities. The assumption that algorithmic decisions are inherently more objective than human ones is, many researchers argue, fundamentally mistaken.

Machine learning models are trained on historical data, and if that data reflects past discriminatory practices, the resulting model will reproduce those patterns with the full authority of mathematical precision. A risk assessment tool used in United States courts, for instance, was found to assign significantly higher recidivism risk scores to Black defendants than to white defendants with comparable criminal histories. Defenders of such tools argue that they reduce individual human bias by standardising assessment criteria. Critics counter that standardised reproduction of historically biased outcomes is not neutrality but a new, more insidious form of discrimination.

What this debate ultimately reveals is a deeper epistemic question: whether the authority we grant to mathematical models is warranted, or whether it represents a form of "automation bias" — a cognitive tendency to defer to automated outputs even when they contradict available evidence.`,

    questions: [
      {
        questionText:
          "What central assumption do many researchers challenge in the first paragraph?",
        options: [
          "That algorithmic systems are too technically complex for non-experts to audit or evaluate.",
          "That machine learning models should only be deployed in low-stakes, non-legal applications.",
          "That algorithmic decisions are inherently more objective and neutral than human judgements.",
          "That mathematical models should be granted greater authority than courtroom testimony.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落の最終文が直接の根拠です。

"The assumption that algorithmic decisions are inherently more objective than human ones is, many researchers argue, fundamentally mistaken."
（アルゴリズムの判断が本質的に人間の判断より客観的であるという前提は、多くの研究者が主張するように、根本的に誤りである。）

→ 研究者たちが否定しているのは「アルゴリズムは人間より客観的だ」という前提 = C が正解。

【引っかけ分析】
・A「技術的複雑さ」: 本文の問題意識は「客観性の幻想」であり、複雑さへの懸念ではありません。
・D「法廷証言との比較」: 本文に記述なし。

【構文：挿入句を含む主語-述語の把握】
"The assumption that algorithmic decisions are inherently more objective than human ones is, many researchers argue, fundamentally mistaken."

→ 主語: "The assumption that ..."（同格節 that をもつ名詞句）
→ 挿入: "many researchers argue"（コンマに挟まれた挿入句）
→ 述語: "is fundamentally mistaken"（根本的に誤りである）

挿入句を除いた骨格: "The assumption ... is fundamentally mistaken."
→ "mistaken"（誤った）は形容詞的過去分詞。"be mistaken"（誤りである）は重要表現。`,
      },
      {
        questionText:
          "Why might a machine learning model reproduce discriminatory outcomes, according to the second paragraph?",
        options: [
          "Because programmers deliberately encode their personal biases into the model's core logic.",
          "Because machine learning technology is inherently incompatible with legal and financial applications.",
          "Because training on historically biased data causes the model to perpetuate those same patterns.",
          "Because the mathematical complexity of models makes independent auditing practically impossible.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：因果関係の把握】
正解は C。第2段落第1文が根拠です。

"Machine learning models are trained on historical data, and if that data reflects past discriminatory practices, the resulting model will reproduce those patterns with the full authority of mathematical precision."

因果関係：
原因（条件）: "if that data reflects past discriminatory practices"（訓練データが過去の差別的慣行を反映しているなら）
結果: "the resulting model will reproduce those patterns"（生成されたモデルはそのパターンを再現する）

→ C「歴史的に偏ったデータで訓練することで、モデルが同じパターンを再現する」が正解。

【引っかけ分析】
・A「意図的なバイアスの埋め込み」: 本文は意図しない構造的な問題を扱っています（"perpetuate"は「意図せず継続する」の意）。
・B「技術的非互換性」: 本文に記述なし。

【語彙ポイント】
・"perpetuate"（永続させる・継続させる）: "perp-" は「通じて・完全に」。意図せず悪習慣などを存続させる。
・"recidivism"（再犯）: "recidivate"（再犯する）の名詞形。刑事司法文脈の専門語。
・"insidious"（陰険な・じわじわと害をなす）: 表面上わかりにくいが実際には危険な性質。`,
      },
      {
        questionText:
          "What does 'automation bias' refer to in the final paragraph?",
        options: [
          "The tendency for automated systems to prioritise processing speed over analytical accuracy.",
          "A cognitive tendency to defer to automated outputs even when they contradict available evidence.",
          "The systematic accumulation of error rates that occurs when algorithms process large datasets.",
          "A form of discrimination embedded deliberately into the design logic of decision-support software.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と構文解析】
正解は B。最終段落の定義を読み取る問題です。

"whether it represents a form of 'automation bias' — a cognitive tendency to defer to automated outputs even when they contradict available evidence"

ダッシュ（—）以降が "automation bias" の定義：
→「自動化されたシステムの出力が入手可能な証拠と矛盾する場合でさえ、その出力に従う傾向」

→ B「利用可能な証拠と矛盾するときでさえ、自動化された出力に従ってしまう認知的傾向」が正解。

【引っかけ分析】
・A「速度優先」: バイアスの性質は「処理の性質」ではなく、「人間の認知的傾向」。
・D「意図的に埋め込まれた差別」: "cognitive tendency"（認知的傾向）は人間側の問題であり、ソフトウェアの設計の問題ではない。

【構文解析：最終文の全体構造】
核心文: "What this debate ultimately reveals is a deeper epistemic question: whether the authority we grant to mathematical models is warranted, or whether it represents a form of 'automation bias' ..."`,
        syntaxAnalysis: [
          {
            text: "What this debate ultimately reveals",
            role: "S",
            translation: "この議論が最終的に明らかにするもの（what節が主語。what = 「〜するもの・こと」。ultimately = 最終的には）",
          },
          {
            text: "is",
            role: "V",
            translation: "である（SVC構造。what節が主語のとき is が述語）",
          },
          {
            text: "a deeper epistemic question",
            role: "C",
            translation: "より深い認識論的問いである（epistemic = 認識論の・知識に関する。補語として主語の内容を定義）",
          },
          {
            text: ": whether the authority we grant to mathematical models is warranted, or whether it represents a form of 'automation bias' — a cognitive tendency to defer to automated outputs even when they contradict available evidence",
            role: "M",
            translation: "コロン以降は 'question' の内容を展開：数学的モデルに私たちが付与する権威は正当化されるのか、それともそれは「オートメーション・バイアス」を表すのか（whether A or whether B = AかBかという疑問。defer to = 〜に従う・委ねる）",
          },
        ],
      },
    ],
  },
];
