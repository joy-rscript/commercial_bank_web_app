from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from coreapp.models import *
from rest_framework import permissions, status


# later implement rate limiting to prevent DOS attacks
User = get_user_model()

class CustomAPIView(APIView):
    def get_permissions(self):
        return {key: [permission() for permission in permissions] for key, permissions in self.permission_classes.items()}

    def check_permissions(self, request):
        method = request.method.lower()
        for permission in self.get_permissions()[method]:
            if not permission.has_permission(request, self):
                self.permission_denied(
                    request, message=getattr(permission, 'message', None)
                )

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            data = request.data
            name = data['name']
            email = data['email']
            is_superuser = data['is_superuser']
            is_staff = data['is_staff']
            is_active = data['is_active']
           
            password = data['password']
            re_password = data['re_password']   
             
            if password!= re_password:
                return Response(
                    {
                        'error': 'Passwords do not match'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                if len(password) >= 8:
                    pass
                    if not User.objects.filter(email=email).exists():
                        if not is_superuser:
                            user = User.objects.create_user(email=email, name=name, password=password)
                            user.is_superuser = False
                            user.save()
                
                        else:
                            user = User.objects.create_developer(email=email, name=name, password=password)
                            
                            user.save
                            return Response(
                                {
                                   'message': 'Developer account created successfully'
                                },
                                status=status.HTTP_201_CREATED
                            )
                    else:
                        return Response(
                            { 'error': ' Account already exists'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                else:
                    
                    return Response(
                        {
                            'error': 'Password must be at least 8 characters long'
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
            # check account exists
            return Response({'message': "User account created successfully"}, status=status.HTTP_201_CREATED)


        except:
            return Response(
                {
                    'error': 'Something went wrong when registering the account'
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
                


