from django.urls import path

from .views import (
    OrganDonationCreateAPIView,
    OrganDonationListAPIView,
    OrganDonationDetailAPIView,
    OrganDonationUpdateAPIView,
    OrganDonationDeleteAPIView,
)

urlpatterns = [

    path("", OrganDonationListAPIView.as_view(), name="organ-donation-list"),

    path("create/",OrganDonationCreateAPIView.as_view(),name="organ-donation-create",),

    path("<int:pk>/",OrganDonationDetailAPIView.as_view(),name="organ-donation-detail",),

    path("<int:pk>/update/",OrganDonationUpdateAPIView.as_view(),name="organ-donation-update",),

    path("<int:pk>/delete/",OrganDonationDeleteAPIView.as_view(),name="organ-donation-delete",),
]