from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)
from app.core.logger import logger

def with_retry(
    max_attempts: int = 3,
    min_wait: int = 1,
    max_wait: int = 10,
    exceptions: tuple = (Exception,)
):
    """
    A generic retry decorator using tenacity.
    """
    
    def after_log(retry_state):
        if retry_state.attempt_number > 1:
            logger.warning(
                f"Retrying execution. Attempt {retry_state.attempt_number}. "
                f"Exception: {retry_state.outcome.exception()}"
            )

    return retry(
        stop=stop_after_attempt(max_attempts),
        wait=wait_exponential(multiplier=min_wait, max=max_wait),
        retry=retry_if_exception_type(exceptions),
        after=after_log,
        reraise=True,
    )
