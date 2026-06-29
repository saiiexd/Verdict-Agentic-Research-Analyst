import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const AGENT_STEPS = [
  {
    id: "financial",
    icon: BarChart3,
    name: "Financial Agent",
    description: "Fetches live market data, ratios, and financial statements via Yahoo Finance",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    id: "news",
    icon: Globe,
    name: "News Agent",
    description: "Aggregates and sentiment-scores articles from Google News & Tavily",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  {
    id: "writer",
    icon: FileText,
    name: "Writer Agent",
    description: "Synthesizes all data into a structured investment research report",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "critic",
    icon: Shield,
    name: "Critic Agent",
    description: "Evaluates the report for accuracy, balance, and hallucination risk",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  {
    id: "refiner",
    icon: Sparkles,
    name: "Refiner Agent",
    description: "Integrates feedback to produce a polished, publication-ready final report",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: "Multi-Agent Intelligence",
    description:
      "A LangGraph-orchestrated pipeline of specialized AI agents that reason, critique, and refine in sequence — not a single black-box prompt.",
  },
  {
    icon: TrendingUp,
    title: "Live Market Data",
    description:
      "Real-time financial data from Yahoo Finance — price, P/E ratio, EPS, revenue growth, and institutional analyst recommendations.",
  },
  {
    icon: Layers,
    title: "Bento Report Layout",
    description:
      "Research reports rendered as structured, scannable bento grids. Metrics, narratives, risks, and verdicts organized for instant comprehension.",
  },
  {
    icon: Zap,
    title: "Built on FastAPI + LangGraph",
    description:
      "A production-grade Python backend with modular agents, strict schema validation, and graceful fallback logic at every execution step.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-bg-hero">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgb(var(--border-default))]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[rgb(var(--accent-primary))] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-[rgb(var(--text-primary))]">
              Verdict
            </span>
            <span className="text-[10px] font-semibold text-[rgb(var(--accent-primary))] bg-[rgb(var(--accent-primary))]/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[rgb(var(--accent-primary))] text-white text-[13px] font-semibold hover:bg-[rgb(var(--accent-primary-hover))] transition-all duration-200 shadow-glow-accent"
            >
              Open App
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-28 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgb(var(--accent-primary))]/30 bg-[rgb(var(--accent-primary))]/8 text-[rgb(var(--accent-primary))] text-[12px] font-semibold tracking-wide uppercase mb-8">
          <Sparkles className="w-3 h-3" />
          AI-Native Equity Research Platform
        </div>

        <h1 className="text-display text-[rgb(var(--text-primary))] mb-6">
          Research any stock.
          <br />
          <span className="gradient-text-accent">In minutes. Not days.</span>
        </h1>

        <p className="text-body text-[rgb(var(--text-secondary))] max-w-xl mx-auto mb-10 leading-relaxed">
          Verdict deploys a coordinated network of AI agents to analyze financial data, synthesize
          market news, and produce institutional-quality equity research — automatically.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[rgb(var(--accent-primary))] text-white font-semibold text-[14px] hover:bg-[rgb(var(--accent-primary-hover))] transition-all duration-200 shadow-glow-accent hover:shadow-xl hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            Start Researching
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgb(var(--border-default))] text-[rgb(var(--text-secondary))] font-medium text-[14px] hover:border-[rgb(var(--border-strong))] hover:text-[rgb(var(--text-primary))] transition-all duration-200 hover:-translate-y-0.5"
          >
            How it works
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Ticker examples */}
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {["NVDA", "AAPL", "MSFT", "TSLA", "GOOGL", "AMZN"].map((ticker) => (
            <Link
              key={ticker}
              href={`/research?ticker=${ticker}`}
              className="px-3 py-1.5 rounded-lg border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] text-ticker text-[rgb(var(--text-secondary))] text-[12px] hover:border-[rgb(var(--accent-primary))]/50 hover:text-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-primary))]/5 transition-all duration-150"
            >
              {ticker}
            </Link>
          ))}
        </div>
      </section>

      {/* Agent workflow visualization */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-label text-[rgb(var(--accent-primary))] mb-3">The Architecture</p>
            <h2 className="text-headline text-[rgb(var(--text-primary))]">
              Five agents. One verdict.
            </h2>
            <p className="text-body text-[rgb(var(--text-secondary))] mt-4 max-w-lg mx-auto">
              A LangGraph-orchestrated pipeline runs every time you submit a ticker symbol.
            </p>
          </div>

          {/* Agent steps */}
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgb(var(--border-strong))] to-transparent hidden lg:block" />

            <div className="space-y-6">
              {AGENT_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <div className="flex-1 max-w-md">
                      <div
                        className={`rounded-xl border p-5 ${step.bg} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg border ${step.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${step.color}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-caption text-[rgb(var(--text-tertiary))]">Step {i + 1}</span>
                            </div>
                            <h3 className="text-subtitle text-[rgb(var(--text-primary))] mb-1">
                              {step.name}
                            </h3>
                            <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center node */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-[rgb(var(--accent-primary))] bg-[rgb(var(--bg-base))] flex items-center justify-center z-10">
                      <span className="text-[11px] font-bold text-[rgb(var(--accent-primary))]">{i + 1}</span>
                    </div>

                    {/* Empty side */}
                    <div className="flex-1 max-w-md" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-6 bg-[rgb(var(--bg-surface))] border-y border-[rgb(var(--border-default))]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-label text-[rgb(var(--accent-primary))] mb-3">Platform</p>
            <h2 className="text-headline text-[rgb(var(--text-primary))]">
              Built for serious analysis.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-6 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] hover:border-[rgb(var(--border-strong))] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgb(var(--accent-primary))]/10 border border-[rgb(var(--accent-primary))]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[rgb(var(--accent-primary))]" />
                  </div>
                  <h3 className="text-subtitle text-[rgb(var(--text-primary))] mb-2">{f.title}</h3>
                  <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-headline text-[rgb(var(--text-primary))] mb-5">
            Ready to research your first stock?
          </h2>
          <p className="text-body text-[rgb(var(--text-secondary))] mb-10">
            Enter any ticker symbol. Verdict takes care of the rest.
          </p>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[rgb(var(--accent-primary))] text-white font-semibold text-[15px] hover:bg-[rgb(var(--accent-primary-hover))] transition-all duration-200 shadow-glow-accent hover:-translate-y-0.5"
          >
            <Sparkles className="w-4.5 h-4.5" />
            Launch Verdict
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgb(var(--border-default))] py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[rgb(var(--accent-primary))] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-small font-semibold text-[rgb(var(--text-secondary))]">Verdict AI</span>
          </div>
          <div className="flex items-center gap-1 text-caption text-[rgb(var(--text-tertiary))]">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Backend operational
          </div>
          <p className="text-caption text-[rgb(var(--text-tertiary))]">
            AI research assistant. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
