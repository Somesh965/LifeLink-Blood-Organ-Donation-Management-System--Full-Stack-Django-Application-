from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import User, UserProfile
from rest_framework.response import Response
from .serializers import (UserRegistrationSerializer, LoginSerializer, ProfileSerializer,
                          UserProfileSerializer, ChangePasswordSerializer, LogoutSerializer,
                          ForgotPasswordSerializer,VerifyOTPSerializer,ResetPasswordSerializer)
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from .utils import otp_storage, generate_otp
from rest_framework.permissions import AllowAny






# Create your views here.
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        print("REGISTER DATA:", request.data)

        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=400)

        serializer.save()

        return Response(
            {
                "status": True,
                "message": "User registered successfully."
            },
            status=201,
        )
class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        print("=" * 50)
        print("REQUEST DATA:", request.data)

        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("SERIALIZER ERRORS:", serializer.errors)
            return Response(serializer.errors, status=400)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        print("USERNAME:", repr(username))
        print("PASSWORD:", repr(password))

        user = authenticate(
            request=request,
            username=username,
            password=password,
        )

        print("AUTH USER:", user)
        print("=" * 50)

        if user is None:
            return Response(
                {
                    "status": False,
                    "message": "Invalid username or password."
                },
                status=401,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "status": True,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            }
        )

class ProfileAPIView(generics.RetrieveAPIView):
        serializer_class = ProfileSerializer
        permission_classes = [permissions.IsAuthenticated]

        def get_object(self):
            return self.request.user

from .models import UserProfile

class UpdateProfileAPIView(generics.RetrieveUpdateAPIView):

    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile

class ChangePasswordAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = request.user

        if not user.check_password(serializer.validated_data["old_password"]):

            return Response(
                {
                    "status": False,
                    "message": "Old password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(serializer.validated_data["new_password"])
        user.save()

        return Response(
            {
                "status": True,
                "message": "Password changed successfully."
            },
            status=status.HTTP_200_OK
        )



class LogoutAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            token = RefreshToken(serializer.validated_data["refresh"])
            token.blacklist()

            return Response(
                {
                    "status": True,
                    "message": "Logout successful."
                },
                status=status.HTTP_200_OK
            )

        except Exception:

            return Response(
                {
                    "status": False,
                    "message": "Invalid refresh token."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
class ProfilePhotoUploadAPIView(APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def put(self, request):

        profile, created = UserProfile.objects.get_or_create(
            user=request.user
        )

        if "profile_image" in request.FILES:
            profile.profile_image = request.FILES["profile_image"]
            profile.save()

            return Response({
                "message": "Profile photo updated successfully",
                "image": profile.profile_image.url
            })

        return Response({
            "error": "No image uploaded"
        }, status=400)

class ForgotPasswordAPIView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:

            return Response(
                {
                    "status": False,
                    "message": "Email not found."
                },
                status=404
            )

        otp = generate_otp()

        otp_storage[email] = otp

        send_mail(
            "LifeLink Password Reset OTP",
            f"Your OTP is {otp}",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response(
            {
                "status": True,
                "message": "OTP sent successfully."
            }
        )
class ResetPasswordAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        print("ForgotPasswordAPIView reached")
        serializer = ResetPasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        otp = serializer.validated_data["otp"]

        if otp_storage.get(email) != otp:

            return Response(
                {
                    "status": False,
                    "message": "Invalid OTP"
                },
                status=400
            )

        user = User.objects.get(email=email)

        user.set_password(serializer.validated_data["new_password"])

        user.save()

        del otp_storage[email]

        return Response(
            {
                "status": True,
                "message": "Password Reset Successfully"
            }
        )
class VerifyOTPAPIView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        otp = serializer.validated_data["otp"]

        if otp_storage.get(email) != otp:

            return Response(
                {
                    "status": False,
                    "message": "Invalid OTP"
                },
                status=400
            )

        return Response(
            {
                "status": True,
                "message": "OTP Verified"
            }
        )

