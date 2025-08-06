from typing import NewType

# A type for values that are supposed to contain percentage values
from typing import Union, Any

class percentage:
    def __init__(self, value: Union[int, float]):
        if not 0 <= value <= 1:
            raise ValueError("Percentage must be between 0 and 1.")
        self._value: float = float(value)

    @property
    def value(self) -> float:
        return self._value

    @value.setter
    def value(self, value: Union[int, float]) -> None:
        if not 0 <= value <= 1:
            raise ValueError("Percentage must be between 0 and 1.")
        self._value = float(value)

    def __float__(self) -> float:
        return self._value

    def __repr__(self) -> str:
        return f"{self._value * 100}%"