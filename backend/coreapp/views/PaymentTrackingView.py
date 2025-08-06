from django.shortcuts import get_object_or_404

from ..backend_systems.financial_model.financialModel_main import FinancialModel
from ..backend_systems.payment_tracking.paymentTracking_main import PaymentTracker
from ..serializer import ApplicationSerializer, PenaltyTrackSerializer, PropertyPaymentTrackerSerializer, PropertySerializer, ReceiptSerializer, UserFinancialModelSerializer
from ..models import Receipt, Property
# from .backend_systems.financial_model import financialModel_main
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import *
from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, AllowAny
from datetime import date
from ..backend_systems.financial_model.financialModel_main import FinancialModel
from django.http import JsonResponse, HttpRequest, HttpResponse


@api_view(['POST'])
def createReceipt(request):
   
    user = request.user
    if not user.is_staff and not user.is_superuser: 
        return Response(
            {'error': 'You are not authorized to enter payment information into the database'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    data = request.data
    property = data.get('property')
    if not property:
        return Response(
            {'error': 'Property ID is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    property = get_object_or_404(Property, id=property)
    # Check for receipt number uniqueness
    receipt_number = data.get('receipt_number')
    if receipt_number:
        if Receipt.objects.filter(receipt_number=receipt_number).exists():
            return Response(
                {'error': 'Receipt number already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )


    try:
        user_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property)
        fin_model = get_object_or_404(UserFinancialModel, property=property)
        penalty_tracker = get_object_or_404(PropertyPenaltyTracker, property_id=property)

        financial_object = FinancialModel(
            cost_per_unit=fin_model.cost_per_unit,
            target_rental_yield=fin_model.target_rental_yield,
            init_down_payment=fin_model.init_down_payment,
            annual_rent_increase=fin_model.annual_rent_increase,
            annual_home_value_increase=fin_model.annual_home_value_increase,
            years_to_pay_init_cost=int(fin_model.years_to_pay_init_cost),
            per_unit_markup_cost=fin_model.per_unit_markup_cost,
            annual_equity_pymt_increase=fin_model.annual_equity_pymt_increase
        )
    
        finModel = financial_object.compute_model()
        for f in finModel:
            print("--"*10, f, finModel[f], "\n")

        trackerObject = PaymentTracker(user_tracker, fin_model, penalty_tracker)
        receipt_data = trackerObject.process_payment(data["paid_amount"])
        if receipt_data:
            # 34200.1
            # Combine amount breakdown with other data information
            data["date_recorded"] = date.today()
            combined_data = {**receipt_data, **data}
            receipt_serializer = ReceiptSerializer(data=combined_data)
            print("Error here")
            payment_serializer = PropertyPaymentTrackerSerializer(user_tracker)
            penalty_serializer = PenaltyTrackSerializer(penalty_tracker)
            if receipt_serializer.is_valid():
                print("valid near return")
                receipt_serializer.save()
                return Response({
                    'receipt': receipt_serializer.data,
                    'payment': payment_serializer.data,
                    'penalty': penalty_serializer.data
                }, status=status.HTTP_201_CREATED)           
            else:
                print(receipt_serializer.errors)
                return Response(
                    receipt_serializer.errors, 
                    status=status.HTTP_400_BAD_REQUEST
                )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@api_view(['GET'])
def getReceipts(request):
    property = request.query_params.get('property')
    year = request.query_params.get('year')
    month = request.query_params.get('month')

    user = request.user
    

    try:
        if not user.is_superuser and user.user_type not in ['admin', 'gcb_admin']:
            if property:
                property = get_object_or_404(Property, id=property)
                if property.current_tenant != user.pk:
                    return Response(
                        {"You are not authorised to make this request"},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
            else:
                return Response(
                    {'error': 'You are not authorized to perform this action'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        # Filter receipts based on the given parameters
        if property:
            receipts = Receipt.objects.filter(property=property)
        else:
            receipts = Receipt.objects.all()

        if year:
            print("before year", receipts)
            receipts = receipts.filter(payment_date__year=year)
            if month:
                print("before month", receipts)
                receipts = receipts.filter(payment_date__month=month)
                print("after month", receipts)

        if receipts:
            serializer = ReceiptSerializer(receipts, many=True)
            print('serializer.data')
            
            tenant_id = serializer.data[0]['tenant']
            print(tenant_id)
            tenant = CustomUser.objects.filter(id=tenant_id)
            receipt_data = {}
            receipt_data["receipt"]=serializer.data
            receipt_data['tenant'] = tenant
            
            return Response(serializer.data)
        else: 
            empty = {}
            return Response( empty )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def getLatePayments(request, year, month, prop_id=None):
    # admin request : get all properties
    user = request.user
    if prop_id :
        property = Property.objects.get(id=prop_id)
        if property:
            if not user.is_superuser and not user.is_staff and not property.tenant == user:
                return Response(
                    {"Not authorised to make a request for this property information"},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            penalties = Penalty.objects.get(property=property.pk)
            if year and month:
                penalties = penalties.get(filter())
        else: 
            return Response(
                {"Property Not Found"},
                status=status.HTTP_404_NOT_FOUND
            )
    else:
        penalties = Penalty.objects.get()
        
        


    # tenant request : property


@api_view(['GET'])
def getPropertyRevenue(request):
    # check for authrisation admin or superuser or tenant
    user = request.user
    property_id = request.query_params.get('property_id')
    property = Property.objects.filter(id = property_id).last()
    
    if not user.is_staff and not user.is_superuser and not property.current_tenant == user:
        return Response(
            {'error': 'You are not authorized to request for this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    print("authorised user")
    try:
        property = request.query_params.get('id')        
        if property:
            try:
                user_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property)
                fin_model = get_object_or_404(UserFinancialModel, property=property)
                penalty_tracker = get_object_or_404(PropertyPenaltyTracker, property_id=property)
            except Exception as e:
                print(f"Skipping property {property.id} due to missing tracker: {str(e)}")
                return Response(
                        {'error':"property has no payment tracker " + str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            

            financial_object = FinancialModel(
                cost_per_unit=fin_model.cost_per_unit,
                target_rental_yield=fin_model.target_rental_yield,
                init_down_payment=fin_model.init_down_payment,
                annual_rent_increase=fin_model.annual_rent_increase,
                annual_home_value_increase=fin_model.annual_home_value_increase,
                years_to_pay_init_cost=int(fin_model.years_to_pay_init_cost),
                per_unit_markup_cost=fin_model.per_unit_markup_cost,
                annual_equity_pymt_increase=fin_model.annual_equity_pymt_increase
            )
        
            finModel = financial_object.compute_model()
            for f in finModel:
                print("--"*10, f, finModel[f], "\n")

            pymt_tracker_object = PaymentTracker(user_tracker, fin_model, penalty_tracker)
            print("No quryset so far")
            revenue_data = pymt_tracker_object.compute_revenue(start_date=request.query_params.get('start_date'), end_date=request.query_params.get('end_date'))
            return Response(revenue_data, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error':"property ID required"},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def getDeveloperProjectRevenue(request):
    # check for authorization: admin or superuser or tenant
    user = request.user
    if not user.is_staff and not user.is_superuser: 
        return Response(
            {'error': 'You are not authorized to request this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    print("authorized user")
    
    try:
        project_id = request.query_params.get('project_id')
        if not project_id:
            return Response(
                {'error': "project ID required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        allProperties = Property.objects.filter(developer_project=project_id)
        print(allProperties)
        
        revenue_data_list = []
        
        for property in allProperties:
            if property:
                print(property)
                try:
                    user_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property)
                    fin_model = get_object_or_404(UserFinancialModel, property=property)
                    penalty_tracker = get_object_or_404(PropertyPenaltyTracker, property_id=property)
                except Exception as e:
                    print(f"Skipping property {property.id} due to missing tracker: {str(e)}")
                    continue
                
                financial_object = FinancialModel(
                    cost_per_unit=fin_model.cost_per_unit,
                    target_rental_yield=fin_model.target_rental_yield,
                    init_down_payment=fin_model.init_down_payment,
                    annual_rent_increase=fin_model.annual_rent_increase,
                    annual_home_value_increase=fin_model.annual_home_value_increase,
                    years_to_pay_init_cost=int(fin_model.years_to_pay_init_cost),
                    per_unit_markup_cost=fin_model.per_unit_markup_cost,
                    annual_equity_pymt_increase=fin_model.annual_equity_pymt_increase
                )
            
                finModel = financial_object.compute_model()
                for f in finModel:
                    print("--" * 10, f, finModel[f], "\n")

                pymt_tracker_object = PaymentTracker(user_tracker, fin_model, penalty_tracker)
                print("No queryset so far")
                revenue_data = pymt_tracker_object.compute_revenue(
                    start_date=request.query_params.get('start_date'), 
                    end_date=request.query_params.get('end_date')
                )
                revenue_data_list.append(revenue_data)
        
        return Response(revenue_data_list, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {'error': str(e) + " FAILED TO COMPLETE"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def getDeveloperRevenue(request):
    # Check for authorization: admin or superuser or tenant
    user = request.user
    if not user.is_staff and not user.is_superuser:
        return Response(
            {'error': 'You are not authorized to request this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    print("authorized user")

    try:
        developer_id = request.query_params.get('developer_id')
        if not developer_id:
            return Response(
                {'error': "developer ID required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        allProjects = DeveloperProject.objects.filter(developer=developer_id)
        revenue_data_list = []
        
        for project in allProjects:
            allProperties = Property.objects.filter(developer_project=project.id)
            for property in allProperties:
                if property:
                    print(property)
                    try:
                        user_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property)
                        fin_model = get_object_or_404(UserFinancialModel, property=property)
                        penalty_tracker = get_object_or_404(PropertyPenaltyTracker, property_id=property)
                    except Exception as e:
                        print(f"Skipping property {property.id} due to missing tracker: {str(e)}")
                        continue
                    
                    financial_object = FinancialModel(
                        cost_per_unit=fin_model.cost_per_unit,
                        target_rental_yield=fin_model.target_rental_yield,
                        init_down_payment=fin_model.init_down_payment,
                        annual_rent_increase=fin_model.annual_rent_increase,
                        annual_home_value_increase=fin_model.annual_home_value_increase,
                        years_to_pay_init_cost=int(fin_model.years_to_pay_init_cost),
                        per_unit_markup_cost=fin_model.per_unit_markup_cost,
                        annual_equity_pymt_increase=fin_model.annual_equity_pymt_increase
                    )
                
                    finModel = financial_object.compute_model()
                    for f in finModel:
                        print("--" * 10, f, finModel[f], "\n")

                    pymt_tracker_object = PaymentTracker(user_tracker, fin_model, penalty_tracker)
                    print("No queryset so far")
                    revenue_data = pymt_tracker_object.compute_revenue(
                        start_date=request.query_params.get('start_date'), 
                        end_date=request.query_params.get('end_date')
                    )
                    revenue_data_list.append(revenue_data)
        
        return Response(revenue_data_list, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def getPropertyMonthlySummary(request):
    user = request.user
    property_id = request.query_params.get('property_id')
    property = Property.objects.filter(id = property_id).last()

    if not user.is_staff and not user.is_superuser and not property.current_tenant == user:
        return Response(
            {'error': 'You are not authorized to request for this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        if property_id:
            try:
                user_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property_id)
                fin_model = get_object_or_404(UserFinancialModel, property_id=property_id)
                penalty_tracker = get_object_or_404(PropertyPenaltyTracker, property_id=property_id)
            except Exception as e:
                return Response(
                    {'error': f"Property {property_id} has no payment tracker: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            financial_object = FinancialModel(
                cost_per_unit=fin_model.cost_per_unit,
                target_rental_yield=fin_model.target_rental_yield,
                init_down_payment=fin_model.init_down_payment,
                annual_rent_increase=fin_model.annual_rent_increase,
                annual_home_value_increase=fin_model.annual_home_value_increase,
                years_to_pay_init_cost=int(fin_model.years_to_pay_init_cost),
                per_unit_markup_cost=fin_model.per_unit_markup_cost,
                annual_equity_pymt_increase=fin_model.annual_equity_pymt_increase
            )
            financial_object_res = financial_object.compute_model()
            pymt_tracker_object = PaymentTracker(user_tracker, financial_object_res, penalty_tracker)
            summary_data = pymt_tracker_object.monthly_payments_info()
            
            return Response(summary_data, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Property ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def getEquityGrowth(request):
    user = request.user
    property_id = request.query_params.get('property_id')
    property = Property.objects.filter(id = property_id).last()
    
    if not user.is_staff and not user.is_superuser and not property.current_tenant == user:
        return Response(
            {'error': 'You are not authorized to request for this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        if property_id:
            try:
                user_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property_id)
                fin_model = get_object_or_404(UserFinancialModel, property_id=property_id)
                penalty_tracker = get_object_or_404(PropertyPenaltyTracker, property_id=property_id)
            except Exception as e:
                return Response(
                    {'error': f"Property {property_id} has no payment tracker: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            financial_object = FinancialModel(
                cost_per_unit=fin_model.cost_per_unit,
                target_rental_yield=fin_model.target_rental_yield,
                init_down_payment=fin_model.init_down_payment,
                annual_rent_increase=fin_model.annual_rent_increase,
                annual_home_value_increase=fin_model.annual_home_value_increase,
                years_to_pay_init_cost=int(fin_model.years_to_pay_init_cost),
                per_unit_markup_cost=fin_model.per_unit_markup_cost,
                annual_equity_pymt_increase=fin_model.annual_equity_pymt_increase
            )
            financial_object_res = financial_object.compute_model()
            pymt_tracker_object = PaymentTracker(user_tracker, financial_object_res, penalty_tracker)
            equity_data = pymt_tracker_object.equity_cumm_detail()

            return Response(equity_data, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Property ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def getPropertyTenantData(request):
    current_date = datetime.now().date()
    user = request.user
    property_id = request.query_params.get('property_id')
    tenant_id = request.query_params.get('tenant_id')
    if not property_id and not tenant_id:
        return Response(
            {'error': 'Property ID or tenant ID  is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    if tenant_id:
        property = Property.objects.filter(current_tenant=tenant_id).last()
    
    property = Property.objects.filter(id=property_id).last()
    
    if not property:
        return Response(
            {'error': 'Property not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    if not user.is_staff and not user.is_superuser and property.current_tenant != user:
        return Response(
            {'error': 'You are not authorized to request this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    tenant = property.current_tenant
    developer_project = property.developer_project
    pymt_tracker = get_object_or_404(PropertyPaymentTracker, property_id=property_id)
    month_pymnt = pymt_tracker.equity_progress[str(current_date.year)][str(current_date.month)]['amount_to_be_paid'] + pymt_tracker.rent_progress[str(current_date.year)][str(current_date.month)]['amount_to_be_paid']
    month_pymnt_paid = pymt_tracker.equity_progress[str(current_date.year)][str(current_date.month)]['amount_paid'] + pymt_tracker.rent_progress[str(current_date.year)][str(current_date.month)]['amount_paid']
    progress = pymt_tracker.last_paid_date_rent
    data = {
        'number_of_bedrooms': developer_project.no_of_bedrooms, 
        'unit_type': developer_project.unit_type,
        'bedroom_size': developer_project.bedroom_size,
        'bedroom_price': developer_project.bedroom_price,
        'amenities': developer_project.amenities,
        'location': developer_project.location,
        'location_gps': '5.614817,−0.205874',
        # 'image': property.display_photo,
        'area': developer_project.bedroom_size, 
        'house_number': property.id, 
        'tenant_name': tenant.f_name + ' ' + tenant.l_name,
        'project_name': developer_project.project_name,
        'next_month_rentals': month_pymnt, 
        'next_month_paid_rentals': month_pymnt_paid,
        'last_month_paid': progress,
        'date_acquired': property.date_created,
        'tenant_application_number': tenant.nationalID,
    }
    
    return Response(data, status=status.HTTP_200_OK)



# def addPaymentSchedule


@api_view(['GET'])
def getFinancialModel(request):
    """Returns a users financial model"""


    # Get property
    property_id = request.query_params.get('property_id')

    # Query for users parameters
    user_model_parms  = UserFinancialModel.objects.get(id=property_id)

    # Build financial model
    user_model = FinancialModel(cost_per_unit=user_model_parms.cost_per_unit,
                                target_rental_yield=user_model_parms.target_rental_yield,
                                init_down_payment=user_model_parms.init_down_payment,
                                annual_rent_increase=user_model_parms.annual_rent_increase,
                                annual_home_value_increase=user_model_parms.annual_home_value_increase,
                                years_to_pay_init_cost=int(user_model_parms.years_to_pay_init_cost),
                                per_unit_markup_cost=user_model_parms.per_unit_markup_cost,
                                annual_equity_pymt_increase=user_model_parms.annual_equity_pymt_increase
                                )


    user_model.compute_model()

    data = user_model.computed_model

    return JsonResponse(data=data, safe=False, status=200)














