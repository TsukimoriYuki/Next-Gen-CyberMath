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
import { ELEMENTARY_SITE } from "@/data/elementary";
import { ELEMENTARY_LIMITED_BETA_RELEASE } from "@/data/elementary/release";
import { isElementaryLimitedBetaActive } from "@/lib/elementary-release";
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
  informatics: [
    {
      title: "情報Ⅰの体系講座",
      description: "情報社会からデータ活用まで、16講座を順に学びます。",
      href: "/courses/informatics-1",
      label: "情報Ⅰの講座を学ぶ",
      icon: BookOpen,
    },
  ],
  japanese: [
    {
      title: "国語の体系講座",
      description: "現代文語彙・現代文読解・古文・漢文を、16講座で順に学びます。",
      href: "/courses/japanese",
      label: "国語の講座を学ぶ",
      icon: BookOpen,
    },
  ],
} satisfies Partial<Record<SubjectId, readonly LearningAction[]>>;

export default function LearnPage() {
  const subjects = filterVisibleSubjectsByCapability(SUBJECTS, "courses");
  const elementaryActive = isElementaryLimitedBetaActive(ELEMENTARY_SITE.publicationStatus);
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
        {elementaryActive ? (
          <LearningSection
            title="小学生向け"
            description="限定βとして公開中の、小学3年生向けpilot教材です。高校生向け教材とは分けて案内しています。"
          >
            <LearningActionGrid
              actions={[{
                ...ELEMENTARY_LIMITED_BETA_RELEASE.learnCard,
                icon: BookOpen,
              }]}
            />
          </LearningSection>
        ) : null}
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
