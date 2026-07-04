"use client";

import { use, useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Section } from "@/components/layout/section";
import { BentoGrid } from "@/components/layout/bento-grid";
import { FinancialSummary } from "@/components/report/financial-summary";
import { NewsAnalysis } from "@/components/report/news-analysis";
import { CriticScore } from "@/components/report/critic-score";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, Copy, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp } from "@/components/animations/variants";

export default function ReportViewerPage({ params }: { params: Promise<{ ticker: string }> }) {
  const router = useRouter();
  const { ticker } = use(params);
  const history = useAppStore((state) => state.history);
  
  const [copied, setCopied] = useState(false);

  // Find the most recent report for this ticker
  const reportItem = history.find((h) => h.ticker.toUpperCase() === ticker.toUpperCase());

  useEffect(() => {
    if (!reportItem) {
      router.replace("/research");
    }
  }, [reportItem, router]);

  if (!reportItem) return null;

  const data = reportItem.data;
  const finalReport = data.final_report;

  const handleCopyMarkdown = () => {
    if (!finalReport) return;
    
    const markdown = `
# Investment Verdict: ${ticker.toUpperCase()}
Generated on: ${new Date(reportItem.timestamp).toLocaleString()}

## Company Overview
${finalReport.company_overview}

## Financial Analysis
${finalReport.financial_analysis}

## Bull Case
${finalReport.opportunities}

## Bear Case / Risks
${finalReport.risks}

## The Verdict (Investment Outlook)
${finalReport.investment_outlook}
    `.trim();

    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <Section className="pb-24">
      <div className="flex justify-between items-center mb-8 border-b border-[rgb(var(--border-default))] pb-6 print-hidden">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Go back to dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-headline">Investment Verdict: {ticker.toUpperCase()}</h1>
            <p className="text-small text-[rgb(var(--text-secondary))]">
              Generated {new Date(reportItem.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hidden sm:flex" onClick={handleCopyMarkdown}>
            {copied ? <Check className="mr-2 h-4 w-4 text-emerald-500" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied" : "Copy Markdown"}
          </Button>
          <Button variant="outline" className="hidden sm:flex" onClick={handleExportPdf}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Sticky Table of Contents (Hidden on print & mobile) */}
        <div className="hidden xl:block xl:col-span-3 print-hidden">
          <aside className="sticky top-24 space-y-2 border-l-2 border-[rgb(var(--border-default))] pl-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">Contents</p>
            <a href="#financials" className="block text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">Financial Summary</a>
            <a href="#critic-news" className="block text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">Critic & News</a>
            <a href="#report-body" className="block text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">Final Report</a>
            <a href="#verdict" className="block text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors ml-4">— The Verdict</a>
          </aside>
        </div>

        {/* Main Content Area */}
        <div className="xl:col-span-9 space-y-8">
          
          {data.financial_data && (
            <div id="financials" className="scroll-mt-24">
              <BentoGrid>
                <FinancialSummary data={data.financial_data} />
              </BentoGrid>
            </div>
          )}

          <div id="critic-news" className="scroll-mt-24">
            <BentoGrid>
              {data.critic_report && <CriticScore report={data.critic_report} />}
              {data.news && <NewsAnalysis news={data.news} />}
            </BentoGrid>
          </div>

          {/* Main Report Body */}
          {finalReport && (
            <div id="report-body" className="scroll-mt-24">
              <motion.div variants={slideUp} initial="hidden" animate="visible" className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-2xl p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-10 border-b border-[rgb(var(--border-default))] pb-6">
                  <div className="h-10 w-10 rounded-lg bg-[rgb(var(--accent-primary))]/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[rgb(var(--accent-primary))]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Final Research Report</CardTitle>
                    <CardDescription>Synthesized by AI Writer & Refiner Agents</CardDescription>
                  </div>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h3:text-title prose-p:text-body prose-p:text-[rgb(var(--text-secondary))] prose-li:text-[rgb(var(--text-secondary))]">
                  {finalReport.company_overview && (
                    <div className="mb-10">
                      <h3 className="text-[rgb(var(--text-primary))] mb-4">Company Overview</h3>
                      <p className="whitespace-pre-line">{finalReport.company_overview}</p>
                    </div>
                  )}
                  
                  {finalReport.financial_analysis && (
                    <div className="mb-10">
                      <h3 className="text-[rgb(var(--text-primary))] mb-4">Financial Analysis</h3>
                      <p className="whitespace-pre-line">{finalReport.financial_analysis}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {finalReport.opportunities && (
                      <div className="bg-emerald-500/5 rounded-xl p-6 border border-emerald-500/10">
                        <h3 className="text-emerald-500 mb-4 mt-0">Bull Case</h3>
                        <p className="whitespace-pre-line m-0">{finalReport.opportunities}</p>
                      </div>
                    )}
                    {finalReport.risks && (
                      <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10">
                        <h3 className="text-red-500 mb-4 mt-0">Bear Case / Risks</h3>
                        <p className="whitespace-pre-line m-0">{finalReport.risks}</p>
                      </div>
                    )}
                  </div>

                  {finalReport.investment_outlook && (
                    <div id="verdict" className="mt-12 pt-8 border-t border-[rgb(var(--border-strong))] scroll-mt-24">
                      <h3 className="text-[rgb(var(--text-primary))] mb-4">The Verdict (Investment Outlook)</h3>
                      <p className="whitespace-pre-line font-medium text-lg leading-relaxed text-[rgb(var(--text-primary))]">
                        {finalReport.investment_outlook}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
