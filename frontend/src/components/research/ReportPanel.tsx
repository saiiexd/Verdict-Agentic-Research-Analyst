"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  DollarSign,
  Activity,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResearchResponse, NewsArticle, CriticReport, FinancialData } from "@/lib/types";
import type { AppError } from "@/lib/errors";
import { 
  LoadingSkeleton, 
  ExecutionTimer, 
  ProgressIndicator, 
  TimelineEvent, 
  StatusMessage 
} from "./LoadingComponents";

interface ReportPanelProps {
  /**
   * The resolved stock research payload returned by the FastAPI backend.
   */
  reportData?: ResearchResponse | null;
  /**
   * The current global app status from Zustand.
   */
  status?: "Idle" | "Submitting" | "Running" | "Completed" | "Failed";
  /**
   * Dynamic status of executing agents from the LangGraph simulator.
   */
  stages?: Record<string, "idle" | "running" | "completed" | "failed" | "skipped">;
  /**
   * Optional normalized error metadata if the query dispatches failed.
   */
  error?: AppError | null;
  /**
   * Optional callback to trigger a retry execution.
   */
  onRetry?: () => void;
  /**
   * Optional custom classes to apply to the main panel container.
   */
  className?: string;
}

// Stagger variants for progressively introducing sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * ReportPanel serves as the centerpiece of Verdict.
 * Progressive loading states, skeleton sections, and structured document view.
 */
