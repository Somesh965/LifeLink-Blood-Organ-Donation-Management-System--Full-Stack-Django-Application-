from django.urls import path

from .views import (
    BloodBankCreateAPIView,
    BloodBankListAPIView,
    BloodBankDetailAPIView,
    BloodBankUpdateAPIView,
    BloodBankDeleteAPIView,
)

urlpatterns = [

    path("", BloodBankListAPIView.as_view(), name="blood-bank-list"),

    path("create/", BloodBankCreateAPIView.as_view(), name="blood-bank-create"),

    path("<int:pk>/", BloodBankDetailAPIView.as_view(), name="blood-bank-detail"),

    path("<int:pk>/update/", BloodBankUpdateAPIView.as_view(), name="blood-bank-update"),

    path("<int:pk>/delete/", BloodBankDeleteAPIView.as_view(), name="blood-bank-delete"),
]