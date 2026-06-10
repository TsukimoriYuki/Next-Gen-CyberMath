import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, BookOpen } from "lucide-react";
import { VocabFlashcardGame } from "@/components/english/VocabFlashcardGame";

export const metadata: Metadata = { title: "英単語フラッシュカード | CYBER English" };

export default function VocabPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          CYBER English
        </Link>

        <header className="mt-6 mb-8">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(16,185,129,0.07)",
              border: "1px solid rgba(16,185,129,0.22)",
              color: "#10b981",
            }}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Vocabulary · フラッシュカード
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #ffffff 60%, #6ee7b7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            英単語を叩き込め
          </h1>
          <p className="mt-2 font-mono text-sm text-white/40">
            学術・社会・科学・ビジネス — 試験頻出語彙 B1〜C1 を反復で定着させる
          </p>
        </header>

        <VocabFlashcardGame />
      </div>
    </div>
  );
}
