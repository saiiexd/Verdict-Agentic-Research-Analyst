import axios from "axios";
import type { ResearchResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 180000, // 3 min — matches LangGraph workflow time
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── API Functions ──────────────────────────────────────
export async function runResearch(ticker: string): Promise<ResearchResponse> {
  const response = await apiClient.post<{ success: boolean; message: string; data: ResearchResponse }>("/research", {
    ticker: ticker.toUpperCase(),
  });
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function healthCheck(): Promise<{ status: string }> {
  const response = await apiClient.get("/");
  return response.data;
}
