from app.schemas.financial import FinancialData
from app.schemas.news import NewsArticle


def format_financial_data(data: FinancialData) -> str:

    if data is None:
        return "Financial data unavailable."

    return f"""
Ticker: {data.ticker}

Current Price: {data.current_price}

Market Cap: {data.market_cap}

PE Ratio: {data.pe_ratio}

52 Week High: {getattr(data, 'high_52_week', 'N/A')}

52 Week Low: {getattr(data, 'low_52_week', 'N/A')}
"""


def format_news(news: list[NewsArticle]) -> str:

    if not news:
        return "No news available."

    output = []

    for index, article in enumerate(news, start=1):

        output.append(
            f"""
Article {index}

Title: {article.title}

Summary: {article.summary}

Source: {article.source}

URL: {article.url}
"""
        )

    return "\n".join(output)