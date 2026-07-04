"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Brain, FileText, Globe, Shield, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/layout/bento-grid";
import { Section, SectionHeader } from "@/components/layout/section";
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/components/animations/variants";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-base))] overflow-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--accent-primary))] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-[16px] tracking-tight">Verdict</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/research">
              <Button>
                Launch App <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-24">
        {/* Hero Section */}
        <Section className="text-center relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgb(var(--accent-primary))]/5 via-[rgb(var(--bg-base))] to-[rgb(var(--bg-base))]"></div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={slideUp} className="mb-6 rounded-full border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] px-4 py-1.5 text-sm font-medium text-[rgb(var(--text-secondary))] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[rgb(var(--accent-primary))]" />
              AI-Native Equity Research
            </motion.div>
            <motion.h1 variants={slideUp} className="text-display mb-6 text-balance leading-tight">
              Institutional grade research. <br />
              <span className="text-[rgb(var(--accent-primary))]">In minutes, not days.</span>
            </motion.h1>
            <motion.p variants={slideUp} className="text-title font-normal text-[rgb(var(--text-secondary))] max-w-2xl mb-10 text-balance">
              Verdict deploys a coordinated network of specialized AI agents to analyze financials, synthesize market news, and produce comprehensive equity research.
            </motion.p>
            <motion.div variants={slideUp} className="flex gap-4">
              <Link href="/research">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Researching <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Section>

        {/* Architecture Section */}
        <Section className="mt-12">
          <SectionHeader
            title="Multi-Agent Architecture"
            subtitle="A LangGraph-orchestrated pipeline runs every time you submit a ticker. Agents cooperate, debate, and refine the final output."
            align="center"
          />
          <BentoGrid className="max-w-5xl mx-auto">
            {/* Financial Agent */}
            <BentoGridItem colSpan={{ md: 3, lg: 4 }} className="bg-blue-500/5 border-blue-500/10 hover:border-blue-500/20">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-title mb-2">Financial Agent</h3>
              <p className="text-body text-[rgb(var(--text-secondary))]">Fetches live market data, ratios, and SEC filings via Yahoo Finance tools.</p>
            </BentoGridItem>

            {/* News Agent */}
            <BentoGridItem colSpan={{ md: 3, lg: 4 }} className="bg-violet-500/5 border-violet-500/10 hover:border-violet-500/20">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-violet-500" />
              </div>
              <h3 className="text-title mb-2">News Agent</h3>
              <p className="text-body text-[rgb(var(--text-secondary))]">Aggregates and sentiment-scores recent articles from global news sources.</p>
            </BentoGridItem>

            {/* Writer Agent */}
            <BentoGridItem colSpan={{ md: 3, lg: 4 }} className="bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/20">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-title mb-2">Writer Agent</h3>
              <p className="text-body text-[rgb(var(--text-secondary))]">Synthesizes data into a structured, readable investment research report.</p>
            </BentoGridItem>

            {/* Critic Agent */}
            <BentoGridItem colSpan={{ md: 3, lg: 6 }} className="bg-amber-500/5 border-amber-500/10 hover:border-amber-500/20">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-title mb-2">Critic Agent</h3>
              <p className="text-body text-[rgb(var(--text-secondary))]">Evaluates the draft for accuracy, balance, bias, and hallucination risks.</p>
            </BentoGridItem>

            {/* Refiner Agent */}
            <BentoGridItem colSpan={{ md: 3, lg: 6 }} className="bg-rose-500/5 border-rose-500/10 hover:border-rose-500/20">
              <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center mb-4">
                <Brain className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="text-title mb-2">Refiner Agent</h3>
              <p className="text-body text-[rgb(var(--text-secondary))]">Integrates feedback to produce a polished, publication-ready final verdict.</p>
            </BentoGridItem>
          </BentoGrid>
        </Section>
      </main>

      <footer className="border-t border-[rgb(var(--border-default))] py-8 text-center text-sm text-[rgb(var(--text-tertiary))]">
        <p>Verdict AI Research Platform. Not financial advice.</p>
      </footer>
    </div>
  );
}
