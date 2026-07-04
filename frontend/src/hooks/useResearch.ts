import { useMutation } from "@tanstack/react-query";
import { researchService } from "@/services/researchService";
import { useAppStore } from "@/store/useAppStore";
import { ResearchError, normalizeError } from "@/lib/errors";
import type { ResearchResponse } from "@/lib/types";

/**
 * useResearch custom hook manages asynchronous mutation statuses for starting company analysis.
 * Acts as the bridge between TanStack Query cache logic and presentation layouts.
 */
export function useResearch() {
  const setResearchStatus = useAppStore((state) => state.setResearchStatus);
  const setResearchTicker = useAppStore((state) => state.setResearchTicker);
  const setResearchData = useAppStore((state) => state.setResearchData);
  const setResearchError = useAppStore((state) => state.setResearchError);
  const addHistory = useAppStore((state) => state.addHistory);

  const mutation = useMutation<ResearchResponse, Error, string>({
    mutationFn: (ticker: string) => researchService.startResearch(ticker),
    onMutate: (ticker) => {
      setResearchStatus("Submitting");
      setResearchTicker(ticker);
      setResearchError(null);

      // Transition to Running state after a short simulated handoff latency
      setTimeout(() => {
        const currentStatus = useAppStore.getState().researchStatus;
        if (currentStatus === "Submitting") {
          setResearchStatus("Running");
        }
      }, 1500);
    },
    onSuccess: (data, ticker) => {
      setResearchStatus("Completed");
      setResearchData(data);

      const historyItem = {
        id: crypto.randomUUID(),
        ticker: ticker.toUpperCase(),
        timestamp: Date.now(),
        data,
      };
      addHistory(historyItem);

      if (process.env.NODE_ENV === "development") {
        console.log(`[useResearch] Successfully completed report generation for: ${ticker}`, data);
      }
    },
    onError: (error, ticker) => {
      setResearchStatus("Failed");
      
      const appErr = error instanceof ResearchError ? error : normalizeError(error);
      setResearchError(appErr);

      if (process.env.NODE_ENV === "development") {
        console.error(`[useResearch] Failed report generation for: ${ticker}`, error);
      }
    },
  });

  return {
    startResearch: mutation.mutate,
    startResearchAsync: mutation.mutateAsync,
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
}
