from django.shortcuts import render

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, filters

from .models import OrganDonation
from .serializers import OrganDonationSerializer
from .filters import OrganDonationFilter
from .pagination import OrganDonationPagination
from .permissions import IsOwnerOrAdmin


class OrganDonationCreateAPIView(generics.CreateAPIView):

    serializer_class = OrganDonationSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrganDonationListAPIView(generics.ListAPIView):

    queryset = OrganDonation.objects.all()
    serializer_class = OrganDonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = OrganDonationFilter

    search_fields = [
        "organ_name",
        "donor__user__username",
        "recipient__user__username",
        "hospital__hospital_name",
    ]

    ordering_fields = [
        "donation_date",
        "created_at",
    ]

    pagination_class = OrganDonationPagination


class OrganDonationDetailAPIView(generics.RetrieveAPIView):

    queryset = OrganDonation.objects.all()
    serializer_class = OrganDonationSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrganDonationUpdateAPIView(generics.UpdateAPIView):

    queryset = OrganDonation.objects.all()
    serializer_class = OrganDonationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]


class OrganDonationDeleteAPIView(generics.DestroyAPIView):

    queryset = OrganDonation.objects.all()
    serializer_class = OrganDonationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]
