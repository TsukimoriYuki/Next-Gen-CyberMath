import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_5: ComprehensionProblem[] = [
  // P5-1: 国公立大 / 自動化と労働市場の未来 / 約215語
  {
    id: "automation-future-of-work",
    title: "Automation, Labour Market Polarisation, and the Future of Work",
    level: "NATIONAL_UNI",
    tags: ["論説文", "自動化・労働経済", "国公立大", "約215語"],
    passage: `The relationship between technological automation and employment has been debated by economists for over two centuries, beginning with the Luddite movement's resistance to labour-displacing machinery in early nineteenth-century Britain. While earlier waves of automation — mechanized looms, the assembly line, computerized manufacturing — eventually created more jobs than they destroyed by generating entirely new industries, economists are divided over whether this pattern will continue with the current wave of artificial intelligence and robotics.

The distinctive feature of contemporary automation, proponents of disruption argue, is that it targets cognitive tasks alongside physical ones. Optical character recognition, natural language processing, and machine learning-based decision systems are increasingly capable of performing tasks previously considered the exclusive domain of educated white-collar workers: legal document review, radiological image analysis, financial reporting, and customer service. This cognitive penetration distinguishes the current wave from its predecessors, which primarily displaced routine manual labour.

Labour economists identify a phenomenon known as labour market polarisation: automation disproportionately eliminates middle-skill, routine cognitive and manual occupations while leaving intact both high-skill occupations requiring creativity, social intelligence, and contextual judgment, and low-skill physical service occupations that require personal presence and physical dexterity but resist automation. The result is a hollowing-out of the middle of the labour market, with potential consequences for income distribution and social mobility.`,

    questions: [
      {
        questionText:
          "What does the passage identify as distinctive about the current wave of automation compared to previous ones?",
        options: [
          "It operates at a much faster pace, giving workers less time to adapt to changing skill requirements.",
          "It is the first wave of automation to be driven by private investment rather than government funding.",
          "It targets cognitive tasks in addition to physical ones, including work previously done by educated professionals.",
          "It primarily affects manufacturing jobs in developing countries rather than service jobs in wealthy nations.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：対比問題】
正解は C。第2段落第1〜2文が根拠です。

従来の自動化: "primarily displaced routine manual labour"（主に定型的肉体労働を代替）

現代の自動化の特徴:
①"it targets cognitive tasks alongside physical ones"（物理的タスクに加えて認知的タスクを標的にする）
②白カラー労働者の独占領域とされていた業務まで：法律文書審査・放射線画像分析・財務報告・顧客サービス

→ C「認知的タスクも標的にする点で、以前は教育を受けた専門職がしていた仕事も含む」が正確です。

【語彙ポイント】
・"white-collar workers"（ホワイトカラー労働者）: オフィスで知的・管理的な仕事をする職種。
・"cognitive penetration"（認知的侵透）: 知的・思考的な業務領域への自動化の拡大。`,
      },
      {
        questionText:
          "What is 'labour market polarisation' as described in the passage?",
        options: [
          "The migration of workers from urban to rural areas in search of employment as city jobs disappear.",
          "The growing division between workers in export industries and those in domestic service sectors.",
          "The disproportionate elimination of middle-skill jobs while high-skill and low-skill jobs remain.",
          "The increasing geographical concentration of high-paying jobs in a small number of major cities.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第3段落第1文が定義です。

"automation disproportionately eliminates middle-skill, routine cognitive and manual occupations while leaving intact both high-skill occupations requiring creativity, social intelligence, and contextual judgment, and low-skill physical service occupations"

定義の構造：
・中間スキルの定型的認知・肉体職が不均衡に消滅（eliminates middle-skill ... occupations）
・高スキル職（創造性・社会知性・文脈的判断が必要）は残る
・低スキルの対人サービス職（物理的存在と身体的技巧が必要）も残る

→ C「中スキル職が不均衡に消滅する一方、高スキル・低スキル職は残る現象」が正確です。

【語彙ポイント】
・"hollowing-out"（空洞化）: 中間部分が失われ、両極端だけが残ること。`,
      },
      {
        questionText:
          "What uncertainty does the passage express about the historical pattern of automation creating jobs?",
        options: [
          "Economists are uncertain whether past automation ever actually created more jobs than it destroyed.",
          "It is unclear whether the pattern of automation creating new industries will continue with AI and robotics.",
          "Economists cannot predict which specific industries will emerge to replace those lost to automation.",
          "The historical record is too incomplete to draw any reliable conclusions about automation's employment effects.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「歴史的パターン」: 過去の自動化は最終的に新産業を生み出し、破壊より多くの雇用を創出した
「現在の不確実性」: "economists are divided over whether this pattern will continue with the current wave of artificial intelligence and robotics"
（この波でも同じパターンが続くかどうかで経済学者の意見は割れている）

→ B「AIとロボット工学でもこの歴史的パターンが続くかどうかが不明」が正確です。

【語彙ポイント】
・"are divided over"（〜で意見が割れている）: 専門家の間で見解が一致していないこと。`,
      },
    ],
  },

  // P5-2: 私立大 / 言語の絶滅と文化的損失 / 約208語
  {
    id: "language-extinction-cultural-loss",
    title: "Language Extinction and the Irreplaceable Loss of Cultural Knowledge",
    level: "PRIVATE_UNI",
    tags: ["論説文", "言語学・文化", "私立大", "約208語"],
    passage: `Of the approximately 7,000 languages spoken today, linguists estimate that between 50 and 90 percent will become extinct or critically endangered within the next hundred years — a rate of language death far exceeding any previous period in human history. The primary drivers are the displacement of indigenous languages by dominant national languages through formal education systems, mass media saturation, economic incentives to acquire languages of wider communication, and — in many historical cases — direct colonial suppression.

The loss of a language is not merely the extinction of an alternative code for expressing the same concepts. Each language encodes a unique way of perceiving, categorizing, and relating to the world — what linguists call the language's "cognitive ecology." Languages encode culturally specific knowledge systems relating to local ecology, medicinal plant properties, navigation, sustainable agricultural practices, and social organization in ways that resist translation into other languages precisely because the categories and distinctions these knowledge systems employ were developed in and for specific environments and social contexts.

The extinction of a language therefore entails the loss of knowledge that may be irreplaceable: pharmacological compounds derived from medicinal plants known only within a language community's oral tradition, agricultural practices adapted over millennia to specific ecosystems, and navigational techniques encoded in naming systems and oral literature. Once lost, this knowledge cannot be recovered regardless of technological capability.`,

    questions: [
      {
        questionText:
          "What does the passage say is driving language extinction?",
        options: [
          "Natural language evolution, where older languages gradually merge into newer, more efficient ones.",
          "The displacement of indigenous languages by dominant ones through education, media, economics, and historical suppression.",
          "The failure of linguists to document endangered languages before the last speakers die.",
          "Voluntary decisions by communities to abandon their languages in favour of more widely spoken ones.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

「言語絶滅の主な推進力（primary drivers）」：
①「正式な教育制度を通じた支配的な国語による先住民言語の置換（displacement of indigenous languages by dominant national languages through formal education systems）」
②「マスメディアの飽和（mass media saturation）」
③「より広く通用する言語習得への経済的インセンティブ（economic incentives to acquire languages of wider communication）」
④「多くの歴史的ケースでは直接的な植民地的抑圧（direct colonial suppression）」

→ B が複数の要因を正確にまとめています。`,
      },
      {
        questionText:
          "What does the passage mean by a language's 'cognitive ecology'?",
        options: [
          "The system of environmental vocabulary that a language uses to describe the natural world.",
          "A language's unique way of perceiving, categorizing, and relating to the world.",
          "The ecological region in which a language originated and continues to be spoken.",
          "The network of related languages that share a common cognitive structure.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第2文が定義です。

"Each language encodes a unique way of perceiving, categorizing, and relating to the world — what linguists call the language's 'cognitive ecology.'"

ダッシュ以降が「cognitive ecology」の定義：
「世界を知覚し、分類し、関係を結ぶ独自の方法（a unique way of perceiving, categorizing, and relating to the world）」

→ B が正確な言い換えです。

【語彙ポイント】
・"encode"（エンコードする・符号化する）: 言語が特定の概念・知識を内包・表現すること。
・"cognitive"（認知的な）: 知覚・思考・判断などの心理的プロセスに関する。`,
      },
      {
        questionText:
          "Why does the passage argue that knowledge encoded in endangered languages cannot be recovered after extinction?",
        options: [
          "Because the written records of these languages are stored in inaccessible archives.",
          "Because the knowledge exists only in oral tradition and resists translation into other languages.",
          "Because the communities who spoke these languages have been completely dispersed.",
          "Because modern technology cannot reconstruct the sounds and grammar of extinct languages.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2〜3段落が根拠です。

回復不可能な理由（2点）：
①「他の言語への翻訳に抵抗する（resist translation into other languages precisely because the categories and distinctions ... were developed in and for specific environments）」→ 翻訳自体が不可能
②「口頭伝承の中のみに存在する（pharmacological compounds derived from medicinal plants known only within a language community's oral tradition）」→ 書かれていない

→ B「口頭伝承のみに存在し、他言語への翻訳に抵抗するため」が正確です。

【語彙ポイント】
・"oral tradition"（口頭伝承）: 書かれた記録ではなく口から口へと伝えられる知識・文化。
・"pharmacological"（薬理学的な）: 薬の効果・作用に関する。`,
      },
    ],
  },

  // P5-3: 共通テスト / 宇宙探査とアルテミス計画 / 約195語
  {
    id: "artemis-moon-exploration",
    title: "The Artemis Programme and the Return to the Moon",
    level: "COMMON_TEST",
    tags: ["論説文", "宇宙開発・科学", "共通テスト", "約195語"],
    passage: `NASA's Artemis programme aims to return humans to the lunar surface for the first time since the Apollo 17 mission in 1972 — a gap of more than half a century. Unlike the Apollo programme, which was driven primarily by Cold War geopolitical competition with the Soviet Union, Artemis is explicitly designed as a long-term presence programme rather than a series of short-duration flagplanting visits.

The programme's scientific objectives include the study of water ice deposits discovered in permanently shadowed craters near the lunar south pole. If accessible in sufficient quantities, this ice could be electrolysed to produce oxygen for life support and hydrogen for rocket propellant, potentially enabling a self-sustaining lunar outpost and serving as a refuelling point for missions to Mars and beyond. The south pole's near-continuous sunlight also makes it suitable for solar energy generation.

Artemis is a multinational effort, involving NASA, the European Space Agency, the Japan Aerospace Exploration Agency, and the Canadian Space Agency, among others. Commercial partners including SpaceX have been contracted for crew transportation. China and Russia are pursuing a parallel lunar programme, and competition for access to the south pole's ice resources has introduced a geopolitical dimension to what is officially a scientific mission.`,

    questions: [
      {
        questionText:
          "How does the Artemis programme differ from the Apollo programme, according to the passage?",
        options: [
          "Artemis involves international partners, while Apollo was an exclusively American programme.",
          "Artemis is designed for long-term presence rather than short visits, and is not driven by Cold War competition.",
          "Artemis focuses on robotic exploration, while Apollo sent humans to the lunar surface.",
          "Artemis plans to land on the lunar equator, while Apollo missions targeted the south pole.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比問題】
正解は B。第1段落第2文が根拠です。

アポロとの違い（対比）：
アポロ: "driven primarily by Cold War geopolitical competition with the Soviet Union"（冷戦の地政学的競争が主な動機）
アルテミス: "explicitly designed as a long-term presence programme rather than a series of short-duration flagplanting visits"（短期の旗立て訪問ではなく長期的な存在プログラムとして設計）

→ B「長期的な存在を目的としており、冷戦競争によって動機付けられていない」が正確です。

【語彙ポイント】
・"flagplanting visits"（旗立て訪問）: 国旗を立てて帰るだけの短期的な政治的デモンストレーション。`,
      },
      {
        questionText:
          "Why is water ice at the lunar south pole considered strategically important?",
        options: [
          "It provides evidence that the moon once had a global ocean, supporting theories about lunar formation.",
          "It can be processed into oxygen and rocket propellant, supporting a lunar base and deep space missions.",
          "It contains rare minerals that are essential for manufacturing next-generation electronic devices.",
          "Its presence indicates that the lunar south pole receives no solar radiation, making it safe for sensitive equipment.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「水氷の戦略的重要性」：
"this ice could be electrolysed to produce oxygen for life support and hydrogen for rocket propellant, potentially enabling a self-sustaining lunar outpost and serving as a refuelling point for missions to Mars and beyond"

・水の電気分解 → 酸素（生命維持）+ 水素（ロケット推進剤）
・自立的な月面基地の実現可能性
・火星以遠への補給地点

→ B「酸素と推進剤に加工でき、月面基地と深宇宙探査を支援できる」が正確です。

【語彙ポイント】
・"electrolysed"（電気分解された）: 電流によって化学的に分解されること。
・"propellant"（推進剤）: ロケットエンジンを動かす燃料。`,
      },
      {
        questionText:
          "What geopolitical dimension does the passage mention in connection with Artemis?",
        options: [
          "The United States and Russia have agreed to share lunar resources under a new space treaty.",
          "China and Russia's parallel lunar programme has introduced competition for south pole ice resources.",
          "Several developing nations have protested that wealthy countries are monopolizing access to space.",
          "The European Space Agency has withdrawn from Artemis due to disagreements over resource ownership.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

"China and Russia are pursuing a parallel lunar programme, and competition for access to the south pole's ice resources has introduced a geopolitical dimension to what is officially a scientific mission."

・中国・ロシアが並行した月探査プログラムを推進
・南極の水氷資源へのアクセスをめぐる競争が「公式には科学的ミッションであるものに地政学的側面をもたらした」

→ B が正確な言い換えです。`,
      },
    ],
  },

  // P5-4: 国公立大 / 海洋酸性化と生態系 / 約225語
  {
    id: "ocean-acidification",
    title: "Ocean Acidification: Chemistry, Ecological Consequences, and Policy Responses",
    level: "NATIONAL_UNI",
    tags: ["論説文", "環境科学・海洋", "国公立大", "約225語"],
    passage: `The oceans absorb approximately 30 percent of the carbon dioxide released by human industrial activity, a process that, while moderating atmospheric CO₂ concentrations, produces a secondary environmental crisis: ocean acidification. When CO₂ dissolves in seawater, it forms carbonic acid, which dissociates to release hydrogen ions, lowering the pH of ocean water. Since pre-industrial times, surface ocean pH has declined from approximately 8.2 to 8.1 — a change that, while appearing numerically modest, represents a 26 percent increase in hydrogen ion concentration because pH is measured on a logarithmic scale.

The ecological consequences are particularly severe for calcifying marine organisms — those that build shells and skeletons from calcium carbonate compounds such as aragonite and calcite. As ocean acidity increases, the saturation state of these minerals in seawater declines, making it energetically more costly for corals, molluscs, echinoderms, and planktonic foraminifera to build and maintain their structures. At sufficiently low saturation states, calcium carbonate structures begin to dissolve. Coral reef systems — which support approximately 25 percent of all marine species despite covering less than 0.1 percent of the ocean floor — are at particular risk.

Beyond ecological consequences, ocean acidification threatens food security in nations dependent on shellfish and finfish aquaculture, and may disrupt the biological carbon pump — the process by which marine organisms transfer carbon from the surface ocean to deep sediments — potentially creating a feedback loop that further accelerates atmospheric CO₂ accumulation.`,

    questions: [
      {
        questionText:
          "Why does the passage say the observed pH change in ocean water is more significant than it appears numerically?",
        options: [
          "Because pH measurements in ocean science use a different scale from those used in other contexts.",
          "Because a small pH change affects only a few species but those species are critical to the entire ecosystem.",
          "Because pH is logarithmic, so a 0.1 unit decline represents a 26 percent increase in acidity.",
          "Because the ocean's buffer capacity means that the actual chemical change is far larger than pH indicates.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落末文が根拠です。

"a change that, while appearing numerically modest, represents a 26 percent increase in hydrogen ion concentration because pH is measured on a logarithmic scale"

留保の構造（while 分詞構文）：
・見かけ上は小さい変化（appearing numerically modest）
・しかし「pHは対数スケールで測定されるため（because pH is measured on a logarithmic scale）」
・水素イオン濃度の26%増加を意味する

→ C「pHは対数的であるため、0.1の低下は酸性度の26%上昇を示す」が正確です。

【語彙ポイント】
・"logarithmic scale"（対数スケール）: 数値が1増えるごとに10倍の変化を示す尺度。
・"hydrogen ion concentration"（水素イオン濃度）: pHが低いほど濃度が高い。`,
      },
      {
        questionText:
          "Why are calcifying marine organisms particularly vulnerable to ocean acidification?",
        options: [
          "Because they live in shallow coastal waters where CO₂ concentrations are highest.",
          "Because declining mineral saturation makes it harder and more costly for them to build their shells.",
          "Because they rely on photosynthesis for energy, and acidification disrupts this process.",
          "Because they are the primary food source for commercially important fish species.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"As ocean acidity increases, the saturation state of these minerals in seawater declines, making it energetically more costly for corals, molluscs, echinoderms, and planktonic foraminifera to build and maintain their structures."

脆弱性のメカニズム：
①「海洋酸性化の上昇→ミネラルの飽和度低下（saturation state ... declines）」
②「殻・骨格の構築・維持にかかるエネルギーコストが増大（energetically more costly）」

→ B「ミネラル飽和度の低下が殻の構築・維持をより困難で高コストにする」が正確です。`,
      },
      {
        questionText:
          "What feedback loop does the passage warn about at the end?",
        options: [
          "Ocean acidification kills marine organisms, whose decomposition releases more CO₂.",
          "Disruption of the biological carbon pump may reduce the ocean's ability to remove CO₂, accelerating its atmospheric accumulation.",
          "Acidification warms the oceans, which causes more evaporation and stronger storms.",
          "The loss of coral reefs reduces fish populations, increasing demand for livestock farming and its emissions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

"may disrupt the biological carbon pump — the process by which marine organisms transfer carbon from the surface ocean to deep sediments — potentially creating a feedback loop that further accelerates atmospheric CO₂ accumulation"

フィードバックループのメカニズム：
①「海洋酸性化」→「生物学的炭素ポンプの破壊（disruption of the biological carbon pump）」
②「表層海洋から深海堆積物への炭素移送が減少」
③「大気中CO₂蓄積のさらなる加速（further accelerates atmospheric CO₂ accumulation）」

→ B「生物学的炭素ポンプの破壊が海洋のCO₂除去能力を低下させ、大気中CO₂蓄積を加速させる」が正確です。

【語彙ポイント】
・"biological carbon pump"（生物学的炭素ポンプ）: 海洋生物が炭素を深海に運ぶプロセス。
・"feedback loop"（フィードバックループ）: 結果が原因を強化する循環的プロセス。`,
      },
    ],
  },

  // P5-5: 私立大 / 芸術市場とNFT / 約202語
  {
    id: "nft-art-market",
    title: "NFTs, Digital Ownership, and the Transformation of the Art Market",
    level: "PRIVATE_UNI",
    tags: ["論説文", "テクノロジー・芸術市場", "私立大", "約202語"],
    passage: `Non-fungible tokens (NFTs) — cryptographically unique digital assets recorded on a blockchain — emerged as a transformative and deeply controversial mechanism for establishing provenance and ownership of digital art. At the height of the NFT market in 2021, digital artworks were selling for tens of millions of dollars, attracting speculative investors and prompting widespread debate about whether this represented a genuine revolution in how artists are compensated or a speculative bubble disconnected from artistic merit.

Proponents argued that NFTs resolved a fundamental problem in digital art: prior to blockchain-based verification, digital images could be reproduced infinitely at no cost, making scarcity — and therefore the kind of value associated with unique physical artworks — effectively impossible to establish. By cryptographically linking a token to a specific artwork, NFTs created a verifiable original in a medium where originality had previously been meaningless.

Critics countered that the NFT itself does not prevent copying of the digital image — anyone can still download or screenshot the underlying file — but merely records a transaction on a blockchain. They argued that the value assigned to NFT ownership is therefore entirely socially constructed, dependent on shared belief in the system's legitimacy in a manner indistinguishable from other speculative asset classes. The dramatic collapse in NFT prices following the 2022 cryptocurrency market downturn lent force to this critique.`,

    questions: [
      {
        questionText:
          "What fundamental problem in digital art did NFT proponents claim to resolve?",
        options: [
          "The inability of digital artists to protect their work from plagiarism by other creators.",
          "The difficulty of displaying digital art in traditional gallery spaces.",
          "The impossibility of establishing scarcity and uniqueness for infinitely reproducible digital files.",
          "The lack of legal frameworks for recognising digital artworks as property.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第1〜2文が根拠です。

「NFTが解決したとされる問題」：
"prior to blockchain-based verification, digital images could be reproduced infinitely at no cost, making scarcity — and therefore the kind of value associated with unique physical artworks — effectively impossible to establish"

・デジタル画像は無限に複製可能 → 希少性（scarcity）の確立が事実上不可能
・NFTの解決策："By cryptographically linking a token to a specific artwork, NFTs created a verifiable original"

→ C「無限に複製可能なデジタルファイルに希少性と独自性を確立することの不可能性」が正確です。

【語彙ポイント】
・"non-fungible"（非代替性の）: 他のものと交換・置換できない唯一無二の性質。
・"provenance"（来歴・出所）: 美術品の制作者・所有者の記録。`,
      },
      {
        questionText:
          "What specific limitation of NFTs do critics point out?",
        options: [
          "NFTs can only be purchased using cryptocurrency, excluding most potential buyers.",
          "The blockchain technology underlying NFTs consumes enormous amounts of energy.",
          "Owning an NFT does not prevent others from copying the underlying digital image.",
          "NFT smart contracts frequently contain legal errors that make ownership disputes inevitable.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第1文が根拠です。

"the NFT itself does not prevent copying of the digital image — anyone can still download or screenshot the underlying file — but merely records a transaction on a blockchain"

批評家の指摘：
・NFTはデジタル画像のコピーを防がない（does not prevent copying）
・誰でも元ファイルをダウンロード・スクリーンショットできる
・ブロックチェーン上の取引記録に過ぎない（merely records a transaction on a blockchain）

→ C「NFTの所有は基礎となるデジタル画像を他者がコピーするのを防げない」が正確です。`,
      },
      {
        questionText:
          "What does the passage suggest about the value of NFT ownership, according to critics?",
        options: [
          "It is entirely determined by the artistic quality of the digital work it represents.",
          "It depends on the reputation of the blockchain platform on which the NFT is recorded.",
          "It is socially constructed and dependent on collective belief in the system's legitimacy.",
          "It is backed by legal guarantees provided by governments that regulate digital asset markets.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第2文が根拠です。

"the value assigned to NFT ownership is therefore entirely socially constructed, dependent on shared belief in the system's legitimacy in a manner indistinguishable from other speculative asset classes"

批評家の主張：
・NFT所有権の価値は「完全に社会的に構築されている（entirely socially constructed）」
・「システムの正当性への共有された信念（shared belief in the system's legitimacy）」に依存
・他の投機的資産クラスと区別不可能

→ C「社会的に構築されており、システムへの集合的信念に依存する」が正確です。

【語彙ポイント】
・"socially constructed"（社会的に構築された）: 客観的な実体ではなく、社会的合意によって価値が生まれること。
・"speculative asset"（投機的資産）: 将来の価格上昇期待に基づいて投資される資産。`,
      },
    ],
  },

  // P5-6: 国公立大 / 抗生物質耐性の危機 / 約220語
  {
    id: "antibiotic-resistance-crisis",
    title: "Antimicrobial Resistance: A Silent Pandemic in the Making",
    level: "NATIONAL_UNI",
    tags: ["論説文", "医学・公衆衛生", "国公立大", "約220語"],
    passage: `Antimicrobial resistance (AMR) — the ability of microorganisms to evolve mechanisms that render them impervious to drugs designed to kill them — is increasingly recognized by global health authorities as one of the most serious long-term threats to human health. A 2022 Lancet study attributed 1.27 million deaths globally in 2019 directly to AMR, with a further 4.95 million deaths associated with it — figures exceeding the combined annual mortality of HIV/AIDS and malaria.

The primary driver of AMR is the overuse and misuse of antibiotics in both human medicine and, particularly, industrial animal agriculture, where antibiotics are administered not only therapeutically but prophylactically to entire livestock herds to promote growth and prevent the spread of disease in overcrowded conditions. This creates persistent selective pressure on bacterial populations, accelerating the emergence of resistant strains that are then distributed through food systems, water supplies, and direct human-animal contact.

The pharmaceutical industry's pipeline for novel antibiotic development has effectively dried up over the past four decades. The economics are profoundly unfavourable: antibiotics are typically administered for short durations, generating limited revenue, while the development of resistance means that any newly approved drug must be conserved as a last resort, further suppressing commercial returns. Without structural reform of research incentives — whether through publicly funded discovery programs, extended patent terms, or guaranteed purchase commitments — the drug-resistant infections now classified as "difficult to treat" will progressively become untreatable.`,

    questions: [
      {
        questionText:
          "Why does the passage describe antimicrobial resistance as a particularly serious threat?",
        options: [
          "Because it can only be controlled by developing vaccines, which take decades to produce.",
          "Because resistant infections already cause more deaths than HIV/AIDS and malaria combined annually.",
          "Because it is caused by a new type of microorganism that existing antibiotics cannot target.",
          "Because AMR primarily affects children and the elderly who cannot withstand aggressive treatment.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

"A 2022 Lancet study attributed 1.27 million deaths globally in 2019 directly to AMR, with a further 4.95 million deaths associated with it — figures exceeding the combined annual mortality of HIV/AIDS and malaria."

ダッシュ以降の比較：「HIV/AIDSとマラリアの合計年間死亡者数を超える数値」

→ B「耐性感染症はすでに毎年HIV/AIDSとマラリアを合わせた数より多い死者を引き起こしている」が正確です。

【語彙ポイント】
・"antimicrobial resistance"（抗菌薬耐性）: 細菌が薬剤に対して抵抗性を獲得すること。
・"impervious to"（〜に対して透過性がない・無敵な）: 効果が及ばないこと。`,
      },
      {
        questionText:
          "How does industrial animal agriculture contribute to AMR, according to the passage?",
        options: [
          "By genetically modifying livestock, creating bacteria that are naturally resistant to antibiotics.",
          "By contaminating soil and water with animal waste containing drug-resistant bacteria.",
          "By administering antibiotics prophylactically to herds, creating persistent selective pressure for resistance.",
          "By importing animals from regions where antimicrobial resistance is already widespread.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第1〜2文が根拠です。

「農業における抗生物質使用の問題」：
"antibiotics are administered not only therapeutically but prophylactically to entire livestock herds to promote growth and prevent the spread of disease in overcrowded conditions"
（治療目的だけでなく予防目的（prophylactically）でも投与される）

「結果」：
"This creates persistent selective pressure on bacterial populations, accelerating the emergence of resistant strains"
（細菌集団への持続的な選択圧を生み出し、耐性株の出現を加速）

→ C「予防的に群れ全体に抗生物質を投与することで、耐性への持続的な選択圧を生む」が正確です。

【語彙ポイント】
・"prophylactically"（予防的に）: 感染を予防するために（まだ病気でない段階で）投薬すること。
・"selective pressure"（選択圧）: 特定の形質を持つ個体が生き残りやすくなる環境的条件。`,
      },
      {
        questionText:
          "Why has pharmaceutical development of new antibiotics stalled?",
        options: [
          "Because the scientific challenges of developing new antibiotics are now too great to overcome.",
          "Because existing antibiotics remain fully effective against all current infections.",
          "Because short treatment durations and conservation requirements make antibiotic development commercially unattractive.",
          "Because regulatory approval of new antibiotics takes too long to justify research investment.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第2文が根拠です。

「経済的理由の構造」：
①「短期投与（short durations） → 収益が限られる（limited revenue）」
②「耐性耐因で新薬は最後の手段として温存が必要 → 商業的リターンをさらに抑制（further suppressing commercial returns）」

→ C「短い治療期間と温存要件が抗生物質開発を商業的に魅力のないものにしている」が正確です。

【語彙ポイント】
・"pipeline"（パイプライン）: 研究・開発中の薬剤の数。薬剤開発の見通し。
・"last resort"（最後の手段）: 他の選択肢がすべて失敗した時のみ使うこと。`,
      },
    ],
  },

  // P5-7: 私立大 / ポピュリズムと民主主義 / 約200語
  {
    id: "populism-democracy",
    title: "Populism, Democratic Erosion, and the Challenge of Institutional Resilience",
    level: "PRIVATE_UNI",
    tags: ["論説文", "政治学・民主主義", "私立大", "約200語"],
    passage: `Political scientists have observed a global wave of populist movements and governments over the past two decades, raising concerns about what scholars term "democratic backsliding" — the gradual erosion of democratic norms and institutions through formally legal, incremental steps rather than the dramatic coups d'état that dominated earlier waves of democratic breakdown.

Populist leaders, by invoking a rhetorical opposition between "the pure people" and "the corrupt elite," claim a mandate to govern on behalf of an undifferentiated popular will that transcends institutional constraints. This framing delegitimizes checks and balances — an independent judiciary, a free press, parliamentary oversight, autonomous civil society — as obstacles erected by elites to frustrate genuine democracy rather than as safeguards protecting it. Once opponents are framed as corrupt enemies of the people rather than legitimate political rivals with competing interests, the institutional boundaries that normally constrain majority power can be dismantled with significant public support.

Democratic resilience, political scientists argue, depends less on formal constitutional provisions than on the strength of civic norms — the informal shared understandings that certain actions, while technically permissible, are incompatible with democratic governance. When these norms erode, legal mechanisms prove insufficient: a determined government can use constitutional tools to undermine the constitution itself, a process scholars describe as "constitutional retrogression."`,

    questions: [
      {
        questionText:
          "How does the passage characterize modern democratic backsliding?",
        options: [
          "As sudden military coups that rapidly destroy democratic institutions in a matter of days.",
          "As a gradual erosion through formally legal and incremental steps, distinct from earlier coups.",
          "As a process driven exclusively by foreign interference in domestic political affairs.",
          "As a phenomenon affecting only new democracies that have not yet developed strong institutions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落が根拠です。

"democratic backsliding — the gradual erosion of democratic norms and institutions through formally legal, incremental steps rather than the dramatic coups d'état that dominated earlier waves of democratic breakdown"

定義の要素：
・「段階的な侵食（gradual erosion）」
・「正式には合法的で漸進的なステップを通じて（through formally legal, incremental steps）」
・「以前の民主主義崩壊のような劇的なクーデターとは異なる（rather than the dramatic coups d'état）」

→ B が正確な言い換えです。

【語彙ポイント】
・"backsliding"（後退・逆行）: 進歩した状態から元に戻ること。
・"incremental"（漸進的な）: 小さな段階を踏んで少しずつ進むこと。`,
      },
      {
        questionText:
          "How do populist leaders reframe checks and balances, according to the passage?",
        options: [
          "As outdated colonial-era institutions that should be replaced with modern governance structures.",
          "As elite obstacles blocking genuine democracy, rather than safeguards protecting it.",
          "As necessary but temporarily suspendable constraints during national emergencies.",
          "As foreign-designed systems incompatible with local cultural values and traditions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「ポピュリストによる再フレーミング」：
"This framing delegitimizes checks and balances ... as obstacles erected by elites to frustrate genuine democracy rather than as safeguards protecting it"

・「権力分立は民主主義を守る安全装置（safeguards protecting it）」← 本来の意義
→ ポピュリストは「エリートが真の民主主義を妨害するために作った障壁（obstacles erected by elites）」として描く

→ B「真の民主主義を守る安全装置ではなく、エリートの障壁として描く」が正確です。`,
      },
      {
        questionText:
          "What is 'constitutional retrogression' as described in the passage?",
        options: [
          "The formal abolition of a constitution and its replacement with emergency presidential decrees.",
          "The process by which a determined government uses constitutional tools to undermine the constitution itself.",
          "A judicial ruling that existing constitutional provisions are no longer compatible with modern society.",
          "The revision of a constitution to remove protections for minority groups.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第3段落末文が定義です。

"a determined government can use constitutional tools to undermine the constitution itself, a process scholars describe as 'constitutional retrogression.'"

「憲法退行（constitutional retrogression）」の定義：
「意志の強い政府が憲法的なツールを使って憲法自体を損なうプロセス」

→ B が正確な言い換えです。

【語彙ポイント】
・"retrogression"（後退・逆行）: regression と同義。前進とは逆の方向への変化。
・"civic norms"（市民的規範）: 民主主義を維持する上での非公式の共有された慣行・暗黙のルール。`,
      },
    ],
  },

  // P5-8: 共通テスト / ストリートフードと文化遺産 / 約188語
  {
    id: "street-food-cultural-heritage",
    title: "Street Food, Urban Culture, and the Politics of Culinary Heritage",
    level: "COMMON_TEST",
    tags: ["論説文", "食文化・都市", "共通テスト", "約188語"],
    passage: `Street food — prepared and sold by vendors in public spaces, typically from carts, stalls, or small roadside outlets — is a defining feature of urban life across Asia, Latin America, Africa, and the Middle East. It provides affordable nutrition to millions of urban workers and serves as a primary livelihood for a significant proportion of urban informal economy workers. Beyond its economic functions, street food culture encodes local culinary traditions, social rituals, and community identity in ways that restaurant dining and packaged food products cannot replicate.

Despite — or perhaps because of — its cultural significance, street food has frequently been the target of urban modernization campaigns. City authorities in cities from Singapore to Mexico City have relocated traditional street vendors to regulated market centres, citing hygiene concerns, pedestrian congestion, and the aesthetic demands of a tourist-friendly urban image. Critics argue that these relocations, while addressing legitimate public health concerns, systematically destroy the organic, place-specific character of street food culture by subjecting it to bureaucratic standardization.

UNESCO's recognition of street food traditions as elements of intangible cultural heritage reflects a growing international consensus that culinary practices constitute a legitimate form of cultural heritage deserving protection and documentation alongside architectural and artistic traditions.`,

    questions: [
      {
        questionText:
          "What economic role does street food play in cities, according to the passage?",
        options: [
          "It drives tourism revenue by attracting international visitors seeking authentic local cuisine.",
          "It provides affordable food to urban workers and livelihoods to many informal economy workers.",
          "It competes directly with formal restaurant businesses, driving down food prices for all consumers.",
          "It generates significant tax revenue for city governments through licensing and regulation fees.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

「屋台食の経済的機能（2つ）」：
①「何百万人もの都市労働者に手頃な栄養を提供する（provides affordable nutrition to millions of urban workers）」
②「都市インフォーマル経済従事者の主要な生計手段（a primary livelihood for a significant proportion of urban informal economy workers）」

→ B が正確にまとめています。

【語彙ポイント】
・"informal economy"（インフォーマル経済）: 政府に登録・課税されていない経済活動の総体。
・"livelihood"（生計・生活手段）: 収入を得て生活を維持する手段。`,
      },
      {
        questionText:
          "What do critics say about urban relocation programs for street vendors?",
        options: [
          "They are ineffective at addressing the hygiene concerns that motivated them.",
          "They unfairly target vendors from particular ethnic or cultural backgrounds.",
          "While addressing health concerns, they destroy the organic, place-specific character of street food culture.",
          "They result in higher food prices that disproportionately harm low-income urban residents.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第2文が根拠です。

「批評家の主張（by critics）」：
"these relocations, while addressing legitimate public health concerns, systematically destroy the organic, place-specific character of street food culture by subjecting it to bureaucratic standardization"

譲歩構文（while 節）の構造：
・認める点：「正当な公衆衛生上の懸念に対処する（addressing legitimate public health concerns）」
・批判点：「屋台文化の有機的で場所特有の性格を組織的に破壊する（systematically destroy the organic, place-specific character）」

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "What does UNESCO's recognition of street food traditions indicate?",
        options: [
          "That street food must now be sold in regulated indoor markets to receive heritage protection.",
          "That culinary practices are increasingly recognised as legitimate cultural heritage worth protecting.",
          "That street food has officially surpassed architectural heritage in cultural importance.",
          "That governments must fund street food vendors who agree to maintain traditional recipes.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

"UNESCO's recognition of street food traditions as elements of intangible cultural heritage reflects a growing international consensus that culinary practices constitute a legitimate form of cultural heritage deserving protection and documentation alongside architectural and artistic traditions."

UNESCOの認定が示すもの：
・「料理の実践が建築・芸術的伝統と並んで保護・記録に値する正当な文化遺産の一形態を構成するという国際的コンセンサスの高まり」

→ B「料理の実践が保護に値する正当な文化遺産として認識されてきている」が正確です。

【語彙ポイント】
・"intangible cultural heritage"（無形文化遺産）: 建物のような有形の遺産ではなく、慣行・伝統・表現など。`,
      },
    ],
  },

  // P5-9: 国公立大 / 量子暗号通信 / 約222語
  {
    id: "quantum-key-distribution",
    title: "Quantum Key Distribution and the Future of Unconditionally Secure Communication",
    level: "NATIONAL_UNI",
    tags: ["論説文", "量子物理・情報セキュリティ", "国公立大", "約222語"],
    passage: `Quantum key distribution (QKD) is a communication protocol that exploits the principles of quantum mechanics to enable two parties to generate and share a cryptographic key with a security guarantee that is, in principle, unconditional — that is, independent of the computational power of any eavesdropper. This property distinguishes QKD fundamentally from conventional public-key cryptography, whose security depends on the practical difficulty of solving certain mathematical problems and would be compromised by a sufficiently powerful quantum computer.

The security of QKD derives from the quantum mechanical principle that measuring a quantum system inevitably disturbs it. If an eavesdropper intercepts the quantum channel to observe the transmitted photons that encode the key, this observation necessarily alters the quantum states of those photons in detectable ways. The legitimate parties can then analyse the error rate in their shared key and determine with high statistical confidence whether an interception has occurred. If no eavesdropping is detected, the key is guaranteed to be secure; if eavesdropping is detected, the key is discarded and the transmission is repeated.

Despite its theoretical elegance, QKD faces significant practical obstacles to widespread deployment. Quantum signals transmitted through optical fibre degrade over distance, limiting current systems to approximately 500 kilometres before signal amplification is required — but conventional amplifiers destroy the quantum properties that confer security. Satellite-based QKD, demonstrated by China's Micius satellite, represents one approach to extending range, but global deployment remains technically and economically challenging.`,

    questions: [
      {
        questionText:
          "What property makes QKD fundamentally different from conventional public-key cryptography?",
        options: [
          "QKD uses optical fibre rather than radio waves, making it physically more secure.",
          "QKD's security is unconditional and does not depend on the eavesdropper's computational power.",
          "QKD can transmit data at the speed of light, while conventional encryption is slower.",
          "QKD does not require a shared key, eliminating the key exchange problem entirely.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比問題】
正解は B。第1段落第1〜2文が根拠です。

QKDの特性：
"a security guarantee that is, in principle, unconditional — that is, independent of the computational power of any eavesdropper"
（原理的には無条件のセキュリティ保証 = 傍受者の計算能力に依存しない）

従来の公開鍵暗号との違い：
"conventional public-key cryptography, whose security depends on the practical difficulty of solving certain mathematical problems and would be compromised by a sufficiently powerful quantum computer"
（特定の数学的問題の解読困難性に依存し、十分強力な量子コンピュータによって破られる可能性がある）

→ B「QKDのセキュリティは無条件であり、傍受者の計算能力に依存しない」が正確です。`,
      },
      {
        questionText:
          "How can the legitimate parties detect whether an eavesdropper has intercepted their quantum key?",
        options: [
          "By checking whether the transmitted photons arrive at their destination within the expected time.",
          "By analysing whether eavesdropping has introduced detectable errors in the shared key.",
          "By encrypting the quantum channel with a secondary classical encryption layer.",
          "By verifying the eavesdropper's digital signature against a publicly held certificate.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2〜3文が根拠です。

「盗聴検出のメカニズム」：
①「盗聴者が量子チャネルを傍受して光子を観測すると、その量子状態を検出可能な形で変化させる（necessarily alters the quantum states ... in detectable ways）」
②「正当な当事者は共有鍵のエラー率を分析し、傍受が起きたかどうかを高い統計的確信度で判断できる（analyse the error rate ... determine with high statistical confidence whether an interception has occurred）」

→ B「共有鍵に盗聴が検出可能なエラーをもたらしたかどうかを分析することで」が正確です。

【語彙ポイント】
・"error rate"（エラー率）: 送受信されたデータの中で誤りが発生した割合。
・"statistical confidence"（統計的確信度）: 確率論的な確実性の高さ。`,
      },
      {
        questionText:
          "What is described as a key practical limitation of fibre-based QKD systems?",
        options: [
          "They require extremely cold temperatures to operate and cannot function in most climates.",
          "The quantum signals degrade over distance, and conventional amplifiers destroy their security properties.",
          "They can only transmit data at very low speeds compared to conventional internet connections.",
          "They are vulnerable to physical attacks on the optical fibre cable itself.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落第2文が根拠です。

「光ファイバーベースQKDの実用的限界」：
①「量子信号が距離とともに劣化（Quantum signals ... degrade over distance）」
②「約500kmで信号増幅が必要（limiting current systems to approximately 500 kilometres）」
③「しかし従来の増幅器は量子特性を破壊する（conventional amplifiers destroy the quantum properties that confer security）」

→ B「量子信号が距離とともに劣化し、従来の増幅器がセキュリティを与える量子特性を破壊する」が正確です。`,
      },
    ],
  },

  // P5-10: 私立大 / ユニバーサルベーシックインカムの論争 / 約207語
  {
    id: "ubi-debate",
    title: "Universal Basic Income: Economic Arguments, Social Implications, and Pilot Evidence",
    level: "PRIVATE_UNI",
    tags: ["論説文", "社会政策・経済", "私立大", "約207語"],
    passage: `Universal basic income (UBI) — a periodic unconditional cash transfer provided to all citizens or residents of a jurisdiction regardless of their employment status, wealth, or behaviour — has attracted growing interest from across the political spectrum as a potential response to technological unemployment, welfare system complexity, and the gig economy's erosion of traditional employment protections.

Proponents from the libertarian right argue that a UBI could simplify the welfare state by replacing the complex web of means-tested benefits with a single universal payment, reducing administrative costs and eliminating poverty traps — the phenomenon whereby benefits are withdrawn at rates that effectively penalize low-income earners for increasing their wages. Progressive advocates emphasize its capacity to reduce economic insecurity, recognize the unpaid care work predominantly performed by women, and provide a genuine floor of economic autonomy below which no citizen can fall.

Critics from both left and right raise concerns about fiscal sustainability — a UBI generous enough to lift all citizens above the poverty line would cost trillions of dollars annually in large economies — and about potential effects on labour supply. Conservative critics fear work disincentive effects; left critics worry that a UBI paid for through spending cuts to existing welfare programs could leave vulnerable groups worse off than the systems it replaces.

Pilot programs in Finland, Kenya, and Stockton, California have produced encouraging evidence on wellbeing, mental health, and employment effects, though their small scale and limited duration make confident generalization to national policy difficult.`,

    questions: [
      {
        questionText:
          "What is a 'poverty trap,' as mentioned in the passage?",
        options: [
          "A cycle of debt that prevents low-income families from saving money despite working full-time.",
          "A housing shortage that forces poor families to spend most of their income on rent.",
          "A situation in which benefit withdrawal rates effectively penalize low-income earners for earning more.",
          "A policy that caps the amount of welfare support available to any individual household.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第2段落第2文が根拠です。

"poverty traps — the phenomenon whereby benefits are withdrawn at rates that effectively penalize low-income earners for increasing their wages"

ダッシュ以降が「貧困の罠」の定義：
「収入が増えると給付が削減される割合が事実上、低所得労働者が賃金を上げることへのペナルティとなる現象」

→ C「給付の削減率が事実上、低所得者が収入を増やすことにペナルティを課す状況」が正確です。

【語彙ポイント】
・"means-tested benefits"（資力調査型給付）: 収入・資産を基準に受給資格を判定する給付制度。
・"poverty trap"（貧困の罠）: 福祉制度の設計により、働くことが経済的に損になる状況。`,
      },
      {
        questionText:
          "What concern do left-wing critics of UBI raise, according to the passage?",
        options: [
          "That UBI would reduce the incentive to work, undermining the social value of labour.",
          "That UBI funded by cutting existing welfare could leave vulnerable groups worse off.",
          "That UBI payments would be too small to make a meaningful difference to poverty.",
          "That UBI would accelerate the automation of jobs by making workers less resistant to technological change.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

「左派の批判」：
"left critics worry that a UBI paid for through spending cuts to existing welfare programs could leave vulnerable groups worse off than the systems it replaces"

・「既存の福祉プログラムへの支出削減によって賄われるUBIは、脆弱なグループを現行制度より悪い状況に置く可能性がある」

→ B が正確な言い換えです。

【引っかけ分析】
・A「労働意欲の低下（work disincentive effects）」: これは「保守派の批判（Conservative critics）」として第3段落第2文に述べられています。左派の批判と混同しないよう注意。`,
      },
      {
        questionText:
          "What limitation does the passage identify in drawing conclusions from UBI pilot programs?",
        options: [
          "The pilots were conducted in wealthy countries where results may not apply to developing nations.",
          "The pilots were too small in scale and too short in duration to reliably generalize to national policy.",
          "Participants in pilot programs knew they were being observed, making their behaviour unrepresentative.",
          "Governments interfered with pilot programs to make the results appear more favourable.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第4段落が根拠です。

「パイロットプログラムの限界」：
"though their small scale and limited duration make confident generalization to national policy difficult"

2つの制限：
①「小規模（small scale）」
②「期間が限られている（limited duration）」
→「国家政策への確信的な一般化を困難にする（make confident generalization to national policy difficult）」

→ B が正確な言い換えです。

【語彙ポイント】
・"generalization"（一般化）: 特定の事例から広い結論を引き出すこと。
・"confident"（確信的な）: 強い根拠に基づいた、信頼できる。`,
      },
    ],
  },
];
