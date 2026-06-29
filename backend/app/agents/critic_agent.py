from app.agents.base_agent import BaseAgent
from app.llm.factory import LLMFactory
from app.prompts.critic_prompt import CRITIC_PROMPT
from app.schemas.critic import CriticReport


class CriticAgent(BaseAgent):

    def __init__(self):
        provider = LLMFactory().get_provider()
        if provider is None:
            raise RuntimeError("No LLM provider available")

        self.llm = provider.get_llm()
        if self.llm is None:
            raise RuntimeError("LLM provider did not return an LLM")

        self.structured_llm = self.llm.with_structured_output(
            CriticReport
        )

    def analyze(self, report):

        prompt = CRITIC_PROMPT.format(
            report=report.model_dump_json(indent=2)
        )

        critique = self.structured_llm.invoke(prompt)

        return critique