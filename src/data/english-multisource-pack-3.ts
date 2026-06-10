import type { MultiSourceProblem } from "@/lib/english-types";

export const MULTI_SOURCE_PACK_3: MultiSourceProblem[] = [

  // ────────────────────────────────────────────────────────────────────────
  // T-1: 教科書レベル / 図書館利用案内 / 3資料・3問
  // Source A: 利用時間表 / Source B: 貸出ルール / Source C: 生徒からの質問メール
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "school-library-rules",
    title: "School Library Guide",
    level: "TEXTBOOK",
    tags: ["教科書", "情報照合", "表・リスト・本文", "基本条件照合", "約200語"],
    sources: [
      {
        id: "source-a",
        type: "TABLE",
        title: "Source A: Library Opening Hours",
        content: [
          ["Day", "Open", "Close", "Self-Study Room"],
          ["Monday", "8:00 AM", "7:00 PM", "Available"],
          ["Tuesday", "8:00 AM", "7:00 PM", "Available"],
          ["Wednesday", "8:00 AM", "5:00 PM", "Closed"],
          ["Thursday", "8:00 AM", "7:00 PM", "Available"],
          ["Friday", "8:00 AM", "7:00 PM", "Available"],
          ["Saturday", "10:00 AM", "4:00 PM", "Closed"],
          ["Sunday", "Closed", "—", "—"],
        ],
      },
      {
        id: "source-b",
        type: "BULLETS",
        title: "Source B: Borrowing Rules",
        content: [
          "Students may borrow up to 3 books at one time",
          "The loan period is 14 days; renewals are allowed once for an additional 7 days",
          "Reference books (marked with a red sticker) cannot be taken out of the library",
          "DVDs and magazines may only be borrowed on the day they are returned by another student",
          "Lost or damaged books must be replaced or paid for by the borrowing student",
          "Students must present their library card when borrowing or returning items",
        ],
      },
      {
        id: "source-c",
        type: "TEXT",
        title: "Source C: Email from a Student",
        content: `Hi,

My name is Yuki and I'm in Year 10. I have a few questions about using the library.

First, I want to study in the self-study room this Wednesday evening. Is the room open after 5:00 PM on Wednesdays?

Second, I borrowed a reference book last week because I thought it looked useful. But I just read the rules and realised I wasn't supposed to take it home. Do I need to do anything special to return it?

Third, I currently have two books borrowed. Can I borrow one more book today?

Thank you for your help.

Yuki`,
      },
    ],
    questions: [
      {
        questionText:
          "According to Sources A and C, which of Yuki's plans is NOT possible?",
        options: [
          "Studying in the self-study room on Wednesday evening",
          "Returning a reference book she borrowed",
          "Borrowing one more book today",
          "Visiting the library on Saturday",
        ],
        correctAnswerIndex: 0,
        crossReferences: ["Source A", "Source C"],
        explanation: `【正解の根拠：Source A × Source C の照合】
正解は A。

Source C で Yuki は「this Wednesday evening」に自習室を使いたいと述べています。
Source A で水曜日の自習室（Self-Study Room）を確認すると：「Closed（閉室）」。
さらに水曜日の閉館時間は「5:00 PM」であり、夕方以降は図書館自体も閉まります。

→ 水曜の夕方に自習室を使う計画は不可能。A が正解。

【各選択肢の検証】
B「参考書を返す」: 返却は借り出した本を戻す行為。Source B に返却を禁止する規則はありません。
C「もう1冊借りる」: Source B では「最大3冊まで」。Yuki は現在2冊借りており、あと1冊借りられます。
D「土曜に来館」: Source A によると土曜は10:00 AM〜4:00 PM で開館しています。

【共通テスト解法】
否定形の選択肢（「NOT possible」）では、条件を満たさないものを消去法で探します。表を縦・横に丁寧に読む習慣が重要です。`,
      },
      {
        questionText:
          "According to Source B, how should Yuki handle the reference book she mistakenly took home?",
        options: [
          "She should simply return it without any special procedure.",
          "She must pay a fine before she can return the book.",
          "She needs to renew it first before returning it.",
          "She must replace the book because reference books cannot be returned.",
        ],
        correctAnswerIndex: 0,
        crossReferences: ["Source B"],
        explanation: `【正解の根拠：Source B の読み取り】
正解は A。

Source B の参考書（reference books）に関するルールは：
「Reference books (marked with a red sticker) cannot be taken out of the library」
（参考書は図書館外に持ち出せない）

これは「持ち出し禁止」のルールであり、「返却禁止」ではありません。
Source B には返却時の特別手続きや罰金については何も記載されていません。

→ 単純に返却するだけでよい。A が正解。

【引っかけ分析】
B「罰金が必要」: Source B には罰金（fine）の記述はなし。「Lost or damaged books must be replaced or paid for」とあるが、これは紛失・破損の場合のみ。
C「更新が必要」: renewalは返却期限の延長であり、参考書の返却とは無関係。
D「返却できない」: 「持ち出せない」は「返却できない」ではありません。

【語彙ポイント】
・"reference book"（参考書・辞書類）: 辞書・百科事典など、主に図書館内で参照する本。
・"loan period"（貸出期間）: 本を借りられる期間。`,
      },
      {
        questionText:
          "Yuki wants to borrow a DVD next week. According to Source B, which condition must be true for her to borrow it?",
        options: [
          "Another student must return that DVD on the same day Yuki wants to borrow it.",
          "Yuki must have returned all her current books before borrowing a DVD.",
          "The DVD must not have a red sticker on it.",
          "Yuki must visit the library before noon to reserve the DVD.",
        ],
        correctAnswerIndex: 0,
        crossReferences: ["Source B"],
        explanation: `【正解の根拠：Source B の条件付き規則】
正解は A。

Source B のDVDに関するルール：
「DVDs and magazines may only be borrowed on the day they are returned by another student」
（DVDと雑誌は、他の生徒が返却した当日のみ借りられる）

→ 別の生徒がYukiが借りたい日に返却している必要があります。A が正解。

【条件付き規則の読み取り方】
"may only be borrowed on the day they are returned" = 返却された日にしか借りられない
→ 「誰かがその日に返却する」という条件が必要

【引っかけ分析】
B「現在の本を返してから」: このような条件はSource Bに記載なし。DVDの貸出条件は「返却日のみ」です。
C「赤シールがない」: 赤シールは参考書の識別であり、DVDには言及なし。
D「正午前に予約」: 予約に関する記述はSource Bにありません。

【語彙ポイント】
・"may only"（〜の場合のみ可能）: 強い制限を示す表現。
・"on the day they are returned"（返却された日に）: "they" = DVDs and magazines`,
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // T-2: 教科書レベル / 学校文化祭のお知らせ / 3資料・3問
  // Source A: イベント一覧表 / Source B: 参加ルール / Source C: 保護者へのメール
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "school-festival-guide",
    title: "School Festival Information",
    level: "TEXTBOOK",
    tags: ["教科書", "情報照合", "表・リスト・本文", "基本日程照合", "約210語"],
    sources: [
      {
        id: "source-a",
        type: "TABLE",
        title: "Source A: Festival Event Schedule (Saturday, 15 June)",
        content: [
          ["Time", "Event", "Location", "Open to Public"],
          ["9:00 AM", "Opening Ceremony", "Main Hall", "Yes"],
          ["10:00 AM", "Music Club Concert", "Gym", "Yes"],
          ["11:00 AM", "Science Exhibition", "Lab Building", "Yes"],
          ["12:00 PM", "Lunch Break", "Cafeteria", "Yes"],
          ["1:00 PM", "Drama Club Performance", "Main Hall", "Yes"],
          ["2:30 PM", "Dance Show", "Gym", "Yes"],
          ["4:00 PM", "Closing Ceremony", "Main Hall", "No — Students Only"],
        ],
      },
      {
        id: "source-b",
        type: "BULLETS",
        title: "Source B: Visitor Rules",
        content: [
          "All visitors must register at the school gate before entering",
          "Children under 10 must be accompanied by an adult at all times",
          "Photography is allowed in outdoor areas only; no cameras inside buildings",
          "Food and drinks from outside the school are not permitted on the premises",
          "Visitors must leave the school by 5:00 PM",
          "Parking is available in the sports field car park (free of charge)",
        ],
      },
      {
        id: "source-c",
        type: "TEXT",
        title: "Source C: Email from a Parent",
        content: `Dear School,

Thank you for the festival information. I have a few questions before we visit.

My daughter Emma is in Year 9 and will be performing in the Dance Show. My son Tom is 8 years old and very excited to come. My husband and I plan to bring Tom to watch Emma's performance and then take some photos of her after the show.

We also want to watch the Closing Ceremony to support all the students. Is that possible?

Finally, we are planning to bring homemade sandwiches for lunch since the cafeteria might be busy. Is that allowed?

We look forward to the event.

Best regards,
Mrs. Tanaka`,
      },
    ],
    questions: [
      {
        questionText:
          "According to Sources A and C, which event can the Tanaka family NOT attend as visitors?",
        options: [
          "The Closing Ceremony",
          "The Dance Show",
          "The Music Club Concert",
          "The Science Exhibition",
        ],
        correctAnswerIndex: 0,
        crossReferences: ["Source A", "Source C"],
        explanation: `【正解の根拠：Source A × Source C の照合】
正解は A。

Source A で各イベントの「Open to Public（一般公開）」欄を確認します：
・Closing Ceremony（閉会式）: "No — Students Only"（生徒のみ）

Source C で Mrs. Tanaka は「We also want to watch the Closing Ceremony」と述べています。
しかし Source A によると閉会式は生徒のみのため、保護者・訪問者は参加できません。

→ Tanaka 家が訪問者として参加できないのは Closing Ceremony。A が正解。

【引っかけ分析】
B「ダンスショー」: "Open to Public: Yes" → 参加可能
C「音楽クラブコンサート」: "Open to Public: Yes" → 参加可能
D「科学展示」: "Open to Public: Yes" → 参加可能

【解法ポイント】
"Open to Public" 列の "No" を見つけるだけの基本的な表の読み取り問題です。表全体を素早くスキャンする習慣が重要です。`,
      },
      {
        questionText:
          "According to Sources B and C, which of the Tanaka family's plans follows ALL the visitor rules?",
        options: [
          "Having Tom stay with his parents throughout the visit",
          "Taking photos of Emma inside the gym after the Dance Show",
          "Bringing homemade sandwiches for lunch",
          "Arriving at the school without registering at the gate",
        ],
        correctAnswerIndex: 0,
        crossReferences: ["Source B", "Source C"],
        explanation: `【正解の根拠：Source B × Source C の照合（消去法）】
正解は A。

Source B のルールと Source C の計画を照合します。

A「Tomを常に親と一緒にいさせる」：
Source B: "Children under 10 must be accompanied by an adult at all times"
Source C: Tom は 8 歳（8 years old）→ 10歳未満 → 常に大人と一緒である必要あり
→ これはルールを守っている計画 ✓

B「体育館内でEmmaの写真を撮る」：
Source B: "Photography is allowed in outdoor areas only; no cameras inside buildings"
体育館（Gym）は建物内 → 撮影禁止 → ルール違反 ✗

C「手作りサンドイッチを持参する」：
Source B: "Food and drinks from outside the school are not permitted on the premises"
外からの食べ物は校内持ち込み禁止 → ルール違反 ✗

D「登録なしに到着する」：
Source B: "All visitors must register at the school gate before entering"
登録は必須 → ルール違反 ✗

→ A のみがすべてのルールに従っています。

【語彙ポイント】
・"accompanied by"（〜に同伴されて）: 一人で行動させずに大人が一緒にいること。
・"on the premises"（敷地内に）: premises = 施設・構内。`,
      },
      {
        questionText:
          "The Dance Show ends at what time, and what event happens in the Main Hall immediately after?",
        options: [
          "3:30 PM, and the Closing Ceremony starts at 4:00 PM",
          "4:00 PM, and the Closing Ceremony starts at 5:00 PM",
          "2:30 PM, and the Drama Club Performance starts at 3:00 PM",
          "3:00 PM, and there are no more Main Hall events that day",
        ],
        correctAnswerIndex: 0,
        crossReferences: ["Source A"],
        explanation: `【正解の根拠：Source A の時刻読み取り】
正解は A。

Source A の Dance Show を確認：
・Time: 2:30 PM / Location: Gym

次に体育館（Gym）ではなく、Main Hall で次に開催されるイベントを探します：
・2:30 PM: Dance Show（Gym）
・4:00 PM: Closing Ceremony（Main Hall）

Dance Show の開始は 2:30 PM で、次の Gym のイベントや Main Hall のイベントを確認すると：
1:00 PM: Drama Club Performance（Main Hall）はすでに終了
4:00 PM: Closing Ceremony（Main Hall）が次のイベント

Dance Show（2:30 PM開始）の終了時刻は表に直接記載されていませんが、
4:00 PM に次のイベント（Closing Ceremony）が Main Hall で始まることは確認できます。

選択肢 A「3:30 PM に終わり、4:00 PM に Closing Ceremony」を見ると、
Dance Show は 2:30〜3:30 の約1時間と推測でき（表の各イベントが約1〜1.5時間間隔）、
4:00 PM から Closing Ceremony（Main Hall）が始まる → A が最も整合的。

【語彙ポイント】
・"immediately after"（直後に）: 時系列の照合問題。「直後」のイベントを表で探す。`,
      },
    ],
  },
];
