# Verdict Backend API Documentation

This document describes the API endpoints exposed by the Verdict FastAPI backend service.

## Base URL
When running locally: `http://localhost:8000`

---

## Endpoints

### 1. API Status (Root)
* **Method:** `GET`
* **Path:** `/`
* **Description:** Quick health check to verify that the FastAPI backend server is active and responding.
* **Success Response (200 OK):**
  ```json
  {
    "message": "Verdict Backend Running"
  }
  ```

---

### 2. Run Equity Research
* **Method:** `POST`
* **Path:** `/research`
* **Description:** Initiates the stateful multi-agent LangGraph pipeline to scrape financials, extract headlines, analyze data, and return a validated equity report.
* **Request Header:** `Content-Type: application/json`
* **Request Payload (`ResearchRequest`):**
  ```json
  {
    "ticker": "AAPL"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Research completed successfully.",
    "data": {
      "ticker": "AAPL",
      "financial_data": {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "current_price": 224.23,
        "pe_ratio": 33.62,
        "gross_margin": 0.4621,
        "roe": 1.5325,
        "beta": 1.25,
        "dividend_yield": 0.0045
      },
      "news": [
        {
          "title": "Why Apple Stock Is Trading Up Today",
          "url": "https://news.google.com/...",
          "sentiment": "Bullish"
        }
      ],
      "draft_report": {
        "company_overview": "...",
        "financial_analysis": "...",
        "recent_news_summary": "...",
        "opportunities": "...",
        "risks": "...",
        "investment_outlook": "..."
      },
      "critic_report": {
        "overall_score": 8,
        "strengths": ["..."],
        "weaknesses": ["..."],
        "hallucination_risk": "...",
        "recommendation": "..."
      },
      "final_report": {
        "company_overview": "...",
        "financial_analysis": "...",
        "recent_news_summary": "...",
        "opportunities": "...",
        "risks": "...",
        "investment_outlook": "..."
      },
      "metadata": {
        "duration": 9.36,
        "agent_count": 5,
        "status": "success",
        "model_info": "GEMINI (gemini-2.5-flash)"
      }
    }
  }
  ```
* **Error Responses:**
  * **404 Not Found (Invalid Ticker):**
    ```json
    {
      "detail": "Ticker AAPLXXXX is invalid or could not be found."
    }
    ```
  * **500 Internal Server Error:**
    ```json
    {
      "detail": "An internal server error occurred during research."
    }
    ```
