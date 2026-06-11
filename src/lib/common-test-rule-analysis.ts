// ── 共通テスト ルールベース作戦会議 ─────────────────────────────────────
// Gemini API が使えない場合のフォールバック。AIなしでも実用的な助言を返す。

import type {
  CommonTestAiAnalysisInput,
  CommonTestAiAnalysisResult,
  CommonTestAiSectionAdvice,
  CommonTestAiNextAction,
  CommonTestAiSectionInput,
} from "@/lib/common-test-ai-analysis";
import {
  resolveCommonTestHref,
  topicRecommendedSectionId,
} from "@/lib/common-test-ai-analysis";
import {
  COMMON_TEST_SUBJECTS_MAP,
  type CommonTestSubjectId,
} from "@/data/common-test";

function fmtMin(sec: number): string {
  return `${Math.round(sec / 60)}分`;
}

function subjectTitle(input: CommonTestAiAnalysisInput): string {
  return (
    COMMON_TEST_SUBJECTS_MAP[input.subjectId as CommonTestSubjectId]?.title ??
    input.title
  );
}

function sectionLabel(input: CommonTestAiAnalysisInput, sectionId: string): string {
  const subject = COMMON_TEST_SUBJECTS_MAP[input.subjectId as CommonTestSubjectId];
  const num = Number(sectionId.replace("section-", ""));
  const section =
    input.sectionResults.find((s) => s.sectionId === sectionId) ??
    undefined;
  const title =
    section?.sectionTitle ??
    subject?.sections.find((s) => s.number === num)?.title;
  return title
    ? `${subjectTitle(input)}第${num}問（${title}）`
    : `${subjectTitle(input)}第${num}問`;
}

function accuracyOf(section: CommonTestAiSectionInput): number {
  return section.totalQuestions > 0
    ? section.correctCount / section.totalQuestions
    : 0;
}

function isOvertime(section: CommonTestAiSectionInput): boolean {
  return (
    section.recommendedTimeSec > 0 &&
    section.totalTimeSec > section.recommendedTimeSec
  );
}

function overtimeScore(section: CommonTestAiSectionInput): number {
  if (!isOvertime(section)) return 0;
  const overSec = section.totalTimeSec - section.recommendedTimeSec;
  const ratio = section.totalTimeSec / Math.max(section.recommendedTimeSec, 1);
  return overSec / 60 + ratio * 5;
}

function sectionPointEfficiency(section: CommonTestAiSectionInput): number {
  if (section.sectionScore && section.earnedScore != null) {
    return (section.sectionScore - section.earnedScore) / section.sectionScore;
  }
  return 1 - accuracyOf(section);
}

function pickWeakestSection(
  input: CommonTestAiAnalysisInput
): CommonTestAiSectionInput | undefined {
  return [...input.sectionResults].sort((a, b) => {
    const byAccuracy = accuracyOf(a) - accuracyOf(b);
    if (byAccuracy !== 0) return byAccuracy;
    return sectionPointEfficiency(b) - sectionPointEfficiency(a);
  })[0];
}

function pickHighValueSection(
  input: CommonTestAiAnalysisInput
): CommonTestAiSectionInput | undefined {
  return [...input.sectionResults].sort((a, b) => {
    const aValue = sectionPointEfficiency(a) * (a.sectionScore ?? 10);
    const bValue = sectionPointEfficiency(b) * (b.sectionScore ?? 10);
    return bValue - aValue;
  })[0];
}

function pickOvertimeSection(
  input: CommonTestAiAnalysisInput
): CommonTestAiSectionInput | undefined {
  return [...input.sectionResults]
    .filter(isOvertime)
    .sort((a, b) => overtimeScore(b) - overtimeScore(a))[0];
}

function includesTag(input: CommonTestAiAnalysisInput, words: string[]): boolean {
  const text = [
    ...input.weakSkillTags,
    ...input.sectionResults.flatMap((s) => [
      s.sectionTitle ?? "",
      ...s.weakSkillTags,
    ]),
  ]
    .join(" ")
    .toLowerCase();
  return words.some((word) => text.includes(word.toLowerCase()));
}

