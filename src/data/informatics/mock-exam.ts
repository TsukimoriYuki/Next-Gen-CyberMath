import type {
  CommonTestMockExam,
  CommonTestQuestion,
  ExamChoice,
} from "@/data/common-test-mock-exams";
import type {
  INFORMATICS_DIAGNOSTIC_DOMAINS,
  INFORMATICS_MISTAKE_CAUSES,
} from "@/data/informatics/exam-practice";

type Domain = (typeof INFORMATICS_DIAGNOSTIC_DOMAINS)[number];
type Mistake = (typeof INFORMATICS_MISTAKE_CAUSES)[number];
type Option = { text: string; correct?: boolean; reason: string };

const LESSON = {
  morals: "/courses/informatics-1/information-society-problem-solving/info-morals-ip-privacy",
  security: "/courses/informatics-1/information-society-problem-solving/info-security-basics",
  design: "/courses/informatics-1/information-design-communication/info-design-communication",
  bits: "/courses/informatics-1/computer-digital-data/number-systems-bits",
  media: "/courses/informatics-1/computer-digital-data/digital-text-image-audio",
  size: "/courses/informatics-1/computer-digital-data/data-size-compression-error",
  loops: "/courses/informatics-1/programming-algorithms/branching-loops",
  arrays: "/courses/informatics-1/programming-algorithms/arrays-functions-decomposition",
  algorithms: "/courses/informatics-1/programming-algorithms/algorithms-search-simulation",
  network: "/courses/informatics-1/network-data-use/network-communication",
  web: "/courses/informatics-1/network-data-use/internet-web-dns",
  database: "/courses/informatics-1/network-data-use/databases-data-organization",
  analysis: "/courses/informatics-1/network-data-use/data-analysis-visualization-modeling",
} as const;

function options(items: Option[]): ExamChoice[] {
  return items.map((item, index) => ({
    id: String(index),
    label: String.fromCharCode(65 + index),
    text: item.text,
    isCorrect: item.correct,
    trap: item.reason,
  }));
}

function q(input: {
  id: string;
  prompt: string;
  points: number;
  choices: Option[];
  explanation: string;
  domain: Domain;
  mistake: Mistake;
  lesson: string;
  multi?: boolean;
  dependsOnPrevious?: boolean;
}): CommonTestQuestion {
  const correctIds = input.choices.flatMap((item, index) =>
    item.correct ? [String(index)] : [],
  );
  return {
    id: input.id,
    prompt: input.prompt,
    answerFormat: input.multi ? "multi-choice" : "choice",
    choices: options(input.choices),
    points: input.points,
    difficulty: "standard",
    skillTags: [input.domain],
    commonMistakes: [input.mistake],
    diagnosticDomains: [input.domain],
    mistakeCauseIds: [input.mistake],
    answer: input.multi ? correctIds : correctIds[0],
    explanation: `${input.explanation} 選択肢: ${input.choices
      .map((item, index) => `${String.fromCharCode(65 + index)} ${item.reason}`)
      .join(" ")}`,
    shortSolution: input.explanation,
    reviewLinks: [input.lesson],
    measuredAbility: input.domain,
    timeSavingTip: "設問の目的語と資料の条件を対応させる。",
    dependsOnPrevious: input.dependsOnPrevious,
  };
}

function n(input: {
  id: string;
  prompt: string;
  points: number;
  answer: string;
  explanation: string;
  domain: Domain;
  mistake: Mistake;
  lesson: string;
  dependsOnPrevious?: boolean;
}): CommonTestQuestion {
  return {
    id: input.id,
    prompt: input.prompt,
    answerFormat: "numeric",
    points: input.points,
    difficulty: "standard",
    skillTags: [input.domain],
    commonMistakes: [input.mistake],
    diagnosticDomains: [input.domain],
    mistakeCauseIds: [input.mistake],
    answer: input.answer,
    explanation: input.explanation,
    shortSolution: input.explanation,
    reviewLinks: [input.lesson],
    measuredAbility: input.domain,
    timeSavingTip: "単位と反復範囲を式の前に書き出す。",
    dependsOnPrevious: input.dependsOnPrevious,
  };
}

