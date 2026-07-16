export type EnglishUsageArea =
  | "context-vocabulary"
  | "synonym-paraphrase"
  | "word-form"
  | "collocation"
  | "phrasal-preposition"
  | "verb-usage"
  | "noun-adjective-adverb"
  | "conversation-notice";

export type EnglishUsageDifficulty = "basic" | "standard" | "ct-prep";
export type EnglishUsageQuestionType =
  | "single-choice"
  | "multiple-select"
  | "fill-blank"
  | "matching"
  | "ordering"
  | "dialogue-email";

export type EnglishUsageChoice = Readonly<{
  id: string;
  text: string;
  reason: string;
}>;

export type EnglishUsageProblem = Readonly<{
  id: string;
  slug: string;
  subjectId: "english";
  unitId: "vocab" | "grammar";
  area: EnglishUsageArea;
  title: string;
  statement: string;
  questionType: EnglishUsageQuestionType;
  choices: readonly EnglishUsageChoice[];
  correctAnswer: string | readonly string[];
  correctChoiceIds: readonly string[];
  completedSentence: string;
  translationJa: string;
  detailedExplanation: string;
  distractorReasons: Readonly<Record<string, string>>;
  strategy: string;
  firstCheck: string;
  verification: string;
  commonMistake: string;
  relatedCourseIds: readonly ("vocab" | "grammar")[];
  reviewTags: readonly string[];
  mistakeTags: readonly string[];
  difficulty: EnglishUsageDifficulty;
  estimatedTime: number;
  copyrightStatus: "original";
  sourceType: "original";
  publicationStatus: "public";
  targetExpression: string;
  targetSkill: string;
  contextType: string;
  grammarPoint: string;
  vocabularyTags: readonly string[];
  acceptedOrder?: readonly string[];
  explanationJa: string;
  naturalnessNote: string;
}>;

export const ENGLISH_USAGE_AREA_META: Record<EnglishUsageArea, { label: string }> = {
  "context-vocabulary": { label: "文脈で判断する語彙" },
  "synonym-paraphrase": { label: "類義語・言い換え" },
  "word-form": { label: "語形・品詞・派生語" },
  collocation: { label: "コロケーション" },
  "phrasal-preposition": { label: "句動詞・前置詞を含む語法" },
  "verb-usage": { label: "動詞の語法" },
  "noun-adjective-adverb": { label: "名詞・形容詞・副詞の語法" },
  "conversation-notice": { label: "会話・案内文での自然な表現" },
};

export const ENGLISH_USAGE_DIFFICULTY_LABEL: Record<EnglishUsageDifficulty, string> = {
  basic: "基礎",
  standard: "標準",
  "ct-prep": "共通テスト準備",
};

export const ENGLISH_USAGE_QUESTION_TYPE_LABEL: Record<EnglishUsageQuestionType, string> = {
  "single-choice": "単一選択",
  "multiple-select": "複数選択",
  "fill-blank": "空欄補充",
  matching: "対応選択",
  ordering: "並べ替え",
  "dialogue-email": "会話・メール読解",
};

type Seed = Readonly<{
  id: string;
  area: EnglishUsageArea;
  unitId: "vocab" | "grammar";
  title: string;
  difficulty: EnglishUsageDifficulty;
  questionType: EnglishUsageQuestionType;
  seconds: number;
  statement: string;
  choices: readonly (readonly [text: string, reason: string])[];
  correctIndices: readonly number[];
  completedSentence: string;
  translationJa: string;
  firstCheck: string;
  structure: string;
  neededMeaning: string;
  usage: string;
  answerReason: string;
  verification: string;
  commonMistake: string;
  strategy: string;
  reviewGuide: string;
  targetExpression: string;
  targetSkill: string;
  contextType: string;
  grammarPoint: string;
  vocabularyTags: readonly string[];
  mistakeTags: readonly string[];
  naturalnessNote: string;
  acceptedOrder?: readonly string[];
}>;

function buildProblem(seed: Seed): EnglishUsageProblem {
  const correctIndices = new Set(seed.correctIndices);
  const choices = seed.choices.map(([text, reason], index) => ({
    id: String.fromCharCode(65 + index),
    text,
    reason: `${correctIndices.has(index) ? "正答" : "誤答"}：${reason}`,
  }));
  const correctChoiceIds = choices.filter((_, index) => correctIndices.has(index)).map((choice) => choice.id);
  const ctNotes = seed.difficulty === "ct-prep"
    ? `\n\n共通テスト準備：文章全体を読む必要は、空欄前後だけで論理が確定しないときにあります。まず選択肢を品詞・意味の強さ・肯定否定で分類し、前後だけで絞れるか確認します。時間を使いすぎたら根拠が残る二択まで絞って保留し、読解問題でも「${seed.strategy}」を使って同じ語法を見抜きます。`
    : "";
  const explanationJa = [
    `1. まず見る箇所：${seed.firstCheck}`,
    `2. 文構造：${seed.structure}`,
    `3. 文脈上必要な意味：${seed.neededMeaning}`,
    `4. 正答表現の意味・語法：${seed.usage}`,
    `5. 正答を選ぶ理由：${seed.answerReason}`,
    `6. 全誤答を消す理由：各選択肢の個別理由を確認すると、品詞・構文・意味・場面のいずれかが合いません。`,
    `7. 自然な日本語訳：${seed.translationJa}`,
    `8. 関連講座への復習導線：${seed.reviewGuide}`,
  ].join("\n") + ctNotes;
  return {
    id: seed.id,
    slug: seed.id,
    subjectId: "english",
    unitId: seed.unitId,
    area: seed.area,
    title: seed.title,
    statement: seed.statement,
    questionType: seed.questionType,
    choices,
    correctAnswer: seed.questionType === "multiple-select" ? correctChoiceIds : correctChoiceIds[0],
    correctChoiceIds,
    completedSentence: seed.completedSentence,
    translationJa: seed.translationJa,
    detailedExplanation: explanationJa,
    distractorReasons: Object.fromEntries(choices.filter((_, index) => !correctIndices.has(index)).map((choice) => [choice.id, choice.reason])),
    strategy: seed.strategy,
    firstCheck: seed.firstCheck,
    verification: seed.verification,
    commonMistake: seed.commonMistake,
    relatedCourseIds: [seed.unitId],
    reviewTags: [ENGLISH_USAGE_AREA_META[seed.area].label, seed.targetSkill, ...seed.vocabularyTags],
    mistakeTags: seed.mistakeTags,
    difficulty: seed.difficulty,
    estimatedTime: seed.seconds,
    copyrightStatus: "original",
    sourceType: "original",
    publicationStatus: "public",
    targetExpression: seed.targetExpression,
    targetSkill: seed.targetSkill,
    contextType: seed.contextType,
    grammarPoint: seed.grammarPoint,
    vocabularyTags: seed.vocabularyTags,
    acceptedOrder: seed.acceptedOrder,
    explanationJa,
    naturalnessNote: seed.naturalnessNote,
  };
}

