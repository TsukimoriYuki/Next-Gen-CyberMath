import {
  lessonDifficulty,
  makeJapaneseProblem,
  type JapaneseProblemDraft,
} from "./problem-builder";

type Draft = Omit<JapaneseProblemDraft, "id" | "area" | "courseId" | "difficulty">;

function problem(number: number, courseId: string, draft: Draft) {
  return makeJapaneseProblem({
    ...draft,
    id: `jp-kanbun-${String(number).padStart(2, "0")}`,
    area: "kanbun",
    courseId,
    difficulty: lessonDifficulty(((number - 1) % 5) + 1),
  });
}

export const KANBUN_PROBLEMS = [
  problem(1, "kanbun-return-marks", {
    title: "レ点の一字返り",
    passage: "不レ知",
    prompt: "返り点に従った書き下しとして最も適切なものを選びなさい。",
    choices: [["A", "知らず"], ["B", "知らざる", "連体形にする名詞が本文にない。"], ["C", "知りず", "打消の助動詞は未然形に接続し、「知らず」となる。"], ["D", "ず知る", "レ点による順序と日本語の打消位置が逆である。"]],
    correctAnswer: "A", evidence: "レ点は直後の「知」を先に読み、「不」を打消の「ず」として後に読む。", explanation: "読む順は知→不。四段活用「知る」の未然形「知ら」に打消の「ず」を付けて「知らず」とする。", questionType: "written-reading", grammarPoint: "レ点・打消", reviewTags: ["返り点", "一字返り"], writtenReading: "知らず",
  }),
  problem(2, "kanbun-return-marks", {
    title: "一二点の読む順",
    passage: "読二此書一",
    prompt: "漢字を読む順として正しいものを選びなさい。",
    choices: [["A", "読→此→書", "二点の字を先に読んでおり、返り点を無視している。"], ["B", "此→書→読"], ["C", "書→此→読", "「此書」は「この書」と語順を保つ。"], ["D", "此→読→書", "一点を読んだ後は二点の「読」へ戻る。"]],
    correctAnswer: "B", evidence: "一点の位置まで下り、「此」「書」を読んでから二点の「読」へ戻る。", explanation: "一二点は一点を先、二点を後に読む。「此書」を目的語としてまとめ、「此の書を読む」と書き下す。", questionType: "reading-order", grammarPoint: "一二点", reviewTags: ["返り点", "一二点"], writtenReading: "此の書を読む",
  }),
  problem(3, "kanbun-return-marks", {
    title: "連続するレ点",
    passage: "不レ忘レ恩",
    prompt: "読む順と意味が一致する書き下しを選びなさい。",
    choices: [["A", "恩を忘れず"], ["B", "忘れずして恩あり", "本文に「あり」に当たる字がない。"], ["C", "恩、忘るべからず", "禁止の「べからず」を表す字はない。"], ["D", "忘れて恩ぜず", "「恩」を動詞として扱い、返り点の順も崩している。"]],
    correctAnswer: "A", evidence: "下の「恩」から「忘」へ戻り、さらに「不」を打消として読む。", explanation: "連続するレ点は下から一字ずつ戻る。恩→忘→不の順を日本語に直すと「恩を忘れず」となる。", questionType: "written-reading", grammarPoint: "連続レ点", reviewTags: ["返り点", "連続レ点"], writtenReading: "恩を忘れず",
  }),
  problem(4, "kanbun-return-marks", {
    title: "送り仮名まで確かめる",
    passage: "欲レ学",
    prompt: "本文の意味を過不足なく表す書き下しを選びなさい。",
    choices: [["A", "学ぶを欲す", "意味は近いが、「欲レ〜」の定型的な書き下し「〜んと欲す」になっていない。"], ["B", "学ばんと欲す"], ["C", "学びて欲す", "「学んだ結果望む」という順接は本文にない。"], ["D", "欲して学ぶ", "返り点が示す読む順と逆である。"]],
    correctAnswer: "B", evidence: "レ点で「学」を先に読み、「欲」を「〜んと欲す」の形で後に読む。", explanation: "「欲レ〜」は「〜んと欲す」で「〜しようと思う」。目的の行為「学ぶ」を先に処理する。Aは語順は近いが定型の書き下しでない。", questionType: "construction", grammarPoint: "欲〜・レ点", reviewTags: ["返り点", "願望"], writtenReading: "学ばんと欲す",
  }),
  problem(5, "kanbun-return-marks", {
    title: "返り点問題を後回しにする判断",
    passage: "甲問。乙曰、不レ可レ忘二旧恩一。",
    prompt: "制限時間が短いとき、最も安定する処理順を選びなさい。",
    choices: [["A", "複合返り点を完全に解いてから人物を確認する", "重い箇所に時間を固定し、会話者情報を後回しにしている。"], ["B", "既知の「不可」を確認し、甲乙の会話関係を押さえ、最後に返り点を精査する"], ["C", "返り点を無視し、選択肢の長さだけで決める", "本文根拠を放棄している。"], ["D", "「旧恩」だけ訳して内容を推測する", "文の禁止・当為の核を落としている。"]],
    correctAnswer: "B", evidence: "「乙曰」で話者が確定し、「不可〜」という既知句法が文の主張を先に示す。", explanation: "複雑な返り点に固執せず、会話者と句法から「昔の恩を忘れてはならない」という骨格を得る。最後に字順を検証すれば時間と精度を両立できる。", questionType: "interpretation", grammarPoint: "不可〜・処理順", reviewTags: ["時間配分", "返り点", "句法優先"], writtenReading: "甲問ふ。乙曰はく、旧恩を忘るべからず、と。", people: ["甲：質問する人物", "乙：答える人物"],
  }),

  problem(6, "kanbun-core-patterns", {
    title: "再読文字「未」",
    passage: "未レ聞",
    prompt: "「未」の読みを含む正しい書き下しを選びなさい。",
    choices: [["A", "未だ聞かず"], ["B", "聞かざるべし", "推量・当然を表す字はない。"], ["C", "未だ聞く", "二度目の「未」を打消として処理していない。"], ["D", "聞き終はらず", "完了の途中という情報は本文にない。"]],
    correctAnswer: "A", evidence: "「未」は一度目に「いまだ」、二度目に打消の「ず」と読む再読文字である。", explanation: "未→聞→未の働きを「未だ聞かず」と表す。「まだ聞いていない」という未実現の否定になる。", questionType: "written-reading", grammarPoint: "再読文字・未", reviewTags: ["再読文字", "未"], writtenReading: "未だ聞かず",
  }),
  problem(7, "kanbun-core-patterns", {
    title: "疑問と反語",
    passage: "豈可レ忘レ恩乎",
    prompt: "文の働きとして最も適切なものを選びなさい。",
    choices: [["A", "恩を忘れたか事実確認している", "答えを求める疑問ではなく主張を強める反語である。"], ["B", "恩を忘れてよいと許可している", "「豈〜乎」は許可ではなく強い否定を表す。"], ["C", "恩を忘れてはならないと強く述べる"], ["D", "恩の内容を質問している", "質問対象は恩の内容ではない。"]],
    correctAnswer: "C", evidence: "「豈〜乎」は「どうして〜だろうか、いや〜ない」という反語。", explanation: "「可」は可能・許可だが、豈と乎に挟まれて反語となる。「どうして恩を忘れてよかろうか、いや忘れてはならない」。", questionType: "construction", grammarPoint: "反語・豈〜乎", reviewTags: ["反語", "豈"], writtenReading: "豈に恩を忘るべけんや",
  }),
  problem(8, "kanbun-core-patterns", {
    title: "二重否定の意味",
    passage: "無レ人不レ学",
    prompt: "文全体の意味を選びなさい。",
    choices: [["A", "学ぶ人はいない", "否定を一つだけ処理した逆の意味である。"], ["B", "学ばない人はいない"], ["C", "人は学んではならない", "禁止を表す「勿」などはない。"], ["D", "学ぶ人も学ばない人もいる", "二重否定が示す全称を弱めている。"]],
    correctAnswer: "B", evidence: "「無〜不…」は「〜として…せざるもの無し」で、すべてが…する意。", explanation: "外側の「無」と内側の「不」を両方処理する。「学ばない人がいない」ので、結果として全員が学ぶ。", questionType: "interpretation", grammarPoint: "二重否定・無〜不", reviewTags: ["否定", "二重否定"], writtenReading: "人として学ばざるもの無し",
  }),
  problem(9, "kanbun-core-patterns", {
    title: "疑問語「何」",
    passage: "何故来",
    prompt: "話者が求めている情報を選びなさい。",
    choices: [["A", "来た人物", "人物を問うなら「誰」などが焦点になる。"], ["B", "来た時刻", "時を示す疑問語はない。"], ["C", "来た理由"], ["D", "来た方法", "手段を示す問いではない。"]],
    correctAnswer: "C", evidence: "「何故」は「何の故に」で理由を問う。", explanation: "「何」単独の訳に飛びつかず、後続の「故」とまとまりで見る。「なぜ来たのか」という原因・理由への疑問。", questionType: "meaning", grammarPoint: "疑問・何故", reviewTags: ["疑問", "理由"], writtenReading: "何の故に来たる",
  }),
  problem(10, "kanbun-core-patterns", {
    title: "反語を含む発言の目的",
    passage: "臣曰、国乱。安得不レ憂。",
    prompt: "臣の発言意図として最も適切なものを選びなさい。",
    choices: [["A", "国の乱れを気にしていないと伝える", "反語の結論と逆である。"], ["B", "憂える方法を王に質問する", "方法を求める実質疑問ではない。"], ["C", "国が乱れている以上、憂えずにはいられないと訴える"], ["D", "国の乱れは必ず終わると予言する", "終結の予測は本文にない。"]],
    correctAnswer: "C", evidence: "「安得不〜」は「どうして〜せずにいられようか」という反語で、直前の「国乱」が理由。", explanation: "因果は「国が乱れる→臣が憂える」。反語を疑問のまま訳さず、臣の強い心情の表明として読む。", questionType: "interpretation", grammarPoint: "反語・安得不", reviewTags: ["反語", "因果", "発言意図"], writtenReading: "臣曰はく、国乱る。安くんぞ憂へざるを得ん、と。", people: ["臣：国の乱れを憂える話者"],
  }),

  problem(11, "kanbun-advanced-patterns", {
    title: "使役の人物関係",
    passage: "王使二臣行一",
    prompt: "行く人物を選びなさい。",
    choices: [["A", "王", "王は行かせる側である。"], ["B", "臣"], ["C", "王と臣の両方", "本文は臣に行かせる一方向の使役。"], ["D", "本文からは決められない", "「使」と目的語「臣」で決められる。"]],
    correctAnswer: "B", evidence: "「使A〜」はAに〜させる。王が使役者、臣が動作主。", explanation: "書き下しは「王、臣をして行かしむ」。文法上の主語は王だが、実際に「行く」動作をするのは臣。", questionType: "subject", grammarPoint: "使役・使A〜", reviewTags: ["使役", "人物関係"], writtenReading: "王、臣をして行かしむ", people: ["王：行かせる人物", "臣：行く人物"],
  }),
  problem(12, "kanbun-advanced-patterns", {
    title: "受身の型",
    passage: "臣為レ王所レ信",
    prompt: "文の意味として正しいものを選びなさい。",
    choices: [["A", "臣が王を信頼した", "能動・受動の向きが逆。"], ["B", "王が臣に信頼された", "受身の主体を王にしている。"], ["C", "臣が王に信頼された"], ["D", "臣と王が互いに疑った", "疑いを表す字はない。"]],
    correctAnswer: "C", evidence: "「為A所B」は「AのBする所と為る」で受身。", explanation: "臣が受け手、王が信頼する側。「臣、王の信ずる所と為る」と書き下す。", questionType: "interpretation", grammarPoint: "受身・為A所B", reviewTags: ["受身", "人物関係"], writtenReading: "臣、王の信ずる所と為る", people: ["臣：信頼される人物", "王：信頼する人物"],
  }),
  problem(13, "kanbun-advanced-patterns", {
    title: "比較の向き",
    passage: "聞レ之不レ如レ見レ之",
    prompt: "優れているとされる行為を選びなさい。",
    choices: [["A", "聞くこと", "「A不如B」はAがBに及ばない。"], ["B", "見ること"], ["C", "聞くことと見ることは同じ", "不如が差を示している。"], ["D", "どちらも否定されている", "否定は比較の前項に働く。"]],
    correctAnswer: "B", evidence: "「A不如B」は「AはBに如かず」でBの方が優れる。", explanation: "前項の「聞く」は後項の「見る」に及ばない。比較の向きを選択肢で逆にしない。", questionType: "interpretation", grammarPoint: "比較・不如", reviewTags: ["比較", "不如"], writtenReading: "之を聞くは之を見るに如かず",
  }),
  problem(14, "kanbun-advanced-patterns", {
    title: "抑揚「況」",
    passage: "小事尚慎、況大事乎",
    prompt: "話者の主張を最も適切に言い換えたものを選びなさい。",
    choices: [["A", "小事だけ慎重にすれば大事は気にしなくてよい", "大事にはなおさら慎重であるべきだという抑揚の結論と逆である。"], ["B", "小事でさえ慎重なのだから、大事ならなおさら慎重にすべきだ"], ["C", "小事と大事のどちらが重要か質問している", "反語的抑揚であり情報質問ではない。"], ["D", "大事より小事の方が必ず難しい", "難易度の比較は本文にない。"]],
    correctAnswer: "B", evidence: "「尚〜、況〜乎」は前項から後項を「まして」と強める。", explanation: "小事について成立する慎重さを、大事にはなお強く求める。選択肢の「なおさら」が抑揚を表す。", questionType: "construction", grammarPoint: "抑揚・況〜乎", reviewTags: ["抑揚", "況"], writtenReading: "小事すら尚ほ慎む、況んや大事をや",
  }),
  problem(15, "kanbun-advanced-patterns", {
    title: "句法と人物を同時に追う",
    passage: "王欲レ治レ国、使二臣問一レ民。民為二吏所一レ苦。",
    prompt: "本文の人物関係として正しいものを選びなさい。",
    choices: [["A", "民が王に国を治めさせた", "欲の主語と使役関係を逆転している。"], ["B", "王が臣に民の事情を尋ねさせ、民は役人に苦しめられていた"], ["C", "臣が民に役人を苦しめさせた", "使役と受身の対象を取り違えている。"], ["D", "役人が王へ質問し、臣が苦しんだ", "登場人物の動作対応がすべて異なる。"]],
    correctAnswer: "B", evidence: "「使臣問民」で王→臣→民、「民為吏所苦」で民が吏に苦しめられる。", explanation: "使役と受身を別々に図示する。王は治国を望み臣を派遣、臣は民に問う。受身の主体は民、行為者は吏である。", questionType: "person-relation", grammarPoint: "使役・受身", reviewTags: ["使役", "受身", "人物関係"], writtenReading: "王、国を治めんと欲し、臣をして民に問はしむ。民、吏の苦しむる所と為る。", people: ["王：国を治めたい", "臣：民に尋ねる", "民：吏に苦しめられる", "吏：民を苦しめる"],
  }),

  problem(16, "kanbun-reading-relationships", {
    title: "問答から主語を決める",
    passage: "王問レ策。臣対曰、先安レ民。",
    prompt: "「先安民」と答えた人物を選びなさい。",
    choices: [["A", "王", "「問」に対して「対曰」で答えるのは臣。"], ["B", "臣"], ["C", "民", "民は発言者として示されていない。"], ["D", "策", "策は人物ではない。"]],
    correctAnswer: "B", evidence: "「臣対曰」で、臣が王の問いに答える構造が明示される。", explanation: "主語省略を直前名詞だけで決めず、問う王と答える臣という動詞の対で確定する。", questionType: "subject", grammarPoint: "省略主語・問答", reviewTags: ["主語", "会話"], writtenReading: "王、策を問ふ。臣対へて曰はく、先づ民を安んぜよ、と。", people: ["王：策を問う", "臣：答える", "民：安んじる対象"],
  }),
  problem(17, "kanbun-reading-relationships", {
    title: "目的を示す語",
    passage: "将軍築レ城、以防レ敵。",
    prompt: "城を築いた目的を選びなさい。",
    choices: [["A", "敵を迎え入れるため", "「防」は防ぐ意味で逆。"], ["B", "敵を防ぐため"], ["C", "敵に城を渡した結果", "目的を結果に置き換えている。"], ["D", "将軍が敵になったため", "人物関係を追加している。"]],
    correctAnswer: "B", evidence: "「以〜」が前の行為の目的・手段を導き、「防敵」と続く。", explanation: "築城→敵を防ぐ、という目的関係。「以」を単なる順接でなく「〜することで／〜するため」と読む。", questionType: "logic", grammarPoint: "目的・以", reviewTags: ["目的", "論理関係"], writtenReading: "将軍、城を築き、以て敵を防ぐ",
  }),
  problem(18, "kanbun-reading-relationships", {
    title: "同じ漢字の反復",
    passage: "客借レ書。主人与レ書。客読レ之、明日返レ之。",
    prompt: "二つの「之」が指すものを選びなさい。",
    choices: [["A", "どちらも客", "人ではなく直前に授受された書を受ける代名詞。"], ["B", "どちらも書"], ["C", "前は主人、後は客", "授受・読む・返す対象と合わない。"], ["D", "前は書、後は明日", "「明日」は時を示し返却対象にならない。"]],
    correctAnswer: "B", evidence: "主人が与えた「書」を客が読み、翌日返すという行動の連鎖。", explanation: "同じ「之」の反復と動詞「読・返」の目的語をつなぐ。対象を「書」に固定すると全行動が自然に続く。", questionType: "matching", grammarPoint: "指示語・反復", reviewTags: ["指示語", "人物関係"], writtenReading: "客、書を借る。主人、書を与ふ。客、之を読み、明日之を返す。", people: ["客：書を借り、読み、返す", "主人：書を与える"],
  }),
  problem(19, "kanbun-reading-relationships", {
    title: "因果の向き",
    passage: "雨甚、故河溢。民避二高地一。",
    prompt: "出来事の因果関係として正しいものを選びなさい。",
    choices: [["A", "民が高地へ避難したため雨が強くなった", "因果を逆転している。"], ["B", "川があふれたため雨が降り始めた", "「故」の前後を逆にしている。"], ["C", "大雨で川があふれ、民が高地へ避難した"], ["D", "高地があふれ、民が川へ避難した", "場所と行動の方向が本文と逆。"]],
    correctAnswer: "C", evidence: "「雨甚」→「故」→「河溢」と続き、その状況を受けて民が避難する。", explanation: "故は原因から結果を導く。大雨が原因、河川氾濫が直接の結果、民の避難がその後の対応。", questionType: "logic", grammarPoint: "因果・故", reviewTags: ["因果", "出来事順"], writtenReading: "雨甚だし、故に河溢る。民、高地に避く。",
  }),
  problem(20, "kanbun-reading-relationships", {
    title: "内容一致と言い過ぎ",
    passage: "師告レ弟子曰、学貴二日積一。速成者鮮矣。弟子乃定二毎日之課一。",
    prompt: "本文内容と一致するものを選びなさい。",
    choices: [["A", "師は短期間で必ず完成できる方法を教えた", "「速成者鮮矣」は速成する者は少ないという逆の内容。"], ["B", "弟子は学問をやめる決心をした", "毎日の課題を定めて継続しようとしている。"], ["C", "師は日々の積み重ねを重んじ、弟子は毎日の課題を定めた"], ["D", "すべての弟子が同じ課題を強制された", "「すべて」「強制」は本文にない。"]],
    correctAnswer: "C", evidence: "「学貴日積」と「弟子乃定毎日之課」が教えと行動で対応する。", explanation: "師の主張は日々の蓄積の価値。弟子はそれを受けて毎日の課題を設定した。Dは範囲と強制性を言い過ぎている。", questionType: "content", grammarPoint: "内容一致・乃", reviewTags: ["内容一致", "言い過ぎ", "人物関係"], writtenReading: "師、弟子に告げて曰はく、学は日に積むを貴ぶ。速やかに成る者は鮮なし、と。弟子乃ち毎日の課を定む。", people: ["師：継続の価値を教える", "弟子：毎日の課題を定める"],
  }),
] as const;
