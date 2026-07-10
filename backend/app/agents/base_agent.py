from abc import ABC, abstractmethod


from typing import Any

class BaseAgent(ABC):
    """
    Base class for all Verdict agents.
    """

    @abstractmethod
    def analyze(self, *args: Any, **kwargs: Any) -> Any:
        """
        Every agent must implement this method.
        """
        pass