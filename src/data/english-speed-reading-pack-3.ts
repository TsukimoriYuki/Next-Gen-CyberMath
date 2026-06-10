import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_3: SpeedReadingProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // P3-1: 共通テスト / AIとサイバーセキュリティ / 約130語 / 55秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "ai-cybersecurity-threats",
    title: "Artificial Intelligence and the Evolving Cybersecurity Landscape",
    level: "COMMON_TEST",
    timeLimit: 55,
    tags: ["論説文", "AI・サイバーセキュリティ", "共通テスト", "約130語"],
    passage: `Artificial intelligence is fundamentally reshaping the landscape of cybersecurity. Traditional security systems rely on fixed rule sets to detect known threats, but modern AI-driven tools can analyze patterns in network traffic in real time, identifying anomalies that may signal previously unknown attack vectors. This capability is particularly valuable against so-called "zero-day" vulnerabilities — security flaws that are exploited before developers have had the opportunity to issue a patch.

However, the same machine learning techniques that defend networks are increasingly being weaponized by malicious actors. AI enables the automated generation of highly convincing phishing messages tailored to individual targets by analyzing social media profiles. Cybersecurity researchers warn that the accelerating arms race between defensive and offensive AI systems will demand substantial investments in human expertise as well as technological solutions.`,

    questions: [
      {
        questionText:
          "Which of the following best describes the main point of the passage?",
        options: [
          "AI has made cybersecurity threats virtually impossible to defend against.",
          "AI simultaneously strengthens cyber defenses and creates powerful new attack methods.",
          "Traditional security systems are completely obsolete and should be replaced immediately.",
          "Social media is the primary cause of all modern cybersecurity vulnerabilities.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と全体構造】
正解は B。本文は「AI がサイバー防御に役立つ（第1段落）」と「同じ AI 技術が攻撃にも使われる（第2段落）」という両面を提示する対比型の論説構造です。

第1段落：AI が既知の脅威だけでなく未知の攻撃（zero-day）の検出にも有効。
第2段落：逆に攻撃者も AI を活用し、個人を狙ったフィッシング詐欺を自動生成。
最終文：防御と攻撃の AI 軍拡競争が加速中。

→ B「AI は防御を強化すると同時に強力な攻撃手段も生み出す」が全体を正確に表現しています。

【引っかけ分析】
・A「防御が事実上不可能」: 本文はこれほど悲観的ではなく、「人的専門知識と技術的解決策への投資が必要」と述べています。
・C「従来システムは完全に時代遅れ」: 本文に記述なし。"Traditional ... rely on fixed rule sets" は限界を示唆するだけです。
・D「SNS が主要原因」: SNS はフィッシング詐欺の手段の一つとして登場するに過ぎません。

【重要構文】
"the same machine learning techniques that defend networks are increasingly being weaponized"
→ 主語: "the same machine learning techniques that defend networks"（関係代名詞 that で修飾）
→ 述語: "are increasingly being weaponized"（進行形受動態）。"weaponize"（兵器化する）に注意。`,
      },
      {
        questionText:
          "According to the passage, what is a 'zero-day' vulnerability?",
        options: [
          "A security flaw introduced by AI systems that have been in operation for less than one day.",
          "An attack vector that requires zero technical expertise to exploit.",
          "A security flaw that is exploited by attackers before a patch can be released.",
          "A type of phishing attack that uses AI-generated messages.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：語句定義問題】
正解は C。本文に直接の定義があります。

"so-called 'zero-day' vulnerabilities — security flaws that are exploited before developers have had the opportunity to issue a patch"

ダッシュ（—）以降が "zero-day vulnerabilities" の定義：「開発者がパッチを配布する機会を得る前に悪用されるセキュリティ上の欠陥」= C

【引っかけ分析】
・A「1日未満稼働のAIシステム」: "zero-day" の "zero" は「修正がゼロ日しかない（即日悪用）」という意味であり、稼働時間とは無関係。
・B「技術的スキル不要の攻撃手法」: 本文に記述なし。
・D「AI生成フィッシング攻撃の一種」: フィッシングは別のパラグラフで述べられる別の脅威です。

【語彙ポイント】
・"vulnerability"（脆弱性）: セキュリティ分野の重要語。"vulnerable"（脆弱な）の名詞形。
・"patch"（パッチ・修正プログラム）: ソフトウェアの欠陥を修正するプログラムアップデート。
・"issue a patch"（パッチを配布する）: "issue" は「発行する・配布する」の意味。`,
      },
      {
        questionText:
          "How does the passage suggest that AI is being used offensively by malicious actors?",
        options: [
          "By breaking encryption codes used to protect sensitive government data.",
          "By generating convincing, personalized phishing messages using social media data.",
          "By disabling zero-day detection systems in real time.",
          "By replacing human security analysts with automated attack programs.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：具体的手段の特定】
正解は B。第2段落の "AI enables the automated generation of highly convincing phishing messages tailored to individual targets by analyzing social media profiles" が直接の根拠。

「SNSプロフィールを分析することで、個人ターゲットに合わせた非常に説得力のあるフィッシングメッセージを自動生成できる」= B

【引っかけ分析】
・A「暗号解読」: 本文に暗号（encryption）の話は登場しません。
・C「zero-day検出システムの無効化」: 本文はゼロデイ脆弱性の悪用と AI フィッシングを別々のトピックとして述べています。
・D「人間のアナリストを置き換える」: 本文は「自動化されたメッセージ生成」について述べており、アナリストの代替については言及なし。

【構文解析】
"phishing messages tailored to individual targets by analyzing social media profiles"
→ "tailored to ..."（〜に合わせて仕立てられた）: 過去分詞句が "messages" を後置修飾。
→ "by analyzing ..."（〜を分析することによって）: 手段を示す動名詞句。
→ 全体: 「SNSプロフィールを分析することで個々のターゲット向けに特化したフィッシングメッセージ」`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-2: 国公立大 / 神経可塑性と記憶形成 / 約175語 / 75秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "neuroplasticity-adult-brain",
    title: "Neuroplasticity and the Reorganisation of Synaptic Architecture",
    level: "NATIONAL_UNI",
    timeLimit: 75,
    tags: ["論説文", "神経科学・記憶", "国公立大", "約175語", "倒置構文"],
    passage: `Not until the latter decades of the twentieth century did neuroscientists revise the long-held dogma that the adult brain is a structurally fixed organ incapable of generating new neural connections. The concept of neuroplasticity — the brain's capacity to reorganize its synaptic architecture in response to experience, learning, and injury — has since become one of the foundational pillars of modern neuroscience.

Central to this reconceptualization was the discovery of long-term potentiation (LTP), a process whereby repeated activation of a synaptic pathway strengthens the efficiency of signal transmission between neurons. Described colloquially by the axiom "neurons that fire together wire together," LTP provides a cellular mechanism for memory formation and skill acquisition.

The therapeutic implications are substantial. Stroke rehabilitation programs increasingly exploit neuroplasticity by exposing patients to intensive, repetitive motor tasks designed to recruit alternative neural pathways to compensate for regions rendered nonfunctional by ischemic damage. Nevertheless, the degree of recovery remains constrained by factors including age, lesion size, and the timing of intervention.`,

    questions: [
      {
        questionText:
          "What was the prevailing belief about the adult brain that the passage says neuroscientists revised?",
        options: [
          "That the brain gradually loses all neural connections after the age of thirty.",
          "That brain damage caused by stroke is always permanent and irreversible.",
          "That the adult brain cannot form new neural connections or reorganize its structure.",
          "That long-term memory is stored exclusively in the cerebral cortex.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と倒置構文の解析】
正解は C。第1段落が根拠ですが、重要な構文上の注意があります。

倒置構文: "Not until the latter decades of the twentieth century did neuroscientists revise the long-held dogma that the adult brain is a structurally fixed organ incapable of generating new neural connections."

【倒置の構造分析】
通常語順: "Neuroscientists did not revise the long-held dogma ... until the latter decades of the twentieth century."
→ 否定の副詞句 "Not until ..." が文頭に出ることで倒置が発生: do/did が主語の前に移動。

"the long-held dogma that ..." の "that" は同格節を導く接続詞。
"dogma"（定説）= 「成人の脳は構造的に固定した器官であり、新たな神経接続を生成できない」という従来の通説。

→ C「成人の脳は新たな神経接続を形成したり構造を再編したりできない」が従来の通説を正確に言い換えています。

【引っかけ分析】
・A「30歳以降すべての神経接続が失われる」: 本文はそこまで過激な主張を紹介していません。
・B「脳卒中による損傷は常に永続的」: これは本文が示す神経可塑性の発見によって否定されていますが、「従来の通説」として明示されてはいません。
・D「記憶は大脳皮質にのみ保存」: 本文に記述なし。`,
      },
      {
        questionText:
          "According to the passage, what does long-term potentiation (LTP) provide?",
        options: [
          "A surgical technique for repairing damaged synaptic pathways after stroke.",
          "Evidence that emotions are stored separately from factual memories in the brain.",
          "A cellular-level explanation for how memories are formed and skills are learned.",
          "A method for measuring the degree of neuroplasticity in individual patients.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が直接の根拠です。

"LTP provides a cellular mechanism for memory formation and skill acquisition."
（LTP は記憶形成とスキル習得のための細胞レベルのメカニズムを提供する。）

→ C「記憶がどのように形成されスキルが習得されるかの細胞レベルの説明」が正確な言い換えです。

【LTP のプロセスを整理】
第2段落の構造：
(1) LTP = シナプス経路が繰り返し活性化されると神経間の信号伝達効率が向上するプロセス
(2) 通称: "neurons that fire together wire together"（共に発火するニューロンは共に配線される）
(3) 機能: 記憶形成とスキル習得のメカニズム

【引っかけ分析】
・A「外科的手術技術」: LTP は神経科学の原理であり、外科的介入技術ではありません。
・B「感情と事実記憶の分離の証拠」: 本文に記述なし。
・D「患者の神経可塑性を測定する方法」: LTP は測定方法ではなく、可塑性の細胞メカニズムです。

【語彙ポイント】
・"potentiation"（増強）: "potent"（強力な）から。シナプスの信号伝達が「強化・増強」されること。
・"whereby"（それによって）: 関係副詞。"by which" と同義で、後続節が手段を説明する。`,
      },
      {
        questionText:
          "What does the passage say about stroke rehabilitation programs that exploit neuroplasticity?",
        options: [
          "They have achieved complete recovery for all patients regardless of lesion severity.",
          "They rely exclusively on pharmaceutical interventions to stimulate neural regrowth.",
          "They use intensive, repetitive tasks to activate alternative neural pathways in place of damaged ones.",
          "They are most effective when applied to patients who have sustained the largest lesions.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第2文が根拠です。

"Stroke rehabilitation programs increasingly exploit neuroplasticity by exposing patients to intensive, repetitive motor tasks designed to recruit alternative neural pathways to compensate for regions rendered nonfunctional by ischemic damage."

【内容の整理】
・手段: "intensive, repetitive motor tasks"（集中的・反復的な運動課題）
・目的: "to recruit alternative neural pathways"（代替神経経路を動員するため）
・補償対象: "regions rendered nonfunctional by ischemic damage"（虚血性損傷によって機能不全となった領域）

→ C「損傷した神経経路の代わりに代替経路を活性化するため集中的・反復的課題を用いる」が正確です。

【引っかけ分析】
・A「すべての患者で完全回復」: 最終文 "the degree of recovery remains constrained by factors including age, lesion size, and the timing of intervention" が否定しています。
・B「薬物介入のみ」: 本文は「運動課題（motor tasks）」を根拠として挙げています。
・D「大きな損傷ほど有効」: 最終文は "lesion size" が回復を制限する因子の一つと述べており、逆方向の主張をしています。

【構文ポイント】
"regions rendered nonfunctional by ischemic damage"
→ "rendered nonfunctional"（機能不全にされた）: SVOC 構造の受動化。
→ render O C（Oを Cの状態にする）の O が受動的に修飾語になっています。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-3: 共通テスト / CRISPR遺伝子編集と倫理 / 約130語 / 55秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "crispr-ethics",
    title: "CRISPR-Cas9: Precision Medicine and Ethical Boundaries",
    level: "COMMON_TEST",
    timeLimit: 55,
    tags: ["論説文", "医療テクノロジー・生命倫理", "共通テスト", "約130語"],
    passage: `CRISPR-Cas9 is a molecular tool adapted from a naturally occurring bacterial immune mechanism that allows scientists to precisely edit the DNA sequences of living organisms. By directing a protein complex to a specific location in the genome, researchers can cut, disable, or replace gene sequences with unprecedented accuracy. The technology has accelerated research into genetic diseases and opened new possibilities for treating conditions previously considered untreatable.

Despite its promise, CRISPR raises profound ethical questions. The possibility of editing the germline — the DNA of eggs, sperm, or embryos — means that genetic modifications could be inherited by future generations. A controversial case in 2018, in which a Chinese scientist claimed to have created the world's first gene-edited babies, prompted international condemnation and calls for a moratorium on heritable human genetic modifications pending broader societal consensus.`,

    questions: [
      {
        questionText:
          "According to the passage, what does CRISPR-Cas9 technology primarily allow scientists to do?",
        options: [
          "To observe the behavior of bacterial immune systems under laboratory conditions.",
          "To precisely alter specific sequences within an organism's genetic code.",
          "To clone organisms by duplicating complete DNA strands.",
          "To accelerate the natural evolutionary process in laboratory organisms.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文〜第2文が根拠です。

"CRISPR-Cas9 is a molecular tool ... that allows scientists to precisely edit the DNA sequences of living organisms. By directing a protein complex to a specific location in the genome, researchers can cut, disable, or replace gene sequences with unprecedented accuracy."

「生体のDNA配列を正確に編集できる」→ B「生物のゲノム内の特定の配列を正確に変更する」が正確な言い換えです。

【引っかけ分析】
・A「細菌の免疫システムの観察」: CRISPR は細菌の免疫機構から着想を得ていますが、その観察が目的ではなく、遺伝子編集ツールとして「応用」しています。"adapted from（〜から応用した）"の表現に注意。
・C「クローン作製」: クローニング（完全なDNA複製）は CRISPR の機能ではありません。
・D「進化の加速」: 本文に記述なし。

【語彙ポイント】
・"genome"（ゲノム）: 生物が持つ全遺伝情報の総体。
・"unprecedented accuracy"（前例のない精度）: "unprecedented"（前例のない）は最上級表現に相当する語として頻出。
・"disable"（無効化する）: 遺伝子編集では「遺伝子の機能を失わせる」ことを指す。`,
      },
      {
        questionText:
          "Why does the passage suggest that editing the germline is particularly controversial?",
        options: [
          "Because germline editing is significantly more technically difficult than somatic cell editing.",
          "Because germline editing cannot be performed with current CRISPR technology.",
          "Because genetic changes to the germline can be passed on to subsequent generations.",
          "Because germline editing has already been used to eliminate several inherited diseases.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：論理的因果関係の把握】
正解は C。第2段落第1文が根拠です。

"The possibility of editing the germline — the DNA of eggs, sperm, or embryos — means that genetic modifications could be inherited by future generations."

生殖細胞系列（ germline = 卵子・精子・受精卵のDNA）を編集すると、その変化が子孫に受け継がれる可能性がある → これが「特に論争的」である理由です。

【同格のダッシュ構文】
"the germline — the DNA of eggs, sperm, or embryos —"
→ ダッシュ（—）で囲まれた部分が "germline" の定義（同格説明）。
→ "germline"（生殖細胞系列）: 次世代に伝わる遺伝情報を担う細胞系統。

【引っかけ分析】
・A「技術的難易度が高い」: 本文に記述なし。倫理的問題として議論されています。
・B「現在の技術では実施できない」: 本文は 2018 年に実際に行われたケースを紹介しており、技術的不可能性は否定されています。
・D「すでに遺伝病を根絶」: 本文は「可能性（could be inherited）」として語っており、実績ではありません。

【語彙ポイント】
・"moratorium"（モラトリアム・一時停止）: ある活動を一時的に禁止・停止すること。
・"pending"（〜が実現するまで）: 前置詞として使われ、「より広い社会的合意が形成されるまでの間」。`,
      },
      {
        questionText:
          "How did the international community respond to the 2018 case mentioned in the passage?",
        options: [
          "It praised the scientist for advancing medical science despite ethical concerns.",
          "It condemned the experiment and called for a halt to heritable gene editing.",
          "It launched an independent scientific review to verify the scientist's claims.",
          "It established a permanent global ban on all forms of genetic research.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"prompted international condemnation and calls for a moratorium on heritable human genetic modifications pending broader societal consensus."

「国際的な非難と、より広い社会的合意が得られるまでの遺伝性ヒト遺伝子改変のモラトリアム要求を引き起こした」

→ B「その実験を非難し、遺伝性遺伝子編集の停止を要求した」が正確な言い換えです。

【引っかけ分析】
・A「称賛した」: 本文の "international condemnation"（国際的非難）と正反対です。
・C「独立した科学的検証を実施」: 本文に記述なし。
・D「あらゆる遺伝子研究の永久的な全面禁止」: "moratorium"（一時停止）と "heritable human genetic modifications"（遺伝性ヒト遺伝子改変）に限定されており、すべての遺伝子研究の永久禁止ではありません。これは典型的な「過言の引っかけ」です。

【構文ポイント】
"in which a Chinese scientist claimed to have created ..."
→ 前置詞 + 関係代名詞 "in which" の形。
→ 先行詞は "A controversial case"（2018年の論争的な事例）。
→ "claimed to have created" = 「（過去に）作製したと主張した」: 不定詞の完了形で、主動詞より前の出来事を示す。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-4: 国公立大 / 認知負荷理論と学習設計 / 約175語 / 75秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "cognitive-load-instruction",
    title: "Cognitive Load Theory and the Design of Effective Instruction",
    level: "NATIONAL_UNI",
    timeLimit: 75,
    tags: ["論説文", "認知心理学・教育", "国公立大", "約175語", "三分類"],
    passage: `Cognitive load theory, originally formulated by educational psychologist John Sweller in the 1980s, proposes that human working memory is severely limited in both capacity and duration, and that the design of instructional materials must therefore be carefully engineered to minimize demands on this constrained resource. Three distinct forms of load are distinguished: intrinsic load, arising from the inherent complexity of the material itself; extraneous load, imposed by poorly designed instructional formats; and germane load, generated by the cognitive effort directed toward schema formation and automation.

Critically, it is extraneous load — not intrinsic complexity — that educators can and should reduce. Splitting attention between textual explanations and accompanying diagrams placed in disparate locations, for instance, forces learners to simultaneously hold and integrate information from two sources, a phenomenon researchers term the "split-attention effect," which reduces learning efficiency. Conversely, presenting explanatory text in close spatial proximity to corresponding visual elements substantially reduces extraneous load and demonstrably improves the transfer of knowledge to novel problem-solving contexts.

These insights have significantly influenced the design of e-learning platforms, standardized examinations, and medical simulation training programs worldwide.`,

    questions: [
      {
        questionText:
          "According to cognitive load theory, which of the three types of load is the most appropriate target for educators to reduce?",
        options: [
          "Intrinsic load, because reducing content complexity makes learning more accessible.",
          "Germane load, because schema formation is inefficient without direct instruction.",
          "Extraneous load, because it arises from instructional design rather than content difficulty.",
          "All three forms of load equally, because each independently impairs working memory.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と三分類の整理】
正解は C。第2段落第1文が直接の根拠です。

"Critically, it is extraneous load — not intrinsic complexity — that educators can and should reduce."
（重要なのは、教育者が削減できるし削減すべきなのは、外在的負荷であって、内在的複雑さではないということだ。）

これは強調構文（It is ... that ...）を用いた明示的な主張です。

【三種類の負荷の整理】
・Intrinsic load（内在的負荷）: 教材そのものの複雑さに由来 → 内容の本質的な難易度なので、削減すると学習内容が変わってしまう。
・Extraneous load（外在的負荷）: 粗悪な教材設計によって生じる → 設計改善で削減可能かつ削減すべき。
・Germane load（ゲルマン負荷）: スキーマ形成・自動化に向けた認知努力 → 学習に貢献するため維持・促進すべき。

→ C が正解。

【強調構文の構造】
"it is extraneous load ... that educators can and should reduce"
→ 元の文: "Educators can and should reduce extraneous load."
→ "extraneous load" を強調するために It is ... that ... 構文を使用。`,
      },
      {
        questionText:
          "What does the 'split-attention effect' described in the passage refer to?",
        options: [
          "The tendency for students to divide their focus between academic subjects and extracurricular activities.",
          "The cognitive burden placed on learners who must integrate information from spatially separated sources.",
          "A teaching strategy that deliberately presents conflicting information to stimulate critical thinking.",
          "The documented decrease in working memory capacity that occurs naturally with aging.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"Splitting attention between textual explanations and accompanying diagrams placed in disparate locations, for instance, forces learners to simultaneously hold and integrate information from two sources, a phenomenon researchers term the 'split-attention effect'"

【定義の言い換え】
・原因: テキストとそれに対応する図が「離れた場所」に置かれている
・結果: 学習者が二つのソースから情報を同時に保持・統合しなければならない負荷
→ B「空間的に分離された情報源を統合しなければならない認知的負担」が正確です。

【引っかけ分析】
・A「学業と課外活動への集中の分散」: 「注意を分割する」という言葉から連想させる引っかけですが、本文の "split-attention" は教材設計の技術的概念です。
・C「意図的に矛盾情報を提示する教授法」: 本文に記述なし。
・D「加齢によるワーキングメモリの低下」: 本文のテーマは加齢ではなく教材設計です。

【語彙ポイント】
・"disparate"（全く異なる・かけ離れた）: 「空間的に離れた場所」という文脈で使われています。
・"integrat"（統合する）: 別々の情報を一つの理解に統合する認知プロセス。
・"conversely"（逆に）: 直前の内容と逆の対比を導く重要な接続副詞。`,
      },
      {
        questionText:
          "What does the passage suggest is the practical consequence of placing explanatory text directly alongside corresponding diagrams?",
        options: [
          "It increases intrinsic load by overwhelming students with simultaneous visual and verbal information.",
          "It reduces extraneous load and measurably enhances the ability to apply knowledge in new contexts.",
          "It primarily benefits advanced learners while providing minimal support to beginners.",
          "It is effective only for scientific subjects and not for language or humanities instruction.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"presenting explanatory text in close spatial proximity to corresponding visual elements substantially reduces extraneous load and demonstrably improves the transfer of knowledge to novel problem-solving contexts."

・テキストと図を近い場所に配置する
  → 外在的負荷を大幅に削減（reduces extraneous load）
  → 新たな問題解決場面への知識転移を実証的に改善（improves the transfer of knowledge to novel problem-solving contexts）

→ B「外在的負荷を低減し、新しい文脈での知識応用能力を実証的に高める」が正確です。

【語彙ポイント】
・"spatial proximity"（空間的近接）: 物理的・視覚的に近い配置のこと。
・"demonstrably"（実証的に）: データや実験で証明可能な形で。
・"transfer of knowledge"（知識の転移）: 学習した知識を未習の新しい問題に応用できること。認知心理学の重要概念。

【引っかけ分析】
・A「内在的負荷が増加する」: 本文は "extraneous load" の削減と述べており、内在的負荷（intrinsic load）への言及はありません。さらに "reducing extraneous load" はポジティブな結果として提示されています。
・C「上級学習者のみに有効」: 本文は学習者レベルによる差異に言及していません。
・D「理科系科目のみに有効」: 本文に記述なし。第3段落で「e-learning・標準テスト・医療シミュレーション」と広範な応用を示しています。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-5: 私立大 / 量子コンピューティングと暗号 / 約155語 / 65秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "quantum-cryptography-threat",
    title: "Quantum Computing and the Threat to Public-Key Cryptography",
    level: "PRIVATE_UNI",
    timeLimit: 65,
    tags: ["論説文", "量子コンピューティング・暗号", "私立大", "約155語"],
    passage: `Quantum computing poses an unprecedented threat to the cryptographic systems that underpin global digital infrastructure. Current public-key encryption protocols, such as RSA, derive their security from the practical impossibility of factoring extremely large numbers using classical computation. A sufficiently powerful quantum computer, exploiting Shor's algorithm, could perform this factorization in polynomial time, rendering existing encrypted communications retroactively vulnerable.

The timeline for this threat remains uncertain. While today's quantum computers are too error-prone and limited in qubit count to break current encryption standards, the intelligence community operates under the assumption that nation-state adversaries may already be harvesting encrypted data with the intention of decrypting it once quantum hardware matures — a strategy known as "harvest now, decrypt later."

In response, the National Institute of Standards and Technology finalized the first set of post-quantum cryptographic standards in 2024, providing governments and corporations with algorithms designed to withstand attacks from both classical and quantum computers.`,

    questions: [
      {
        questionText:
          "Why does the passage suggest that quantum computers threaten existing encryption systems like RSA?",
        options: [
          "Because quantum computers operate at temperatures that disable standard encryption hardware.",
          "Because they can solve the mathematical problem underlying current encryption in a practical timeframe.",
          "Because quantum computers can intercept encrypted communications before they are transmitted.",
          "Because RSA encryption was originally designed to be replaced by quantum-resistant protocols.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2〜3文が根拠です。

RSA の安全性の根拠: "the practical impossibility of factoring extremely large numbers using classical computation"
（古典的計算では巨大な数の素因数分解が実質的に不可能）

量子コンピュータの脅威: "A sufficiently powerful quantum computer, exploiting Shor's algorithm, could perform this factorization in polynomial time"
（ショアのアルゴリズムを利用すれば多項式時間で素因数分解が可能）

→ B「現在の暗号の基礎となっている数学的問題を実用的な時間で解けるから」が正確です。

【語彙ポイント】
・"polynomial time"（多項式時間）: 問題のサイズに対して多項式関数で表される計算量。指数時間より圧倒的に速い。
・"retroactively vulnerable"（遡及的に脆弱になる）: 過去に暗号化されたデータが将来的に解読されうること。
・"underpin"（支える・基盤となる）: 重要な基盤語。

【引っかけ分析】
・A「温度による障害」: 量子コンピュータは確かに低温環境を必要としますが、本文の脅威の説明は「演算能力による暗号解読」です。
・C「通信の傍受」: 量子コンピュータは暗号を「解読」しますが、傍受（intercept）は量子コンピュータに固有の機能ではありません。
・D「RSA は代替を前提に設計された」: 本文に記述なし。`,
      },
      {
        questionText:
          "What strategy does the passage describe as 'harvest now, decrypt later'?",
        options: [
          "A quantum computing technique that breaks encryption in real time using harvested processing power.",
          "A cybersecurity defense strategy that stores decryption keys separately from encrypted data.",
          "Collecting currently encrypted data to decrypt it in the future when quantum hardware becomes capable.",
          "A method for gradually upgrading encryption standards before quantum computers become operational.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：専門用語の定義把握】
正解は C。第2段落末文のダッシュ以降が定義です。

"nation-state adversaries may already be harvesting encrypted data with the intention of decrypting it once quantum hardware matures — a strategy known as 'harvest now, decrypt later.'"

・harvest（収集）: 今すぐ暗号化データを大量収集
・decrypt later（後で解読）: 量子コンピュータが成熟してから解読する
→ C「現在は解読できない暗号化データを収集し、将来量子ハードウェアが十分になった時点で解読する」が正確です。

【引っかけ分析】
・A「リアルタイムでの暗号解読」: 本文はまだそれが実現していないからこそ「後で（later）」解読する戦略が存在すると述べています。
・B「復号鍵を別保管するセキュリティ防御」: これは攻撃者の戦略ではなく、防御戦略の説明です。
・D「段階的な暗号規格のアップグレード」: これは第3段落で述べられる対応（NIST標準化）に近いですが、"harvest now, decrypt later" の定義ではありません。

【語彙ポイント】
・"adversaries"（敵対者・敵国）: nation-state adversaries = 国家レベルの敵対的行為者（他国の情報機関等）。
・"matures"（成熟する）: テクノロジーが十分に発展・実用化されること。`,
      },
      {
        questionText:
          "What was the purpose of the standards finalized by NIST in 2024, as described in the passage?",
        options: [
          "To prohibit the development of quantum computers until existing encryption is replaced.",
          "To provide cryptographic algorithms that can resist attacks from quantum computers.",
          "To establish international treaties preventing nation-states from developing quantum hardware.",
          "To fund research into quantum error correction to make quantum computers more reliable.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

"the National Institute of Standards and Technology finalized the first set of post-quantum cryptographic standards in 2024, providing governments and corporations with algorithms designed to withstand attacks from both classical and quantum computers."

・post-quantum cryptographic standards（耐量子暗号標準）
・"algorithms designed to withstand attacks from both classical and quantum computers"（古典コンピュータと量子コンピュータの両方からの攻撃に耐えるアルゴリズム）

→ B が正確な言い換えです。

【引っかけ分析】
・A「量子コンピュータの開発禁止」: NIST は禁止規制ではなく、新しい暗号標準を提供しました。
・C「国際条約の締結」: NIST はアメリカ国内の標準化機関であり、国際条約の締結機関ではありません。
・D「量子エラー訂正の研究助成」: 本文は「暗号アルゴリズムの標準化」に関する内容であり、量子コンピュータの技術改良への助成ではありません。

【語彙ポイント】
・"post-quantum"（耐量子・ポスト量子）: 量子コンピュータの攻撃に耐えられるよう設計された暗号技術を指す。
・"withstand"（〜に耐える）: 強い攻撃・圧力に対して持ちこたえること。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-6: 国公立大 / デフォルトモードネットワークと創造性 / 約175語 / 75秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "default-mode-network-creativity",
    title: "The Default Mode Network and the Neuroscience of Creative Insight",
    level: "NATIONAL_UNI",
    timeLimit: 75,
    tags: ["論説文", "脳科学・創造性", "国公立大", "約175語", "無生物主語"],
    passage: `The default mode network (DMN) is a set of interconnected brain regions that exhibit paradoxical activation during periods of apparent cognitive rest — when individuals are not engaged in externally directed tasks. Far from representing mere neural idling, activity in the DMN has been linked to a constellation of higher-order mental functions, including self-referential thought, prospective memory, social cognition, and the incubation of creative insight.

What neuroscientists find particularly intriguing is the competitive relationship between the DMN and the frontoparietal control network, which governs deliberate, analytical thought. In most cognitively demanding tasks, activation of one network correlates with suppression of the other. Highly creative individuals, however, demonstrate an unusual capacity to engage both networks simultaneously — a neural signature that may underlie the ability to hold divergent ideas in suspension while evaluating them with analytical precision.

This finding challenges the folk belief that creativity is purely an unconscious, spontaneous phenomenon, suggesting instead that it emerges from a dynamic interplay between spontaneous ideation and disciplined cognitive control.`,

    questions: [
      {
        questionText:
          "What is described as 'paradoxical' about the default mode network's activation pattern?",
        options: [
          "It becomes active during sleep but shuts down when the individual is awake.",
          "It activates during rest, when one might expect brain activity to be minimal.",
          "It simultaneously activates and suppresses other neural networks without warning.",
          "It is only active in individuals who score highly on standardized creativity tests.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と語彙解析】
正解は B。第1段落第1文の構造を正確に読む問題です。

"a set of interconnected brain regions that exhibit paradoxical activation during periods of apparent cognitive rest"

「逆説的な活性化（paradoxical activation）」= 「見かけ上の認知的休息期間中（during periods of apparent cognitive rest）」に活発になること。

→ 「何もしていない時に活発になる」は直感に反する（paradoxical = 逆説的）。B が正確です。

【引っかけ分析】
・A「睡眠中と覚醒時の逆転」: 本文は睡眠の話ではなく、「外部タスクに従事していない時」について述べています。
・C「無警告で他のネットワークを活性化・抑制」: 本文は "competitive relationship"（競合関係）を述べていますが、「無警告」ではありません。
・D「創造性テスト高得点者のみ」: 本文には学習者のスコアによる限定はありません。

【語彙ポイント】
・"paradoxical"（逆説的な）: 直感や常識に反しているが実は真実である性質。
・"apparent"（見かけ上の）: 実際には違うかもしれないが表面上はそう見える、という含意。
・"far from"（〜どころか）: "Far from representing mere neural idling" = 「単なる神経の怠慢などでは全くない」。強い否定。`,
      },
      {
        questionText:
          "What distinguishes highly creative individuals neurologically, according to the passage?",
        options: [
          "Their DMN is consistently more active than average even during demanding analytical tasks.",
          "Their frontoparietal control network completely suppresses the DMN to enhance focus.",
          "They can activate both the DMN and the analytical network at the same time.",
          "They switch rapidly between the DMN and the frontoparietal network rather than using both.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第3文が根拠です。

通常の状態: "activation of one network correlates with suppression of the other"（一方が活性化すると他方が抑制される）

創造的な人の特徴: "Highly creative individuals, however, demonstrate an unusual capacity to engage both networks simultaneously"
（ただし、高度に創造的な個人は、両方のネットワークを同時に活動させる異常な能力を示す。）

→ C「両方のネットワークを同時に活性化できる」が正確です。

【対比構造の把握】
対比の接続詞 "however" に着目することが重要。
「通常は一方が活性化すると他方が抑制される（競合関係）」vs「創造的個人は両方同時に活性化できる（同時活性化）」

【引っかけ分析】
・A「要求の高い課題中でもDMNがより活発」: "simultaneously" が重要で、両方同時というのが特徴であり、DMNのみが優位というわけではありません。
・B「前頭頭頂制御ネットワークがDMNを完全に抑制」: これは「通常の人」のパターンに近い説明です。
・D「素早い切り替え（ではなく同時使用）」: 本文は "simultaneously"（同時に）と明示しており、交互切り替えではありません。`,
      },
      {
        questionText:
          "What conventional belief about creativity does the passage's final paragraph challenge?",
        options: [
          "That creative individuals have structurally different brains from non-creative individuals.",
          "That creativity requires both emotional and intellectual forms of intelligence.",
          "That creativity is an entirely spontaneous, unconscious process.",
          "That the DMN plays no role in analytical or deliberate thinking.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。最終段落が直接の根拠です。

"This finding challenges the folk belief that creativity is purely an unconscious, spontaneous phenomenon, suggesting instead that it emerges from a dynamic interplay between spontaneous ideation and disciplined cognitive control."

【内容の整理】
否定される通念（folk belief）: 創造性は「純粋に無意識の・自発的な現象」
代わりに提示される見解: 「自発的な発想」と「規律ある認知制御」の動的な相互作用から生まれる

→ C「創造性は全くもって自発的・無意識のプロセスである」という通念への挑戦。

【語彙ポイント】
・"folk belief"（民間信仰・通俗的信念）: 科学的根拠のない一般の人々の思い込み。
・"interplay"（相互作用）: 二つの力や要素が互いに影響し合うこと。
・"disciplined cognitive control"（規律ある認知制御）: 意識的・分析的な思考プロセスを指す。

【引っかけ分析】
・A「脳の構造的差異」: 本文は機能的な活性化パターンの違いを述べており、構造的差異（structural difference）の主張ではありません。
・B「感情知性と知的知性の両方が必要」: 本文に記述なし。
・D「DMNは分析的思考に役割を果たさない」: 本文は DMN が創造性に関与することを示しており、分析的ネットワークとの「相互作用」の重要性を述べています。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-7: 共通テスト / 腸内フローラと精神健康 / 約145語 / 60秒
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "gut-brain-microbiome",
    title: "The Gut-Brain Axis: Microbiome and Mental Health",
    level: "COMMON_TEST",
    timeLimit: 60,
    tags: ["論説文", "腸内細菌・脳科学", "共通テスト", "約145語"],
    passage: `The gut-brain axis refers to the bidirectional communication network connecting the gastrointestinal system and the central nervous system. The gut contains approximately 100 million neurons — more than the spinal cord — and hosts trillions of microorganisms collectively known as the gut microbiome. Emerging research suggests that this microbial community exerts a significant influence on brain function, mood regulation, and cognitive performance, primarily through the production of neurotransmitter precursors, short-chain fatty acids, and immune signaling molecules.

Studies in both animal models and human participants have found correlations between alterations in gut microbiome composition and conditions such as depression, anxiety, and neurodegenerative diseases. While the causal mechanisms remain incompletely understood, clinical trials investigating probiotic and dietary interventions as supplementary treatments for psychiatric conditions are currently underway in multiple countries, suggesting that the relationship between gut health and mental health is now considered a legitimate frontier of biomedical research.`,

    questions: [
      {
        questionText:
          "What does the passage say the gut microbiome primarily influences?",
        options: [
          "The physical structure of the spinal cord and peripheral nervous system.",
          "Brain function, mood regulation, and cognitive performance.",
          "The production of digestive enzymes and gastrointestinal motility.",
          "The speed at which neurons transmit signals in the central nervous system.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第3文が直接の根拠です。

"Emerging research suggests that this microbial community exerts a significant influence on brain function, mood regulation, and cognitive performance"

・brain function（脳機能）
・mood regulation（気分調節）
・cognitive performance（認知パフォーマンス）

→ B がこれらを正確にまとめています。

【引っかけ分析】
・A「脊髄と末梢神経系の物理的構造」: 本文は "100 million neurons — more than the spinal cord" と比較のために脊髄を言及しているだけで、腸内細菌が脊髄構造に影響を与えるとは述べていません。
・C「消化酵素の産生と腸の運動」: これは腸の機能ですが、本文が強調するのは「脳・精神への影響」です。
・D「神経伝達速度」: 本文は "neurotransmitter precursors（神経伝達物質前駆体）の産生" を通じた影響を述べており、直接の信号速度への言及はありません。

【語彙ポイント】
・"bidirectional"（双方向の）: "bi-"（二）+ "directional"（方向の）。腸から脳へ、脳から腸への双方向通信。
・"exerts a significant influence on"（〜に大きな影響を及ぼす）: "exert influence" は重要な動詞句。`,
      },
      {
        questionText:
          "Through what mechanisms does the gut microbiome primarily communicate with the brain, according to the passage?",
        options: [
          "By directly controlling synaptic connections within the cerebral cortex.",
          "By altering the electrical activity of vagal nerve fibers in real time.",
          "Through neurotransmitter precursors, short-chain fatty acids, and immune signaling molecules.",
          "Through hormonal signals produced exclusively during the digestive process.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第3文の後半が根拠です。

"primarily through the production of neurotransmitter precursors, short-chain fatty acids, and immune signaling molecules"

3つのメカニズム：
1. neurotransmitter precursors（神経伝達物質前駆体）
2. short-chain fatty acids（短鎖脂肪酸）
3. immune signaling molecules（免疫シグナル分子）

→ C が本文の3項目を正確に言い換えています。

【語彙ポイント】
・"precursor"（前駆体）: ある物質が産生される前の段階の物質。"precursor"（先行者・前身）の化学用語。
・"short-chain fatty acids"（短鎖脂肪酸）: 腸内細菌が食物繊維を発酵させて産生する物質で、腸と脳の健康に関与する。

【引っかけ分析】
・A「大脳皮質のシナプス結合を直接制御」: 本文に記述なし。腸内細菌が直接シナプスを操作するわけではありません。
・B「迷走神経の電気活動の変化」: 迷走神経は腸脳軸の重要な経路ですが、本文では言及されていません。本文に存在しない情報による引っかけ。
・D「消化過程中のホルモンシグナル（のみ）」: 本文は3種類の産生物を列挙しており、ホルモンに限定した記述ではありません。`,
      },
      {
        questionText:
          "What does the passage suggest about the current status of research into gut health and mental health?",
        options: [
          "Researchers have conclusively established that improving the gut microbiome cures psychiatric disorders.",
          "The field is still in its early stages, with causal mechanisms unclear and clinical trials ongoing.",
          "Studies in animal models have consistently failed to show any connection to human mental health.",
          "The relationship between gut and brain health has been dismissed by mainstream psychiatry.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と全体まとめ】
正解は B。第2段落全体から複合的に判断する問題です。

根拠①: "While the causal mechanisms remain incompletely understood"（因果メカニズムはまだ完全には解明されていない）
根拠②: "clinical trials ... are currently underway"（臨床試験が現在進行中）
根拠③: "the relationship between gut health and mental health is now considered a legitimate frontier of biomedical research"（正当な研究領域として認識されている）

→ B「因果関係はまだ不明確で、臨床試験が進行中の発展途上の分野」が現状を正確に表現しています。

【引っかけ分析】
・A「腸内細菌の改善が精神疾患を治癒する（conclusively established）」: 本文は因果メカニズムが "incompletely understood"（不完全な理解）と述べており、"conclusively established"（確実に確立された）とは逆です。
・C「動物実験では一貫して関連なし」: 本文は "Studies in both animal models and human participants have found correlations"（相関が発見された）と述べており、逆です。
・D「主流精神医学が否定」: 本文は "legitimate frontier"（正当な研究領域）として認識されていると述べており、逆です。

【重要表現】
・"while the causal mechanisms remain incompletely understood": 譲歩構文。「〜であるが」という前置きで研究の限界を認めつつも、次の主張（臨床試験が進行中）に繋げます。`,
      },
    ],
  },
];
