import type { MultiSourceProblem } from "@/lib/english-types";

export const MULTI_SOURCE_PROBLEMS: MultiSourceProblem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 問題 1: 共通テストレベル / 海外大学サマープログラム / 3資料・3問
  // Source A: コース一覧表 / Source B: 割引・注意事項 / Source C: 学生メール
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "summer-program-overseas",
    title: "Overseas University Summer Program",
    level: "COMMON_TEST",
    tags: ["共通テスト", "情報照合", "表・リスト・本文", "計算問題", "約300語"],
    sources: [
      {
        id: "source-a",
        type: "TABLE",
        title: "Source A: Summer Program Course List",
        content: [
          ["Course Name", "Duration", "Fee (USD)", "Min. Age", "Language Req."],
          ["Academic Writing Workshop", "3 weeks", "$2,100", "15", "TOEFL 80+"],
          ["Global Debate Camp", "2 weeks", "$1,800", "16", "TOEFL 75+"],
          ["Science Exploration Lab", "4 weeks", "$3,200", "14", "None"],
          ["Cultural Exchange Program", "2 weeks", "$1,500", "14", "None"],
          ["Business & Leadership Forum", "2 weeks", "$1,950", "17", "None"],
        ],
      },
      {
        id: "source-b",
        type: "BULLETS",
        title: "Source B: Discount Policy & Important Notes",
        content: [
          "Group Discount: 5% off per person when two or more students from the same school apply simultaneously",
          "Early Bird Discount: 8% off the course fee for applications completed by May 1",
          "A non-refundable registration fee of $120 applies to every applicant (not included in course fees)",
          "Students aged 14 or 15 must submit a signed parental consent form before the program starts",
          "Courses of 3 weeks or longer require applicants to provide valid proof of travel insurance",
          "Once enrolled, cancellations within 30 days of the program start date are not eligible for a refund",
        ],
      },
      {
        id: "source-c",
        type: "TEXT",
        title: "Source C: Email from a Prospective Student",
        content: `Dear Admissions Team,

My name is Keita Hashimoto, and I am a 16-year-old high school student from Japan. I am writing to inquire about suitable programs for this coming summer.

There are a few points I would like you to know. First, I have a family event scheduled 16 days after my arrival, so I need a program that ends within two weeks. My total budget for the entire trip is $1,800, and this must cover all program-related fees. My most recent TOEFL score was 73, which I took last November.

I should also mention that my classmate Sora Fujita, who attends the same school as me, is planning to apply at the same time. We hope this might help us qualify for any available discount.

I look forward to your response.

Best regards,
Keita Hashimoto`,
      },
    ],
    questions: [
      // ── Q1: 期間条件の照合（Source A × Source C） ──────────────────────
      {
        questionText:
          "According to Sources A and C, which of the following correctly lists ALL courses that satisfy Keita's duration requirement?",
        options: [
          "Global Debate Camp and Cultural Exchange Program only",
          "Global Debate Camp, Cultural Exchange Program, and Business & Leadership Forum",
          "Academic Writing Workshop and Business & Leadership Forum",
          "All five courses listed in Source A",
        ],
        correctAnswerIndex: 1,
        crossReferences: ["Source A", "Source C"],
        explanation: `【正解の根拠：Source A × Source C の照合】
正解は B。

Source C でKeita は「a family event scheduled 16 days after my arrival, so I need a program that ends within two weeks」と述べています。

Source A で「2 weeks（2週間）」のコースを確認すると：
・Global Debate Camp：2 weeks ✓
・Cultural Exchange Program：2 weeks ✓
・Business & Leadership Forum：2 weeks ✓

→ 3コースすべてが期間条件を満たします。選択肢 B が正解です。

【引っかけ分析】
・A（2コースのみ）: Business & Leadership Forum（2 weeks）を見落としています。表全体を縦に丁寧に確認することが必要です。
・C: Academic Writing Workshop は「3 weeks」→ 2週間以内の条件を満たしません。
・D: Science Exploration Lab は「4 weeks」→ 条件外です。

【共通テスト解法のポイント】
「16 days after my arrival」を「2週間以内」と解釈する英語読解力が問われます。16日 ＞ 14日（2週間）のため、「2週間で終わるプログラム」が必要条件です。表（Source A）を上から下へ漏れなくスキャンする情報処理力も重要です。`,
      },

      // ── Q2: 全条件照合による消去法（Source A × Source C） ────────────
      {
        questionText:
          "Considering all eligibility conditions stated in Source A and Source C, which is the ONLY course Keita can enroll in?",
        options: [
          "Global Debate Camp",
          "Business & Leadership Forum",
          "Cultural Exchange Program",
          "Academic Writing Workshop",
        ],
        correctAnswerIndex: 2,
        crossReferences: ["Source A", "Source C"],
        explanation: `【正解の根拠：Source A × Source C の多条件照合（消去法）】
正解は C。

Q1 で期間条件を満たすと確認した 3 コースに対し、残りの条件（年齢・言語要件）を1つずつ照合します。

① Business & Leadership Forum の確認
  Source A：最低年齢（Min. Age）= 17 歳
  Source C："I am a 16-year-old high school student"
  → 16 歳 < 17 歳 → 年齢条件を満たさない。除外。

② Global Debate Camp の確認
  Source A：言語条件（Language Req.）= TOEFL 75+
  Source C："My most recent TOEFL score was 73"
  → 73 < 75 → 言語条件を満たさない。除外。

③ Cultural Exchange Program の確認
  Source A：最低年齢 = 14 歳（Keita 16 歳 ✓）、言語条件 = None ✓
  → すべての条件を満たす。

よって Keita が受講できる唯一のコースは Cultural Exchange Program です。

【共通テスト頻出パターン：2段階照合の消去法】
Q1（期間）→ Q2（年齢・言語）という段階的絞り込みは第4・5問の典型構造です。各選択肢を消去する根拠を「Source A の何列目」「Source C の何文目」と特定する習慣が高得点への近道です。`,
      },

      // ── Q3: 3資料クロス計算（Source A × Source B × Source C） ────────
      {
        questionText:
          "If Keita enrolls in the eligible course together with Sora, what is the total amount Keita will need to pay?",
        options: [
          "$1,425",
          "$1,545",
          "$1,620",
          "$1,800",
        ],
        correctAnswerIndex: 1,
        crossReferences: ["Source A", "Source B", "Source C"],
        explanation: `【正解の根拠：Source A × Source B × Source C の3資料計算照合】
正解は B（$1,545）。

3つの資料から必要な情報を集め、段階的に計算します。

ステップ① コース料金の確認（Source A）
  Cultural Exchange Program：$1,500

ステップ② 割引の適用確認（Source B × Source C）
  Source B：「Group Discount: 5% off per person when two or more students from the same school apply simultaneously」
  Source C：「my classmate Sora Fujita, who attends the same school as me, is planning to apply at the same time」
  → Keita と Sora は同校の2名が同時申し込み → グループ割引（5%）が適用される
  割引後コース料金：$1,500 × 0.95 = $1,425

ステップ③ 登録料の加算（Source B）
  Source B：「A non-refundable registration fee of $120 applies to every applicant (not included in course fees)」
  → コース料金とは別途 $120
  合計：$1,425 + $120 = $1,545

ステップ④ 予算確認（Source C）
  Source C："My total budget for the entire trip is $1,800"
  $1,545 ≤ $1,800 → 予算内 ✓

【引っかけ分析】
・A（$1,425）：登録料 $120 を加算し忘れた誤答。Source B の "not included in course fees" が重要。
・C（$1,620）：グループ割引を適用せず、コース料金にそのまま登録料を加算した誤答。$1,500 + $120 = $1,620。Source C の「同校の同時申し込み」条件を Source B と照合できていない。
・D（$1,800）：Keita の予算額そのもの。一切の計算をしていない誤答。

【重要：Early Bird Discount は適用不可】
Source B には 8% の Early Bird Discount（5月1日までの申込）もありますが、Source C のメールには申込日の記述がなく、適用条件を満たすか不明です。共通テストでは「資料に明示された条件のみを根拠にする」のが鉄則です。`,
      },
    ],
  },
];
