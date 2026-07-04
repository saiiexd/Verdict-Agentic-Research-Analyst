"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AgentCard } from "./AgentCard";

// Centralized type declarations for workflow integration
export type WorkflowStatus = "Waiting" | "Running" | "Completed" | "Failed" | "Retrying";

export interface WorkflowAgent {
  id: string;
  name: string;
  iconName: string;
  status: WorkflowStatus;
  description: string;
  executionTime?: string;
}

interface AgentWorkflowProps {
  /**
   * Optional custom classes to apply to the main workflow section wrapper.
   */
  className?: string;
  /**
   * Dynamic execution status from the LangGraph workflow visualizer.
   */
  stages?: Record<string, "idle" | "running" | "completed" | "failed" | "skipped">;
}

/**
 * AgentWorkflow represents the orchestrated pipeline of the multi-agent system.
 * Renders the exact sequential order of executing nodes in a clean, vertical layout.
 */
export function AgentWorkflow({ className, stages }: AgentWorkflowProps) {
  // Helper to map visualizer stage status to AgentCard status format
  const getAgentStatus = (agentId: string): WorkflowStatus => {
    if (!stages) return "Waiting";
    
    let stageKey = "idle";
    if (agentId === "financial-agent") stageKey = stages.financial;
    else if (agentId === "news-agent") stageKey = stages.news;
    else if (agentId === "research-node") {
      // Research Node executes after news, before writing starts
      stageKey = stages.news === "completed" && stages.writer === "idle" ? "running" : (stages.writer !== "idle" ? "completed" : "idle");
    }
    else if (agentId === "writer-agent") stageKey = stages.writer;
    else if (agentId === "critic-agent") stageKey = stages.critic;
    else if (agentId === "refiner-agent") stageKey = stages.refiner;

    switch (stageKey) {
      case "running":
        return "Running";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "idle":
      default:
        return "Waiting";
    }
  };

  // Local placeholder state mapping the exact backend LangGraph structure.
  const agents: WorkflowAgent[] = [
    {
      id: "financial-agent",
      name: "Financial Agent",
      iconName: "BarChart3",
      status: getAgentStatus("financial-agent"),
      description: "Fetches live market metrics, key ratios, and historical SEC filings.",
    },
    {
      id: "news-agent",
      name: "News Agent",
      iconName: "Globe",
      status: getAgentStatus("news-agent"),
      description: "Aggregates and sentiment-scores global financial news articles.",
    },
    {
      id: "research-node",
      name: "Research Node",
      iconName: "Cpu",
      status: getAgentStatus("research-node"),
      description: "Coordinates context synthesis and prepares research payloads.",
    },
    {
      id: "writer-agent",
      name: "Writer Agent",
      iconName: "FileText",
      status: getAgentStatus("writer-agent"),
      description: "Synthesizes gathered analyst intelligence into a structured draft.",
    },
    {
      id: "critic-agent",
      name: "Critic Agent",
      iconName: "ShieldAlert",
      status: getAgentStatus("critic-agent"),
      description: "Evaluates reports for bias, consistency gaps, and hallucination risks.",
    },
    {
      id: "refiner-agent",
      name: "Refiner Agent",
      iconName: "Zap",
      status: getAgentStatus("refiner-agent"),
      description: "Integrates critical feedback to assemble the final investment verdict.",
    },
  ];

  // Framer Motion configuration matching luxury minimal aesthetics
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className={className} aria-labelledby="workflow-title">
      <div className="mb-6">
        <h2 
          id="workflow-title"
          className="text-subtitle font-bold tracking-tight text-[rgb(var(--text-primary))] uppercase mb-1"
        >
          AI Research Workflow
        </h2>
        <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed max-w-xl">
          Verdict orchestrates a team of specialized neural agents cooperating in real-time to analyze market data before generating your report.
        </p>
      </div>

      {/* Render the staggered agent list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 relative pl-4 md:pl-6 border-l border-[rgb(var(--border-default))]"
      >
        {agents.map((agent) => (
          <motion.div key={agent.id} variants={itemVariants}>
            <AgentCard
              id={agent.id}
              name={agent.name}
              iconName={agent.iconName}
              status={agent.status}
              description={agent.description}
              executionTime={agent.executionTime}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

AgentWorkflow.displayName = "AgentWorkflow";
