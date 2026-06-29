from app.agents.base_agent import BaseAgent

from app.llm.factory import LLMFactory

from app.prompts.refiner_prompt import REFINER_PROMPT


class RefinerAgent(BaseAgent):

    def __init__(self):

        provider = LLMFactory.get_provider()

        self.llm = provider.get_llm()

    def analyze(self, report, feedback):

        prompt = REFINER_PROMPT.format(
            report=report.model_dump_json(indent=2),
            feedback=feedback.model_dump_json(indent=2),
        )

        response = self.llm.invoke(prompt)

        return response.content