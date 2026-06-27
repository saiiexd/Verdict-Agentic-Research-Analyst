from app.agents.base_agent import BaseAgent
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool
from app.schemas.news import NewsArticle


class NewsAgent(BaseAgent):
    """
    Collects news from multiple providers and returns
    a cleaned, ranked list of articles.
    """

    def __init__(self):
        self.google_tool = GoogleNewsTool()
        self.tavily_tool = TavilyTool()

    def analyze(self, query: str) -> list[NewsArticle]:

        google_news = self.google_tool.search(query)

        tavily_news = self.tavily_tool.search(query)

        merged_news = google_news + tavily_news

        cleaned_news = self.remove_duplicates(merged_news)

        ranked_news = self.rank_news(cleaned_news)

        return ranked_news

    def remove_duplicates(
        self,
        articles: list[NewsArticle]
    ) -> list[NewsArticle]:

        unique_articles = {}

        for article in articles:

            key = article.title.lower().strip()

            if key not in unique_articles:
                unique_articles[key] = article

        return list(unique_articles.values())

    def rank_news(
        self,
        articles: list[NewsArticle]
    ) -> list[NewsArticle]:

        return sorted(
            articles,
            key=lambda article: (
                article.relevance_score
                if article.relevance_score is not None
                else 0
            ),
            reverse=True,
        )