from django.shortcuts import render

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, filters

from .models import Donation
from .serializers import DonationSerializer
from .filters import DonationFilter
from .pagination import DonationPagination
from .permissions import IsOwnerOrAdmin


class DonationCreateAPIView(generics.CreateAPIView):

    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]


class DonationListAPIView(generics.ListAPIView):

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = DonationFilter

    search_fields = [
        "donor__user__username",
        "recipient__user__username",
        "hospital__hospital_name",
    ]

    ordering_fields = [
        "donation_date",
        "created_at",
    ]

    pagination_class = DonationPagination


class DonationDetailAPIView(generics.RetrieveAPIView):

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]


class DonationUpdateAPIView(generics.UpdateAPIView):

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]


class DonationDeleteAPIView(generics.DestroyAPIView):

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]
