import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Languages, PenLine } from "lucide-react";
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
  title: "学ぶ",
  description: "公開中の教科から、講座や基礎学習の内容を選ぶページです。",
  path: "/learn",
});

const ACTIONS_BY_SUBJECT = {
  math: [
    {
      title: "数学の体系講座",
      description: "数学IAと数学II・B・Cを、新課程の単元順に学びます。",
      href: "/courses",
      label: "数学講座を選ぶ",
      icon: BookOpen,
    },
  ],
  english: [
    {
      title: "英単語",
      description: "入試頻出語彙を反復し、復習する語を整理します。",
      href: "/english/vocab",
      label: "単語学習を始める",
      icon: Languages,
    },
    {
      title: "英文法",
      description: "入試で必要な文法項目を4択問題で確認します。",
      href: "/english/grammar",
      label: "文法問題を解く",
      icon: PenLine,
    },
  ],
} satisfies Partial<Record<SubjectId, readonly LearningAction[]>>;

export default function LearnPage() {
  const subjects = filterVisibleSubjectsByCapability(SUBJECTS, "courses");
  if (subjects.length === 0) notFound();

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="学ぶ"
          title="理解したい内容から、講座を選ぶ。"
          description="現在公開している教科の教材だけを案内します。学んだ後は、問題演習で理解を確かめられます。"
          actions={[{ label: "教科から選ぶ", href: "/subjects" }]}
        />
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
