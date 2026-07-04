"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Section } from "@/components/layout/section";
import { BentoGrid } from "@/components/layout/bento-grid";
import { FinancialSummary } from "@/components/report/financial-summary";
import { NewsAnalysis } from "@/components/report/news-analysis";
import { CriticScore } from "@/components/report/critic-score";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp } from "@/components/animations/variants";

export default function ReportViewerPage({ params }: { params: Promise<{ ticker: string }> }) {
  const router = useRouter();
  const { ticker } = use(params);
  
  const history = useAppStore((state) => state.history);
  
  // Find the most recent report for this ticker
  const reportItem = history.find((h) => h.ticker.toUpperCase() === ticker.toUpperCase());

  useEffect(() => {
    if (!reportItem) {
      // If we land here but have no report in state, bounce back to research
      router.replace("/research");
    }
  }, [reportItem, router]);

  if (!reportItem) return null;

  const data = reportItem.data;
  const finalReport = data.final_report;

  return (
    <Section className="pb-24">
      <div className="flex justify-between items-center mb-8 border-b border-[rgb(var(--border-default))] pb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
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
        <div>
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <BentoGrid className="mb-8">
        {data.financial_data && (
          <FinancialSummary data={data.financial_data} />
        )}
      </BentoGrid>

      <BentoGrid className="mb-8">
        {data.critic_report && (
          <CriticScore report={data.critic_report} />
        )}
        
        {data.news && (
          <NewsAnalysis news={data.news} />
        )}
      </BentoGrid>

      {/* Main Report Body */}
      {finalReport && (
        <motion.div variants={slideUp} initial="hidden" animate="visible" className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-2xl p-8 md:p-12 shadow-sm max-w-5xl mx-auto">
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
              <div className="mt-12 pt-8 border-t border-[rgb(var(--border-strong))]">
                <h3 className="text-[rgb(var(--text-primary))] mb-4">The Verdict (Investment Outlook)</h3>
                <p className="whitespace-pre-line font-medium text-lg leading-relaxed text-[rgb(var(--text-primary))]">
                  {finalReport.investment_outlook}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Section>
  );
}
