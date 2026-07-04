"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Globe,
  Loader2,
  Shield,
  Sparkles,
  XCircle,
} from "lucide-react";
import { ResearchRequestSchema, type ResearchRequest, type AgentNode } from "@/lib/types";
import { runResearch } from "@/lib/api";
import { cn } from "@/lib/utils";

// ─── Agent Pipeline Definition ────────────────────────────
const AGENT_PIPELINE: Omit<AgentNode, "status" | "startedAt" | "completedAt">[] = [
  {
    id: "financial",
    name: "Financial Agent",
    description: "Fetching market data, ratios & statements",
    icon: "BarChart3",
  },
  {
    id: "news",
    name: "News Agent",
    description: "Aggregating & scoring news from Google & Tavily",
    icon: "Globe",
  },
  {
    id: "writer",
    name: "Writer Agent",
    description: "Synthesizing data into research report",
    icon: "FileText",
  },
  {
    id: "critic",
    name: "Critic Agent",
    description: "Evaluating accuracy and hallucination risk",
    icon: "Shield",
  },
  {
    id: "refiner",
    name: "Refiner Agent",
    description: "Refining and finalizing the report",
    icon: "Sparkles",
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart3,
  Globe,
  FileText,
  Shield,
  Sparkles,
};

// Estimated durations per agent (ms) for the simulated progress
const AGENT_DURATIONS = [3000, 4000, 30000, 8000, 16000];

type ResearchPhase = "idle" | "running" | "done" | "error";

interface AgentState extends AgentNode {
  elapsed?: number;
}

export default function ResearchPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<ResearchPhase>("idle");
  const [agents, setAgents] = useState<AgentState[]>(
    AGENT_PIPELINE.map((a) => ({ ...a, status: "idle" }))
  );
  const [currentAgentIdx, setCurrentAgentIdx] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");
  const [researchResult, setResearchResult] = useState<unknown>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResearchRequest>({
    resolver: zodResolver(ResearchRequestSchema),
  });

  const ticker = watch("ticker", "");

  // Simulate agent progress while real API call runs in parallel
  const simulateAgents = () => {
    let delay = 0;
    AGENT_PIPELINE.forEach((_, idx) => {
      const startDelay = delay;
      const endDelay = delay + AGENT_DURATIONS[idx];

      setTimeout(() => {
        setCurrentAgentIdx(idx);
        setAgents((prev) =>
          prev.map((a, i) =>
            i === idx ? { ...a, status: "running", startedAt: Date.now() } : a
          )
        );
      }, startDelay);

      setTimeout(() => {
        setAgents((prev) =>
          prev.map((a, i) =>
            i === idx
              ? { ...a, status: "completed", completedAt: Date.now() }
              : a
          )
        );
      }, endDelay - 500); // complete slightly before next starts

      delay = endDelay;
    });
  };

  const onSubmit = async (data: ResearchRequest) => {
    setPhase("running");
    setErrorMsg("");
    setCurrentAgentIdx(0);
    setResearchResult(null);
    setAgents(AGENT_PIPELINE.map((a) => ({ ...a, status: "idle" })));

    simulateAgents();

    try {
      const result = await runResearch(data.ticker);
      setResearchResult(result);
      // Mark all remaining agents as completed
      setAgents((prev) => prev.map((a) => ({ ...a, status: "completed" })));
      setPhase("done");

      // Navigate to report page after brief pause
      timerRef.current = setTimeout(() => {
        // Store result in sessionStorage for report page to consume
        sessionStorage.setItem("researchResult", JSON.stringify(result));
        sessionStorage.setItem("researchTicker", data.ticker);
        router.push(`/reports/${data.ticker}`);
      }, 1500);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { detail?: string }; status?: number }; message?: string };
      const msg =
        axiosErr?.response?.data?.detail ||
        axiosErr?.message ||
        "Research failed. Please try again.";
      setErrorMsg(msg);
      setPhase("error");
      setAgents((prev) => prev.map((a) => a.status === "running" ? { ...a, status: "failed" } : a));
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const progressPct =
    agents.filter((a) => a.status === "completed").length / AGENT_PIPELINE.length;

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-headline text-[rgb(var(--text-primary))]">Research Workspace</h1>
        <p className="text-body text-[rgb(var(--text-secondary))] mt-1">
          Enter a ticker to run the full AI research pipeline
        </p>
      </div>

      {/* Ticker Input Form */}
      {phase === "idle" && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
          <div className="flex gap-3">
            <div className="flex-1">
              <div
                className={cn(
                  "flex items-center gap-3 px-5 py-4 rounded-xl border-2 bg-[rgb(var(--bg-surface))] transition-all duration-200",
                  errors.ticker
                    ? "border-red-400/60"
                    : "border-[rgb(var(--border-default))] focus-within:border-[rgb(var(--accent-primary))]"
                )}
              >
                <Sparkles className="w-5 h-5 text-[rgb(var(--text-tertiary))] flex-shrink-0" />
                <input
                  {...register("ticker", {
                    setValueAs: (v: string) => v.toUpperCase(),
                  })}
                  placeholder="Enter ticker (e.g. NVDA, AAPL, MSFT...)"
                  className="flex-1 bg-transparent text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))] text-body font-mono tracking-wider outline-none"
                  autoCapitalize="characters"
                  autoComplete="off"
                />
                {ticker && (
                  <span className="text-caption text-[rgb(var(--text-tertiary))]">
                    {ticker.length}/10
                  </span>
                )}
              </div>
              {errors.ticker && (
                <p className="mt-2 text-caption text-red-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  {errors.ticker.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[rgb(var(--accent-primary))] text-white font-semibold text-[14px] hover:bg-[rgb(var(--accent-primary-hover))] transition-all duration-200 shadow-glow-accent hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            >
              Analyze
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Example tickers */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-caption text-[rgb(var(--text-tertiary))]">Try:</span>
            {["NVDA", "AAPL", "MSFT", "TSLA", "GOOGL"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  // Set the value without native event
                }}
                className="px-2.5 py-1 rounded-md border border-[rgb(var(--border-default))] text-caption text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent-primary))]/40 hover:text-[rgb(var(--accent-primary))] transition-all duration-150 font-mono"
              >
                {t}
              </button>
            ))}
          </div>
        </form>
      )}

      {/* Pipeline Visualization */}
      {(phase === "running" || phase === "done" || phase === "error") && (
        <div className="space-y-4">
          {/* Status header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {phase === "running" && (
                  <Loader2 className="w-4 h-4 text-[rgb(var(--accent-primary))] animate-spin" />
                )}
                {phase === "done" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {phase === "error" && <XCircle className="w-4 h-4 text-red-400" />}
                <span
                  className={cn(
                    "text-subtitle font-semibold",
                    phase === "done" && "text-emerald-400",
                    phase === "error" && "text-red-400",
                    phase === "running" && "text-[rgb(var(--text-primary))]"
                  )}
                >
                  {phase === "running" && "Running AI Pipeline"}
                  {phase === "done" && "Research Complete"}
                  {phase === "error" && "Research Failed"}
                </span>
              </div>
              {phase !== "error" && (
                <p className="text-caption text-[rgb(var(--text-tertiary))]">
                  Analyzing ticker:{" "}
                  <span className="font-mono text-[rgb(var(--text-primary))]">
                    {ticker || "—"}
                  </span>
                </p>
              )}
              {phase === "error" && (
                <p className="text-caption text-red-400 mt-1">{errorMsg}</p>
              )}
            </div>

            {/* Progress bar */}
            {phase !== "idle" && (
              <div className="text-right">
                <span className="text-caption text-[rgb(var(--text-tertiary))]">
                  {Math.round(progressPct * 100)}%
                </span>
                <div className="w-32 h-1.5 rounded-full bg-[rgb(var(--bg-subtle))] mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[rgb(var(--accent-primary))] transition-all duration-500"
                    style={{ width: `${progressPct * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Agent cards */}
          <div className="space-y-3">
            {agents.map((agent, idx) => {
              const Icon = ICON_MAP[agent.icon];
              const isActive = agent.status === "running";
              const isDone = agent.status === "completed";
              const isFailed = agent.status === "failed";
              const isIdle = agent.status === "idle";

              return (
                <div
                  key={agent.id}
                  className={cn(
                    "rounded-xl border p-5 transition-all duration-500",
                    isDone && "border-emerald-400/30 bg-emerald-400/5",
                    isActive && "border-[rgb(var(--accent-primary))]/50 bg-[rgb(var(--accent-primary))]/5 shadow-glow-accent",
                    isFailed && "border-red-400/30 bg-red-400/5",
                    isIdle && "border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] opacity-60"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300",
                        isDone && "bg-emerald-400/15 border-emerald-400/30",
                        isActive && "bg-[rgb(var(--accent-primary))]/15 border-[rgb(var(--accent-primary))]/30",
                        isFailed && "bg-red-400/15 border-red-400/30",
                        isIdle && "bg-[rgb(var(--bg-subtle))] border-[rgb(var(--border-default))]"
                      )}
                    >
                      {isActive ? (
                        <Loader2 className="w-5 h-5 text-[rgb(var(--accent-primary))] animate-spin" />
                      ) : isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isFailed ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <Icon className="w-5 h-5 text-[rgb(var(--text-tertiary))]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "text-small font-semibold",
                            isDone && "text-emerald-400",
                            isActive && "text-[rgb(var(--accent-primary))]",
                            isFailed && "text-red-400",
                            isIdle && "text-[rgb(var(--text-tertiary))]"
                          )}
                        >
                          {agent.name}
                        </p>
                        <span className="text-caption text-[rgb(var(--text-tertiary))]">
                          Step {idx + 1}
                        </span>
                      </div>
                      <p className="text-caption text-[rgb(var(--text-tertiary))] mt-0.5">
                        {agent.description}
                      </p>
                    </div>

                    {/* Status badge */}
                    <div>
                      {isActive && (
                        <span className="text-caption font-medium text-[rgb(var(--accent-primary))] animate-pulse">
                          Processing...
                        </span>
                      )}
                      {isDone && (
                        <span className="text-caption font-medium text-emerald-400">Completed</span>
                      )}
                      {isFailed && (
                        <span className="text-caption font-medium text-red-400">Failed</span>
                      )}
                      {isIdle && (
                        <span className="text-caption text-[rgb(var(--text-tertiary))]">Queued</span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar for active agent */}
                  {isActive && (
                    <div className="mt-3 ml-14">
                      <div className="h-0.5 rounded-full bg-[rgb(var(--bg-subtle))] overflow-hidden">
                        <div className="h-full bg-[rgb(var(--accent-primary))] animate-shimmer bg-shimmer-gradient bg-[length:200%_100%]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Done state CTA */}
          {phase === "done" && (
            <div className="mt-6 p-5 rounded-xl border border-emerald-400/30 bg-emerald-400/5 flex items-center justify-between">
              <div>
                <p className="text-small font-semibold text-emerald-400">Report generated</p>
                <p className="text-caption text-[rgb(var(--text-tertiary))]">
                  Redirecting to report...
                </p>
              </div>
              <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
            </div>
          )}

          {/* Error state retry */}
          {phase === "error" && (
            <button
              onClick={() => {
                setPhase("idle");
                setAgents(AGENT_PIPELINE.map((a) => ({ ...a, status: "idle" })));
                setCurrentAgentIdx(-1);
              }}
              className="w-full mt-4 py-3 rounded-xl border border-red-400/30 text-red-400 text-small font-medium hover:bg-red-400/5 transition-all duration-200"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
