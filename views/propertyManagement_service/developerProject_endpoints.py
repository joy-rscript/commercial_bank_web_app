import traceback

from django.http import JsonResponse, HttpRequest, HttpResponse
from rest_framework.decorators import api_view

from ...models import Developer, DeveloperProject
from ...serializer import DeveloperSerializer, DeveloperProjectSerializer

@api_view(['POST'])
def createDeveloperProject(request) -> HttpResponse | JsonResponse:
    serialized_data = DeveloperProjectSerializer(data=request.data)

    if serialized_data.is_valid():
        try:
            # Tries insertion, fails if there is a duplicate
            serialized_data.save()
        except Exception as e:
            print(e)
            return HttpResponse(content=f"An error occurred. There may be a duplicate", status=500)

        return HttpResponse(content=f"Developer project{request.data.get('project_name')} created", status=201)
    else:
        return JsonResponse(serialized_data.errors, status=400)


@api_view(['DELETE'])
def deleteDeveloperProject(request) -> HttpResponse | JsonResponse:

    # Check request contains an integer value
    project_id = request.data.get('project_id')
    if not DeveloperProjectSerializer.validate_id(id = project_id):
        print(">>>>>>>>>",project_id)
        return HttpResponse(content="An invalid ID has been provided", status= 400)

    # Tries to delete, fails if the record does not delete
    try:
        developer = DeveloperProject.objects.get(id = project_id)
        developer.delete()
    except Exception as e:
        print(e)
        return HttpResponse(content="Provided ID does not exist", status= 400)

    return HttpResponse(content=f"Developer Project with ID {project_id} deleted succesfully", status= 200)

@api_view(['PATCH'])
def updateDeveloperProject(request) -> HttpResponse | JsonResponse:

    # Check request contains a valid id
    project_id = request.data.get('id')
    if not DeveloperProjectSerializer.validate_id(id=project_id):
        return HttpResponse(content="An invalid ID has been provided", status=400)

    # Get old record
    try:
        old_record = DeveloperProject.objects.get(id=project_id)
    except Exception as e:
        return HttpResponse(content=f"An error occurred. Developer project might not exist", status=500)

    # Update record
    serialized_data = DeveloperProjectSerializer(old_record, data=request.data, partial=True)
    if serialized_data.is_valid():
        try:
            updated_record = serialized_data.save()
            return HttpResponse(content=f"Developer Project with {project_id} updated", status=201)
        except Exception as e:
            print(e)
            return HttpResponse(content=f"An error occurred.", status=500)
    else:
        return JsonResponse(serialized_data.errors, status=400)


@api_view(['GET'])
def getDeveloperProject(request) -> HttpResponse | JsonResponse:
    # Check request contains a valid id
    project_id = request.GET.get('id')
    print("invalid :", project_id)
    if project_id == "2":
        print(project_id)
    if not DeveloperProjectSerializer.validate_id(id=int(project_id)):
        return HttpResponse(content="An invalid ID has been provided !!!!!", status=400)

    try: # Try to get developer, fails if developer does not exist
        developer_info = DeveloperProject.objects.get(id=project_id)
        developer_info = DeveloperProjectSerializer(developer_info)
        return JsonResponse(developer_info.data, status=200)
    except Exception as e:
        return HttpResponse(content="An error occurred. The developer might not exist", status=404)


@api_view(['GET'])
def getAllDeveloperProjects(request) -> HttpResponse | JsonResponse:
    try:
        project_data = {}
        projects = DeveloperProject.objects.all()

        for project in projects:
            project_data[project.project_name] = DeveloperProjectSerializer(project).data

    except Exception as e:
        print(e)
        traceback.print_exc()
        return HttpResponse(content="An error occurred", status=404)

    return JsonResponse(project_data, status=200)
