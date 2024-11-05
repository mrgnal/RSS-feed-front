from django.core.mail import EmailMessage
from .abstracts.SendMessage import SendMessageServiceBase
from rest_framework import status


class SendEmailService(SendMessageServiceBase):
    def send_message(self, email_subject, message, to_email) -> dict:
        email = EmailMessage(email_subject, message, to=[to_email])
        if email.send():
            return ({
                'status': status.HTTP_200_OK
            })
        else:
            return ({
                'satus': status.HTTP_500_INTERNAL_SERVER_ERROR
            })