function sectionAction(input: CommonTestAiAnalysisInput, section: CommonTestAiSectionInput): string {
  const label = sectionLabel(input, section.sectionId);

  if (input.subjectId === "english-reading" && section.sectionId === "section-5") {
    return "設問を先に読み、条件語に印を付けてから本文を確認しましょう。情報照合は本文を全部読み直すより、条件ごとに照合する練習が有効です。";
  }
  if (input.subjectId === "english-reading" && section.sectionId === "section-8") {
    return "資料ごとに役割を分け、空欄の前後に合う根拠を一つずつ確認しましょう。レポート完成形式は、根拠の位置を短時間で探す練習が効きます。";
  }
  if (input.subjectId === "math-1a" && section.sectionId === "section-2") {
    return "データ分析は表・グラフ・四分位数の読み取りを10分以内で処理する練習をしてください。計算前に何を比べる問題かを確認しましょう。";
  }
  if (input.subjectId === "math-1a" && section.sectionId === "section-4") {
    return "場合の数は条件を分けてから数え上げましょう。樹形図や余事象を使う練習をして、同じものを重複して数えない確認を入れてください。";
  }
  if (input.subjectId === "math-2bc" && section.sectionId === "section-3") {
    return "数列は初項・公差・漸化式の形を先に整理しましょう。誘導の式を写すだけでなく、何を求める段階かを言語化して解く練習が有効です。";
  }
  if (input.subjectId === "math-2bc" && section.sectionId === "section-5") {
    return "ベクトルは図に基準点と向きを書き込み、内積や位置ベクトルの条件を式に直す練習をしましょう。計算より前の設定で差がつきます。";
  }

  if (accuracyOf(section) < 0.5) {
    return `${section.weakSkillTags[0] ?? "基本事項"}を中心に、まず時間を気にせず${label}を確実に解ける状態に戻しましょう。`;
  }
  if (isOvertime(section)) {
    return `${label}は解き方が見えている可能性があります。同じ形式を時間を計って解き、処理手順を短くしましょう。`;
  }
  if (section.unansweredCount > 0) {
    return `${label}では未解答が出ています。解ける設問から先に処理し、難しい設問は後回しにする判断を練習しましょう。`;
  }
  return `${label}は比較的安定しています。次回も同じ時間配分で解けるか確認しましょう。`;
}

function addAction(
  actions: CommonTestAiNextAction[],
  input: CommonTestAiAnalysisInput,
  action: CommonTestAiNextAction,
  hint = ""
): void {
  if (actions.length >= 3) return;
  const href = resolveCommonTestHref(
    action.href,
    input,
    `${action.title} ${action.reason} ${hint}`
  );
  const duplicate = actions.some((a) => a.title === action.title || a.href === href);
  if (!duplicate) actions.push({ ...action, href });
}

