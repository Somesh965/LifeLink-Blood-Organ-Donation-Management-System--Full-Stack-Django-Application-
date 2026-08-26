from django.urls import path

from .views import (
    DonationCreateAPIView,
    DonationListAPIView,
    DonationDetailAPIView,
    DonationUpdateAPIView,
    DonationDeleteAPIView,
)

urlpatterns = [

    path("", DonationListAPIView.as_view(), name="donation-list"),

    path("create/", DonationCreateAPIView.as_view(), name="donation-create"),

    path("<int:pk>/", DonationDetailAPIView.as_view(), name="donation-detail"),

    path("<int:pk>/update/", DonationUpdateAPIView.as_view(), name="donation-update"),

    path("<int:pk>/delete/", DonationDeleteAPIView.as_view(), name="donation-delete"),
]