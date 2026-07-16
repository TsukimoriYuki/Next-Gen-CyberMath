import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, ClipboardCheck, GraduationCap, Trophy } from "lucide-react";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";
import {
  filterVisibleSubjectsByCapability,
  SUBJECTS,
  type SubjectId,
} from "@/data/subjects";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "模試・入試対策",
  description: "公開中の共通テスト対策、オリジナル模試、入試形式演習を教科別に選ぶページです。",
  path: "/exams",
});

const ACTIONS_BY_SUBJECT = {
  math: [
    { title: "共通テスト数学IA", description: "数学IAを大問別に練習し、時間配分と判断順を確認します。", href: "/common-test/math-1a", label: "数学IA対策を開く", icon: GraduationCap },
    { title: "共通テスト数学II・B・C", description: "必答・選択大問を分け、数学II・B・Cを単元別に練習します。", href: "/common-test/math-2bc", label: "数学II・B・C対策を開く", icon: BookOpen },
    { title: "オリジナル模試", description: "PDF冊子とWeb解答欄で、70分の本番形式に取り組みます。", href: "/common-test/simulator", label: "公開中の模試を見る", icon: ClipboardCheck },
    { title: "数学 入試良問演習", description: "大学入試の典型テーマをもとにしたオリジナル類題です。", href: "/dojo", label: "数学の良問を解く", icon: Trophy },
  ],
  english: [
    { title: "共通テスト英語リーディング", description: "情報検索、資料照合、要約、推論を大問別に練習します。", href: "/common-test/english-reading", label: "英語リーディング対策を開く", icon: BookOpen },
    { title: "英語 入試良問演習", description: "大学群の傾向を参考にしたオリジナル問題に取り組みます。", href: "/english/dojo", label: "英語の入試形式演習を始める", icon: Trophy },
  ],
  informatics: [
    { title: "情報Ⅰ オリジナル模試", description: "60分・100点の完全オリジナルWeb模試で、分野別の弱点まで確認します。", href: "/informatics/mock-exam", label: "情報Ⅰの模試を開く", icon: ClipboardCheck },
  ],
} satisfies Partial<Record<SubjectId, readonly LearningAction[]>>;

export default function ExamsPage() {
  const subjects = filterVisibleSubjectsByCapability(SUBJECTS, "exams");
  if (subjects.length === 0) notFound();

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero eyebrow="模試・入試対策" title="試験形式で、判断と時間配分を確かめる。" description="教科ごとに、公開中の共通テスト対策、模試、大学入試を想定したオリジナル問題を案内します。" actions={[{ label: "教科から選ぶ", href: "/subjects" }]} />
        {subjects.map((subject) => {
          const actions =
            ACTIONS_BY_SUBJECT[subject.id as keyof typeof ACTIONS_BY_SUBJECT];
          if (!actions) return null;
          return (
            <LearningSection key={subject.id} title={subject.name}>
              <LearningActionGrid actions={actions} />
            </LearningSection>
          );
        })}
      </LearningPageContainer>
    </LearningPage>
  );
}
