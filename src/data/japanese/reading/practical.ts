import { makePassage } from "./builder";

export const PRACTICAL_PASSAGES = [
  makePassage({
    id: "jp-reading-15", title: "図書委員会・放課後講座の会場選び", genre: "practical", length: "multi-source", theme: "案内文と表から全条件を満たす会場を選ぶ", estimatedReadingTime: 8,
    paragraphs: [
      "図書委員会は、外部講師を招く読書講座の会場を検討している。参加見込みは三十六人で、終了後に机を島型へ動かして小グループ活動を行う。講師は駅から徒歩で来校し、投影資料と音声を使う。委員は資料Aの条件と資料Bの設備表を照合することにした。",
      "担当の三浦さんは『最大人数だけなら視聴覚室だ』と言った。石川さんは、定員以外にも準備時間、机の移動、駅からの経路を確認する必要があると指摘した。なお講座日は雨予報で、屋外通路を通る会場は避けたい。",
    ],
    materials: [
      { id: "A", title: "講座実施条件", type: "notice", items: ["参加者36人と講師1人が着席できる", "16時開始。委員が使える準備時間は15時30分から", "可動机、プロジェクター、音声設備が必要", "講師は駅側の正門から徒歩で来る"] },
      { id: "B", title: "会場設備表", type: "table", headers: ["会場", "定員", "机", "投影・音声", "利用開始", "正門から"], rows: [["視聴覚室", "60", "固定", "あり", "15:00", "屋内4分"], ["多目的室", "40", "可動", "あり", "15:30", "屋内6分"], ["第2会議室", "38", "可動", "投影のみ", "15:20", "屋内3分"], ["体育館会議室", "45", "可動", "あり", "15:30", "屋外5分"]] },
    ],
    insights: [
      { answer: "多目的室は定員・可動机・投影音声・準備開始・屋内経路の全条件を満たす。", secondAnswer: "資料Aの条件を人数・机・設備・時間・経路に分け、資料Bの同じ列へ照合できる。", prompt: "会場選びについて正しい説明を二つ選びなさい。", evidenceParagraphIds: ["1", "2"], evidenceText: "資料Aの五条件を資料Bの各列へ照合すると、多目的室だけがすべて一致する。", skill: "条件照合", questionType: "material-comparison" },
      { answer: "三浦さんの判断は定員だけを見ており、固定机のためグループ活動条件を満たさない。", evidenceParagraphIds: ["1", "2"], evidenceText: "視聴覚室は60人だが机が固定で、終了後の島型活動ができない。", skill: "一部一致の除外", questionType: "content" },
      { answer: "第2会議室は人数と机を満たすが、音声設備がないため候補から外れる。", evidenceParagraphIds: ["1"], evidenceText: "講師は投影資料と音声を使う一方、設備表は第2会議室を投影のみとする。", skill: "資料照合", questionType: "material-comparison" },
      { answer: "雨予報の条件を加えると、屋外経路の体育館会議室は設備がそろっても不適切である。", evidenceParagraphIds: ["2"], evidenceText: "本文で屋外通路を避けるとし、表では体育館会議室だけが屋外経路である。", skill: "追加条件", questionType: "logic" },
      { answer: "選定では定員の最大値でなく、設問条件を分解して全資料の該当欄を確認する。", evidenceParagraphIds: ["1", "2"], evidenceText: "人数・時間・机・設備・経路の積として比較する必要がある。", skill: "複数資料の手順", questionType: "main-idea" },
    ],
  }),
  makePassage({
    id: "jp-reading-16", title: "地域清掃・参加メールの確認", genre: "practical", length: "multi-source", theme: "公式案内と個別メールの優先関係", estimatedReadingTime: 8,
    paragraphs: [
      "生徒会は地域清掃への参加者へ、公式案内を配付した。その後、参加予定の岸さんから担当者へメールが届いた。担当者は、岸さんの希望と公式条件を混同せず、返信に必要な確認事項を整理する。",
      "メールには複数の希望が書かれているが、希望を書いたこと自体で変更が承認されたわけではない。特に集合時刻と道具の貸出について、担当者が確認してから返信する必要がある。",
    ],
    materials: [
      { id: "A", title: "地域清掃の公式案内", type: "notice", body: "集合：土曜8時40分、公民館前。雨天時は同時刻に体育館入口。軍手は各自持参。ごみ袋と火ばさみは主催者が貸与する。遅刻・途中退出は前日17時までに生徒会へ連絡し、承認を受ける。" },
      { id: "B", title: "岸さんからのメール", type: "email", body: "土曜は家の用事で9時から参加したいです。雨なら中止だと思っています。軍手を学校で借りられますか。11時には帰る予定です。必要なら返信してください。" },
    ],
    insights: [
      { answer: "岸さんには、9時参加と11時退出の承認状況、軍手を用意できるかを確認して返信する。", secondAnswer: "雨天時も中止ではなく体育館入口へ集合することを返信で伝える。", prompt: "岸さんへの返信に含めるべき内容を二つ選びなさい。", evidenceParagraphIds: ["1", "2"], evidenceText: "時刻変更は事前承認が必要で、軍手は各自持参、雨天時も実施である。", skill: "公式条件と希望", questionType: "material-comparison" },
      { answer: "雨天でも中止ではなく、集合場所を体育館入口へ変更して実施する。", evidenceParagraphIds: ["1"], evidenceText: "公式案内は雨天時の同時刻・別会場を明記する。", skill: "事実確認", questionType: "content" },
      { answer: "メールの『9時から参加したい』は希望であり、担当者の承認前には決定事項でない。", evidenceParagraphIds: ["2"], evidenceText: "本文は希望の記載だけで変更が承認されたわけではないと注意する。", skill: "発信者の区別", questionType: "interpretation" },
      { answer: "主催者が貸すのはごみ袋と火ばさみで、軍手は参加者が持参する。", evidenceParagraphIds: ["1"], evidenceText: "案内文で貸与物と持参物を分けている。", skill: "項目対応", questionType: "matching" },
      { answer: "返信では個別希望を公式案内の期限・承認・持参物へ一項目ずつ照合する必要がある。", evidenceParagraphIds: ["1", "2"], evidenceText: "公式ルールと個別メールは役割が異なるため、希望をそのまま決定にしない。", skill: "複数資料の結論", questionType: "main-idea" },
    ],
  }),
  makePassage({
    id: "jp-reading-17", title: "文化祭会議・決定と保留", genre: "practical", length: "multi-source", theme: "会議メモから決定事項と未決事項を区別する", estimatedReadingTime: 9,
    paragraphs: [
      "二年三組は文化祭の展示計画を話し合った。書記は発言をそのまま並べず、決まったこと、担当、次回までに調べることへ分けてメモした。欠席者へ伝える際は、提案と決定を区別しなければならない。",
      "会議後、広報担当は紹介文を作ることになった。ただし、展示名と開場時刻には未確定部分があるため、決定済み情報だけを用いて下書きを作る。",
    ],
    materials: [
      { id: "A", title: "会議メモ", type: "memo", items: ["展示テーマ：校内の音を集めた『音の地図』に決定", "会場：2年3組教室に決定", "録音担当：各班2人、金曜までに候補地点を提出", "展示名：『耳で歩く学校』案と『音の地図展』案を次回投票", "開場時刻：10時案。ただし放送部との調整結果を佐藤さんが確認", "来場者用イヤホン：衛生面を山本さんが調査"] },
      { id: "B", title: "広報文の候補", type: "opinions", items: ["①10時開場『耳で歩く学校』を2年3組で開催します", "②校内の音を集めた『音の地図』展示を2年3組で行います", "③イヤホンを全員に配る『音の地図展』を開催します"] },
    ],
    insights: [
      { answer: "広報文②は、展示テーマと会場という決定済み情報だけを用いている。", evidenceParagraphIds: ["1", "2"], evidenceText: "名称・時刻・イヤホンは保留だが、テーマと会場は決定している。", skill: "決定と保留", questionType: "material-comparison" },
      { answer: "展示名は二案から次回投票するため、まだ決定していない。", evidenceParagraphIds: ["1"], evidenceText: "会議メモは展示テーマの決定と、展示名案の投票予定を別項目にする。", skill: "情報分類", questionType: "content" },
      { answer: "佐藤さんの役割は開場時刻を決めることではなく、放送部との調整結果を確認することだ。", evidenceParagraphIds: ["1"], evidenceText: "10時は案であり、確認後の扱いはまだ記録されていない。", skill: "担当対応", questionType: "matching" },
      { answer: "イヤホン配付は衛生面の調査対象であり、実施決定とは読めない。", evidenceParagraphIds: ["1"], evidenceText: "山本さんが調査するとだけ決まり、配付の可否は保留である。", skill: "言い過ぎの除外", questionType: "interpretation" },
      { answer: "会議メモを使うときは、案・決定・担当・確認待ちを区別して外部向け情報を作る。", evidenceParagraphIds: ["1", "2"], evidenceText: "欠席者や来場者へ、提案を決定事項として伝えないことが目的である。", skill: "実用文要旨", questionType: "main-idea" },
    ],
  }),
  makePassage({
    id: "jp-reading-18", title: "自習室アンケートの読み方", genre: "practical", length: "multi-source", theme: "調査結果の母数と複数指標を読む", estimatedReadingTime: 9,
    paragraphs: [
      "学校は自習室の利用時間を見直すため、利用者アンケートを行った。担当者は、満足度が最も高い時間帯をそのまま延長候補にせず、回答者数、混雑度、利用希望も合わせて検討する。",
      "表の割合は各時間帯の回答者を母数としている。回答者数が異なるため、割合の大小だけで希望者の人数を比べることはできない。また、混雑度は座席センサーによる平均値で、満足度とは別の資料である。",
    ],
    materials: [
      { id: "A", title: "時間帯別調査", type: "table", headers: ["時間帯", "回答者", "満足", "延長希望", "平均混雑度"], rows: [["7:30-8:20", "20人", "80%", "30%", "45%"], ["16:00-17:00", "80人", "65%", "70%", "92%"], ["17:00-18:00", "50人", "72%", "64%", "78%"]] },
      { id: "B", title: "自由記述の分類", type: "chart", bars: [{ label: "席不足", value: 68, unit: "%" }, { label: "終了が早い", value: 54, unit: "%" }, { label: "照明", value: 22, unit: "%" }] },
    ],
    insights: [
      { answer: "16時台は延長希望割合と混雑度が最も高く、席不足への対応も併せて検討する必要がある。", evidenceParagraphIds: ["1", "2"], evidenceText: "表で16時台の延長希望70%・混雑92%、分類で席不足68%を照合する。", skill: "表とグラフ", questionType: "material-comparison" },
      { answer: "朝の満足度80%だけから、朝の延長を最優先とは決められない。", evidenceParagraphIds: ["1", "2"], evidenceText: "朝は満足度最大だが回答者20人、延長希望30%、混雑45%である。", skill: "母数", questionType: "logic" },
      { answer: "割合を人数へ直すと、16時台の延長希望は56人、17時台は32人である。", evidenceParagraphIds: ["2"], evidenceText: "80人の70%と50人の64%をそれぞれ計算する。", skill: "割合と人数", questionType: "content" },
      { answer: "満足度と混雑度は別の方法で得た指標なので、同じ意味の数値として扱えない。", evidenceParagraphIds: ["2"], evidenceText: "満足度は回答割合、混雑度は座席センサーの平均値である。", skill: "指標の区別", questionType: "interpretation" },
      { answer: "運用変更は単独の最大値でなく、母数・希望・混雑・自由記述を組み合わせて判断する。", evidenceParagraphIds: ["1", "2"], evidenceText: "担当者は複数指標を合わせて検討すると明記されている。", skill: "資料統合", questionType: "main-idea" },
    ],
  }),
  makePassage({
    id: "jp-reading-19", title: "校外学習・三つの見学案", genre: "practical", length: "multi-source", theme: "複数人の意見と制約条件から案を選ぶ", estimatedReadingTime: 10,
    paragraphs: [
      "班は校外学習で訪ねる施設を一つ選ぶ。移動を含む活動時間は13時から16時30分までで、班の予算は一人1200円以内。車椅子を使う班員がいるため、見学経路全体の段差対応が必要である。",
      "意見は好みとして尊重するが、制約を満たさない案はそのまま採用できない。担当者は、各意見が重視する価値を残しながら、施設表と交通表を照合する。",
    ],
    materials: [
      { id: "A", title: "班員の意見", type: "opinions", items: ["葵：実物に触れられる体験を重視したい", "健：移動を短くして見学時間を確保したい", "玲：地域の仕事を知れる場所がよい"] },
      { id: "B", title: "施設・交通表", type: "table", headers: ["施設", "往復", "料金", "見学可能時間", "経路", "内容"], rows: [["工芸館", "60分", "1000円", "14:00-15:30", "全経路対応", "制作体験と職人説明"], ["港資料館", "40分", "600円", "13:30-15:00", "一部階段", "物流展示"], ["科学園", "80分", "1200円", "15:00-16:30", "全経路対応", "実験展示"]] },
    ],
    insights: [
      { answer: "工芸館は時間・予算・経路条件を満たし、体験と地域の仕事という複数の希望にも合う。", evidenceParagraphIds: ["1", "2"], evidenceText: "往復と見学が活動枠内、料金1000円、全経路対応で、制作体験と職人説明がある。", skill: "制約と意見", questionType: "material-comparison" },
      { answer: "港資料館は移動が最短でも、一部階段のため必須条件を満たさない。", evidenceParagraphIds: ["1"], evidenceText: "車椅子利用者がいるため全経路の段差対応が必要である。", skill: "必須条件", questionType: "logic" },
      { answer: "科学園は予算内だが、往復80分と15時開始のため16時30分までに戻れない。", evidenceParagraphIds: ["1"], evidenceText: "見学終了16時30分に加え帰路40分が必要で、活動終了を越える。", skill: "時間計算", questionType: "sequence" },
      { answer: "健さんの移動時間への希望は比較材料だが、段差対応という必須条件より優先できない。", evidenceParagraphIds: ["1", "2"], evidenceText: "好みは尊重しても、制約を満たさない案は採用できない。", skill: "優先順位", questionType: "interpretation" },
      { answer: "案の選定では、全員の希望を同じ重さで数えるのでなく、必須条件を満たした上で価値を多く残す。", evidenceParagraphIds: ["1", "2"], evidenceText: "時間・予算・経路を先に確認し、その範囲で体験や地域理解を比較する。", skill: "複数資料要旨", questionType: "main-idea" },
    ],
  }),
  makePassage({
    id: "jp-reading-20", title: "防災訓練のお知らせを直す", genre: "practical", length: "multi-source", theme: "案内文・地図メモ・意見を照合して誤解を防ぐ", estimatedReadingTime: 10,
    paragraphs: [
      "自治会と学校は合同防災訓練の案内を作っている。初稿には情報が多いが、対象者、時刻、持ち物、雨天時の扱いが別の段落に散らばっている。担当班は資料Aの事実と資料Bの動線メモを照合し、誤解のない見出し順へ直す。",
      "案内では、全員に共通する条件と、支援が必要な人だけの手続を分ける。また『体育館へ集合』だけでは入口が二つあるため不十分であり、通行できる経路を具体的に示す必要がある。",
    ],
    materials: [
      { id: "A", title: "訓練条件", type: "notice", items: ["対象：町内在住者と在校生。小学生以下は保護者同伴", "受付：9時から9時20分。訓練開始9時30分", "持ち物：飲み物、上履き。防災頭巾は希望者へ貸出", "雨天実施。強風警報時のみ8時に中止連絡", "移動支援が必要な人は前日正午までに申請"] },
      { id: "B", title: "体育館周辺の動線メモ", type: "memo", items: ["北入口：階段のみ。受付に近い", "南入口：スロープあり。受付まで屋根付き通路", "駐輪場：南入口の東側。訓練中は北側通路を閉鎖"] },
      { id: "C", title: "案内初稿への意見", type: "opinions", items: ["受付時刻と開始時刻を分けてほしい", "雨なら中止だと思っていた", "入口名がなく、どこへ行くか迷う", "支援申請が全員必要に見える"] },
    ],
    insights: [
      { answer: "案内は受付9時〜9時20分と開始9時30分を分け、雨天実施・強風警報時のみ中止と明記する。", evidenceParagraphIds: ["1"], evidenceText: "資料Aの時刻と天候条件を、資料Cで誤解された項目に対応させる。", skill: "意見と事実", questionType: "material-comparison" },
      { answer: "全員の集合入口は、スロープと屋根付き通路がある南入口とするのが最も分かりやすい。", evidenceParagraphIds: ["2"], evidenceText: "北側通路は閉鎖され、北入口は階段のみだが、南入口は受付へ接続する。", skill: "地図メモ", questionType: "logic" },
      { answer: "移動支援の事前申請は支援が必要な人だけに該当し、全参加者の必須手続ではない。", evidenceParagraphIds: ["2"], evidenceText: "本文は共通条件と個別手続を分けるとし、資料Aも対象を限定する。", skill: "対象範囲", questionType: "paraphrase" },
      { answer: "小学生以下には保護者同伴という条件があるため、対象者見出しの近くへ置く。", evidenceParagraphIds: ["1"], evidenceText: "年齢による参加条件は対象説明と一体で示す方が誤読を防ぐ。", skill: "情報配置", questionType: "structure" },
      { answer: "修正版は共通条件を先に整理し、例外手続と入口動線を具体化して資料Cの誤解を一つずつ解消する。", evidenceParagraphIds: ["1", "2"], evidenceText: "事実・動線・利用者意見を対応させ、情報量ではなく探索しやすさを高める。", skill: "資料統合", questionType: "main-idea" },
    ],
  }),
] as const;
