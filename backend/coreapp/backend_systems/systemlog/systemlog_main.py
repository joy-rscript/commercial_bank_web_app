# TODO insert stuff in the database
#TODO implement clear log history older than 2 months

# schema for the log:
# user, action_type, date, description
# log should be 2 months at a time

from systemlog_helpers import ActionType as action
from datetime import datetime
from ....coreapp.models import SystemLog as log

class SystemLog():
    """ A class that keeps track of all admin level
    actions performed on the application

    The structure for a log entry in the database is as follows:

    user | action_type | datetime | description """

    def __int__(self, log_duration):
        self.log_duration = log_duration



    def log_application_approval(self, admin_email: str, tenant_email: str, status: bool) -> bool:
        """ Logs the approval or disapproval of a tenants application

        :param admin_email: Email of the admin who made the (dis)approval
        :param tenant_email: Email of the tenant who was (dis)approved
        :param status: True if application was approved, False if application was rejected

        :returns: True if the log was succesfully updated, False if it failed
        :rtype: bool
        """

        description = f'{admin_email} {"approved" if status else "disapproved"} the application for {tenant_email}'
        action_type = action.APPLICATION_APPROVAL if status else action.APPLICATION_DISAPPROVAL
        event_time = datetime.now()


        try:
            log_entry = log(user = admin_email, action_type= action_type, timestamp = event_time, description = description)
            log_entry.save()

            return True
        except:
            return False

    def log_admin_invitation(self, admin_email: str, super_admin_email: str) -> bool:
        """
        Logs the event in which a super admin invites another person to be a regular
        admin on the platform

        :param admin_email: Email of the user who has been invited to be an admin
        :param super_admin_email: Email of the super admin who invited the new admin


        :returns: True if the log was succesfully updated, False if it failed
        """

        description = f'{admin_email} has been invited to be an admin by{super_admin_email}'
        action_type = action.ADMIN_INVITATION
        event_time = datetime.now()

        try:
            log_entry = log(user=admin_email, action_type=action_type, timestamp=event_time, description=description)
            log_entry.save()
            return True
        except:
            return False

    def log_admin_deletion(self, admin_email: str, super_admin_email: str) -> bool:
        """
        Logs the deletion of an admin as well as the super admin that
        deleted the admins account

        :param admin_email: Email of the admin which has just been deleted
        :type admin_email: str
        :param super_admin_email: Email of the super admin who deleted the admin account
        :type super_admin_email: str

        :returns: True if the log was succesfully updated, False if it failed
        """

        description = f'The admin account for {admin_email} has been deleted by {super_admin_email}'
        action_type = action.ADMIN_DELETION
        event_time = datetime.now()

        try:
            log_entry = log(user=admin_email, action_type=action_type, timestamp=event_time, description=description)
            log_entry.save()
            return True
        except:
            return False

    def log_admin_acceptance(self, admin_email: str) -> bool:
        """
        Logs the event in which an invited admin has officially accepted the
        invite that was sent to their email. This function should only be called when
        the new admins account has been fully created and inserted in the database

        :param admin_email: The email of the admin that accepted the invite
        :type admin_email: str

        :returns: True if the log was successfully updated, False if it failed
        """

        description = f'{admin_email} has accepted the invite to be an admin'
        action_type = action.ADMIN_ACCEPTANCE
        event_time = datetime.now()

        try:
            log_entry = log(user=admin_email, action_type=action_type, timestamp=event_time, description=description)
            log_entry.save()
            return True
        except:
            return False

    def log_property_allocation(self, tenant_email: str, admin_email: str, property_id: str, status: bool):
        """
        Logs the event in which a home is (de)allocated as well as the
        admin who allocated the property

        :param admin_email: The email of the admin who (de)allocated the property
        :param property_id: The id of the property which has just been assigned
        :param tenant_email: The email of the tenant to which the property was assigned
        :param status: True if the event was a home allocation, False if it was a deallocation

        :returns: True if the log was successfully updated, False if it failed
        """

        description = f'{tenant_email} was assigned the property {property_id} by admin ' \
                      f'{admin_email}'
        action_type = action.PROPERTY_ALLOCATION if status else action.PROPERTY_DEALLOCATION
        event_time = datetime.now()

        try:
            log_entry = log(user=admin_email, action_type=action_type, timestamp=event_time, description=description)
            log_entry.save()
            return True
        except:
            return False
