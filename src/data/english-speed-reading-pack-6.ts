import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_6: SpeedReadingProblem[] = [
  // P6-1: 共通テスト / ボランティア観光と倫理 / 約136語 / 56秒
  {
    id: "voluntourism-ethics",
    title: "Voluntourism: Good Intentions and Unintended Consequences",
    level: "COMMON_TEST",
    timeLimit: 56,
    tags: ["論説文", "観光・倫理", "共通テスト", "約136語"],
    passage: `Voluntourism — the combination of volunteer work and tourism — has grown into a multi-billion-dollar industry. Participants pay to travel abroad and contribute labour to community projects: building schools, teaching English, or caring for orphaned children. The appeal is clear: travellers feel they are making a positive difference while experiencing a foreign culture.

Critics, however, argue that voluntourism often causes more harm than good. Unskilled volunteers may perform construction work of poor quality that local tradespeople must later repair. Short-term educational volunteers disrupt children's learning continuity. Most damagingly, orphanage tourism has been linked to child exploitation, with some institutions artificially inflating the number of "orphans" to attract paying visitors, when in reality the children have living parents who placed them there for the economic opportunity.

Ethical travel organisations now advocate choosing programmes that require relevant skills, commit to longer stays, and transfer capacity to local communities rather than replacing their labour.`,
    questions: [
      {
        questionText: "What is one criticism the passage makes of short-term voluntourism programmes?",
        options: [
          "They are too expensive for most travellers and only benefit wealthy tour operators.",
          "Unskilled volunteers may produce poor-quality work that local people must fix afterwards.",
          "They prevent local governments from investing in community infrastructure.",
          "Volunteers are exploited by being required to work without adequate rest.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"Unskilled volunteers may perform construction work of poor quality that local tradespeople must later repair."
（未熟練のボランティアが質の低い建設作業を行い、地元の職人が後に修理しなければならない）

→ B「未熟練ボランティアが質の低い仕事をし、地元の人が修理しなければならない」が正確です。`,
      },
      {
        questionText: "What harmful practice involving orphanages does the passage describe?",
        options: [
          "Orphanages charge volunteers excessive fees, most of which go to international agencies.",
          "Some orphanages recruit children from distant villages who have no connection to the local community.",
          "Some institutions inflate their number of 'orphans' to attract tourists, even though the children have living parents.",
          "Volunteer work in orphanages is used as a cover for illegal adoption networks.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"some institutions artificially inflating the number of 'orphans' to attract paying visitors, when in reality the children have living parents who placed them there for the economic opportunity"
（一部の施設が、経済的機会のために親に預けられた子どもたちを『孤児』の数として水増しし、訪問者を引き付けている）

→ C が正確な言い換えです。`,
      },
      {
        questionText: "What does the passage suggest makes a voluntourism programme more ethical?",
        options: [
          "Programmes that focus on building schools rather than caring for children.",
          "Programmes that require relevant skills, longer stays, and empower local communities.",
          "Programmes run entirely by local NGOs without any international involvement.",
          "Programmes that provide financial compensation to volunteers for their work.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

"choosing programmes that require relevant skills, commit to longer stays, and transfer capacity to local communities rather than replacing their labour"
（関連スキルを必要とし、長期滞在を約束し、労働を代替するのではなくコミュニティの能力を移転するプログラム）

→ B が3要素を正確にまとめています。`,
      },
    ],
  },

  // P6-2: 国公立大 / 神経可塑性と学習 / 約176語 / 74秒
  {
    id: "neuroplasticity-learning",
    title: "Neuroplasticity, Deliberate Practice, and the Architecture of Expertise",
    level: "NATIONAL_UNI",
    timeLimit: 74,
    tags: ["論説文", "神経科学・学習", "国公立大", "約176語"],
    passage: `The concept of neuroplasticity — the brain's capacity to reorganize its neural architecture in response to experience — has fundamentally altered how cognitive scientists understand skill acquisition and expertise. The popular notion that the brain becomes essentially fixed at some point during early adolescence has been decisively refuted; neuroimaging studies demonstrate structural and functional changes in adult brains in response to sustained, effortful learning.

Research by K. Anders Ericsson and colleagues into expert performers — musicians, chess grandmasters, athletes, surgeons — revealed that elite expertise is less the product of innate talent than of what Ericsson termed "deliberate practice": training that is specifically designed to target and remediate performance weaknesses, operates at the boundary of current competence, and incorporates immediate, accurate feedback. Unlike routine practice, which reinforces existing habits, deliberate practice demands constant cognitive effort and is typically experienced as demanding and even unpleasant.

The neurological mechanism underlying these improvements is the strengthening and pruning of synaptic connections in response to repetitive, attentive activation — a process that physically reshapes the cortical representations associated with the practised skill.`,
    questions: [
      {
        questionText: "What misconception about brain development does the passage say has been refuted?",
        options: [
          "That neuroplasticity is the primary cause of most learning disabilities.",
          "That adults can learn new skills more efficiently than children.",
          "That the brain becomes essentially fixed during early adolescence.",
          "That expert performance is entirely the result of deliberate practice rather than genetics.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第2文が根拠です。

"The popular notion that the brain becomes essentially fixed at some point during early adolescence has been decisively refuted"
（青年期初期のある時点で脳が本質的に固定されるという通説は決定的に否定された）

→ C「脳は青年期初期に本質的に固定されるという誤解」が正確です。

【語彙ポイント】
・"decisively refuted"（決定的に否定された）: 十分な証拠によって反証された。`,
      },
      {
        questionText: "According to the passage, what distinguishes 'deliberate practice' from routine practice?",
        options: [
          "Deliberate practice is performed with a coach, while routine practice is self-directed.",
          "Deliberate practice specifically targets weaknesses, operates at the edge of competence, and uses accurate feedback.",
          "Deliberate practice involves longer hours, while routine practice is more intense but shorter.",
          "Deliberate practice only applies to physical skills, while routine practice covers cognitive ones.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「意図的練習（deliberate practice）」の3要件：
①「パフォーマンスの弱点を特定して改善するよう設計されている（designed to target and remediate performance weaknesses）」
②「現在の能力の限界で機能する（operates at the boundary of current competence）」
③「即時かつ正確なフィードバックを組み込む（incorporates immediate, accurate feedback）」

→ B が正確にまとめています。`,
      },
      {
        questionText: "What neurological process does the passage say underlies skill improvement from deliberate practice?",
        options: [
          "The growth of entirely new brain regions dedicated to the practised skill.",
          "The release of dopamine, which reinforces successful practice behaviours.",
          "The strengthening and pruning of synaptic connections through repetitive, attentive activation.",
          "The transfer of skill representations from the hippocampus to the prefrontal cortex.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"The neurological mechanism ... is the strengthening and pruning of synaptic connections in response to repetitive, attentive activation"
（神経学的メカニズムは、反復的かつ注意深い活性化に応じたシナプス結合の強化と刈り込み）

→ C が正確な言い換えです。

【語彙ポイント】
・"synaptic connections"（シナプス結合）: ニューロン間の接合点。強化されると情報伝達が速く・効率的になる。
・"pruning"（刈り込み）: 使われていない神経回路を除去する過程。`,
      },
    ],
  },

  // P6-3: 私立大 / 合成生物学の展望と倫理 / 約162語 / 67秒
  {
    id: "synthetic-biology-ethics",
    title: "Synthetic Biology: Engineering Life and the Ethics of Creation",
    level: "PRIVATE_UNI",
    timeLimit: 67,
    tags: ["論説文", "生命科学・倫理", "私立大", "約162語"],
    passage: `Synthetic biology — the engineering of biological systems with novel functions by designing or redesigning DNA sequences — represents one of the most transformative and ethically contested frontiers in contemporary science. Its applications range from programming bacteria to produce pharmaceutical compounds and biofuels to engineering organisms capable of degrading environmental pollutants. The convergence of falling DNA synthesis costs and increasingly accessible gene-editing tools such as CRISPR-Cas9 has dramatically lowered the barriers to entry for both research institutions and, concerning to many biosecurity experts, bad actors.

The dual-use dilemma is particularly acute in synthetic biology. The same techniques enabling researchers to develop vaccines against emerging pathogens can theoretically be applied to engineer more transmissible or lethal variants. Governance frameworks — including the Biological Weapons Convention and institutional biosafety committees — were designed for a research landscape with high barriers to dangerous experiments, and may be inadequate for an era in which desktop DNA synthesisers enable a much broader range of actors to conduct complex biological engineering.`,
    questions: [
      {
        questionText: "What concern do biosecurity experts express about synthetic biology, according to the passage?",
        options: [
          "The environmental release of engineered organisms could disrupt existing ecosystems.",
          "Falling costs and accessible tools could allow bad actors to misuse synthetic biology techniques.",
          "Patent disputes over gene-editing tools are slowing beneficial applications of synthetic biology.",
          "The technology is advancing too slowly to address urgent environmental and medical challenges.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"increasingly accessible gene-editing tools ... has dramatically lowered the barriers to entry for both research institutions and, concerning to many biosecurity experts, bad actors"
（多くのバイオセキュリティ専門家が懸念するように、悪意ある行為者にとっての参入障壁も劇的に下げた）

→ B「コストの低下とツールのアクセスしやすさが悪意ある行為者による悪用を可能にする可能性」が正確です。`,
      },
      {
        questionText: "What is the 'dual-use dilemma' as described in the passage?",
        options: [
          "The challenge of applying synthetic biology to both medicine and environmental clean-up simultaneously.",
          "The difficulty of funding both basic research and commercial applications from the same budget.",
          "The fact that techniques for beneficial purposes can theoretically be applied to create dangerous pathogens.",
          "The conflict between international research collaboration and national security restrictions on sharing data.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第2文が根拠です。

"The same techniques enabling researchers to develop vaccines against emerging pathogens can theoretically be applied to engineer more transmissible or lethal variants."
（新興病原体に対するワクチン開発を可能にする同じ技術が、理論的により感染力や致死性の高い変異体の設計に応用できる）

→ C「有益な目的の技術が理論的に危険な病原体の作成に応用できるという事実」が正確です。`,
      },
      {
        questionText: "What limitation of current biosecurity governance does the passage identify?",
        options: [
          "Existing treaties ban all forms of biological engineering, making legitimate research legally uncertain.",
          "Governance bodies lack scientists with sufficient technical expertise to evaluate risks.",
          "Frameworks designed for high-barrier research may be insufficient now that desktop tools enable wider access.",
          "International disagreements have prevented any binding biosecurity agreements from being adopted.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"Governance frameworks ... were designed for a research landscape with high barriers to dangerous experiments, and may be inadequate for an era in which desktop DNA synthesisers enable a much broader range of actors to conduct complex biological engineering."
（ガバナンス枠組みは危険な実験への高い障壁を前提に設計されており、デスクトップDNA合成機がより広い範囲の行為者に複雑な生物工学を可能にする時代には不十分かもしれない）

→ C が正確な言い換えです。`,
      },
    ],
  },

  // P6-4: 共通テスト / ゲーミフィケーションと学習 / 約138語 / 57秒
  {
    id: "gamification-education",
    title: "Gamification in Education: Motivation, Engagement, and Learning Outcomes",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "教育テクノロジー", "共通テスト", "約138語"],
    passage: `Gamification — the application of game-design elements such as points, badges, leaderboards, and progress bars to non-game contexts — has been widely adopted in educational software and classroom management systems. Proponents argue that these elements tap into the brain's reward pathways, sustaining student motivation through immediate positive feedback and visible progress indicators.

Research findings are, however, mixed. Studies suggest that gamification effectively increases short-term engagement and task completion rates, particularly for repetitive or procedural learning objectives. The long-term picture is less encouraging: some research indicates that extrinsic rewards can undermine intrinsic motivation — a phenomenon known as the "overjustification effect." Students who initially enjoy an activity may become less interested in it once rewards are introduced, because the activity is now perceived as work performed for external compensation rather than intrinsic satisfaction.

Effective educational gamification, researchers suggest, should emphasise mastery, autonomy, and meaningful narrative rather than competitive point-scoring alone.`,
    questions: [
      {
        questionText: "What do proponents argue is the mechanism by which gamification motivates students?",
        options: [
          "It creates social pressure through leaderboards, encouraging students to compete with peers.",
          "It taps into the brain's reward pathways using immediate feedback and visible progress.",
          "It reduces the need for teacher instruction by allowing students to learn independently.",
          "It makes learning more affordable by replacing expensive textbooks with digital tools.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"these elements tap into the brain's reward pathways, sustaining student motivation through immediate positive feedback and visible progress indicators"
（これらの要素が脳の報酬経路を刺激し、即時のポジティブなフィードバックと可視化された進捗指標を通じて生徒のモチベーションを維持する）

→ B が正確な言い換えです。`,
      },
      {
        questionText: "What is the 'overjustification effect' as described in the passage?",
        options: [
          "The tendency for students to spend too much time on games instead of their core studies.",
          "A situation in which external rewards undermine intrinsic motivation for an activity.",
          "The cognitive overload caused by too many simultaneous reward signals in gamified systems.",
          "The tendency of teachers to rely too heavily on gamification instead of direct instruction.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第2〜3文が根拠です。

"extrinsic rewards can undermine intrinsic motivation — a phenomenon known as the 'overjustification effect.' Students who initially enjoy an activity may become less interested in it once rewards are introduced, because the activity is now perceived as work performed for external compensation rather than intrinsic satisfaction."

定義：外的報酬が内発的動機を損なう現象。報酬が導入されると、活動が「内的満足のため」ではなく「外的報酬のために行う仕事」と認識されるようになるため。

→ B が正確な言い換えです。`,
      },
      {
        questionText: "What approach to gamification do researchers recommend for better educational outcomes?",
        options: [
          "Removing all competitive elements and replacing them with purely cooperative challenges.",
          "Using gamification only for physical education and not for academic subjects.",
          "Emphasising mastery, autonomy, and meaningful narrative rather than competitive scoring.",
          "Limiting gamification to students under the age of ten, when intrinsic motivation is highest.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"Effective educational gamification ... should emphasise mastery, autonomy, and meaningful narrative rather than competitive point-scoring alone."
（効果的な教育ゲーミフィケーションは、競争的なポイント獲得だけでなく、習熟・自律性・意味のある物語を重視すべき）

3つの要素：①mastery（習熟）②autonomy（自律性）③meaningful narrative（意味のある物語）

→ C が正確です。`,
      },
    ],
  },

  // P6-5: 国公立大 / 機械翻訳の限界 / 約180語 / 75秒
  {
    id: "machine-translation-limits",
    title: "Machine Translation, Cultural Nuance, and the Irreducible Role of Human Translators",
    level: "NATIONAL_UNI",
    timeLimit: 75,
    tags: ["論説文", "AI・言語学", "国公立大", "約180語"],
    passage: `Neural machine translation systems have achieved remarkable accuracy on standard benchmarks, and for many routine communicative tasks — extracting information from a foreign-language document, navigating a foreign city, or conducting simple transactional exchanges — they perform adequately. The question of whether they can fully replace human translators in high-stakes contexts, however, remains deeply contested.

Language does not merely encode propositional content; it encodes cultural presuppositions, pragmatic implications, register distinctions, and ideological framings that require not only linguistic competence but deep cultural knowledge to render accurately. Legal translation, for instance, involves not just linguistic equivalence but navigating the conceptual architectures of different legal systems, where terms like "good faith" or "reasonable person" carry jurisdiction-specific semantic loads that machine translation systems are not equipped to handle. Literary translation further requires the reproduction of aesthetic qualities — rhythm, ambiguity, intertextual allusion — that current models cannot reliably generate.

The more measured consensus among translation scholars is that neural machine translation is transforming the profession rather than eliminating it: human translators are increasingly engaged in post-editing machine output and in high-value tasks where cultural and contextual sensitivity is paramount.`,
    questions: [
      {
        questionText: "For what kinds of tasks does the passage say machine translation performs adequately?",
        options: [
          "Literary translation and legal document review in international courts.",
          "Routine communicative tasks such as extracting information or simple transactional exchanges.",
          "Simultaneous interpretation at international political summits.",
          "Medical translation requiring precise terminology in patient consent forms.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

"for many routine communicative tasks — extracting information from a foreign-language document, navigating a foreign city, or conducting simple transactional exchanges — they perform adequately"
（多くの日常的なコミュニケーションタスク — 外国語文書からの情報抽出、外国の都市でのナビゲーション、単純な取引的やり取りの実施 — において適切に機能する）

→ B が正確な言い換えです。`,
      },
      {
        questionText: "Why does the passage suggest machine translation struggles with legal texts?",
        options: [
          "Legal documents contain too many technical terms for neural networks to process accurately.",
          "Legal translation requires navigating different legal systems where key terms carry jurisdiction-specific meanings.",
          "Machine translation systems are not yet able to handle documents longer than a few hundred words.",
          "Legal translation requires confidentiality that machine translation systems cannot guarantee.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"Legal translation ... involves not just linguistic equivalence but navigating the conceptual architectures of different legal systems, where terms like 'good faith' or 'reasonable person' carry jurisdiction-specific semantic loads that machine translation systems are not equipped to handle."
（法律翻訳は言語的等価性だけでなく、異なる法体系の概念的構造のナビゲートを含む。「誠実義務」や「合理的人」といった用語は法域固有の意味的重みを持つ）

→ B が正確な言い換えです。`,
      },
      {
        questionText: "What does the passage suggest is the current relationship between machine translation and human translators?",
        options: [
          "Machine translation is rapidly making the translation profession obsolete.",
          "Human translators refuse to use machine translation tools due to quality concerns.",
          "Machine translation is transforming the profession, with humans focused on editing output and high-value tasks.",
          "Human translators are more in demand than ever because machine translation has increased awareness of translation needs.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"neural machine translation is transforming the profession rather than eliminating it: human translators are increasingly engaged in post-editing machine output and in high-value tasks where cultural and contextual sensitivity is paramount."
（職業を排除するのではなく変革している。人間の翻訳者はマシン出力の後編集と、文化・文脈的感度が最重要な高付加価値タスクに従事するようになっている）

→ C が正確な言い換えです。`,
      },
    ],
  },

  // P6-6: 私立大 / 中央銀行デジタル通貨 / 約163語 / 68秒
  {
    id: "cbdc-central-bank",
    title: "Central Bank Digital Currencies and the Future of Monetary Systems",
    level: "PRIVATE_UNI",
    timeLimit: 68,
    tags: ["論説文", "金融・経済政策", "私立大", "約163語"],
    passage: `Central bank digital currencies (CBDCs) — digital forms of sovereign currency issued directly by a central bank — are under active development or pilot in over 130 countries, representing more than 98 percent of global GDP. Unlike cryptocurrencies such as Bitcoin, which operate on decentralised blockchains outside governmental control, CBDCs are issued by and remain the liability of the state, functioning as a digital equivalent of physical banknotes.

Proponents argue that CBDCs offer significant efficiency gains: faster and cheaper cross-border payments, greater financial inclusion for the unbanked population, and enhanced ability for governments to implement targeted fiscal policy — for example, issuing stimulus payments that can only be spent in specific sectors or within a defined time window. Privacy advocates and civil libertarians counter that a CBDC infrastructure could enable unprecedented government surveillance of individual financial transactions, and that programmable money conferring the ability to restrict spending represents a fundamental threat to economic autonomy.

The design choices embedded in any CBDC — regarding anonymity, programmability, and access — will ultimately determine whether they enhance or undermine individual financial freedom.`,
    questions: [
      {
        questionText: "How does the passage distinguish CBDCs from cryptocurrencies like Bitcoin?",
        options: [
          "CBDCs use more advanced encryption technology, making them more secure than Bitcoin.",
          "CBDCs are issued by central banks and remain state liabilities, unlike decentralised cryptocurrencies.",
          "CBDCs can be exchanged for physical cash, while Bitcoin has no equivalent in paper currency.",
          "CBDCs are designed for international use, while cryptocurrencies are limited to domestic transactions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比問題】
正解は B。第1段落第2文が根拠です。

暗号通貨（Bitcoin）: "operate on decentralised blockchains outside governmental control"（政府管理外の分散型ブロックチェーン）
CBDC: "issued by and remain the liability of the state, functioning as a digital equivalent of physical banknotes"（国家が発行し、国家の負債として残る）

→ B が正確な対比を表現しています。`,
      },
      {
        questionText: "What is one advantage of CBDCs that proponents highlight?",
        options: [
          "They would eliminate the need for commercial banks, reducing fees for consumers.",
          "They allow targeted fiscal policy, such as stimulus payments restricted to certain sectors or timeframes.",
          "They provide complete anonymity for users, protecting financial privacy from government surveillance.",
          "They would automatically adjust interest rates in response to economic conditions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

賛成派が挙げる利点の例：
"issuing stimulus payments that can only be spent in specific sectors or within a defined time window"
（特定のセクターや一定の期間内のみ使用可能な景気刺激給付金の発行）

→ B「特定のセクターや期間に限定された景気刺激策など、ターゲットを絞った財政政策」が正確です。`,
      },
      {
        questionText: "What concern do privacy advocates raise about CBDCs?",
        options: [
          "CBDCs could be hacked by foreign governments, exposing citizens' financial data.",
          "CBDCs could enable unprecedented government surveillance of individual financial transactions.",
          "CBDCs would reduce competition in the banking sector, leading to higher fees.",
          "CBDCs might destabilise the global financial system by devaluing traditional currencies.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"a CBDC infrastructure could enable unprecedented government surveillance of individual financial transactions"
（CBDCインフラは個人の金融取引に対する前例のない政府の監視を可能にする可能性がある）

また "programmable money conferring the ability to restrict spending represents a fundamental threat to economic autonomy"（支出制限能力を付与するプログラム可能なマネーは経済的自律性への根本的な脅威）も関連します。

→ B が正確な言い換えです。`,
      },
    ],
  },

  // P6-7: 共通テスト / 睡眠不足と青少年 / 約140語 / 57秒
  {
    id: "teen-sleep-deprivation",
    title: "Adolescent Sleep Deprivation and School Start Times",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "健康・教育", "共通テスト", "約140語"],
    passage: `Adolescents require approximately eight to ten hours of sleep per night, yet surveys consistently show that the majority of teenagers in developed countries sleep significantly less. A key biological factor is the shift in circadian rhythm that occurs during puberty, causing adolescents to feel alert later in the evening and struggle to wake early in the morning — a pattern that is physiological, not behavioural.

Early school start times conflict directly with this biological reality. Research linking later school start times to improved academic performance, reduced depression rates, fewer traffic accidents involving teenage drivers, and improved physical health has accumulated over decades. The American Academy of Pediatrics, the American Medical Association, and the Centers for Disease Control have all recommended that middle and high schools start no earlier than 8:30 a.m. Despite this medical consensus, institutional inertia, transportation logistics, and extracurricular scheduling have slowed adoption widely.`,
    questions: [
      {
        questionText: "Why does the passage say adolescents find it difficult to wake up early in the morning?",
        options: [
          "Because they stay up late using electronic devices such as smartphones and computers.",
          "Because puberty causes a physiological shift in circadian rhythm that delays alertness until later.",
          "Because academic stress causes anxiety that disrupts the quality of their sleep.",
          "Because adolescents need more physical exercise to tire themselves out before bedtime.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"A key biological factor is the shift in circadian rhythm that occurs during puberty, causing adolescents to feel alert later in the evening and struggle to wake early in the morning — a pattern that is physiological, not behavioural."
（主要な生物学的要因は思春期に起こる概日リズムのシフトで、行動的ではなく生理的なパターン）

→ B「思春期による概日リズムの生理的シフトが早起きを困難にする」が正確です。`,
      },
      {
        questionText: "What benefits have been linked to later school start times, according to the passage?",
        options: [
          "Higher university entrance exam scores and improved relationships between students and teachers.",
          "Better academic performance, lower depression, fewer teenage traffic accidents, and improved physical health.",
          "Reduced smartphone use at night and higher rates of participation in school sports.",
          "Lower rates of obesity and reduced healthcare costs associated with adolescent illness.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

4つの効果：
①improved academic performance（学力向上）
②reduced depression rates（うつ病率低下）
③fewer traffic accidents involving teenage drivers（10代ドライバーの交通事故減少）
④improved physical health（身体的健康の改善）

→ B が正確にまとめています。`,
      },
      {
        questionText: "What does the passage say has prevented wider adoption of later school start times?",
        options: [
          "Opposition from parents who need early start times to coordinate with their work schedules.",
          "Insufficient research demonstrating the benefits of later start times to convince school boards.",
          "Institutional inertia, transportation logistics, and extracurricular scheduling challenges.",
          "Concerns from teachers' unions about changes to their contracted working hours.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"institutional inertia, transportation logistics, and extracurricular scheduling have slowed adoption widely"
（制度的惰性、交通の手配、課外活動のスケジュール調整が広範な採用を遅らせてきた）

→ C が正確です。

【語彙ポイント】
・"institutional inertia"（制度的惰性）: 組織や制度が変化に抵抗する傾向。`,
      },
    ],
  },

  // P6-8: 国公立大 / 行動経済学とナッジ / 約182語 / 76秒
  {
    id: "behavioural-economics-nudge",
    title: "Behavioural Economics, Choice Architecture, and the Ethics of Nudging",
    level: "NATIONAL_UNI",
    timeLimit: 76,
    tags: ["論説文", "行動経済学・倫理", "国公立大", "約182語"],
    passage: `Classical economics assumes that individuals make decisions by rationally calculating the costs and benefits of available options. Decades of experimental work by psychologists and economists — most notably Daniel Kahneman and Amos Tversky — have demonstrated that human decision-making is systematically and predictably irrational, subject to cognitive biases including loss aversion, present bias, and anchoring effects that lead people to make choices inconsistent with their own stated preferences and long-term interests.

This insight underpins the policy framework developed by Richard Thaler and Cass Sunstein, who coined the term "nudge" to describe interventions that alter the choice architecture of a decision environment to steer behaviour in a desired direction without restricting options or imposing financial incentives. Placing healthy foods at eye level in a cafeteria, automatically enrolling employees in pension schemes with an opt-out option, or setting energy-efficient appliance settings as the default are classic examples.

Critics raise two principal objections. First, nudges are paternalistic — even if they are designed to serve people's own interests, they involve manipulation of decision-making environments without full transparency. Second, determining whose definition of "better outcomes" should govern the design of nudge architecture involves value judgements that nudge theorists sometimes understate.`,
    questions: [
      {
        questionText: "What have Kahneman and Tversky's experiments demonstrated about human decision-making?",
        options: [
          "That people make rational decisions when given sufficient information and time to deliberate.",
          "That decision-making is systematically irrational, subject to predictable cognitive biases.",
          "That financial incentives are the most effective way to change human behaviour.",
          "That people generally make better decisions in groups than individually.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"human decision-making is systematically and predictably irrational, subject to cognitive biases including loss aversion, present bias, and anchoring effects"
（人間の意思決定は組織的かつ予測可能なほど非合理的で、損失回避・現在バイアス・アンカリング効果などの認知的バイアスに左右される）

→ B が正確な言い換えです。`,
      },
      {
        questionText: "According to the passage, what makes a 'nudge' different from traditional policy tools?",
        options: [
          "Nudges rely on financial penalties, while traditional tools use rewards.",
          "Nudges alter choice architecture to steer behaviour without restricting options or imposing incentives.",
          "Nudges require citizens' informed consent, while traditional policies can be implemented without consultation.",
          "Nudges target only high-income populations, while traditional policies apply universally.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「ナッジの定義」：
"interventions that alter the choice architecture of a decision environment to steer behaviour in a desired direction without restricting options or imposing financial incentives"
（選択肢を制限したり経済的インセンティブを課したりすることなく、意思決定環境の選択アーキテクチャを変更して行動を望む方向に誘導する介入）

→ B が正確な言い換えです。`,
      },
      {
        questionText: "What are the two main criticisms of nudges that the passage outlines?",
        options: [
          "They are too expensive to implement and their effects wear off quickly over time.",
          "They are paternalistic manipulations and involve contested value judgements about what counts as better outcomes.",
          "They only work for educated populations and have no effect on people with low financial literacy.",
          "They violate antitrust law by favouring certain commercial products over others.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

2つの批判：
①「ナッジは家父長主義的（paternalistic）— 透明性なしに意思決定環境を操作する」
②「どの定義の『良い結果』がナッジアーキテクチャの設計を規定すべきかは価値判断を含む（value judgements）」

→ B が正確にまとめています。

【語彙ポイント】
・"paternalistic"（家父長主義的な）: 当人の意思よりも「良いとされること」を強制・誘導する態度。`,
      },
    ],
  },

  // P6-9: 私立大 / 感情労働と職場のウェルビーイング / 約162語 / 67秒
  {
    id: "emotional-labour-wellbeing",
    title: "Emotional Labour, Surface Acting, and Occupational Burnout",
    level: "PRIVATE_UNI",
    timeLimit: 67,
    tags: ["論説文", "心理・労働", "私立大", "約162語"],
    passage: `Sociologist Arlie Hochschild introduced the concept of "emotional labour" to describe the work of managing one's emotional expressions to fulfil job requirements — a demand particularly prevalent in service, healthcare, and educational occupations where workers are expected to project warmth, patience, and enthusiasm regardless of their actual emotional state.

Hochschild distinguished between surface acting — suppressing or faking emotions to display the expected external presentation — and deep acting, in which workers genuinely modify their internal emotional state to align with the required display. Psychological research consistently demonstrates that surface acting is associated with significantly higher rates of burnout, emotional exhaustion, and depersonalisation — a state of detachment from one's work, clients, or students — compared to deep acting or authentic emotional expression.

Organisations that require sustained emotional labour from employees without providing adequate support structures — opportunities to decompress, autonomy in emotional expression, and supervisory recognition of emotional demands — face substantially higher staff turnover, absenteeism, and declining service quality as a consequence of accumulated burnout.`,
    questions: [
      {
        questionText: "How does the passage define 'surface acting'?",
        options: [
          "Genuinely modifying one's internal emotional state to align with what the job requires.",
          "Suppressing or faking emotions to display the expected external presentation.",
          "Refusing to display any emotions at work in order to maintain professional boundaries.",
          "Exaggerating emotional reactions to engage more deeply with customers or patients.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第1文が定義です。

"surface acting — suppressing or faking emotions to display the expected external presentation"
（表面的演技 — 期待される外的表示をするために感情を抑制したり偽ったりすること）

→ B が正確な言い換えです。

【対比ポイント】
"deep acting" = 内的感情状態そのものを要求に合わせて本当に変えること。
"surface acting" = 内側は変えず、外側の表現だけを変えること。`,
      },
      {
        questionText: "What does the research say about the psychological effects of surface acting?",
        options: [
          "It has no measurable psychological effects when performed for fewer than four hours per day.",
          "It leads to higher job satisfaction because workers feel professionally competent.",
          "It is associated with significantly higher burnout, exhaustion, and depersonalisation than deep acting.",
          "It protects workers from emotional contagion by creating a barrier between them and their clients.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"surface acting is associated with significantly higher rates of burnout, emotional exhaustion, and depersonalisation ... compared to deep acting or authentic emotional expression"
（表面的演技は、深い演技や真の感情表現と比べて、燃え尽き症候群・感情的疲弊・離人化の比率が著しく高い）

→ C が正確な言い換えです。`,
      },
      {
        questionText: "What consequences does the passage associate with organisations failing to support workers in emotional labour roles?",
        options: [
          "Legal liability for workplace psychological injuries and government regulatory penalties.",
          "Higher staff turnover, absenteeism, and declining service quality due to burnout.",
          "Damage to the organisation's brand reputation from negative online employee reviews.",
          "Reduced customer satisfaction scores that lead to loss of business contracts.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

"face substantially higher staff turnover, absenteeism, and declining service quality as a consequence of accumulated burnout"
（蓄積された燃え尽き症候群の結果として、スタッフの離職率、欠勤、サービスの質の低下に直面する）

→ B が正確な言い換えです。`,
      },
    ],
  },

  // P6-10: 共通テスト / 都市の緑化と熱波 / 約141語 / 57秒
  {
    id: "urban-greening-heatwave",
    title: "Urban Greening Strategies and Heat Wave Resilience",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "環境・都市計画", "共通テスト", "約141語"],
    passage: `Urban areas experience significantly higher temperatures than surrounding rural areas — a phenomenon called the urban heat island effect — due to the absorption and re-emission of solar energy by concrete and asphalt surfaces, reduced evapotranspiration from limited vegetation, and waste heat from vehicles and air conditioning units. As climate change intensifies heat wave frequency and severity, this effect poses an increasing public health threat, particularly for elderly residents and outdoor workers.

Urban greening strategies — including street tree planting, green roofs, living walls, and the expansion of urban parks — offer a range of co-benefits beyond temperature reduction. Vegetation provides shade that directly lowers surface temperatures, increases evapotranspiration that cools the surrounding air, improves air quality by absorbing pollutants, reduces stormwater runoff, and enhances residents' mental wellbeing. Cost-effectiveness analyses suggest that strategic tree planting in particular delivers high returns relative to installation and maintenance costs when the full range of ecosystem services is accounted for.`,
    questions: [
      {
        questionText: "What causes the urban heat island effect, according to the passage?",
        options: [
          "Increased electricity use during summer months generating waste heat in cities.",
          "Absorption of solar energy by concrete and asphalt, reduced vegetation, and waste heat from vehicles and cooling systems.",
          "The concentration of industrial facilities in urban areas that release heat as a by-product.",
          "Reduced rainfall in cities caused by air pollution that prevents clouds from forming.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

3つの原因：
①「コンクリートとアスファルト表面による太陽エネルギーの吸収と再放射（absorption and re-emission of solar energy by concrete and asphalt surfaces）」
②「植生の少なさによる蒸散の減少（reduced evapotranspiration from limited vegetation）」
③「車両とエアコンからの廃熱（waste heat from vehicles and air conditioning units）」

→ B が3要素を正確にまとめています。`,
      },
      {
        questionText: "Besides temperature reduction, what other benefits of urban greening does the passage mention?",
        options: [
          "Increased property values and reduced crime rates in greener neighbourhoods.",
          "Shade, air quality improvement, reduced stormwater runoff, and mental wellbeing benefits.",
          "Reduced energy bills for households adjacent to green spaces.",
          "Higher biodiversity that attracts tourism and improves the city's international reputation.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

5つの副次的便益：
①shade（日陰）→ 地表温度低下
②evapotranspiration（蒸散）→ 周辺空気の冷却
③improves air quality（大気質改善）→ 汚染物質の吸収
④reduces stormwater runoff（雨水流出削減）
⑤enhances residents' mental wellbeing（住民の精神的ウェルビーイング向上）

→ B が正確にまとめています。`,
      },
      {
        questionText: "What does the passage say about the cost-effectiveness of street tree planting?",
        options: [
          "It is the most expensive urban greening strategy but produces the greatest temperature reduction.",
          "It delivers high returns relative to costs when the full range of ecosystem services is considered.",
          "Its cost-effectiveness is difficult to measure because most benefits are qualitative rather than financial.",
          "It is only cost-effective in tropical cities where heat waves occur more than three months per year.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"strategic tree planting in particular delivers high returns relative to installation and maintenance costs when the full range of ecosystem services is accounted for"
（特に戦略的な街路樹植栽は、生態系サービスの全範囲を考慮した場合、設置・維持コストに対して高いリターンをもたらす）

→ B が正確な言い換えです。

【語彙ポイント】
・"ecosystem services"（生態系サービス）: 生態系が人間に提供する恩恵（空気浄化・洪水防止・気温調節など）。`,
      },
    ],
  },
];
