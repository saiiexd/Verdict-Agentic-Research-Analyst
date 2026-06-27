from importlib import import_module

from app.config.settings import settings
from app.schemas.news import NewsArticle
from app.llm.retry import with_retry
from app.core.logger import logger


class TavilyTool:
    """
    Fetches news articles from Tavily Search.
    """

    def __init__(self):
        try:
            tavily_module = import_module("tavily")
            client_cls = getattr(tavily_module, "TavilyClient", None)
        except Exception:
            client_cls = None

        if client_cls is None:
            self.client = None
            return

        self.client = client_cls(
            api_key=settings.TAVILY_API_KEY or None
        )

    @with_retry(max_attempts=3, exceptions=(Exception,))
    def search(self, query: str):
        if self.client is None:
            logger.warning("TavilyClient is not initialized. Skipping search.")
            return []

        logger.info(f"Fetching Tavily news for query: {query}")
        response = self.client.search(
            query=query,
            topic="news",
            max_results=5,
        )

        articles = []

        for item in response["results"]:

            articles.append(
                NewsArticle(
                    title=item.get("title", ""),
                    url=item.get("url", ""),
                    source=item.get("source"),
                    summary=item.get("content"),
                    published_at=None,
                    provider="tavily",
                    relevance_score=item.get("score"),
                )
            )

        return articles