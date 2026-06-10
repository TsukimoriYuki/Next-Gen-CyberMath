import type { ComprehensionProblem } from "@/lib/english-types";

export const COMPREHENSION_PACK_3: ComprehensionProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // P3-1: 国公立大 / CAR-T免疫療法 / 約215語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "car-t-immunotherapy",
    title: "CAR-T Cell Therapy: Engineering Immunity Against Cancer",
    level: "NATIONAL_UNI",
    tags: ["論説文", "医療テクノロジー・免疫療法", "国公立大", "約215語"],
    passage: `Among the most significant recent advances in oncology is the development of chimeric antigen receptor T-cell therapy, commonly known as CAR-T. Unlike conventional treatments such as chemotherapy and radiation, which indiscriminately destroy rapidly dividing cells throughout the body, CAR-T therapy harnesses the patient's own immune system, genetically engineering T-lymphocytes to express artificial receptors capable of recognising and eliminating tumour cells with high specificity.

The procedure entails extracting T-cells from the patient, transducing them ex vivo with a viral vector encoding the chimeric receptor, expanding the modified cell population in culture, and reinfusing the cells into the patient following a conditioning chemotherapy regimen. Once inside the body, the engineered T-cells multiply upon encountering their target antigen, mounting a sustained immune response against the malignancy.

Clinical trials have demonstrated remarkable efficacy in certain haematological malignancies — particularly acute lymphoblastic leukaemia and diffuse large B-cell lymphoma — with complete remission rates substantially exceeding those achievable with standard salvage chemotherapy in relapsed or refractory cases. However, the treatment is not without serious risks. Cytokine release syndrome, caused by the massive inflammatory response accompanying T-cell activation, can be life-threatening and requires careful management with immunosuppressive agents. Moreover, CAR-T remains prohibitively expensive and logistically complex, limiting its accessibility to patients in well-resourced medical centres.`,

    questions: [
      {
        questionText:
          "How does the passage distinguish CAR-T therapy from conventional cancer treatments such as chemotherapy?",
        options: [
          "CAR-T therapy is faster to administer and requires no prior laboratory preparation.",
          "CAR-T therapy targets only healthy cells, leaving tumour cells to be eliminated by the body naturally.",
          "CAR-T therapy uses the patient's own modified immune cells to destroy cancer cells selectively.",
          "CAR-T therapy is less effective than chemotherapy but produces fewer side effects.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と対比構造】
正解は C。第1段落で化学療法との明確な対比が提示されています。

化学療法: "indiscriminately destroy rapidly dividing cells throughout the body"
（無差別に全身の急速分裂細胞を破壊する）

CAR-T療法: "harnesses the patient's own immune system, genetically engineering T-lymphocytes to express artificial receptors capable of recognising and eliminating tumour cells with high specificity"
（患者自身の免疫システムを利用し、高い特異性で腫瘍細胞を認識・排除できる人工受容体を発現するようT細胞を遺伝子工学的に改変する）

→ C「患者自身の改変免疫細胞を使って選択的に癌細胞を破壊する」が正確な言い換えです。

【引っかけ分析】
・A「投与が速く事前準備が不要」: 第2段落は長い多段階の手順（T細胞採取→形質導入→培養→再注入）を詳述しており、むしろ準備が複雑です。
・B「正常細胞のみを標的にし癌細胞は体が自然に排除」: 完全に逆です。CAR-T は腫瘍細胞を標的にします。
・D「効果はより低いが副作用が少ない」: 第3段落は「顕著な有効性（remarkable efficacy）」を述べており、かつ深刻なリスク（cytokine release syndrome）も存在します。

【語彙ポイント】
・"harness"（利用する・活用する）: 本来「馬具をつける」が転じて「力を制御・活用する」。
・"specificity"（特異性）: 特定の標的のみに反応する性質。`,
      },
      {
        questionText:
          "What is cytokine release syndrome, as described in the passage?",
        options: [
          "A form of cancer that occasionally develops as a side effect of CAR-T therapy.",
          "A dangerous inflammatory response triggered when engineered T-cells become overactive.",
          "A method of suppressing the immune system to prevent rejection of modified T-cells.",
          "A rare allergic reaction caused by the viral vectors used to modify T-cells.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠：語句定義問題】
正解は B。第3段落第3文が根拠です。

"Cytokine release syndrome, caused by the massive inflammatory response accompanying T-cell activation, can be life-threatening and requires careful management with immunosuppressive agents."

コンマで囲まれた同格部分が定義：
"caused by the massive inflammatory response accompanying T-cell activation"
（T細胞活性化に伴う大規模な炎症反応によって引き起こされる）

→ B「改変T細胞が過活発になった時に引き起こされる危険な炎症反応」が正確です。

【構文解析：挿入された過去分詞句】
"Cytokine release syndrome, [caused by the massive inflammatory response accompanying T-cell activation,] can be life-threatening"
→ コンマに挟まれた過去分詞句（caused by ...）は主語 "Cytokine release syndrome" を後置修飾。
→ "accompanying"（〜に伴う）: 現在分詞で "inflammatory response" を修飾。

【引っかけ分析】
・A「CAR-Tの副作用として発症する癌」: サイトカイン放出症候群は炎症反応であり、癌ではありません。
・C「T細胞拒絶を防ぐための免疫抑制法」: これは治療（management）に使われるもの（immunosuppressive agents）であり、症候群の定義ではありません。
・D「ウイルスベクターによるアレルギー反応」: ウイルスベクターは第2段落の手順に登場しますが、CRS の原因ではありません。`,
      },
      {
        questionText:
          "According to the passage, what are the main factors limiting the wider adoption of CAR-T therapy?",
        options: [
          "Its inability to achieve complete remission in haematological cancers.",
          "Strict international regulations prohibiting its use outside clinical trial settings.",
          "Its high cost and the logistical complexity of the manufacturing process.",
          "The high rate of tumour recurrence observed in long-term follow-up studies.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第3段落末文が根拠です。

"CAR-T remains prohibitively expensive and logistically complex, limiting its accessibility to patients in well-resourced medical centres."

・prohibitively expensive（法外に高価）
・logistically complex（ロジスティクスが複雑）

→ C「高コストと製造プロセスの複雑さ」が正確な言い換えです。

【syntaxAnalysis 解析対象文】
"CAR-T remains prohibitively expensive and logistically complex, limiting its accessibility to patients in well-resourced medical centres."

S: CAR-T
V: remains（〜の状態のままである：不完全自動詞）
C: prohibitively expensive and logistically complex（形容詞句が補語）
M: limiting its accessibility to patients in well-resourced medical centres（分詞構文：結果を表す）

分詞構文 "limiting ..." は「その結果として〜を制限する」という帰結を示しています。

【引っかけ分析】
・A「血液がんでの完全寛解が不可能」: 本文は "complete remission rates substantially exceeding those achievable with standard salvage chemotherapy" と逆の内容を述べています。
・B「臨床試験以外での使用を禁じる国際規制」: 本文に規制（regulation）の話は登場しません。
・D「長期再発率が高い」: 本文に記述なし。`,
        syntaxAnalysis: [
          {
            text: "CAR-T",
            role: "S",
            translation: "CAR-T療法は（主語）",
          },
          {
            text: "remains",
            role: "V",
            translation: "〜の状態のままである（不完全自動詞 remain：SVCの構造をとる）",
          },
          {
            text: "prohibitively expensive and logistically complex",
            role: "C",
            translation: "法外に高価でロジスティクスが複雑な状態（形容詞句が補語。prohibitively = 取り組みを妨げるほど）",
          },
          {
            text: "limiting its accessibility to patients in well-resourced medical centres",
            role: "M",
            translation: "分詞構文（結果）：その結果として、十分なリソースを持つ医療施設の患者にしかアクセスできないという制限をもたらしている",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-2: 私立大 / アテンションエコノミーと認知的自律 / 約210語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "attention-economy-cognition",
    title: "The Attention Economy and the Erosion of Cognitive Autonomy",
    level: "PRIVATE_UNI",
    tags: ["論説文", "テクノロジー・認知心理学", "私立大", "約210語"],
    passage: `The concept of the attention economy rests on a straightforward premise: in an era of information abundance, the scarcest and most commercially valuable resource is not data or processing power, but human attention. Technology companies, social media platforms, and content providers compete fiercely to capture and retain users' cognitive engagement, employing sophisticated behavioural science — including variable reward schedules, social validation signals, and personalised recommendation algorithms — to maximise the time users spend on their platforms.

Critics argue that this commercial architecture imposes a profound cost on cognitive autonomy. The deliberate exploitation of psychological vulnerabilities — the same mechanisms underlying compulsive gambling — to engineer habitual platform engagement treats the human capacity for focused attention not as an end in itself but as a raw material to be mined for advertising revenue. Philosophers of technology, drawing on Kantian ethics, contend that this constitutes a systemic violation of human dignity.

Proponents of the current model counter that platforms provide services of genuine utility at no direct monetary cost, and that users retain the freedom to disengage at any time. The tension between these perspectives has intensified calls for regulatory frameworks requiring algorithmic transparency and imposing limits on certain engagement-maximisation practices, particularly as they apply to adolescents whose prefrontal cortices — the neural substrate of impulse control — remain incompletely developed.`,

    questions: [
      {
        questionText:
          "According to the passage, what is the 'scarcest and most commercially valuable resource' in the attention economy?",
        options: [
          "High-quality data collected from user interactions on digital platforms.",
          "Computational processing power used to run recommendation algorithms.",
          "Human attention in an environment of information overabundance.",
          "Advertising revenue generated by social media engagement metrics.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第1文が直接の定義を提供しています。

"in an era of information abundance, the scarcest and most commercially valuable resource is not data or processing power, but human attention."

「情報が豊富な時代において、最も希少で商業的に価値のある資源はデータでも処理能力でもなく、人間の注意である」

→ C「情報過多の環境における人間の注意」が正確です。

【not A but B 構文の把握】
"not data or processing power, but human attention"
→ A（否定）= data or processing power（データや処理能力）
→ B（肯定）= human attention（人間の注意）
→ "not A but B"（AではなくB）: 対比を明確にする頻出構文。

【引っかけ分析】
・A「ユーザーインタラクションから収集されたデータ」: "not data" と明示的に否定されています。
・B「推薦アルゴリズムを動かす処理能力」: "not ... processing power" と明示的に否定されています。
・D「広告収益」: 広告収益は注意を「換金した結果」として登場しますが、「最も希少な資源」として定義されていません。`,
      },
      {
        questionText:
          "Why do critics argue that the attention economy constitutes a violation of human dignity?",
        options: [
          "Because platforms collect personal data without users' explicit knowledge or consent.",
          "Because it treats human attention as a commodity to be commercially exploited rather than as intrinsically valuable.",
          "Because algorithmic content curation consistently promotes misinformation over factual reporting.",
          "Because engagement-maximisation practices have been directly linked to increased rates of addiction.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と哲学的背景】
正解は B。第2段落の論旨を正確に把握する問題です。

批評家の主張の核心:
"treats the human capacity for focused attention not as an end in itself but as a raw material to be mined for advertising revenue"
（集中した注意の人間的能力を、それ自体を目的としてではなく、広告収益のために採掘される原材料として扱う）

カント倫理学との接続:
"Philosophers of technology, drawing on Kantian ethics, contend that this constitutes a systemic violation of human dignity."
→ カント倫理学の根本原則：「人を手段としてのみ扱わず、常に目的としても扱え」
→ 注意を「手段（raw material）」としてのみ扱うことがこの原則違反。

→ B「人間の注意を本質的価値を持つものとしてではなく商業的に搾取すべき商品として扱う」が正確です。

【語彙ポイント】
・"not as an end in itself but as a raw material"（それ自体を目的としてではなく原材料として）: カント的な「目的の王国」の概念への言及。
・"systemic violation"（組織的違反）: 個別の問題ではなく、システムの構造的問題。`,
      },
      {
        questionText:
          "What specific concern about adolescents does the passage raise in the final paragraph?",
        options: [
          "Adolescents are more likely than adults to generate advertising revenue for platforms.",
          "Adolescents lack the legal rights to consent to having their data collected by platforms.",
          "The brain region governing impulse control is not yet fully developed in adolescents.",
          "Adolescents are disproportionately exposed to harmful misinformation on social media.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と構文解析】
正解は C。第3段落末文が根拠です。

"adolescents whose prefrontal cortices — the neural substrate of impulse control — remain incompletely developed"
（前頭前皮質——衝動制御の神経基盤——がまだ完全には発達していない青少年）

→ C「衝動制御を司る脳領域が青少年ではまだ完全に発達していない」が正確です。

【同格のダッシュ構文の解析】
"prefrontal cortices — the neural substrate of impulse control —"
→ ダッシュで囲まれた部分が "prefrontal cortices"（前頭前皮質）の説明（同格）。
→ "neural substrate"（神経基盤）: 特定の機能を担う神経構造。

【なぜこれが問題なのか：背景知識の文脈化】
・エンゲージメント最大化の手法（可変報酬スケジュール等）は衝動制御を利用する。
・前頭前皮質が未発達な青少年は、こうした設計に特に脆弱である。
→ この理由から「特に青少年に対する規制が必要」という主張に繋がります。

【引っかけ分析】
・A「広告収益を多く生成する」: 本文に記述なし。
・B「データ収集への同意権がない」: 法的権利については本文に記述なし。
・D「誤情報に過剰に晒されている」: 本文のテーマはエンゲージメント設計と認知的自律であり、誤情報については触れていません。`,
        syntaxAnalysis: [
          {
            text: "adolescents",
            role: "S",
            translation: "青少年たち（関係代名詞節 whose ... によって後置修飾される主語）",
          },
          {
            text: "whose prefrontal cortices — the neural substrate of impulse control —",
            role: "M",
            translation: "関係代名詞 whose + 名詞句（所有格の関係代名詞節）：前頭前皮質——衝動制御の神経基盤——を持つ（ダッシュ内は同格説明）",
          },
          {
            text: "remain",
            role: "V",
            translation: "〜の状態のままである（不完全自動詞 remain：関係節内の述語動詞）",
          },
          {
            text: "incompletely developed",
            role: "C",
            translation: "不完全にしか発達していない状態（形容詞句が補語。incompletely = 不完全に、副詞が過去分詞 developed を修飾）",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-3: 国公立大 / エピジェネティクスと遺伝子発現 / 約235語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "epigenetics-transgenerational",
    title: "Epigenetics: Environment, Gene Expression, and Transgenerational Inheritance",
    level: "NATIONAL_UNI",
    tags: ["論説文", "分子生物学・エピジェネティクス", "国公立大", "約235語", "倒置・省略"],
    passage: `That the sequence of nucleotides constituting an individual's DNA should remain essentially fixed throughout their lifetime was, for decades, an unchallenged axiom of molecular biology. What the field of epigenetics has revealed, however, is that gene expression — the process by which genetic information is transcribed and translated into functional proteins — is subject to a dynamic layer of chemical modification that responds continuously to environmental stimuli.

Two principal mechanisms mediate epigenetic regulation. DNA methylation involves the addition of a methyl group to cytosine residues at specific gene loci, typically silencing transcription at those sites. Histone modification, conversely, alters the protein scaffolding around which DNA is coiled, either compacting chromatin to restrict access by transcriptional machinery or relaxing it to facilitate gene expression. Neither mechanism alters the underlying nucleotide sequence, yet both exert profound effects on cellular phenotype.

What renders epigenetics particularly striking is the mounting evidence that certain environmentally induced epigenetic modifications can be transmitted across generations — a phenomenon known as transgenerational epigenetic inheritance. Studies in rodent models have demonstrated that traumatic stress experienced by parent organisms induces heritable alterations in stress-response gene expression in offspring who have never encountered the stressor. Though the mechanisms governing such transmission in humans remain incompletely characterised, these findings have unsettled the Weismann barrier — the classical doctrine asserting the strict separation of germline and somatic inheritance — and revived questions that earlier biologists could only pose speculatively.`,

    questions: [
      {
        questionText:
          "Which of the following best describes the central claim of epigenetics as presented in the passage?",
        options: [
          "The nucleotide sequence of DNA changes frequently throughout an individual's lifetime in response to stress.",
          "Chemical modifications regulate which genes are expressed without altering the DNA sequence itself.",
          "Epigenetic changes are irreversible and can only be corrected through direct gene editing.",
          "Environmental stress reliably improves gene expression by activating dormant DNA sequences.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と全体論旨】
正解は B。第1段落第2文と第2段落末文を組み合わせて理解する問題です。

第1段落: エピジェネティクスが明らかにしたこと:
"gene expression ... is subject to a dynamic layer of chemical modification that responds continuously to environmental stimuli"
（遺伝子発現は環境刺激に継続的に応答する動的な化学的修飾の層の支配下にある）

第2段落末文: "Neither mechanism alters the underlying nucleotide sequence, yet both exert profound effects on cellular phenotype."
（どちらのメカニズムも基礎にある塩基配列を変えないが、どちらも細胞表現型に深遠な影響を及ぼす）

→ B「化学的修飾が、DNA配列自体を変えることなく、どの遺伝子が発現するかを調節する」が正確です。

【引っかけ分析】
・A「塩基配列が頻繁に変化する」: 第1段落は "the sequence ... should remain essentially fixed" という従来の通説から始まり、エピジェネティクスが示すのは「発現の調節」であり「配列の変化」ではありません（第2段落末文で明示）。
・C「エピジェネティックな変化は不可逆」: 本文に記述なし。"dynamic（動的）"という表現はむしろ可逆性を示唆します。
・D「ストレスが遺伝子発現を向上させる」: 第3段落では「外傷性ストレス（traumatic stress）」が遺伝性の変化を引き起こすことを示しており、「向上」という楽観的な方向性は述べられていません。`,
      },
      {
        questionText:
          "What do the two epigenetic mechanisms described in the second paragraph — DNA methylation and histone modification — have in common?",
        options: [
          "Both permanently delete specific gene sequences from the genome.",
          "Both directly alter the nucleotide sequence to control gene expression.",
          "Both affect how genes are expressed while leaving the DNA sequence unchanged.",
          "Both are triggered exclusively by exposure to chemical toxins in the environment.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：対比と共通点の把握】
正解は C。第2段落末文が直接の根拠です。

"Neither mechanism alters the underlying nucleotide sequence, yet both exert profound effects on cellular phenotype."

「どちらのメカニズムも基礎にある塩基配列を変えないが、どちらも細胞表現型に深遠な影響を及ぼす。」

→ 共通点：（1）塩基配列は変えない、（2）遺伝子発現（表現型）に影響する
→ C「どちらも、DNA配列を変えることなく遺伝子の発現に影響する」が正確です。

【各メカニズムの整理】
DNAメチル化: シトシン残基にメチル基を付加 → 転写を抑制（遺伝子をサイレンシング）
ヒストン修飾: DNAが巻き付くタンパク質足場を変化させる → クロマチンを凝縮（アクセス制限）またはほぐす（発現促進）

→ 両者とも「遺伝子のオン/オフの調節」という機能で共通。

【Neither A nor / Neither ... yet ... の構文】
"Neither mechanism alters ..., yet both exert ..."
→ "neither"（どちらも〜しない）で共通の非変化を示し、"yet both"（それでもどちらも）で共通の効果を示す逆接。

【引っかけ分析】
・B「直接塩基配列を変化させる」: これが B の逆の引っかけで、本文は "neither mechanism alters the underlying nucleotide sequence" と明示します。`,
      },
      {
        questionText:
          "What does the passage suggest the concept of 'transgenerational epigenetic inheritance' challenges?",
        options: [
          "The effectiveness of gene-editing technologies such as CRISPR in treating hereditary diseases.",
          "The classical biological principle that only changes to germline DNA can be inherited by offspring.",
          "The theory that environmental stress always has negative effects on genetic health.",
          "The view that epigenetic modifications are confined to a single generation's lifetime.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と構文解析】
正解は B。第3段落末文の "Weismann barrier" に関する記述が根拠です。

"these findings have unsettled the Weismann barrier — the classical doctrine asserting the strict separation of germline and somatic inheritance"

ヴァイスマン障壁（Weismann barrier）の定義（ダッシュ内の同格節）:
"the classical doctrine asserting the strict separation of germline and somatic inheritance"
（生殖細胞系列の遺伝と体細胞の遺伝の厳格な分離を主張する古典的な教義）

→ ヴァイスマン障壁 = 「後天的に獲得した形質は子孫に遺伝しない（生殖細胞系列の変化のみが遺伝する）」という古典的原則。
→ これが transgenerational epigenetic inheritance によって「揺さぶられた（unsettled）」。

→ B「生殖細胞系列のDNAの変化のみが子孫に遺伝できるという古典的生物学原則」が正確です。

【引っかけ分析】
・A「CRISPR等の有効性」: 本文は遺伝子編集技術については触れていません。
・C「環境ストレスが常に遺伝的健康に悪影響」: 本文は "transgenerational" な影響を述べていますが、「常に悪影響」とは主張していません。
・D「エピジェネティック変化が一世代に限られる」: これは transgenerational inheritance が否定するものですが、「ヴァイスマン障壁」=「生殖細胞系列 vs 体細胞」という古典的区別の挑戦をより正確に示すのはBです。`,
        syntaxAnalysis: [
          {
            text: "What the field of epigenetics has revealed, however,",
            role: "S",
            translation: "エピジェネティクスという分野が明らかにしたことは（what節が主語。however = 挿入句：逆接を示す）",
          },
          {
            text: "is",
            role: "V",
            translation: "〜である（be動詞：what節主語をとる SVC 構造）",
          },
          {
            text: "that gene expression — the process by which genetic information is transcribed and translated into functional proteins — is subject to a dynamic layer of chemical modification that responds continuously to environmental stimuli",
            role: "C",
            translation: "that節（補語）：遺伝子発現——遺伝情報が機能的なタンパク質へと転写・翻訳されるプロセス——が、環境刺激に継続的に応答する動的な化学的修飾の層に支配されているということ（ダッシュ内は gene expression の同格説明。「be subject to」=「〜の支配下にある・〜を受ける」）",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-4: 私立大 / ナッジ理論と行動経済学 / 約205語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "nudge-theory-autonomy",
    title: "Nudge Theory, Choice Architecture, and the Limits of Libertarian Paternalism",
    level: "PRIVATE_UNI",
    tags: ["論説文", "行動経済学・意思決定", "私立大", "約205語"],
    passage: `Behavioural economics, a discipline that applies insights from cognitive psychology to economic decision-making, has generated a substantial body of evidence demonstrating that human choices are systematically influenced by the structure of the environment in which they are presented — what researchers Richard Thaler and Cass Sunstein termed "choice architecture." Their influential concept of "nudging" holds that policymakers can steer individuals toward decisions considered beneficial without restricting their freedom of choice, simply by altering the default options or framing within which choices are made.

A canonical example is the design of employee pension enrolment. When participation in a retirement savings programme is set as the default — requiring employees to actively opt out rather than opt in — enrolment rates increase dramatically. The decision itself is unchanged; only the cognitive labour required to make it has been redistributed. Proponents argue that this constitutes a pragmatic and liberty-preserving approach to public policy, leveraging what they call "libertarian paternalism."

Critics, however, question whether nudges are genuinely liberty-preserving or whether they constitute a subtle form of manipulation. If the effectiveness of nudges depends precisely on subjects' unawareness of the mechanism, then a nudge that is fully disclosed may cease to function — a paradox that raises fundamental questions about the relationship between behavioural influence and genuine autonomy.`,

    questions: [
      {
        questionText:
          "What is the core principle of 'nudging' as described by Thaler and Sunstein?",
        options: [
          "Governments should legally mandate beneficial behaviours to overcome cognitive biases.",
          "Financial incentives are the most reliable mechanism for changing human behaviour.",
          "Altering the default settings of a choice can guide behaviour without restricting options.",
          "Individuals make rational choices when provided with complete and accurate information.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落第2文が直接の根拠です。

"Their influential concept of 'nudging' holds that policymakers can steer individuals toward decisions considered beneficial without restricting their freedom of choice, simply by altering the default options or framing within which choices are made."

核心:
・「選択の自由を制限することなく（without restricting their freedom of choice）」
・「デフォルト選択肢や枠組みを変えるだけで（simply by altering the default options or framing）」
・「有益と考えられる決定に誘導できる（steer individuals toward decisions considered beneficial）」

→ C「選択のデフォルト設定を変えることで、選択肢を制限せずに行動を誘導できる」が正確です。

【引っかけ分析】
・A「法的義務化」: ナッジは自由意志を維持することが前提であり、法的強制（mandate）は反対概念。
・B「金銭的インセンティブ」: 本文は「デフォルト設定の変更」を機構として説明しており、金銭的インセンティブの話はありません。
・D「完全な情報が合理的選択をもたらす」: これは古典的な経済学の合理的人間モデルであり、行動経済学はこれへの批判から出発しています。

【語彙ポイント】
・"steer"（誘導する・方向付ける）: 舵を切るという意味から転用。
・"framing"（フレーミング）: 同じ情報をどのように提示するかが選択に影響を与えること。`,
      },
      {
        questionText:
          "In the pension enrolment example, what does the passage say actually changes when the default is switched from opt-in to opt-out?",
        options: [
          "The financial benefits and tax implications of joining the pension programme.",
          "The range of investment options available to employees within the programme.",
          "The amount of cognitive effort required to make the enrolment decision.",
          "The legal obligation for employers to provide retirement savings programmes.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と論理的精読】
正解は C。第2段落の分析が根拠です。

本文の核心的主張:
"The decision itself is unchanged; only the cognitive labour required to make it has been redistributed."
（決定そのものは変わっていない。変わったのは、その決定を行うのに必要な認知的労力が再配分されただけだ。）

デフォルトを「オプトイン（参加するには積極的行動が必要）」から「オプトアウト（脱退するには積極的行動が必要）」に切り替えると:
・参加という「決定の内容」は変わらない
・しかし「参加するための認知的努力」が不要になり、「脱退するための努力」が必要になる
→ 認知的労力の分配が変わる = C

【語彙ポイント】
・"opt in"（オプトイン）: 参加するために積極的な行動を起こす方式。
・"opt out"（オプトアウト）: 脱退するために積極的な行動を起こす方式。
・"cognitive labour"（認知的労力）: 決定を下すために必要な精神的努力。

【引っかけ分析】
・A「金銭的メリットや税制優遇」: 本文に記述なし。制度の内容ではなく、選択構造の話です。
・B「投資オプションの範囲」: 本文に記述なし。
・D「雇用主の法的義務」: 本文に記述なし。`,
      },
      {
        questionText:
          "What paradox do critics of nudge theory identify, according to the final paragraph?",
        options: [
          "Nudges are effective only in wealthy societies where citizens already make rational financial decisions.",
          "The transparency required by democratic governance renders nudges politically unacceptable.",
          "Full disclosure of a nudge may undermine its effectiveness, calling into question whether it respects autonomy.",
          "Nudges consistently backfire by generating resentment among individuals who feel they are being manipulated.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と逆説の論理構造】
正解は C。第3段落の逆説の論理を正確に把握する問題です。

批評家の主張の論理構造:
前提①: ナッジの有効性は「対象者がそのメカニズムに気づいていない（unawareness）」ことに依存している。
前提②: もしナッジが完全に開示されれば（fully disclosed）、人々はそのメカニズムを意識する。
結論: 完全に開示されたナッジは機能しなくなる（may cease to function）可能性がある。

【逆説（paradox）の本質】
ナッジが「自律を尊重している（liberty-preserving）」と主張するためには、対象者が選択を意識的に行えることが必要。
しかし、ナッジが機能するためには対象者がそのメカニズムを知らない必要がある。
→ 透明性（自律の条件）↔ 有効性（ナッジの機能条件）が根本的に矛盾する。

→ C「ナッジの開示がその有効性を損なう可能性があり、それが本当に自律を尊重しているのかという疑問を提起する」が正確です。

【語彙ポイント】
・"cease to function"（機能しなくなる）: "cease to do"（〜しなくなる）の重要構文。
・"unawareness"（無自覚・気づいていないこと）: ナッジの前提条件を表す重要語。
・"autonomy"（自律性）: 自己の行動を自ら決定する能力。`,
        syntaxAnalysis: [
          {
            text: "If the effectiveness of nudges depends precisely on subjects' unawareness of the mechanism,",
            role: "M",
            translation: "条件節（もし〜ならば）：ナッジの有効性が正確に対象者のメカニズムへの無自覚に依存しているならば（precisely = まさに、強調副詞）",
          },
          {
            text: "then a nudge that is fully disclosed",
            role: "S",
            translation: "主節の主語：完全に開示されたナッジ（that節は関係代名詞節 / fully disclosed = 完全に明かされた）",
          },
          {
            text: "may cease to function",
            role: "V",
            translation: "機能しなくなるかもしれない（may = 可能性の助動詞 / cease to do = 〜しなくなる）",
          },
          {
            text: "— a paradox that raises fundamental questions about the relationship between behavioural influence and genuine autonomy",
            role: "M",
            translation: "同格修飾（ダッシュ以降）：行動的影響力と真の自律性の関係について根本的な疑問を提起する逆説（a paradox = 前文全体の内容を指す同格名詞句）",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-5: 国公立大 / 道徳的判断の神経基盤 / 約235語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "moral-cognition-neural",
    title: "The Neural Architecture of Moral Judgement: Emotion, Reason, and the Dual-Process Model",
    level: "NATIONAL_UNI",
    tags: ["論説文", "認知神経科学・倫理哲学", "国公立大", "約235語", "無生物主語・省略"],
    passage: `The neural architecture underlying moral cognition has become a subject of intense interdisciplinary inquiry, situated at the intersection of cognitive neuroscience, moral philosophy, and evolutionary biology. Traditional philosophical accounts held that moral judgement was a product of rational deliberation — a faculty uniquely and definitively human. What neuroimaging and lesion studies have revealed, however, is that moral evaluation recruits affective neural systems as much as, and in many cases more than, purely deliberative ones.

Pivotal to this understanding was the work of Joshua Greene, whose neuroimaging studies employed variants of the "trolley problem" to distinguish between two modes of moral processing. Personal moral dilemmas — those requiring direct physical contact to harm another individual — were found to activate the medial prefrontal cortex, the amygdala, and the posterior cingulate cortex: regions associated with emotional processing and social cognition. Impersonal dilemmas, by contrast, engaged dorsolateral prefrontal regions associated with utilitarian cost-benefit computation. Greene interpreted these patterns as evidence of a dual-process model: a fast, emotionally driven system in tension with a slower, reason-based one.

Objections to this framework have been raised on both empirical and philosophical grounds. Critics note that the neural correlates of affective responses do not, in themselves, determine the normative validity of a moral judgement. That disgust or empathy accompanies a judgement does not render it either correct or incorrect. The relationship between the causal mechanisms of moral psychology and the justificatory structure of moral philosophy remains, accordingly, a subject of sustained and productive controversy.`,

    questions: [
      {
        questionText:
          "What did traditional philosophical accounts claim about the nature of moral judgement, and how does the passage contrast this with neuroscientific findings?",
        options: [
          "Traditional accounts claimed morality was culturally relative; neuroscience has confirmed this view.",
          "Traditional accounts held morality was purely rational; neuroscience shows it also heavily involves emotion.",
          "Traditional accounts argued emotion drives moral judgement; neuroscience has found only reason is involved.",
          "Traditional accounts denied the existence of moral universals; neuroscience has disproved this claim.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠と対比構造】
正解は B。第1段落が対比の構造を明確に提示しています。

従来の哲学的見解:
"Traditional philosophical accounts held that moral judgement was a product of rational deliberation — a faculty uniquely and definitively human."
（従来の哲学的説明は、道徳的判断は合理的熟慮の産物であると主張していた。）

神経科学的発見との対比:
"What neuroimaging and lesion studies have revealed, however, is that moral evaluation recruits affective neural systems as much as, and in many cases more than, purely deliberative ones."
（しかし、神経画像研究と病変研究が明らかにしたのは、道徳的評価は純粋に審議的なシステムと同程度に、多くの場合それ以上に、感情的な神経システムを動員するということだ。）

→ B「従来の説明は道徳性は純粋に合理的とした; 神経科学はそれが感情も強く含むことを示した」が正確です。

【what節 + however の逆接構造】
第1段落の構造：
前半：従来の見解（rationalism）を提示
"however" による転換
後半：神経科学が明らかにしたこと（emotion が関与する）

【語彙ポイント】
・"affective"（感情的・情動的）: 感情に関わること。"affect"（情動・感情）の形容詞形。
・"deliberative"（審議的・熟慮的）: 慎重に考えて判断する、理性的な性質。`,
      },
      {
        questionText:
          "According to Greene's research, what type of moral dilemma activates brain regions associated with emotional processing?",
        options: [
          "Dilemmas that involve calculating the maximum number of lives that can be saved.",
          "Dilemmas that require a person to use direct physical contact to harm someone.",
          "Dilemmas involving abstract policy decisions with large-scale social consequences.",
          "Dilemmas in which the correct moral answer is ambiguous or culturally dependent.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落第2文が根拠です。

"Personal moral dilemmas — those requiring direct physical contact to harm another individual — were found to activate the medial prefrontal cortex, the amygdala, and the posterior cingulate cortex: regions associated with emotional processing and social cognition."

ダッシュ内の定義: "those requiring direct physical contact to harm another individual"
→ 直接身体的接触を伴う危害を別の個人に加えることを要求するもの = personal moral dilemmas

これが感情処理と社会的認知に関連する脳領域を活性化する。

→ B「別の人を傷つけるために直接身体的接触を使うことを要求するジレンマ」が正確です。

【impersonal dilemmas との対比】
対比（by contrast）：Impersonal dilemmas（非人格的ジレンマ）= 功利主義的コスト・ベネフィット計算に関わる背外側前頭前皮質を活性化 → 理性的・計算的処理。

【引っかけ分析】
・A「救える命の最大数を計算する」: これは Impersonal dilemmas（非人格的ジレンマ）の特徴であり、功利主義的計算を伴う問題は理性的ネットワークを活性化します。
・C「大規模な社会的結果を伴う抽象的政策決定」: こちらも Impersonal の特徴です。
・D「正解が曖昧または文化依存」: 本文にこのような区分の記述はありません。`,
      },
      {
        questionText:
          "What is the main point of the criticism raised against Greene's dual-process model in the final paragraph?",
        options: [
          "Greene's methodology using the trolley problem is too artificial to yield valid conclusions about real moral behaviour.",
          "The two neural systems identified by Greene cannot be observed independently in actual moral decision-making.",
          "The presence of emotional neural activity during a moral judgement does not determine whether that judgement is morally correct.",
          "Philosophical accounts of morality are inherently superior to neuroscientific explanations because they address normative questions.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠と哲学的批判の把握】
正解は C。第3段落が根拠です。

批評家の主張の核心:
"the neural correlates of affective responses do not, in themselves, determine the normative validity of a moral judgement."
（感情的反応の神経相関は、それ自体では、道徳的判断の規範的妥当性を決定しない。）

さらに明確化:
"That disgust or empathy accompanies a judgement does not render it either correct or incorrect."
（嫌悪感や共感がある判断に伴うことは、その判断を正しくも間違いでもしない。）

→ C「道徳的判断の際の感情的神経活動の存在は、その判断が道徳的に正しいかどうかを決定しない」が正確です。

【この批判の哲学的意義】
グリーンの研究は「何が起きているか（記述的・descriptive）」を示すが、批評家は「何が正しいか（規範的・normative）」は別問題と指摘。
→ is（事実の記述）から ought（道徳的当為）を導くことはできない（ヒュームの is-ought 問題）。

【構文解析】
"That disgust or empathy accompanies a judgement does not render it either correct or incorrect."
S: "That disgust or empathy accompanies a judgement"（that節が主語）
V: does not render（〜にしない）
O: it（= the judgement）
C: either correct or incorrect（正しくも間違いでもない）
→ render O C（OをCの状態にする）構文の否定形。`,
        syntaxAnalysis: [
          {
            text: "What neuroimaging and lesion studies have revealed, however,",
            role: "S",
            translation: "神経画像研究と病変研究が明らかにしたことは（what節が主語 / however = 挿入副詞で逆接を示す）",
          },
          {
            text: "is",
            role: "V",
            translation: "〜である（be動詞：what節 = that節のSVC構造）",
          },
          {
            text: "that moral evaluation recruits affective neural systems as much as, and in many cases more than, purely deliberative ones",
            role: "C",
            translation: "that節（補語）：道徳的評価が、純粋に審議的なシステムと同程度に、多くの場合それ以上に、感情的な神経システムを動員するということ（as much as ... more than: 比較構文の並列。「ones」= 前出の「neural systems」の代名詞）",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-6: 共通テスト / ソーシャルメディアと孤独感 / 約190語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "social-media-loneliness",
    title: "Social Media Use and the Paradox of Connected Isolation",
    level: "COMMON_TEST",
    tags: ["論説文", "テクノロジー・社会心理学", "共通テスト", "約190語"],
    passage: `Social media platforms were originally designed to bring people together, enabling communication across vast geographical distances and helping individuals maintain relationships that might otherwise fade. However, a growing body of research suggests that heavy use of these platforms is associated with increased feelings of loneliness and social disconnection rather than the sense of belonging they promise.

One explanation for this paradox lies in the nature of the interactions that social media facilitates. Unlike face-to-face conversations, which involve shared physical presence, body language, and immediate emotional feedback, online exchanges tend to be more performative and less spontaneous. Users frequently present carefully curated versions of their lives, leading their audience to make upward social comparisons — a psychological process in which people evaluate themselves negatively by comparing their ordinary lives to the highlight reels of others.

Furthermore, the time spent scrolling through feeds may displace more meaningful offline activities. Researchers have found that passive consumption of social media content — simply viewing posts without actively engaging — shows the strongest link to negative wellbeing outcomes. Active participation, such as direct messaging or commenting, appears to carry far fewer of these risks.`,

    questions: [
      {
        questionText:
          "According to the passage, what is the main reason social media use can increase feelings of loneliness?",
        options: [
          "Social media platforms limit the total number of connections a user can maintain at once.",
          "Online interactions tend to be performative and encourage unfavourable self-comparisons.",
          "Social media creates too much geographical distance between users and their real friends.",
          "Heavy users of social media quickly run out of interesting content to view.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落が根拠です。

本文の説明:
"online exchanges tend to be more performative and less spontaneous"
（オンラインのやり取りはより演技的で自発性が低い傾向がある）

"Users frequently present carefully curated versions of their lives, leading their audience to make upward social comparisons — a psychological process in which people evaluate themselves negatively by comparing their ordinary lives to the highlight reels of others."
（ユーザーは自分の生活の注意深く選別されたバージョンを提示することが多く、閲覧者に上方比較を行わせる。これは自分の普通の生活を他者のハイライト映像と比較することで自己評価を下げる心理的プロセスである。）

→ B「オンラインのやり取りは演技的になりがちで、不利な自己比較を促す」が正確です。

【引っかけ分析】
・A「繋がれる人数の制限」: 本文に記述なし。むしろ「広大な地理的距離を越えてコミュニケーションを可能にする」と述べられています。
・C「地理的距離を生み出す」: 逆です。SNSはむしろ地理的距離を縮めるために設計されたと述べられています。
・D「コンテンツが尽きる」: 本文に記述なし。

【語彙ポイント】
・"performative"（演技的な・パフォーマンス的な）: 本来の感情ではなく、見せるために行動する性質。
・"upward social comparison"（上方社会比較）: 自分より優れていると思う他者と自分を比較するプロセス。
・"curated"（厳選された・編集された）: 美術館の学芸員（curator）から転じて、意図的に選んで提示するという意味。`,
      },
      {
        questionText:
          "What does the passage suggest about the difference between passive and active social media use?",
        options: [
          "Both passive and active use are equally harmful to mental wellbeing.",
          "Passive use, such as browsing posts, is more harmful to wellbeing than actively engaging.",
          "Active use is more time-consuming and therefore leads to greater feelings of isolation.",
          "Passive use has no measurable effect on how people feel about themselves.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第3段落が根拠です。

"Researchers have found that passive consumption of social media content — simply viewing posts without actively engaging — shows the strongest link to negative wellbeing outcomes."
（研究者たちは、ソーシャルメディアコンテンツの受動的消費——積極的に関与せずにただ投稿を見るだけ——がネガティブなウェルビーイング結果と最も強く結びついていることを発見した。）

"Active participation, such as direct messaging or commenting, appears to carry far fewer of these risks."
（ダイレクトメッセージやコメントなどの積極的な参加は、これらのリスクをはるかに少なくもたらすようだ。）

→ B「投稿を閲覧するような受動的利用は、積極的に関与するよりもウェルビーイングにより有害である」が正確です。

【引っかけ分析】
・A「どちらも等しく有害」: 本文は明確に passive > active の順でリスクが高いと述べています。
・C「積極的利用が時間を多く消費するため孤立感が大きい」: 本文に記述なし。むしろ積極的利用はリスクが少ないと述べられています。
・D「受動的利用は効果がない」: 「ネガティブな結果との最強の関連（strongest link）」があると述べられており、効果がないのとは逆です。

【構文ポイント】
"shows the strongest link to negative wellbeing outcomes"
→ "link to"（〜との関連・繋がり）: "show a link to ..."（〜との関連を示す）は重要表現。`,
      },
      {
        questionText:
          "What is the 'paradox' referred to in the passage's title?",
        options: [
          "Social media was designed for global communication but limits users to one language.",
          "Platforms built to connect people can make users feel more lonely and disconnected.",
          "More followers on social media leads to lower self-esteem among young users.",
          "Social media companies spend more on advertising than on improving user wellbeing.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第1段落全体が根拠です。

逆説（paradox）の構造:
前提: "Social media platforms were originally designed to bring people together"
（SNSは本来、人々を繋げるために設計された）

逆説的結果: "heavy use of these platforms is associated with increased feelings of loneliness and social disconnection rather than the sense of belonging they promise"
（これらのプラットフォームの多用は、約束された帰属感ではなく、むしろ孤独感と社会的切断感の増大と関連している）

→ 「繋がるために作られたのに、孤独を生む」という逆説
→ B「人々を繋げるために作られたプラットフォームが、ユーザーをより孤独に切断された気持ちにさせる」が正確です。

【タイトル読解: "Connected Isolation"】
"Connected"（繋がっている）+ "Isolation"（孤立）= 矛盾した組み合わせ
→ タイトル自体がすでに逆説を示しています。この逆説を解く鍵が本文全体です。

【語彙ポイント】
・"paradox"（逆説）: 一見矛盾しているが真実を含む主張。
・"sense of belonging"（帰属感）: どこかに属しているという感覚。コミュニティへの所属感。
・"disconnection"（切断・乖離）: 繋がりが断たれていること。`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // P3-7: 共通テスト / 睡眠と記憶の定着 / 約185語
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "sleep-memory-consolidation",
    title: "Sleep and Memory Consolidation: Why Rest Is Part of Learning",
    level: "COMMON_TEST",
    tags: ["論説文", "認知科学・睡眠研究", "共通テスト", "約185語"],
    passage: `Students preparing for exams often sacrifice sleep in order to spend more time studying, operating under the assumption that more hours of wakefulness mean more information absorbed. However, research in cognitive science has consistently demonstrated that sleep plays an indispensable role in the process of memory consolidation — the mechanism by which newly acquired information is stabilised and integrated into long-term memory.

During sleep, particularly during the slow-wave and rapid eye movement (REM) stages, the brain actively replays and reorganises the neural patterns formed during waking hours. This nocturnal processing strengthens the connections between neurons, transforming fragile short-term memories into durable long-term ones. Studies have shown that students who review material and then sleep perform significantly better on subsequent tests than those who study for an equal length of time without sleeping between study and testing.

The practical implication is clear: sleep is not merely a period of rest but an active phase of learning. Treating sleep as dispensable — something to be traded away for extra study hours — is therefore counterproductive. A well-rested brain consolidates, connects, and recalls information far more efficiently than an exhausted one.`,

    questions: [
      {
        questionText:
          "What does the passage say happens to newly learned information during sleep?",
        options: [
          "It is permanently stored in the brain's prefrontal cortex for later retrieval.",
          "It is lost unless the learner reviews it immediately upon waking.",
          "It is replayed and reorganised, strengthening connections that form lasting memories.",
          "It is transferred from the REM stage of sleep directly into conscious awareness.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第2段落が根拠です。

"During sleep, particularly during the slow-wave and rapid eye movement (REM) stages, the brain actively replays and reorganises the neural patterns formed during waking hours."
（睡眠中、特に徐波睡眠とレム睡眠の段階において、脳は覚醒時間中に形成された神経パターンを積極的に再生・再編成する。）

"This nocturnal processing strengthens the connections between neurons, transforming fragile short-term memories into durable long-term ones."
（この夜間の処理がニューロン間の接続を強化し、脆弱な短期記憶を耐久性のある長期記憶へと変換する。）

→ C「記憶は再生・再編成され、永続的な記憶を形成する接続を強化する」が正確です。

【引っかけ分析】
・A「前頭前皮質に永久保存される」: 本文に脳の特定の部位への保存という記述はありません。
・B「目覚めてすぐに復習しなければ失われる」: 本文に記述なし。むしろ睡眠が記憶を定着させると述べられています。
・D「REMから直接意識へ転送される」: 本文に記述なし。

【語彙ポイント】
・"consolidation"（定着・強固化）: 固めて安定させること。記憶の文脈では「記憶の定着」。
・"nocturnal"（夜間の）: "nocturne"（夜想曲）と同語源。nox（夜）のラテン語から。
・"fragile"（脆弱な・もろい）↔ "durable"（耐久性のある・長続きする）: 対比的語彙。`,
      },
      {
        questionText:
          "According to the passage, what is the main problem with sacrificing sleep to study more?",
        options: [
          "It reduces the number of hours available for reviewing material the following day.",
          "It makes the brain unable to form any new neural connections during studying.",
          "It prevents the memory consolidation process that makes learning effective.",
          "It causes students to forget all material studied in the final hours before an exam.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。第1段落と第3段落の組み合わせが根拠です。

第1段落: 睡眠が「記憶の定着（memory consolidation）」に不可欠（indispensable）な役割を果たすと述べられています。

第3段落:
"Treating sleep as dispensable — something to be traded away for extra study hours — is therefore counterproductive."
（睡眠を不可欠でないもの——余分な勉強時間のために犠牲にできるもの——として扱うことは、したがって逆効果である。）

"A well-rested brain consolidates, connects, and recalls information far more efficiently than an exhausted one."
（十分に休んだ脳は、疲弊した脳よりもはるかに効率的に情報を定着させ、結びつけ、想起する。）

→ 睡眠を削ることが逆効果な理由は「記憶の定着プロセスが失われるから」
→ C「学習を効果的にする記憶の定着プロセスが妨げられる」が正確です。

【引っかけ分析】
・A「翌日の復習時間が減る」: 本文に記述なし。問題は「時間の量」ではなく「記憶の定着」です。
・B「新しいニューロン接続を形成できなくなる」: 過剰表現。本文は「定着が妨げられる」と述べており、勉強中に接続が全くできないとは述べていません。
・D「試験前の最後の数時間で学習した内容をすべて忘れる」: 本文に記述なし。

【語彙ポイント】
・"dispensable"（不可欠でない・省略可能な）↔ "indispensable"（不可欠な）: 第1段落の "indispensable" との対比に注意。
・"counterproductive"（逆効果の）: counter-（反対）+ productive（生産的な）。意図した結果と逆の効果をもたらすこと。`,
      },
      {
        questionText:
          "What evidence does the passage provide to support the idea that sleep benefits learning?",
        options: [
          "Brain scans show that students who sleep more have physically larger hippocampi.",
          "Students who sleep between studying and testing score better than those who do not.",
          "Athletes who sleep eight or more hours perform better in competitions than those who sleep less.",
          "Surveys indicate that top university students report sleeping longer than average students.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。第2段落末文が直接の根拠です。

"Studies have shown that students who review material and then sleep perform significantly better on subsequent tests than those who study for an equal length of time without sleeping between study and testing."

（研究により、教材を復習して睡眠をとった学生は、学習とテストの間に睡眠をとらずに同じ時間学習した学生よりも、その後のテストで有意に成績が良いことが示されている。）

→ B「勉強とテストの間に睡眠をとった学生は、そうでない学生より高得点を取る」が正確です。

【引っかけ分析】
・A「海馬が物理的に大きい」: 本文に記述なし。神経画像の脳スキャンやサイズについての言及はありません。
・C「アスリートのパフォーマンス」: 本文は学習・記憶を扱っており、運動競技のパフォーマンスは論点外です。
・D「優秀な学生の睡眠時間のアンケート」: 本文に記述なし。

【重要表現】
"perform significantly better ... than those who ..."
→ 比較構文: "perform better than ..." で「〜より成績が良い」
→ "significantly"（有意に）: 統計的に意味のある差であることを示す副詞（単なる「大幅に」より厳密な意味を持つ）。`,
      },
    ],
  },
];
