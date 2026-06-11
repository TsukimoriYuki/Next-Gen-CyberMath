export interface GrammarQuestion {
  id: string;
  topic:
    | "conditional" | "participle" | "relative" | "inversion" | "cleft"
    | "paragraph_order" | "error_id" | "phrasal_verb" | "idiom" | "conversation" | "preposition";
  sentence: string;
  blank: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const GRAMMAR_TOPICS: Record<
  GrammarQuestion["topic"],
  { label: string; labelJa: string; accent: string }
> = {
  conditional:    { label: "Conditionals",   labelJa: "仮定法",   accent: "#f59e0b" },
  participle:     { label: "Participial",    labelJa: "分詞構文", accent: "#10b981" },
  relative:       { label: "Relative",       labelJa: "関係詞",   accent: "#00d2ff" },
  inversion:      { label: "Inversion",      labelJa: "倒置",     accent: "#a78bfa" },
  cleft:          { label: "Cleft",          labelJa: "強調構文", accent: "#f43f5e" },
  paragraph_order:{ label: "Para-Order",     labelJa: "段落整序", accent: "#e879f9" },
  error_id:       { label: "Error-ID",       labelJa: "誤り指摘", accent: "#fb923c" },
  phrasal_verb:   { label: "Phrasal Verb",   labelJa: "句動詞",   accent: "#34d399" },
  idiom:          { label: "Idiom",          labelJa: "イディオム",accent: "#60a5fa" },
  conversation:   { label: "Conversation",   labelJa: "会話表現", accent: "#c084fc" },
  preposition:    { label: "Preposition",    labelJa: "前置詞",   accent: "#94a3b8" },
};

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  // ── 仮定法 ────────────────────────────────────────────────────────────────
  {
    id: "g001",
    topic: "conditional",
    sentence: "If I ___ you, I would accept the offer immediately.",
    blank: "be (仮定法過去)",
    options: ["were", "was", "am", "had been"],
    correctIndex: 0,
    explanation: `【仮定法過去】"If I were you" は「もし私があなたなら」という現在の非現実的な仮定。仮定法過去では動詞を過去形にするが、be動詞は主語に関わらず were を使うのが原則（口語では was も見られるが、入試では were が正解）。`,
  },
  {
    id: "g002",
    topic: "conditional",
    sentence: "I wish I ___ harder when I was in high school.",
    blank: "study (仮定法過去完了)",
    options: ["had studied", "studied", "have studied", "study"],
    correctIndex: 0,
    explanation: `【wish + 仮定法過去完了】過去の出来事を後悔する表現。"I wish + 主語 + had + 過去分詞" の形。「高校時代にもっと勉強していればよかった」→ 現実には勉強しなかったという後悔。`,
  },
  {
    id: "g003",
    topic: "conditional",
    sentence: "___ for your timely advice, the project would have failed.",
    blank: "If it had not been (倒置形に変換)",
    options: ["Had it not been", "Was it not", "Were it not", "Had it been"],
    correctIndex: 0,
    explanation: `【仮定法過去完了・if省略倒置】"If it had not been for ~" は「〜がなければ」の意味。if を省略すると had が文頭に出る。"Had it not been for your advice, ..." が標準形。`,
  },
  {
    id: "g004",
    topic: "conditional",
    sentence: "She talks as if she ___ everything about Japanese history.",
    blank: "know (as if + 仮定法)",
    options: ["knew", "knows", "had known", "would know"],
    correctIndex: 0,
    explanation: `【as if + 仮定法過去】"as if" の後で主節と同じ時点の非現実を表すには仮定法過去を使う。現在もそうでないのに「まるで知っているかのように」話しているので knew が正解。had known は過去より以前の非現実に使う。`,
  },
  {
    id: "g005",
    topic: "conditional",
    sentence: "It is time we ___ a more sustainable approach to this problem.",
    blank: "take (It is time + 仮定法)",
    options: ["took", "take", "had taken", "were taking"],
    correctIndex: 0,
    explanation: `【It is time + 仮定法過去】"It is time (that) + 主語 + 動詞の過去形" は「もうそろそろ〜すべき時だ」という表現。過去形 took を使うが意味は現在・未来。to不定詞を使う "It is time to take ..." とは構造が異なる。`,
  },

  // ── 分詞構文 ──────────────────────────────────────────────────────────────
  {
    id: "g006",
    topic: "participle",
    sentence: "___ her assignment early, she went out to enjoy the sunny day.",
    blank: "前後関係（完了）",
    options: ["Having finished", "Finishing", "Finished", "To finish"],
    correctIndex: 0,
    explanation: `【完了の分詞構文】主節より前に完了した動作は "Having + 過去分詞" で表す。「課題を終えてから外に出た」→ 終えることが先→ Having finished が正解。単なる Finishing では同時進行の意味になる。`,
  },
  {
    id: "g007",
    topic: "participle",
    sentence: "The letter ___ in 1920 describes the daily life of ordinary people.",
    blank: "write（後置修飾）",
    options: ["written", "writing", "being written", "having written"],
    correctIndex: 0,
    explanation: `【過去分詞の後置修飾】letter（手紙）は「書かれた」ものなので受け身の関係 → 過去分詞 written。"The letter written in 1920" = 1920年に書かれた手紙。writing を使うと「1920年に手紙を書いている」という能動・進行の意味になり不自然。`,
  },
  {
    id: "g008",
    topic: "participle",
    sentence: "___ in a small mountain village, he often dreamed of the ocean.",
    blank: "raise（受動の分詞構文）",
    options: ["Raised", "Raising", "Having raised", "Being raised"],
    correctIndex: 0,
    explanation: `【受動の分詞構文（簡略形）】"Being raised" は受動の分詞構文だが、being は省略できる。省略した "Raised ..." が一般的。「山村で育てられたため」→ Raised が正解。Raising は能動で「育てながら」の意味になり不自然。`,
  },
  {
    id: "g009",
    topic: "participle",
    sentence: "He sat by the window, ___ the rain fall on the empty street.",
    blank: "watch（付帯状況）",
    options: ["watching", "watched", "to watch", "having watched"],
    correctIndex: 0,
    explanation: `【付帯状況の分詞構文】コンマ＋分詞構文で同時に行われている付帯的な動作を表す。「〜しながら」の同時進行 → 現在分詞 watching。watching の意味上の主語は主節の he と一致している。`,
  },
  {
    id: "g010",
    topic: "participle",
    sentence: "Strictly ___, the final result was not what we had expected.",
    blank: "speak（慣用的分詞構文）",
    options: ["speaking", "spoken", "to speak", "speak"],
    correctIndex: 0,
    explanation: `【慣用的分詞構文】"Strictly speaking"（厳密に言えば）は独立分詞構文の慣用表現。他にも "Generally speaking"（一般的に言えば）、"Judging from ..."（〜から判断すると）などが頻出。`,
  },

  // ── 関係詞 ────────────────────────────────────────────────────────────────
  {
    id: "g011",
    topic: "relative",
    sentence: "The small town ___ I grew up has changed dramatically.",
    blank: "先行詞：場所",
    options: ["where", "which", "that", "when"],
    correctIndex: 0,
    explanation: `【関係副詞 where】先行詞が場所（town）で、後続節に場所の副詞が欠けている → 関係副詞 where を使う。"in which" に言い換え可能。where の後は完全な節（I grew up）が続く点に注意。`,
  },
  {
    id: "g012",
    topic: "relative",
    sentence: "The scientist ___ research changed medicine was awarded a prize.",
    blank: "先行詞：人（所有格）",
    options: ["whose", "who", "whom", "which"],
    correctIndex: 0,
    explanation: `【所有格の関係代名詞 whose】先行詞は人（scientist）で、後続節に "__ research" という所有格が欠けている → whose が正解。"whose + 名詞" の形で「〜の〜」という所有関係を表す。`,
  },
  {
    id: "g013",
    topic: "relative",
    sentence: "Do you know the reason ___ she suddenly quit the team?",
    blank: "先行詞：reason",
    options: ["why", "which", "what", "that"],
    correctIndex: 0,
    explanation: `【関係副詞 why】先行詞が reason で、後続節に理由の副詞が欠けている → 関係副詞 why を使う。"the reason why ..." = 「〜の理由」。"for which" に言い換え可能。`,
  },
  {
    id: "g014",
    topic: "relative",
    sentence: "Please bring me ___ you think will be useful for the presentation.",
    blank: "先行詞なし",
    options: ["whatever", "whichever", "what", "that"],
    correctIndex: 2,
    explanation: `【先行詞を含む what】"what" は先行詞を含む関係代名詞で「〜するもの（こと）」の意味。"what you think will be useful" = 「役立つと思うもの」。that には先行詞が必要なので不可。`,
  },
  {
    id: "g015",
    topic: "relative",
    sentence: "She is ___ we call a natural leader — everyone follows her instinctively.",
    blank: "慣用表現",
    options: ["what", "which", "that", "who"],
    correctIndex: 0,
    explanation: `【what we call】"what we call" は「いわゆる」という慣用表現。"She is what we call a natural leader" = 「彼女はいわゆる生まれつきのリーダーだ」。what は先行詞を含む関係代名詞として機能している。`,
  },

  // ── 倒置 ──────────────────────────────────────────────────────────────────
  {
    id: "g016",
    topic: "inversion",
    sentence: "Never ___ I encountered such a brilliant mind in all my years of teaching.",
    blank: "助動詞（否定副詞の倒置）",
    options: ["have", "did", "was", "had"],
    correctIndex: 0,
    explanation: `【否定副詞による倒置】文頭に否定副詞（Never, Seldom, Rarely など）が来ると、後ろの語順が疑問文形式に倒置される。現在完了の文 "I have never encountered ..." → "Never have I encountered ..."。`,
  },
  {
    id: "g017",
    topic: "inversion",
    sentence: "Only after the meeting ended ___ he finally understand the full situation.",
    blank: "助動詞（Only + 副詞句の倒置）",
    options: ["did", "does", "had", "was"],
    correctIndex: 0,
    explanation: `【Only + 副詞句による倒置】"Only after ..." が文頭に来ると主節が倒置される。元の文は "He finally understood ..." なので過去形 → did を使った倒置。"did + 主語 + 動詞原形" の語順になる。`,
  },
  {
    id: "g018",
    topic: "inversion",
    sentence: "Not only ___ she win the competition, but she also set a new record.",
    blank: "助動詞（Not only の倒置）",
    options: ["did", "does", "has", "was"],
    correctIndex: 0,
    explanation: `【Not only ... but also の倒置】"Not only" が文頭に出ると直後の節が倒置される。"she won" → "did she win"（過去形）。but also 節には倒置は不要。`,
  },
  {
    id: "g019",
    topic: "inversion",
    sentence: "Hardly ___ the curtain risen when the audience burst into applause.",
    blank: "助動詞（Hardly ... when）",
    options: ["had", "has", "did", "was"],
    correctIndex: 0,
    explanation: `【Hardly[Scarcely] ... when[before] の倒置】「〜するとすぐに…した」という意味。"Hardly had + 主語 + 過去分詞 ... when + 主語 + 過去形" の形。主節は過去完了、when節は過去形になることに注意。`,
  },
  {
    id: "g020",
    topic: "inversion",
    sentence: "So ___ was the storm that all flights were cancelled for three days.",
    blank: "形容詞（So + 形容詞の倒置）",
    options: ["severe", "severely", "more severe", "most severe"],
    correctIndex: 0,
    explanation: `【So + 形容詞/副詞 による倒置】"So + 形容詞 + was + 主語 + that ..." の形で「非常に〜だったので…」という意味。"The storm was so severe that ..." の強調倒置形。副詞 severely では was の後が不自然。`,
  },

  // ── 強調構文 ──────────────────────────────────────────────────────────────
  {
    id: "g021",
    topic: "cleft",
    sentence: "___ the long commute that finally made her decide to move closer to work.",
    blank: "強調構文の開始",
    options: ["It was", "It is", "There was", "That was"],
    correctIndex: 0,
    explanation: `【強調構文 It is[was] ... that】"It was + 強調要素 + that + 残りの節" の形。「通勤時間の長さこそが引っ越しを決意させた」と強調している。過去の出来事なので It was を使う。`,
  },
  {
    id: "g022",
    topic: "cleft",
    sentence: "It was not until midnight ___ she finally finished writing her thesis.",
    blank: "that（not until ... that の強調）",
    options: ["that", "when", "which", "until"],
    correctIndex: 0,
    explanation: `【not until ... that の強調構文】"It was not until + 時の表現 + that + 主語 + 動詞" = 「〜になってようやく…した」。when では強調構文にならない。元の文 "She didn't finish until midnight" を強調している。`,
  },
  {
    id: "g023",
    topic: "cleft",
    sentence: "___ struck me most about the city was its incredible silence at night.",
    blank: "what 節の主語",
    options: ["What", "That", "It", "Which"],
    correctIndex: 0,
    explanation: `【what節が主語の強調】"What + 主語 + 動詞 + is/was ..." の形で「〜なのは…だ」と強調する。what は先行詞を含む関係代名詞で "the thing that" に言い換えられる。It was ... that の強調構文とは異なる構造。`,
  },
  {
    id: "g024",
    topic: "cleft",
    sentence: "It is the daily effort ___ you put in, not raw talent, that determines success.",
    blank: "関係詞（強調構文内）",
    options: ["that", "which", "what", "where"],
    correctIndex: 0,
    explanation: `【強調構文内の関係詞】"It is + 強調要素 + that ..." の強調構文で、強調要素に修飾節がつく場合。"the daily effort that you put in" の that は関係代名詞で、強調構文の結びの that と混同しないよう注意。`,
  },
  {
    id: "g025",
    topic: "cleft",
    sentence: "___ I truly want is not money, but the freedom to create.",
    blank: "what 節（目的語として）",
    options: ["What", "That", "It", "Which"],
    correctIndex: 0,
    explanation: `【what節が主語】"What I want is ..." = 「私が欲しいのは…だ」。"What + 主語 + 動詞" が名詞節として文の主語になる。"That I truly want is not money" は文法的に不完全（that節は主語になれるが "want" の目的語が欠ける）。`,
  },

  // ── 仮定法（追加）────────────────────────────────────────────────────────
  {
    id: "g026",
    topic: "conditional",
    sentence: "It is time the government ___ decisive action on climate change.",
    blank: "take (It is time + 仮定法)",
    options: ["took", "takes", "has taken", "will take"],
    correctIndex: 0,
    explanation: `【It is time + 仮定法過去】"It is time (that) + 主語 + 過去形" は「そろそろ〜すべき時だ（なのにまだしていない）」という批判・促しの表現。現在の状況について述べているが動詞は過去形 took を使う。現在形 takes や未来形 will take は誤り。`,
  },
  {
    id: "g027",
    topic: "conditional",
    sentence: "Without your financial support, the project ___ have collapsed years ago.",
    blank: "would (過去の仮定)",
    options: ["would", "will", "should", "could have"],
    correctIndex: 0,
    explanation: `【Without + 仮定法過去完了】"Without ..." は "If it had not been for ..." の言い換え。主節は "would have + 過去分詞" で過去の非現実的な帰結を表す。"would have collapsed" が完成形。"would" だけでは後続の "have collapsed" と合わせて正しい仮定法過去完了を作る。`,
  },
  {
    id: "g028",
    topic: "conditional",
    sentence: "Suppose you ___ the chance to relive one day of your life, which day would you choose?",
    blank: "had (Suppose + 仮定法)",
    options: ["had", "have", "would have", "were to have"],
    correctIndex: 0,
    explanation: `【Suppose + 仮定法過去】"Suppose (that) + 主語 + 過去形" は "If + 主語 + 過去形" と同義で「もし〜なら」を表す。後続の主節 "would you choose" から仮定法過去の文脈であるとわかる。"have" は直説法現在で「Suppose you have ...」は現実の状況を仮定するが、主節の "would" と対応しない。`,
  },

  // ── 分詞構文（追加）──────────────────────────────────────────────────────
  {
    id: "g029",
    topic: "participle",
    sentence: "___ in a rural village, she had little access to advanced educational resources.",
    blank: "grow up (分詞構文・理由)",
    options: ["Having grown up", "Growing up", "Grown up", "To grow up"],
    correctIndex: 0,
    explanation: `【完了分詞構文 Having + 過去分詞】主節の動詞 "had" より前に起きた出来事（農村で育った＝過去）を表すため、完了分詞構文 "Having grown up" が正解。"Growing up" は主節と同時進行の場合に使う。分詞構文の時制差に注意。`,
  },
  {
    id: "g030",
    topic: "participle",
    sentence: "The new regulations, ___ effective immediately, require all firms to disclose their carbon footprint.",
    blank: "take (being + 過去分詞 または 現在分詞)",
    options: ["taking effect", "taken effect", "being taken effect", "to take effect"],
    correctIndex: 0,
    explanation: `【分詞構文（付帯状況）】主語 "The new regulations" と動詞の関係は「効力を発する（regulations take effect）」という能動関係。よって現在分詞 "taking effect" が正解。"Taken effect" は受動の過去分詞だが "take effect" は自動詞句のため受動形にはならない。`,
  },

  // ── 関係詞（追加）────────────────────────────────────────────────────────
  {
    id: "g031",
    topic: "relative",
    sentence: "This is the city ___ I spent most of my childhood.",
    blank: "前置詞 + 関係代名詞 または 関係副詞",
    options: ["where", "which", "in that", "at which"],
    correctIndex: 0,
    explanation: `【関係副詞 where】先行詞 "the city"（場所）を受ける関係副詞 "where" が最もシンプルで正しい選択。"in which" も正解だが選択肢にない。"which" だけでは前置詞が欠ける（"spent ... in the city" → in が必要）。"in that" は関係詞節には使えない。`,
  },
  {
    id: "g032",
    topic: "relative",
    sentence: "The report concluded that economic inequality, ___ has widened considerably, poses a systemic risk.",
    blank: "which (継続用法)",
    options: ["which", "that", "what", "as"],
    correctIndex: 0,
    explanation: `【関係代名詞の継続用法】コンマに挟まれた非制限用法（継続用法）では "that" は使えず "which" を使う。先行詞は "economic inequality"（物・概念）。"what" は先行詞を持たない。"as" は "as is often the case" など特定の慣用表現でのみ使う。`,
  },

  // ── 倒置（追加）──────────────────────────────────────────────────────────
  {
    id: "g033",
    topic: "inversion",
    sentence: "___ the researchers realise the full implications of their discovery.",
    blank: "Only then (倒置)",
    options: ["Only then did", "Only then were", "Only then have", "Only then"],
    correctIndex: 0,
    explanation: `【Only then + 倒置】否定・制限の副詞表現 "Only then" が文頭に来ると倒置が起きる。文の時制は過去（"realise" → realised が文脈上の動詞）なので助動詞 did を使う。"Only then did the researchers realise ..." が正解形。"Only then" だけでは倒置がなく文法的に不完全。`,
  },
  {
    id: "g034",
    topic: "inversion",
    sentence: "Rarely ___ such a profound impact on public opinion in such a short time.",
    blank: "has a single speech had (倒置)",
    options: ["has a single speech had", "a single speech has had", "did a single speech have", "a single speech had"],
    correctIndex: 0,
    explanation: `【Rarely + 倒置】"Rarely" は否定的な意味を持つ副詞で文頭に置くと倒置が生じる。現在完了 "has had" が使われているため、倒置形は "has + 主語 + 過去分詞"。よって "has a single speech had" が正しい語順。"did ... have" は過去形の倒置で現在完了とは対応しない。`,
  },

  // ── 強調構文（追加）──────────────────────────────────────────────────────
  {
    id: "g035",
    topic: "cleft",
    sentence: "It was ___ that the decisive battle took place, not in the south.",
    blank: "in the north (強調構文・場所)",
    options: ["in the north", "in north", "the north", "at the north"],
    correctIndex: 0,
    explanation: `【強調構文で場所の副詞句を強調】"It is/was + 強調要素 + that ..." 構文。強調されているのは場所を表す副詞句 "in the north"（北で）。"the north" だけでは副詞句としての前置詞が欠ける。"at the north" は一般的でない（地域・方向には in を使う）。`,
  },

  // ── MARCH / 関関同立 対策（g036–g040）────────────────────────────────────
  {
    id: "g036",
    topic: "paragraph_order",
    sentence: `次の（ア）〜（エ）を意味が通るように並べ替えたとき，3番目にくるものを選べ。
（ア）However, critics point out that not all cultural practices deserve preservation simply because they are old.
（イ）Traditional customs and festivals form the backbone of cultural identity in many societies.
（ウ）The key, therefore, lies in distinguishing between traditions that enrich communal life and those that perpetuate harm.
（エ）Some rituals, they argue, reflect outdated beliefs that conflict with contemporary values of equality and human rights.`,
    blank: "3番目の文（段落整序）",
    options: ["（ア）", "（イ）", "（ウ）", "（エ）"],
    correctIndex: 3,
    explanation: `【段落整序】論理の流れを追う。（イ）伝統の重要性を提示（導入）→（ア）However で批判的視点を導入（転換）→（エ）具体的な批判内容（旧来の信念・平等との対立）を補足（展開）→（ウ）therefore で結論を提示（締め）。順序は イ→ア→エ→ウ で，3番目は（エ）。`,
  },
  {
    id: "g037",
    topic: "error_id",
    sentence: `次の文の下線部（ア）〜（エ）のうち，文法的に誤っているものを1つ選べ。
The data (ア)collected from over three thousand (イ)participants suggests that regular exercise (ウ)not only improves physical health (エ)but also mental well-being.`,
    blank: "誤り指摘（並列構造）",
    options: ["（ア）collected", "（イ）participants", "（ウ）not only improves", "（エ）but also mental well-being"],
    correctIndex: 3,
    explanation: `【並列構造の対応】"not only A but also B" では A と B が文法的に対応する形でなければならない。"not only improves physical health" に対し，"but also mental well-being" では動詞が欠けており，"improves" を補うか "but also improves mental well-being" と書く必要がある。名詞句だけでは並列が崩れる。`,
  },
  {
    id: "g038",
    topic: "conditional",
    sentence: "If she had listened to the doctor's advice back then, she ___ in much better health today.",
    blank: "混合仮定法（if 節＝過去完了，主節＝現在）",
    options: ["would be", "would have been", "will be", "had been"],
    correctIndex: 0,
    explanation: `【混合仮定法 (Mixed Conditional)】if 節が「過去の非現実」（had listened：過去完了）で，主節が「現在への影響」を表す場合，主節は "would + 動詞原形" を使う。"today" が現在を指しているため "would have been"（過去の帰結）は不正解。`,
  },
  {
    id: "g039",
    topic: "inversion",
    sentence: "___ the complexity of the issue that even the most experienced negotiators struggled to reach an agreement.",
    blank: "Such/So ... that の倒置",
    options: ["Such was", "So was", "Such had been", "So it was"],
    correctIndex: 0,
    explanation: `【Such + 倒置 + that】"Such was + 名詞句 + that ..." = 「〜があまりにも…だったので」の強調倒置。"The complexity was such that ..." の倒置形。"So" は形容詞・副詞を強調する（So + adj. + be + S）のに対し，名詞（complexity）と対応するのは "Such"。`,
  },
  {
    id: "g040",
    topic: "participle",
    sentence: "___, the research team presented its preliminary findings at the international conference.",
    blank: "独立分詞構文（主語が異なる）",
    options: ["The data analyzed", "Having analyzed the data", "The data having been analyzed", "Analyzed the data"],
    correctIndex: 2,
    explanation: `【独立分詞構文（完了受動）】主節の主語は "the research team" だが，分詞の意味上の主語は "the data"（≠主節の主語）なので，独立分詞構文 "The data having been analyzed" が正解。"Having analyzed the data" では主語がチームと同一とみなされ「チームが分析した後で」という能動の意味になる。`,
  },

  // ── 日東駒専 / 産近甲龍 対策（g041–g045）───────────────────────────────
  {
    id: "g041",
    topic: "phrasal_verb",
    sentence: "The new manager quickly ___ with the members of the team and created a positive working environment.",
    blank: "句動詞（get ___）",
    options: ["got along", "got away", "got over", "got through"],
    correctIndex: 0,
    explanation: `【句動詞 get along (with)】"get along (with ~)" = 「〜と仲良くやっていく」。"get away" = 「逃げる」，"get over" = 「〜を乗り越える」，"get through" = 「〜を終える・通り抜ける」。文脈（チームとの良好な関係を構築した）から got along が正解。`,
  },
  {
    id: "g042",
    topic: "idiom",
    sentence: "The politician's speech was so vague that it didn't really ___ — nobody understood what he was actually proposing.",
    blank: "イディオム（意味が伝わる）",
    options: ["hit home", "hit the road", "hit the nail on the head", "hit rock bottom"],
    correctIndex: 0,
    explanation: `【hit home】"hit home" = 「（言葉・事実が）心に刺さる，ぴんとくる」。"didn't hit home" = 「誰にもぴんとこなかった」。"hit the road" = 「出発する」，"hit the nail on the head" = 「核心を突く」（意味が逆），"hit rock bottom" = 「どん底に落ちる」。`,
  },
  {
    id: "g043",
    topic: "conversation",
    sentence: `次の会話の空欄に入る最も適切なものを選べ。
A: I'm sorry I missed your presentation yesterday. Was it well received?
B: ___ The audience seemed really engaged throughout.`,
    blank: "会話表現（高評価の返答）",
    options: ["Couldn't be better!", "I'm afraid not.", "It was touch and go.", "Far from it."],
    correctIndex: 0,
    explanation: `【Couldn't be better】"Couldn't be better" = 「これ以上ないくらい最高だった」。"I'm afraid not" = 「残念ながらそうではない」，"It was touch and go" = 「一か八かだった」，"Far from it" = 「むしろ逆だ」。続く文（聴衆が熱心だった）から最も自然な返答は Couldn't be better。`,
  },
  {
    id: "g044",
    topic: "preposition",
    sentence: "He is well known ___ his contributions to renewable energy research.",
    blank: "前置詞（be known ___）",
    options: ["for", "as", "by", "with"],
    correctIndex: 0,
    explanation: `【be known for】"be known for ~" = 「〜で知られている」（理由・業績が続く）。"be known as ~" = 「〜として知られている」（肩書き・役割が続く）。"contributions to ..." という業績を理由として示しているので for が正解。`,
  },
  {
    id: "g045",
    topic: "conditional",
    sentence: "I would rather you ___ anyone about what I told you just now.",
    blank: "would rather + 仮定法過去",
    options: ["didn't tell", "don't tell", "wouldn't tell", "haven't told"],
    correctIndex: 0,
    explanation: `【would rather + 仮定法過去】"would rather + 主語 + 動詞の過去形" = 「〜に…してほしくない（むしろ〜してほしい）」という願望。"I would rather you didn't tell ..." = 「誰にも話してほしくない」。"don't tell" は直説法現在で，"would rather" の後の従属節では使えない。`,
  },
];
