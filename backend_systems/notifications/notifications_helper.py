
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


# from notifications_main import *


def define_email(subject, recipient, template_path : str, text_context : dict,
                 ):
    """Used to set the text content of a notification template."""

    # Read the HTML template and set the content
    html_content = render_to_string(template_path, text_context)
    text_content = strip_tags(html_content)

    # Build email body
    subject = subject
    recipient = recipient
    from_email = settings.EMAIL_HOST_USER

    email = EmailMultiAlternatives(
        subject = subject,
        body = text_content,
        from_email = from_email,
        to = recipient,
    )


    return email