export function ReportPanel({ reportData, status = "Idle", stages, error, onRetry, className }: ReportPanelProps) {
  const isIdle = status === "Idle";
  const isLoading = status === "Submitting" || status === "Running";
  const isCompleted = status === "Completed" && !!reportData;
  const isFailed = status === "Failed";

  // Calculate dynamic progress percentage based on active stage
  const getProgressPercent = () => {
    if (!stages) return 5;
    if (stages.refiner === "completed") return 100;
    if (stages.refiner === "running") return 90;
    if (stages.critic === "running") return 75;
    if (stages.writer === "running") return 55;
    if (stages.news === "running") return 35;
    if (stages.financial === "running") return 15;
    return 5;
  };

  const getStatusMessage = () => {
    if (!stages) return "Establishing connection to pipeline nodes...";
    if (stages.refiner === "running") return "Polishing final report content and compiling output structure...";
    if (stages.critic === "running") return "Cross-checking facts, evaluating bias risks, and score-matching metrics...";
    if (stages.writer === "running") return "Synthesizing research nodes draft document segments...";
    if (stages.news === "running") return "Aggregating global headlines and evaluating media sentiment...";
    if (stages.financial === "running") return "Retrieving SEC filing tables, beta metrics, and balance sheets...";
    return "Handing off execution tasks to workspace agents...";
  };

  const getActiveAgentName = () => {
    if (!stages) return "System Orchestrator";
    if (stages.refiner === "running") return "Refiner Agent";
    if (stages.critic === "running") return "Critic Agent";
    if (stages.writer === "running") return "Writer Agent";
    if (stages.news === "running") return "News Agent";
    if (stages.financial === "running") return "Financial Agent";
    return "System Orchestrator";
  };

  return (
    <div
      className={cn(
        "w-full flex-grow rounded-2xl border p-6 md:p-8 transition-all duration-300 min-h-[500px] flex flex-col",
        "bg-[rgb(var(--glass-bg))] backdrop-blur-md border-[rgb(var(--border-default))] shadow-sm",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {/* State 1: Idle (No research performed yet) */}
        {isIdle && (
          <motion.div
            key="idle-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-12"
          >
            <div className="h-14 w-14 rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] flex items-center justify-center mb-6">
              <FileText className="h-6 w-6 text-[rgb(var(--text-tertiary))]" />
            </div>
            <h2 className="text-title font-bold text-[rgb(var(--text-primary))] mb-2">
              Workspace Idle
            </h2>
            <p className="text-body text-[rgb(var(--text-secondary))]">
              Submit a company name or stock ticker above to start the multi-agent analysis workflow.
            </p>
          </motion.div>
        )}

        {/* State 2: Failed State */}
        {isFailed && (
          <motion.div
            key="failed-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-12"
          >
            <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-title font-bold text-[rgb(var(--text-primary))] mb-2">
              Analysis Failed
            </h2>
            <p className="text-body text-[rgb(var(--text-secondary))] mb-6">
              {error?.message || "The system encountered an error while communicating with the backend agents."}
            </p>
            {error?.isRecoverable && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-5 py-2.5 rounded-xl font-semibold text-small bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))] cursor-pointer hover:shadow-md transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))] focus-visible:ring-offset-2"
              >
                Retry Analysis
              </button>
            )}
          </motion.div>
        )}

        {/* State 3: Progressive Loading Skeleton State */}
        {isLoading && (
          <motion.div
            key="loading-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 flex-1 flex flex-col"
          >
            {/* Top Stats Banner */}
            <div className="flex flex-col gap-4 p-5 rounded-xl bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <StatusMessage message={getStatusMessage()} activeAgent={getActiveAgentName()} />
                <ExecutionTimer isActive={isLoading} />
              </div>
              <ProgressIndicator value={getProgressPercent()} />
            </div>

            {/* Visual Timeline Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))]/40">
              <TimelineEvent label="Handoff Established" status="completed" />
              <TimelineEvent label="Financial Analysis" status={stages?.financial === "completed" ? "completed" : (stages?.financial === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Sentiment Collection" status={stages?.news === "completed" ? "completed" : (stages?.news === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Synthesis Drafting" status={stages?.writer === "completed" ? "completed" : (stages?.writer === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Agent Debate Review" status={stages?.critic === "completed" ? "completed" : (stages?.critic === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Refinement Packaging" status={stages?.refiner === "completed" ? "completed" : (stages?.refiner === "running" ? "running" : "waiting")} />
            </div>

            {/* Document Skeletons Grid */}
            <div className="space-y-8 mt-4 flex-1">
              {/* Executive Summary Placeholder */}
              <div className="space-y-3">
                <LoadingSkeleton className="h-6 w-1/4" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-5/6" />
              </div>

              {/* Grid placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-3">
                  <LoadingSkeleton className="h-5 w-1/3" />
                  <LoadingSkeleton className="h-10 w-1/2" />
                  <LoadingSkeleton className="h-4 w-3/4" />
                </div>
                <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-3">
                  <LoadingSkeleton className="h-5 w-1/3" />
                  <div className="grid grid-cols-2 gap-3">
                    <LoadingSkeleton className="h-8 w-full" />
                    <LoadingSkeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>

              {/* Analysis Text Skeletons */}
              <div className="space-y-3">
                <LoadingSkeleton className="h-6 w-1/3" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
              </div>
            </div>
          </motion.div>
        )}


        {/* State 4: Completed Report Viewer */}
        {isCompleted && (
          <motion.div
            key="report-state"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 flex-1"
          >
            {/* Header Title Block */}
            <motion.div variants={sectionVariants} className="border-b border-[rgb(var(--border-default))] pb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h1 className="text-headline font-bold text-[rgb(var(--text-primary))]">
                  {reportData.financial_data?.company_name || reportData.ticker}
                </h1>
                <span className="text-title font-mono text-[rgb(var(--text-tertiary))]">
                  {reportData.ticker}
                </span>
              </div>
              <p className="text-small text-[rgb(var(--text-tertiary))]">
                Orchestrated multi-agent analysis report generated successfully.
              </p>
            </motion.div>

            {/* Recommendation & Overview Cards */}
            <motion.div variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Overall Recommendation Card */}
              <div className="md:col-span-6">
                <RecommendationCard criticReport={reportData.critic_report} />
              </div>

              {/* Financial Metrics Panel */}
              <div className="md:col-span-6">
                <MetadataPanel financialData={reportData.financial_data} />
              </div>
            </motion.div>

            {/* Executive Summary */}
            {reportData.final_report?.company_overview && (
              <motion.div variants={sectionVariants}>
                <ReportSection 
                  title="Executive Summary" 
                  content={reportData.final_report.company_overview} 
                />
              </motion.div>
            )}

            {/* Financial Analysis */}
            {reportData.final_report?.financial_analysis && (
              <motion.div variants={sectionVariants}>
                <ReportSection 
                  title="Financial Analysis" 
                  content={reportData.final_report.financial_analysis} 
                />
              </motion.div>
            )}

            {/* Market News Summary */}
            {reportData.final_report?.recent_news_summary && (
              <motion.div variants={sectionVariants}>
                <ReportSection 
                  title="Market News Analysis" 
                  content={reportData.final_report.recent_news_summary} 
                />
              </motion.div>
            )}

            {/* AI Research Findings (Opportunities) */}
            {reportData.final_report?.opportunities && (
              <motion.div variants={sectionVariants}>
                <ReportSection 
                  title="AI Research Findings (Opportunities)" 
                  content={reportData.final_report.opportunities} 
                />
              </motion.div>
            )}

            {/* Risk Assessment */}
            {reportData.final_report?.risks && (
              <motion.div variants={sectionVariants}>
                <ReportSection 
                  title="Risk Assessment" 
                  content={reportData.final_report.risks} 
                  icon={<ShieldAlert className="h-5 w-5 text-red-500" />}
                />
              </motion.div>
            )}

            {/* News Articles Citations Feed */}
            {reportData.news && reportData.news.length > 0 && (
              <motion.div variants={sectionVariants}>
                <CitationList articles={reportData.news} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Subcomponents ───────────────────────────────────────────

/**
 * Renders structured markdown content blocks cleanly
 */
function ReportSection({ title, content, icon }: { title: string; content: string; icon?: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 border-b border-[rgb(var(--border-default))] pb-2">
        {icon}
        <h3 className="text-title font-bold text-[rgb(var(--text-primary))]">{title}</h3>
      </div>
      <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </section>
  );
}

/**
 * Premium Recommendation Card based on Critic Agent scores
 */
function RecommendationCard({ criticReport }: { criticReport?: CriticReport }) {
  if (!criticReport) return null;

  const score = criticReport.overall_score || 0;
  
  // Map score range to standard recommendation categories
  let label = "Hold";
  let colorClass = "text-amber-500 border-amber-500/20 bg-amber-500/5";
  if (score >= 80) {
    label = score >= 90 ? "Strong Buy" : "Buy";
    colorClass = "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
  } else if (score < 60) {
    label = score < 40 ? "Strong Sell" : "Sell";
    colorClass = "text-red-500 border-red-500/20 bg-red-500/5";
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4 h-full">
      <div className="flex justify-between items-center">
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Overall Recommendation</h4>
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", colorClass)}>
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-display font-extrabold tracking-tight">{score}</span>
        <span className="text-subtitle text-[rgb(var(--text-tertiary))]">/100 Critic Score</span>
      </div>

      {criticReport.recommendation && (
        <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed italic border-l-2 border-[rgb(var(--accent-primary))] pl-3">
          &ldquo;{criticReport.recommendation}&rdquo;
        </p>
      )}

      {/* Critic Strengths & Weaknesses quick overview */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {criticReport.strengths && criticReport.strengths.length > 0 && (
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 block mb-1">Strengths</span>
            <ul className="list-disc pl-4 space-y-0.5">
              {criticReport.strengths.slice(0, 2).map((s: string, idx: number) => (
                <li key={idx} className="text-caption text-[rgb(var(--text-secondary))] truncate">{s}</li>
              ))}
            </ul>
          </div>
        )}
        {criticReport.weaknesses && criticReport.weaknesses.length > 0 && (
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 block mb-1">Weaknesses</span>
            <ul className="list-disc pl-4 space-y-0.5">
              {criticReport.weaknesses.slice(0, 2).map((w: string, idx: number) => (
                <li key={idx} className="text-caption text-[rgb(var(--text-secondary))] truncate">{w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Key Securities Metadata Panel
 */
function MetadataPanel({ financialData }: { financialData?: FinancialData }) {
  if (!financialData) return null;

  const formatCurrency = (val?: number) => {
    if (!val) return "—";
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  const metrics = [
    { label: "Price", value: financialData.current_price ? `$${financialData.current_price}` : "—", icon: DollarSign },
    { label: "Market Cap", value: formatCurrency(financialData.market_cap), icon: Activity },
    { label: "P/E Ratio", value: financialData.pe_ratio !== null ? financialData.pe_ratio : "—", icon: Layers },
    { label: "Analyst Rating", value: financialData.analyst_recommendation || "—", icon: CheckCircle2 }
  ];

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4 h-full">
      <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Key Financial Data</h4>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))]">
            <div className="h-8 w-8 rounded bg-[rgb(var(--bg-subtle))] flex items-center justify-center flex-shrink-0">
              <metric.icon className="h-4 w-4 text-[rgb(var(--text-secondary))]" />
            </div>
            <div>
              <span className="text-[10px] text-[rgb(var(--text-tertiary))] block leading-none mb-1">{metric.label}</span>
              <span className="text-small font-bold text-[rgb(var(--text-primary))]">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Elegant Citations & References Panel
 */
function CitationList({ articles }: { articles: NewsArticle[] }) {
  const getSentimentColor = (sentiment?: string) => {
    if (!sentiment) return "text-[rgb(var(--text-secondary))]";
    const clean = sentiment.toLowerCase();
    if (clean.includes("pos")) return "text-emerald-500";
    if (clean.includes("neg")) return "text-red-500";
    return "text-[rgb(var(--text-secondary))]";
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-[rgb(var(--border-default))] pb-2">
        <h3 className="text-title font-bold text-[rgb(var(--text-primary))]">Aggregated References</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.slice(0, 6).map((art, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] flex flex-col justify-between gap-3 group/item hover:border-[rgb(var(--text-tertiary))] transition-colors"
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-[rgb(var(--text-tertiary))] truncate max-w-[120px]">
                  {art.source || "Finance Feed"}
                </span>
                {art.sentiment && (
                  <span className={cn("text-[9px] font-bold uppercase tracking-wider", getSentimentColor(art.sentiment))}>
                    {art.sentiment}
                  </span>
                )}
              </div>
              <h5 className="text-small font-semibold text-[rgb(var(--text-primary))] leading-tight line-clamp-2">
                {art.title}
              </h5>
            </div>

            {art.url && (
              <a 
                href={art.url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] font-semibold text-[rgb(var(--accent-primary))] hover:underline inline-flex items-center gap-1 self-start"
              >
                View Source <ExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
