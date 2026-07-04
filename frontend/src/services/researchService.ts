import { apiClient } from "@/lib/api";
import type { ResearchResponse } from "@/lib/types";
import { normalizeError } from "@/lib/errors";

// Development logger helper
const logApi = (message: string, data?: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Log] ${message}`, data || "");
  }
};

/**
 * ResearchService acts as the isolated API layer for starting and retrieving stock analysis.
 * Separates direct HTTP payload management and timeout rules from React components.
 */
export const researchService = {
  /**
   * Dispatches a post request to initiate research on the backend.
   * Standardizes error objects before returning execution results.
   */
  async startResearch(ticker: string): Promise<ResearchResponse> {
    logApi(`Dispatching research task for ticker: ${ticker}`);

    try {
      const response = await apiClient.post<{ success: boolean; message: string; data: ResearchResponse }>(
        "/research",
        { ticker: ticker.toUpperCase() }
      );

      logApi(`Research response payload received for: ${ticker}`, response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to complete research execution.");
      }

      return response.data.data;
    } catch (error: unknown) {
      logApi(`Research execution error encountered for: ${ticker}`, error);
      throw normalizeError(error);
    }
  },
};
