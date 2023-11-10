from google.auth.transport import requests
from rest_framework import serializers
from google.oauth2 import id_token
from django.conf import settings
from .models import *


class loginSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)
    password = serializers.CharField(required = True)


class signupSerializer(serializers.Serializer):
    name = serializers.CharField(required = True)
    email = serializers.EmailField(required = True)
    phone = serializers.CharField(required = False)
    relation = serializers.CharField(required = False)
    password = serializers.CharField(required = False)


class emailSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)


class GoogleSocialAuthSerializer(serializers.Serializer):
    token_id = serializers.CharField(required=True)
    def validate_token_id(self, token_id):
        try:
            idinfo = id_token.verify_oauth2_token(token_id, requests.Request(), settings.GOOGLE_CLIENT_ID)
            if (idinfo['iss']!='accounts.google.com'):
                raise serializers.ValidationError(
                    'The token is invalid or expired. Please login again.'
                )
            return token_id
        except Exception as e:
            print(e)


class otpSerializer(serializers.Serializer):
    otp = serializers.IntegerField(required = True)
    pw = serializers.CharField(required = False)


class FamilyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMemberModel
        fields = "__all__"

class ActivityPredictionModel(serializers.Serializer):
    steps = serializers.FloatField(required = True)
    calories = serializers.FloatField(required = True)
    distance = serializers.FloatField(required = True)
    heart_rate = serializers.FloatField(required = True)

class ScrollInputSerializer(serializers.Serializer):
    value = serializers.IntegerField(required = True)
    lattitude = serializers.CharField(required = True)
    longitude = serializers.CharField(required = True)

class UserPersonalDataSerializer(serializers.Serializer):
    height = serializers.FloatField(required = True)
    weight = serializers.FloatField(required = True)
    dob = serializers.DateField(required = True)
    gender = serializers.CharField(required = True)


class BS_HR_Input_Serializer(serializers.Serializer):
    bs = serializers.IntegerField(required = True)
    hr = serializers.IntegerField(required = True)


class Step_Cal_Dist_Input_Serializer(serializers.Serializer):
    step = serializers.IntegerField(required = True)
    calory = serializers.IntegerField(required = True)
    distance = serializers.IntegerField(required = True)

