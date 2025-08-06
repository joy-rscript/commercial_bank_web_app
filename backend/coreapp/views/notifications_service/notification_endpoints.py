from django.http import JsonResponse, HttpRequest, HttpResponse
from rest_framework.decorators import api_view

from ...models import Developer
from ...serializer import DeveloperSerializer
from django.contrib.auth.decorators import user_passes_test, login_required
from ...backend_systems.custom_auth.CustomAuthorization import *
from ...models import Notification, AdminNotifications, TenantNotifications
from ...serializer import AdminNotificationSerializer, TenantNotificationSerializer, NotificationSerializer

@api_view(['GET'])
@login_required
def getNotifications(request) -> HttpResponse | JsonResponse:
    try:
        notifications = None
        user = request.user
        if user.user_type == 'software_engineer':  # TODO: change this
            notifications = AdminNotifications.objects.filter(user_id=user.id)
            serializer = AdminNotificationSerializer(notifications, many=True)
        elif user.user_type == 'tenant':  # TODO: change this
            notifications = TenantNotifications.objects.filter(user_id=user.id)
            serializer = TenantNotificationSerializer(notifications, many=True)
        else:
            return HttpResponse("Invalid user type", status=400)
    except Exception as e:
        print("An error occurred >>", e)
        return HttpResponse("An error occurred", status=500)

    return JsonResponse(data=serializer.data, status=200, safe=False)

def markAsRead(request) -> HttpResponse | JsonResponse:
    return



@api_view(['PATCH'])
@user_passes_test(soft_eng_required)
def markNotificationAsRead(request) -> HttpResponse | JsonResponse:
    serialized_data = DeveloperSerializer(data=request.data)
    print(serialized_data)
    return

