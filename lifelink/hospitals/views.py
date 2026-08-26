from django.shortcuts import render

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, filters

from .models import Hospital
from .serializers import HospitalSerializer
from .filters import HospitalFilter
from .pagination import HospitalPagination
from .permissions import IsOwnerOrAdmin


class HospitalCreateAPIView(generics.CreateAPIView):

    serializer_class = HospitalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HospitalListAPIView(generics.ListAPIView):

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = HospitalFilter

    search_fields = [
        "hospital_name",
        "registration_number",
        "city",
    ]

    ordering_fields = [
        "hospital_name",
        "created_at",
    ]

    pagination_class = HospitalPagination


class HospitalDetailAPIView(generics.RetrieveAPIView):

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    permission_classes = [permissions.IsAuthenticated]


class HospitalUpdateAPIView(generics.UpdateAPIView):

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]


class HospitalDeleteAPIView(generics.DestroyAPIView):

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]