const CONTEXT_VOCABULARY: readonly Seed[] = [
  {
    id: "eng-usage-context-01-address", area: "context-vocabulary", unitId: "vocab", title: "多義語 address の文脈判断", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "The student council received several complaints about the crowded bicycle area. At Friday's meeting, members will address the problem and propose a safer layout. In this context, what does address mean?",
    choices: [["write the location on", "address a letter の意味だが、目的語がproblemなので合わない。"], ["deal with", "問題を取り上げて対処するという会議の目的に合う。"], ["speak loudly to", "人へ演説する用法ではなく、目的語はproblemである。"], ["ignore", "complaintsを受けて提案する流れと意味が逆である。"]], correctIndices: [1], completedSentence: "Members will address the problem and propose a safer layout.", translationJa: "委員たちはその問題に対処し、より安全な配置を提案する予定だ。", firstCheck: "addressの直後がthe problemで、その後にproposeが続く点", structure: "addressはwillの後の動詞で、the problemを目的語に取る。", neededMeaning: "苦情を受け、問題を取り上げて解決へ進む意味。", usage: "address a problemは『問題に対処する』という一般的な組合せ。", answerReason: "deal withだけが会議で問題を扱う流れを保つ。", verification: "deal withに置き換えても文法と因果関係が変わらない。", commonMistake: "addressを『住所』の意味だけで判断すること。", strategy: "多義語は直後の目的語と後続動作で意味を限定する", reviewGuide: "英単語ページで多義語を復習する。", targetExpression: "address a problem", targetSkill: "多義語", contextType: "school-meeting", grammarPoint: "transitive verb", vocabularyTags: ["address", "problem-solving"], mistakeTags: ["第一義だけで判断"], naturalnessNote: "address a problemは学校・仕事の正式な文脈で自然。",
  },
  {
    id: "eng-usage-context-02-maintain", area: "context-vocabulary", unitId: "vocab", title: "前後関係から maintain を選ぶ", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "The art club repaired the old display boards last month. To keep them in good condition, members now check and clean them every Friday. Which verb best describes what the club is trying to do?",
    choices: [["maintain", "定期的な点検と清掃で良い状態を保つ意味に合う。"], ["replace", "修理済みの板を交換するとは書かれていない。"], ["discover", "すでに存在する板を発見する場面ではない。"], ["estimate", "状態を数値で見積もることが目的ではない。"]], correctIndices: [0], completedSentence: "The club is trying to maintain the display boards.", translationJa: "美術部は展示板を良い状態に保とうとしている。", firstCheck: "keep them in good conditionという言い換え", structure: "try toの後に目的を表す動詞原形が必要。", neededMeaning: "修理後の良い状態を継続させること。", usage: "maintainは状態・設備・水準などを維持する他動詞。", answerReason: "本文中のkeep ... in good conditionを最も正確に言い換える。", verification: "maintainの目的語にboardsを置いて自然な他動詞文になる。", commonMistake: "修理の話からreplaceを選ぶこと。", strategy: "後続文にある定義的な言い換えを探す", reviewGuide: "英単語ページで変化と維持の語彙を復習する。", targetExpression: "maintain", targetSkill: "文脈言い換え", contextType: "club-activity", grammarPoint: "try to + verb", vocabularyTags: ["maintain", "condition"], mistakeTags: ["背景語だけで選択"], naturalnessNote: "maintain equipment/conditionは標準的な書き言葉。",
  },
  {
    id: "eng-usage-context-03-substantial", area: "context-vocabulary", unitId: "vocab", title: "程度を示す形容詞", difficulty: "standard", questionType: "fill-blank", seconds: 110,
    statement: "Attendance rose from 42 students in April to 81 in May. The organizer described this as a ___ increase, not a minor change.",
    choices: [["substantial", "ほぼ倍増した大きな変化を表し、not a minor changeとも対照になる。"], ["slight", "minorと同程度の弱い意味で、数値と対照表現に反する。"], ["temporary", "変化の期間は示されておらず、増加の大きさを表さない。"], ["random", "原因の有無ではなく増加量を評価する文脈である。"]], correctIndices: [0], completedSentence: "The organizer described this as a substantial increase, not a minor change.", translationJa: "主催者はこれを小さな変化ではなく、大幅な増加だと表現した。", firstCheck: "42から81という数値とnot a minor change", structure: "冠詞aと名詞increaseの間に程度を表す形容詞が入る。", neededMeaning: "小さくない、かなり大きい増加。", usage: "substantialは量・程度がかなり大きいことを客観的に示す。", answerReason: "数値の大幅増とminorの否定を同時に満たす。", verification: "substantial increaseは自然なコロケーションで品詞も形容詞。", commonMistake: "temporaryを『変化した』というだけで選ぶこと。", strategy: "数値と対比語から必要な程度を決める", reviewGuide: "英単語ページで程度を表す形容詞を復習する。", targetExpression: "substantial increase", targetSkill: "程度語", contextType: "data-report", grammarPoint: "adjective before noun", vocabularyTags: ["substantial", "increase"], mistakeTags: ["程度の読み違い"], naturalnessNote: "substantial increaseは報告文で一般的。",
  },
  {
    id: "eng-usage-context-04-consequence", area: "context-vocabulary", unitId: "vocab", title: "原因と結果を示す抽象語", difficulty: "standard", questionType: "single-choice", seconds: 110,
    statement: "The library extended its weekend hours. As a consequence, more students were able to use the study rooms before exams. Which word best captures the relation?",
    choices: [["consequence", "開館時間延長の結果として利用者が増えた関係を表す。"], ["purpose", "利用増が当初の目的だったとは本文から確定せず、As a consequenceとも合わない。"], ["contrast", "二文は反対関係ではなく原因と結果でつながる。"], ["exception", "一般則への例外を示す内容ではない。"]], correctIndices: [0], completedSentence: "As a consequence, more students could use the rooms.", translationJa: "その結果、より多くの生徒が自習室を利用できた。", firstCheck: "As a consequenceの前後にある出来事の順序", structure: "接続的な前置詞句が第二文全体を第一文の結果として結ぶ。", neededMeaning: "時間延長によって生じた結果。", usage: "as a consequenceは『その結果』という因果を示す。", answerReason: "延長→利用増という向きを保てる。", verification: "thereforeに置き換えても論理が保たれる。", commonMistake: "望ましい結果だからpurposeと考えること。", strategy: "出来事を矢印で結び、原因と目的を区別する", reviewGuide: "英単語ページで論理関係の語彙を復習する。", targetExpression: "as a consequence", targetSkill: "因果関係", contextType: "library-notice", grammarPoint: "linking phrase", vocabularyTags: ["consequence", "cause-effect"], mistakeTags: ["結果と目的の混同"], naturalnessNote: "as a consequenceは中立的な結果にも使える。",
  },
  {
    id: "eng-usage-context-05-limited", area: "context-vocabulary", unitId: "vocab", title: "限定表現を文脈から選ぶ", difficulty: "ct-prep", questionType: "multiple-select", seconds: 150,
    statement: "A survey of 28 volunteers found that most preferred shorter meetings. The report says, 'The result is useful, but it is limited because the participants chose to join the survey.' Which TWO statements match limited here? Choose two. No partial credit.",
    choices: [["The result may not represent every club member.", "自発参加者だけの小さな標本という限界を正しく述べる。"], ["The result is completely useless.", "useful, butと明示され、全面否定は強すぎる。"], ["The finding should be interpreted within the survey conditions.", "調査条件の範囲内で解釈するという限定に合う。"], ["The survey proves that all students dislike meetings.", "対象を全生徒へ広げ、preferenceをdislikeへ強めている。"]], correctIndices: [0, 2], completedSentence: "The result is useful, but its meaning is limited to the survey conditions.", translationJa: "結果は有用だが、その意味は調査条件の範囲に限られる。", firstCheck: "28 volunteersとchose to join、さらにuseful, but", structure: "limitedは補語の形容詞で、because節が限定の理由を示す。", neededMeaning: "無価値ではないが、一般化できる範囲が狭いこと。", usage: "limitedは数量だけでなく、適用範囲が制約される意味でも使う。", answerReason: "AとCだけが有用性を残しつつ一般化を避ける。", verification: "二つを合わせると本文の譲歩と理由をどちらも保持する。", commonMistake: "limitedをuselessと同じ強さで解釈すること。", strategy: "限定語の前後にある譲歩と理由を両方残す", reviewGuide: "英単語ページで限定・留保表現を復習する。", targetExpression: "limited", targetSkill: "限定と一般化", contextType: "survey-report", grammarPoint: "subject complement", vocabularyTags: ["limited", "survey"], mistakeTags: ["意味を強めすぎる"], naturalnessNote: "limited evidence/resultは研究・報告文で自然。",
  },
  {
    id: "eng-usage-context-06-available", area: "context-vocabulary", unitId: "vocab", title: "案内メールの available", difficulty: "ct-prep", questionType: "dialogue-email", seconds: 150,
    statement: "Email from Harbor Learning Center: 'The 3:00 workshop is full. Two places are still available in the 4:30 session. Reply by noon if you would like one.' What does available mean here?",
    choices: [["free for someone to take", "4:30の枠が二つ残り、申込み可能という意味。"], ["without any fee", "無料かどうかは示されず、場所の空きについて述べている。"], ["easy to understand", "workshopの説明の難易度ではない。"], ["required for everyone", "希望者に返信を求めており、全員必須ではない。"]], correctIndices: [0], completedSentence: "Two places are still available in the 4:30 session.", translationJa: "4時30分の回には、まだ二人分の空きがある。", firstCheck: "3:00 is fullとの対比とTwo places", structure: "availableはplacesを説明する補語で、stillが残存を示す。", neededMeaning: "予約・申込みに使える空きがあること。", usage: "席・時間・商品などが利用可能、入手可能という意味。", answerReason: "fullの反対として空き枠を示すAが一意。", verification: "reply if you would like oneが、残った枠を取れることを裏付ける。", commonMistake: "freeを『無料』とだけ理解してBを選ぶこと。", strategy: "案内文では数量・締切・対比から語義を決める", reviewGuide: "英単語ページで案内文の基本語彙を復習する。", targetExpression: "available", targetSkill: "案内文語彙", contextType: "email", grammarPoint: "adjective complement", vocabularyTags: ["available", "booking"], mistakeTags: ["freeの多義性混同"], naturalnessNote: "places are availableは予約案内で自然。",
  },
  {
    id: "eng-usage-context-07-decline", area: "context-vocabulary", unitId: "vocab", title: "変化を示す decline", difficulty: "standard", questionType: "single-choice", seconds: 110,
    statement: "The number of disposable cups used in the cafeteria fell from 600 to 390 per week after reusable cups were introduced. Which verb best summarizes the change?",
    choices: [["declined", "600から390へ数が減少した変化を中立的に表す。"], ["expanded", "増加を示し、数値の方向と逆。"], ["remained", "変化しない意味で、210の減少と矛盾する。"], ["recovered", "以前の良い状態へ戻るという評価は示されていない。"]], correctIndices: [0], completedSentence: "The number of disposable cups declined after reusable cups were introduced.", translationJa: "再利用カップの導入後、使い捨てカップの数は減少した。", firstCheck: "600から390への数値変化", structure: "The numberが単数主語で、過去の変化を示す動詞が必要。", neededMeaning: "数量が下がること。", usage: "declineは数・割合・水準が減少する自動詞。", answerReason: "数値の方向を評価語なしに正確に要約する。", verification: "fellをdeclinedへ置き換えても文意が変わらない。", commonMistake: "環境に良い結果だからrecoveredを選ぶこと。", strategy: "評価より先に数値の増減方向を確認する", reviewGuide: "英単語ページで変化動詞を復習する。", targetExpression: "decline", targetSkill: "数値変化", contextType: "school-data", grammarPoint: "intransitive verb", vocabularyTags: ["decline", "number"], mistakeTags: ["評価と変化の混同"], naturalnessNote: "the number declinedは報告文で自然。",
  },
  {
    id: "eng-usage-context-08-critical", area: "context-vocabulary", unitId: "vocab", title: "評価語 critical の意味", difficulty: "ct-prep", questionType: "single-choice", seconds: 150,
    statement: "Mika praised the app's clear design. She added, however, that checking the source of each fact was critical because students might otherwise repeat inaccurate information. What does critical mean?",
    choices: [["extremely important", "誤情報を避けるために情報源確認が不可欠だという意味。"], ["expressing only negative opinions", "アプリを称賛しており、批判的な態度だけを表していない。"], ["dangerous by itself", "確認行為そのものが危険だとは述べていない。"], ["optional", "otherwise以下のリスクと意味が逆。"]], correctIndices: [0], completedSentence: "Checking the source of each fact was critical.", translationJa: "各事実の情報源を確認することが極めて重要だった。", firstCheck: "however後の主張とbecause、otherwise以下", structure: "criticalは主語Checking ...を説明する補語。", neededMeaning: "誤情報を繰り返さないために極めて重要であること。", usage: "criticalには『批判的な』以外に『極めて重要な』がある。", answerReason: "because節が重要性の理由を明示する。", verification: "essentialへ置き換えて論理が保たれる。", commonMistake: "criticalを『批判的な』だけで選ぶこと。", strategy: "多義語の意味を理由節とotherwiseの結果で確定する", reviewGuide: "英単語ページで評価を示す多義語を復習する。", targetExpression: "critical", targetSkill: "評価語の多義性", contextType: "app-review", grammarPoint: "adjective complement", vocabularyTags: ["critical", "source"], mistakeTags: ["訳語固定"], naturalnessNote: "critical importanceの意味は正式な文脈でも一般的。",
  },
  {
    id: "eng-usage-context-09-reluctant", area: "context-vocabulary", unitId: "vocab", title: "行動から感情語を推定", difficulty: "basic", questionType: "fill-blank", seconds: 90,
    statement: "Ken agreed to lead the discussion only after his teacher asked him twice. He was clearly ___ at first.",
    choices: [["reluctant", "二度頼まれてようやく同意したことから、最初は気が進まなかったと分かる。"], ["eager", "進んでやりたいならonly after two requestsと矛盾する。"], ["certain", "確信の有無ではなく引き受ける意欲が焦点。"], ["grateful", "感謝を示す言動はない。"]], correctIndices: [0], completedSentence: "He was clearly reluctant at first.", translationJa: "彼は最初、明らかに気が進まなかった。", firstCheck: "only afterとasked him twice", structure: "be動詞の後に主語の態度を表す形容詞が必要。", neededMeaning: "すぐには引き受けたくない態度。", usage: "reluctantは『気が進まない』で、reluctant to doの形も取る。", answerReason: "同意までに二度の依頼が必要だった行動と一致する。", verification: "eagerと反対の行動になっていることを確認する。", commonMistake: "最終的に同意したのでeagerと考えること。", strategy: "感情語は発言より前後の行動を根拠にする", reviewGuide: "英単語ページで態度を示す形容詞を復習する。", targetExpression: "reluctant", targetSkill: "感情推定", contextType: "class-discussion", grammarPoint: "subject complement", vocabularyTags: ["reluctant", "attitude"], mistakeTags: ["結果だけで感情判断"], naturalnessNote: "reluctant at firstは自然な態度描写。",
  },
  {
    id: "eng-usage-context-10-consistent", area: "context-vocabulary", unitId: "vocab", title: "データ説明の consistent", difficulty: "standard", questionType: "single-choice", seconds: 120,
    statement: "The team measured the room temperature at the same time for five days. The readings were 21.2, 21.3, 21.1, 21.2, and 21.3°C. Which adjective best describes the readings?",
    choices: [["consistent", "値のばらつきが小さく、日ごとにほぼ一定している。"], ["contradictory", "互いに両立しない主張ではなく、近い測定値である。"], ["dramatic", "変化幅0.2℃は劇的とはいえない。"], ["unavailable", "測定値はすべて提示されている。"]], correctIndices: [0], completedSentence: "The readings were consistent across the five days.", translationJa: "測定値は5日間を通じて安定していた。", firstCheck: "五つの数値の範囲が21.1〜21.3と狭いこと", structure: "readingsを説明する叙述用法の形容詞が必要。", neededMeaning: "値同士がよく一致し、安定していること。", usage: "consistentは結果・行動・説明が互いに矛盾せず安定する意味。", answerReason: "数値の小さなばらつきを正確に表す。", verification: "最大値と最小値の差0.2℃を確認する。", commonMistake: "同じ値が完全一致しないとconsistentを使えないと思うこと。", strategy: "形容詞の強さを実際の数値範囲と照合する", reviewGuide: "英単語ページで評価語を復習する。", targetExpression: "consistent", targetSkill: "データ評価語", contextType: "measurement-report", grammarPoint: "predicate adjective", vocabularyTags: ["consistent", "reading"], mistakeTags: ["完全一致を要求"], naturalnessNote: "consistent readingsは測定報告で自然。",
  },
];

