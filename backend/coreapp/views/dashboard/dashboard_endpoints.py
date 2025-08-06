import traceback

from ...backend_systems.data_trends.dataTrends_main import *
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
def getAdminDashboardPortfolio(request) -> HttpResponse | JsonResponse:
    try:
        trends = DataTrends()
        portfolio_data = trends.calculate_portfolio()

        return JsonResponse(data=portfolio_data
                            , status=200, safe=False)
    except Exception as e:
        print(e)
        traceback.print_exc()
        return HttpResponse(content='An error occured during the calculation',status=400)

@api_view(['GET'])
def getAdminDashboardUserBase(request) -> HttpResponse | JsonResponse:
    try:
        trends = DataTrends()
        userbase_stats = trends.calculate_user_base()

        return JsonResponse(data=userbase_stats, status=200, safe=False)
    except Exception as e:
        print(e)
        traceback.print_exc()
        return HttpResponse(content='An error occured during the calculation',status=400)

def getAdminDashboardDevelopers(request) -> HttpResponse | JsonResponse:
    try:
        trends = DataTrends()
        developer_data = trends.calculate_total_properties()
        return JsonResponse(data=developer_data, status=200)
    except Exception as e:
        print(e)
        traceback.print_exc()
        return HttpResponse(content='An error occured during the calculation',status=400)

def getAdminDashboardPaymentHistory(request) -> HttpResponse | JsonResponse:

    return

