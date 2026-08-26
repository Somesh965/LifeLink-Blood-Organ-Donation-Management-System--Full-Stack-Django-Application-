from django.urls import path

from .views import (
    BloodRequestCreateAPIView,
    BloodRequestListAPIView,
    BloodRequestDetailAPIView,
    BloodRequestUpdateAPIView,
    BloodRequestDeleteAPIView,
)

urlpatterns = [

    path("", BloodRequestListAPIView.as_view(), name="blood-request-list"),

    path("create/",BloodRequestCreateAPIView.as_view(),name="blood-request-create",),

    path("<int:pk>/",BloodRequestDetailAPIView.as_view(),name="blood-request-detail",),

    path("<int:pk>/update/",BloodRequestUpdateAPIView.as_view(),name="blood-request-update",),

    path("<int:pk>/delete/",BloodRequestDeleteAPIView.as_view(),name="blood-request-delete",),
]