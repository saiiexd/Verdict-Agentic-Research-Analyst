import React from "react";
import { GlassPanel } from "../ui/glass-panel";
import { Search } from "lucide-react";

export function EmptyReport() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center p-8">
      <GlassPanel className="flex max-w-md flex-col items-center justify-center p-10 text-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-md">
          <Search className="h-10 w-10 text-white/40" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight text-white/90">No Research Report</h3>
          <p className="text-sm text-white/50 leading-relaxed">
            Use the command palette (Cmd+K) or the search bar to generate a comprehensive AI-driven research report for any publicly traded company.
          </p>
        </div>
      </GlassPanel>
    </div>
  );
}
