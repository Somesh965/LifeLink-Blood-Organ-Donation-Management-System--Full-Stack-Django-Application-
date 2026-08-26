from django.urls import path
from .views import (
    RecipientCreateAPIView,
    RecipientListAPIView,
    RecipientDetailAPIView,
    RecipientUpdateAPIView,
    RecipientDeleteAPIView,
)

urlpatterns = [
    path("", RecipientListAPIView.as_view(), name="recipient-list"),
    path("create/", RecipientCreateAPIView.as_view(), name="recipient-create"),
    path("<int:pk>/", RecipientDetailAPIView.as_view(), name="recipient-detail"),
    path("<int:pk>/update/", RecipientUpdateAPIView.as_view(), name="recipient-update"),
    path("<int:pk>/delete/", RecipientDeleteAPIView.as_view(), name="recipient-delete"),
]