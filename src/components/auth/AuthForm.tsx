"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, UserPlus, Loader2, KeyRound, ShieldCheck } from "lucide-react";

type Mode = "login" | "register";

interface AuthFormProps {
  mode: Mode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [mentorCode, setMentorCode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [showMentorCode, setShowMentorCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body: Record<string, string> = { name, passcode };
    if (mode === "register" && mentorCode) body.mentorCode = mentorCode;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!data.ok) {
        setError(data.error ?? "エラーが発生しました");
        return;
      }

      // 師範なら /mentor、それ以外は redirect 先へ
      if (data.role === "MENTOR") {
        router.push("/mentor");
      } else {
        router.push(redirect === "/mentor" ? "/" : redirect);
      }
      router.refresh();
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 名前 */}
      <div className="space-y-1.5">
        <label className="block font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          名前
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="username"
          placeholder="例: 鈴木一郎"
          className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30"
        />
      </div>

      {/* パスコード */}
      <div className="space-y-1.5">
        <label className="block font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          パスコード
        </label>
        <div className="relative">
          <input
            type={showPasscode ? "text" : "password"}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="4文字以上"
            className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30"
          />
          <button
            type="button"
            onClick={() => setShowPasscode((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-cyan"
            aria-label={showPasscode ? "パスコードを隠す" : "パスコードを表示"}
          >
            {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 師範コード（登録時のみ） */}
      {!isLogin && (
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            <KeyRound className="h-3 w-3" />
            師範コード
            <span className="ml-1 rounded bg-muted/70 px-1.5 py-0.5 text-[10px] normal-case tracking-normal">
              任意
            </span>
          </label>
          <div className="relative">
            <input
              type={showMentorCode ? "text" : "password"}
              value={mentorCode}
              onChange={(e) => setMentorCode(e.target.value)}
              autoComplete="off"
              placeholder="師範の資格がある場合のみ"
              className="w-full rounded-xl border border-neon-amber/30 bg-neon-amber/5 px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-neon-amber/60 focus:ring-1 focus:ring-neon-amber/25"
            />
            <button
              type="button"
              onClick={() => setShowMentorCode((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-amber"
            >
              {showMentorCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            正しい師範コードを入力すると、MENTOR 権限でアカウントが作成されます。
          </p>
        </div>
      )}

      {/* エラー */}
      {error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-bold transition-colors disabled:opacity-50"
        style={{
          background: "color-mix(in oklch, var(--neon-cyan) 15%, transparent)",
          border: "1px solid color-mix(in oklch, var(--neon-cyan) 45%, transparent)",
          color: "var(--neon-cyan)",
          boxShadow: "0 0 0 1px color-mix(in oklch, var(--neon-cyan) 20%, transparent)",
        }}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isLogin ? (
          <LogIn className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {loading ? "処理中..." : isLogin ? "ログイン" : "アカウント作成"}
      </button>

      {/* モード切替リンク */}
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            アカウントをお持ちでない方は{" "}
            <Link href="/auth/register" className="font-semibold text-neon-cyan hover:underline">
              新規登録
            </Link>
          </>
        ) : (
          <>
            すでにアカウントをお持ちの方は{" "}
            <Link href="/auth/login" className="font-semibold text-neon-cyan hover:underline">
              ログイン
            </Link>
          </>
        )}
      </p>

      {/* 師範コードのヒント（登録画面） */}
      {!isLogin && (
        <div className="flex items-start gap-2 rounded-xl border border-neon-amber/20 bg-neon-amber/5 p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-neon-amber" />
          <p className="text-xs text-muted-foreground">
            師範コードを知らない場合は空欄のまま登録してください。
            生徒として参加できます。
          </p>
        </div>
      )}
    </form>
  );
}
