import type { SpeedReadingProblem } from "@/lib/english-types";

export const SPEED_READING_PACK_4: SpeedReadingProblem[] = [
  // P4-1: 共通テスト / 再生可能エネルギーの課題 / 約135語 / 55秒
  {
    id: "renewable-energy-challenges",
    title: "Renewable Energy and the Challenge of Grid Stability",
    level: "COMMON_TEST",
    timeLimit: 55,
    tags: ["論説文", "再生可能エネルギー", "共通テスト", "約135語"],
    passage: `Solar and wind power have become the fastest-growing sources of electricity worldwide. Their dramatic cost reductions over the past decade have made renewable energy economically competitive with fossil fuels in many regions. However, the intermittent nature of these sources presents a significant challenge for grid operators: the sun does not always shine, and the wind does not always blow.

Maintaining the reliability of a power grid requires that supply and demand be balanced at every moment. When renewable output fluctuates unpredictably, grid operators must compensate using flexible backup sources, typically natural gas peaker plants, which emit greenhouse gases. Energy storage technologies, particularly large-scale lithium-ion batteries, are increasingly deployed to buffer these fluctuations. Yet current battery technology remains insufficient to store energy for more than a few hours, making long-duration storage one of the most pressing unresolved challenges in the transition to a clean energy economy.`,

    questions: [
      {
        questionText: "What does the passage identify as the primary challenge associated with solar and wind energy?",
        options: [
          "Their high installation costs compared to fossil fuel power plants.",
          "The difficulty of transporting electricity generated in remote areas.",
          "The unpredictable and intermittent nature of their power output.",
          "The shortage of skilled workers needed to maintain renewable infrastructure.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落末文が根拠です。

"the intermittent nature of these sources presents a significant challenge for grid operators: the sun does not always shine, and the wind does not always blow."

「間欠的な性質（intermittent nature）」= 常に安定して発電できないこと → C「予測不可能かつ間欠的な出力」が正確です。

【引っかけ分析】
・A「高いコスト」: 本文は「劇的なコスト低下（dramatic cost reductions）」を述べており、逆です。
・B「遠隔地からの電力輸送」: 本文に記述なし。
・D「技術者不足」: 本文に記述なし。

【語彙ポイント】
・"intermittent"（間欠的な）: 断続的に止まる・再開するという意味。
・"grid operators"（送電網の運用者）: 電力網を管理・運営する事業者。`,
      },
      {
        questionText: "According to the passage, what role do natural gas peaker plants currently play in the electricity system?",
        options: [
          "They provide the cheapest source of electricity during periods of peak demand.",
          "They compensate for fluctuations in renewable energy output as backup sources.",
          "They store surplus renewable electricity in large underground reservoirs.",
          "They are being phased out because battery storage has made them unnecessary.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"grid operators must compensate using flexible backup sources, typically natural gas peaker plants, which emit greenhouse gases."

「補償する（compensate）ために使われる柔軟なバックアップ電源（flexible backup sources）」= B「再生可能エネルギーの出力変動を補うバックアップ電源」

【引っかけ分析】
・A「最も安価な電源」: 本文にコスト比較の記述なし。
・C「余剰電力を地下に蓄える」: 貯蔵は電池の役割として説明されており、天然ガスプラントではありません。
・D「電池により不要になっている」: 本文は電池がまだ不十分（insufficient）と述べており、逆です。`,
      },
      {
        questionText: "What does the passage suggest is the most critical unresolved problem in clean energy transition?",
        options: [
          "The high greenhouse gas emissions produced by lithium-ion battery manufacturing.",
          "The lack of political will to phase out fossil fuels in most countries.",
          "The inability to store renewable energy for extended periods of time.",
          "The limited geographic areas suitable for installing solar and wind farms.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"current battery technology remains insufficient to store energy for more than a few hours, making long-duration storage one of the most pressing unresolved challenges in the transition to a clean energy economy."

・"insufficient to store energy for more than a few hours"（数時間以上の蓄電が不十分）
・"most pressing unresolved challenges"（最も緊急性の高い未解決課題）
→ C「再生可能エネルギーを長時間蓄えられないこと」が正確です。

【語彙ポイント】
・"long-duration storage"（長時間蓄電）: 数日〜数週間にわたる電力蓄積技術。
・"pressing"（緊急の・喫緊の）: "urgent" と同義。受験頻出語。`,
      },
    ],
  },

  // P4-2: 国公立大 / ソーシャルメディアと民主主義 / 約180語 / 75秒
  {
    id: "social-media-democracy",
    title: "Social Media Algorithms and the Fragmentation of Democratic Discourse",
    level: "NATIONAL_UNI",
    timeLimit: 75,
    tags: ["論説文", "SNS・民主主義", "国公立大", "約180語", "強調構文"],
    passage: `It is not the volume of information available online that poses the greatest threat to democratic deliberation, but rather the architecture of the algorithms that curate it. Social media platforms are engineered to maximize user engagement, and the most reliable predictor of engagement is emotional arousal — particularly outrage and indignation. As a consequence, content that provokes strong negative reactions consistently outperforms more measured, nuanced analysis in algorithmic ranking systems.

This dynamic has contributed to what researchers describe as "epistemic fragmentation" — a condition in which individuals inhabiting distinct information ecosystems share so few common factual premises that productive cross-partisan dialogue becomes structurally impossible. Unlike earlier media environments, where a limited number of broadcast outlets imposed a degree of informational commonality, contemporary social media platforms effectively permit individuals to construct entirely self-confirming realities.

Political theorists argue that this fragmentation undermines the deliberative preconditions of democracy — the shared epistemic foundations that enable citizens to disagree productively about values and priorities without contesting basic facts. The challenge, they contend, lies not in censorship or content restriction, but in redesigning platform incentive structures to reward accuracy and intellectual honesty over emotional provocation.`,

    questions: [
      {
        questionText: "What does the passage identify as the primary threat to democratic deliberation online?",
        options: [
          "The overwhelming volume of information that citizens are unable to process effectively.",
          "The deliberate spread of disinformation by foreign governments on social media.",
          "The design of algorithms that prioritize emotionally provocative content.",
          "The decline of traditional broadcast media as a source of shared information.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と強調構文】
正解は C。第1段落第1文の強調構文を正確に読むことが鍵です。

"It is not the volume of information available online that poses the greatest threat ... but rather the architecture of the algorithms that curate it."

【強調構文の構造】
It is not A that ..., but rather B.
A = the volume of information（情報量）← 脅威ではない
B = the architecture of the algorithms（アルゴリズムの設計）← これが最大の脅威

→ C「感情的に挑発的なコンテンツを優先するアルゴリズムの設計」が正確です。

【引っかけ分析】
・A「情報量」: 強調構文で明示的に否定されています。"not the volume" が明確な手がかり。
・B「外国政府による偽情報拡散」: 本文に記述なし。
・D「伝統的メディアの衰退」: 第2段落で言及されますが、これは脅威の原因ではなく比較対象として登場します。`,
      },
      {
        questionText: "According to the passage, what is 'epistemic fragmentation'?",
        options: [
          "The rapid spread of false information through algorithmically curated news feeds.",
          "A state in which people in different information bubbles lack enough shared factual ground for genuine dialogue.",
          "The cognitive overload experienced by users who consume too much online news.",
          "The inability of social media algorithms to distinguish fact from opinion.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第1文のダッシュ以降が定義です。

"epistemic fragmentation — a condition in which individuals inhabiting distinct information ecosystems share so few common factual premises that productive cross-partisan dialogue becomes structurally impossible."

定義の要素：
・「異なる情報エコシステムに生きる人々（individuals inhabiting distinct information ecosystems）」
・「共通の事実的前提をほとんど共有しない（share so few common factual premises）」
・「党派を超えた対話が構造的に不可能になる（productive cross-partisan dialogue becomes structurally impossible）」

→ B が正確な言い換えです。

【語彙ポイント】
・"epistemic"（認識論的な）: 知識・知識の正当化に関する。
・"premises"（前提）: 議論の出発点となる共通の事実認識。
・"cross-partisan"（党派を超えた）: 政党・派閥の枠を越えた。`,
      },
      {
        questionText: "What solution does the passage suggest for addressing the threat to democracy from social media?",
        options: [
          "Implementing government censorship to remove false or misleading content.",
          "Returning to a broadcast media system with a limited number of outlets.",
          "Redesigning platform incentive structures to reward accuracy over emotional provocation.",
          "Requiring users to verify their identities before posting political content.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落末文が根拠です。

"The challenge ... lies not in censorship or content restriction, but in redesigning platform incentive structures to reward accuracy and intellectual honesty over emotional provocation."

not A but B 構文：
・A = censorship or content restriction（検閲やコンテンツ制限）← 解決策ではない
・B = redesigning platform incentive structures to reward accuracy（正確さを報いるためのインセンティブ設計の見直し）← 真の解決策

→ C が正確です。

【引っかけ分析】
・A「検閲」: 本文が明示的に否定しています（"not in censorship or content restriction"）。
・B「放送メディアへの回帰」: 第2段落で過去の比較として言及されますが、解決策として提示されていません。
・D「本人確認」: 本文に記述なし。`,
      },
    ],
  },

  // P4-3: 私立大 / 超高齢社会と社会保障 / 約160語 / 68秒
  {
    id: "aging-society-welfare",
    title: "Super-Aging Societies and the Sustainability of Social Welfare Systems",
    level: "PRIVATE_UNI",
    timeLimit: 68,
    tags: ["論説文", "高齢化・社会保障", "私立大", "約160語"],
    passage: `Japan, South Korea, and several European nations are confronting the economic and social consequences of demographic inversion — a population structure in which the elderly substantially outnumber the young. As fertility rates have fallen below replacement level and life expectancy has continued to rise, the dependency ratio has inverted, placing unsustainable fiscal burdens on working-age populations who must fund pension, healthcare, and long-term care systems designed in an era of very different demographics.

Economists warn that conventional solutions — raising the retirement age, increasing immigration, or cutting benefits — each carry significant political and social costs, and that no single intervention is sufficient in isolation. What has emerged as a more promising complementary strategy is the active integration of older adults into the labor force beyond traditional retirement ages, combined with technology-enabled care that reduces the labor intensity of elder services. Automation and AI-assisted medical diagnostics, proponents argue, can stretch the capacity of a shrinking healthcare workforce without proportionally increasing expenditure.`,

    questions: [
      {
        questionText: "What does the passage mean by 'demographic inversion'?",
        options: [
          "A sudden population decline caused by a falling birth rate and rising mortality.",
          "A population structure where elderly people significantly outnumber younger generations.",
          "The reversal of historical migration patterns from urban to rural areas.",
          "A statistical phenomenon in which recorded births exceed actual births due to data errors.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第1段落第1文のダッシュ以降が定義です。

"demographic inversion — a population structure in which the elderly substantially outnumber the young"
（高齢者が若者を大幅に上回る人口構造）

→ B が正確な言い換えです。

【語彙ポイント】
・"demographic"（人口統計学的な）: 人口の構成や動態に関する。
・"inversion"（逆転）: 通常の順序や割合が反転すること。
・"outnumber"（数で上回る）: "the elderly substantially outnumber the young" = 高齢者が若者より大幅に多い。`,
      },
      {
        questionText: "Why does the passage suggest that conventional solutions to aging society problems are insufficient?",
        options: [
          "Because they focus exclusively on reducing healthcare costs without addressing pension funding.",
          "Because each solution carries significant costs and no single measure is adequate alone.",
          "Because they require constitutional amendments that are difficult to pass in democratic societies.",
          "Because older adults are unwilling to accept reduced benefits or continue working.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

"conventional solutions — raising the retirement age, increasing immigration, or cutting benefits — each carry significant political and social costs, and that no single intervention is sufficient in isolation."

2つの理由：
①「それぞれが大きな政治的・社会的コストを伴う（each carry significant ... costs）」
②「単一の介入だけでは不十分（no single intervention is sufficient in isolation）」

→ B が両方を正確にまとめています。

【列挙ダッシュの構文】
"conventional solutions — raising the retirement age, increasing immigration, or cutting benefits —"
ダッシュで囲まれた部分が "conventional solutions" の具体例（同格）。`,
      },
      {
        questionText: "What does the passage suggest AI and automation can contribute to solving the aging society problem?",
        options: [
          "They can completely replace human caregivers, eliminating the need for a healthcare workforce.",
          "They can increase the birth rate by reducing the cost of raising children.",
          "They can extend healthcare capacity without requiring proportionally more spending.",
          "They can persuade older adults to retire later by making work more comfortable.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"Automation and AI-assisted medical diagnostics, proponents argue, can stretch the capacity of a shrinking healthcare workforce without proportionally increasing expenditure."

・"stretch the capacity"（能力・対応力を拡大する）
・"without proportionally increasing expenditure"（支出を比例的に増やすことなく）

→ C「医療提供能力を支出に比例しない形で拡大できる」が正確です。

【語彙ポイント】
・"stretch the capacity"（能力を伸ばす・拡張する）: 少ないリソースでより多くをカバーすること。
・"proportionally"（比例的に）: 同じ割合で増加・変化すること。`,
      },
    ],
  },

  // P4-4: 共通テスト / マイクロプラスチックと海洋汚染 / 約138語 / 57秒
  {
    id: "microplastics-ocean",
    title: "Microplastics and the Hidden Crisis in Marine Ecosystems",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "環境問題・海洋汚染", "共通テスト", "約138語"],
    passage: `Microplastics — plastic particles smaller than five millimetres in diameter — have been detected in virtually every marine environment on Earth, from the deepest ocean trenches to Arctic sea ice. They originate from two primary sources: the breakdown of larger plastic debris through ultraviolet radiation and physical abrasion, and the direct release of synthetic microfibers from washing machines and industrial processes.

The ecological consequences are increasingly alarming. Marine organisms from plankton to whales ingest microplastics, which can accumulate in fatty tissues and transfer up the food chain, a process known as biomagnification. Laboratory studies have demonstrated that microplastic ingestion impairs reproduction, disrupts endocrine function, and reduces feeding activity in multiple species. Human exposure occurs through consumption of seafood, drinking water, and even airborne particles, though the long-term health impacts remain under active investigation.`,

    questions: [
      {
        questionText: "According to the passage, what are the two primary sources of microplastics in the ocean?",
        options: [
          "Industrial runoff from coastal factories and waste dumped from fishing vessels.",
          "The breakdown of larger plastics and the release of synthetic fibers during laundering.",
          "Plastic packaging from consumer goods and microbeads in personal care products.",
          "Underwater volcanic activity and the chemical decomposition of oil spills.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

2つの発生源：
①「紫外線と物理的摩耗による大型プラスチックの分解（the breakdown of larger plastic debris through ultraviolet radiation and physical abrasion）」
②「洗濯機・工業プロセスからの合成マイクロファイバーの直接放出（the direct release of synthetic microfibers from washing machines and industrial processes）」

→ B「大型プラスチックの分解と洗濯時の合成繊維の放出」が正確です。

【語彙ポイント】
・"abrasion"（摩耗）: 摩擦による表面の削れ・すり減り。
・"synthetic microfibers"（合成マイクロファイバー）: 化学繊維の衣類が洗濯時に脱落する微細繊維。`,
      },
      {
        questionText: "What is 'biomagnification' as described in the passage?",
        options: [
          "The process by which microplastics are broken down by marine bacteria into harmless compounds.",
          "A laboratory technique for measuring the concentration of microplastics in tissue samples.",
          "The increasing concentration of pollutants as they move up the food chain.",
          "The natural dispersal of microplastics from coastal areas to the open ocean.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第2段落第2文が根拠です。

"which can accumulate in fatty tissues and transfer up the food chain, a process known as biomagnification"

定義の要素：
・"accumulate in fatty tissues"（脂肪組織に蓄積する）
・"transfer up the food chain"（食物連鎖の上位に移行する）
→ 生物濃縮 = 食物連鎖を通じて汚染物質の濃度が増加していくプロセス

→ C「食物連鎖を上るにつれて汚染物質の濃度が高まること」が正確です。

【語彙ポイント】
・"biomagnification"（生物濃縮）: bio（生物）+ magnification（拡大）。
・"accumulate"（蓄積する）: 徐々に増えて溜まること。`,
      },
      {
        questionText: "What does the passage say about the health effects of microplastic exposure in humans?",
        options: [
          "They have been conclusively proven to cause cancer and endocrine disorders in humans.",
          "Human health is unaffected because microplastics are filtered out during digestion.",
          "The long-term impacts on human health are still being actively studied.",
          "Microplastics only affect humans who consume large amounts of seafood daily.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"Human exposure occurs through consumption of seafood, drinking water, and even airborne particles, though the long-term health impacts remain under active investigation."

・"remain under active investigation"（現在も積極的に研究中）= 長期的な健康影響はまだ解明されていない
→ C「長期的な人体への影響は現在も積極的に研究中」が正確です。

【though 節の働き】
"though the long-term health impacts remain under active investigation"
→ 譲歩節。「曝露経路はわかっているが、長期的影響はまだ不明」という留保を表す。

【引っかけ分析】
・A「確実に癌を引き起こすと証明された」: "remain under active investigation"（調査中）の段階であり、conclusively proven（確実に証明）ではありません。
・B「消化で除去される」: 本文に記述なし。`,
      },
    ],
  },

  // P4-5: 国公立大 / 宇宙デブリ問題 / 約178語 / 75秒
  {
    id: "space-debris-kessler",
    title: "Space Debris and the Kessler Syndrome: A Threat to Orbital Sustainability",
    level: "NATIONAL_UNI",
    timeLimit: 75,
    tags: ["論説文", "宇宙科学・環境", "国公立大", "約178語", "仮定法"],
    passage: `Low Earth orbit — the band of space extending from approximately 160 to 2,000 kilometres above Earth's surface — is becoming critically congested with defunct satellites, spent rocket stages, and debris fragments resulting from in-orbit collisions and deliberate anti-satellite weapon tests. NASA estimates that more than 27,000 trackable pieces of orbital debris currently encircle the planet, with millions more too small to track but sufficiently massive to inflict catastrophic damage on operational spacecraft.

The gravest theoretical risk is the Kessler Syndrome, first articulated by NASA scientist Donald Kessler in 1978. Should debris density in key orbital shells exceed a critical threshold, collisions would generate new fragments faster than atmospheric drag removes them. The resulting cascade would render entire orbital bands unusable for generations — potentially eliminating access to the communications, navigation, and Earth-observation satellites upon which modern civilization has become entirely dependent.

International efforts to develop active debris removal technologies and establish binding norms for satellite end-of-life disposal are underway, but progress remains slow relative to the accelerating pace of orbital congestion driven by commercial mega-constellations.`,

    questions: [
      {
        questionText: "What are the sources of orbital debris mentioned in the passage?",
        options: [
          "Meteorites that enter Earth's orbit and fragments ejected by solar flares.",
          "Defunct satellites, used rocket stages, and collision and weapons-test fragments.",
          "Experimental spacecraft abandoned by private companies and university research programs.",
          "Natural orbital bodies captured by Earth's gravity over millions of years.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

"defunct satellites, spent rocket stages, and debris fragments resulting from in-orbit collisions and deliberate anti-satellite weapon tests"

3つの発生源：
①「廃棄衛星（defunct satellites）」
②「使用済みロケット段（spent rocket stages）」
③「軌道上衝突と意図的な対衛星兵器試験による破片（debris fragments resulting from collisions and anti-satellite weapon tests）」

→ B が正確な言い換えです。

【語彙ポイント】
・"defunct"（機能停止した・廃棄された）: もはや機能していない。
・"spent"（使い果たした・使用済みの）: ロケットの推進剤を使い切った段。
・"debris"（デブリ・残骸）: 破片・廃棄物。`,
      },
      {
        questionText: "According to the passage, what would trigger the Kessler Syndrome?",
        options: [
          "A major government decision to discontinue funding for satellite maintenance programs.",
          "A solar electromagnetic pulse that simultaneously disables thousands of active satellites.",
          "Debris density exceeding a threshold at which collisions create fragments faster than they are removed.",
          "The launch of commercial mega-constellations that interfere with existing navigation systems.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と仮定法の解析】
正解は C。第2段落第2文が根拠です。

"Should debris density in key orbital shells exceed a critical threshold, collisions would generate new fragments faster than atmospheric drag removes them."

【仮定法の構造】
Should S V（= If S should V）: 万が一〜の場合 → 条件節で "should" が文頭に倒置。
結果節: "collisions would generate new fragments faster than atmospheric drag removes them"

トリガー条件: 「主要な軌道帯のデブリ密度が臨界閾値を超えること」
結果: 「衝突が大気抵抗による除去より速く新たな破片を生成するカスケード」

→ C が正確です。

【語彙ポイント】
・"threshold"（閾値・臨界点）: ある変化が起きる分岐点となる数値・水準。
・"cascade"（連鎖反応）: 一つの出来事が次々と引き起こす連鎖。`,
      },
      {
        questionText: "What concern does the passage express about international efforts to address the debris problem?",
        options: [
          "Nations are deliberately creating more debris to deny other countries access to orbit.",
          "The technology needed to remove debris does not yet exist and cannot be developed.",
          "Progress is too slow given how rapidly orbital congestion is growing.",
          "International agreements on debris removal have been blocked by military interests.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"International efforts to develop active debris removal technologies and establish binding norms for satellite end-of-life disposal are underway, but progress remains slow relative to the accelerating pace of orbital congestion driven by commercial mega-constellations."

対比構造 (but)：
・進んでいること：国際的努力は「進行中（underway）」
・問題点：「加速する軌道混雑のペースに対して進捗が遅すぎる（slow relative to the accelerating pace）」

→ C「軌道混雑の進行速度に対して取り組みが遅すぎる」が正確です。

【語彙ポイント】
・"binding norms"（拘束力のある規範）: 法的強制力を持つ国際規範。
・"end-of-life disposal"（耐用年数終了後の廃棄）: 衛星の運用終了後の軌道離脱処理。`,
      },
    ],
  },

  // P4-6: 私立大 / 睡眠と記憶定着 / 約158語 / 66秒
  {
    id: "sleep-memory-consolidation",
    title: "Sleep Architecture and the Consolidation of Long-Term Memory",
    level: "PRIVATE_UNI",
    timeLimit: 66,
    tags: ["論説文", "神経科学・睡眠", "私立大", "約158語"],
    passage: `Sleep is not a passive state of neural dormancy but an active biological process critical to the consolidation of memories formed during waking hours. The brain cycles through distinct stages during sleep — including rapid eye movement (REM) sleep and multiple stages of non-REM sleep — each of which appears to serve different mnemonic functions.

Slow-wave sleep, the deepest stage of non-REM sleep, is associated with the transfer of declarative memories — those encoding facts and events — from the hippocampus, where they are initially registered, to the neocortex, where they are integrated into long-term storage. REM sleep, by contrast, appears particularly important for procedural memories and emotional memory processing. During REM sleep, the brain exhibits electrical activity remarkably similar to that observed during waking learning, and it is thought that neural connections strengthened during this stage provide the physiological substrate for skill retention and emotional regulation.

Chronic sleep deprivation disrupts both consolidation pathways, resulting in measurable deficits in factual recall, procedural skill acquisition, and emotional resilience.`,

    questions: [
      {
        questionText: "How does the passage characterize sleep in relation to memory?",
        options: [
          "As a state of complete neural inactivity that allows the brain to recover from fatigue.",
          "As an active biological process essential for converting short-term memories into long-term ones.",
          "As a period in which the brain selectively erases emotionally negative memories.",
          "As a passive rest period whose memory benefits occur only during REM sleep.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

"Sleep is not a passive state of neural dormancy but an active biological process critical to the consolidation of memories formed during waking hours."

NOT A but B 構文：
A = passive state of neural dormancy（受動的な神経休止状態）← 否定
B = an active biological process critical to the consolidation of memories（記憶の固定に不可欠な能動的な生物学的プロセス）← 真の定義

→ B「覚醒中に形成された記憶を長期記憶に変換するために不可欠な能動的プロセス」が正確です。

【語彙ポイント】
・"dormancy"（休眠）: 活動が停止または著しく低下している状態。
・"consolidation"（固定化）: 記憶が安定した長期記憶として定着するプロセス。`,
      },
      {
        questionText: "What function does slow-wave sleep serve according to the passage?",
        options: [
          "Processing emotional memories and reinforcing procedural skills learned during the day.",
          "Transferring factual and event memories from the hippocampus to the neocortex.",
          "Generating the electrical brain activity that mirrors the patterns of waking learning.",
          "Maintaining cardiovascular health by reducing heart rate and blood pressure.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

"Slow-wave sleep ... is associated with the transfer of declarative memories — those encoding facts and events — from the hippocampus ... to the neocortex"

・declarative memories（陳述記憶）= 「事実や出来事を符号化した記憶（those encoding facts and events）」
・海馬（hippocampus）から新皮質（neocortex）への転送

→ B「事実と出来事の記憶を海馬から新皮質へ転送する機能」が正確です。

【引っかけ分析】
・A「感情記憶と手続き記憶の処理」: これはREM睡眠の機能（第2段落後半）。
・C「覚醒中の学習と同様の電気活動」: これもREM睡眠の特徴。
・D「心臓血管の健康維持」: 本文に記述なし。`,
      },
      {
        questionText: "According to the passage, what is the effect of chronic sleep deprivation on cognitive and emotional function?",
        options: [
          "It primarily affects REM sleep, preserving slow-wave sleep and factual memory intact.",
          "It disrupts both memory consolidation pathways, causing deficits in recall, skills, and resilience.",
          "It has no measurable effect if the sleep deprivation is limited to fewer than three consecutive nights.",
          "It selectively impairs emotional memory while leaving factual recall unaffected.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。最終段落が根拠です。

"Chronic sleep deprivation disrupts both consolidation pathways, resulting in measurable deficits in factual recall, procedural skill acquisition, and emotional resilience."

・"both consolidation pathways"（両方の固定化経路）= 徐波睡眠もREM睡眠も両方
・3つの障害：
  ①factual recall（事実の記憶想起）
  ②procedural skill acquisition（手続きスキルの習得）
  ③emotional resilience（感情的回復力）

→ B が正確な言い換えです。

【語彙ポイント】
・"chronic"（慢性の）: 長期間持続する状態。
・"resilience"（回復力・レジリエンス）: 困難から立ち直る能力。`,
      },
    ],
  },

  // P4-7: 共通テスト / フードロスと持続可能な農業 / 約140語 / 57秒
  {
    id: "food-loss-sustainability",
    title: "Food Loss, Waste, and the Path to Sustainable Agriculture",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "食料問題・農業", "共通テスト", "約140語"],
    passage: `Approximately one-third of all food produced globally for human consumption is lost or wasted each year — an estimated 1.3 billion tonnes. This staggering figure carries profound environmental, economic, and ethical implications. Producing food that is never consumed accounts for roughly eight percent of global greenhouse gas emissions, consumes approximately 70 percent of all fresh water withdrawn from rivers and groundwater sources, and occupies an area of agricultural land larger than China.

Food loss occurs primarily at the production and processing stages in low-income countries, where inadequate infrastructure, poor storage facilities, and limited access to refrigeration cause significant spoilage before food reaches consumers. In high-income countries, by contrast, the largest proportion of waste occurs at the retail and consumer stages, driven by overpurchasing, confusion over expiration date labelling, and aesthetic standards that lead supermarkets to reject produce that is nutritionally sound but cosmetically imperfect.`,

    questions: [
      {
        questionText: "According to the passage, what environmental impact is associated with food that is produced but not consumed?",
        options: [
          "It is responsible for approximately 30 percent of global greenhouse gas emissions.",
          "It contributes to deforestation by requiring the clearing of new agricultural land.",
          "It accounts for around 8 percent of global greenhouse gases and consumes vast water and land resources.",
          "It causes soil degradation in areas where discarded food decomposes in landfills.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第3文が根拠です。

3つの環境影響：
①「温室効果ガス排出の約8%（roughly eight percent of global greenhouse gas emissions）」
②「世界の淡水取水量の約70%を消費（approximately 70 percent of all fresh water withdrawn）」
③「中国より広い農地面積を占める（an area of agricultural land larger than China）」

→ C が温室効果ガスに加えて「膨大な水と土地資源を消費する」と正確にまとめています。

【引っかけ分析】
・A「温室効果ガスの約30%」: 本文は "roughly eight percent"（約8%）と述べており、数値が異なります。数値の引っかけに注意。`,
      },
      {
        questionText: "In what way does food waste differ between low-income and high-income countries, according to the passage?",
        options: [
          "Low-income countries waste more food overall, while high-income countries waste less due to better planning.",
          "In low-income countries, waste happens at production and processing stages; in high-income countries, at retail and consumer stages.",
          "High-income countries focus waste reduction efforts on production, while low-income countries target retail.",
          "Low-income countries discard food due to cultural customs, while high-income countries waste due to industrial farming.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比読解】
正解は B。第2段落全体の対比構造が根拠です。

低所得国: "Food loss occurs primarily at the production and processing stages ... inadequate infrastructure, poor storage facilities"
（生産・加工段階。インフラ不足・貯蔵施設の不備が原因）

高所得国 (by contrast): "the largest proportion of waste occurs at the retail and consumer stages ... overpurchasing, confusion over expiration date labelling, and aesthetic standards"
（小売・消費者段階。買いすぎ、賞味期限表示の混乱、見た目の基準が原因）

→ B が両者の対比を正確に表現しています。

【接続表現ポイント】
"by contrast"（対照的に）: 直前の内容と反対・対照的な情報を導く接続副詞。対比問題の解答根拠になることが多い。`,
      },
      {
        questionText: "What does the passage say drives food waste at the retail stage in high-income countries?",
        options: [
          "Poor refrigeration technology that causes food to spoil before it is sold.",
          "Government regulations that require retailers to dispose of food before its expiration date.",
          "Overpurchasing, date-label confusion, and cosmetic standards for produce.",
          "High transportation costs that make it uneconomical to distribute food to rural areas.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

"driven by overpurchasing, confusion over expiration date labelling, and aesthetic standards that lead supermarkets to reject produce that is nutritionally sound but cosmetically imperfect"

3つの原因：
①overpurchasing（買いすぎ）
②confusion over expiration date labelling（賞味期限表示の混乱）
③aesthetic standards（見た目の基準）= 栄養的には問題ないが見た目が悪い食品を拒絶

→ C が正確にまとめています。

【語彙ポイント】
・"cosmetically imperfect"（見た目が不完全な）: 形や色が不揃いで見栄えが悪いが食べられる農産物。
・"nutritionally sound"（栄養的には問題ない）: 栄養価や安全性には問題がないこと。`,
      },
    ],
  },

  // P4-8: 国公立大 / 移民と経済的影響 / 約182語 / 76秒
  {
    id: "immigration-economic-impact",
    title: "Immigration, Labour Markets, and Long-Run Economic Outcomes",
    level: "NATIONAL_UNI",
    timeLimit: 76,
    tags: ["論説文", "移民・経済", "国公立大", "約182語", "譲歩構文"],
    passage: `The economic impact of immigration is among the most contentious topics in contemporary public policy, one in which popular perception and empirical evidence frequently diverge. The intuitive concern — that immigrants depress wages and displace native workers by competing for the same jobs — has dominated political discourse in many countries. However, the empirical consensus among labour economists is considerably more nuanced.

Research consistently indicates that immigrants, particularly those arriving as adults, are not close substitutes for native workers in most labour markets. They tend to concentrate in distinct occupational niches — either high-skill professions requiring specialized credentials or low-skill manual work that native workers are disinclined to accept. In both cases, the net effect on native wages is typically small or even modestly positive, because immigrants also generate demand for goods and services, expand the productive capacity of the economy, and contribute disproportionately to entrepreneurship and innovation.

Where genuine wage displacement has been documented, it occurs most significantly among earlier cohorts of immigrants already present in the labour market — not among native-born workers — suggesting that the distributional concerns raised by immigration are more complex than public debate typically acknowledges.`,

    questions: [
      {
        questionText: "What is described as the 'intuitive concern' about immigration in the passage?",
        options: [
          "That immigrants place excessive demands on public services such as healthcare and education.",
          "That immigrants lower wages and take jobs from native workers by competing for the same positions.",
          "That high-skill immigrants create an unequal distribution of economic benefits within society.",
          "That immigration increases social tensions and reduces national cultural cohesion.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

"The intuitive concern — that immigrants depress wages and displace native workers by competing for the same jobs —"
（直感的な懸念 = 「移民が同じ仕事を奪い合うことで賃金を押し下げ、ネイティブ労働者を排除する」）

→ B が正確な言い換えです。

【同格のダッシュ構文】
"The intuitive concern — that immigrants depress wages and displace native workers ... —"
ダッシュで挟まれた "that 節" が "The intuitive concern" の内容を同格で説明。`,
      },
      {
        questionText: "What does the passage say is the typical net effect of immigration on native workers' wages?",
        options: [
          "A significant negative effect, especially in low-skill manufacturing industries.",
          "A neutral or slightly positive effect, because immigrants also boost economic demand.",
          "A strongly positive effect that benefits all workers regardless of skill level.",
          "An effect that cannot be measured because immigration affects wages indirectly.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"the net effect on native wages is typically small or even modestly positive, because immigrants also generate demand for goods and services, expand the productive capacity of the economy, and contribute disproportionately to entrepreneurship and innovation."

2つの論点：
①「ネイティブ賃金への影響は通常小さいかむしろ適度にプラス（small or even modestly positive）」
②「理由：需要創出・生産能力拡大・起業と革新への不釣り合いな貢献」

→ B が正確にまとめています。

【語彙ポイント】
・"net effect"（純効果）: プラスとマイナスを差し引いた最終的な効果。
・"disproportionately"（不釣り合いに・偏って多く）: 人口比率を大幅に超える割合で。`,
      },
      {
        questionText: "According to the passage, among whom is genuine wage displacement from immigration most likely to occur?",
        options: [
          "Native-born workers in low-skill occupations who compete directly with recent immigrants.",
          "High-skill native professionals in technology and medicine who face international competition.",
          "Earlier cohorts of immigrants who are already established in the labour market.",
          "Young native workers entering the labour market for the first time.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

"Where genuine wage displacement has been documented, it occurs most significantly among earlier cohorts of immigrants already present in the labour market — not among native-born workers"

・賃金押し下げが記録されるのは「以前に移住してきた移民集団（earlier cohorts of immigrants）」
・「ネイティブ生まれの労働者（native-born workers）」ではないと明示

→ C「すでに労働市場に定着している先行移民集団」が正確です。

【引っかけ分析】
・A「低技能のネイティブ労働者」: 本文が "not among native-born workers" と明示的に否定。
・D「新たに市場参入する若いネイティブ労働者」: 本文に記述なし。

【語彙ポイント】
・"cohorts"（集団・コホート）: 特定の時期に移住した移民の世代的グループ。
・"distributional concerns"（分配の懸念）: 経済的利益や費用が誰に帰着するかという問題。`,
      },
    ],
  },

  // P4-9: 私立大 / 医薬品開発の倫理 / 約160語 / 67秒
  {
    id: "pharmaceutical-ethics-neglected",
    title: "Neglected Tropical Diseases and the Ethics of Pharmaceutical Innovation",
    level: "PRIVATE_UNI",
    timeLimit: 67,
    tags: ["論説文", "医療倫理・製薬", "私立大", "約160語"],
    passage: `The pharmaceutical industry's research and development priorities are governed primarily by market incentives — a company invests in developing a drug when it anticipates a sufficient commercial return on that investment. This logic, while economically rational from the perspective of individual firms, produces systematic underinvestment in treatments for diseases that disproportionately affect populations in low-income countries who cannot afford premium-priced therapies.

So-called "neglected tropical diseases" — including leishmaniasis, Chagas disease, and sleeping sickness — collectively afflict over one billion people but receive a fraction of the research funding allocated to conditions prevalent in wealthy nations, such as type-2 diabetes or obesity. The result is a global health system that allocates medical innovation according to purchasing power rather than epidemiological need.

Proposed solutions include publicly funded research grants, advanced market commitments in which donor governments pre-purchase treatments to guarantee profitability, and prize mechanisms that reward successful drug developers with a lump-sum payment in exchange for open licensing of the resulting therapy.`,

    questions: [
      {
        questionText: "What does the passage identify as the primary reason for underinvestment in diseases affecting low-income populations?",
        options: [
          "The technical difficulty of developing treatments for tropical diseases compared to diseases in wealthy nations.",
          "Pharmaceutical companies prioritize based on commercial return, and low-income patients cannot pay premium prices.",
          "Government regulations in low-income countries make it difficult to conduct clinical trials.",
          "International organizations have failed to establish clear guidelines for neglected disease research.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落全体が根拠です。

因果関係：
①「製薬業界のR&D優先順位は市場インセンティブに支配される（governed primarily by market incentives）」
②「十分な商業的リターンが見込める場合のみ投資する（invests ... when it anticipates a sufficient commercial return）」
③「低所得国の人々は高額な治療を買えない（cannot afford premium-priced therapies）」
→「低所得国の疾患への組織的投資不足（systematic underinvestment）」

→ B が因果関係を正確にまとめています。

【語彙ポイント】
・"market incentives"（市場インセンティブ）: 利益追求という経済的動機。
・"disproportionately"（不均衡に・不当に多く）: 割合・規模が偏って大きいこと。`,
      },
      {
        questionText: "How does the passage characterize the current global health system?",
        options: [
          "As one that allocates resources fairly based on the number of people affected by each disease.",
          "As one that distributes medical innovation according to patients' ability to pay rather than health need.",
          "As one that is improving steadily due to international cooperation and increased aid funding.",
          "As one that focuses exclusively on infectious diseases while neglecting chronic conditions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"The result is a global health system that allocates medical innovation according to purchasing power rather than epidemiological need."

・allocates according to purchasing power（購買力に応じて配分）← 現状
・rather than epidemiological need（疫学的必要性ではなく）← あるべき姿

→ B「患者の支払い能力に応じて医療イノベーションを配分するシステム」が正確です。

【語彙ポイント】
・"purchasing power"（購買力）: 商品やサービスを購入する経済的能力。
・"epidemiological need"（疫学的必要性）: 疾患の罹患率・重症度に基づく医療的必要性。`,
      },
      {
        questionText: "What is an 'advanced market commitment' as described in the passage?",
        options: [
          "A research grant given to pharmaceutical companies to reduce the cost of laboratory work.",
          "A legal agreement requiring pharmaceutical companies to license their drugs at reduced prices.",
          "A scheme in which donor governments pre-purchase treatments to guarantee profitability for developers.",
          "A tax incentive that reduces corporate tax for companies that invest in neglected disease research.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第3段落に定義があります。

"advanced market commitments in which donor governments pre-purchase treatments to guarantee profitability"

・"in which" 以降が定義：
→「ドナー政府が治療薬を事前購入することで収益性を保証する」仕組み

→ C が正確な言い換えです。

【引っかけ分析】
・A「研究助成金」: これは "publicly funded research grants"（第3段落冒頭）の説明。AMCとは別の解決策。
・D「税制優遇」: 本文に記述なし。
・B「強制ライセンス」: これは "prize mechanisms" に近い概念（open licensing）だが、AMCの定義ではありません。

【語彙ポイント】
・"open licensing"（オープンライセンス）: 特許を無償または低価格で使用許可すること。`,
      },
    ],
  },

  // P4-10: 共通テスト / ダークマターとダークエネルギー / 約140語 / 57秒
  {
    id: "dark-matter-dark-energy",
    title: "Dark Matter and Dark Energy: The Universe's Invisible Majority",
    level: "COMMON_TEST",
    timeLimit: 57,
    tags: ["論説文", "宇宙科学・物理", "共通テスト", "約140語"],
    passage: `Ordinary visible matter — all the stars, planets, gas clouds, and dust that astronomers can directly observe — constitutes only about five percent of the total energy content of the universe. The remaining 95 percent is divided between two mysterious components: dark matter and dark energy. Dark matter, which accounts for approximately 27 percent, does not emit, absorb, or reflect light, making it invisible to conventional telescopes. Its existence is inferred from its gravitational effects on visible matter, such as the anomalous rotation speeds of galaxies and the bending of light around massive galaxy clusters.

Dark energy, comprising roughly 68 percent, is even more enigmatic. It is believed to be the force responsible for the accelerating expansion of the universe — a discovery that earned the 2011 Nobel Prize in Physics. Despite decades of study, the fundamental nature of both dark matter and dark energy remains entirely unknown to science.`,

    questions: [
      {
        questionText: "What fraction of the universe's total energy content is made up of ordinary visible matter?",
        options: [
          "Approximately 50 percent.",
          "Approximately 27 percent.",
          "Approximately 68 percent.",
          "Approximately 5 percent.",
        ],
        correctAnswerIndex: 3,
        explanation: `【正解の根拠：数値把握問題】
正解は D。第1段落第1文が根拠です。

"Ordinary visible matter ... constitutes only about five percent of the total energy content of the universe."

内訳の整理：
・通常の可視物質（Ordinary visible matter）: 約5%
・ダークマター（dark matter）: 約27%
・ダークエネルギー（dark energy）: 約68%
合計: 5 + 27 + 68 = 100%

→ D「約5%」が正確です。

【語彙ポイント】
・"constitute"（構成する）: make up と同義。
・"energy content"（エネルギー成分・含量）: 宇宙全体のエネルギー・質量の総量。`,
      },
      {
        questionText: "How do astronomers know that dark matter exists if it cannot be directly observed?",
        options: [
          "By measuring the temperature variations it causes in the cosmic microwave background radiation.",
          "By detecting the faint glow it produces when it collides with ordinary matter.",
          "By observing its gravitational effects on visible objects such as galaxy rotation and light bending.",
          "By using particle accelerators to generate dark matter particles under laboratory conditions.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第4文が根拠です。

"Its existence is inferred from its gravitational effects on visible matter, such as the anomalous rotation speeds of galaxies and the bending of light around massive galaxy clusters."

根拠の方法（2例）：
①「銀河の異常な回転速度（anomalous rotation speeds of galaxies）」
②「大質量銀河団の周囲での光の曲がり（the bending of light around massive galaxy clusters）」

→ C「銀河の回転や光の曲がりなど可視物体への重力効果を観測することで」が正確です。

【語彙ポイント】
・"infer"（推測する・推論する）: 直接観測できない事実を間接的証拠から導き出す。
・"anomalous"（異常な）: 通常の予測からはずれた、説明のつかない。`,
      },
      {
        questionText: "What does the passage say dark energy is believed to be responsible for?",
        options: [
          "The gravitational forces that hold galaxies together against the pull of dark matter.",
          "The accelerating expansion of the universe.",
          "The formation of black holes at the centres of most large galaxies.",
          "The slow cooling of the universe since the Big Bang.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"It is believed to be the force responsible for the accelerating expansion of the universe — a discovery that earned the 2011 Nobel Prize in Physics."

・"the force responsible for the accelerating expansion of the universe"（宇宙の加速膨張の原因となる力）
→ B「宇宙の加速膨張の原因」が正確です。

【付加情報】
「2011年ノーベル物理学賞を受賞した発見」という情報も本文に含まれています。選択肢には直接使えませんが、理解の補助になります。

【語彙ポイント】
・"enigmatic"（謎めいた・不可解な）: 謎に包まれていて理解しにくい。
・"accelerating expansion"（加速的な膨張）: 宇宙が膨張するだけでなく、その速度も増加していること。`,
      },
    ],
  },
];
