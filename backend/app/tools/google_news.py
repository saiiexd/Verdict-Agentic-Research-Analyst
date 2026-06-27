from urllib.request import urlopen
from xml.etree import ElementTree as ET

from app.schemas.news import NewsArticle
from app.llm.retry import with_retry
from app.core.logger import logger


class GoogleNewsTool:
    """
    Fetches the latest news from Google News RSS.
    """

    BASE_URL = "https://news.google.com/rss/search?q={}"

    @with_retry(max_attempts=3, exceptions=(Exception,))
    def search(self, query: str):
        logger.info(f"Fetching Google News for query: {query}")
        try:
            with urlopen(self.BASE_URL.format(query)) as response:
                xml_data = response.read()
        except Exception:
            return []

        try:
            root = ET.fromstring(xml_data)
        except ET.ParseError:
            return []

        articles = []
        for entry in root.findall("./channel/item")[:10]:
            articles.append(
                NewsArticle(
                    title=entry.findtext("title", default=""),
                    url=entry.findtext("link", default=""),
                    source=None,
                    published_at=entry.findtext("pubDate"),
                    summary=None,
                    provider="google_rss",
                    relevance_score=None,
                )
            )

        return articles