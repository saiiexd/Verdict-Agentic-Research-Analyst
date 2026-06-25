from abc import ABC, abstractmethod


class BaseAgent(ABC):
    """
    Base class for all Verdict agents.
    """

    @abstractmethod
    def analyze(self, *args, **kwargs):
        """
        Every agent must implement this method.
        """
        pass