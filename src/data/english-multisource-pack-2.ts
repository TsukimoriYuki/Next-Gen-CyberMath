import type { MultiSourceProblem } from "@/lib/english-types";

export const MULTI_SOURCE_PACK_2: MultiSourceProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // MS-P2-1: 共通テスト / AI医療診断システムの導入 / 複合資料（本文+表+箇条書き）
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "ai-medical-diagnosis",
    title: "AI Medical Diagnosis: Comparing Implementation Reports",
    level: "COMMON_TEST",
    tags: ["情報照合", "医療AI", "共通テスト", "複合資料"],
    sources: [
      {
        id: "src-ai-med-a",
        type: "TEXT",
        title: "Source A: Hospital Implementation Report",
        content: `City General Hospital introduced an AI-assisted diagnostic system in its radiology department eighteen months ago. The system analyses medical images and flags potential abnormalities for radiologists to review. According to the hospital's internal report, the AI correctly identified 94% of confirmed cancer cases in chest X-rays during the trial period, compared to an average radiologist accuracy of 89% on the same dataset. The hospital emphasised that the AI functions as a "second reader," meaning all AI-flagged cases are reviewed by a human specialist before any diagnosis is communicated to the patient. No diagnostic decision is made by the AI alone.\n\nDespite positive accuracy metrics, the report noted a 12% false-positive rate — instances where the AI flagged abnormalities that were subsequently determined to be benign. The report concluded that while the AI improved overall detection rates, the false-positive rate increased radiologists' workload by approximately 8% due to the additional reviews required.`,
      },
      {
        id: "src-ai-med-b",
        type: "TABLE",
        title: "Source B: Performance Comparison Table",
        content: [
          ["Metric", "AI System", "Senior Radiologist", "Junior Radiologist"],
          ["Sensitivity (cancer detection rate)", "94%", "91%", "86%"],
          ["Specificity (correct non-cancer rate)", "88%", "93%", "90%"],
          ["False-positive rate", "12%", "7%", "10%"],
          ["Average review time per image", "0.3 sec", "4.2 min", "6.8 min"],
          ["Cases reviewed per day (capacity)", "Unlimited", "80", "50"],
        ],
      },
      {
        id: "src-ai-med-c",
        type: "BULLETS",
        title: "Source C: Patient Advocacy Group Statement",
        content: [
          "AI diagnostic tools must not replace human judgment in life-altering medical decisions.",
          "Patients have the right to know when AI has been used in their diagnosis.",
          "The 12% false-positive rate raises concerns about unnecessary patient anxiety and follow-up procedures.",
          "Hospitals should publish transparent performance data to allow independent evaluation.",
          "AI systems trained on non-diverse datasets may produce less accurate results for certain demographic groups.",
          "We support AI as a supplementary tool but oppose any reduction in the number of qualified radiologists.",
        ],
      },
    ],
    questions: [
      {
        questionText:
          "According to Sources A and B, which of the following accurately describes the AI system's performance compared to senior radiologists?",
        options: [
          "The AI has both higher sensitivity and higher specificity than senior radiologists.",
          "The AI has higher sensitivity but lower specificity than senior radiologists.",
          "The AI has lower sensitivity but higher specificity than senior radiologists.",
          "The AI and senior radiologists have identical sensitivity and specificity rates.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：Sources A と B のクロスリファレンス】
正解は B。Source B の表を数値で確認します。

感度（Sensitivity = がん検出率）:
AI: 94% vs 上級放射線科医: 91% → AI のほうが高い ✓

特異度（Specificity = 非がんの正確な識別率）:
AI: 88% vs 上級放射線科医: 93% → 上級放射線科医のほうが高い（＝ AI は低い）✓

→ B「AI は感度は高いが特異度は低い」が正確です。

【引っかけ分析】
・A「両方 AI が高い」: 特異度は上級放射線科医が 93% で AI の 88% より高いため誤り。
・C「感度が低く特異度が高い」: 感度は AI のほうが高いため逆。
・D「同一」: 数値が異なるため誤り。

【語彙ポイント】
・"sensitivity"（感度）: 病気がある人を正しく陽性と判定する割合。
・"specificity"（特異度）: 病気がない人を正しく陰性と判定する割合。
・False-positive（偽陽性）: 病気がないのに陽性と判定すること。特異度の逆数的指標。`,
        crossReferences: ["Source A", "Source B"],
      },
      {
        questionText:
          "Which of the following concerns raised in Source C is directly supported by data in Source A or Source B?",
        options: [
          "AI diagnostic tools must not replace human judgment.",
          "AI systems trained on non-diverse datasets may be less accurate for certain groups.",
          "The false-positive rate causes unnecessary patient anxiety and additional procedures.",
          "Hospitals should publish transparent performance data.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：Source C の主張 vs Source A/B のデータ照合】
正解は C。照合プロセスを整理します。

Source C の主張: "The 12% false-positive rate raises concerns about unnecessary patient anxiety and follow-up procedures."
Source A のデータ: "a 12% false-positive rate — instances where the AI flagged abnormalities that were subsequently determined to be benign... increased radiologists' workload by approximately 8% due to the additional reviews required."
Source B のデータ: "False-positive rate: AI 12%"

→ Source C の 12% 偽陽性率への懸念は、Source A の「追加レビュー増加（+8% 業務量）」と Source B の 12% という具体的数値によって裏付けられています。

【他の選択肢の照合結果】
・A「人間の判断を置き換えてはならない」: Source A は "functions as a 'second reader'" と述べており、AIが置き換えていないことを示していますが、これは「A の懸念を支持するデータ」ではなく「懸念が現実化していない」ことを示すデータです。
・B「非多様なデータセットでの精度低下」: Source A/B にはデモグラフィック別データがなく、照合不可。
・D「透明なデータ公開」: 病院が内部報告書を出していることは示されていますが、「透明性を支持するデータ」ではありません。`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
      {
        questionText:
          "A hospital administrator is considering whether to expand the AI system to replace one of the hospital's junior radiologist positions. Based on all three sources, which argument best supports this decision, and which best opposes it?",
        options: [
          "Supports: AI reviews images faster and in greater volume. Opposes: AI has a higher false-positive rate than junior radiologists.",
          "Supports: AI has higher sensitivity than junior radiologists. Opposes: patients do not want AI involved in diagnosis.",
          "Supports: AI specificity matches junior radiologists. Opposes: AI cannot review more than 80 cases per day.",
          "Supports: the patient advocacy group endorses AI as the primary diagnostic tool. Opposes: AI accuracy is lower than junior radiologists.",
        ],
        correctAnswerIndex: 0,
        explanation: `【正解の根拠：三資料の統合判断問題】
正解は A。三つの資料を横断して根拠を構築します。

【賛成の根拠（Source B）】
"Average review time per image: AI 0.3 sec vs Junior radiologist 6.8 min"
"Cases reviewed per day: AI Unlimited vs Junior radiologist 50"
→ AI は処理速度と処理量で大幅に優れている。

【反対の根拠（Source B）】
"False-positive rate: AI 12% vs Junior radiologist 10%"
→ AI の偽陽性率（12%）は新人放射線科医（10%）より高い。
さらに Source C: "The 12% false-positive rate raises concerns about unnecessary patient anxiety."
→ 偽陽性率の高さが患者への悪影響として指摘されている。

→ A「賛成：速度と処理量が優れる / 反対：偽陽性率が新人放射線科医より高い」が両面を正確に捉えています。

【引っかけ分析】
・B「患者が望まない」: Source C は AI に反対しているが、"replaces" することへの反対であり、AIの使用そのものを否定しているわけではない（"We support AI as a supplementary tool"）。また「患者がAI診断を望まない」という記述は Source C にない。
・C「AI の特異度が新人と同じ」: Source B では AI 88% vs 新人 90% で同じではない。
・D「患者擁護団体が AI を主要ツールとして支持」: Source C は "supplementary tool" であって "primary tool" への支持ではない。`,
        crossReferences: ["Source B", "Source C"],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // MS-P2-2: 国公立大 / 脳科学研究倫理と規制の国際比較
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "neuroscience-ethics-regulation",
    title: "Neuroethics: International Regulatory Frameworks for Brain Research",
    level: "NATIONAL_UNI",
    tags: ["情報照合", "脳科学・倫理", "国公立大", "複合資料"],
    sources: [
      {
        id: "src-neuro-a",
        type: "TEXT",
        title: "Source A: Academic Journal Abstract",
        content: `The emergence of advanced neurotechnologies — including brain-computer interfaces (BCIs), neural decoding algorithms, and neurostimulation devices — has outpaced existing regulatory frameworks in most jurisdictions. While pharmaceutical trials and surgical procedures are governed by well-established ethical protocols, there is currently no international consensus on standards for technologies that directly interface with or modify neural activity.\n\nThis regulatory gap poses particular challenges for emerging commercial applications. Consumer-grade EEG headsets, for instance, collect continuous neural data but are not subject to the same privacy protections as medical devices in many countries. Neural data is uniquely sensitive because it may reveal cognitive states, emotional responses, and even undisclosed intentions in ways that conventional biometric data cannot.\n\nThe concept of "neurorights" — legal protections specifically designed to preserve cognitive liberty, mental privacy, and psychological continuity — has been proposed by scholars including Rafael Yuste of Columbia University. Chile became the first country to enshrine neurorights in its constitution in 2021, though critics argue that constitutional provisions alone are insufficient without corresponding enforcement mechanisms.`,
      },
      {
        id: "src-neuro-b",
        type: "TABLE",
        title: "Source B: International Regulatory Status Summary (2024)",
        content: [
          ["Country / Region", "Neural Data Privacy Law", "BCI Device Regulation", "Neurorights Legislation", "Research Ethics Body"],
          ["United States", "Partial (HIPAA for medical)", "FDA Class II/III", "None", "IRB system"],
          ["European Union", "GDPR (broad)", "MDR 2017/745", "Proposed (EU AI Act)", "Ethics committees"],
          ["Chile", "Comprehensive (2021)", "Under development", "Constitutional (2021)", "National Commission"],
          ["Japan", "Act on Protection of Personal Info.", "PMDA approval", "None", "Institutional review"],
          ["China", "Personal Information Protection Law", "NMPA approval", "None", "Ethics committee"],
        ],
      },
      {
        id: "src-neuro-c",
        type: "BULLETS",
        title: "Source C: Technology Industry Position Paper (excerpts)",
        content: [
          "Overly restrictive regulation risks impeding life-changing medical breakthroughs in neurodegenerative disease treatment.",
          "Neural data collected for consumer wellness applications does not require the same regulatory oversight as clinical medical data.",
          "A harmonised international standard would reduce compliance costs and accelerate global deployment of beneficial neurotechnologies.",
          "Self-regulatory industry codes of practice have proven effective in emerging technology sectors and should be the preferred first step.",
          "Constitutional-level protections like Chile's neurorights framework may create legal uncertainty for international research collaborations.",
          "The benefits of neurotechnology for individuals with paralysis, locked-in syndrome, and severe depression far outweigh theoretical risks to the general population.",
        ],
      },
    ],
    questions: [
      {
        questionText:
          "According to Source B, which country or region has the most comprehensive existing framework across all four regulatory dimensions listed?",
        options: [
          "United States, because it has the most advanced BCI device regulation through the FDA.",
          "European Union, because GDPR provides the broadest data privacy protection.",
          "Chile, because it has enacted legislation in neural data privacy, neurorights, and a national ethics body.",
          "Japan, because it was the first country to implement comprehensive neurotechnology guidelines.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：表の横断読み取り】
正解は C。Source B の表を各列で比較します。

チリ（Chile）の各列：
・Neural Data Privacy Law: Comprehensive (2021) ← 「包括的」と明示
・BCI Device Regulation: Under development（まだ開発中）
・Neurorights Legislation: Constitutional (2021) ← 憲法に明記
・Research Ethics Body: National Commission ← 国家委員会設置

「四つの規制次元のうち最も包括的」= 神経データプライバシー法（包括的）、神経権利法制（憲法）、倫理機関（国家委員会）の3分野でリード。BCI規制が「Under development」だが他国も完全ではない。

【他選択肢の検証】
・A「米国が最も進んでいる」: FDA 規制は BCI に限定。神経権利法制（None）、データプライバシー（Partial）と不完全。
・B「EU が最も広範」: GDPR は広範だが、神経権利法制は "Proposed"（提案段階）に留まる。
・D「日本が最初」: "first" の根拠は表に存在しない。`,
        crossReferences: ["Source B"],
      },
      {
        questionText:
          "Source C argues that neural data from consumer wellness applications does not require the same oversight as clinical data. Which statement from Source A most directly challenges this position?",
        options: [
          "Chile became the first country to enshrine neurorights in its constitution in 2021.",
          "Consumer-grade EEG headsets collect continuous neural data but are not subject to the same privacy protections as medical devices.",
          "Neural data is uniquely sensitive because it may reveal cognitive states, emotional responses, and even undisclosed intentions.",
          "There is currently no international consensus on standards for technologies that directly interface with neural activity.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：Source C の主張 vs Source A の反論構造】
正解は C。Source C の主張と各 Source A の記述を照合します。

【Source C の主張】
"Neural data collected for consumer wellness applications does not require the same regulatory oversight as clinical medical data."
（コンシューマー向けウェルネスアプリが収集する神経データは医療データと同等の規制監督を必要としない。）

→ この主張への反論には「消費者向けでも神経データは高度に機密性が高い」という論拠が必要。

【Source A の C の選択肢】
"Neural data is uniquely sensitive because it may reveal cognitive states, emotional responses, and even undisclosed intentions in ways that conventional biometric data cannot."
（神経データは、認知状態、感情反応、さらには未開示の意図を通常のバイオメトリクスデータでは不可能な形で明らかにできるため、特異的に機密性が高い。）

→ 用途（消費者向けかどうか）に関わらず、神経データそのものの本質的な機密性の高さを示すことで、「消費者向けなら規制が低くていい」という主張を直接否定します。

【他の選択肢の分析】
・A（チリの憲法規定）: 法的実態を述べているが、データの機密性の本質的主張への反論ではない。
・B（EEG ヘッドセットが同等の保護を受けていない）: これは現状の問題点を指摘するものであり、「必要ない」という主張への直接反論にはなっていない。
・D（国際的合意がない）: 規制の欠如を述べているだけで、機密性の議論ではない。`,
        crossReferences: ["Source A", "Source C"],
      },
      {
        questionText:
          "A researcher wants to conduct a BCI study involving human participants in collaboration between Japan and the EU. Based on Sources A and B, which of the following challenges would they most likely face?",
        options: [
          "Japan prohibits all BCI research involving human participants under its national ethics guidelines.",
          "The EU's MDR regulation and Japan's PMDA approval processes may impose different and potentially conflicting requirements.",
          "Neither Japan nor the EU has established any form of research ethics oversight for neurotechnology.",
          "The absence of neurorights legislation in both countries means participant consent cannot be legally obtained.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：複合資料の統合推論問題】
正解は B。Source B の表と Source A の記述を組み合わせます。

Source B の表：
・EU: BCI Device Regulation → MDR 2017/745
・Japan: BCI Device Regulation → PMDA approval

→ EU と日本は異なる BCI 規制体制（MDR と PMDA）を持つ。

Source A の文脈：
"there is currently no international consensus on standards for technologies that directly interface with or modify neural activity"
→ 国際的な統一規制基準が存在しない。

→ 二国間の異なる規制要件（MDR vs PMDA）を両方満たす必要があり、それらが矛盾する可能性がある。B が正確。

【引っかけ分析】
・A「日本が人体実験を全面禁止」: Source B では日本は "PMDA approval" で規制しているのみで、全面禁止は記述されていない。
・C「どちらも倫理審査体制なし」: Source B では EU は "Ethics committees"、日本は "Institutional review" と明記されており誤り。
・D「神経権利法制がないため同意が得られない」: 神経権利法制がなくても、既存の倫理審査や個人情報保護法の下で同意取得は可能。論理飛躍がある。

【Source C との関連】
Source C: "A harmonised international standard would reduce compliance costs and accelerate global deployment"
→ この困難さこそが Source C の「国際的統一基準」の主張の背景にある。`,
        crossReferences: ["Source A", "Source B"],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // MS-P2-3: 私立大 / 食料安全保障と垂直農業
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "vertical-farming-food-security",
    title: "Vertical Farming and Global Food Security: Evaluating the Evidence",
    level: "PRIVATE_UNI",
    tags: ["情報照合", "食料・テクノロジー", "私立大", "複合資料"],
    sources: [
      {
        id: "src-vf-a",
        type: "TEXT",
        title: "Source A: Agricultural Research Institute Report",
        content: `Vertical farming — the practice of growing crops in vertically stacked layers within controlled indoor environments — has attracted significant investment as a potential solution to food security challenges. By controlling temperature, humidity, light, and nutrient delivery with precision, vertical farms can achieve crop yields 10 to 100 times higher per square metre than conventional outdoor agriculture for certain crops, while using up to 95% less water through hydroponic or aeroponic systems.\n\nHowever, the technology faces substantial economic and energy barriers to widespread adoption. Current vertical farms are economically viable only for high-value crops such as leafy greens, herbs, and strawberries. Staple crops such as wheat, rice, and maize — which constitute the foundation of global food security — cannot yet be grown profitably in vertical farms due to their high light requirements and low market value per kilogram.\n\nEnergy consumption represents the most significant constraint. Artificial lighting alone can account for 25 to 35 percent of a vertical farm's total operating costs, and the carbon footprint of electricity-dependent vertical farming may exceed that of conventional agriculture in regions where the electrical grid relies heavily on fossil fuels.`,
      },
      {
        id: "src-vf-b",
        type: "TABLE",
        title: "Source B: Crop Comparison Data",
        content: [
          ["Crop", "Vertical Farm Yield (kg/m²/year)", "Conventional Yield (kg/m²/year)", "Water Use Reduction", "Currently Profitable in VF?"],
          ["Lettuce", "120", "3.5", "95%", "Yes"],
          ["Strawberries", "25", "0.8", "90%", "Yes"],
          ["Basil (herb)", "80", "2.1", "92%", "Yes"],
          ["Tomatoes", "60", "8.0", "85%", "Marginal"],
          ["Wheat", "N/A*", "0.35", "N/A*", "No"],
          ["Rice", "N/A*", "0.55", "N/A*", "No"],
        ],
      },
      {
        id: "src-vf-c",
        type: "BULLETS",
        title: "Source C: Investor Briefing Highlights",
        content: [
          "The global vertical farming market is projected to grow from $5.5 billion (2022) to $35.3 billion by 2032.",
          "LED lighting efficiency improvements have reduced energy costs by 40% over the past five years.",
          "Urban proximity reduces transportation costs and food waste from spoilage by an estimated 20-30%.",
          "Vertical farms are resilient to extreme weather events and climate-related disruptions that threaten conventional agriculture.",
          "Singapore has adopted vertical farming as a national food security strategy, targeting 30% domestic food production by 2030.",
          "Integration with renewable energy sources (solar, wind) can reduce the carbon footprint to near zero for off-grid facilities.",
          "Labor costs remain high due to the technical expertise required for system management and crop monitoring.",
        ],
      },
    ],
    questions: [
      {
        questionText:
          "According to Sources A and B, what is the primary reason vertical farming cannot currently address global staple food security?",
        options: [
          "Vertical farms use too much water to produce staple crops at scale.",
          "Staple crops like wheat and rice cannot yet be grown profitably in vertical farms.",
          "Vertical farms can only operate in urban areas where staple crops are not consumed.",
          "The yield per square metre for staple crops in vertical farms is lower than in conventional farming.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：Sources A と B の照合】
正解は B。Source A の直接的な記述が根拠です。

Source A: "Staple crops such as wheat, rice, and maize ... cannot yet be grown profitably in vertical farms due to their high light requirements and low market value per kilogram."

Source B でも確認：
・Wheat: "Currently Profitable in VF? → No"
・Rice: "Currently Profitable in VF? → No"
・また Yield 欄が "N/A*" と記載され、データ自体が存在しない。

→ B「小麦や米などの主食作物は現時点では垂直農場で採算が取れない」が正確です。

【引っかけ分析】
・A「水の使いすぎ」: Source A は垂直農場が水を「最大95%削減する」と述べており、逆の記述です。
・C「都市部でしか使えず主食は消費されない」: 本文に記述なし。主食は都市でも農村でも消費されます。
・D「垂直農場の単位面積収量が低い」: Source B を見ると、計測可能な作物（レタス、苺等）では垂直農場の収量が大幅に高い。主食については収量データ自体がない（N/A*）。

【語彙ポイント】
・"staple crops"（主食作物）: 食料安全保障の基盤となる小麦・米・トウモロコシ等。
・"profitably"（採算が取れるように）: コストに見合った収益が得られること。`,
        crossReferences: ["Source A", "Source B"],
      },
      {
        questionText:
          "Source A states that vertical farming may have a larger carbon footprint than conventional agriculture in some regions. Which point in Source C most directly addresses this concern?",
        options: [
          "LED lighting efficiency improvements have reduced energy costs by 40% over the past five years.",
          "Urban proximity reduces transportation costs and food waste from spoilage.",
          "Integration with renewable energy sources can reduce the carbon footprint to near zero for off-grid facilities.",
          "The global vertical farming market is projected to grow significantly by 2032.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：Source A の懸念 vs Source C の対応】
正解は C。Source A の懸念を正確に把握してから Source C の対応を探します。

【Source A の懸念（炭素フットプリント）】
"the carbon footprint of electricity-dependent vertical farming may exceed that of conventional agriculture in regions where the electrical grid relies heavily on fossil fuels."
（電力網が化石燃料に大きく依存する地域では、電力依存の垂直農場の炭素フットプリントが従来農業を超える可能性がある）

→ 問題の根源: 電力が化石燃料由来であること。

【Source C の対応策】
"Integration with renewable energy sources (solar, wind) can reduce the carbon footprint to near zero for off-grid facilities."
（再生可能エネルギー（太陽光・風力）との統合により、オフグリッド施設では炭素フットプリントをほぼゼロに削減できる）

→ 化石燃料依存の電力グリッド問題に対し、再生可能エネルギーへの切り替えで直接対応。C が正解。

【引っかけ分析】
・A「LED の効率向上でコスト削減」: エネルギーコストの削減を述べているが、「炭素フットプリントの削減」への直接の回答ではない（エネルギー消費が減っても化石燃料由来なら炭素排出は続く）。
・B「都市近接による輸送コスト削減」: 輸送に関する話であり、電力由来の炭素排出とは別問題。
・D「市場規模の成長予測」: ビジネス的観点であり、炭素フットプリントの議論とは無関係。`,
        crossReferences: ["Source A", "Source C"],
      },
      {
        questionText:
          "A government policymaker in a food-insecure country is evaluating vertical farming as part of a national food strategy. Based on all three sources, which conclusion is most well-supported?",
        options: [
          "Vertical farming should immediately replace conventional agriculture as it produces higher yields for all crop types.",
          "Vertical farming is currently best suited for supplementing high-value crop production in urban areas, but cannot yet substitute for conventional farming of staple foods.",
          "Vertical farming is economically unfeasible and should not be included in any national food security strategy.",
          "The primary barrier to vertical farming adoption is insufficient investment, which the projected market growth will resolve.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：三資料統合の政策判断問題】
正解は B。三資料から証拠を体系的に集めます。

【垂直農場が得意とすること（Sources A, B）】
・葉物野菜・ハーブ・苺では収量が従来比10〜100倍（Source A, B）
・水使用量を最大95%削減（Source A）
・都市近接で輸送コスト・食品廃棄を削減（Source C）
・気候変動リスクへの耐性（Source C）

【垂直農場の限界（Sources A, B）】
・主食作物（小麦・米）は現在採算が取れない（Source A）
・エネルギーコストが高い（Source A）
・労働コストが高い（Source C）

→ B「都市部での高付加価値作物生産の補完には適しているが、主食作物の代替はまだ不可能」が三資料の総合的結論として最も正確です。

【引っかけ分析】
・A「すべての作物で垂直農場が優れる、即座に代替すべき」: Source A は主食作物での採算性の欠如を明示。"immediately replace" は過言。
・C「経済的に実現不可能で戦略に含めるべきでない」: Source B では葉物野菜・苺等は "Yes（採算可）" であり、完全否定は本文根拠なし。
・D「投資不足が主要障壁で市場成長が解決する」: Source A は「エネルギー消費」と「主食作物の採算性の本質的問題」を主要障壁として挙げており、単なる投資不足の話ではない。`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
    ],
  },
];
