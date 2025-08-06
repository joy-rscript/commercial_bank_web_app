from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Send a test email to verify email configuration'

    def handle(self, *args, **kwargs):
        subject = 'Test Email'
        message = 'This is a test email to verify email configuration.'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = ['ruejoysithole@gmail.com']  # Replace with your test email address

        try:
            send_mail(subject, message, from_email, recipient_list)
            self.stdout.write(self.style.SUCCESS('Test email sent successfully'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error sending email: {e}'))
