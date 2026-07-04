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
  pinnedTickers: string[];
  addHistory: (item: HistoryItem) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
  togglePinTicker: (ticker: string) => void;

  // Watchlist & Personalization State
  watchlist: string[];
  addToWatchlist: (ticker: string) => void;
  removeFromWatchlist: (ticker: string) => void;
  notifications: Array<{ id: string; title: string; read: boolean; timestamp: number }>;
  addNotification: (title: string) => void;
  markAllNotificationsRead: () => void;
  dashboardLayout: string[];
  setDashboardLayout: (layout: string[]) => void;
  layoutDensity: "compact" | "comfortable";
  setLayoutDensity: (density: "compact" | "comfortable") => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  // Settings
  animationsEnabled: boolean;
  toggleAnimations: () => void;

  // Research Execution State
  researchStatus: "Idle" | "Submitting" | "Running" | "Completed" | "Failed";
  currentResearchTicker: string | null;
  currentResearchData: ResearchResponse | null;
  researchError: AppError | null;
  isReadingMode: boolean;
  toggleReadingMode: () => void;
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
      pinnedTickers: [],
      watchlist: ["AAPL", "MSFT", "NVDA"], // Prepopulate standard watchlists
      notifications: [
        { id: "1", title: "Verdict Pipeline initialized successfully.", read: false, timestamp: Date.now() - 3600000 }
      ],
      dashboardLayout: ["overview", "watchlist", "recents", "insights", "collections"],
      layoutDensity: "comfortable",
      commandPaletteOpen: false,

      addHistory: (item) => set((state) => ({ 
        history: [item, ...state.history.filter(h => h.ticker !== item.ticker)] 
      })),
      removeHistory: (id) => set((state) => ({ 
        history: state.history.filter((h) => h.id !== id) 
      })),
      clearHistory: () => set({ history: [] }),
      togglePinTicker: (ticker) => set((state) => {
        const isPinned = state.pinnedTickers.includes(ticker);
        return {
          pinnedTickers: isPinned 
            ? state.pinnedTickers.filter(t => t !== ticker) 
            : [...state.pinnedTickers, ticker]
        };
      }),

      addToWatchlist: (ticker) => set((state) => ({
        watchlist: state.watchlist.includes(ticker.toUpperCase()) 
          ? state.watchlist 
          : [...state.watchlist, ticker.toUpperCase()]
      })),
      removeFromWatchlist: (ticker) => set((state) => ({
        watchlist: state.watchlist.filter(t => t !== ticker.toUpperCase())
      })),
      addNotification: (title) => set((state) => ({
        notifications: [
          { id: crypto.randomUUID(), title, read: false, timestamp: Date.now() },
          ...state.notifications
        ]
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      setDashboardLayout: (layout) => set({ dashboardLayout: layout }),
      setLayoutDensity: (density) => set({ layoutDensity: density }),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

      animationsEnabled: true,
      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),

      researchStatus: "Idle",
      currentResearchTicker: null,
      currentResearchData: null,
      researchError: null,
      isReadingMode: false,
      toggleReadingMode: () => set((state) => ({ isReadingMode: !state.isReadingMode })),
      setResearchStatus: (status) => set({ researchStatus: status }),
      setResearchTicker: (ticker) => set({ currentResearchTicker: ticker }),
      setResearchData: (data) => set({ currentResearchData: data }),
      setResearchError: (error) => set({ researchError: error }),
      resetResearch: () => set({
        researchStatus: "Idle",
        currentResearchTicker: null,
        currentResearchData: null,
        researchError: null,
        isReadingMode: false,
      }),
    }),
    {
      name: "verdict-app-storage",
      partialize: (state) => ({ 
        history: state.history, 
        pinnedTickers: state.pinnedTickers,
        watchlist: state.watchlist,
        dashboardLayout: state.dashboardLayout,
        layoutDensity: state.layoutDensity,
        animationsEnabled: state.animationsEnabled 
      }), // only persist history, settings, watchlist and personalization layout
    }
  )
);
