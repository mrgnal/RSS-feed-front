from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse

class PasswordResetService:
    @staticmethod
    def send_reset_email(reset_password_token, request):
        context = {
            'current_user': reset_password_token.user,
            'username': reset_password_token.user.username,
            'email': reset_password_token.user.email,
            'reset_password_url': "http://localhost:3000/pages/Auth/newPassword?token={}".format(
                reset_password_token.key
            )
        }

        print(f"Sending password reset email to {context['email']}")
        print(f"Reset password URL: {context['reset_password_url']}")

        email_html_message = render_to_string('password_reset_email.html', context)
        email_plaintext_message = render_to_string('password_reset_email.txt', context)

        msg = EmailMultiAlternatives(
            "Password Reset for {title}".format(title="Your Website Title"),
            email_plaintext_message,
            "noreply@yourdomain.com",
            [reset_password_token.user.email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
