import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_4: ComprehensionProblem[] = [
  // P4-1: 私立大 / プラットフォーム経済と独占 / 約205語
  {
    id: "platform-economy-monopoly",
    title: "Platform Economics, Network Effects, and the New Monopoly Problem",
    level: "PRIVATE_UNI",
    tags: ["論説文", "経済・プラットフォーム", "私立大", "約205語"],
    passage: `Digital platform companies occupy an unusual position in economic theory. Unlike traditional firms whose market power derives from control over physical assets or proprietary technologies, platforms derive their dominance primarily from network effects — the phenomenon whereby a service becomes more valuable to each user as the total number of users increases. A social network with one million users is categorically more useful than one with a thousand, because each additional participant expands the potential connections available to every existing member.

This self-reinforcing dynamic creates powerful barriers to entry that insulate dominant platforms from competition, even when rival services offer technically superior products. Users are reluctant to migrate to a less-populated alternative, and the very act of migration fragments the network, reducing its value for those who remain. Economists term this structural stickiness "lock-in," and it fundamentally undermines the conventional assumption that markets self-correct through competitive entry when incumbents grow complacent or exploitative.

The implications for antitrust policy are significant. Traditional regulatory frameworks were designed to address dominance derived from controlling scarce physical resources — a railroad's exclusive track or an oil company's pipeline. Applying these frameworks to platforms whose dominance stems from accumulated data and network effects requires conceptual innovation. Some regulators have proposed requiring platforms to offer interoperability with competing services, allowing users to communicate across platforms rather than being confined to a single ecosystem.`,

    questions: [
      {
        questionText:
          "According to the passage, what is the primary source of market dominance for digital platform companies?",
        options: [
          "Ownership of physical infrastructure and distribution networks that competitors cannot replicate.",
          "The use of proprietary algorithms that process data more efficiently than rival services.",
          "Network effects that make a service more valuable as more users join it.",
          "Strategic acquisitions of competitor companies before they can gain significant market share.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第2文が根拠です。

"platforms derive their dominance primarily from network effects — the phenomenon whereby a service becomes more valuable to each user as the total number of users increases."

ネットワーク効果の定義：ユーザー数が増えるほどサービスの価値が高まる現象

→ C「より多くのユーザーが参加するほどサービスが価値を増すネットワーク効果」が正確です。

【引っかけ分析】
・A「物理インフラの所有」: これは第3段落で「従来型独占」の例として登場しますが、プラットフォームの優位性の説明ではありません。"Unlike traditional firms whose market power derives from control over physical assets" が対比の明示。

【語彙ポイント】
・"derive ... from ..."（〜から〜を得る・派生する）: 源泉・由来を示す重要表現。
・"dominance"（支配力・優位性）: 市場での圧倒的な地位。`,
      },
      {
        questionText:
          "What does the passage mean by 'lock-in'?",
        options: [
          "A legal mechanism that prevents companies from sharing user data with third parties.",
          "A pricing strategy that makes it financially expensive for customers to switch to competitors.",
          "The structural tendency of users to remain on a platform even if better alternatives exist.",
          "Government regulation that prevents dominant platforms from being broken up.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第2段落全体の文脈から「lock-in」の意味を読み取ります。

「lock-in」の説明プロセス：
①「ユーザーは人口の少ない代替サービスに移りたがらない（Users are reluctant to migrate to a less-populated alternative）」
②「移行するとネットワークが分断され、残った人の価値も減少する（the very act of migration fragments the network）」
③「Economists term this structural stickiness 'lock-in'」= この構造的な粘着性を「ロックイン」と呼ぶ

→ C「より良い代替サービスが存在しても、ユーザーがプラットフォームにとどまる構造的傾向」が正確です。

【語彙ポイント】
・"stickiness"（粘着性）: 変化・移行に対する抵抗力。ユーザーがサービスを離れにくい性質。
・"incumbent"（現職者・既存事業者）: 市場で既に支配的な地位にある企業。`,
      },
      {
        questionText:
          "What challenge does the passage identify in applying traditional antitrust frameworks to digital platforms?",
        options: [
          "Traditional frameworks were designed for industries where dominance comes from physical resources, not data and network effects.",
          "Digital platforms operate internationally, making it impossible for national regulators to enforce antitrust rules.",
          "Traditional frameworks focus on pricing behaviour, but platforms typically offer their services free of charge.",
          "Regulators lack the technical expertise needed to understand how platform algorithms function.",
        ],
        correctAnswerIndex: 0,
        explanation: `【正解の根拠】
正解は A。第3段落第1〜2文が根拠です。

「従来の規制枠組みの問題」：
"Traditional regulatory frameworks were designed to address dominance derived from controlling scarce physical resources — a railroad's exclusive track or an oil company's pipeline."
（従来の枠組みは希少な物理的資源の支配に基づく独占を対象に設計された）

「プラットフォームへの適用の困難」：
"Applying these frameworks to platforms whose dominance stems from accumulated data and network effects requires conceptual innovation."
（データとネットワーク効果に由来する支配力に適用するには概念的革新が必要）

→ A が正確に表現しています。

【語彙ポイント】
・"antitrust"（反独占・独占禁止）: 市場の独占・競争制限を規制する法律・政策。
・"conceptual innovation"（概念的革新）: 新しい考え方や枠組みの開発。`,
      },
    ],
  },

  // P4-2: 国公立大 / エピゲノムと環境の相互作用 / 約220語
  {
    id: "epigenome-environment",
    title: "Epigenetics: How Environment Shapes Gene Expression Without Altering DNA",
    level: "NATIONAL_UNI",
    tags: ["論説文", "遺伝学・環境", "国公立大", "約220語"],
    passage: `For much of the twentieth century, the dominant model of inheritance held that an organism's characteristics are determined entirely by the fixed sequence of nucleotides in its DNA, transmitted unchanged from parent to offspring across generations. This view has been substantially complicated by the field of epigenetics, which studies heritable changes in gene expression that occur without any alteration to the underlying DNA sequence.

Epigenetic modifications include DNA methylation — the attachment of methyl groups to cytosine bases in the genome, which typically suppresses gene expression — and histone modification, in which chemical changes to the proteins around which DNA is coiled alter the accessibility of specific genomic regions to the transcriptional machinery. These mechanisms act as molecular switches that can activate or silence genes in response to environmental signals, including nutritional status, psychological stress, toxic exposures, and physical activity.

What makes epigenetics particularly significant is the evidence that certain epigenetic marks can be transmitted across generations without the environmental trigger being re-experienced. Animal studies have demonstrated that traumatic stress experienced by a parent can produce measurable epigenetic changes in offspring that affect stress response and anxiety — even when the offspring were never directly exposed to the original stressor. This transgenerational inheritance challenges the strict separation of genetic and environmental influences on development and has prompted a re-examination of Lamarckian ideas once dismissed as discredited.`,

    questions: [
      {
        questionText:
          "How does epigenetics differ from classical genetics, according to the passage?",
        options: [
          "Epigenetics studies mutations in DNA sequences, while classical genetics focuses on unchanged inheritance.",
          "Epigenetics examines heritable changes in gene expression that occur without altering the DNA sequence itself.",
          "Epigenetics is concerned only with the genetics of unicellular organisms, while classical genetics covers all species.",
          "Epigenetics replaces the study of DNA entirely with a focus on protein synthesis.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と対比】
正解は B。第1段落の対比構造が根拠です。

古典的遺伝学の観点（従来の支配的モデル）：
"an organism's characteristics are determined entirely by the fixed sequence of nucleotides in its DNA, transmitted unchanged from parent to offspring"

エピジェネティクスの研究対象：
"heritable changes in gene expression that occur without any alteration to the underlying DNA sequence"
（DNA配列の変化なしに起こる、遺伝性の遺伝子発現の変化）

→ B が正確な言い換えです。

【語彙ポイント】
・"heritable"（遺伝性の）: 親から子に受け継がれる性質を持つ。
・"gene expression"（遺伝子発現）: 遺伝子情報がタンパク質などに変換されて機能する過程。`,
      },
      {
        questionText:
          "What is described as the role of DNA methylation in gene expression?",
        options: [
          "It permanently removes specific genes from the genome, preventing their expression in all future generations.",
          "It typically suppresses gene expression by attaching methyl groups to cytosine bases.",
          "It activates dormant genes by increasing the accessibility of DNA to the transcriptional machinery.",
          "It repairs damaged sections of the DNA sequence caused by environmental toxins.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

"DNA methylation — the attachment of methyl groups to cytosine bases in the genome, which typically suppresses gene expression"

ダッシュ以降が定義：
・「メチル基をゲノムのシトシン塩基に付着させること」
・「通常、遺伝子発現を抑制する（typically suppresses gene expression）」

→ B が正確な言い換えです。

【引っかけ分析】
・A「遺伝子を永久に除去する」: "suppresses"（抑制する）と「除去する（remove）」は異なります。エピジェネティックな変化は可逆的です。
・C「遺伝子を活性化する」: これはヒストン修飾の一部の効果に近いが、DNA メチル化は「通常は抑制」。

【語彙ポイント】
・"methylation"（メチル化）: メチル基（-CH₃）の付加反応。
・"suppress"（抑制する）: 活動・発現を押さえ込む。`,
      },
      {
        questionText:
          "What is 'transgenerational inheritance' as described in the passage, and why is it significant?",
        options: [
          "The standard mechanism by which DNA sequences are passed from parents to children, confirming classical genetic theory.",
          "The transmission of epigenetic changes across generations without the offspring re-experiencing the original environmental trigger.",
          "A new reproductive technology that allows scientists to select which genes are expressed in future generations.",
          "The process by which environmental damage to DNA is corrected before being passed to offspring.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

定義の根拠：
"certain epigenetic marks can be transmitted across generations without the environmental trigger being re-experienced"
（環境的引き金を再体験することなく、エピジェネティックなマークが世代を越えて伝達される）

重要性の根拠：
"This transgenerational inheritance challenges the strict separation of genetic and environmental influences on development and has prompted a re-examination of Lamarckian ideas once dismissed as discredited."
（遺伝と環境の厳密な分離に異議を唱え、かつて否定されたラマルク説の再検討を促した）

→ B が正確です。

【語彙ポイント】
・"transgenerational"（世代間の）: trans-（越えて）+ generational（世代の）。
・"Lamarckian"（ラマルク的）: 獲得形質の遺伝を主張した19世紀の進化論（ダーウィン以前に主流だったが後に否定）。`,
      },
    ],
  },

  // P4-3: 共通テスト / スマートシティと市民のプライバシー / 約185語
  {
    id: "smart-city-privacy",
    title: "Smart Cities, Data Collection, and the Erosion of Urban Privacy",
    level: "COMMON_TEST",
    tags: ["論説文", "テクノロジー・プライバシー", "共通テスト", "約185語"],
    passage: `Smart city technologies — sensor networks, facial recognition cameras, smart streetlights, and connected public transit systems — are being deployed in cities worldwide with the stated aim of improving efficiency, reducing energy consumption, and enhancing public safety. Proponents argue that real-time data analysis can optimize traffic flow, predict infrastructure maintenance needs, and allocate emergency services more effectively.

Critics, however, raise serious concerns about surveillance and the concentration of urban data in the hands of municipal governments or, increasingly, private technology corporations. Unlike voluntary data-sharing on social media platforms, participation in urban sensor networks is effectively unavoidable for city residents who go about their daily lives in public spaces. The asymmetry between the entities collecting the data and the individuals generating it is particularly pronounced: residents rarely know what data is being collected, by whom, for what purposes, or for how long it will be retained.

Regulatory frameworks for smart city data governance are still nascent in most jurisdictions. Meaningful consent, data minimization, purpose limitation, and independent oversight are widely recognized as necessary principles, but their implementation varies significantly across cities and countries, creating patchwork protections that leave many urban residents inadequately informed and poorly protected.`,

    questions: [
      {
        questionText:
          "What does the passage identify as a key difference between smart city data collection and social media data sharing?",
        options: [
          "Smart city data is more commercially valuable than social media data because it is more accurate.",
          "Social media data collection is regulated by governments, while smart city data is entirely unregulated.",
          "Participation in urban sensor networks is practically unavoidable, unlike voluntary social media use.",
          "Smart city systems collect data only from vehicles, while social media collects data from individuals.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第2文が根拠です。

"Unlike voluntary data-sharing on social media platforms, participation in urban sensor networks is effectively unavoidable for city residents who go about their daily lives in public spaces."

対比構造（Unlike A, B）：
A = voluntary data-sharing on social media（SNSでの自発的なデータ共有）← 任意
B = participation in urban sensor networks is effectively unavoidable（都市センサーネットワークへの参加は実質的に回避不可能）← 不可避

→ C が正確な言い換えです。

【語彙ポイント】
・"effectively unavoidable"（実質的に回避不可能な）: 技術的には避けられるかもしれないが、日常生活を送る限り事実上不可避。`,
      },
      {
        questionText:
          "What asymmetry does the passage describe regarding smart city data?",
        options: [
          "Some districts benefit more from smart city technology than others due to unequal infrastructure investment.",
          "Residents rarely know what data is collected about them, by whom, or how long it is kept.",
          "Wealthy residents can opt out of data collection, while poorer residents cannot.",
          "The speed of data collection far exceeds the speed at which cities can analyze and use it.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第3文が根拠です。

"The asymmetry between the entities collecting the data and the individuals generating it is particularly pronounced: residents rarely know what data is being collected, by whom, for what purposes, or for how long it will be retained."

コロン（:）以降が「非対称性」の具体的内容：
・what data is being collected（何が収集されているか）
・by whom（誰によって）
・for what purposes（何の目的で）
・for how long it will be retained（どのくらい保持されるか）

→ B が正確に要約しています。

【語彙ポイント】
・"asymmetry"（非対称性）: 双方向でなく、一方だけが情報・権力を持つ不均衡。
・"pronounced"（顕著な・際立った）: 特に目立って明確な。`,
      },
      {
        questionText:
          "What does the passage say about the current state of regulatory frameworks for smart city data?",
        options: [
          "They are comprehensive and uniformly enforced across all major cities in developed countries.",
          "They do not exist in any jurisdiction because smart city technology is too new to regulate.",
          "They are still developing, and their implementation varies widely, leaving many residents without adequate protection.",
          "They effectively protect residents because consent requirements are strictly enforced.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落全体が根拠です。

現状の評価：
①"Regulatory frameworks for smart city data governance are still nascent in most jurisdictions."
（ほとんどの法域で規制枠組みはまだ初期段階）

②"their implementation varies significantly across cities and countries, creating patchwork protections that leave many urban residents inadequately informed and poorly protected."
（実施状況が都市・国によって大きく異なり、「つぎはぎ」の保護しか提供できていない）

→ C が正確です。

【語彙ポイント】
・"nascent"（発展途上の・初期段階の）: まだ十分に発達していない初期の状態。
・"patchwork"（寄せ集めの・つぎはぎの）: 一貫性のない断片的な状態。`,
      },
    ],
  },

  // P4-4: 国公立大 / 意識とハードプロブレム / 約225語
  {
    id: "consciousness-hard-problem",
    title: "The Hard Problem of Consciousness and the Limits of Neuroscience",
    level: "NATIONAL_UNI",
    tags: ["論説文", "哲学・神経科学", "国公立大", "約225語"],
    passage: `Neuroscience has made remarkable progress in mapping the neural correlates of various mental states — the specific patterns of brain activity that reliably accompany particular experiences, emotions, and cognitive processes. Yet philosopher David Chalmers argues that this explanatory success, however impressive, systematically fails to address what he calls the "hard problem" of consciousness: explaining why any physical process gives rise to subjective experience at all.

Identifying the neural correlates of, say, the perception of red light is the "easy problem" — not because it is technically simple, but because it is, in principle, tractable using the standard methods of cognitive science and neuroscience. One can, with sufficient knowledge, specify the physical mechanisms that process red wavelengths, differentiate them from other colours, and trigger the relevant behavioural responses. What remains unexplained is why there is any felt quality — any phenomenal redness — associated with these processes. Why is there something it is like to see red, rather than the entire process occurring in the dark, without any inner experience?

This explanatory gap — between objective physical descriptions and subjective first-person experience — is what Chalmers terms the "explanatory gap." Many philosophers of mind consider it the deepest unsolved problem in science. Materialist solutions, which attempt to reduce consciousness entirely to brain processes, are challenged by the observation that no amount of third-person physical description appears logically sufficient to entail the existence of first-person subjective experience.`,

    questions: [
      {
        questionText:
          "What is the 'hard problem' of consciousness, according to the passage?",
        options: [
          "The technical difficulty of identifying which specific brain regions are responsible for producing consciousness.",
          "The challenge of explaining why physical brain processes give rise to subjective experience.",
          "The impossibility of conducting controlled experiments on human consciousness in laboratory settings.",
          "The problem of defining consciousness in a way that is acceptable to both neuroscientists and philosophers.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第1段落末文が定義です。

"explaining why any physical process gives rise to subjective experience at all"
（なぜ物理的なプロセスがそもそも主観的体験を生み出すのかを説明すること）

→ B「なぜ物理的な脳のプロセスが主観的体験を生み出すのかを説明する課題」が正確です。

【引っかけ分析】
・A「どの脳領域が意識を生み出すかを特定する技術的困難」: これは "easy problem"（次の段落で説明）に近い問いです。ハードプロブレムは「なぜ体験が生じるか」であり、「どこで生じるか」ではありません。

【語彙ポイント】
・"give rise to"（〜を生み出す・引き起こす）: cause と同義の重要イディオム。
・"subjective experience"（主観的体験）: 一人称の内的経験・クオリア。`,
      },
      {
        questionText:
          "Why does the passage call the identification of neural correlates an 'easy problem'?",
        options: [
          "Because it requires no advanced technology and can be solved by simple observation.",
          "Because it has already been completely solved by modern neuroscience.",
          "Because it is, in principle, solvable using standard scientific methods, unlike the question of why experience exists.",
          "Because it deals only with simple perceptions rather than complex emotions or thoughts.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第1文が根拠です。

"the 'easy problem' — not because it is technically simple, but because it is, in principle, tractable using the standard methods of cognitive science and neuroscience."

重要な注釈 "not because A, but because B" 構文：
・「簡単な問題（easy problem）」と呼ぶのは技術的に単純だからではなく（not because it is technically simple）
・原理的に標準的な科学的手法で解決可能だから（because it is, in principle, tractable）

→ C が正確です。

【語彙ポイント】
・"tractable"（扱いやすい・解決可能な）: 取り組むことができる・対処可能な。
・"in principle"（原理的に）: 実際には困難でも、理論上は可能であるということ。`,
      },
      {
        questionText:
          "What challenge does the passage say materialist solutions face?",
        options: [
          "They cannot explain how the brain generates electrical signals from sensory input.",
          "They require accepting that consciousness does not actually exist, which contradicts common experience.",
          "No amount of objective physical description appears to logically entail the existence of subjective experience.",
          "They rely on outdated models of brain function that have been disproved by modern neuroscience.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落末文が根拠です。

"Materialist solutions, which attempt to reduce consciousness entirely to brain processes, are challenged by the observation that no amount of third-person physical description appears logically sufficient to entail the existence of first-person subjective experience."

・唯物論的解決策の挑戦：「三人称的な物理的記述がいくら積み重なっても、一人称的主観的体験の存在を論理的に含意するには不十分に見える」

→ C が正確な言い換えです。

【語彙ポイント】
・"materialist"（唯物論的）: 意識を含むすべての現象は物質・物理プロセスに還元できるとする立場。
・"entail"（論理的に含意する）: ある命題から別の命題が論理的に導かれること。`,
      },
    ],
  },

  // P4-5: 私立大 / 都市化と精神健康 / 約198語
  {
    id: "urbanization-mental-health",
    title: "Urbanisation, Environmental Stress, and Mental Health Outcomes",
    level: "PRIVATE_UNI",
    tags: ["論説文", "都市化・精神健康", "私立大", "約198語"],
    passage: `More than half of the world's population now lives in urban areas, a proportion projected to reach two-thirds by 2050. While cities offer economic opportunity, social diversity, and access to services, epidemiological evidence increasingly suggests that urban environments carry a distinct mental health burden. Studies consistently show higher rates of anxiety disorders, depression, schizophrenia, and other psychiatric conditions among urban compared to rural dwellers, even after controlling for socioeconomic factors and differential access to diagnostic services.

Several mechanisms have been proposed to account for this urban-rural disparity. Chronic exposure to noise pollution, air pollution, and the visual complexity of dense urban environments is thought to maintain the brain's threat-detection systems in a state of sustained low-level activation — a phenomenon researchers describe as "urban stress load." Social isolation, paradoxically more prevalent in densely populated cities than in rural communities where social networks tend to be tighter and more durable, compounds this effect. Researchers have also identified reduced access to natural green spaces as a contributing factor: a growing body of evidence links regular contact with natural environments to measurable reductions in cortisol levels, heart rate, and self-reported psychological distress.

Interventions such as urban greening, noise reduction policies, and community design that promotes incidental social interaction have shown promise in mitigating these effects without requiring residents to abandon the economic and cultural benefits of urban life.`,

    questions: [
      {
        questionText:
          "What does the passage say about the relationship between urban living and mental health?",
        options: [
          "Urban areas provide better mental health services, so residents have better mental health outcomes overall.",
          "Higher rates of psychiatric conditions are found among urban residents even after accounting for socioeconomic differences.",
          "Mental health differences between urban and rural residents are entirely explained by wealth disparities.",
          "Urban living causes mental health problems only in people who moved from rural areas.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"Studies consistently show higher rates of anxiety disorders, depression, schizophrenia, and other psychiatric conditions among urban compared to rural dwellers, even after controlling for socioeconomic factors and differential access to diagnostic services."

重要な留保表現：
"even after controlling for socioeconomic factors and differential access to diagnostic services"
（社会経済的要因と診断サービスへのアクセスの差を制御した後でも）

→ B「社会経済的差異を考慮した後でも、都市居住者の精神疾患率は高い」が正確です。

【語彙ポイント】
・"controlling for"（〜を統制する）: 統計的に特定の変数の影響を除外すること。科学論文の重要表現。`,
      },
      {
        questionText:
          "What is 'urban stress load' as described in the passage?",
        options: [
          "The financial pressure experienced by low-income residents who cannot afford urban housing.",
          "The sustained low-level activation of the brain's threat-detection systems due to chronic urban environmental stimuli.",
          "The cumulative burden placed on city infrastructure by rapid population growth.",
          "The psychological impact of commuting long distances in congested urban transportation systems.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第2文が根拠です。

"Chronic exposure to noise pollution, air pollution, and the visual complexity of dense urban environments is thought to maintain the brain's threat-detection systems in a state of sustained low-level activation — a phenomenon researchers describe as 'urban stress load.'"

ダッシュ以降に定義を確認：
「騒音・大気汚染・視覚的複雑性への慢性的曝露が、脳の脅威検知システムを持続的な低レベル活性化状態に維持する現象」

→ B が正確な言い換えです。

【語彙ポイント】
・"sustained"（持続した・長期の）: 一時的ではなく継続している状態。
・"threat-detection systems"（脅威検知システム）: 危険を察知するための神経・心理メカニズム。`,
      },
      {
        questionText:
          "What evidence does the passage provide for a link between natural green spaces and mental wellbeing?",
        options: [
          "Cities with more parks consistently have lower rates of crime and social conflict.",
          "Regular contact with natural environments is associated with measurable reductions in stress indicators.",
          "Urban residents who visit nature reserves report higher job satisfaction and productivity.",
          "Green spaces reduce mental health burdens only when they are large enough to block out noise.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

"a growing body of evidence links regular contact with natural environments to measurable reductions in cortisol levels, heart rate, and self-reported psychological distress."

具体的な改善指標（measurable reductions）：
①cortisol levels（コルチゾール値）: ストレスホルモン
②heart rate（心拍数）
③self-reported psychological distress（自己申告の心理的苦痛）

→ B「自然環境との定期的な接触がストレス指標の測定可能な減少と関連している」が正確です。

【語彙ポイント】
・"a growing body of evidence"（増えつつある証拠）: 研究蓄積が進んでいることを示す頻出表現。
・"cortisol"（コルチゾール）: ストレス反応に関与する副腎皮質ホルモン。`,
      },
    ],
  },

  // P4-6: 国公立大 / オープンサイエンスと再現性危機 / 約218語
  {
    id: "open-science-replication-crisis",
    title: "The Replication Crisis and the Movement Towards Open Science",
    level: "NATIONAL_UNI",
    tags: ["論説文", "科学哲学・研究倫理", "国公立大", "約218語"],
    passage: `The replication crisis refers to the widespread failure of published scientific findings — particularly in psychology, social science, and medicine — to be reproduced when independent researchers attempt to repeat the original experiments under comparable conditions. A landmark 2015 project coordinated by the Center for Open Science attempted to replicate 100 psychology studies and found that only 39 percent of the original findings were successfully reproduced, with replicated effects typically substantially smaller in magnitude than the original reports.

Several systemic factors contribute to this crisis. Publication bias — the tendency of academic journals to preferentially publish positive results while rejecting null findings — creates a distorted scientific literature in which false positives are overrepresented. Researchers face strong career incentives to produce novel, statistically significant results, encouraging practices such as p-hacking (testing multiple hypotheses until a statistically significant result is found) and HARKing (Hypothesizing After Results are Known — presenting post-hoc findings as if they were pre-specified hypotheses). Small sample sizes amplify the effects of random noise, increasing the probability that statistically significant results are false positives.

In response, a global open science movement has advocated for pre-registration of research hypotheses and methods prior to data collection, open data sharing, and registered reports — a publication format in which peer review occurs before data collection, committing journals to publish results regardless of their outcome. These reforms aim to decouple research incentives from the novelty and significance of results.`,

    questions: [
      {
        questionText:
          "What did the 2015 replication project described in the passage reveal about psychology research?",
        options: [
          "All 100 studies failed to replicate, indicating that psychological research is fundamentally unreliable.",
          "Only 39 percent of the original findings were successfully reproduced, often with smaller effect sizes.",
          "The majority of studies replicated successfully, but took significantly longer to reproduce than expected.",
          "The project was unable to draw conclusions because researchers used different methodologies.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：数値・事実把握問題】
正解は B。第1段落末文が根拠です。

"found that only 39 percent of the original findings were successfully reproduced, with replicated effects typically substantially smaller in magnitude than the original reports."

2つの発見：
①「元の知見の39%のみが再現に成功（only 39 percent ... successfully reproduced）」
②「再現された効果量は元の報告より大幅に小さい（substantially smaller in magnitude）」

→ B が正確に両方をまとめています。

【引っかけ分析】
・A「全100件が再現失敗」: "only 39 percent" = 39件が再現成功。完全失敗ではありません。
・C「大半が成功」: 61%が再現失敗であり、逆です。`,
      },
      {
        questionText:
          "What is 'publication bias' as described in the passage?",
        options: [
          "The tendency of researchers to publish only studies that confirm their own theoretical predictions.",
          "The preference of academic journals to publish positive results while rejecting studies with null findings.",
          "The financial influence of pharmaceutical companies on which drug trial results are released publicly.",
          "The tendency of popular science media to exaggerate the significance of published research findings.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第2文が定義です。

"Publication bias — the tendency of academic journals to preferentially publish positive results while rejecting null findings —"

ダッシュで挟まれた同格部分が定義：
「学術誌がポジティブな結果を優先的に掲載し、ヌル（null）な知見を拒絶する傾向」

→ B が正確な言い換えです。

【語彙ポイント】
・"null findings"（ヌル（無効）な発見）: 仮説が支持されなかった結果（「効果なし」という結果）。
・"false positives"（偽陽性）: 実際には効果がないのに統計的に有意な結果が出ること。`,
      },
      {
        questionText:
          "How do 'registered reports' help address the replication crisis?",
        options: [
          "They require researchers to register their academic credentials before conducting experiments.",
          "They allow journals to conduct peer review before data collection, committing them to publish regardless of outcome.",
          "They create a public database of all failed replication attempts so other researchers can avoid duplicating efforts.",
          "They require all research data to be made publicly available on government-run repositories.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落第2文が根拠です。

"registered reports — a publication format in which peer review occurs before data collection, committing journals to publish results regardless of their outcome"

登録レポートの仕組み（ダッシュ以降が定義）：
①「データ収集前にピアレビューを行う（peer review occurs before data collection）」
②「結果に関わらず掲載を約束する（committing journals to publish results regardless of their outcome）」

効果：結果が「有意かどうか」に関係なく掲載されるため、出版バイアスが解消される。

→ B が正確な言い換えです。

【語彙ポイント】
・"pre-registration"（事前登録）: 仮説・方法を実験前に公開登録すること。HARKingを防ぐ。
・"regardless of"（〜に関わらず）: 条件や結果に関係なく。`,
      },
    ],
  },

  // P4-7: 私立大 / 生物多様性と生態系サービス / 約195語
  {
    id: "biodiversity-ecosystem-services",
    title: "Biodiversity Loss and the Erosion of Ecosystem Services",
    level: "PRIVATE_UNI",
    tags: ["論説文", "生態学・環境", "私立大", "約195語"],
    passage: `Biodiversity — the variety of life on Earth, encompassing genetic diversity within species, species diversity within ecosystems, and the diversity of ecosystems themselves — is declining at a rate that leading scientists describe as the sixth mass extinction event in Earth's history. Unlike the five previous mass extinctions, which were driven by natural catastrophes such as asteroid impacts and volcanic super-eruptions, the current crisis is primarily attributable to human activity: habitat destruction, overexploitation of wild populations, pollution, invasive species introduction, and the cascading effects of anthropogenic climate change.

The practical consequences of biodiversity loss extend far beyond the intrinsic value of species diversity. Ecosystems provide a wide range of services — often termed "ecosystem services" — that underpin human civilization. These include the pollination of approximately three-quarters of global food crops by wild insects and birds, the purification of drinking water through soil filtration and wetland processing, carbon sequestration by forests and ocean phytoplankton, and coastal protection provided by mangrove forests and coral reefs.

When species are lost, the functional redundancy of ecosystems — the capacity of different species to perform the same ecological roles — is diminished, making ecosystems more fragile and less capable of recovering from disturbances such as drought, disease, or invasive species arrival. Beyond a certain threshold, species loss can trigger nonlinear ecosystem collapse.`,

    questions: [
      {
        questionText:
          "How does the passage distinguish the current mass extinction from previous ones?",
        options: [
          "It is occurring more slowly than previous extinctions, giving species more time to adapt.",
          "It is caused primarily by human activity rather than natural catastrophes.",
          "It is limited to tropical regions, while previous extinctions affected all parts of the world.",
          "It primarily affects marine species, while previous extinctions disproportionately affected land animals.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：対比問題】
正解は B。第1段落第2文の対比構造が根拠です。

過去の大量絶滅: "driven by natural catastrophes such as asteroid impacts and volcanic super-eruptions"
（小惑星衝突や火山超噴火などの自然災害が原因）

現在の絶滅: "primarily attributable to human activity: habitat destruction, overexploitation ... pollution, invasive species introduction, and ... climate change"
（主に人間活動に起因）

→ B「自然の大惨事ではなく主に人間活動によって引き起こされている」が正確です。

【語彙ポイント】
・"attributable to"（〜に帰因する）: 原因が〜にあると考えられること。
・"anthropogenic"（人為的な）: anthro-（人間）+ genic（〜を生み出す）。人間活動に起因する。`,
      },
      {
        questionText:
          "According to the passage, what is the role of wild insects and birds in food production?",
        options: [
          "They control pest populations that would otherwise destroy crops.",
          "They pollinate approximately three-quarters of global food crops.",
          "They contribute to soil fertility by breaking down organic matter.",
          "They serve as a direct food source for approximately one billion people worldwide.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第3文が根拠です。

"the pollination of approximately three-quarters of global food crops by wild insects and birds"

・野生の昆虫と鳥が世界の食用作物の約4分の3を受粉する。

→ B が正確な言い換えです。

【引っかけ分析】
・A「害虫駆除」: 生態系サービスの一つですが、本文で言及されている野生昆虫・鳥の役割は「受粉（pollination）」です。
・C「土壌肥沃化」: 本文では土壌の役割として「飲料水の浄化（purification of drinking water through soil filtration）」が言及されますが、昆虫・鳥の役割ではありません。`,
      },
      {
        questionText:
          "What does 'functional redundancy' mean in the context of the passage?",
        options: [
          "The unnecessary duplication of species that perform identical roles in an ecosystem.",
          "The ability of different species to perform the same ecological functions, making ecosystems more resilient.",
          "The excess capacity in ecosystems that allows them to absorb pollution without lasting damage.",
          "The tendency of invasive species to replicate the functions of native species they displace.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第3段落第1文が定義を含みます。

"the functional redundancy of ecosystems — the capacity of different species to perform the same ecological roles —"

ダッシュで挟まれた同格定義：
「異なる種が同じ生態学的役割を担える能力」

機能：「生態系をより強靭で、攪乱から回復しやすくする（making ecosystems more fragile and less capable ... when diminished）」

→ B が正確な言い換えです。

【引っかけ分析】
・A「不必要な重複」: "redundancy" は確かに「冗長性・余剰」の意味を持ちますが、生態学的文脈では「バックアップ機能」として正の意味を持ちます。

【語彙ポイント】
・"redundancy"（冗長性・余剰性）: IT・工学では「バックアップ」の意味で使われる。生態学でも同様。
・"nonlinear collapse"（非線形崩壊）: 閾値を超えると突然急激に崩壊する様子。`,
      },
    ],
  },

  // P4-8: 共通テスト / デジタルデバイドと教育格差 / 約190語
  {
    id: "digital-divide-education",
    title: "The Digital Divide and Educational Inequality in the Age of Remote Learning",
    level: "COMMON_TEST",
    tags: ["論説文", "教育格差・テクノロジー", "共通テスト", "約190語"],
    passage: `The rapid shift to remote learning during the COVID-19 pandemic exposed and intensified pre-existing educational inequalities rooted in differential access to digital technology. While students in well-resourced households seamlessly transitioned to online platforms, millions of children in low-income families struggled without reliable internet access, adequate devices, or quiet spaces suitable for focused study.

This "digital divide" is not merely a technological gap but a reflection of broader socioeconomic disparities. A student without broadband internet access cannot participate in real-time video lessons, complete interactive online assignments, or access the digital libraries and educational software that have become central to modern pedagogy. The result, documented across numerous countries, was a widening of pre-existing achievement gaps: students from disadvantaged backgrounds fell further behind their peers during the pandemic period, with the youngest learners and those with special educational needs particularly affected.

Addressing the digital divide requires more than distributing devices. Sustainable improvement demands reliable broadband infrastructure in underserved communities, digital literacy training for both students and parents, and pedagogical approaches that do not assume universal access to high-bandwidth internet connections. Without these structural interventions, technological solutions alone risk entrenching rather than reducing educational inequality.`,

    questions: [
      {
        questionText:
          "What does the passage say the COVID-19 pandemic revealed about educational inequality?",
        options: [
          "The pandemic created new educational inequalities that had not previously existed.",
          "Remote learning technology proved equally effective for all students regardless of socioeconomic status.",
          "Existing inequalities were exposed and worsened by unequal access to digital technology.",
          "Schools in low-income areas were better prepared for remote learning because they had simpler systems.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第1文が根拠です。

"The rapid shift to remote learning during the COVID-19 pandemic exposed and intensified pre-existing educational inequalities rooted in differential access to digital technology."

2つの動詞が重要：
・"exposed"（露わにした）: 既存の不平等を明らかにした
・"intensified"（激化させた）: 既存の不平等を悪化させた
・"pre-existing"（以前から存在する）: 新しい不平等ではなく既存のもの

→ C「既存の不平等がデジタル技術への不平等なアクセスによって露わになり悪化した」が正確です。

【語彙ポイント】
・"expose"（露わにする）: 隠れていた問題を明らかにすること。
・"intensify"（激化させる）: 既存の状況をより深刻にすること。`,
      },
      {
        questionText:
          "Why does the passage suggest the 'digital divide' is more than just a technology gap?",
        options: [
          "Because it is caused by government policy failures rather than individual circumstances.",
          "Because it reflects broader socioeconomic disparities that technology alone cannot fix.",
          "Because it affects only students in rural areas and not urban low-income families.",
          "Because the gap primarily exists between countries rather than within individual nations.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

"This 'digital divide' is not merely a technological gap but a reflection of broader socioeconomic disparities."

NOT A but B 構文：
・A = merely a technological gap（単なる技術的格差）← 不十分な説明
・B = a reflection of broader socioeconomic disparities（より広い社会経済的格差の反映）← 実態

→ B「より広い社会経済的格差を反映しており、技術だけでは解決できない」が正確です。`,
      },
      {
        questionText:
          "According to the passage, what is required beyond simply distributing devices to address the digital divide?",
        options: [
          "Reducing the cost of digital devices so that all families can purchase them independently.",
          "Replacing remote learning with in-person instruction to eliminate technology dependence.",
          "Reliable broadband infrastructure, digital literacy training, and inclusive pedagogical approaches.",
          "Developing new educational apps specifically designed for low-bandwidth internet connections.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第2文が根拠です。

"Sustainable improvement demands reliable broadband infrastructure in underserved communities, digital literacy training for both students and parents, and pedagogical approaches that do not assume universal access to high-bandwidth internet connections."

3つの必要条件：
①reliable broadband infrastructure（信頼できるブロードバンドインフラ）
②digital literacy training for both students and parents（生徒と保護者へのデジタルリテラシー研修）
③pedagogical approaches that do not assume universal access（すべての生徒が高速インターネットにアクセスできることを前提としない教育的アプローチ）

→ C が3要素を正確にまとめています。`,
      },
    ],
  },

  // P4-9: 国公立大 / 長期失業と心理的影響 / 約210語
  {
    id: "long-term-unemployment-psychology",
    title: "Long-Term Unemployment and Its Psychological Consequences",
    level: "NATIONAL_UNI",
    tags: ["論説文", "経済・心理学", "国公立大", "約210語"],
    passage: `Economic analyses of unemployment typically focus on its macroeconomic dimensions — output gaps, labour market slack, and aggregate demand deficits. Less frequently examined, though no less significant, are the psychological consequences that distinguish long-term unemployment from short-term joblessness. Research in occupational psychology and welfare economics suggests that the damage inflicted by prolonged worklessness substantially exceeds what would be predicted by income loss alone.

Employment provides what sociologist Émile Durkheim's successors have termed "latent benefits": regular temporal structure to daily life, enforced social contact, a sense of purpose and status derived from productive contribution, and a collective identity that situates the individual within a broader social order. When these latent benefits are withdrawn abruptly and persist in their absence over months or years, the psychological literature documents measurable increases in anxiety, depression, and loss of self-efficacy that prove relatively resistant to standard clinical interventions.

Particularly troubling is the phenomenon of "scarring" — the lasting damage to employability, wellbeing, and wage trajectories that persists long after re-employment. Workers who experience a spell of long-term unemployment display, on average, measurably lower wages, higher rates of depression, and a greater propensity for voluntary social withdrawal in subsequent years compared to those who remained continuously employed or experienced only short periods of unemployment.`,

    questions: [
      {
        questionText:
          "What does the passage say distinguishes long-term unemployment from short-term joblessness?",
        options: [
          "Long-term unemployment primarily affects older workers, while short-term joblessness is spread across age groups.",
          "The psychological damage of long-term unemployment exceeds what income loss alone would predict.",
          "Short-term joblessness improves workers' skills, while long-term unemployment does not.",
          "Long-term unemployment is caused by structural factors, while short-term joblessness is cyclical.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

"Research ... suggests that the damage inflicted by prolonged worklessness substantially exceeds what would be predicted by income loss alone."

「収入喪失だけで予測されるレベルを大幅に上回る損害（damage substantially exceeds what would be predicted by income loss alone）」

→ B「長期失業の心理的ダメージは収入喪失だけで予測されるレベルを超える」が正確です。

【語彙ポイント】
・"worklessness"（無職状態）: unemployment の類義語として使われる。
・"substantially exceeds"（大幅に上回る）: substantially = considerably = significantly。`,
      },
      {
        questionText:
          "What are 'latent benefits' of employment, as described in the passage?",
        options: [
          "Financial rewards such as bonuses and pension contributions that are not reflected in basic wages.",
          "Non-financial benefits like time structure, social contact, purpose, and collective identity.",
          "Hidden tax advantages that employed workers receive but are unaware of.",
          "Long-term career development opportunities that are invisible in the short term.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落第1文が定義を提供します。

"Employment provides what sociologist Émile Durkheim's successors have termed 'latent benefits': regular temporal structure to daily life, enforced social contact, a sense of purpose and status derived from productive contribution, and a collective identity that situates the individual within a broader social order."

コロン以降の具体的内容（4つの潜在的利益）：
①regular temporal structure（規則的な時間構造）
②enforced social contact（強制的な社会的接触）
③a sense of purpose and status（目的意識と地位感覚）
④a collective identity（集合的アイデンティティ）

→ B「時間構造・社会的接触・目的・集合的アイデンティティなどの非金銭的恩恵」が正確です。`,
      },
      {
        questionText:
          "What is the 'scarring' phenomenon described in the passage?",
        options: [
          "The physical health deterioration that workers experience during periods of prolonged unemployment.",
          "The lasting harm to wages, wellbeing, and employability that persists even after re-employment.",
          "The stigma that employers attach to job applicants who have gaps in their employment history.",
          "The tendency of long-term unemployed workers to develop skills that are no longer in market demand.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第3段落第1〜2文が定義です。

"Particularly troubling is the phenomenon of 'scarring' — the lasting damage to employability, wellbeing, and wage trajectories that persists long after re-employment."

ダッシュ以降の同格定義：
「再就職後も長く持続する、雇用可能性・ウェルビーイング・賃金軌跡への永続的ダメージ」

具体的な証拠（第3段落末文）：
・measurably lower wages（測定可能な賃金低下）
・higher rates of depression（高いうつ病率）
・greater propensity for voluntary social withdrawal（自発的な社会的引きこもりの傾向）

→ B が正確な言い換えです。

【語彙ポイント】
・"scarring"（傷跡を残すこと）: 医学的な傷跡から転じて、永続的な悪影響のメタファー。
・"wage trajectories"（賃金軌跡）: 時間とともに変化する賃金の推移・パターン。`,
      },
    ],
  },

  // P4-10: 私立大 / カーボンプライシングの仕組み / 約200語
  {
    id: "carbon-pricing-mechanisms",
    title: "Carbon Pricing: Design, Effectiveness, and Political Challenges",
    level: "PRIVATE_UNI",
    tags: ["論説文", "環境政策・経済", "私立大", "約200語"],
    passage: `Carbon pricing — the practice of attaching a financial cost to greenhouse gas emissions — is widely endorsed by economists as the most efficient policy instrument for reducing carbon dioxide output at the scale required to meet internationally agreed climate targets. By internalizing the social cost of carbon into market prices, pricing mechanisms theoretically correct the market failure that results from treating the atmosphere as a free dumping ground for emissions.

Two primary instruments have been deployed. Carbon taxes set a fixed price per tonne of carbon dioxide equivalent, providing businesses and consumers with predictable cost signals that encourage long-term investment in low-carbon technologies and energy efficiency. Cap-and-trade systems, alternatively, set a firm ceiling on total emissions within a defined sector, distribute or auction tradeable permits, and allow emitters to buy and sell allowances, letting the market determine the carbon price through supply and demand. Each instrument has merits: carbon taxes provide price certainty but uncertain emission reductions; cap-and-trade systems guarantee a volume ceiling but produce price volatility.

Despite the economic consensus in favour of carbon pricing, implementation has been politically contentious. Concerns about its regressive distributional effects — the disproportionate burden borne by lower-income households who spend a higher proportion of income on energy — have been a recurring obstacle to adoption. Revenue recycling, in which carbon tax revenues are returned to citizens as direct dividends or used to reduce other taxes, has been proposed as a remedy.`,

    questions: [
      {
        questionText:
          "Why do economists favour carbon pricing as a policy tool, according to the passage?",
        options: [
          "Because it generates substantial government revenue that can be used to fund green technology research.",
          "Because it internalizes the social cost of carbon into market prices, correcting a market failure.",
          "Because it is simpler to administer than alternative regulatory approaches like emission standards.",
          "Because it allows individual countries to set their own targets without international coordination.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第2文が根拠です。

"By internalizing the social cost of carbon into market prices, pricing mechanisms theoretically correct the market failure that results from treating the atmosphere as a free dumping ground for emissions."

理由の構造：
・市場価格に炭素の社会的コストを内部化（internalizing the social cost of carbon into market prices）
→ 大気を無料の排気場として扱うことによる市場の失敗を是正（correct the market failure）

→ B が正確な言い換えです。

【語彙ポイント】
・"internalizing"（内部化する）: 外部に転嫁されていたコストを価格に組み込むこと。
・"market failure"（市場の失敗）: 市場メカニズムが効率的な資源配分を実現できない状態。`,
      },
      {
        questionText:
          "What is the key difference between carbon taxes and cap-and-trade systems as described in the passage?",
        options: [
          "Carbon taxes apply only to consumers, while cap-and-trade systems target businesses.",
          "Carbon taxes are used internationally, while cap-and-trade systems are used only domestically.",
          "Carbon taxes provide price certainty but uncertain emission reductions; cap-and-trade guarantees a volume ceiling but causes price volatility.",
          "Carbon taxes raise more revenue than cap-and-trade systems and are preferred by most governments.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：比較・対比問題】
正解は C。第2段落末文が直接の根拠です。

"Each instrument has merits: carbon taxes provide price certainty but uncertain emission reductions; cap-and-trade systems guarantee a volume ceiling but produce price volatility."

カーボン税とキャップ&トレードの違い（コロン以降）：
・Carbon taxes（炭素税）: 価格の確実性あり（price certainty）、排出削減量は不確実（uncertain emission reductions）
・Cap-and-trade（排出権取引）: 排出量の上限保証あり（guarantee a volume ceiling）、価格は変動（price volatility）

→ C が正確な対比を表現しています。`,
      },
      {
        questionText:
          "What political obstacle to carbon pricing does the passage identify, and what remedy is proposed?",
        options: [
          "Opposition from fossil fuel industries; remedy is stricter government regulation of industry lobbying.",
          "Disagreement between countries; remedy is establishing an international carbon pricing treaty.",
          "Regressive effects on lower-income households; remedy is returning revenues to citizens as dividends or tax reductions.",
          "Complexity of monitoring emissions; remedy is satellite-based tracking systems.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：問題と解決策の把握】
正解は C。第3段落全体が根拠です。

政治的障害：
"its regressive distributional effects — the disproportionate burden borne by lower-income households who spend a higher proportion of income on energy"
（逆進的な分配効果：低所得世帯が収入に対して高い割合をエネルギーに支出するため、不釣り合いな負担を負う）

提案された解決策：
"Revenue recycling, in which carbon tax revenues are returned to citizens as direct dividends or used to reduce other taxes"
（収入の還元：炭素税収入を直接配当や他の税の減税として市民に返す）

→ C が問題と解決策の両方を正確に表現しています。

【語彙ポイント】
・"regressive"（逆進的な）: 所得が低いほど相対的な負担が大きくなる税・政策の性質。
・"revenue recycling"（収入の還元）: 政府が徴収した税収を市民に再分配するメカニズム。`,
      },
    ],
  },
];
