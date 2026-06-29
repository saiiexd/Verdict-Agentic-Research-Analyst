from typing import Any
from app.schemas.report import ResearchReport
from app.agents.base_agent import BaseAgent
from app.graph.state import ResearchState
from app.llm.prompts import WRITER_PROMPT
from app.llm.base import AbstractLLMProvider

from app.utils.formatter import (
    format_financial_data,
    format_news,
)
from app.core.logger import logger


class WriterAgent(BaseAgent):

    def __init__(self, llm_provider: AbstractLLMProvider):
        self.llm = llm_provider.get_llm()
        # create a structured LLM wrapper for producing ResearchReport outputs
        self.structured_llm = self.llm.with_structured_output(ResearchReport)

    def analyze(self, state: ResearchState):
        logger.info(f"WriterAgent starting report generation for: {state['ticker']}")

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

        report = self.structured_llm.invoke(prompt)

        return report