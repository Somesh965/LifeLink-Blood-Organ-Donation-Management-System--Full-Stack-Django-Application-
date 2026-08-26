from django.urls import path
from .views import (
    DonorCreateAPIView,
    DonorListAPIView,
    DonorDetailAPIView,
    DonorUpdateAPIView,
    DonorDeleteAPIView,
)

urlpatterns = [
    path("", DonorListAPIView.as_view(), name="donor-list"),
    path("create/", DonorCreateAPIView.as_view(), name="donor-create"),
    path("<int:pk>/", DonorDetailAPIView.as_view(), name="donor-detail"),
    path("<int:pk>/update/", DonorUpdateAPIView.as_view(), name="donor-update"),
    path("<int:pk>/delete/", DonorDeleteAPIView.as_view(), name="donor-delete"),
]