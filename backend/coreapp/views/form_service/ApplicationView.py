from datetime import datetime, timedelta, timezone
import uuid
from django.utils.dateparse import parse_datetime
from decimal import Decimal
import json
from django.db import transaction
from django.forms import JSONField
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from coreapp.models import *
from rest_framework import status
from ...serializer import ApplicationSerializer, PropertySerializer
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
# from althomeownership.coreapp.serializer import ApplicationSerializer, PropertySerializer
from ...models import Application, Notification, TenantInfo, CustomUser

from django.core.mail import send_mail
from ...backend_systems.application_form import form_helper
from ...backend_systems.application_form.forms import *
from ...backend_systems.notifications.notifications_main import Notifications
from rest_framework.permissions import IsAuthenticated, AllowAny
import traceback
# from django.views.decorators.cache import cache_page

User = get_user_model()
# @cache_page(60 * 5)
@api_view(['GET'])
def getApplications(request):
    permission_classes = [AllowAny] 
    try:
        
        applications = Application.objects.all()
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)
    except Application.DoesNotExist:
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getApplication(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            return Response(serializer.data)
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@api_view(['GET'])
@csrf_exempt
@permission_classes([AllowAny])
def getApplicationBySections(request):
    id = request.query_params.get('id')
    try:
        email = request.query_params.get('email')
    except Exception as e:
        pass

    try:
        if id:
            application = Application.objects.get(id=id)
        else:
            application = Application.objects.get(email=email)

        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_all_sections()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No data found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getApplicantInfo(request,id, section_num):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            
            if section_num == 1:
                data = formHelperObject.get_personal_info()
            elif section_num == 2:
                data = formHelperObject.get_previous_address_info()
            elif section_num == 3:
                data = formHelperObject.get_employment_details()
            elif section_num == 4:
                data = formHelperObject.get_bank_details()
            elif section_num == 5:
                data = formHelperObject.get_preferred_address_info()
            elif section_num == 6:
                data = formHelperObject.get_references()
            elif section_num == 7:
                data = formHelperObject.get_declaration_info()
            elif section_num == 8:
                data = formHelperObject.get_official_use()
            
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No Data on section {section_num} found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getPreviousAddressInfo(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_previous_address_info()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No previous address information found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getPreferredAddressInfo(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_preferred_address_info()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No preferred address information found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getEmploymentDetails(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_employment_details()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No employment details found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getBankDetails(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_bank_details()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No bank details found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getReferences(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_references()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No references found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getDeclarationInfo(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_declaration_info()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No declaration information found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def getOfficialUse(request, id):
    try:
        application = Application.objects.get(id=id)
        if application:
            serializer = ApplicationSerializer(application)
            formHelperObject = form_helper.AppForm(serializer.data)
            data = formHelperObject.get_official_use()
            if data:
                return Response(data)
            else:
                return Response(
                    {'error': 'No official use information found.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(
            {'error': 'Application not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def addNewApplication(request):
    date_cutoff = datetime.now(tz=timezone.utc) - timedelta(days=180)
    try:
        email_used = Application.objects.filter(email=request.data['email']).last()
        national_id_used = False
        if email_used or national_id_used:
            print("email_used")
            return Response(
              
                {'error': 'You have applied for the RTO scheme already, login and check the portal for your application progress.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        print("clean email")
        request.data['nationalID'] = request.data['id_card_number']

        form = ApplicationForm(request.data)

        if form.is_valid():
            print('form valid')
            try:
                with transaction.atomic():
                    application = form.save()

                    email = request.data['email']
                    extra_fields = {
                        'f_name': request.data['first_name'], 
                        'l_name': request.data['surname'], 
                        'other_names': request.data['other_names'], 
                        'dob': request.data['dob'], 
                        'nationalID': request.data['id_card_number'], 
                        'is_staff': False, 
                        'is_superuser': False, 
                        'is_active': False
                    }
                    if not User.objects.filter(email=email).exists():
                        user = User.objects.create_user(email=email, password=None, **extra_fields)
                        user.save()

                    # Return successful submission response
                    print("Application submitted successfully")
                    response = Response({'message': 'Application submitted successfully'}, status=status.HTTP_201_CREATED)

                    # Attempt to send notification
                    try:
                        new_notification = Notifications()
                        # new_notification.acknowldge_application(user)
                        # new_notification.notify_new_application(user)
                        response.data['notification'] = email
                    except Exception as notification_error:
                        # Log the notification error
                        traceback.print_exc()
                        print("Notification error:", str(notification_error))
                        response.data['notification_error'] = 'Error: Notification could not be sent'

                    return response

            except Exception as e:
                print("Error:", str(e))
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print("Error:", form.errors)
            return Response({'error': form.errors}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("Error:", str(e))
        traceback.print_exc()

        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def updateApplication(request):
    user = request.user
    if not user.is_staff and not user.is_superuser:
        return Response(
            {'error': 'You are not authorized to request this data'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        application_id = request.data['id']
        if not application_id:
            return Response(
                {'error': 'Application ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        application = Application.objects.get(id=application_id)
        
        serializer = ApplicationSerializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response_data = serializer.data

            if serializer.data.get('approved') is True:
                # make date updates to the application
                application.date_verification_completed = datetime.now()
                application.save()

                # Send notification to all admins
                new_notification = Notifications()
                
            
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Application.DoesNotExist:
        return Response(
            {'error': 'Application not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        # Log the error message for debugging
        print(f"Error updating application: {str(e)}")
        return Response(
            {'error': 'Something went wrong when updating application ...'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
      
                
        
    

