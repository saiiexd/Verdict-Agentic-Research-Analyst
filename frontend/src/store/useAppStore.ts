import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResearchResponse } from "@/lib/types";

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
