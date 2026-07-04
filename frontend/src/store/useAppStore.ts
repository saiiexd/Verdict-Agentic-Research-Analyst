import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResearchResponse } from "@/lib/types";
import type { AppError } from "@/lib/errors";

export interface HistoryItem {
  id: string;
  ticker: string;
  timestamp: number;
  data: ResearchResponse;
}

interface AppState {
  // Global App State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // History State
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;

  // Settings
  animationsEnabled: boolean;
  toggleAnimations: () => void;

  // Research Execution State
  researchStatus: "Idle" | "Submitting" | "Running" | "Completed" | "Failed";
  currentResearchTicker: string | null;
  currentResearchData: ResearchResponse | null;
  researchError: AppError | null;
  setResearchStatus: (status: "Idle" | "Submitting" | "Running" | "Completed" | "Failed") => void;
  setResearchTicker: (ticker: string | null) => void;
  setResearchData: (data: ResearchResponse | null) => void;
  setResearchError: (error: AppError | null) => void;
  resetResearch: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      history: [],
      addHistory: (item) => set((state) => ({ 
        history: [item, ...state.history.filter(h => h.ticker !== item.ticker)] 
      })),
      removeHistory: (id) => set((state) => ({ 
        history: state.history.filter((h) => h.id !== id) 
      })),
      clearHistory: () => set({ history: [] }),

      animationsEnabled: true,
      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),

      researchStatus: "Idle",
      currentResearchTicker: null,
      currentResearchData: null,
      researchError: null,
      setResearchStatus: (status) => set({ researchStatus: status }),
      setResearchTicker: (ticker) => set({ currentResearchTicker: ticker }),
      setResearchData: (data) => set({ currentResearchData: data }),
      setResearchError: (error) => set({ researchError: error }),
      resetResearch: () => set({
        researchStatus: "Idle",
        currentResearchTicker: null,
        currentResearchData: null,
        researchError: null,
      }),
    }),
    {
      name: "verdict-app-storage",
      partialize: (state) => ({ 
        history: state.history, 
        animationsEnabled: state.animationsEnabled 
      }), // only persist history and settings
    }
  )
);
