"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WorkspaceLayout } from "./WorkspaceLayout";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { CommandSearch } from "./CommandSearch";
import { AgentWorkflow } from "./AgentWorkflow";
import { ReportPanel } from "./ReportPanel";
import { useResearch } from "@/hooks/useResearch";
import { useAppStore } from "@/store/useAppStore";
import { useSimulatedWorkflow } from "@/components/workflow/workflow-visualizer";

interface ResearchWorkspaceProps {
  className?: string;
}

/**
 * ResearchWorkspace is the composition layer for the Verdict research space.
 * Combines all modular workspace blocks and arranges them into a responsive layout
 * (vertical stack on small screens, two-column split on desktop viewports).
 */
export function ResearchWorkspace({ className }: ResearchWorkspaceProps) {
  const { startResearch } = useResearch();
  
  const researchStatus = useAppStore((state) => state.researchStatus);
  const currentResearchData = useAppStore((state) => state.currentResearchData);
  const currentResearchTicker = useAppStore((state) => state.currentResearchTicker);
  const researchError = useAppStore((state) => state.researchError);
  const isReadingMode = useAppStore((state) => state.isReadingMode);

  const isPending = researchStatus === "Submitting" || researchStatus === "Running";
  const isSuccess = researchStatus === "Completed";
  const isError = researchStatus === "Failed";

  const stages = useSimulatedWorkflow(isPending, isError, isSuccess);

  const handleRetry = () => {
    if (currentResearchTicker) {
      startResearch(currentResearchTicker);
    }
  };

  // Entrance orchestration using spring staggered fades
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("w-full max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8", className)}
    >
      <WorkspaceLayout
        header={!isReadingMode ? (
          <motion.div variants={itemVariants}>
            <WorkspaceHeader />
          </motion.div>
        ) : null}
        searchArea={!isReadingMode ? (
          <motion.div variants={itemVariants}>
            <CommandSearch onAnalyze={startResearch} isPending={isPending} />
          </motion.div>
        ) : null}
        report={
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
          >
            {/* Left Column: AI Pipeline Orchestration visual list (Width: 4/12) */}
            <div className={cn("lg:col-span-4 w-full", isReadingMode && "hidden")}>
              <AgentWorkflow stages={stages} />
            </div>

            {/* Right Column: AI Research Report viewer panel output (Width: 8/12 or 12/12) */}
            <div className={cn("w-full flex flex-col h-full", isReadingMode ? "lg:col-span-12" : "lg:col-span-8")}>
              <ReportPanel 
                reportData={currentResearchData} 
                status={researchStatus} 
                stages={stages} 
                error={researchError}
                onRetry={handleRetry}
              />
            </div>
          </motion.div>
        }
      />
    </motion.div>
  );
}

ResearchWorkspace.displayName = "ResearchWorkspace";
export default ResearchWorkspace;