const SYNONYM_PARAPHRASE: readonly Seed[] = [
  {
    id: "eng-usage-synonym-01-likely", area: "synonym-paraphrase", unitId: "vocab", title: "確実性を保つ言い換え", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "The weather report says rain is likely this afternoon. Which sentence keeps the same level of certainty?",
    choices: [["It will probably rain this afternoon.", "probablyはlikelyと同程度の高い可能性を表す。"], ["It will certainly rain this afternoon.", "certainlyは確実だと言い切り、元より強い。"], ["Rain is impossible this afternoon.", "可能性を否定し、意味が逆。"], ["It rained yesterday afternoon.", "時制も内容も異なる。"]], correctIndices: [0], completedSentence: "It will probably rain this afternoon.", translationJa: "今日の午後はおそらく雨が降るだろう。", firstCheck: "likelyが示す確実性の強さ", structure: "be likelyと助動詞will + probablyの対応。", neededMeaning: "確実ではないが、可能性が高いこと。", usage: "likelyとprobablyはどちらも高い可能性を示す。", answerReason: "Aだけが時点と確実性を保つ。", verification: "certainやpossibleより強さが変わっていないか確認する。", commonMistake: "likelyをcertainと同じと考えること。", strategy: "言い換えでは内容だけでなく断定の強さを保存する", reviewGuide: "英単語ページで確実性表現を復習する。", targetExpression: "be likely to / probably", targetSkill: "確実性", contextType: "weather-report", grammarPoint: "modal meaning", vocabularyTags: ["likely", "probably"], mistakeTags: ["確実性の強めすぎ"], naturalnessNote: "will probably rainは中立的な予報表現。",
  },
  {
    id: "eng-usage-synonym-02-objective-subjective", area: "synonym-paraphrase", unitId: "vocab", title: "客観・主観表現の対応", difficulty: "standard", questionType: "matching", seconds: 120,
    statement: "Choose the correct match: (1) The hall holds 180 people. (2) I think the hall feels welcoming. Which labels fit?",
    choices: [["(1) objective fact / (2) subjective opinion", "測定可能な定員と個人の感想を正しく区別する。"], ["(1) subjective opinion / (2) objective fact", "二つの性質を逆にしている。"], ["both objective facts", "welcomingは話者の評価で、同じ手続きで確定する数値ではない。"], ["both subjective opinions", "定員180人は確認可能な事実として示される。"]], correctIndices: [0], completedSentence: "The capacity is an objective fact; the feeling is a subjective opinion.", translationJa: "定員は客観的事実で、居心地の印象は主観的意見である。", firstCheck: "数値として確認できるか、話者のI thinkが付くか", structure: "二文をそれぞれ名詞句ラベルへ対応させる。", neededMeaning: "共有可能な事実と個人評価の区別。", usage: "objectiveは観察手続きで確認でき、subjectiveは個人の感じ方に依存する。", answerReason: "(1)は数値、(2)はI thinkを伴う評価。", verification: "別の人が同じ定員を確認できても、welcomingの感じ方は異なり得る。", commonMistake: "肯定的な文をすべてsubjectiveとすること。", strategy: "情報の出所が測定か個人評価かを見る", reviewGuide: "英単語ページで抽象的な対義語を復習する。", targetExpression: "objective / subjective", targetSkill: "意味対応", contextType: "facility-review", grammarPoint: "adjective meaning", vocabularyTags: ["objective", "subjective"], mistakeTags: ["事実と意見の混同"], naturalnessNote: "objective fact / subjective opinionは標準的な対応。",
  },
  {
    id: "eng-usage-synonym-03-improve-increase", area: "synonym-paraphrase", unitId: "vocab", title: "increase と improve の意味領域", difficulty: "standard", questionType: "single-choice", seconds: 110,
    statement: "After the new signs were installed, visitors found the route more easily. The signs did not change the number of entrances; they ___ access to the building.",
    choices: [["improved", "利用しやすさという質を向上させた。"], ["increased", "入口数は変わらないと明示され、数量増加ではない。"], ["counted", "accessを数える意味になり文脈に合わない。"], ["removed", "利用しやすくなった結果と逆。"]], correctIndices: [0], completedSentence: "They improved access to the building.", translationJa: "その案内表示は建物へのアクセスのしやすさを改善した。", firstCheck: "number did not changeとmore easily", structure: "他動詞がaccessを目的語に取る。", neededMeaning: "数量ではなく利用のしやすさを良くすること。", usage: "improveは質・状態を向上させ、increaseは数・量を増やす。", answerReason: "more easilyを質的改善として表せる。", verification: "入口数が同じという条件と矛盾しない。", commonMistake: "日本語の『増進』の感覚でincreaseを選ぶこと。", strategy: "変化が量か質かを先に分類する", reviewGuide: "英単語ページで変化動詞を復習する。", targetExpression: "improve access", targetSkill: "類義語区別", contextType: "public-signage", grammarPoint: "transitive verb", vocabularyTags: ["improve", "increase", "access"], mistakeTags: ["量と質の混同"], naturalnessNote: "improve accessは利用可能性を高める自然な表現。",
  },
  {
    id: "eng-usage-synonym-04-encouraged", area: "synonym-paraphrase", unitId: "vocab", title: "許可・義務・提案の強さ", difficulty: "ct-prep", questionType: "multiple-select", seconds: 150,
    statement: "Notice: 'Students are encouraged to bring a reusable bottle, but doing so is not required.' Which TWO statements preserve the notice? Choose two. No partial credit.",
    choices: [["Bringing a reusable bottle is recommended.", "encouragedを義務化せず提案として保つ。"], ["Every student must bring a reusable bottle.", "not requiredをmustへ変え、強すぎる。"], ["Students may choose not to bring one.", "義務ではないため、持参しない選択も可能。"], ["Students are not allowed to bring one.", "推奨と禁止を逆にしている。"]], correctIndices: [0, 2], completedSentence: "Bringing a reusable bottle is recommended, but optional.", translationJa: "再利用ボトルの持参は推奨されるが、任意である。", firstCheck: "encouragedとnot requiredの両方", structure: "受け身の推奨表現と、butによる義務否定。", neededMeaning: "望ましいが必須ではないこと。", usage: "be encouraged toは推奨、be required toは義務。", answerReason: "Aが推奨、Cが任意性を保持する。", verification: "二文を合わせてもmustやprohibitedという強い意味が加わらない。", commonMistake: "学校案内のencouragedを命令と解釈すること。", strategy: "許可・提案・義務・禁止の四段階へ選択肢を分類する", reviewGuide: "英文法ページで助動詞的な意味の強さを復習する。", targetExpression: "be encouraged to", targetSkill: "義務の強さ", contextType: "school-notice", grammarPoint: "passive recommendation", vocabularyTags: ["encourage", "require"], mistakeTags: ["提案を義務化"], naturalnessNote: "recommended but optionalは案内文で明確。",
  },
  {
    id: "eng-usage-synonym-05-not-all", area: "synonym-paraphrase", unitId: "vocab", title: "部分否定を保つ言い換え", difficulty: "ct-prep", questionType: "single-choice", seconds: 150,
    statement: "A report concludes, 'Not all students who used the planner finished tasks earlier, although many said it helped them organize their work.' Which sentence is the best paraphrase?",
    choices: [["The planner helped some students, but it did not produce the same result for everyone.", "manyの肯定とnot allの限定を両方残す。"], ["The planner never helped any student.", "many said it helpedと逆。"], ["Every student finished earlier because of the planner.", "not allをallへ変え、因果も断定している。"], ["The report gives no information about students' views.", "many saidという意見情報を無視する。"]], correctIndices: [0], completedSentence: "The planner helped some students, but not everyone had the same result.", translationJa: "手帳は一部の生徒に役立ったが、全員が同じ結果を得たわけではない。", firstCheck: "Not allとalthough manyの二つの範囲表現", structure: "部分否定の主節と、利点を認める譲歩節。", neededMeaning: "効果を全面否定も全面肯定もしないこと。", usage: "not allは『すべてが〜とは限らない』という部分否定。", answerReason: "someへの利点とnot everyoneを同時に保持する。", verification: "元文の肯定・否定対象と範囲が変わっていない。", commonMistake: "not allをnoneと同じにすること。", strategy: "数量語all/many/some/noneを対応表にして比較する", reviewGuide: "英文法ページで部分否定と譲歩を復習する。", targetExpression: "not all", targetSkill: "主張の言い換え", contextType: "report-summary", grammarPoint: "partial negation", vocabularyTags: ["not all", "although"], mistakeTags: ["部分否定と全否定の混同"], naturalnessNote: "not everyone had the same resultは自然な部分否定。",
  },
  {
    id: "eng-usage-synonym-06-purpose-cause", area: "synonym-paraphrase", unitId: "vocab", title: "目的と原因の言い換え", difficulty: "standard", questionType: "single-choice", seconds: 120,
    statement: "The committee moved the start time so that students using the late bus could attend. Which sentence preserves the purpose?",
    choices: [["The time was moved to enable late-bus users to attend.", "so that節の目的をto enableで保持する。"], ["The time was moved because late-bus users had attended.", "目的を過去の原因へ変えている。"], ["Late-bus users attended, so the time became unnecessary.", "結果も評価も元文にない。"], ["The committee prevented late-bus users from attending.", "参加可能にする意味と逆。"]], correctIndices: [0], completedSentence: "The time was moved to enable late-bus users to attend.", translationJa: "遅いバスを使う生徒が参加できるよう、開始時刻が変更された。", firstCheck: "so that節が変更の目的を示すこと", structure: "so that + couldとto enable A to doの対応。", neededMeaning: "変更によって参加を可能にする目的。", usage: "enable A to doは『Aが〜できるようにする』。", answerReason: "時制と目的の方向を変えない。", verification: "Why was the time moved?への答えが両文で同じ。", commonMistake: "so thatをbecauseと機械的に置き換えること。", strategy: "理由を問うとき、過去原因か未来目的かを分ける", reviewGuide: "英文法ページで目的表現を復習する。", targetExpression: "so that / enable A to", targetSkill: "目的の言い換え", contextType: "schedule-change", grammarPoint: "purpose clause", vocabularyTags: ["enable", "purpose"], mistakeTags: ["原因と目的の混同"], naturalnessNote: "enable A to attendは正式な案内にも自然。",
  },
];

