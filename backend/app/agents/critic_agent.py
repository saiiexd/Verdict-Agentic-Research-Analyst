from app.agents.base_agent import BaseAgent
from app.llm.base import AbstractLLMProvider
from app.prompts.critic_prompt import CRITIC_PROMPT
from app.schemas.critic import CriticReport
from app.core.logger import logger


class CriticAgent(BaseAgent):

    def __init__(self, provider: AbstractLLMProvider):
        if provider is None:
            raise RuntimeError("No LLM provider available")

        self.provider = provider

    def analyze(self, report):
        logger.info("CriticAgent starting report critique.")

        prompt = CRITIC_PROMPT.format(
            report=report.model_dump_json(indent=2)
        )

        critique = self.provider.invoke_structured(prompt, CriticReport)

        logger.info("CriticAgent completed report critique.")
        return critique