import * as React from "react";
import { cn } from "@/lib/utils";

interface WorkspaceLayoutProps {
  /**
   * The top-level header area of the workspace (e.g. title, navigation context, or status indicator).
   */
  header?: React.ReactNode;
  /**
   * The central interaction space hosting the command search bar / ticker input.
   */
  searchArea?: React.ReactNode;
  /**
   * Section visualizing the active AI agents and their collaborative workflow.
   */
  workflow?: React.ReactNode;
  /**
   * The main output section where generated reports, data summaries, and analysis are displayed.
   * This section will flex-grow to occupy the remaining vertical space.
   */
  report?: React.ReactNode;
  /**
   * Optional custom classes to apply to the root layout container.
   */
  className?: string;
}

/**
 * WorkspaceLayout provides the structural blueprint for the Verdict AI research workspace.
 * It establishes the vertical hierarchy, centered constraints, responsive padding, and spacing
 * tokens, ensuring standard behavior across all layout sizes without managing business logic.
 */
export function WorkspaceLayout({
  header,
  searchArea,
  workflow,
  report,
  className,
}: WorkspaceLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full min-h-[calc(100vh-theme(spacing.14))] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 gap-8 md:gap-12",
        className
      )}
    >
      {/* 1. Workspace Header Section */}
      {header && (
        <div className="w-full flex-shrink-0 transition-all duration-300">
          {header}
        </div>
      )}

      {/* 2. Command Search Area Section */}
      {searchArea && (
        <div className="w-full flex-shrink-0 flex justify-center transition-all duration-300">
          <div className="w-full max-w-3xl">
            {searchArea}
          </div>
        </div>
      )}

      {/* 3. AI Workflow Section */}
      {workflow && (
        <div className="w-full flex-shrink-0 transition-all duration-300">
          {workflow}
        </div>
      )}

      {/* 4. Report Section (automatically expands to consume remaining space) */}
      {report && (
        <div className="w-full flex-grow flex flex-col min-h-0 transition-all duration-300">
          {report}
        </div>
      )}
    </div>
  );
}

WorkspaceLayout.displayName = "WorkspaceLayout";