const WORD_FORM: readonly Seed[] = [
  {
    id: "eng-usage-form-01-effective", area: "word-form", unitId: "grammar", title: "形容詞 effective の選択", difficulty: "basic", questionType: "fill-blank", seconds: 90,
    statement: "The new reminder was ___ in reducing missed deadlines.", choices: [["effective", "be動詞の後の補語として形容詞が必要で、意味も『効果的』で合う。"], ["effectively", "副詞なのでwasの補語として不適切。"], ["effect", "名詞で、冠詞なしでは補語にならない。"], ["effectiveness", "名詞であり、ここでは性質を表す形容詞が必要。"]], correctIndices: [0], completedSentence: "The new reminder was effective in reducing missed deadlines.", translationJa: "新しいリマインダーは締切忘れを減らすのに効果的だった。", firstCheck: "wasとin reducingの間", structure: "SVCの補語位置なので形容詞。", neededMeaning: "対策が実際に効果を上げたこと。", usage: "be effective in doingで『〜するのに効果的』。", answerReason: "品詞と意味の両方を満たす。", verification: "The reminder was usefulと同じ補語構造になる。", commonMistake: "動詞を修飾すると考えてeffectivelyを選ぶこと。", strategy: "空欄の直前のbe動詞から必要品詞を決める", reviewGuide: "英文法ページで品詞と文型を復習する。", targetExpression: "be effective in", targetSkill: "品詞判断", contextType: "school-task", grammarPoint: "subject complement", vocabularyTags: ["effect", "effective"], mistakeTags: ["形容詞と副詞の混同"], naturalnessNote: "effective in reducingは標準的。",
  },
  {
    id: "eng-usage-form-02-carefully", area: "word-form", unitId: "grammar", title: "副詞 carefully の選択", difficulty: "basic", questionType: "fill-blank", seconds: 90,
    statement: "Please read the safety instructions ___ before using the tool.", choices: [["carefully", "動詞readの仕方を修飾する副詞。"], ["careful", "形容詞で、名詞か補語を修飾・説明する形が必要。"], ["care", "名詞または動詞で、readを修飾できない。"], ["carefulness", "名詞であり副詞位置に合わない。"]], correctIndices: [0], completedSentence: "Please read the safety instructions carefully before using the tool.", translationJa: "道具を使う前に、安全上の指示を注意深く読んでください。", firstCheck: "空欄が動詞readの後にあること", structure: "命令文の動詞readを修飾する副詞位置。", neededMeaning: "注意を払って読むこと。", usage: "carefullyは動作の方法を表す副詞。", answerReason: "文構造と意味が一致する唯一の語形。", verification: "How should you read? Carefully.と質問できる。", commonMistake: "日本語の『注意深い』からcarefulを選ぶこと。", strategy: "修飾される語が動詞なら副詞を第一候補にする", reviewGuide: "英文法ページで形容詞と副詞を復習する。", targetExpression: "read carefully", targetSkill: "語形", contextType: "instruction", grammarPoint: "adverbial modifier", vocabularyTags: ["care", "carefully"], mistakeTags: ["副詞形の誤り"], naturalnessNote: "read carefullyは自然な指示表現。",
  },
  {
    id: "eng-usage-form-03-unreliable", area: "word-form", unitId: "grammar", title: "否定接頭辞を含む派生語", difficulty: "standard", questionType: "single-choice", seconds: 110,
    statement: "The first sensor gave a different value each minute, so its readings were considered ___.",
    choices: [["unreliable", "値が一貫しないため『信頼できない』形容詞が合う。"], ["reliably", "副詞で補語位置に合わず、意味も肯定。"], ["reliability", "名詞でwere consideredの目的格補語としてこの形では不自然。"], ["reliable", "異なる値が続く因果と意味が逆。"]], correctIndices: [0], completedSentence: "Its readings were considered unreliable.", translationJa: "その測定値は信頼できないと判断された。", firstCheck: "different value each minuteとso", structure: "consider O Cの受け身で、readingsを説明する形容詞補語。", neededMeaning: "安定せず信頼できないこと。", usage: "un- + reliableで反対の意味を作る自然な派生語。", answerReason: "否定の意味と形容詞位置を満たす。", verification: "considered reliableでは原因文と矛盾する。", commonMistake: "否定接頭辞を見落としてreliableを選ぶこと。", strategy: "品詞を決めた後、因果の肯定否定を確認する", reviewGuide: "英文法ページで接頭辞と目的格補語を復習する。", targetExpression: "unreliable", targetSkill: "派生語", contextType: "measurement", grammarPoint: "object complement passive", vocabularyTags: ["rely", "reliable", "unreliable"], mistakeTags: ["肯定否定の逆転"], naturalnessNote: "readings were considered unreliableは自然な報告表現。",
  },
  {
    id: "eng-usage-form-04-decision", area: "word-form", unitId: "grammar", title: "同一語族から名詞を選ぶ", difficulty: "standard", questionType: "single-choice", seconds: 110,
    statement: "After comparing the three routes, the group made a final ___ before lunch.", choices: [["decision", "冠詞aと形容詞finalの後に可算名詞単数が必要。"], ["decide", "動詞原形でmade a finalの後に置けない。"], ["decisive", "形容詞で、後ろに修飾する名詞がない。"], ["decisively", "副詞で冠詞の後の名詞位置に合わない。"]], correctIndices: [0], completedSentence: "The group made a final decision before lunch.", translationJa: "グループは昼食前に最終決定を下した。", firstCheck: "a finalの後ろ", structure: "冠詞+形容詞+可算名詞単数の形。", neededMeaning: "比較後に決めた内容。", usage: "decideの名詞形decisionをmake a decisionで使う。", answerReason: "品詞・数・コロケーションがすべて合う。", verification: "a final decisionを一つの名詞句として確認する。", commonMistake: "makeの後だから動詞decideを置くこと。", strategy: "限定詞と形容詞が見えたら次の名詞を探す", reviewGuide: "英文法ページで語族と名詞句を復習する。", targetExpression: "make a decision", targetSkill: "名詞派生", contextType: "group-planning", grammarPoint: "noun phrase", vocabularyTags: ["decide", "decision"], mistakeTags: ["動詞と名詞の混同"], naturalnessNote: "make a final decisionは一般的。",
  },
];

