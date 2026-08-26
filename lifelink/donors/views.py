from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Donor
from .serializers import DonorSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import DonorFilter
from .pagination import DonorPagination
from .permissions import IsOwnerOrAdmin


class DonorCreateAPIView(generics.CreateAPIView):
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DonorListAPIView(generics.ListAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = DonorFilter

    search_fields = [
        "user__username",
        "user__first_name",
        "user__last_name",
    ]

    ordering_fields = [
        "last_donation_date",
    ]
    pagination_class = DonorPagination

class DonorDetailAPIView(generics.RetrieveAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticated]


class DonorUpdateAPIView(generics.UpdateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin,]


class DonorDeleteAPIView(generics.DestroyAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin,]

