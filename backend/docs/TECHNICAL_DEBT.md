# Technical Debt

1. **Test Coverage**: While unit tests cover the logic and error paths, end-to-end testing with VCR.py or similar network mocking would ensure the actual prompt integrations do not drift as the LLM models are updated.
2. **Pydantic V1 vs V2**: LangChain is heavily transitioning to Pydantic V2. Ensure that as LangChain updates, the `with_structured_output` integrations remain compatible with our `schemas` package.
3. **News Deduplication**: The duplicate removal in `NewsAgent` is extremely simple (lowercased exact title match). In the future, vector embedding or semantic similarity should be used to deduplicate highly similar articles from Google and Tavily.
4. **Caching**: We repeatedly ping Yahoo Finance and Google News for the same tickers if requests come in rapidly. Implementing a Redis or simple memory cache at the Tool or Node layer would significantly improve response times and prevent rate limiting.
