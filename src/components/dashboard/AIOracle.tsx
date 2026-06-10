"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cpu, Zap, RefreshCw, ArrowRight, AlertTriangle } from "lucide-react";
import { readAttemptsLocal } from "@/lib/exam";
import { readEnglishAttemptsLocal, computeEnglishStats } from "@/lib/english-history";

// ── Cache constants ───────────────────────────────────────────────────────

const CACHE_KEY_TIME = "oracle_last_fetch";
const CACHE_KEY_DATA = "oracle_cached_message";
const CACHE_TTL = 3_600_000; // 1 hour

// ── Types ─────────────────────────────────────────────────────────────────

interface OracleResponse {
  message: string;
  taskName: string;
  taskUrl: string;
}

type Status = "idle" | "loading" | "ready" | "error";

// ── Stats builder ─────────────────────────────────────────────────────────

function buildStats() {
  const mathAttempts = readAttemptsLocal();
  const englishAttempts = readEnglishAttemptsLocal();
  const eStats = computeEnglishStats(englishAttempts);

  const recentMath = mathAttempts.slice(0, 5);
  const mathAccuracy =
    recentMath.length > 0
      ? Math.round(
          recentMath.reduce(
            (s, a) => s + (a.score / a.totalCount) * 100,
            0,
          ) / recentMath.length,
        )
      : null;

  return {
    math: {
      totalAttempts: mathAttempts.length,
      recentAccuracy: mathAccuracy,
      weakTags: mathAttempts[0]?.weakTags?.slice(0, 3) ?? [],
    },
    english: {
      totalAttempts: englishAttempts.length,
      speedReadingCount: eStats.speedReading.count,
      speedReadingAccuracy:
        eStats.speedReading.count > 0 ? eStats.speedReading.avgAccuracy : null,
      comprehensionCount: eStats.comprehension.count,
      comprehensionAccuracy:
        eStats.comprehension.count > 0
          ? eStats.comprehension.avgAccuracy
          : null,
      multiSourceCount: eStats.multiSource.count,
    },
  };
}

// ── Component ─────────────────────────────────────────────────────────────

export function AIOracle() {
  const [status, setStatus] = useState<Status>("idle");
  const [oracleData, setOracleData] = useState<OracleResponse | null>(null);

  const fetchOracle = useCallback(async (force = false) => {
    // 1時間キャッシュチェック（force=true で強制リフレッシュ）
    if (!force) {
      const lastFetch = localStorage.getItem(CACHE_KEY_TIME);
      const cached = localStorage.getItem(CACHE_KEY_DATA);
      if (lastFetch && cached) {
        const elapsed = Date.now() - Number(lastFetch);
        if (elapsed < CACHE_TTL) {
          try {
            setOracleData(JSON.parse(cached));
            setStatus("ready");
            return;
          } catch {
            // キャッシュ破損 → フォールスルーして再取得
          }
        }
      }
    }

    setStatus("loading");
    try {
      const stats = buildStats();
      const meRes = await fetch("/api/auth/me");
      const meJson = meRes.ok ? await meRes.json() : {};
      const userName: string =
        typeof meJson?.name === "string" && meJson.name.trim()
          ? meJson.name.trim()
          : "生徒";

      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats, userName }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result: OracleResponse = await res.json();

      localStorage.setItem(CACHE_KEY_TIME, String(Date.now()));
      localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(result));

      setOracleData(result);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchOracle();
  }, [fetchOracle]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (status === "idle" || status === "loading") {
    return (
      <div
        className="rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,0,0,0.5))",
          border: "1px solid rgba(139,92,246,0.25)",
          boxShadow:
            "0 0 0 1px rgba(139,92,246,0.1), 0 8px 32px rgba(139,92,246,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 animate-pulse items-center justify-center rounded-xl"
            style={{
              background: "rgba(139,92,246,0.2)",
              border: "1px solid rgba(139,92,246,0.4)",
            }}
          >
            <Cpu className="h-5 w-5" style={{ color: "#a78bfa" }} />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
              Cyber Oracle · AI教官
            </p>
            <p
              className="animate-pulse font-mono text-sm font-semibold"
              style={{ color: "#a78bfa" }}
            >
              🤖 脳波スキャン中... (Analyzing Data)
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 animate-pulse rounded-full"
              style={{
                background: "rgba(139,92,246,0.3)",
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(244,63,94,0.06)",
          border: "1px solid rgba(244,63,94,0.2)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle
              className="h-5 w-5 shrink-0"
              style={{ color: "#f43f5e" }}
            />
            <p className="font-mono text-xs text-white/50">
              通信障害 — Oracle との接続に失敗しました
            </p>
          </div>
          <button
            onClick={() => fetchOracle(true)}
            className="shrink-0 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors hover:brightness-125"
            style={{
              border: "1px solid rgba(244,63,94,0.3)",
              color: "rgba(244,63,94,0.8)",
            }}
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  // ── Ready ────────────────────────────────────────────────────────────────
  if (!oracleData) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(0,0,0,0.6) 100%)",
        border: "1px solid rgba(139,92,246,0.3)",
        boxShadow:
          "0 0 0 1px rgba(139,92,246,0.12), 0 8px 40px rgba(139,92,246,0.12)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: "rgba(139,92,246,0.08)",
          borderBottom: "1px solid rgba(139,92,246,0.18)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: "rgba(139,92,246,0.25)" }}
          >
            <Cpu className="h-4 w-4" style={{ color: "#a78bfa" }} />
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: "#a78bfa" }}
          >
            Cyber Oracle · AI教官指令
          </span>
        </div>
        <button
          onClick={() => fetchOracle(true)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[10px] transition-all hover:brightness-125"
          style={{
            border: "1px solid rgba(139,92,246,0.25)",
            color: "rgba(139,92,246,0.6)",
          }}
          title="キャッシュをリセットして再取得"
        >
          <RefreshCw className="h-3 w-3" />
          更新
        </button>
      </div>

      {/* Message body */}
      <div className="px-5 py-4">
        <p
          className="font-display text-base font-bold leading-relaxed sm:text-lg"
          style={{
            color: "#e9d5ff",
            textShadow: "0 0 20px rgba(139,92,246,0.45)",
          }}
        >
          {oracleData.message}
        </p>

        {/* Task row */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* Task name badge */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.28)",
            }}
          >
            <Zap className="h-3.5 w-3.5" style={{ color: "#a78bfa" }} />
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: "#c4b5fd" }}
            >
              {oracleData.taskName}
            </span>
          </div>

          {/* Action button */}
          <Link
            href={oracleData.taskUrl}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.45), rgba(109,40,217,0.55))",
              border: "1px solid rgba(139,92,246,0.5)",
              color: "#ede9fe",
              boxShadow: "0 4px 16px rgba(139,92,246,0.2)",
            }}
          >
            出撃する
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
