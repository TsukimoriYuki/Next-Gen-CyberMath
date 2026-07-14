import type { Metadata } from "next";
import { PUBLIC_SUBJECTS } from "@/data/subjects";
import {
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  SubjectCard,
} from "@/components/learning/LearningPage";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "教科一覧",
  description: "Cyber Mathで現在公開している教科と学習メニューの一覧です。",
  path: "/subjects",
});

export default function SubjectsPage() {
  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="教科一覧"
          title="学習する教科を選ぶ"
          description="講座や問題が揃い、継続して学習できる教科だけを掲載しています。各教科のページから、学ぶ・解く・試験対策・復習へ進めます。"
          actions={[{ label: "ホームへ戻る", href: "/" }]}
        />
        <LearningSection title="公開中の教科">
          <div className="grid gap-4 md:grid-cols-2">
            {PUBLIC_SUBJECTS.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
