from abc import ABC, abstractmethod

class TokenServiceBase(ABC):
    @abstractmethod
    def generate_token(self, user, timestamp=None) -> str:
        pass
