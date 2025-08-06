from django.http import JsonResponse, HttpRequest, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from ...models import Developer
from ...serializer import DeveloperSerializer
from django.contrib.auth.decorators import user_passes_test, login_required
from ...backend_systems.custom_auth.CustomAuthorization import *
from ...models import Notification, AdminNotifications, TenantNotifications, RegistrationToken
from ...serializer import AdminNotificationSerializer, TenantNotificationSerializer, NotificationSerializer, UserSerializer
from ...backend_systems.custom_auth.customAuth_main import *
from ...backend_systems.notifications.notifications_main import *

@api_view(['PATCH'])
@user_passes_test(soft_eng_required)
def inviteTenant(request) -> HttpResponse | JsonResponse:
    """Generates a signup link which is then emailed to the user
    FR003 """

    email = request.data.get('email')
    user = CustomUser.objects.get(email = email)
    user_type = user.user_type

    # Check valid user type
    if user_type != 'tenant':
        return HttpResponse(content='Invalid user type', status=400)

    try:
        if user and user.is_active == False :
            notifications = Notifications()
            notifications.notify_account_setup(user, 20)
            return HttpResponse(f'Email sent to {user.email}', status=200)
    except Exception as e:
        print(e)
        return HttpResponse(content='An error occurred, an invite link might already have been issued', status=500)

@api_view(['POST'])
@user_passes_test(soft_eng_required)
def inviteAdmin(request) -> HttpResponse | JsonResponse:
    """Generates a signup link which is then emailed to the admin
    FR006 """

    new_user = UserSerializer(data=request.data, partial=True)
    
    try:
        with transaction.atomic():
            if new_user.is_valid():
                new_user.user_type = 'gcb_admin'
                new_user.is_active = False
                new_user = new_user.save()
                print(new_user)
                notifications = Notifications()
                notifications.notify_account_setup(new_user, 20)
                return HttpResponse(f'Email sent to {new_user.email}', status=200)
    except Exception as e:
        print(e)
        traceback.print_exc()
        return HttpResponse(content='An error occurred, an invite link might already have been issued or'
                                    'the account already exists', status=500)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def setAccountPassword(request, invite_token = None) -> HttpResponse | JsonResponse:
    """Sets the account password for a user"""

    token = invite_token
    print(token)

    # Check token is valid
    tokenObject = RegistrationToken.objects.filter(token = token)
    
    if not (tokenObject):
        return HttpResponse(content='Invalid token. Does not exist or has expired', status=400)

    #TODO move this to a serializer
    try:
        email = request.data.get('email')
        password_1 = request.data.get('password_1')
        password_2 = request.data.get('password_2')

        if not email or not password_1 or not password_2:
            return HttpResponse(content='All fields are required.', status=400)

        if password_1 != password_2:
           return HttpResponse(content='Passwords do not match', status=400)

        # Get user reference
        user = CustomUser.objects.get(email=email)

        if user:
            user.password = make_password(password_1)
            user.is_active = True
            user.save()
            tokenObject.delete()
            return HttpResponse(content='Password set and account activated successfully.', status=200)
        else:
           return HttpResponse(content='Account does not exist', status=404)

    except Exception as e:
        return HttpResponse(content='An error occured', status=500)



@api_view(['PATCH'])
@permission_classes([AllowAny])
def notifyApplicationStatus(request):
    """Notifies a client tas to whether thteir application has been approved or rejected"""

    user_email = request.data.get('email')
    status = request.data.get('status')
    userObject = CustomUser.objects.filter(email = user_email)

    if userObject.exists():
        try:
            notifications = Notifications()
            notifications.notify_aplication_status(status = status, userObject = userObject)

        except Exception as e:
            print(e)
            return HttpResponse(content='An error occured', status = 500)

    else:
        return HttpResponse(content='The user does not exist', status=404)




