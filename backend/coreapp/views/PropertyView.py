from ..serializer import DeveloperInfoSerializer, PropertySerializer
from ..models import DeveloperInfo, Property
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, AllowAny


@api_view(['POST'])
def createDeveloper(self, request):
    try:
        user = request.user

        if not user.is_superuser and not user.user_type == 'admin' and not user.user_type == 'gcb_admin':
            return Response(
                {'error': 'You are not authorized to create a new Developer this action'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data
        serializer = DeveloperInfoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
                )
        else:
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def createProperty(self, request, dev_id):
    try:
        user = request.user 
        
        if not user.is_superuser and not user.user_type == 'software_engineer' and not user.user_type == 'admin' and not user.user_type == 'gcb_admin':
            return Response(
                {'error': 'You are not authorized to create a new Property this action'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data
        
        print(data['rent_type'])

        serializer = PropertySerializer(data=data)
        
        if serializer.is_valid():
            
            try:
                if data['dev_id']:
                    developer_info_object = DeveloperInfo.objects.get(id='dev_id')
                    print(serializer)
                    property_instance = serializer.save()
                    print(property_instance)
                    property_instance.real_est_developer_info = developer_info_object
                    
            except:
                return Response(
                    {'error': 'Developer does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

            property_instance.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
 
        else:
            return Response(
                {
                    'error': serializer.errors
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    except:
        return Response(
            {'error': 'Something went wrong when adding property ...'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

