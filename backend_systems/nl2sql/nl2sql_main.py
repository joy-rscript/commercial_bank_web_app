import nl2sql_helpers as nl
from nl2sql_exceptions import TextExceedsLimit, ContainsUnsafeWord
from . import nl2sql_llm
import os

class Nl2SQL:
    """A class that allows for a user to convert a natural language prompt to ORM code."""

    def check_prompt_safety(self, prompt: str) -> bool:
        """Takes an input string and checks if it is in the
        set of unsafe SQL and ORM keywords

        :param prompt: A natural language prompt
        :ptype: str
        :returns: True if prompt is safe, False is prompt is unsafe
        :rtype: bool"""

        for word in prompt:
            if word in nl.unsafe_words:
                return False

        return True

    def clean_prompt(self, prompt: str) -> str | None:
        """Takes a natural language prompt and cleans it to
        ensure that it meets safety criteria

        :param prompt: A natural language prompt
        :ptype: str
        :returns: Returns the cleaned string or False if the  """

        cleaned_text = prompt

        # Enforce the 50 character word limit
        if len(cleaned_text) > 50:
            raise TextExceedsLimit("The input prompt is too long")

        # Check for unsafe words
        cleaned_text = cleaned_text.lower()
        if not (self.check_prompt_safety(cleaned_text)):
            raise ContainsUnsafeWord("Prompt contains an unsafe word")

        # Identify sensitive data
        # Check in list of cities
        # TODO Ask if there is a need to mask locations

        return cleaned_text