const COLLOCATION: readonly Seed[] = [
  {
    id: "eng-usage-collocation-01-attention", area: "collocation", unitId: "vocab", title: "pay attention の選択", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "Please ___ attention to the final line of the instructions.", choices: [["pay", "pay attention toが自然な固定的組合せ。"], ["spend", "時間や金には使うがattentionとは組み合わせない。"], ["make", "make attentionという組合せは成立しない。"], ["buy", "日本語直訳でも成立せず不自然。"]], correctIndices: [0], completedSentence: "Please pay attention to the final line of the instructions.", translationJa: "説明の最後の行に注意してください。", firstCheck: "attention toの直前", structure: "命令文で他動詞+名詞attention+to。", neededMeaning: "特定箇所へ注意を向けること。", usage: "pay attention toは高校英語の標準的コロケーション。", answerReason: "指示文で最も通常の組合せ。", verification: "pay attention toをまとまりとして読む。", commonMistake: "日本語から直訳してmakeなどを選ぶこと。", strategy: "名詞と結びつく標準動詞をまとまりで確認する", reviewGuide: "英単語ページでコロケーションを復習する。", targetExpression: "pay attention to", targetSkill: "コロケーション", contextType: "instruction", grammarPoint: "verb-noun-preposition", vocabularyTags: ["attention"], mistakeTags: ["直訳コロケーション"], naturalnessNote: "簡潔な指示ではpay attention toが一般的。",
  },
  {
    id: "eng-usage-collocation-02-match", area: "collocation", unitId: "vocab", title: "動詞と名詞の対応", difficulty: "standard", questionType: "matching", seconds: 120,
    statement: "Choose the correct matches: (1) ___ a requirement (2) ___ awareness (3) ___ experience.", choices: [["meet / raise / gain", "meet a requirement、raise awareness、gain experienceの標準的組合せ。"], ["raise / meet / pay", "三つの名詞に対応する動詞を入れ替えている。"], ["gain / make / reach", "gain a requirementやmake awarenessは不自然。"], ["pay / gain / meet", "pay a requirementやmeet experienceは成立しない。"]], correctIndices: [0], completedSentence: "The plan must meet the requirement, raise awareness, and help students gain experience.", translationJa: "その計画は要件を満たし、意識を高め、生徒が経験を積むのを助けなければならない。", firstCheck: "requirement、awareness、experienceの各名詞", structure: "各空欄に目的語を取る動詞原形を対応させる。", neededMeaning: "要件達成・認知向上・経験獲得。", usage: "meet/raise/gainはそれぞれの名詞と自然に結びつく。", answerReason: "Aだけが三組すべて自然。", verification: "各組を別の短文にしても自然か確認する。", commonMistake: "日本語の同じ『得る・上げる』で動詞を交換すること。", strategy: "一組ずつ確定し、三組すべて成立する選択肢を残す", reviewGuide: "英単語ページで動詞+名詞の組合せを復習する。", targetExpression: "meet / raise / gain", targetSkill: "対応コロケーション", contextType: "project-plan", grammarPoint: "parallel verbs", vocabularyTags: ["requirement", "awareness", "experience"], mistakeTags: ["コロケーション混同"], naturalnessNote: "三組とも正式・中立的。",
  },
  {
    id: "eng-usage-collocation-03-conclusion", area: "collocation", unitId: "vocab", title: "reach a conclusion", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "We reviewed all five proposals before we ___ a conclusion.", choices: [["reached", "reach a conclusionで検討後に結論へ至る。"], ["arrived", "arriveはat a conclusionなら可能だが、前置詞なしでは他動詞として使えない。"], ["touched", "結論に触れるという意味にならず不自然。"], ["built", "conclusionとの標準的組合せではない。"]], correctIndices: [0], completedSentence: "We reviewed all five proposals before we reached a conclusion.", translationJa: "私たちは結論に達する前に五つの提案をすべて検討した。", firstCheck: "a conclusionを直接目的語に取る動詞", structure: "before節の過去形他動詞。", neededMeaning: "検討を経て結論に至ること。", usage: "reach a conclusionは前置詞なしで使う。", answerReason: "文型と自然な組合せを満たす。", verification: "arrivedを使うならatが必要だと比較する。", commonMistake: "arrive atのatを落とすこと。", strategy: "動詞だけでなく必要な前置詞まで含めて覚える", reviewGuide: "英単語ページで結論表現を復習する。", targetExpression: "reach a conclusion", targetSkill: "コロケーション", contextType: "proposal-review", grammarPoint: "transitive collocation", vocabularyTags: ["reach", "conclusion"], mistakeTags: ["前置詞脱落"], naturalnessNote: "reach a conclusionは標準的。",
  },
  {
    id: "eng-usage-collocation-04-access-responsibility", area: "collocation", unitId: "vocab", title: "文脈に合うコロケーション", difficulty: "ct-prep", questionType: "multiple-select", seconds: 150,
    statement: "The media team will manage the shared photo archive. Which TWO expressions naturally describe its duties? Choose two. No partial credit.", choices: [["provide members with access to approved images", "provide A with Bとaccess toの両方が自然。"], ["take responsibility for checking file names", "take responsibility for doingが担当を引き受ける意味に合う。"], ["make access of approved images", "accessとの動詞・前置詞の組合せが不自然。"], ["pay responsibility to file names", "responsibilityはtake responsibility forとする。"]], correctIndices: [0, 1], completedSentence: "The team will provide members with access and take responsibility for checking file names.", translationJa: "チームはメンバーに利用権を提供し、ファイル名確認の責任を負う。", firstCheck: "dutiesが二つあり、正答数が2つ", structure: "provide A with Bとtake responsibility for -ing。", neededMeaning: "利用可能にすることと確認担当を負うこと。", usage: "二つとも正式な職務説明に使えるコロケーション。", answerReason: "AとBは意味・構文とも自然。", verification: "目的語と前置詞を入れ替えていないか確認する。", commonMistake: "日本語の『責任を払う』からpayを選ぶこと。", strategy: "動詞・名詞・前置詞を一つの単位として照合する", reviewGuide: "英単語ページで職務表現を復習する。", targetExpression: "provide access / take responsibility", targetSkill: "複合コロケーション", contextType: "team-duty", grammarPoint: "verb pattern", vocabularyTags: ["access", "responsibility"], mistakeTags: ["前置詞と動詞の組合せ誤り"], naturalnessNote: "職務説明として中立的。",
  },
  {
    id: "eng-usage-collocation-05-effect", area: "collocation", unitId: "vocab", title: "have an effect on", difficulty: "standard", questionType: "fill-blank", seconds: 110,
    statement: "Even a small change in lighting can ___ an effect on how colors appear.", choices: [["have", "have an effect onが自然な組合せ。"], ["do", "do an effectとは言わない。"], ["give", "この構文ではeffectを所有・発生させるhaveを使う。"], ["put", "put an effect onは不自然。"]], correctIndices: [0], completedSentence: "A small change can have an effect on how colors appear.", translationJa: "照明の小さな変化でも、色の見え方に影響を与え得る。", firstCheck: "an effect onという名詞句", structure: "助動詞canの後の動詞原形。", neededMeaning: "見え方へ影響を及ぼすこと。", usage: "have an effect on Aで『Aに影響を与える』。", answerReason: "助動詞後の形とコロケーションが一致。", verification: "affect how colors appearへ言い換えられる。", commonMistake: "日本語の『効果を与える』からgiveを選ぶこと。", strategy: "冠詞を含む名詞句ごと覚える", reviewGuide: "英単語ページでeffect/affectを復習する。", targetExpression: "have an effect on", targetSkill: "コロケーション", contextType: "design-explanation", grammarPoint: "modal + base verb", vocabularyTags: ["effect", "affect"], mistakeTags: ["直訳動詞選択"], naturalnessNote: "have an effect onは標準的。",
  },
  {
    id: "eng-usage-collocation-06-pose-problem", area: "collocation", unitId: "vocab", title: "pose a problem の意味", difficulty: "standard", questionType: "single-choice", seconds: 120,
    statement: "The narrow entrance may ___ a problem for visitors using wheelchairs.", choices: [["pose", "pose a problemで問題を引き起こす・もたらす。"], ["solve", "入口の狭さが問題を解決する流れではない。"], ["answer", "problemを『質問』として扱っており文意に合わない。"], ["pay", "problemとの組合せが成立しない。"]], correctIndices: [0], completedSentence: "The narrow entrance may pose a problem for visitors using wheelchairs.", translationJa: "狭い入口は車いす利用者に問題をもたらす可能性がある。", firstCheck: "narrow entranceとfor visitors", structure: "助動詞mayの後にproblemを目的語に取る動詞原形。", neededMeaning: "障害・困難を生じさせること。", usage: "pose a problem/challengeは正式な文章で一般的。", answerReason: "原因となる入口と影響を受ける利用者を自然に結ぶ。", verification: "cause a problemへ置き換えて意味が保たれる。", commonMistake: "poseを『ポーズを取る』だけで理解すること。", strategy: "多義動詞は後続名詞との組合せで意味を決める", reviewGuide: "英単語ページで問題・課題の表現を復習する。", targetExpression: "pose a problem", targetSkill: "コロケーション", contextType: "accessibility-report", grammarPoint: "modal + transitive verb", vocabularyTags: ["pose", "problem"], mistakeTags: ["多義語の固定"], naturalnessNote: "pose a problem forは正式で自然。",
  },
];

