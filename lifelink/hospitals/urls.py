from django.urls import path

from .views import (
    HospitalCreateAPIView,
    HospitalListAPIView,
    HospitalDetailAPIView,
    HospitalUpdateAPIView,
    HospitalDeleteAPIView,
)

urlpatterns = [

    path("", HospitalListAPIView.as_view(), name="hospital-list"),

    path("create/", HospitalCreateAPIView.as_view(), name="hospital-create"),

    path("<int:pk>/", HospitalDetailAPIView.as_view(), name="hospital-detail"),

    path("<int:pk>/update/", HospitalUpdateAPIView.as_view(), name="hospital-update"),

    path("<int:pk>/delete/", HospitalDeleteAPIView.as_view(), name="hospital-delete"),
]