from app.agents.base_agent import BaseAgent
from app.llm.base import AbstractLLMProvider
from app.prompts.refiner_prompt import REFINER_PROMPT
from app.schemas.report import ResearchReport
from app.core.logger import logger


class RefinerAgent(BaseAgent):

    def __init__(self, provider: AbstractLLMProvider):
        if provider is None:
            raise RuntimeError("No LLM provider available")

        self.provider = provider

    def analyze(self, report, feedback):
        logger.info("RefinerAgent starting report refinement.")

        prompt = REFINER_PROMPT.format(
            report=report.model_dump_json(indent=2),
            feedback=feedback.model_dump_json(indent=2),
        )

        response = self.provider.invoke_structured(prompt, ResearchReport)

        logger.info("RefinerAgent completed report refinement.")
        return response