from django.shortcuts import render
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import BloodBank
from .serializers import BloodBankSerializer
from .filters import BloodBankFilter
from .pagination import BloodBankPagination
from .permissions import IsOwnerOrAdmin


class BloodBankCreateAPIView(generics.CreateAPIView):

    serializer_class = BloodBankSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BloodBankListAPIView(generics.ListAPIView):

    queryset = BloodBank.objects.all()
    serializer_class = BloodBankSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = BloodBankFilter

    search_fields = [
        "blood_bank_name",
        "city",
        "license_number",
    ]

    ordering_fields = [
        "blood_bank_name",
        "available_units",
        "created_at",
    ]

    pagination_class = BloodBankPagination


class BloodBankDetailAPIView(generics.RetrieveAPIView):

    queryset = BloodBank.objects.all()
    serializer_class = BloodBankSerializer
    permission_classes = [permissions.IsAuthenticated]


class BloodBankUpdateAPIView(generics.UpdateAPIView):

    queryset = BloodBank.objects.all()
    serializer_class = BloodBankSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]


class BloodBankDeleteAPIView(generics.DestroyAPIView):

    queryset = BloodBank.objects.all()
    serializer_class = BloodBankSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]