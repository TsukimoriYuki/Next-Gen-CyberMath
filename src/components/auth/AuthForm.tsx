"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, KeyRound, Loader2, LogIn, ShieldCheck, UserPlus } from "lucide-react";

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

  const nameInputId = `${mode}-name`;
  const passcodeInputId = `${mode}-passcode`;
  const mentorCodeInputId = `${mode}-mentor-code`;
  const mentorCodeHintId = `${mode}-mentor-code-hint`;
  const isLogin = mode === "login";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body: Record<string, string> = { name, passcode };
    if (!isLogin && mentorCode) body.mentorCode = mentorCode;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!data.ok) {
        setError(data.error ?? "エラーが発生しました");
        return;
      }

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor={nameInputId} className="block font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          名前
        </label>
        <input
          id={nameInputId}
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="username"
          placeholder="例: 鈴木一郎"
          className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor={passcodeInputId} className="block font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          パスコード
        </label>
        <div className="relative">
          <input
            id={passcodeInputId}
            name="passcode"
            type={showPasscode ? "text" : "password"}
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="4文字以上"
            className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30"
          />
          <button
            type="button"
            onClick={() => setShowPasscode((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-cyan"
            aria-label={showPasscode ? "パスコードを隠す" : "パスコードを表示"}
          >
            {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div className="space-y-1.5">
          <label htmlFor={mentorCodeInputId} className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            <KeyRound className="h-3 w-3" />
            指導者向け招待コード
            <span className="ml-1 rounded bg-muted/70 px-1.5 py-0.5 text-[10px] normal-case tracking-normal">
              任意
            </span>
          </label>
          <div className="relative">
            <input
              id={mentorCodeInputId}
              name="mentorCode"
              type={showMentorCode ? "text" : "password"}
              value={mentorCode}
              onChange={(event) => setMentorCode(event.target.value)}
              autoComplete="off"
              aria-describedby={mentorCodeHintId}
              placeholder="学校・塾などで案内された場合のみ"
              className="w-full rounded-xl border border-neon-amber/30 bg-neon-amber/5 px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-neon-amber/60 focus:ring-1 focus:ring-neon-amber/25"
            />
            <button
              type="button"
              onClick={() => setShowMentorCode((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon-amber"
              aria-label={showMentorCode ? "指導者向け招待コードを隠す" : "指導者向け招待コードを表示"}
            >
              {showMentorCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p id={mentorCodeHintId} className="text-[11px] text-muted-foreground/70">
            学校・塾などで案内された場合のみ入力してください。通常の学習者アカウントでは空欄のまま登録できます。
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

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

      {!isLogin && (
        <div className="flex items-start gap-2 rounded-xl border border-neon-amber/20 bg-neon-amber/5 p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-neon-amber" />
          <p className="text-xs text-muted-foreground">
            指導者向け招待コードを知らない場合は空欄のまま登録してください。通常の受験生アカウントとして利用できます。
          </p>
        </div>
      )}
    </form>
  );
}
