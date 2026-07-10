"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { adaptReport } from "@/lib/reportAdapter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  AlertTriangle, 
  ExternalLink,
  Banknote,
  Activity,
  Layers,
  TrendingUp,
  Brain,
  Info,
  Calendar,
  Copy,
  Printer,
  Share2,
  Download,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResearchResponse, NewsArticle, CriticReport, FinancialData } from "@/lib/types";
import type { AppError } from "@/lib/errors";
import { useAppStore } from "@/store/useAppStore";
import { 
  LoadingSkeleton, 
  ExecutionTimer, 
  ProgressIndicator, 
  TimelineEvent, 
  StatusMessage 
} from "./LoadingComponents";
import { 
  SentimentDistributionChart, 
  AdvancedMetricsPanel, 
  EvidenceConfidenceGauge, 
  WorkflowAnalyticsPanel 
} from "./ReportAnalytics";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { EmptyReport } from "./EmptyReport";

interface ReportPanelProps {
  reportData?: ResearchResponse | null;
  status?: "Idle" | "Submitting" | "Running" | "Completed" | "Failed";
  stages?: Record<string, "idle" | "running" | "completed" | "failed" | "skipped">;
  error?: AppError | null;
  onRetry?: () => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Text highlighting helper for searching terms inside elements
 */
function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <>{text}</>;
  const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) 
          ? <mark key={i} className="bg-yellow-500/20 text-[rgb(var(--accent-primary))] font-bold px-0.5 rounded">{part}</mark> 
          : part
      )}
    </>
  );
}

/**
 * ReportPanel serves as the centerpiece of Verdict.
 * Progressive loading states, skeleton sections, and structured document view.
 */
