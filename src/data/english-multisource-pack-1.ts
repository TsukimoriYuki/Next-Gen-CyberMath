import type { MultiSourceProblem } from "@/lib/english-types";

export const MULTI_SOURCE_PACK_1: MultiSourceProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 問題 MS-P1-1: 私立大学レベル / 海外インターンシップ選考
  // Source A: プログラム一覧（TABLE）
  // Source B: 応募資格・条件（BULLETS）
  // Source C: 志望者プロフィールメール（TEXT）
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "global-internship-program",
    title: "Global Internship Program Selection",
    level: "PRIVATE_UNI",
    tags: ["情報照合", "海外インターンシップ", "私立大", "共通テスト型"],
    sources: [
      {
        id: "src-intern-a",
        type: "TABLE",
        title: "Source A — Available Internship Programs",
        content: [
          ["Program", "Location", "Duration", "Language Requirement", "Monthly Stipend"],
          ["Digital Marketing Intern",   "Sydney, Australia",   "4 weeks",  "English (TOEFL 80+)",     "¥70,000"],
          ["NGO Field Work",             "Nairobi, Kenya",      "10 weeks", "English (TOEFL 80+)",     "¥25,000"],
          ["Finance Research Intern",    "Singapore",           "8 weeks",  "English (TOEFL 80+)",     "¥65,000"],
          ["Film Production Intern",     "Paris, France",       "6 weeks",  "French (DELF B2+)",       "¥40,000"],
          ["Software Engineering Intern","Berlin, Germany",     "8 weeks",  "English or German",       "¥55,000"],
          ["Policy Analyst Intern",      "Ottawa, Canada",      "6 weeks",  "English (TOEFL 80+)",     "None"],
        ],
      },
      {
        id: "src-intern-b",
        type: "BULLETS",
        title: "Source B — Application Rules and Eligibility",
        content: [
          "English-language programs require a TOEFL iBT score of 80 or higher.",
          "French-language programs require a DELF B2 certificate or equivalent.",
          "Programs listed as 'English or German' accept applicants without German proficiency.",
          "Program duration must fall entirely within the applicant's stated availability period.",
          "Programs with no stipend ('None') require written pre-approval from the applicant's academic supervisor.",
          "Applicants must have earned a minimum of 60 credit hours at the time of application.",
        ],
      },
      {
        id: "src-intern-c",
        type: "TEXT",
        title: "Source C — Applicant Profile (Email from Kenji Mori)",
        content: `Dear Internship Office,

I am writing to enquire about the Global Internship Program for this coming summer. My name is Kenji Mori, and I am a third-year Business Administration student at Seiwa University. I have completed 72 credit hours to date.

My TOEFL iBT score is 87. I do not hold any French-language certification. I am available from July 1 to August 31, which gives me a maximum availability window of approximately eight weeks.

Regarding finances, I require a monthly stipend to cover living expenses abroad. My academic supervisor has not provided approval for unpaid placements at this time. I have no strong geographical preference, though I would prefer an English-speaking working environment.

I look forward to your guidance on which programs I am eligible to apply for.

Best regards,
Kenji Mori`,
      },
    ],
    questions: [
      {
        questionText:
          "Based on Sources B and C, which program is immediately eliminated due to Kenji's language certifications?",
        options: [
          "NGO Field Work in Nairobi — because Kenji's TOEFL score of 87 does not meet the English requirement.",
          "Film Production Intern in Paris — because Kenji does not hold a DELF B2 French certificate.",
          "Software Engineering Intern in Berlin — because the program requires German proficiency.",
          "Finance Research Intern in Singapore — because the program requires a TOEFL score above 90.",
        ],
        correctAnswerIndex: 1,
        explanation: `【正解の根拠】
正解は B。Source B と Source C を照合します。

Source B: "French-language programs require a DELF B2 certificate or equivalent."
Source A: Film Production Intern in Paris は "French (DELF B2+)" が要件
Source C: Kenji は "I do not hold any French-language certification"

→ ケンジはフランス語資格を持たないため、パリの映画制作インターンは即座に除外される。

【引っかけ分析】
・A「NGO（英語・TOEFL 80+）」: ケンジの TOEFL は 87 ≥ 80 ✓ → 言語要件は満たす（後で期間の問題で除外される）
・C「Berlin（英語またはドイツ語）」: Source B に "Programs listed as 'English or German' accept applicants without German proficiency" とあるため、英語のみで参加可能 → 除外されない
・D「TOEFL 90+ 要件」: Source B には "TOEFL iBT 80 or higher" とあり、90 という基準は存在しない

【照合プロセス】
Source A（フランス語要件） × Source B（DELF B2 必要） × Source C（資格なし）= 除外確定`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
      {
        questionText:
          "After applying Kenji's availability period (maximum 8 weeks, July–August), which program is eliminated on duration grounds?",
        options: [
          "Digital Marketing Intern in Sydney (4 weeks).",
          "Film Production Intern in Paris (6 weeks, already eliminated for language reasons).",
          "NGO Field Work in Nairobi (10 weeks).",
          "Software Engineering Intern in Berlin (8 weeks).",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。Source A と Source B をケンジの利用可能期間（Source C）と照合します。

Source B: "Program duration must fall entirely within the applicant's stated availability period."
Source C: "a maximum availability window of approximately eight weeks"（最大8週間）
Source A: NGO Field Work in Nairobi → "10 weeks"（10週間）

10週間 > 8週間（最大利用可能期間）→ 除外

【他の選択肢の確認】
・Sydney: 4週間 ≤ 8週間 ✓
・Paris: すでに言語要件で除外済み（本設問では選択肢として示されているが、この問いの焦点は「期間」による除外）
・Singapore: 8週間 ≤ 8週間 ✓（ちょうど8週間なので可能）
・Berlin: 8週間 ≤ 8週間 ✓
・Ottawa: 6週間 ≤ 8週間 ✓

→ 期間で除外されるのは Nairobi（10週間）のみ。

【照合プロセス】
Source A（各プログラムの期間） × Source B（期間条件） × Source C（ケンジの8週間上限）= Nairobi 除外`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
      {
        questionText:
          "Among the remaining eligible programs, which should Kenji apply for if he requires a stipend and wants the shortest possible placement duration?",
        options: [
          "Policy Analyst Intern in Ottawa (6 weeks, no stipend).",
          "Finance Research Intern in Singapore (8 weeks, ¥65,000/month).",
          "Digital Marketing Intern in Sydney (4 weeks, ¥70,000/month).",
          "Software Engineering Intern in Berlin (8 weeks, ¥55,000/month).",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：段階的絞り込みの総合】
正解は C。3つの資料をすべて照合して最終的な絞り込みを行います。

【これまでの除外】
✗ Film Production / Paris（言語資格なし）
✗ NGO Field Work / Nairobi（10週間 > 8週間）

【残存プログラム（期間・言語を満たす）】
① Digital Marketing / Sydney: 4週間, ¥70,000/月
② Finance Research / Singapore: 8週間, ¥65,000/月
③ Software Engineering / Berlin: 8週間, ¥55,000/月
④ Policy Analyst / Ottawa: 6週間, 支給なし

【追加条件：支援金が必要、指導教員の事前承認なし】
Source B: "Programs with no stipend ('None') require written pre-approval from the applicant's academic supervisor."
Source C: "My academic supervisor has not provided approval for unpaid placements at this time."

→ Policy Analyst / Ottawa（支援金なし）は指導教員承認なしには応募不可 → ④ 除外

【最終候補（①②③）から最短期間を選ぶ】
① Sydney: 4週間 ← 最短
② Singapore: 8週間
③ Berlin: 8週間

→ 条件を満たし最短のプログラムは C「シドニーのデジタルマーケティングインターン（4週間・¥70,000）」

【照合プロセス】
Source A（各プログラムの期間・支援金） × Source B（支援金なし → 承認必要） × Source C（承認未取得・最短希望）`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 問題 MS-P1-2: 国公立大学レベル / テクノロジー倫理シンポジウム登録
  // Source A: セッション一覧（TABLE）
  // Source B: 登録規則（BULLETS）
  // Source C: 参加希望者メール（TEXT）
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "tech-ethics-symposium",
    title: "Technology Ethics Symposium — Session Registration",
    level: "NATIONAL_UNI",
    tags: ["情報照合", "テクノロジー倫理", "国公立大", "共通テスト型"],
    sources: [
      {
        id: "src-symp-a",
        type: "TABLE",
        title: "Source A — Available Sessions",
        content: [
          ["Session",              "Date",     "Duration", "Fee", "Language",         "ECTS Credits"],
          ["AI Ethics Workshop",  "March 15", "3 hours",  "€80", "English",           "1.0"],
          ["Data Privacy Forum",  "March 15", "2 hours",  "€60", "English / German",  "0.5"],
          ["Robot Law Seminar",   "March 16", "4 hours",  "€100","English",           "1.5"],
          ["Bioethics Roundtable","March 16", "3 hours",  "€90", "German",            "1.0"],
          ["Philosophy of AI",   "March 17", "2 hours",  "€50", "English",           "0.5"],
        ],
      },
      {
        id: "src-symp-b",
        type: "BULLETS",
        title: "Source B — Registration Rules",
        content: [
          "Each participant may register for a maximum of two sessions in total.",
          "Sessions scheduled on the same date cannot be combined (concurrent attendance not possible).",
          "German-language sessions require proof of German proficiency at B2 level or above.",
          "ECTS credits are awarded only to participants who are currently enrolled at a recognised university.",
          "Early-bird discount: 20% off all session fees for registrations completed before March 1.",
          "The combined total of all registration fees must not exceed €160.",
        ],
      },
      {
        id: "src-symp-c",
        type: "TEXT",
        title: "Source C — Applicant Email (Maria Schmidt)",
        content: `Dear Symposium Committee,

I am writing to register for the Technology Ethics Symposium. My name is Maria Schmidt, and I am currently enrolled as a PhD student in the Faculty of Computer Science at the University of Vienna.

I will be available to attend sessions on March 15 and 16 only, as I have a prior commitment requiring me to travel on the morning of March 17. My German proficiency is at B1 level; I have not yet obtained a B2 certificate.

My registration budget is €160 in total. I completed my online registration on March 5, so I am unfortunately not eligible for the early-bird discount. I am particularly interested in AI law and ethics, and I would like to earn as many ECTS credits as possible within my constraints.

Thank you for your assistance.

Best regards,
Maria Schmidt
University of Vienna`,
      },
    ],
    questions: [
      {
        questionText:
          "Based on Sources B and C, which session is Maria immediately unable to attend due to a language requirement she cannot meet?",
        options: [
          "AI Ethics Workshop — conducted in English, which Maria does not speak.",
          "Data Privacy Forum — conducted in English/German, requiring B2 German.",
          "Bioethics Roundtable — conducted in German only, requiring B2 proficiency that Maria lacks.",
          "Robot Law Seminar — conducted in English, which requires a language test Maria has not taken.",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠】
正解は C。Source A・B・C の3資料を照合します。

Source A: Bioethics Roundtable → 使用言語: "German"（ドイツ語のみ）
Source B: "German-language sessions require proof of German proficiency at B2 level or above."
Source C: Maria のドイツ語力 → "B1 level; I have not yet obtained a B2 certificate."

→ B2 証明書なし × ドイツ語のみのセッション = Bioethics Roundtable は参加不可

【引っかけ分析】
・B「Data Privacy Forum（英語/ドイツ語）」: Source B には「ドイツ語セッションに B2 が必要」とあるが、このセッションは「英語/ドイツ語」併記。英語での参加が可能なため B2 証明書は必須ではない。
・A・D: AI Ethics Workshop と Robot Law Seminar は英語のみのセッションで、Maria は英語話者なので問題なし。

【照合プロセス】
Source A（言語欄:German） × Source B（German = B2 必要） × Source C（B1のみ、B2証明書なし）= 除外確定`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
      {
        questionText:
          "After applying Maria's availability dates and language constraints, which three sessions form the complete set she is individually eligible to attend?",
        options: [
          "AI Ethics Workshop, Data Privacy Forum, and Robot Law Seminar.",
          "AI Ethics Workshop, Data Privacy Forum, and Philosophy of AI.",
          "Robot Law Seminar, Bioethics Roundtable, and Philosophy of AI.",
          "Data Privacy Forum, Robot Law Seminar, and Bioethics Roundtable.",
        ],
        correctAnswerIndex: 0,
        explanation: `【正解の根拠：多条件の段階的適用】
正解は A。Source A・B・C の条件をすべて適用して絞り込みます。

【STEP 1: 言語制約の適用（前設問より）】
✗ Bioethics Roundtable（ドイツ語専用、B2 証明書必要）→ 除外

【STEP 2: 参加可能日の適用】
Source C: "available on March 15 and 16 only ... travel on the morning of March 17"
→ 3月17日のセッションには参加不可

Source A の日程照合:
・March 15: AI Ethics Workshop ✓ / Data Privacy Forum ✓
・March 16: Robot Law Seminar ✓ / Bioethics Roundtable ✗（言語で除外済み）
・March 17: Philosophy of AI → 参加不可 ✗

【残存セッション（個別参加資格あり）】
✓ AI Ethics Workshop（3月15日・英語）
✓ Data Privacy Forum（3月15日・英語/ドイツ語）
✓ Robot Law Seminar（3月16日・英語）

→ A「AI Ethics Workshop、Data Privacy Forum、Robot Law Seminar」が正解

【注意】この問いは「個別に参加資格があるセッションの集合」を問うており、「同日セッションを同時に組み合わせる可否」は次の設問で問われる。`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
      {
        questionText:
          "Given Maria's budget limit, the no-same-day-combination rule, and her goal to maximise ECTS credits, which combination of sessions should she register for?",
        options: [
          "AI Ethics Workshop only (€80, 1.0 ECTS).",
          "AI Ethics Workshop + Robot Law Seminar (€180 total, 2.5 ECTS).",
          "Data Privacy Forum + Robot Law Seminar (€160 total, 2.0 ECTS).",
          "Data Privacy Forum only (€60, 0.5 ECTS).",
        ],
        correctAnswerIndex: 2,
        explanation: `【正解の根拠：多制約最適化問題】
正解は C。Source A・B・C の条件すべてを同時に満たす組み合わせを求めます。

【適用ルール（Source B）】
① 登録は最大2セッション
② 同日セッションは組み合わせ不可
③ 合計費用 €160 以内

【参加資格のある3セッションの費用と ECTS（Source A）】
・AI Ethics Workshop（3月15日）: €80, 1.0 ECTS
・Data Privacy Forum（3月15日）: €60, 0.5 ECTS
・Robot Law Seminar（3月16日）: €100, 1.5 ECTS

【組み合わせ検討】
組み合わせ1: AI Ethics + Data Privacy（同日: 3月15日 × 3月15日）
→ Source B ルール② 「同日セッションは組み合わせ不可」 ✗

組み合わせ2: AI Ethics（3月15日）+ Robot Law（3月16日）
→ 日程 ✓ / 費用: €80 + €100 = €180 > €160 ✗ 予算超過

組み合わせ3: Data Privacy（3月15日）+ Robot Law（3月16日）
→ 日程 ✓ / 費用: €60 + €100 = €160 ≤ €160 ✓ / ECTS: 0.5 + 1.5 = 2.0

→ 唯一すべての制約を満たし、かつ ECTS が最大（2.0）となるのは C。

【完全照合プロセス】
Source A（費用・ECTS・日程） × Source B（同日禁止・上限€160） × Source C（予算€160・ECTS最大化希望）`,
        crossReferences: ["Source A", "Source B", "Source C"],
      },
    ],
  },
];
