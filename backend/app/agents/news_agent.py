from app.agents.base_agent import BaseAgent
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool
from app.schemas.news import NewsArticle
from app.core.logger import logger

class NewsAgent(BaseAgent):
    """
    Collects news from multiple providers and returns
    a cleaned, ranked list of articles.
    """

    def __init__(self, google_tool: GoogleNewsTool, tavily_tool: TavilyTool):
        self.google_tool = google_tool
        self.tavily_tool = tavily_tool

    def analyze(self, query: str) -> list[NewsArticle]:
        logger.info(f"NewsAgent starting analysis for: {query}")

        google_news = self.google_tool.search(query)
        tavily_news = self.tavily_tool.search(query)

        merged_news = google_news + tavily_news

        cleaned_news = self.remove_duplicates(merged_news)
        
        # Classify sentiment of articles
        for article in cleaned_news:
            article.sentiment = self.determine_sentiment(article.title)

        ranked_news = self.rank_news(cleaned_news)

        logger.info(f"NewsAgent completed analysis for: {query}. Total articles: {len(ranked_news)}")
        return ranked_news

    def determine_sentiment(self, title: str) -> str:
        title_lower = title.lower()
        bullish_words = ["soar", "gain", "buy", "up", "bullish", "positive", "growth", "beat", "surge", "higher", "rise", "expand", "profit", "record", "alliance", "partnership", "success", "innovate", "launch"]
        bearish_words = ["fall", "drop", "down", "bearish", "negative", "loss", "lower", "decline", "warn", "miss", "risk", "investigate", "lawsuit", "control", "curb", "probe", "challenge", "threat", "concern"]
        
        bullish_score = sum(1 for word in bullish_words if word in title_lower)
        bearish_score = sum(1 for word in bearish_words if word in title_lower)
        
        if bullish_score > bearish_score:
            return "Bullish"
        elif bearish_score > bullish_score:
            return "Bearish"
        return "Neutral"

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