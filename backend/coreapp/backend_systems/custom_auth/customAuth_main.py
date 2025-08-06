from django.http import JsonResponse, HttpRequest, HttpResponse
from ... import models
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from ...models import CustomUser, RegistrationToken
# from ...serializer import
from django.urls import reverse


class AccountManager:
    link_head = 'http://localhost:5173/'
    account_setup_path = 'account/activate/'


    def generate_token(self, userObject, time_window):
        """Geneartes a unique token that can be used to fully setup a users account"""

        #TODO check that user does not already have a token

        try:
            new_token = RegistrationToken(user=userObject, min_time_window = time_window)
            new_token.save()
            token = RegistrationToken.objects.get(user = userObject).token
            full_link = f"{self.link_head}{self.account_setup_path}{str(token)}"
            print('the full llink is', full_link)
            return full_link

        except Exception as e:
            raise









