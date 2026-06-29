import time
from app.services.research_service import ResearchService

def run_verification():
    tickers = ["INVALID_TICKER", "NVDA", "AAPL", "MSFT", "TSLA", "GOOGL"]
    service = ResearchService()
    
    for ticker in tickers:
        print(f"\n{'='*50}")
        print(f"Starting verification for: {ticker}")
        start_time = time.time()
        
        try:
            result = service.start_research(ticker)
            elapsed = time.time() - start_time
            print(f"[{ticker}] Execution Time: {elapsed:.2f}s")
            print(f"[{ticker}] Output Keys: {list(result.keys())}")
            
            if result.get("financial_data"):
                print(f"[{ticker}] Financial Data: Present")
            else:
                print(f"[{ticker}] Financial Data: Missing")
                
            if result.get("news"):
                print(f"[{ticker}] News Articles: {len(result['news'])}")
            else:
                print(f"[{ticker}] News Articles: 0")
                
            if result.get("final_report"):
                print(f"[{ticker}] Final Report length: {len(result['final_report'].model_dump_json())}")
            else:
                print(f"[{ticker}] Final Report: Missing")
                
        except Exception as e:
            elapsed = time.time() - start_time
            print(f"[{ticker}] Exception after {elapsed:.2f}s: {type(e).__name__} - {str(e)}")

if __name__ == "__main__":
    run_verification()
