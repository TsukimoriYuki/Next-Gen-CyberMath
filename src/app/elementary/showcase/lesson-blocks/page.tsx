import type { Metadata } from "next";
import { ElementaryLessonRenderer } from "@/components/elementary/ElementaryLessonRenderer";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "@/data/elementary/showcases/division-dialogue";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";

export const metadata: Metadata = {
  title: elementaryUiCopy("showcase-metadata-title"),
  description: elementaryUiCopy("showcase-metadata-description"),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ElementaryLessonBlocksShowcasePage() {
  return <ElementaryLessonRenderer lesson={ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE} />;
}
