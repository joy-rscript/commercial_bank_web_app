from django.contrib import admin
from django.urls import path, include
from .views.propertyManagement_service.developer_endpoints import *
from .views.propertyManagement_service.developerProject_endpoints import *
from .views.AuthenticationViews import RegisterView
from .views.form_service.ApplicationView import *
from .views.PaymentTrackingView import *
from .views.notifications_service.notification_endpoints import *
from .views.accounts_auth_service.accounts_endpoints import *
from .views.propertyManagement_service.property_endpoints import *
from .views.dashboard.dashboard_endpoints import *
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('register', RegisterView.as_view()),


    # On-boarding service end-points 
    path("get_applications/", getApplications, name="get_applications"),
    path("get_application_sections", getApplicationBySections, name="get_application_by_sections"),
    path("get_applications/<int:id>/<int:section_num>/", getApplication, name="get_application_detail"),
    path("get_applications/<int:id>/<int:section_num>/", getApplicantInfo, name="get_application_detail"),
    path("add_application", addNewApplication, name="add_application"),
    path("update_application", updateApplication, name="update_application"),

    # property management
    path("assign_property/<int:id>/", assignProperty, name="assign_property"),
    
    # Payment Tracking service end-points
    path("add_receipt", createReceipt, name="create_receipt"),  
    path("property/get_receipts", getReceipts, name="fetch_receipts"),  
    path("get_receipts", getReceipts, name="fetch_receipts"),  
    # Revenue 

    # Developer endpoints
    path('developers/create_developer', createDeveloper),
    path('developers/delete_developer', deleteDeveloper),
    path('developers/update_developer', updateDeveloper),
    path('developers/get_developer', getDeveloper),
    path('developers/get_all_developers', getAllDevelopers),
    path("developers/total_revenue", getDeveloperRevenue, name="get_developer_revenue"),
    # Developer Project endpoints
    path('developer_projects/create_project', createDeveloperProject),
    path('developer_projects/delete_project', deleteDeveloperProject),
    path('developer_projects/update_project', updateDeveloperProject),
    path('developer_projects/get_project', getDeveloperProject),
    path('developer_projects/get_all_projects', getAllDeveloperProjects),
    path("developer_projects/total_revenue", getDeveloperProjectRevenue, name="get_developer_project_revenue"),

    # Notification endpoints
    path('notifications/get_notifications', getNotifications),
    path('notifications/mark_notification_read', markNotificationAsRead),

    # Account endpoints
    path('accounts/complete_setup/<str:invite_token>', setAccountPassword),
    path('accounts/invite_tenant', inviteTenant),
    path('accounts/invite_admin', inviteAdmin),
    path('accounts/notify_application_status',notifyApplicationStatus),

    # Property endpoints
    path('property/assign_property', assignProperty),
    path('property/unassign_property', unassignProperty),
    path("property/total_revenue", getPropertyRevenue, name="get_property_revenue"),
    path("property/monthly_summary", getPropertyMonthlySummary, name="property_monthly_summary"),
    path("property/equity_growth", getEquityGrowth, name="property_equity_growth"),
    path("property/get_tenant_info", getPropertyTenantData, name="property_get_tenant_info"),
    path("property/get_receipts", getReceipts, name="fetch_receipts"),  
    

    # Dashboard endpoints
    path('dashboard/admin/portfolio', getAdminDashboardPortfolio),
    path('dashhboard/admin/userbase', getAdminDashboardUserBase),
    path('dashboard/admin/developers',getAdminDashboardDevelopers),

    # Financial Model endpoints
    path('dashboard/model/getUserModel',getFinancialModel)
   

]
