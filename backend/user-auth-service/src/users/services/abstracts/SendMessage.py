from abc import ABC, abstractmethod


class SendMessageServiceBase(ABC):
    @abstractmethod
    def send_message(self, email_subject: str, message: str, to_email: str) -> dict:
        pass