const PHRASAL_PREPOSITION: readonly Seed[] = [
  {
    id: "eng-usage-phrasal-01-depend", area: "phrasal-preposition", unitId: "grammar", title: "depend on の意味と構文", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "Whether the outdoor concert is held will depend ___ the weather.", choices: [["on", "depend onで『〜次第である』となり、天候が条件だと示す。"], ["at", "depend atという組合せはない。"], ["for", "depend forはこの意味の構文にならない。"], ["with", "be familiar withなどとの混同。"]], correctIndices: [0], completedSentence: "Whether the outdoor concert is held will depend on the weather.", translationJa: "屋外コンサートが開催されるかどうかは天候次第だ。", firstCheck: "開催可否とweatherの条件関係", structure: "dependは自動詞で、対象をonで導く。", neededMeaning: "結果が天候によって決まること。", usage: "depend on Aで『A次第である・Aに依存する』。", answerReason: "意味と自動詞構文が一致する。", verification: "weatherを直接目的語にせずonが必要。", commonMistake: "日本語の『〜で』からatを選ぶこと。", strategy: "自動詞は必要な前置詞まで一組で確認する", reviewGuide: "英文法ページで句動詞・前置詞を復習する。", targetExpression: "depend on", targetSkill: "自動詞語法", contextType: "event-plan", grammarPoint: "intransitive verb + preposition", vocabularyTags: ["depend", "weather"], mistakeTags: ["前置詞誤り"], naturalnessNote: "depend on the weatherは標準的。",
  },
  {
    id: "eng-usage-phrasal-02-result", area: "phrasal-preposition", unitId: "grammar", title: "result in / result from の対応", difficulty: "standard", questionType: "matching", seconds: 120,
    statement: "Choose the correct match: (1) The delay resulted ___ a signal failure. (2) The signal failure resulted ___ a delay.", choices: [["(1) from / (2) in", "結果→from→原因、原因→in→結果の向きが正しい。"], ["(1) in / (2) from", "原因と結果の向きを逆にしている。"], ["(1) on / (2) at", "resultの因果用法で使う前置詞ではない。"], ["(1) with / (2) for", "どちらもこの因果構文を作らない。"]], correctIndices: [0], completedSentence: "The delay resulted from a signal failure; the failure resulted in a delay.", translationJa: "遅延は信号障害から生じ、その信号障害は遅延を引き起こした。", firstCheck: "各文で主語が原因か結果か", structure: "result fromは結果主語、result inは原因主語。", neededMeaning: "同じ因果を反対方向から表すこと。", usage: "A results from BはA←B、B results in AはB→A。", answerReason: "Aだけが両文の矢印を保つ。", verification: "主語と前置詞の後ろをcause/effectへ置き換える。", commonMistake: "in/fromを暗記だけで入れ替えること。", strategy: "原因→結果の矢印を書いて主語位置を確認する", reviewGuide: "英文法ページで因果を示す前置詞を復習する。", targetExpression: "result in / result from", targetSkill: "因果構文", contextType: "delay-report", grammarPoint: "phrasal-preposition contrast", vocabularyTags: ["result", "delay"], mistakeTags: ["因果方向の逆転"], naturalnessNote: "両構文とも正式な報告文で自然。",
  },
  {
    id: "eng-usage-phrasal-03-prevent", area: "phrasal-preposition", unitId: "grammar", title: "prevent A from doing", difficulty: "standard", questionType: "fill-blank", seconds: 110,
    statement: "The cover prevents dust ___ entering the device.", choices: [["from", "prevent A from doingの形で侵入を防ぐ。"], ["to", "prevent A to doという不定詞構文は使わない。"], ["for", "動名詞enteringを導く前置詞として不適切。"], ["by", "手段ではなく、防止される行為を示す。"]], correctIndices: [0], completedSentence: "The cover prevents dust from entering the device.", translationJa: "そのカバーはほこりが装置に入るのを防ぐ。", firstCheck: "prevents dustとenteringの間", structure: "prevent + 目的語A + from + 動名詞。", neededMeaning: "ほこりの侵入を阻止すること。", usage: "prevent A from doingはAが〜するのを防ぐ。", answerReason: "意味と構文の両方を満たす。", verification: "dustがenteringの意味上の主語になる。", commonMistake: "allow A to doから類推してtoを選ぶこと。", strategy: "動詞ごとの目的語後の型を比較する", reviewGuide: "英文法ページで動詞+前置詞+動名詞を復習する。", targetExpression: "prevent A from doing", targetSkill: "前置詞語法", contextType: "product-instruction", grammarPoint: "verb-object-preposition-gerund", vocabularyTags: ["prevent", "enter"], mistakeTags: ["不定詞との混同"], naturalnessNote: "prevent dust from enteringは自然。",
  },
  {
    id: "eng-usage-phrasal-04-deal-with", area: "phrasal-preposition", unitId: "grammar", title: "状況に合う deal with", difficulty: "ct-prep", questionType: "single-choice", seconds: 150,
    statement: "Email: 'Several participants cannot open the registration form. I have listed their device types below so that the support team can ___ the issue efficiently.'",
    choices: [["deal with", "情報を使って問題に対処するという目的に合う。"], ["take part in", "問題へ参加するのではなく解決対応を求めている。"], ["be familiar to", "be familiar withなら知識を表せるが、空欄位置と対処の意味に合わない。"], ["depend for", "depend onでも『問題に対処する』意味にはならない。"]], correctIndices: [0], completedSentence: "The support team can deal with the issue efficiently.", translationJa: "サポート担当はその問題に効率よく対処できる。", firstCheck: "cannot openという問題とsupport teamの役割", structure: "助動詞canの後に句動詞原形、issueを目的語に取る。", neededMeaning: "技術的な問題を調べて対処すること。", usage: "deal with an issue/problemは正式な文脈でも自然。", answerReason: "メールの目的である問題対応を正確に表す。", verification: "handle the issueへ置き換えて意味が保たれる。", commonMistake: "dealを『取引する』だけで理解すること。", strategy: "担当者・問題・目的から句動詞の意味を確定する", reviewGuide: "英文法ページで句動詞を復習する。", targetExpression: "deal with", targetSkill: "文脈句動詞", contextType: "support-email", grammarPoint: "phrasal verb", vocabularyTags: ["deal with", "issue"], mistakeTags: ["句動詞の第一義固定"], naturalnessNote: "deal with an issueは中立的。",
  },
];

