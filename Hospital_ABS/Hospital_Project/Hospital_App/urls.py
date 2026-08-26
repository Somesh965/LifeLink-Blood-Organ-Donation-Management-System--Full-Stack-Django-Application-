from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .api_views import (
    AppointmentViewSet,
    AppointmentListCreateAPIView,
    AppointmentDetailAPIView,
)
router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointment-api')

urlpatterns = [
    path('', views.home, name='home'),
    path('Hospital_App/', views.appointment_list, name='appointment-list'),
    path('Hospital_App/<int:pk>/', views.appointment_detail, name='appointment-detail'),
    path('Hospital_App/book/', views.AppointmentCreateView.as_view(), name='appointment-create'),
    path('Hospital_App/<int:pk>/update/', views.AppointmentUpdateView.as_view(), name='appointment-update'),
    path('Hospital_App/<int:pk>/delete/', views.AppointmentDeleteView.as_view(), name='appointment-delete'),


    path('api/', include(router.urls)),

    path('api/appointments-generic/', AppointmentListCreateAPIView.as_view(), name='appointment-list-create-api'),
    path('api/appointments-generic/<int:pk>/', AppointmentDetailAPIView.as_view(), name='appointment-detail-api'),
]
