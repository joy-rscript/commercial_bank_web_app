
"""To use this authorization, follow the steps below
    1. Import the files below
        - from django.contrib.auth.decorators import user_passes_test
        - from CustomAuthorization import *

    2. Use the @user_passes_test() above the endpoint which requires authorization
       Example: @user_passes_test(tenant_required)
       This checks to see if the user is authenticated and if they are a tenant
"""

def tenant_required(user):
    return user.is_authenticated and user.is_tenant

def estate_developer_required(user):
    return user.is_authenticated and user.is_estate_developer

def gcb_admin_required(user):
    return user.is_authenticated and user.is_gcb_admin

def gcb_super_admin_required(user):
    return user.is_authenticated and user.is_gcb_superadmin

def soft_eng_required(user):
    return user.is_authenticated and user.is_software_engineer

def gcb_staff_required(user):
    return gcb_super_admin_required(user) or gcb_admin_required(user)