const VERB_USAGE: readonly Seed[] = [
  {
    id: "eng-usage-verb-01-avoid", area: "verb-usage", unitId: "grammar", title: "avoidの目的語", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "To avoid ___ the same file twice, check its name before uploading it.", choices: [["uploading", "avoidは動名詞を目的語に取る。"], ["to upload", "avoidの直後にto不定詞は取らない。"], ["uploaded", "過去分詞だけでは目的語にならない。"], ["upload", "動詞原形を直接置けない。"]], correctIndices: [0], completedSentence: "To avoid uploading the same file twice, check its name.", translationJa: "同じファイルを二度アップロードするのを避けるため、名前を確認しなさい。", firstCheck: "avoidの直後", structure: "avoid + 動名詞を目的語に取る。", neededMeaning: "重複アップロードをしないようにすること。", usage: "avoid doingで『〜するのを避ける』。", answerReason: "動詞の型と目的が一致。", verification: "to avoidは目的を表す不定詞だが、その後の目的語はuploading。", commonMistake: "最初のtoに引かれてto uploadを選ぶこと。", strategy: "文頭to avoidとavoidの目的語を別々に分析する", reviewGuide: "英文法ページで不定詞と動名詞を復習する。", targetExpression: "avoid doing", targetSkill: "動詞の型", contextType: "upload-instruction", grammarPoint: "gerund object", vocabularyTags: ["avoid", "upload"], mistakeTags: ["不定詞選択"], naturalnessNote: "avoid uploadingは標準的。",
  },
  {
    id: "eng-usage-verb-02-remind-order", area: "verb-usage", unitId: "grammar", title: "remindの語順", difficulty: "standard", questionType: "ordering", seconds: 140,
    statement: "Arrange the words to complete the sentence. Use all words once; there are no extra words. Capitalization and the final period are already supplied: The coach [ reminded / us / to bring / our ID cards ].",
    choices: [["reminded us to bring our ID cards", "remind A to doの唯一の標準語順。"], ["reminded to bring us our ID cards", "usをbringの間接目的語にして意味を変えている。"], ["us reminded our ID cards to bring", "主節の動詞と目的語の順序が崩れている。"], ["reminded our ID cards us to bring", "remindの人目的語と不定詞の配置が不自然。"]], correctIndices: [0], completedSentence: "The coach reminded us to bring our ID cards.", translationJa: "コーチは私たちに身分証を持参するよう念を押した。", firstCheck: "remind A to doのAとdoの内容", structure: "S + remind + 人 + to不定詞 + 目的語。", neededMeaning: "私たちに持参を忘れないよう伝えること。", usage: "remind 人 to doで『人に〜するよう念を押す』。", answerReason: "全語を一度ずつ用い、意味役割が一意。", verification: "usはremindedの目的語、our ID cardsはbringの目的語。", commonMistake: "lend型の二重目的語と混同すること。", strategy: "動詞ごとの文型を骨格にして語句を置く", reviewGuide: "英文法ページでSVOCと不定詞を復習する。", targetExpression: "remind A to do", targetSkill: "並べ替え", contextType: "club-reminder", grammarPoint: "SVOC with infinitive", vocabularyTags: ["remind", "bring"], mistakeTags: ["目的語位置の誤り"], naturalnessNote: "reminded us to bringは自然。", acceptedOrder: ["reminded", "us", "to bring", "our ID cards"],
  },
  {
    id: "eng-usage-verb-03-suggest-allow", area: "verb-usage", unitId: "grammar", title: "suggestとallowの自然な型", difficulty: "ct-prep", questionType: "multiple-select", seconds: 150,
    statement: "A teacher is discussing a trial study room. Which TWO sentences are grammatically natural and fit the context? Choose two. No partial credit.", choices: [["I suggest trying the room for one week.", "suggest doingは提案を自然に表す。"], ["The school will allow students to use it until six.", "allow A to doの型で許可を表す。"], ["I suggest students to try the room.", "suggestは通常suggest A to doの型を取らない。"], ["The school will allow using students it.", "allowの目的語と不定詞の語順が崩れている。"]], correctIndices: [0, 1], completedSentence: "I suggest trying the room for one week, and the school will allow students to use it until six.", translationJa: "その部屋を一週間試すことを提案します。また学校は生徒が6時まで利用することを許可します。", firstCheck: "suggestとallowの直後の型", structure: "suggest + 動名詞、allow + 人 + to不定詞。", neededMeaning: "試行の提案と利用の許可。", usage: "二動詞は似た場面でも補語の取り方が異なる。", answerReason: "AとBだけが各動詞の標準構文に合う。", verification: "doingの意味上の主語とto useの主体studentsを確認する。", commonMistake: "allow A to doからsuggest A to doを類推すること。", strategy: "意味が近くても動詞ごとの後続形式を別に確認する", reviewGuide: "英文法ページで動詞の語法を復習する。", targetExpression: "suggest doing / allow A to do", targetSkill: "動詞語法比較", contextType: "teacher-proposal", grammarPoint: "verb complementation", vocabularyTags: ["suggest", "allow"], mistakeTags: ["動詞型の類推ミス"], naturalnessNote: "地域差を避け、suggest doingを正答に採用。",
  },
  {
    id: "eng-usage-verb-04-borrow-lend", area: "verb-usage", unitId: "grammar", title: "borrowとlendの視点", difficulty: "standard", questionType: "single-choice", seconds: 120,
    statement: "Aya: I forgot my calculator. Could you ___ me yours for this class? Ren: Sure, but please return it afterward.", choices: [["lend", "RenからAyaへ一時的に貸すのでlend 人 物。"], ["borrow", "borrowは借り手を主語にしてborrow 物 from 人とする。"], ["say", "物の受け渡しを表さない。"], ["remind", "remind 人 of/toの意味で貸借にならない。"]], correctIndices: [0], completedSentence: "Could you lend me yours for this class?", translationJa: "この授業の間、あなたのものを私に貸してくれますか。", firstCheck: "主語youが物を渡す側で、meが受け取る側", structure: "lend + 人 + 物の二重目的語。", neededMeaning: "一時的に相手へ貸すこと。", usage: "lendは貸す、borrowは借りる。視点と文型が異なる。", answerReason: "you→meの移動方向に合う。", verification: "Ayaを主語にすればCould I borrow yours?と言い換えられる。", commonMistake: "日本語の『借りる』場面だけでborrowを選ぶこと。", strategy: "主語が渡す側か受け取る側か矢印で確認する", reviewGuide: "英文法ページで授与動詞と貸借動詞を復習する。", targetExpression: "lend A B / borrow B from A", targetSkill: "視点と文型", contextType: "classroom-dialogue", grammarPoint: "double object", vocabularyTags: ["lend", "borrow"], mistakeTags: ["貸し手借り手の逆転"], naturalnessNote: "Could you lend me yours?は丁寧で自然。",
  },
];

