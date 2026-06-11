import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_7: SpeedReadingProblem[] = [
  // SR7-1: 共通テスト / デジタルデトックス / 約138語 / 60秒
  {
    id: "digital-detox-wellbeing",
    title: "Digital Detox: Benefits and Challenges of Disconnecting",
    level: "COMMON_TEST",
    timeLimit: 60,
    tags: ["論説文", "デジタル・ウェルビーイング", "共通テスト", "約138語"],
    passage: `Smartphones and social media platforms have transformed communication and information access, but researchers are increasingly documenting their effects on mental health. Studies suggest that heavy screen time — particularly passive scrolling through social media feeds — is correlated with higher rates of anxiety, depression, and disrupted sleep patterns among adolescents and young adults.

In response, "digital detox" programmes — periods of voluntary disconnection from digital devices — have gained popularity. Participants typically report reduced stress, improved sleep quality, and greater face-to-face social engagement during detox periods. However, critics note that these benefits often fade quickly upon reconnection, suggesting that temporary disconnection addresses symptoms rather than underlying behavioural patterns.

Researchers advocate instead for what they term "intentional use" — a deliberate, structured approach to digital media that sets clear boundaries on usage time, platform type, and context, rather than complete elimination, which is neither practical nor sustainable for most people in modern professional and social life.`,
    questions: [
      {
        questionText:
          "What does the passage say about the long-term effectiveness of digital detox?",
        options: [
          "It permanently reduces anxiety and improves mental health outcomes.",
          "Benefits tend to disappear quickly once people reconnect with digital devices.",
          "It is only effective for adolescents, not for working adults.",
          "Regular detox periods of at least one week produce lasting behavioural change.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"benefits often fade quickly upon reconnection, suggesting that temporary disconnection addresses symptoms rather than underlying behavioural patterns"
（再接続するとすぐにメリットが消えることが多く、一時的な遮断は根本的な行動パターンではなく症状に対処していることを示唆する）

→ B「再接続するとすぐにメリットが消えてしまう」が正確な言い換えです。

【語彙ポイント】
・"fade"（薄れる・消える）: 徐々に消えていく。
・"underlying"（根本にある・潜在的な）: 表面の下に隠れた。重要な語。`,
      },
      {
        questionText:
          "What alternative to digital detox do researchers recommend?",
        options: [
          "Complete elimination of all social media platforms from personal devices.",
          "A government-mandated limit on daily screen time for people under 25.",
          "Intentional use — a structured approach with clear boundaries on how digital media is used.",
          "Replacing smartphone use with other technology such as desktop computers.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"Researchers advocate instead for what they term 'intentional use' — a deliberate, structured approach to digital media that sets clear boundaries on usage time, platform type, and context"
（研究者は代わりに「意図的な使用」と呼ぶものを提唱する — 使用時間・プラットフォームの種類・文脈に明確な境界を設ける、意図的で構造化されたデジタルメディアへのアプローチ）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "According to the passage, which type of screen use is most associated with mental health problems?",
        options: [
          "Video calling with friends and family members.",
          "Using educational apps to study for examinations.",
          "Passive scrolling through social media feeds.",
          "Watching streamed films and television programmes.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第2文が根拠です。

"heavy screen time — particularly passive scrolling through social media feeds — is correlated with higher rates of anxiety, depression, and disrupted sleep patterns"
（大量のスクリーンタイム — 特にソーシャルメディアフィードのパッシブなスクロール — は不安・うつ・睡眠障害の高い発症率と相関している）

→ C「ソーシャルメディアフィードのパッシブなスクロール」が正確です。

【語彙ポイント】
・"passive scrolling"（受動的なスクロール）: 目的なく流し見ること。active な情報検索とは対照的。
・"correlated with"（〜と相関している）: 因果関係を断言せず、統計的な関連性を示す表現。`,
      },
    ],
  },

  // SR7-2: 国公立大 / サイバーセキュリティと重要インフラ / 約168語 / 60秒
  {
    id: "critical-infrastructure-cybersecurity",
    title: "Cybersecurity Threats to Critical Infrastructure: National Security Implications",
    level: "NATIONAL_UNI",
    timeLimit: 60,
    tags: ["論説文", "サイバーセキュリティ・安全保障", "国公立大", "約168語"],
    passage: `The increasing computerisation of critical infrastructure — power grids, water treatment systems, financial networks, and transportation systems — has created profound new vulnerabilities at the intersection of the physical and digital worlds. State-sponsored cyber attacks targeting these systems represent an escalating national security threat that challenges traditional concepts of deterrence, attribution, and proportionate response.

Unlike conventional military attacks, cyber operations targeting critical infrastructure can be launched from anywhere in the world, are difficult to attribute definitively to specific actors, and can produce effects ranging from data theft to catastrophic physical damage without requiring military deployment. The 2021 ransomware attack on the Colonial Pipeline — which supplies approximately 45 percent of fuel to the eastern United States — demonstrated that even economically motivated attacks, not just state-sponsored operations, can produce widespread civilian disruption.

Security experts argue that effective protection requires a combination of technical hardening of systems, mandatory information sharing between government and private sector operators of critical infrastructure, and the development of credible deterrence strategies that communicate clear consequences for attacks crossing established thresholds.`,
    questions: [
      {
        questionText:
          "What features of cyber attacks make them different from conventional military attacks, according to the passage?",
        options: [
          "They are more expensive and require larger teams of specialised personnel to execute.",
          "They can be launched from anywhere, are hard to attribute, and can cause physical damage without military deployment.",
          "They exclusively target government systems rather than civilian infrastructure.",
          "They are generally reversible and cause less long-term damage than conventional weapons.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

3つの特徴：
①"can be launched from anywhere in the world"（世界中どこからでも発動可能）
②"difficult to attribute definitively to specific actors"（特定のアクターへの帰属が困難）
③"can produce effects ... without requiring military deployment"（軍の展開なしに結果をもたらす）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What does the Colonial Pipeline example demonstrate in the context of the passage?",
        options: [
          "That governments must nationalise critical infrastructure to protect it from attack.",
          "That even profit-motivated attacks, not just state-sponsored ones, can cause widespread civilian disruption.",
          "That the United States has failed to invest adequately in cybersecurity for energy infrastructure.",
          "That cyber attacks on pipelines are the most common form of critical infrastructure attack.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"even economically motivated attacks, not just state-sponsored operations, can produce widespread civilian disruption"
（国家が支援する作戦だけでなく、経済的に動機付けられた攻撃でさえ、広範な民間の混乱をもたらす可能性がある）

→ B が正確な言い換えです。

【語彙ポイント】
・"ransomware"（ランサムウェア）: システムを暗号化し、解除の身代金を要求するマルウェア。`,
      },
      {
        questionText:
          "What three components of protection do security experts recommend?",
        options: [
          "International treaties, public awareness campaigns, and investment in military cyber units.",
          "Technical hardening, mandatory information sharing between government and private sectors, and credible deterrence strategies.",
          "Disconnecting critical infrastructure from the internet, hiring more cybersecurity professionals, and criminalising hacking.",
          "Artificial intelligence monitoring, blockchain-based data protection, and quantum encryption.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

3つの要素：
①"technical hardening of systems"（システムの技術的強化）
②"mandatory information sharing between government and private sector operators"（政府と民間部門の義務的な情報共有）
③"development of credible deterrence strategies"（信頼できる抑止戦略の開発）

→ B が正確にまとめています。`,
      },
    ],
  },

  // SR7-3: 私立大 / 科学コミュニケーションと信頼 / 約162語 / 60秒
  {
    id: "science-communication-trust",
    title: "Science Communication, Public Trust, and the Crisis of Misinformation",
    level: "PRIVATE_UNI",
    timeLimit: 60,
    tags: ["論説文", "科学コミュニケーション・信頼", "私立大", "約162語"],
    passage: `The COVID-19 pandemic exposed deep fractures in the relationship between scientific institutions and the public. Rapidly evolving guidance — on mask wearing, school closures, and vaccine efficacy — was perceived by many as evidence of scientific incompetence rather than the normal process by which scientific understanding is refined through new evidence. Social media amplified misinformation and anti-vaccination narratives at unprecedented speed, contributing to what the World Health Organization termed an "infodemic" running alongside the pandemic itself.

Science communicators and researchers now emphasise that rebuilding public trust requires more than simply correcting false information. Research in the psychology of persuasion indicates that directly contradicting deeply held beliefs often reinforces them through the "backfire effect" — a cognitive phenomenon whereby challenges to a belief paradoxically strengthen it. More effective approaches involve acknowledging legitimate concerns, communicating uncertainty honestly rather than projecting false confidence, and engaging with communities on their own terms rather than delivering information from a position of institutional authority.`,
    questions: [
      {
        questionText:
          "Why, according to the passage, did the public sometimes perceive changing COVID-19 guidance negatively?",
        options: [
          "Because governments withheld information to prevent public panic.",
          "Because it was interpreted as scientific incompetence rather than normal evidence-based revision.",
          "Because social media companies deliberately suppressed official health guidance.",
          "Because scientists disagreed publicly in ways that were unprofessional and confusing.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

"Rapidly evolving guidance ... was perceived by many as evidence of scientific incompetence rather than the normal process by which scientific understanding is refined through new evidence"
（急速に変化するガイダンスは多くの人に科学的な無能の証拠として受け取られた — 新たな証拠を通じて科学的理解が洗練される通常のプロセスとしてではなく）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What is the 'backfire effect' as described in the passage?",
        options: [
          "The tendency for misinformation to spread faster than accurate corrections on social media.",
          "A cognitive effect where directly challenging a belief paradoxically makes it stronger.",
          "The phenomenon where public health campaigns inadvertently increase the behaviour they target.",
          "The process by which scientific retractions damage public trust in science overall.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第2文が根拠です。

定義：
"a cognitive phenomenon whereby challenges to a belief paradoxically strengthen it"
（信念への挑戦が逆説的にその信念を強化する認知現象）

→ B「信念に直接挑戦すると逆説的にその信念が強まる認知効果」が正確です。

【語彙ポイント】
・"paradoxically"（逆説的に）: 予想と反対の結果が生じること。
・"reinforce"（強化する）≒ "strengthen"`,
      },
      {
        questionText:
          "What approaches does the passage describe as more effective for rebuilding public trust in science?",
        options: [
          "Simplifying scientific language and publishing research findings in popular newspapers.",
          "Acknowledging concerns, communicating uncertainty honestly, and engaging communities on their own terms.",
          "Requiring social media platforms to remove all health-related misinformation automatically.",
          "Giving scientists more frequent media opportunities to explain their research directly.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

3つのより効果的なアプローチ：
①"acknowledging legitimate concerns"（正当な懸念を認めること）
②"communicating uncertainty honestly rather than projecting false confidence"（偽の確信を示すのではなく、不確実性を正直に伝えること）
③"engaging with communities on their own terms"（コミュニティの文脈で関与すること）

→ B が正確にまとめています。`,
      },
    ],
  },

  // SR7-4: 共通テスト / ファッションと環境問題 / 約145語 / 60秒
  {
    id: "fast-fashion-environment",
    title: "Fast Fashion, Textile Waste, and the Push for Sustainable Clothing",
    level: "COMMON_TEST",
    timeLimit: 60,
    tags: ["論説文", "ファッション・環境", "共通テスト", "約145語"],
    passage: `The global fashion industry produces an estimated 92 million tonnes of textile waste annually and accounts for approximately 10 percent of global carbon emissions — more than international aviation and shipping combined. The business model of "fast fashion," characterised by extremely rapid production cycles, low prices, and the expectation that clothing will be worn only a few times before disposal, has driven a dramatic increase in clothing consumption while simultaneously degrading working conditions in manufacturing supply chains.

Consumer awareness of these environmental and social costs has prompted a growing "sustainable fashion" movement. This includes the rise of second-hand and resale platforms, rental clothing services, and consumer campaigns encouraging capsule wardrobes — small collections of high-quality, versatile items worn repeatedly. Brands are under increasing pressure from consumers and regulators to adopt more transparent supply chains and to eliminate the practice of deliberately destroying unsold inventory, which several major luxury brands have faced public criticism for.`,
    questions: [
      {
        questionText:
          "What is meant by a 'capsule wardrobe,' as described in the passage?",
        options: [
          "A wardrobe made of sustainable fabrics that decompose naturally.",
          "A small collection of high-quality, versatile clothing items worn repeatedly.",
          "A subscription service that delivers new clothing items each season.",
          "A government certification awarded to brands that meet environmental standards.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第3文が根拠です。

定義：
"capsule wardrobes — small collections of high-quality, versatile items worn repeatedly"
（カプセルワードローブ — 繰り返し着用される高品質で汎用性の高いアイテムの小さなコレクション）

→ B が定義の正確な言い換えです。

【語彙ポイント】
・"versatile"（汎用性の高い）: さまざまな場面や用途に使えること。`,
      },
      {
        questionText:
          "According to the passage, why have some major luxury brands faced criticism?",
        options: [
          "For using child labour in their overseas manufacturing facilities.",
          "For advertising campaigns that promoted unrealistic body images.",
          "For deliberately destroying unsold inventory rather than discounting or donating it.",
          "For copying designs from independent designers without paying licensing fees.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"to eliminate the practice of deliberately destroying unsold inventory, which several major luxury brands have faced public criticism for"
（売れ残った在庫を意図的に廃棄する慣行を排除するよう [圧力がある] — これはいくつかの大手ラグジュアリーブランドが公の批判を受けてきた）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "How does the fashion industry's carbon footprint compare to aviation and shipping?",
        options: [
          "It produces roughly the same emissions as aviation and shipping combined.",
          "It produces more emissions than aviation and shipping combined.",
          "It produces slightly fewer emissions than aviation but more than shipping.",
          "It produces far less emissions, making it a relatively minor environmental concern.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

"approximately 10 percent of global carbon emissions — more than international aviation and shipping combined"
（世界の炭素排出量の約10% — 国際航空と海運を合わせたより多い）

→ B「航空と海運を合わせたより多い」が正確です。`,
      },
    ],
  },

  // SR7-5: 国公立大 / 生成AIと著作権 / 約170語 / 60秒
  {
    id: "generative-ai-copyright",
    title: "Generative AI, Training Data, and the Copyright Frontier",
    level: "NATIONAL_UNI",
    timeLimit: 60,
    tags: ["論説文", "生成AI・著作権", "国公立大", "約170語"],
    passage: `Generative artificial intelligence systems — large language models, image generators, and music composition tools — are trained on datasets consisting of vast quantities of copyrighted text, images, and audio scraped from the internet, often without the knowledge or consent of rights holders. This practice has triggered a wave of litigation from authors, visual artists, musicians, and news publishers who argue that using their work to train commercial AI systems without compensation constitutes copyright infringement.

The legal questions are genuinely novel. Existing copyright frameworks were designed to regulate the reproduction, distribution, and public display of creative works — not the use of works as statistical training data to enable the generation of new content. AI developers argue that training constitutes "transformative use" under fair use doctrine and that the outputs of AI systems are sufficiently different from any individual training example to avoid infringement. Creators' groups counter that even if outputs are not directly copied, the AI system's ability to generate content in the style of specific artists effectively undermines their market position.

Courts in multiple jurisdictions are currently adjudicating these questions, and legislative solutions are under active discussion in the European Union, the United States, and Japan.`,
    questions: [
      {
        questionText:
          "What legal argument do AI developers make regarding the use of copyrighted works for training?",
        options: [
          "That copyright does not apply to digital content available freely on the internet.",
          "That training data is compiled by third parties and the AI companies themselves are not responsible.",
          "That training constitutes transformative fair use and AI outputs differ sufficiently from training examples.",
          "That creators consented implicitly by publishing their work online.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第3文が根拠です。

AI開発者側の主張（2点）：
①"training constitutes 'transformative use' under fair use doctrine"（トレーニングはフェアユースの法理の下で「変形的利用」を構成する）
②"outputs of AI systems are sufficiently different from any individual training example to avoid infringement"（AIシステムの出力は個々のトレーニング例とは十分異なる）

→ C が正確にまとめています。`,
      },
      {
        questionText:
          "What counter-argument do creators' groups make?",
        options: [
          "That AI-generated art is of inferior quality and should be labelled as such.",
          "That even if outputs are not copied, AI can replicate an artist's style and undermine their market position.",
          "That AI systems should be required to pay a flat licensing fee per training image.",
          "That AI art generators are primarily used to produce illegal or harmful content.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「クリエイター側の反論」：
"even if outputs are not directly copied, the AI system's ability to generate content in the style of specific artists effectively undermines their market position"
（出力が直接コピーされていなくても、AIシステムが特定のアーティストのスタイルでコンテンツを生成できることは彼らの市場的立場を実質的に損なう）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "Why does the passage describe the copyright questions around AI as 'genuinely novel'?",
        options: [
          "Because AI was invented so recently that no courts have yet heard relevant cases.",
          "Because existing copyright law was not designed to address the use of works as statistical training data.",
          "Because AI operates across international borders, making national copyright law unenforceable.",
          "Because AI systems generate content without any human authorship, creating ownership ambiguity.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1〜2文が根拠です。

「真に新規の問題」の理由：
"Existing copyright frameworks were designed to regulate the reproduction, distribution, and public display of creative works — not the use of works as statistical training data to enable the generation of new content."
（既存の著作権の枠組みは創作物の複製・配布・公開展示を規制するために設計されており — 新しいコンテンツ生成を可能にする統計的トレーニングデータとしての使用を規制するためではない）

→ B が正確な言い換えです。`,
      },
    ],
  },

  // SR7-6: 私立大 / 認知バイアスと意思決定 / 約160語 / 60秒
  {
    id: "cognitive-bias-decision-making",
    title: "Cognitive Biases, Heuristics, and the Limits of Rational Decision-Making",
    level: "PRIVATE_UNI",
    timeLimit: 60,
    tags: ["論説文", "認知心理学・意思決定", "私立大", "約160語"],
    passage: `Classical economic theory assumes that individuals make decisions rationally, weighing costs and benefits to maximise their utility. Behavioural economists Daniel Kahneman and Amos Tversky challenged this assumption by demonstrating through extensive experimentation that human decision-making is systematically influenced by predictable cognitive biases — mental shortcuts that often serve us well but can lead to significant errors in specific contexts.

Among the most documented is "loss aversion" — the empirically observed tendency for people to feel the pain of a loss roughly twice as intensely as they feel the pleasure of an equivalent gain. This asymmetry has wide-ranging implications: investors hold on to declining assets too long to avoid realising losses; negotiators concede too readily when framing shifts options as "avoiding losses" rather than "achieving gains"; and public health messaging that frames vaccine side effects as losses produces more hesitancy than messaging that frames vaccination as gaining protection.

Understanding these biases has given rise to "choice architecture" — the deliberate design of decision environments to steer people towards better outcomes while preserving freedom of choice.`,
    questions: [
      {
        questionText:
          "What assumption of classical economic theory did Kahneman and Tversky challenge?",
        options: [
          "That individuals always prefer more money to less money.",
          "That rational decision-making maximises utility by weighing costs and benefits.",
          "That markets are inherently efficient and self-correcting.",
          "That consumer preferences remain stable over time.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1〜2文が根拠です。

「古典的経済理論の前提」：
"Classical economic theory assumes that individuals make decisions rationally, weighing costs and benefits to maximise their utility."
（古典的経済理論は、個人がコストとベネフィットを比較考量して効用を最大化するために合理的に意思決定すると仮定している）

カーネマンとトベルスキーはこの前提に挑戦した。

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "According to the passage, how does loss aversion affect public health messaging about vaccines?",
        options: [
          "People who have lost family members to disease are more likely to accept vaccines.",
          "Messaging framing side effects as losses causes more hesitancy than messaging framing vaccination as gaining protection.",
          "Financial incentives reduce hesitancy more effectively than any message framing.",
          "People overestimate the risk of vaccine side effects due to media coverage of rare cases.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「損失回避とワクチン接種メッセージング」：
"public health messaging that frames vaccine side effects as losses produces more hesitancy than messaging that frames vaccination as gaining protection"
（ワクチンの副作用を損失としてフレーミングする公衆衛生メッセージングは、ワクチン接種を保護を得ることとしてフレーミングするメッセージングより多くのためらいを生む）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What is 'choice architecture' as described in the passage?",
        options: [
          "A legal framework that limits the number of options consumers face in complex purchasing decisions.",
          "An algorithm that personalises product recommendations based on individual purchasing histories.",
          "The deliberate design of decision environments to steer people toward better outcomes while preserving choice.",
          "An architectural design philosophy that arranges physical spaces to encourage healthy behaviour.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第3段落が根拠です。

定義：
"the deliberate design of decision environments to steer people towards better outcomes while preserving freedom of choice"
（選択の自由を保ちながら人々をより良い結果に向かわせるための意思決定環境の意図的な設計）

→ C が正確な言い換えです。

【語彙ポイント】
・"steer"（導く）: 方向を誘導すること。
・"preserving freedom of choice"（選択の自由を保ちながら）: 強制ではなく、設計によって行動を促すことが重要。`,
      },
    ],
  },

  // SR7-7: 共通テスト / 移住と文化的アイデンティティ / 約148語 / 60秒
  {
    id: "migration-cultural-identity",
    title: "Migration, Cultural Identity, and the Second Generation",
    level: "COMMON_TEST",
    timeLimit: 60,
    tags: ["論説文", "移住・アイデンティティ", "共通テスト", "約148語"],
    passage: `Children of immigrants — often described as the "second generation" — occupy a distinctive social and psychological space. Unlike their parents, who experienced the full contrast between their country of origin and their country of settlement, second-generation individuals are immersed in the host culture from birth or early childhood while simultaneously maintaining connections to their parents' culture through language, food, religion, and social networks.

This dual positioning can be a source of both psychological richness and conflict. Research in acculturation psychology suggests that second-generation individuals who successfully integrate elements of both cultures — termed "bicultural integration" — tend to demonstrate higher levels of psychological wellbeing, social flexibility, and occupational success than those who feel pressured to abandon their heritage culture or who face exclusion from the mainstream culture.

However, achieving bicultural integration is not always a free personal choice: discrimination and structural barriers in education and employment significantly constrain the cultural identities available to second-generation individuals in many societies.`,
    questions: [
      {
        questionText:
          "What does the passage say distinguishes second-generation immigrants from their parents?",
        options: [
          "They typically earn higher incomes and achieve higher levels of education than their parents.",
          "They are immersed in the host culture from birth while maintaining links to their parents' culture.",
          "They are less likely to maintain language skills in their parents' native language.",
          "They are more likely to face discrimination in employment than the first generation.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「第二世代が親と異なる点」：
"second-generation individuals are immersed in the host culture from birth or early childhood while simultaneously maintaining connections to their parents' culture through language, food, religion, and social networks"
（第二世代は生まれた時から受け入れ国の文化に浸透しながら、同時に言語・食事・宗教・社会的ネットワークを通じて親の文化とのつながりを維持している）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What outcome is associated with 'bicultural integration'?",
        options: [
          "Complete assimilation into the mainstream culture within one generation.",
          "Higher psychological wellbeing, social flexibility, and occupational success.",
          "Stronger political engagement and higher rates of civic participation.",
          "Reduced experience of discrimination in schools and workplaces.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「バイカルチュラル統合の成果」：
"tend to demonstrate higher levels of psychological wellbeing, social flexibility, and occupational success"
（心理的ウェルビーイング・社会的柔軟性・職業的成功の高いレベルを示す傾向がある）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What does the final paragraph add to the discussion of bicultural integration?",
        options: [
          "It argues that bicultural integration is impossible in highly ethnically homogeneous societies.",
          "It explains that second-generation individuals must actively practice both languages to maintain integration.",
          "It warns that discrimination and structural barriers mean bicultural integration is not always freely available.",
          "It suggests that governments should fund cultural education programmes to support second-generation integration.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

「最終段落が追加する内容」：
"achieving bicultural integration is not always a free personal choice: discrimination and structural barriers in education and employment significantly constrain the cultural identities available to second-generation individuals"
（バイカルチュラル統合を達成することは常に自由な個人の選択ではない：差別と教育・雇用における構造的障壁が、多くの社会で第二世代が利用できる文化的アイデンティティを大きく制限している）

→ C が正確な言い換えです。`,
      },
    ],
  },

  // SR7-8: 国公立大 / 量子コンピュータと暗号 / 約175語 / 60秒
  {
    id: "quantum-computing-encryption",
    title: "Quantum Computing and the Threat to Cryptographic Security",
    level: "NATIONAL_UNI",
    timeLimit: 60,
    tags: ["論説文", "量子コンピュータ・暗号", "国公立大", "約175語"],
    passage: `Modern digital security depends on cryptographic protocols whose security rests on computational problems that are practically impossible for classical computers to solve within meaningful time frames. RSA encryption, for instance, relies on the mathematical difficulty of factoring very large numbers — a problem that would take conventional computers thousands of years to solve for sufficiently large key sizes.

Quantum computers, exploiting quantum mechanical properties such as superposition and entanglement, could in principle solve certain computational problems exponentially faster than classical computers. Peter Shor's quantum algorithm, developed in 1994, can theoretically factor large numbers in polynomial time, which would render RSA and similar public-key encryption systems cryptographically obsolete. If a sufficiently powerful quantum computer were built, it could potentially decrypt communications secured under current cryptographic standards.

Governments and standards bodies are consequently developing and standardising "post-quantum cryptography" — encryption algorithms believed to be resistant even to quantum attacks. The US National Institute of Standards and Technology finalised its first post-quantum cryptographic standards in 2024. However, the cryptographic community warns against "harvest now, decrypt later" strategies, whereby adversaries collect encrypted communications today with the intention of decrypting them once quantum capability matures.`,
    questions: [
      {
        questionText:
          "Why does RSA encryption currently provide security, according to the passage?",
        options: [
          "Because RSA uses quantum mechanical principles that cannot be replicated by attackers.",
          "Because factoring very large numbers is computationally impractical for classical computers.",
          "Because RSA keys change dynamically, making interception of communications useless.",
          "Because international law prohibits attempts to break RSA-encrypted communications.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落が根拠です。

「RSA暗号化が現在安全な理由」：
"RSA encryption ... relies on the mathematical difficulty of factoring very large numbers — a problem that would take conventional computers thousands of years to solve for sufficiently large key sizes"
（RSA暗号は非常に大きな数を素因数分解する数学的難しさに依存している — これは十分大きな鍵サイズに対して従来のコンピュータが解くのに何千年もかかる問題）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What is the significance of Shor's algorithm?",
        options: [
          "It creates unbreakable quantum encryption that replaces RSA.",
          "It theoretically allows large-number factorisation in polynomial time on a quantum computer.",
          "It demonstrates that quantum computers are more energy efficient than classical computers.",
          "It is the algorithm underlying post-quantum cryptographic standards being developed today.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「ショアのアルゴリズムの重要性」：
"Peter Shor's quantum algorithm ... can theoretically factor large numbers in polynomial time, which would render RSA and similar public-key encryption systems cryptographically obsolete"
（ショアの量子アルゴリズムは理論的に多項式時間で大きな数を素因数分解でき、これによりRSAと同様の公開鍵暗号システムが暗号学的に時代遅れになる）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What is the 'harvest now, decrypt later' strategy the passage warns against?",
        options: [
          "Storing encryption keys in the cloud to enable future access to archived data.",
          "Collecting currently encrypted communications now with plans to decrypt them once quantum computing matures.",
          "Backing up data using multiple encryption methods to ensure future compatibility.",
          "Using current computing power to crack old encryption standards before they are phased out.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第3段落末文が根拠です。

「今収穫し、後で復号する」戦略：
"whereby adversaries collect encrypted communications today with the intention of decrypting them once quantum capability matures"
（敵対者が量子能力が成熟したら復号する意図で現在暗号化された通信を収集する戦略）

→ B が正確な言い換えです。

【語彙ポイント】
・"adversaries"（敵対者）: 国家の安全保障文脈では他国の諜報機関等。
・"matures"（成熟する）: 技術が十分に発達すること。`,
      },
    ],
  },

  // SR7-9: 私立大 / 都市農業と食料安全保障 / 約158語 / 60秒
  {
    id: "urban-agriculture-food-security",
    title: "Urban Agriculture, Vertical Farming, and the Future of Food Security",
    level: "PRIVATE_UNI",
    timeLimit: 60,
    tags: ["論説文", "都市農業・食料安全保障", "私立大", "約158語"],
    passage: `As the global urban population approaches 70 percent of all humans by mid-century, food security for rapidly growing cities has become a pressing concern. Urban agriculture — encompassing rooftop gardens, community plots, hydroponic greenhouses, and vertically stacked indoor farms — has attracted increasing investment and policy interest as a means of shortening supply chains, reducing food miles, and improving access to fresh produce in food deserts.

Vertical farms, in particular, promise to produce crops year-round in controlled environments, using up to 95 percent less water than conventional agriculture and eliminating the need for pesticides. LED lighting technology and advances in plant science have made indoor farming economically viable for high-value crops such as leafy greens, herbs, and strawberries.

However, critics point out that current vertical farming operations remain prohibitively expensive for staple crops such as wheat, rice, and maize, which provide the bulk of global caloric intake. Energy costs for artificial lighting represent a significant operating expense, and the carbon footprint of energy-intensive indoor farms may offset some of the sustainability benefits unless powered entirely by renewable energy.`,
    questions: [
      {
        questionText:
          "What advantages do vertical farms offer over conventional agriculture, according to the passage?",
        options: [
          "Lower initial capital costs and ability to operate in any climate without heating.",
          "Year-round production in controlled environments, up to 95% less water use, and no pesticides needed.",
          "Ability to grow all major food crops and higher crop yields per unit of land.",
          "Greater employment opportunities and integration with existing urban communities.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

3つの利点：
①"produce crops year-round in controlled environments"（管理された環境で一年中作物を生産）
②"up to 95 percent less water than conventional agriculture"（従来農業より最大95%少ない水）
③"eliminating the need for pesticides"（農薬の必要性を排除）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What limitation of current vertical farming does the passage identify?",
        options: [
          "It can only operate in temperate climates and is unsuitable for tropical regions.",
          "Crops grown indoors have inferior nutritional content compared to conventionally grown produce.",
          "It remains too expensive for staple crops like wheat, rice, and maize.",
          "Consumer acceptance is low because indoor-grown food is perceived as unnatural.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第1文が根拠です。

「現在の垂直農場の限界」：
"current vertical farming operations remain prohibitively expensive for staple crops such as wheat, rice, and maize, which provide the bulk of global caloric intake"
（現在の垂直農場の運営は、世界のカロリー摂取量の大部分を提供する小麦・米・トウモロコシなどの主食作物には法外に高価なままである）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "Under what condition might the sustainability benefits of indoor farming be offset?",
        options: [
          "If vertical farms are located in urban areas with high property prices.",
          "If artificial lighting energy comes from non-renewable sources.",
          "If consumer demand for indoor-grown produce remains below expectations.",
          "If water recycling technology fails to reduce consumption sufficiently.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

「持続可能性メリットが相殺される条件」：
"the carbon footprint of energy-intensive indoor farms may offset some of the sustainability benefits unless powered entirely by renewable energy"
（エネルギー集約型の屋内農場のカーボンフットプリントは、全て再生可能エネルギーで運営されない限り、持続可能性のメリットの一部を相殺する可能性がある）

→ B「人工照明のエネルギーが再生可能エネルギー以外から来る場合」が正確な言い換えです。`,
      },
    ],
  },

  // SR7-10: 国公立大 / ユニバーサルデザインと包摂社会 / 約172語 / 60秒
  {
    id: "universal-design-inclusive-society",
    title: "Universal Design, Disability Rights, and the Architecture of Inclusion",
    level: "NATIONAL_UNI",
    timeLimit: 60,
    tags: ["論説文", "ユニバーサルデザイン・障害学", "国公立大", "約172語"],
    passage: `Universal design — the approach of designing products, environments, and communications to be usable by all people, regardless of age, disability, or other factors, without the need for adaptation or specialised design — emerged from the disability rights movement of the 1970s and 1980s and has progressively influenced architecture, urban planning, product design, and digital accessibility standards.

The conceptual foundation of universal design rests on a shift from the "medical model" of disability — which locates the problem within the individual and seeks to rehabilitate or accommodate the person — to the "social model," which locates disability in the gap between the person's capabilities and environmental design. Under the social model, a person who uses a wheelchair is not disabled by their condition but by buildings without ramps; a person with dyslexia is not disabled by their cognition but by information systems designed exclusively for neurotypical readers.

Advocates argue that universal design benefits not only disabled people but the entire population: accessible pedestrian infrastructure improves mobility for elderly people, parents with pushchairs, and delivery workers; plain-language communication improves comprehension for non-native speakers and people under cognitive load.`,
    questions: [
      {
        questionText:
          "What is the 'social model' of disability, according to the passage?",
        options: [
          "The view that disability arises from the gap between a person's capabilities and environmental design.",
          "The policy approach of integrating disabled people into mainstream social institutions.",
          "The medical understanding that disability results from individual impairments requiring rehabilitation.",
          "The economic model showing that disability reduces productivity and increases social welfare costs.",
        ],
        correctAnswerIndex: 0,
        explanation: `【正解の根拠：定義問題】
正解は A。第2段落第2文が根拠です。

「障害の社会モデル」：
"locates disability in the gap between the person's capabilities and environmental design"
（障害を人の能力と環境設計のギャップに位置付ける）

→ A が正確な言い換えです。

【引っかけ分析】
・C「障害を個人の障害から生まれる医療的理解」: これは第2段落で「医療モデル」として説明されているもので、社会モデルではありません。`,
      },
      {
        questionText:
          "How does the passage illustrate the social model of disability?",
        options: [
          "By comparing treatment outcomes for disabled people in different healthcare systems.",
          "By arguing that universal design is more cost-effective than individual accommodation.",
          "By showing that wheelchair users and people with dyslexia are disabled by environmental barriers, not their conditions.",
          "By citing legal cases in which disabled people successfully challenged inaccessible design.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文（2つの具体例）が根拠です。

例1：「車椅子使用者は自分の状態ではなく、スロープのない建物によって障害を受けている」
例2：「ディスレクシアのある人は自分の認知ではなく、神経典型的読者のみのために設計された情報システムによって障害を受けている」

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "According to the final paragraph, who benefits from accessible pedestrian infrastructure beyond disabled people?",
        options: [
          "Cyclists and motorists, because wider pavements reduce road congestion.",
          "Tourism industries, because accessible cities attract more international visitors.",
          "Elderly people, parents with pushchairs, and delivery workers.",
          "Public transport operators, because accessible stops reduce dwell times.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第2文が根拠です。

「バリアフリー歩行者インフラから恩恵を受けるその他の人々」：
"accessible pedestrian infrastructure improves mobility for elderly people, parents with pushchairs, and delivery workers"
（バリアフリーの歩行者インフラは高齢者・ベビーカーを持つ親・配達業者の移動を改善する）

→ C が正確な言い換えです。`,
      },
    ],
  },
];
