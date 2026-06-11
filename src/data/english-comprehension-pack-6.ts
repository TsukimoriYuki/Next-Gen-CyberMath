import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_6: ComprehensionProblem[] = [
  // P6-1: 国公立大 / グローバル・バリューチェーンと格差 / 約218語
  {
    id: "global-value-chains-inequality",
    title: "Global Value Chains, Trade Liberalisation, and the Distribution of Gains",
    level: "NATIONAL_UNI",
    tags: ["論説文", "国際経済・格差", "国公立大", "約218語"],
    passage: `The dramatic expansion of global value chains (GVCs) — the cross-border networks through which goods and services are designed, produced, and distributed in stages across multiple countries — has been one of the defining features of the post-1990 global economy. Proponents of trade liberalisation have argued that GVC integration enables developing countries to industrialise by specialising in specific production stages, accessing foreign technology and managerial knowledge, and building export markets that generate employment and rising incomes.

The empirical record is more nuanced. While GVC integration has been associated with significant economic growth and poverty reduction in some regions — most notably East Asia — the distributional consequences within countries are highly heterogeneous. Workers in export-oriented manufacturing sectors have often benefited, while those in sectors exposed to import competition have experienced wage suppression and job displacement without adequate social protection or retraining opportunities. Furthermore, the gains within GVCs are asymmetrically distributed across the value chain: the highest returns accrue to firms that control intellectual property, brand ownership, and platform infrastructure, which tend to be concentrated in high-income countries, rather than to those performing assembly and manufacturing operations, which are disproportionately located in low- and middle-income countries.

This "smile curve" dynamic — named for the U-shaped distribution of value added along a production chain — suggests that developing countries seeking to increase their GVC gains must move beyond assembly towards design, branding, and services, a transition that requires substantial investments in education, innovation infrastructure, and institutional capacity.`,
    questions: [
      {
        questionText:
          "What argument have proponents of trade liberalisation made about GVC integration for developing countries?",
        options: [
          "That it allows developing countries to reduce dependence on foreign aid and achieve fiscal balance.",
          "That it enables specialisation in production stages, technology transfer, and export-driven employment growth.",
          "That it protects domestic industries from foreign competition until they become internationally competitive.",
          "That it reduces income inequality within developing countries by creating well-paying manufacturing jobs.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「貿易自由化支持者の主張」：
"GVC integration enables developing countries to industrialise by specialising in specific production stages, accessing foreign technology and managerial knowledge, and building export markets that generate employment and rising incomes"

3つの効果：
①特定の生産段階への特化（specialising in specific production stages）
②外国技術・経営知識へのアクセス（accessing foreign technology and managerial knowledge）
③雇用と所得向上をもたらす輸出市場の構築（building export markets）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What does the passage say about who captures the highest returns within global value chains?",
        options: [
          "Assembly and manufacturing workers in developing countries, because they perform the most labour.",
          "Governments of developing countries, because they collect tariffs on exported goods.",
          "Firms that control intellectual property, brands, and platform infrastructure, mostly in high-income countries.",
          "Logistics and transportation companies, because they connect all stages of the value chain.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

「GVC内での利益の非対称的分配」：
"the highest returns accrue to firms that control intellectual property, brand ownership, and platform infrastructure, which tend to be concentrated in high-income countries, rather than to those performing assembly and manufacturing operations, which are disproportionately located in low- and middle-income countries"

・最高リターンの受益者：知的財産・ブランド・プラットフォームインフラを管理する企業（高所得国に集中）
・低リターン：組立・製造作業（低・中所得国に集中）

→ C が正確です。`,
      },
      {
        questionText:
          "What does the 'smile curve' dynamic suggest developing countries must do to increase their gains from GVCs?",
        options: [
          "Attract more foreign direct investment by lowering corporate tax rates.",
          "Move beyond assembly operations towards design, branding, and services.",
          "Negotiate better terms in trade agreements with high-income countries.",
          "Reduce labour costs to remain competitive against other low-wage manufacturing economies.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

「スマイルカーブ」の示唆：
"developing countries seeking to increase their GVC gains must move beyond assembly towards design, branding, and services"
（GVCからの利益を増やしたい途上国は、組立から設計・ブランディング・サービスへ移行しなければならない）

→ B が正確な言い換えです。

【語彙ポイント】
・"smile curve"（スマイルカーブ）: バリューチェーンの両端（設計・R&DとブランディングAfterservice）で付加価値が高く、中間（製造・組立）で低いU字型の分布。`,
      },
    ],
  },

  // P6-2: 私立大 / 芸術と認知能力 / 約205語
  {
    id: "arts-education-cognitive",
    title: "Arts Education, Cognitive Development, and the Case for Creative Curricula",
    level: "PRIVATE_UNI",
    tags: ["論説文", "教育・認知科学", "私立大", "約205語"],
    passage: `The marginalisation of arts education in school curricula — driven by policy frameworks that prioritise measurable academic outcomes in mathematics, science, and literacy — has prompted a growing body of research examining the cognitive and developmental benefits of sustained engagement with music, visual arts, drama, and creative writing.

Research findings challenge the assumption that arts education is a luxury diversion from core academic learning. Studies indicate that music training is associated with enhanced phonological awareness and reading fluency, advantages attributable to the shared neural substrates of auditory processing and language acquisition. Drama and collaborative performance develop perspective-taking ability — the capacity to understand others' mental states and motivations — which correlates with improved social cognition and conflict resolution skills. Visual arts instruction, including observational drawing, strengthens visual-spatial reasoning and attention to detail. These cognitive benefits appear most pronounced among disadvantaged students, for whom arts programmes can serve as what researchers describe as "cognitive equalizers."

However, the evidence base for arts education benefits is complicated by methodological challenges: studies that show positive outcomes are often confounded by pre-existing differences between students who self-select into arts programmes and those who do not. Randomised controlled trials, the methodological gold standard, are both logistically complex and ethically contentious when they require withholding enrichment activities from control-group students.`,
    questions: [
      {
        questionText:
          "What assumption about arts education does the passage say research has challenged?",
        options: [
          "That arts education should be taught by specialist teachers rather than general classroom instructors.",
          "That arts education is a non-essential diversion from core academic learning.",
          "That arts education benefits girls more than boys due to differences in creative ability.",
          "That arts education has no economic value because artistic careers are unstable.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文が根拠です。

"Research findings challenge the assumption that arts education is a luxury diversion from core academic learning."
（研究結果は、芸術教育が中核的な学習からの贅沢な気晴らしであるという前提に疑問を投げかける）

→ B「芸術教育は核となる学習からの余分な気晴らしであるという前提」が正確です。

【語彙ポイント】
・"diversion"（気晴らし・脇道）: 本来の目的から注意を逸らすもの。ここでは否定的な意味で使われています。`,
      },
      {
        questionText:
          "Why does the passage say music training may improve reading fluency?",
        options: [
          "Because musical lyrics expose students to a wider vocabulary than standard textbooks.",
          "Because practising music requires reading musical notation, which transfers to text literacy.",
          "Because music training and language acquisition share neural substrates related to auditory processing.",
          "Because learning music builds discipline and concentration that benefit all academic subjects.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落第2文が根拠です。

"music training is associated with enhanced phonological awareness and reading fluency, advantages attributable to the shared neural substrates of auditory processing and language acquisition"
（音楽訓練は音韻意識と読書の流暢さの向上と関連しており、この優位性は聴覚処理と言語習得の共有された神経基盤に帰因する）

→ C「音楽訓練と言語習得が聴覚処理に関する神経基盤を共有しているため」が正確です。

【語彙ポイント】
・"phonological awareness"（音韻意識）: 言語の音の構造を認識する能力。読み書きの基盤。`,
      },
      {
        questionText:
          "What methodological problem does the passage identify in studies showing arts education benefits?",
        options: [
          "The studies use tests designed for arts subjects to measure benefits in academic subjects.",
          "Results may be confounded by pre-existing differences between students who choose arts programmes and those who do not.",
          "Arts education studies rarely collect long-term data beyond the immediate school year.",
          "Researchers who conduct arts education studies often have conflicts of interest as arts advocates.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落第2文が根拠です。

"studies that show positive outcomes are often confounded by pre-existing differences between students who self-select into arts programmes and those who do not"
（ポジティブな結果を示す研究は、芸術プログラムに自己選択する生徒とそうでない生徒の間の既存の差異によって交絡していることが多い）

→ B「自己選択バイアス：芸術プログラムを選ぶ生徒とそうでない生徒の間の既存差異による交絡」が正確です。

【語彙ポイント】
・"confounded"（交絡した）: 研究したい要因以外の変数が結果に影響を与えていること。統計的に重要な概念。
・"self-select"（自己選択する）: 研究者の割り当てではなく自分の意思で参加グループを選ぶこと。`,
      },
    ],
  },

  // P6-3: 共通テスト / AIと医療診断 / 約192語
  {
    id: "ai-medical-diagnosis",
    title: "Artificial Intelligence in Medical Diagnosis: Promise, Pitfalls, and Accountability",
    level: "COMMON_TEST",
    tags: ["論説文", "AI・医療", "共通テスト", "約192語"],
    passage: `Artificial intelligence systems trained on large medical imaging datasets have demonstrated diagnostic accuracy in specific tasks — detecting early-stage diabetic retinopathy, classifying skin lesions, and identifying lung nodules on CT scans — that matches or exceeds that of specialist clinicians. These achievements have generated significant enthusiasm for AI-assisted diagnosis as a means of extending specialist-level care to underserved regions with limited access to trained physicians.

Translating research performance into clinical practice has, however, proved challenging. AI diagnostic models are typically trained and validated on datasets collected from specific hospital systems, patient demographics, and imaging equipment. When deployed in different clinical environments, performance frequently degrades — a phenomenon known as "dataset shift." Models trained primarily on high-quality images from well-resourced academic hospitals may perform significantly worse when applied to lower-resolution images from smaller community clinics. Furthermore, the opacity of deep learning models makes it difficult for clinicians to understand why a particular diagnosis was generated, complicating clinical integration and raising liability questions when AI-assisted diagnoses prove incorrect.

Regulatory frameworks are evolving to require ongoing post-market performance monitoring of AI medical devices and clearer standards for explainability — the ability of AI systems to provide interpretable justifications for their outputs.`,
    questions: [
      {
        questionText:
          "In what types of tasks has AI matched or exceeded specialist clinicians, according to the passage?",
        options: [
          "Performing surgical operations and administering anaesthesia during complex procedures.",
          "Detecting conditions like diabetic retinopathy, classifying skin lesions, and identifying lung nodules.",
          "Conducting patient consultations and recommending personalised treatment plans.",
          "Managing hospital logistics such as bed allocation and staff scheduling.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落第1文が根拠です。

3つの具体的タスク：
①"detecting early-stage diabetic retinopathy"（早期糖尿病網膜症の検出）
②"classifying skin lesions"（皮膚病変の分類）
③"identifying lung nodules on CT scans"（CT画像上の肺結節の特定）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What is 'dataset shift,' as described in the passage?",
        options: [
          "The gradual improvement in AI model performance as more patient data is collected over time.",
          "A privacy regulation requiring hospitals to anonymise patient data before sharing it with AI developers.",
          "The degradation of AI model performance when deployed in clinical environments different from those used in training.",
          "A deliberate retraining of AI models to adapt to new types of medical imaging equipment.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：定義問題】
正解は C。第2段落第3文が根拠です。

「データセットシフト」の説明：
"When deployed in different clinical environments, performance frequently degrades — a phenomenon known as 'dataset shift.'"
（異なる臨床環境に展開されると、パフォーマンスがしばしば低下する — データセットシフトと呼ばれる現象）

続く文でも具体例：学術病院の高品質画像でトレーニングされたモデルが、より小規模なクリニックの低解像度画像では著しく性能が低下。

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "What two requirements does the passage say evolving regulatory frameworks are moving towards for AI medical devices?",
        options: [
          "Mandatory clinical trials and independent ethics committee approval before deployment.",
          "Ongoing post-market performance monitoring and clearer standards for explainability.",
          "Limits on the number of patients that AI systems can diagnose per day.",
          "Requiring AI medical devices to be developed only by licensed medical institutions.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

2つの要件：
①"ongoing post-market performance monitoring of AI medical devices"（AIメディカルデバイスの継続的な市場投入後のパフォーマンス監視）
②"clearer standards for explainability — the ability of AI systems to provide interpretable justifications for their outputs"（説明可能性のより明確な基準）

→ B が正確にまとめています。

【語彙ポイント】
・"explainability"（説明可能性）: AIがその判断・出力の根拠を人間が理解できる形で示せること。`,
      },
    ],
  },

  // P6-4: 国公立大 / 言語と思考の相互作用 / 約222語
  {
    id: "language-thought-sapir-whorf",
    title: "The Sapir-Whorf Hypothesis: Does Language Shape the Way We Think?",
    level: "NATIONAL_UNI",
    tags: ["論説文", "言語学・認知科学", "国公立大", "約222語"],
    passage: `The question of whether the language one speaks influences the way one thinks — known as the Sapir-Whorf hypothesis, or linguistic relativity — has been one of the most contested questions in cognitive linguistics. The strong version of the hypothesis, which holds that language determines thought and that speakers of different languages inhabit incommensurable conceptual worlds, is now widely rejected; it struggles to explain cross-cultural communication, translation, and the manifestly shared cognitive capacities of all humans.

The weaker version — that language influences but does not determine thought, that habitual linguistic categories shape certain cognitive tendencies — has attracted more empirical support. Research by Lera Boroditsky and colleagues has demonstrated that speakers of languages with grammaticalised spatial orientation systems (such as the Australian Aboriginal language Guugu Yimithirr, which relies on absolute cardinal directions rather than ego-centric left/right distinctions) display consistently superior spatial orientation abilities compared to speakers of languages without such systems. Similarly, research on colour categorisation suggests that languages with lexical distinctions between neighbouring colours facilitate faster visual discrimination between those colours, an effect that appears to operate through the language-dominant left hemisphere of the brain.

These findings do not support linguistic determinism, but they do suggest that the linguistic structures people habitually employ create cognitive pathways that are activated automatically and without conscious effort, subtly shaping attention, memory encoding, and perceptual discrimination.`,
    questions: [
      {
        questionText:
          "Why does the passage say the strong version of the Sapir-Whorf hypothesis is rejected?",
        options: [
          "Because laboratory experiments have consistently failed to show any relationship between language and cognition.",
          "Because it cannot account for cross-cultural communication, translation, and shared human cognitive capacities.",
          "Because it was based on flawed fieldwork that misrepresented the languages of indigenous communities.",
          "Because modern neuroscience has shown that thought is processed in brain regions independent of language.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「強い版が拒絶される理由」：
"It struggles to explain cross-cultural communication, translation, and the manifestly shared cognitive capacities of all humans."
（異文化間コミュニケーション、翻訳、すべての人間が明らかに共有する認知能力を説明できない）

→ B が正確な言い換えです。

【語彙ポイント】
・"incommensurable"（通約不可能な）: 共通の尺度では比較できない、共有できない。
・"manifestly"（明らかに）: はっきりと明白に。`,
      },
      {
        questionText:
          "What does the research on Guugu Yimithirr speakers demonstrate about the relationship between language and cognition?",
        options: [
          "That indigenous languages are grammatically more complex than European languages.",
          "That speakers of languages using absolute cardinal directions show superior spatial orientation abilities.",
          "That spatial orientation ability is genetically determined and unrelated to linguistic structures.",
          "That bilingual speakers outperform monolingual speakers on all spatial reasoning tasks.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「グーグ・イミティル語話者の研究」：
"speakers of languages with grammaticalised spatial orientation systems ... display consistently superior spatial orientation abilities compared to speakers of languages without such systems"
（文法化された空間定位システムを持つ言語の話者は、そのようなシステムを持たない言語の話者と比べて一貫して優れた空間定位能力を示す）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What conclusion does the passage draw from the evidence on linguistic relativity?",
        options: [
          "Language completely determines thought, confirming the strong version of the Sapir-Whorf hypothesis.",
          "Language has no measurable influence on non-linguistic cognitive processes.",
          "Habitual linguistic structures create automatic cognitive pathways that subtly shape attention and perception.",
          "Children who learn multiple languages simultaneously develop superior cognitive abilities in all areas.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落が根拠です。

「証拠から導かれる結論」：
"the linguistic structures people habitually employ create cognitive pathways that are activated automatically and without conscious effort, subtly shaping attention, memory encoding, and perceptual discrimination"
（人々が習慣的に使用する言語構造は、自動的かつ意識的な努力なしに活性化される認知的経路を作り出し、注意・記憶エンコーディング・知覚的識別を微妙に形成する）

→ C が正確な言い換えです。

【構造ポイント】
第3段落は "do not support ... but they do suggest ..." という対比構造：決定論を支持しないが、影響は実在することを示す。`,
      },
    ],
  },

  // P6-5: 私立大 / ジェンダーと科学キャリア / 約200語
  {
    id: "gender-stem-careers",
    title: "Gender, Stereotype Threat, and Participation in Science Careers",
    level: "PRIVATE_UNI",
    tags: ["論説文", "ジェンダー・教育", "私立大", "約200語"],
    passage: `Despite decades of policy initiatives designed to increase women's participation in science, technology, engineering, and mathematics (STEM), significant gender disparities persist in many STEM fields, most notably in physics, computer science, and engineering. These disparities are not explained by differences in innate ability: standardised test data consistently shows girls performing equivalently to boys in mathematics when controlling for environmental factors, and countries with higher levels of gender equality demonstrate smaller STEM gender gaps.

A significant body of research implicates "stereotype threat" — the anxiety experienced when individuals are aware that their performance may confirm a negative stereotype about their social group — as a contributing mechanism. Studies by Claude Steele and colleagues demonstrate that when female participants are reminded of gender stereotypes before taking a mathematics test, their performance declines relative to conditions in which no such reminder is given, even when the participants explicitly reject the stereotype as false. The effect appears to operate through working memory impairment caused by the effort of monitoring and suppressing stereotype-related thoughts.

Structural interventions that reduce stereotype threat — including representation of female scientists in curriculum materials, belonging interventions in introductory STEM courses, and mentoring from female STEM role models — have demonstrated significant positive effects on female students' persistence and performance in STEM programmes.`,
    questions: [
      {
        questionText:
          "What evidence does the passage provide that gender disparities in STEM are not caused by differences in innate ability?",
        options: [
          "Girls consistently score higher than boys on verbal reasoning tests, suggesting different rather than inferior intelligence.",
          "Standardised tests show equivalent performance when controlling for environment, and gender-equal countries show smaller STEM gaps.",
          "Women who enter STEM careers perform equally to or better than their male colleagues once hired.",
          "Neuroimaging studies show no structural differences between male and female brains relevant to mathematical reasoning.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

2つの証拠：
①「環境的要因をコントロールすると標準化テストでは女子が男子と同等のパフォーマンスを示す（standardised test data consistently shows girls performing equivalently to boys in mathematics when controlling for environmental factors）」
②「ジェンダー平等水準が高い国ではSTEMのジェンダーギャップが小さい（countries with higher levels of gender equality demonstrate smaller STEM gender gaps）」

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What is 'stereotype threat,' and what does the passage say is its neurological mechanism?",
        options: [
          "The unconscious adoption of gender stereotypes that leads women to avoid challenging subjects; caused by amygdala activation.",
          "The anxiety of potentially confirming a negative group stereotype; operates through working memory impairment from suppressing stereotype-related thoughts.",
          "The social pressure to conform to gender norms that discourages women from entering male-dominated fields; reinforced by peer approval.",
          "The fear of discrimination in the workplace that deters women from pursuing STEM qualifications; rooted in prefrontal cortex development.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第1文と末文が根拠です。

定義：
"the anxiety experienced when individuals are aware that their performance may confirm a negative stereotype about their social group"
（自分のパフォーマンスが社会集団に関する否定的ステレオタイプを確認する可能性があると意識した時に生じる不安）

神経学的メカニズム：
"The effect appears to operate through working memory impairment caused by the effort of monitoring and suppressing stereotype-related thoughts."
（ステレオタイプ関連の思考を監視・抑制する努力による作業記憶障害を通じて作用する）

→ B が定義とメカニズムの両方を正確に表現しています。`,
      },
      {
        questionText:
          "What types of structural interventions does the passage say have helped female students in STEM?",
        options: [
          "Lowering grading standards in introductory STEM courses to increase pass rates for female students.",
          "Representation of female scientists in materials, belonging interventions, and female mentoring in STEM.",
          "Separating male and female students in STEM classrooms to reduce competitive pressure.",
          "Providing financial scholarships exclusively for female students entering physics and engineering programmes.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

3つの構造的介入：
①"representation of female scientists in curriculum materials"（カリキュラム資料における女性科学者の表現）
②"belonging interventions in introductory STEM courses"（入門STEMコースでの帰属意識介入）
③"mentoring from female STEM role models"（女性STEMロールモデルからのメンタリング）

→ B が正確にまとめています。`,
      },
    ],
  },

  // P6-6: 国公立大 / 人口減少と経済 / 約215語
  {
    id: "depopulation-economic-impact",
    title: "Population Decline, Fiscal Sustainability, and Strategies for Demographic Adaptation",
    level: "NATIONAL_UNI",
    tags: ["論説文", "人口・経済政策", "国公立大", "約215語"],
    passage: `Demographic decline — characterised by sub-replacement fertility rates, population ageing, and in some cases absolute population contraction — poses structural challenges to economic systems calibrated for growth. The fiscal mathematics are stark: pay-as-you-go pension systems and public healthcare programmes funded through current worker contributions require sufficient working-age populations to sustain payments to a growing pool of beneficiaries. As the ratio of workers to retirees falls, either contribution rates must rise, benefit levels must fall, retirement ages must be extended, or fiscal transfers from other sources must compensate.

Beyond fiscal pressures, demographic decline affects private sector dynamics. Consumer markets contract as populations fall, reducing incentives for domestic investment. Productivity-enhancing investment in innovation may also decline: some economists argue that demographic pressure — the economic necessity of producing more per worker in the face of labour shortages — historically stimulated technological adoption and managerial efficiency improvement, a dynamic termed the "Boserupian response" after agricultural economist Ester Boserup.

Policy responses vary substantially across countries. Japan, facing the world's most acute demographic challenge, has pursued a combination of automation investment, modest immigration expansion, and measures to increase female and elderly labour force participation. Southern European countries, with historically lower female employment rates, have focused on childcare provision and parental leave reform. Effective demographic adaptation likely requires a portfolio of measures tailored to each country's specific institutional context and cultural dynamics.`,
    questions: [
      {
        questionText:
          "What does the passage say are the four options for addressing fiscal pressure from demographic decline?",
        options: [
          "Raise taxes, cut military spending, attract more tourists, or sell state assets.",
          "Raise contribution rates, cut benefits, extend retirement ages, or use fiscal transfers.",
          "Increase immigration, encourage higher birth rates, automate public services, or reduce pensions.",
          "Borrow internationally, devalue the currency, privatise healthcare, or reduce the civil service.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「4つの選択肢」：
"either contribution rates must rise, benefit levels must fall, retirement ages must be extended, or fiscal transfers from other sources must compensate"

①拠出率の引き上げ（contribution rates must rise）
②給付水準の削減（benefit levels must fall）
③退職年齢の延長（retirement ages must be extended）
④他の財源からの財政移転（fiscal transfers from other sources）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What is the 'Boserupian response' as described in the passage?",
        options: [
          "The tendency of governments to increase immigration in response to declining domestic birth rates.",
          "The argument that demographic pressure from labour shortages historically stimulated technological and managerial improvement.",
          "The economic theory that population growth is the primary driver of long-run economic expansion.",
          "A policy framework recommending agricultural reform as the foundation of demographic stabilisation.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：定義問題】
正解は B。第2段落末文が根拠です。

"demographic pressure — the economic necessity of producing more per worker in the face of labour shortages — historically stimulated technological adoption and managerial efficiency improvement, a dynamic termed the 'Boserupian response'"

定義：
・人口圧力（労働力不足下でより多くを生産する経済的必要性）が
・技術採用と経営効率改善を歴史的に刺激した

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What approach does the passage describe Japan taking to address demographic decline?",
        options: [
          "Aggressively expanding immigration to replace the shrinking domestic workforce.",
          "Prioritising childcare provision and parental leave to raise the birth rate.",
          "Combining automation investment, limited immigration expansion, and increasing participation of women and elderly.",
          "Reducing pension benefits to redirect funding towards youth employment programmes.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第2文が根拠です。

「日本のアプローチ（3つの組み合わせ）」：
"a combination of automation investment, modest immigration expansion, and measures to increase female and elderly labour force participation"

①自動化投資（automation investment）
②適度な移民拡大（modest immigration expansion）
③女性・高齢者の労働参加増加（measures to increase female and elderly labour force participation）

→ C が正確にまとめています。

【引っかけ分析】
・B「保育所提供と育児休業改革」: これは南欧諸国のアプローチ（"Southern European countries ... have focused on childcare provision and parental leave reform"）。日本のものと混同しないよう注意。`,
      },
    ],
  },

  // P6-7: 私立大 / 食の倫理と代替タンパク質 / 約198語
  {
    id: "alternative-protein-ethics",
    title: "Alternative Proteins, Food Ethics, and the Transition Away from Industrial Animal Agriculture",
    level: "PRIVATE_UNI",
    tags: ["論説文", "食の倫理・テクノロジー", "私立大", "約198語"],
    passage: `Industrial animal agriculture — characterised by high-density confinement of livestock, routine antibiotic use, and the conversion of vast land and water resources into animal feed — is responsible for approximately 14.5 percent of global greenhouse gas emissions, according to the Food and Agriculture Organization. It is also the subject of growing ethical scrutiny for the conditions it imposes on billions of sentient animals capable of experiencing pain and distress.

Alternative protein technologies — including plant-based meat analogues, precision fermentation, and cultivated meat grown from animal cells in bioreactors — offer the prospect of producing nutritionally comparable protein with substantially reduced land use, water consumption, and greenhouse gas emissions. Cultivated meat, if commercialised at scale, could theoretically produce beef without requiring animals to be raised and slaughtered, removing the animal welfare dimension almost entirely.

The transition from conventional to alternative proteins faces multiple barriers beyond technology: regulatory approval processes are still developing for novel food categories; price parity with conventional animal products has not yet been achieved for most alternatives; and consumer acceptance varies substantially across cultural contexts. Critics from the food sovereignty movement additionally argue that the corporate concentration inherent in high-technology food systems risks displacing smallholder farmers and traditional food cultures, replacing one set of ethical problems with another.`,
    questions: [
      {
        questionText:
          "What two grounds of criticism does the passage identify for industrial animal agriculture?",
        options: [
          "High costs for consumers and the monopolistic practices of large food corporations.",
          "Significant greenhouse gas emissions and ethical concerns about conditions for sentient animals.",
          "Reliance on imported animal feed and the displacement of subsistence farmers in developing countries.",
          "Water pollution from animal waste and the health risks of antibiotic-resistant bacteria in humans.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落が根拠です。

2つの批判根拠：
①「温室効果ガス排出（約14.5%）（approximately 14.5 percent of global greenhouse gas emissions）」
②「苦痛と苦悩を経験できる数十億の知覚ある動物に課せられる条件に対する倫理的精査（ethical scrutiny for the conditions it imposes on billions of sentient animals capable of experiencing pain and distress）」

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What potential advantage of cultivated meat does the passage highlight?",
        options: [
          "It can be produced using only renewable energy, making it carbon neutral.",
          "It is nutritionally superior to conventional beef and contains fewer saturated fats.",
          "It could produce beef-equivalent protein without requiring animals to be raised and slaughtered.",
          "It can be manufactured in small-scale facilities, reducing dependence on large food corporations.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

「培養肉の潜在的優位性」：
"Cultivated meat, if commercialised at scale, could theoretically produce beef without requiring animals to be raised and slaughtered, removing the animal welfare dimension almost entirely."
（培養肉は、理論的に動物を飼育・屠殺することなく牛肉を生産でき、動物福祉の問題をほぼ完全に取り除く）

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "What concern does the food sovereignty movement raise about high-technology alternative protein systems?",
        options: [
          "That they will make food more expensive by eliminating competitive pressure from traditional agriculture.",
          "That corporate concentration in such systems risks displacing smallholder farmers and traditional food cultures.",
          "That the long-term health effects of consuming lab-grown proteins have not been adequately studied.",
          "That alternative proteins will reduce biodiversity by replacing diverse crop systems with monocultures.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

「フードソブリンティ運動の批判」：
"the corporate concentration inherent in high-technology food systems risks displacing smallholder farmers and traditional food cultures, replacing one set of ethical problems with another"
（ハイテク食料システムに内在する企業集中が小規模農家と伝統的食文化を排除するリスクがある）

→ B が正確な言い換えです。

【語彙ポイント】
・"food sovereignty"（食料主権）: 人々が自分たちの食料システムや農業政策を定義する権利。`,
      },
    ],
  },

  // P6-8: 共通テスト / サブスクリプション経済 / 約188語
  {
    id: "subscription-economy",
    title: "The Subscription Economy: Business Models, Consumer Behaviour, and Market Concentration",
    level: "COMMON_TEST",
    tags: ["論説文", "経済・ビジネス", "共通テスト", "約188語"],
    passage: `The shift from ownership to access — epitomised by streaming platforms, software-as-a-service, and subscription boxes — represents one of the most significant structural changes in consumer markets over the past two decades. Subscription business models offer companies predictable, recurring revenue and higher customer lifetime value compared to one-time purchases, while offering consumers convenient access to large catalogues of content or services for a fixed periodic fee.

For businesses, the subscription model creates powerful incentives to maximise customer retention through product quality, personalisation, and what product designers term "engagement loops" — design patterns that make regular usage habitual. The downside of these engagement mechanisms, critics argue, is that they are designed to make cancellation psychologically difficult: offering lengthy cancellation processes, deploying "save offers" that present discounts at the moment of attempted cancellation, and sending targeted re-engagement campaigns to lapsed subscribers.

The subscription model also tends towards market concentration. As subscriber bases grow, the fixed costs of content creation are amortised over more users, creating cost advantages that make it difficult for new entrants to compete. In streaming, this dynamic has produced a small number of dominant platforms that control access to large audiences, giving them structural leverage over content creators and production companies negotiating licensing deals.`,
    questions: [
      {
        questionText:
          "What advantages does the passage say subscription models offer to companies?",
        options: [
          "Lower upfront development costs and easier access to international markets.",
          "Predictable recurring revenue and higher customer lifetime value compared to one-time purchases.",
          "Greater pricing flexibility and the ability to charge different customers different rates simultaneously.",
          "Reduced need for customer service because subscribers receive automated support.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

企業側の利点：
"predictable, recurring revenue and higher customer lifetime value compared to one-time purchases"
（予測可能な定期収益と、一回限りの購入と比較して高い顧客生涯価値）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What criticism do critics make of the 'engagement loops' used in subscription services?",
        options: [
          "They expose users to excessive advertising that undermines the value of the subscription.",
          "They collect too much personal data, which is then sold to third-party companies.",
          "They are designed to make cancellation psychologically difficult through various retention tactics.",
          "They encourage compulsive consumption patterns that lead subscribers to overspend on additional services.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落末文が根拠です。

批評家の指摘：
"they are designed to make cancellation psychologically difficult: offering lengthy cancellation processes, deploying 'save offers' that present discounts at the moment of attempted cancellation, and sending targeted re-engagement campaigns to lapsed subscribers"

3つの心理的困難化の手法：
①長い解約プロセス（lengthy cancellation processes）
②解約試みの瞬間の割引提示（"save offers"）
③失効会員へのターゲット再エンゲージメント

→ C が正確な言い換えです。`,
      },
      {
        questionText:
          "Why does the subscription model tend to create market concentration, according to the passage?",
        options: [
          "Subscription companies reinvest profits into acquiring competitors, eliminating market rivals.",
          "Regulators favour subscription companies because they provide more stable employment than traditional businesses.",
          "As subscriber bases grow, fixed costs are spread over more users, giving large platforms cost advantages over new entrants.",
          "Consumers prefer to maintain only one or two subscriptions, naturally concentrating spending on dominant platforms.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落第1〜2文が根拠です。

市場集中のメカニズム：
"As subscriber bases grow, the fixed costs of content creation are amortised over more users, creating cost advantages that make it difficult for new entrants to compete."
（サブスクライバーベースが成長するにつれて、コンテンツ制作の固定費がより多くのユーザーに分散され、新規参入者が競争しにくいコスト優位性が生まれる）

→ C が正確な言い換えです。

【語彙ポイント】
・"amortised"（償却された）: 固定費用を多数のユーザー・時間で分割してコスト単価を下げること。
・"leverage"（レバレッジ・影響力）: 交渉や競争における有利な立場。`,
      },
    ],
  },

  // P6-9: 国公立大 / ポストコロニアル批評と文学 / 約218語
  {
    id: "postcolonial-criticism-literature",
    title: "Postcolonial Criticism and the Re-reading of the Western Literary Canon",
    level: "NATIONAL_UNI",
    tags: ["論説文", "文学・批評理論", "国公立大", "約218語"],
    passage: `Postcolonial criticism — a mode of literary and cultural analysis concerned with the representation of colonised peoples and the ideological operations of colonial and imperial power in texts — emerged as a significant academic movement following the foundational work of scholars including Frantz Fanon, Edward Said, Homi Bhabha, and Gayatri Spivak. Edward Said's Orientalism (1978) is conventionally regarded as the field's origin point; its central argument was that Western literary and scholarly representations of the "Orient" were not innocent descriptions of an external reality but constitutive productions of a cultural discourse that served to legitimate colonial domination by rendering colonised peoples as passive, exotic, and fundamentally different from the rational, progressive West.

Postcolonial readers applying this critical lens to canonical Western texts — including Shakespeare's The Tempest, Defoe's Robinson Crusoe, Austen's Mansfield Park, and Dickens's Great Expectations — have demonstrated the degree to which empire, slavery, and colonial administration constitute structuring absences or presences in texts not explicitly concerned with colonialism.

The approach has also generated significant scholarly controversy. Critics of postcolonial criticism argue that it risks subordinating aesthetic appreciation to political interpretation, projecting present-day political concerns anachronistically onto texts produced in different ideological contexts, and homogenising diverse colonial experiences that varied substantially across time, geography, and the nature of different colonial encounters.`,
    questions: [
      {
        questionText:
          "What was the central argument of Edward Said's Orientalism, according to the passage?",
        options: [
          "That Eastern civilisations were more advanced than Western scholarship had acknowledged.",
          "That Western representations of the Orient were not neutral descriptions but served to legitimate colonial power.",
          "That literary analysis should focus on the author's biographical context rather than the text alone.",
          "That colonised peoples should reclaim their cultural narratives by writing in their native languages.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落末文が根拠です。

「オリエンタリズムの中心的主張」：
"Western literary and scholarly representations of the 'Orient' were not innocent descriptions of an external reality but constitutive productions of a cultural discourse that served to legitimate colonial domination by rendering colonised peoples as passive, exotic, and fundamentally different"
（西洋の「オリエント」に関する文学的・学術的表現は、外部現実の無邪気な記述ではなく、植民地支配を正当化するために機能した文化的言説の構成的産物）

→ B が正確な言い換えです。`,
      },
      {
        questionText:
          "What do postcolonial readings of canonical Western texts such as Robinson Crusoe reveal?",
        options: [
          "That these texts were secretly written by colonised peoples whose contributions were erased by publishers.",
          "That empire, slavery, and colonial administration are present or structurally absent even in texts not explicitly about colonialism.",
          "That canonical Western literature is fundamentally incompatible with contemporary values and should be removed from curricula.",
          "That the authors of these texts were secretly sympathetic to anti-colonial movements.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落が根拠です。

「ポストコロニアル的読解が明らかにすること」：
"empire, slavery, and colonial administration constitute structuring absences or presences in texts not explicitly concerned with colonialism"
（帝国・奴隷制・植民地行政は、植民地主義を明示的に扱っていないテキストにおいても構造的な不在または存在を構成する）

→ B が正確な言い換えです。

【語彙ポイント】
・"structuring absences"（構造的不在）: テキストに明示されていないが、テキストの構造を形成している要素。`,
      },
      {
        questionText:
          "What criticisms of postcolonial criticism does the passage outline?",
        options: [
          "That it focuses too narrowly on British colonialism and ignores other imperial histories.",
          "That it subordinates aesthetic appreciation to politics, anachronistically projects modern concerns, and homogenises diverse colonial experiences.",
          "That it lacks rigorous methodology and relies too heavily on subjective interpretation.",
          "That it is accessible only to scholars with specialist knowledge, limiting its educational value.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

「ポストコロニアル批評への批判（3点）」：
①「美的鑑賞を政治的解釈に従属させるリスク（subordinating aesthetic appreciation to political interpretation）」
②「異なるイデオロギー的文脈で生産されたテキストに現代の政治的懸念を時代錯誤的に投影（projecting present-day political concerns anachronistically）」
③「実際には多様だった植民地経験を均質化（homogenising diverse colonial experiences）」

→ B が正確にまとめています。

【語彙ポイント】
・"anachronistically"（時代錯誤的に）: 本来の時代とは異なる時代の基準・価値観を当てはめること。`,
      },
    ],
  },

  // P6-10: 私立大 / 感謝と幸福感の心理学 / 約197語
  {
    id: "gratitude-wellbeing-psychology",
    title: "Gratitude, Wellbeing, and the Science of Positive Psychology",
    level: "PRIVATE_UNI",
    tags: ["論説文", "心理学・ウェルビーイング", "私立大", "約197語"],
    passage: `Positive psychology — the scientific study of conditions that promote human flourishing, as distinct from psychology's traditional focus on pathology and dysfunction — emerged as an organised field following Martin Seligman's 1998 presidential address to the American Psychological Association. Among its most robust findings is the relationship between dispositional gratitude and wellbeing outcomes.

Empirical studies by Robert Emmons and colleagues using gratitude journals — in which participants write weekly about things for which they are grateful — found that participants in the gratitude condition reported significantly higher levels of positive affect, greater life satisfaction, fewer physical health complaints, and higher motivation compared to control groups instructed to record neutral or negative life events. Longitudinal studies have extended these findings, showing that these benefits persist over time rather than dissipating after the novelty of the intervention wears off.

Neuroimaging research has identified the medial prefrontal cortex as particularly active during experiences of gratitude, suggesting that gratitude engages brain regions associated with moral cognition, social bonding, and reward processing. Critics of positive psychology caution, however, that the emphasis on cultivating positive emotions risks trivialising the legitimate adaptive functions of negative emotions such as anxiety, grief, and anger, which serve important signalling roles in human psychology and should not be prematurely suppressed or reframed.`,
    questions: [
      {
        questionText:
          "What benefits did participants in gratitude journal studies show, according to the passage?",
        options: [
          "Improved academic performance, stronger social relationships, and reduced rates of chronic illness.",
          "Higher positive affect, greater life satisfaction, fewer health complaints, and higher motivation.",
          "Lower levels of anxiety, reduced likelihood of depression relapse, and improved sleep quality.",
          "Increased financial earnings, better career outcomes, and more satisfying personal relationships.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

「感謝日記グループが示した4つの効果」：
①significantly higher levels of positive affect（ポジティブ感情の有意な向上）
②greater life satisfaction（より高い生活満足度）
③fewer physical health complaints（身体的健康上の不満の減少）
④higher motivation（より高いモチベーション）

→ B が正確にまとめています。`,
      },
      {
        questionText:
          "What do longitudinal studies add to the findings on gratitude journaling?",
        options: [
          "They show that the benefits are stronger in older adults than in younger participants.",
          "They confirm that the benefits persist over time rather than fading after the novelty wears off.",
          "They demonstrate that the frequency of journaling matters more than the content of what is written.",
          "They show that gratitude benefits are limited to people who already score high on trait optimism.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が根拠です。

「縦断的研究の追加的知見」：
"showing that these benefits persist over time rather than dissipating after the novelty of the intervention wears off"
（介入の目新しさが薄れた後も、これらの恩恵が消失するのではなく持続することを示している）

→ B が正確な言い換えです。

【語彙ポイント】
・"longitudinal studies"（縦断的研究）: 同じ参加者を長期間追跡する研究。横断的研究（cross-sectional）との対比。
・"dissipating"（消散する）: 徐々に消えてなくなること。`,
      },
      {
        questionText:
          "What caution do critics of positive psychology raise?",
        options: [
          "That positive psychology interventions can only be effective when delivered by trained therapists.",
          "That overemphasis on positive emotions risks trivialising the legitimate functions of negative emotions.",
          "That the benefits of gratitude practices disappear when participants stop keeping journals.",
          "That positive psychology's focus on individual wellbeing ignores the importance of social and political change.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落末文が根拠です。

「批評家の警告」：
"the emphasis on cultivating positive emotions risks trivialising the legitimate adaptive functions of negative emotions such as anxiety, grief, and anger, which serve important signalling roles in human psychology and should not be prematurely suppressed or reframed"
（ポジティブ感情の育成への重点は、不安・悲嘆・怒りなどのネガティブ感情の正当な適応的機能を軽視するリスクがある — これらは重要なシグナリング機能を持ち、早急に抑制・再フレーミングすべきではない）

→ B が正確な言い換えです。`,
      },
    ],
  },
];
