import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_5: SpeedReadingProblem[] = [
  // P5-1: 共通テスト / オーバーツーリズムと地域社会 / 約138語 / 57秒
  {
    id: "overtourism-local-communities",
    title: "Overtourism and the Pressure on Local Communities",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "観光・地域社会", "共通テスト", "約138語"],
    passage: `The term "overtourism" describes the situation in which tourist numbers overwhelm a destination's capacity to accommodate them without degrading residents' quality of life or damaging the natural and cultural heritage that attracts visitors in the first place. Popular destinations from Venice to Kyoto have reported rising housing costs, congested infrastructure, and the displacement of local businesses by tourist-oriented shops and restaurants.

Solving overtourism is complicated by the economic dependence many communities have developed on visitor spending. Simply restricting access risks damaging livelihoods, yet allowing unlimited growth destroys the very character that draws tourists. Several cities have implemented timed entry systems for popular sites, visitor caps, and pricing structures that differentiate between residents and tourists. Others have redirected promotional campaigns toward lesser-known areas, attempting to distribute visitor flows more evenly across a region rather than concentrating them in a few iconic spots.`,

    questions: [
      {
        questionText: "How does the passage define 'overtourism'?",
        options: [
          "A situation in which tourists behave disrespectfully toward local cultures and heritage sites.",
          "A condition in which tourist numbers exceed a destination's capacity without harming residents or heritage.",
          "The phenomenon where excessive tourist numbers degrade residents' lives and the very attractions that draw visitors.",
          "A marketing term used by the travel industry to describe overcrowded budget travel destinations.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第1段落第1文が定義です。

"the situation in which tourist numbers overwhelm a destination's capacity to accommodate them without degrading residents' quality of life or damaging the natural and cultural heritage that attracts visitors in the first place"

定義の要素：
①観光客数が収容能力を「overwhelm（圧倒）」する
②「住民の生活の質を低下させる（degrading residents' quality of life）」
③「観光客を引き付ける自然・文化遺産を損なう（damaging the ... heritage that attracts visitors）」

→ C が正確な言い換えです。

【語彙ポイント】
・"overwhelm"（圧倒する）: 処理能力を大幅に超えること。
・"in the first place"（そもそも）: ある状況の根本的な前提を示す。`,
      },
      {
        questionText: "What dilemma does the passage identify for communities affected by overtourism?",
        options: [
          "Whether to invest in new infrastructure or preserve the historic character of popular sites.",
          "Restricting tourists risks economic harm, but allowing unlimited growth destroys the destination's appeal.",
          "Whether to charge tourists higher prices or reduce the number of businesses that serve them.",
          "The conflict between protecting natural heritage and preserving cultural traditions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：ジレンマ把握問題】
正解は B。第2段落第2文が根拠です。

「ジレンマの構造」：
・「アクセスを制限すると生計が損なわれる（restricting access risks damaging livelihoods）」
・「無制限の成長を許すと観光客を引き付ける特性が破壊される（allowing unlimited growth destroys the very character that draws tourists）」

→ B が二項対立の構造を正確に表現しています。

【語彙ポイント】
・"livelihoods"（生計・生活手段）: 収入を得る手段・生活を支える仕事。
・"the very character"（まさにその特性）: "very" が名詞を強調する用法。`,
      },
      {
        questionText: "What strategy does the passage mention for redistributing tourist flows?",
        options: [
          "Increasing taxes on international flights to make travel to popular destinations more expensive.",
          "Building new tourist facilities outside city centres to reduce congestion in historic areas.",
          "Redirecting promotional campaigns toward lesser-known areas to spread visitors more evenly.",
          "Requiring tourists to register in advance and participate in guided tours only.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"Others have redirected promotional campaigns toward lesser-known areas, attempting to distribute visitor flows more evenly across a region rather than concentrating them in a few iconic spots."

・「知名度の低い地域へのプロモーションキャンペーンの転換（redirected promotional campaigns toward lesser-known areas）」
・目的：「訪問者の流れをより均等に分散（distribute visitor flows more evenly）」

→ C が正確な言い換えです。`,
      },
    ],
  },

  // P5-2: 国公立大 / プラセボ効果の神経科学 / 約178語 / 74秒
  {
    id: "placebo-neuroscience",
    title: "The Placebo Effect: Expectation, Neurobiology, and Clinical Implications",
    level: "NATIONAL_UNI",
    timeLimit: 74,
    tags: ["論説文", "神経科学・医学", "国公立大", "約178語", "分詞構文"],
    passage: `The placebo effect — the measurable, reproducible improvement in patient outcomes following administration of an inert treatment — was long dismissed as a methodological nuisance in clinical research. Contemporary neuroscience has fundamentally revised this view, revealing the placebo response as a sophisticated neurobiological phenomenon driven by expectation, conditioning, and the social context of healing.

Neuroimaging studies have demonstrated that placebo analgesia — pain relief produced by an inert substance — activates the same endogenous opioid pathways engaged by pharmacological pain relievers. Patients who receive a placebo injection while being told it contains a powerful painkiller show measurably lower pain ratings and produce elevated levels of endorphins, providing compelling evidence that the mechanism is physiological rather than purely psychological. The effect is dose-dependent: patients receiving two placebo pills report greater relief than those receiving one, mimicking the dose-response relationships observed with active drugs.

Clinically, open-label placebo trials — in which patients are explicitly informed they are receiving a sugar pill — have produced unexpectedly positive outcomes in conditions including irritable bowel syndrome and lower back pain, suggesting that therapeutic ritual and clinician-patient relationship carry genuine physiological consequences independent of deception.`,

    questions: [
      {
        questionText: "How has neuroscience changed our understanding of the placebo effect?",
        options: [
          "It has confirmed that the placebo effect is entirely psychological and involves no physical changes.",
          "It has shown the placebo response is a genuine neurobiological phenomenon driven by expectation and context.",
          "It has proven that placebo effects are produced by the power of suggestion rather than brain chemistry.",
          "It has revealed that placebo effects only occur in patients who are predisposed to anxiety.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比・変化の把握】
正解は B。第1段落の対比構造が根拠です。

従来の見方: "was long dismissed as a methodological nuisance"（長い間、方法論的な厄介者として退けられていた）

現代の神経科学による改訂: "revealing the placebo response as a sophisticated neurobiological phenomenon driven by expectation, conditioning, and the social context of healing"
（期待・条件付け・治癒の社会的文脈によって駆動される洗練された神経生物学的現象として明らかにした）

→ B が正確な言い換えです。

【語彙ポイント】
・"methodological nuisance"（方法論的な厄介者）: 臨床研究の「誤差・ノイズ」として扱われていたこと。
・"endogenous opioid pathways"（内因性オピオイド経路）: 脳内で自然に産生される鎮痛物質の神経経路。`,
      },
      {
        questionText: "What evidence does the passage provide that placebo analgesia has a physiological basis?",
        options: [
          "Patients who believe strongly in a treatment always recover faster than those who do not.",
          "Placebo injections activate opioid brain pathways and elevate endorphin levels measurably.",
          "Brain scans show reduced blood flow to pain centres when placebos are administered.",
          "Patients given placebos report being unaware that they did not receive real medication.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：証拠特定問題】
正解は B。第2段落第2文が根拠です。

生理学的基盤の証拠：
①「プラセボ注射を受けた患者は測定可能なほど低い痛みスコアを示す（measurably lower pain ratings）」
②「エンドルフィンレベルが上昇する（elevated levels of endorphins）」
③「薬理学的鎮痛剤が関与するのと同じ内因性オピオイド経路が活性化する（activates the same endogenous opioid pathways）」

→ B「プラセボ注射がオピオイド脳内経路を活性化し、エンドルフィンを測定可能に上昇させる」が正確です。`,
      },
      {
        questionText: "What do open-label placebo trials suggest about why placebos work?",
        options: [
          "That patients must be deceived about receiving a placebo for the effect to occur.",
          "That the therapeutic ritual and clinician-patient relationship have genuine physiological effects.",
          "That placebos work only in conditions where the symptoms are primarily psychological.",
          "That all medical treatments, including active drugs, derive most of their effects from expectation.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

「オープンラベル・プラセボ試験」の発見：
・「砂糖錠剤を受けていることを明示的に告知されても、予想外にポジティブな結果が出た（produced unexpectedly positive outcomes）」

この発見が示唆すること：
"suggesting that therapeutic ritual and clinician-patient relationship carry genuine physiological consequences independent of deception"
（騙しとは独立した、治療的儀式と医師-患者関係の真の生理学的結果）

→ B が正確です。

【語彙ポイント】
・"open-label"（オープンラベル）: 患者が何を受けているかを知っている試験。blindedの反対。
・"independent of deception"（欺きとは独立した）: 患者を騙さなくてもプラセボ効果は起こる。`,
      },
    ],
  },

  // P5-3: 私立大 / 機械学習のバイアス問題 / 約162語 / 68秒
  {
    id: "ml-algorithmic-bias",
    title: "Algorithmic Bias and the Challenge of Fair Machine Learning",
    level: "PRIVATE_UNI",
    timeLimit: 68,
    tags: ["論説文", "AI・社会的公正", "私立大", "約162語"],
    passage: `Machine learning systems trained on historical data inevitably inherit the biases encoded in that data, raising profound concerns about their deployment in high-stakes decision-making contexts such as credit scoring, criminal justice risk assessment, and hiring. If historical hiring data reflects decades of gender or racial discrimination, a model trained to predict "successful employees" will replicate — and potentially amplify — those discriminatory patterns, even without any explicit instruction to discriminate.

This problem is compounded by the opacity of many modern machine learning models. Deep neural networks, despite their impressive predictive accuracy, offer limited insight into the reasoning processes that generate their outputs — a characteristic researchers describe as the "black box" problem. When a loan applicant is denied credit by an algorithmic system, the inability to provide a transparent explanation of the decision raises serious concerns about accountability, legal compliance with anti-discrimination law, and the basic principle that consequential decisions affecting individuals should be explainable.

Fairness-aware machine learning — the development of algorithms that explicitly optimize for defined fairness criteria alongside predictive accuracy — represents an active area of research, though defining "fairness" mathematically has itself proven controversial, as different mathematical definitions are provably incompatible with one another.`,

    questions: [
      {
        questionText: "Why does the passage suggest historical training data is problematic for machine learning?",
        options: [
          "Because historical data is often incomplete and contains too many missing values to be reliable.",
          "Because models trained on historical data can replicate and amplify past discriminatory patterns.",
          "Because historical data is owned by private companies and is difficult for researchers to access.",
          "Because historical data reflects outdated social norms that are irrelevant to modern decision-making.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1〜2文が根拠です。

「歴史的データの問題」：
・"inherit the biases encoded in that data"（データにエンコードされたバイアスを引き継ぐ）
・"a model trained to predict 'successful employees' will replicate — and potentially amplify — those discriminatory patterns"（差別的パターンを複製し、増幅する可能性）

→ B「過去の差別的なパターンを複製・増幅する可能性がある」が正確です。

【語彙ポイント】
・"amplify"（増幅する）: 既存のバイアスをさらに大きくすること。
・"replicate"（複製する・再現する）: 過去のパターンを繰り返すこと。`,
      },
      {
        questionText: "What is the 'black box' problem described in the passage?",
        options: [
          "The difficulty of preventing hackers from accessing sensitive personal data used in machine learning.",
          "The tendency of machine learning models to make random errors that cannot be predicted in advance.",
          "The opacity of many ML models, which provide accurate predictions but cannot explain their reasoning.",
          "The problem of data being stored in incompatible formats that prevent different systems from sharing information.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第2段落第1〜2文が根拠です。

"Deep neural networks, despite their impressive predictive accuracy, offer limited insight into the reasoning processes that generate their outputs — a characteristic researchers describe as the 'black box' problem."

定義の要素：
・「印象的な予測精度にもかかわらず（despite their impressive predictive accuracy）」
・「出力を生成する推論プロセスへの洞察が限られている（offer limited insight into the reasoning processes）」

→ C「多くのMLモデルの不透明性：正確な予測はできるが推論を説明できない」が正確です。`,
      },
      {
        questionText: "What challenge does the passage identify in developing fair machine learning algorithms?",
        options: [
          "The high computational cost of adding fairness constraints to existing models.",
          "The resistance of technology companies to implementing fairness criteria in their products.",
          "Different mathematical definitions of fairness are provably incompatible with each other.",
          "Governments have not yet established legal standards for algorithmic fairness.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落末文が根拠です。

"defining 'fairness' mathematically has itself proven controversial, as different mathematical definitions are provably incompatible with one another."

・「数学的に『公正さ』を定義すること自体が論争的（controversial）」
・「異なる数学的定義は互いに証明可能なほど相容れない（provably incompatible with one another）」

→ C が正確な言い換えです。

【語彙ポイント】
・"provably"（証明可能なほど）: 数学的証明によって示されていること。
・"incompatible"（相容れない・両立不可能な）: 二つの定義を同時に満たすことができない。`,
      },
    ],
  },

  // P5-4: 共通テスト / 動物の感情と認知 / 約142語 / 58秒
  {
    id: "animal-cognition-emotions",
    title: "Animal Cognition, Emotional Experience, and the Question of Sentience",
    level: "COMMON_TEST",
    timeLimit: 58,
    tags: ["論説文", "動物行動・倫理", "共通テスト", "約142語"],
    passage: `Scientific understanding of animal cognition and emotional experience has undergone a significant revision in recent decades. The long-dominant view — rooted in behaviorist psychology — held that attributing emotional states to non-human animals was an unscientific form of anthropomorphism. Empirical research has progressively eroded this position.

Studies have documented behaviours in a wide range of species — including corvids, cephalopods, elephants, and non-human primates — that suggest capacities for problem-solving, tool use, empathy, grief, and self-recognition that were previously considered uniquely human. The Cambridge Declaration on Consciousness, signed by a prominent group of neuroscientists in 2012, formally recognized that non-human animals possess the neurological substrates for conscious states.

These findings have significant ethical implications. If animals experience genuine suffering, then standard practices in industrial agriculture, laboratory testing, and wildlife management may require fundamental reassessment — a prospect that generates considerable resistance from industries and governments with strong economic interests in the status quo.`,

    questions: [
      {
        questionText: "What was the behaviorist view regarding animal emotions that the passage describes?",
        options: [
          "That animals have emotional states but these are far simpler than human emotions.",
          "That attributing emotional states to animals is unscientific anthropomorphism.",
          "That animal emotions can be reliably inferred from observations of physical behavior alone.",
          "That some animals have emotions but most species lack the brain structure for emotional experience.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

"The long-dominant view — rooted in behaviorist psychology — held that attributing emotional states to non-human animals was an unscientific form of anthropomorphism."

行動主義心理学の従来の支配的見解：
「非人間動物に感情状態を帰属させることは非科学的な擬人化（anthropomorphism）の一形態」

→ B が正確な言い換えです。

【語彙ポイント】
・"behaviorist"（行動主義の）: 観察可能な行動のみを研究対象とする心理学の立場。
・"anthropomorphism"（擬人化）: 人間以外のものに人間の特性・感情を帰属させること。`,
      },
      {
        questionText: "What did the Cambridge Declaration on Consciousness formally recognize?",
        options: [
          "That chimpanzees and dolphins should receive legal rights equivalent to those of humans.",
          "That non-human animals possess the neurological basis for conscious experience.",
          "That animal intelligence tests should be standardized across all research institutions.",
          "That behaviorist psychology had been completely refuted by modern neuroscience.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"The Cambridge Declaration on Consciousness, signed by a prominent group of neuroscientists in 2012, formally recognized that non-human animals possess the neurological substrates for conscious states."

「非人間動物が意識状態のための神経学的基盤（neurological substrates）を持つことを公式に認めた」

→ B「非人間動物が意識的経験のための神経学的基盤を持つ」が正確です。

【語彙ポイント】
・"neurological substrates"（神経学的基盤）: 意識や感情を生み出す物理的な神経回路・構造。
・"formally recognized"（公式に認めた）: 科学コミュニティが正式に認定したこと。`,
      },
      {
        questionText: "What ethical implication does the passage draw from evidence of animal sentience?",
        options: [
          "Animals that demonstrate self-recognition should be granted full legal personhood.",
          "Practices in farming, testing, and wildlife management may need fundamental reconsideration.",
          "Governments should immediately ban all forms of animal experimentation.",
          "Pet ownership should be more strictly regulated to prevent psychological harm to animals.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落第2文が根拠です。

"If animals experience genuine suffering, then standard practices in industrial agriculture, laboratory testing, and wildlife management may require fundamental reassessment"

条件文の構造：
・条件：「動物が真の苦痛を体験するならば（If animals experience genuine suffering）」
・結論：「産業農業・実験室試験・野生動物管理における標準的慣行が根本的な再評価を要する可能性（may require fundamental reassessment）」

→ B が正確な言い換えです。

【語彙ポイント】
・"sentience"（感覚能力・知覚力）: 苦痛や喜びなどを主観的に感じる能力。
・"status quo"（現状）: ラテン語由来。現在の状態・既存の状況。`,
      },
    ],
  },

  // P5-5: 国公立大 / モダンマネタリー理論の論争 / 約182語 / 76秒
  {
    id: "mmt-debate",
    title: "Modern Monetary Theory: Claims, Critiques, and Policy Implications",
    level: "NATIONAL_UNI",
    timeLimit: 76,
    tags: ["論説文", "経済理論・財政", "国公立大", "約182語", "譲歩構文"],
    passage: `Modern Monetary Theory (MMT) is a heterodox school of macroeconomics that challenges mainstream assumptions about government debt and fiscal policy. Its central claim is that a currency-issuing government — one that borrows exclusively in its own currency — can never be forced into involuntary default, because it can always create additional money to service its debt obligations. From this, MMT proponents argue that the real constraint on government spending is not the availability of money but the availability of real resources: if productive capacity and labour are available, deficit spending can expand the economy without causing inflation.

Critics, most prominently mainstream Keynesian and neoclassical economists, contend that this reasoning is correct in a narrow accounting sense but dangerously misleading as a guide to policy. While a currency-issuing government cannot run out of money in a nominal sense, they argue, unconstrained money creation risks generating demand that exceeds the economy's productive capacity, causing inflation that erodes purchasing power and disproportionately harms the poor. The historical examples of hyperinflation in Weimar Germany, Zimbabwe, and Venezuela are typically invoked as cautionary precedents.

MMT advocates respond that these cases involved supply-side shocks and loss of productive capacity rather than policy choices, and that careful monitoring of inflation indicators should serve as the operational constraint on spending.`,

    questions: [
      {
        questionText: "What is the central claim of Modern Monetary Theory regarding government spending?",
        options: [
          "That governments should aim for a balanced budget to prevent the national debt from growing.",
          "That the real constraint on government spending is productive capacity, not money availability.",
          "That currency-issuing governments should prioritize export growth to fund public services.",
          "That deficit spending always causes inflation and should be limited to emergency situations.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"MMT proponents argue that the real constraint on government spending is not the availability of money but the availability of real resources"

NOT A but B 構文：
A = the availability of money（資金の可用性）← 制約ではない
B = the availability of real resources（実際の資源の可用性）← 真の制約

→ B「政府支出の真の制約は資金の利用可能性ではなく生産能力である」が正確です。

【語彙ポイント】
・"heterodox"（異端の・主流に反する）: 正統・主流から外れた立場。"orthodox"（正統）の反対。
・"currency-issuing government"（通貨発行政府）: 自国通貨を発行できる政府（例：日本・米国）。`,
      },
      {
        questionText: "What do mainstream economists argue is the real danger of MMT-guided policy?",
        options: [
          "That it would lead to currency appreciation, making exports less competitive.",
          "That unlimited money creation can generate inflation that harms the purchasing power of the poor.",
          "That government spending crowds out private investment, reducing long-term economic growth.",
          "That it ignores the role of international trade in determining a country's fiscal capacity.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"unconstrained money creation risks generating demand that exceeds the economy's productive capacity, causing inflation that erodes purchasing power and disproportionately harms the poor"

・「制約なき資金創出」→「経済の生産能力を超えた需要創出」→「インフレ」→「購買力侵食」+「貧困層への不均衡な打撃」

→ B が正確な言い換えです。

【語彙ポイント】
・"erodes"（侵食する）: じわじわと减らすこと。"erosion of purchasing power"（購買力の侵食）は重要経済語。
・"disproportionately"（不均衡に）: 影響が偏って大きいこと。`,
      },
      {
        questionText: "How do MMT advocates respond to the historical examples of hyperinflation?",
        options: [
          "By arguing that hyperinflation always results from external sanctions rather than domestic policy.",
          "By claiming that hyperinflation cases occurred in countries that had abandoned their own currencies.",
          "By contending that those cases involved supply-side shocks and lost productive capacity rather than policy choices.",
          "By insisting that modern monitoring technology would have prevented those historical episodes.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"MMT advocates respond that these cases involved supply-side shocks and loss of productive capacity rather than policy choices"

MMT擁護者の反論：
「それらの事例は政策選択ではなく、供給側のショックと生産能力の喪失によるものだった」

→ C が正確な言い換えです。

【語彙ポイント】
・"supply-side shocks"（供給側のショック）: 生産・供給能力を突然低下させる出来事（戦争、自然災害、輸出禁止等）。
・"cautionary precedents"（警告的な先例）: 同じ失敗を繰り返さないための歴史的教訓。`,
      },
    ],
  },

  // P5-6: 私立大 / 核融合エネルギーの展望 / 約163語 / 68秒
  {
    id: "nuclear-fusion-prospects",
    title: "Nuclear Fusion: The Promise and Persistent Challenges of Clean Energy",
    level: "PRIVATE_UNI",
    timeLimit: 68,
    tags: ["論説文", "エネルギー科学", "私立大", "約163語"],
    passage: `Nuclear fusion — the process that powers the sun and stars, in which light atomic nuclei combine to release enormous quantities of energy — has been described as the perpetual next step in energy technology: always twenty years away from commercialization. In December 2022, however, researchers at the National Ignition Facility in California achieved a historic milestone, producing more energy from a fusion reaction than the laser energy delivered to the fuel target — a condition known as ignition, or "scientific breakeven."

This achievement, while genuinely significant, must be placed in perspective. The lasers that delivered energy to the target consumed approximately 300 times more electrical energy than was released by the fusion reaction itself — a ratio that must be drastically reduced for fusion to become a viable power source. Furthermore, engineering a system capable of sustaining and harvesting fusion reactions continuously, managing the extreme plasma temperatures of 100 million degrees Celsius, and developing materials durable enough to withstand bombardment by high-energy neutrons remains a formidable set of challenges.

Nevertheless, multiple private fusion companies have attracted billions in investment, reflecting renewed optimism that commercialization may arrive sooner than the traditional pessimism suggested.`,

    questions: [
      {
        questionText: "What was historically said about nuclear fusion commercialization, according to the passage?",
        options: [
          "That it was technically impossible and would never be achieved under any circumstances.",
          "That it was always predicted to be about twenty years away from becoming a reality.",
          "That it would only become viable after solar and wind energy had already replaced fossil fuels.",
          "That only governments, not private companies, had the resources to develop it.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

"has been described as the perpetual next step in energy technology: always twenty years away from commercialization"

「常に商業化まで20年先にある（always twenty years away from commercialization）」という表現は、核融合が長年にわたって「常に近い将来に実現する」と言われ続けてきたことの皮肉な表現。

→ B が正確な言い換えです。

【語彙ポイント】
・"perpetual"（永続する・絶え間ない）: "perpetually" = 常に・永遠に。
・"commercialization"（商業化）: 研究段階から実用・商業的生産段階への移行。`,
      },
      {
        questionText: "Why does the passage say the 2022 NIF achievement must be 'placed in perspective'?",
        options: [
          "Because the experiment was conducted under artificial conditions that cannot be replicated in a real power plant.",
          "Because the lasers used consumed about 300 times more electrical energy than the fusion reaction released.",
          "Because the energy released by the reaction was too small to power even a single household.",
          "Because the milestone had already been achieved by a European research team the previous year.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

"The lasers that delivered energy to the target consumed approximately 300 times more electrical energy than was released by the fusion reaction itself"

・レーザーが消費した電気エネルギー ≈ 核融合反応が放出したエネルギーの約300倍
・「この比率を大幅に改善しなければ実用的な電源にならない（a ratio that must be drastically reduced）」

→ B が正確な言い換えです。

"placed in perspective"（文脈の中で適切に評価する）: 成果は本物だが、商業化には程遠いという留保。`,
      },
      {
        questionText: "What does the passage say about private investment in nuclear fusion?",
        options: [
          "Private companies have withdrawn from fusion research because the technical challenges are too great.",
          "Multiple private fusion companies have attracted billions in investment amid renewed optimism.",
          "Private investment is concentrated in Asia, while Western governments fund most fusion research.",
          "Private companies focus only on small-scale fusion reactors, while governments pursue large-scale systems.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

"multiple private fusion companies have attracted billions in investment, reflecting renewed optimism that commercialization may arrive sooner than the traditional pessimism suggested."

・複数の民間核融合企業（multiple private fusion companies）
・数十億ドルの投資（billions in investment）
・「商業化は従来の悲観論が示唆するよりも早く訪れるかもしれない（may arrive sooner）」という楽観論の再燃

→ B が正確な言い換えです。`,
      },
    ],
  },

  // P5-7: 共通テスト / ワークライフバランスと生産性 / 約137語 / 57秒
  {
    id: "work-life-balance-productivity",
    title: "Work-Life Balance, Employee Wellbeing, and Organisational Performance",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "労働・生産性", "共通テスト", "約137語"],
    passage: `The traditional model of maximizing employee productivity through longer working hours is increasingly challenged by evidence from organizational psychology and health economics. Studies from Scandinavian countries, where policies supporting work-life balance are most developed, consistently show that employees who work fewer hours per week demonstrate higher levels of concentration, creativity, and job satisfaction, and take fewer sick days.

Microsoft Japan's 2019 four-day work week experiment reported a 40 percent increase in productivity despite a 20 percent reduction in working time. Researchers attribute this counterintuitive outcome to the restoration of cognitive resources that are depleted by sustained mental effort, the reduction of counterproductive time-filling behaviours that expand to fill available time, and improved employee physical and mental health. Critics note that results from short-term pilot programs may not generalize to all industries, particularly those requiring continuous physical presence or complex project coordination across teams.`,

    questions: [
      {
        questionText: "What do studies from Scandinavian countries suggest about employees who work fewer hours?",
        options: [
          "They earn lower wages but report higher levels of personal happiness.",
          "They show higher concentration, creativity, job satisfaction, and fewer sick days.",
          "They are more likely to seek promotion but less likely to stay with the same employer.",
          "They produce less overall output but at significantly higher quality standards.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"employees who work fewer hours per week demonstrate higher levels of concentration, creativity, and job satisfaction, and take fewer sick days."

4つの効果：
①高い集中力（concentration）
②高い創造性（creativity）
③高い職務満足度（job satisfaction）
④少ない病欠（fewer sick days）

→ B が正確にまとめています。`,
      },
      {
        questionText: "What reason does the passage give for the productivity increase in Microsoft Japan's experiment?",
        options: [
          "Employees worked more efficiently because they feared losing their jobs if productivity did not increase.",
          "The shorter week forced managers to eliminate unnecessary meetings and administrative tasks.",
          "Cognitive resource restoration and reduction of time-filling behaviour improved health and output.",
          "Employees worked unpaid overtime on their extra day off to compensate for lost working hours.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第2文が根拠です。

「生産性向上の理由（3つ）」：
①「持続的な精神的努力によって消耗する認知資源の回復（restoration of cognitive resources that are depleted by sustained mental effort）」
②「利用可能な時間を埋めるための非生産的な行動の削減（reduction of counterproductive time-filling behaviours）」
③「従業員の身体的・精神的健康の改善（improved employee physical and mental health）」

→ C が①と②を正確にまとめています。

【語彙ポイント】
・"cognitive resources"（認知資源）: 集中力・判断力・思考力など、精神的な作業に使われる有限のリソース。
・"time-filling behaviours"（時間を埋める行動）: 成果に貢献しないが時間を消費する活動。`,
      },
      {
        questionText: "What limitation do critics identify with short-term pilot programs on work hours?",
        options: [
          "The cost of implementing reduced-hour programs often outweighs the productivity gains.",
          "Results may not apply to all industries, especially those needing continuous presence or team coordination.",
          "Pilot programs are too short to measure changes in employee health outcomes accurately.",
          "Managers tend to increase monitoring of employees, negating the wellbeing benefits.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"Critics note that results from short-term pilot programs may not generalize to all industries, particularly those requiring continuous physical presence or complex project coordination across teams."

批判の内容：
・「短期パイロットプログラムの結果はすべての産業に一般化できない可能性（may not generalize）」
・特に困難なケース：「継続的な物理的在席を要する産業」や「チーム横断的な複雑なプロジェクト調整を要する産業」

→ B が正確な言い換えです。`,
      },
    ],
  },

  // P5-8: 国公立大 / 遺産都市と修復倫理 / 約183語 / 76秒
  {
    id: "heritage-restoration-ethics",
    title: "Heritage Conservation, Authenticity, and the Ethics of Restoration",
    level: "NATIONAL_UNI",
    timeLimit: 76,
    tags: ["論説文", "文化遺産・倫理", "国公立大", "約183語"],
    passage: `The conservation and restoration of built heritage raises fundamental questions about authenticity, historical fidelity, and the obligations of the present to future generations. Two competing philosophies have dominated international conservation discourse since the mid-twentieth century. The Ruskin-Morris tradition, influential in Britain, holds that authenticity resides in original material fabric: replacing decayed elements with new materials creates an aesthetically deceptive simulation that violates the integrity of the historical record. Intervention should, on this view, be limited to stabilization and the consolidation of surviving original material, with decay accepted as an authentic dimension of the object's biography.

The opposing Viollet-le-Duc tradition — named for the nineteenth-century French architect who controversially restored several medieval French cathedrals to a hypothetical ideal state never achieved in history — holds that the function, visual unity, and instructional value of a monument justify reconstructing missing or damaged elements, even where this requires introducing new materials consistent in style but not in substance with the original.

UNESCO's Venice Charter of 1964 attempted to reconcile these traditions, endorsing the principle of reversibility — that any intervention should be capable of being undone by future restorers who possess different values or superior techniques.`,

    questions: [
      {
        questionText: "What is the central position of the Ruskin-Morris tradition on heritage conservation?",
        options: [
          "Historical monuments should be completely reconstructed to their original appearance using modern materials.",
          "Authenticity lies in original material, so intervention should be limited to stabilizing existing fabric.",
          "Heritage buildings should be adapted for modern use to ensure their economic sustainability.",
          "Restoration should prioritize visual unity and educational value over material authenticity.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第3〜4文が根拠です。

「ラスキン=モリス伝統の立場」：
①"authenticity resides in original material fabric"（真正性は元の素材・構造に宿る）
②"replacing decayed elements ... creates an aesthetically deceptive simulation that violates the integrity of the historical record"（新材料による置換は歴史記録の完全性を侵害）
③"Intervention should ... be limited to stabilization and the consolidation of surviving original material"（介入は安定化と現存する元素材の強化に限定すべき）

→ B「真正性は元の素材にあるため、介入は既存の構造の安定化に限るべき」が正確です。`,
      },
      {
        questionText: "How does the Viollet-le-Duc tradition differ from the Ruskin-Morris tradition?",
        options: [
          "It focuses on archaeological excavation rather than the restoration of standing structures.",
          "It prioritizes the visual unity and instructional value of monuments, justifying reconstruction of missing parts.",
          "It argues that modern replicas should replace deteriorating originals to better serve tourists.",
          "It holds that only buildings less than 500 years old are worth preserving through active restoration.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比問題】
正解は B。第2段落が根拠です。

「ヴィオレ=ル=デュク伝統の立場」：
"the function, visual unity, and instructional value of a monument justify reconstructing missing or damaged elements, even where this requires introducing new materials consistent in style but not in substance with the original"
・モニュメントの機能・視覚的統一性・教育的価値が欠損・損傷部分の再建を正当化
・様式は一致するが素材は異なる新材料の導入も許容

vs. ラスキン=モリス（元素材の保存のみ）

→ B「視覚的統一性と教育的価値を優先し、欠損部分の再建を正当化する」が正確です。`,
      },
      {
        questionText: "What principle did the Venice Charter introduce to reconcile the two traditions?",
        options: [
          "That only materials identical to the original should ever be used in restoration work.",
          "That all restored monuments must carry visible markers indicating which parts are new.",
          "That any intervention should be reversible, allowing future restorers to undo it if needed.",
          "That UNESCO must approve all major restoration projects before work begins.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"UNESCO's Venice Charter of 1964 attempted to reconcile these traditions, endorsing the principle of reversibility — that any intervention should be capable of being undone by future restorers who possess different values or superior techniques."

「可逆性の原則（principle of reversibility）」の定義：
ダッシュ以降：「異なる価値観や優れた技術を持つ将来の修復者が取り消せるものであること」

→ C「いかなる介入も、将来の修復者が必要に応じて元に戻せるものでなければならない」が正確です。

【語彙ポイント】
・"reversibility"（可逆性）: 元の状態に戻すことができる性質。
・"reconcile"（調和させる・折り合いをつける）: 対立する立場の間を取り持つこと。`,
      },
    ],
  },

  // P5-9: 私立大 / 孤独の流行と社会的なつながり / 約165語 / 69秒
  {
    id: "loneliness-epidemic",
    title: "The Loneliness Epidemic: Social Isolation and Its Health Consequences",
    level: "PRIVATE_UNI",
    timeLimit: 69,
    tags: ["論説文", "心理・社会問題", "私立大", "約165語"],
    passage: `Public health authorities in the United Kingdom, Japan, and the United States have independently identified social isolation and loneliness as epidemics warranting dedicated government intervention. The designation is not metaphorical: epidemiological research consistently classifies chronic loneliness as a risk factor for mortality comparable in magnitude to smoking fifteen cigarettes per day, with associations documented for cardiovascular disease, immune dysfunction, cognitive decline, and depression.

Counterintuitively, the rise of digital social networks has coincided with an increase in reported loneliness in many developed countries, particularly among young adults. Researchers propose several explanations: passive social media consumption — browsing others' curated presentations without active reciprocal engagement — may reinforce social comparison and feelings of exclusion rather than satisfying the neurological needs for genuine human connection. Furthermore, the displacement of time previously spent on face-to-face interaction by screen-based activity may reduce the frequency of the spontaneous, unplanned social encounters that build and sustain close relationships.

Structural interventions — redesigning urban spaces to promote incidental interaction, expanding community social infrastructure, and integrating loneliness screening into routine healthcare — are increasingly proposed as complements to individual-level digital wellness strategies.`,

    questions: [
      {
        questionText: "According to the passage, how severe is the health risk of chronic loneliness?",
        options: [
          "It is a minor health concern, similar in risk to occasional alcohol consumption.",
          "It is comparable in mortality risk to smoking fifteen cigarettes per day.",
          "It is the leading preventable cause of death in developed countries after obesity.",
          "It primarily affects elderly people and has limited health impacts on younger populations.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：具体的数値・比較の把握】
正解は B。第1段落末文が根拠です。

"epidemiological research consistently classifies chronic loneliness as a risk factor for mortality comparable in magnitude to smoking fifteen cigarettes per day"

比較表現：
・"comparable in magnitude to smoking fifteen cigarettes per day"（1日15本のタバコを吸うことに匹敵する）

→ B が正確な言い換えです。

【語彙ポイント】
・"comparable in magnitude to"（〜に匹敵する規模の）: 同程度の大きさ・重大さを持つことを示す比較表現。
・"epidemiological"（疫学的な）: 集団における疾患の分布・要因を研究する分野。`,
      },
      {
        questionText: "Why might passive social media use increase loneliness, according to the passage?",
        options: [
          "Because viewing others' happy posts reduces the desire to seek real-world social interaction.",
          "Because passive browsing reinforces social comparison and exclusion without fulfilling needs for genuine connection.",
          "Because social media algorithms show content that makes users feel socially inferior on purpose.",
          "Because young people spend so much time on social media that they become physically unfit.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"passive social media consumption — browsing others' curated presentations without active reciprocal engagement — may reinforce social comparison and feelings of exclusion rather than satisfying the neurological needs for genuine human connection"

メカニズム：
・「他者の作り込まれたプレゼンテーションを閲覧する（curated presentations without active reciprocal engagement）」
→「社会的比較と疎外感を強化（reinforce social comparison and feelings of exclusion）」
→「真の人間的つながりへの神経学的ニーズを満たさない（rather than satisfying the neurological needs for genuine human connection）」

→ B が正確な言い換えです。

【語彙ポイント】
・"curated"（厳選された）: 実際の生活から最も良い部分を選んで見せること。SNS上の「盛った」投稿。`,
      },
      {
        questionText: "What structural interventions does the passage suggest for addressing loneliness?",
        options: [
          "Reducing screen time limits for young people through legislation.",
          "Redesigning urban spaces, expanding social infrastructure, and integrating loneliness screening into healthcare.",
          "Requiring social media platforms to promote in-person meetups among their users.",
          "Funding research into anti-loneliness medications that address the neurological aspects of isolation.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

「構造的介入（Structural interventions）」の3つ：
①"redesigning urban spaces to promote incidental interaction"（偶発的な交流を促進するための都市空間の再設計）
②"expanding community social infrastructure"（コミュニティの社会的インフラの拡充）
③"integrating loneliness screening into routine healthcare"（定期的な医療ケアへの孤独スクリーニングの統合）

→ B が3つすべてを正確にまとめています。

【語彙ポイント】
・"incidental interaction"（偶発的な交流）: 計画なしに自然に生じる社会的接触。`,
      },
    ],
  },

  // P5-10: 共通テスト / 気候変動と農業 / 約143語 / 58秒
  {
    id: "climate-change-agriculture",
    title: "Climate Change and the Future of Global Food Security",
    level: "COMMON_TEST",
    timeLimit: 58,
    tags: ["論説文", "環境・農業・食料安全保障", "共通テスト", "約143語"],
    passage: `Climate change poses a multi-dimensional threat to global food security. Rising temperatures reduce crop yields for the staple grains — wheat, rice, and maize — that feed the majority of humanity. Research suggests that every 1°C increase in average temperature reduces wheat yields by approximately six percent. Changing precipitation patterns cause droughts in historically productive agricultural regions while flooding previously fertile land in others, disrupting the predictable growing seasons that farmers depend on.

The burden of these changes falls disproportionately on low-income tropical countries, which already experience the most extreme heat and are least able to invest in agricultural adaptation strategies such as drought-resistant crop varieties, precision irrigation, and climate-controlled greenhouse systems. Meanwhile, some higher-latitude regions in Canada and Russia may temporarily benefit from warmer temperatures that extend growing seasons, although researchers caution that soil quality, pest expansion, and water availability will limit these gains significantly.`,

    questions: [
      {
        questionText: "According to the passage, what happens to wheat yields for every 1°C rise in temperature?",
        options: [
          "They decrease by approximately 1 percent.",
          "They decrease by approximately 3 percent.",
          "They decrease by approximately 6 percent.",
          "They decrease by approximately 10 percent.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：数値把握問題】
正解は C。第1段落第3文が根拠です。

"Research suggests that every 1°C increase in average temperature reduces wheat yields by approximately six percent."

・気温1℃上昇 → 小麦収量の約6%減少

→ C が正確です。

数値問題では本文の数字を正確に読み取ることが重要です。
1%（A）・3%（B）・6%（C）・10%（D）のうち、本文は "approximately six percent" と明記しています。`,
      },
      {
        questionText: "Which countries does the passage say bear the disproportionate burden of climate change impacts on agriculture?",
        options: [
          "High-latitude countries in the Northern Hemisphere that have extended growing seasons.",
          "Island nations that face rising sea levels rather than temperature increases.",
          "Low-income tropical countries that are least able to invest in adaptation strategies.",
          "Developed nations in Europe that import most of their food from affected regions.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第1文が根拠です。

"The burden of these changes falls disproportionately on low-income tropical countries, which already experience the most extreme heat and are least able to invest in agricultural adaptation strategies"

・「不均衡に重くのしかかる（falls disproportionately）」のは「低所得の熱帯諸国（low-income tropical countries）」
・理由①：すでに最も激しい暑さを経験している
・理由②：農業適応戦略への投資能力が最も低い

→ C が正確な言い換えです。`,
      },
      {
        questionText: "What does the passage say about potential agricultural benefits in higher-latitude regions?",
        options: [
          "They will permanently transform Canada and Russia into the world's leading food exporters.",
          "They are expected to be significant and will fully offset losses in tropical agriculture.",
          "They may be temporary and will be significantly limited by soil quality, pests, and water issues.",
          "They depend on large government investments in irrigation and crop improvement technology.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"some higher-latitude regions in Canada and Russia may temporarily benefit from warmer temperatures that extend growing seasons, although researchers caution that soil quality, pest expansion, and water availability will limit these gains significantly."

構造 (although 節)：
主節: 「カナダ・ロシアなど高緯度地域は生育期間の延長で一時的に恩恵を受けるかもしれない（may temporarily benefit）」
although節: 「研究者らは土壌の質・害虫の拡大・水の利用可能性がこれらの恩恵を大幅に制限すると警告（will limit these gains significantly）」

→ C「一時的なものにとどまり、土壌・害虫・水の問題によって大幅に制限される」が正確です。`,
      },
    ],
  },
];
