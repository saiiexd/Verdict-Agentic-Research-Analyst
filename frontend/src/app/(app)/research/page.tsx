"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { runResearch } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { Section, SectionHeader } from "@/components/layout/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkflowVisualizer, useSimulatedWorkflow } from "@/components/workflow/workflow-visualizer";
import { Search, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp } from "@/components/animations/variants";

export default function ResearchWorkspacePage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const addHistory = useAppStore((state) => state.addHistory);

  const mutation = useMutation({
    mutationFn: runResearch,
    onSuccess: (data, variables) => {
      // Store in global history
      const historyItem = {
        id: crypto.randomUUID(),
        ticker: variables.toUpperCase(),
        timestamp: Date.now(),
        data,
      };
      addHistory(historyItem);
      
      // Artificial delay to let the UI settle on "Completed" before navigating
      setTimeout(() => {
        router.push(`/reports/${variables.toUpperCase()}`);
      }, 800);
    },
  });

  const stages = useSimulatedWorkflow(mutation.isPending, mutation.isError, mutation.isSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim()) return;
    mutation.mutate(ticker);
  };

  return (
    <Section className="min-h-[80vh] flex flex-col items-center justify-center pt-0 pb-16">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl mx-auto text-center"
      >
        <SectionHeader 
          title="Start Research" 
          subtitle="Enter a stock ticker to deploy the AI research workflow."
          align="center"
          className="mb-8"
        />

        <form onSubmit={handleSubmit} className="relative mb-12">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-6 w-6 text-[rgb(var(--text-tertiary))]" />
            <Input
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. AAPL, NVDA, MSFT"
              className="h-16 pl-14 pr-32 text-lg font-medium shadow-sm rounded-2xl bg-[rgb(var(--bg-surface))] border-[rgb(var(--border-strong))] uppercase text-ticker"
              disabled={mutation.isPending || mutation.isSuccess}
              maxLength={10}
            />
            <div className="absolute right-2">
              <Button 
                type="submit" 
                size="lg"
                disabled={!ticker.trim() || mutation.isPending || mutation.isSuccess}
                className="rounded-xl"
              >
                {mutation.isPending ? "Running..." : "Analyze"}
              </Button>
            </div>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {mutation.isError && (
            <motion.div 
              key="error"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-left"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{mutation.error instanceof Error ? mutation.error.message : "An unexpected error occurred."}</p>
            </motion.div>
          )}

          {(mutation.isPending || mutation.isSuccess || mutation.isError) && (
            <motion.div
              key="visualizer"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <WorkflowVisualizer stages={stages} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
