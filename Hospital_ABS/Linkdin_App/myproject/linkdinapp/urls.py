from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import StudentViewSet

router = DefaultRouter()
router.register('students', StudentViewSet)

urlpatterns = []
urlpatterns += router.urls

# urlpatterns = [
#     path('student',views.HomePageView.as_view(),name='home'),
#     path('AddStudent',views.AddStudentView.as_view(),name='AddStudent'),
#     path('student/<int:pk>',views.StudentView.as_view(),name='student'),
#     path('editStudent/<int:pk>',views.StudentUpdateView.as_view(),name='editStudent'),
#     path('deleteStudent/<int:pk>',views.StudentDeleteView.as_view(),name='deleteStudent'),
# ]