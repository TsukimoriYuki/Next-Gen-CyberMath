import {
  lessonDifficulty,
  makeJapaneseProblem,
  type JapaneseProblemDraft,
} from "./problem-builder";

type Draft = Omit<JapaneseProblemDraft, "id" | "area" | "courseId" | "difficulty">;

function problem(number: number, courseId: string, draft: Draft) {
  return makeJapaneseProblem({
    ...draft,
    id: `jp-modern-vocab-${String(number).padStart(2, "0")}`,
    area: "modern-vocabulary",
    courseId,
    difficulty: lessonDifficulty(((number - 1) % 5) + 1),
  });
}

export const MODERN_VOCABULARY_PROBLEMS = [
  problem(1, "modern-abstract-terms", {
    title: "抽象と具体", passage: "リンゴ、電車、雨粒は互いに異なる。しかし、どれも数える対象として扱える。このとき私たちは、個別の姿を離れて「数量」という共通の見方を作っている。", prompt: "本文の「数量」という見方を最も適切に説明したものを選びなさい。",
    choices: [["A", "個々の色や形を詳しく描く具体化", "本文は個別の姿を離れて共通点を取っている。"], ["B", "異なる対象から共通点を取り出す抽象化"], ["C", "一つのリンゴだけを特別視する特殊化", "複数の対象に共通する見方である。"], ["D", "対象の価値を高低で評価すること", "価値判断は行っていない。"]],
    correctAnswer: "B", evidence: "「個別の姿を離れて」「共通の見方を作る」と明示される。", explanation: "抽象化は複数の具体から共通する性質を取り出す操作。数量は対象の色や形を捨て、数えられるという共通性を残す。", questionType: "meaning", grammarPoint: "抽象と具体", vocabularyTags: ["抽象", "具体"], reviewTags: ["抽象語", "定義"],
  }),
  problem(2, "modern-abstract-terms", {
    title: "普遍と特殊", passage: "すべての学習に同じ方法が効くわけではない。声に出すと覚えやすいという性質も、音を使う課題には有効だが、図形の配置をつかむ課題にはそのまま当てはまらない。", prompt: "本文で「特殊」に当たる考えを選びなさい。",
    choices: [["A", "どの学習にも例外なく成り立つ方法", "これは普遍を主張する説明。"], ["B", "音を使う課題という限られた条件で有効な方法"], ["C", "学習方法には価値がないという判断", "本文は価値を否定していない。"], ["D", "方法を一つに統一する結論", "本文は条件差を述べている。"]],
    correctAnswer: "B", evidence: "「音を使う課題には有効」と適用条件を限定している。", explanation: "特殊は限られた条件・事例に成り立つこと。Bは音を使う課題だけに範囲が絞られ、普遍的な主張ではない。", questionType: "context", grammarPoint: "普遍と特殊", vocabularyTags: ["普遍", "特殊"], reviewTags: ["抽象語", "範囲"],
  }),
  problem(3, "modern-abstract-terms", {
    title: "主観と客観", passage: "私はこの教室を広いと感じる。一方、床面積を測れば六十平方メートルである。前者は比べる人の経験に左右されるが、後者は同じ方法で測れば共有できる。", prompt: "「客観的」に当たる説明を選びなさい。",
    choices: [["A", "私が広いと感じたこと", "個人の経験に依存する主観。"], ["B", "誰もが必ず快適だと思うこと", "感想を全員へ広げた断定で、測定根拠がない。"], ["C", "同じ測定方法で共有できる床面積"], ["D", "広い教室の方が優れているという評価", "価値判断であり客観的事実ではない。"]],
    correctAnswer: "C", evidence: "「同じ方法で測れば共有できる」と説明される。", explanation: "客観は主体の感覚だけに依存せず、手続きと根拠を共有できること。絶対に正しいという意味ではなく、検証可能性が中心。", questionType: "meaning", grammarPoint: "主観と客観", vocabularyTags: ["主観", "客観"], reviewTags: ["抽象語", "測定根拠"],
  }),
  problem(4, "modern-abstract-terms", {
    title: "相対的な評価", passage: "同じ十分でも、試験中には短く、信号を待つ時間には長く感じられる。時間の長短という評価は、置かれた状況との関係で変わる。", prompt: "本文の考えを表す語を選びなさい。",
    choices: [["A", "絶対的", "状況にかかわらず固定される意味で、本文と逆。"], ["B", "相対的"], ["C", "普遍的", "すべての場面で同じ評価ではない。"], ["D", "客観的", "ここでは測定値でなく感じ方の変化を述べる。"]],
    correctAnswer: "B", evidence: "評価が「置かれた状況との関係で変わる」。", explanation: "相対的とは他との関係・条件によって値や評価が変わること。同じ十分でも場面により長短の感覚が変わる。", questionType: "meaning", grammarPoint: "相対と絶対", vocabularyTags: ["相対", "絶対"], reviewTags: ["抽象語", "条件"],
  }),
  problem(5, "modern-abstract-terms", {
    title: "本質と現象", passage: "画面には正解数だけが表示される。しかし、学習の本当の変化は、誤りの理由を説明できるようになった点にある。数字は見えやすい表れであり、その背後に理解の変化がある。", prompt: "本文で「現象」に当たるものを選びなさい。",
    choices: [["A", "誤りの理由を説明できる理解の変化", "本文では背後にある本質側。"], ["B", "画面に表示された正解数"], ["C", "学習は無意味だという結論", "本文にない評価。"], ["D", "数字を一切使わない方針", "表示を否定していない。"]],
    correctAnswer: "B", evidence: "数字を「見えやすい表れ」とし、その背後の理解と区別する。", explanation: "現象は外に現れて観察できる表れ。本質はその背後で対象を成り立たせる重要な性質。本文では正解数が現象、説明できる理解が本質。", questionType: "matching", grammarPoint: "本質と現象", vocabularyTags: ["本質", "現象"], reviewTags: ["抽象語", "対比"],
  }),

  problem(6, "modern-synonyms-paraphrase", {
    title: "原因と結果", passage: "説明を一文ずつ区切った。そのため、読み手は論理の切れ目を見つけやすくなった。", prompt: "原因に当たる部分を選びなさい。",
    choices: [["A", "説明を一文ずつ区切ったこと"], ["B", "読み手が切れ目を見つけやすくなったこと", "「そのため」の後にある結果。"], ["C", "論理が不要になったこと", "本文にない。"], ["D", "読み手が説明を書いたこと", "行為者を取り違えている。"]],
    correctAnswer: "A", evidence: "「そのため」が前文を原因、後文を結果として結ぶ。", explanation: "原因→結果は「区切る→見つけやすくなる」。接続表現を基準に矢印の向きを確定する。", questionType: "logic", grammarPoint: "原因と結果", vocabularyTags: ["原因", "結果"], reviewTags: ["論理関係", "因果"],
  }),
  problem(7, "modern-synonyms-paraphrase", {
    title: "手段と目的", passage: "発表で根拠を明確に伝えるため、引用箇所に番号を付けた。", prompt: "「番号を付けた」の役割を選びなさい。",
    choices: [["A", "目的", "目的は根拠を明確に伝えること。"], ["B", "手段"], ["C", "結果", "番号付与後に生じた事実として述べていない。"], ["D", "前提", "議論の出発命題ではない。"]],
    correctAnswer: "B", evidence: "「〜ため」の目的を実現する具体的な方法として番号付与が置かれる。", explanation: "目的は「根拠を明確に伝える」、手段は「引用箇所に番号を付ける」。手段と目的を逆にしない。", questionType: "matching", grammarPoint: "手段と目的", vocabularyTags: ["手段", "目的"], reviewTags: ["論理関係", "目的"],
  }),
  problem(8, "modern-synonyms-paraphrase", {
    title: "前提から結論へ", passage: "限られた時間では、すべての情報を同じ詳しさで扱えない。したがって、目的に応じて重要度を決める必要がある。", prompt: "結論を選びなさい。",
    choices: [["A", "時間が限られていること", "結論を支える前提。"], ["B", "すべてを同じ詳しさで扱えないこと", "前提の説明に含まれる。"], ["C", "目的に応じて重要度を決める必要があること"], ["D", "情報は少ないほど必ずよいこと", "本文より強く一般化している。"]],
    correctAnswer: "C", evidence: "「したがって」の後に筆者の導いた主張が置かれる。", explanation: "前提は時間と処理量の制約、結論は優先順位づけの必要性。Dは「必ず」を加えた言い過ぎ。", questionType: "logic", grammarPoint: "前提と結論", vocabularyTags: ["前提", "結論"], reviewTags: ["論理関係", "結論"],
  }),
  problem(9, "modern-synonyms-paraphrase", {
    title: "限定と言い換え", passage: "この調査が示すのは、参加した三十人の傾向に限られる。地域全体の人々にも同じ結果が出るとは断定できない。", prompt: "「限られる」の言い換えとして最も適切なものを選びなさい。",
    choices: [["A", "三十人についてのみ成り立つ範囲に絞られる"], ["B", "地域全体に必ず成り立つ", "限定を普遍へ広げている。"], ["C", "調査結果には意味がない", "適用範囲の限定であり価値の全否定ではない。"], ["D", "三十人全員が同じ回答をした", "傾向と全員一致は異なる。"]],
    correctAnswer: "A", evidence: "直後に地域全体への一般化を否定している。", explanation: "限定は主張の適用範囲を狭める働き。調査を無価値にするのではなく、三十人を越えて断定しないという意味。", questionType: "paraphrase", grammarPoint: "限定", vocabularyTags: ["限定", "一般化"], reviewTags: ["言い換え", "範囲"],
  }),
  problem(10, "modern-synonyms-paraphrase", {
    title: "強さを保つ言い換え", passage: "新しい方法は作業時間を減らす可能性があるが、どの場面でも同じ効果を保証するものではない。", prompt: "本文を過不足なく言い換えたものを選びなさい。",
    choices: [["A", "新しい方法は必ず作業時間を半減させる", "可能性を必然にし、半減という量も追加。"], ["B", "新しい方法は一切効果がない", "可能性を認める前半を消している。"], ["C", "効果は期待できるが、場面によっては同じ効果にならない"], ["D", "場面を選べば失敗することは絶対にない", "保証しないという留保と逆。"]],
    correctAnswer: "C", evidence: "「可能性がある」と「どの場面でも保証しない」の両方を保持する。", explanation: "適切な言い換えは主張の強さを変えない。Cだけが期待と条件差の双方を残している。", questionType: "paraphrase", grammarPoint: "言い換え・主張の強さ", vocabularyTags: ["可能性", "保証"], reviewTags: ["言い換え", "言い過ぎ"],
  }),

  problem(11, "modern-connectors-logic", {
    title: "対比の接続語", passage: "紙の本はページの位置を手掛かりにできる。（　）、電子資料は検索によって必要な語へすぐ移動できる。", prompt: "空欄に最も適切な接続語を選びなさい。",
    choices: [["A", "したがって", "因果ではなく二つの媒体の特徴を並べている。"], ["B", "一方"], ["C", "たとえば", "後文は前文の具体例ではない。"], ["D", "つまり", "同内容の言い換えではない。"]],
    correctAnswer: "B", evidence: "紙の本と電子資料という二項の異なる特徴を並べる。", explanation: "予想外の展開ではなく対比なので「一方」。前後は優劣でなく異なる利点を示す。", questionType: "connector", grammarPoint: "対比", vocabularyTags: ["一方", "対比"], reviewTags: ["接続語", "対比"],
  }),
  problem(12, "modern-connectors-logic", {
    title: "逆接を選ぶ", passage: "資料の量は十分だった。（　）、問いに関係する箇所を選べず、説明は不明確になった。", prompt: "空欄に最も適切な接続語を選びなさい。",
    choices: [["A", "しかし"], ["B", "だから", "資料が十分なら説明が明確になるという予想に反する後文。"], ["C", "たとえば", "後文は資料量の例ではなく逆の結果。"], ["D", "さらに", "同方向の追加ではない。"]],
    correctAnswer: "A", evidence: "十分な資料という好条件に反して、説明が不明確という結果。", explanation: "前文から予想される結果を後文が裏切るため逆接。「しかし」が適切。", questionType: "connector", grammarPoint: "逆接", vocabularyTags: ["しかし", "逆接"], reviewTags: ["接続語", "予想"],
  }),
  problem(13, "modern-connectors-logic", {
    title: "因果を表す接続", passage: "要点を先に示した。（　）、聞き手は後の具体例を何の説明か理解しやすくなった。", prompt: "空欄に入る接続語を選びなさい。",
    choices: [["A", "ところが", "予想に反する結果ではない。"], ["B", "そのため"], ["C", "一方", "二項対比ではない。"], ["D", "言い換えれば", "後文は同内容の言い換えでなく効果。"]],
    correctAnswer: "B", evidence: "要点先示しが原因、理解しやすさが結果。", explanation: "行為から効果が生じる因果関係なので「そのため」。矢印は前→後。", questionType: "connector", grammarPoint: "因果", vocabularyTags: ["そのため", "因果"], reviewTags: ["接続語", "原因結果"],
  }),
  problem(14, "modern-connectors-logic", {
    title: "例示の働き", passage: "道具は使い方によって役割を変える。たとえば、同じ付箋でも、目印にも分類の札にもなる。", prompt: "後文の役割を選びなさい。",
    choices: [["A", "前文を否定する反例", "前文の主張を具体的に支えている。"], ["B", "前文の一般論を具体化する例"], ["C", "前文から導く最終結論", "具体例であり結論ではない。"], ["D", "別の話題への転換", "道具の役割という同じ話題。"]],
    correctAnswer: "B", evidence: "接続語「たとえば」と付箋の具体的な用途。", explanation: "一般論「道具は役割を変える」を付箋という個別例で理解しやすくしている。例から一般論の範囲以上を断定しない。", questionType: "logic", grammarPoint: "例示", vocabularyTags: ["たとえば", "例示"], reviewTags: ["接続語", "一般具体"],
  }),
  problem(15, "modern-connectors-logic", {
    title: "複数の論理関係", passage: "記録は過去を保存するだけではない。言い換えれば、次の判断を支える材料でもある。もっとも、記録された数値だけで状況のすべてが分かるわけではない。", prompt: "二つの接続表現の働きの組合せを選びなさい。",
    choices: [["A", "「言い換えれば」＝対比、「もっとも」＝因果", "前者は同内容の再表現、後者は留保。"], ["B", "「言い換えれば」＝言い換え、「もっとも」＝留保"], ["C", "「言い換えれば」＝例示、「もっとも」＝結論", "具体例も最終結論も示していない。"], ["D", "両方とも単純な追加", "論理機能が異なる。"]],
    correctAnswer: "B", evidence: "第二文は記録の役割を別表現にし、第三文はその効用の範囲を狭める。", explanation: "言い換えは理解を補い、留保は主張を全面化しない。二つを追うと「記録は役立つが万能ではない」という中心が残る。", questionType: "matching", grammarPoint: "言い換え・留保", vocabularyTags: ["言い換え", "留保"], reviewTags: ["接続語", "複合論理"],
  }),

  problem(16, "modern-context-meaning", {
    title: "定義から語義を取る", passage: "ここでいう「余白」とは、何も存在しない場所ではない。次の考えを受け入れるため、結論を急がずに残しておく時間のことである。", prompt: "本文の「余白」の意味を選びなさい。",
    choices: [["A", "紙面の印刷されていない部分だけ", "本文は「ここでいう」と比喩的定義を示す。"], ["B", "考えを受け入れるため結論を急がない時間"], ["C", "何も考えず作業を放棄する時間", "受容のために意図的に残す時間で、放棄ではない。"], ["D", "必ず正解が出るまで待つ時間", "必然性や正解保証はない。"]],
    correctAnswer: "B", evidence: "「〜のことである」と本文内で直接定義される。", explanation: "日常語の空白ではなく、思考上の比喩として再定義される。定義文を最優先して選ぶ。", questionType: "context", grammarPoint: "文脈定義", vocabularyTags: ["余白", "比喩"], reviewTags: ["文脈語義", "定義"],
  }),
  problem(17, "modern-context-meaning", {
    title: "限定の範囲", passage: "この方法は、少なくとも短い説明を整理する際には有効である。長い論文にも同じように使えるかは、別に検討しなければならない。", prompt: "筆者が確実に認めている範囲を選びなさい。",
    choices: [["A", "あらゆる文章", "長い論文への適用を保留している。"], ["B", "短い説明の整理"], ["C", "長い論文だけ", "確実とされる対象と逆。"], ["D", "文章以外のすべての活動", "本文にない範囲へ広げている。"]],
    correctAnswer: "B", evidence: "「少なくとも」「短い説明を整理する際には」で範囲を限定。", explanation: "限定表現の内側だけが確実な主張。長い論文について否定も肯定も確定していない。", questionType: "context", grammarPoint: "限定", vocabularyTags: ["少なくとも", "限定"], reviewTags: ["範囲", "断定"],
  }),
  problem(18, "modern-context-meaning", {
    title: "留保を読む", passage: "観察回数を増やせば傾向は見えやすくなる。ただし、回数が多いだけで観察の偏りが消えるとは限らない。", prompt: "「ただし」以降の働きを選びなさい。",
    choices: [["A", "前文を全面的に取り消す", "回数増加の利点自体は認めている。"], ["B", "前文の成立範囲に条件を付け、過度な一般化を防ぐ"], ["C", "回数を減らすべきだと命令する", "命令はしていない。"], ["D", "観察と無関係な話へ移る", "同じ観察方法の限界を述べる。"]],
    correctAnswer: "B", evidence: "利点を認めた後、「多いだけで…とは限らない」と限界を付す。", explanation: "留保は主張を捨てず、条件や例外を残す。ここでは回数の多さと偏りのなさを同一視しない。", questionType: "logic", grammarPoint: "留保", vocabularyTags: ["ただし", "留保"], reviewTags: ["留保", "一般化"],
  }),
  problem(19, "modern-context-meaning", {
    title: "譲歩後の中心主張", passage: "確かに、短い見出しは内容を素早く伝える。しかし、見出しだけで複雑な理由まで理解したと思うべきではない。", prompt: "筆者の中心主張を選びなさい。",
    choices: [["A", "短い見出しには利点が一切ない", "冒頭で利点を認めている。"], ["B", "見出しは複雑な理由を完全に説明する", "見出しだけで複雑な理由を理解したと思うべきでないという後文と逆である。"], ["C", "見出しの利点は認めつつ、それだけで深い理解とみなさない"], ["D", "長い文章なら必ず正しい", "長さと正しさの関係は本文にない。"]],
    correctAnswer: "C", evidence: "「確かに」で利点を譲歩し、「しかし」後に理解の限界を置く。", explanation: "譲歩部分Aを認めたうえで、筆者はBを中心に主張する。全面否定にも全面肯定にもしていないCが適切。", questionType: "content", grammarPoint: "譲歩・逆接", vocabularyTags: ["確かに", "譲歩"], reviewTags: ["中心主張", "譲歩"],
  }),
  problem(20, "modern-context-meaning", {
    title: "限定・評価・留保の総合", passage: "共有された数値は、話し合いの出発点として有用である。つまり、感想だけでなく同じ対象を見ていると確認できる。もっとも、数値の選び方自体に判断が含まれる以上、それを完全に中立な事実とみなすことには慎重であるべきだ。", prompt: "本文を最も適切にまとめたものを選びなさい。",
    choices: [["A", "数値は完全に中立なので、感想を排除すべきだ", "中立性への留保と逆で、排除も追加。"], ["B", "数値には判断が含まれるため、共有する価値はない", "出発点としての有用性を消している。"], ["C", "数値は共有の基盤として有用だが、選択の判断を含む点には注意が必要だ"], ["D", "数値と感想は常に同じ内容を示す", "両者の区別をなくしている。"]],
    correctAnswer: "C", evidence: "第一・二文が有用性を評価し、「もっとも」以降が中立性への留保を示す。", explanation: "評価と留保を両方残すことが要約の条件。Cは有用性を認めつつ、数値選択にも判断があるという限界を保持する。", questionType: "content", grammarPoint: "評価・言い換え・留保", vocabularyTags: ["評価", "留保", "中立"], reviewTags: ["複合論理", "要約", "言い過ぎ"],
  }),
] as const;
