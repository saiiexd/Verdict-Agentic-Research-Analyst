from urllib.request import urlopen
from xml.etree import ElementTree as ET

from app.schemas.news import NewsArticle


class GoogleNewsTool:
    """
    Fetches the latest news from Google News RSS.
    """

    BASE_URL = "https://news.google.com/rss/search?q={}"

    def search(self, query: str):
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