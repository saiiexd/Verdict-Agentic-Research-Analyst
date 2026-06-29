from app.services.research_service import ResearchService

def run_tests():
    service = ResearchService()
    tickers = ["AAPL", "NVDA", "MSFT", "TSLA", "GOOGL", "INVALID_TICKER"]
    
    for ticker in tickers:
        print(f"\n{'='*50}\nTesting Ticker: {ticker}\n{'='*50}")
        try:
            result = service.start_research(ticker)
            print(f"Success for {ticker}!")
            print(f"Financial Data Keys: {result['financial_data'].keys() if result.get('financial_data') else 'None'}")
            print(f"News Count: {len(result['news']) if result.get('news') else 0}")
            print(f"Draft Report Snippet: {result['draft_report'][:100] if result.get('draft_report') else 'None'}...")
            print(f"Critic Report Snippet: {result['critic_report'][:100] if result.get('critic_report') else 'None'}...")
            print(f"Final Report Snippet: {result['final_report'][:100] if result.get('final_report') else 'None'}...")
        except Exception as e:
            print(f"FAILED for {ticker}: {str(e)}")

if __name__ == "__main__":
    run_tests()
