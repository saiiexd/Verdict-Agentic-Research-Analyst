from app.agents.base_agent import BaseAgent
from app.graph.state import ResearchState
from app.llm.prompts import WRITER_PROMPT
from app.llm.provider import LLMProvider
from app.utils.formatter import (
    format_financial_data,
    format_news,
)


class WriterAgent(BaseAgent):

    def __init__(self):
        self.llm = LLMProvider().get_llm()

    def analyze(self, state: ResearchState):

        fd = state.get("financial_data")
        if fd is None:
            financial_text = ""
        else:
            financial_text = format_financial_data(fd)

        news = state.get("news")
        if news is None:
            news_text = ""
        else:
            news_text = format_news(news)

        prompt = WRITER_PROMPT.format(
            ticker=state["ticker"],
            financial_data=financial_text,
            news=news_text,
        )

        response = self.llm.invoke(prompt)

        return response.content