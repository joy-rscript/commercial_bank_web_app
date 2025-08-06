# 015: input data from developers: 00
# 020: import customer data from a csv
# B006: allocate home
# B007: deallocate home
# B009: email notification of home
# B015: view date of allocation
# B018 ??
# B022
import traceback

from django.http import JsonResponse, HttpRequest, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status

from ...models import Developer, DeveloperProject
from ...serializer import DeveloperSerializer, DeveloperProjectSerializer
from django.contrib.auth.decorators import user_passes_test
from ...backend_systems.custom_auth.CustomAuthorization import *

@api_view(['POST'])
@user_passes_test(soft_eng_required)
def createDeveloper(request) -> HttpResponse | JsonResponse:
    serialized_data = DeveloperSerializer(data=request.data)
    print(serialized_data)

    if serialized_data.is_valid():
        try:
            # Tries insertion, fails if there is a duplicate
            serialized_data.save()
        except Exception as e:
            print(e)
            return HttpResponse(content=f"An error occurred. There may be a duplicate", status=500)

        return HttpResponse(content=f"Developer {request.data.get('developer_name')} created", status=201)
    else:
        print("eerrors in serilaiser,", serialized_data.errors)
        return JsonResponse(serialized_data.errors, status=400)

@api_view(['DELETE'])
def deleteDeveloper(request) -> HttpResponse | JsonResponse:

    # Check request contains an integer value
    developer_id = request.data.get('developer_id')
    if not DeveloperSerializer.validate_id(developer_id = developer_id):
        return HttpResponse(content="An invalid ID has been provided", status= 400)

    # Tries to delete, fails if the record does not delete
    try:
        developer = Developer.objects.get(id = developer_id)
        developer.delete()
    except Exception as e:
        print(e)
        return HttpResponse(content="Provided ID does not exist", status= 400)

    return HttpResponse(content=f"Developer with ID {developer} deleted succesfully", status= 200)

@api_view(['PATCH'])
def updateDeveloper(request) -> HttpResponse | JsonResponse:

    # Check request contains a valid id
    developer_id = request.data.get('id')
    if not DeveloperSerializer.validate_id(developer_id=developer_id):
        return HttpResponse(content="An invalid ID has been provided", status=400)

    # Get old record
    try:
        old_record = Developer.objects.get(id=developer_id)
    except Exception as e:
        return HttpResponse(content=f"An error occurred. Developer might not exist", status=500)

    # Update record
    serialized_data = DeveloperSerializer(old_record, data = request.data, partial = True)
    if serialized_data.is_valid():
        try:
            updated_record = serialized_data.save()
            return HttpResponse(content=f"Developer {request.data.get('developer_name')} updated", status=201)
        except Exception as e:
            print(e)
            return HttpResponse(content=f"An error occurred.", status=500)
    else:
        return JsonResponse(serialized_data.errors, status=400)

@api_view(['GET'])
def getDeveloper(request):
    # Check request contains a valid id
    developer_id = request.query_params.get('id')
    if not developer_id or not developer_id.isdigit():
        return Response(
            {'error': 'An invalid ID has been provided'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        
        developer_info = Developer.objects.get(id=int(developer_id))
        developer_info = DeveloperSerializer(developer_info)
        return Response(developer_info.data, status=status.HTTP_200_OK)
    except Developer.DoesNotExist:
        return Response(
            {'error': 'The developer does not exist'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return HttpResponse(content="An error occurred. The developer might not exist", status=404)


api_view(['GET'])
def getAllDevelopers(request) -> HttpResponse | JsonResponse:

    try:
        # Initialize the dict to store all the data
        developer_data = {}

        # Get all developers
        all_developers = Developer.objects.all()

        # Build data
        for developer in all_developers:
            developer_data[developer.developer_name] = {}

            # get all developer projects
            developer_projects = DeveloperProject.objects.filter(developer_id=developer)

            for project in developer_projects:
                serialized_data = DeveloperProjectSerializer(project).data
                developer_data[developer.developer_name][project.project_name] = serialized_data
    except Exception as e:
        print(e)
        traceback.print_exc()
        return HttpResponse(content="An error occurred. The developer might not exist", status=404)


    return JsonResponse(data=developer_data, status=200)



