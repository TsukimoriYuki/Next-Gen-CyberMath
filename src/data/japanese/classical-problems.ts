import {
  lessonDifficulty,
  makeJapaneseProblem,
  type JapaneseProblemDraft,
} from "./problem-builder";

type Draft = Omit<JapaneseProblemDraft, "id" | "area" | "courseId" | "difficulty">;

function problem(number: number, courseId: string, draft: Draft) {
  return makeJapaneseProblem({
    ...draft,
    id: `jp-classical-${String(number).padStart(2, "0")}`,
    area: "classical-japanese",
    courseId,
    difficulty: lessonDifficulty(((number - 1) % 5) + 1),
  });
}

export const CLASSICAL_JAPANESE_PROBLEMS = [
  problem(1, "classical-context-vocabulary", {
    title: "「おどろく」の文脈語義", passage: "暁に鶏の声聞こえければ、男おどろきて戸を開けたり。", prompt: "「おどろきて」の意味を選びなさい。",
    choices: [["A", "びっくりして", "鶏の声と暁の時刻から、睡眠から起きる場面である。"], ["B", "目を覚まして"], ["C", "怒って", "怒りを示す言動がない。"], ["D", "急いで", "速度ではなく覚醒を表す。"]],
    correctAnswer: "B", evidence: "「暁」「鶏の声」を受けて戸を開ける行動が続く。", explanation: "古語「おどろく」は「目を覚ます」「はっと気づく」。夜明けの音で起床する文脈なので「目を覚まして」が適切。", questionType: "meaning", grammarPoint: "古今異義語", vocabularyTags: ["おどろく"], reviewTags: ["古文単語", "文脈"], modernTranslation: "夜明けに鶏の声が聞こえたので、男は目を覚まして戸を開けた。",
  }),
  problem(2, "classical-context-vocabulary", {
    title: "「ありがたし」の意味", passage: "冬の野に花の咲けるは、いとありがたきことなり。", prompt: "「ありがたき」の意味を選びなさい。",
    choices: [["A", "感謝したい", "現代語の意味を当てただけで、花の珍しさと合わない。"], ["B", "めったにない"], ["C", "理解しにくい", "難解さを述べる文脈ではない。"], ["D", "恐ろしい", "恐怖の対象は示されない。"]],
    correctAnswer: "B", evidence: "通常花の少ない「冬の野」に咲くことを評価している。", explanation: "「ありがたし」は「有ることが難しい」から「めったにない」。季節とのずれが語義の根拠。", questionType: "meaning", grammarPoint: "古今異義語", vocabularyTags: ["ありがたし"], reviewTags: ["古文単語", "季節"], modernTranslation: "冬の野に花が咲いているのは、たいそう珍しいことである。",
  }),
  problem(3, "classical-context-vocabulary", {
    title: "「をかし」の評価", passage: "月の光、薄き雲より漏りて、庭の白く見ゆる、をかし。", prompt: "「をかし」が表す評価を選びなさい。",
    choices: [["A", "趣があって美しい"], ["B", "滑稽で笑える", "現代語の「おかしい」に限定している。"], ["C", "不気味で避けたい", "光景を肯定的に結ぶ語と合わない。"], ["D", "退屈で変化がない", "月光の景趣を評価している。"]],
    correctAnswer: "A", evidence: "雲から漏れる月光と白く見える庭という視覚的な美しさが描かれる。", explanation: "「をかし」は明るく知的な趣や美しさへの評価。ここでは月夜の景色への好ましい感情。", questionType: "emotion", grammarPoint: "評価語", vocabularyTags: ["をかし"], reviewTags: ["古文単語", "情景"], modernTranslation: "月の光が薄い雲から漏れて庭が白く見えるのは、趣がある。",
  }),
  problem(4, "classical-context-vocabulary", {
    title: "「あやし」の対象", passage: "見知らぬ文の門に置かれたるを、女あやしと思ひて、しばし開かず。", prompt: "女の「あやし」という心情を選びなさい。",
    choices: [["A", "身分が低いと感じる", "人の身分を評価する文脈ではない。"], ["B", "不思議で疑わしいと思う"], ["C", "みすぼらしいと同情する", "文の外見や困窮は示されない。"], ["D", "うれしくて待ちきれない", "「しばし開かず」という慎重な行動と逆。"]],
    correctAnswer: "B", evidence: "差出人不明の文をすぐ開けず、警戒している。", explanation: "「あやし」には不思議だ・疑わしい等がある。見知らぬ文への警戒行動が意味を限定する。", questionType: "emotion", grammarPoint: "多義語の識別", vocabularyTags: ["あやし"], reviewTags: ["古文単語", "行動根拠"], modernTranslation: "見知らぬ手紙が門に置かれているのを、女は不審に思って、しばらく開けなかった。",
  }),
  problem(5, "classical-context-vocabulary", {
    title: "複数の文脈手掛かり", passage: "友の訪れもなく、雨のみ降り続く日、つれづれなれば、古き物語を取り出でて読む。", prompt: "「つれづれなれば」の意味を選びなさい。",
    choices: [["A", "忙しかったので", "訪問もなく、読書に時間を使う状況と逆。"], ["B", "退屈で手持ち無沙汰なので"], ["C", "友に腹を立てたので", "怒りは本文にない。"], ["D", "雨が恐ろしかったので", "恐怖ではなく時間を持て余す状況。"]],
    correctAnswer: "B", evidence: "訪問者がなく雨が続き、古い物語を読む行動へ移る。", explanation: "「つれづれ」はすることがなく手持ち無沙汰な状態。訪問なし・雨・読書という複数の手掛かりから判断する。", questionType: "context", grammarPoint: "文脈語義", vocabularyTags: ["つれづれ"], reviewTags: ["古文単語", "複数根拠"], modernTranslation: "友人の訪問もなく雨ばかり降り続く日、手持ち無沙汰なので古い物語を取り出して読む。",
  }),

  problem(6, "classical-auxiliary-verbs", {
    title: "完了の「ぬ」", passage: "花、風に散りぬ。", prompt: "助動詞「ぬ」の意味を選びなさい。",
    choices: [["A", "打消", "打消「ぬ」は未然形に接続するが、「散り」は連用形。"], ["B", "完了"], ["C", "推量", "推量を表す形ではない。"], ["D", "受身", "受身の助動詞ではない。"]],
    correctAnswer: "B", evidence: "四段動詞「散る」の連用形「散り」に接続する。", explanation: "連用形接続の「ぬ」は完了。「花が風で散ってしまった」。接続が打消との識別根拠。", questionType: "auxiliary-verb", grammarPoint: "完了ぬ・接続", reviewTags: ["助動詞", "完了"], modernTranslation: "花が風に散ってしまった。",
  }),
  problem(7, "classical-auxiliary-verbs", {
    title: "意志の「む」", passage: "我、明日こそ都へ帰らむ。", prompt: "「む」の意味を選びなさい。",
    choices: [["A", "意志"], ["B", "推量", "一人称主語「我」の行動を本人が述べている。"], ["C", "婉曲", "名詞を修飾する形ではない。"], ["D", "仮定", "条件節を作っていない。"]],
    correctAnswer: "A", evidence: "一人称「我」が自分の未来の行動を文末で述べる。", explanation: "一人称主語＋文末の「む」は意志になりやすい。「私は明日都へ帰ろう」。", questionType: "auxiliary-verb", grammarPoint: "む・主語による識別", reviewTags: ["助動詞", "む", "主語"], modernTranslation: "私は明日こそ都へ帰ろう。",
  }),
  problem(8, "classical-auxiliary-verbs", {
    title: "詠嘆の「けり」", passage: "長く探しつる花、ここに咲きけり。", prompt: "「けり」が表す内容を選びなさい。",
    choices: [["A", "過去の出来事を淡々と報告するだけ", "発見の場面で気づきが中心。"], ["B", "今気づいた驚き・詠嘆"], ["C", "花が咲くはずだという当然", "当然の助動詞ではない。"], ["D", "花を咲かせようという意志", "主語の意志ではない。"]],
    correctAnswer: "B", evidence: "長く探していた花を「ここに」発見する場面。", explanation: "「けり」は過去のほか詠嘆を表す。発見による新たな気づきなので「咲いていたのだなあ」。", questionType: "auxiliary-verb", grammarPoint: "けり・詠嘆", reviewTags: ["助動詞", "けり", "詠嘆"], modernTranslation: "長く探していた花が、ここに咲いていたのだなあ。",
  }),
  problem(9, "classical-auxiliary-verbs", {
    title: "可能の「る」", passage: "暗き夜なれど、月明らかにて、道も見らる。", prompt: "「らる」の意味を選びなさい。",
    choices: [["A", "受身", "道が誰かに見られることを問題にしていない。"], ["B", "尊敬", "身分の高い動作主がいない。"], ["C", "可能"], ["D", "自発", "自然にそう感じる心理動詞ではなく視認可能性。"]],
    correctAnswer: "C", evidence: "暗夜でも月が明るいという条件から、道を見ることができると続く。", explanation: "文脈は条件→可能。「道も見ることができる」。主語・動詞の性質・前後関係で四つの意味から選ぶ。", questionType: "auxiliary-verb", grammarPoint: "る・らるの識別", reviewTags: ["助動詞", "可能", "文脈"], modernTranslation: "暗い夜だが月が明るくて、道も見ることができる。",
  }),
  problem(10, "classical-auxiliary-verbs", {
    title: "「べし」の文脈識別", passage: "師、弟子に「明日は早く参るべし」と言ふ。", prompt: "「べし」の意味を選びなさい。",
    choices: [["A", "命令・当然"], ["B", "単なる推量", "師が弟子へ直接指示する会話。"], ["C", "可能", "能力の可否を述べていない。"], ["D", "意志", "話者自身の行動ではない。"]],
    correctAnswer: "A", evidence: "師から弟子への直接の発言で、翌日の行動を求める。", explanation: "二人称への「べし」は命令・適当になりやすい。関係性と会話形式から「早く来なさい」。", questionType: "auxiliary-verb", grammarPoint: "べし・意味識別", reviewTags: ["助動詞", "べし", "会話"], modernTranslation: "先生が弟子に「明日は早く参りなさい」と言う。", people: ["師：指示する", "弟子：早く参るよう求められる"],
  }),

  problem(11, "classical-honorific-subjects", {
    title: "尊敬語から主語を選ぶ", passage: "中宮、御簾の内より月を御覧じ給ふ。", prompt: "月を見る人物を選びなさい。",
    choices: [["A", "中宮"], ["B", "作者", "尊敬語の動作主として中宮が明示される。"], ["C", "御簾", "物であり見る主体にならない。"], ["D", "月", "見る対象である。"]],
    correctAnswer: "A", evidence: "中宮の直後に尊敬語「御覧ず」「給ふ」が重なる。", explanation: "尊敬語は動作主を高める。主語は身分の高い中宮で、月が対象である。二つの尊敬表現が同じ動作主を指すため一意に決まる。", questionType: "subject", grammarPoint: "尊敬語・給ふ", reviewTags: ["敬語", "主語"], modernTranslation: "中宮が御簾の内側から月を御覧になる。", people: ["中宮：月を見る"],
  }),
  problem(12, "classical-honorific-subjects", {
    title: "謙譲語の敬意方向", passage: "女房、文を帝に奉る。", prompt: "「奉る」が高める人物を選びなさい。",
    choices: [["A", "女房", "謙譲語は動作主でなく動作の向かう先を高める。"], ["B", "帝"], ["C", "文", "物は敬意の対象でない。"], ["D", "作者", "本文の授受関係にいない。"]],
    correctAnswer: "B", evidence: "文を差し上げる相手として「帝に」と明示される。", explanation: "「奉る」は謙譲語。女房から帝へ文を差し上げ、帝への敬意を示す。", questionType: "honorific", grammarPoint: "謙譲語・敬意方向", reviewTags: ["敬語", "謙譲"], modernTranslation: "女房が手紙を帝に差し上げる。", people: ["女房：差し上げる", "帝：受け取る高められた人物"],
  }),
  problem(13, "classical-honorific-subjects", {
    title: "二つの敬語", passage: "大臣、帝に事の由を奏し給ふ。", prompt: "敬語の説明として正しいものを選びなさい。",
    choices: [["A", "「奏す」は帝への謙譲、「給ふ」は大臣への尊敬"], ["B", "両方とも帝を主語にする尊敬語", "主語は大臣で、奏すは帝へ向かう。"], ["C", "両方とも大臣から聞き手への丁寧語", "丁寧語ではない。"], ["D", "「奏す」は大臣への尊敬、「給ふ」は帝への謙譲", "敬意の方向が逆。"]],
    correctAnswer: "A", evidence: "大臣が帝へ申し上げる動作に「奏す」、大臣の動作に「給ふ」が付く。", explanation: "一文で敬意が二方向に働く。奏すは行き先の帝を高め、給ふは動作主の大臣を高める。", questionType: "honorific", grammarPoint: "敬語の重なり", reviewTags: ["敬語", "方向", "人物関係"], modernTranslation: "大臣が帝に事情を申し上げなさる。", people: ["大臣：申し上げる・尊敬される", "帝：申し上げる相手"],
  }),
  problem(14, "classical-honorific-subjects", {
    title: "会話文の話者", passage: "姫君、「その花を見ばや」とのたまへば、女房「ただ今持て参らむ」と答ふ。", prompt: "花を持って来ようとしている人物を選びなさい。",
    choices: [["A", "姫君", "姫君は花を見たいと希望する側。"], ["B", "女房"], ["C", "花", "行動主体ではない。"], ["D", "語り手", "会話内の意志は女房のもの。"]],
    correctAnswer: "B", evidence: "女房の発言「持て参らむ」で、一人称の意志「む」が使われる。", explanation: "会話者交替を確認する。姫君の希望に女房が応じ、自分が持って来ようと述べる。", questionType: "subject", grammarPoint: "会話・む・敬語", reviewTags: ["主語", "会話", "敬語"], modernTranslation: "姫君が「その花を見たい」とおっしゃると、女房が「すぐに持って参りましょう」と答える。", people: ["姫君：花を見たい", "女房：花を持参する"],
  }),
  problem(15, "classical-honorific-subjects", {
    title: "敬語と授受の総合", passage: "僧、宮に経を奉りけり。宮、喜びて御衣を賜ふ。僧、かしこまりて受く。", prompt: "人物関係として正しいものを選びなさい。",
    choices: [["A", "宮が僧へ経を差し上げた", "奉るの動作主と目的語が逆。"], ["B", "僧が宮へ経を差し上げ、宮が僧へ衣を与えた"], ["C", "僧が宮から経と衣の両方を受けた", "経の授受方向が逆。"], ["D", "宮が自分で経を読み、衣を受け取った", "本文の授受動詞と一致しない。"]],
    correctAnswer: "B", evidence: "「僧、宮に経を奉る」と「宮、御衣を賜ふ」が逆向きの授受を示す。", explanation: "奉るは僧→宮、賜ふは宮→僧。最後の「僧…受く」が後者の向きを確定する。", questionType: "person-relation", grammarPoint: "授受敬語", reviewTags: ["敬語", "授受", "人物関係"], modernTranslation: "僧が宮に経を差し上げた。宮は喜んで衣をお与えになった。僧は恐縮して受け取った。", people: ["僧：経を献上し衣を受け取る", "宮：経を受け取り衣を与える"],
  }),

  problem(16, "classical-reading-elimination", {
    title: "行動から心情を読む", passage: "返事を書き始めたれど、筆を置きて、しばし月を眺む。", prompt: "人物の状態として本文から確実に言えるものを選びなさい。",
    choices: [["A", "相手を憎み、返事を永久に拒絶した", "憎悪・永久という原因と程度は本文にない。"], ["B", "返事を書く途中で手を止め、考えている"], ["C", "月見を楽しむため返事を捨てた", "楽しさや放棄は断定できない。"], ["D", "筆が壊れたので困っている", "筆の故障は本文にない。"]],
    correctAnswer: "B", evidence: "「書き始めた」「筆を置く」「しばし眺む」という行動の連続。", explanation: "本文が保証するのは中断と思案まで。原因や強い感情を選択肢が追加していないか確認する。", questionType: "emotion", grammarPoint: "行動根拠・心情", reviewTags: ["心情", "本文外情報"], modernTranslation: "返事を書き始めたが、筆を置いて、しばらく月を眺める。",
  }),
  problem(17, "classical-reading-elimination", {
    title: "逆接後を重く読む", passage: "道遠けれど、母の待つらむと思へば、男休まず歩みぬ。", prompt: "男が歩き続けた理由を選びなさい。",
    choices: [["A", "道が近かったから", "「道遠けれど」と逆。"], ["B", "母が待っているだろうと思ったから"], ["C", "休む場所を嫌っていたから", "休憩場所への評価はない。"], ["D", "母から必ず命令されたから", "命令の事実と「必ず」は本文にない。"]],
    correctAnswer: "B", evidence: "逆接「ど」の後に「母の待つらむと思へば」と理由が明示される。", explanation: "困難は遠い道、継続の理由は母への思い。「らむ」は現在推量で、男が母の状態を想像している。", questionType: "logic", grammarPoint: "逆接・らむ・因果", reviewTags: ["因果", "逆接", "心情"], modernTranslation: "道は遠いが、母が待っているだろうと思うので、男は休まず歩いた。",
  }),
  problem(18, "classical-reading-elimination", {
    title: "省略主語の継続", passage: "兄、弟を呼びて書を渡す。受け取りて、深くうなづきぬ。", prompt: "「受け取りて」の主語を選びなさい。",
    choices: [["A", "兄", "兄は書を渡す側であり、受け取る側は弟。"], ["B", "弟"], ["C", "書", "物は受け取る主体にならない。"], ["D", "特定できない", "授受の向きから一意に決まる。"]],
    correctAnswer: "B", evidence: "兄が弟へ書を渡した直後なので、受け取れるのは弟。", explanation: "主語は表面上省略されるが、授受動詞の役割で確定できる。弟が受け取り、うなずく。", questionType: "subject", grammarPoint: "省略主語・授受", reviewTags: ["主語", "人物関係"], modernTranslation: "兄が弟を呼んで書物を渡す。弟は受け取って、深くうなずいた。", people: ["兄：書を渡す", "弟：受け取りうなずく"],
  }),
  problem(19, "classical-reading-elimination", {
    title: "会話と心情の対応", passage: "女、「今宵は待たじ」と言ひつつ、門の音するたびに立ち出づ。", prompt: "女の心情として最も適切なものを選びなさい。",
    choices: [["A", "来訪を完全に諦め、門に関心がない", "門の音ごとに出る行動と矛盾。"], ["B", "待たないと言いながら、なお来訪を期待している"], ["C", "門の音を恐れて逃げたい", "恐怖や逃走は本文にない。"], ["D", "誰が来ても必ず追い返すつもりだ", "「誰でも」「必ず」「追い返す」は追加情報。"]],
    correctAnswer: "B", evidence: "発言「待たじ」と、門の音ごとに出る行動が対照的。", explanation: "言葉と行動のずれが未練・期待を示す。強い断定や本文にない動機を加えない。", questionType: "emotion", grammarPoint: "打消意志・行動対比", reviewTags: ["心情", "会話", "対比"], modernTranslation: "女は「今夜は待つまい」と言いながら、門の音がするたびに外へ出る。",
  }),
  problem(20, "classical-reading-elimination", {
    title: "内容一致の要素分解", passage: "里人、橋の壊れたるを見て、明日直さむと集ふ。翁は木を運び、若者は縄を整ふ。雨降り出でしかど、皆やめず。", prompt: "本文内容と一致するものを選びなさい。",
    choices: [["A", "翁だけが橋を直し、若者は雨で帰った", "若者も準備し、皆やめなかった。"], ["B", "里人は壊れた橋を直すため集まり、役割を分け、雨でも作業をやめなかった"], ["C", "橋は雨で壊れ、その日のうちに完成した", "破損原因と完成は本文にない。"], ["D", "里人は橋を危険だと判断して永久に閉鎖した", "修理へ集まる内容と逆で、永久も言い過ぎ。"]],
    correctAnswer: "B", evidence: "「直さむと集ふ」「翁は…若者は…」「皆やめず」の三要素が対応する。", explanation: "目的・役割・継続の三要素を選択肢ごとに照合する。Bだけがすべて本文の範囲内。", questionType: "content", grammarPoint: "内容一致・意志む・逆接", reviewTags: ["内容一致", "選択肢分解", "言い過ぎ"], modernTranslation: "村人は橋が壊れているのを見て、明日直そうと集まる。老人は木を運び、若者は縄を整える。雨が降り出したが、皆やめなかった。", people: ["里人：修理に集まる", "翁：木を運ぶ", "若者：縄を整える"],
  }),
] as const;
