from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from django.core.cache import cache
from django.conf import settings
from .suppliments import bada_data
from .serializers import *
from .threads import *
from .models import *
from .utils import *
import random


@api_view(["POST"])
def google_authentication(request):
    try:
        ser = GoogleSocialAuthSerializer(data=request.data)
        if ser.is_valid():
            user_info = id_token.verify_oauth2_token(ser.data["token_id"], requests.Request(), settings.GOOGLE_CLIENT_ID)
            if not UserModel.objects.filter(email=user_info["email"]).exists():
                customer_obj = UserModel.objects.create(
                    email = user_info["email"],
                    name = user_info["name"],
                )
                customer_obj.set_password(settings.SOCIAL_SECRET)
                customer_obj.save()
            customer_obj = UserModel.objects.get(email=user_info["email"])
            user = authenticate(email=customer_obj.email, password=settings.SOCIAL_SECRET)
            if not user:
                return Response({"message":"Incorrect password"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            jwt_token = RefreshToken.for_user(user)
            return Response({"message":"Login successfull", "token":str(jwt_token.access_token)}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"message": "Invalid or Expired toiken"}, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(["POST"])
def signUp(request):
    try:
        data = request.data
        serializer = signupSerializer(data=data)
        if serializer.is_valid():
            name = serializer.data["name"]
            email = serializer.data["email"]
            password = serializer.data["password"]
            if UserModel.objects.filter(email=email).first():
                return Response({"message":"Acount already exists."}, status=status.HTTP_406_NOT_ACCEPTABLE)
            new_customer = UserModel.objects.create(
                email = email,
                name = name,
            )
            new_customer.set_password(password)
            new_customer.save()
            return Response({"message":"Account created"}, status=status.HTTP_201_CREATED)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def logIn(request):
    try:
        data = request.data
        serializer = loginSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data["email"]
            password = serializer.data["password"]
            customer_obj = UserModel.objects.filter(email=email).first()
            if customer_obj is None:
                return Response({"message":"Account does not exist"}, status=status.HTTP_404_NOT_FOUND)
            user = authenticate(email=email, password=password)
            if not user:
                return Response({"message":"Incorrect password"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            jwt_token = RefreshToken.for_user(user)
            return Response({"message":"Login successfull", "token":str(jwt_token.access_token)}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def forgot(request):
    try:
        data = request.data
        serializer = emailSerializer(data=data)
        if serializer.is_valid():
            email = serializer.data["email"]
            user_obj = UserModel.objects.filter(email=email).first()
            if not user_obj:
                return Response({"message": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
            if user_obj.auth_provider != "email":
                return Response({"message": "Login using Google Auth"}, status=status.HTTP_401_UNAUTHORIZED)
            thread_obj = send_forgot_link(email)
            thread_obj.start()
            return Response({"message":"reset mail sent"}, status=status.HTTP_200_OK)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def reset(request):
    try:
        data = request.data
        serializer = otpSerializer(data=data)
        if serializer.is_valid():
            otp = serializer.data["otp"]
            if not cache.get(otp):
                return Response({"message":"OTP expired"}, status=status.HTTP_408_REQUEST_TIMEOUT)
            if not UserModel.objects.filter(email=cache.get(otp)).first():
                return Response({"message":"user does not exist"}, status=status.HTTP_404_NOT_FOUND)
            user_obj = UserModel.objects.get(email=cache.get(otp))
            user_obj.set_password(serializer.data["pw"])
            user_obj.save()
            return Response({"message":"Password changed successfull"}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



########################################################################################################################################################


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def members_list_view(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = FamilyMemberSerializer(user.family_member.all(), many=True)
        return Response(ser.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addMember(request):
    try:
        ser = signupSerializer(data = request.data)
        if ser.is_valid():
            FamilyMemberModel.objects.create(
                user = UserModel.objects.get(email=request.user.email),
                name = ser.data["name"],
                phone = ser.data["phone"],
                email = ser.data["email"],
                relation = ser.data["relation"]
            )
            return Response({"message":"Family Member Added"}, status=status.HTTP_202_ACCEPTED)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class MemberRUD(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = FamilyMemberModel.objects.all()
    serializer_class = FamilyMemberSerializer
    lookup_field = "id"


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_personal_data(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = UserPersonalDataSerializer(data = request.data)
        if ser.is_valid():
            user.height = ser.data["height"]
            user.weight = ser.data["weight"]
            user.dob = ser.data["dob"]
            user.gender = ser.data["gender"]
            user.save()
            return Response({"message": "User Data Saved"}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ecg_input(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = ScrollInputSerializer(data = request.data)
        if ser.is_valid():
            val = ser.data["value"]
            if val not in range(1,6):
                return Response({"message": "Invalid Range"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            output, text = ecg_classification(bada_data[val])
            if output == 2:
                thread_obj = send_notification(user.family_member.all(), ser.data["lattitude"], ser.data["longitude"])
                thread_obj.start()
            return Response({"message": text}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def bs_hr_input(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = BS_HR_Input_Serializer(data = request.data)
        if ser.is_valid():
            if int(ser.data["bs"]) > 120 :
                bs = 1
            else:
                bs = 0
            if user.gender == "MALE":
                out = hypertension_classifier(user.get_age(), 1, ser.data["hr"], bs, 0)
            else:
                out = hypertension_classifier(user.get_age(), 0, ser.data["hr"], bs, 0)
            return Response({"hypertension": out}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def step_cal_dist_input(request):
    try:
        user = UserModel.objects.get(email=request.user.email)
        ser = Step_Cal_Dist_Input_Serializer(data = request.data)
        if ser.is_valid():
            heart_rate = random.randint(100, 185)
            output = predict_activity(user.height, user.weight, ser.data["step"], ser.data["calory"], ser.data["distance"], heart_rate)
            return Response({"activity": output}, status=status.HTTP_200_OK)
        return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