export function buildRuleBasedAnalysis(
  input: CommonTestAiAnalysisInput
): CommonTestAiAnalysisResult {
  const unit = input.totalScore === 100 ? "点" : "問";
  const gap = input.scoreGap;
  const targetDiff =
    input.targetScore != null ? input.targetScore - input.timeLimitScore : null;
  const unansweredRate =
    input.totalScore > 0 ? input.unansweredCount / input.totalScore : 0;
  const overtimeSection = pickOvertimeSection(input);
  const weakest = pickWeakestSection(input);
  const highValue = pickHighValueSection(input);
  const topicSectionId = topicRecommendedSectionId(input);

  let scoreDiagnosis: string;
  if (gap >= 10) {
    scoreDiagnosis = `時間内スコアと無制限スコアの差が${gap}${unit}あります。理解不足よりも、時間内に処理し切る速度と解答順序に課題が出ています。`;
  } else if (gap >= 4) {
    scoreDiagnosis = `無制限では${input.unlimitedScore}${unit}まで届いています。あと${gap}${unit}分は、見直しすぎや後半の時間不足を調整すると伸ばせる可能性があります。`;
  } else {
    scoreDiagnosis = `時間内スコアと無制限スコアの差は${gap}${unit}で、時間条件による取りこぼしは小さめです。次は正答率の低い大問で失点原因を細かく確認しましょう。`;
  }

  let timeDiagnosis: string;
  if (input.actualTimeSec > input.examLimitSec) {
    timeDiagnosis = `全体で制限時間${fmtMin(input.examLimitSec)}を超えています。`;
  } else {
    timeDiagnosis = `所要時間は${fmtMin(input.actualTimeSec)}で、全体としては制限時間内に収まっています。`;
  }
  if (overtimeSection) {
    timeDiagnosis += ` 特に${sectionLabel(input, overtimeSection.sectionId)}で推奨${fmtMin(
      overtimeSection.recommendedTimeSec
    )}に対して約${fmtMin(overtimeSection.totalTimeSec)}かかっています。次回はこの大問だけを時間を計って解きましょう。`;
  }
  if (input.unansweredCount >= 3 || unansweredRate >= 0.15) {
    timeDiagnosis += ` 未解答が${input.unansweredCount}問あります。最初に解く大問と後回しにする設問の基準を決めることが優先です。`;
  } else if (input.unansweredCount > 0) {
    timeDiagnosis += ` 未解答が${input.unansweredCount}問あります。最後の数分で解ける小問を拾う練習を入れましょう。`;
  }

  const sectionAdvice: CommonTestAiSectionAdvice[] = input.sectionResults
    .slice(0, 6)
    .map((s) => {
      const accuracy = Math.round(accuracyOf(s) * 100);
      const num = s.sectionId.replace("section-", "");
      let diagnosis = `正答 ${s.correctCount}/${s.totalQuestions}（正答率${accuracy}%）`;
      if (s.sectionScore != null && s.earnedScore != null) {
        diagnosis += `、得点 ${s.earnedScore}/${s.sectionScore}点`;
      }
      if (isOvertime(s)) {
        diagnosis += `。推奨${fmtMin(s.recommendedTimeSec)}に対し約${fmtMin(
          s.totalTimeSec
        )}かかっています`;
      }
      if (s.unansweredCount > 0) {
        diagnosis += `。未解答が${s.unansweredCount}問あります`;
      }
      diagnosis += "。";

      return {
        sectionId: s.sectionId,
        title: `${subjectTitle(input)}第${num}問`,
        diagnosis,
        nextAction: sectionAction(input, s),
      };
    });

  let weakPointSummary: string;
  const topTags = input.weakSkillTags.slice(0, 3);
  if (topTags.length > 0) {
    weakPointSummary = `今回の弱点は「${topTags.join("」「")}」です。関連する大問を短時間で解き直し、解法を思い出すまでの時間を縮めましょう。`;
  } else {
    weakPointSummary =
      "目立った弱点タグはありません。正答率の低い大問を中心に、解き直しで根拠を確認しましょう。";
  }

  const nextThreeActions: CommonTestAiNextAction[] = [];

  if (topicSectionId) {
    const label = sectionLabel(input, topicSectionId);
    addAction(
      nextThreeActions,
      input,
      {
        title: `${label}を優先して演習`,
        reason: "弱点タグから見て、最初に改善すると得点へつながりやすい大問です。",
        href: `/common-test/${input.subjectId}/${topicSectionId}`,
      },
      topTags.join(" ")
    );
  }

  if (input.subjectId === "english-reading" && includesTag(input, ["情報照合", "matching"])) {
    addAction(nextThreeActions, input, {
      title: "英語リーディング第5問で情報照合を練習",
      reason: "設問条件を先に読み、本文中の根拠と照合する練習が必要です。",
      href: "/common-test/english-reading/section-5",
    });
  }

  if (input.subjectId === "english-reading" && includesTag(input, ["レポート", "report"])) {
    addAction(nextThreeActions, input, {
      title: "英語リーディング第8問で資料統合を練習",
      reason: "複数資料の役割を分けて読むと、レポート完成形式の失点を減らせます。",
      href: "/common-test/english-reading/section-8",
    });
  }

  if (overtimeSection) {
    addAction(nextThreeActions, input, {
      title: `${sectionLabel(input, overtimeSection.sectionId)}を時間を計って解く`,
      reason: `推奨時間を超えています。まずは目標時間を${fmtMin(overtimeSection.recommendedTimeSec)}に設定して解き直しましょう。`,
      href: `/common-test/${input.subjectId}/${overtimeSection.sectionId}`,
    });
  }

  if (targetDiff != null && targetDiff <= 10) {
    addAction(nextThreeActions, input, {
      title: "細かい失点原因を復習キューで確認",
      reason: `目標まであと${Math.max(targetDiff, 0)}${unit}です。新しい範囲を広げるより、誤答・未解答・自信のない正解を減らしましょう。`,
      href: "/common-test/review",
    });
  } else if (targetDiff != null && targetDiff >= 20 && highValue) {
    addAction(nextThreeActions, input, {
      title: `${sectionLabel(input, highValue.sectionId)}から得点を伸ばす`,
      reason: `目標まであと${targetDiff}${unit}あります。配点と改善余地の大きい大問から取り組むのが効率的です。`,
      href: `/common-test/${input.subjectId}/${highValue.sectionId}`,
    });
  }

  if (input.unansweredCount >= 3 || unansweredRate >= 0.15) {
    addAction(nextThreeActions, input, {
      title: "本番形式で解答順序を決める",
      reason: `未解答が${input.unansweredCount}問あります。最初に解く大問と、時間が足りないときに後回しにする設問を決めましょう。`,
      href: "/common-test/simulator",
    });
  }

  if (weakest) {
    addAction(nextThreeActions, input, {
      title: `${sectionLabel(input, weakest.sectionId)}を解き直す`,
      reason: "正答率が最も低く、今回の結果の中で優先度が高い大問です。",
      href: `/common-test/${input.subjectId}/${weakest.sectionId}`,
    });
  }

  addAction(nextThreeActions, input, {
    title: "復習キューで誤答を解き直す",
    reason: "誤答や自信のない正解を数日後に解き直すと、同じ失点を減らしやすくなります。",
    href: "/common-test/review",
  });

  while (nextThreeActions.length < 3) {
    addAction(nextThreeActions, input, {
      title: "本番形式でもう一度通し演習",
      reason: "時間配分と解答順序を確認し、今回の改善点を次の演習で試しましょう。",
      href: "/common-test/simulator",
    });
    if (nextThreeActions.length < 3 && weakest) {
      addAction(nextThreeActions, input, {
        title: `${sectionLabel(input, weakest.sectionId)}の類題を追加演習`,
        reason: "同じ大問で類題を解くと、解法を選ぶ速度が上がります。",
        href: `/common-test/${input.subjectId}/${weakest.sectionId}`,
      });
    }
    if (nextThreeActions.length < 3) {
      nextThreeActions.push({
        title: "今回の弱点タグを見直す",
        reason: "弱点タグを一つ選び、次の演習前に公式・読み方・解答手順を確認しましょう。",
        href: "/common-test/review",
      });
    }
  }

  const reviewQueueAdvice =
    "誤答、未解答、自信のないまま正解した問題は復習キューに入れてください。数日後に解き直すことで、知識の抜けと読み違いを見つけやすくなります。";

  let targetScoreAdvice: string;
  if (targetDiff == null) {
    targetScoreAdvice =
      "司令室で目標点を設定すると、目標までの差分に合わせて優先順位を調整できます。";
  } else if (targetDiff <= 0) {
    targetScoreAdvice = `時間内スコア${input.timeLimitScore}${unit}は目標に届いています。次回は同じ得点を時間内で安定して出すことを確認しましょう。`;
  } else if (targetDiff <= 10) {
    targetScoreAdvice = `目標まであと${targetDiff}${unit}です。大きく範囲を広げるより、読み違い・計算ミス・時間超過の小さな失点を優先して減らしましょう。`;
  } else if (targetDiff >= 20 && highValue) {
    targetScoreAdvice = `目標まであと${targetDiff}${unit}あります。まず${sectionLabel(input, highValue.sectionId)}のような配点と改善余地が大きい大問から伸ばすのが効率的です。`;
  } else {
    targetScoreAdvice = `目標まであと${targetDiff}${unit}です。弱点タグに関わる大問と、推奨時間を超えた大問を一つずつ改善しましょう。`;
  }

  const summary = `${subjectTitle(input)}の結果です。時間内スコア${input.timeLimitScore}${unit} / ${input.totalScore}${unit}。${
    gap >= 10
      ? "理解は残っているので、処理速度と解答順序を整えると伸ばしやすい状態です。"
      : input.unansweredCount >= 3
        ? "未解答を減らす時間設計が次の課題です。"
        : targetDiff != null && targetDiff <= 10
          ? "目標に近いため、細かい失点原因の確認が効果的です。"
          : "弱点大問を絞って解き直すと、次回の得点につながります。"
  }`;

  const encouragement =
    "今回の結果は、次に直す場所を見つけるための材料です。優先順位を一つに絞って演習すれば、次回の得点に反映しやすくなります。";

  return {
    summary,
    scoreDiagnosis,
    timeDiagnosis,
    sectionAdvice,
    weakPointSummary,
    nextThreeActions: nextThreeActions.slice(0, 3),
    reviewQueueAdvice,
    targetScoreAdvice,
    encouragement,
  };
}
