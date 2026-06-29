import pytest
from unittest.mock import patch, MagicMock
from app.tools.tavily_search import TavilyTool

@patch("app.tools.tavily_search.import_module")
def test_tavily_search_success(mock_import):
    mock_tavily_client = MagicMock()
    mock_instance = MagicMock()
    mock_tavily_client.return_value = mock_instance
    
    mock_module = MagicMock()
    mock_module.TavilyClient = mock_tavily_client
    mock_import.return_value = mock_module

    tool = TavilyTool()
    
    mock_instance.search.return_value = {
        "results": [
            {
                "title": "NVIDIA stock up",
                "url": "http://example.com/nvidia",
                "source": "TechNews",
                "content": "NVIDIA is up today.",
                "score": 0.95
            }
        ]
    }
    
    articles = tool.search("NVIDIA")
    
    assert len(articles) == 1
    assert articles[0].title == "NVIDIA stock up"
    assert articles[0].provider == "tavily"