import traceback
from django.core.mail import send_mail
from django.conf import settings
# from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.views.decorators.csrf import csrf_exempt

from ...models import Application
from ...models import CustomUser, AdminNotifications, TenantNotifications, Notification
from webpush import send_user_notification
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model
import json
from datetime import datetime, timedelta, timezone
from ...serializer import NotificationSerializer
from django.db import transaction
from ...backend_systems.custom_auth.customAuth_main import *
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from  .notifications_helper import define_email

class Notifications:
    """A class to manage both email and in app client notifications"""

    def acknowldge_application(self, userObject=None) -> bool:
        """Sends an email of acknowledgement to the client indicating
        that their RTO application has been successfully submitted"""

        print('Acknowledging application')
        user = userObject

        # Genearte verification token and link
        account_manager = AccountManager()
        activation_link = account_manager.generate_token(userObject=userObject, time_window=30)


        # Construct email elements
        template_path = "acknowledge_reciept_gcb.html"
        text_context = {'recipient_name': user.f_name, 'activation_link': activation_link}
        subject = 'TEST -- Your RTO Application Has Been Received'
        recipient = [user.email]

        # Define email
        email = define_email(subject = subject, recipient = recipient,
                                      template_path =  template_path, text_context = text_context, )


        try:  # send email
            email.send()
            print("Message successfully sent")
        except Exception as e:
            print("An error has occured ->", e)
            raise
            # traceback.format_exc()
            return False

        return True

    def notify_aplication_status(self, status, userObject=None ) -> bool:
        """Sends an email  to the client indicating whether their RTO
        application was accepted or denied"""

        user = userObject

        # Define email body
        subject = 'Updated regarding your Rent-to-Own Application'
        approval = f'Hello {user.f_name},\n\nYour expression of interest has been approved. Congrats!.\n\n' \
                   f'A GCB personel will soon be in touch to assign you a property\n\nRegards,\nGCB REIT Team'
        rejection =  f'Hello {user.f_name},\n\nUnfortunately, Your expression of interest has been denied.\n\nRegards,\nGCB REIT Team'

        recipient_list = [user.email]  # replace email
        print(user.email)

        try:  # send email
            message = approval if status == "approve" else rejection
            send_mail(subject=subject, message=message, recipient_list=recipient_list, fail_silently=False,
                      from_email=None)
            print("Message successfully sent")
        except Exception as e:
            print("An error has occured ->", e)
            raise


        return True

    def application_success(self, userObject=None) -> bool:
        """Sends an email of to notify client of being approved
        for the RTO scheme"""

        user = userObject
        user_app = Application.objects.filter(email=user.email)

        # Define email body
        subject = 'Congratulations Your Application Has Been Approved'
        message = f'Hello {user_app.title[0]} {user.first_name[0]} {user.surname[0]},\n\nCongratulations!!! Your Application for property undr the Rent To Own Scheme has been approved. Subseequent communication will be to ensure that GCB team finds you the right homee that suits your budget as soon as possible.\n Check the portal frequent to see homes suggested to you from the preferences you stated in the form.\n\nRegards,\nGCB REIT Team'
        recipient_list = [user.email]  # replace email
        print(user.email)

        try:  # send email
            send_mail(subject=subject, message=message, recipient_list=recipient_list, fail_silently=False,
                      from_email=None)
            print("Message successfully sent")
        except Exception as e:
            print("An error has occured ->", e)
            return False

        return True

    def create_base_notification(self, target_group: str, notification_type: str,
                                 userObject: CustomUser = None, ) -> Notification | bool:
        """Creates and stores a base notification in the database depending on the type
        of notification

        :param target_group: The user group for which the notificaiton is intended e.g gcb_admin
        :param notification_type: The type of notification being created e.g General
        :param userObject: The subject of the notification. e.g A client who has just created an account
        :returns: Returns True if the base notification was created succesfully, False otherwise
        """
        notification_data = None

        # TODO: Break this chain into smaller helper functions
        # Create notification
        if notification_type == 'New Application':
            notification_data = {'title': 'New Application Recieved',
                                 'message': f'{userObject.f_name} {userObject.l_name} with id: {userObject.id} has '
                                            f'submitted a new application',
                                 'created_at': datetime.now,
                                 'is_read': False,
                                 'type': 'New Application',
                                 'target_group': target_group
                                 }
        elif notification_type == 'Application Approved':
            notification_data = {'title': 'Application Approved',
                                 'message': f'{userObject.f_name} {userObject.l_name}, your application has been approved',
                                 'created_at': datetime.now,
                                 'is_read': False,
                                 'type': 'Application Approved',
                                 'target_group': target_group
                                 }

        # Save the notification
        try:
            new_notification = NotificationSerializer(data=notification_data)
            if new_notification.is_valid():
                new_notification.save()
                print("Base notification created")
                return new_notification
        except Exception as e:
            print(e)
            return False

    def create_admin_notification(self, notification, recipient: [CustomUser] = None) -> bool:
        """Creates creates an admin notification in the database. This notification is
        set to be received by all admins OR a specific list of admins.

        :param notification_id: The base Notification object
        :param recipient: A list of recipients to which the base notification is intended to reach.
        If no recipient argument is provided, the notification is shared with all admin level users
        :returns: True if the notification was sucesfully created, False if otherwise"""

        try:
            if recipient is None:  # Send to all admins
                all_admins = CustomUser.objects.filter(user_type='gcb_admin')
                with transaction.atomic():
                    for admin in all_admins:
                        new_notification = AdminNotifications(notification_id=notification, user_id=admin,
                                                              read_status=False)
                        new_notification.save()
            else:  # Send to specifc admins
                with transaction.atomic():
                    for admin in recipient:
                        new_notification = AdminNotifications(notification_id=notification, user_id=admin,
                                                              read_status=False)
                        new_notification.save()
        except Exception as e:
            print('An error has occured >>', e)
            return False

        return True

    def notify_new_application(self, userObject: CustomUser, ) -> bool:
        """Creates DB entries for admins and super admins that a new application has been submitted
        to the platform"""

        # Create and save base notification
        base_notification = self.create_base_notification('gcb_admin', 'New Application', userObject)

        # Create and save admin notifications
        if base_notification != False:
            admin_notification = self.create_admin_notification(notification=base_notification)

        return True



    def delete_notification(self, notification : Notification, all_read = True):
        """Deletes a notification from the database. Assumes that all intended
        redipients have already read the notification"""
        return

    @csrf_exempt
    def send_push(head, body, id):
        try:
            user_id = id
            user = get_user_model().objects.get(id=user_id)
            payload = {'head': head, 'body': body}
            send_user_notification(user=user, payload=payload, ttl=1000)
        except Exception as e:
            return -1
        return 0


    def notify_account_setup(self, userObject, time_window):
        """Sends an email to a user to complete account setup"""

        user = userObject

        # Generate token and link
        account_manager = AccountManager()
        activation_link = account_manager.generate_token(userObject=userObject,time_window= time_window)
        print("Activation link is", activation_link)


        # Define email body
        subject = 'Complete your account setup'
        tenant_message = f'Hello {user.f_name},\n\nThank you for applying for GCBs RTO scheme. Click on the link below to' \
                  f' activate your account and track the progress of your application.\n\n{activation_link}\n\nRegards,\nGCB REIT Team'
        admin_message = f'Hello {user.f_name},\n\nYou have been invited to be an admin on the GCB REIT Platform. Click on the link below to' \
                  f' activate your account and track the progress of your application.\n\n{activation_link}\n\nRegards,\nGCB REIT Team'
        recipient_list = [user.email]

        # Send email
        try:
            send_mail(subject=subject,
                      message= admin_message if user.user_type == 'gcb_admin' else tenant_message,
                      recipient_list=recipient_list,
                      fail_silently=False,
                      from_email=None)
            print("Message successfully sent")
        except Exception as e:

            print("An error has occured ->", e)
            raise

        return

    # def payment_acknowledgement_notification(user_id, payment_date, amount, remaining_amount):
    #     """
    #     Send a notification to acknowledge receipt of a payment.
    #
    #     Args:
    #         user_id (int): The ID of the user to notify.
    #         payment_date (date): The date the payment was received.
    #         amount (float): The amount of the payment.
    #         remaining_amount (float): The remaining amount due for the month.
    #         equity_percentage (float): The new equity percentage of the user.
    #
    #     Returns:
    #         None
    #     """
    #
    #     head = "Payment Acknowledgement"
    #     body = (
    #         f"Your payment of ${amount:.2f} on {payment_date} has been successfully processed. You can view your new equity percentage"+
    #         "on the app dashboard.\n You have a total of ${remaining_amount:.2f} in arreas for this month."
    #     )
    #
    #     return self.send_push(head, body, user_id)

    # new year: change in the interest rates 

    # # send notification for upcoming rentals
    # def missed_rent_notification(user_id, due_dates, penalty_start_date):
    #     """
    #     Notify a tenant of missed rental payment deadlines and inform them of impending penalties.
    #
    #     Args:
    #         user_id (int): The ID of the user to notify.
    #         due_dates (list): List of missed rental payment dates.
    #         penalty_start_date (date): The date from which penalties will start accruing.
    #
    #     Returns:
    #         0 if successful, -1 if an error occurred.
    #     """
    #
    #     head = "Missed Rental Payment Deadlines"
    #     body = (
    #         f"We have noticed that you missed the rental payment deadlines on the following dates: "
    #         f"{', '.join(str(date) for date in due_dates)}. Please be aware that starting from {penalty_start_date}, "
    #         "penalties will be applied to your account for these overdue payments."
    #     )
    #
    #     # Send the notification
    #     return self.send_push(head, body, user_id)

    def notify_home_allocation(self, userObject, propertyObject):
        """Notify a tenant that they have been assigned a home"""

        user = userObject

        # Define email body
        subject = 'Your home has been allocated!'
        message = f'Hello {userObject.f_name},\n\nThank you for applying for GCBs RTO scheme. Your home as been allocated on the ' \
                  f'platform. Kindlt log onto the plaltform to check full details'
        recipient_list = [user.email]

        # Send email
        try:
            send_mail(subject=subject,
                      message=message,
                      recipient_list=recipient_list,
                      fail_silently=False,
                      from_email=None)
            print("Message successfully sent")
        except Exception as e:

            print("An error has occured ->", e)
            raise


