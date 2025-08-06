from datetime import date, timedelta
import calendar
from django.http import JsonResponse, HttpRequest, HttpResponse
from requests import Response
from rest_framework.decorators import api_view
from rest_framework import status
from ...models import Developer, DeveloperProject, Property, CustomUser, PropertyPaymentTracker, PropertyPenaltyTracker, UserFinancialModel
from ...serializer import DeveloperSerializer, DeveloperProjectSerializer, PenaltyTrackSerializer, PropertyPaymentTrackerSerializer, PropertySerializer, UserSerializer, NotificationSerializer
from ...backend_systems.property_management.propeprtyManagement_main import *
from ...backend_systems.financial_model.financialModel_main import FinancialModel

@api_view(['POST'])
def assignProperty(request) -> HttpResponse | JsonResponse:

    # Validate IDs
    project_id = request.data.get('project_id')
    tenant_id =  request.data.get('tenant_id')
    if not (DeveloperProjectSerializer.validate_id(project_id) and UserSerializer.validate_id(tenant_id)):
        return HttpResponse(content="An invalid ID has been provided", status= 400)


    # Get tenant and project references
    try:
        tenant = CustomUser.objects.get(id=tenant_id)
        developer_project = DeveloperProject.objects.get(id = project_id)
    except:
        return HttpResponse(content="The tenant or project does not exist", status=404)

    # Check availability & assign unit
    try:
        property_manager = PropertyManager()
        # notifyOfAssignment()
        if property_manager.check_unit_availability(developer_project):
            new_property = property_manager.assign_unit(developer_project, tenant, request)
        else:
            return HttpResponse(content=f"There are no free units", status=400)

    except Exception as e:
        print(e)
        return HttpResponse(content=f"An error occured while assigning the property", status=500)

    try:
        userFinModel = UserFinancialModel.objects.get(property=new_property)
        financial_object = FinancialModel(
            cost_per_unit=userFinModel.cost_per_unit,
            target_rental_yield=userFinModel.target_rental_yield,
            init_down_payment=userFinModel.init_down_payment,
            annual_rent_increase=userFinModel.annual_rent_increase,
            annual_home_value_increase=userFinModel.annual_home_value_increase,
            years_to_pay_init_cost=int(userFinModel.years_to_pay_init_cost),
            per_unit_markup_cost=userFinModel.per_unit_markup_cost,
            annual_equity_pymt_increase=userFinModel.annual_equity_pymt_increase
        )

        finModel = financial_object.compute_model()
        date_now = date.today()

        # Determine the previous month and year
        if date_now.month == 1:
            last_month = 12
            last_year = date_now.year - 1
        else:
            last_month = date_now.month - 1
            last_year = date_now.year

        # Last date paid is set to the 1st of the previous month
        last_date_paid = date(last_year, last_month, 1)

        # Dictionaries to store progress of payments for rent and equity
        equity_progress = {year: {month: {'amount_to_be_paid': 0, 'amount_paid': 0} for month in range(1, 13)} for year in range(date_now.year, date_now.year + 21)}
        rent_progress = {year: {month: {'amount_to_be_paid': 0, 'amount_paid': 0} for month in range(1, 13)} for year in range(date_now.year, date_now.year + 21)}

        for y_indx, rent in finModel['monthly_rent_pybl'].items():
            for i in range(1, 13):
                current_year = date_now.year + y_indx - 1
                if current_year > last_year or (current_year == last_year and i > last_month):
                    rent_progress[current_year][i] = {'amount_to_be_paid': rent, 'amount_paid': 0}
                else:
                    rent_progress[current_year][i] = {'amount_to_be_paid': 0, 'amount_paid': 0}

        for y_indx, eqty in finModel['monthly_eqty_pymt'].items():
            for i in range(1, 13):
                current_year = date_now.year + y_indx - 1
                if current_year > last_year or (current_year == last_year and i > last_month):
                    equity_progress[current_year][i] = {'amount_to_be_paid': eqty, 'amount_paid': 0}
                else:
                    equity_progress[current_year][i] = {'amount_to_be_paid': 0, 'amount_paid': 0}

        # Initialize PaymentTracker and PenaltyTracker
        tracker_data = {
            "start_date": date_now,
            "property_id": new_property.id,
            "last_paid_date_rent": last_date_paid,
            "last_paid_date_equity": last_date_paid,
            "total_equity": finModel['onetime_eqty_pymt'][1],
            "rent_progress": rent_progress,
            "equity_progress": equity_progress
        }
        serializer = PropertyPaymentTrackerSerializer(data=tracker_data)
        if serializer.is_valid():
            serializer.save()
            penalty_data = {"late_penalty_collection": {}, "property_id": new_property.id}
            penalty_serializer = PenaltyTrackSerializer(data=penalty_data)
            if penalty_serializer.is_valid():
                penalty_serializer.save()
            else:
                return Response(penalty_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



    return HttpResponse(content=f'Property with ID {new_property.id} assigned to tenant with ID: {tenant_id}', status=201)


@api_view(['DELETE'])
def unassignProperty(request) -> HttpResponse | JsonResponse:

    try:
        # check unit availability
        property_id = request.data.get('property_id')
        if not (DeveloperProjectSerializer.validate_id(property_id)):
            return HttpResponse(content="An invalid ID has been provided", status=400)

        # un-assign unit
        property_manager = PropertyManager()
        # paym = PropertyPaymentTracker.objects.get(property_id=property_id)
        # # penalty_tracker = PropertyPenaltyTracker.objects.get(property_id=property_id)
        # paym.delete()
        # penalty_tracker.delete()
        property_manager.unassign_unit(property_id)
        return HttpResponse(content=f"Property with Id {property_id} unassigned", status=201)
    except Exception as e:
        print(e)
        return HttpResponse(content=f"An error occured", status=500)



@api_view(['POST'])
def notifyOfAssignment(request) -> HttpResponse | JsonResponse:


    return



# @api_view(['POST'])
# def getUserProperties(request) -> HttpResponse | JsonResponse:
#
#     tenant_id = request.data.get('tenant_id')
#     tenant_object = CustomUser.objects.filter(id = tenant_id).exists()
#
#     if tenant_object:
#         properties =
#
#     return
#
