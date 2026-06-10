export interface GrammarQuestion {
  id: string;
  topic: "conditional" | "participle" | "relative" | "inversion" | "cleft";
  sentence: string;
  blank: string; // the label/hint shown in the blank position
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const GRAMMAR_TOPICS: Record<
  GrammarQuestion["topic"],
  { label: string; labelJa: string; accent: string }
> = {
  conditional: { label: "Conditionals", labelJa: "仮定法", accent: "#f59e0b" },
  participle:  { label: "Participial", labelJa: "分詞構文", accent: "#10b981" },
  relative:    { label: "Relative",    labelJa: "関係詞",   accent: "#00d2ff" },
  inversion:   { label: "Inversion",   labelJa: "倒置",     accent: "#a78bfa" },
  cleft:       { label: "Cleft",       labelJa: "強調構文", accent: "#f43f5e" },
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
];
