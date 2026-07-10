from unittest.mock import patch, MagicMock
from app.tools.google_news import GoogleNewsTool

@patch("app.tools.google_news.urlopen")
def test_google_news_search_success(mock_urlopen):
    mock_response = MagicMock()
    mock_response.read.return_value = b'''<?xml version="1.0" encoding="UTF-8"?>
    <rss><channel>
        <item>
            <title>Apple News</title>
            <link>http://example.com/apple</link>
            <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
        </item>
    </channel></rss>'''
    
    mock_context_manager = MagicMock()
    mock_context_manager.__enter__.return_value = mock_response
    mock_urlopen.return_value = mock_context_manager
    
    tool = GoogleNewsTool()
    articles = tool.search("Apple")
    
    assert len(articles) == 1
    assert articles[0].title == "Apple News"
    assert articles[0].provider == "google_rss"