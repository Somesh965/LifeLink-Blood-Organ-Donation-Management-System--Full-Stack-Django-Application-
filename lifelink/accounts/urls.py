from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .views import (
    RegisterUserView,
    LoginAPIView,
    ProfileAPIView,
    UpdateProfileAPIView,
    ChangePasswordAPIView,
    LogoutAPIView,
    ProfilePhotoUploadAPIView,

    ForgotPasswordAPIView,
    VerifyOTPAPIView,
    ResetPasswordAPIView,
)

# router = DefaultRouter()
# router.register("users", UserViewSet, basename="users")
# router.register("profiles", UserProfileViewSet, basename="profiles")
# router.register('register', RegisterUserView.as_view(), basename='register')
urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("profile/", ProfileAPIView.as_view(), name="profile"),
    path("profile/update/",UpdateProfileAPIView.as_view(),name="updateprofile"),
    path("changepassword/",ChangePasswordAPIView.as_view(),name="change-password"),
    path("token/", TokenObtainPairView.as_view(), name="token"),
    path("token/refresh/",TokenRefreshView.as_view(),name="token_refresh"),
    path("logout/",LogoutAPIView.as_view(),name="logout"),

    path("profile/photo/",ProfilePhotoUploadAPIView.as_view(),name="profile-photo-upload"),
    path("forgot-password/", ForgotPasswordAPIView.as_view(), name="forgot-password"),

    path("verify-otp/", VerifyOTPAPIView.as_view(), name="verify-otp"),

    path("reset-password/", ResetPasswordAPIView.as_view(), name="reset-password"),
]

# urlpatterns += router.urls