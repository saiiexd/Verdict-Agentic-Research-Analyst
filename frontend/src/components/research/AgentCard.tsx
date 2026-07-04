"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Globe, 
  Cpu, 
  FileText, 
  ShieldAlert, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AgentStatus = "Waiting" | "Running" | "Completed" | "Failed" | "Retrying";

export interface AgentCardProps {
  id: string;
  name: string;
  iconName: string;
  status: AgentStatus;
  description?: string;
  executionTime?: string;
  confidence?: number;
  timestamp?: number;
  metadata?: Record<string, unknown>;
  className?: string;
}

// Map string keys to Lucide icon components for robust runtime lookup
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  Globe,
  Cpu,
  FileText,
  ShieldAlert,
  Zap,
};

// Accents mapping strictly based on agent identity
const accentMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  "financial-agent": {
    bg: "bg-blue-500/5",
    border: "border-blue-500/10 group-hover:border-blue-500/30",
    text: "text-blue-500",
    icon: "text-blue-500",
  },
  "news-agent": {
    bg: "bg-purple-500/5",
    border: "border-purple-500/10 group-hover:border-purple-500/30",
    text: "text-purple-500",
    icon: "text-purple-500",
  },
  "research-node": {
    bg: "bg-cyan-500/5",
    border: "border-cyan-500/10 group-hover:border-cyan-500/30",
    text: "text-cyan-500",
    icon: "text-cyan-500",
  },
  "writer-agent": {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/10 group-hover:border-emerald-500/30",
    text: "text-emerald-500",
    icon: "text-emerald-500",
  },
  "critic-agent": {
    bg: "bg-amber-500/5",
    border: "border-amber-500/10 group-hover:border-amber-500/30",
    text: "text-amber-500",
    icon: "text-amber-500",
  },
  "refiner-agent": {
    bg: "bg-rose-500/5",
    border: "border-rose-500/10 group-hover:border-rose-500/30",
    text: "text-rose-500",
    icon: "text-rose-500",
  },
};

/**
 * AgentCard represents a single, presentation-only card detailing an AI agent.
 * Handles styling lifecycles (Waiting, Running, Completed, Failed, Retrying) and 
 * responsive layouts using defined design tokens.
 */
export function AgentCard({
  id,
  name,
  iconName,
  status,
  description,
  executionTime,
  confidence,
  className,
}: AgentCardProps) {
  // Resolve core details or fallback to neutrals
  const IconComponent = iconMap[iconName] || HelpCircle;
  const accent = accentMap[id] || {
    bg: "bg-slate-500/5",
    border: "border-slate-500/10 group-hover:border-slate-500/30",
    text: "text-slate-500",
    icon: "text-slate-500",
  };

  // Helper rendering corresponding status layout configurations
  const renderStatus = () => {
    switch (status) {
      case "Running":
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[rgb(var(--accent-primary))]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Analyzing</span>
          </div>
        );
      case "Completed":
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Completed</span>
          </div>
        );
      case "Failed":
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
            <XCircle className="h-3.5 w-3.5" />
            <span>Failed</span>
          </div>
        );
      case "Retrying":
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Retrying</span>
          </div>
        );
      case "Waiting":
      default:
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[rgb(var(--text-tertiary))]">
            <Clock className="h-3.5 w-3.5" />
            <span>Waiting</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-300",
        "bg-[rgb(var(--bg-surface))] border-[rgb(var(--border-default))] hover:border-[rgb(var(--text-tertiary))] hover:shadow-sm",
        status === "Running" && "border-[rgb(var(--accent-primary))] shadow-[0_0_0_2px_rgba(var(--accent-primary),0.05)]",
        className
      )}
    >
      <div className="flex items-start gap-4 flex-1">
        {/* Agent Decorative Accent Circle & Icon */}
        <div className={cn(
          "h-11 w-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
          accent.bg
        )}>
          <IconComponent className={cn("h-5 w-5", accent.icon)} />
        </div>

        {/* Info Grid */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-semibold text-subtitle text-[rgb(var(--text-primary))]">
              {name}
            </h3>
            {/* Display metadata indicators like confidence if available */}
            {confidence !== undefined && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text-secondary))]">
                {(confidence * 100).toFixed(0)}% Match
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Lifecycle Status & Metrics panel */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-[rgb(var(--border-default))] flex-shrink-0">
        {executionTime && (
          <span className="text-xs font-mono text-[rgb(var(--text-tertiary))] flex items-center gap-1">
            <Clock className="h-3 w-3" /> {executionTime}
          </span>
        )}
        
        {renderStatus()}
      </div>
    </motion.div>
  );
}

AgentCard.displayName = "AgentCard";
