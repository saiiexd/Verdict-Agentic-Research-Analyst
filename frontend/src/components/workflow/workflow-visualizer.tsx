"use client";

import { useState, useEffect } from "react";
import { AgentStatus } from "@/lib/types";
import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
}

const DEFAULT_STAGES: WorkflowStage[] = [
  { id: "financial", name: "Financial Agent", description: "Fetching market data & SEC filings." },
  { id: "news", name: "News Agent", description: "Aggregating and sentiment-scoring global news." },
  { id: "writer", name: "Writer Agent", description: "Synthesizing data into a draft report." },
  { id: "critic", name: "Critic Agent", description: "Evaluating draft for bias and hallucination." },
  { id: "refiner", name: "Refiner Agent", description: "Polishing the final research verdict." },
];

export function useSimulatedWorkflow(isActive: boolean, isError: boolean, isSuccess: boolean) {
  const [stages, setStages] = useState<Record<string, AgentStatus>>({
    financial: "idle",
    news: "idle",
    writer: "idle",
    critic: "idle",
    refiner: "idle",
  });

  useEffect(() => {
    if (!isActive) {
      if (isSuccess) {
        setStages({
          financial: "completed",
          news: "completed",
          writer: "completed",
          critic: "completed",
          refiner: "completed",
        });
      } else if (isError) {
        setStages((prev) => {
          const next = { ...prev };
          let foundRunning = false;
          for (const key in next) {
            if (next[key] === "running") {
              next[key] = "failed";
              foundRunning = true;
            } else if (next[key] === "idle") {
              next[key] = "skipped";
            }
          }
          if (!foundRunning) next.financial = "failed"; // default to fail first if not started
          return next;
        });
      } else {
        // Reset
        setStages({
          financial: "idle",
          news: "idle",
          writer: "idle",
          critic: "idle",
          refiner: "idle",
        });
      }
      return;
    }

    // Simulation logic (Backend takes ~60s total, we divide it logically)
    let currentTimeout: NodeJS.Timeout;
    
    const runSimulation = () => {
      setStages((prev) => ({ ...prev, financial: "running" }));
      
      currentTimeout = setTimeout(() => {
        if (!isActive) return;
        setStages((prev) => ({ ...prev, financial: "completed", news: "running" }));
        
        currentTimeout = setTimeout(() => {
          if (!isActive) return;
          setStages((prev) => ({ ...prev, news: "completed", writer: "running" }));
          
          currentTimeout = setTimeout(() => {
            if (!isActive) return;
            setStages((prev) => ({ ...prev, writer: "completed", critic: "running" }));
            
            currentTimeout = setTimeout(() => {
              if (!isActive) return;
              setStages((prev) => ({ ...prev, critic: "completed", refiner: "running" }));
              
              // We leave refiner running until the actual API returns.
              
            }, 10000);
          }, 15000);
        }, 15000);
      }, 10000);
    };

    runSimulation();

    return () => clearTimeout(currentTimeout);
  }, [isActive, isError, isSuccess]);

  return stages;
}

interface WorkflowVisualizerProps {
  stages: Record<string, AgentStatus>;
}

export function WorkflowVisualizer({ stages }: WorkflowVisualizerProps) {
  return (
    <div className="space-y-6 relative max-w-xl mx-auto mt-12 p-8 rounded-xl bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))]">
      <div className="absolute left-[47px] top-[48px] bottom-[48px] w-px bg-[rgb(var(--border-strong))] z-0" />
      
      {DEFAULT_STAGES.map((stage) => {
        const status = stages[stage.id];
        
        return (
          <div key={stage.id} className="relative z-10 flex items-start gap-4">
            <div className="mt-0.5 relative">
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Circle className="h-6 w-6 text-[rgb(var(--border-strong))] fill-[rgb(var(--bg-elevated))]" />
                  </motion.div>
                )}
                {status === "running" && (
                  <motion.div key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="h-6 w-6 text-[rgb(var(--accent-primary))] animate-spin" />
                  </motion.div>
                )}
                {status === "completed" && (
                  <motion.div key="completed" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 fill-emerald-500/20" />
                  </motion.div>
                )}
                {status === "failed" && (
                  <motion.div key="failed" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <XCircle className="h-6 w-6 text-red-500 fill-red-500/20" />
                  </motion.div>
                )}
                {status === "skipped" && (
                  <motion.div key="skipped" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Circle className="h-6 w-6 text-[rgb(var(--text-tertiary))] stroke-dashed" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className={cn(
              "flex-1 transition-opacity duration-300",
              status === "idle" || status === "skipped" ? "opacity-40" : "opacity-100"
            )}>
              <h4 className={cn(
                "text-subtitle font-semibold m-0",
                status === "running" ? "text-[rgb(var(--accent-primary))]" : "text-[rgb(var(--text-primary))]"
              )}>
                {stage.name}
              </h4>
              <p className="text-small text-[rgb(var(--text-secondary))] mt-1">
                {stage.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