export function ReportPanel({ reportData, status = "Idle", stages, error, onRetry, className }: ReportPanelProps) {
  const isIdle = status === "Idle";
  const isLoading = status === "Submitting" || status === "Running";
  const isCompleted = status === "Completed" && !!reportData;
  const isFailed = status === "Failed";

  const isReadingMode = useAppStore((state) => state.isReadingMode);
  const toggleReadingMode = useAppStore((state) => state.toggleReadingMode);
  
  const adaptedReport = useMemo(() => adaptReport(reportData?.final_report), [reportData]);

  const [activeSection, setActiveSection] = useState("summary");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Tracks section collapse state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    thesis: true,
    financials: true,
    analytics: true,
    news: true,
    evidence: true,
    risks: true,
    reasoning: true,
    citations: true
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Track scroll position to update both the Table of Contents active highlight state and Reading Progress bar
  useEffect(() => {
    if (!isCompleted) return;

    const sections = ["summary", "thesis", "financials", "analytics", "news", "evidence", "risks", "reasoning", "citations"];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      
      // Update ToC active element
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Update reading progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCompleted]);

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

  // Helper actions inside the top toolbar
  const handleCopyReport = () => {
    if (!reportData) return;
    const reportText = `
Verdict Research Report: ${reportData.ticker}
Company: ${reportData.financial_data?.company_name || ""}
AI Recommendation: ${reportData.critic_report?.recommendation || ""}
Executive Summary: ${adaptedReport.executiveSummary || ""}
    `;
    navigator.clipboard.writeText(reportText.trim());
    showToast("Report summary copied to clipboard.");
  };

  const handleExportMarkdown = () => {
    if (!reportData) return;
    const markdownContent = `
# Verdict Analysis Report: ${reportData.ticker}

## Executive Summary
${adaptedReport.executiveSummary || "N/A"}

## Investment Thesis
${adaptedReport.investmentThesis || "N/A"}

## Financial Analysis
${adaptedReport.financialAnalysis || "N/A"}

## News Intelligence
${adaptedReport.newsIntelligence || "N/A"}

## Opportunities
${adaptedReport.opportunities || "N/A"}

## Risk Assessment
${adaptedReport.riskAssessment || "N/A"}
    `;
    const blob = new Blob([markdownContent.trim()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verdict_report_${reportData.ticker}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported markdown file successfully.");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Verdict Analysis: ${reportData?.ticker}`,
        text: `Check out Verdict's automated analysis for ${reportData?.ticker}.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard for sharing.");
    }
  };

  return (
    <div
      className={cn(
        "w-full flex-grow rounded-2xl border p-6 md:p-8 transition-all duration-300 min-h-[500px] flex flex-col relative",
        "bg-[rgb(var(--glass-bg))] backdrop-blur-md border-[rgb(var(--border-default))] shadow-sm",
        className
      )}
    >
      {/* Dynamic top reading progress bar indicator */}
      {isCompleted && (
        <div 
          className="absolute top-0 left-0 h-0.5 bg-[rgb(var(--accent-primary))] transition-all duration-100 z-50 rounded-t-2xl"
          style={{ width: `${scrollPercent}%` }}
        />
      )}

      {/* Toast Notice alerts */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] shadow-md text-xs font-semibold text-[rgb(var(--text-primary))] z-50 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* State 1: Idle */}
        {isIdle && (
          <motion.div
            key="idle-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col w-full h-full"
          >
            <EmptyReport />
          </motion.div>
        )}

        {/* State 2: Failed */}
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

        {/* State 3: Loading */}
        {isLoading && (
          <motion.div
            key="loading-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 flex-1 flex flex-col"
          >
            <div className="flex flex-col gap-4 p-5 rounded-xl bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <StatusMessage message={getStatusMessage()} activeAgent={getActiveAgentName()} />
                <ExecutionTimer isActive={isLoading} />
              </div>
              <ProgressIndicator value={getProgressPercent()} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))]/40">
              <TimelineEvent label="Handoff Established" status="completed" />
              <TimelineEvent label="Financial Analysis" status={stages?.financial === "completed" ? "completed" : (stages?.financial === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Sentiment Collection" status={stages?.news === "completed" ? "completed" : (stages?.news === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Synthesis Drafting" status={stages?.writer === "completed" ? "completed" : (stages?.writer === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Agent Debate Review" status={stages?.critic === "completed" ? "completed" : (stages?.critic === "running" ? "running" : "waiting")} />
              <TimelineEvent label="Refinement Packaging" status={stages?.refiner === "completed" ? "completed" : (stages?.refiner === "running" ? "running" : "waiting")} />
            </div>

            <div className="space-y-8 mt-4 flex-1">
              <div className="space-y-3">
                <LoadingSkeleton className="h-6 w-1/4" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-5/6" />
              </div>

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
            </div>
          </motion.div>
        )}

        {/* State 4: Completed Report */}
        {isCompleted && (
          <div className="flex gap-8 items-start w-full">
            {/* Sticky Table of Contents Sidebar */}
            <aside className={cn(
              "hidden xl:block w-48 sticky top-28 flex-shrink-0 text-left border-r border-[rgb(var(--border-default))] pr-4 space-y-4",
              isReadingMode && "xl:hidden"
            )}>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[rgb(var(--text-tertiary))] block">
                Report Sections
              </span>
              <nav className="flex flex-col gap-2.5">
                {[
                  { id: "summary", label: "Executive Summary" },
                  { id: "thesis", label: "Investment Thesis" },
                  { id: "financials", label: "Financial Analysis" },
                  { id: "analytics", label: "Analytics Dashboard" },
                  { id: "news", label: "News Intelligence" },
                  { id: "evidence", label: "Research Evidence" },
                  { id: "risks", label: "Risk Assessment" },
                  { id: "reasoning", label: "AI Reasoning" },
                  { id: "citations", label: "Citation Explorer" }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      setActiveSection(item.id);
                    }}
                    className={cn(
                      "text-xs font-semibold tracking-tight transition-all duration-200 block",
                      activeSection === item.id 
                        ? "text-[rgb(var(--accent-primary))] font-bold border-l-2 border-[rgb(var(--accent-primary))] pl-2" 
                        : "text-[rgb(var(--text-secondary))] pl-2 border-l border-transparent hover:text-[rgb(var(--text-primary))]"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Content Area */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={cn("space-y-12 flex-1", isReadingMode ? "max-w-2xl mx-auto" : "max-w-3xl")}
            >
              {/* Research Header */}
              <motion.div variants={sectionVariants}>
                <ResearchHeader reportData={reportData} />
              </motion.div>

              {/* Productivity Toolbar & Search Panel */}
              <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-between p-3 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] select-none">
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  <button 
                    onClick={toggleReadingMode} 
                    className={cn(
                      "p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold border",
                      isReadingMode 
                        ? "bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))] border-[rgb(var(--accent-primary))]" 
                        : "hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-transparent"
                    )}
                    title={isReadingMode ? "Exit Reading Mode" : "Enter Reading Mode"}
                  >
                    <Brain className="h-3.5 w-3.5" />
                    <span>{isReadingMode ? "Workspace" : "Focus Mode"}</span>
                  </button>
                  <button 
                    onClick={handleCopyReport} 
                    className="p-2 rounded-lg hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-all flex items-center gap-1.5 text-xs font-semibold"
                    title="Copy report details"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                  <button 
                    onClick={handleExportMarkdown} 
                    className="p-2 rounded-lg hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-all flex items-center gap-1.5 text-xs font-semibold"
                    title="Export markdown file"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <button 
                    onClick={handlePrint} 
                    className="p-2 rounded-lg hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-all flex items-center gap-1.5 text-xs font-semibold"
                    title="Print Document"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                  <button 
                    onClick={handleShare} 
                    className="p-2 rounded-lg hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-all flex items-center gap-1.5 text-xs font-semibold"
                    title="Share reference link"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[rgb(var(--text-tertiary))]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search report contents..."
                    className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--accent-primary))] transition-all"
                  />
                </div>
              </motion.div>

              {/* Research Metadata Panel */}
              <motion.div variants={sectionVariants}>
                <ReportMetadataPanel reportData={reportData} />
              </motion.div>

              {/* Executive Summary */}
              {adaptedReport.executiveSummary && (
                <motion.div id="summary" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Executive Summary" 
                    id="summary" 
                    isExpanded={expandedSections.summary} 
                    onToggle={() => toggleSection("summary")}
                    copyText={adaptedReport.executiveSummary}
                    showToast={showToast}
                  >
                    <p className="text-title font-normal leading-relaxed text-[rgb(var(--text-secondary))] text-balance">
                      <HighlightText text={adaptedReport.executiveSummary} highlight={searchQuery} />
                    </p>
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Investment Thesis */}
              {(reportData.critic_report || adaptedReport.investmentThesis) && (
                <motion.div id="thesis" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Investment Thesis" 
                    id="thesis" 
                    isExpanded={expandedSections.thesis} 
                    onToggle={() => toggleSection("thesis")}
                    copyText={adaptedReport.investmentThesis || reportData.critic_report?.recommendation}
                    showToast={showToast}
                  >
                    <div className="space-y-4">
                      {reportData.critic_report && (
                        <InvestmentThesisCard criticReport={reportData.critic_report} searchQuery={searchQuery} />
                      )}
                      {adaptedReport.investmentThesis && (
                        <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed pt-2">
                          <HighlightText text={adaptedReport.investmentThesis} highlight={searchQuery} />
                        </p>
                      )}
                    </div>
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Financial Analysis */}
              {(reportData.financial_data || adaptedReport.financialAnalysis) && (
                <motion.div id="financials" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Financial Analysis" 
                    id="financials" 
                    isExpanded={expandedSections.financials} 
                    onToggle={() => toggleSection("financials")}
                    copyText={adaptedReport.financialAnalysis}
                    showToast={showToast}
                  >
                    <div className="space-y-4">
                      {reportData.financial_data && (
                        <MetadataPanel 
                          financialData={reportData.financial_data} 
                          activeTag={activeTag} 
                          setActiveTag={setActiveTag} 
                        />
                      )}
                      
                      {adaptedReport.financialAnalysis && (
                        <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed pt-2">
                          <HighlightText text={adaptedReport.financialAnalysis} highlight={searchQuery} />
                        </p>
                      )}
                    </div>
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Analytics Dashboard */}
              <motion.div id="analytics" variants={sectionVariants} className="scroll-mt-28">
                <ExpandableSection
                  title="Analytics Dashboard"
                  id="analytics"
                  isExpanded={expandedSections.analytics}
                  onToggle={() => toggleSection("analytics")}
                  showToast={showToast}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AdvancedMetricsPanel financialData={reportData.financial_data || { ticker: reportData.ticker } as FinancialData} />
                      <SentimentDistributionChart articles={reportData.news || []} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EvidenceConfidenceGauge score={(reportData.critic_report?.overall_score || 0) * 10} />
                      <WorkflowAnalyticsPanel reportData={reportData} />
                    </div>
                  </div>
                </ExpandableSection>
              </motion.div>

              {/* Market News Analysis */}
              {adaptedReport.newsIntelligence && (
                <motion.div id="news" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Market News Intelligence" 
                    id="news" 
                    isExpanded={expandedSections.news} 
                    onToggle={() => toggleSection("news")}
                    copyText={adaptedReport.newsIntelligence}
                    showToast={showToast}
                  >
                    <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-wrap">
                      <HighlightText text={adaptedReport.newsIntelligence} highlight={searchQuery} />
                    </p>
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Research Evidence */}
              {(adaptedReport.opportunities || reportData.critic_report?.strengths) && (
                <motion.div id="evidence" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Research Evidence" 
                    id="evidence" 
                    isExpanded={expandedSections.evidence} 
                    onToggle={() => toggleSection("evidence")}
                    copyText={adaptedReport.opportunities}
                    showToast={showToast}
                  >
                    <ResearchEvidence 
                      opportunities={adaptedReport.opportunities} 
                      strengths={reportData.critic_report?.strengths} 
                      activeTag={activeTag}
                      setActiveTag={setActiveTag}
                      searchQuery={searchQuery}
                    />
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Risk Assessment */}
              {(adaptedReport.riskAssessment || reportData.critic_report?.weaknesses) && (
                <motion.div id="risks" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Risk Assessment" 
                    id="risks" 
                    isExpanded={expandedSections.risks} 
                    onToggle={() => toggleSection("risks")}
                    copyText={adaptedReport.riskAssessment}
                    showToast={showToast}
                  >
                    <RiskAssessment 
                      risks={adaptedReport.riskAssessment} 
                      weaknesses={reportData.critic_report?.weaknesses} 
                      activeTag={activeTag}
                      setActiveTag={setActiveTag}
                      searchQuery={searchQuery}
                    />
                  </ExpandableSection>
                </motion.div>
              )}

              {/* AI Reasoning */}
              {reportData.critic_report && (
                <motion.div id="reasoning" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="AI Reasoning & Validation" 
                    id="reasoning" 
                    isExpanded={expandedSections.reasoning} 
                    onToggle={() => toggleSection("reasoning")}
                    copyText={reportData.critic_report.hallucination_risk}
                    showToast={showToast}
                  >
                    <AIReasoning criticReport={reportData.critic_report} searchQuery={searchQuery} />
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Citation Explorer */}
              {reportData.news && reportData.news.length > 0 && (
                <motion.div id="citations" variants={sectionVariants} className="scroll-mt-28">
                  <ExpandableSection 
                    title="Citation Explorer" 
                    id="citations" 
                    isExpanded={expandedSections.citations} 
                    onToggle={() => toggleSection("citations")}
                    showToast={showToast}
                  >
                    <CitationExplorer articles={reportData.news} searchQuery={searchQuery} />
                  </ExpandableSection>
                </motion.div>
              )}

              {/* Structured Report Footer */}
              <motion.div variants={sectionVariants}>
                <ReportFooter reportData={reportData} />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Subcomponents ───────────────────────────────────────────

function ExpandableSection({ 
  title, 
  id, 
  isExpanded, 
  onToggle, 
  copyText,
  showToast,
  children 
}: { 
  title: string; 
  id: string; 
  isExpanded: boolean; 
  onToggle: () => void; 
  copyText?: string;
  showToast?: (msg: string) => void;
  children: React.ReactNode;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCopySection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      showToast?.(`Copied ${title} content to clipboard.`);
    } else {
      showToast?.(`Flipped copy state for ${title}.`);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(prev => {
      showToast?.(!prev ? `Bookmarked ${title}.` : `Removed bookmark from ${title}.`);
      return !prev;
    });
  };

  return (
    <section id={id} className="scroll-mt-28 space-y-4 group/section">
      <div
        onClick={onToggle}
        className="w-full flex items-center justify-between border-b border-[rgb(var(--border-default))] pb-2 text-left cursor-pointer transition-all select-none"
        aria-expanded={isExpanded}
        aria-controls={`content-${id}`}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-title font-bold text-[rgb(var(--text-primary))]">{title}</h3>
          
          {/* Subtle contextual action icons visible on hover */}
          <div className="hidden sm:flex items-center gap-1.5 opacity-0 group-hover/section:opacity-100 transition-opacity">
            <button
              onClick={handleCopySection}
              className="p-1 rounded hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-all"
              title="Copy Section Content"
            >
              <Copy className="h-3 w-3" />
            </button>
            <button
              onClick={handleBookmark}
              className={cn(
                "p-1 rounded hover:bg-[rgb(var(--bg-elevated))] transition-all",
                isBookmarked 
                  ? "text-[rgb(var(--accent-primary))]" 
                  : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
              )}
              title="Bookmark Section"
            >
              <Bookmark className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-caption text-[rgb(var(--text-tertiary))] group-hover/section:text-[rgb(var(--text-secondary))] transition-colors">
          {isExpanded ? (
            <>
              <span>Hide</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>Show</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ReportMetadataPanel({ reportData }: { reportData: ResearchResponse }) {
  const modelInfo = reportData.metadata?.model_info || "Verdict Engine";
  const rawRisk = reportData.critic_report?.hallucination_risk || "";
  const riskStatus = rawRisk.toLowerCase().includes("high") 
    ? "High Risk" 
    : (rawRisk.toLowerCase().includes("low") ? "Low Risk" : "Audited");

  const metaItems = [
    { label: "Pipeline Status", value: "Workflow Verified", icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Core Model", value: modelInfo, icon: Brain, color: "text-[rgb(var(--accent-primary))]" },
    { label: "Audit Rating", value: riskStatus, icon: Info, color: "text-[rgb(var(--text-secondary))]" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))]/30 text-xs">
      {metaItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-[rgb(var(--bg-elevated))] flex items-center justify-center flex-shrink-0">
            <item.icon className={cn("h-4 w-4", item.color)} />
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] block">{item.label}</span>
            <span className="font-semibold text-[rgb(var(--text-secondary))]" title={idx === 2 ? rawRisk : undefined}>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResearchHeader({ reportData }: { reportData: ResearchResponse }) {
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="border-b border-[rgb(var(--border-default))] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-label tracking-widest font-semibold text-emerald-500 uppercase">
            Analysis Complete
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-headline font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
            {reportData.financial_data?.company_name || reportData.ticker}
          </h1>
          <span className="text-title font-mono text-[rgb(var(--text-tertiary))] select-none">
            {reportData.ticker} {reportData.financial_data?.exchange ? `(${reportData.financial_data.exchange})` : ""}
          </span>
        </div>
      </div>

      <div className="text-left md:text-right space-y-1">
        <p className="text-caption font-semibold tracking-wider text-[rgb(var(--text-tertiary))]">
          Generated on {dateStr}
        </p>
        <p className="text-caption font-mono text-[rgb(var(--text-tertiary))]">
          Agent Execution Time: {reportData.metadata?.duration ? `${reportData.metadata.duration.toFixed(1)}s` : "~45s"}
        </p>
      </div>
    </header>
  );
}

function InvestmentThesisCard({ criticReport, searchQuery }: { criticReport: CriticReport; searchQuery: string }) {
  const score = (criticReport.overall_score || 0) * 10;

  let label = "Hold";
  let colorClass = "text-amber-500 border-amber-500/20 bg-amber-500/5";
  let sentiment = "Neutral";
  if (score >= 80) {
    label = score >= 90 ? "Strong Buy" : "Buy";
    colorClass = "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
    sentiment = "Bullish";
  } else if (score < 60) {
    label = score < 40 ? "Strong Sell" : "Sell";
    colorClass = "text-red-500 border-red-500/20 bg-red-500/5";
    sentiment = "Bearish";
  }

  const investmentHorizon = "12 - 24 Months"; 

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgb(var(--border-default))] pb-6">
        <div>
          <span className="text-caption tracking-widest font-semibold text-[rgb(var(--text-tertiary))] uppercase block mb-1">
            Verdict AI Rating
          </span>
          <div className="flex items-center gap-3">
            <h3 className="text-headline font-black tracking-tight text-[rgb(var(--text-primary))]">
              {label}
            </h3>
            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold border", colorClass)}>
              {sentiment}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 md:text-right">
          <span className="text-headline md:text-display font-extrabold tracking-tight">{score}</span>
          <span className="text-subtitle text-[rgb(var(--text-tertiary))]">/100 Confidence</span>
        </div>
      </div>

      {criticReport.recommendation && (
        <div className="space-y-2">
          <span className="text-label tracking-widest font-semibold text-[rgb(var(--text-tertiary))] uppercase block">
            Investment Thesis
          </span>
          <p className="text-body font-normal text-[rgb(var(--text-secondary))] leading-relaxed italic border-l-2 border-[rgb(var(--accent-primary))] pl-4 text-balance">
            &ldquo;<HighlightText text={criticReport.recommendation} highlight={searchQuery} />&rdquo;
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-[rgb(var(--border-default))]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] block mb-0.5">Sentiment</span>
          <span className="text-small font-semibold text-[rgb(var(--text-secondary))]">{sentiment}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] block mb-0.5">Confidence Level</span>
          <span className="text-small font-semibold text-[rgb(var(--text-secondary))]">{score}%</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] block mb-0.5">Horizon</span>
          <span className="text-small font-semibold text-[rgb(var(--text-secondary))]">{investmentHorizon}</span>
        </div>
      </div>
    </div>
  );
}

function MetadataPanel({ 
  financialData, 
  activeTag, 
  setActiveTag 
}: { 
  financialData: FinancialData; 
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
}) {
  const formatPercent = (val?: number | null) => {
    if (val === undefined || val === null) return "—";
    return `${(val * 100).toFixed(2)}%`;
  };

  const metrics = [
    { label: "Current Price", value: formatCurrency(financialData.current_price, financialData.currency), icon: Banknote, tag: "Valuation" },
    { label: "Market Cap", value: formatCurrency(financialData.market_cap, financialData.currency), icon: Activity, tag: "Valuation" },
    { label: "P/E Ratio", value: financialData.pe_ratio !== null && financialData.pe_ratio !== undefined ? financialData.pe_ratio.toFixed(2) : "—", icon: Layers, tag: "Valuation" },
    { label: "Gross Margin", value: formatPercent(financialData.gross_margin), icon: TrendingUp, tag: "Profitability" },
    { label: "Revenue", value: formatCurrency(financialData.revenue, financialData.currency), icon: Banknote, tag: "Growth" },
    { label: "ROE", value: formatPercent(financialData.roe), icon: Activity, tag: "Profitability" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 select-none">
      {metrics.map((metric, idx) => {
        const isHighlighted = activeTag === metric.tag;
        return (
          <div 
            key={idx} 
            onMouseEnter={() => setActiveTag(metric.tag)}
            onMouseLeave={() => setActiveTag(null)}
            className={cn(
              "p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 cursor-pointer bg-[rgb(var(--bg-elevated))]",
              isHighlighted 
                ? "border-[rgb(var(--accent-primary))] shadow-sm ring-1 ring-[rgb(var(--accent-primary))]/20 bg-[rgb(var(--accent-primary))]/5" 
                : "border-[rgb(var(--border-default))]"
            )}
          >
            <div className="flex justify-between items-center gap-2">
              <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">{metric.label}</span>
              <span className={cn(
                "text-[8px] font-bold px-1.5 py-0.5 rounded-full border tracking-wide uppercase",
                metric.tag === "Valuation" ? "text-blue-500 border-blue-500/10 bg-blue-500/5" :
                metric.tag === "Profitability" ? "text-indigo-500 border-indigo-500/10 bg-indigo-500/5" :
                "text-emerald-500 border-emerald-500/10 bg-emerald-500/5"
              )}>
                {metric.tag}
              </span>
            </div>
            <span className="text-subtitle font-extrabold text-[rgb(var(--text-primary))]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {metric.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ResearchEvidence({ 
  opportunities, 
  strengths, 
  activeTag, 
  setActiveTag,
  searchQuery 
}: { 
  opportunities?: string; 
  strengths?: string[]; 
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  searchQuery: string;
}) {
  const isHighlighted = activeTag === "Growth";

  return (
    <section className="space-y-4" onMouseEnter={() => setActiveTag("Growth")} onMouseLeave={() => setActiveTag(null)}>
      <div className="grid grid-cols-1 gap-6">
        {strengths && strengths.length > 0 && (
          <div className={cn(
            "rounded-xl border bg-[rgb(var(--bg-elevated))] p-6 space-y-4 transition-all duration-200",
            isHighlighted 
              ? "border-[rgb(var(--accent-primary))] ring-1 ring-[rgb(var(--accent-primary))]/20 bg-[rgb(var(--accent-primary))]/5" 
              : "border-[rgb(var(--border-default))]"
          )}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-emerald-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Validating Catalyst Strengths</h4>
              </div>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-emerald-500 uppercase">
                Growth Catalysts
              </span>
            </div>
            <ul className="space-y-3">
              {strengths.map((s, idx) => (
                <li key={idx} className="text-small text-[rgb(var(--text-secondary))] leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-500 font-bold select-none">•</span>
                  <span><HighlightText text={s} highlight={searchQuery} /></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {opportunities && (
          <div className={cn(
            "p-4 rounded-xl border bg-[rgb(var(--bg-elevated))]/60 transition-all duration-200",
            isHighlighted ? "border-[rgb(var(--accent-primary))]" : "border-[rgb(var(--border-default))]"
          )}>
            <div className="flex items-center gap-2 text-[rgb(var(--accent-primary))] mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs uppercase font-bold tracking-wider">Identified Market Opportunities</span>
            </div>
            <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-wrap">
              <HighlightText text={opportunities} highlight={searchQuery} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function RiskAssessment({ 
  risks, 
  weaknesses, 
  activeTag, 
  setActiveTag,
  searchQuery 
}: { 
  risks?: string; 
  weaknesses?: string[]; 
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  searchQuery: string;
}) {
  const isHighlighted = activeTag === "Risk";

  return (
    <section className="space-y-4" onMouseEnter={() => setActiveTag("Risk")} onMouseLeave={() => setActiveTag(null)}>
      <div className="grid grid-cols-1 gap-6">
        {weaknesses && weaknesses.length > 0 && (
          <div className={cn(
            "rounded-xl border bg-[rgb(var(--bg-elevated))] p-6 space-y-4 transition-all duration-200",
            isHighlighted 
              ? "border-[rgb(var(--accent-primary))] ring-1 ring-[rgb(var(--accent-primary))]/20 bg-[rgb(var(--accent-primary))]/5" 
              : "border-[rgb(var(--border-default))]"
          )}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-red-500">
                <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
                <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Identified Headwinds & Weaknesses</h4>
              </div>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-red-500/10 bg-red-500/5 text-red-500 uppercase">
                Risk
              </span>
            </div>
            <ul className="space-y-3">
              {weaknesses.map((w, idx) => (
                <li key={idx} className="text-small text-[rgb(var(--text-secondary))] leading-relaxed flex items-start gap-2">
                  <span className="text-red-500 font-bold select-none">•</span>
                  <span><HighlightText text={w} highlight={searchQuery} /></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {risks && (
          <div className={cn(
            "p-4 rounded-xl border bg-[rgb(var(--bg-elevated))]/60 transition-all duration-200",
            isHighlighted ? "border-[rgb(var(--accent-primary))]" : "border-[rgb(var(--border-default))]"
          )}>
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <ShieldAlert className="h-4 w-4" />
              <span className="text-xs uppercase font-bold tracking-wider">Security Risks & Pitfalls</span>
            </div>
            <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-wrap">
              <HighlightText text={risks} highlight={searchQuery} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function AIReasoning({ criticReport, searchQuery }: { criticReport: CriticReport; searchQuery: string }) {
  return (
    <section className="space-y-3">
      <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed">
        Verdict coordinates multiple specialized AI agent workflows to conduct comprehensive market intelligence, news extraction, and SEC document validation. In the validation phase, the Critic Agent evaluated the findings for factual consistency, logic holes, and bias.
      </p>
      
      {criticReport.hallucination_risk && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] mt-3">
          <Info className="h-5 w-5 text-[rgb(var(--text-tertiary))] flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-caption font-bold text-[rgb(var(--text-secondary))] uppercase block mb-1">Hallucination Risk Audit</span>
            <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed text-balance">
              <HighlightText text={criticReport.hallucination_risk} highlight={searchQuery} />
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function CitationExplorer({ articles, searchQuery }: { articles: NewsArticle[]; searchQuery: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getSentimentColor = (sentiment?: string) => {
    if (!sentiment) return "text-[rgb(var(--text-secondary))]";
    const clean = sentiment.toLowerCase();
    if (clean.includes("pos")) return "text-emerald-500";
    if (clean.includes("neg")) return "text-red-500";
    return "text-[rgb(var(--text-secondary))]";
  };

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.slice(0, 8).map((art, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div 
              key={idx} 
              className={cn(
                "p-4 rounded-xl border bg-[rgb(var(--bg-elevated))] flex flex-col justify-between gap-3 group/item transition-all duration-300 cursor-pointer",
                isExpanded ? "border-[rgb(var(--accent-primary))] shadow-sm" : "border-[rgb(var(--border-default))] hover:border-[rgb(var(--text-tertiary))]"
              )}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
            >
              <div>
                <div className="flex justify-between items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[rgb(var(--text-tertiary))] truncate max-w-[120px] uppercase tracking-wider">
                    {art.source || "Finance Feed"}
                  </span>
                  {art.sentiment && (
                    <span className={cn("text-[9px] font-bold uppercase tracking-wider", getSentimentColor(art.sentiment))}>
                      {art.sentiment}
                    </span>
                  )}
                </div>
                <h5 className="text-small font-semibold text-[rgb(var(--text-primary))] leading-tight line-clamp-2">
                  <HighlightText text={art.title} highlight={searchQuery} />
                </h5>
                
                <AnimatePresence initial={false}>
                  {isExpanded && art.description && (
                    <motion.p 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 0.8 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-caption text-[rgb(var(--text-secondary))] mt-3 leading-relaxed overflow-hidden text-balance"
                    >
                      <HighlightText text={art.description} highlight={searchQuery} />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between border-t border-[rgb(var(--border-default))]/45 pt-3 select-none">
                {art.published_at && (
                  <span className="text-[9px] font-mono text-[rgb(var(--text-tertiary))] inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(art.published_at).toLocaleDateString()}
                  </span>
                )}
                {art.url && (
                  <a 
                    href={art.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-semibold text-[rgb(var(--accent-primary))] hover:underline inline-flex items-center gap-1"
                  >
                    Source Link <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ReportFooter({ reportData }: { reportData: ResearchResponse }) {
  return (
    <footer className="border-t border-[rgb(var(--border-default))] pt-8 mt-12 text-center space-y-2 text-[10px] text-[rgb(var(--text-tertiary))] font-medium select-none print:mt-24">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <span>{reportData.metadata?.model_info || "Verdict Engine"}</span>
        <span>•</span>
        <span>Validation Audited</span>
        <span>•</span>
        <span>Citations: {reportData.news?.length || 0} Sources</span>
        <span>•</span>
        <span>Audit ID: {reportData.ticker.toUpperCase()}-{reportData.metadata?.status === 'success' ? 'VERIFIED' : 'PENDING'}</span>
      </div>
      <p className="max-w-md mx-auto text-[9px] text-[rgb(var(--text-tertiary))]/60 leading-normal text-balance">
        Disclaimer: Automated AI equity synthesis reports are for informational and educational references only. No investment recommendations or securities trading advice are proposed.
      </p>
    </footer>
  );
}