const NOUN_ADJECTIVE_ADVERB: readonly Seed[] = [
  {
    id: "eng-usage-naa-01-advice", area: "noun-adjective-adverb", unitId: "grammar", title: "不可算名詞 advice", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "The librarian gave me ___ useful advice about finding reliable sources.", choices: [["some", "adviceは不可算名詞なのでsome useful adviceが自然。"], ["an", "adviceは通常不可算でan adviceとはしない。"], ["many", "manyは可算名詞複数に使う。"], ["a few", "fewも可算名詞複数に使う。"]], correctIndices: [0], completedSentence: "The librarian gave me some useful advice about finding reliable sources.", translationJa: "司書は信頼できる情報源の探し方について役立つ助言をくれた。", firstCheck: "adviceが不可算名詞であること", structure: "限定詞+形容詞+不可算名詞。", neededMeaning: "一定量の助言。", usage: "some advice、a piece of adviceと数える。", answerReason: "名詞の可算性と肯定文に合う。", verification: "adviceに複数語尾-sが付いていないことも確認する。", commonMistake: "日本語で一つの助言と言えるためanを選ぶこと。", strategy: "数量詞を選ぶ前に名詞の可算性を確認する", reviewGuide: "英文法ページで可算・不可算名詞を復習する。", targetExpression: "some advice", targetSkill: "可算性", contextType: "library-help", grammarPoint: "uncountable noun", vocabularyTags: ["advice", "some"], mistakeTags: ["不可算名詞に冠詞a"], naturalnessNote: "some useful adviceは自然。",
  },
  {
    id: "eng-usage-naa-02-hard-hardly", area: "noun-adjective-adverb", unitId: "grammar", title: "hardとhardlyの意味差", difficulty: "standard", questionType: "single-choice", seconds: 110,
    statement: "The volunteers worked ___ all morning, but they could ___ hear the announcements over the noise.", choices: [["hard / hardly", "hardは懸命に、hardlyはほとんど〜ない。"], ["hardly / hard", "前半がほとんど働かず、後半が一生懸命聞くという不自然な意味。"], ["hard / hard", "後半で『一生懸命聞くことができた』となり、butと騒音の結果に合わない。"], ["hardly / hardly", "働かなかったという情報はない。"]], correctIndices: [0], completedSentence: "The volunteers worked hard, but they could hardly hear the announcements.", translationJa: "ボランティアは懸命に働いたが、騒音で案内はほとんど聞こえなかった。", firstCheck: "workedの様子とcould hearの程度、but", structure: "二空欄とも副詞だが意味が異なる。", neededMeaning: "懸命に働く一方、ほぼ聞こえない。", usage: "hard=一生懸命に、hardly=ほとんど〜ない。", answerReason: "接尾辞-lyで単純な様態副詞にならない例。", verification: "butの前後が努力と困難の対比になる。", commonMistake: "hardlyをhardの通常の副詞形と考えること。", strategy: "形だけでなく文全体の肯定否定を確認する", reviewGuide: "英文法ページで紛らわしい副詞を復習する。", targetExpression: "work hard / hardly hear", targetSkill: "副詞の意味差", contextType: "event-work", grammarPoint: "adverb semantics", vocabularyTags: ["hard", "hardly"], mistakeTags: ["-lyの機械判断"], naturalnessNote: "両表現とも標準的。",
  },
  {
    id: "eng-usage-naa-03-nearly-enough", area: "noun-adjective-adverb", unitId: "grammar", title: "nearlyとenoughの位置", difficulty: "ct-prep", questionType: "single-choice", seconds: 150,
    statement: "A notice says: 'The 60-seat room is nearly full, but it is large enough for the 56 people currently registered.' Which explanation is correct?",
    choices: [["Nearly modifies full, and enough follows large because it modifies the adjective.", "nearly fullとlarge enoughの位置・意味を正しく説明する。"], ["Nearly means completely, so no seats remain.", "nearlyは『ほとんど』で完全ではなく、4席残る。"], ["Enough must always come before an adjective.", "形容詞を修飾するenoughは通常形容詞の後ろ。"], ["Large enough means the room is too small.", "必要な大きさを満たす意味で、too smallと逆。"]], correctIndices: [0], completedSentence: "The room is nearly full, but it is large enough for 56 people.", translationJa: "部屋はほぼ満員だが、現在登録している56人には十分な広さがある。", firstCheck: "定員60と登録56、nearly fullとlarge enough", structure: "程度副詞nearly+形容詞、形容詞+enough。", neededMeaning: "満員に近いが、必要条件は満たすこと。", usage: "nearlyは完全の直前、enoughは形容詞の後で十分性を示す。", answerReason: "数値と二つの語順をすべて説明できる。", verification: "60-56=4席で、fullではないがnearly fullといえる。", commonMistake: "nearlyを完全とし、enoughを形容詞前へ置くこと。", strategy: "程度語の位置と実数の両方を照合する", reviewGuide: "英文法ページで程度副詞とenoughを復習する。", targetExpression: "nearly full / large enough", targetSkill: "程度副詞", contextType: "room-notice", grammarPoint: "adverb position", vocabularyTags: ["nearly", "enough"], mistakeTags: ["程度と語順の誤り"], naturalnessNote: "nearly full / large enoughは自然。",
  },
];

const CONVERSATION_NOTICE: readonly Seed[] = [
  {
    id: "eng-usage-conversation-01-email-reply", area: "conversation-notice", unitId: "vocab", title: "申込み変更メールへの返信", difficulty: "ct-prep", questionType: "dialogue-email", seconds: 150,
    statement: "Email: 'Your requested Saturday tour is full. We can move your booking to Sunday at 10:00 or cancel it without charge. Please tell us your preference by Wednesday.' Which reply is most appropriate if you want Sunday?",
    choices: [["Thank you for letting me know. Please move my booking to Sunday at 10:00.", "連絡への謝意と希望を明確かつ丁寧に伝える。"], ["You failed, so fix everything now.", "相手を責める強い表現で、希望日時も不明確。"], ["Sunday maybe.", "意図は推測できても正式な返信として曖昧すぎる。"], ["Cancel Wednesday at ten.", "締切・日時・選択肢を混同している。"]], correctIndices: [0], completedSentence: "Thank you for letting me know. Please move my booking to Sunday at 10:00.", translationJa: "ご連絡ありがとうございます。予約を日曜日の10時へ変更してください。", firstCheck: "相手が求めるpreferenceと選べる日時", structure: "謝意の文+pleaseを使う明確な依頼文。", neededMeaning: "日曜10時への変更希望を丁寧に確定すること。", usage: "Thank you for letting me knowとPlease move ...は中立的で明確。", answerReason: "場面・相手・目的の三つに合う。", verification: "受信者が追加質問なしで処理できる情報がある。", commonMistake: "短ければ自然だと考え、Sunday maybeを選ぶこと。", strategy: "メールの依頼事項・期限・自分の希望を対応させる", reviewGuide: "英単語ページでメールの定型表現を復習する。", targetExpression: "Thank you for letting me know / Please move", targetSkill: "メール返信", contextType: "booking-email", grammarPoint: "polite request", vocabularyTags: ["booking", "preference"], mistakeTags: ["場面に不適切", "情報不足"], naturalnessNote: "丁寧だが過度に堅くない返信。",
  },
  {
    id: "eng-usage-conversation-02-request", area: "conversation-notice", unitId: "vocab", title: "図書館での丁寧な依頼", difficulty: "basic", questionType: "single-choice", seconds: 90,
    statement: "You need help finding a book in the school library. What is the most natural expression to use with the librarian?",
    choices: [["Could you help me find this book, please?", "丁寧で目的も明確な依頼。"], ["Find this book for me now.", "命令形で強すぎ、通常の依頼場面に不適切。"], ["You must know this book.", "相手の知識を決めつけ、依頼内容になっていない。"], ["I demand book location.", "冠詞も欠け、過度に強く不自然。"]], correctIndices: [0], completedSentence: "Could you help me find this book, please?", translationJa: "この本を探すのを手伝っていただけますか。", firstCheck: "司書へ助けを求める場面と丁寧さ", structure: "Could you + 動詞原形の依頼疑問文。", neededMeaning: "本の場所を教えてもらう丁寧な依頼。", usage: "Could you help me do ...?は学校内でも自然。", answerReason: "文法・丁寧さ・目的がすべて合う。", verification: "相手がyes/noで応じ、具体的支援へ進める。", commonMistake: "命令形でもpleaseを付ければ常に適切と思うこと。", strategy: "会話では文法だけでなく相手との関係と目的を見る", reviewGuide: "英単語ページで依頼表現を復習する。", targetExpression: "Could you help me ...?", targetSkill: "丁寧な依頼", contextType: "library-dialogue", grammarPoint: "polite modal request", vocabularyTags: ["help", "request"], mistakeTags: ["丁寧さ不足"], naturalnessNote: "学校の司書への依頼として自然。",
  },
  {
    id: "eng-usage-conversation-03-reschedule", area: "conversation-notice", unitId: "vocab", title: "予定変更の提案と確認", difficulty: "standard", questionType: "single-choice", seconds: 120,
    statement: "Rina: I have a dentist appointment during Tuesday's club meeting. Sota: ___. Rina: Wednesday works for me. Which response is most natural?",
    choices: [["Would Wednesday after school work instead?", "事情を受けて代替日時を提案し、相手の都合を確認する。"], ["Tuesday happened yesterday.", "時系列も会話目的も合わない。"], ["You should cancel every appointment.", "過度に強く、合理的な予定調整にならない。"], ["Wednesday is impossible for you.", "直後のWednesday works for meと矛盾し、相手の都合を決めつける。"]], correctIndices: [0], completedSentence: "Would Wednesday after school work instead?", translationJa: "代わりに水曜日の放課後ではどうですか。", firstCheck: "Rinaの事情と次のWednesday works for me", structure: "Would + 日時 + work?で都合を尋ねる。", neededMeaning: "火曜の代替として水曜を提案すること。", usage: "Would [time] work?は予定確認の自然な表現。", answerReason: "次の返答が直接答えになる。", verification: "Wednesday worksが同じworkの意味を受けている。", commonMistake: "文法的な未来表現だけを見て会話の応答関係を無視すること。", strategy: "空欄後の返答から、直前の発言意図を逆算する", reviewGuide: "英単語ページで予定変更表現を復習する。", targetExpression: "Would Wednesday work?", targetSkill: "予定調整", contextType: "club-dialogue", grammarPoint: "would for proposal", vocabularyTags: ["reschedule", "work"], mistakeTags: ["応答関係の無視"], naturalnessNote: "Would [time] work?は丁寧で中立的。",
  },
];

export const ENGLISH_USAGE_PROBLEMS: readonly EnglishUsageProblem[] = [
  ...CONTEXT_VOCABULARY,
  ...SYNONYM_PARAPHRASE,
  ...WORD_FORM,
  ...COLLOCATION,
  ...PHRASAL_PREPOSITION,
  ...VERB_USAGE,
  ...NOUN_ADJECTIVE_ADVERB,
  ...CONVERSATION_NOTICE,
].map(buildProblem);

const ENGLISH_USAGE_BY_ID = new Map(ENGLISH_USAGE_PROBLEMS.map((problem) => [problem.id, problem]));

export function getEnglishUsageProblem(problemId: string): EnglishUsageProblem | undefined {
  return ENGLISH_USAGE_BY_ID.get(problemId);
}

export function getNextEnglishUsageProblem(problemId: string): EnglishUsageProblem | undefined {
  const index = ENGLISH_USAGE_PROBLEMS.findIndex((problem) => problem.id === problemId);
  return index < 0 ? undefined : ENGLISH_USAGE_PROBLEMS[(index + 1) % ENGLISH_USAGE_PROBLEMS.length];
}
