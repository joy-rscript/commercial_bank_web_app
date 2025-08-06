from typing import NamedTuple


class ActionType(NamedTuple):
    """ A class (inheriting from NamedTuple) that is used to
    represent the various log action types.
    """
    APPLICATION_APPROVAL: str = 'Application Approval'
    APPLICATION_DISAPPROVAL: str = 'Account Disapproval'
    ADMIN_INVITATION: str = 'Admin Invitation'
    ADMIN_ACCEPTANCE: str = 'Admin Acceptance'
    ADMIN_DELETION: str = 'Admin Deletion'
    PROPERTY_ALLOCATION: str = 'Property Allocated'
    PROPERTY_DEALLOCATION: str = 'Property De-Allocated'
