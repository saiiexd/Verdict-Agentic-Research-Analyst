"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { runResearch } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkflowVisualizer, useSimulatedWorkflow } from "@/components/workflow/workflow-visualizer";
import { Search, AlertCircle, BarChart3, Globe, FileText, Shield, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/components/animations/variants";

const AGENT_ROSTER = [
  { id: "financial", icon: BarChart3, label: "Financial Analyst" },
  { id: "news", icon: Globe, label: "News Aggregator" },
  { id: "writer", icon: FileText, label: "Research Writer" },
  { id: "critic", icon: Shield, label: "Bias Critic" },
  { id: "refiner", icon: Brain, label: "Quality Refiner" }
];

export default function WorkspacePage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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

  const isIdle = !mutation.isPending && !mutation.isSuccess && !mutation.isError;

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 relative">
      {/* Background ambient glow when idle */}
      {isIdle && (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgb(var(--accent-primary))]/5 via-[rgb(var(--bg-base))] to-[rgb(var(--bg-base))] transition-opacity duration-1000" />
      )}

      <motion.div
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto flex flex-col"
        style={{
          marginTop: isIdle ? "0" : "-10vh" // Lift slightly when executing
        }}
      >
        <AnimatePresence mode="wait">
          {isIdle && (
            <motion.div 
              key="hero-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <h1 className="text-display mb-4 tracking-tight">Verdict AI</h1>
              <p className="text-title text-[rgb(var(--text-secondary))] font-normal">
                Intelligent equity research operating system.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout
          className="relative z-20 w-full"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div 
              className={`relative flex items-center transition-all duration-500 rounded-2xl bg-[rgb(var(--bg-surface))] border ${
                isFocused 
                  ? "border-[rgb(var(--accent-primary))] shadow-[0_0_0_4px_rgba(var(--accent-primary),0.1)]" 
                  : "border-[rgb(var(--border-strong))] shadow-sm"
              }`}
            >
              <Search className="absolute left-6 h-6 w-6 text-[rgb(var(--text-tertiary))]" />
              <Input
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter a ticker symbol (e.g. NVDA)"
                className="h-20 pl-16 pr-36 text-xl font-medium rounded-2xl bg-transparent border-none shadow-none focus-visible:ring-0 uppercase text-ticker"
                disabled={!isIdle}
                maxLength={10}
              />
              <div className="absolute right-3">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={!ticker.trim() || !isIdle}
                  className="rounded-xl h-14 px-8 text-base shadow-sm"
                >
                  {mutation.isPending ? "Executing" : "Analyze"}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {isIdle && (
            <motion.div
              key="roster"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-12 w-full flex flex-col items-center"
            >
              <p className="text-xs uppercase tracking-widest font-semibold text-[rgb(var(--text-tertiary))] mb-6">
                Active Neural Agents
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {AGENT_ROSTER.map((agent, i) => (
                  <motion.div 
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                    className="flex flex-col items-center gap-2 group cursor-default"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] flex items-center justify-center transition-colors group-hover:bg-[rgb(var(--accent-primary))]/5 group-hover:border-[rgb(var(--accent-primary))]/20">
                      <agent.icon className="h-5 w-5 text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--accent-primary))] transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))] transition-colors">
                      {agent.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {mutation.isError && (
            <motion.div 
              key="error"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 w-full"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{mutation.error instanceof Error ? mutation.error.message : "Execution failed. Check backend connectivity."}</p>
            </motion.div>
          )}

          {!isIdle && !mutation.isError && (
            <motion.div
              key="visualizer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full mt-4"
            >
              <WorkflowVisualizer stages={stages} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
