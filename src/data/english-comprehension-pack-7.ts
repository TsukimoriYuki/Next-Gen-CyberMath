import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_7: ComprehensionProblem[] = [
  // P7-1: 国公立大 / 生物多様性条約とネイチャーポジティブ / 約220語
  {
    id: "biodiversity-cop15-nature-positive",
    title: "The Kunming-Montreal Framework and the Nature-Positive Agenda",
    level: "NATIONAL_UNI",
    tags: ["論説文", "生物多様性・環境政策", "国公立大", "約220語"],
    passage: `The Kunming-Montreal Global Biodiversity Framework, adopted at the United Nations Biodiversity Conference (COP15) in December 2022, established a global target — often summarised as "30x30" — to protect at least 30 percent of the world's land and oceans by 2030. It also committed signatories to mobilise at least $200 billion annually for biodiversity-related spending and to reform subsidies harmful to biodiversity. The framework represented the most ambitious international biodiversity agreement since the Convention on Biological Diversity was adopted in Rio de Janeiro in 1992.

The agreement emerged against a backdrop of accelerating biodiversity loss. The 2019 Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services (IPBES) Global Assessment estimated that approximately one million plant and animal species face extinction, many within decades. Key drivers include habitat destruction through land conversion for agriculture, overexploitation of species, invasive species, pollution, and climate change.

The framework's "30x30" target has attracted both support and criticism. Proponents argue that protected areas, when effectively managed, deliver multiple benefits: carbon sequestration, watershed protection, climate adaptation, and the maintenance of ecosystem services upon which human wellbeing depends. Critics, however, warn that rushed area protection risks repeating the errors of "fortress conservation" — the forcible displacement of indigenous and local communities from lands they have managed sustainably for generations — and that area coverage alone is a poor proxy for ecosystem health if protected areas are poorly managed or are biodiversity-sparse.`,
    questions: [
      {
        questionText:
          "What does the '30x30' target in the Kunming-Montreal Framework commit signatories to?",
        options: [
          "Reducing greenhouse gas emissions by 30 percent compared to 1990 levels by 2030.",
          "Protecting at least 30 percent of the world's land and oceans by 2030.",
          "Eliminating 30 categories of invasive species from protected areas by 2030.",
          "Allocating 30 percent of national environmental budgets to biodiversity by 2030.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

「30x30の目標」：
"to protect at least 30 percent of the world's land and oceans by 2030"
（2030年までに世界の陸地と海洋の少なくとも30%を保護する）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "According to the IPBES assessment, what are the key drivers of current biodiversity loss?",
        options: [
          "Ocean acidification, drought, rising temperatures, and deforestation alone.",
          "Habitat destruction, overexploitation, invasive species, pollution, and climate change.",
          "Urban sprawl, industrial fishing, genetically modified organisms, and air pollution.",
          "Desertification, loss of pollinators, antibiotic resistance, and soil degradation.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「生物多様性喪失の主要な要因（5つ）」：
①habitat destruction through land conversion（土地転換による生息地破壊）
②overexploitation of species（種の過剰搾取）
③invasive species（侵入種）
④pollution（汚染）
⑤climate change（気候変動）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What does the passage mean by 'fortress conservation'?",
        options: [
          "Encircling protected areas with physical barriers to prevent poaching.",
          "Prioritising carbon-rich areas for protection over areas of high biodiversity.",
          "Forcibly displacing indigenous and local communities from ancestral lands designated as protected areas.",
          "Restricting access to protected areas exclusively to scientific researchers.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第3段落末文が根拠です。

「要塞保全」の定義：
"'fortress conservation' — the forcible displacement of indigenous and local communities from lands they have managed sustainably for generations"
（要塞保全 — 何世代にもわたって持続的に管理してきた土地から先住民・地域コミュニティを強制的に立ち退かせること）

→ C が正確な言い換えです。`,
      },
    ],
  },

  // P7-2: 私立大 / 加速主義と左右の思想 / 約210語
  {
    id: "accelerationism-political-thought",
    title: "Accelerationism: A Political Idea and Its Troubling Variants",
    level: "PRIVATE_UNI",
    tags: ["論説文", "政治思想・過激主義", "私立大", "約210語"],
    passage: `Accelerationism — the idea that political or social transformation can be hastened by intensifying the contradictions or crises inherent in the existing system rather than working for gradual reform — has a complex intellectual history rooted in Marxist theory but has in recent decades been adopted and transformed by political movements across the ideological spectrum.

In its original left-wing form, accelerationist thinkers such as Nick Land in his later work and post-workerist theorists argued that deliberately accelerating the contradictions of late capitalism — through radical automation, the dissolution of traditional labour relations, and the embrace of technological disruption — would hasten capitalism's inherent collapse and create conditions for a postcapitalist political order. Critics within the left argued that this strategy abandoned the immediate protection of vulnerable workers in favour of a speculative long-term gamble.

More recently and more alarmingly, right-wing accelerationist movements — particularly within white nationalist and neo-fascist networks — have adopted a violent interpretation: deliberately destabilising democratic institutions, provoking social conflict, and committing acts of political violence to accelerate what they perceive as an inevitable racial or civilisational confrontation. Law enforcement agencies in multiple countries have identified right-wing accelerationist networks as a primary domestic terrorism threat, noting their explicit rejection of electoral participation in favour of violent confrontation with state authority.`,
    questions: [
      {
        questionText:
          "What is the core idea of accelerationism as defined in the opening paragraph?",
        options: [
          "The belief that political change is best achieved through peaceful democratic reform processes.",
          "The idea that transformation comes from intensifying existing contradictions rather than pursuing gradual reform.",
          "The economic theory that rapid technological development inevitably produces political instability.",
          "The philosophical view that historical progress follows a predictable linear trajectory.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

「加速主義の核心的考え」：
"political or social transformation can be hastened by intensifying the contradictions or crises inherent in the existing system rather than working for gradual reform"
（漸進的改革に取り組むのではなく、既存のシステムに内在する矛盾や危機を激化させることで政治的・社会的変革を早めることができる）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What criticism was made of left-wing accelerationism?",
        options: [
          "That it was too closely associated with authoritarian communist regimes.",
          "That it abandoned immediate protection of vulnerable workers for a speculative long-term gamble.",
          "That it failed to account for the political power of conservative institutions.",
          "That its predictions about capitalism's collapse were based on faulty economic models.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「左翼加速主義への批判」：
"this strategy abandoned the immediate protection of vulnerable workers in favour of a speculative long-term gamble"
（この戦略は、投機的な長期的賭けのために脆弱な労働者の即時保護を放棄した）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "How does right-wing accelerationism differ from its left-wing counterpart, according to the passage?",
        options: [
          "Right-wing accelerationism focuses on economic disruption rather than political violence.",
          "Right-wing accelerationism seeks racial or civilisational confrontation through violence rather than economic transformation.",
          "Right-wing accelerationism works within electoral systems to rapidly advance its goals.",
          "Right-wing accelerationism rejects technology and seeks a return to pre-industrial society.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

「右翼加速主義の特徴」：
・民主主義的制度の意図的な不安定化
・社会的対立の誘発
・政治的暴力の遂行
・目的：「人種的・文明的対立」の加速

vs 左翼加速主義：資本主義の矛盾の激化・自動化・技術的混乱

→ B「暴力を通じた人種的・文明的対立の追求」が右翼の特徴として正確です。`,
      },
    ],
  },

  // P7-3: 共通テスト / テクノロジーと孤独 / 約195語
  {
    id: "technology-loneliness-connection",
    title: "Technology, Loneliness, and the Paradox of Hyper-Connection",
    level: "COMMON_TEST",
    tags: ["論説文", "テクノロジー・孤独", "共通テスト", "約195語"],
    passage: `Loneliness has been declared a public health epidemic in several high-income countries. In the United Kingdom, a government Minister for Loneliness was appointed in 2018 following a report finding that over nine million people — nearly one in five adults — frequently felt lonely. In the United States, the Surgeon General issued a 2023 advisory describing loneliness as a "loneliness epidemic" with health consequences comparable to smoking 15 cigarettes per day.

The apparent paradox is that these trends have emerged alongside the most technologically connected period in human history. Social media platforms, messaging applications, and video calling have made it possible to communicate instantly with anyone in the world, yet survey data consistently shows declining rates of deep social connection — defined as feeling genuinely understood, supported, and valued by others.

Researchers distinguish between the quantity and quality of social connection. Online communication, studies suggest, is more efficient for maintaining existing relationships and broadcasting information than for building the kind of deep, reciprocal bonds that provide emotional support during stress. Face-to-face interaction, with its non-verbal cues, shared physical presence, and spontaneity, appears to be disproportionately effective at building the strong social bonds that protect against loneliness.`,
    questions: [
      {
        questionText:
          "What paradox does the passage identify regarding loneliness?",
        options: [
          "Wealthy nations experience more loneliness than poorer nations, despite having better social welfare systems.",
          "Loneliness trends have worsened during the most technologically connected period in human history.",
          "People report feeling lonely even when surrounded by large numbers of social contacts.",
          "Medical treatment for loneliness is widely available but rarely sought by those who need it.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

「逆説」：
"these trends have emerged alongside the most technologically connected period in human history"
（これらのトレンドは人類史上最もテクノロジー的につながった時代と並行して出現した）

→ B「孤独の増加が最も技術的につながった時代に起きている」が正確な言い換えです。

【語彙ポイント】
・"apparent paradox"（明らかな逆説）: 表面的には矛盾しているように見える状況。`,
      },
      {
        questionText:
          "How does the passage define 'deep social connection'?",
        options: [
          "Having a large number of regular contacts across multiple social platforms.",
          "Feeling genuinely understood, supported, and valued by others.",
          "Maintaining daily in-person contact with family members or close friends.",
          "Participating actively in community organisations and civic groups.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落末文が根拠です。

「深い社会的つながりの定義」：
"feeling genuinely understood, supported, and valued by others"
（他者に本当に理解され、支えられ、大切にされていると感じること）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What does the passage say makes face-to-face interaction particularly effective for combating loneliness?",
        options: [
          "It allows people to spend more time together than online communication permits.",
          "It is free from the social pressures and comparison that social media creates.",
          "Its non-verbal cues, shared physical presence, and spontaneity build strong social bonds.",
          "It is the only form of interaction proven to reduce cortisol levels and stress hormones.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落末文が根拠です。

「対面交流が特に効果的な理由（3つ）」：
①"non-verbal cues"（非言語的手がかり）
②"shared physical presence"（共有された物理的存在）
③"spontaneity"（自発性・即興性）

→ C が正確にまとめています。`,
      },
    ],
  },

  // P7-4: 国公立大 / 国際刑事裁判所と国家主権 / 約218語
  {
    id: "icc-sovereignty-accountability",
    title: "The International Criminal Court: Universal Accountability and Sovereignty Tensions",
    level: "NATIONAL_UNI",
    tags: ["論説文", "国際法・主権", "国公立大", "約218語"],
    passage: `The International Criminal Court (ICC), established by the Rome Statute in 2002, represents the first permanent international tribunal with jurisdiction to prosecute individuals for genocide, crimes against humanity, war crimes, and the crime of aggression. Its creation embodied the principle that individuals — including heads of state — can be held criminally accountable under international law, a principle whose theoretical foundations were laid at the Nuremberg and Tokyo tribunals following World War II.

The Court's operations have, however, exposed fundamental tensions between international accountability norms and state sovereignty. Several African governments have accused the ICC of selective prosecution, arguing that it disproportionately targets African leaders while ignoring comparable atrocities committed by citizens of powerful states not party to the Rome Statute — notably the United States, Russia, and China — thereby perpetuating a form of neo-colonial justice. These criticisms gained political force when the African Union called for collective withdrawal from the Court, though few states ultimately withdrew.

The ICC also faces structural constraints. It operates on the principle of complementarity — intervening only when national courts are unable or unwilling to prosecute genuinely — which means it handles only a small fraction of international crimes. It lacks its own enforcement mechanism and depends entirely on state cooperation for the arrest and surrender of suspects, a dependency that has significantly hampered proceedings when states with custody of suspects decline to cooperate.`,
    questions: [
      {
        questionText:
          "What principle did the creation of the ICC embody?",
        options: [
          "That international organisations can override national legal systems in all criminal matters.",
          "That individuals, including heads of state, can be held criminally accountable under international law.",
          "That military intervention is justified whenever crimes against humanity are being committed.",
          "That all states must adopt identical criminal codes aligned with Rome Statute definitions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「ICCの創設が体現した原則」：
"individuals — including heads of state — can be held criminally accountable under international law"
（国家元首を含む個人が国際法の下で刑事的に責任を問われうる）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What specific accusation have African governments made against the ICC?",
        options: [
          "That the ICC's judges are predominantly from Western Europe and lack cultural competence.",
          "That the ICC selectively prosecutes African leaders while ignoring atrocities by citizens of powerful non-member states.",
          "That the ICC's penalties are too lenient to deter future atrocities.",
          "That the ICC has exceeded its mandate by prosecuting economic crimes not covered by the Rome Statute.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「アフリカ諸国政府の非難」：
"it disproportionately targets African leaders while ignoring comparable atrocities committed by citizens of powerful states not party to the Rome Statute"
（ローマ規程の締約国でない強力な国家（米国・ロシア・中国）の市民が犯した同様の残虐行為を無視しながら、アフリカの指導者を不均衡に標的にしている）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What is the principle of 'complementarity' under which the ICC operates?",
        options: [
          "The rule that the ICC must complement its prosecution by requiring states to also conduct parallel national trials.",
          "The ICC's policy of sharing evidence with national courts to strengthen domestic prosecutions.",
          "The principle that the ICC intervenes only when national courts are unable or unwilling to prosecute genuinely.",
          "The ICC's practice of complementing criminal prosecution with reparations to victims.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第3段落第2文が根拠です。

「補完性の原則」の定義：
"operating on the principle of complementarity — intervening only when national courts are unable or unwilling to prosecute genuinely"
（補完性の原則の下で運営されており — 国内裁判所が真剣に訴追できないか、またはそうする意思がない場合にのみ介入する）

→ C が正確な言い換えです。`,
      },
    ],
  },

  // P7-5: 私立大 / メタバースと現実の融合 / 約205語
  {
    id: "metaverse-digital-physical-convergence",
    title: "The Metaverse: Digital-Physical Convergence and Its Social Implications",
    level: "PRIVATE_UNI",
    tags: ["論説文", "メタバース・テクノロジー社会", "私立大", "約205語"],
    passage: `The "metaverse" — loosely defined as persistent, immersive, three-dimensional virtual worlds where users interact through digital avatars and engage in social, commercial, and creative activities — was the subject of enormous corporate investment and media speculation following Meta's (formerly Facebook) announced pivot in 2021. Early boosters envisioned it as the successor to the mobile internet, a spatial computing environment that would subsume work, entertainment, shopping, education, and social interaction into integrated digital-physical experiences.

The initial hype has moderated considerably. Consumer adoption of virtual reality headsets has grown but remains well below the projections that justified major early investment; the dominant early "metaverse" experiences have been game-adjacent platforms such as Roblox and Fortnite rather than the productivity and social environments their corporate champions envisioned. Meta itself wrote off over $40 billion on its Reality Labs metaverse division with limited consumer traction by 2024.

Nonetheless, analysts point to convergences that remain genuinely significant: the rise of digital twins — precise virtual replicas of physical infrastructure used for simulation, planning, and monitoring; extended reality applications in surgery, industrial training, and architectural design; and the growing economic significance of virtual goods, from gaming skins to digital fashion, which collectively represent a multi-billion dollar market demonstrating sustained consumer willingness to pay for digital-only goods.`,
    questions: [
      {
        questionText:
          "What vision did early metaverse boosters promote?",
        options: [
          "That the metaverse would primarily serve as a platform for political deliberation and digital democracy.",
          "That the metaverse would become the successor to mobile internet, integrating work, entertainment, shopping, education, and social interaction.",
          "That the metaverse would replace physical retail entirely within a decade of launch.",
          "That the metaverse would allow developing countries to access educational resources previously unavailable.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「初期の熱狂的支持者のビジョン」：
"a spatial computing environment that would subsume work, entertainment, shopping, education, and social interaction into integrated digital-physical experiences"
（仕事・エンターテインメント・買い物・教育・社会的交流を統合されたデジタル・物理的体験に包含する空間コンピューティング環境）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What does the passage say about the actual early performance of metaverse products?",
        options: [
          "Consumer adoption exceeded initial projections, particularly among older demographics.",
          "VR headset adoption grew but remained below projections, with game platforms dominating rather than productivity environments.",
          "The metaverse achieved widespread adoption in Asia before reaching Western markets.",
          "Corporate investment was insufficient to develop the infrastructure the metaverse required.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落が根拠です。

「実際の初期パフォーマンス」：
①「VRヘッドセットの消費者採用は増加したが、大きな初期投資を正当化した予測を大幅に下回った」
②「支配的なメタバース体験はゲーム隣接プラットフォーム（Roblox・Fortnite）— 生産性・社会環境ではない」

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What examples of genuinely significant digital-physical convergences does the passage give?",
        options: [
          "Smart speakers, autonomous vehicles, and wearable health monitors.",
          "Digital twins, extended reality in medicine and training, and virtual goods markets.",
          "Social media recommendation algorithms, e-commerce platforms, and digital payments.",
          "Blockchain-based property records, AI-assisted legal systems, and biometric identification.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

「真に重要なデジタル・物理的収束（3つ）」：
①"digital twins — precise virtual replicas of physical infrastructure"（デジタルツイン：物理インフラの仮想レプリカ）
②"extended reality applications in surgery, industrial training, and architectural design"（外科・産業訓練・建築設計での拡張現実）
③"virtual goods ... from gaming skins to digital fashion"（バーチャルグッズ：ゲームスキンからデジタルファッションまで）

→ B が正確にまとめています。`,
      },
    ],
  },

  // P7-6: 共通テスト / 睡眠負債と現代社会 / 約190語
  {
    id: "sleep-debt-modern-society",
    title: "Sleep Deprivation, Cognitive Performance, and the Cost of the 24-Hour Society",
    level: "COMMON_TEST",
    tags: ["論説文", "睡眠科学・公衆衛生", "共通テスト", "約190語"],
    passage: `Sleep researchers have identified what they describe as a global "sleep deprivation epidemic," with survey data indicating that a majority of adults in industrialised nations regularly sleep less than the seven to nine hours per night recommended by sleep scientists. The consequences are not merely personal: chronic sleep deprivation is associated with increased risks of cardiovascular disease, obesity, type 2 diabetes, impaired immune function, and reduced life expectancy.

The cognitive effects of sleep loss are particularly well documented. Studies show that after 17 to 19 hours without sleep, cognitive impairment on attention, working memory, and reaction time tasks is equivalent to that caused by a blood alcohol level of 0.05 percent — the legal driving limit in many countries. Despite this, people who are chronically sleep-deprived typically underestimate their own impairment, making self-assessment unreliable.

Cultural and institutional factors drive sleep deprivation. In many professional and academic environments, long working hours and limited sleep are worn as badges of dedication and resilience. Shift work and irregular schedules — affecting approximately 20 percent of the workforce in industrialised economies — impose unavoidable circadian disruption. Researchers advocate for institutional responses including later school start times for adolescents, whose circadian rhythms shift to later sleep-wake cycles during puberty.`,
    questions: [
      {
        questionText:
          "What cognitive state is equivalent to 17-19 hours without sleep, according to the passage?",
        options: [
          "The cognitive state produced by moderate physical exhaustion after intense exercise.",
          "The impairment equivalent to a blood alcohol level of 0.05 percent.",
          "The disorientation experienced during the first 30 minutes after waking from deep sleep.",
          "The reduced attention caused by moderate caffeine withdrawal.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「17〜19時間睡眠なしの認知的状態」：
"cognitive impairment on attention, working memory, and reaction time tasks is equivalent to that caused by a blood alcohol level of 0.05 percent"
（注意・作業記憶・反応時間の認知障害は血中アルコール濃度0.05%によって引き起こされるものと同等）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What does the passage say about people's ability to assess their own sleep deprivation?",
        options: [
          "People consistently overestimate how much sleep deprivation affects their performance.",
          "Chronically sleep-deprived people typically underestimate their own cognitive impairment.",
          "People accurately estimate their level of impairment but choose to work despite it.",
          "Only people with pre-existing health conditions fail to recognise sleep deprivation symptoms.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「睡眠不足の自己評価」：
"people who are chronically sleep-deprived typically underestimate their own impairment, making self-assessment unreliable"
（慢性的に睡眠不足の人は自分自身の障害を過小評価する傾向があり、自己評価を信頼できないものにしている）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "Why does the passage say adolescents in particular need later school start times?",
        options: [
          "Because adolescents have heavier homework loads and need more time for evening study.",
          "Because their circadian rhythms naturally shift to later sleep-wake cycles during puberty.",
          "Because early school start times increase anxiety about academic performance among teenagers.",
          "Because adolescents require more total sleep hours than adults due to their rapid physical growth.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

「青少年が特に遅い登校時間を必要とする理由」：
"whose circadian rhythms shift to later sleep-wake cycles during puberty"
（思春期に概日リズムがより遅い睡眠・覚醒サイクルにシフトする）

→ B が正確な言い換えです。

【語彙ポイント】
・"circadian rhythms"（概日リズム）: 約24時間周期の生体リズム。睡眠・覚醒サイクルに影響する。`,
      },
    ],
  },

  // P7-7: 国公立大 / 大航海時代と知識の流通 / 約222語
  {
    id: "age-of-exploration-knowledge-exchange",
    title: "The Age of Exploration, Natural History, and the Globalisation of Scientific Knowledge",
    level: "NATIONAL_UNI",
    tags: ["論説文", "科学史・植民地主義", "国公立大", "約222語"],
    passage: `The European voyages of exploration from the fifteenth century onward did not merely open maritime trade routes or facilitate colonial extraction — they precipitated one of the largest reorganisations of biological and botanical knowledge in human history. Naturalists, physicians, and botanists accompanying or following these expeditions encountered thousands of previously unknown plant, animal, and mineral species from the Americas, Africa, and Asia, initiating a centuries-long project of classification, documentation, and incorporation into European scientific systems.

This knowledge transfer was far from a simple or innocent exchange. Indigenous and local populations across the colonised world possessed sophisticated empirical knowledge of the biological resources of their environments, accumulated over generations through observation, experimentation, and oral transmission. European naturalists regularly appropriated this knowledge — learning from indigenous guides and healers which plants had medicinal, nutritional, or toxic properties — without acknowledgement, compensation, or attribution. The quinine treatment for malaria, derived from the bark of the cinchona tree, was initially identified through indigenous knowledge systems in the Andes before being extracted, commercialised, and attributed to European medical science.

Contemporary debates about "biopiracy" — the appropriation of genetic resources and associated traditional knowledge without consent or benefit-sharing — draw directly on this historical pattern. The Convention on Biological Diversity and the Nagoya Protocol attempt to establish frameworks for equitable access and benefit-sharing, though their implementation remains inconsistent across national jurisdictions.`,
    questions: [
      {
        questionText:
          "What does the passage say the European voyages of exploration primarily precipitated in terms of knowledge?",
        options: [
          "The development of the first global postal and communication systems.",
          "One of the largest reorganisations of biological and botanical knowledge in human history.",
          "The standardisation of scientific measurement systems across European universities.",
          "The first systematic study of ocean currents and meteorological patterns.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

「探検の航海が引き起こしたこと」：
"they precipitated one of the largest reorganisations of biological and botanical knowledge in human history"
（人類史上最大の生物学的・植物学的知識の再編成の一つを引き起こした）

→ B が正確な言い換えです。

【語彙ポイント】
・"precipitate"（引き起こす・促進する）: 予期しない急激な変化を引き起こすこと。`,
      },
      {
        questionText:
          "How, according to the passage, was indigenous knowledge treated by European naturalists?",
        options: [
          "It was respected and formally integrated into European academic curricula with proper attribution.",
          "It was dismissed as superstition and replaced entirely by European scientific methodology.",
          "It was regularly appropriated without acknowledgement, compensation, or attribution.",
          "It was documented in detail but kept secret within colonial administrations for commercial advantage.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第2〜3文が根拠です。

「先住民の知識の扱い方」：
"European naturalists regularly appropriated this knowledge ... without acknowledgement, compensation, or attribution"
（ヨーロッパの博物学者はこの知識を謝辞・補償・帰属なしに定期的に流用した）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "What is 'biopiracy' as the passage describes it, and what frameworks address it?",
        options: [
          "Illegal trade in endangered species; addressed by the CITES convention.",
          "Appropriation of genetic resources and traditional knowledge without consent; addressed by the CBD and Nagoya Protocol.",
          "Patent protection of pharmaceutical compounds; addressed by WTO trade agreements.",
          "Theft of seed varieties by multinational corporations; addressed by FAO plant treaty.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

「バイオパイラシーの定義と対応枠組み」：
定義："the appropriation of genetic resources and associated traditional knowledge without consent or benefit-sharing"
（同意や利益分配なしに遺伝資源と関連する伝統的知識を流用すること）

対応枠組み："The Convention on Biological Diversity and the Nagoya Protocol attempt to establish frameworks for equitable access and benefit-sharing"
（生物多様性条約と名古屋議定書は公正なアクセスと利益配分の枠組み確立を試みている）

→ B が正確にまとめています。`,
      },
    ],
  },

  // P7-8: 私立大 / アルゴリズムとコンテンツ推薦 / 約208語
  {
    id: "recommendation-algorithms-content-diet",
    title: "Recommendation Algorithms, Filter Bubbles, and the Shaping of Information Diets",
    level: "PRIVATE_UNI",
    tags: ["論説文", "アルゴリズム・情報環境", "私立大", "約208語"],
    passage: `The dominant digital platforms of the twenty-first century — search engines, social media feeds, streaming services, and news aggregators — rely on recommendation algorithms that personalise content delivery to maximise individual user engagement. These systems analyse viewing, clicking, sharing, and search history to build detailed models of user preferences and serve content predicted to hold attention for the longest duration.

The consequences for public discourse have attracted sustained scholarly attention. Eli Pariser's influential concept of the "filter bubble" proposed that algorithmic personalisation creates self-reinforcing information environments in which users are primarily exposed to content that confirms their existing beliefs, preferences, and interests, while contrary or challenging information is filtered out. If correct, this has troubling implications for democratic deliberation, which requires exposure to diverse viewpoints and shared factual frameworks.

Empirical research has, however, produced a more complicated picture. Studies examining actual browsing behaviour find that ideological "echo chambers" are less prevalent and less severe than the filter bubble hypothesis suggests; cross-cutting exposure to different political viewpoints occurs more frequently than predicted. The more significant driver of partisan polarisation in online environments may not be algorithmic selection but human selective exposure — the tendency of individuals to actively avoid information that challenges their existing views, a phenomenon predating the internet that algorithms merely facilitate and amplify.`,
    questions: [
      {
        questionText:
          "What goal do recommendation algorithms primarily optimise for?",
        options: [
          "Exposing users to a diverse range of viewpoints to promote balanced information consumption.",
          "Maximising individual user engagement by serving content predicted to hold attention.",
          "Maximising advertising revenue by promoting content from paying commercial partners.",
          "Reducing the spread of misinformation by prioritising content from verified news sources.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「レコメンデーションアルゴリズムの主な最適化目標」：
"serve content predicted to hold attention for the longest duration"
（最も長く注意を引き続けると予測されるコンテンツを配信する）

→ B が正確な言い換えです。

つまり個人のエンゲージメント（滞在時間・クリック率など）の最大化が目的です。`,
      },
      {
        questionText:
          "What is the 'filter bubble' hypothesis?",
        options: [
          "The argument that internet platforms profit from spreading outrage and divisive content.",
          "The concern that algorithmic personalisation creates self-reinforcing environments confirming existing beliefs.",
          "The observation that users spend more time on social media than reading quality journalism.",
          "The finding that algorithms systematically promote extreme content over moderate viewpoints.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第2文が根拠です。

「フィルターバブルの定義」：
"algorithmic personalisation creates self-reinforcing information environments in which users are primarily exposed to content that confirms their existing beliefs, preferences, and interests, while contrary or challenging information is filtered out"
（アルゴリズムによるパーソナライゼーションが、ユーザーが主に既存の信念・好み・関心を確認するコンテンツにさらされる自己強化的な情報環境を作り出し、反対または挑戦的な情報が除外される）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What do empirical studies suggest is the more significant driver of partisan polarisation online?",
        options: [
          "Algorithmic selection of extreme content that users would not otherwise seek out.",
          "Deliberate manipulation of recommendation systems by political actors.",
          "Human selective exposure — the tendency to actively avoid challenging information.",
          "The concentration of news production among a small number of ideologically biased media companies.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落末文が根拠です。

「より重要な分極化の要因」：
"The more significant driver of partisan polarisation in online environments may not be algorithmic selection but human selective exposure — the tendency of individuals to actively avoid information that challenges their existing views, a phenomenon predating the internet that algorithms merely facilitate and amplify"
（オンライン環境での党派的分極化のより重要な要因は、アルゴリズム選択ではなく人間の選択的露出かもしれない — 個人が既存の見解に挑戦する情報を積極的に避ける傾向 — インターネット以前から存在する現象でアルゴリズムは単にそれを促進・増幅させるだけ）

→ C が正確な言い換えです。`,
      },
    ],
  },

  // P7-9: 共通テスト / 再生可能エネルギーの課題 / 約192語
  {
    id: "renewable-energy-storage-challenges",
    title: "Renewable Energy, Intermittency, and the Grid Storage Challenge",
    level: "COMMON_TEST",
    tags: ["論説文", "再生可能エネルギー・電力", "共通テスト", "約192語"],
    passage: `Solar and wind energy have become the cheapest sources of new electricity generation in most of the world, with the cost of solar photovoltaic panels falling by more than 90 percent over the past decade. These reductions have driven remarkable growth in renewable energy capacity, and in some countries, wind and solar now supply the majority of electricity on favourable days.

The central challenge facing electricity grids with high penetrations of renewable energy is intermittency: solar panels do not generate electricity at night, and both solar and wind output fluctuates with weather conditions. Electricity grids must maintain an instantaneous balance between generation and consumption; when supply and demand diverge, grid frequency destabilises and blackouts can occur.

Managing intermittency requires a combination of solutions: long-duration energy storage to smooth supply over hours or days; flexible backup generation — either low-emission sources such as hydropower or controlled demand reduction through "smart grid" technologies — and expanded grid interconnections that allow regions with surplus generation to share power with those in deficit. Battery storage costs have fallen rapidly, but achieving the storage capacity needed to decarbonise electricity systems entirely through solar and wind will require continued technology advances and very large-scale deployment.`,
    questions: [
      {
        questionText:
          "What has happened to the cost of solar photovoltaic panels over the past decade?",
        options: [
          "Costs have increased due to rising demand for raw materials used in panel manufacturing.",
          "Costs have remained stable while energy output per panel has improved significantly.",
          "Costs have fallen by more than 90 percent.",
          "Costs have halved, making solar energy cheaper than natural gas in most markets.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第1文が根拠です。

"the cost of solar photovoltaic panels falling by more than 90 percent over the past decade"
（太陽光パネルのコストが過去10年間で90%以上低下した）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "Why does the passage say intermittency is a central challenge for renewable energy grids?",
        options: [
          "Because renewable energy requires new transmission lines that are expensive to build.",
          "Because electricity grids must maintain an instantaneous balance between generation and consumption.",
          "Because consumers are unwilling to adjust their electricity use based on renewable supply levels.",
          "Because renewable energy equipment requires frequent maintenance that interrupts supply.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「変動性が課題である理由」：
"Electricity grids must maintain an instantaneous balance between generation and consumption; when supply and demand diverge, grid frequency destabilises and blackouts can occur"
（電力グリッドは発電と消費の間の瞬間的なバランスを維持しなければならない；供給と需要が乖離すると、グリッド周波数が不安定になり停電が発生する可能性がある）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What combination of solutions does the passage say is needed to manage renewable energy intermittency?",
        options: [
          "Nuclear power, carbon capture, and underground cable installation.",
          "Long-duration storage, flexible backup generation or demand reduction, and expanded grid interconnections.",
          "Consumer behaviour change, smart meters in every home, and increased energy efficiency.",
          "International energy trading agreements, undersea cables, and large gas reserves.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落第1〜2文が根拠です。

「変動性管理に必要な解決策の組み合わせ（3つ）」：
①"long-duration energy storage"（長期エネルギー貯蔵）
②"flexible backup generation ... or controlled demand reduction through 'smart grid' technologies"（柔軟なバックアップ発電またはスマートグリッド技術による需要削減）
③"expanded grid interconnections"（拡張されたグリッド相互接続）

→ B が正確にまとめています。`,
      },
    ],
  },

  // P7-10: 国公立大 / ゲノム医療と倫理 / 約215語
  {
    id: "genomic-medicine-ethics",
    title: "Genomic Medicine, Predictive Testing, and the Ethics of Genetic Knowledge",
    level: "NATIONAL_UNI",
    tags: ["論説文", "ゲノム医療・生命倫理", "国公立大", "約215語"],
    passage: `Advances in genome sequencing technology — including the dramatic reduction in the cost of whole-genome sequencing from approximately $3 billion for the first human genome in 2003 to under $100 today — are transforming medicine's capacity to predict, prevent, and personalise the treatment of disease. Genomic medicine promises to identify individuals at elevated risk of conditions such as hereditary breast and ovarian cancer, cardiovascular disease, and familial hypercholesterolaemia years or decades before onset, enabling preventive interventions that could significantly reduce disease burden.

These capabilities raise profound ethical questions that medical ethics frameworks are still working to address. Predictive genetic testing for serious conditions creates a distinctive psychological burden: individuals learning of elevated genetic risk must navigate uncertainty about whether and when a condition will manifest, potentially altering life decisions about career, relationships, reproduction, and insurance with consequences they may not have anticipated or desired. The "right not to know" — the interest some individuals have in not receiving information about genetic predispositions they cannot control — has gained recognition as a legitimate dimension of patient autonomy.

Downstream social risks include potential genetic discrimination in insurance and employment, a concern that has led numerous countries to enact legislation prohibiting genetic discrimination while debates continue about whether existing protections are adequate given the pace of genomic data collection by direct-to-consumer testing companies.`,
    questions: [
      {
        questionText:
          "What does the passage say has happened to the cost of whole-genome sequencing since 2003?",
        options: [
          "It has remained stable at approximately $3 billion due to the complexity of the process.",
          "It has fallen from approximately $3 billion to under $100.",
          "It has fallen by around 50 percent to approximately $1.5 billion.",
          "It has become freely available through national health services in most high-income countries.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

「全ゲノム解析のコスト変化」：
"from approximately $3 billion for the first human genome in 2003 to under $100 today"
（2003年の最初の人間ゲノムの約30億ドルから現在の100ドル未満まで）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What is the 'right not to know' as described in the passage?",
        options: [
          "The legal right of patients to withhold their genetic information from employers.",
          "The right of healthcare providers to withhold uncertain test results from patients.",
          "The interest some individuals have in not receiving information about genetic predispositions they cannot control.",
          "The right of individuals to decline participation in genetic research studies.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第2段落末文が根拠です。

「知らない権利」の定義：
"The 'right not to know' — the interest some individuals have in not receiving information about genetic predispositions they cannot control"
（知らない権利 — コントロールできない遺伝的素因に関する情報を受け取らないことへの一部の個人の関心）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "What social risk related to genomics has led many countries to enact specific legislation?",
        options: [
          "The risk that genomic databases could be hacked and used for identity theft.",
          "The risk that genomic medicine will increase healthcare costs unaffordably.",
          "The risk of genetic discrimination in insurance and employment.",
          "The risk that genomic research will be monopolised by private companies.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

「多くの国が特定の法律を制定した社会的リスク」：
"Downstream social risks include potential genetic discrimination in insurance and employment, a concern that has led numerous countries to enact legislation prohibiting genetic discrimination"
（下流の社会的リスクには保険・雇用における潜在的な遺伝的差別が含まれ、これは多くの国が遺伝的差別を禁止する法律を制定することにつながった懸念事項）

→ C が正確な言い換えです。`,
      },
    ],
  },
];
