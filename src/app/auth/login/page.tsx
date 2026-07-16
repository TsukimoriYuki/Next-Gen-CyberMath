import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sigma } from "lucide-react";
import { getSession } from "@/lib/auth";
import { AuthForm } from "@/components/auth/AuthForm";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "ログイン",
  description: "Cyber Math の学習履歴と復習キューにアクセスするためのログインページです。",
  alternates: {
    canonical: "/auth/login",
  },
  openGraph: {
    title: `ログイン | ${SITE_NAME}`,
    description: "Cyber Math の学習履歴と復習キューにアクセスするためのログインページです。",
    url: "/auth/login",
  },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* ロゴ */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="glow-cyan flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-cyan/10 text-neon-cyan">
            <Sigma className="h-7 w-7" strokeWidth={2.2} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-wide">
              CYBER<span className="text-neon-cyan">MATH</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              学習履歴と復習を続きから利用できます
            </p>
          </div>
        </div>

        {/* カード */}
        <div className="glass rounded-3xl p-8 shadow-xl">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
              Login
            </div>
            <h2 className="mt-3 font-display text-xl font-bold">おかえりなさい</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              登録した名前とパスコードで入室します。
            </p>
          </div>
          <AuthForm mode="login" />
        </div>
      </div>
    </div>
  );
}
