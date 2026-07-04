"use client";

import * as React from "react";
import { ResearchWorkspace } from "@/components/research/ResearchWorkspace";

/**
 * Root workspace route.
 * Redirects the main application entry point to render the premium, composed ResearchWorkspace.
 */
export default function WorkspacePage() {
  return <ResearchWorkspace />;
}