const correct = (text: string): Option => ({ text, correct: true, reason: "正答。資料と目的に一致する。" });
const wrong = (text: string, reason: string): Option => ({ text, reason: `誤り。${reason}` });

export const INFORMATICS_MOCK_EXAM_001: CommonTestMockExam = {
  id: "informatics-original-mock-001",
  slug: "information-1-original-001",
  title: "情報Ⅰ 共通テスト型オリジナル模試 第1回",
  subject: "informatics",
  subjectLabel: "情報Ⅰ",
  backHref: "/informatics/mock-exam",
  durationMinutes: 60,
  totalPoints: 100,
  targetAverage: { min: 52, max: 62 },
  source: "original-web",
  status: "published",
  lectureLinks: Object.entries(LESSON).map(([label, href]) => ({ label, href })),
  sections: [
    {
      id: "info-mock-s1",
      title: "第1問",
      unit: "情報社会・セキュリティ・情報デザイン",
      points: 20,
      estimatedMinutes: 12,
      theme: "地域イベントの案内サイト",
      leadText: "実行委員会は参加登録と災害時案内を作る。個別の法的断定ではなく、一般的な情報モラルと安全性の原則で判断する。",
      assets: [
        { type: "conversation", id: "m1-talk", title: "委員の会話", lines: [
          { speaker: "アキ", text: "参加登録は運営に必要な項目だけにしよう。" },
          { speaker: "リオ", text: "避難経路は色と線種と文字を組み合わせよう。" },
        ] },
        { type: "table", id: "m1-table", title: "設計案", headers: ["案", "登録項目", "認証", "案内"], rows: [
          ["P", "氏名・連絡先・参加枠", "パスワードのみ", "赤と緑だけ"],
          ["Q", "氏名・連絡先・参加枠", "パスワード＋確認コード", "色＋線種＋文字"],
          ["R", "氏名・全閲覧履歴", "共通パスワード", "小さい文字だけ"],
        ] },
      ],
      questions: [
        q({ id: "im1-01", prompt: "目的に対して過剰な収集を避け、認証と案内も改善した案を選べ。", points: 5, choices: [wrong("P", "案内が色だけで認証も単一要素である。"), correct("Q"), wrong("R", "不要な閲覧履歴を集め、共通パスワードを使う。")], explanation: "Qは必要項目に限定し、異なる認証要素と複数の視覚手掛かりを使う。", domain: "情報社会・情報モラル", mistake: "条件の読み落とし", lesson: LESSON.morals }),
        q({ id: "im1-02", prompt: "多要素認証と通信暗号化の説明として適切なものを選べ。", points: 5, choices: [correct("多要素認証は本人確認を強化し、通信暗号化は経路上の盗み見や改変を防ぎやすくする"), wrong("どちらも掲載内容の正確さを保証する", "内容の正確性は別に確認する。"), wrong("多要素認証は画像を圧縮する", "認証と圧縮は別である。"), wrong("暗号化は収集目的を決める", "目的設定の役割ではない。")], explanation: "認証と暗号化は守る対象と役割が異なる。", domain: "セキュリティ", mistake: "セキュリティ対策の目的の混同", lesson: LESSON.security }),
        q({ id: "im1-03", prompt: "読み上げ利用者にも避難表を伝える改善をすべて選べ。", points: 5, multi: true, choices: [correct("列見出しを設定する"), correct("図へ代替テキストを付ける"), wrong("色だけで危険度を示す", "色を利用できない場合に意味が失われる。"), wrong("見出し順を無作為にする", "文書構造が分かりにくい。")], explanation: "意味構造と代替表現を用意する。", domain: "情報デザイン", mistake: "グラフ選択ミス", lesson: LESSON.design, dependsOnPrevious: true }),
        q({ id: "im1-04", prompt: "SNSで未確認情報が拡散している。最も適切な対応を選べ。", points: 5, choices: [correct("発信元と複数の信頼できる情報を確認し、未確認のまま再拡散しない"), wrong("注目を集めるため直ちに共有する", "正確性を確認していない。"), wrong("投稿者の個人情報を公開する", "問題解決にならず権利侵害のおそれがある。"), wrong("画像があれば必ず真実とみなす", "画像も文脈や加工を確認する必要がある。")], explanation: "根拠と出所を確かめ、拡散の影響を考える。", domain: "情報社会・情報モラル", mistake: "用語理解不足", lesson: LESSON.morals }),
      ],
    },
    {
      id: "info-mock-s2",
      title: "第2問",
      unit: "デジタル表現・ネットワーク",
      points: 25,
      estimatedMinutes: 14,
      theme: "動画紹介ページの配信計画",
      leadText: "1KB=1000B、1MB=1000KB、1B=8bitとする。画像・音声のヘッダーを無視した圧縮前の理論値を用いる。回線速度は8Mbps（8,000,000bit/秒）。",
      assets: [
        { type: "table", id: "m2-table", title: "素材", headers: ["素材", "条件", "圧縮後"], rows: [
          ["画像", "1000×600画素・24bit/画素", "圧縮前の50%"],
          ["音声", "16000Hz・16bit・30秒・モノラル", "圧縮前の25%"],
        ] },
        { type: "conversation", id: "m2-talk", title: "配信担当の会話", lines: [
          { speaker: "ミオ", text: "byteとbitをそろえて転送時間を求めよう。" },
          { speaker: "ケイ", text: "HTTPSでも内容の正しさは別に確認しよう。" },
        ] },
      ],
      questions: [
        n({ id: "im2-01", prompt: "画像の圧縮前データ量をBで答えよ。", points: 5, answer: "1800000", explanation: "1000×600×24÷8=1,800,000B。", domain: "デジタル表現", mistake: "単位変換ミス", lesson: LESSON.media }),
        n({ id: "im2-02", prompt: "画像の圧縮後データ量をBで答えよ。", points: 5, answer: "900000", explanation: "1,800,000×0.50=900,000B。", domain: "デジタル表現", mistake: "計算ミス", lesson: LESSON.size, dependsOnPrevious: true }),
        n({ id: "im2-03", prompt: "音声の圧縮後データ量をBで答えよ。", points: 5, answer: "240000", explanation: "16000×16×30÷8×0.25=240,000B。", domain: "デジタル表現", mistake: "単位変換ミス", lesson: LESSON.media }),
        n({ id: "im2-04", prompt: "圧縮後の画像と音声を8Mbpsで送る理論上の転送時間を秒で答えよ。", points: 5, answer: "1.14", explanation: "(900,000+240,000)×8÷8,000,000=1.14秒。", domain: "ネットワーク・データ活用", mistake: "単位変換ミス", lesson: LESSON.network, dependsOnPrevious: true }),
        q({ id: "im2-05", prompt: "HTTPSで配信する場合に言えることを選べ。", points: 5, choices: [correct("通信経路の保護に役立つが、掲載内容や運営者の安全性まで自動保証しない"), wrong("ページの情報が必ず正しい", "内容の検証は別である。"), wrong("DNSが不要になる", "名前解決は引き続き必要である。"), wrong("圧縮後データが0Bになる", "HTTPSは圧縮率を0にしない。")], explanation: "経路保護と内容の信頼性を区別する。", domain: "セキュリティ", mistake: "セキュリティ対策の目的の混同", lesson: LESSON.web }),
      ],
    },
    {
      id: "info-mock-s3",
      title: "第3問",
      unit: "プログラミング・アルゴリズム",
      points: 30,
      estimatedMinutes: 18,
      theme: "待ち時間の簡易シミュレーション",
      leadText: "←は代入、==は等価比較。配列添字は0から始まり、反復『0からn-1』は両端を含む。x DIV yは整数除算で小数部分を切り捨てる。",
      assets: [
        { type: "table", id: "m3-table", title: "到着人数", headers: ["添字", "0", "1", "2", "3", "4"], rows: [["arrivals", "2", "0", "3", "1", "2"]] },
        { type: "conversation", id: "m3-talk", title: "作成者の会話", lines: [
          { speaker: "エナ", text: "各分に処理できる人数は2人とする。" },
          { speaker: "ジュン", text: "待ち人数は0未満にはしない。" },
        ] },
      ],
      questions: [
        n({ id: "im3-01", prompt: "total←0 とし、iを0から4まで動かして total←total+arrivals[i] を行う。totalを答えよ。", points: 5, answer: "8", explanation: "2+0+3+1+2=8。", domain: "プログラミング", mistake: "トレースミス", lesson: LESSON.arrays }),
        q({ id: "im3-02", prompt: "平均到着人数を total DIV 5 で求めた結果を選べ。", points: 5, choices: [wrong("0", "合計を反復回数で割っていない。"), correct("1"), wrong("1.6", "DIVでは小数部分を切り捨てる。"), wrong("8", "合計値のままである。")], explanation: "8 DIV 5=1。", domain: "プログラミング", mistake: "擬似コード規則の見落とし", lesson: LESSON.loops, dependsOnPrevious: true }),
        {
          id: "im3-03",
          prompt: "wait←0。各iで wait←wait+arrivals[i]、次に wait←max(0, wait-2) とする。i=0終了時とi=2終了時のwaitをそれぞれ答えよ。",
          answerFormat: "blank",
          blanks: [
            { id: "after0", label: "ア", type: "integer", correctAnswer: "0" },
            { id: "after2", label: "イ", type: "integer", correctAnswer: "1" },
          ],
          scoringGroups: [
            { id: "im3-03-a", answerLabels: ["ア"], points: 5, correctAnswers: { ア: 0 }, rationale: "i=0の更新は独立した中間状態。" },
            { id: "im3-03-b", answerLabels: ["イ"], points: 5, correctAnswers: { イ: 1 }, rationale: "i=2までの追跡結果を別に採点する。" },
          ],
          points: 10,
          difficulty: "standard",
          skillTags: ["プログラミング"],
          commonMistakes: ["トレースミス"],
          diagnosticDomains: ["プログラミング"],
          mistakeCauseIds: ["トレースミス"],
          answer: { after0: "0", after2: "1" },
          explanation: "i=0: 0+2-2=0。i=1: max(0,0+0-2)=0。i=2: 0+3-2=1。2つの中間状態は5点ずつ独立採点する。",
          shortSolution: "ア=0、イ=1。",
          reviewLinks: [LESSON.algorithms],
          measuredAbility: "プログラミング",
          timeSavingTip: "各反復後のwaitだけを表に書く。",
          dependsOnPrevious: true,
        },
        q({ id: "im3-04", prompt: "到着人数3が最初に現れる添字を探す方法として適切なものを選べ。", points: 5, choices: [correct("先頭から順に調べる線形探索"), wrong("未整列のまま二分探索", "配列は値順に整列されていない。"), wrong("すべて0にしてから探す", "探索対象を失う。"), wrong("乱数だけで位置を決める", "正しい位置を保証しない。")], explanation: "未整列配列では先頭から線形探索する。", domain: "プログラミング", mistake: "条件の読み落とし", lesson: LESSON.algorithms }),
        n({ id: "im3-05", prompt: "処理人数を毎分3人に変更し、同じ更新を5回行う。最終waitを答えよ。", points: 5, answer: "0", explanation: "各回max(0,wait+到着-3)を計算すると0,0,0,0,0。", domain: "プログラミング", mistake: "トレースミス", lesson: LESSON.algorithms, dependsOnPrevious: true }),
      ],
    },
    {
      id: "info-mock-s4",
      title: "第4問",
      unit: "データベース・データ分析・モデル化",
      points: 25,
      estimatedMinutes: 16,
      theme: "学習イベントの改善",
      leadText: "参加表と回答表を関連付け、結果を分析する。欠損や外れ値は原因を確認し、相関だけで因果を断定しない。",
      assets: [
        { type: "table", id: "m4-table", title: "表の構造", headers: ["表", "主キー", "フィールド"], rows: [
          ["参加", "participant_id", "grade, course"],
          ["回答", "response_id", "participant_id, minutes, score"],
        ] },
        { type: "conversation", id: "m4-talk", title: "分析班の会話", lines: [
          { speaker: "カナ", text: "訓練データと評価データを分けよう。" },
          { speaker: "シン", text: "対象学年が偏っていないかも確認しよう。" },
        ] },
      ],
      questions: [
        q({ id: "im4-01", prompt: "回答表のparticipant_idの役割を選べ。", points: 5, choices: [correct("参加表の参加者へ結び付ける外部キー"), wrong("回答表の主キー", "主キーはresponse_idである。"), wrong("得点の平均", "識別子であり集計値ではない。"), wrong("通信プロトコル", "表間の関係を示す値である。")], explanation: "participant_idで2表を関連付ける。", domain: "ネットワーク・データ活用", mistake: "表の対応関係の誤認", lesson: LESSON.database }),
        q({ id: "im4-02", prompt: "minutesが欠損している行への最初の対応を選べ。", points: 5, choices: [correct("欠損理由と分析への影響を確認して処理を決める"), wrong("必ず0分とする", "未記録と0分は異なる。"), wrong("全データを削除する", "必要な観測まで失う。"), wrong("scoreを100にする", "根拠のない変更である。")], explanation: "欠損の仕組みを調べて除外・補完・別扱いを判断する。", domain: "ネットワーク・データ活用", mistake: "条件の読み落とし", lesson: LESSON.analysis }),
        q({ id: "im4-03", prompt: "学習時間と得点に正の相関があった。適切な解釈を選べ。", points: 5, choices: [correct("ともに増える傾向はあるが、学習時間が原因とはこの結果だけで断定できない"), wrong("全員が長時間なら必ず満点になる", "個人差と他要因を無視する。"), wrong("学習時間が唯一の原因である", "相関から唯一の原因は分からない。"), wrong("関係は一切ない", "正の相関という傾向はある。")], explanation: "相関と因果を区別する。", domain: "ネットワーク・データ活用", mistake: "相関と因果の混同", lesson: LESSON.analysis }),
        q({ id: "im4-04", prompt: "course別に『scoreが70以上・70未満』の人数を比較する方法を選べ。", points: 5, choices: [correct("courseと得点区分のクロス集計"), wrong("participant_idの平均", "識別子の平均に意味がない。"), wrong("minutesの最大値だけ", "2カテゴリの人数を比較できない。"), wrong("response_id順の一覧だけ", "集計にならない。")], explanation: "2つのカテゴリの組合せ別人数をクロス集計する。", domain: "ネットワーク・データ活用", mistake: "表の対応関係の誤認", lesson: LESSON.analysis, dependsOnPrevious: true }),
        q({ id: "im4-05", prompt: "予測モデルの公開前評価として適切なものをすべて選べ。", points: 5, multi: true, choices: [correct("訓練に未使用の評価データで測る"), correct("学年やcourseの偏りを確認する"), wrong("訓練データへの一致だけを見る", "過学習を見逃す。"), wrong("都合のよい一例だけ選ぶ", "性能全体を評価できない。")], explanation: "未知データへの性能とデータの代表性を確認する。", domain: "ネットワーク・データ活用", mistake: "条件の読み落とし", lesson: LESSON.analysis }),
      ],
    },
  ],
};
